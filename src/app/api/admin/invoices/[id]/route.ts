import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import {
  InvoiceWorkflowError,
  deleteInvoice,
  getInvoiceById,
  invoiceStatuses,
  sendInvoiceById,
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
  return NextResponse.json({ invoice });
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await ensureAdmin();
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const { id } = await context.params;
  const formData = await request.formData();
  const action = String(formData.get("action") || "");

  if (action === "delete") {
    await deleteInvoice(id);
    return NextResponse.redirect(new URL("/admin?view=invoices&saved=deleted", request.url), 303);
  }

  if (action === "send") {
    try {
      const result = await sendInvoiceById(id, {
        actorType: "admin",
        actorId: session.email,
      });
      const outcome = result.sent ? "invoice-sent" : "invoice-not-configured";
      return NextResponse.redirect(new URL(`/admin?view=invoices&saved=${outcome}`, request.url), 303);
    } catch (error) {
      const message = error instanceof InvoiceWorkflowError ? error.message : "";
      return NextResponse.redirect(
        new URL(`/admin?view=invoices&error=invoice-send${message ? `&errorMessage=${encodeURIComponent(message)}` : ""}`, request.url),
        303
      );
    }
  }

  const statusValue = String(formData.get("status") || "");
  const status = invoiceStatuses.includes(statusValue as InvoiceStatus)
    ? (statusValue as InvoiceStatus)
    : null;
  if (!status) {
    return NextResponse.redirect(new URL("/admin?view=payments&error=action", request.url), 303);
  }

  await updateInvoiceStatus(id, status);
  return NextResponse.redirect(new URL("/admin?view=payments&saved=updated", request.url), 303);
}
