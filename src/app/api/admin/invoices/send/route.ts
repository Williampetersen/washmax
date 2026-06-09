import { NextResponse } from "next/server";
import { z } from "zod";
import { getInvoiceRequestActor } from "@/lib/server/invoice-request-auth";
import { InvoiceWorkflowError, sendInvoiceById } from "@/lib/server/invoices";

export const runtime = "nodejs";
export const maxDuration = 30;

const bodySchema = z.object({
  invoiceId: z.string().min(1),
});

export async function POST(request: Request) {
  const actor = await getInvoiceRequestActor();
  if (!actor || actor.actorType !== "admin") {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = bodySchema.parse(await request.json());
    const result = await sendInvoiceById(body.invoiceId, actor);

    return NextResponse.json(
      {
        success: true,
        state: result.sent ? "sent" : "saved",
        progress: 100,
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
        ? "Invoice ID is required."
        : "Invoice email could not be sent.";
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
