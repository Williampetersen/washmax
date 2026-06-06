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
  const isJson =
    (request.headers.get("content-type") || "").includes("application/json") ||
    (request.headers.get("accept") || "").includes("application/json");
  const cookieStore = await cookies();
  const session = getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  if (!session) {
    return isJson
      ? NextResponse.json(
          { success: false, message: "Unauthorized.", code: "UNAUTHORIZED" },
          { status: 401, headers: { "Cache-Control": "no-store" } }
        )
      : NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const { id } = await context.params;
  const returnTab = isJson
    ? ""
    : String((await request.formData()).get("return_tab") || "").trim();

  try {
    const result = await runSimpleInvoiceWorkflow({
      bookingId: id,
      sendEmail: false,
      actor: {
        actorType: "admin",
        actorId: session.email,
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
            invoiceUrl: result.invoice.pdfUrl,
            invoiceData: result.data,
            emailSent: false,
            message: "Invoice PDF generated and saved successfully.",
          },
          { headers: { "Cache-Control": "no-store" } }
        )
      : NextResponse.redirect(
          new URL(
            `/admin?view=bookings${
              returnTab ? `&bookings_tab=${encodeURIComponent(returnTab)}` : ""
            }&saved=updated#booking-${id}`,
            request.url
          ),
          303
        );
  } catch (error) {
    console.error("[invoice.generate-only] failed", {
      bookingId: id,
      errorName: error instanceof Error ? error.name : undefined,
      errorMessage: error instanceof Error ? error.message : String(error),
      code:
        error instanceof SimpleInvoiceWorkflowError
          ? error.code
          : "UNKNOWN_INVOICE_ERROR",
      stack: error instanceof Error ? error.stack : undefined,
    });
    const message =
      error instanceof SimpleInvoiceWorkflowError
        ? error.message
        : "Invoice PDF could not be generated.";
    const status =
      error instanceof SimpleInvoiceWorkflowError ? error.statusCode : 500;

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
            message,
            code:
              error instanceof SimpleInvoiceWorkflowError
                ? error.code
                : "UNKNOWN_INVOICE_ERROR",
          },
          { status, headers: { "Cache-Control": "no-store" } }
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
