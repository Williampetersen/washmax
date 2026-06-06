import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AGENT_COOKIE_NAME, getAgentSession } from "@/lib/server/agent-session";
import { revalidateBookingRelatedCaches } from "@/lib/server/cache-tags";
import {
  addBookingLineItem,
  assertAgentOwnsBooking,
  getBookingInvoiceData,
} from "@/lib/server/invoices";

const getSession = async () => {
  const cookieStore = await cookies();
  return getAgentSession(cookieStore.get(AGENT_COOKIE_NAME)?.value);
};

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  await assertAgentOwnsBooking(id, session.agentId);
  const data = await getBookingInvoiceData(id);
  return NextResponse.json(data);
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.redirect(new URL("/agent/login", request.url), 303);
  }

  const { id } = await context.params;
  const contentType = request.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      const body = await request.json();
      const lineItem = await addBookingLineItem({
        bookingId: id,
        actorType: "agent",
        agentId: session.agentId,
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
          agentId: session.agentId,
          portalToken: data.customer.portalToken,
        });
      }
      return NextResponse.json({ lineItem });
    }

    const formData = await request.formData();
    await addBookingLineItem({
      bookingId: id,
      actorType: "agent",
      agentId: session.agentId,
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
        agentId: session.agentId,
        portalToken: data.customer.portalToken,
      });
    }
    return NextResponse.redirect(new URL(`/agent?view=tasks&saved=line-item#booking-${id}`, request.url), 303);
  } catch (error) {
    console.error("Could not add agent line item", error);
    return contentType.includes("application/json")
      ? NextResponse.json({ error: "Could not add line item" }, { status: 400 })
      : NextResponse.redirect(new URL(`/agent?view=tasks&error=line-item#booking-${id}`, request.url), 303);
  }
}
