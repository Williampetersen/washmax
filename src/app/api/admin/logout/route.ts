import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/server/admin-session";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url), 303);
  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    path: "/",
    maxAge: 0,
  });
  return response;
}
