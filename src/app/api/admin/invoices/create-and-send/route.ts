import { NextResponse } from "next/server";
import { z } from "zod";
import { getInvoiceRequestActor } from "@/lib/server/invoice-request-auth";
import { InvoiceWorkflowError, sendInvoiceForBooking } from "@/lib/server/invoices";

export const runtime = "nodejs";
export const maxDuration = 30;

const bodySchema = z.object({
  bookingId: z.string().min(1),
});

export async function POST(request: Request) {
  const actor = await getInvoiceRequestActor();
  if (!actor || actor.actorType !== "admin") {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = bodySchema.parse(await request.json());
    const result = await sendInvoiceForBooking({
      bookingId: body.bookingId,
      actorType: "admin",
      actorId: actor.actorId,
    });

    return NextResponse.json(
      {
        success: true,
        state: result.sent ? "sent" : "saved",
        progress: 100,
        steps: [
          { label: "validating booking", progress: 15 },
          { label: "creating invoice", progress: 30 },
          { label: "calculating VAT", progress: 50 },
          { label: "preparing email", progress: 70 },
          { label: "sending email", progress: 90 },
          { label: result.sent ? "sent" : "saved", progress: 100 },
        ],
        emailSent: result.sent,
        invoiceNumber: result.invoice.invoiceNumber,
        sentAt: result.invoice.sentAt || result.invoice.emailSentAt,
        customerEmail: result.invoice.customerEmail || result.invoice.sentToEmail,
        invoice: result.invoice,
        invoiceData: { ...result.data, invoice: result.invoice },
      },
      { status: result.sent ? 200 : 202 }
    );
  } catch (error) {
    const known = error instanceof InvoiceWorkflowError;
    const message = known
      ? error.message
      : error instanceof z.ZodError
        ? "Booking ID is required."
        : "Invoice could not be sent.";
    return NextResponse.json(
      {
        success: false,
        state: "failed",
        progress: 100,
        code: known ? error.code : "INVOICE_SEND_FAILED",
        message,
      },
      { status: known ? error.statusCode : error instanceof z.ZodError ? 400 : 500 }
    );
  }
}
