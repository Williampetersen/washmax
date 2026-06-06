import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  AGENT_COOKIE_NAME,
  getAgentSession,
} from "@/lib/server/agent-session";
import { revalidateBookingRelatedCaches } from "@/lib/server/cache-tags";
import { getBookingById } from "@/lib/server/bookings";
import {
  agentBookingStatuses,
  updateAssignedBookingByAgent,
  type AgentBookingStatus,
} from "@/lib/server/agents";

const normalizeStatus = (value: string): AgentBookingStatus | null =>
  agentBookingStatuses.includes(value as AgentBookingStatus)
    ? (value as AgentBookingStatus)
    : null;

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
  const status = normalizeStatus(String(body.status || ""));
  if (!status) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const booking = await updateAssignedBookingByAgent(session.agentId, id, {
    status,
    note: String(body.note || body.reason || ""),
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
  const status = normalizeStatus(String(formData.get("status") || ""));
  if (!status) {
    return NextResponse.redirect(new URL("/agent?view=tasks&error=booking", request.url), 303);
  }

  await updateAssignedBookingByAgent(session.agentId, id, {
    status,
    note: String(formData.get("note") || ""),
  });
  const details = await getBookingById(id);
  revalidateBookingRelatedCaches({
    agentId: session.agentId,
    portalToken: details?.customer.portalToken,
  });
  return NextResponse.redirect(new URL("/agent?view=tasks&saved=booking", request.url), 303);
}
