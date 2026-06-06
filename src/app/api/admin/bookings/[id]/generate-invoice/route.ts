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
  const cookieStore = await cookies();
  const session = getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const { id } = await context.params;
  const isJson = (request.headers.get("content-type") || "").includes("application/json");
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
          invoiceId: result.invoice.id,
          invoiceUrl: result.invoice.pdfUrl,
          message: "Invoice PDF generated successfully.",
        })
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
    console.error("Could not generate admin invoice", error);
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
          { status }
        )
      : NextResponse.redirect(new URL(`/admin?view=bookings&bookings_tab=details&error=action#booking-${id}`, request.url), 303);
  }
}
