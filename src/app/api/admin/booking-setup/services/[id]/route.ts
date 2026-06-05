import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { deleteBookingService, saveBookingService } from "@/lib/server/booking-setup";

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
      await deleteBookingService(id);
    } else {
      await saveBookingService({
        id,
        name: asText(formData.get("name")),
        shortDescription: asText(formData.get("short_description")),
        description: asText(formData.get("description")),
        priceDkk: asNumber(formData.get("price_dkk")),
        durationMinutes: asNumber(formData.get("duration_minutes"), 60),
        icon: asText(formData.get("icon")),
        sortOrder: asNumber(formData.get("sort_order")),
        isVisible: Boolean(formData.get("is_visible")),
        isFeatured: Boolean(formData.get("is_featured")),
      });
    }
    return NextResponse.redirect(new URL("/admin?view=booking-setup&saved=booking-setup", request.url), 303);
  } catch (error) {
    console.error("Could not update booking service", error);
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
  await saveBookingService({
    id,
    name: String(body.name || ""),
    shortDescription: String(body.shortDescription || ""),
    description: String(body.description || ""),
    priceDkk: Number(body.priceDkk || 0),
    durationMinutes: Number(body.durationMinutes || 60),
    icon: String(body.icon || ""),
    sortOrder: Number(body.sortOrder || 0),
    isVisible: body.isVisible !== false,
    isFeatured: Boolean(body.isFeatured),
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
  await deleteBookingService(id);
  return NextResponse.json({ ok: true });
}
