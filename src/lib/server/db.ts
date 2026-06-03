import postgres, { type Sql } from "postgres";
import { defaultBookingSettings } from "@/lib/shared/booking";

let cachedSql: Sql | null | undefined;
let schemaPromise: Promise<void> | null = null;

const getConnectionString = () => process.env.DATABASE_URL || process.env.POSTGRES_URL || "";

export const isDatabaseConfigured = () => Boolean(getConnectionString());

const createClient = () => {
  const connectionString = getConnectionString();

  if (!connectionString) {
    return null;
  }

  return postgres(connectionString, {
    ssl: "require",
    prepare: false,
    max: 1,
  });
};

export const getSql = () => {
  if (cachedSql === undefined) {
    cachedSql = createClient();
  }

  if (!cachedSql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return cachedSql;
};

export const ensureSchema = async () => {
  const sql = getSql();

  if (!schemaPromise) {
    schemaPromise = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS customers (
          id TEXT PRIMARY KEY,
          email TEXT NOT NULL,
          first_name TEXT,
          last_name TEXT,
          phone TEXT,
          address TEXT,
          postal_code TEXT,
          city TEXT,
          notes TEXT,
          customer_type TEXT NOT NULL DEFAULT 'private',
          company TEXT,
          company_id TEXT,
          marketing_opt_in BOOLEAN NOT NULL DEFAULT false,
          portal_token TEXT UNIQUE,
          portal_token_expires_at TIMESTAMPTZ,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS customers_email_idx
        ON customers (LOWER(email));
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS bookings (
          id TEXT PRIMARY KEY,
          customer_id TEXT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
          plate TEXT NOT NULL,
          registration_number TEXT,
          vehicle_name TEXT,
          vehicle_year INTEGER,
          vehicle_type TEXT,
          category TEXT,
          package_id TEXT,
          package_label TEXT,
          addons_json JSONB NOT NULL DEFAULT '[]'::jsonb,
          subtotal INTEGER NOT NULL DEFAULT 0,
          total INTEGER NOT NULL DEFAULT 0,
          appointment_date DATE NOT NULL,
          appointment_time TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending',
          admin_notes TEXT,
          source TEXT NOT NULL DEFAULT 'website',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS bookings_customer_id_idx
        ON bookings (customer_id);
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS bookings_schedule_idx
        ON bookings (appointment_date, appointment_time, status);
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS booking_settings (
          settings_key TEXT PRIMARY KEY,
          company_name TEXT NOT NULL,
          support_email TEXT NOT NULL,
          admin_notify_email TEXT NOT NULL,
          start_hour INTEGER NOT NULL,
          end_hour INTEGER NOT NULL,
          slot_minutes INTEGER NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        INSERT INTO booking_settings (
          settings_key,
          company_name,
          support_email,
          admin_notify_email,
          start_hour,
          end_hour,
          slot_minutes
        )
        VALUES (
          'default',
          ${defaultBookingSettings.companyName},
          ${defaultBookingSettings.supportEmail},
          ${defaultBookingSettings.adminNotifyEmail},
          ${defaultBookingSettings.startHour},
          ${defaultBookingSettings.endHour},
          ${defaultBookingSettings.slotMinutes}
        )
        ON CONFLICT (settings_key) DO NOTHING;
      `;
    })();
  }

  await schemaPromise;
};
