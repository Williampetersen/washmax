import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { ensureSchema, getSql } from "@/lib/server/db";

const ensureAdmin = async () => {
  const cookieStore = await cookies();
  return getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
};

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { "cache-control": "no-store" } });

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await ensureAdmin())) return json({ error: "Unauthorized" }, 401);

  const { id: agentId } = await context.params;

  try {
    await ensureSchema();
    const sql = getSql();

    const rows = await sql<{
      id: string;
      booking_id: string;
      assigned_at: Date | string;
      assigned_by: string;
      reason: string | null;
      customer_first_name: string | null;
      customer_last_name: string | null;
      customer_email: string | null;
    }[]>`
      SELECT
        al.id,
        al.booking_id,
        al.assigned_at,
        al.assigned_by,
        al.reason,
        c.first_name AS customer_first_name,
        c.last_name  AS customer_last_name,
        c.email      AS customer_email
      FROM assignment_log al
      LEFT JOIN bookings b ON b.id = al.booking_id
      LEFT JOIN customers c ON c.id = b.customer_id
      WHERE al.agent_id = ${agentId}
      ORDER BY al.assigned_at DESC
      LIMIT 20;
    `;

    return json(
      rows.map((r) => {
        const name = [r.customer_first_name, r.customer_last_name]
          .map((s) => String(s || "").trim())
          .filter(Boolean)
          .join(" ") || String(r.customer_email || "");
        return {
          id: String(r.id),
          bookingId: String(r.booking_id),
          customerName: name,
          assignedAt: r.assigned_at instanceof Date
            ? r.assigned_at.toISOString()
            : String(r.assigned_at),
          assignedBy: String(r.assigned_by || "system"),
          reason: String(r.reason || ""),
        };
      })
    );
  } catch (error) {
    console.error("agent history GET failed", error);
    return json({ error: "Could not load history" }, 500);
  }
}
