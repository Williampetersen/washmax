import { createHash, randomBytes } from "node:crypto";
import { ensureSchema, getSql, isDatabaseConfigured } from "@/lib/server/db";

export const CODE_EXPIRY_MINUTES = 10;
export const MAX_ATTEMPTS = 5;
export const RESEND_COOLDOWN_SECONDS = 60;

const createId = (prefix: string) => `${prefix}_${randomBytes(10).toString("hex")}`;

const generateCode = (): string => {
  const buf = randomBytes(3);
  const num = buf.readUIntBE(0, 3) % 900000;
  return String(100000 + num);
};

const hashCode = (code: string): string =>
  createHash("sha256").update(code).digest("hex");

export const maskEmail = (email: string): string => {
  const at = email.indexOf("@");
  if (at < 1) return "***@***.***";
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  const visible = local.slice(0, Math.min(2, local.length));
  return `${visible}***@${domain}`;
};

export const getMaskedEmailForPortalToken = async (portalToken: string): Promise<string | null> => {
  if (!isDatabaseConfigured() || !portalToken) return null;
  try {
    await ensureSchema({ force: true });
    const sql = getSql();
    const [row] = await sql<{ email: string }[]>`
      SELECT email FROM customers
      WHERE portal_token = ${portalToken}
        AND (portal_token_expires_at IS NULL OR portal_token_expires_at > NOW())
      LIMIT 1;
    `;
    return row ? maskEmail(row.email) : null;
  } catch {
    return null;
  }
};

export type GenerateCodeResult =
  | { ok: true; code: string; email: string; customerId: string; maskedEmail: string }
  | { ok: false; error: "not_found" | "cooldown"; waitSeconds?: number };

export const generateVerificationCode = async (
  portalToken: string
): Promise<GenerateCodeResult> => {
  if (!isDatabaseConfigured()) return { ok: false, error: "not_found" };

  try {
    await ensureSchema({ force: true });
    const sql = getSql();

    const [customer] = await sql<{ id: string; email: string }[]>`
      SELECT id, email FROM customers
      WHERE portal_token = ${portalToken}
        AND (portal_token_expires_at IS NULL OR portal_token_expires_at > NOW())
      LIMIT 1;
    `;
    if (!customer) return { ok: false, error: "not_found" };

    // Rate-limit: prevent new code within RESEND_COOLDOWN_SECONDS
    const cooldownSince = new Date(Date.now() - RESEND_COOLDOWN_SECONDS * 1000);
    const [recent] = await sql<{ created_at: string }[]>`
      SELECT created_at FROM customer_email_verifications
      WHERE portal_token = ${portalToken}
        AND created_at > ${cooldownSince}
        AND used_at IS NULL
      ORDER BY created_at DESC
      LIMIT 1;
    `;
    if (recent) {
      const elapsed = Date.now() - new Date(recent.created_at).getTime();
      const waitSeconds = Math.max(1, Math.ceil((RESEND_COOLDOWN_SECONDS * 1000 - elapsed) / 1000));
      return { ok: false, error: "cooldown", waitSeconds };
    }

    const code = generateCode();
    const codeHash = hashCode(code);
    const expiresAt = new Date(Date.now() + CODE_EXPIRY_MINUTES * 60 * 1000);

    await sql`
      INSERT INTO customer_email_verifications
        (id, email, portal_token, code_hash, expires_at)
      VALUES
        (${createId("cev")}, ${customer.email}, ${portalToken}, ${codeHash}, ${expiresAt});
    `;

    return {
      ok: true,
      code,
      email: customer.email,
      customerId: customer.id,
      maskedEmail: maskEmail(customer.email),
    };
  } catch (error) {
    console.error(
      "[customer-auth] generateVerificationCode error:",
      error instanceof Error ? error.message : error,
    );
    return { ok: false, error: "not_found" };
  }
};

export type VerifyCodeResult =
  | { ok: true; customerId: string; email: string; portalToken: string }
  | { ok: false; error: "invalid" | "expired" | "max_attempts" };

export const verifyVerificationCode = async (
  portalToken: string,
  submittedCode: string
): Promise<VerifyCodeResult> => {
  if (!isDatabaseConfigured()) return { ok: false, error: "invalid" };

  const trimmed = String(submittedCode || "").trim();
  if (!/^\d{6}$/.test(trimmed)) return { ok: false, error: "invalid" };

  try {
    await ensureSchema({ force: true });
    const sql = getSql();

    const [record] = await sql<{
      id: string;
      email: string;
      code_hash: string;
      expires_at: string;
      used_at: string | null;
      attempts: number;
    }[]>`
      SELECT id, email, code_hash, expires_at, used_at, attempts
      FROM customer_email_verifications
      WHERE portal_token = ${portalToken}
        AND used_at IS NULL
      ORDER BY created_at DESC
      LIMIT 1;
    `;

    if (!record) return { ok: false, error: "invalid" };
    if (new Date(record.expires_at) < new Date()) return { ok: false, error: "expired" };
    if (record.attempts >= MAX_ATTEMPTS) return { ok: false, error: "max_attempts" };

    const submittedHash = hashCode(trimmed);
    if (submittedHash !== record.code_hash) {
      await sql`
        UPDATE customer_email_verifications
        SET attempts = attempts + 1, last_attempt_at = NOW()
        WHERE id = ${record.id};
      `;
      if (record.attempts + 1 >= MAX_ATTEMPTS) {
        return { ok: false, error: "max_attempts" };
      }
      return { ok: false, error: "invalid" };
    }

    // Success: mark code as used
    await sql`
      UPDATE customer_email_verifications
      SET used_at = NOW()
      WHERE id = ${record.id};
    `;

    const [customerRow] = await sql<{ id: string }[]>`
      SELECT id FROM customers
      WHERE portal_token = ${portalToken}
        AND LOWER(email) = LOWER(${record.email})
      LIMIT 1;
    `;
    if (!customerRow) return { ok: false, error: "invalid" };

    return { ok: true, customerId: customerRow.id, email: record.email, portalToken };
  } catch {
    return { ok: false, error: "invalid" };
  }
};
