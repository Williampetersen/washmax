import { NextResponse } from "next/server";
import { updatePortalCustomer } from "@/lib/server/bookings";

export async function POST(
  request: Request,
  context: { params: Promise<{ token: string }> }
) {
  const { token } = await context.params;
  const formData = await request.formData();

  await updatePortalCustomer(token, {
    firstName: String(formData.get("first_name") || "").trim(),
    lastName: String(formData.get("last_name") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    address: String(formData.get("address") || "").trim(),
    postalCode: String(formData.get("postal_code") || "").trim(),
    city: String(formData.get("city") || "").trim(),
    notes: String(formData.get("notes") || "").trim(),
  });

  return NextResponse.redirect(new URL(`/kunde/${token}?tab=profile&saved=1`, request.url), 303);
}
