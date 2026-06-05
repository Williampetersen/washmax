import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AGENT_COOKIE_NAME, getAgentSession } from "@/lib/server/agent-session";
import { sendInvoiceForBooking } from "@/lib/server/invoices";

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
    const result = await sendInvoiceForBooking({
      bookingId: id,
      actorType: "agent",
      agentId: session.agentId,
    });
    const query = result.sent ? "saved=invoice-sent" : "error=mail";
    return isJson
      ? NextResponse.json(result, { status: result.sent ? 200 : 202 })
      : NextResponse.redirect(new URL(`/agent?view=tasks&${query}#booking-${id}`, request.url), 303);
  } catch (error) {
    console.error("Could not send agent invoice", error);
    return isJson
      ? NextResponse.json({ error: "Could not send invoice" }, { status: 400 })
      : NextResponse.redirect(new URL(`/agent?view=tasks&error=invoice#booking-${id}`, request.url), 303);
  }
}
