import { NextResponse } from "next/server";
import {
  AGENT_COOKIE_NAME,
  createAgentSessionToken,
  getAgentCookieOptions,
} from "@/lib/server/agent-session";
import { authenticateAgent } from "@/lib/server/agents";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  try {
    const agent = await authenticateAgent(email, password);
    if (!agent) {
      return NextResponse.redirect(new URL("/agent/login?error=invalid", request.url), 303);
    }

    const response = NextResponse.redirect(new URL("/agent", request.url), 303);
    response.cookies.set(
      AGENT_COOKIE_NAME,
      createAgentSessionToken(agent.id, agent.email),
      getAgentCookieOptions()
    );
    return response;
  } catch (error) {
    console.error("Could not log agent in", error);
    return NextResponse.redirect(new URL("/agent/login?error=config", request.url), 303);
  }
}
