import { NextResponse } from "next/server";
import { AGENT_COOKIE_NAME } from "@/lib/server/agent-session";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/agent/login", request.url), 303);
  response.cookies.set(AGENT_COOKIE_NAME, "", {
    path: "/",
    maxAge: 0,
  });
  return response;
}
