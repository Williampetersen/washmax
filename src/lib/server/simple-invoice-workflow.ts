import { randomBytes } from "node:crypto";
import { siteConfig } from "@/lib/site";
import { getSql, isDatabaseConfigured } from "@/lib/server/db";
import { getAppUrl } from "@/lib/server/env";
import { isMailConfigured, sendCustomerInvoiceEmail } from "@/lib/server/mail";
import type {
  BookingInvoiceData,
  BookingLineItem,
  Invoice,
  InvoiceItem,
  PriceSummary,
} from "@/lib/server/invoices";
import {
  generateSimpleInvoicePdf,
  isSimplePdfBuffer,
  type SimpleInvoiceDocument,
  type SimpleInvoiceLine,
} from "@/server/invoices/generateSimpleInvoicePdf";

type InvoiceActor = {
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

type RawSimpleInvoice = {
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
  total_amount: number | null;
  pdf_url: string | null;
  pdf_file_name: string | null;
  pdf_data: Buffer | Uint8Array | null;
  pdf_mime_type: string | null;
  pdf_size_bytes: number | null;
  html_snapshot: string | null;
  customer_email: string | null;
  sent_to_email: string | null;
  email_sent: boolean | null;
  email_sent_at: string | Date | null;
  sent_at: string | Date | null;
  paid_at: string | Date | null;
  created_by_user_id: string | null;
  created_by_role: string | null;
  created_at: string | Date;
  updated_at: string | Date;
};

type InvoiceSchemaColumn = {
  column_name: string;
  udt_name: string;
};

export type SimpleInvoiceStep =
  | "ensure-schema"
  | "load-booking"
  | "create-invoice-record"
  | "generate-pdf"
  | "store-pdf"
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
const toText = (value: unknown) => String(value ?? "").trim();
const toDateText = (value: unknown) =>
  value instanceof Date ? value.toISOString() : toText(value);
const invoiceUrl = (id: string) => `/api/invoices/${id}/download`;
const invoiceFileName = (number: string) => `clean-wash-invoice-${number}.pdf`;
const safeErrorMessage = (error: unknown) =>
  (error instanceof Error ? error.message : String(error)).slice(0, 1000);

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
      subtotal_ex_moms_dkk INTEGER NOT NULL DEFAULT 0,
      moms_amount_dkk INTEGER NOT NULL DEFAULT 0,
      total_incl_moms_dkk INTEGER NOT NULL DEFAULT 0,
      total_amount INTEGER NOT NULL DEFAULT 0,
      currency TEXT NOT NULL DEFAULT 'DKK',
      pdf_url TEXT,
      pdf_file_name TEXT,
      pdf_data BYTEA,
      pdf_mime_type TEXT DEFAULT 'application/pdf',
      pdf_size_bytes INTEGER NOT NULL DEFAULT 0,
      html_snapshot TEXT,
      email_sent BOOLEAN DEFAULT FALSE,
      email_sent_at TIMESTAMPTZ,
      sent_at TIMESTAMPTZ,
      paid_at TIMESTAMPTZ,
      last_error TEXT,
      created_by_user_id TEXT,
      created_by_role TEXT DEFAULT 'system',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  await sql`
    ALTER TABLE invoices
      ADD COLUMN IF NOT EXISTS id TEXT,
      ADD COLUMN IF NOT EXISTS invoice_number TEXT,
      ADD COLUMN IF NOT EXISTS booking_id TEXT,
      ADD COLUMN IF NOT EXISTS customer_id TEXT,
      ADD COLUMN IF NOT EXISTS agent_id TEXT,
      ADD COLUMN IF NOT EXISTS customer_email TEXT,
      ADD COLUMN IF NOT EXISTS sent_to_email TEXT,
      ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'draft',
      ADD COLUMN IF NOT EXISTS subtotal_ex_moms_dkk INTEGER NOT NULL DEFAULT 0,
      ADD COLUMN IF NOT EXISTS moms_amount_dkk INTEGER NOT NULL DEFAULT 0,
      ADD COLUMN IF NOT EXISTS total_incl_moms_dkk INTEGER NOT NULL DEFAULT 0,
      ADD COLUMN IF NOT EXISTS total_amount INTEGER NOT NULL DEFAULT 0,
      ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'DKK',
      ADD COLUMN IF NOT EXISTS pdf_url TEXT,
      ADD COLUMN IF NOT EXISTS pdf_file_name TEXT,
      ADD COLUMN IF NOT EXISTS pdf_data BYTEA,
      ADD COLUMN IF NOT EXISTS pdf_mime_type TEXT DEFAULT 'application/pdf',
      ADD COLUMN IF NOT EXISTS pdf_size_bytes INTEGER NOT NULL DEFAULT 0,
      ADD COLUMN IF NOT EXISTS html_snapshot TEXT,
      ADD COLUMN IF NOT EXISTS email_sent BOOLEAN DEFAULT FALSE,
      ADD COLUMN IF NOT EXISTS email_sent_at TIMESTAMPTZ,
      ADD COLUMN IF NOT EXISTS sent_at TIMESTAMPTZ,
      ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ,
      ADD COLUMN IF NOT EXISTS last_error TEXT,
      ADD COLUMN IF NOT EXISTS created_by_user_id TEXT,
      ADD COLUMN IF NOT EXISTS created_by_role TEXT DEFAULT 'system',
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
  `;

  // pdf_data is the canonical binary column. Replace incompatible legacy variants.
  await sql`
    DO $$
    DECLARE current_type TEXT;
    BEGIN
      SELECT udt_name INTO current_type
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'invoices'
        AND column_name = 'pdf_data';

      IF current_type IS NOT NULL AND current_type <> 'bytea' THEN
        ALTER TABLE invoices DROP COLUMN pdf_data;
        ALTER TABLE invoices ADD COLUMN pdf_data BYTEA;
      END IF;
    END $$;
  `;

  try {
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
      ALTER TABLE invoice_items
        ADD COLUMN IF NOT EXISTS id TEXT,
        ADD COLUMN IF NOT EXISTS invoice_id TEXT,
        ADD COLUMN IF NOT EXISTS booking_line_item_id TEXT,
        ADD COLUMN IF NOT EXISTS description TEXT,
        ADD COLUMN IF NOT EXISTS quantity INTEGER NOT NULL DEFAULT 1,
        ADD COLUMN IF NOT EXISTS unit_price_dkk INTEGER NOT NULL DEFAULT 0,
        ADD COLUMN IF NOT EXISTS line_total_dkk INTEGER NOT NULL DEFAULT 0,
        ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
    `;
  } catch (error) {
    console.warn("[invoice.simple] legacy invoice_items schema was not repaired", {
      message: safeErrorMessage(error),
    });
  }

  await sql`
    CREATE TABLE IF NOT EXISTS invoice_sequences (
      sequence_year INTEGER PRIMARY KEY,
      last_number INTEGER NOT NULL DEFAULT 0
    );
  `;
};

const getNextInvoiceNumber = async () => {
  const sql = getSql();
  const year = new Date().getFullYear();
  const prefix = `CW-${year}-`;
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
  return `${prefix}${Number(sequence.last_number).toString().padStart(6, "0")}`;
};

const loadBooking = async (bookingId: string, actor: InvoiceActor) => {
  const sql = getSql();
  const [booking] = await sql<RawBooking[]>`
    SELECT
      id,
      customer_id,
      assigned_agent_id,
      registration_number,
      plate,
      vehicle_name,
      package_label,
      category,
      appointment_date,
      appointment_time,
      total
    FROM bookings
    WHERE id = ${bookingId}
    LIMIT 1;
  `;

  if (!booking) {
    throw new SimpleInvoiceWorkflowError(
      "Booking was not found.",
      "BOOKING_NOT_FOUND",
      404
    );
  }

  if (
    actor.actorType === "agent" &&
    toText(booking.assigned_agent_id) !== toText(actor.agentId)
  ) {
    throw new SimpleInvoiceWorkflowError("Forbidden.", "FORBIDDEN", 403);
  }

  const [customer] = await sql<RawCustomer[]>`
    SELECT
      id,
      email,
      first_name,
      last_name,
      phone,
      address,
      postal_code,
      city,
      portal_token
    FROM customers
    WHERE id = ${booking.customer_id}
    LIMIT 1;
  `;

  if (!customer) {
    throw new SimpleInvoiceWorkflowError(
      "Customer was not found.",
      "CUSTOMER_NOT_FOUND",
      404
    );
  }

  let rows: RawLine[] = [];
  try {
    rows = await sql<RawLine[]>`
      SELECT id, description, quantity, unit_price_dkk, total_price_dkk
      FROM booking_line_items
      WHERE booking_id = ${bookingId}
      ORDER BY created_at ASC;
    `;
  } catch (error) {
    console.warn("[invoice.simple] booking line items unavailable; using booking total", {
      bookingId,
      message: safeErrorMessage(error),
    });
  }

  const fallbackDescription =
    [booking.package_label, booking.category].filter(Boolean).join(" - ") ||
    "Clean Wash service";
  const sourceLines =
    rows.length > 0
      ? rows
      : [
          {
            id: null,
            description: fallbackDescription,
            quantity: 1,
            unit_price_dkk: Number(booking.total || 0),
            total_price_dkk: Number(booking.total || 0),
          },
        ];
  const lines: SimpleInvoiceLine[] = sourceLines.map((line) => ({
    description: toText(line.description) || fallbackDescription,
    quantity: Math.max(1, Number(line.quantity || 1)),
    unitPriceDkk: Math.max(0, Number(line.unit_price_dkk || 0)),
    totalDkk: Math.max(0, Number(line.total_price_dkk || 0)),
  }));
  const totalDkk = lines.reduce((sum, line) => sum + line.totalDkk, 0);
  const vatDkk = Math.round(totalDkk * 0.2);
  const summary: PriceSummary = {
    originalBookingPriceDkk: lines[0]?.totalDkk || totalDkk,
    existingExtraServicesDkk: 0,
    manualExtraChargesDkk: Math.max(0, totalDkk - (lines[0]?.totalDkk || 0)),
    subtotalExMomsDkk: totalDkk - vatDkk,
    momsAmountDkk: vatDkk,
    totalInclMomsDkk: totalDkk,
  };

  return { booking, customer, sourceLines, lines, summary };
};

const buildDocument = (
  invoiceNumber: string,
  booking: RawBooking,
  customer: RawCustomer,
  lines: SimpleInvoiceLine[],
  summary: PriceSummary
): SimpleInvoiceDocument => ({
  invoiceNumber,
  invoiceDate: new Intl.DateTimeFormat("da-DK").format(new Date()),
  bookingId: booking.id,
  customerName:
    [customer.first_name, customer.last_name].filter(Boolean).join(" ") ||
    toText(customer.email),
  customerEmail: toText(customer.email),
  customerPhone: toText(customer.phone),
  customerAddress: [
    customer.address,
    [customer.postal_code, customer.city].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join(", "),
  vehicle: toText(booking.vehicle_name),
  registrationNumber:
    toText(booking.registration_number) || toText(booking.plate),
  service:
    [booking.package_label, booking.category].filter(Boolean).join(" - ") ||
    "Clean Wash service",
  appointment: [toDateText(booking.appointment_date).slice(0, 10), booking.appointment_time]
    .filter(Boolean)
    .join(" "),
  lines,
  subtotalExVatDkk: summary.subtotalExMomsDkk,
  vatDkk: summary.momsAmountDkk,
  totalDkk: summary.totalInclMomsDkk,
  currency: "DKK",
});

const escapeHtml = (value: unknown) =>
  toText(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const renderHtmlSnapshot = (document: SimpleInvoiceDocument) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Clean Wash invoice ${escapeHtml(document.invoiceNumber)}</title>
    <style>
      body{font-family:Arial,sans-serif;color:#102d38;margin:0;background:#eef4f6}
      main{max-width:820px;margin:32px auto;background:#fff;padding:42px;box-shadow:0 12px 40px #123d5218}
      header{display:flex;justify-content:space-between;border-bottom:2px solid #123d52;padding-bottom:22px}
      h1{margin:0;color:#123d52}.meta{display:grid;grid-template-columns:1fr 1fr;gap:14px 28px;margin:28px 0}
      small{display:block;color:#647983;text-transform:uppercase;font-weight:700}table{width:100%;border-collapse:collapse}
      th{background:#123d52;color:#fff;text-align:left;padding:10px}td{padding:10px;border-bottom:1px solid #dce7eb}
      .number{text-align:right}.totals{width:340px;margin:26px 0 0 auto}.total{font-size:18px;font-weight:700}
      footer{text-align:center;color:#647983;border-top:1px solid #dce7eb;margin-top:42px;padding-top:18px}
      @media print{body{background:#fff}main{margin:0;box-shadow:none;max-width:none}}
    </style>
  </head>
  <body>
    <main>
      <header><strong>CLEAN WASH</strong><div><h1>INVOICE</h1>${escapeHtml(document.invoiceNumber)}</div></header>
      <section class="meta">
        <div><small>Customer</small>${escapeHtml(document.customerName)}</div>
        <div><small>Invoice date</small>${escapeHtml(document.invoiceDate)}</div>
        <div><small>Email</small>${escapeHtml(document.customerEmail)}</div>
        <div><small>Booking</small>${escapeHtml(document.bookingId)}</div>
        <div><small>Phone</small>${escapeHtml(document.customerPhone)}</div>
        <div><small>Vehicle / plate</small>${escapeHtml(document.vehicle)} / ${escapeHtml(document.registrationNumber)}</div>
        <div><small>Address</small>${escapeHtml(document.customerAddress)}</div>
        <div><small>Appointment</small>${escapeHtml(document.appointment)}</div>
      </section>
      <table>
        <thead><tr><th>Description</th><th class="number">Qty</th><th class="number">Unit</th><th class="number">Total</th></tr></thead>
        <tbody>${document.lines
          .map(
            (line) =>
              `<tr><td>${escapeHtml(line.description)}</td><td class="number">${line.quantity}</td><td class="number">${line.unitPriceDkk} DKK</td><td class="number">${line.totalDkk} DKK</td></tr>`
          )
          .join("")}</tbody>
      </table>
      <table class="totals">
        <tr><td>Subtotal ex. VAT</td><td class="number">${document.subtotalExVatDkk} DKK</td></tr>
        <tr><td>VAT 25%</td><td class="number">${document.vatDkk} DKK</td></tr>
        <tr class="total"><td>Total</td><td class="number">${document.totalDkk} DKK</td></tr>
      </table>
      <footer>Clean Wash | Payment according to agreement</footer>
    </main>
  </body>
</html>`;

const mapInvoice = (row: RawSimpleInvoice, items: InvoiceItem[]): Invoice => ({
  id: toText(row.id),
  invoiceNumber: toText(row.invoice_number),
  bookingId: toText(row.booking_id),
  customerId: toText(row.customer_id),
  agentId: toText(row.agent_id),
  status:
    row.status === "generated" ||
    row.status === "sent" ||
    row.status === "paid" ||
    row.status === "cancelled"
      ? row.status
      : "draft",
  currency: toText(row.currency) || "DKK",
  subtotalExMomsDkk: Number(row.subtotal_ex_moms_dkk || 0),
  momsAmountDkk: Number(row.moms_amount_dkk || 0),
  totalInclMomsDkk: Number(row.total_incl_moms_dkk || row.total_amount || 0),
  pdfUrl: toText(row.pdf_url),
  pdfFileName: toText(row.pdf_file_name),
  pdfSizeBytes: Number(row.pdf_size_bytes || 0),
  customerEmail: toText(row.customer_email),
  sentToEmail: toText(row.sent_to_email),
  emailSent: Boolean(row.email_sent),
  emailSentAt: toDateText(row.email_sent_at),
  sentAt: toDateText(row.sent_at),
  paidAt: toDateText(row.paid_at),
  createdByUserId: toText(row.created_by_user_id),
  createdByRole:
    row.created_by_role === "admin" || row.created_by_role === "agent"
      ? row.created_by_role
      : "system",
  createdAt: toDateText(row.created_at),
  updatedAt: toDateText(row.updated_at),
  items,
});

const buildInvoiceItems = (
  invoiceId: string,
  sourceLines: RawLine[]
): InvoiceItem[] =>
  sourceLines.map((line) => ({
    id: toText(line.id) || createId("ini"),
    invoiceId,
    bookingLineItemId: toText(line.id),
    description: toText(line.description) || "Clean Wash service",
    quantity: Math.max(1, Number(line.quantity || 1)),
    unitPriceDkk: Math.max(0, Number(line.unit_price_dkk || 0)),
    lineTotalDkk: Math.max(0, Number(line.total_price_dkk || 0)),
    createdAt: new Date().toISOString(),
  }));

const createInvoiceData = (
  invoice: Invoice,
  lines: InvoiceItem[],
  summary: PriceSummary,
  booking: RawBooking,
  customer: RawCustomer
): BookingInvoiceData => ({
  booking: {
    id: booking.id,
    assignedAgentId: toText(booking.assigned_agent_id),
  } as BookingInvoiceData["booking"],
  customer: {
    id: customer.id,
    email: toText(customer.email),
    portalToken: toText(customer.portal_token),
  } as BookingInvoiceData["customer"],
  agent: null,
  lineItems: lines.map(
    (line): BookingLineItem => ({
      id: line.bookingLineItemId || line.id,
      bookingId: booking.id,
      agentId: "",
      agentName: "",
      createdByType: "system",
      itemType: "original_service",
      serviceId: "",
      description: line.description,
      quantity: line.quantity,
      unitPriceDkk: line.unitPriceDkk,
      totalPriceDkk: line.lineTotalDkk,
      isTaxIncluded: true,
      createdAt: line.createdAt,
      updatedAt: line.createdAt,
      lockedAt: "",
    })
  ),
  summary,
  invoice,
});

const saveFailure = async (invoiceId: string, error: unknown) => {
  try {
    const sql = getSql();
    await sql`
      UPDATE invoices
      SET last_error = ${safeErrorMessage(error)}, updated_at = NOW()
      WHERE id = ${invoiceId};
    `;
  } catch (storageError) {
    console.error("[invoice.simple] could not persist failure state", {
      invoiceId,
      message: safeErrorMessage(storageError),
    });
  }
};

export const runSimpleInvoiceWorkflow = async (input: {
  bookingId: string;
  actor: InvoiceActor;
  sendEmail: boolean;
  onStep?: (step: SimpleInvoiceStep) => void;
}) => {
  const setStep = (step: SimpleInvoiceStep) => {
    input.onStep?.(step);
    console.info("[invoice.simple] step", { step, bookingId: input.bookingId });
  };

  setStep("ensure-schema");
  try {
    await ensureSimpleInvoiceSchema();
  } catch (error) {
    console.error("[invoice.simple] schema preparation failed", {
      bookingId: input.bookingId,
      message: safeErrorMessage(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    if (error instanceof SimpleInvoiceWorkflowError) {
      throw error;
    }
    throw new SimpleInvoiceWorkflowError(
      "Invoice database schema could not be prepared.",
      "DATABASE_SCHEMA_FAILED",
      500
    );
  }

  setStep("load-booking");
  const loaded = await loadBooking(input.bookingId, input.actor);
  const sql = getSql();
  setStep("create-invoice-record");
  const [existing] = await sql<RawSimpleInvoice[]>`
    SELECT *
    FROM invoices
    WHERE booking_id = ${input.bookingId}
    ORDER BY created_at DESC
    LIMIT 1;
  `;
  const id = existing?.id || createId("inv");
  const number = existing?.invoice_number || (await getNextInvoiceNumber());
  const url = invoiceUrl(id);
  const fileName = invoiceFileName(number);
  const document = buildDocument(
    number,
    loaded.booking,
    loaded.customer,
    loaded.lines,
    loaded.summary
  );
  const htmlSnapshot = renderHtmlSnapshot(document);

  let draft: RawSimpleInvoice;
  try {
    if (existing) {
      [draft] = await sql<RawSimpleInvoice[]>`
        UPDATE invoices
        SET
          customer_id = ${loaded.customer.id},
          agent_id = ${input.actor.agentId || loaded.booking.assigned_agent_id || null},
          customer_email = ${loaded.customer.email},
          sent_to_email = ${loaded.customer.email},
          status = 'draft',
          subtotal_ex_moms_dkk = ${loaded.summary.subtotalExMomsDkk},
          moms_amount_dkk = ${loaded.summary.momsAmountDkk},
          total_incl_moms_dkk = ${loaded.summary.totalInclMomsDkk},
          total_amount = ${loaded.summary.totalInclMomsDkk},
          currency = 'DKK',
          pdf_url = ${url},
          pdf_file_name = ${fileName},
          html_snapshot = ${htmlSnapshot},
          email_sent = false,
          email_sent_at = NULL,
          last_error = NULL,
          created_by_user_id = ${input.actor.actorId},
          created_by_role = ${input.actor.actorType},
          updated_at = NOW()
        WHERE id = ${id}
        RETURNING *;
      `;
    } else {
      [draft] = await sql<RawSimpleInvoice[]>`
        INSERT INTO invoices (
          id,
          invoice_number,
          booking_id,
          customer_id,
          agent_id,
          customer_email,
          sent_to_email,
          status,
          subtotal_ex_moms_dkk,
          moms_amount_dkk,
          total_incl_moms_dkk,
          total_amount,
          currency,
          pdf_url,
          pdf_file_name,
          html_snapshot,
          created_by_user_id,
          created_by_role
        )
        VALUES (
          ${id},
          ${number},
          ${input.bookingId},
          ${loaded.customer.id},
          ${input.actor.agentId || loaded.booking.assigned_agent_id || null},
          ${loaded.customer.email},
          ${loaded.customer.email},
          'draft',
          ${loaded.summary.subtotalExMomsDkk},
          ${loaded.summary.momsAmountDkk},
          ${loaded.summary.totalInclMomsDkk},
          ${loaded.summary.totalInclMomsDkk},
          'DKK',
          ${url},
          ${fileName},
          ${htmlSnapshot},
          ${input.actor.actorId},
          ${input.actor.actorType}
        )
        RETURNING *;
      `;
    }
    if (!draft) {
      throw new Error("Draft invoice row was not returned.");
    }
  } catch (error) {
    console.error("[invoice.simple] invoice record creation failed", {
      bookingId: input.bookingId,
      invoiceId: id,
      message: safeErrorMessage(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    throw new SimpleInvoiceWorkflowError(
      "Invoice record could not be saved.",
      "INVOICE_STORAGE_FAILED",
      500,
      {
        invoiceId: id,
        invoiceNumber: number,
        invoiceUrl: url,
        invoiceHtmlUrl: `/api/invoices/${id}/html`,
      }
    );
  }

  try {
    await sql`DELETE FROM invoice_items WHERE invoice_id = ${id};`;
    for (const line of loaded.sourceLines) {
      await sql`
        INSERT INTO invoice_items (
          id,
          invoice_id,
          booking_line_item_id,
          description,
          quantity,
          unit_price_dkk,
          line_total_dkk
        )
        VALUES (
          ${createId("ini")},
          ${id},
          ${line.id || null},
          ${toText(line.description) || "Clean Wash service"},
          ${Math.max(1, Number(line.quantity || 1))},
          ${Math.max(0, Number(line.unit_price_dkk || 0))},
          ${Math.max(0, Number(line.total_price_dkk || 0))}
        );
      `;
    }
  } catch (error) {
    console.warn("[invoice.simple] compatibility line-item storage skipped", {
      bookingId: input.bookingId,
      invoiceId: id,
      message: safeErrorMessage(error),
    });
  }

  setStep("generate-pdf");
  let pdfBuffer: Buffer;
  try {
    pdfBuffer = await generateSimpleInvoicePdf(document);
    if (!isSimplePdfBuffer(pdfBuffer)) {
      throw new Error("PDF buffer failed signature or size validation.");
    }
  } catch (error) {
    await saveFailure(id, error);
    throw new SimpleInvoiceWorkflowError(
      "Invoice PDF could not be generated.",
      "PDF_GENERATION_FAILED",
      500,
      {
        invoiceId: id,
        invoiceNumber: number,
        invoiceUrl: url,
        invoiceHtmlUrl: `/api/invoices/${id}/html`,
      }
    );
  }

  setStep("store-pdf");
  let generated: RawSimpleInvoice;
  try {
    [generated] = await sql<RawSimpleInvoice[]>`
      UPDATE invoices
      SET
        pdf_data = ${pdfBuffer},
        pdf_mime_type = 'application/pdf',
        pdf_size_bytes = ${pdfBuffer.byteLength},
        status = 'generated',
        last_error = NULL,
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *;
    `;
    if (!generated) {
      throw new Error("Stored invoice row was not returned.");
    }
    await sql`
      UPDATE bookings
      SET
        invoice_requested = true,
        invoice_status = 'ready',
        invoice_number = ${number},
        updated_at = NOW()
      WHERE id = ${input.bookingId};
    `;
  } catch (error) {
    await saveFailure(id, error);
    throw new SimpleInvoiceWorkflowError(
      "Invoice PDF could not be stored.",
      "INVOICE_STORAGE_FAILED",
      500,
      {
        invoiceGenerated: true,
        invoiceId: id,
        invoiceNumber: number,
        invoiceUrl: url,
        invoiceHtmlUrl: `/api/invoices/${id}/html`,
      }
    );
  }

  const invoiceItems = buildInvoiceItems(id, loaded.sourceLines);
  const generatedInvoice = mapInvoice(generated, invoiceItems);
  const generatedData = createInvoiceData(
    generatedInvoice,
    invoiceItems,
    loaded.summary,
    loaded.booking,
    loaded.customer
  );

  if (!input.sendEmail) {
    setStep("done");
    return {
      invoice: generatedInvoice,
      data: generatedData,
      assignedAgentId: toText(loaded.booking.assigned_agent_id),
      portalToken: toText(loaded.customer.portal_token),
      sent: false as const,
      emailAttempted: false as const,
    };
  }

  setStep("send-email");
  const emailFailure = async (code: string, message: string, error?: unknown) => {
    await saveFailure(id, error || message);
    return {
      invoice: generatedInvoice,
      data: generatedData,
      assignedAgentId: toText(loaded.booking.assigned_agent_id),
      portalToken: toText(loaded.customer.portal_token),
      sent: false as const,
      emailAttempted: true as const,
      deliveryError: new SimpleInvoiceWorkflowError(message, code, 502, {
        invoiceGenerated: true,
        invoiceStored: true,
        invoiceId: id,
        invoiceNumber: number,
        invoiceUrl: url,
      }),
    };
  };

  if (!loaded.customer.email) {
    return emailFailure("CUSTOMER_EMAIL_MISSING", "Customer email is missing.");
  }
  if (!isMailConfigured()) {
    return emailFailure(
      "SMTP_CONFIG_MISSING",
      "Invoice was generated and saved, but email is not configured."
    );
  }

  try {
    const baseUrl = getAppUrl(siteConfig.url) || siteConfig.url;
    const publicUrl = new URL(url, baseUrl);
    if (loaded.customer.portal_token) {
      publicUrl.searchParams.set("token", loaded.customer.portal_token);
    }
    const sendStatus = await sendCustomerInvoiceEmail({
      bookingId: input.bookingId,
      customerId: loaded.customer.id,
      customerName:
        [loaded.customer.first_name, loaded.customer.last_name]
          .filter(Boolean)
          .join(" ") || toText(loaded.customer.email),
      customerEmail: loaded.customer.email,
      invoiceNumber: number,
      totalInclMomsDkk: loaded.summary.totalInclMomsDkk,
      appointmentLabel: document.appointment,
      invoiceUrl: publicUrl.toString(),
      pdfBuffer,
      settings: {
        companyName: "Clean Wash",
        supportEmail: siteConfig.email,
        adminNotifyEmail: "",
      },
    });
    if (sendStatus !== "sent") {
      return emailFailure(
        "EMAIL_SEND_FAILED",
        "Invoice was generated and saved, but email could not be sent."
      );
    }

    const [sentRow] = await sql<RawSimpleInvoice[]>`
      UPDATE invoices
      SET
        status = 'sent',
        email_sent = true,
        email_sent_at = NOW(),
        sent_at = COALESCE(sent_at, NOW()),
        last_error = NULL,
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *;
    `;
    await sql`
      UPDATE bookings
      SET invoice_status = 'sent', updated_at = NOW()
      WHERE id = ${input.bookingId};
    `;
    try {
      await sql`
        UPDATE booking_line_items
        SET locked_at = COALESCE(locked_at, NOW()), updated_at = NOW()
        WHERE booking_id = ${input.bookingId};
      `;
    } catch {
      // Locking legacy line items is non-critical after invoice/email success.
    }

    const sentInvoice = mapInvoice(sentRow, invoiceItems);
    setStep("done");
    return {
      invoice: sentInvoice,
      data: createInvoiceData(
        sentInvoice,
        invoiceItems,
        loaded.summary,
        loaded.booking,
        loaded.customer
      ),
      assignedAgentId: toText(loaded.booking.assigned_agent_id),
      portalToken: toText(loaded.customer.portal_token),
      sent: true as const,
      emailAttempted: true as const,
    };
  } catch (error) {
    console.error("[invoice.simple] email failed after PDF storage", {
      bookingId: input.bookingId,
      invoiceId: id,
      message: safeErrorMessage(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return emailFailure(
      "EMAIL_SEND_FAILED",
      "Invoice was generated and saved, but email could not be sent.",
      error
    );
  }
};

export const getSimpleInvoiceRecord = async (invoiceId: string) => {
  await ensureSimpleInvoiceSchema();
  const sql = getSql();
  const [row] = await sql<RawSimpleInvoice[]>`
    SELECT *
    FROM invoices
    WHERE id = ${invoiceId}
    LIMIT 1;
  `;
  return row || null;
};

export const getSimpleInvoicePdf = async (invoiceId: string) => {
  const row = await getSimpleInvoiceRecord(invoiceId);
  if (!row?.pdf_data) {
    return null;
  }
  const buffer = Buffer.isBuffer(row.pdf_data)
    ? row.pdf_data
    : Buffer.from(row.pdf_data);
  if (!isSimplePdfBuffer(buffer)) {
    return null;
  }
  return {
    invoiceId: row.id,
    invoiceNumber: row.invoice_number,
    bookingId: row.booking_id,
    customerId: toText(row.customer_id),
    fileName: row.pdf_file_name || invoiceFileName(row.invoice_number),
    contentType: row.pdf_mime_type || "application/pdf",
    buffer,
  };
};

export const getSimpleInvoiceHtml = async (invoiceId: string) => {
  const row = await getSimpleInvoiceRecord(invoiceId);
  if (!row?.html_snapshot) {
    return null;
  }
  return {
    invoiceId: row.id,
    bookingId: row.booking_id,
    customerId: toText(row.customer_id),
    html: row.html_snapshot,
  };
};

export const canAgentAccessSimpleInvoice = async (
  bookingId: string,
  agentId: string
) => {
  const sql = getSql();
  const [row] = await sql<{ allowed: boolean }[]>`
    SELECT (assigned_agent_id = ${agentId}) AS allowed
    FROM bookings
    WHERE id = ${bookingId}
    LIMIT 1;
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
    FROM customers
    WHERE id = ${customerId}
    LIMIT 1;
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
      pdfDataColumnExists: false,
      pdfDataColumnType: "",
      errorCode: "DATABASE_CONNECTION_FAILED",
    };
  }

  const sql = getSql();
  let databaseConnected = false;
  let errorCode = "";
  try {
    await sql`SELECT 1;`;
    databaseConnected = true;
    await ensureSimpleInvoiceSchema();
  } catch (error) {
    errorCode = toText((error as { code?: unknown })?.code) || "DATABASE_SCHEMA_FAILED";
    console.error("[invoice.simple.diagnostics] failed", {
      message: safeErrorMessage(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
  }

  let columns: InvoiceSchemaColumn[] = [];
  if (databaseConnected) {
    columns = await sql<InvoiceSchemaColumn[]>`
      SELECT column_name, udt_name
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'invoices';
    `;
  }
  const pdfData = columns.find((column) => column.column_name === "pdf_data");

  return {
    hasDatabaseUrl,
    databaseConnected,
    invoicesTableExists: columns.length > 0,
    pdfDataColumnExists: Boolean(pdfData),
    pdfDataColumnType: pdfData?.udt_name || "",
    errorCode,
  };
};
