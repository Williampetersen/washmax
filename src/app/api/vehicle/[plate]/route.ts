import { NextResponse } from "next/server";
import { lookupVehicle } from "@/lib/server/vehicle";

const json = (body: unknown, status = 200, cacheControl = "no-store") =>
  NextResponse.json(body, {
    status,
    headers: {
      "cache-control": cacheControl,
    },
  });

const VEHICLE_CACHE_HEADER = "public, max-age=60, s-maxage=86400, stale-while-revalidate=604800";

const shouldLogTiming = () =>
  process.env.NODE_ENV === "development" || process.env.PERFORMANCE_LOGS === "true";

export async function GET(
  request: Request,
  context: { params: Promise<{ plate: string }> }
) {
  const startedAt = performance.now();
  const { plate } = await context.params;
  const url = new URL(request.url);
  const bypassCache = url.searchParams.get("fresh") === "1";

  try {
    const vehicle = await lookupVehicle(plate, { bypassCache });
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
