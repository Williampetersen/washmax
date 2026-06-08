import { NextResponse } from "next/server";
import { getInvoiceRequestActor } from "@/lib/server/invoice-request-auth";
import {
  InvoiceWorkflowError,
  sendInvoiceById,
} from "@/lib/server/invoices";

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
    const result = await sendInvoiceById(invoiceId, actor);
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
        message: known ? error.message : "Invoice email could not be sent.",
      },
      { status: known ? error.statusCode : 500 }
    );
  }
}
