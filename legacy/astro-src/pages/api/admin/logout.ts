import type { APIRoute } from "astro";
import { clearAdminSessionCookie } from "@/lib/server/admin-session";

export const prerender = false;

export const POST: APIRoute = async ({ cookies, redirect }) => {
  clearAdminSessionCookie(cookies);
  return redirect("/admin/login", 303);
};
