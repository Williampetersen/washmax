import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AGENT_COOKIE_NAME, getAgentSession } from "@/lib/server/agent-session";
import { deleteAgentService, updateAgentService } from "@/lib/server/agents";

const getSession = async () => {
  const cookieStore = await cookies();
  return getAgentSession(cookieStore.get(AGENT_COOKIE_NAME)?.value);
};

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();
  const service = await updateAgentService(session.agentId, id, {
    serviceName: body.serviceName,
    isEnabled: body.isEnabled,
  });

  if (!service) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ service });
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.redirect(new URL("/agent/login", request.url), 303);
  }

  const { id } = await context.params;
  const formData = await request.formData();
  const action = String(formData.get("action") || "update");
  if (action === "delete") {
    await deleteAgentService(session.agentId, id);
  } else {
    await updateAgentService(session.agentId, id, {
      serviceName: String(formData.get("service_name") || ""),
      isEnabled: Boolean(formData.get("is_enabled")),
    });
  }

  return NextResponse.redirect(new URL("/agent?view=services&saved=service", request.url), 303);
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  await deleteAgentService(session.agentId, id);
  return NextResponse.json({ ok: true });
}
