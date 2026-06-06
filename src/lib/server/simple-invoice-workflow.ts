import { randomBytes } from "node:crypto";
import { siteConfig } from "@/lib/site";
import { getSql, isDatabaseConfigured } from "@/lib/server/db";
import { getAppUrl } from "@/lib/server/env";
import { isMailConfigured, sendCustomerHtmlInvoiceEmail } from "@/lib/server/mail";
import type {
  BookingInvoiceData,
  BookingLineItem,
  Invoice,
  InvoiceItem,
  InvoiceStatus,
  PriceSummary,
} from "@/lib/server/invoices";
import {
  renderInvoiceHtml,
  type HtmlInvoiceDocument,
  type HtmlInvoiceLine,
} from "@/server/invoices/renderInvoiceHtml";

export type InvoiceActor = {
  actorType: "admin" | "agent";
  actorId: string;
  agentId?: string;
};

type RawBooking = {
  id: string;
  customer_id: string | null;
  assigned_agent_id: string | null;
  registration_number: string | null;
  plate: string | null;
  vehicle_name: string | null;
  package_label: string | null;
  category: string | null;
  appointment_date: string | Date | null;
  appointment_time: string | null;
  total: number | null;
};

type RawCustomer = {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  address: string | null;
  postal_code: string | null;
  city: string | null;
  portal_token: string | null;
};

type RawLine = {
  id: string | null;
  description: string | null;
  quantity: number | null;
  unit_price_dkk: number | null;
  total_price_dkk: number | null;
};

export type RawSimpleInvoice = {
  id: string;
  invoice_number: string;
  booking_id: string;
  customer_id: string | null;
  agent_id: string | null;
  status: string;
  currency: string | null;
  subtotal_ex_moms_dkk: number | null;
  moms_amount_dkk: number | null;
  total_incl_moms_dkk: number | null;
  subtotal_amount: number | null;
  vat_amount: number | null;
  total_amount: number | null;
  invoice_html: string | null;
  html_snapshot: string | null;
  invoice_subject: string | null;
  invoice_notes: string | null;
  public_token: string | null;
  customer_email: string | null;
  sent_to_email: string | null;
  email_sent: boolean | null;
  email_sent_at: string | Date | null;
  sent_at: string | Date | null;
  paid_at: string | Date | null;
  created_by_id: string | null;
  created_by_user_id: string | null;
  created_by_role: string | null;
  created_at: string | Date;
  updated_at: string | Date;
};

type RawInvoiceItem = {
  id: string;
  invoice_id: string;
  booking_line_item_id: string | null;
  description: string;
  quantity: number;
  unit_price_dkk: number;
  line_total_dkk: number;
  created_at: string | Date;
};

export type EditableInvoiceLine = {
  id?: string;
  description: string;
  quantity: number;
  unitPriceDkk?: number;
  unitPrice?: number;
};

export type InvoicePatch = {
  customerEmail?: string;
  notes?: string;
  invoiceNotes?: string;
  status?: InvoiceStatus;
  manualLines?: EditableInvoiceLine[];
};

export type SimpleInvoiceStep =
  | "ensure-schema"
  | "load-booking"
  | "create-invoice-record"
  | "render-html"
  | "store-html"
  | "send-email"
  | "done";

export class SimpleInvoiceWorkflowError extends Error {
  code: string;
  statusCode: number;
  invoiceGenerated: boolean;
  invoiceStored: boolean;
  emailSent: boolean;
  invoiceId?: string;
  invoiceNumber?: string;
  invoiceUrl?: string;
  invoiceHtmlUrl?: string;

  constructor(
    message: string,
    code: string,
    statusCode: number,
    state?: {
      invoiceGenerated?: boolean;
      invoiceStored?: boolean;
      emailSent?: boolean;
      invoiceId?: string;
      invoiceNumber?: string;
      invoiceUrl?: string;
      invoiceHtmlUrl?: string;
    }
  ) {
    super(message);
    this.name = "SimpleInvoiceWorkflowError";
    this.code = code;
    this.statusCode = statusCode;
    this.invoiceGenerated = state?.invoiceGenerated ?? false;
    this.invoiceStored = state?.invoiceStored ?? false;
    this.emailSent = state?.emailSent ?? false;
    this.invoiceId = state?.invoiceId;
    this.invoiceNumber = state?.invoiceNumber;
    this.invoiceUrl = state?.invoiceUrl;
    this.invoiceHtmlUrl = state?.invoiceHtmlUrl;
  }
}

const createId = (prefix: string) => `${prefix}_${randomBytes(10).toString("hex")}`;
const createPublicToken = () => randomBytes(32).toString("base64url");
const text = (value: unknown) => String(value ?? "").trim();
const dateText = (value: unknown) =>
  value instanceof Date ? value.toISOString() : text(value);
const safeError = (error: unknown) =>
  (error instanceof Error ? error.message : String(error)).slice(0, 1000);
const publicPath = (token: string) => `/invoices/${token}`;
const publicUrl = (token: string) =>
  new URL(publicPath(token), getAppUrl(siteConfig.url) || siteConfig.url).toString();
const validStatuses: InvoiceStatus[] = ["draft", "ready", "sent", "paid", "cancelled"];

