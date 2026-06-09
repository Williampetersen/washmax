import { NextResponse } from "next/server";
import { z } from "zod";
import { getInvoiceRequestActor } from "@/lib/server/invoice-request-auth";
import {
  generateInvoiceForBooking,
  InvoiceWorkflowError,
} from "@/lib/server/invoices";

export const runtime = "nodejs";

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
    const result = await generateInvoiceForBooking({
      bookingId: body.bookingId,
      actorType: "admin",
      actorId: actor.actorId,
    });

    return NextResponse.json({
      success: true,
      state: "created",
      progress: 50,
      invoice: result.invoice,
      invoiceData: result.data,
    });
  } catch (error) {
    const known = error instanceof InvoiceWorkflowError;
    const message = known
      ? error.message
      : error instanceof z.ZodError
        ? "Booking ID is required."
        : "Invoice could not be created.";
    return NextResponse.json(
      {
        success: false,
        state: "failed",
        progress: 100,
        code: known ? error.code : "INVOICE_CREATE_FAILED",
        message,
      },
      { status: known ? error.statusCode : error instanceof z.ZodError ? 400 : 500 }
    );
  }
}
