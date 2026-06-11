import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { assignBookingToAgent } from "@/lib/server/agents";
import { ensureSchema, getSql } from "@/lib/server/db";

const ensureAdmin = async () => {
  const cookieStore = await cookies();
  return getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
};

const createId = (prefix: string) => `${prefix}_${randomBytes(10).toString("hex")}`;

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

    // Log to assignment_log and bump cumulative counter
    await ensureSchema();
    const sql = getSql();

    await sql`
      INSERT INTO assignment_log (id, booking_id, agent_id, assigned_by, reason)
      VALUES (
        ${createId("asl")},
        ${id},
        ${agentId},
        'admin',
        'Manual assignment by admin'
      );
    `;

    await sql`
      UPDATE agents
      SET
        total_assigned = COALESCE(total_assigned, 0) + 1,
        last_assigned_at = NOW(),
        updated_at = NOW()
      WHERE id = ${agentId};
    `;

    return NextResponse.redirect(new URL("/admin?view=agents&saved=agent", request.url), 303);
  } catch (error) {
    console.error("Could not assign booking to agent", error);
    return NextResponse.redirect(new URL("/admin?view=agents&error=agent", request.url), 303);
  }
}
