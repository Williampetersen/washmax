import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { deleteUnavailableDate, saveUnavailableDate } from "@/lib/server/booking-setup";

const asText = (value: FormDataEntryValue | null) => String(value || "").trim();
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
  if (action === "delete") {
    await deleteUnavailableDate(id);
  } else {
    await saveUnavailableDate({
      id,
      startDate: asText(formData.get("start_date")),
      endDate: asText(formData.get("end_date")) || asText(formData.get("start_date")),
      title: asText(formData.get("title")),
      startTime: asText(formData.get("start_time")) || "00:00",
      endTime: asText(formData.get("end_time")) || "23:59",
      isFullDay: Boolean(formData.get("is_full_day")),
      repeatYearly: Boolean(formData.get("repeat_yearly")),
    });
  }
  return NextResponse.redirect(new URL("/admin?view=booking-setup&saved=booking-setup", request.url), 303);
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
  await saveUnavailableDate({
    id,
    startDate: String(body.startDate || ""),
    endDate: String(body.endDate || body.startDate || ""),
    title: String(body.title || ""),
    startTime: String(body.startTime || "00:00"),
    endTime: String(body.endTime || "23:59"),
    isFullDay: body.isFullDay !== false,
    repeatYearly: Boolean(body.repeatYearly),
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
  await deleteUnavailableDate(id);
  return NextResponse.json({ ok: true });
}
