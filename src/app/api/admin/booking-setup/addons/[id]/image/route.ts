import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import sharp from "sharp";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { setBookingAddonImage } from "@/lib/server/booking-setup";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  if (!getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }
  const { id } = await context.params;
  const formData = await request.formData();
  const image = formData.get("image");

  if (!(image instanceof File) || image.size === 0) {
    return NextResponse.json({ success: false, message: "No image provided." }, { status: 400 });
  }
  if (image.size > 4 * 1024 * 1024) {
    return NextResponse.json({ success: false, message: "Image must be under 4 MB." }, { status: 400 });
  }
  if (!["image/jpeg", "image/png", "image/webp"].includes(image.type)) {
    return NextResponse.json({ success: false, message: "Only JPEG, PNG and WebP are allowed." }, { status: 400 });
  }

  try {
    const output = await sharp(Buffer.from(await image.arrayBuffer()))
      .resize(960, 640, { fit: "cover" })
      .webp({ quality: 82 })
      .toBuffer();

    const { url } = await put(
      `booking-setup/addon-${id}-${Date.now()}.webp`,
      output,
      { access: "public", contentType: "image/webp" }
    );

    await setBookingAddonImage(id, url);
    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("Could not upload addon image", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Upload failed." },
      { status: 500 }
    );
  }
}
