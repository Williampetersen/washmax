import type { APIRoute } from "astro";
import { updatePortalCustomer } from "@/lib/server/bookings";

export const prerender = false;

export const POST: APIRoute = async ({ params, request, redirect }) => {
  const token = params.token || "";
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

  return redirect(`/kunde/${token}?view=profile&saved=1`, 303);
};
