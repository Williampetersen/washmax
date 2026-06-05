import { mkdir } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import path from "node:path";
import PDFDocument from "pdfkit";
import { ensureSchema, getSql, isDatabaseConfigured } from "@/lib/server/db";
import { getAgentById, type Agent } from "@/lib/server/agents";
import { getBookingById, getBookingSettings, type BookingCustomer, type DashboardBooking } from "@/lib/server/bookings";
import { sendAdminInvoiceNotice, sendCustomerInvoiceEmail } from "@/lib/server/mail";
import { formatPrice } from "@/lib/shared/booking";

export const bookingLineItemTypes = [
  "original_service",
  "existing_extra_service",
  "manual_extra_charge",
] as const;
export type BookingLineItemType = (typeof bookingLineItemTypes)[number];

export const invoiceStatuses = ["draft", "sent", "paid", "cancelled"] as const;
export type InvoiceStatus = (typeof invoiceStatuses)[number];

type RawLineItem = {
  id: string;
  booking_id: string;
  agent_id: string | null;
  created_by_type: "admin" | "agent" | "system";
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
  sent_to_email: string | null;
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
  createdByType: "admin" | "agent" | "system";
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
  sentToEmail: string;
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

const createId = (prefix: string) => `${prefix}_${randomBytes(10).toString("hex")}`;

const toDateTimeText = (value: unknown) => {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return String(value ?? "").trim();
};

const normalizeQuantity = (value: unknown) =>
  Math.max(1, Math.round(Number(value || 1)));

const normalizePrice = (value: unknown) =>
  Math.max(0, Math.round(Number(value || 0)));

const lineItemFromRow = (row: RawLineItem): BookingLineItem => ({
  id: String(row.id ?? ""),
  bookingId: String(row.booking_id ?? ""),
  agentId: String(row.agent_id ?? ""),
  agentName: String(row.agent_full_name ?? ""),
  createdByType: row.created_by_type === "agent" ? "agent" : row.created_by_type === "admin" ? "admin" : "system",
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
  sentToEmail: String(row.sent_to_email ?? ""),
  sentAt: toDateTimeText(row.sent_at),
  paidAt: toDateTimeText(row.paid_at),
  createdAt: toDateTimeText(row.created_at),
  updatedAt: toDateTimeText(row.updated_at),
  items,
});

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
    throw new Error("Booking was not found.");
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
    throw new Error("Booking is not assigned to this agent.");
  }
  return result;
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
  return invoiceFromRow(invoiceRow, itemRows.map(invoiceItemFromRow));
};

