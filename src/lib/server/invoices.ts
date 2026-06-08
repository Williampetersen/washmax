import { randomBytes } from "node:crypto";
import { siteConfig } from "@/lib/site";
import { getSql, isDatabaseConfigured } from "@/lib/server/db";
import { getAgentById, type Agent } from "@/lib/server/agents";
import {
  getBookingById,
  getBookingSettings,
  type BookingCustomer,
  type DashboardBooking,
} from "@/lib/server/bookings";
import {
  sendAdminInvoiceNotice,
  sendCustomerInvoiceEmail,
} from "@/lib/server/mail";
import { renderInvoiceHtml } from "@/server/invoices/renderInvoiceHtml";

export const bookingLineItemTypes = [
  "original_service",
  "existing_extra_service",
  "manual_extra_charge",
] as const;
export type BookingLineItemType = (typeof bookingLineItemTypes)[number];

export const invoiceStatuses = [
  "draft",
  "ready",
  "sent",
  "paid",
  "cancelled",
] as const;
export type InvoiceStatus = (typeof invoiceStatuses)[number];
export type InvoiceActorType = "admin" | "agent" | "system";

type RawLineItem = {
  id: string;
  booking_id: string;
  agent_id: string | null;
  created_by_type: InvoiceActorType;
  item_type: BookingLineItemType;
  service_id: string | null;
  description: string;
  quantity: number;
  unit_price_dkk: number;
  total_price_dkk: number;
  is_tax_included: boolean;
  created_at: string | Date;
  updated_at: string | Date;
  locked_at: string | Date | null;
  agent_full_name?: string | null;
};

