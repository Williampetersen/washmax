import { existsSync } from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";

export type SimpleInvoiceLine = {
  description: string;
  quantity: number;
  unitPriceDkk: number;
  totalDkk: number;
};

export type SimpleInvoiceDocument = {
  invoiceNumber: string;
  invoiceDate: string;
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  vehicle: string;
  registrationNumber: string;
  service: string;
  appointment: string;
  lines: SimpleInvoiceLine[];
  subtotalExVatDkk: number;
  vatDkk: number;
  totalDkk: number;
  currency: string;
};

const formatMoney = (amount: number, currency: string) =>
  `${Math.round(Number(amount || 0)).toLocaleString("da-DK")} ${currency}`;

const safeText = (value: unknown) => String(value || "-").trim() || "-";

const drawLabelValue = (
  doc: PDFKit.PDFDocument,
  label: string,
  value: string,
  x: number,
  y: number,
  width: number
) => {
  doc.font("Helvetica-Bold").fontSize(9).fillColor("#526873").text(label, x, y, {
    width,
  });
  doc.font("Helvetica").fontSize(10).fillColor("#102D38").text(value, x, y + 14, {
    width,
  });
};

export const generateSimpleInvoicePdf = async (
  invoice: SimpleInvoiceDocument
): Promise<Buffer> =>
  new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 46,
      info: {
        Title: `Clean Wash invoice ${invoice.invoiceNumber}`,
        Author: "Clean Wash",
        Subject: `Invoice for booking ${invoice.bookingId}`,
      },
    });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("error", reject);
    doc.on("end", () => resolve(Buffer.concat(chunks)));

    const pageWidth = doc.page.width;
    const contentWidth = pageWidth - 92;
    const logoPath = path.join(process.cwd(), "public", "logo.png");

    try {
      if (!existsSync(logoPath)) {
        throw new Error("Logo is unavailable.");
      }
      doc.image(logoPath, 46, 38, { fit: [116, 54] });
    } catch {
      doc
        .font("Helvetica-Bold")
        .fontSize(20)
        .fillColor("#123D52")
        .text("CLEAN WASH", 46, 48);
    }

    doc
      .font("Helvetica-Bold")
      .fontSize(24)
      .fillColor("#123D52")
      .text("INVOICE", pageWidth - 220, 42, { width: 174, align: "right" });
    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor("#526873")
      .text(safeText(invoice.invoiceNumber), pageWidth - 220, 75, {
        width: 174,
        align: "right",
      });

    doc
      .moveTo(46, 112)
      .lineTo(pageWidth - 46, 112)
      .lineWidth(1)
      .strokeColor("#D7E5EA")
      .stroke();

    drawLabelValue(doc, "CUSTOMER", safeText(invoice.customerName), 46, 132, 230);
    drawLabelValue(doc, "EMAIL", safeText(invoice.customerEmail), 46, 176, 230);
    drawLabelValue(doc, "PHONE", safeText(invoice.customerPhone), 46, 220, 230);
    drawLabelValue(doc, "ADDRESS", safeText(invoice.customerAddress), 46, 264, 230);

    drawLabelValue(doc, "INVOICE DATE", safeText(invoice.invoiceDate), 320, 132, 225);
    drawLabelValue(doc, "BOOKING ID", safeText(invoice.bookingId), 320, 176, 225);
    drawLabelValue(
      doc,
      "VEHICLE / PLATE",
      `${safeText(invoice.vehicle)} / ${safeText(invoice.registrationNumber)}`,
      320,
      220,
      225
    );
    drawLabelValue(doc, "APPOINTMENT", safeText(invoice.appointment), 320, 264, 225);

    let y = 326;
    doc.roundedRect(46, y, contentWidth, 28, 4).fill("#123D52");
    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor("#FFFFFF")
      .text("DESCRIPTION", 58, y + 10, { width: 270 })
      .text("QTY", 336, y + 10, { width: 42, align: "right" })
      .text("UNIT", 390, y + 10, { width: 68, align: "right" })
      .text("TOTAL", 469, y + 10, { width: 64, align: "right" });
    y += 36;

    const lines =
      invoice.lines.length > 0
        ? invoice.lines
        : [
            {
              description: invoice.service || "Clean Wash service",
              quantity: 1,
              unitPriceDkk: invoice.totalDkk,
              totalDkk: invoice.totalDkk,
            },
          ];

    for (const line of lines) {
      if (y > 680) {
        doc.addPage();
        y = 52;
      }

      doc
        .font("Helvetica")
        .fontSize(9.5)
        .fillColor("#102D38")
        .text(safeText(line.description), 58, y, { width: 270 })
        .text(String(Math.max(1, Number(line.quantity || 1))), 336, y, {
          width: 42,
          align: "right",
        })
        .text(formatMoney(line.unitPriceDkk, invoice.currency), 390, y, {
          width: 68,
          align: "right",
        })
        .text(formatMoney(line.totalDkk, invoice.currency), 469, y, {
          width: 64,
          align: "right",
        });
      doc
        .moveTo(58, y + 22)
        .lineTo(533, y + 22)
        .lineWidth(0.5)
        .strokeColor("#E1EBEF")
        .stroke();
      y += 32;
    }

    y = Math.max(y + 12, 512);
    const totalsX = 342;
    const drawTotal = (label: string, amount: number, bold = false) => {
      doc
        .font(bold ? "Helvetica-Bold" : "Helvetica")
        .fontSize(bold ? 11 : 9.5)
        .fillColor("#102D38")
        .text(label, totalsX, y, { width: 92 })
        .text(formatMoney(amount, invoice.currency), 440, y, {
          width: 93,
          align: "right",
        });
      y += bold ? 26 : 21;
    };

    drawTotal("Subtotal ex. VAT", invoice.subtotalExVatDkk);
    drawTotal("VAT 25%", invoice.vatDkk);
    doc.moveTo(totalsX, y).lineTo(533, y).lineWidth(1).strokeColor("#123D52").stroke();
    y += 10;
    drawTotal("TOTAL", invoice.totalDkk, true);

    const footerY = doc.page.height - 80;
    doc
      .moveTo(46, footerY - 12)
      .lineTo(pageWidth - 46, footerY - 12)
      .lineWidth(0.7)
      .strokeColor("#D7E5EA")
      .stroke();
    doc
      .font("Helvetica")
      .fontSize(8.5)
      .fillColor("#526873")
      .text(
        "Clean Wash | Payment according to agreement | Thank you for choosing Clean Wash.",
        46,
        footerY,
        { width: contentWidth, align: "center" }
      );

    doc.end();
  });

export const isSimplePdfBuffer = (buffer: Buffer) =>
  buffer.byteLength > 1000 && buffer.subarray(0, 4).toString("ascii") === "%PDF";