const assertEditableLineItems = async (bookingId: string, actorType: "admin" | "agent") => {
  const invoice = await latestInvoiceForBooking(bookingId);
  if (actorType === "agent" && invoice && ["sent", "paid"].includes(invoice.status)) {
    throw new Error("Invoice has already been sent.");
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
    throw new Error("Line item was not found or is locked.");
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

const drawRow = (
  doc: PDFKit.PDFDocument,
  y: number,
  columns: [string, number, number, ("left" | "right")?][]
) => {
  for (const [text, x, width, align = "left"] of columns) {
    doc.text(text, x, y, { width, align });
  }
};

const renderInvoicePdf = async (data: BookingInvoiceData, invoice: Invoice) =>
  new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument({ margin: 44, size: "A4" });
    const chunks: Buffer[] = [];
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const logoPath = path.join(process.cwd(), "public", "logo.png");
    try {
      doc.image(logoPath, 44, 38, { width: 82 });
    } catch {
      doc.fontSize(18).fillColor("#1F2340").text("WashMax", 44, 44);
    }

    doc
      .fillColor("#1F2340")
      .fontSize(24)
      .text("Invoice", 380, 44, { align: "right" })
      .fontSize(11)
      .fillColor("#4B5563")
      .text(invoice.invoiceNumber, 380, 74, { align: "right" })
      .text(new Date(invoice.createdAt || Date.now()).toLocaleDateString("da-DK"), 380, 90, { align: "right" });

    const companyRows = [
      process.env.COMPANY_NAME || "WashMax / CleanWash",
      process.env.COMPANY_ADDRESS || "",
      process.env.COMPANY_CVR ? `CVR: ${process.env.COMPANY_CVR}` : "",
      process.env.COMPANY_PHONE || "",
      process.env.COMPANY_EMAIL || process.env.SMTP_USER || "",
      process.env.COMPANY_WEBSITE || "",
    ].filter(Boolean);
    doc
      .fontSize(10)
      .fillColor("#4B5563")
      .text(companyRows.join("\n"), 44, 124, { width: 230, lineGap: 3 });

    const customerName =
      [data.customer.firstName, data.customer.lastName].filter(Boolean).join(" ") ||
      data.customer.email;
    const customerRows = [
      customerName,
      data.customer.email,
      data.customer.phone,
      [data.customer.address, [data.customer.postalCode, data.customer.city].filter(Boolean).join(" ")].filter(Boolean).join(", "),
    ].filter(Boolean);
    doc
      .fontSize(10)
      .fillColor("#4B5563")
      .text("Bill to", 330, 124, { width: 180 })
      .fontSize(11)
      .fillColor("#1F2340")
      .text(customerRows.join("\n"), 330, 144, { width: 180, lineGap: 3 });

    const bookingRows = [
      `Booking: ${data.booking.id}`,
      `Tid: ${data.booking.appointmentLabel}`,
      `Bil: ${data.booking.vehicleName} (${data.booking.registrationNumber})`,
      `Agent: ${data.agent?.fullName || "-"}`,
      `Betaling: ${data.booking.paymentStatus}`,
    ];
    doc
      .fontSize(10)
      .fillColor("#4B5563")
      .text(bookingRows.join("\n"), 44, 220, { lineGap: 3 });

    const tableTop = 302;
    doc
      .roundedRect(44, tableTop - 10, 507, 24, 8)
      .fill("#EEF0FF")
      .fillColor("#1F2340")
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
      doc.fillColor("#1F2340").fontSize(9);
      drawRow(doc, y, [
        [item.description, 56, 240],
        [item.quantity.toString(), 318, 40, "right"],
        [formatPrice(item.unitPriceDkk), 374, 70, "right"],
        [formatPrice(item.totalPriceDkk), 470, 70, "right"],
      ]);
      y += 26;
    }

    y += 18;
    doc
      .moveTo(330, y - 8)
      .lineTo(550, y - 8)
      .strokeColor("#DDE3F5")
      .stroke();
    const totals: Array<[string, number]> = [
      ["Subtotal ex. moms", invoice.subtotalExMomsDkk],
      ["Moms 25% included", invoice.momsAmountDkk],
      ["Total incl. moms", invoice.totalInclMomsDkk],
    ];
    for (const [label, value] of totals) {
      doc
        .fillColor(label.startsWith("Total") ? "#1F2340" : "#4B5563")
        .fontSize(label.startsWith("Total") ? 12 : 10)
        .text(label, 330, y, { width: 120 })
        .text(formatPrice(value), 450, y, { width: 100, align: "right" });
      y += 22;
    }

    doc
      .fontSize(10)
      .fillColor("#4B5563")
      .text(
        process.env.INVOICE_PAYMENT_INSTRUCTIONS ||
          "Payment instructions: Please pay according to the agreement with WashMax. Thank you for your booking.",
        44,
        Math.max(y + 18, 690),
        { width: 507, lineGap: 3 }
      );

    doc.end();
  });

const writeInvoicePdf = async (data: BookingInvoiceData, invoice: Invoice) => {
  const output = await renderInvoicePdf(data, invoice);
  const relativeDir = "/uploads/invoices";
  const publicDir = path.join(process.cwd(), "public", "uploads", "invoices");
  await mkdir(publicDir, { recursive: true });
  const fileName = `${invoice.invoiceNumber}.pdf`;
  const filePath = path.join(publicDir, fileName);
  await import("node:fs/promises").then(({ writeFile }) => writeFile(filePath, output));
  return { pdfUrl: `${relativeDir}/${fileName}`, filePath };
};

