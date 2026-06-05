import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { listAgentAvailability, listUnavailableDates } from "@/lib/server/agents";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  if (!getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const [availability, unavailableDates] = await Promise.all([
    listAgentAvailability(id),
    listUnavailableDates(id),
  ]);

  return NextResponse.json({ availability, unavailableDates });
}
