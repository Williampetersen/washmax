import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { deleteBookingOption, saveBookingOption } from "@/lib/server/booking-setup";

const asText = (value: FormDataEntryValue | null) => String(value || "").trim();
const asNumber = (value: FormDataEntryValue | null, fallback = 0) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const ensureAdmin = async () => {
  const cookieStore = await cookies();
  return getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
};

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await ensureAdmin())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }
  const { id } = await context.params;
  const formData = await request.formData();
  const action = asText(formData.get("action")) || "update";
  try {
    if (action === "delete") {
      await deleteBookingOption(id);
    } else {
      await saveBookingOption({
        id,
        groupId: asText(formData.get("group_id")) || "vehicle_category",
        label: asText(formData.get("label")),
        description: asText(formData.get("description")),
        priceAdjustmentDkk: asNumber(formData.get("price_adjustment_dkk")),
        durationAdjustmentMinutes: asNumber(formData.get("duration_adjustment_minutes")),
        sortOrder: asNumber(formData.get("sort_order")),
        isVisible: Boolean(formData.get("is_visible")),
        isRequired: Boolean(formData.get("is_required")),
      });
    }
    return NextResponse.redirect(new URL("/admin?view=booking-setup&saved=booking-setup", request.url), 303);
  } catch (error) {
    console.error("Could not update booking option", error);
    return NextResponse.redirect(new URL("/admin?view=booking-setup&error=booking-setup", request.url), 303);
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  const body = await request.json();
  await saveBookingOption({
    id,
    groupId: String(body.groupId || "vehicle_category"),
    label: String(body.label || ""),
    description: String(body.description || ""),
    priceAdjustmentDkk: Number(body.priceAdjustmentDkk || 0),
    durationAdjustmentMinutes: Number(body.durationAdjustmentMinutes || 0),
    sortOrder: Number(body.sortOrder || 0),
    isVisible: body.isVisible !== false,
    isRequired: Boolean(body.isRequired),
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  await deleteBookingOption(id);
  return NextResponse.json({ ok: true });
}
