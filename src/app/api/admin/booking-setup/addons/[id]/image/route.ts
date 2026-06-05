import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import sharp from "sharp";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { setBookingAddonImage } from "@/lib/server/booking-setup";

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
  const image = formData.get("image");
  if (!(image instanceof File) || image.size === 0 || image.size > 4 * 1024 * 1024) {
    return NextResponse.redirect(new URL("/admin?view=booking-setup&error=booking-setup", request.url), 303);
  }
  if (!["image/jpeg", "image/png", "image/webp"].includes(image.type)) {
    return NextResponse.redirect(new URL("/admin?view=booking-setup&error=booking-setup", request.url), 303);
  }
  try {
    const output = await sharp(Buffer.from(await image.arrayBuffer()))
      .resize(960, 640, { fit: "cover" })
      .webp({ quality: 82 })
      .toBuffer();
    const dir = path.join(process.cwd(), "public", "uploads", "booking-setup");
    await mkdir(dir, { recursive: true });
    const fileName = `addon-${id}-${Date.now()}.webp`;
    await writeFile(path.join(dir, fileName), output);
    await setBookingAddonImage(id, `/uploads/booking-setup/${fileName}`);
    return NextResponse.redirect(new URL("/admin?view=booking-setup&saved=booking-setup", request.url), 303);
  } catch (error) {
    console.error("Could not upload addon image", error);
    return NextResponse.redirect(new URL("/admin?view=booking-setup&error=booking-setup", request.url), 303);
  }
}
