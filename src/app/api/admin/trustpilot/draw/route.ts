import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { runTrustpilotWeeklyDraw } from "@/lib/server/bookings";
import { getBookingSettingsFromSetup } from "@/lib/server/booking-setup";
import { sendTrustpilotDiscountWinnerEmail } from "@/lib/server/mail";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const formData = await request.formData();
  const returnView = String(formData.get("return_view") || "trustpilot");

  const redirectWith = (query: string) =>
    NextResponse.redirect(new URL(`/admin?view=${encodeURIComponent(returnView)}&${query}`, request.url), 303);

  try {
    const settings = await getBookingSettingsFromSetup();
    if (!settings.emailAutomation.customerOnTrustpilotWinner) {
      return redirectWith("saved=draw-disabled");
    }

    const result = await runTrustpilotWeeklyDraw();

    if (!result.picked) {
      const isAlreadyDrawn = result.reason.includes("allerede");
      return redirectWith(isAlreadyDrawn ? "saved=draw-skip" : "saved=draw-empty");
    }

    await sendTrustpilotDiscountWinnerEmail({
      bookingId: result.booking.id,
      customerId: result.customer.id,
      customerName: result.draw.customerName,
      customerEmail: result.draw.customerEmail,
      couponCode: result.draw.couponCode,
      settings,
    });

    return redirectWith("saved=draw");
  } catch (error) {
    console.error("Could not run Trustpilot weekly draw", error);
    return redirectWith("error=action");
  }
}
