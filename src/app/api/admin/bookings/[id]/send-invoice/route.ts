import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
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
  const cookieStore = await cookies();
  const session = getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const { id } = await context.params;
  const isJson =
    (request.headers.get("content-type") || "").includes("application/json") ||
    (request.headers.get("accept") || "").includes("application/json");
  const returnTab = isJson
    ? ""
    : String((await request.formData()).get("return_tab") || "").trim();

  try {
    const result = await runSimpleInvoiceWorkflow({
      bookingId: id,
      sendEmail: true,
      actor: { actorType: "admin", actorId: session.email },
    });
    revalidateBookingRelatedCaches({
      agentId: result.assignedAgentId,
      portalToken: result.portalToken,
    });
    const success = result.sent;

    return isJson
      ? NextResponse.json(
          {
            success,
            invoiceGenerated: true,
            invoiceStored: true,
            emailSent: success,
            invoiceId: result.invoice.id,
            invoiceNumber: result.invoice.invoiceNumber,
            invoiceUrl: result.invoice.publicUrl,
            invoiceHtmlUrl: result.invoice.publicUrl,
            invoiceData: result.data,
            code:
              !success && "deliveryError" in result
                ? result.deliveryError.code
                : undefined,
            message: success
              ? "Invoice email sent successfully."
              : "Invoice was saved, but email could not be sent.",
          },
          {
            status:
              !success && "deliveryError" in result
                ? result.deliveryError.statusCode
                : 200,
            headers: { "Cache-Control": "no-store" },
          }
        )
      : NextResponse.redirect(
          new URL(
            `/admin?view=bookings${
              returnTab ? `&bookings_tab=${encodeURIComponent(returnTab)}` : ""
            }&${success ? "saved=updated" : "error=mail"}#booking-${id}`,
            request.url
          ),
          303
        );
  } catch (error) {
    console.error("[invoice.send] admin failed", {
      bookingId: id,
      code:
        error instanceof SimpleInvoiceWorkflowError
          ? error.code
          : "UNKNOWN_INVOICE_ERROR",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return isJson
      ? NextResponse.json(
          {
            success: false,
            code:
              error instanceof SimpleInvoiceWorkflowError
                ? error.code
                : "UNKNOWN_INVOICE_ERROR",
            message:
              error instanceof SimpleInvoiceWorkflowError
                ? error.message
                : "Invoice workflow failed unexpectedly.",
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
          new URL(
            `/admin?view=bookings&bookings_tab=details&error=action#booking-${id}`,
            request.url
          ),
          303
        );
  }
}
