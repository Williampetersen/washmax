import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import {
  revalidateAdminAgentsCache,
  revalidateAdminDashboardCache,
  revalidateAgentDashboardCache,
} from "@/lib/server/cache-tags";
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
  const contentType = request.headers.get("content-type") || "";

  let agentId = "";
  let note = "";
  if (contentType.includes("application/json")) {
    const body = (await request.json()) as { agentId?: string; note?: string };
    agentId = String(body.agentId || "").trim();
    note = String(body.note || "").trim();
  } else {
    const formData = await request.formData();
    agentId = String(formData.get("agent_id") || "").trim();
    note = String(formData.get("note") || "").trim();
  }

  try {
    await assignBookingToAgent(id, agentId, note);
    revalidateAdminAgentsCache();
    revalidateAdminDashboardCache();
    revalidateAgentDashboardCache(agentId);
    if (contentType.includes("application/json")) {
      return NextResponse.json({
        success: true,
        message: "Booking assigned successfully.",
      });
    }
    return NextResponse.redirect(new URL("/admin?view=agents&saved=agent", request.url), 303);
  } catch (error) {
    console.error("Could not assign booking to agent", error);
    if (contentType.includes("application/json")) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking could not be assigned.",
        },
        { status: 400 }
      );
    }
    return NextResponse.redirect(new URL("/admin?view=agents&error=agent", request.url), 303);
  }
}
