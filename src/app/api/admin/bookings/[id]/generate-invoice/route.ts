import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
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
  const session = getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  if (!session) {
    return isJson
      ? NextResponse.json(
          { success: false, message: "Unauthorized." },
          { status: 401, headers: { "Cache-Control": "no-store" } }
        )
      : NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const { id } = await context.params;
  const returnTab = isJson ? "" : String((await request.formData()).get("return_tab") || "").trim();
  try {
    const result = await generateInvoiceForBooking({
      bookingId: id,
      actorType: "admin",
      createdByUserId: session.email,
    });
    revalidateBookingRelatedCaches({
      agentId: result.data.booking.assignedAgentId,
      portalToken: result.data.customer.portalToken,
    });
    return isJson
      ? NextResponse.json({
          success: true,
          invoiceGenerated: true,
          invoiceId: result.invoice.id,
          invoiceNumber: result.invoice.invoiceNumber,
          invoiceUrl: result.invoice.pdfUrl,
          invoiceData: result.data,
          emailSent: false,
          message: "Invoice PDF generated successfully.",
        }, { headers: { "Cache-Control": "no-store" } })
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
    console.error("[invoice.generate] failed", {
      bookingId: id,
      name: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    const message =
      error instanceof InvoiceWorkflowError
        ? error.message
        : "Invoice PDF could not be generated.";
    const status = error instanceof InvoiceWorkflowError ? error.statusCode : 500;
    return isJson
      ? NextResponse.json(
          {
            success: false,
            message,
            code: error instanceof InvoiceWorkflowError ? error.code : "invoice_generation_failed",
          },
          { status, headers: { "Cache-Control": "no-store" } }
        )
      : NextResponse.redirect(new URL(`/admin?view=bookings&bookings_tab=details&error=action#booking-${id}`, request.url), 303);
  }
}
