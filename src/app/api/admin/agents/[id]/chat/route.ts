import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { listAgentChatMessages, sendAgentChatMessage } from "@/lib/server/agents";

const ensureAdmin = async () => {
  const cookieStore = await cookies();
  return getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
};

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  return NextResponse.json({ messages: await listAgentChatMessages(id) });
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await ensureAdmin();
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const { id } = await context.params;
  const contentType = request.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await request.json() : await request.formData();
  const message = isJson
    ? String(payload.message || "")
    : String((payload as FormData).get("message") || "");
  const bookingId = isJson
    ? String(payload.bookingId || "")
    : String((payload as FormData).get("booking_id") || "");

  if (!message.trim()) {
    return isJson
      ? NextResponse.json({ error: "Message is required" }, { status: 400 })
      : NextResponse.redirect(new URL("/admin?view=agents&error=agent", request.url), 303);
  }

  const result = await sendAgentChatMessage({
    agentId: id,
    bookingId,
    senderType: "admin",
    senderId: session.email,
    message,
  });

  return isJson
    ? NextResponse.json({ message: result })
    : NextResponse.redirect(new URL("/admin?view=agents&saved=agent", request.url), 303);
}
