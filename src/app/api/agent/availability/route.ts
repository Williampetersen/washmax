import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AGENT_COOKIE_NAME, getAgentSession } from "@/lib/server/agent-session";
import {
  addUnavailableDate,
  listAgentAvailability,
  listUnavailableDates,
  saveAgentAvailability,
} from "@/lib/server/agents";

const getSession = async () => {
  const cookieStore = await cookies();
  return getAgentSession(cookieStore.get(AGENT_COOKIE_NAME)?.value);
};

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [availability, unavailableDates] = await Promise.all([
    listAgentAvailability(session.agentId),
    listUnavailableDates(session.agentId),
  ]);
  return NextResponse.json({ availability, unavailableDates });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.redirect(new URL("/agent/login", request.url), 303);
  }

  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const body = await request.json();
    const availability = await saveAgentAvailability(session.agentId, body.entries || []);
    return NextResponse.json({ availability });
  }

  const formData = await request.formData();
  const action = String(formData.get("action") || "availability");

  if (action === "unavailable") {
    await addUnavailableDate(session.agentId, {
      startDate: String(formData.get("start_date") || ""),
      endDate: String(formData.get("end_date") || formData.get("start_date") || ""),
      reason: String(formData.get("reason") || ""),
    });
    return NextResponse.redirect(new URL("/agent?view=availability&saved=availability", request.url), 303);
  }

  const entries = Array.from({ length: 7 }, (_, weekday) => ({
    weekday,
    startTime: String(formData.get(`start_time_${weekday}`) || "09:00"),
    endTime: String(formData.get(`end_time_${weekday}`) || "17:00"),
    breakStartTime: String(formData.get(`break_start_time_${weekday}`) || ""),
    breakEndTime: String(formData.get(`break_end_time_${weekday}`) || ""),
    isAvailable: Boolean(formData.get(`is_available_${weekday}`)),
  }));
  await saveAgentAvailability(session.agentId, entries);

  return NextResponse.redirect(new URL("/agent?view=availability&saved=availability", request.url), 303);
}
