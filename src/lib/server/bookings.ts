import { randomBytes } from "node:crypto";
import { ensureSchema, getSql, isDatabaseConfigured } from "@/lib/server/db";
import {
  defaultBookingSettings,
  formatDateTimeLabel,
  type BookingSettings,
  type BookingStatus,
  type CustomerType,
} from "@/lib/shared/booking";

type RawCustomer = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  address: string | null;
  postal_code: string | null;
  city: string | null;
  notes: string | null;
  customer_type: string;
  company: string | null;
  company_id: string | null;
  marketing_opt_in: boolean;
  portal_token: string | null;
  portal_token_expires_at: string | null;
  created_at: string;
  updated_at: string;
};

type RawBooking = {
  id: string;
  customer_id: string;
  plate: string;
  registration_number: string | null;
  vehicle_name: string | null;
  vehicle_year: number | null;
  vehicle_type: string | null;
  category: string | null;
  package_id: string | null;
  package_label: string | null;
  addons_json: Array<{ id: string; label: string; price: number }>;
  subtotal: number;
  total: number;
  appointment_date: string;
  appointment_time: string;
  status: BookingStatus;
  admin_notes: string | null;
  source: string;
  created_at: string;
  updated_at: string;
};

type RawSettings = {
  company_name: string;
  support_email: string;
  admin_notify_email: string;
  start_hour: number;
  end_hour: number;
  slot_minutes: number;
};

export type BookingCustomer = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  notes: string;
  customerType: CustomerType;
  company: string;
  companyId: string;
  marketingOptIn: boolean;
  portalToken: string;
  portalTokenExpiresAt: string;
  createdAt: string;
  updatedAt: string;
};

export type BookingItem = {
  id: string;
  plate: string;
  registrationNumber: string;
  vehicleName: string;
  vehicleYear: number | null;
  vehicleType: string;
  category: string;
  packageId: string;
  packageLabel: string;
  addons: Array<{ id: string; label: string; price: number }>;
  subtotal: number;
  total: number;
  appointmentDate: string;
  appointmentTime: string;
  appointmentLabel: string;
  status: BookingStatus;
  adminNotes: string;
  source: string;
  createdAt: string;
  updatedAt: string;
};

export type DashboardData = {
  settings: BookingSettings;
  stats: {
    totalBookings: number;
    pendingBookings: number;
    approvedBookings: number;
    completedBookings: number;
    cancelledBookings: number;
    totalRevenue: number;
    upcomingBookings: number;
    totalCustomers: number;
  };
  bookings: BookingItem[];
  customers: BookingCustomer[];
  calendar: Array<{
    date: string;
    label: string;
    bookings: BookingItem[];
  }>;
};

type CustomerInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  notes: string;
  customerType: CustomerType;
  company: string;
  companyId: string;
  marketingOptIn: boolean;
};

type CreateBookingInput = {
  plate: string;
  registrationNumber: string;
  vehicleName: string;
  vehicleYear: number | null;
  vehicleType: string;
  category: string;
  packageId: string;
  packageLabel: string;
  addons: Array<{ id: string; label: string; price: number }>;
  subtotal: number;
  total: number;
  appointmentDate: string;
  appointmentTime: string;
  source: string;
  status?: BookingStatus;
  adminNotes?: string;
  customer: CustomerInput;
};

