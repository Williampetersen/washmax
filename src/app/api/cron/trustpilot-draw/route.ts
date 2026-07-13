import { NextResponse } from "next/server";
import { runTrustpilotWeeklyDraw } from "@/lib/server/bookings";
import { getBookingSettingsFromSetup } from "@/lib/server/booking-setup";
import { sendTrustpilotDiscountWinnerEmail } from "@/lib/server/mail";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const settings = await getBookingSettingsFromSetup();
    if (!settings.emailAutomation.customerOnTrustpilotWinner) {
      return NextResponse.json({ picked: false, reason: "Trustpilot-vindermail er deaktiveret." });
    }

    const result = await runTrustpilotWeeklyDraw();

    if (!result.picked) {
      return NextResponse.json({ picked: false, reason: result.reason });
    }

    await sendTrustpilotDiscountWinnerEmail({
      bookingId: result.booking.id,
      customerId: result.customer.id,
      customerName: result.draw.customerName,
      customerEmail: result.draw.customerEmail,
      couponCode: result.draw.couponCode,
      settings,
    });

    return NextResponse.json({
      picked: true,
      customerEmail: result.draw.customerEmail,
      couponCode: result.draw.couponCode,
    });
  } catch (error) {
    console.error("Trustpilot weekly draw cron failed", error);
    return NextResponse.json({ error: "Draw failed" }, { status: 500 });
  }
}
