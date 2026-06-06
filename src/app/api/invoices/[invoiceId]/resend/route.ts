import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { AGENT_COOKIE_NAME, getAgentSession } from "@/lib/server/agent-session";
import { revalidateBookingRelatedCaches } from "@/lib/server/cache-tags";
import { InvoiceWorkflowError, resendInvoiceById } from "@/lib/server/invoices";

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
      { status: error.statusCode, headers: { "Cache-Control": "no-store" } }
    );
  }

  console.error("Invoice resend failed", error);
  return NextResponse.json(
    {
      success: false,
      message: "Invoice could not be resent.",
    },
    { status: 500, headers: { "Cache-Control": "no-store" } }
  );
};

export async function POST(
  request: Request,
  context: { params: Promise<{ invoiceId: string }> }
) {
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

  const { invoiceId } = await context.params;

  try {
    const result = await resendInvoiceById(
      adminSession
        ? {
            invoiceId,
            actorType: "admin",
          }
        : {
            invoiceId,
            actorType: "agent",
            agentId: agentSession?.agentId,
          }
    );

    revalidateBookingRelatedCaches({
      agentId: result.data.booking.assignedAgentId,
      portalToken: result.data.customer.portalToken,
    });

    return NextResponse.json(
      result.sent
        ? {
            success: true,
            invoiceGenerated: true,
            invoiceId: result.invoice.id,
            invoiceNumber: result.invoice.invoiceNumber,
            invoiceUrl: result.invoice.pdfUrl,
            invoiceData: result.data,
            emailSent: true,
            message: "Invoice sent again successfully.",
          }
        : {
            success: false,
            invoiceGenerated: true,
            invoiceId: result.invoice.id,
            invoiceNumber: result.invoice.invoiceNumber,
            invoiceUrl: result.invoice.pdfUrl,
            invoiceData: result.data,
            emailSent: false,
            code: result.deliveryError.code,
            message: "Invoice is saved, but email could not be sent.",
          },
      {
        status: result.sent ? 200 : result.deliveryError.statusCode,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    return getErrorResponse(error);
  }
}
