import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import {
  revalidateAdminAgentsCache,
  revalidateAdminDashboardCache,
  revalidateAgentDashboardCache,
} from "@/lib/server/cache-tags";
import { deleteAgent, getAgentById, updateAgent } from "@/lib/server/agents";

const splitServices = (value: FormDataEntryValue | null) =>
  String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const ensureAdmin = async () => {
  const cookieStore = await cookies();
  return getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
};

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const agent = await getAgentById(id);
  if (!agent) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ agent });
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await ensureAdmin())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const { id } = await context.params;
  const formData = await request.formData();
  const action = String(formData.get("action") || "update");

  try {
    if (action === "delete") {
      await deleteAgent(id);
      revalidateAdminAgentsCache();
      revalidateAdminDashboardCache();
      revalidateAgentDashboardCache(id);
      return NextResponse.redirect(new URL("/admin?view=agents&saved=agent", request.url), 303);
    }

    await updateAgent(id, {
      fullName: String(formData.get("full_name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      password: String(formData.get("password") || ""),
      status: String(formData.get("status") || "active") === "disabled" ? "disabled" : "active",
      assignedServices: splitServices(formData.get("assigned_services")),
      workingArea: String(formData.get("working_area") || "").trim(),
      notes: String(formData.get("notes") || "").trim(),
    });
    revalidateAdminAgentsCache();
    revalidateAdminDashboardCache();
    revalidateAgentDashboardCache(id);

    return NextResponse.redirect(new URL("/admin?view=agents&saved=agent", request.url), 303);
  } catch (error) {
    console.error("Could not update agent", error);
    return NextResponse.redirect(new URL("/admin?view=agents&error=agent", request.url), 303);
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
  const body = (await request.json()) as {
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
    status?: string;
    assignedServices?: string[];
    workingArea?: string;
    notes?: string;
  };
  const current = await getAgentById(id);
  if (!current) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const agent = await updateAgent(id, {
    fullName: body.fullName ?? current.fullName,
    email: body.email ?? current.email,
    phone: body.phone ?? current.phone,
    password: body.password,
    status: body.status === "disabled" ? "disabled" : "active",
    assignedServices: body.assignedServices ?? current.assignedServices,
    workingArea: body.workingArea ?? current.workingArea,
    notes: body.notes ?? current.notes,
  });
  revalidateAdminAgentsCache();
  revalidateAdminDashboardCache();
  revalidateAgentDashboardCache(id);

  return NextResponse.json({ success: true, agent, message: "Agent saved successfully." });
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await ensureAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  await deleteAgent(id);
  revalidateAdminAgentsCache();
  revalidateAdminDashboardCache();
  revalidateAgentDashboardCache(id);
  return NextResponse.json({ success: true, message: "Agent deleted successfully." });
}
