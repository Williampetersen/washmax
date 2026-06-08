import { getSql, isDatabaseConfigured, shouldRunDatabaseSetup } from "@/lib/server/db";
import { sanitizePlate, type VehicleLookupResult } from "@/lib/shared/booking";

const MOTORAPI_BASE_URL = "https://v1.motorapi.dk";
const PLATE_PATTERN = /^[A-Z0-9]{2,10}$/;
// Fast customer flow matters more than exhausting upstream retries.
const MOTORAPI_TIMEOUT_MS = 2800;
const MOTORAPI_RETRY_TIMEOUT_MS = 700;
// Vehicle data is stable, but keep freshness tight for customer-facing lookup.
const MEMORY_CACHE_TTL_MS = 10 * 60 * 1000;
const PERSISTENT_CACHE_TTL_HOURS = 24;

type VehicleRecord = Record<string, unknown>;
type CacheEntry = {
  vehicle: VehicleLookupResult;
  expiresAt: number;
};
type PersistentCacheEntry = {
  vehicle: VehicleLookupResult;
  isExpired: boolean;
};

let cacheTablePromise: Promise<void> | null = null;
const memoryCache = new Map<string, CacheEntry>();
const inFlightLookups = new Map<string, Promise<VehicleLookupResult>>();

const shouldLogTiming = () =>
  process.env.NODE_ENV === "development" || process.env.PERFORMANCE_LOGS === "true";

const logTiming = (label: string, startedAt: number, details = "") => {
  if (!shouldLogTiming()) return;
  console.info(`[perf] ${label} ${Math.round(performance.now() - startedAt)}ms${details}`);
};

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

const createFallbackVehicle = (plate: string): VehicleLookupResult => ({
  registration_number: plate,
  make: null,
  model: null,
  model_year: null,
  color: null,
  type: null,
  total_weight: null,
  chassis_type: null,
  lookupUnavailable: true,
});

const isTransientStatus = (status: number) =>
  status === 408 || status === 429 || (status >= 500 && status <= 599);

const fetchWithTimeout = async (url: string, init: RequestInit, timeoutMs: number) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
};

const getRemainingTimeout = (deadline: number) => Math.max(0, Math.round(deadline - performance.now()));

const fetchJsonWithRetry = async (url: string, init: RequestInit, deadline: number) => {
  const remaining = getRemainingTimeout(deadline);
  if (remaining <= 0) {
    throw new Error("Vehicle lookup timed out.");
  }

  const first = await fetchWithTimeout(url, init, remaining);

  if (!isTransientStatus(first.status)) {
    return first;
  }

  const retryTimeout = Math.min(MOTORAPI_RETRY_TIMEOUT_MS, getRemainingTimeout(deadline));
  if (retryTimeout <= 0) {
    return first;
  }

  return fetchWithTimeout(url, init, retryTimeout);
};

