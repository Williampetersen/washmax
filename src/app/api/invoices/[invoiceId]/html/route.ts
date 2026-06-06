import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { AGENT_COOKIE_NAME, getAgentSession } from "@/lib/server/agent-session";
import {
  canAgentAccessSimpleInvoice,
  canPortalAccessSimpleInvoice,
  getSimpleInvoiceHtml,
} from "@/lib/server/simple-invoice-workflow";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  context: { params: Promise<{ invoiceId: string }> }
) {
  const { invoiceId } = await context.params;
  try {
    const payload = await getSimpleInvoiceHtml(invoiceId);
    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          code: "HTML_INVOICE_NOT_FOUND",
          message: "Invoice not found.",
        },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }

    const cookieStore = await cookies();
    const adminSession = getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
    const agentSession = getAgentSession(cookieStore.get(AGENT_COOKIE_NAME)?.value);
    const portalToken = new URL(request.url).searchParams.get("token") || "";
    const allowed =
      Boolean(adminSession) ||
      Boolean(
        agentSession &&
          (await canAgentAccessSimpleInvoice(payload.bookingId, agentSession.agentId))
      ) ||
      Boolean(
        portalToken &&
          (await canPortalAccessSimpleInvoice(payload.customerId, portalToken))
      );

    if (!allowed) {
      return NextResponse.json(
        { success: false, code: "UNAUTHORIZED", message: "Unauthorized." },
        { status: 401, headers: { "Cache-Control": "no-store" } }
      );
    }

    return new Response(payload.html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("[invoice.html] failed", {
      invoiceId,
      errorName: error instanceof Error ? error.name : undefined,
      errorMessage: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      {
        success: false,
        code: "HTML_INVOICE_FAILED",
        message: "Printable invoice could not be loaded.",
      },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
