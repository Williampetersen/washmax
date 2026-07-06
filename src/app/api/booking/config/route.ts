import { NextResponse } from "next/server";
import { getPublicBookingConfig } from "@/lib/server/booking-setup";

// Services, pricing and availability are admin-editable and must be fresh
// on every request; a shared CDN cache here previously meant admin changes
// (price/service edits) could be invisible to customers for up to 2-12
// minutes (s-maxage + stale-while-revalidate).
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  return NextResponse.json(await getPublicBookingConfig(), {
    headers: {
      "cache-control": "no-store",
    },
  });
}
