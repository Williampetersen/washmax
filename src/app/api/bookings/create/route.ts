import { NextResponse } from "next/server";
import { bookingRequestSchema } from "@/lib/schemas/booking";
import { createBooking, getBookingSettings } from "@/lib/server/bookings";
import { isDatabaseConfigured } from "@/lib/server/db";
import {
  sendAdminNewBookingAlert,
  sendCustomerBookingCreatedEmail,
} from "@/lib/server/mail";
import { sanitizePlate } from "@/lib/shared/booking";

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, {
    status,
    headers: {
      "cache-control": "no-store",
    },
  });

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return json(
      {
        error: "Bookingsystemet mangler databaseopsaetning. Tilfoej DATABASE_URL i Vercel forst.",
      },
      500
    );
  }

  try {
    const payload = await request.json();
    const parsed = bookingRequestSchema.safeParse(payload);

    if (!parsed.success) {
      return json(
        {
          error: parsed.error.issues[0]?.message || "Der mangler oplysninger i bookingformularen.",
        },
        400
      );
    }

    const settings = await getBookingSettings();
    const { customer, total: _quotedTotal, ...bookingInput } = parsed.data;
    const bookingResult = await createBooking({
      ...bookingInput,
      plate: sanitizePlate(bookingInput.plate),
      status: settings.defaultBookingStatus,
      customer: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        postalCode: customer.postalCode,
        city: customer.city,
        notes: customer.notes,
        customerType: customer.customerType,
        company: customer.company,
        companyId: customer.companyId,
        marketingOptIn: customer.wantsMarketing,
      },
      source: "website",
    });

    const requestOrigin = new URL(request.url).origin;
    const portalBaseUrl = process.env.APP_URL || requestOrigin;
    const portalUrl = `${portalBaseUrl}/kunde/${bookingResult.customer.portalToken}`;

    const mailJobs = [];
    if (settings.emailAutomation.customerOnCreate) {
      mailJobs.push(
        sendCustomerBookingCreatedEmail({
          booking: bookingResult.booking,
          customer: bookingResult.customer,
          settings,
          portalUrl,
        })
      );
    }
    if (settings.emailAutomation.adminOnCreate) {
      mailJobs.push(
        sendAdminNewBookingAlert({
          booking: bookingResult.booking,
          customer: bookingResult.customer,
          settings,
          portalUrl,
        })
      );
    }

    const mailResults = await Promise.allSettled(mailJobs);

    for (const result of mailResults) {
      if (result.status === "rejected") {
        console.error("Booking mail failed", result.reason);
      }
    }

    return json({
      ok: true,
      bookingId: bookingResult.booking.id,
      bookingStatus: bookingResult.booking.status,
      portalUrl,
    });
  } catch (error) {
    return json(
      {
        error: error instanceof Error ? error.message : "Kunne ikke oprette bookingen.",
      },
      500
    );
  }
}
