import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import {
  revalidateAdminAgentsCache,
  revalidateAdminDashboardCache,
  revalidateAgentDashboardCache,
} from "@/lib/server/cache-tags";
import { AgentAvatarError, saveAgentAvatarFile } from "@/lib/server/agent-avatar";

const ensureAdmin = async () => {
  const cookieStore = await cookies();
  return getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
};

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await ensureAdmin())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const { id } = await context.params;
  const formData = await request.formData();
  const avatar = formData.get("avatar");
  const wantsJson =
    request.headers.get("x-requested-with") === "fetch" ||
    (request.headers.get("accept") || "").includes("application/json");

  if (!(avatar instanceof File)) {
    return wantsJson
      ? NextResponse.json({ success: false, message: "Please choose an image file." }, { status: 400 })
      : NextResponse.redirect(new URL("/admin?view=agents&error=agent", request.url), 303);
  }

  try {
    const result = await saveAgentAvatarFile(id, avatar);
    revalidateAdminAgentsCache();
    revalidateAdminDashboardCache();
    revalidateAgentDashboardCache(id);

    return wantsJson
      ? NextResponse.json({
          success: true,
          avatarUrl: result.avatarUrl,
          agent: result.agent,
          message: "Avatar saved successfully.",
        })
      : NextResponse.redirect(new URL("/admin?view=agents&saved=agent", request.url), 303);
  } catch (error) {
    console.error("Could not upload agent avatar", error);
    if (wantsJson) {
      return NextResponse.json(
        {
          success: false,
          message:
            error instanceof AgentAvatarError
              ? error.message
              : "Avatar could not be saved.",
        },
        { status: error instanceof AgentAvatarError ? error.statusCode : 500 }
      );
    }

    return NextResponse.redirect(new URL("/admin?view=agents&error=agent", request.url), 303);
  }
}