export const getBookingInvoiceData = async (bookingId: string): Promise<BookingInvoiceData | null> => {
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

export const generateInvoiceForBooking = async (input: {
  bookingId: string;
  actorType: "admin" | "agent";
  agentId?: string;
}) => {
  await ensureSchema();
  if (input.actorType === "agent") {
    await assertAgentOwnsBooking(input.bookingId, input.agentId || "");
  }

  const data = await getBookingInvoiceData(input.bookingId);
  if (!data) {
    throw new Error("Booking was not found.");
  }

  const sql = getSql();
  let invoice = data.invoice;
  if (invoice && invoice.status !== "draft") {
    return { invoice, data };
  }

  const summary = data.summary;
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
        sent_to_email
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
        ${data.customer.email}
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
        sent_to_email = ${data.customer.email},
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

  const { pdfUrl } = await writeInvoicePdf({ ...data, invoice }, invoice);
  const [updated] = await sql<RawInvoice[]>`
    UPDATE invoices
    SET pdf_url = ${pdfUrl}, updated_at = NOW()
    WHERE id = ${invoice.id}
    RETURNING *;
  `;
  invoice = invoiceFromRow(updated, invoiceItems);

  return { invoice, data: { ...data, invoice } };
};

export const sendInvoiceForBooking = async (input: {
  bookingId: string;
  actorType: "admin" | "agent";
  agentId?: string;
}) => {
  const generated = await generateInvoiceForBooking(input);
  const { invoice, data } = generated;
  const settings = await getBookingSettings();
  const pdfPath = invoice.pdfUrl
    ? path.join(process.cwd(), "public", invoice.pdfUrl.replace(/^\//, ""))
    : "";
  const customerName =
    [data.customer.firstName, data.customer.lastName].filter(Boolean).join(" ") ||
    data.customer.email;

  const sendStatus = await sendCustomerInvoiceEmail({
    bookingId: data.booking.id,
    customerId: data.customer.id,
    customerName,
    customerEmail: data.customer.email,
    invoiceNumber: invoice.invoiceNumber,
    totalInclMomsDkk: invoice.totalInclMomsDkk,
    pdfPath,
    settings,
  });

  if (sendStatus !== "sent") {
    return { invoice, sent: false, data };
  }

  const sql = getSql();
  const [row] = await sql<RawInvoice[]>`
    UPDATE invoices
    SET status = 'sent', sent_at = NOW(), sent_to_email = ${data.customer.email}, updated_at = NOW()
    WHERE id = ${invoice.id}
    RETURNING *;
  `;
  await sql`
    UPDATE booking_line_items
    SET locked_at = COALESCE(locked_at, NOW()), updated_at = NOW()
    WHERE booking_id = ${input.bookingId};
  `;

  const sentInvoice = invoiceFromRow(row, invoice.items);
  await sendAdminInvoiceNotice({
    bookingId: data.booking.id,
    agentName: data.agent?.fullName || "Admin",
    invoiceNumber: sentInvoice.invoiceNumber,
    totalInclMomsDkk: sentInvoice.totalInclMomsDkk,
    settings,
  });

  return { invoice: sentInvoice, sent: true, data: { ...data, invoice: sentInvoice } };
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

export const getInvoiceById = async (invoiceId: string) => {
  if (!isDatabaseConfigured()) return null;
  await ensureSchema();
  const sql = getSql();
  const [row] = await sql<RawInvoice[]>`
    SELECT *
    FROM invoices
    WHERE id = ${invoiceId}
    LIMIT 1;
  `;
  if (!row) return null;
  const itemRows = await sql<RawInvoiceItem[]>`
    SELECT *
    FROM invoice_items
    WHERE invoice_id = ${invoiceId}
    ORDER BY created_at ASC;
  `;
  return invoiceFromRow(row, itemRows.map(invoiceItemFromRow));
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
  return row ? invoiceFromRow(row) : null;
};
