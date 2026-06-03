import { NextResponse } from "next/server";
import { lookupVehicle } from "@/lib/server/vehicle";

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, {
    status,
    headers: {
      "cache-control": "no-store",
    },
  });

export async function GET(
  _request: Request,
  context: { params: Promise<{ plate: string }> }
) {
  const { plate } = await context.params;

  try {
    const vehicle = await lookupVehicle(plate);
    return json(vehicle);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Vehicle lookup failed.";

    if (message === "Invalid license plate number.") {
      return json({ error: message }, 400);
    }

    if (message === "MotorAPI key is not configured.") {
      return json({ error: message }, 500);
    }

    if (message === "No vehicle found for that license plate.") {
      return json({ error: message }, 404);
    }

    return json({ error: "Vehicle lookup failed." }, 502);
  }
}
