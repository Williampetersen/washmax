import { sanitizePlate, type VehicleLookupResult } from "@/lib/shared/booking";
import { requireEnv } from "@/lib/server/env";

const MOTORAPI_BASE_URL = "https://v1.motorapi.dk";
const PLATE_PATTERN = /^[A-Z0-9]{2,10}$/;
const VEHICLE_LOOKUP_CACHE_TTL_MS = 10 * 60 * 1000;

type VehicleRecord = Record<string, unknown>;
type VehicleCacheEntry = {
  vehicle: VehicleLookupResult;
  expiresAt: number;
};

const vehicleLookupCache = new Map<string, VehicleCacheEntry>();
const vehicleLookupInFlight = new Map<string, Promise<VehicleLookupResult>>();

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

  const pathResponse = await fetch(`${MOTORAPI_BASE_URL}/vehicles/${encodeURIComponent(plate)}`, {
    headers,
    cache: "no-store",
  });

  if (pathResponse.ok) {
    return pathResponse.json();
  }

  if (pathResponse.status !== 404) {
    throw new Error("Vehicle lookup failed.");
  }

  const queryResponse = await fetch(
    `${MOTORAPI_BASE_URL}/vehicles?registration_number=${encodeURIComponent(plate)}`,
    { headers, cache: "no-store" }
  );

  if (queryResponse.ok) {
    return queryResponse.json();
  }

  if (queryResponse.status === 404) {
    return null;
  }

  throw new Error("Vehicle lookup failed.");
};

export const lookupVehicle = async (input: string): Promise<VehicleLookupResult> => {
  const apiKey = requireEnv("MOTORAPI_API_KEY");
  const plate = sanitizePlate(input);

  if (!PLATE_PATTERN.test(plate)) {
    throw new Error("Invalid license plate number.");
  }

  const cached = vehicleLookupCache.get(plate);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.vehicle;
  }

  const inFlight = vehicleLookupInFlight.get(plate);
  if (inFlight) {
    return inFlight;
  }

  const lookupPromise = (async () => {
    const payload = await fetchVehiclePayload(plate, apiKey);
    const vehicleSource = Array.isArray(payload) ? payload[0] : payload;

    if (!isVehicleRecord(vehicleSource)) {
      throw new Error("No vehicle found for that license plate.");
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
      throw new Error("No vehicle found for that license plate.");
    }

    vehicleLookupCache.set(plate, {
      vehicle,
      expiresAt: Date.now() + VEHICLE_LOOKUP_CACHE_TTL_MS,
    });

    return vehicle;
  })().finally(() => {
    vehicleLookupInFlight.delete(plate);
  });

  vehicleLookupInFlight.set(plate, lookupPromise);
  return lookupPromise;
};
