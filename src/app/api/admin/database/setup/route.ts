import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { runDatabaseMigrations } from "@/lib/server/db";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  try {
    await runDatabaseMigrations();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Database setup failed", error);
    return NextResponse.json({ error: "Database setup failed." }, { status: 500 });
  }
}
