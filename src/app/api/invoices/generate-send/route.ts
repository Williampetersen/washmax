import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { AGENT_COOKIE_NAME, getAgentSession } from "@/lib/server/agent-session";
import { isDatabaseConfigured } from "@/lib/server/db";
import { InvoiceWorkflowError, sendInvoiceForBooking } from "@/lib/server/invoices";

const getErrorResponse = (error: unknown) => {
  if (error instanceof InvoiceWorkflowError) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: error.statusCode }
    );
  }

  console.error("Invoice generate/send failed", error);
  return NextResponse.json(
    {
      success: false,
      message: "Invoice could not be generated and sent.",
    },
    { status: 500 }
  );
};

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    console.error("Invoice generate/send failed because DATABASE_URL is missing.");
    return NextResponse.json(
      {
        success: false,
        message: "Invoice storage is not configured on the server.",
      },
      { status: 500 }
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
      },
      { status: 401 }
    );
  }

  let bookingId = "";
  try {
    const body = (await request.json()) as { bookingId?: string };
    bookingId = String(body.bookingId || "").trim();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request body.",
      },
      { status: 400 }
    );
  }

  if (!bookingId) {
    return NextResponse.json(
      {
        success: false,
        message: "Booking ID is required.",
      },
      { status: 400 }
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

    return NextResponse.json({
      success: true,
      invoiceId: result.invoice.id,
      invoiceUrl: result.invoice.pdfUrl,
      emailSent: true,
      message: "Invoice generated and sent successfully.",
    });
  } catch (error) {
    return getErrorResponse(error);
  }
}
