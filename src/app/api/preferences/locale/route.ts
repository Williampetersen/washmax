import { NextResponse } from "next/server";
import {
  DASHBOARD_LOCALE_COOKIE_NAME,
  normalizeDashboardLocale,
} from "@/lib/shared/dashboard-locale";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const sanitizeRedirect = (value: string | null) => {
  if (!value || !value.startsWith("/")) {
    return "/";
  }

  return value;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = normalizeDashboardLocale(url.searchParams.get("locale"));
  const redirectTo = sanitizeRedirect(url.searchParams.get("redirect"));

  const response = NextResponse.redirect(new URL(redirectTo, request.url), 303);
  response.cookies.set(DASHBOARD_LOCALE_COOKIE_NAME, locale, {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: COOKIE_MAX_AGE,
  });
  return response;
}
