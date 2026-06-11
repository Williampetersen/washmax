import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { CUSTOMER_COOKIE_NAME } from "@/lib/server/customer-session";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(CUSTOMER_COOKIE_NAME, "", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });
  return NextResponse.json({ ok: true }, { headers: { "cache-control": "no-store" } });
}
