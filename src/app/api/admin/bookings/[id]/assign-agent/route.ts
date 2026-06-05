import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { assignBookingToAgent } from "@/lib/server/agents";

const ensureAdmin = async () => {
  const cookieStore = await cookies();
  return getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
};

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await ensureAdmin())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const { id } = await context.params;
  const formData = await request.formData();
  const agentId = String(formData.get("agent_id") || "").trim();
  const note = String(formData.get("note") || "").trim();

  try {
    await assignBookingToAgent(id, agentId, note);
    return NextResponse.redirect(new URL("/admin?view=agents&saved=agent", request.url), 303);
  } catch (error) {
    console.error("Could not assign booking to agent", error);
    return NextResponse.redirect(new URL("/admin?view=agents&error=agent", request.url), 303);
  }
}
