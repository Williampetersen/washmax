import { NextResponse } from "next/server";
import { getAvailableBookingSlots } from "@/lib/server/availability";
import {
  calculateBookingPriceFromSetup,
  getBookingSettingsFromSetup,
} from "@/lib/server/booking-setup";
import { isDatabaseConfigured } from "@/lib/server/db";

const json = (body: unknown, status = 200, cache = false) =>
  NextResponse.json(body, {
    status,
    headers: {
      "cache-control": cache
        ? "public, s-maxage=30, stale-while-revalidate=60"
        : "no-store",
    },
  });

const parseAddonIds = (value: string | null) =>
  String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const parseVehicles = (value: string | null) => {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value) as Array<{
      packageId?: string;
      addonIds?: string[];
      category?: string;
    }>;

    if (!Array.isArray(parsed)) return [];

    return parsed
      .slice(0, 2)
      .map((item) => ({
        packageId: String(item.packageId || "").trim(),
        addonIds: Array.isArray(item.addonIds)
          ? item.addonIds.map((id) => String(id).trim()).filter(Boolean)
          : [],
        category: String(item.category || "").trim(),
      }))
      .filter((item) => item.packageId);
  } catch {
    return [];
  }
};

export async function GET(request: Request) {
  if (!isDatabaseConfigured()) {
    return json({ slots: [], agentId: "" });
  }

  const { searchParams } = new URL(request.url);
  const date = String(searchParams.get("date") || "").trim();
  const packageId = String(searchParams.get("packageId") || "").trim();
  const vehicles = parseVehicles(searchParams.get("vehicles"));

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || (!packageId && vehicles.length === 0)) {
    return json({ error: "Invalid availability request." }, 400);
  }

  try {
    const settings = await getBookingSettingsFromSetup();
    const pricingItems =
      vehicles.length > 0
        ? await Promise.all(
            vehicles.map((vehicle) =>
              calculateBookingPriceFromSetup({
                packageId: vehicle.packageId,
                addonIds: vehicle.addonIds,
                categoryLabel: vehicle.category,
                postalCode: String(searchParams.get("postalCode") || ""),
                settings,
              })
            )
          )
        : [
            await calculateBookingPriceFromSetup({
              packageId,
              addonIds: parseAddonIds(searchParams.get("addonIds")),
              categoryLabel: String(searchParams.get("category") || ""),
              postalCode: String(searchParams.get("postalCode") || ""),
              settings,
            }),
          ];
    const result = await getAvailableBookingSlots({
      date,
      durationMinutes: pricingItems.reduce(
        (sum, item) => sum + Math.max(1, Number(item.estimatedMinutes || settings.slotMinutes)),
        0
      ),
      settings,
      agentId: String(searchParams.get("agentId") || ""),
    });

    return json(result, 200, true);
  } catch (error) {
    console.error("Could not calculate booking availability", error);
    return json({ error: "Could not load available times." }, 500);
  }
}
