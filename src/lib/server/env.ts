import "server-only";

const TRUE_VALUES = new Set(["1", "true", "yes", "on"]);
const FALSE_VALUES = new Set(["0", "false", "no", "off"]);

export class EnvValidationError extends Error {
  variableName: string;

  constructor(variableName: string, message?: string) {
    super(message || `Missing required environment variable: ${variableName}`);
    this.name = "EnvValidationError";
    this.variableName = variableName;
  }
}

export const getOptionalEnv = (name: string) => {
  const value = process.env[name];
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
};

export const hasEnv = (name: string) => Boolean(getOptionalEnv(name));

export const requireEnv = (name: string) => {
  const value = getOptionalEnv(name);
  if (!value) {
    throw new EnvValidationError(name);
  }

  return value;
};

export const getBooleanEnv = (name: string, fallback?: boolean) => {
  const value = getOptionalEnv(name);
  if (!value) {
    return fallback;
  }

  const normalized = value.toLowerCase();
  if (TRUE_VALUES.has(normalized)) {
    return true;
  }

  if (FALSE_VALUES.has(normalized)) {
    return false;
  }

  throw new EnvValidationError(
    name,
    `Environment variable ${name} must be a boolean value like true or false.`
  );
};

export const getNumberEnv = (name: string, fallback?: number) => {
  const value = getOptionalEnv(name);
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new EnvValidationError(
      name,
      `Environment variable ${name} must be a valid number.`
    );
  }

  return parsed;
};

export const getAppUrl = (fallback?: string) =>
  (getOptionalEnv("APP_URL") || fallback || "").replace(/\/$/, "");

export const getMailFromName = () => getOptionalEnv("MAIL_FROM_NAME") || "Clean Wash";

export const getDatabaseUrl = () =>
  getOptionalEnv("DATABASE_URL") || getOptionalEnv("POSTGRES_URL") || "";

export const getDatabaseEnvSource = () => {
  if (hasEnv("DATABASE_URL")) {
    return "DATABASE_URL";
  }

  if (hasEnv("POSTGRES_URL")) {
    return "POSTGRES_URL";
  }

  return "";
};

const getMissingEnvNames = (names: string[]) => names.filter((name) => !hasEnv(name));

export const getServerEnvironmentSummary = () => {
  const databaseConfigured = Boolean(getDatabaseUrl());
  const requiredCore = [
    "APP_URL",
    "ADMIN_EMAIL",
    "ADMIN_PASSWORD",
    "ADMIN_SESSION_SECRET",
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_SECURE",
    "SMTP_USER",
    "SMTP_PASSWORD",
    "MOTORAPI_API_KEY",
  ];
  const requiredMail = ["SMTP_HOST", "SMTP_PORT", "SMTP_SECURE", "SMTP_USER", "SMTP_PASSWORD"];
  const mailSenderConfigured = hasEnv("MAIL_FROM") || hasEnv("SMTP_USER");

  return {
    databaseConfigured,
    databaseSource: getDatabaseEnvSource(),
    appUrlConfigured: hasEnv("APP_URL"),
    adminConfigured:
      hasEnv("ADMIN_EMAIL") && hasEnv("ADMIN_PASSWORD") && hasEnv("ADMIN_SESSION_SECRET"),
    smtpConfigured: requiredMail.every((name) => hasEnv(name)) && mailSenderConfigured,
    bookingAdminConfigured: hasEnv("BOOKING_ADMIN_EMAIL"),
    motorApiConfigured: hasEnv("MOTORAPI_API_KEY"),
    mailFromConfigured: hasEnv("MAIL_FROM"),
    mailFromNameConfigured: hasEnv("MAIL_FROM_NAME"),
    missingCore: [...(databaseConfigured ? [] : ["DATABASE_URL or POSTGRES_URL"]), ...getMissingEnvNames(requiredCore)],
    missingMail:
      requiredMail.every((name) => hasEnv(name)) && mailSenderConfigured
        ? []
        : [...getMissingEnvNames(requiredMail), ...(mailSenderConfigured ? [] : ["MAIL_FROM"])],
  };
};
