import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminSession } from "@/lib/server/admin-session";
import { ensureSchema, getSql, isDatabaseConfigured } from "@/lib/server/db";

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { "cache-control": "no-store" } });

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return null;
  return getAdminSession(token);
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) return json({ error: "Ikke autoriseret." }, 401);
  if (!isDatabaseConfigured()) return json({ error: "Database ikke konfigureret." }, 500);

  const { id } = await params;
  const body = await request.json() as { is_active?: boolean };

  try {
    await ensureSchema();
    const sql = getSql();

    if (typeof body.is_active === "boolean") {
      await sql`UPDATE coupons SET is_active = ${body.is_active}, updated_at = NOW() WHERE id = ${id}`;
    }

    return json({ ok: true });
  } catch {
    return json({ error: "Kunne ikke opdatere rabatkode." }, 500);
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) return json({ error: "Ikke autoriseret." }, 401);
  if (!isDatabaseConfigured()) return json({ error: "Database ikke konfigureret." }, 500);

  const { id } = await params;

  try {
    await ensureSchema();
    const sql = getSql();
    await sql`DELETE FROM coupons WHERE id = ${id}`;
    return json({ ok: true });
  } catch {
    return json({ error: "Kunne ikke slette rabatkode." }, 500);
  }
}
