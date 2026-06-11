import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { ensureSchema, getSql } from "@/lib/server/db";
import { getAgentBalance } from "@/lib/assignmentService";

const ensureAdmin = async () => {
  const cookieStore = await cookies();
  return getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
};

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { "cache-control": "no-store" } });

export async function GET() {
  if (!(await ensureAdmin())) return json({ error: "Unauthorized" }, 401);

  try {
    await ensureSchema();
    const sql = getSql();

    const today = new Date().toISOString().slice(0, 10);

    const [totals, pendingRows, agentCountRow, agentBalance] = await Promise.all([
      sql<{ total: number; today: number }[]>`
        SELECT
          COUNT(*)::int AS total,
          COUNT(CASE WHEN appointment_date::DATE = ${today}::DATE THEN 1 END)::int AS today
        FROM bookings;
      `,
      sql<{ id: string }[]>`
        SELECT id
        FROM bookings
        WHERE pending_assignment = true
        ORDER BY created_at ASC
        LIMIT 200;
      `,
      sql<{ count: number }[]>`
        SELECT COUNT(*)::int AS count FROM agents WHERE status = 'active';
      `,
      getAgentBalance(),
    ]);

    return json({
      totalBookings: Number(totals[0]?.total ?? 0),
      todayBookings: Number(totals[0]?.today ?? 0),
      pendingAssignment: pendingRows.length,
      pendingBookingIds: pendingRows.map((r) => r.id),
      activeAgents: Number(agentCountRow[0]?.count ?? 0),
      agentBalance,
    });
  } catch (error) {
    console.error("dashboard stats failed", error);
    return json({ error: "Could not load stats" }, 500);
  }
}
