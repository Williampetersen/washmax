import { NextResponse } from "next/server";
import { getInvoiceRequestActor } from "@/lib/server/invoice-request-auth";
import { listInvoicesForActor } from "@/lib/server/invoices";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const actor = await getInvoiceRequestActor();
  if (!actor) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }
  const url = new URL(request.url);
  return NextResponse.json({
    success: true,
    invoices: await listInvoicesForActor(actor, {
      customerId: url.searchParams.get("customerId") || undefined,
      agentId: url.searchParams.get("agentId") || undefined,
      bookingId: url.searchParams.get("bookingId") || undefined,
    }),
  });
}
