import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import {
  createAdminAccount,
  deleteAdminAccount,
  getAdminAccountById,
  setAdminAccountStatus,
} from "@/lib/server/admins";
import { isDatabaseConfigured } from "@/lib/server/db";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url), { status: 303 });
  }

  const baseUrl = new URL(request.url).origin;
  const redirectTo = (query: string) =>
    NextResponse.redirect(new URL(`/admin?view=admins${query}`, baseUrl), { status: 303 });

  if (!isDatabaseConfigured()) return redirectTo("");

  const formData = await request.formData();
  const action = String(formData.get("action") || "");

  try {
    if (action === "create") {
      const email = String(formData.get("email") || "").trim();
      const password = String(formData.get("password") || "");

      if (!email || password.length < 8) {
        return redirectTo("&error=admin-management");
      }

      await createAdminAccount({ email, password });
      return redirectTo("&saved=admin-management");
    }

    const id = String(formData.get("id") || "");
    const target = id ? await getAdminAccountById(id) : null;
    if (!target) {
      return redirectTo("&error=admin-management");
    }

    if (target.email.toLowerCase() === session.email.toLowerCase()) {
      return redirectTo("&error=admin-management-self");
    }

    if (action === "toggle") {
      await setAdminAccountStatus(id, target.status === "active" ? "disabled" : "active");
    } else if (action === "delete") {
      await deleteAdminAccount(id);
    }

    return redirectTo("&saved=admin-management");
  } catch (error) {
    console.error("Could not manage admin account", error);
    return redirectTo("&error=admin-management");
  }
}
