import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { getBookingSetupData, upsertBookingGeneralSettings } from "@/lib/server/booking-setup";

const asText = (value: FormDataEntryValue | null) => String(value || "").trim();
const asNumber = (value: FormDataEntryValue | null, fallback = 0) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const ensureAdmin = async () => {
  const cookieStore = await cookies();
  return getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
};

export async function PATCH(request: Request) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await upsertBookingGeneralSettings(await request.json());
  return NextResponse.json({ ok: true });
}

export async function POST(request: Request) {
  if (!(await ensureAdmin())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }
  const formData = await request.formData();
  await upsertBookingGeneralSettings({
    bookingEnabled: Boolean(formData.get("booking_enabled")),
    disabledMessage: asText(formData.get("disabled_message")),
    currency: asText(formData.get("currency")) || "DKK",
    vatRate: asNumber(formData.get("vat_rate"), 25),
    companyName: asText(formData.get("company_name")),
    supportEmail: asText(formData.get("support_email")),
    adminNotifyEmail: asText(formData.get("admin_notify_email")),
    adminNotifyEmail2: asText(formData.get("admin_notify_email_2")),
    adminNotifyEmail3: asText(formData.get("admin_notify_email_3")),
    adminNotifyEmail4: asText(formData.get("admin_notify_email_4")),
    adminNotifyEmail5: asText(formData.get("admin_notify_email_5")),
    customerConfirmationEnabled: Boolean(formData.get("customer_confirmation_enabled")),
    adminNotificationEnabled: Boolean(formData.get("admin_notification_enabled")),
    cancellationPolicyText: asText(formData.get("cancellation_policy_text")),
    successMessage: asText(formData.get("success_message")),
  });
  return NextResponse.redirect(new URL("/admin?view=booking-setup&saved=booking-setup", request.url), 303);
}

export async function GET() {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await getBookingSetupData();
  return NextResponse.json({ general: data.general });
}
