import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import {
  deleteBooking,
  getBookingSettings,
  updateBookingStatus,
} from "@/lib/server/bookings";
import { sendBookingStatusEmail } from "@/lib/server/mail";

const actionToStatus = {
  approve: "approved",
  complete: "completed",
  cancel: "cancelled",
} as const;

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  if (!getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const { id } = await context.params;
  const formData = await request.formData();
  const action = String(formData.get("action") || "");
  const adminNotes = String(formData.get("admin_notes") || "").trim();

  if (action === "delete") {
    await deleteBooking(id);
    return NextResponse.redirect(new URL("/admin?view=dashboard&saved=deleted", request.url), 303);
  }

  const status = actionToStatus[action as keyof typeof actionToStatus];
  if (!status) {
    return NextResponse.redirect(new URL("/admin?view=dashboard&error=action", request.url), 303);
  }

  const result = await updateBookingStatus(id, status, adminNotes);
  if (result) {
    const settings = await getBookingSettings();
    await sendBookingStatusEmail({
      booking: result.booking,
      customer: result.customer,
      settings,
    });
  }

  return NextResponse.redirect(new URL("/admin?view=dashboard&saved=updated", request.url), 303);
}
