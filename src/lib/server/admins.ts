import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { ensureSchema, getSql, isDatabaseConfigured } from "@/lib/server/db";

export type AdminAccountStatus = "active" | "disabled";

type RawAdminAccount = {
  id: string;
  email: string;
  password_hash: string;
  status: AdminAccountStatus;
  created_at: string | Date;
  updated_at: string | Date;
  last_login_at: string | Date | null;
};

export type AdminAccount = {
  id: string;
  email: string;
  status: AdminAccountStatus;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
};

const createId = (prefix: string) => `${prefix}_${randomBytes(10).toString("hex")}`;
const normalizeEmail = (value: string) => value.trim().toLowerCase();

const toDateTimeText = (value: unknown) => {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return String(value ?? "").trim();
};

const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
};

const verifyPassword = (password: string, passwordHash: string) => {
  const [scheme, salt, storedHash] = passwordHash.split(":");
  if (scheme !== "scrypt" || !salt || !storedHash) return false;

  const hash = scryptSync(password, salt, 64);
  const stored = Buffer.from(storedHash, "hex");
  return stored.length === hash.length && timingSafeEqual(stored, hash);
};

const adminAccountFromRow = (row: RawAdminAccount): AdminAccount => ({
  id: String(row.id ?? ""),
  email: String(row.email ?? ""),
  status: row.status === "disabled" ? "disabled" : "active",
  createdAt: toDateTimeText(row.created_at),
  updatedAt: toDateTimeText(row.updated_at),
  lastLoginAt: toDateTimeText(row.last_login_at),
});

export const listAdminAccounts = async (): Promise<AdminAccount[]> => {
  if (!isDatabaseConfigured()) return [];
  await ensureSchema();
  const sql = getSql();
  const rows = await sql<RawAdminAccount[]>`
    SELECT *
    FROM admins
    ORDER BY created_at DESC;
  `;
  return rows.map(adminAccountFromRow);
};

export const getAdminAccountById = async (id: string) => {
  if (!isDatabaseConfigured()) return null;
  await ensureSchema();
  const sql = getSql();
  const [row] = await sql<RawAdminAccount[]>`
    SELECT *
    FROM admins
    WHERE id = ${id}
    LIMIT 1;
  `;
  return row ? adminAccountFromRow(row) : null;
};

export const createAdminAccount = async (input: { email: string; password: string }) => {
  await ensureSchema();
  const sql = getSql();
  const [row] = await sql<RawAdminAccount[]>`
    INSERT INTO admins (id, email, password_hash, status)
    VALUES (
      ${createId("adm")},
      ${normalizeEmail(input.email)},
      ${hashPassword(input.password)},
      'active'
    )
    RETURNING *;
  `;
  return adminAccountFromRow(row);
};

export const setAdminAccountStatus = async (id: string, status: AdminAccountStatus) => {
  await ensureSchema();
  const sql = getSql();
  await sql`
    UPDATE admins
    SET status = ${status}, updated_at = NOW()
    WHERE id = ${id};
  `;
};

export const deleteAdminAccount = async (id: string) => {
  await ensureSchema();
  const sql = getSql();
  await sql`DELETE FROM admins WHERE id = ${id};`;
};

export const authenticateAdminAccount = async (email: string, password: string) => {
  if (!isDatabaseConfigured()) return null;
  await ensureSchema();
  const sql = getSql();
  const [row] = await sql<RawAdminAccount[]>`
    SELECT *
    FROM admins
    WHERE LOWER(email) = ${normalizeEmail(email)}
    LIMIT 1;
  `;

  if (!row || row.status === "disabled" || !verifyPassword(password, row.password_hash)) {
    return null;
  }

  await sql`
    UPDATE admins
    SET last_login_at = NOW(), updated_at = NOW()
    WHERE id = ${row.id};
  `;

  return adminAccountFromRow({ ...row, last_login_at: new Date().toISOString() });
};
