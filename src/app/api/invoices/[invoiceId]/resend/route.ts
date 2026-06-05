import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { AGENT_COOKIE_NAME, getAgentSession } from "@/lib/server/agent-session";
import { InvoiceWorkflowError, resendInvoiceById } from "@/lib/server/invoices";

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

  console.error("Invoice resend failed", error);
  return NextResponse.json(
    {
      success: false,
      message: "Invoice could not be resent.",
    },
    { status: 500 }
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

    return NextResponse.json({
      success: true,
      invoiceId: result.invoice.id,
      invoiceUrl: result.invoice.pdfUrl,
      emailSent: true,
      message: "Invoice sent again successfully.",
    });
  } catch (error) {
    return getErrorResponse(error);
  }
}
