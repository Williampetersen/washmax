import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { revalidateBookingRelatedCaches } from "@/lib/server/cache-tags";
import { addBookingLineItem, getBookingInvoiceData } from "@/lib/server/invoices";

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
  const data = await getBookingInvoiceData(id);
  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(data);
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await ensureAdmin())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const { id } = await context.params;
  const contentType = request.headers.get("content-type") || "";
  try {
    if (contentType.includes("application/json")) {
      const body = await request.json();
      const lineItem = await addBookingLineItem({
        bookingId: id,
        actorType: "admin",
        itemType:
          body.itemType === "existing_extra_service"
            ? "existing_extra_service"
            : "manual_extra_charge",
        serviceId: String(body.serviceId || ""),
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

    const formData = await request.formData();
    const returnTab = String(formData.get("return_tab") || "").trim();
    await addBookingLineItem({
      bookingId: id,
      actorType: "admin",
      itemType:
        String(formData.get("item_type") || "") === "existing_extra_service"
          ? "existing_extra_service"
          : "manual_extra_charge",
      serviceId: String(formData.get("service_id") || ""),
      description: String(formData.get("description") || ""),
      quantity: Number(formData.get("quantity") || 1),
      unitPriceDkk: Number(formData.get("unit_price_dkk") || 0),
    });
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
    console.error("Could not add admin line item", error);
    return contentType.includes("application/json")
      ? NextResponse.json({ error: "Could not add line item" }, { status: 400 })
      : NextResponse.redirect(new URL(`/admin?view=bookings&bookings_tab=details&error=action#booking-${id}`, request.url), 303);
  }
}
