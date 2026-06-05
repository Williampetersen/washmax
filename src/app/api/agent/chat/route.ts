import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AGENT_COOKIE_NAME, getAgentSession } from "@/lib/server/agent-session";
import { listAgentChatMessages, sendAgentChatMessage } from "@/lib/server/agents";

const getSession = async () => {
  const cookieStore = await cookies();
  return getAgentSession(cookieStore.get(AGENT_COOKIE_NAME)?.value);
};

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ messages: await listAgentChatMessages(session.agentId) });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.redirect(new URL("/agent/login", request.url), 303);
  }

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
      : NextResponse.redirect(new URL("/agent?view=chat&error=chat", request.url), 303);
  }

  const result = await sendAgentChatMessage({
    agentId: session.agentId,
    bookingId,
    senderType: "agent",
    senderId: session.agentId,
    message,
  });

  return isJson
    ? NextResponse.json({ message: result })
    : NextResponse.redirect(new URL("/agent?view=chat&saved=chat", request.url), 303);
}