export const ensureSimpleInvoiceSchema = async () => {
  if (!isDatabaseConfigured()) {
    throw new SimpleInvoiceWorkflowError(
      "Invoice storage is not configured on the server.",
      "DATABASE_CONNECTION_FAILED",
      500
    );
  }

  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id TEXT PRIMARY KEY,
      invoice_number TEXT UNIQUE NOT NULL,
      booking_id TEXT NOT NULL,
      customer_id TEXT,
      agent_id TEXT,
      customer_email TEXT,
      sent_to_email TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      currency TEXT NOT NULL DEFAULT 'DKK',
      subtotal_ex_moms_dkk INTEGER NOT NULL DEFAULT 0,
      moms_amount_dkk INTEGER NOT NULL DEFAULT 0,
      total_incl_moms_dkk INTEGER NOT NULL DEFAULT 0,
      subtotal_amount INTEGER NOT NULL DEFAULT 0,
      vat_amount INTEGER NOT NULL DEFAULT 0,
      total_amount INTEGER NOT NULL DEFAULT 0,
      invoice_html TEXT,
      html_snapshot TEXT,
      invoice_subject TEXT,
      invoice_notes TEXT,
      public_token TEXT,
      email_sent BOOLEAN DEFAULT FALSE,
      email_sent_at TIMESTAMPTZ,
      sent_at TIMESTAMPTZ,
      paid_at TIMESTAMPTZ,
      last_error TEXT,
      created_by_id TEXT,
      created_by_user_id TEXT,
      created_by_role TEXT DEFAULT 'system',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  await sql`
    ALTER TABLE invoices
      ADD COLUMN IF NOT EXISTS invoice_html TEXT,
      ADD COLUMN IF NOT EXISTS html_snapshot TEXT,
      ADD COLUMN IF NOT EXISTS invoice_subject TEXT,
      ADD COLUMN IF NOT EXISTS invoice_notes TEXT,
      ADD COLUMN IF NOT EXISTS public_token TEXT,
      ADD COLUMN IF NOT EXISTS subtotal_amount INTEGER NOT NULL DEFAULT 0,
      ADD COLUMN IF NOT EXISTS vat_amount INTEGER NOT NULL DEFAULT 0,
      ADD COLUMN IF NOT EXISTS total_amount INTEGER NOT NULL DEFAULT 0,
      ADD COLUMN IF NOT EXISTS customer_email TEXT,
      ADD COLUMN IF NOT EXISTS sent_to_email TEXT,
      ADD COLUMN IF NOT EXISTS email_sent BOOLEAN DEFAULT FALSE,
      ADD COLUMN IF NOT EXISTS email_sent_at TIMESTAMPTZ,
      ADD COLUMN IF NOT EXISTS sent_at TIMESTAMPTZ,
      ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ,
      ADD COLUMN IF NOT EXISTS last_error TEXT,
      ADD COLUMN IF NOT EXISTS created_by_id TEXT,
      ADD COLUMN IF NOT EXISTS created_by_user_id TEXT,
      ADD COLUMN IF NOT EXISTS created_by_role TEXT DEFAULT 'system',
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
  `;
  await sql`
    UPDATE invoices
    SET
      status = CASE WHEN status = 'generated' THEN 'ready' ELSE status END,
      invoice_html = COALESCE(invoice_html, html_snapshot),
      created_by_id = COALESCE(created_by_id, created_by_user_id),
      subtotal_amount = COALESCE(NULLIF(subtotal_amount, 0), subtotal_ex_moms_dkk, 0),
      vat_amount = COALESCE(NULLIF(vat_amount, 0), moms_amount_dkk, 0),
      total_amount = COALESCE(NULLIF(total_amount, 0), total_incl_moms_dkk, 0)
    WHERE
      status = 'generated'
      OR invoice_html IS NULL
      OR created_by_id IS NULL
      OR total_amount = 0;
  `;
  await sql`
    UPDATE invoices
    SET public_token =
      MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT || id) ||
      MD5(id || CLOCK_TIMESTAMP()::TEXT || RANDOM()::TEXT)
    WHERE public_token IS NULL OR public_token = '';
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS invoice_items (
      id TEXT PRIMARY KEY,
      invoice_id TEXT NOT NULL,
      booking_line_item_id TEXT,
      description TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      unit_price_dkk INTEGER NOT NULL DEFAULT 0,
      line_total_dkk INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS invoice_sequences (
      sequence_year INTEGER PRIMARY KEY,
      last_number INTEGER NOT NULL DEFAULT 0
    );
  `;
  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS invoices_public_token_unique_idx
    ON invoices (public_token);
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS invoices_customer_created_idx
    ON invoices (customer_id, created_at DESC);
  `;
};

const nextInvoiceNumber = async () => {
  const sql = getSql();
  const year = new Date().getFullYear();
  const [existing] = await sql<{ max_number: number }[]>`
    SELECT COALESCE(
      MAX(
        CASE
          WHEN invoice_number ~ ${`^CW-${year}-[0-9]+$`}
          THEN SPLIT_PART(invoice_number, '-', 3)::INTEGER
          ELSE 0
        END
      ),
      0
    )::INTEGER AS max_number
    FROM invoices;
  `;
  await sql`
    INSERT INTO invoice_sequences (sequence_year, last_number)
    VALUES (${year}, ${Number(existing?.max_number || 0)})
    ON CONFLICT (sequence_year) DO NOTHING;
  `;
  const [sequence] = await sql<{ last_number: number }[]>`
    UPDATE invoice_sequences
    SET last_number = GREATEST(last_number, ${Number(existing?.max_number || 0)}) + 1
    WHERE sequence_year = ${year}
    RETURNING last_number;
  `;
  return `CW-${year}-${Number(sequence.last_number).toString().padStart(6, "0")}`;
};

const assertActorCanAccessBooking = async (bookingId: string, actor: InvoiceActor) => {
  if (actor.actorType === "admin") return;
  const sql = getSql();
  const [row] = await sql<{ allowed: boolean }[]>`
    SELECT (assigned_agent_id = ${actor.agentId || actor.actorId}) AS allowed
    FROM bookings
    WHERE id = ${bookingId}
    LIMIT 1;
  `;
  if (!row?.allowed) {
    throw new SimpleInvoiceWorkflowError("Forbidden.", "FORBIDDEN", 403);
  }
};

const loadBooking = async (bookingId: string, actor: InvoiceActor) => {
  await assertActorCanAccessBooking(bookingId, actor);
  const sql = getSql();
  const [booking] = await sql<RawBooking[]>`
    SELECT id, customer_id, assigned_agent_id, registration_number, plate,
      vehicle_name, package_label, category, appointment_date, appointment_time, total
    FROM bookings
    WHERE id = ${bookingId}
    LIMIT 1;
  `;
  if (!booking) {
    throw new SimpleInvoiceWorkflowError("Booking was not found.", "BOOKING_NOT_FOUND", 404);
  }
  const [customer] = await sql<RawCustomer[]>`
    SELECT id, email, first_name, last_name, phone, address, postal_code, city, portal_token
    FROM customers
    WHERE id = ${booking.customer_id}
    LIMIT 1;
  `;
  if (!customer) {
    throw new SimpleInvoiceWorkflowError("Customer was not found.", "CUSTOMER_NOT_FOUND", 404);
  }
  let lines: RawLine[] = [];
  try {
    lines = await sql<RawLine[]>`
      SELECT id, description, quantity, unit_price_dkk, total_price_dkk
      FROM booking_line_items
      WHERE booking_id = ${bookingId}
      ORDER BY created_at ASC;
    `;
  } catch {
    // Older databases may not have booking_line_items yet.
  }
  if (lines.length === 0) {
    const description =
      [booking.package_label, booking.category].filter(Boolean).join(" - ") ||
      "Clean Wash service";
    lines = [{
      id: null,
      description,
      quantity: 1,
      unit_price_dkk: Number(booking.total || 0),
      total_price_dkk: Number(booking.total || 0),
    }];
  }
  return { booking, customer, lines };
};

const normalizeLine = (line: {
  id?: string | null;
  description?: string | null;
  quantity?: number | null;
  unit_price_dkk?: number | null;
  total_price_dkk?: number | null;
  unitPriceDkk?: number | null;
  unitPrice?: number | null;
}) => {
  const quantity = Math.max(1, Math.round(Number(line.quantity || 1)));
  const unitPriceDkk = Math.max(
    0,
    Math.round(Number(line.unitPriceDkk ?? line.unitPrice ?? line.unit_price_dkk ?? 0))
  );
  return {
    id: text(line.id),
    description: text(line.description) || "Clean Wash service",
    quantity,
    unitPriceDkk,
    totalDkk: Math.max(
      0,
      Math.round(Number(line.total_price_dkk ?? quantity * unitPriceDkk))
    ),
  };
};

const summarize = (lines: ReturnType<typeof normalizeLine>[]): PriceSummary => {
  const total = lines.reduce((sum, line) => sum + line.totalDkk, 0);
  const vat = Math.round(total * 0.2);
  return {
    originalBookingPriceDkk: lines[0]?.totalDkk || total,
    existingExtraServicesDkk: 0,
    manualExtraChargesDkk: Math.max(0, total - (lines[0]?.totalDkk || 0)),
    subtotalExMomsDkk: total - vat,
    momsAmountDkk: vat,
    totalInclMomsDkk: total,
  };
};

const loadInvoiceItems = async (invoiceId: string) => {
  const sql = getSql();
  return sql<RawInvoiceItem[]>`
    SELECT *
    FROM invoice_items
    WHERE invoice_id = ${invoiceId}
    ORDER BY created_at ASC;
  `;
};

const itemFromRow = (row: RawInvoiceItem): InvoiceItem => ({
  id: text(row.id),
  invoiceId: text(row.invoice_id),
  bookingLineItemId: text(row.booking_line_item_id),
  description: text(row.description),
  quantity: Number(row.quantity || 1),
  unitPriceDkk: Number(row.unit_price_dkk || 0),
  lineTotalDkk: Number(row.line_total_dkk || 0),
  createdAt: dateText(row.created_at),
});

const mapStatus = (status: string): InvoiceStatus => {
  if (status === "generated") return "ready";
  return validStatuses.includes(status as InvoiceStatus)
    ? (status as InvoiceStatus)
    : "draft";
};

const mapInvoice = (row: RawSimpleInvoice, itemRows: RawInvoiceItem[]): Invoice => {
  const token = text(row.public_token);
  const path = token ? publicPath(token) : "";
  return {
    id: text(row.id),
    invoiceNumber: text(row.invoice_number),
    bookingId: text(row.booking_id),
    customerId: text(row.customer_id),
    agentId: text(row.agent_id),
    status: mapStatus(row.status),
    currency: text(row.currency) || "DKK",
    subtotalExMomsDkk: Number(row.subtotal_amount ?? row.subtotal_ex_moms_dkk ?? 0),
    momsAmountDkk: Number(row.vat_amount ?? row.moms_amount_dkk ?? 0),
    totalInclMomsDkk: Number(row.total_amount ?? row.total_incl_moms_dkk ?? 0),
    pdfUrl: path,
    pdfFileName: "",
    pdfSizeBytes: 0,
    publicToken: token,
    publicUrl: path,
    invoiceHtml: text(row.invoice_html || row.html_snapshot),
    invoiceSubject: text(row.invoice_subject),
    invoiceNotes: text(row.invoice_notes),
    customerEmail: text(row.customer_email),
    sentToEmail: text(row.sent_to_email),
    emailSent: Boolean(row.email_sent),
    emailSentAt: dateText(row.email_sent_at),
    sentAt: dateText(row.sent_at),
    paidAt: dateText(row.paid_at),
    createdByUserId: text(row.created_by_id || row.created_by_user_id),
    createdByRole:
      row.created_by_role === "admin" || row.created_by_role === "agent"
        ? row.created_by_role
        : "system",
    createdAt: dateText(row.created_at),
    updatedAt: dateText(row.updated_at),
    appointmentDate: "",
    items: itemRows.map(itemFromRow),
  };
};

const buildDocument = (
  row: RawSimpleInvoice,
  booking: RawBooking,
  customer: RawCustomer,
  lines: ReturnType<typeof normalizeLine>[],
  summary: PriceSummary
): HtmlInvoiceDocument => ({
  invoiceNumber: row.invoice_number,
  invoiceDate: new Intl.DateTimeFormat("da-DK").format(
    row.created_at ? new Date(row.created_at) : new Date()
  ),
  status: mapStatus(row.status),
  companyName: siteConfig.name,
  companyEmail: siteConfig.email,
  companyPhone: siteConfig.phoneDisplay,
  companyAddress: text(process.env.INVOICE_COMPANY_ADDRESS),
  companyCvr: text(process.env.INVOICE_COMPANY_CVR),
  customerName:
    [customer.first_name, customer.last_name].filter(Boolean).join(" ") ||
    text(row.customer_email || customer.email),
  customerEmail: text(row.customer_email || customer.email),
  customerPhone: text(customer.phone),
  customerAddress: [
    customer.address,
    [customer.postal_code, customer.city].filter(Boolean).join(" "),
  ].filter(Boolean).join(", "),
  bookingId: booking.id,
  vehicle: text(booking.vehicle_name),
  registrationNumber: text(booking.registration_number || booking.plate),
  service:
    [booking.package_label, booking.category].filter(Boolean).join(" - ") ||
    "Clean Wash service",
  appointment: [
    dateText(booking.appointment_date).slice(0, 10),
    booking.appointment_time,
  ].filter(Boolean).join(" "),
  lines: lines.map(
    (line): HtmlInvoiceLine => ({
      description: line.description,
      quantity: line.quantity,
      unitPriceDkk: line.unitPriceDkk,
      totalDkk: line.totalDkk,
    })
  ),
  subtotalExVatDkk: summary.subtotalExMomsDkk,
  vatDkk: summary.momsAmountDkk,
  totalDkk: summary.totalInclMomsDkk,
  notes: text(row.invoice_notes),
  paymentInstructions:
    text(process.env.INVOICE_PAYMENT_INSTRUCTIONS) ||
    "Betaling sker efter aftale med Clean Wash.",
});

const renderAndStore = async (
  row: RawSimpleInvoice,
  booking: RawBooking,
  customer: RawCustomer,
  itemRows: RawInvoiceItem[]
) => {
  const normalized = itemRows.map((item) =>
    normalizeLine({
      id: item.id,
      description: item.description,
      quantity: item.quantity,
      unit_price_dkk: item.unit_price_dkk,
      total_price_dkk: item.line_total_dkk,
    })
  );
  const summary = summarize(normalized);
  const html = renderInvoiceHtml(buildDocument(row, booking, customer, normalized, summary));
  const sql = getSql();
  const [stored] = await sql<RawSimpleInvoice[]>`
    UPDATE invoices
    SET
      invoice_html = ${html},
      html_snapshot = ${html},
      subtotal_amount = ${summary.subtotalExMomsDkk},
      vat_amount = ${summary.momsAmountDkk},
      total_amount = ${summary.totalInclMomsDkk},
      subtotal_ex_moms_dkk = ${summary.subtotalExMomsDkk},
      moms_amount_dkk = ${summary.momsAmountDkk},
      total_incl_moms_dkk = ${summary.totalInclMomsDkk},
      last_error = NULL,
      updated_at = NOW()
    WHERE id = ${row.id}
    RETURNING *;
  `;
  return { row: stored, summary, html };
};

const createInvoiceData = (
  invoice: Invoice,
  summary: PriceSummary,
  booking: RawBooking,
  customer: RawCustomer
): BookingInvoiceData => ({
  booking: {
    id: booking.id,
    assignedAgentId: text(booking.assigned_agent_id),
  } as BookingInvoiceData["booking"],
  customer: {
    id: customer.id,
    email: text(customer.email),
    portalToken: text(customer.portal_token),
  } as BookingInvoiceData["customer"],
  agent: null,
  lineItems: invoice.items.map(
    (item): BookingLineItem => ({
      id: item.bookingLineItemId || item.id,
      bookingId: booking.id,
      agentId: text(booking.assigned_agent_id),
      agentName: "",
      createdByType: "system",
      itemType: "manual_extra_charge",
      serviceId: "",
      description: item.description,
      quantity: item.quantity,
      unitPriceDkk: item.unitPriceDkk,
      totalPriceDkk: item.lineTotalDkk,
      isTaxIncluded: true,
      createdAt: item.createdAt,
      updatedAt: item.createdAt,
      lockedAt: invoice.status === "sent" || invoice.status === "paid" ? invoice.sentAt : "",
    })
  ),
  summary,
  invoice,
});

const getInvoiceContext = async (invoiceId: string, actor?: InvoiceActor) => {
  await ensureSimpleInvoiceSchema();
  const sql = getSql();
  const [row] = await sql<RawSimpleInvoice[]>`
    SELECT * FROM invoices WHERE id = ${invoiceId} LIMIT 1;
  `;
  if (!row) {
    throw new SimpleInvoiceWorkflowError("Invoice was not found.", "INVOICE_NOT_FOUND", 404);
  }
  if (actor?.actorType === "agent") {
    const [access] = await sql<{ allowed: boolean }[]>`
      SELECT (
        bookings.assigned_agent_id = ${actor.agentId || actor.actorId}
        OR invoices.created_by_id = ${actor.actorId}
        OR invoices.created_by_user_id = ${actor.actorId}
      ) AS allowed
      FROM invoices
      INNER JOIN bookings ON bookings.id = invoices.booking_id
      WHERE invoices.id = ${invoiceId}
      LIMIT 1;
    `;
    if (!access?.allowed) {
      throw new SimpleInvoiceWorkflowError("Forbidden.", "FORBIDDEN", 403);
    }
  }
  const loaded = await loadBooking(
    row.booking_id,
    actor?.actorType === "admin"
      ? actor
      : { actorType: "admin", actorId: actor?.actorId || "public-read" }
  );
  const items = await loadInvoiceItems(row.id);
  return { row, ...loaded, items };
};

export const createInvoiceDraft = async (input: {
  bookingId: string;
  actor: InvoiceActor;
}) => {
  await ensureSimpleInvoiceSchema();
  const loaded = await loadBooking(input.bookingId, input.actor);
  const sql = getSql();
  const [existing] = await sql<RawSimpleInvoice[]>`
    SELECT * FROM invoices
    WHERE booking_id = ${input.bookingId}
    ORDER BY created_at DESC
    LIMIT 1;
  `;
  if (existing && ["sent", "paid"].includes(mapStatus(existing.status))) {
    const itemRows = await loadInvoiceItems(existing.id);
    const summary = summarize(itemRows.map((item) =>
      normalizeLine({
        description: item.description,
        quantity: item.quantity,
        unit_price_dkk: item.unit_price_dkk,
        total_price_dkk: item.line_total_dkk,
      })
    ));
    const invoice = mapInvoice(existing, itemRows);
    return {
      invoice,
      data: createInvoiceData(invoice, summary, loaded.booking, loaded.customer),
      assignedAgentId: text(loaded.booking.assigned_agent_id),
      portalToken: text(loaded.customer.portal_token),
    };
  }

  const id = existing?.id || createId("inv");
  const invoiceNumber = existing?.invoice_number || (await nextInvoiceNumber());
  const token = text(existing?.public_token) || createPublicToken();
  const subject =
    text(existing?.invoice_subject) ||
    `${siteConfig.name}: faktura ${invoiceNumber}`;
  let row: RawSimpleInvoice;
  if (existing) {
    [row] = await sql<RawSimpleInvoice[]>`
      UPDATE invoices
      SET
        customer_id = ${loaded.customer.id},
        agent_id = ${input.actor.agentId || loaded.booking.assigned_agent_id || null},
        customer_email = ${loaded.customer.email},
        sent_to_email = ${loaded.customer.email},
        status = CASE WHEN status = 'cancelled' THEN 'draft' ELSE status END,
        invoice_subject = ${subject},
        public_token = ${token},
        created_by_id = COALESCE(created_by_id, ${input.actor.actorId}),
        created_by_user_id = COALESCE(created_by_user_id, ${input.actor.actorId}),
        created_by_role = COALESCE(created_by_role, ${input.actor.actorType}),
        last_error = NULL,
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *;
    `;
  } else {
    [row] = await sql<RawSimpleInvoice[]>`
      INSERT INTO invoices (
        id, invoice_number, booking_id, customer_id, agent_id, customer_email,
        sent_to_email, status, currency, invoice_subject, public_token,
        created_by_id, created_by_user_id, created_by_role
      )
      VALUES (
        ${id}, ${invoiceNumber}, ${input.bookingId}, ${loaded.customer.id},
        ${input.actor.agentId || loaded.booking.assigned_agent_id || null},
        ${loaded.customer.email}, ${loaded.customer.email}, 'draft', 'DKK',
        ${subject}, ${token}, ${input.actor.actorId}, ${input.actor.actorId},
        ${input.actor.actorType}
      )
      RETURNING *;
    `;
  }

  let itemRows = await loadInvoiceItems(id);
  if (itemRows.length === 0) {
    for (const source of loaded.lines) {
      const line = normalizeLine(source);
      await sql`
        INSERT INTO invoice_items (
          id, invoice_id, booking_line_item_id, description, quantity,
          unit_price_dkk, line_total_dkk
        )
        VALUES (
          ${createId("ini")}, ${id}, ${source.id || null}, ${line.description},
          ${line.quantity}, ${line.unitPriceDkk}, ${line.totalDkk}
        );
      `;
    }
    itemRows = await loadInvoiceItems(id);
  }

  const rendered = await renderAndStore(row, loaded.booking, loaded.customer, itemRows);
  await sql`
    UPDATE bookings
    SET invoice_requested = true, invoice_status = 'ready',
      invoice_number = ${invoiceNumber}, updated_at = NOW()
    WHERE id = ${input.bookingId};
  `;
  const invoice = mapInvoice(rendered.row, itemRows);
  return {
    invoice,
    data: createInvoiceData(
      invoice,
      rendered.summary,
      loaded.booking,
      loaded.customer
    ),
    assignedAgentId: text(loaded.booking.assigned_agent_id),
    portalToken: text(loaded.customer.portal_token),
  };
};

export const updateHtmlInvoice = async (
  invoiceId: string,
  actor: InvoiceActor,
  patch: InvoicePatch
) => {
  const context = await getInvoiceContext(invoiceId, actor);
  if (
    ["sent", "paid"].includes(mapStatus(context.row.status)) &&
    (patch.manualLines || patch.customerEmail !== undefined)
  ) {
    throw new SimpleInvoiceWorkflowError(
      "Sent or paid invoices cannot have prices or recipient changed.",
      "INVOICE_LOCKED",
      409
    );
  }
  if (actor.actorType === "agent" && patch.status === "paid") {
    throw new SimpleInvoiceWorkflowError(
      "Only an admin can mark an invoice as paid.",
      "ADMIN_REQUIRED",
      403
    );
  }
  const sql = getSql();
  if (patch.manualLines) {
    if (patch.manualLines.length === 0) {
      throw new SimpleInvoiceWorkflowError(
        "An invoice must contain at least one line.",
        "INVOICE_LINES_REQUIRED",
        400
      );
    }
    await sql`DELETE FROM invoice_items WHERE invoice_id = ${invoiceId};`;
    for (const source of patch.manualLines) {
      const line = normalizeLine(source);
      await sql`
        INSERT INTO invoice_items (
          id, invoice_id, description, quantity, unit_price_dkk, line_total_dkk
        )
        VALUES (
          ${source.id || createId("ini")}, ${invoiceId}, ${line.description},
          ${line.quantity}, ${line.unitPriceDkk}, ${line.totalDkk}
        );
      `;
    }
  }
  const nextStatus =
    patch.status && validStatuses.includes(patch.status)
      ? patch.status
      : mapStatus(context.row.status);
  const [updated] = await sql<RawSimpleInvoice[]>`
    UPDATE invoices
    SET
      customer_email = ${patch.customerEmail === undefined
        ? context.row.customer_email
        : text(patch.customerEmail)},
      sent_to_email = ${patch.customerEmail === undefined
        ? context.row.sent_to_email
        : text(patch.customerEmail)},
      invoice_notes = ${patch.notes === undefined
        ? patch.invoiceNotes === undefined
          ? context.row.invoice_notes
          : text(patch.invoiceNotes)
        : text(patch.notes)},
      status = ${nextStatus},
      paid_at = CASE WHEN ${nextStatus} = 'paid' THEN COALESCE(paid_at, NOW()) ELSE paid_at END,
      updated_at = NOW()
    WHERE id = ${invoiceId}
    RETURNING *;
  `;
  const itemRows = await loadInvoiceItems(invoiceId);
  const rendered = await renderAndStore(
    updated,
    context.booking,
    context.customer,
    itemRows
  );
  const invoice = mapInvoice(rendered.row, itemRows);
  return {
    invoice,
    data: createInvoiceData(
      invoice,
      rendered.summary,
      context.booking,
      context.customer
    ),
    assignedAgentId: text(context.booking.assigned_agent_id),
    portalToken: text(context.customer.portal_token),
  };
};

export const sendHtmlInvoice = async (invoiceId: string, actor: InvoiceActor) => {
  const context = await getInvoiceContext(invoiceId, actor);
  if (mapStatus(context.row.status) === "cancelled") {
    throw new SimpleInvoiceWorkflowError(
      "Cancelled invoices cannot be sent.",
      "INVOICE_CANCELLED",
      409
    );
  }
  if (!context.row.invoice_html) {
    const rendered = await renderAndStore(
      context.row,
      context.booking,
      context.customer,
      context.items
    );
    context.row = rendered.row;
  }
  const recipient = text(context.row.customer_email || context.customer.email);
  const itemRows = await loadInvoiceItems(invoiceId);
  const summary = summarize(itemRows.map((item) =>
    normalizeLine({
      description: item.description,
      quantity: item.quantity,
      unit_price_dkk: item.unit_price_dkk,
      total_price_dkk: item.line_total_dkk,
    })
  ));
  const currentInvoice = mapInvoice(context.row, itemRows);
  const currentData = createInvoiceData(
    currentInvoice,
    summary,
    context.booking,
    context.customer
  );
  const fail = async (code: string, message: string, error?: unknown) => {
    const sql = getSql();
    await sql`
      UPDATE invoices SET last_error = ${safeError(error || message)}, updated_at = NOW()
      WHERE id = ${invoiceId};
    `;
    return {
      invoice: currentInvoice,
      data: currentData,
      assignedAgentId: text(context.booking.assigned_agent_id),
      portalToken: text(context.customer.portal_token),
      sent: false as const,
      emailAttempted: true as const,
      deliveryError: new SimpleInvoiceWorkflowError(message, code, 502, {
        invoiceGenerated: true,
        invoiceStored: true,
        invoiceId,
        invoiceNumber: currentInvoice.invoiceNumber,
        invoiceUrl: currentInvoice.publicUrl,
        invoiceHtmlUrl: currentInvoice.publicUrl,
      }),
    };
  };
  if (!recipient) return fail("CUSTOMER_EMAIL_MISSING", "Customer email is missing.");
  if (!isMailConfigured()) {
    return fail(
      "SMTP_CONFIG_MISSING",
      "Invoice was saved, but email is not configured."
    );
  }
  try {
    const result = await sendCustomerHtmlInvoiceEmail({
      bookingId: context.booking.id,
      customerId: context.customer.id,
      customerName:
        [context.customer.first_name, context.customer.last_name]
          .filter(Boolean)
          .join(" ") || recipient,
      customerEmail: recipient,
      invoiceNumber: context.row.invoice_number,
      subject: text(context.row.invoice_subject),
      totalInclMomsDkk: summary.totalInclMomsDkk,
      invoiceUrl: publicUrl(text(context.row.public_token)),
      appointmentLabel: [
        dateText(context.booking.appointment_date).slice(0, 10),
        context.booking.appointment_time,
      ].filter(Boolean).join(" "),
      settings: {
        companyName: siteConfig.name,
        supportEmail: siteConfig.email,
        adminNotifyEmail: "",
      },
    });
    if (result !== "sent") {
      return fail("EMAIL_SEND_FAILED", "Invoice was saved, but email could not be sent.");
    }
    const sql = getSql();
    const [sentRow] = await sql<RawSimpleInvoice[]>`
      UPDATE invoices
      SET status = 'sent', email_sent = true, email_sent_at = NOW(),
        sent_at = COALESCE(sent_at, NOW()), last_error = NULL, updated_at = NOW()
      WHERE id = ${invoiceId}
      RETURNING *;
    `;
    await sql`
      UPDATE bookings SET invoice_status = 'sent', updated_at = NOW()
      WHERE id = ${context.booking.id};
    `;
    const rendered = await renderAndStore(
      sentRow,
      context.booking,
      context.customer,
      itemRows
    );
    const invoice = mapInvoice(rendered.row, itemRows);
    return {
      invoice,
      data: createInvoiceData(
        invoice,
        rendered.summary,
        context.booking,
        context.customer
      ),
      assignedAgentId: text(context.booking.assigned_agent_id),
      portalToken: text(context.customer.portal_token),
      sent: true as const,
      emailAttempted: true as const,
    };
  } catch (error) {
    console.error("[invoice.html] email delivery failed", {
      invoiceId,
      message: safeError(error),
    });
    return fail("EMAIL_SEND_FAILED", "Invoice was saved, but email could not be sent.", error);
  }
};

export const runSimpleInvoiceWorkflow = async (input: {
  bookingId: string;
  actor: InvoiceActor;
  sendEmail: boolean;
  onStep?: (step: SimpleInvoiceStep) => void;
}) => {
  input.onStep?.("ensure-schema");
  const draft = await createInvoiceDraft({
    bookingId: input.bookingId,
    actor: input.actor,
  });
  if (!input.sendEmail) {
    input.onStep?.("done");
    return {
      ...draft,
      sent: false as const,
      emailAttempted: false as const,
    };
  }
  input.onStep?.("send-email");
  const sent = await sendHtmlInvoice(draft.invoice.id, input.actor);
  input.onStep?.("done");
  return sent;
};

export const getSimpleInvoiceRecord = async (invoiceId: string) => {
  await ensureSimpleInvoiceSchema();
  const sql = getSql();
  const [row] = await sql<RawSimpleInvoice[]>`
    SELECT * FROM invoices WHERE id = ${invoiceId} LIMIT 1;
  `;
  return row || null;
};

export const getHtmlInvoiceForActor = async (
  invoiceId: string,
  actor: InvoiceActor
) => {
  const context = await getInvoiceContext(invoiceId, actor);
  const summary = summarize(context.items.map((item) =>
    normalizeLine({
      description: item.description,
      quantity: item.quantity,
      unit_price_dkk: item.unit_price_dkk,
      total_price_dkk: item.line_total_dkk,
    })
  ));
  const invoice = mapInvoice(context.row, context.items);
  return {
    invoice,
    data: createInvoiceData(
      invoice,
      summary,
      context.booking,
      context.customer
    ),
  };
};

export const getHtmlInvoiceForPortal = async (
  invoiceId: string,
  portalToken: string
) => {
  const row = await getSimpleInvoiceRecord(invoiceId);
  if (
    !row ||
    !(await canPortalAccessSimpleInvoice(text(row.customer_id), portalToken))
  ) {
    throw new SimpleInvoiceWorkflowError("Forbidden.", "FORBIDDEN", 403);
  }
  const context = await getInvoiceContext(invoiceId);
  const summary = summarize(context.items.map((item) =>
    normalizeLine({
      description: item.description,
      quantity: item.quantity,
      unit_price_dkk: item.unit_price_dkk,
      total_price_dkk: item.line_total_dkk,
    })
  ));
  const invoice = mapInvoice(context.row, context.items);
  return {
    invoice,
    data: createInvoiceData(
      invoice,
      summary,
      context.booking,
      context.customer
    ),
  };
};

export const listHtmlInvoicesForActor = async (
  actor: InvoiceActor,
  filters?: { customerId?: string; agentId?: string; bookingId?: string }
) => {
  await ensureSimpleInvoiceSchema();
  const sql = getSql();
  const rows =
    actor.actorType === "admin"
      ? await sql<RawSimpleInvoice[]>`
          SELECT * FROM invoices ORDER BY created_at DESC LIMIT 250;
        `
      : await sql<RawSimpleInvoice[]>`
          SELECT invoices.*
          FROM invoices
          INNER JOIN bookings ON bookings.id = invoices.booking_id
          WHERE
            bookings.assigned_agent_id = ${actor.agentId || actor.actorId}
            OR invoices.created_by_id = ${actor.actorId}
            OR invoices.created_by_user_id = ${actor.actorId}
          ORDER BY invoices.created_at DESC
          LIMIT 250;
        `;
  const invoices: Invoice[] = [];
  for (const row of rows.filter((row) => {
    if (filters?.customerId && text(row.customer_id) !== filters.customerId) return false;
    if (filters?.agentId && text(row.agent_id) !== filters.agentId) return false;
    if (filters?.bookingId && row.booking_id !== filters.bookingId) return false;
    return true;
  })) {
    invoices.push(mapInvoice(row, await loadInvoiceItems(row.id)));
  }
  return invoices;
};

export const getHtmlInvoiceByPublicToken = async (token: string) => {
  await ensureSimpleInvoiceSchema();
  const sql = getSql();
  const [row] = await sql<RawSimpleInvoice[]>`
    SELECT * FROM invoices WHERE public_token = ${token} LIMIT 1;
  `;
  if (!row) return null;
  if (row.invoice_html || row.html_snapshot) return row;

  const context = await getInvoiceContext(row.id);
  let items = context.items;
  if (items.length === 0) {
    for (const source of context.lines) {
      const line = normalizeLine(source);
      await sql`
        INSERT INTO invoice_items (
          id, invoice_id, booking_line_item_id, description, quantity,
          unit_price_dkk, line_total_dkk
        )
        VALUES (
          ${createId("ini")}, ${row.id}, ${source.id || null}, ${line.description},
          ${line.quantity}, ${line.unitPriceDkk}, ${line.totalDkk}
        );
      `;
    }
    items = await loadInvoiceItems(row.id);
  }
  return (
    await renderAndStore(row, context.booking, context.customer, items)
  ).row;
};

export const getSimpleInvoiceHtml = async (invoiceId: string) => {
  const row = await getSimpleInvoiceRecord(invoiceId);
  const html = text(row?.invoice_html || row?.html_snapshot);
  if (!row || !html) return null;
  return {
    invoiceId: row.id,
    bookingId: row.booking_id,
    customerId: text(row.customer_id),
    html,
  };
};

export const getSimpleInvoicePdf = async () => null;

export const canAgentAccessSimpleInvoice = async (
  bookingId: string,
  agentId: string
) => {
  const sql = getSql();
  const [row] = await sql<{ allowed: boolean }[]>`
    SELECT (assigned_agent_id = ${agentId}) AS allowed
    FROM bookings WHERE id = ${bookingId} LIMIT 1;
  `;
  return Boolean(row?.allowed);
};

export const canPortalAccessSimpleInvoice = async (
  customerId: string,
  portalToken: string
) => {
  const sql = getSql();
  const [row] = await sql<{ allowed: boolean }[]>`
    SELECT (portal_token = ${portalToken}) AS allowed
    FROM customers WHERE id = ${customerId} LIMIT 1;
  `;
  return Boolean(row?.allowed);
};

export const getSimpleInvoiceDiagnostics = async () => {
  const hasDatabaseUrl = isDatabaseConfigured();
  if (!hasDatabaseUrl) {
    return {
      hasDatabaseUrl,
      databaseConnected: false,
      invoicesTableExists: false,
      htmlColumnExists: false,
      publicTokenColumnExists: false,
      errorCode: "DATABASE_CONNECTION_FAILED",
    };
  }
  const sql = getSql();
  try {
    await ensureSimpleInvoiceSchema();
    const columns = await sql<{ column_name: string }[]>`
      SELECT column_name FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'invoices';
    `;
    return {
      hasDatabaseUrl,
      databaseConnected: true,
      invoicesTableExists: columns.length > 0,
      htmlColumnExists: columns.some((column) => column.column_name === "invoice_html"),
      publicTokenColumnExists: columns.some((column) => column.column_name === "public_token"),
      errorCode: "",
    };
  } catch (error) {
    return {
      hasDatabaseUrl,
      databaseConnected: false,
      invoicesTableExists: false,
      htmlColumnExists: false,
      publicTokenColumnExists: false,
      errorCode: safeError(error),
    };
  }
};
