import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { deleteCustomer, updateCustomerAdmin } from "@/lib/server/bookings";

const asText = (value: FormDataEntryValue | null) => String(value || "").trim();

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  if (!getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const { id } = await context.params;
  const formData = await request.formData();
  const action = asText(formData.get("action"));
  const returnView = asText(formData.get("return_view")) || "customers";

  if (action === "delete") {
    await deleteCustomer(id);
    return NextResponse.redirect(
      new URL(`/admin?view=${encodeURIComponent(returnView)}&saved=deleted`, request.url),
      303
    );
  }

  await updateCustomerAdmin(id, {
    notes: asText(formData.get("notes")),
    tags: asText(formData.get("tags"))
      .split(/[\n,]+/)
      .map((value) => value.trim())
      .filter(Boolean),
  });

  return NextResponse.redirect(
    new URL(`/admin?view=${encodeURIComponent(returnView)}&saved=customer`, request.url),
    303
  );
}
