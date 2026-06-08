import { NextResponse } from "next/server";
import { getInvoiceRequestActor } from "@/lib/server/invoice-request-auth";
import {
  canPortalAccessInvoice,
  getInvoiceById,
  InvoiceWorkflowError,
  updateInvoiceDetails,
  type InvoicePatch,
} from "@/lib/server/invoices";

export const runtime = "nodejs";

const failure = (error: unknown) => {
  const known = error instanceof InvoiceWorkflowError;
  return NextResponse.json(
    {
      success: false,
      code: known ? error.code : "INVOICE_REQUEST_FAILED",
      message: known ? error.message : "Invoice request failed.",
    },
    { status: known ? error.statusCode : 500 }
  );
};

export async function GET(
  request: Request,
  context: { params: Promise<{ invoiceId: string }> }
) {
  try {
    const { invoiceId } = await context.params;
    const invoice = await getInvoiceById(invoiceId);
    if (!invoice) {
      return NextResponse.json({ success: false, message: "Not found." }, { status: 404 });
    }
    const actor = await getInvoiceRequestActor();
    const portalToken = String(new URL(request.url).searchParams.get("token") || "");
    if (!actor && !(portalToken && (await canPortalAccessInvoice(invoice, portalToken)))) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }
    return NextResponse.json({ success: true, invoice });
  } catch (error) {
    return failure(error);
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ invoiceId: string }> }
) {
  const actor = await getInvoiceRequestActor();
  if (!actor) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }
  try {
    const { invoiceId } = await context.params;
    const result = await updateInvoiceDetails(
      invoiceId,
      actor,
      (await request.json()) as InvoicePatch
    );
    return NextResponse.json({
      success: true,
      invoiceId: result.invoice.id,
      invoiceNumber: result.invoice.invoiceNumber,
      invoiceUrl: result.invoice.publicUrl,
      invoiceData: result.data,
      message: "Invoice saved.",
    });
  } catch (error) {
    return failure(error);
  }
}
