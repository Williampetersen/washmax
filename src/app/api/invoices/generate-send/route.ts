import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { AGENT_COOKIE_NAME, getAgentSession } from "@/lib/server/agent-session";
import { revalidateBookingRelatedCaches } from "@/lib/server/cache-tags";
import {
  runSimpleInvoiceWorkflow,
  SimpleInvoiceWorkflowError,
  type SimpleInvoiceStep,
} from "@/lib/server/simple-invoice-workflow";

export const runtime = "nodejs";
export const maxDuration = 60;

const noStore = { "Cache-Control": "no-store" };

export async function POST(request: Request) {
  let step: "start" | "parse-body" | "auth" | SimpleInvoiceStep = "start";
  let bookingId = "";

  try {
    step = "auth";
    const cookieStore = await cookies();
    const adminSession = getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
    const agentSession = getAgentSession(cookieStore.get(AGENT_COOKIE_NAME)?.value);
    if (!adminSession && !agentSession) {
      return NextResponse.json(
        { success: false, code: "UNAUTHORIZED", message: "Unauthorized." },
        { status: 401, headers: noStore }
      );
    }

    step = "parse-body";
    const rawBody = await request.text();
    if (!rawBody.trim()) {
      return NextResponse.json(
        {
          success: false,
          code: "MISSING_BOOKING_ID",
          message: "Booking ID is required.",
        },
        { status: 400, headers: noStore }
      );
    }

    let body: { bookingId?: string };
    try {
      body = JSON.parse(rawBody) as { bookingId?: string };
    } catch {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_REQUEST_BODY",
          message: "Invalid request body.",
        },
        { status: 400, headers: noStore }
      );
    }

    bookingId = String(body.bookingId || "").trim();
    if (!bookingId) {
      return NextResponse.json(
        {
          success: false,
          code: "MISSING_BOOKING_ID",
          message: "Booking ID is required.",
        },
        { status: 400, headers: noStore }
      );
    }

    const result = await runSimpleInvoiceWorkflow({
      bookingId,
      sendEmail: true,
      actor: adminSession
        ? {
            actorType: "admin",
            actorId: adminSession.email,
          }
        : {
            actorType: "agent",
            actorId: agentSession!.agentId,
            agentId: agentSession!.agentId,
          },
      onStep: (nextStep) => {
        step = nextStep;
      },
    });

    revalidateBookingRelatedCaches({
      agentId: result.assignedAgentId,
      portalToken: result.portalToken,
    });

    if (!result.sent) {
      const deliveryError =
        "deliveryError" in result
          ? result.deliveryError
          : new SimpleInvoiceWorkflowError(
              "Invoice was generated and saved, but email could not be sent.",
              "EMAIL_SEND_FAILED",
              502,
              {
                invoiceGenerated: true,
                invoiceStored: true,
                invoiceId: result.invoice.id,
                invoiceNumber: result.invoice.invoiceNumber,
                invoiceUrl: result.invoice.pdfUrl,
              }
            );
      return NextResponse.json(
        {
          success: false,
          invoiceGenerated: true,
          invoiceStored: true,
          emailSent: false,
          invoiceId: result.invoice.id,
          invoiceNumber: result.invoice.invoiceNumber,
          invoiceUrl: result.invoice.pdfUrl,
          invoiceData: result.data,
          code: deliveryError.code,
          message: "Invoice was generated and saved, but email could not be sent.",
        },
        { status: deliveryError.statusCode, headers: noStore }
      );
    }

    return NextResponse.json(
      {
        success: true,
        invoiceGenerated: true,
        invoiceStored: true,
        emailSent: true,
        invoiceId: result.invoice.id,
        invoiceNumber: result.invoice.invoiceNumber,
        invoiceUrl: result.invoice.pdfUrl,
        invoiceData: result.data,
        message: "Invoice generated and sent successfully.",
      },
      { headers: noStore }
    );
  } catch (error) {
    console.error("[invoice.generate-send] failed", {
      step,
      bookingId,
      errorName: error instanceof Error ? error.name : undefined,
      errorMessage: error instanceof Error ? error.message : String(error),
      code:
        error instanceof SimpleInvoiceWorkflowError
          ? error.code
          : "UNKNOWN_INVOICE_ERROR",
      stack: error instanceof Error ? error.stack : undefined,
    });

    if (error instanceof SimpleInvoiceWorkflowError) {
      return NextResponse.json(
        {
          success: false,
          invoiceGenerated: error.invoiceGenerated,
          invoiceStored: error.invoiceStored,
          emailSent: error.emailSent,
          invoiceId: error.invoiceId,
          invoiceNumber: error.invoiceNumber,
          invoiceUrl: error.invoiceUrl,
          invoiceHtmlUrl: error.invoiceHtmlUrl,
          code: error.code,
          message: error.message,
        },
        { status: error.statusCode, headers: noStore }
      );
    }

    return NextResponse.json(
      {
        success: false,
        invoiceGenerated: false,
        invoiceStored: false,
        emailSent: false,
        code: "UNKNOWN_INVOICE_ERROR",
        message: "Invoice workflow failed unexpectedly.",
      },
      { status: 500, headers: noStore }
    );
  }
}
