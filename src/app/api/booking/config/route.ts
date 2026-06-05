import { NextResponse } from "next/server";
import { getPublicBookingConfig } from "@/lib/server/booking-setup";

export async function GET() {
  return NextResponse.json(await getPublicBookingConfig(), {
    headers: {
      "cache-control": "no-store",
    },
  });
}
