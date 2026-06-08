import { NextResponse } from "next/server";
import { getInvoiceRequestActor } from "@/lib/server/invoice-request-auth";
import {
  InvoiceWorkflowError,
  sendInvoiceForBooking,
} from "@/lib/server/invoices";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  const actor = await getInvoiceRequestActor();
  if (!actor) {
    return NextResponse.json(
      { success: false, code: "UNAUTHORIZED", message: "Unauthorized." },
      { status: 401 }
    );
  }
  try {
    const body = (await request.json()) as { bookingId?: string };
    const bookingId = String(body.bookingId || "").trim();
    if (!bookingId) {
      return NextResponse.json(
        { success: false, message: "Booking ID is required." },
        { status: 400 }
      );
    }
    const result = await sendInvoiceForBooking({
      bookingId,
      actorType: actor.actorType,
      actorId: actor.actorId,
      agentId: actor.agentId,
    });
    return NextResponse.json(
      {
        success: true,
        emailSent: result.sent,
        invoiceId: result.invoice.id,
        invoiceNumber: result.invoice.invoiceNumber,
        invoiceUrl: result.invoice.publicUrl,
        invoiceData: { ...result.data, invoice: result.invoice },
        message: result.sent
          ? "Invoice email sent successfully."
          : "Invoice was saved, but email is not configured.",
      },
      { status: result.sent ? 200 : 202 }
    );
  } catch (error) {
    const known = error instanceof InvoiceWorkflowError;
    return NextResponse.json(
      {
        success: false,
        code: known ? error.code : "INVOICE_SEND_FAILED",
        message: known ? error.message : "Invoice could not be sent.",
      },
      { status: known ? error.statusCode : 500 }
    );
  }
}
