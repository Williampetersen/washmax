import { randomBytes } from "node:crypto";
import path from "node:path";
import PDFDocument from "pdfkit";
import { siteConfig } from "@/lib/site";
import { ensureSchema, getSql, isDatabaseConfigured } from "@/lib/server/db";
import { getAppUrl } from "@/lib/server/env";
import { getAgentById, type Agent } from "@/lib/server/agents";
import { getBookingById, getBookingSettings, type BookingCustomer, type DashboardBooking } from "@/lib/server/bookings";
import { isMailConfigured, sendAdminInvoiceNotice, sendCustomerInvoiceEmail } from "@/lib/server/mail";
import {
  formatDateTimeLabel,
  formatPrice,
  type BookingSettings,
  type InvoiceStatus as BookingInvoiceFieldStatus,
} from "@/lib/shared/booking";

export const bookingLineItemTypes = [
  "original_service",
  "existing_extra_service",
  "manual_extra_charge",
] as const;
export type BookingLineItemType = (typeof bookingLineItemTypes)[number];

export const invoiceStatuses = ["draft", "sent", "paid", "cancelled"] as const;
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
  status: InvoiceStatus;
  currency: string;
  subtotal_ex_moms_dkk: number;
  moms_amount_dkk: number;
  total_incl_moms_dkk: number;
  pdf_url: string | null;
  pdf_file_name: string | null;
  pdf_content: Buffer | Uint8Array | null;
  pdf_content_type: string | null;
  pdf_size_bytes: number | null;
  customer_email: string | null;
  sent_to_email: string | null;
  email_sent: boolean | null;
  email_sent_at: string | Date | null;
  sent_at: string | Date | null;
  paid_at: string | Date | null;
  created_by_user_id: string | null;
  created_by_role: InvoiceActorType | null;
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
  pdfUrl: string;
  pdfFileName: string;
  pdfSizeBytes: number;
  customerEmail: string;
  sentToEmail: string;
  emailSent: boolean;
  emailSentAt: string;
  sentAt: string;
  paidAt: string;
  createdByUserId: string;
  createdByRole: InvoiceActorType;
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

export class InvoiceWorkflowError extends Error {
  statusCode: number;
  code: string;

  constructor(message: string, statusCode = 400, code = "invoice_error") {
    super(message);
    this.name = "InvoiceWorkflowError";
    this.statusCode = statusCode;
    this.code = code;
  }
}

const createId = (prefix: string) => `${prefix}_${randomBytes(10).toString("hex")}`;

const toDateTimeText = (value: unknown) => {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return String(value ?? "").trim();
};

const normalizeQuantity = (value: unknown) => Math.max(1, Math.round(Number(value || 1)));

const normalizePrice = (value: unknown) => Math.max(0, Math.round(Number(value || 0)));

const getInvoiceDownloadUrl = (invoiceId: string) => `/api/invoices/${invoiceId}/download`;

export const buildInvoiceDownloadUrl = getInvoiceDownloadUrl;

const getAbsoluteInvoiceDownloadUrl = (invoiceId: string, portalToken?: string) => {
  const baseUrl = getAppUrl(siteConfig.url) || siteConfig.url;
  const url = new URL(getInvoiceDownloadUrl(invoiceId), baseUrl);

  if (portalToken) {
    url.searchParams.set("token", portalToken);
  }

  return url.toString();
};

const getInvoiceFileName = (invoiceNumber: string) => `clean-wash-invoice-${invoiceNumber}.pdf`;

const normalizeInvoiceCompanyName = (value: string) => {
  const trimmed = String(value || "").trim();
  if (!trimmed) {
    return "Clean Wash";
  }

  return /washmax/i.test(trimmed) ? "Clean Wash" : trimmed;
};

const lineItemFromRow = (row: RawLineItem): BookingLineItem => ({
  id: String(row.id ?? ""),
  bookingId: String(row.booking_id ?? ""),
  agentId: String(row.agent_id ?? ""),
  agentName: String(row.agent_full_name ?? ""),
  createdByType:
    row.created_by_type === "agent"
      ? "agent"
      : row.created_by_type === "admin"
        ? "admin"
        : "system",
  itemType: bookingLineItemTypes.includes(row.item_type) ? row.item_type : "manual_extra_charge",
  serviceId: String(row.service_id ?? ""),
  description: String(row.description ?? ""),
  quantity: Number(row.quantity || 1),
  unitPriceDkk: Number(row.unit_price_dkk || 0),
  totalPriceDkk: Number(row.total_price_dkk || 0),
  isTaxIncluded: row.is_tax_included !== false,
  createdAt: toDateTimeText(row.created_at),
  updatedAt: toDateTimeText(row.updated_at),
  lockedAt: toDateTimeText(row.locked_at),
});

