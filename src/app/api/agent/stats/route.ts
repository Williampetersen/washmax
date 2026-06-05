import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AGENT_COOKIE_NAME, getAgentSession } from "@/lib/server/agent-session";
import { buildAgentStats, listAgentBookings } from "@/lib/server/agents";

export async function GET() {
  const cookieStore = await cookies();
  const session = getAgentSession(cookieStore.get(AGENT_COOKIE_NAME)?.value);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = await listAgentBookings(session.agentId);
  return NextResponse.json({ stats: buildAgentStats(bookings) });
}
