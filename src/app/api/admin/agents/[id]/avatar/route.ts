import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import sharp from "sharp";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { setAgentAvatar } from "@/lib/server/agents";

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
  const avatar = formData.get("avatar");

  if (!(avatar instanceof File) || avatar.size === 0) {
    return NextResponse.redirect(new URL("/admin?view=agents&error=agent", request.url), 303);
  }

  if (!["image/jpeg", "image/png", "image/webp"].includes(avatar.type)) {
    return NextResponse.redirect(new URL("/admin?view=agents&error=agent", request.url), 303);
  }

  try {
    const bytes = Buffer.from(await avatar.arrayBuffer());
    const output = await sharp(bytes)
      .resize(320, 320, { fit: "cover" })
      .webp({ quality: 82 })
      .toBuffer();
    const relativeDir = "/uploads/agents";
    const publicDir = path.join(process.cwd(), "public", "uploads", "agents");
    await mkdir(publicDir, { recursive: true });

    const fileName = `${id}-${Date.now()}.webp`;
    await writeFile(path.join(publicDir, fileName), output);
    await setAgentAvatar(id, `${relativeDir}/${fileName}`);

    return NextResponse.redirect(new URL("/admin?view=agents&saved=agent", request.url), 303);
  } catch (error) {
    console.error("Could not upload agent avatar", error);
    return NextResponse.redirect(new URL("/admin?view=agents&error=agent", request.url), 303);
  }
}
