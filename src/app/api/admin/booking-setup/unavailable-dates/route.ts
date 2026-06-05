import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { getBookingSetupData, saveUnavailableDate } from "@/lib/server/booking-setup";

const asText = (value: FormDataEntryValue | null) => String(value || "").trim();
const ensureAdmin = async () => {
  const cookieStore = await cookies();
  return getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
};

export async function GET() {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await getBookingSetupData();
  return NextResponse.json({ unavailableDates: data.unavailableDates });
}

export async function POST(request: Request) {
  if (!(await ensureAdmin())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }
  const formData = await request.formData();
  try {
    await saveUnavailableDate({
      startDate: asText(formData.get("start_date")),
      endDate: asText(formData.get("end_date")) || asText(formData.get("start_date")),
      title: asText(formData.get("title")),
      startTime: asText(formData.get("start_time")) || "00:00",
      endTime: asText(formData.get("end_time")) || "23:59",
      isFullDay: Boolean(formData.get("is_full_day")),
      repeatYearly: Boolean(formData.get("repeat_yearly")),
    });
    return NextResponse.redirect(new URL("/admin?view=booking-setup&saved=booking-setup", request.url), 303);
  } catch (error) {
    console.error("Could not save unavailable date", error);
    return NextResponse.redirect(new URL("/admin?view=booking-setup&error=booking-setup", request.url), 303);
  }
}
