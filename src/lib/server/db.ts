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
          tags_json JSONB NOT NULL DEFAULT '[]'::jsonb,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS customers_email_idx
        ON customers (LOWER(email));
      `;

      await sql`
        ALTER TABLE customers
        ADD COLUMN IF NOT EXISTS tags_json JSONB NOT NULL DEFAULT '[]'::jsonb;
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
          travel_surcharge INTEGER NOT NULL DEFAULT 0,
          area_name TEXT,
          estimated_duration_minutes INTEGER NOT NULL DEFAULT 120,
          appointment_date DATE NOT NULL,
          appointment_time TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending',
          payment_status TEXT NOT NULL DEFAULT 'unpaid',
          payment_method TEXT,
          invoice_requested BOOLEAN NOT NULL DEFAULT false,
          invoice_status TEXT NOT NULL DEFAULT 'not_requested',
          invoice_number TEXT,
          admin_notes TEXT,
          source TEXT NOT NULL DEFAULT 'website',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        ALTER TABLE bookings
        ADD COLUMN IF NOT EXISTS travel_surcharge INTEGER NOT NULL DEFAULT 0;
      `;
      await sql`
        ALTER TABLE bookings
        ADD COLUMN IF NOT EXISTS area_name TEXT;
      `;
      await sql`
        ALTER TABLE bookings
        ADD COLUMN IF NOT EXISTS estimated_duration_minutes INTEGER NOT NULL DEFAULT 120;
      `;
      await sql`
        ALTER TABLE bookings
        ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'unpaid';
      `;
      await sql`
        ALTER TABLE bookings
        ADD COLUMN IF NOT EXISTS payment_method TEXT;
      `;
      await sql`
        ALTER TABLE bookings
        ADD COLUMN IF NOT EXISTS invoice_requested BOOLEAN NOT NULL DEFAULT false;
      `;
      await sql`
        ALTER TABLE bookings
        ADD COLUMN IF NOT EXISTS invoice_status TEXT NOT NULL DEFAULT 'not_requested';
      `;
      await sql`
        ALTER TABLE bookings
        ADD COLUMN IF NOT EXISTS invoice_number TEXT;
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
          default_booking_status TEXT NOT NULL DEFAULT 'pending',
          start_hour INTEGER NOT NULL,
          end_hour INTEGER NOT NULL,
          slot_minutes INTEGER NOT NULL,
          travel_buffer_minutes INTEGER NOT NULL DEFAULT 30,
          working_days_json JSONB NOT NULL DEFAULT '[0,1,2,3,4,5,6]'::jsonb,
          service_catalog_json JSONB NOT NULL DEFAULT '{}'::jsonb,
          service_areas_json JSONB NOT NULL DEFAULT '[]'::jsonb,
          email_automation_json JSONB NOT NULL DEFAULT '{}'::jsonb,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        ALTER TABLE booking_settings
        ADD COLUMN IF NOT EXISTS default_booking_status TEXT NOT NULL DEFAULT 'pending';
      `;
      await sql`
        ALTER TABLE booking_settings
        ADD COLUMN IF NOT EXISTS travel_buffer_minutes INTEGER NOT NULL DEFAULT 30;
      `;
      await sql`
        ALTER TABLE booking_settings
        ADD COLUMN IF NOT EXISTS working_days_json JSONB NOT NULL DEFAULT '[0,1,2,3,4,5,6]'::jsonb;
      `;
      await sql`
        ALTER TABLE booking_settings
        ADD COLUMN IF NOT EXISTS service_catalog_json JSONB NOT NULL DEFAULT '{}'::jsonb;
      `;
      await sql`
        ALTER TABLE booking_settings
        ADD COLUMN IF NOT EXISTS service_areas_json JSONB NOT NULL DEFAULT '[]'::jsonb;
      `;
      await sql`
        ALTER TABLE booking_settings
        ADD COLUMN IF NOT EXISTS email_automation_json JSONB NOT NULL DEFAULT '{}'::jsonb;
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS availability_blocks (
          id TEXT PRIMARY KEY,
          start_date DATE NOT NULL,
          end_date DATE NOT NULL,
          start_time TEXT NOT NULL DEFAULT '00:00',
          end_time TEXT NOT NULL DEFAULT '23:59',
          reason TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS availability_blocks_range_idx
        ON availability_blocks (start_date, end_date);
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS email_logs (
          id TEXT PRIMARY KEY,
          booking_id TEXT REFERENCES bookings(id) ON DELETE CASCADE,
          customer_id TEXT REFERENCES customers(id) ON DELETE SET NULL,
          recipient TEXT NOT NULL,
          recipient_role TEXT NOT NULL,
          template_key TEXT NOT NULL,
          subject TEXT NOT NULL,
          status TEXT NOT NULL,
          error_message TEXT,
          sent_at TIMESTAMPTZ,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS email_logs_booking_idx
        ON email_logs (booking_id, created_at DESC);
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS booking_activity (
          id TEXT PRIMARY KEY,
          booking_id TEXT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
          actor TEXT NOT NULL,
          activity_type TEXT NOT NULL,
          summary TEXT NOT NULL,
          details_json JSONB NOT NULL DEFAULT '{}'::jsonb,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS booking_activity_booking_idx
        ON booking_activity (booking_id, created_at DESC);
      `;

      await sql`
        INSERT INTO booking_settings (
          settings_key,
          company_name,
          support_email,
          admin_notify_email,
          default_booking_status,
          start_hour,
          end_hour,
          slot_minutes,
          travel_buffer_minutes,
          working_days_json,
          service_catalog_json,
          service_areas_json,
          email_automation_json
        )
        VALUES (
          'default',
          ${defaultBookingSettings.companyName},
          ${defaultBookingSettings.supportEmail},
          ${defaultBookingSettings.adminNotifyEmail},
          ${defaultBookingSettings.defaultBookingStatus},
          ${defaultBookingSettings.startHour},
          ${defaultBookingSettings.endHour},
          ${defaultBookingSettings.slotMinutes},
          ${defaultBookingSettings.travelBufferMinutes},
          ${sql.json(defaultBookingSettings.workingDays)},
          ${sql.json(defaultBookingSettings.catalog)},
          ${sql.json(defaultBookingSettings.serviceAreas)},
          ${sql.json(defaultBookingSettings.emailAutomation)}
        )
        ON CONFLICT (settings_key) DO NOTHING;
      `;
    })();
  }

  try {
    await schemaPromise;
  } catch (error) {
    schemaPromise = null;
    throw error;
  }
};
