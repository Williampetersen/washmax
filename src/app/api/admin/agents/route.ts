import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { createAgent, getAdminAgentsData } from "@/lib/server/agents";

const splitServices = (value: FormDataEntryValue | null) =>
  String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const ensureAdmin = async () => {
  const cookieStore = await cookies();
  return getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
};

export async function GET() {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(await getAdminAgentsData());
}

export async function POST(request: Request) {
  if (!(await ensureAdmin())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const formData = await request.formData();

  try {
    await createAgent({
      fullName: String(formData.get("full_name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      password: String(formData.get("password") || ""),
      assignedServices: splitServices(formData.get("assigned_services")),
      workingArea: String(formData.get("working_area") || "").trim(),
      notes: String(formData.get("notes") || "").trim(),
      status: String(formData.get("status") || "active") === "disabled" ? "disabled" : "active",
    });

    return NextResponse.redirect(new URL("/admin?view=agents&saved=agent", request.url), 303);
  } catch (error) {
    console.error("Could not create agent", error);
    return NextResponse.redirect(new URL("/admin?view=agents&error=agent", request.url), 303);
  }
}
