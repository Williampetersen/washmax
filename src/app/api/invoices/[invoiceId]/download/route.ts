import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { AGENT_COOKIE_NAME, getAgentSession } from "@/lib/server/agent-session";
import { getPortalCustomerByToken } from "@/lib/server/bookings";
import {
  InvoiceWorkflowError,
  assertAgentOwnsBooking,
  getInvoiceById,
  getInvoicePdfForDownload,
} from "@/lib/server/invoices";

const errorResponse = (message: string, status: number) =>
  NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );

export async function GET(
  request: Request,
  context: { params: Promise<{ invoiceId: string }> }
) {
  const { invoiceId } = await context.params;
  const invoice = await getInvoiceById(invoiceId);
  if (!invoice) {
    return errorResponse("Invoice not found.", 404);
  }

  const cookieStore = await cookies();
  const adminSession = getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  const agentSession = getAgentSession(cookieStore.get(AGENT_COOKIE_NAME)?.value);
  const url = new URL(request.url);
  const portalToken = String(url.searchParams.get("token") || "").trim();

  if (!adminSession && !agentSession && !portalToken) {
    return errorResponse("Unauthorized.", 401);
  }

  try {
    if (adminSession) {
      // Admin may access any invoice.
    } else if (agentSession) {
      await assertAgentOwnsBooking(invoice.bookingId, agentSession.agentId);
    } else {
      const portalCustomer = await getPortalCustomerByToken(portalToken);
      if (!portalCustomer || portalCustomer.id !== invoice.customerId) {
        return errorResponse("Forbidden.", 403);
      }
    }

    const payload = await getInvoicePdfForDownload(invoiceId);
    if (!payload) {
      return errorResponse("Invoice PDF not found.", 404);
    }

    const disposition = url.searchParams.get("download") === "1" ? "attachment" : "inline";
    return new Response(new Uint8Array(payload.buffer), {
      headers: {
        "Content-Type": payload.contentType,
        "Content-Disposition": `${disposition}; filename="${payload.fileName}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    if (error instanceof InvoiceWorkflowError) {
      return errorResponse(error.message, error.statusCode);
    }

    console.error("Invoice download failed", error);
    return errorResponse("Invoice PDF could not be loaded.", 500);
  }
}
