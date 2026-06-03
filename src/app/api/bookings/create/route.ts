import { NextResponse } from "next/server";
import { bookingRequestSchema } from "@/lib/schemas/booking";
import { createBooking, getBookingSettings } from "@/lib/server/bookings";
import { isDatabaseConfigured } from "@/lib/server/db";
import { sendBookingConfirmationEmails } from "@/lib/server/mail";
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

    const { customer, ...bookingInput } = parsed.data;
    const bookingResult = await createBooking({
      ...bookingInput,
      plate: sanitizePlate(bookingInput.plate),
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

    const settings = await getBookingSettings();
    const requestOrigin = new URL(request.url).origin;
    const portalBaseUrl = process.env.APP_URL || requestOrigin;
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
        error: error instanceof Error ? error.message : "Kunne ikke oprette bookingen.",
      },
      500
    );
  }
}
