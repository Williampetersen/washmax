import { NextResponse } from "next/server";
import { ensureSchema, getSql, isDatabaseConfigured } from "@/lib/server/db";
import { generateVerificationCode, maskEmail } from "@/lib/server/customer-auth";
import { getBookingSettings } from "@/lib/server/bookings";
import { sendCustomerVerificationCodeEmail } from "@/lib/server/mail";

export const runtime = "nodejs";

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { "cache-control": "no-store" } });

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) return json({ ok: false, error: "server_error" }, 500);

  try {
    const body = (await request.json()) as { email?: unknown };
    const email = String(body.email || "").trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return json({ ok: false, error: "invalid_email" }, 400);
    }

    await ensureSchema({ force: true });
    const sql = getSql();

    const [customer] = await sql<{ portal_token: string; email: string }[]>`
      SELECT portal_token, email FROM customers
      WHERE LOWER(email) = ${email}
        AND portal_token IS NOT NULL
        AND (portal_token_expires_at IS NULL OR portal_token_expires_at > NOW())
      ORDER BY created_at DESC
      LIMIT 1;
    `;

    if (!customer) {
      // Generic success — don't reveal whether the email exists
      return json({ ok: true, notFound: true });
    }

    const result = await generateVerificationCode(customer.portal_token);

    if (!result.ok) {
      if (result.error === "cooldown") {
        return json({
          ok: false,
          error: "cooldown",
          waitSeconds: result.waitSeconds,
          portalToken: customer.portal_token,
          maskedEmail: maskEmail(customer.email),
        });
      }
      return json({ ok: true, notFound: true });
    }

    try {
      const settings = await getBookingSettings();
      await sendCustomerVerificationCodeEmail({
        customerEmail: result.email,
        code: result.code,
        settings: {
          companyName: settings.companyName,
          supportEmail: settings.supportEmail,
          adminNotifyEmail: settings.adminNotifyEmail,
        },
      });
    } catch {
      return json({ ok: false, error: "email_failed" }, 500);
    }

    return json({
      ok: true,
      portalToken: customer.portal_token,
      maskedEmail: maskEmail(result.email),
    });
  } catch {
    return json({ ok: false, error: "server_error" }, 500);
  }
}
