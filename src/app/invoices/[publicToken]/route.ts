import { NextResponse } from "next/server";
import { getHtmlInvoiceByPublicToken } from "@/lib/server/simple-invoice-workflow";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  context: { params: Promise<{ publicToken: string }> }
) {
  const { publicToken } = await context.params;
  if (!publicToken || publicToken.length < 32) {
    return NextResponse.json({ message: "Invoice not found." }, { status: 404 });
  }
  const invoice = await getHtmlInvoiceByPublicToken(publicToken);
  const html = invoice?.invoice_html || invoice?.html_snapshot;
  if (!invoice || !html || invoice.status === "cancelled") {
    return NextResponse.json({ message: "Invoice not found." }, { status: 404 });
  }
  return new Response(html, {
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
