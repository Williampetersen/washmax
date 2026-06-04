import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { createBooking, getBookingSettings } from "@/lib/server/bookings";
import { sendCustomerBookingCreatedEmail } from "@/lib/server/mail";
import { getPackageTitle, sanitizePlate } from "@/lib/shared/booking";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const formData = await request.formData();
  const packageId = String(formData.get("package_id") || "whole");
  const settings = await getBookingSettings();
  const returnView = String(formData.get("return_view") || "bookings");
  const bookingResult = await createBooking({
    plate: sanitizePlate(String(formData.get("plate") || "")),
    registrationNumber: String(
      formData.get("registration_number") || formData.get("plate") || ""
    ).trim(),
    vehicleName: String(formData.get("vehicle_name") || "Din bil").trim(),
    vehicleYear: Number(formData.get("vehicle_year") || 0) || null,
    vehicleType: String(formData.get("vehicle_type") || "").trim(),
    category: String(formData.get("category") || "").trim(),
    packageId,
    packageLabel: getPackageTitle(packageId, settings.catalog),
    addons: [],
    subtotal: Number(formData.get("subtotal") || formData.get("total") || 0),
    manualTotal: Number(formData.get("total") || 0),
    appointmentDate: String(formData.get("appointment_date") || "").trim(),
    appointmentTime: String(formData.get("appointment_time") || "").trim(),
    source: "admin",
    status: settings.defaultBookingStatus,
    adminNotes: String(formData.get("admin_notes") || "").trim(),
    customer: {
      firstName: String(formData.get("first_name") || "").trim(),
      lastName: String(formData.get("last_name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      address: String(formData.get("address") || "").trim(),
      postalCode: String(formData.get("postal_code") || "").trim(),
      city: String(formData.get("city") || "").trim(),
      notes: String(formData.get("notes") || "").trim(),
      customerType:
        String(formData.get("customer_type") || "private") === "business"
          ? "business"
          : "private",
      company: String(formData.get("company") || "").trim(),
      companyId: String(formData.get("company_id") || "").trim(),
      marketingOptIn: Boolean(formData.get("marketing_opt_in")),
    },
  });

  if (settings.emailAutomation.customerOnCreate && formData.get("send_email")) {
    const portalBaseUrl = process.env.APP_URL || new URL(request.url).origin;
    const portalUrl = `${portalBaseUrl}/kunde/${bookingResult.customer.portalToken}`;
    await sendCustomerBookingCreatedEmail({
      booking: bookingResult.booking,
      customer: bookingResult.customer,
      settings,
      portalUrl,
    });
  }

  return NextResponse.redirect(
    new URL(`/admin?view=${encodeURIComponent(returnView)}&saved=created`, request.url),
    303
  );
}
