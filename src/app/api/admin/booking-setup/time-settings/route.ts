import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { getBookingSetupData, saveTimeSettings } from "@/lib/server/booking-setup";

const asNumber = (value: FormDataEntryValue | null, fallback = 0) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const ensureAdmin = async () => {
  const cookieStore = await cookies();
  return getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
};

export async function GET() {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await getBookingSetupData();
  return NextResponse.json({ timeSettings: data.timeSettings });
}

export async function PATCH(request: Request) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await saveTimeSettings(await request.json());
  return NextResponse.json({ ok: true });
}

export async function POST(request: Request) {
  if (!(await ensureAdmin())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }
  const formData = await request.formData();
  await saveTimeSettings({
    slotIntervalMinutes: asNumber(formData.get("slot_interval_minutes"), 30),
    minimumNoticeHours: asNumber(formData.get("minimum_notice_hours"), 2),
    maximumDaysAhead: asNumber(formData.get("maximum_days_ahead"), 30),
    bufferBeforeMinutes: asNumber(formData.get("buffer_before_minutes")),
    bufferAfterMinutes: asNumber(formData.get("buffer_after_minutes"), 30),
    maxBookingsPerSlot: asNumber(formData.get("max_bookings_per_slot"), 1),
    maxBookingsPerDay: asNumber(formData.get("max_bookings_per_day")),
    allowSameDayBooking: Boolean(formData.get("allow_same_day_booking")),
  });
  return NextResponse.redirect(new URL("/admin?view=booking-setup&saved=booking-setup", request.url), 303);
}
