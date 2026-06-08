import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { sendInvoiceForBooking } from "@/lib/server/invoices";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  if (!getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const { id } = await context.params;
  const isJson = (request.headers.get("content-type") || "").includes("application/json");
  try {
    const session = getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
    const result = await sendInvoiceForBooking({
      bookingId: id,
      actorType: "admin",
      actorId: session?.email,
    });
    const query = result.sent ? "saved=updated" : "error=action";
    return isJson
      ? NextResponse.json(result, { status: result.sent ? 200 : 202 })
      : NextResponse.redirect(new URL(`/admin?view=bookings&${query}#booking-${id}`, request.url), 303);
  } catch (error) {
    console.error("Could not send admin invoice", error);
    return isJson
      ? NextResponse.json({ error: "Could not send invoice" }, { status: 400 })
      : NextResponse.redirect(new URL(`/admin?view=bookings&error=action#booking-${id}`, request.url), 303);
  }
}
