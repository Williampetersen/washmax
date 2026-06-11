import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { createBooking, getBookingSettings } from "@/lib/server/bookings";
import { sendCustomerBookingCreatedEmail } from "@/lib/server/mail";
import { getPackageTitle, sanitizePlate } from "@/lib/shared/booking";

const asText = (value: FormDataEntryValue | null) => String(value || "").trim();

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const formData = await request.formData();
  const returnView = asText(formData.get("return_view")) || "bookings";
  const redirectWith = (query: string) =>
    NextResponse.redirect(
      new URL(`/admin?view=${encodeURIComponent(returnView)}&${query}`, request.url),
      303
    );

  try {
    const packageId = asText(formData.get("package_id")) || "whole";
    const appointmentDate = asText(formData.get("appointment_date"));
    const appointmentTime = asText(formData.get("appointment_time"));
    const plate = sanitizePlate(asText(formData.get("plate")));
    const total = Number(formData.get("total") || formData.get("subtotal") || 0);

    if (!plate || !appointmentDate || !appointmentTime || !Number.isFinite(total)) {
      return redirectWith("error=action");
    }

    const settings = await getBookingSettings();
    const bookingResult = await createBooking({
      plate,
      registrationNumber: asText(formData.get("registration_number")) || plate,
      vehicleName: asText(formData.get("vehicle_name")) || "Din bil",
      vehicleYear: Number(formData.get("vehicle_year") || 0) || null,
      vehicleType: asText(formData.get("vehicle_type")),
      category: asText(formData.get("category")),
      packageId,
      packageLabel: getPackageTitle(packageId, settings.catalog),
      addons: [],
      subtotal: total,
      manualTotal: total,
      appointmentDate,
      appointmentTime,
      source: "admin",
      status: settings.defaultBookingStatus,
      adminNotes: asText(formData.get("admin_notes")),
      customer: {
        firstName: asText(formData.get("first_name")),
        lastName: asText(formData.get("last_name")),
        email: asText(formData.get("email")),
        phone: asText(formData.get("phone")),
        address: asText(formData.get("address")),
        postalCode: asText(formData.get("postal_code")),
        city: asText(formData.get("city")),
        notes: asText(formData.get("notes")),
        customerType: asText(formData.get("customer_type")) === "business" ? "business" : "private",
        company: asText(formData.get("company")),
        companyId: asText(formData.get("company_id")),
        marketingOptIn: Boolean(formData.get("marketing_opt_in")),
      },
    });

    if (settings.emailAutomation.customerOnCreate && formData.get("send_email")) {
      try {
        const portalBaseUrl = process.env.APP_URL || new URL(request.url).origin;
        const portalUrl = `${portalBaseUrl}/kunde/verify?t=${bookingResult.customer.portalToken}`;
        await sendCustomerBookingCreatedEmail({
          booking: bookingResult.booking,
          customer: bookingResult.customer,
          settings,
          portalUrl,
        });
      } catch (error) {
        console.error("Could not send manual booking email", error);
      }
    }

    return redirectWith("saved=created");
  } catch (error) {
    console.error("Could not create manual booking", error);
    return redirectWith("error=action");
  }
}
