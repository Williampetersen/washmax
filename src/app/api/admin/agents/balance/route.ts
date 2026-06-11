import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { getAgentBalance } from "@/lib/assignmentService";

const ensureAdmin = async () => {
  const cookieStore = await cookies();
  return getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
};

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { "cache-control": "no-store" } });

export async function GET() {
  if (!(await ensureAdmin())) {
    return json({ error: "Unauthorized" }, 401);
  }

  try {
    const balance = await getAgentBalance();
    return json(balance);
  } catch (error) {
    console.error("balance fetch failed", error);
    return json({ error: "Could not load agent balance" }, 500);
  }
}
