import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyVerificationCode } from "@/lib/server/customer-auth";
import {
  CUSTOMER_COOKIE_NAME,
  createCustomerSessionToken,
  getCustomerCookieOptions,
} from "@/lib/server/customer-session";

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { "cache-control": "no-store" } });

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { portalToken?: unknown; code?: unknown };
    const portalToken = String(body.portalToken || "").trim();
    const code = String(body.code || "").trim();

    if (!portalToken || !code) {
      return json({ ok: false, error: "invalid_request" }, 400);
    }

    const result = await verifyVerificationCode(portalToken, code);

    if (!result.ok) {
      return json({ ok: false, error: result.error });
    }

    const sessionToken = createCustomerSessionToken(result.customerId, result.email);
    const cookieOptions = getCustomerCookieOptions();

    const cookieStore = await cookies();
    cookieStore.set(CUSTOMER_COOKIE_NAME, sessionToken, cookieOptions);

    return json({ ok: true, portalToken: result.portalToken });
  } catch {
    return json({ ok: false, error: "server_error" }, 500);
  }
}
