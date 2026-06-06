import { NextResponse } from "next/server";
import { getInvoiceRequestActor } from "@/lib/server/invoice-request-auth";
import { listHtmlInvoicesForActor } from "@/lib/server/simple-invoice-workflow";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const actor = await getInvoiceRequestActor();
  if (!actor) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }
  const url = new URL(request.url);
  return NextResponse.json({
    success: true,
    invoices: await listHtmlInvoicesForActor(actor, {
      customerId: String(url.searchParams.get("customerId") || "").trim() || undefined,
      agentId: String(url.searchParams.get("agentId") || "").trim() || undefined,
      bookingId: String(url.searchParams.get("bookingId") || "").trim() || undefined,
    }),
  });
}
