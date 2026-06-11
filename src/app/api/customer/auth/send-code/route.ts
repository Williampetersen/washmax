import { NextResponse } from "next/server";
import { generateVerificationCode } from "@/lib/server/customer-auth";
import { getBookingSettings } from "@/lib/server/bookings";
import { sendCustomerVerificationCodeEmail } from "@/lib/server/mail";

export const runtime = "nodejs";

const isDev = process.env.NODE_ENV === "development";

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { "cache-control": "no-store" } });

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { portalToken?: unknown };
    const portalToken = String(body.portalToken || "").trim();

    if (!portalToken) {
      return json({ ok: false, error: "invalid_request" }, 400);
    }

    if (isDev) console.log("[send-code] API called");

    const result = await generateVerificationCode(portalToken);

    if (!result.ok) {
      if (result.error === "cooldown") {
        if (isDev) console.log(`[send-code] Cooldown active, waitSeconds=${result.waitSeconds}`);
        return json({ ok: false, error: "cooldown", waitSeconds: result.waitSeconds });
      }
      // Return generic success for not_found to prevent token enumeration
      if (isDev) console.log("[send-code] No matching customer/booking found for verification email.");
      return json({ ok: true });
    }

    const maskedEmail = result.email.replace(/^(.{2}).*@/, "$1***@");
    if (isDev) console.log(`[send-code] Verification record created. Target: ${maskedEmail}`);

    try {
      const settings = await getBookingSettings();
      if (isDev) console.log("[send-code] sendMail started");
      await sendCustomerVerificationCodeEmail({
        customerEmail: result.email,
        code: result.code,
        settings: {
          companyName: settings.companyName,
          supportEmail: settings.supportEmail,
          adminNotifyEmail: settings.adminNotifyEmail,
        },
      });
      if (isDev) console.log("[send-code] sendMail success");
    } catch (emailError) {
      console.error(
        "[send-code] sendMail error:",
        emailError instanceof Error ? emailError.message : emailError,
      );
      return json({ ok: false, error: "email_failed" }, 500);
    }

    return json({ ok: true });
  } catch {
    return json({ ok: false, error: "server_error" }, 500);
  }
}
