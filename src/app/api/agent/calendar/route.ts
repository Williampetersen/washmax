import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AGENT_COOKIE_NAME, getAgentSession } from "@/lib/server/agent-session";
import { listAgentBookings } from "@/lib/server/agents";

export async function GET() {
  const cookieStore = await cookies();
  const session = getAgentSession(cookieStore.get(AGENT_COOKIE_NAME)?.value);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = await listAgentBookings(session.agentId);
  const days = new Map<string, typeof bookings>();
  for (const booking of bookings) {
    const list = days.get(booking.appointmentDate) || [];
    list.push(booking);
    days.set(booking.appointmentDate, list);
  }

  return NextResponse.json({
    calendar: Array.from(days.entries())
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([date, items]) => ({ date, bookings: items })),
  });
}
