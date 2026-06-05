import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AGENT_COOKIE_NAME, getAgentSession } from "@/lib/server/agent-session";
import { revalidateAdminAgentsCache, revalidateAgentDashboardCache } from "@/lib/server/cache-tags";
import { getAgentById, getAgentDashboardData, updateAgent } from "@/lib/server/agents";

export async function GET() {
  const cookieStore = await cookies();
  const session = getAgentSession(cookieStore.get(AGENT_COOKIE_NAME)?.value);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await getAgentDashboardData(session.agentId);
  if (!data) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ agent: data.agent, notifications: data.notifications });
}

export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const session = getAgentSession(cookieStore.get(AGENT_COOKIE_NAME)?.value);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  const current = await getAgentById(session.agentId);
  if (!current) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  const body = (await request.json()) as {
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
    workingArea?: string;
    notes?: string;
  };

  try {
    const agent = await updateAgent(session.agentId, {
      fullName: body.fullName ?? current.fullName,
      email: body.email ?? current.email,
      phone: body.phone ?? current.phone,
      password: body.password,
      status: current.status,
      assignedServices: current.assignedServices,
      workingArea: body.workingArea ?? current.workingArea,
      notes: body.notes ?? current.notes,
    });

    revalidateAdminAgentsCache();
    revalidateAgentDashboardCache(session.agentId);

    return NextResponse.json({
      success: true,
      agent,
      message: "Profile saved successfully.",
    });
  } catch (error) {
    console.error("Could not update agent profile", error);
    return NextResponse.json(
      {
        success: false,
        message: "Profile could not be saved.",
      },
      { status: 400 }
    );
  }
}
