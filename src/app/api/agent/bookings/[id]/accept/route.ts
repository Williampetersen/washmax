import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AGENT_COOKIE_NAME, getAgentSession } from "@/lib/server/agent-session";
import { revalidateBookingRelatedCaches } from "@/lib/server/cache-tags";
import { getBookingById } from "@/lib/server/bookings";
import { updateAssignedBookingByAgent } from "@/lib/server/agents";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const session = getAgentSession(cookieStore.get(AGENT_COOKIE_NAME)?.value);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => ({}));
  const booking = await updateAssignedBookingByAgent(session.agentId, id, {
    status: "accepted",
    note: String(body.note || ""),
  });

  if (!booking) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const details = await getBookingById(id);
  revalidateBookingRelatedCaches({
    agentId: session.agentId,
    portalToken: details?.customer.portalToken,
  });
  return NextResponse.json({ booking });
}

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
  const formData = await request.formData();
  await updateAssignedBookingByAgent(session.agentId, id, {
    status: "accepted",
    note: String(formData.get("note") || ""),
  });
  const details = await getBookingById(id);
  revalidateBookingRelatedCaches({
    agentId: session.agentId,
    portalToken: details?.customer.portalToken,
  });
  return NextResponse.redirect(new URL("/agent?view=tasks&saved=booking", request.url), 303);
}