type RawInvoice = {
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
  invoice_subject: string | null;
  invoice_notes: string | null;
  created_by_role: string | null;
  created_by_id: string | null;
  customer_email: string | null;
  public_token: string | null;
  pdf_url: string | null;
  sent_to_email: string | null;
  email_sent: boolean | null;
  email_sent_at: string | Date | null;
  last_error: string | null;
  sent_at: string | Date | null;
  paid_at: string | Date | null;
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

export type BookingLineItem = {
  id: string;
  bookingId: string;
  agentId: string;
  agentName: string;
  createdByType: InvoiceActorType;
  itemType: BookingLineItemType;
  serviceId: string;
  description: string;
  quantity: number;
  unitPriceDkk: number;
  totalPriceDkk: number;
  isTaxIncluded: boolean;
  createdAt: string;
  updatedAt: string;
  lockedAt: string;
};

export type InvoiceItem = {
  id: string;
  invoiceId: string;
  bookingLineItemId: string;
  description: string;
  quantity: number;
  unitPriceDkk: number;
  lineTotalDkk: number;
  createdAt: string;
};

export type Invoice = {
  id: string;
  invoiceNumber: string;
  bookingId: string;
  customerId: string;
  agentId: string;
  status: InvoiceStatus;
  currency: string;
  subtotalExMomsDkk: number;
  momsAmountDkk: number;
  totalInclMomsDkk: number;
  invoiceHtml: string;
  invoiceSubject: string;
  invoiceNotes: string;
  createdByRole: InvoiceActorType;
  createdById: string;
  customerEmail: string;
  publicToken: string;
  publicUrl: string;
  pdfUrl: string;
  sentToEmail: string;
  emailSent: boolean;
  emailSentAt: string;
  lastError: string;
  sentAt: string;
  paidAt: string;
  createdAt: string;
  updatedAt: string;
  items: InvoiceItem[];
};

export type PriceSummary = {
  originalBookingPriceDkk: number;
  existingExtraServicesDkk: number;
  manualExtraChargesDkk: number;
  totalInclMomsDkk: number;
  momsAmountDkk: number;
  subtotalExMomsDkk: number;
};

export type BookingInvoiceData = {
  booking: DashboardBooking;
  customer: BookingCustomer;
  agent: Agent | null;
  lineItems: BookingLineItem[];
  summary: PriceSummary;
  invoice: Invoice | null;
};

export type InvoiceActor = {
  actorType: "admin" | "agent";
  actorId?: string;
  agentId?: string;
};

export type InvoicePatch = {
  customerEmail?: string;
  invoiceNotes?: string;
  notes?: string;
  status?: InvoiceStatus;
  manualLines?: Array<{
    id?: string;
    description: string;
    quantity: number;
    unitPriceDkk?: number;
    unitPrice?: number;
  }>;
};

export class InvoiceWorkflowError extends Error {
  statusCode: number;
  code: string;

  constructor(message: string, statusCode = 400, code = "INVOICE_ERROR") {
    super(message);
    this.name = "InvoiceWorkflowError";
    this.statusCode = statusCode;
    this.code = code;
  }
}

const createId = (prefix: string) => `${prefix}_${randomBytes(10).toString("hex")}`;
const createPublicToken = () => randomBytes(32).toString("base64url");
const text = (value: unknown) => String(value ?? "").trim();
const dateText = (value: unknown) =>
  value instanceof Date ? value.toISOString() : text(value);
const normalizeQuantity = (value: unknown) =>
  Math.max(1, Math.round(Number(value || 1)));
const normalizePrice = (value: unknown) =>
  Math.max(0, Math.round(Number(value || 0)));
const baseUrl = () =>
  process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || "https://cleanwash.dk";
const publicPath = (token: string) => (token ? `/invoices/${token}` : "");

const normalizeStatus = (status: string): InvoiceStatus => {
  if (status === "generated") return "ready";
  return invoiceStatuses.includes(status as InvoiceStatus)
    ? (status as InvoiceStatus)
    : "draft";
};

let invoiceSchemaPromise: Promise<void> | null = null;

const applyInvoiceSchema = async () => {
  if (!isDatabaseConfigured()) {
    throw new InvoiceWorkflowError(
      "Invoice storage is not configured.",
      500,
      "DATABASE_NOT_CONFIGURED"
    );
  }
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id TEXT PRIMARY KEY,
      invoice_number TEXT NOT NULL UNIQUE,
      booking_id TEXT NOT NULL,
      customer_id TEXT,
      agent_id TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      currency TEXT NOT NULL DEFAULT 'DKK',
      subtotal_ex_moms_dkk INTEGER NOT NULL DEFAULT 0,
      moms_amount_dkk INTEGER NOT NULL DEFAULT 0,
      total_incl_moms_dkk INTEGER NOT NULL DEFAULT 0,
      invoice_html TEXT,
      invoice_subject TEXT,
      invoice_notes TEXT,
      created_by_role TEXT DEFAULT 'system',
      created_by_id TEXT,
      customer_email TEXT,
      public_token TEXT,
      sent_to_email TEXT,
      email_sent BOOLEAN DEFAULT FALSE,
      email_sent_at TIMESTAMPTZ,
      last_error TEXT,
      sent_at TIMESTAMPTZ,
      paid_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  await sql`
    ALTER TABLE invoices
      ADD COLUMN IF NOT EXISTS invoice_html TEXT,
      ADD COLUMN IF NOT EXISTS invoice_subject TEXT,
      ADD COLUMN IF NOT EXISTS invoice_notes TEXT,
      ADD COLUMN IF NOT EXISTS created_by_role TEXT DEFAULT 'system',
      ADD COLUMN IF NOT EXISTS created_by_id TEXT,
      ADD COLUMN IF NOT EXISTS customer_email TEXT,
      ADD COLUMN IF NOT EXISTS public_token TEXT,
      ADD COLUMN IF NOT EXISTS subtotal_amount INTEGER NOT NULL DEFAULT 0,
      ADD COLUMN IF NOT EXISTS vat_amount INTEGER NOT NULL DEFAULT 0,
      ADD COLUMN IF NOT EXISTS total_amount INTEGER NOT NULL DEFAULT 0,
      ADD COLUMN IF NOT EXISTS email_sent BOOLEAN DEFAULT FALSE,
      ADD COLUMN IF NOT EXISTS email_sent_at TIMESTAMPTZ,
      ADD COLUMN IF NOT EXISTS last_error TEXT;
  `;
  await sql`
    UPDATE invoices
    SET
      status = CASE WHEN status = 'generated' THEN 'ready' ELSE status END,
      subtotal_amount = COALESCE(NULLIF(subtotal_amount, 0), subtotal_ex_moms_dkk, 0),
      vat_amount = COALESCE(NULLIF(vat_amount, 0), moms_amount_dkk, 0),
      total_amount = COALESCE(NULLIF(total_amount, 0), total_incl_moms_dkk, 0),
      public_token = COALESCE(
        NULLIF(public_token, ''),
        MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT || id) ||
        MD5(id || CLOCK_TIMESTAMP()::TEXT || RANDOM()::TEXT)
      );
  `;
  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS invoices_public_token_unique_idx
    ON invoices (public_token);
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
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS invoice_sequences (
      sequence_year INTEGER PRIMARY KEY,
      last_number INTEGER NOT NULL DEFAULT 0
    );
  `;
};

export const ensureInvoiceSchema = async () => {
  if (!invoiceSchemaPromise) {
    invoiceSchemaPromise = applyInvoiceSchema();
  }

  try {
    await invoiceSchemaPromise;
  } catch (error) {
    invoiceSchemaPromise = null;
    throw error;
  }
};

const lineItemFromRow = (row: RawLineItem): BookingLineItem => ({
  id: text(row.id),
  bookingId: text(row.booking_id),
  agentId: text(row.agent_id),
  agentName: text(row.agent_full_name),
  createdByType:
    row.created_by_type === "agent"
      ? "agent"
      : row.created_by_type === "admin"
        ? "admin"
        : "system",
  itemType: bookingLineItemTypes.includes(row.item_type)
    ? row.item_type
    : "manual_extra_charge",
  serviceId: text(row.service_id),
  description: text(row.description),
  quantity: Number(row.quantity || 1),
  unitPriceDkk: Number(row.unit_price_dkk || 0),
  totalPriceDkk: Number(row.total_price_dkk || 0),
  isTaxIncluded: row.is_tax_included !== false,
  createdAt: dateText(row.created_at),
  updatedAt: dateText(row.updated_at),
  lockedAt: dateText(row.locked_at),
});

const invoiceItemFromRow = (row: RawInvoiceItem): InvoiceItem => ({
  id: text(row.id),
  invoiceId: text(row.invoice_id),
  bookingLineItemId: text(row.booking_line_item_id),
  description: text(row.description),
  quantity: Number(row.quantity || 1),
  unitPriceDkk: Number(row.unit_price_dkk || 0),
  lineTotalDkk: Number(row.line_total_dkk || 0),
  createdAt: dateText(row.created_at),
});

const invoiceFromRow = (
  row: RawInvoice,
  items: InvoiceItem[] = []
): Invoice => {
  const token = text(row.public_token);
  const url = publicPath(token);
  return {
    id: text(row.id),
    invoiceNumber: text(row.invoice_number),
    bookingId: text(row.booking_id),
    customerId: text(row.customer_id),
    agentId: text(row.agent_id),
    status: normalizeStatus(row.status),
    currency: text(row.currency) || "DKK",
    subtotalExMomsDkk: Number(row.subtotal_amount ?? row.subtotal_ex_moms_dkk ?? 0),
    momsAmountDkk: Number(row.vat_amount ?? row.moms_amount_dkk ?? 0),
    totalInclMomsDkk: Number(row.total_amount ?? row.total_incl_moms_dkk ?? 0),
    invoiceHtml: text(row.invoice_html),
    invoiceSubject: text(row.invoice_subject),
    invoiceNotes: text(row.invoice_notes),
    createdByRole:
      row.created_by_role === "admin" || row.created_by_role === "agent"
        ? row.created_by_role
        : "system",
    createdById: text(row.created_by_id),
    customerEmail: text(row.customer_email),
    publicToken: token,
    publicUrl: url,
    pdfUrl: url || text(row.pdf_url),
    sentToEmail: text(row.sent_to_email),
    emailSent: Boolean(row.email_sent),
    emailSentAt: dateText(row.email_sent_at),
    lastError: text(row.last_error),
    sentAt: dateText(row.sent_at),
    paidAt: dateText(row.paid_at),
    createdAt: dateText(row.created_at),
    updatedAt: dateText(row.updated_at),
    items,
  };
};

export const calculatePriceSummary = (
  lineItems: BookingLineItem[]
): PriceSummary => {
  const originalBookingPriceDkk = lineItems
    .filter((item) => item.itemType === "original_service")
    .reduce((sum, item) => sum + item.totalPriceDkk, 0);
  const existingExtraServicesDkk = lineItems
    .filter((item) => item.itemType === "existing_extra_service")
    .reduce((sum, item) => sum + item.totalPriceDkk, 0);
  const manualExtraChargesDkk = lineItems
    .filter((item) => item.itemType === "manual_extra_charge")
    .reduce((sum, item) => sum + item.totalPriceDkk, 0);
  const totalInclMomsDkk =
    originalBookingPriceDkk +
    existingExtraServicesDkk +
    manualExtraChargesDkk;
  const momsAmountDkk = Math.round(totalInclMomsDkk * 0.2);
  return {
    originalBookingPriceDkk,
    existingExtraServicesDkk,
    manualExtraChargesDkk,
    totalInclMomsDkk,
    momsAmountDkk,
    subtotalExMomsDkk: totalInclMomsDkk - momsAmountDkk,
  };
};

const summaryFromInvoiceItems = (items: InvoiceItem[]): PriceSummary => {
  const total = items.reduce((sum, item) => sum + item.lineTotalDkk, 0);
  const vat = Math.round(total * 0.2);
  return {
    originalBookingPriceDkk: items[0]?.lineTotalDkk || total,
    existingExtraServicesDkk: 0,
    manualExtraChargesDkk: Math.max(
      0,
      total - (items[0]?.lineTotalDkk || 0)
    ),
    totalInclMomsDkk: total,
    momsAmountDkk: vat,
    subtotalExMomsDkk: total - vat,
  };
};

const ensureOriginalLineItem = async (bookingId: string) => {
  await ensureInvoiceSchema();
  const sql = getSql();
  const [existing] = await sql<{ count: string }[]>`
    SELECT COUNT(*)::text AS count
    FROM booking_line_items
    WHERE booking_id = ${bookingId}
      AND item_type = 'original_service';
  `;
  if (Number(existing?.count || 0) > 0) return;

  const result = await getBookingById(bookingId);
  if (!result) {
    throw new InvoiceWorkflowError("Booking was not found.", 404, "BOOKING_NOT_FOUND");
  }
  const { booking } = result;
  const addonText = booking.addons.length
    ? ` inkl. ${booking.addons.map((item) => item.label).join(", ")}`
    : "";
  const description =
    `${booking.packageLabel || "Original booking"}${booking.category ? ` - ${booking.category}` : ""}${addonText}`.trim();
  await sql`
    INSERT INTO booking_line_items (
      id, booking_id, created_by_type, item_type, service_id, description,
      quantity, unit_price_dkk, total_price_dkk, is_tax_included
    )
    VALUES (
      ${createId("bli")}, ${bookingId}, 'system', 'original_service',
      ${booking.packageId || null}, ${description || "Original booking"},
      1, ${booking.total}, ${booking.total}, true
    );
  `;
};

export const listBookingLineItems = async (bookingId: string) => {
  if (!isDatabaseConfigured()) return [];
  await ensureOriginalLineItem(bookingId);
  const sql = getSql();
  const rows = await sql<RawLineItem[]>`
    SELECT bli.*, a.full_name AS agent_full_name
    FROM booking_line_items bli
    LEFT JOIN agents a ON a.id = bli.agent_id
    WHERE bli.booking_id = ${bookingId}
    ORDER BY
      CASE WHEN bli.item_type = 'original_service' THEN 0 ELSE 1 END,
      bli.created_at ASC;
  `;
  return rows.map(lineItemFromRow);
};

export const assertAgentOwnsBooking = async (
  bookingId: string,
  agentId: string
) => {
  const result = await getBookingById(bookingId);
  if (!result || result.booking.assignedAgentId !== agentId) {
    throw new InvoiceWorkflowError(
      "Booking is not assigned to this agent.",
      403,
      "FORBIDDEN"
    );
  }
  return result;
};

const loadInvoiceItems = async (invoiceId: string) => {
  const sql = getSql();
  const rows = await sql<RawInvoiceItem[]>`
    SELECT * FROM invoice_items
    WHERE invoice_id = ${invoiceId}
    ORDER BY created_at ASC;
  `;
  return rows.map(invoiceItemFromRow);
};

const latestInvoiceForBooking = async (bookingId: string) => {
  await ensureInvoiceSchema();
  const sql = getSql();
  const [row] = await sql<RawInvoice[]>`
    SELECT * FROM invoices
    WHERE booking_id = ${bookingId}
    ORDER BY created_at DESC
    LIMIT 1;
  `;
  if (!row) return null;
  return invoiceFromRow(row, await loadInvoiceItems(row.id));
};

const assertEditableLineItems = async (
  bookingId: string,
  actorType: "admin" | "agent"
) => {
  const invoice = await latestInvoiceForBooking(bookingId);
  if (invoice && ["sent", "paid"].includes(invoice.status)) {
    throw new InvoiceWorkflowError(
      actorType === "agent"
        ? "Invoice has already been sent."
        : "Sent or paid invoice lines are locked.",
      409,
      "INVOICE_LOCKED"
    );
  }
};

export const addBookingLineItem = async (input: {
  bookingId: string;
  actorType: "admin" | "agent";
  agentId?: string;
  itemType: "existing_extra_service" | "manual_extra_charge";
  serviceId?: string;
  description: string;
  quantity: number;
  unitPriceDkk: number;
}) => {
  await ensureInvoiceSchema();
  if (input.actorType === "agent") {
    await assertAgentOwnsBooking(input.bookingId, input.agentId || "");
  }
  await assertEditableLineItems(input.bookingId, input.actorType);
  const quantity = normalizeQuantity(input.quantity);
  const unitPriceDkk = normalizePrice(input.unitPriceDkk);
  const sql = getSql();
  const [row] = await sql<RawLineItem[]>`
    INSERT INTO booking_line_items (
      id, booking_id, agent_id, created_by_type, item_type, service_id,
      description, quantity, unit_price_dkk, total_price_dkk, is_tax_included
    )
    VALUES (
      ${createId("bli")}, ${input.bookingId}, ${input.agentId || null},
      ${input.actorType}, ${input.itemType}, ${input.serviceId || null},
      ${input.description.trim()}, ${quantity}, ${unitPriceDkk},
      ${quantity * unitPriceDkk}, true
    )
    RETURNING *;
  `;
  return lineItemFromRow(row);
};

export const updateBookingLineItem = async (
  bookingId: string,
  itemId: string,
  input: {
    actorType: "admin" | "agent";
    agentId?: string;
    description: string;
    quantity: number;
    unitPriceDkk: number;
  }
) => {
  await ensureInvoiceSchema();
  if (input.actorType === "agent") {
    await assertAgentOwnsBooking(bookingId, input.agentId || "");
  }
  await assertEditableLineItems(bookingId, input.actorType);
  const quantity = normalizeQuantity(input.quantity);
  const unitPriceDkk = normalizePrice(input.unitPriceDkk);
  const sql = getSql();
  const [row] = await sql<RawLineItem[]>`
    UPDATE booking_line_items
    SET description = ${input.description.trim()}, quantity = ${quantity},
      unit_price_dkk = ${unitPriceDkk},
      total_price_dkk = ${quantity * unitPriceDkk}, updated_at = NOW()
    WHERE id = ${itemId}
      AND booking_id = ${bookingId}
      AND item_type <> 'original_service'
      AND (${input.actorType} = 'admin' OR (agent_id = ${input.agentId || ""} AND locked_at IS NULL))
    RETURNING *;
  `;
  if (!row) {
    throw new InvoiceWorkflowError(
      "Line item was not found or is locked.",
      404,
      "LINE_ITEM_NOT_FOUND"
    );
  }
  return lineItemFromRow(row);
};

export const deleteBookingLineItem = async (
  bookingId: string,
  itemId: string,
  input: { actorType: "admin" | "agent"; agentId?: string }
) => {
  await ensureInvoiceSchema();
  if (input.actorType === "agent") {
    await assertAgentOwnsBooking(bookingId, input.agentId || "");
  }
  await assertEditableLineItems(bookingId, input.actorType);
  const sql = getSql();
  await sql`
    DELETE FROM booking_line_items
    WHERE id = ${itemId}
      AND booking_id = ${bookingId}
      AND item_type <> 'original_service'
      AND (${input.actorType} = 'admin' OR (agent_id = ${input.agentId || ""} AND locked_at IS NULL));
  `;
};

const getNextInvoiceNumber = async () => {
  const sql = getSql();
  const year = new Date().getFullYear();
  const [maximum] = await sql<{ max_number: number }[]>`
    SELECT COALESCE(
      MAX(
        CASE WHEN invoice_number ~ ${`^CW-${year}-[0-9]+$`}
          THEN SPLIT_PART(invoice_number, '-', 3)::INTEGER ELSE 0 END
      ), 0
    )::INTEGER AS max_number
    FROM invoices;
  `;
  await sql`
    INSERT INTO invoice_sequences (sequence_year, last_number)
    VALUES (${year}, ${Number(maximum?.max_number || 0)})
    ON CONFLICT (sequence_year) DO NOTHING;
  `;
  const [sequence] = await sql<{ last_number: number }[]>`
    UPDATE invoice_sequences
    SET last_number = GREATEST(last_number, ${Number(maximum?.max_number || 0)}) + 1
    WHERE sequence_year = ${year}
    RETURNING last_number;
  `;
  return `CW-${year}-${Number(sequence.last_number).toString().padStart(6, "0")}`;
};

export const getBookingInvoiceData = async (
  bookingId: string
): Promise<BookingInvoiceData | null> => {
  const result = await getBookingById(bookingId);
  if (!result) return null;
  const lineItems = await listBookingLineItems(bookingId);
  const invoice = await latestInvoiceForBooking(bookingId);
  const agent = result.booking.assignedAgentId
    ? await getAgentById(result.booking.assignedAgentId)
    : null;
  return {
    booking: result.booking,
    customer: result.customer,
    agent,
    lineItems,
    summary: calculatePriceSummary(lineItems),
    invoice,
  };
};

const renderAndStoreInvoice = async (
  row: RawInvoice,
  items: InvoiceItem[],
  data: BookingInvoiceData
) => {
  const summary = summaryFromInvoiceItems(items);
  const settings = await getBookingSettings();
  const customerName =
    [data.customer.firstName, data.customer.lastName].filter(Boolean).join(" ") ||
    data.customer.email;
  const html = renderInvoiceHtml({
    invoiceNumber: row.invoice_number,
    invoiceDate: new Intl.DateTimeFormat("da-DK").format(
      new Date(row.created_at || Date.now())
    ),
    status: normalizeStatus(row.status),
    companyName: settings.companyName || siteConfig.name,
    companyEmail: settings.supportEmail || siteConfig.email,
    companyPhone: process.env.COMPANY_PHONE || siteConfig.phoneDisplay,
    companyAddress: process.env.COMPANY_ADDRESS || "",
    companyCvr: process.env.COMPANY_CVR || "",
    customerName,
    customerEmail: text(row.customer_email || data.customer.email),
    customerPhone: data.customer.phone,
    customerAddress: [
      data.customer.address,
      [data.customer.postalCode, data.customer.city].filter(Boolean).join(" "),
    ]
      .filter(Boolean)
      .join(", "),
    bookingId: data.booking.id,
    vehicle: data.booking.vehicleName,
    registrationNumber: data.booking.registrationNumber,
    service:
      [data.booking.packageLabel, data.booking.category]
        .filter(Boolean)
        .join(" - ") || "Bilrengøring",
    appointment: data.booking.appointmentLabel,
    lines: items.map((item) => ({
      description: item.description,
      quantity: item.quantity,
      unitPriceDkk: item.unitPriceDkk,
      totalDkk: item.lineTotalDkk,
    })),
    subtotalExVatDkk: summary.subtotalExMomsDkk,
    vatDkk: summary.momsAmountDkk,
    totalDkk: summary.totalInclMomsDkk,
    notes: text(row.invoice_notes),
    paymentInstructions:
      process.env.INVOICE_PAYMENT_INSTRUCTIONS ||
      "Betaling sker efter aftale med WashMax.",
  });
  const sql = getSql();
  const [stored] = await sql<RawInvoice[]>`
    UPDATE invoices
    SET invoice_html = ${html},
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
  return {
    invoice: invoiceFromRow(stored, items),
    summary,
  };
};

const assertActorCanAccessInvoice = async (
  invoice: Invoice,
  actor: InvoiceActor
) => {
  if (actor.actorType === "admin") return;
  const result = await getBookingById(invoice.bookingId);
  if (
    !result ||
    (result.booking.assignedAgentId !== actor.agentId &&
      invoice.createdById !== actor.actorId)
  ) {
    throw new InvoiceWorkflowError("Forbidden.", 403, "FORBIDDEN");
  }
};

export const generateInvoiceForBooking = async (input: {
  bookingId: string;
  actorType: "admin" | "agent";
  actorId?: string;
  agentId?: string;
}) => {
  await ensureInvoiceSchema();
  if (input.actorType === "agent") {
    await assertAgentOwnsBooking(input.bookingId, input.agentId || "");
  }
  const data = await getBookingInvoiceData(input.bookingId);
  if (!data) {
    throw new InvoiceWorkflowError("Booking was not found.", 404, "BOOKING_NOT_FOUND");
  }
  if (data.invoice && ["sent", "paid"].includes(data.invoice.status)) {
    return { invoice: data.invoice, data };
  }

  const sql = getSql();
  const existing = data.invoice;
  const id = existing?.id || createId("inv");
  const invoiceNumber = existing?.invoiceNumber || (await getNextInvoiceNumber());
  const publicToken = existing?.publicToken || createPublicToken();
  const subject =
    existing?.invoiceSubject ||
    `${(await getBookingSettings()).companyName}: faktura ${invoiceNumber}`;
  let row: RawInvoice;
  if (existing) {
    [row] = await sql<RawInvoice[]>`
      UPDATE invoices
      SET customer_id = ${data.customer.id},
        agent_id = ${input.agentId || data.booking.assignedAgentId || null},
        status = 'draft',
        invoice_subject = ${subject},
        customer_email = ${data.customer.email},
        sent_to_email = ${data.customer.email},
        public_token = ${publicToken},
        created_by_role = ${input.actorType},
        created_by_id = ${input.actorId || input.agentId || input.actorType},
        last_error = NULL,
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *;
    `;
  } else {
    [row] = await sql<RawInvoice[]>`
      INSERT INTO invoices (
        id, invoice_number, booking_id, customer_id, agent_id, status,
        currency, invoice_subject, customer_email, sent_to_email, public_token,
        created_by_role, created_by_id
      )
      VALUES (
        ${id}, ${invoiceNumber}, ${input.bookingId}, ${data.customer.id},
        ${input.agentId || data.booking.assignedAgentId || null}, 'draft', 'DKK',
        ${subject}, ${data.customer.email}, ${data.customer.email}, ${publicToken},
        ${input.actorType}, ${input.actorId || input.agentId || input.actorType}
      )
      RETURNING *;
    `;
  }

  await sql`DELETE FROM invoice_items WHERE invoice_id = ${id};`;
  for (const item of data.lineItems) {
    await sql`
      INSERT INTO invoice_items (
        id, invoice_id, booking_line_item_id, description, quantity,
        unit_price_dkk, line_total_dkk
      )
      VALUES (
        ${createId("ini")}, ${id}, ${item.id}, ${item.description},
        ${item.quantity}, ${item.unitPriceDkk}, ${item.totalPriceDkk}
      );
    `;
  }
  const items = await loadInvoiceItems(id);
  const rendered = await renderAndStoreInvoice(row, items, {
    ...data,
    invoice: invoiceFromRow(row, items),
  });
  await sql`
    UPDATE bookings
    SET invoice_requested = true, invoice_status = 'ready',
      invoice_number = ${invoiceNumber}, updated_at = NOW()
    WHERE id = ${input.bookingId};
  `;
  const resultData = {
    ...data,
    summary: rendered.summary,
    invoice: rendered.invoice,
  };
  return { invoice: rendered.invoice, data: resultData };
};

export const getInvoiceById = async (invoiceId: string) => {
  if (!isDatabaseConfigured()) return null;
  await ensureInvoiceSchema();
  const sql = getSql();
  const [row] = await sql<RawInvoice[]>`
    SELECT * FROM invoices WHERE id = ${invoiceId} LIMIT 1;
  `;
  if (!row) return null;
  return invoiceFromRow(row, await loadInvoiceItems(row.id));
};

export const updateInvoiceDetails = async (
  invoiceId: string,
  actor: InvoiceActor,
  patch: InvoicePatch
) => {
  const current = await getInvoiceById(invoiceId);
  if (!current) {
    throw new InvoiceWorkflowError("Invoice was not found.", 404, "INVOICE_NOT_FOUND");
  }
  await assertActorCanAccessInvoice(current, actor);
  if (
    ["sent", "paid"].includes(current.status) &&
    (patch.manualLines || patch.customerEmail !== undefined)
  ) {
    throw new InvoiceWorkflowError(
      "Sent or paid invoice prices and recipient are locked.",
      409,
      "INVOICE_LOCKED"
    );
  }
  if (actor.actorType === "agent" && patch.status === "paid") {
    throw new InvoiceWorkflowError(
      "Only an admin can mark an invoice as paid.",
      403,
      "ADMIN_REQUIRED"
    );
  }
  const sql = getSql();
  if (patch.manualLines) {
    if (patch.manualLines.length === 0) {
      throw new InvoiceWorkflowError(
        "An invoice must contain at least one line.",
        400,
        "INVOICE_LINES_REQUIRED"
      );
    }
    await sql`DELETE FROM invoice_items WHERE invoice_id = ${invoiceId};`;
    for (const source of patch.manualLines) {
      const quantity = normalizeQuantity(source.quantity);
      const unitPrice = normalizePrice(source.unitPriceDkk ?? source.unitPrice);
      await sql`
        INSERT INTO invoice_items (
          id, invoice_id, description, quantity, unit_price_dkk, line_total_dkk
        )
        VALUES (
          ${source.id || createId("ini")}, ${invoiceId},
          ${text(source.description) || "Ekstra service"}, ${quantity},
          ${unitPrice}, ${quantity * unitPrice}
        );
      `;
    }
  }
  const notes =
    patch.invoiceNotes === undefined
      ? patch.notes === undefined
        ? current.invoiceNotes
        : text(patch.notes)
      : text(patch.invoiceNotes);
  const status =
    patch.status && invoiceStatuses.includes(patch.status)
      ? patch.status
      : current.status;
  const [row] = await sql<RawInvoice[]>`
    UPDATE invoices
    SET customer_email = ${patch.customerEmail === undefined
      ? current.customerEmail
      : text(patch.customerEmail)},
      sent_to_email = ${patch.customerEmail === undefined
        ? current.sentToEmail
        : text(patch.customerEmail)},
      invoice_notes = ${notes},
      status = ${status},
      paid_at = CASE WHEN ${status} = 'paid' THEN COALESCE(paid_at, NOW()) ELSE paid_at END,
      updated_at = NOW()
    WHERE id = ${invoiceId}
    RETURNING *;
  `;
  const bookingData = await getBookingInvoiceData(current.bookingId);
  if (!bookingData) {
    throw new InvoiceWorkflowError("Booking was not found.", 404, "BOOKING_NOT_FOUND");
  }
  const items = await loadInvoiceItems(invoiceId);
  const rendered = await renderAndStoreInvoice(row, items, bookingData);
  const bookingInvoiceStatus =
    status === "paid"
      ? "paid"
      : status === "sent"
        ? "sent"
        : status === "cancelled"
          ? "not_requested"
          : "ready";
  await sql`
    UPDATE bookings
    SET invoice_requested = ${status !== "cancelled"},
      invoice_status = ${bookingInvoiceStatus},
      invoice_number = ${current.invoiceNumber},
      updated_at = NOW()
    WHERE id = ${current.bookingId};
  `;
  return {
    invoice: rendered.invoice,
    data: {
      ...bookingData,
      summary: rendered.summary,
      invoice: rendered.invoice,
    },
  };
};

export const sendInvoiceById = async (
  invoiceId: string,
  actor: InvoiceActor
) => {
  let invoice = await getInvoiceById(invoiceId);
  if (!invoice) {
    throw new InvoiceWorkflowError("Invoice was not found.", 404, "INVOICE_NOT_FOUND");
  }
  await assertActorCanAccessInvoice(invoice, actor);
  if (invoice.status === "cancelled") {
    throw new InvoiceWorkflowError(
      "Cancelled invoices cannot be sent.",
      409,
      "INVOICE_CANCELLED"
    );
  }
  const data = await getBookingInvoiceData(invoice.bookingId);
  if (!data) {
    throw new InvoiceWorkflowError("Booking was not found.", 404, "BOOKING_NOT_FOUND");
  }
  if (!invoice.invoiceHtml) {
    const sql = getSql();
    const [row] = await sql<RawInvoice[]>`
      SELECT * FROM invoices WHERE id = ${invoiceId} LIMIT 1;
    `;
    invoice = (await renderAndStoreInvoice(row, invoice.items, data)).invoice;
  }
  const recipient = invoice.customerEmail || data.customer.email;
  const settings = await getBookingSettings();
  try {
    const sendStatus = await sendCustomerInvoiceEmail({
      bookingId: data.booking.id,
      customerId: data.customer.id,
      customerName:
        [data.customer.firstName, data.customer.lastName]
          .filter(Boolean)
          .join(" ") || recipient,
      customerEmail: recipient,
      invoiceNumber: invoice.invoiceNumber,
      totalInclMomsDkk: invoice.totalInclMomsDkk,
      appointmentLabel: data.booking.appointmentLabel,
      invoiceUrl: new URL(invoice.publicUrl, baseUrl()).toString(),
      settings,
    });
    if (sendStatus !== "sent") {
      const sql = getSql();
      await sql`
        UPDATE invoices
        SET last_error = 'SMTP is not configured.', status = 'ready', updated_at = NOW()
        WHERE id = ${invoiceId};
      `;
      return { invoice: { ...invoice, status: "ready" as const }, sent: false, data };
    }
  } catch (error) {
    const sql = getSql();
    await sql`
      UPDATE invoices
      SET last_error = ${error instanceof Error ? error.message.slice(0, 1000) : "Email failed."},
        status = 'ready', updated_at = NOW()
      WHERE id = ${invoiceId};
    `;
    throw new InvoiceWorkflowError(
      "Invoice was saved, but email could not be sent.",
      502,
      "EMAIL_SEND_FAILED"
    );
  }

  const sql = getSql();
  const [sentRow] = await sql<RawInvoice[]>`
    UPDATE invoices
    SET status = 'sent', sent_at = COALESCE(sent_at, NOW()),
      sent_to_email = ${recipient}, email_sent = true, email_sent_at = NOW(),
      last_error = NULL, updated_at = NOW()
    WHERE id = ${invoiceId}
    RETURNING *;
  `;
  await sql`
    UPDATE bookings
    SET invoice_status = 'sent', updated_at = NOW()
    WHERE id = ${invoice.bookingId};
  `;
  await sql`
    UPDATE booking_line_items
    SET locked_at = COALESCE(locked_at, NOW()), updated_at = NOW()
    WHERE booking_id = ${invoice.bookingId};
  `;
  const sentInvoice = (
    await renderAndStoreInvoice(sentRow, invoice.items, data)
  ).invoice;
  try {
    await sendAdminInvoiceNotice({
      bookingId: data.booking.id,
      agentName: data.agent?.fullName || "Admin",
      invoiceNumber: sentInvoice.invoiceNumber,
      totalInclMomsDkk: sentInvoice.totalInclMomsDkk,
      settings,
    });
  } catch {
    // Customer delivery already succeeded; the internal notice is non-critical.
  }
  return {
    invoice: sentInvoice,
    sent: true,
    data: { ...data, invoice: sentInvoice },
  };
};

export const sendInvoiceForBooking = async (input: {
  bookingId: string;
  actorType: "admin" | "agent";
  actorId?: string;
  agentId?: string;
}) => {
  const generated = await generateInvoiceForBooking(input);
  return sendInvoiceById(generated.invoice.id, {
    actorType: input.actorType,
    actorId: input.actorId || input.agentId || input.actorType,
    agentId: input.agentId,
  });
};

export const listInvoices = async () => {
  if (!isDatabaseConfigured()) return [];
  await ensureInvoiceSchema();
  const sql = getSql();
  const rows = await sql<RawInvoice[]>`
    SELECT * FROM invoices ORDER BY created_at DESC;
  `;
  return rows.map((row) => invoiceFromRow(row));
};

export const listInvoicesForCustomer = async (customerId: string) => {
  if (!isDatabaseConfigured()) return [];
  await ensureInvoiceSchema();
  const sql = getSql();
  const rows = await sql<RawInvoice[]>`
    SELECT * FROM invoices
    WHERE customer_id = ${customerId}
      AND status <> 'cancelled'
    ORDER BY created_at DESC;
  `;
  return rows.map((row) => invoiceFromRow(row));
};

export const listInvoicesForActor = async (
  actor: InvoiceActor,
  filters?: { customerId?: string; agentId?: string; bookingId?: string }
) => {
  const rows = await listInvoices();
  const visible =
    actor.actorType === "admin"
      ? rows
      : rows.filter(
          (invoice) =>
            invoice.agentId === actor.agentId ||
            invoice.createdById === actor.actorId
        );
  return visible.filter((invoice) => {
    if (filters?.customerId && invoice.customerId !== filters.customerId) return false;
    if (filters?.agentId && invoice.agentId !== filters.agentId) return false;
    if (filters?.bookingId && invoice.bookingId !== filters.bookingId) return false;
    return true;
  });
};

export const getInvoiceByPublicToken = async (publicToken: string) => {
  if (!isDatabaseConfigured()) return null;
  await ensureInvoiceSchema();
  const sql = getSql();
  const [row] = await sql<RawInvoice[]>`
    SELECT * FROM invoices WHERE public_token = ${publicToken} LIMIT 1;
  `;
  if (!row || row.status === "cancelled") return null;
  let invoice = invoiceFromRow(row, await loadInvoiceItems(row.id));
  if (!invoice.invoiceHtml) {
    const data = await getBookingInvoiceData(invoice.bookingId);
    if (data) {
      invoice = (await renderAndStoreInvoice(row, invoice.items, data)).invoice;
    }
  }
  return invoice;
};

export const canPortalAccessInvoice = async (
  invoice: Invoice,
  portalToken: string
) => {
  const sql = getSql();
  const [row] = await sql<{ allowed: boolean }[]>`
    SELECT (portal_token = ${portalToken}) AS allowed
    FROM customers WHERE id = ${invoice.customerId} LIMIT 1;
  `;
  return Boolean(row?.allowed);
};

export const updateInvoiceStatus = async (
  invoiceId: string,
  status: InvoiceStatus
) =>
  (
    await updateInvoiceDetails(
      invoiceId,
      { actorType: "admin", actorId: "admin" },
      { status }
    )
  ).invoice;
