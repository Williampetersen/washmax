import { randomBytes } from "node:crypto";

// Lightweight structured logging so production issues can be traced from
// Vercel logs by request id, without ever printing secrets or full
// customer records. Keep field values to primitives (ids, statuses,
// durations) - never pass SMTP/session secrets or full payloads in here.
export const createRequestId = (prefix = "req") => `${prefix}_${randomBytes(6).toString("hex")}`;

type LogFields = Record<string, string | number | boolean | null | undefined>;

const serialize = (fields?: LogFields) => {
  if (!fields) return "";
  return Object.entries(fields)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
    .join(" ");
};

export const logInfo = (event: string, fields?: LogFields) => {
  console.info(`[booking] ${event} ${serialize(fields)}`.trimEnd());
};

export const logWarn = (event: string, fields?: LogFields) => {
  console.warn(`[booking] ${event} ${serialize(fields)}`.trimEnd());
};

export const logError = (event: string, error: unknown, fields?: LogFields) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[booking] ${event} ${serialize({ ...fields, error: message })}`.trimEnd());
};
