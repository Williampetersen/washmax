import type { APIRoute } from "astro";

export const prerender = false;

const MOTORAPI_BASE_URL = "https://v1.motorapi.dk";
const PLATE_PATTERN = /^[A-Z0-9]{2,10}$/;

type VehicleRecord = Record<string, unknown>;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });

const sanitizePlate = (plate: string) =>
  plate
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 10);

const asText = (value: unknown) => {
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  return text.length > 0 ? text : null;
};

const asNumber = (value: unknown) => {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const isVehicleRecord = (value: unknown): value is VehicleRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const fetchVehiclePayload = async (plate: string, apiKey: string) => {
  const headers = {
    Accept: "application/json",
    "X-AUTH-TOKEN": apiKey,
  };

  const pathResponse = await fetch(
    `${MOTORAPI_BASE_URL}/vehicles/${encodeURIComponent(plate)}`,
    { headers }
  );

  if (pathResponse.ok) {
    return pathResponse.json();
  }

  if (pathResponse.status !== 404) {
    throw new Error("Vehicle lookup failed.");
  }

  const queryResponse = await fetch(
    `${MOTORAPI_BASE_URL}/vehicles?registration_number=${encodeURIComponent(plate)}`,
    { headers }
  );

  if (queryResponse.ok) {
    return queryResponse.json();
  }

  if (queryResponse.status === 404) {
    return null;
  }

  throw new Error("Vehicle lookup failed.");
};

export const GET: APIRoute = async ({ params }) => {
  const apiKey = import.meta.env.MOTORAPI_API_KEY;
  const plate = sanitizePlate(params.plate ?? "");

  if (!PLATE_PATTERN.test(plate)) {
    return json({ error: "Invalid license plate number." }, 400);
  }

  if (!apiKey) {
    return json({ error: "MotorAPI key is not configured." }, 500);
  }

  try {
    const payload = await fetchVehiclePayload(plate, apiKey);
    const vehicleSource = Array.isArray(payload) ? payload[0] : payload;

    if (!isVehicleRecord(vehicleSource)) {
      return json({ error: "No vehicle found for that license plate." }, 404);
    }

    const vehicle = {
      registration_number: asText(vehicleSource.registration_number) ?? plate,
      make: asText(vehicleSource.make),
      model: asText(vehicleSource.model),
      model_year: asNumber(vehicleSource.model_year),
      color: asText(vehicleSource.color),
      type: asText(vehicleSource.type),
      total_weight: asNumber(vehicleSource.total_weight),
      chassis_type: asText(vehicleSource.chassis_type),
    };

    if (!vehicle.make && !vehicle.model) {
      return json({ error: "No vehicle found for that license plate." }, 404);
    }

    return json(vehicle);
  } catch {
    return json({ error: "Vehicle lookup failed." }, 502);
  }
};
