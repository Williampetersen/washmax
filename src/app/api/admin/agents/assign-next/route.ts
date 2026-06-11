import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { autoAssignAgent } from "@/lib/assignmentService";

const ensureAdmin = async () => {
  const cookieStore = await cookies();
  return getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
};

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { "cache-control": "no-store" } });

export async function POST(request: Request) {
  if (!(await ensureAdmin())) {
    return json({ error: "Unauthorized" }, 401);
  }

  let bookingId: string;
  try {
    const body = await request.json();
    bookingId = String(body?.bookingId || "").trim();
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }

  if (!bookingId) {
    return json({ error: "bookingId is required" }, 400);
  }

  try {
    const result = await autoAssignAgent(bookingId);
    return json(result);
  } catch (error) {
    console.error("auto-assign failed", error);
    return json({ error: "Assignment failed" }, 500);
  }
}
