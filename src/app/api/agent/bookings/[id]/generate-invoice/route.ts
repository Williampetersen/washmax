import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AGENT_COOKIE_NAME, getAgentSession } from "@/lib/server/agent-session";
import { revalidateBookingRelatedCaches } from "@/lib/server/cache-tags";
import {
  runSimpleInvoiceWorkflow,
  SimpleInvoiceWorkflowError,
} from "@/lib/server/simple-invoice-workflow";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const isJson =
    (request.headers.get("content-type") || "").includes("application/json") ||
    (request.headers.get("accept") || "").includes("application/json");
  const cookieStore = await cookies();
  const session = getAgentSession(cookieStore.get(AGENT_COOKIE_NAME)?.value);
  if (!session) {
    return isJson
      ? NextResponse.json(
          { success: false, message: "Unauthorized.", code: "UNAUTHORIZED" },
          { status: 401, headers: { "Cache-Control": "no-store" } }
        )
      : NextResponse.redirect(new URL("/agent/login", request.url), 303);
  }

  const { id } = await context.params;
  try {
    const result = await runSimpleInvoiceWorkflow({
      bookingId: id,
      sendEmail: false,
      actor: {
        actorType: "agent",
        actorId: session.agentId,
        agentId: session.agentId,
      },
    });
    revalidateBookingRelatedCaches({
      agentId: result.assignedAgentId,
      portalToken: result.portalToken,
    });
    return isJson
      ? NextResponse.json(
          {
            success: true,
            invoiceGenerated: true,
            invoiceStored: true,
            invoiceId: result.invoice.id,
            invoiceNumber: result.invoice.invoiceNumber,
            invoiceUrl: result.invoice.publicUrl,
            invoiceData: result.data,
            emailSent: false,
            invoiceHtmlUrl: result.invoice.publicUrl,
            message: "Invoice draft created and ready to review.",
          },
          { headers: { "Cache-Control": "no-store" } }
        )
      : NextResponse.redirect(
          new URL(`/agent?view=tasks&saved=invoice#booking-${id}`, request.url),
          303
        );
  } catch (error) {
    console.error("[invoice.generate-only] agent failed", {
      bookingId: id,
      errorName: error instanceof Error ? error.name : undefined,
      errorMessage: error instanceof Error ? error.message : String(error),
      code:
        error instanceof SimpleInvoiceWorkflowError
          ? error.code
          : "UNKNOWN_INVOICE_ERROR",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return isJson
      ? NextResponse.json(
          {
            success: false,
            invoiceGenerated:
              error instanceof SimpleInvoiceWorkflowError
                ? error.invoiceGenerated
                : false,
            invoiceStored:
              error instanceof SimpleInvoiceWorkflowError
                ? error.invoiceStored
                : false,
            emailSent: false,
            invoiceHtmlUrl:
              error instanceof SimpleInvoiceWorkflowError
                ? error.invoiceHtmlUrl
                : undefined,
            message:
              error instanceof SimpleInvoiceWorkflowError
                ? error.message
                : "Invoice draft could not be created.",
            code:
              error instanceof SimpleInvoiceWorkflowError
                ? error.code
                : "UNKNOWN_INVOICE_ERROR",
          },
          {
            status:
              error instanceof SimpleInvoiceWorkflowError
                ? error.statusCode
                : 500,
            headers: { "Cache-Control": "no-store" },
          }
        )
      : NextResponse.redirect(
          new URL(`/agent?view=tasks&error=invoice#booking-${id}`, request.url),
          303
        );
  }
}
