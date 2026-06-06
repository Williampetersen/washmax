import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AGENT_COOKIE_NAME, getAgentSession } from "@/lib/server/agent-session";
import { revalidateBookingRelatedCaches } from "@/lib/server/cache-tags";
import {
  deleteBookingLineItem,
  getBookingInvoiceData,
  updateBookingLineItem,
} from "@/lib/server/invoices";

const getSession = async () => {
  const cookieStore = await cookies();
  return getAgentSession(cookieStore.get(AGENT_COOKIE_NAME)?.value);
};

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string; itemId: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, itemId } = await context.params;
  const body = await request.json();
  const lineItem = await updateBookingLineItem(id, itemId, {
    actorType: "agent",
    agentId: session.agentId,
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

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string; itemId: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.redirect(new URL("/agent/login", request.url), 303);
  }

  const { id, itemId } = await context.params;
  const formData = await request.formData();
  const action = String(formData.get("action") || "update");

  try {
    if (action === "delete") {
      await deleteBookingLineItem(id, itemId, {
        actorType: "agent",
        agentId: session.agentId,
      });
    } else {
      await updateBookingLineItem(id, itemId, {
        actorType: "agent",
        agentId: session.agentId,
        description: String(formData.get("description") || ""),
        quantity: Number(formData.get("quantity") || 1),
        unitPriceDkk: Number(formData.get("unit_price_dkk") || 0),
      });
    }
    const data = await getBookingInvoiceData(id);
    if (data) {
      revalidateBookingRelatedCaches({
        agentId: session.agentId,
        portalToken: data.customer.portalToken,
      });
    }
    return NextResponse.redirect(new URL(`/agent?view=tasks&saved=line-item#booking-${id}`, request.url), 303);
  } catch (error) {
    console.error("Could not update agent line item", error);
    return NextResponse.redirect(new URL(`/agent?view=tasks&error=line-item#booking-${id}`, request.url), 303);
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string; itemId: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, itemId } = await context.params;
  await deleteBookingLineItem(id, itemId, {
    actorType: "agent",
    agentId: session.agentId,
  });
  const data = await getBookingInvoiceData(id);
  if (data) {
    revalidateBookingRelatedCaches({
      agentId: session.agentId,
      portalToken: data.customer.portalToken,
    });
  }
  return NextResponse.json({ ok: true });
}
