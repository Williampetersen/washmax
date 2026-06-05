import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { getBookingSetupData, saveOpeningHours } from "@/lib/server/booking-setup";

const ensureAdmin = async () => {
  const cookieStore = await cookies();
  return getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
};

export async function GET() {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await getBookingSetupData();
  return NextResponse.json({ openingHours: data.openingHours });
}

export async function PATCH(request: Request) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  await saveOpeningHours(body.openingHours || []);
  return NextResponse.json({ ok: true });
}

export async function POST(request: Request) {
  if (!(await ensureAdmin())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }
  const formData = await request.formData();
  const entries = Array.from({ length: 7 }, (_, weekday) => ({
    weekday,
    isOpen: Boolean(formData.get(`is_open_${weekday}`)),
    startTime: String(formData.get(`start_time_${weekday}`) || "09:00"),
    endTime: String(formData.get(`end_time_${weekday}`) || "17:00"),
  }));
  await saveOpeningHours(entries);
  return NextResponse.redirect(new URL("/admin?view=booking-setup&saved=booking-setup", request.url), 303);
}
