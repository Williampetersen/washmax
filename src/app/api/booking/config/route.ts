import { NextResponse } from "next/server";
import { getPublicBookingConfig } from "@/lib/server/booking-setup";

export async function GET() {
  return NextResponse.json(await getPublicBookingConfig(), {
    headers: {
      "cache-control": "public, max-age=30, s-maxage=120, stale-while-revalidate=600",
    },
  });
}
