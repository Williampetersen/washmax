import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { AGENT_COOKIE_NAME, getAgentSession } from "@/lib/server/agent-session";
import {
  canAgentAccessSimpleInvoice,
  canPortalAccessSimpleInvoice,
  getSimpleInvoicePdf,
  getSimpleInvoiceRecord,
} from "@/lib/server/simple-invoice-workflow";

export const runtime = "nodejs";
export const maxDuration = 60;

const errorResponse = (message: string, code: string, status: number) =>
  NextResponse.json(
    { success: false, message, code },
    { status, headers: { "Cache-Control": "no-store" } }
  );

export async function GET(
  request: Request,
  context: { params: Promise<{ invoiceId: string }> }
) {
  const { invoiceId } = await context.params;
  try {
    const invoice = await getSimpleInvoiceRecord(invoiceId);
    if (!invoice) {
      return errorResponse("Invoice not found.", "INVOICE_NOT_FOUND", 404);
    }

    const cookieStore = await cookies();
    const adminSession = getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
    const agentSession = getAgentSession(cookieStore.get(AGENT_COOKIE_NAME)?.value);
    const url = new URL(request.url);
    const portalToken = String(url.searchParams.get("token") || "").trim();

    if (!adminSession && !agentSession && !portalToken) {
      return errorResponse("Unauthorized.", "UNAUTHORIZED", 401);
    }
    if (
      agentSession &&
      !(await canAgentAccessSimpleInvoice(invoice.booking_id, agentSession.agentId))
    ) {
      return errorResponse("Forbidden.", "FORBIDDEN", 403);
    }
    if (
      !adminSession &&
      !agentSession &&
      !(await canPortalAccessSimpleInvoice(
        String(invoice.customer_id || ""),
        portalToken
      ))
    ) {
      return errorResponse("Forbidden.", "FORBIDDEN", 403);
    }

    const payload = await getSimpleInvoicePdf(invoiceId);
    if (!payload) {
      return errorResponse("Invoice PDF not found.", "PDF_NOT_FOUND", 404);
    }

    const disposition =
      url.searchParams.get("download") === "1" ? "attachment" : "inline";
    return new Response(new Uint8Array(payload.buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${disposition}; filename="${payload.fileName}"`,
        "Content-Length": String(payload.buffer.byteLength),
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("[invoice.download] failed", {
      invoiceId,
      errorName: error instanceof Error ? error.name : undefined,
      errorMessage: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return errorResponse(
      "Invoice PDF could not be loaded.",
      "INVOICE_DOWNLOAD_FAILED",
      500
    );
  }
}
