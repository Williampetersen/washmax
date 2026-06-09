import { NextResponse } from "next/server";
import { lookupVehicle } from "@/lib/server/vehicle";
import { sanitizePlate, type VehicleLookupResult } from "@/lib/shared/booking";

const json = (body: unknown, status = 200, cacheControl = "no-store") =>
  NextResponse.json(body, {
    status,
    headers: {
      "cache-control": cacheControl,
    },
  });

const VEHICLE_CACHE_HEADER = "public, max-age=60, s-maxage=86400, stale-while-revalidate=604800";
const PLATE_PATTERN = /^[A-Z0-9]{2,10}$/;
const ROUTE_MEMORY_TTL_MS = 5 * 60 * 1000;
const routeMemoryCache = new Map<string, { vehicle: VehicleLookupResult; expiresAt: number }>();

const shouldLogTiming = () =>
  process.env.NODE_ENV === "development" || process.env.PERFORMANCE_LOGS === "true";

export async function GET(
  request: Request,
  context: { params: Promise<{ plate: string }> }
) {
  const startedAt = performance.now();
  const { plate } = await context.params;
  const normalizedPlate = sanitizePlate(plate);
  const url = new URL(request.url);
  const bypassCache = url.searchParams.get("fresh") === "1";

  if (!PLATE_PATTERN.test(normalizedPlate)) {
    return json({ error: "Invalid license plate number." }, 400);
  }

  if (!bypassCache) {
    const cached = routeMemoryCache.get(normalizedPlate);
    if (cached && cached.expiresAt > Date.now()) {
      return json(cached.vehicle, 200, VEHICLE_CACHE_HEADER);
    }
    if (cached) {
      routeMemoryCache.delete(normalizedPlate);
    }
  }

  try {
    const vehicle = await lookupVehicle(normalizedPlate, { bypassCache });
    if (!bypassCache && !vehicle.lookupUnavailable) {
      routeMemoryCache.set(normalizedPlate, {
        vehicle,
        expiresAt: Date.now() + ROUTE_MEMORY_TTL_MS,
      });
    }
    return json(vehicle, 200, bypassCache ? "no-store" : VEHICLE_CACHE_HEADER);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Vehicle lookup failed.";

    if (message === "Invalid license plate number.") {
      return json({ error: message }, 400);
    }

    if (message === "MotorAPI key is not configured.") {
      return json({ error: "Vehicle lookup is temporarily unavailable." }, 503);
    }

    if (message === "No vehicle found for that license plate.") {
      return json({ error: message }, 404);
    }

    return json({ error: "Vehicle lookup failed." }, 502);
  } finally {
    if (shouldLogTiming()) {
      console.info(`[perf] api.vehicle ${Math.round(performance.now() - startedAt)}ms`);
    }
  }
}
