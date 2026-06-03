import type { APIRoute } from "astro";
import { getAdminSession } from "@/lib/server/admin-session";
import {
  deleteBooking,
  getBookingSettings,
  updateBookingStatus,
} from "@/lib/server/bookings";
import { sendBookingStatusEmail } from "@/lib/server/mail";

export const prerender = false;

const actionToStatus = {
  approve: "approved",
  complete: "completed",
  cancel: "cancelled",
} as const;

export const POST: APIRoute = async ({ params, request, cookies, redirect }) => {
  if (!getAdminSession(cookies)) {
    return redirect("/admin/login", 303);
  }

  const bookingId = params.id || "";
  const formData = await request.formData();
  const action = String(formData.get("action") || "");
  const adminNotes = String(formData.get("admin_notes") || "").trim();

  if (action === "delete") {
    await deleteBooking(bookingId);
    return redirect("/admin?view=dashboard&saved=deleted", 303);
  }

  const status = actionToStatus[action as keyof typeof actionToStatus];
  if (!status) {
    return redirect("/admin?view=dashboard&error=action", 303);
  }

  const result = await updateBookingStatus(bookingId, status, adminNotes);
  if (result) {
    const settings = await getBookingSettings();
    await sendBookingStatusEmail({
      booking: result.booking,
      customer: result.customer,
      settings,
    });
  }

  return redirect("/admin?view=dashboard&saved=updated", 303);
};
