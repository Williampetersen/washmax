import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { saveBookingSettings } from "@/lib/server/bookings";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
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

  return NextResponse.redirect(new URL("/admin?view=settings&saved=settings", request.url), 303);
}