const ensureVehicleCacheTable = async () => {
  if (!isDatabaseConfigured() || !shouldRunDatabaseSetup()) return;

  cacheTablePromise ??= (async () => {
    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS vehicle_lookup_cache (
        plate TEXT PRIMARY KEY,
        payload JSONB NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        expires_at TIMESTAMPTZ NOT NULL
      );
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS vehicle_lookup_cache_expires_at_idx
      ON vehicle_lookup_cache (expires_at);
    `;
  })();

  await cacheTablePromise;
};

const readPersistentCache = async (plate: string) => {
  if (!isDatabaseConfigured()) return null;

  try {
    await ensureVehicleCacheTable();
    const [row] = await getSql()<Array<{ payload: VehicleLookupResult; is_expired: boolean }>>`
      SELECT payload, expires_at <= NOW() AS is_expired
      FROM vehicle_lookup_cache
      WHERE plate = ${plate}
      LIMIT 1;
    `;

    return row
      ? ({
          vehicle: row.payload,
          isExpired: row.is_expired,
        } satisfies PersistentCacheEntry)
      : null;
  } catch (error) {
    if (shouldLogTiming()) console.warn("Vehicle cache read skipped", error);
    return null;
  }
};

const writePersistentCache = async (plate: string, vehicle: VehicleLookupResult) => {
  if (!isDatabaseConfigured() || vehicle.lookupUnavailable) return;

  try {
    await ensureVehicleCacheTable();
    await getSql()`
      INSERT INTO vehicle_lookup_cache (plate, payload, expires_at)
      VALUES (
        ${plate},
        ${getSql().json(vehicle)},
        NOW() + make_interval(hours => ${PERSISTENT_CACHE_TTL_HOURS})
      )
      ON CONFLICT (plate)
      DO UPDATE SET
        payload = EXCLUDED.payload,
        updated_at = NOW(),
        expires_at = EXCLUDED.expires_at;
    `;
  } catch (error) {
    if (shouldLogTiming()) console.warn("Vehicle cache write skipped", error);
  }
};

const readMemoryCache = (plate: string) => {
  const cached = memoryCache.get(plate);
  if (!cached) return null;

  if (cached.expiresAt <= Date.now()) {
    memoryCache.delete(plate);
    return null;
  }

  return cached.vehicle;
};

const writeMemoryCache = (plate: string, vehicle: VehicleLookupResult) => {
  if (vehicle.lookupUnavailable) return;

  memoryCache.set(plate, {
    vehicle,
    expiresAt: Date.now() + MEMORY_CACHE_TTL_MS,
  });
};

const fetchVehiclePayload = async (plate: string, apiKey: string) => {
  const deadline = performance.now() + MOTORAPI_TIMEOUT_MS;
  const headers = {
    Accept: "application/json",
    "X-AUTH-TOKEN": apiKey,
  };

  const pathResponse = await fetchJsonWithRetry(
    `${MOTORAPI_BASE_URL}/vehicles/${encodeURIComponent(plate)}`,
    {
      headers,
      cache: "no-store",
    },
    deadline
  );

  if (pathResponse.ok) {
    return pathResponse.json();
  }

  if (pathResponse.status !== 404) {
    throw new Error("Vehicle lookup failed.");
  }

  const queryResponse = await fetchJsonWithRetry(
    `${MOTORAPI_BASE_URL}/vehicles?registration_number=${encodeURIComponent(plate)}`,
    { headers, cache: "no-store" },
    deadline
  );

  if (queryResponse.ok) {
    return queryResponse.json();
  }

  if (queryResponse.status === 404) {
    return null;
  }

  throw new Error("Vehicle lookup failed.");
};

const shouldBypassCache = (bypassCache?: boolean) =>
  Boolean(bypassCache) || process.env.VEHICLE_LOOKUP_BYPASS_CACHE === "true";

const lookupVehicleUncached = async (
  plate: string,
  apiKey: string,
  staleCache: PersistentCacheEntry | null,
  startedAt: number
) => {
  let payload: unknown;
  const motorStartedAt = performance.now();
  try {
    payload = await fetchVehiclePayload(plate, apiKey);
  } catch (error) {
    if (staleCache) {
      console.warn("MotorAPI failed; returning stale vehicle cache for plate", plate);
      writeMemoryCache(plate, staleCache.vehicle);
      logTiming("vehicle.motorapi", motorStartedAt, " stale_cache=true");
      return staleCache.vehicle;
    }

    if (shouldLogTiming()) console.warn("MotorAPI lookup failed", error);
    logTiming("vehicle.motorapi", motorStartedAt, " fallback=true");
    return createFallbackVehicle(plate);
  }
  logTiming("vehicle.motorapi", motorStartedAt);

  const vehicleSource = Array.isArray(payload) ? payload[0] : payload;

  if (!isVehicleRecord(vehicleSource)) {
    if (staleCache) {
      console.warn("MotorAPI returned no usable vehicle; returning stale cache for plate", plate);
      writeMemoryCache(plate, staleCache.vehicle);
      return staleCache.vehicle;
    }
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
    if (staleCache) {
      console.warn("MotorAPI vehicle payload was incomplete; returning stale cache for plate", plate);
      writeMemoryCache(plate, staleCache.vehicle);
      return staleCache.vehicle;
    }
    throw new Error("No vehicle found for that license plate.");
  }

  writeMemoryCache(plate, vehicle);
  void writePersistentCache(plate, vehicle);
  logTiming("vehicle.lookup", startedAt, staleCache ? " cache=stale-refresh" : " cache=miss");

  return vehicle;
};

export const lookupVehicle = async (
  input: string,
  options: { bypassCache?: boolean } = {}
): Promise<VehicleLookupResult> => {
  const startedAt = performance.now();
  const apiKey = process.env.MOTORAPI_API_KEY;
  const plate = sanitizePlate(input);
  const bypassCache = shouldBypassCache(options.bypassCache);

  if (!PLATE_PATTERN.test(plate)) {
    throw new Error("Invalid license plate number.");
  }

  if (!bypassCache) {
    const memoryHit = readMemoryCache(plate);
    if (memoryHit) {
      logTiming("vehicle.lookup", startedAt, " cache=memory");
      return memoryHit;
    }

    const persistentHit = await readPersistentCache(plate);
    if (persistentHit && !persistentHit.isExpired) {
      writeMemoryCache(plate, persistentHit.vehicle);
      logTiming("vehicle.lookup", startedAt, " cache=db");
      return persistentHit.vehicle;
    }

    if (!apiKey && persistentHit) {
      console.warn("MotorAPI key missing; returning stale vehicle cache for plate", plate);
      return persistentHit.vehicle;
    }

    if (apiKey) {
      const cacheKey = plate;
      const existingLookup = inFlightLookups.get(cacheKey);
      if (existingLookup) {
        logTiming("vehicle.lookup", startedAt, " dedupe=true");
        return existingLookup;
      }

      const lookupPromise = lookupVehicleUncached(plate, apiKey, persistentHit, startedAt).finally(
        () => {
          inFlightLookups.delete(cacheKey);
        }
      );
      inFlightLookups.set(cacheKey, lookupPromise);
      return lookupPromise;
    }
  }

  if (!apiKey) {
    if (shouldLogTiming()) console.warn("MotorAPI key is not configured.");
    return createFallbackVehicle(plate);
  }

  return lookupVehicleUncached(plate, apiKey, null, startedAt);
};
