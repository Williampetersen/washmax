import type { APIRoute } from "astro";
import { getAdminSession } from "@/lib/server/admin-session";
import { createBooking, getBookingSettings } from "@/lib/server/bookings";
import { sendBookingConfirmationEmails } from "@/lib/server/mail";
import { getPackageTitle } from "@/lib/shared/booking";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  if (!getAdminSession(cookies)) {
    return redirect("/admin/login", 303);
  }

  const formData = await request.formData();
  const packageId = String(formData.get("package_id") || "whole");
  const bookingResult = await createBooking({
    plate: String(formData.get("plate") || "").trim().toUpperCase(),
    registrationNumber: String(
      formData.get("registration_number") || formData.get("plate") || ""
    ).trim(),
    vehicleName: String(formData.get("vehicle_name") || "Din bil").trim(),
    vehicleYear: Number(formData.get("vehicle_year") || 0) || null,
    vehicleType: String(formData.get("vehicle_type") || "").trim(),
    category: String(formData.get("category") || "").trim(),
    packageId,
    packageLabel: getPackageTitle(packageId),
    addons: [],
    subtotal: Number(formData.get("subtotal") || formData.get("total") || 0),
    total: Number(formData.get("total") || 0),
    appointmentDate: String(formData.get("appointment_date") || "").trim(),
    appointmentTime: String(formData.get("appointment_time") || "").trim(),
    source: "admin",
    status: "approved",
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

  if (formData.get("send_email")) {
    const settings = await getBookingSettings();
    const portalBaseUrl =
      import.meta.env.APP_URL || new URL(request.url).origin;
    const portalUrl = `${portalBaseUrl}/kunde/${bookingResult.customer.portalToken}`;
    await sendBookingConfirmationEmails({
      booking: bookingResult.booking,
      customer: bookingResult.customer,
      settings,
      portalUrl,
    });
  }

  return redirect("/admin?view=dashboard&saved=created", 303);
};
