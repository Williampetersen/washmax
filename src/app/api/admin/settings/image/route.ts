import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import sharp from "sharp";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { saveCompanyLogoUrl } from "@/lib/server/bookings";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData();
  const image = formData.get("image");

  if (!(image instanceof File) || image.size === 0) {
    return NextResponse.json({ success: false, message: "No image provided." }, { status: 400 });
  }
  if (image.size > 4 * 1024 * 1024) {
    return NextResponse.json({ success: false, message: "Image must be under 4 MB." }, { status: 400 });
  }
  if (!["image/jpeg", "image/png", "image/webp"].includes(image.type)) {
    return NextResponse.json(
      { success: false, message: "Only JPEG, PNG and WebP are allowed." },
      { status: 400 }
    );
  }

  try {
    const output = await sharp(Buffer.from(await image.arrayBuffer()))
      .resize(400, 400, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .webp({ quality: 88 })
      .toBuffer();

    const { url } = await put(
      `admin/company-logo-${Date.now()}.webp`,
      output,
      { access: "public", contentType: "image/webp" }
    );

    await saveCompanyLogoUrl(url);

    return NextResponse.redirect(
      new URL(`/admin?view=settings&saved=settings`, request.url),
      303
    );
  } catch (error) {
    console.error("Could not upload company logo", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Upload failed." },
      { status: 500 }
    );
  }
}
