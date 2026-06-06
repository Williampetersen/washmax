import postgres, { type Sql } from "postgres";
import { defaultBookingSettings } from "@/lib/shared/booking";
import { getDatabaseUrl } from "@/lib/server/env";

let cachedSql: Sql | null | undefined;
let schemaPromise: Promise<void> | null = null;

const getConnectionString = () => getDatabaseUrl();

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
        ALTER TABLE customers
          ADD COLUMN IF NOT EXISTS email TEXT,
          ADD COLUMN IF NOT EXISTS first_name TEXT,
          ADD COLUMN IF NOT EXISTS last_name TEXT,
          ADD COLUMN IF NOT EXISTS phone TEXT,
          ADD COLUMN IF NOT EXISTS address TEXT,
          ADD COLUMN IF NOT EXISTS postal_code TEXT,
          ADD COLUMN IF NOT EXISTS city TEXT,
          ADD COLUMN IF NOT EXISTS notes TEXT,
          ADD COLUMN IF NOT EXISTS customer_type TEXT NOT NULL DEFAULT 'private',
          ADD COLUMN IF NOT EXISTS company TEXT,
          ADD COLUMN IF NOT EXISTS company_id TEXT,
          ADD COLUMN IF NOT EXISTS marketing_opt_in BOOLEAN NOT NULL DEFAULT false,
          ADD COLUMN IF NOT EXISTS portal_token TEXT,
          ADD COLUMN IF NOT EXISTS portal_token_expires_at TIMESTAMPTZ,
          ADD COLUMN IF NOT EXISTS tags_json JSONB NOT NULL DEFAULT '[]'::jsonb,
          ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS customers_email_idx
        ON customers (LOWER(email));
      `;

      await sql`
        CREATE UNIQUE INDEX IF NOT EXISTS customers_portal_token_idx
        ON customers (portal_token)
        WHERE portal_token IS NOT NULL;
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
          ADD COLUMN IF NOT EXISTS plate TEXT NOT NULL DEFAULT '',
          ADD COLUMN IF NOT EXISTS registration_number TEXT,
          ADD COLUMN IF NOT EXISTS vehicle_name TEXT,
          ADD COLUMN IF NOT EXISTS vehicle_year INTEGER,
          ADD COLUMN IF NOT EXISTS vehicle_type TEXT,
          ADD COLUMN IF NOT EXISTS category TEXT,
          ADD COLUMN IF NOT EXISTS package_id TEXT,
          ADD COLUMN IF NOT EXISTS package_label TEXT,
          ADD COLUMN IF NOT EXISTS addons_json JSONB NOT NULL DEFAULT '[]'::jsonb,
          ADD COLUMN IF NOT EXISTS subtotal INTEGER NOT NULL DEFAULT 0,
          ADD COLUMN IF NOT EXISTS total INTEGER NOT NULL DEFAULT 0,
          ADD COLUMN IF NOT EXISTS travel_surcharge INTEGER NOT NULL DEFAULT 0,
          ADD COLUMN IF NOT EXISTS area_name TEXT,
          ADD COLUMN IF NOT EXISTS estimated_duration_minutes INTEGER NOT NULL DEFAULT 120,
          ADD COLUMN IF NOT EXISTS appointment_date DATE NOT NULL DEFAULT CURRENT_DATE,
          ADD COLUMN IF NOT EXISTS appointment_time TEXT NOT NULL DEFAULT '08:00',
          ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending',
          ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'unpaid',
          ADD COLUMN IF NOT EXISTS payment_method TEXT,
          ADD COLUMN IF NOT EXISTS invoice_requested BOOLEAN NOT NULL DEFAULT false,
          ADD COLUMN IF NOT EXISTS invoice_status TEXT NOT NULL DEFAULT 'not_requested',
          ADD COLUMN IF NOT EXISTS invoice_number TEXT,
          ADD COLUMN IF NOT EXISTS admin_notes TEXT,
          ADD COLUMN IF NOT EXISTS assigned_agent_id TEXT,
          ADD COLUMN IF NOT EXISTS agent_status TEXT,
          ADD COLUMN IF NOT EXISTS agent_note TEXT,
          ADD COLUMN IF NOT EXISTS assigned_at TIMESTAMPTZ,
          ADD COLUMN IF NOT EXISTS accepted_at TIMESTAMPTZ,
          ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ,
          ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMPTZ,
          ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'website',
          ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS agents (
          id TEXT PRIMARY KEY,
          full_name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          phone TEXT,
          password_hash TEXT NOT NULL,
          avatar_url TEXT,
          status TEXT NOT NULL DEFAULT 'active',
          assigned_services_json JSONB NOT NULL DEFAULT '[]'::jsonb,
          working_area TEXT,
          notes TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          last_login_at TIMESTAMPTZ
        );
      `;

      await sql`
        ALTER TABLE agents
          ADD COLUMN IF NOT EXISTS full_name TEXT NOT NULL DEFAULT '',
          ADD COLUMN IF NOT EXISTS email TEXT NOT NULL DEFAULT '',
          ADD COLUMN IF NOT EXISTS phone TEXT,
          ADD COLUMN IF NOT EXISTS password_hash TEXT NOT NULL DEFAULT '',
          ADD COLUMN IF NOT EXISTS avatar_url TEXT,
          ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'active',
          ADD COLUMN IF NOT EXISTS assigned_services_json JSONB NOT NULL DEFAULT '[]'::jsonb,
          ADD COLUMN IF NOT EXISTS working_area TEXT,
          ADD COLUMN IF NOT EXISTS notes TEXT,
          ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ;
      `;

      await sql`
        CREATE UNIQUE INDEX IF NOT EXISTS agents_email_idx
        ON agents (LOWER(email));
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS agent_sessions (
          id TEXT PRIMARY KEY,
          agent_id TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
          token_hash TEXT NOT NULL,
          expires_at TIMESTAMPTZ NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS agent_services (
          id TEXT PRIMARY KEY,
          agent_id TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
          service_name TEXT NOT NULL,
          is_enabled BOOLEAN NOT NULL DEFAULT true,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS agent_services_agent_idx
        ON agent_services (agent_id, is_enabled);
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS agent_availability (
          id TEXT PRIMARY KEY,
          agent_id TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
          weekday INTEGER NOT NULL,
          start_time TEXT NOT NULL DEFAULT '09:00',
          end_time TEXT NOT NULL DEFAULT '17:00',
          break_start_time TEXT,
          break_end_time TEXT,
          is_available BOOLEAN NOT NULL DEFAULT true,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          UNIQUE(agent_id, weekday)
        );
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS agent_unavailable_dates (
          id TEXT PRIMARY KEY,
          agent_id TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
          start_date DATE NOT NULL,
          end_date DATE NOT NULL,
          reason TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS agent_chat_messages (
          id TEXT PRIMARY KEY,
          agent_id TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
          booking_id TEXT REFERENCES bookings(id) ON DELETE SET NULL,
          sender_type TEXT NOT NULL,
          sender_id TEXT NOT NULL,
          message TEXT NOT NULL,
          is_read BOOLEAN NOT NULL DEFAULT false,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS agent_chat_messages_agent_idx
        ON agent_chat_messages (agent_id, created_at DESC);
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS agent_notifications (
          id TEXT PRIMARY KEY,
          agent_id TEXT REFERENCES agents(id) ON DELETE CASCADE,
          recipient_type TEXT NOT NULL DEFAULT 'agent',
          type TEXT NOT NULL,
          booking_id TEXT REFERENCES bookings(id) ON DELETE SET NULL,
          message TEXT NOT NULL,
          is_read BOOLEAN NOT NULL DEFAULT false,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS agent_notifications_agent_idx
        ON agent_notifications (agent_id, recipient_type, is_read, created_at DESC);
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS booking_agent_history (
          id TEXT PRIMARY KEY,
          booking_id TEXT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
          agent_id TEXT REFERENCES agents(id) ON DELETE SET NULL,
          actor TEXT NOT NULL,
          action TEXT NOT NULL,
          note TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS booking_agent_history_booking_idx
        ON booking_agent_history (booking_id, created_at DESC);
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS bookings_assigned_agent_idx
        ON bookings (assigned_agent_id, agent_status, appointment_date, appointment_time);
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS booking_line_items (
          id TEXT PRIMARY KEY,
          booking_id TEXT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
          agent_id TEXT REFERENCES agents(id) ON DELETE SET NULL,
          created_by_type TEXT NOT NULL DEFAULT 'system',
          item_type TEXT NOT NULL,
          service_id TEXT,
          description TEXT NOT NULL,
          quantity INTEGER NOT NULL DEFAULT 1,
          unit_price_dkk INTEGER NOT NULL DEFAULT 0,
          total_price_dkk INTEGER NOT NULL DEFAULT 0,
          is_tax_included BOOLEAN NOT NULL DEFAULT true,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          locked_at TIMESTAMPTZ
        );
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS booking_line_items_booking_idx
        ON booking_line_items (booking_id, created_at ASC);
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS invoices (
          id TEXT PRIMARY KEY,
          invoice_number TEXT NOT NULL UNIQUE,
          booking_id TEXT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
          customer_id TEXT REFERENCES customers(id) ON DELETE SET NULL,
          agent_id TEXT REFERENCES agents(id) ON DELETE SET NULL,
          status TEXT NOT NULL DEFAULT 'draft',
          currency TEXT NOT NULL DEFAULT 'DKK',
          subtotal_ex_moms_dkk INTEGER NOT NULL DEFAULT 0,
          moms_amount_dkk INTEGER NOT NULL DEFAULT 0,
          total_incl_moms_dkk INTEGER NOT NULL DEFAULT 0,
          subtotal_amount INTEGER NOT NULL DEFAULT 0,
          vat_amount INTEGER NOT NULL DEFAULT 0,
          total_amount INTEGER NOT NULL DEFAULT 0,
          invoice_html TEXT,
          html_snapshot TEXT,
          invoice_subject TEXT,
          invoice_notes TEXT,
          public_token TEXT,
          pdf_url TEXT,
          pdf_file_name TEXT,
          pdf_data BYTEA,
          pdf_content BYTEA,
          pdf_content_type TEXT,
          pdf_size_bytes INTEGER NOT NULL DEFAULT 0,
          customer_email TEXT,
          sent_to_email TEXT,
          email_sent BOOLEAN NOT NULL DEFAULT false,
          email_sent_at TIMESTAMPTZ,
          sent_at TIMESTAMPTZ,
          paid_at TIMESTAMPTZ,
          created_by_user_id TEXT,
          created_by_id TEXT,
          created_by_role TEXT NOT NULL DEFAULT 'system',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        ALTER TABLE invoices
          ADD COLUMN IF NOT EXISTS id TEXT,
          ADD COLUMN IF NOT EXISTS invoice_number TEXT,
          ADD COLUMN IF NOT EXISTS booking_id TEXT,
          ADD COLUMN IF NOT EXISTS customer_id TEXT,
          ADD COLUMN IF NOT EXISTS agent_id TEXT,
          ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'draft',
          ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'DKK',
          ADD COLUMN IF NOT EXISTS subtotal_ex_moms_dkk INTEGER NOT NULL DEFAULT 0,
          ADD COLUMN IF NOT EXISTS moms_amount_dkk INTEGER NOT NULL DEFAULT 0,
          ADD COLUMN IF NOT EXISTS total_incl_moms_dkk INTEGER NOT NULL DEFAULT 0,
          ADD COLUMN IF NOT EXISTS subtotal_amount INTEGER NOT NULL DEFAULT 0,
          ADD COLUMN IF NOT EXISTS vat_amount INTEGER NOT NULL DEFAULT 0,
          ADD COLUMN IF NOT EXISTS total_amount INTEGER NOT NULL DEFAULT 0,
          ADD COLUMN IF NOT EXISTS invoice_html TEXT,
          ADD COLUMN IF NOT EXISTS html_snapshot TEXT,
          ADD COLUMN IF NOT EXISTS invoice_subject TEXT,
          ADD COLUMN IF NOT EXISTS invoice_notes TEXT,
          ADD COLUMN IF NOT EXISTS public_token TEXT,
          ADD COLUMN IF NOT EXISTS pdf_url TEXT,
          ADD COLUMN IF NOT EXISTS pdf_file_name TEXT,
          ADD COLUMN IF NOT EXISTS pdf_data BYTEA,
          ADD COLUMN IF NOT EXISTS pdf_content BYTEA,
          ADD COLUMN IF NOT EXISTS pdf_content_type TEXT,
          ADD COLUMN IF NOT EXISTS pdf_size_bytes INTEGER NOT NULL DEFAULT 0,
          ADD COLUMN IF NOT EXISTS customer_email TEXT,
          ADD COLUMN IF NOT EXISTS sent_to_email TEXT,
          ADD COLUMN IF NOT EXISTS email_sent BOOLEAN NOT NULL DEFAULT false,
          ADD COLUMN IF NOT EXISTS email_sent_at TIMESTAMPTZ,
          ADD COLUMN IF NOT EXISTS sent_at TIMESTAMPTZ,
          ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ,
          ADD COLUMN IF NOT EXISTS created_by_user_id TEXT,
          ADD COLUMN IF NOT EXISTS created_by_id TEXT,
          ADD COLUMN IF NOT EXISTS created_by_role TEXT NOT NULL DEFAULT 'system',
          ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
      `;

      await sql`
        UPDATE invoices
        SET
          id = COALESCE(NULLIF(id, ''), 'inv_legacy_' || MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT || CTID::TEXT)),
          invoice_number = COALESCE(
            NULLIF(invoice_number, ''),
            'CW-LEGACY-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT || CTID::TEXT), 1, 12))
          ),
          currency = COALESCE(NULLIF(currency, ''), 'DKK'),
          created_at = COALESCE(created_at, NOW()),
          updated_at = COALESCE(updated_at, NOW());
      `;

      await sql`
        CREATE UNIQUE INDEX IF NOT EXISTS invoices_id_unique_idx
        ON invoices (id);
      `;

      await sql`
        CREATE UNIQUE INDEX IF NOT EXISTS invoices_number_unique_idx
        ON invoices (invoice_number);
      `;

      await sql`
        CREATE UNIQUE INDEX IF NOT EXISTS invoices_public_token_unique_idx
        ON invoices (public_token);
      `;

      await sql`
        UPDATE invoices
        SET
          status = CASE WHEN status = 'generated' THEN 'ready' ELSE status END,
          public_token = COALESCE(
            NULLIF(public_token, ''),
            MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT || id) ||
            MD5(id || CLOCK_TIMESTAMP()::TEXT || RANDOM()::TEXT)
          ),
          invoice_html = COALESCE(invoice_html, html_snapshot),
          created_by_id = COALESCE(created_by_id, created_by_user_id),
          subtotal_amount = COALESCE(NULLIF(subtotal_amount, 0), subtotal_ex_moms_dkk, 0),
          vat_amount = COALESCE(NULLIF(vat_amount, 0), moms_amount_dkk, 0),
          total_amount = COALESCE(NULLIF(total_amount, 0), total_incl_moms_dkk, 0);
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS invoices_booking_idx
        ON invoices (booking_id, created_at DESC);
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS invoice_items (
          id TEXT PRIMARY KEY,
          invoice_id TEXT NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
          booking_line_item_id TEXT REFERENCES booking_line_items(id) ON DELETE SET NULL,
          description TEXT NOT NULL,
          quantity INTEGER NOT NULL DEFAULT 1,
          unit_price_dkk INTEGER NOT NULL DEFAULT 0,
          line_total_dkk INTEGER NOT NULL DEFAULT 0,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        ALTER TABLE invoice_items
          ADD COLUMN IF NOT EXISTS id TEXT,
          ADD COLUMN IF NOT EXISTS invoice_id TEXT,
          ADD COLUMN IF NOT EXISTS booking_line_item_id TEXT,
          ADD COLUMN IF NOT EXISTS description TEXT,
          ADD COLUMN IF NOT EXISTS quantity INTEGER NOT NULL DEFAULT 1,
          ADD COLUMN IF NOT EXISTS unit_price_dkk INTEGER NOT NULL DEFAULT 0,
          ADD COLUMN IF NOT EXISTS line_total_dkk INTEGER NOT NULL DEFAULT 0,
          ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
      `;

      await sql`
        UPDATE invoice_items
        SET
          id = COALESCE(NULLIF(id, ''), 'ini_legacy_' || MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT || CTID::TEXT)),
          description = COALESCE(description, 'Invoice line'),
          created_at = COALESCE(created_at, NOW());
      `;

      await sql`
        CREATE UNIQUE INDEX IF NOT EXISTS invoice_items_id_unique_idx
        ON invoice_items (id);
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS invoice_items_invoice_idx
        ON invoice_items (invoice_id, created_at ASC);
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
          ADD COLUMN IF NOT EXISTS settings_key TEXT,
          ADD COLUMN IF NOT EXISTS company_name TEXT NOT NULL DEFAULT 'Clean Wash',
          ADD COLUMN IF NOT EXISTS support_email TEXT NOT NULL DEFAULT 'info@cleanwash.dk',
          ADD COLUMN IF NOT EXISTS admin_notify_email TEXT NOT NULL DEFAULT '',
          ADD COLUMN IF NOT EXISTS default_booking_status TEXT NOT NULL DEFAULT 'pending',
          ADD COLUMN IF NOT EXISTS start_hour INTEGER NOT NULL DEFAULT 8,
          ADD COLUMN IF NOT EXISTS end_hour INTEGER NOT NULL DEFAULT 18,
          ADD COLUMN IF NOT EXISTS slot_minutes INTEGER NOT NULL DEFAULT 150,
          ADD COLUMN IF NOT EXISTS travel_buffer_minutes INTEGER NOT NULL DEFAULT 30,
          ADD COLUMN IF NOT EXISTS working_days_json JSONB NOT NULL DEFAULT '[0,1,2,3,4,5,6]'::jsonb,
          ADD COLUMN IF NOT EXISTS service_catalog_json JSONB NOT NULL DEFAULT '{}'::jsonb,
          ADD COLUMN IF NOT EXISTS service_areas_json JSONB NOT NULL DEFAULT '[]'::jsonb,
          ADD COLUMN IF NOT EXISTS email_automation_json JSONB NOT NULL DEFAULT '{}'::jsonb,
          ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
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
        CREATE TABLE IF NOT EXISTS booking_services (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          slug TEXT NOT NULL UNIQUE,
          short_description TEXT,
          description TEXT,
          price_dkk INTEGER NOT NULL DEFAULT 0,
          duration_minutes INTEGER NOT NULL DEFAULT 60,
          image_url TEXT,
          icon TEXT,
          sort_order INTEGER NOT NULL DEFAULT 0,
          is_visible BOOLEAN NOT NULL DEFAULT true,
          is_featured BOOLEAN NOT NULL DEFAULT false,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS booking_addons (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          slug TEXT NOT NULL UNIQUE,
          description TEXT,
          price_dkk INTEGER NOT NULL DEFAULT 0,
          duration_minutes INTEGER NOT NULL DEFAULT 0,
          image_url TEXT,
          addon_category TEXT NOT NULL DEFAULT 'interior',
          sort_order INTEGER NOT NULL DEFAULT 0,
          is_visible BOOLEAN NOT NULL DEFAULT true,
          allowed_service_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS booking_option_groups (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          slug TEXT NOT NULL UNIQUE,
          description TEXT,
          is_required BOOLEAN NOT NULL DEFAULT false,
          is_visible BOOLEAN NOT NULL DEFAULT true,
          sort_order INTEGER NOT NULL DEFAULT 0,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS booking_options (
          id TEXT PRIMARY KEY,
          group_id TEXT NOT NULL REFERENCES booking_option_groups(id) ON DELETE CASCADE,
          label TEXT NOT NULL,
          slug TEXT NOT NULL,
          description TEXT,
          price_adjustment_dkk INTEGER NOT NULL DEFAULT 0,
          duration_adjustment_minutes INTEGER NOT NULL DEFAULT 0,
          image_url TEXT,
          sort_order INTEGER NOT NULL DEFAULT 0,
          is_visible BOOLEAN NOT NULL DEFAULT true,
          is_required BOOLEAN NOT NULL DEFAULT false,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS booking_opening_hours (
          id TEXT PRIMARY KEY,
          weekday INTEGER NOT NULL,
          range_index INTEGER NOT NULL DEFAULT 0,
          is_open BOOLEAN NOT NULL DEFAULT true,
          start_time TEXT NOT NULL DEFAULT '09:00',
          end_time TEXT NOT NULL DEFAULT '17:00',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          UNIQUE(weekday, range_index)
        );
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS booking_unavailable_dates (
          id TEXT PRIMARY KEY,
          start_date DATE NOT NULL,
          end_date DATE NOT NULL,
          title TEXT NOT NULL,
          start_time TEXT NOT NULL DEFAULT '00:00',
          end_time TEXT NOT NULL DEFAULT '23:59',
          is_full_day BOOLEAN NOT NULL DEFAULT true,
          repeat_yearly BOOLEAN NOT NULL DEFAULT false,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS booking_time_settings (
          settings_key TEXT PRIMARY KEY DEFAULT 'default',
          slot_interval_minutes INTEGER NOT NULL DEFAULT 30,
          minimum_notice_hours INTEGER NOT NULL DEFAULT 2,
          maximum_days_ahead INTEGER NOT NULL DEFAULT 30,
          buffer_before_minutes INTEGER NOT NULL DEFAULT 0,
          buffer_after_minutes INTEGER NOT NULL DEFAULT 30,
          max_bookings_per_slot INTEGER NOT NULL DEFAULT 1,
          max_bookings_per_day INTEGER NOT NULL DEFAULT 0,
          allow_same_day_booking BOOLEAN NOT NULL DEFAULT true,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS booking_form_fields (
          id TEXT PRIMARY KEY,
          field_key TEXT NOT NULL UNIQUE,
          label TEXT NOT NULL,
          placeholder TEXT,
          help_text TEXT,
          is_visible BOOLEAN NOT NULL DEFAULT true,
          is_required BOOLEAN NOT NULL DEFAULT true,
          sort_order INTEGER NOT NULL DEFAULT 0,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS booking_general_settings (
          settings_key TEXT PRIMARY KEY DEFAULT 'default',
          booking_enabled BOOLEAN NOT NULL DEFAULT true,
          disabled_message TEXT NOT NULL DEFAULT 'Online booking is temporarily unavailable.',
          currency TEXT NOT NULL DEFAULT 'DKK',
          vat_rate INTEGER NOT NULL DEFAULT 25,
          company_name TEXT NOT NULL DEFAULT 'Clean Wash',
          support_email TEXT NOT NULL DEFAULT 'info@cleanwash.dk',
          admin_notify_email TEXT NOT NULL DEFAULT '',
          customer_confirmation_enabled BOOLEAN NOT NULL DEFAULT true,
          admin_notification_enabled BOOLEAN NOT NULL DEFAULT true,
          cancellation_policy_text TEXT,
          success_message TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
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
        ALTER TABLE email_logs
          ADD COLUMN IF NOT EXISTS booking_id TEXT,
          ADD COLUMN IF NOT EXISTS customer_id TEXT,
          ADD COLUMN IF NOT EXISTS recipient TEXT NOT NULL DEFAULT '',
          ADD COLUMN IF NOT EXISTS recipient_role TEXT NOT NULL DEFAULT 'customer',
          ADD COLUMN IF NOT EXISTS template_key TEXT NOT NULL DEFAULT '',
          ADD COLUMN IF NOT EXISTS subject TEXT NOT NULL DEFAULT '',
          ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending',
          ADD COLUMN IF NOT EXISTS error_message TEXT,
          ADD COLUMN IF NOT EXISTS sent_at TIMESTAMPTZ,
          ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
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
        ALTER TABLE booking_activity
          ADD COLUMN IF NOT EXISTS actor TEXT NOT NULL DEFAULT 'system',
          ADD COLUMN IF NOT EXISTS activity_type TEXT NOT NULL DEFAULT 'note',
          ADD COLUMN IF NOT EXISTS summary TEXT NOT NULL DEFAULT '',
          ADD COLUMN IF NOT EXISTS details_json JSONB NOT NULL DEFAULT '{}'::jsonb,
          ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
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

type InvoiceColumnDiagnosticRow = {
  column_name: string;
  data_type: string;
  udt_name: string;
};

const invoiceDiagnosticColumns = [
  "id",
  "invoice_number",
  "booking_id",
  "customer_id",
  "pdf_data",
  "pdf_content_type",
  "email_sent",
  "email_sent_at",
  "customer_email",
  "total_incl_moms_dkk",
  "currency",
  "created_at",
  "updated_at",
] as const;

export const getInvoiceDatabaseDiagnostics = async () => {
  const hasDatabaseUrl = isDatabaseConfigured();
  const emptyRequiredColumns = Object.fromEntries(
    invoiceDiagnosticColumns.map((column) => [column, false])
  );

  if (!hasDatabaseUrl) {
    return {
      hasDatabaseUrl,
      databaseConnected: false,
      schemaReady: false,
      invoicesTableExists: false,
      requiredColumns: emptyRequiredColumns,
      columnTypes: {},
      errorCode: "DATABASE_CONNECTION_FAILED",
    };
  }

  const sql = getSql();
  let databaseConnected = false;
  let schemaReady = false;
  let errorCode = "";

  try {
    await sql`SELECT 1;`;
    databaseConnected = true;
    await ensureSchema();
    schemaReady = true;
  } catch (error) {
    errorCode = String(
      (error as { code?: unknown })?.code || "DATABASE_SCHEMA_FAILED"
    );
    console.error("[invoice.diagnostics] database/schema check failed", {
      name: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message : String(error),
      code: errorCode,
      stack: error instanceof Error ? error.stack : undefined,
    });
  }

  let rows: InvoiceColumnDiagnosticRow[] = [];
  if (databaseConnected) {
    try {
      rows = await sql<InvoiceColumnDiagnosticRow[]>`
        SELECT column_name, data_type, udt_name
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'invoices';
      `;
    } catch (error) {
      console.error("[invoice.diagnostics] column inspection failed", {
        name: error instanceof Error ? error.name : "UnknownError",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  const columnTypes = Object.fromEntries(
    rows.map((row) => [row.column_name, row.udt_name || row.data_type])
  );
  const requiredColumns = Object.fromEntries(
    invoiceDiagnosticColumns.map((column) => [column, Boolean(columnTypes[column])])
  );

  return {
    hasDatabaseUrl,
    databaseConnected,
    schemaReady,
    invoicesTableExists: rows.length > 0,
    requiredColumns,
    columnTypes,
    errorCode,
  };
};
