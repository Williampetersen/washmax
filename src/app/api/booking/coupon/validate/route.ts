import { NextResponse } from "next/server";
import { ensureSchema, getSql, isDatabaseConfigured } from "@/lib/server/db";

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { "cache-control": "no-store" } });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code")?.trim().toUpperCase();
  const totalDkk = Number(searchParams.get("total") || 0);

  if (!code) return json({ valid: false, error: "Ingen kode angivet." }, 400);
  if (!isDatabaseConfigured()) return json({ valid: false, error: "Database ikke konfigureret." }, 500);

  try {
    await ensureSchema();
    const sql = getSql();

    const rows = await sql<{
      id: string;
      code: string;
      description: string | null;
      discount_type: string;
      discount_value: number;
      min_order_dkk: number;
      max_uses: number | null;
      uses_count: number;
      is_active: boolean;
      expires_at: string | null;
    }[]>`
      SELECT id, code, description, discount_type, discount_value, min_order_dkk, max_uses, uses_count, is_active, expires_at
      FROM coupons
      WHERE UPPER(code) = ${code}
      LIMIT 1
    `;

    const coupon = rows[0];

    if (!coupon) return json({ valid: false, error: "Rabatkoden blev ikke fundet." });
    if (!coupon.is_active) return json({ valid: false, error: "Denne rabatkode er ikke aktiv." });
    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      return json({ valid: false, error: "Rabatkoden er udløbet." });
    }
    if (coupon.max_uses !== null && coupon.uses_count >= coupon.max_uses) {
      return json({ valid: false, error: "Rabatkoden er ikke længere tilgængelig." });
    }
    if (totalDkk > 0 && coupon.min_order_dkk > 0 && totalDkk < coupon.min_order_dkk) {
      return json({ valid: false, error: `Ordren skal være mindst ${coupon.min_order_dkk} kr. for at bruge denne kode.` });
    }

    const discountDkk =
      coupon.discount_type === "percent"
        ? Math.round((totalDkk * coupon.discount_value) / 100)
        : coupon.discount_value;

    const label =
      coupon.discount_type === "percent"
        ? `${coupon.discount_value}% rabat`
        : `${coupon.discount_value} kr. rabat`;

    return json({
      valid: true,
      code: coupon.code,
      discountDkk,
      label,
      description: coupon.description,
    });
  } catch {
    return json({ valid: false, error: "Kunne ikke validere koden. Prøv igen." }, 500);
  }
}
