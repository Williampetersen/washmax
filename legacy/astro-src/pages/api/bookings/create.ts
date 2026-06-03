import type { APIRoute } from "astro";
import { createBooking, getBookingSettings } from "@/lib/server/bookings";
import { isDatabaseConfigured } from "@/lib/server/db";
import { sendBookingConfirmationEmails } from "@/lib/server/mail";

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });

export const POST: APIRoute = async ({ request }) => {
  if (!isDatabaseConfigured()) {
    return json(
      {
        error:
          "Bookingsystemet mangler databaseopsætning. Tilføj DATABASE_URL i Vercel først.",
      },
      500
    );
  }

  try {
    const payload = await request.json();
    const customer = payload?.customer || {};

    const requiredFields = [
      payload?.plate,
      payload?.appointmentDate,
      payload?.appointmentTime,
      customer?.firstName,
      customer?.lastName,
      customer?.email,
      customer?.phone,
      customer?.address,
      customer?.postalCode,
      customer?.city,
    ];

    if (requiredFields.some((value) => !String(value || "").trim())) {
      return json({ error: "Der mangler oplysninger i bookingformularen." }, 400);
    }

    const bookingResult = await createBooking({
      plate: String(payload.plate).trim().toUpperCase(),
      registrationNumber: String(
        payload.registrationNumber || payload.plate || ""
      ).trim(),
      vehicleName: String(payload.vehicleName || "Din bil").trim(),
      vehicleYear: Number(payload.vehicleYear || 0) || null,
      vehicleType: String(payload.vehicleType || "").trim(),
      category: String(payload.category || "").trim(),
      packageId: String(payload.packageId || "whole").trim(),
      packageLabel: String(payload.packageLabel || "Hele bilen").trim(),
      addons: Array.isArray(payload.addons) ? payload.addons : [],
      subtotal: Number(payload.subtotal || 0),
      total: Number(payload.total || 0),
      appointmentDate: String(payload.appointmentDate || "").trim(),
      appointmentTime: String(payload.appointmentTime || "").trim(),
      source: "website",
      customer: {
        firstName: String(customer.firstName || "").trim(),
        lastName: String(customer.lastName || "").trim(),
        email: String(customer.email || "").trim(),
        phone: String(customer.phone || "").trim(),
        address: String(customer.address || "").trim(),
        postalCode: String(customer.postalCode || "").trim(),
        city: String(customer.city || "").trim(),
        notes: String(customer.notes || "").trim(),
        customerType:
          customer.customerType === "business" || payload.customerType === "business"
            ? "business"
            : "private",
        company: String(customer.company || "").trim(),
        companyId: String(customer.companyId || "").trim(),
        marketingOptIn: Boolean(customer.wantsMarketing),
      },
    });

    const settings = await getBookingSettings();
    const requestOrigin = new URL(request.url).origin;
    const portalBaseUrl = import.meta.env.APP_URL || requestOrigin;
    const portalUrl = `${portalBaseUrl}/kunde/${bookingResult.customer.portalToken}`;

    await sendBookingConfirmationEmails({
      booking: bookingResult.booking,
      customer: bookingResult.customer,
      settings,
      portalUrl,
    });

    return json({
      ok: true,
      bookingId: bookingResult.booking.id,
      portalUrl,
    });
  } catch (error) {
    return json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Kunne ikke oprette bookingen.",
      },
      500
    );
  }
};
