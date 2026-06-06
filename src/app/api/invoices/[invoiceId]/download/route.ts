import { NextResponse } from "next/server";
import { getSimpleInvoiceRecord } from "@/lib/server/simple-invoice-workflow";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  context: { params: Promise<{ invoiceId: string }> }
) {
  const { invoiceId } = await context.params;
  const invoice = await getSimpleInvoiceRecord(invoiceId);
  if (!invoice?.public_token) {
    return NextResponse.json(
      {
        success: false,
        code: "HTML_INVOICE_NOT_FOUND",
        message: "Printable invoice not found.",
      },
      { status: 404 }
    );
  }
  return NextResponse.redirect(
    new URL(`/invoices/${invoice.public_token}`, request.url),
    307
  );
}
