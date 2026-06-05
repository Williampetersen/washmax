import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { generateInvoiceForBooking } from "@/lib/server/invoices";

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
    const result = await generateInvoiceForBooking({ bookingId: id, actorType: "admin" });
    return isJson
      ? NextResponse.json(result)
      : NextResponse.redirect(new URL(`/admin?view=bookings&saved=updated#booking-${id}`, request.url), 303);
  } catch (error) {
    console.error("Could not generate admin invoice", error);
    return isJson
      ? NextResponse.json({ error: "Could not generate invoice" }, { status: 400 })
      : NextResponse.redirect(new URL(`/admin?view=bookings&error=action#booking-${id}`, request.url), 303);
  }
}
