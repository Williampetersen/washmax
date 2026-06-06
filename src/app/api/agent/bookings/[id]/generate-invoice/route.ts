import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AGENT_COOKIE_NAME, getAgentSession } from "@/lib/server/agent-session";
import { revalidateBookingRelatedCaches } from "@/lib/server/cache-tags";
import { generateInvoiceForBooking } from "@/lib/server/invoices";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const session = getAgentSession(cookieStore.get(AGENT_COOKIE_NAME)?.value);
  if (!session) {
    return NextResponse.redirect(new URL("/agent/login", request.url), 303);
  }

  const { id } = await context.params;
  const isJson = (request.headers.get("content-type") || "").includes("application/json");
  try {
    const result = await generateInvoiceForBooking({
      bookingId: id,
      actorType: "agent",
      agentId: session.agentId,
      createdByUserId: session.agentId,
    });
    revalidateBookingRelatedCaches({
      agentId: session.agentId,
      portalToken: result.data.customer.portalToken,
    });
    return isJson
      ? NextResponse.json(result)
      : NextResponse.redirect(new URL(`/agent?view=tasks&saved=invoice#booking-${id}`, request.url), 303);
  } catch (error) {
    console.error("Could not generate agent invoice", error);
    return isJson
      ? NextResponse.json({ error: "Could not generate invoice" }, { status: 400 })
      : NextResponse.redirect(new URL(`/agent?view=tasks&error=invoice#booking-${id}`, request.url), 303);
  }
}
