import type { APIRoute } from "astro";
import {
  isAdminConfigured,
  setAdminSessionCookie,
  validateAdminCredentials,
} from "@/lib/server/admin-session";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  if (!isAdminConfigured()) {
    return redirect("/admin/login?error=config", 303);
  }

  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!validateAdminCredentials(email, password)) {
    return redirect("/admin/login?error=invalid", 303);
  }

  setAdminSessionCookie(cookies, email);
  return redirect("/admin", 303);
};
