import { createHmac, timingSafeEqual } from "node:crypto";
import { getOptionalEnv, requireEnv } from "@/lib/server/env";

export const ADMIN_COOKIE_NAME = "washmax_admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 12;

const getSecret = () => getOptionalEnv("ADMIN_SESSION_SECRET") || "";

const encode = (value: string) => Buffer.from(value, "utf-8").toString("base64url");
const decode = (value: string) => Buffer.from(value, "base64url").toString("utf-8");

const sign = (value: string) =>
  createHmac("sha256", getSecret()).update(value).digest("base64url");

export const isAdminConfigured = () =>
  Boolean(
    getOptionalEnv("ADMIN_EMAIL") &&
      getOptionalEnv("ADMIN_PASSWORD") &&
      getOptionalEnv("ADMIN_SESSION_SECRET")
  );

export const createAdminSessionToken = (email: string) => {
  const secret = requireEnv("ADMIN_SESSION_SECRET");
  const payload = encode(
    JSON.stringify({
      email,
      exp: Date.now() + SESSION_DURATION_MS,
    })
  );

  return `${payload}.${createHmac("sha256", secret).update(payload).digest("base64url")}`;
};

export const verifyAdminSessionToken = (token: string | undefined | null) => {
  if (!token || !getSecret()) return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const isValid =
    expected.length === signature.length &&
    timingSafeEqual(Buffer.from(expected), Buffer.from(signature));

  if (!isValid) return null;

  try {
    const data = JSON.parse(decode(payload)) as { email?: string; exp?: number };

    if (!data.email || !data.exp || data.exp < Date.now()) {
      return null;
    }

    return { email: data.email };
  } catch {
    return null;
  }
};

export const validateAdminCredentials = (email: string, password: string) =>
  email === getOptionalEnv("ADMIN_EMAIL") && password === getOptionalEnv("ADMIN_PASSWORD");

export const getAdminSession = (cookieValue?: string | null) =>
  verifyAdminSessionToken(cookieValue);

export const getAdminCookieOptions = () => ({
  path: "/",
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: SESSION_DURATION_MS / 1000,
});