const invoiceItemFromRow = (row: RawInvoiceItem): InvoiceItem => ({
  id: String(row.id ?? ""),
  invoiceId: String(row.invoice_id ?? ""),
  bookingLineItemId: String(row.booking_line_item_id ?? ""),
  description: String(row.description ?? ""),
  quantity: Number(row.quantity || 1),
  unitPriceDkk: Number(row.unit_price_dkk || 0),
  lineTotalDkk: Number(row.line_total_dkk || 0),
  createdAt: toDateTimeText(row.created_at),
});

const invoiceFromRow = (row: RawInvoice, items: InvoiceItem[] = []): Invoice => ({
  id: String(row.id ?? ""),
  invoiceNumber: String(row.invoice_number ?? ""),
  bookingId: String(row.booking_id ?? ""),
  customerId: String(row.customer_id ?? ""),
  agentId: String(row.agent_id ?? ""),
  status: invoiceStatuses.includes(row.status) ? row.status : "draft",
  currency: String(row.currency ?? "DKK"),
  subtotalExMomsDkk: Number(row.subtotal_ex_moms_dkk || 0),
  momsAmountDkk: Number(row.moms_amount_dkk || 0),
  totalInclMomsDkk: Number(row.total_incl_moms_dkk || 0),
  pdfUrl: String(row.pdf_url ?? ""),
  pdfFileName: String(row.pdf_file_name ?? ""),
  pdfSizeBytes: Number(row.pdf_size_bytes || 0),
  customerEmail: String(row.customer_email ?? ""),
  sentToEmail: String(row.sent_to_email ?? ""),
  emailSent: Boolean(row.email_sent),
  emailSentAt: toDateTimeText(row.email_sent_at),
  sentAt: toDateTimeText(row.sent_at),
  paidAt: toDateTimeText(row.paid_at),
  createdByUserId: String(row.created_by_user_id ?? ""),
  createdByRole:
    row.created_by_role === "agent"
      ? "agent"
      : row.created_by_role === "admin"
        ? "admin"
        : "system",
  createdAt: toDateTimeText(row.created_at),
  updatedAt: toDateTimeText(row.updated_at),
  items,
});

const getStoredPdfBuffer = (row: RawInvoice) => {
  if (!row.pdf_content) {
    return null;
  }

  return Buffer.isBuffer(row.pdf_content) ? row.pdf_content : Buffer.from(row.pdf_content);
};

