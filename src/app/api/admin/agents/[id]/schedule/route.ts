import { randomBytes } from "node:crypto";
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

const createId = (prefix: string) => `${prefix}_${randomBytes(10).toString("hex")}`;

type ScheduleInput = {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
};

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
      day_of_week: number;
      start_time: string;
      end_time: string;
      is_active: boolean;
    }[]>`
      SELECT day_of_week, start_time, end_time, is_active
      FROM agent_schedules
      WHERE agent_id = ${agentId}
      ORDER BY day_of_week ASC;
    `;

    return json(
      rows.map((r) => ({
        dayOfWeek: Number(r.day_of_week),
        startTime: String(r.start_time).slice(0, 5),
        endTime: String(r.end_time).slice(0, 5),
        isActive: Boolean(r.is_active),
      }))
    );
  } catch (error) {
    console.error("schedule GET failed", error);
    return json({ error: "Could not load schedule" }, 500);
  }
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await ensureAdmin())) return json({ error: "Unauthorized" }, 401);

  const { id: agentId } = await context.params;

  let rows: ScheduleInput[];
  try {
    rows = await request.json();
    if (!Array.isArray(rows)) throw new Error("Expected array");
  } catch {
    return json({ error: "Invalid schedule data" }, 400);
  }

  try {
    await ensureSchema();
    const sql = getSql();

    for (const row of rows) {
      const dayOfWeek = Number(row.dayOfWeek);
      if (dayOfWeek < 0 || dayOfWeek > 6) continue;

      const startTime = String(row.startTime || "09:00").slice(0, 5);
      const endTime = String(row.endTime || "17:00").slice(0, 5);
      const isActive = Boolean(row.isActive);

      await sql`
        INSERT INTO agent_schedules (id, agent_id, day_of_week, start_time, end_time, is_active)
        VALUES (
          ${createId("sch")},
          ${agentId},
          ${dayOfWeek},
          ${startTime},
          ${endTime},
          ${isActive}
        )
        ON CONFLICT (agent_id, day_of_week) DO UPDATE SET
          start_time = EXCLUDED.start_time,
          end_time = EXCLUDED.end_time,
          is_active = EXCLUDED.is_active;
      `;
    }

    return json({ ok: true });
  } catch (error) {
    console.error("schedule POST failed", error);
    return json({ error: "Could not save schedule" }, 500);
  }
}
