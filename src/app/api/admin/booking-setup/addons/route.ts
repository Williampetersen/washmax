import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { getBookingSetupData, saveBookingAddon } from "@/lib/server/booking-setup";

const asText = (value: FormDataEntryValue | null) => String(value || "").trim();
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
  return NextResponse.json({ addons: data.addons });
}

export async function POST(request: Request) {
  if (!(await ensureAdmin())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }
  const formData = await request.formData();
  try {
    await saveBookingAddon({
      name: asText(formData.get("name")),
      description: asText(formData.get("description")),
      priceDkk: asNumber(formData.get("price_dkk")),
      durationMinutes: asNumber(formData.get("duration_minutes")),
      addonCategory: asText(formData.get("addon_category")) || "interior",
      sortOrder: asNumber(formData.get("sort_order")),
      isVisible: Boolean(formData.get("is_visible")),
      allowedServiceIds: asText(formData.get("allowed_service_ids"))
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    });
    return NextResponse.redirect(new URL("/admin?view=booking-setup&saved=booking-setup", request.url), 303);
  } catch (error) {
    console.error("Could not create booking addon", error);
    return NextResponse.redirect(new URL("/admin?view=booking-setup&error=booking-setup", request.url), 303);
  }
}
