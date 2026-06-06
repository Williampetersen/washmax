import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { revalidateBookingRelatedCaches } from "@/lib/server/cache-tags";
import {
  deleteBookingLineItem,
  getBookingInvoiceData,
  updateBookingLineItem,
} from "@/lib/server/invoices";

const ensureAdmin = async () => {
  const cookieStore = await cookies();
  return getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
};

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string; itemId: string }> }
) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, itemId } = await context.params;
  const body = await request.json();
  const lineItem = await updateBookingLineItem(id, itemId, {
    actorType: "admin",
    description: String(body.description || ""),
    quantity: Number(body.quantity || 1),
    unitPriceDkk: Number(body.unitPriceDkk || 0),
  });
  const data = await getBookingInvoiceData(id);
  if (data) {
    revalidateBookingRelatedCaches({
      agentId: data.booking.assignedAgentId,
      portalToken: data.customer.portalToken,
    });
  }
  return NextResponse.json({ lineItem });
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string; itemId: string }> }
) {
  if (!(await ensureAdmin())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const { id, itemId } = await context.params;
  const formData = await request.formData();
  const action = String(formData.get("action") || "update");
  const returnTab = String(formData.get("return_tab") || "").trim();

  try {
    if (action === "delete") {
      await deleteBookingLineItem(id, itemId, { actorType: "admin" });
    } else {
      await updateBookingLineItem(id, itemId, {
        actorType: "admin",
        description: String(formData.get("description") || ""),
        quantity: Number(formData.get("quantity") || 1),
        unitPriceDkk: Number(formData.get("unit_price_dkk") || 0),
      });
    }
    const data = await getBookingInvoiceData(id);
    if (data) {
      revalidateBookingRelatedCaches({
        agentId: data.booking.assignedAgentId,
        portalToken: data.customer.portalToken,
      });
    }
    return NextResponse.redirect(
      new URL(
        `/admin?view=bookings${
          returnTab ? `&bookings_tab=${encodeURIComponent(returnTab)}` : ""
        }&saved=updated#booking-${id}`,
        request.url
      ),
      303
    );
  } catch (error) {
    console.error("Could not update admin line item", error);
    return NextResponse.redirect(new URL(`/admin?view=bookings&bookings_tab=details&error=action#booking-${id}`, request.url), 303);
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string; itemId: string }> }
) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, itemId } = await context.params;
  await deleteBookingLineItem(id, itemId, { actorType: "admin" });
  const data = await getBookingInvoiceData(id);
  if (data) {
    revalidateBookingRelatedCaches({
      agentId: data.booking.assignedAgentId,
      portalToken: data.customer.portalToken,
    });
  }
  return NextResponse.json({ ok: true });
}
