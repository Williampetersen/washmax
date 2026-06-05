import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AGENT_COOKIE_NAME, getAgentSession } from "@/lib/server/agent-session";
import { revalidateAgentDashboardCache } from "@/lib/server/cache-tags";
import { addAgentService, listAgentServices } from "@/lib/server/agents";

const getSession = async () => {
  const cookieStore = await cookies();
  return getAgentSession(cookieStore.get(AGENT_COOKIE_NAME)?.value);
};

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ services: await listAgentServices(session.agentId) });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.redirect(new URL("/agent/login", request.url), 303);
  }

  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const body = await request.json();
    const service = await addAgentService(
      session.agentId,
      String(body.serviceName || ""),
      body.isEnabled !== false
    );
    revalidateAgentDashboardCache(session.agentId);
    return NextResponse.json({ service });
  }

  const formData = await request.formData();
  await addAgentService(
    session.agentId,
    String(formData.get("service_name") || ""),
    formData.get("is_enabled") !== "false"
  );
  revalidateAgentDashboardCache(session.agentId);
  return NextResponse.redirect(new URL("/agent?view=services&saved=service", request.url), 303);
}