const customerFromRow = (row: RawCustomer): BookingCustomer => ({
  id: row.id,
  email: row.email,
  firstName: row.first_name ?? "",
  lastName: row.last_name ?? "",
  phone: row.phone ?? "",
  address: row.address ?? "",
  postalCode: row.postal_code ?? "",
  city: row.city ?? "",
  notes: row.notes ?? "",
  customerType: (row.customer_type as CustomerType) || "private",
  company: row.company ?? "",
  companyId: row.company_id ?? "",
  marketingOptIn: Boolean(row.marketing_opt_in),
  portalToken: row.portal_token ?? "",
  portalTokenExpiresAt: row.portal_token_expires_at ?? "",
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const bookingFromRow = (row: RawBooking): BookingItem => ({
  id: row.id,
  plate: row.plate,
  registrationNumber: row.registration_number ?? row.plate,
  vehicleName: row.vehicle_name ?? "Din bil",
  vehicleYear: row.vehicle_year,
  vehicleType: row.vehicle_type ?? "",
  category: row.category ?? "",
  packageId: row.package_id ?? "",
  packageLabel: row.package_label ?? "",
  addons: Array.isArray(row.addons_json) ? row.addons_json : [],
  subtotal: Number(row.subtotal || 0),
  total: Number(row.total || 0),
  appointmentDate: row.appointment_date,
  appointmentTime: row.appointment_time,
  appointmentLabel: formatDateTimeLabel(row.appointment_date, row.appointment_time),
  status: row.status,
  adminNotes: row.admin_notes ?? "",
  source: row.source,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const settingsFromRow = (row?: RawSettings | null): BookingSettings => ({
  companyName: row?.company_name || defaultBookingSettings.companyName,
  supportEmail: row?.support_email || process.env.SMTP_USER || defaultBookingSettings.supportEmail,
  adminNotifyEmail:
    row?.admin_notify_email ||
    process.env.BOOKING_ADMIN_EMAIL ||
    defaultBookingSettings.adminNotifyEmail,
  startHour: Number(row?.start_hour ?? defaultBookingSettings.startHour),
  endHour: Number(row?.end_hour ?? defaultBookingSettings.endHour),
  slotMinutes: Number(row?.slot_minutes ?? defaultBookingSettings.slotMinutes),
});

const createId = (prefix: string) => `${prefix}_${randomBytes(10).toString("hex")}`;
const createPortalToken = () => randomBytes(24).toString("hex");

const getPortalExpiry = () => {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  return expires.toISOString();
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const getBookingSettings = async (): Promise<BookingSettings> => {
  if (!isDatabaseConfigured()) {
    return {
      ...defaultBookingSettings,
      adminNotifyEmail: process.env.BOOKING_ADMIN_EMAIL || "",
      supportEmail: process.env.SMTP_USER || defaultBookingSettings.supportEmail,
    };
  }

  await ensureSchema();
  const sql = getSql();
  const [row] = await sql<RawSettings[]>`
    SELECT company_name, support_email, admin_notify_email, start_hour, end_hour, slot_minutes
    FROM booking_settings
    WHERE settings_key = 'default'
    LIMIT 1;
  `;

  return settingsFromRow(row);
};

export const saveBookingSettings = async (input: BookingSettings) => {
  await ensureSchema();
  const sql = getSql();

  await sql`
    UPDATE booking_settings
    SET
      company_name = ${input.companyName},
      support_email = ${input.supportEmail},
      admin_notify_email = ${input.adminNotifyEmail},
      start_hour = ${input.startHour},
      end_hour = ${input.endHour},
      slot_minutes = ${input.slotMinutes},
      updated_at = NOW()
    WHERE settings_key = 'default';
  `;
};

const upsertCustomer = async (input: CustomerInput) => {
  await ensureSchema();
  const sql = getSql();
  const email = normalizeEmail(input.email);
  const [existing] = await sql<RawCustomer[]>`
    SELECT *
    FROM customers
    WHERE LOWER(email) = ${email}
    LIMIT 1;
  `;

  if (existing) {
    const portalToken = existing.portal_token || createPortalToken();
    const portalExpiresAt = existing.portal_token_expires_at || getPortalExpiry();

    const [updated] = await sql<RawCustomer[]>`
      UPDATE customers
      SET
        email = ${email},
        first_name = ${input.firstName},
        last_name = ${input.lastName},
        phone = ${input.phone},
        address = ${input.address},
        postal_code = ${input.postalCode},
        city = ${input.city},
        notes = ${input.notes},
        customer_type = ${input.customerType},
        company = ${input.company},
        company_id = ${input.companyId},
        marketing_opt_in = ${input.marketingOptIn},
        portal_token = ${portalToken},
        portal_token_expires_at = ${portalExpiresAt},
        updated_at = NOW()
      WHERE id = ${existing.id}
      RETURNING *;
    `;

    return customerFromRow(updated);
  }

  const [created] = await sql<RawCustomer[]>`
    INSERT INTO customers (
      id,
      email,
      first_name,
      last_name,
      phone,
      address,
      postal_code,
      city,
      notes,
      customer_type,
      company,
      company_id,
      marketing_opt_in,
      portal_token,
      portal_token_expires_at
    )
    VALUES (
      ${createId("cus")},
      ${email},
      ${input.firstName},
      ${input.lastName},
      ${input.phone},
      ${input.address},
      ${input.postalCode},
      ${input.city},
      ${input.notes},
      ${input.customerType},
      ${input.company},
      ${input.companyId},
      ${input.marketingOptIn},
      ${createPortalToken()},
      ${getPortalExpiry()}
    )
    RETURNING *;
  `;

  return customerFromRow(created);
};

export const createBooking = async (input: CreateBookingInput) => {
  await ensureSchema();
  const sql = getSql();
  const customer = await upsertCustomer(input.customer);

  const [created] = await sql<RawBooking[]>`
    INSERT INTO bookings (
      id,
      customer_id,
      plate,
      registration_number,
      vehicle_name,
      vehicle_year,
      vehicle_type,
      category,
      package_id,
      package_label,
      addons_json,
      subtotal,
      total,
      appointment_date,
      appointment_time,
      status,
      admin_notes,
      source
    )
    VALUES (
      ${createId("bok")},
      ${customer.id},
      ${input.plate},
      ${input.registrationNumber},
      ${input.vehicleName},
      ${input.vehicleYear},
      ${input.vehicleType},
      ${input.category},
      ${input.packageId},
      ${input.packageLabel},
      ${sql.json(input.addons)},
      ${input.subtotal},
      ${input.total},
      ${input.appointmentDate},
      ${input.appointmentTime},
      ${input.status || "pending"},
      ${input.adminNotes || ""},
      ${input.source}
    )
    RETURNING *;
  `;

  return {
    booking: bookingFromRow(created),
    customer,
  };
};

export const getPortalData = async (portalToken: string) => {
  if (!isDatabaseConfigured()) {
    return null;
  }

  await ensureSchema();
  const sql = getSql();
  const [customerRow] = await sql<RawCustomer[]>`
    SELECT *
    FROM customers
    WHERE portal_token = ${portalToken}
      AND (portal_token_expires_at IS NULL OR portal_token_expires_at > NOW())
    LIMIT 1;
  `;

  if (!customerRow) {
    return null;
  }

  const bookingRows = await sql<RawBooking[]>`
    SELECT *
    FROM bookings
    WHERE customer_id = ${customerRow.id}
    ORDER BY appointment_date DESC, appointment_time DESC;
  `;

  return {
    customer: customerFromRow(customerRow),
    bookings: bookingRows.map(bookingFromRow),
    settings: await getBookingSettings(),
  };
};

export const updatePortalCustomer = async (
  portalToken: string,
  input: Pick<
    CustomerInput,
    "firstName" | "lastName" | "phone" | "address" | "postalCode" | "city" | "notes"
  >
) => {
  await ensureSchema();
  const sql = getSql();
  const [updated] = await sql<RawCustomer[]>`
    UPDATE customers
    SET
      first_name = ${input.firstName},
      last_name = ${input.lastName},
      phone = ${input.phone},
      address = ${input.address},
      postal_code = ${input.postalCode},
      city = ${input.city},
      notes = ${input.notes},
      updated_at = NOW()
    WHERE portal_token = ${portalToken}
    RETURNING *;
  `;

  return updated ? customerFromRow(updated) : null;
};

export const getBookingById = async (bookingId: string) => {
  await ensureSchema();
  const sql = getSql();
  const [bookingRow] = await sql<RawBooking[]>`
    SELECT *
    FROM bookings
    WHERE id = ${bookingId}
    LIMIT 1;
  `;

  if (!bookingRow) return null;

  const [customerRow] = await sql<RawCustomer[]>`
    SELECT *
    FROM customers
    WHERE id = ${bookingRow.customer_id}
    LIMIT 1;
  `;

  if (!customerRow) return null;

  return {
    booking: bookingFromRow(bookingRow),
    customer: customerFromRow(customerRow),
  };
};

export const updateBookingStatus = async (
  bookingId: string,
  status: BookingStatus,
  adminNotes = ""
) => {
  await ensureSchema();
  const sql = getSql();

  await sql`
    UPDATE bookings
    SET
      status = ${status},
      admin_notes = ${adminNotes},
      updated_at = NOW()
    WHERE id = ${bookingId};
  `;

  return getBookingById(bookingId);
};

export const deleteBooking = async (bookingId: string) => {
  await ensureSchema();
  const sql = getSql();
  await sql`
    DELETE FROM bookings
    WHERE id = ${bookingId};
  `;
};

export const getAdminDashboardData = async (): Promise<DashboardData> => {
  if (!isDatabaseConfigured()) {
    return {
      settings: await getBookingSettings(),
      stats: {
        totalBookings: 0,
        pendingBookings: 0,
        approvedBookings: 0,
        completedBookings: 0,
        cancelledBookings: 0,
        totalRevenue: 0,
        upcomingBookings: 0,
        totalCustomers: 0,
      },
      bookings: [],
      customers: [],
      calendar: [],
    };
  }

  await ensureSchema();
  const sql = getSql();
  const bookingRows = await sql<RawBooking[]>`
    SELECT *
    FROM bookings
    ORDER BY appointment_date ASC, appointment_time ASC;
  `;
  const customerRows = await sql<RawCustomer[]>`
    SELECT *
    FROM customers
    ORDER BY created_at DESC;
  `;

  const bookings = bookingRows.map(bookingFromRow);
  const customers = customerRows.map(customerFromRow);
  const today = new Date().toISOString().slice(0, 10);
  const stats = {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter((item) => item.status === "pending").length,
    approvedBookings: bookings.filter((item) => item.status === "approved").length,
    completedBookings: bookings.filter((item) => item.status === "completed").length,
    cancelledBookings: bookings.filter((item) => item.status === "cancelled").length,
    totalRevenue: bookings
      .filter((item) => item.status !== "cancelled")
      .reduce((sum, item) => sum + item.total, 0),
    upcomingBookings: bookings.filter(
      (item) =>
        item.status !== "cancelled" &&
        `${item.appointmentDate}T${item.appointmentTime}` >= `${today}T00:00`
    ).length,
    totalCustomers: customers.length,
  };

  const calendarMap = new Map<string, BookingItem[]>();
  for (const booking of bookings) {
    const list = calendarMap.get(booking.appointmentDate) || [];
    list.push(booking);
    calendarMap.set(booking.appointmentDate, list);
  }

  const calendar = Array.from(calendarMap.entries()).map(([date, items]) => ({
    date,
    label: formatDateTimeLabel(date, items[0]?.appointmentTime || "00:00").replace(
      /\s+kl\..*$/,
      ""
    ),
    bookings: items,
  }));

  return {
    settings: await getBookingSettings(),
    stats,
    bookings,
    customers,
    calendar,
  };
};
