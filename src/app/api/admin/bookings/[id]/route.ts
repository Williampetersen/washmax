import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import {
  deleteBooking,
  getBookingById,
  getBookingSettings,
  updateBookingFinancials,
  updateBookingSchedule,
  updateBookingStatus,
} from "@/lib/server/bookings";
import {
  sendAdminNewBookingAlert,
  sendCustomerBookingCreatedEmail,
  sendCustomerBookingStatusEmail,
} from "@/lib/server/mail";
import { invoiceStatuses, paymentStatuses } from "@/lib/shared/booking";

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
  const returnView = String(formData.get("return_view") || "bookings");

  const redirectWith = (query: string) =>
    NextResponse.redirect(new URL(`/admin?view=${encodeURIComponent(returnView)}&${query}`, request.url), 303);

  try {
  if (action === "delete") {
    await deleteBooking(id);
    return redirectWith("saved=deleted");
  }

  if (action === "reschedule") {
    const result = await updateBookingSchedule(id, {
      appointmentDate: String(formData.get("appointment_date") || "").trim(),
      appointmentTime: String(formData.get("appointment_time") || "").trim(),
      adminNotes,
    });

    if (result && formData.get("notify_customer")) {
      try {
        const settings = await getBookingSettings();
        const portalBaseUrl = process.env.APP_URL || new URL(request.url).origin;
        const portalUrl = `${portalBaseUrl}/kunde/${result.customer.portalToken}`;
        await sendCustomerBookingStatusEmail({
          booking: result.booking,
          customer: result.customer,
          settings,
          portalUrl,
        });
      } catch (error) {
        console.error("Could not send reschedule email", error);
      }
    }

    return redirectWith("saved=updated");
  }

  if (action === "financial") {
    const paymentStatusValue = String(formData.get("payment_status") || "unpaid");
    const invoiceStatusValue = String(formData.get("invoice_status") || "not_requested");
    const result = await updateBookingFinancials(id, {
      paymentStatus: paymentStatuses.includes(paymentStatusValue as (typeof paymentStatuses)[number])
        ? (paymentStatusValue as (typeof paymentStatuses)[number])
        : "unpaid",
      paymentMethod: String(formData.get("payment_method") || "").trim(),
      invoiceRequested: Boolean(formData.get("invoice_requested")),
      invoiceStatus: invoiceStatuses.includes(invoiceStatusValue as (typeof invoiceStatuses)[number])
        ? (invoiceStatusValue as (typeof invoiceStatuses)[number])
        : "not_requested",
      invoiceNumber: String(formData.get("invoice_number") || "").trim(),
      adminNotes,
    });

    if (!result) {
      return redirectWith("error=action");
    }

    return redirectWith("saved=updated");
  }

  if (action === "resend_customer") {
    const result = await getBookingById(id);
    if (!result) {
      return redirectWith("error=action");
    }

    const settings = await getBookingSettings();
    const portalBaseUrl = process.env.APP_URL || new URL(request.url).origin;
    const portalUrl = `${portalBaseUrl}/kunde/${result.customer.portalToken}`;
    if (result.booking.status === "pending") {
      await sendCustomerBookingCreatedEmail({
        booking: result.booking,
        customer: result.customer,
        settings,
        portalUrl,
      });
    } else {
      await sendCustomerBookingStatusEmail({
        booking: result.booking,
        customer: result.customer,
        settings,
        portalUrl,
      });
    }

    return redirectWith("saved=email");
  }

  if (action === "resend_admin") {
    const result = await getBookingById(id);
    if (!result) {
      return redirectWith("error=action");
    }

    const settings = await getBookingSettings();
    const portalBaseUrl = process.env.APP_URL || new URL(request.url).origin;
    const portalUrl = `${portalBaseUrl}/kunde/${result.customer.portalToken}`;
    await sendAdminNewBookingAlert({
      booking: result.booking,
      customer: result.customer,
      settings,
      portalUrl,
    });

    return redirectWith("saved=email");
  }

  const status = actionToStatus[action as keyof typeof actionToStatus];
  if (!status) {
    return redirectWith("error=action");
  }

  const result = await updateBookingStatus(id, status, adminNotes);
  if (result) {
    const settings = await getBookingSettings();
    const portalBaseUrl = process.env.APP_URL || new URL(request.url).origin;
    const portalUrl = `${portalBaseUrl}/kunde/${result.customer.portalToken}`;
    const shouldSendStatusEmail =
      (status === "approved" && settings.emailAutomation.customerOnApprove) ||
      (status === "completed" && settings.emailAutomation.customerOnComplete) ||
      (status === "cancelled" && settings.emailAutomation.customerOnCancel);

    if (shouldSendStatusEmail) {
      try {
        await sendCustomerBookingStatusEmail({
          booking: result.booking,
          customer: result.customer,
          settings,
          portalUrl,
        });
      } catch (error) {
        console.error("Could not send booking status email", error);
      }
    }
  }

  return redirectWith("saved=updated");
  } catch (error) {
    console.error("Could not handle booking action", error);
    return redirectWith("error=action");
  }
}
