import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AGENT_COOKIE_NAME, getAgentSession } from "@/lib/server/agent-session";
import { revalidateAdminAgentsCache, revalidateAgentDashboardCache } from "@/lib/server/cache-tags";
import { AgentAvatarError, saveAgentAvatarFile } from "@/lib/server/agent-avatar";

const getSession = async () => {
  const cookieStore = await cookies();
  return getAgentSession(cookieStore.get(AGENT_COOKIE_NAME)?.value);
};

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData();
  const avatar = formData.get("avatar");
  if (!(avatar instanceof File)) {
    return NextResponse.json(
      { success: false, message: "Please choose an image file." },
      { status: 400 }
    );
  }

  try {
    const result = await saveAgentAvatarFile(session.agentId, avatar);
    revalidateAdminAgentsCache();
    revalidateAgentDashboardCache(session.agentId);

    return NextResponse.json({
      success: true,
      avatarUrl: result.avatarUrl,
      agent: result.agent,
      message: "Avatar saved successfully.",
    });
  } catch (error) {
    console.error("Could not save agent avatar", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof AgentAvatarError ? error.message : "Avatar could not be saved.",
      },
      { status: error instanceof AgentAvatarError ? error.statusCode : 500 }
    );
  }
}
