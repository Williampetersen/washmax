import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AGENT_COOKIE_NAME, getAgentSession } from "@/lib/server/agent-session";
import { revalidateBookingRelatedCaches } from "@/lib/server/cache-tags";
import { generateInvoiceForBooking, InvoiceWorkflowError } from "@/lib/server/invoices";

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
          { success: false, message: "Unauthorized." },
          { status: 401, headers: { "Cache-Control": "no-store" } }
        )
      : NextResponse.redirect(new URL("/agent/login", request.url), 303);
  }

  const { id } = await context.params;
  try {
    const result = await generateInvoiceForBooking({
      bookingId: id,
      actorType: "agent",
      agentId: session.agentId,
      createdByUserId: session.agentId,
    });
    revalidateBookingRelatedCaches({
      agentId: session.agentId,
      portalToken: result.data.customer.portalToken,
    });
    return isJson
      ? NextResponse.json(
          {
            success: true,
            invoiceGenerated: true,
            invoiceId: result.invoice.id,
            invoiceNumber: result.invoice.invoiceNumber,
            invoiceUrl: result.invoice.pdfUrl,
            invoiceData: result.data,
            emailSent: false,
            message: "Invoice PDF generated successfully.",
          },
          { headers: { "Cache-Control": "no-store" } }
        )
      : NextResponse.redirect(new URL(`/agent?view=tasks&saved=invoice#booking-${id}`, request.url), 303);
  } catch (error) {
    console.error("[invoice.generate] agent request failed", {
      bookingId: id,
      name: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return isJson
      ? NextResponse.json(
          {
            success: false,
            message:
              error instanceof InvoiceWorkflowError
                ? error.message
                : "Invoice PDF could not be generated.",
            code:
              error instanceof InvoiceWorkflowError
                ? error.code
                : "invoice_generation_failed",
          },
          {
            status: error instanceof InvoiceWorkflowError ? error.statusCode : 500,
            headers: { "Cache-Control": "no-store" },
          }
        )
      : NextResponse.redirect(new URL(`/agent?view=tasks&error=invoice#booking-${id}`, request.url), 303);
  }
}
