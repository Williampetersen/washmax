import { NextResponse } from "next/server";
import { getAvailableBookingSlots } from "@/lib/server/availability";
import {
  calculateBookingPriceFromSetup,
  getBookingSettingsFromSetup,
} from "@/lib/server/booking-setup";
import { isDatabaseConfigured } from "@/lib/server/db";

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, {
    status,
    headers: {
      "cache-control": "no-store",
    },
  });

const parseAddonIds = (value: string | null) =>
  String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export async function GET(request: Request) {
  if (!isDatabaseConfigured()) {
    return json({ slots: [], agentId: "" });
  }

  const { searchParams } = new URL(request.url);
  const date = String(searchParams.get("date") || "").trim();
  const packageId = String(searchParams.get("packageId") || "").trim();

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !packageId) {
    return json({ error: "Invalid availability request." }, 400);
  }

  try {
    const settings = await getBookingSettingsFromSetup();
    const pricing = await calculateBookingPriceFromSetup({
      packageId,
      addonIds: parseAddonIds(searchParams.get("addonIds")),
      categoryLabel: String(searchParams.get("category") || ""),
      postalCode: String(searchParams.get("postalCode") || ""),
      settings,
    });
    const result = await getAvailableBookingSlots({
      date,
      durationMinutes: pricing.estimatedMinutes,
      settings,
      agentId: String(searchParams.get("agentId") || ""),
    });

    return json(result);
  } catch (error) {
    console.error("Could not calculate booking availability", error);
    return json({ error: "Could not load available times." }, 500);
  }
}
