import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { revalidateBookingRelatedCaches } from "@/lib/server/cache-tags";
import {
  getBookingInvoiceData,
  getInvoiceById,
  invoiceStatuses,
  updateInvoiceStatus,
  type InvoiceStatus,
} from "@/lib/server/invoices";

const ensureAdmin = async () => {
  const cookieStore = await cookies();
  return getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
};

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const invoice = await getInvoiceById(id);
  if (!invoice) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ invoice });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();
  const status = invoiceStatuses.includes(body.status as InvoiceStatus)
    ? (body.status as InvoiceStatus)
    : null;
  if (!status) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const invoice = await updateInvoiceStatus(id, status);
  if (invoice) {
    const data = await getBookingInvoiceData(invoice.bookingId);
    if (data) {
      revalidateBookingRelatedCaches({
        agentId: data.booking.assignedAgentId,
        portalToken: data.customer.portalToken,
      });
    }
  }
  return NextResponse.json({ invoice });
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await ensureAdmin())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const { id } = await context.params;
  const formData = await request.formData();
  const statusValue = String(formData.get("status") || "");
  const status = invoiceStatuses.includes(statusValue as InvoiceStatus)
    ? (statusValue as InvoiceStatus)
    : null;
  if (!status) {
    return NextResponse.redirect(new URL("/admin?view=payments&error=action", request.url), 303);
  }

  const invoice = await updateInvoiceStatus(id, status);
  if (invoice) {
    const data = await getBookingInvoiceData(invoice.bookingId);
    if (data) {
      revalidateBookingRelatedCaches({
        agentId: data.booking.assignedAgentId,
        portalToken: data.customer.portalToken,
      });
    }
  }
  return NextResponse.redirect(new URL("/admin?view=payments&saved=updated", request.url), 303);
}
