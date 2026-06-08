import { after, NextResponse } from "next/server";
import { bookingRequestSchema } from "@/lib/schemas/booking";
import { createBooking, logBookingActivity } from "@/lib/server/bookings";
import {
  calculateBookingPriceFromSetup,
  getBookingSettingsFromSetup,
} from "@/lib/server/booking-setup";
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

const shouldLogTiming = () =>
  process.env.NODE_ENV === "development" || process.env.PERFORMANCE_LOGS === "true";

const logTiming = (label: string, startedAt: number) => {
  if (!shouldLogTiming()) return;
  console.info(`[perf] ${label} ${Math.round(performance.now() - startedAt)}ms`);
};

export async function POST(request: Request) {
  const startedAt = performance.now();

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

    const settings = await getBookingSettingsFromSetup();
    const { customer, total: _quotedTotal, subtotal: _quotedSubtotal, addons: quotedAddons, ...bookingInput } = parsed.data;
    const pricing = await calculateBookingPriceFromSetup({
      packageId: bookingInput.packageId,
      addonIds: quotedAddons.map((addon) => addon.id),
      categoryLabel: bookingInput.category,
      postalCode: customer.postalCode,
      settings,
    });
    const dbStartedAt = performance.now();
    const bookingResult = await createBooking({
      ...bookingInput,
      idempotencyKey: parsed.data.idempotencyKey,
      plate: sanitizePlate(bookingInput.plate),
      category: pricing.category,
      packageId: pricing.packageId,
      packageLabel: pricing.packageLabel,
      addons: pricing.addons,
      subtotal: pricing.subtotal,
      manualTotal: pricing.total,
      travelSurcharge: pricing.travelSurcharge,
      estimatedMinutes: pricing.estimatedMinutes,
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
      settings,
    });
    logTiming("booking.db", dbStartedAt);

    const requestOrigin = new URL(request.url).origin;
    const portalBaseUrl = process.env.APP_URL || requestOrigin;
    const portalUrl = `${portalBaseUrl}/kunde/${bookingResult.customer.portalToken}`;

    after(async () => {
      const activityJob = logBookingActivity(bookingResult.booking.id, {
        actor: "website",
        activityType: "booking_created",
        summary: "Ny booking oprettet fra websitet.",
        details: {
          status: bookingResult.booking.status,
          appointmentDate: bookingResult.booking.appointmentDate,
          appointmentTime: bookingResult.booking.appointmentTime,
          total: bookingResult.booking.total,
        },
      });

      const mailStartedAt = performance.now();
      const mailJobs: Array<Promise<unknown>> = [];

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

      if (mailJobs.length > 0) {
        const mailResults = await Promise.allSettled(mailJobs);
        logTiming("booking.email", mailStartedAt);
        for (const result of mailResults) {
          if (result.status === "rejected") {
            console.error("Booking mail failed", result.reason);
          }
        }
      }

      try {
        await activityJob;
      } catch (error) {
        console.error("Booking activity log failed", error);
      }
    });

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
  } finally {
    logTiming("booking.api", startedAt);
  }
}