export const calculatePriceSummary = (lineItems: BookingLineItem[]): PriceSummary => {
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
    originalBookingPriceDkk + existingExtraServicesDkk + manualExtraChargesDkk;
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

const ensureOriginalLineItem = async (bookingId: string) => {
  await ensureSchema();
  const sql = getSql();
  const [existing] = await sql<{ count: string }[]>`
    SELECT COUNT(*)::text AS count
    FROM booking_line_items
    WHERE booking_id = ${bookingId}
      AND item_type = 'original_service';
  `;

  if (Number(existing?.count || 0) > 0) {
    return;
  }

  const result = await getBookingById(bookingId);
  if (!result) {
    throw new InvoiceWorkflowError("Booking was not found.", 404, "booking_not_found");
  }

  const { booking } = result;
  const addonText = booking.addons.length
    ? ` inkl. ${booking.addons.map((item) => item.label).join(", ")}`
    : "";
  const description =
    `${booking.packageLabel || "Original booking"}${booking.category ? ` - ${booking.category}` : ""}${addonText}`.trim();

  await sql`
    INSERT INTO booking_line_items (
      id,
      booking_id,
      created_by_type,
      item_type,
      service_id,
      description,
      quantity,
      unit_price_dkk,
      total_price_dkk,
      is_tax_included
    )
    VALUES (
      ${createId("bli")},
      ${bookingId},
      'system',
      'original_service',
      ${booking.packageId || null},
      ${description || "Original booking"},
      1,
      ${booking.total},
      ${booking.total},
      true
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

export const assertAgentOwnsBooking = async (bookingId: string, agentId: string) => {
  const result = await getBookingById(bookingId);
  if (!result || result.booking.assignedAgentId !== agentId) {
    throw new InvoiceWorkflowError("Booking is not assigned to this agent.", 403, "agent_forbidden");
  }
  return result;
};

const getInvoiceRecordById = async (invoiceId: string) => {
  await ensureSchema();
  const sql = getSql();
  const [row] = await sql<RawInvoice[]>`
    SELECT *
    FROM invoices
    WHERE id = ${invoiceId}
    LIMIT 1;
  `;

  if (!row) {
    return null;
  }

  const itemRows = await sql<RawInvoiceItem[]>`
    SELECT *
    FROM invoice_items
    WHERE invoice_id = ${invoiceId}
    ORDER BY created_at ASC;
  `;

  return {
    row,
    items: itemRows.map(invoiceItemFromRow),
  };
};

const latestInvoiceForBooking = async (bookingId: string) => {
  await ensureSchema();
  const sql = getSql();
  const [invoiceRow] = await sql<RawInvoice[]>`
    SELECT *
    FROM invoices
    WHERE booking_id = ${bookingId}
    ORDER BY created_at DESC
    LIMIT 1;
  `;

  if (!invoiceRow) return null;

  const itemRows = await sql<RawInvoiceItem[]>`
    SELECT *
    FROM invoice_items
    WHERE invoice_id = ${invoiceRow.id}
    ORDER BY created_at ASC;
  `;
  return {
    row: invoiceRow,
    invoice: invoiceFromRow(invoiceRow, itemRows.map(invoiceItemFromRow)),
  };
};

const assertEditableLineItems = async (bookingId: string, actorType: "admin" | "agent") => {
  const latest = await latestInvoiceForBooking(bookingId);
  if (actorType === "agent" && latest?.invoice && ["sent", "paid"].includes(latest.invoice.status)) {
    throw new InvoiceWorkflowError("Invoice has already been sent.", 400, "invoice_locked");
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
  await ensureSchema();
  if (input.actorType === "agent") {
    await assertAgentOwnsBooking(input.bookingId, input.agentId || "");
  }
  await assertEditableLineItems(input.bookingId, input.actorType);

  const sql = getSql();
  const quantity = normalizeQuantity(input.quantity);
  const unitPriceDkk = normalizePrice(input.unitPriceDkk);
  const [row] = await sql<RawLineItem[]>`
    INSERT INTO booking_line_items (
      id,
      booking_id,
      agent_id,
      created_by_type,
      item_type,
      service_id,
      description,
      quantity,
      unit_price_dkk,
      total_price_dkk,
      is_tax_included
    )
    VALUES (
      ${createId("bli")},
      ${input.bookingId},
      ${input.agentId || null},
      ${input.actorType},
      ${input.itemType},
      ${input.serviceId || null},
      ${input.description.trim()},
      ${quantity},
      ${unitPriceDkk},
      ${quantity * unitPriceDkk},
      true
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
  await ensureSchema();
  if (input.actorType === "agent") {
    await assertAgentOwnsBooking(bookingId, input.agentId || "");
  }
  await assertEditableLineItems(bookingId, input.actorType);

  const sql = getSql();
  const quantity = normalizeQuantity(input.quantity);
  const unitPriceDkk = normalizePrice(input.unitPriceDkk);
  const [row] = await sql<RawLineItem[]>`
    UPDATE booking_line_items
    SET
      description = ${input.description.trim()},
      quantity = ${quantity},
      unit_price_dkk = ${unitPriceDkk},
      total_price_dkk = ${quantity * unitPriceDkk},
      updated_at = NOW()
    WHERE id = ${itemId}
      AND booking_id = ${bookingId}
      AND item_type <> 'original_service'
      AND (${input.actorType} = 'admin' OR (agent_id = ${input.agentId || ""} AND locked_at IS NULL))
    RETURNING *;
  `;

  if (!row) {
    throw new InvoiceWorkflowError("Line item was not found or is locked.", 404, "line_item_missing");
  }

  return lineItemFromRow(row);
};

export const deleteBookingLineItem = async (
  bookingId: string,
  itemId: string,
  input: { actorType: "admin" | "agent"; agentId?: string }
) => {
  await ensureSchema();
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
  const year = new Date().getFullYear().toString();
  const [row] = await sql<{ max_number: string | null }[]>`
    SELECT MAX(invoice_number) AS max_number
    FROM invoices
    WHERE invoice_number LIKE ${`CW-${year}-%`};
  `;
  const last = Number(String(row?.max_number || "").split("-").pop() || 0);
  return `CW-${year}-${(last + 1).toString().padStart(6, "0")}`;
};

const getBookingInvoiceFieldStatus = (status: InvoiceStatus): BookingInvoiceFieldStatus => {
  switch (status) {
    case "sent":
      return "sent";
    case "paid":
      return "paid";
    default:
      return "ready";
  }
};

const syncBookingInvoiceFields = async (invoice: Invoice) => {
  const sql = getSql();
  await sql`
    UPDATE bookings
    SET
      invoice_requested = true,
      invoice_status = ${getBookingInvoiceFieldStatus(invoice.status)},
      invoice_number = ${invoice.invoiceNumber},
      updated_at = NOW()
    WHERE id = ${invoice.bookingId};
  `;
};

const drawRow = (
  doc: PDFKit.PDFDocument,
  y: number,
  columns: [string, number, number, ("left" | "right")?][]
) => {
  for (const [text, x, width, align = "left"] of columns) {
    doc.text(text, x, y, { width, align });
  }
};

const getCompanyDetails = (settings: BookingSettings) => ({
  name: normalizeInvoiceCompanyName(String(settings.companyName || siteConfig.name || "Clean Wash")),
  address: "",
  cvr: "",
  phone: siteConfig.phoneDisplay,
  email: String(settings.supportEmail || siteConfig.email || "").trim(),
  website: String(getAppUrl(siteConfig.url) || "").trim(),
});

const renderInvoicePdf = async (
  data: BookingInvoiceData,
  invoice: Invoice,
  settings: BookingSettings
) =>
  new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument({ margin: 44, size: "A4" });
    const chunks: Buffer[] = [];
    const company = getCompanyDetails(settings);
    const logoPath = path.join(process.cwd(), "public", "logo.png");
    const createdAtLabel = new Date(invoice.createdAt || Date.now()).toLocaleDateString("da-DK");
    const customerName =
      [data.customer.firstName, data.customer.lastName].filter(Boolean).join(" ") ||
      data.customer.company ||
      data.customer.email;
    const customerAddress = [
      data.customer.address,
      [data.customer.postalCode, data.customer.city].filter(Boolean).join(" "),
    ]
      .filter(Boolean)
      .join(", ");
    const bookingService = [data.booking.packageLabel, data.booking.category]
      .filter(Boolean)
      .join(" - ");
    const addOnText = data.booking.addons.length
      ? data.booking.addons.map((item) => item.label).join(", ")
      : "Ingen tilvalg";

    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    try {
      doc.image(logoPath, 44, 34, { width: 96 });
    } catch {
      doc.fontSize(22).fillColor("#123D52").text("Clean Wash", 44, 44);
    }

    doc
      .fillColor("#123D52")
      .fontSize(24)
      .text("Invoice", 380, 42, { align: "right" })
      .fontSize(11)
      .fillColor("#4D6470")
      .text(invoice.invoiceNumber, 380, 74, { align: "right" })
      .text(createdAtLabel, 380, 90, { align: "right" });

    const companyRows = [
      company.name,
      company.address,
      company.cvr ? `CVR: ${company.cvr}` : "",
      company.phone,
      company.email,
      company.website,
    ].filter(Boolean);
    doc
      .fontSize(10)
      .fillColor("#4D6470")
      .text(companyRows.join("\n"), 44, 126, { width: 240, lineGap: 3 });

    const customerRows = [
      customerName,
      data.customer.email,
      data.customer.phone,
      customerAddress,
    ].filter(Boolean);
    doc
      .fontSize(10)
      .fillColor("#4D6470")
      .text("Bill to", 330, 126, { width: 180 })
      .fontSize(11)
      .fillColor("#123D52")
      .text(customerRows.join("\n"), 330, 146, { width: 180, lineGap: 3 });

    const bookingRows = [
      `Booking ID: ${data.booking.id}`,
      `Appointment: ${data.booking.appointmentLabel || formatDateTimeLabel(data.booking.appointmentDate, data.booking.appointmentTime)}`,
      `Service: ${bookingService || "Clean Wash service"}`,
      `Add-ons: ${addOnText}`,
      `Vehicle: ${[data.booking.vehicleName, data.booking.registrationNumber].filter(Boolean).join(" | ") || "-"}`,
      `Payment status: ${data.booking.paymentStatus || "-"}`,
    ];
    doc
      .roundedRect(44, 228, 507, 82, 12)
      .fill("#F4F9FB")
      .fillColor("#123D52")
      .fontSize(10)
      .text(bookingRows.join("\n"), 58, 242, { width: 478, lineGap: 4 });

    const tableTop = 342;
    doc
      .roundedRect(44, tableTop - 10, 507, 24, 8)
      .fill("#E7F3F8")
      .fillColor("#123D52")
      .fontSize(9);
    drawRow(doc, tableTop - 3, [
      ["Description", 56, 240],
      ["Qty", 318, 40, "right"],
      ["Unit", 374, 70, "right"],
      ["Total", 470, 70, "right"],
    ]);

    let y = tableTop + 28;
    for (const item of data.lineItems) {
      if (y > 690) {
        doc.addPage();
        y = 54;
      }

      doc.fillColor("#123D52").fontSize(9);
      drawRow(doc, y, [
        [item.description, 56, 240],
        [item.quantity.toString(), 318, 40, "right"],
        [formatPrice(item.unitPriceDkk), 374, 70, "right"],
        [formatPrice(item.totalPriceDkk), 470, 70, "right"],
      ]);
      y += 26;
    }

    const totalsTop = Math.max(y + 16, 640);
    doc
      .roundedRect(330, totalsTop, 221, 86, 12)
      .fill("#F4F9FB");
    const totals: Array<[string, number]> = [
      ["Subtotal ex. moms", invoice.subtotalExMomsDkk],
      ["Moms 25%", invoice.momsAmountDkk],
      ["Total incl. moms", invoice.totalInclMomsDkk],
    ];
    let totalY = totalsTop + 16;
    for (const [label, value] of totals) {
      const strong = label.startsWith("Total");
      doc
        .fillColor(strong ? "#123D52" : "#4D6470")
        .fontSize(strong ? 12 : 10)
        .text(label, 346, totalY, { width: 118 })
        .text(formatPrice(value), 445, totalY, { width: 90, align: "right" });
      totalY += 22;
    }

    const footerTop = Math.max(totalY + 20, 748);
    doc
      .moveTo(44, footerTop - 10)
      .lineTo(551, footerTop - 10)
      .strokeColor("#D7E8EF")
      .stroke();
    doc
      .fontSize(9)
      .fillColor("#4D6470")
      .text(
        [
          "Payment instructions:",
          "Please pay according to your agreement with Clean Wash.",
          [company.name, company.phone, company.email].filter(Boolean).join(" | "),
        ].join(" "),
        44,
        footerTop,
        { width: 507, lineGap: 3 }
      );

    doc.end();
  });

