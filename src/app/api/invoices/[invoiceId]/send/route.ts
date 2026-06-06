import { NextResponse } from "next/server";
import { revalidateBookingRelatedCaches } from "@/lib/server/cache-tags";
import { getInvoiceRequestActor } from "@/lib/server/invoice-request-auth";
import {
  sendHtmlInvoice,
  SimpleInvoiceWorkflowError,
} from "@/lib/server/simple-invoice-workflow";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(
  request: Request,
  context: { params: Promise<{ invoiceId: string }> }
) {
  const actor = await getInvoiceRequestActor();
  if (!actor) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }
  try {
    const { invoiceId } = await context.params;
    const result = await sendHtmlInvoice(invoiceId, actor);
    revalidateBookingRelatedCaches({
      agentId: result.assignedAgentId,
      portalToken: result.portalToken,
    });
    return NextResponse.json(
      {
        success: result.sent,
        invoiceGenerated: true,
        invoiceStored: true,
        emailSent: result.sent,
        invoiceId: result.invoice.id,
        invoiceNumber: result.invoice.invoiceNumber,
        invoiceUrl: result.invoice.publicUrl,
        invoiceHtmlUrl: result.invoice.publicUrl,
        invoiceData: result.data,
        code: result.sent ? undefined : result.deliveryError.code,
        message: result.sent
          ? "Invoice email sent successfully."
          : result.deliveryError.message,
      },
      { status: result.sent ? 200 : result.deliveryError.statusCode }
    );
  } catch (error) {
    const known = error instanceof SimpleInvoiceWorkflowError;
    return NextResponse.json(
      {
        success: false,
        code: known ? error.code : "INVOICE_SEND_FAILED",
        message: known ? error.message : "Invoice email could not be sent.",
      },
      { status: known ? error.statusCode : 500 }
    );
  }
}
