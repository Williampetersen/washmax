import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
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

export async function GET() {
  const session = await requireAdmin();
  if (!session) return json({ error: "Ikke autoriseret." }, 401);
  if (!isDatabaseConfigured()) return json({ coupons: [] });

  try {
    await ensureSchema();
    const sql = getSql();
    const coupons = await sql`
      SELECT id, code, description, discount_type, discount_value, min_order_dkk, max_uses, uses_count, is_active, expires_at, created_at
      FROM coupons
      ORDER BY created_at DESC
    `;
    return json({ coupons });
  } catch {
    return json({ error: "Kunne ikke hente rabatkoder." }, 500);
  }
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) return json({ error: "Ikke autoriseret." }, 401);
  if (!isDatabaseConfigured()) return json({ error: "Database ikke konfigureret." }, 500);

  try {
    const body = await request.json() as {
      code: string;
      description?: string;
      discount_type: "percent" | "fixed";
      discount_value: number;
      min_order_dkk?: number;
      max_uses?: number | null;
      expires_at?: string | null;
    };

    if (!body.code?.trim()) return json({ error: "Kode er påkrævet." }, 400);
    if (!body.discount_type || !["percent", "fixed"].includes(body.discount_type)) {
      return json({ error: "Ugyldig rabattype." }, 400);
    }
    if (body.discount_type === "percent" && (body.discount_value < 1 || body.discount_value > 100)) {
      return json({ error: "Procent skal være mellem 1 og 100." }, 400);
    }

    await ensureSchema();
    const sql = getSql();
    const id = randomBytes(12).toString("hex");

    await sql`
      INSERT INTO coupons (id, code, description, discount_type, discount_value, min_order_dkk, max_uses, expires_at)
      VALUES (
        ${id},
        ${body.code.trim().toUpperCase()},
        ${body.description?.trim() || null},
        ${body.discount_type},
        ${body.discount_value},
        ${body.min_order_dkk || 0},
        ${body.max_uses ?? null},
        ${body.expires_at || null}
      )
    `;

    return json({ ok: true, id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (message.includes("unique") || message.includes("duplicate")) {
      return json({ error: "Denne kode eksisterer allerede." }, 409);
    }
    return json({ error: "Kunne ikke oprette rabatkode." }, 500);
  }
}
