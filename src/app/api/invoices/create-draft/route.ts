import { NextResponse } from "next/server";
import { revalidateBookingRelatedCaches } from "@/lib/server/cache-tags";
import { getInvoiceRequestActor } from "@/lib/server/invoice-request-auth";
import {
  createInvoiceDraft,
  SimpleInvoiceWorkflowError,
} from "@/lib/server/simple-invoice-workflow";

export const runtime = "nodejs";

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
        { success: false, code: "BOOKING_ID_REQUIRED", message: "Booking ID is required." },
        { status: 400 }
      );
    }
    const result = await createInvoiceDraft({ bookingId, actor });
    revalidateBookingRelatedCaches({
      agentId: result.assignedAgentId,
      portalToken: result.portalToken,
    });
    return NextResponse.json({
      success: true,
      invoiceGenerated: true,
      invoiceStored: true,
      emailSent: false,
      invoiceId: result.invoice.id,
      invoiceNumber: result.invoice.invoiceNumber,
      invoiceUrl: result.invoice.publicUrl,
      invoiceHtmlUrl: result.invoice.publicUrl,
      invoiceData: result.data,
      message: "Invoice draft created and ready to review.",
    });
  } catch (error) {
    const known = error instanceof SimpleInvoiceWorkflowError;
    return NextResponse.json(
      {
        success: false,
        code: known ? error.code : "INVOICE_CREATE_FAILED",
        message: known ? error.message : "Invoice draft could not be created.",
      },
      { status: known ? error.statusCode : 500 }
    );
  }
}
