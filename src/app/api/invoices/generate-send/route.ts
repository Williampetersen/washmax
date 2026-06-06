import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { AGENT_COOKIE_NAME, getAgentSession } from "@/lib/server/agent-session";
import { revalidateBookingRelatedCaches } from "@/lib/server/cache-tags";
import { isDatabaseConfigured } from "@/lib/server/db";
import { InvoiceWorkflowError, sendInvoiceForBooking } from "@/lib/server/invoices";

export const runtime = "nodejs";
export const maxDuration = 60;

const getErrorResponse = (error: unknown) => {
  if (error instanceof InvoiceWorkflowError) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        code: error.code,
      },
      {
        status: error.statusCode,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }

  console.error("[invoice.generate-send] failed", {
    name: error instanceof Error ? error.name : "UnknownError",
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
  });
  return NextResponse.json(
    {
      success: false,
      message: "Invoice could not be generated and sent.",
      code: "UNKNOWN_INVOICE_ERROR",
    },
    {
      status: 500,
      headers: { "Cache-Control": "no-store" },
    }
  );
};

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    console.error("Invoice generate/send failed because DATABASE_URL is missing.");
    return NextResponse.json(
      {
        success: false,
        message: "Invoice storage is not configured on the server.",
        code: "DATABASE_CONNECTION_FAILED",
      },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }

  const cookieStore = await cookies();
  const adminSession = getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  const agentSession = getAgentSession(cookieStore.get(AGENT_COOKIE_NAME)?.value);

  if (!adminSession && !agentSession) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized.",
        code: "UNAUTHORIZED",
      },
      { status: 401 }
    );
  }

  let bookingId = "";
  try {
    const rawBody = await request.text();
    if (!rawBody.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking ID is required.",
          code: "MISSING_BOOKING_ID",
        },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }
    const body = JSON.parse(rawBody) as { bookingId?: string };
    bookingId = String(body.bookingId || "").trim();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request body.",
        code: "INVALID_REQUEST_BODY",
      },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  if (!bookingId) {
    return NextResponse.json(
      {
        success: false,
        message: "Booking ID is required.",
        code: "MISSING_BOOKING_ID",
      },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const result = await sendInvoiceForBooking(
      adminSession
        ? {
            bookingId,
            actorType: "admin",
            createdByUserId: adminSession.email,
          }
        : {
            bookingId,
            actorType: "agent",
            agentId: agentSession?.agentId,
            createdByUserId: agentSession?.agentId,
          }
    );

    revalidateBookingRelatedCaches({
      agentId: result.data.booking.assignedAgentId,
      portalToken: result.data.customer.portalToken,
    });

    if (!result.sent) {
      return NextResponse.json(
        {
          success: false,
          invoiceGenerated: true,
          invoiceStored: true,
          invoiceId: result.invoice.id,
          invoiceNumber: result.invoice.invoiceNumber,
          invoiceUrl: result.invoice.pdfUrl,
          invoiceData: result.data,
          emailSent: false,
          code: result.deliveryError.code,
          message: "Invoice was generated and saved, but email could not be sent.",
        },
        {
          status: result.deliveryError.statusCode,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        invoiceGenerated: true,
        invoiceStored: true,
        invoiceId: result.invoice.id,
        invoiceNumber: result.invoice.invoiceNumber,
        invoiceUrl: result.invoice.pdfUrl,
        invoiceData: result.data,
        emailSent: true,
        message: "Invoice generated and sent successfully.",
      },
      {
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    return getErrorResponse(error);
  }
}
