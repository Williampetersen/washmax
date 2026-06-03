import type { APIRoute } from "astro";
import { getAdminSession } from "@/lib/server/admin-session";
import { saveBookingSettings } from "@/lib/server/bookings";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  if (!getAdminSession(cookies)) {
    return redirect("/admin/login", 303);
  }

  const formData = await request.formData();

  await saveBookingSettings({
    companyName: String(formData.get("company_name") || "WashMax").trim(),
    supportEmail: String(formData.get("support_email") || "").trim(),
    adminNotifyEmail: String(formData.get("admin_notify_email") || "").trim(),
    startHour: Number(formData.get("start_hour") || 8),
    endHour: Number(formData.get("end_hour") || 18),
    slotMinutes: Number(formData.get("slot_minutes") || 150),
  });

  return redirect("/admin?view=settings&saved=settings", 303);
};
