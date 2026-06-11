import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { updatePortalCustomer, getPortalData } from "@/lib/server/bookings";
import { CUSTOMER_COOKIE_NAME, verifyCustomerSessionToken } from "@/lib/server/customer-session";

export async function POST(
  request: Request,
  context: { params: Promise<{ token: string }> }
) {
  const { token } = await context.params;

  // Verify customer session before allowing profile updates.
  const cookieStore = await cookies();
  const session = verifyCustomerSessionToken(cookieStore.get(CUSTOMER_COOKIE_NAME)?.value);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Confirm the session email matches the customer for this portal token.
  const portalData = await getPortalData(token);
  if (!portalData || session.email.toLowerCase() !== portalData.customer.email.toLowerCase()) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

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
