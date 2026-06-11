import { NextResponse } from "next/server";
import { generateVerificationCode } from "@/lib/server/customer-auth";
import { getBookingSettings } from "@/lib/server/bookings";
import { sendCustomerVerificationCodeEmail } from "@/lib/server/mail";

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { "cache-control": "no-store" } });

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { portalToken?: unknown };
    const portalToken = String(body.portalToken || "").trim();

    if (!portalToken) {
      return json({ ok: false, error: "invalid_request" }, 400);
    }

    const result = await generateVerificationCode(portalToken);

    if (!result.ok) {
      if (result.error === "cooldown") {
        return json({ ok: false, error: "cooldown", waitSeconds: result.waitSeconds });
      }
      // Return generic success for not_found to prevent token enumeration
      return json({ ok: true });
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
    } catch (emailError) {
      console.error("Failed to send verification code email", emailError);
      // Don't surface the error — code is stored in DB, can be retried
    }

    return json({ ok: true });
  } catch {
    return json({ ok: false, error: "server_error" }, 500);
  }
}