const persistInvoicePdf = async (
  invoiceId: string,
  invoiceNumber: string,
  pdfBuffer: Buffer
) => {
  const sql = getSql();
  const fileName = getInvoiceFileName(invoiceNumber);
  const [updated] = await sql<RawInvoice[]>`
    UPDATE invoices
    SET
      pdf_url = ${getInvoiceDownloadUrl(invoiceId)},
      pdf_file_name = ${fileName},
      pdf_content = ${pdfBuffer},
      pdf_content_type = 'application/pdf',
      pdf_size_bytes = ${pdfBuffer.byteLength},
      updated_at = NOW()
    WHERE id = ${invoiceId}
    RETURNING *;
  `;

  return updated;
};

const renderAndStoreInvoicePdf = async (
  data: BookingInvoiceData,
  invoice: Invoice,
  settings: BookingSettings
) => {
  const pdfBuffer = await renderInvoicePdf(data, invoice, settings);
  const updated = await persistInvoicePdf(invoice.id, invoice.invoiceNumber, pdfBuffer);
  return {
    row: updated,
    buffer: pdfBuffer,
    invoice: invoiceFromRow(updated, invoice.items),
  };
};

export const getBookingInvoiceData = async (bookingId: string): Promise<BookingInvoiceData | null> => {
  const result = await getBookingById(bookingId);
  if (!result) return null;
  const lineItems = await listBookingLineItems(bookingId);
  const latest = await latestInvoiceForBooking(bookingId);
  const agent = result.booking.assignedAgentId
    ? await getAgentById(result.booking.assignedAgentId)
    : null;

  return {
    booking: result.booking,
    customer: result.customer,
    agent,
    lineItems,
    summary: calculatePriceSummary(lineItems),
    invoice: latest?.invoice ?? null,
  };
};

