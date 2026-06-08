import { NextResponse } from "next/server";
import { getInvoiceByPublicToken } from "@/lib/server/invoices";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  context: { params: Promise<{ publicToken: string }> }
) {
  const { publicToken } = await context.params;
  if (!publicToken || publicToken.length < 32) {
    return NextResponse.json({ message: "Invoice not found." }, { status: 404 });
  }
  const invoice = await getInvoiceByPublicToken(publicToken);
  if (!invoice?.invoiceHtml) {
    return NextResponse.json({ message: "Invoice not found." }, { status: 404 });
  }
  return new Response(invoice.invoiceHtml, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
      "Content-Security-Policy":
        "default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src data:; base-uri 'none'; frame-ancestors 'none'; form-action 'none'",
    },
  });
}
