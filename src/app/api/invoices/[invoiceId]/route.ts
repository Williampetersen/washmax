import { NextResponse } from "next/server";
import { revalidateBookingRelatedCaches } from "@/lib/server/cache-tags";
import { getInvoiceRequestActor } from "@/lib/server/invoice-request-auth";
import {
  getHtmlInvoiceForActor,
  getHtmlInvoiceForPortal,
  SimpleInvoiceWorkflowError,
  updateHtmlInvoice,
  type InvoicePatch,
} from "@/lib/server/simple-invoice-workflow";

export const runtime = "nodejs";

const errorResponse = (error: unknown) => {
  const known = error instanceof SimpleInvoiceWorkflowError;
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
  const actor = await getInvoiceRequestActor();
  try {
    const { invoiceId } = await context.params;
    const portalToken = String(new URL(request.url).searchParams.get("token") || "").trim();
    if (!actor && !portalToken) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }
    return NextResponse.json({
      success: true,
      ...(actor
        ? await getHtmlInvoiceForActor(invoiceId, actor)
        : await getHtmlInvoiceForPortal(invoiceId, portalToken)),
    });
  } catch (error) {
    return errorResponse(error);
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
    const patch = (await request.json()) as InvoicePatch;
    const result = await updateHtmlInvoice(invoiceId, actor, patch);
    revalidateBookingRelatedCaches({
      agentId: result.assignedAgentId,
      portalToken: result.portalToken,
    });
    return NextResponse.json({
      success: true,
      invoiceId: result.invoice.id,
      invoiceNumber: result.invoice.invoiceNumber,
      invoiceUrl: result.invoice.publicUrl,
      invoiceHtmlUrl: result.invoice.publicUrl,
      invoiceData: result.data,
      message: "Invoice saved.",
    });
  } catch (error) {
    return errorResponse(error);
  }
}