const ensureInvoicePdfStored = async (data: BookingInvoiceData, invoice: Invoice) => {
  const record = await getInvoiceRecordById(invoice.id);
  if (!record) {
    throw new InvoiceWorkflowError("Invoice was not found.", 404, "invoice_not_found");
  }

  const existingBuffer = getStoredPdfBuffer(record.row);
  if (existingBuffer && invoice.pdfUrl) {
    return {
      invoice: invoiceFromRow(record.row, record.items),
      buffer: existingBuffer,
    };
  }

  const settings = await getBookingSettings();
  const rendered = await renderAndStoreInvoicePdf(
    { ...data, invoice: { ...invoice, items: record.items } },
    { ...invoice, items: record.items },
    settings
  );
  return {
    invoice: rendered.invoice,
    buffer: rendered.buffer,
  };
};

export const generateInvoiceForBooking = async (input: {
  bookingId: string;
  actorType: "admin" | "agent";
  agentId?: string;
  createdByUserId?: string;
}) => {
  await ensureSchema();
  if (input.actorType === "agent") {
    await assertAgentOwnsBooking(input.bookingId, input.agentId || "");
  }

  const data = await getBookingInvoiceData(input.bookingId);
  if (!data) {
    throw new InvoiceWorkflowError("Booking was not found.", 404, "booking_not_found");
  }

  const sql = getSql();
  const summary = data.summary;
  const loadedSettings = await getBookingSettings();
  const settings = {
    ...loadedSettings,
    companyName: normalizeInvoiceCompanyName(loadedSettings.companyName),
  };
  const latest = data.invoice ? await latestInvoiceForBooking(input.bookingId) : null;
  let invoice = latest?.invoice ?? data.invoice;

  if (invoice && invoice.status !== "draft") {
    const ensured = await ensureInvoicePdfStored(data, invoice);
    await syncBookingInvoiceFields(ensured.invoice);
    return { invoice: ensured.invoice, data: { ...data, invoice: ensured.invoice } };
  }

  if (!invoice) {
    const [row] = await sql<RawInvoice[]>`
      INSERT INTO invoices (
        id,
        invoice_number,
        booking_id,
        customer_id,
        agent_id,
        status,
        currency,
        subtotal_ex_moms_dkk,
        moms_amount_dkk,
        total_incl_moms_dkk,
        customer_email,
        sent_to_email,
        created_by_user_id,
        created_by_role
      )
      VALUES (
        ${createId("inv")},
        ${await getNextInvoiceNumber()},
        ${input.bookingId},
        ${data.customer.id},
        ${input.agentId || data.booking.assignedAgentId || null},
        'draft',
        'DKK',
        ${summary.subtotalExMomsDkk},
        ${summary.momsAmountDkk},
        ${summary.totalInclMomsDkk},
        ${data.customer.email},
        ${data.customer.email},
        ${input.createdByUserId || null},
        ${input.actorType}
      )
      RETURNING *;
    `;
    invoice = invoiceFromRow(row);
  } else {
    const [row] = await sql<RawInvoice[]>`
      UPDATE invoices
      SET
        subtotal_ex_moms_dkk = ${summary.subtotalExMomsDkk},
        moms_amount_dkk = ${summary.momsAmountDkk},
        total_incl_moms_dkk = ${summary.totalInclMomsDkk},
        agent_id = ${input.agentId || data.booking.assignedAgentId || null},
        customer_email = ${data.customer.email},
        sent_to_email = ${data.customer.email},
        created_by_user_id = ${input.createdByUserId || null},
        created_by_role = ${input.actorType},
        updated_at = NOW()
      WHERE id = ${invoice.id}
      RETURNING *;
    `;
    invoice = invoiceFromRow(row);
  }

  await sql`DELETE FROM invoice_items WHERE invoice_id = ${invoice.id};`;
  for (const item of data.lineItems) {
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
        ${invoice.id},
        ${item.id},
        ${item.description},
        ${item.quantity},
        ${item.unitPriceDkk},
        ${item.totalPriceDkk}
      );
    `;
  }

  const invoiceItems = (await sql<RawInvoiceItem[]>`
    SELECT *
    FROM invoice_items
    WHERE invoice_id = ${invoice.id}
    ORDER BY created_at ASC;
  `).map(invoiceItemFromRow);
  invoice = { ...invoice, items: invoiceItems };

  const rendered = await renderAndStoreInvoicePdf({ ...data, invoice }, invoice, settings);
  await syncBookingInvoiceFields(rendered.invoice);

  return { invoice: rendered.invoice, data: { ...data, invoice: rendered.invoice } };
};

const sendInvoiceMail = async (input: {
  invoice: Invoice;
  data: BookingInvoiceData;
  pdfBuffer: Buffer;
  actorName: string;
  notifyAdmin: boolean;
}) => {
  if (!input.data.customer.email) {
    throw new InvoiceWorkflowError("Customer email is missing.", 400, "customer_email_missing");
  }

  if (!isMailConfigured()) {
    console.error("Invoice email could not be sent because SMTP configuration is incomplete.");
    throw new InvoiceWorkflowError(
      "Invoice email is not configured on the server.",
      500,
      "smtp_not_configured"
    );
  }

  const loadedSettings = await getBookingSettings();
  const settings = {
    ...loadedSettings,
    companyName: normalizeInvoiceCompanyName(loadedSettings.companyName),
  };
  const customerName =
    [input.data.customer.firstName, input.data.customer.lastName].filter(Boolean).join(" ") ||
    input.data.customer.email;
  const invoiceUrl = getAbsoluteInvoiceDownloadUrl(input.invoice.id, input.data.customer.portalToken);
  const sendStatus = await sendCustomerInvoiceEmail({
    bookingId: input.data.booking.id,
    customerId: input.data.customer.id,
    customerName,
    customerEmail: input.data.customer.email,
    invoiceNumber: input.invoice.invoiceNumber,
    totalInclMomsDkk: input.invoice.totalInclMomsDkk,
    appointmentLabel:
      input.data.booking.appointmentLabel ||
      formatDateTimeLabel(input.data.booking.appointmentDate, input.data.booking.appointmentTime),
    invoiceUrl,
    pdfBuffer: input.pdfBuffer,
    settings,
  });

  if (sendStatus !== "sent") {
    throw new InvoiceWorkflowError(
      "Invoice email could not be sent.",
      500,
      "invoice_email_not_sent"
    );
  }

  const sql = getSql();
  const [row] = await sql<RawInvoice[]>`
    UPDATE invoices
    SET
      status = CASE WHEN status = 'draft' THEN 'sent' ELSE status END,
      customer_email = ${input.data.customer.email},
      sent_to_email = ${input.data.customer.email},
      email_sent = true,
      email_sent_at = NOW(),
      sent_at = COALESCE(sent_at, NOW()),
      updated_at = NOW()
    WHERE id = ${input.invoice.id}
    RETURNING *;
  `;

  await sql`
    UPDATE booking_line_items
    SET locked_at = COALESCE(locked_at, NOW()), updated_at = NOW()
    WHERE booking_id = ${input.data.booking.id};
  `;

  const sentInvoice = invoiceFromRow(row, input.invoice.items);
  await syncBookingInvoiceFields(sentInvoice);

  if (input.notifyAdmin) {
    try {
      await sendAdminInvoiceNotice({
        bookingId: input.data.booking.id,
        agentName: input.actorName,
        invoiceNumber: sentInvoice.invoiceNumber,
        totalInclMomsDkk: sentInvoice.totalInclMomsDkk,
        settings,
      });
    } catch (error) {
      console.error("Admin invoice notice failed", error);
    }
  }

  return sentInvoice;
};

export const sendInvoiceForBooking = async (input: {
  bookingId: string;
  actorType: "admin" | "agent";
  agentId?: string;
  createdByUserId?: string;
}) => {
  const generated = await generateInvoiceForBooking(input);
  const ensured = await ensureInvoicePdfStored(generated.data, generated.invoice);
  const sentInvoice = await sendInvoiceMail({
    invoice: ensured.invoice,
    data: generated.data,
    pdfBuffer: ensured.buffer,
    actorName: generated.data.agent?.fullName || (input.actorType === "agent" ? "Agent" : "Admin"),
    notifyAdmin: true,
  });

  return {
    invoice: sentInvoice,
    sent: true,
    data: { ...generated.data, invoice: sentInvoice },
  };
};

export const resendInvoiceById = async (input: {
  invoiceId: string;
  actorType: "admin" | "agent";
  agentId?: string;
}) => {
  const record = await getInvoiceRecordById(input.invoiceId);
  if (!record) {
    throw new InvoiceWorkflowError("Invoice was not found.", 404, "invoice_not_found");
  }

  const invoice = invoiceFromRow(record.row, record.items);
  if (input.actorType === "agent") {
    await assertAgentOwnsBooking(invoice.bookingId, input.agentId || "");
  }

  const data = await getBookingInvoiceData(invoice.bookingId);
  if (!data) {
    throw new InvoiceWorkflowError("Booking was not found.", 404, "booking_not_found");
  }

  const ensured = await ensureInvoicePdfStored(data, invoice);
  const resentInvoice = await sendInvoiceMail({
    invoice: ensured.invoice,
    data,
    pdfBuffer: ensured.buffer,
    actorName: data.agent?.fullName || (input.actorType === "agent" ? "Agent" : "Admin"),
    notifyAdmin: false,
  });

  return {
    invoice: resentInvoice,
    sent: true,
    data: { ...data, invoice: resentInvoice },
  };
};

export const listInvoices = async () => {
  if (!isDatabaseConfigured()) return [];
  await ensureSchema();
  const sql = getSql();
  const rows = await sql<RawInvoice[]>`
    SELECT *
    FROM invoices
    ORDER BY created_at DESC;
  `;
  return rows.map((row) => invoiceFromRow(row));
};

export const listInvoicesForCustomer = async (customerId: string) => {
  if (!isDatabaseConfigured()) return [];
  await ensureSchema();
  const sql = getSql();
  const rows = await sql<RawInvoice[]>`
    SELECT *
    FROM invoices
    WHERE customer_id = ${customerId}
    ORDER BY created_at DESC;
  `;
  return rows.map((row) => invoiceFromRow(row));
};

export const getInvoiceById = async (invoiceId: string) => {
  if (!isDatabaseConfigured()) return null;
  const record = await getInvoiceRecordById(invoiceId);
  return record ? invoiceFromRow(record.row, record.items) : null;
};

export const getInvoicePdfForDownload = async (invoiceId: string) => {
  const record = await getInvoiceRecordById(invoiceId);
  if (!record) {
    return null;
  }

  const invoice = invoiceFromRow(record.row, record.items);
  const data = await getBookingInvoiceData(invoice.bookingId);
  if (!data) {
    throw new InvoiceWorkflowError("Booking was not found.", 404, "booking_not_found");
  }

  const ensured = await ensureInvoicePdfStored(data, invoice);
  return {
    invoice: ensured.invoice,
    fileName: ensured.invoice.pdfFileName || getInvoiceFileName(ensured.invoice.invoiceNumber),
    contentType: "application/pdf",
    buffer: ensured.buffer,
  };
};

export const updateInvoiceStatus = async (invoiceId: string, status: InvoiceStatus) => {
  await ensureSchema();
  const sql = getSql();
  const [row] = await sql<RawInvoice[]>`
    UPDATE invoices
    SET
      status = ${status},
      paid_at = CASE WHEN ${status} = 'paid' THEN NOW() ELSE paid_at END,
      updated_at = NOW()
    WHERE id = ${invoiceId}
    RETURNING *;
  `;

  if (!row) {
    return null;
  }

  const itemRows = await sql<RawInvoiceItem[]>`
    SELECT *
    FROM invoice_items
    WHERE invoice_id = ${invoiceId}
    ORDER BY created_at ASC;
  `;
  const invoice = invoiceFromRow(row, itemRows.map(invoiceItemFromRow));
  await syncBookingInvoiceFields(invoice);
  return invoice;
};
