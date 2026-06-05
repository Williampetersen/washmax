import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { getBookingSetupData, saveFormFields } from "@/lib/server/booking-setup";

const ensureAdmin = async () => {
  const cookieStore = await cookies();
  return getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
};

export async function GET() {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await getBookingSetupData();
  return NextResponse.json({ formFields: data.formFields });
}

export async function PATCH(request: Request) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  await saveFormFields(body.formFields || []);
  return NextResponse.json({ ok: true });
}

export async function POST(request: Request) {
  if (!(await ensureAdmin())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }
  const data = await getBookingSetupData();
  const formData = await request.formData();
  await saveFormFields(
    data.formFields.map((field) => ({
      ...field,
      label: String(formData.get(`label_${field.fieldKey}`) || field.label),
      placeholder: String(formData.get(`placeholder_${field.fieldKey}`) || ""),
      helpText: String(formData.get(`help_text_${field.fieldKey}`) || ""),
      isVisible: Boolean(formData.get(`is_visible_${field.fieldKey}`)),
      isRequired: Boolean(formData.get(`is_required_${field.fieldKey}`)),
      sortOrder: Number(formData.get(`sort_order_${field.fieldKey}`) || field.sortOrder),
    }))
  );
  return NextResponse.redirect(new URL("/admin?view=booking-setup&saved=booking-setup", request.url), 303);
}
