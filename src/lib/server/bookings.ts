import { randomBytes } from "node:crypto";
import { ensureSchema, getSql, isDatabaseConfigured } from "@/lib/server/db";
import {
  addMinutesToTime,
  autoBookingStatuses,
  defaultBookingSettings,
  defaultEmailAutomation,
  defaultServiceCatalog,
  findMatchingServiceArea,
  formatDateTimeLabel,
  getCatalogPackage,
  type AddOn,
  type AutoBookingStatus,
  type AvailabilityBlock,
  type BookingSettings,
  type BookingStatus,
  type CustomerType,
  type EmailAutomationSettings,
  type InvoiceStatus,
  type PaymentStatus,
  type ServiceArea,
  type ServiceCatalog,
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
  tags_json: string[] | null;
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
  travel_surcharge: number;
  area_name: string | null;
  estimated_duration_minutes: number;
  appointment_date: string;
  appointment_time: string;
  status: BookingStatus;
  payment_status: PaymentStatus;
  payment_method: string | null;
  invoice_requested: boolean;
  invoice_status: InvoiceStatus;
  invoice_number: string | null;
  admin_notes: string | null;
  source: string;
  created_at: string;
  updated_at: string;
};

type RawSettings = {
  company_name: string;
  support_email: string;
  admin_notify_email: string;
  default_booking_status: string;
  start_hour: number;
  end_hour: number;
  slot_minutes: number;
  travel_buffer_minutes: number;
  working_days_json: number[] | null;
  service_catalog_json: Partial<ServiceCatalog> | null;
  service_areas_json: ServiceArea[] | null;
  email_automation_json: Partial<EmailAutomationSettings> | null;
};

type RawAvailabilityBlock = {
  id: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  reason: string;
  created_at: string;
  updated_at: string;
};

type RawEmailLog = {
  id: string;
  booking_id: string | null;
  customer_id: string | null;
  recipient: string;
  recipient_role: string;
  template_key: string;
  subject: string;
  status: string;
  error_message: string | null;
  sent_at: string | null;
  created_at: string;
};

type RawActivity = {
  id: string;
  booking_id: string;
  actor: string;
  activity_type: string;
  summary: string;
  details_json: Record<string, unknown> | null;
  created_at: string;
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
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type BookingEmailLog = {
  id: string;
  bookingId: string;
  customerId: string;
  recipient: string;
  recipientRole: string;
  templateKey: string;
  subject: string;
  status: string;
  errorMessage: string;
  sentAt: string;
  createdAt: string;
};

export type BookingActivityItem = {
  id: string;
  bookingId: string;
  actor: string;
  activityType: string;
  summary: string;
  details: Record<string, unknown>;
  createdAt: string;
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
  travelSurcharge: number;
  areaName: string;
  estimatedMinutes: number;
  appointmentDate: string;
  appointmentTime: string;
  appointmentEndTime: string;
  appointmentLabel: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  invoiceRequested: boolean;
  invoiceStatus: InvoiceStatus;
  invoiceNumber: string;
  adminNotes: string;
  source: string;
  createdAt: string;
  updatedAt: string;
};

export type DashboardBooking = BookingItem & {
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  postalCode: string;
  city: string;
  company: string;
  companyId: string;
  customerTags: string[];
  emailLogs: BookingEmailLog[];
  activity: BookingActivityItem[];
};

export type CustomerSummary = BookingCustomer & {
  bookingsCount: number;
  upcomingBookings: number;
  completedBookings: number;
  totalSpent: number;
  lastBookingLabel: string;
};

export type RoutePlanDay = {
  date: string;
  label: string;
  areas: Array<{
    key: string;
    label: string;
    bookings: DashboardBooking[];
    count: number;
    totalRevenue: number;
    travelSurcharge: number;
  }>;
};

export type DashboardData = {
  databaseError?: string;
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
    todayBookings: number;
    unpaidBookings: number;
    outstandingRevenue: number;
  };
  bookings: DashboardBooking[];
  customers: CustomerSummary[];
  availabilityBlocks: AvailabilityBlock[];
  emailLogs: BookingEmailLog[];
  routePlan: RoutePlanDay[];
  calendar: Array<{
    date: string;
    label: string;
    bookings: DashboardBooking[];
    blocks: AvailabilityBlock[];
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
  tags?: string[];
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
  addons: AddOn[];
  subtotal: number;
  appointmentDate: string;
  appointmentTime: string;
  source: string;
  status?: BookingStatus;
  adminNotes?: string;
  manualTotal?: number;
  travelSurcharge?: number;
  estimatedMinutes?: number;
  paymentStatus?: PaymentStatus;
  paymentMethod?: string;
  invoiceRequested?: boolean;
  invoiceStatus?: InvoiceStatus;
  invoiceNumber?: string;
  customer: CustomerInput;
};

const createId = (prefix: string) => `${prefix}_${randomBytes(10).toString("hex")}`;
const createPortalToken = () => randomBytes(24).toString("hex");

const getPortalExpiry = () => {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  return expires.toISOString();
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const uniqueTextList = (values: string[]) =>
  Array.from(new Set(values.map((value) => String(value || "").trim()).filter(Boolean)));

const normalizeServiceAreas = (areas?: ServiceArea[] | null) => {
  if (!Array.isArray(areas)) {
    return defaultBookingSettings.serviceAreas;
  }

  return areas
    .map((area) => ({
      id: String(area.id || createId("area")),
      label: String(area.label || "").trim(),
      postalPrefixes: uniqueTextList(Array.isArray(area.postalPrefixes) ? area.postalPrefixes : []),
      cityHints: String(area.cityHints || "").trim(),
      surcharge: Number(area.surcharge || 0),
      notes: String(area.notes || "").trim(),
      isActive: area.isActive !== false,
    }))
    .filter((area) => area.label);
};

const normalizeCatalogList = <T extends { id: string }>(
  values: T[] | undefined,
  defaults: T[],
  transforms: Partial<Record<keyof T, (value: unknown, fallback: unknown) => unknown>> = {}
) =>
  defaults.map((fallback) => {
    const match = Array.isArray(values) ? values.find((item) => item?.id === fallback.id) : null;
    const merged = { ...fallback, ...(match || {}) } as T;

    for (const [key, transform] of Object.entries(transforms)) {
      const typedKey = key as keyof T;
      merged[typedKey] = transform?.(merged[typedKey], fallback[typedKey]) as T[keyof T];
    }

    return merged;
  });

const normalizeServiceCatalog = (catalog?: Partial<ServiceCatalog> | null): ServiceCatalog => ({
  packages: normalizeCatalogList(catalog?.packages, defaultServiceCatalog.packages, {
    title: (value, fallback) => String(value || fallback),
    description: (value, fallback) => String(value || fallback),
    duration: (value, fallback) => String(value || fallback),
    estimatedMinutes: (value, fallback) => Number(value || fallback || 0),
    badge: (value, fallback) => String(value || fallback),
  }),
  vehicleCategories: normalizeCatalogList(
    catalog?.vehicleCategories,
    defaultServiceCatalog.vehicleCategories,
    {
      label: (value, fallback) => String(value || fallback),
      price: (value, fallback) => Number(value || fallback || 0),
      description: (value, fallback) => String(value || fallback),
    }
  ),
  interiorAddOns: normalizeCatalogList(catalog?.interiorAddOns, defaultServiceCatalog.interiorAddOns, {
    label: (value, fallback) => String(value || fallback),
    price: (value, fallback) =>
      value === undefined || value === null || value === "" ? undefined : Number(value),
  }),
  quantityAddOns: normalizeCatalogList(catalog?.quantityAddOns, defaultServiceCatalog.quantityAddOns, {
    label: (value, fallback) => String(value || fallback),
  }),
  exteriorAddOns: normalizeCatalogList(catalog?.exteriorAddOns, defaultServiceCatalog.exteriorAddOns, {
    label: (value, fallback) => String(value || fallback),
    price: (value, fallback) =>
      value === undefined || value === null || value === "" ? undefined : Number(value),
  }),
});

const normalizeEmailAutomation = (
  settings?: Partial<EmailAutomationSettings> | null
): EmailAutomationSettings => ({
  customerOnCreate: settings?.customerOnCreate ?? defaultEmailAutomation.customerOnCreate,
  customerOnApprove: settings?.customerOnApprove ?? defaultEmailAutomation.customerOnApprove,
  customerOnComplete: settings?.customerOnComplete ?? defaultEmailAutomation.customerOnComplete,
  customerOnCancel: settings?.customerOnCancel ?? defaultEmailAutomation.customerOnCancel,
  adminOnCreate: settings?.adminOnCreate ?? defaultEmailAutomation.adminOnCreate,
});

const normalizeAutoBookingStatus = (value?: string | null): AutoBookingStatus =>
  autoBookingStatuses.includes(value as AutoBookingStatus)
    ? (value as AutoBookingStatus)
    : defaultBookingSettings.defaultBookingStatus;

const getDatabaseErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Databasen kunne ikke laeses.";

const toComparableText = (value: unknown) => String(value ?? "");

const compareText = (left: unknown, right: unknown) =>
  toComparableText(left).localeCompare(toComparableText(right), "da-DK", {
    numeric: true,
    sensitivity: "base",
  });

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
  tags: Array.isArray(row.tags_json) ? uniqueTextList(row.tags_json) : [],
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const availabilityBlockFromRow = (row: RawAvailabilityBlock): AvailabilityBlock => ({
  id: row.id,
  startDate: row.start_date,
  endDate: row.end_date,
  startTime: row.start_time,
  endTime: row.end_time,
  reason: row.reason,
});

const settingsFromRow = (row?: RawSettings | null): BookingSettings => ({
  companyName: row?.company_name || defaultBookingSettings.companyName,
  supportEmail: row?.support_email || process.env.SMTP_USER || defaultBookingSettings.supportEmail,
  adminNotifyEmail:
    row?.admin_notify_email ||
    process.env.BOOKING_ADMIN_EMAIL ||
    defaultBookingSettings.adminNotifyEmail,
  defaultBookingStatus: normalizeAutoBookingStatus(row?.default_booking_status),
  startHour: Number(row?.start_hour ?? defaultBookingSettings.startHour),
  endHour: Number(row?.end_hour ?? defaultBookingSettings.endHour),
  slotMinutes: Number(row?.slot_minutes ?? defaultBookingSettings.slotMinutes),
  travelBufferMinutes: Number(
    row?.travel_buffer_minutes ?? defaultBookingSettings.travelBufferMinutes
  ),
  workingDays:
    Array.isArray(row?.working_days_json) && row?.working_days_json.length > 0
      ? row.working_days_json.map((value) => Number(value)).filter((value) => value >= 0 && value <= 6)
      : defaultBookingSettings.workingDays,
  catalog: normalizeServiceCatalog(row?.service_catalog_json),
  serviceAreas: normalizeServiceAreas(row?.service_areas_json),
  emailAutomation: normalizeEmailAutomation(row?.email_automation_json),
});

const emailLogFromRow = (row: RawEmailLog): BookingEmailLog => ({
  id: row.id,
  bookingId: row.booking_id ?? "",
  customerId: row.customer_id ?? "",
  recipient: row.recipient,
  recipientRole: row.recipient_role,
  templateKey: row.template_key,
  subject: row.subject,
  status: row.status,
  errorMessage: row.error_message ?? "",
  sentAt: row.sent_at ?? "",
  createdAt: row.created_at,
});

const activityFromRow = (row: RawActivity): BookingActivityItem => ({
  id: row.id,
  bookingId: row.booking_id,
  actor: row.actor,
  activityType: row.activity_type,
  summary: row.summary,
  details: row.details_json ?? {},
  createdAt: row.created_at,
});

const bookingFromRow = (
  row: RawBooking,
  customer?: BookingCustomer,
  emailLogs: BookingEmailLog[] = [],
  activity: BookingActivityItem[] = []
): DashboardBooking => ({
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
  travelSurcharge: Number(row.travel_surcharge || 0),
  areaName: row.area_name ?? "",
  estimatedMinutes: Number(row.estimated_duration_minutes || 0),
  appointmentDate: row.appointment_date,
  appointmentTime: row.appointment_time,
  appointmentEndTime: addMinutesToTime(
    row.appointment_time,
    Number(row.estimated_duration_minutes || 0)
  ),
  appointmentLabel: formatDateTimeLabel(row.appointment_date, row.appointment_time),
  status: row.status,
  paymentStatus: row.payment_status ?? "unpaid",
  paymentMethod: row.payment_method ?? "",
  invoiceRequested: Boolean(row.invoice_requested),
  invoiceStatus: row.invoice_status ?? "not_requested",
  invoiceNumber: row.invoice_number ?? "",
  adminNotes: row.admin_notes ?? "",
  source: row.source,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  customerId: customer?.id ?? row.customer_id,
  customerName: [customer?.firstName, customer?.lastName].filter(Boolean).join(" ") || customer?.email || "",
  customerEmail: customer?.email ?? "",
  customerPhone: customer?.phone ?? "",
  address: customer?.address ?? "",
  postalCode: customer?.postalCode ?? "",
  city: customer?.city ?? "",
  company: customer?.company ?? "",
  companyId: customer?.companyId ?? "",
  customerTags: customer?.tags ?? [],
  emailLogs,
  activity,
});

const summarizeCustomer = (customer: BookingCustomer, bookings: DashboardBooking[]): CustomerSummary => {
  const upcomingBookings = bookings.filter(
    (item) => item.status === "pending" || item.status === "approved"
  );
  const completedBookings = bookings.filter((item) => item.status === "completed");
  const lastBooking = [...bookings].sort((a, b) =>
    compareText(
      `${b.appointmentDate}T${b.appointmentTime}`,
      `${a.appointmentDate}T${a.appointmentTime}`
    )
  )[0];

  return {
    ...customer,
    bookingsCount: bookings.length,
    upcomingBookings: upcomingBookings.length,
    completedBookings: completedBookings.length,
    totalSpent: bookings
      .filter((item) => item.status !== "cancelled")
      .reduce((sum, item) => sum + item.total, 0),
    lastBookingLabel: lastBooking?.appointmentLabel ?? "",
  };
};

const getRoutePlan = (bookings: DashboardBooking[]): RoutePlanDay[] => {
  const groupedByDate = new Map<string, DashboardBooking[]>();

  for (const booking of bookings) {
    const dateGroup = groupedByDate.get(booking.appointmentDate) || [];
    dateGroup.push(booking);
    groupedByDate.set(booking.appointmentDate, dateGroup);
  }

  return Array.from(groupedByDate.entries())
    .sort(([left], [right]) => compareText(left, right))
    .map(([date, items]) => {
      const groupedByArea = new Map<string, DashboardBooking[]>();

      for (const booking of items.sort((a, b) => compareText(a.appointmentTime, b.appointmentTime))) {
        const key = toComparableText(booking.areaName || booking.city || "Uden omrade");
        const list = groupedByArea.get(key) || [];
        list.push(booking);
        groupedByArea.set(key, list);
      }

      return {
        date,
        label: formatDateTimeLabel(date, items[0]?.appointmentTime || "00:00").replace(
          /\s+kl\..*$/,
          ""
        ),
        areas: Array.from(groupedByArea.entries()).map(([key, areaBookings]) => ({
          key,
          label: key,
          bookings: areaBookings,
          count: areaBookings.length,
          totalRevenue: areaBookings.reduce((sum, item) => sum + item.total, 0),
          travelSurcharge: areaBookings.reduce((sum, item) => sum + item.travelSurcharge, 0),
        })),
      };
    });
};

const logBookingActivity = async (
  bookingId: string,
  input: {
    actor: string;
    activityType: string;
    summary: string;
    details?: Record<string, unknown>;
  }
) => {
  await ensureSchema();
  const sql = getSql();
  const details = JSON.parse(JSON.stringify(input.details || {}));

  await sql`
    INSERT INTO booking_activity (
      id,
      booking_id,
      actor,
      activity_type,
      summary,
      details_json
    )
    VALUES (
      ${createId("act")},
      ${bookingId},
      ${input.actor},
      ${input.activityType},
      ${input.summary},
      ${sql.json(details)}
    );
  `;
};

export const recordEmailLog = async (input: {
  bookingId?: string;
  customerId?: string;
  recipient: string;
  recipientRole: string;
  templateKey: string;
  subject: string;
  status: string;
  errorMessage?: string;
  sentAt?: string;
}) => {
  if (!isDatabaseConfigured()) {
    return;
  }

  await ensureSchema();
  const sql = getSql();

  await sql`
    INSERT INTO email_logs (
      id,
      booking_id,
      customer_id,
      recipient,
      recipient_role,
      template_key,
      subject,
      status,
      error_message,
      sent_at
    )
    VALUES (
      ${createId("eml")},
      ${input.bookingId || null},
      ${input.customerId || null},
      ${input.recipient},
      ${input.recipientRole},
      ${input.templateKey},
      ${input.subject},
      ${input.status},
      ${input.errorMessage || null},
      ${input.sentAt || null}
    );
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
    const tags = input.tags ? uniqueTextList(input.tags) : existing.tags_json || [];

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
        tags_json = ${sql.json(tags)},
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
      portal_token_expires_at,
      tags_json
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
      ${getPortalExpiry()},
      ${sql.json(uniqueTextList(input.tags || []))}
    )
    RETURNING *;
  `;

  return customerFromRow(created);
};

export const getAvailabilityBlocks = async (): Promise<AvailabilityBlock[]> => {
  if (!isDatabaseConfigured()) {
    return [];
  }

  try {
    await ensureSchema();
    const sql = getSql();
    const rows = await sql<RawAvailabilityBlock[]>`
      SELECT *
      FROM availability_blocks
      ORDER BY start_date ASC, start_time ASC;
    `;

    return rows.map(availabilityBlockFromRow);
  } catch (error) {
    console.error("Could not load availability blocks", error);
    return [];
  }
};

export const getBookingSettings = async (): Promise<BookingSettings> => {
  if (!isDatabaseConfigured()) {
    return {
      ...defaultBookingSettings,
      adminNotifyEmail: process.env.BOOKING_ADMIN_EMAIL || "",
      supportEmail: process.env.SMTP_USER || defaultBookingSettings.supportEmail,
    };
  }

  try {
    await ensureSchema();
    const sql = getSql();
    const [row] = await sql<RawSettings[]>`
      SELECT
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
      FROM booking_settings
      WHERE settings_key = 'default'
      LIMIT 1;
    `;

    return settingsFromRow(row);
  } catch (error) {
    console.error("Could not load booking settings", error);
    return {
      ...defaultBookingSettings,
      adminNotifyEmail: process.env.BOOKING_ADMIN_EMAIL || "",
      supportEmail: process.env.SMTP_USER || defaultBookingSettings.supportEmail,
    };
  }
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
      default_booking_status = ${input.defaultBookingStatus},
      start_hour = ${input.startHour},
      end_hour = ${input.endHour},
      slot_minutes = ${input.slotMinutes},
      travel_buffer_minutes = ${input.travelBufferMinutes},
      working_days_json = ${sql.json(input.workingDays)},
      service_catalog_json = ${sql.json(input.catalog)},
      service_areas_json = ${sql.json(input.serviceAreas)},
      email_automation_json = ${sql.json(input.emailAutomation)},
      updated_at = NOW()
    WHERE settings_key = 'default';
  `;
};

export const createAvailabilityBlock = async (input: Omit<AvailabilityBlock, "id">) => {
  await ensureSchema();
  const sql = getSql();

  await sql`
    INSERT INTO availability_blocks (
      id,
      start_date,
      end_date,
      start_time,
      end_time,
      reason
    )
    VALUES (
      ${createId("blk")},
      ${input.startDate},
      ${input.endDate},
      ${input.startTime},
      ${input.endTime},
      ${input.reason}
    );
  `;
};

export const deleteAvailabilityBlock = async (blockId: string) => {
  await ensureSchema();
  const sql = getSql();

  await sql`
    DELETE FROM availability_blocks
    WHERE id = ${blockId};
  `;
};

export const updateCustomerAdmin = async (
  customerId: string,
  input: {
    notes: string;
    tags: string[];
  }
) => {
  await ensureSchema();
  const sql = getSql();

  await sql`
    UPDATE customers
    SET
      notes = ${input.notes},
      tags_json = ${sql.json(uniqueTextList(input.tags))},
      updated_at = NOW()
    WHERE id = ${customerId};
  `;
};

export const createBooking = async (input: CreateBookingInput) => {
  await ensureSchema();
  const sql = getSql();
  const customer = await upsertCustomer(input.customer);
  const settings = await getBookingSettings();
  const matchedArea = findMatchingServiceArea(customer.postalCode, settings.serviceAreas);
  const catalogPackage = getCatalogPackage(settings.catalog, input.packageId);
  const addons = (input.addons || []).map((item) => ({
    id: item.id,
    label: item.label,
    price: Number(item.price || 0),
  }));
  const travelSurcharge =
    input.travelSurcharge ?? (matchedArea?.surcharge && input.source === "website" ? matchedArea.surcharge : 0);
  const total =
    input.manualTotal ??
    Number(input.subtotal || 0) +
      addons.reduce((sum, item) => sum + Number(item.price || 0), 0) +
      Number(travelSurcharge || 0);
  const estimatedMinutes =
    input.estimatedMinutes ?? Number(catalogPackage?.estimatedMinutes || settings.slotMinutes);
  const invoiceRequested = Boolean(input.invoiceRequested);
  const invoiceStatus =
    input.invoiceStatus ?? (invoiceRequested ? "ready" : "not_requested");

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
      travel_surcharge,
      area_name,
      estimated_duration_minutes,
      appointment_date,
      appointment_time,
      status,
      payment_status,
      payment_method,
      invoice_requested,
      invoice_status,
      invoice_number,
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
      ${sql.json(addons)},
      ${Number(input.subtotal || 0)},
      ${Math.round(total)},
      ${Math.round(travelSurcharge || 0)},
      ${matchedArea?.label || ""},
      ${estimatedMinutes},
      ${input.appointmentDate},
      ${input.appointmentTime},
      ${input.status || "pending"},
      ${input.paymentStatus || "unpaid"},
      ${input.paymentMethod || ""},
      ${invoiceRequested},
      ${invoiceStatus},
      ${input.invoiceNumber || ""},
      ${input.adminNotes || ""},
      ${input.source}
    )
    RETURNING *;
  `;

  await logBookingActivity(created.id, {
    actor: input.source === "admin" ? "admin" : "website",
    activityType: "booking_created",
    summary:
      input.source === "admin"
        ? "Booking oprettet manuelt fra admin."
        : "Ny booking oprettet fra websitet.",
    details: {
      status: input.status || "pending",
      appointmentDate: input.appointmentDate,
      appointmentTime: input.appointmentTime,
      total: Math.round(total),
    },
  });

  const result = await getBookingById(created.id);
  if (!result) {
    throw new Error("Booking blev oprettet, men kunne ikke hentes bagefter.");
  }

  return result;
};

export const getPortalData = async (portalToken: string) => {
  if (!isDatabaseConfigured()) {
    return null;
  }

  try {
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

    const customer = customerFromRow(customerRow);
    const bookings = bookingRows.map((row) => {
      const item = bookingFromRow(row, customer);
      return {
        ...item,
        emailLogs: [],
        activity: [],
      };
    });

    return {
      customer,
      bookings,
      settings: await getBookingSettings(),
      availabilityBlocks: await getAvailabilityBlocks(),
    };
  } catch (error) {
    console.error("Could not load customer portal data", error);
    return null;
  }
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

  if (!bookingRow) {
    return null;
  }

  const [customerRow] = await sql<RawCustomer[]>`
    SELECT *
    FROM customers
    WHERE id = ${bookingRow.customer_id}
    LIMIT 1;
  `;

  if (!customerRow) {
    return null;
  }

  const emailRows = await sql<RawEmailLog[]>`
    SELECT *
    FROM email_logs
    WHERE booking_id = ${bookingId}
    ORDER BY created_at DESC;
  `;

  const activityRows = await sql<RawActivity[]>`
    SELECT *
    FROM booking_activity
    WHERE booking_id = ${bookingId}
    ORDER BY created_at DESC;
  `;

  const customer = customerFromRow(customerRow);
  const booking = bookingFromRow(
    bookingRow,
    customer,
    emailRows.map(emailLogFromRow),
    activityRows.map(activityFromRow)
  );

  return { booking, customer };
};

export const updateBookingStatus = async (
  bookingId: string,
  status: BookingStatus,
  adminNotes = ""
) => {
  await ensureSchema();
  const sql = getSql();
  const current = await getBookingById(bookingId);

  await sql`
    UPDATE bookings
    SET
      status = ${status},
      admin_notes = ${adminNotes},
      updated_at = NOW()
    WHERE id = ${bookingId};
  `;

  await logBookingActivity(bookingId, {
    actor: "admin",
    activityType: "status_updated",
    summary: `Status aendret til ${status}.`,
    details: {
      previousStatus: current?.booking.status || "",
      nextStatus: status,
      adminNotes,
    },
  });

  return getBookingById(bookingId);
};

export const updateBookingSchedule = async (
  bookingId: string,
  input: {
    appointmentDate: string;
    appointmentTime: string;
    adminNotes: string;
  }
) => {
  await ensureSchema();
  const sql = getSql();
  const current = await getBookingById(bookingId);

  await sql`
    UPDATE bookings
    SET
      appointment_date = ${input.appointmentDate},
      appointment_time = ${input.appointmentTime},
      admin_notes = ${input.adminNotes},
      updated_at = NOW()
    WHERE id = ${bookingId};
  `;

  await logBookingActivity(bookingId, {
    actor: "admin",
    activityType: "booking_rescheduled",
    summary: "Bookingtidspunkt opdateret.",
    details: {
      previousDate: current?.booking.appointmentDate || "",
      previousTime: current?.booking.appointmentTime || "",
      nextDate: input.appointmentDate,
      nextTime: input.appointmentTime,
    },
  });

  return getBookingById(bookingId);
};

export const updateBookingFinancials = async (
  bookingId: string,
  input: {
    paymentStatus: PaymentStatus;
    paymentMethod: string;
    invoiceRequested: boolean;
    invoiceStatus: InvoiceStatus;
    invoiceNumber: string;
    adminNotes: string;
  }
) => {
  await ensureSchema();
  const sql = getSql();

  await sql`
    UPDATE bookings
    SET
      payment_status = ${input.paymentStatus},
      payment_method = ${input.paymentMethod},
      invoice_requested = ${input.invoiceRequested},
      invoice_status = ${input.invoiceStatus},
      invoice_number = ${input.invoiceNumber},
      admin_notes = ${input.adminNotes},
      updated_at = NOW()
    WHERE id = ${bookingId};
  `;

  await logBookingActivity(bookingId, {
    actor: "admin",
    activityType: "payment_updated",
    summary: "Betalings- og fakturafelter opdateret.",
    details: input,
  });

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
      databaseError: undefined,
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
        todayBookings: 0,
        unpaidBookings: 0,
        outstandingRevenue: 0,
      },
      bookings: [],
      customers: [],
      availabilityBlocks: [],
      emailLogs: [],
      routePlan: [],
      calendar: [],
    };
  }

  try {
    await ensureSchema();
    const sql = getSql();
    const settings = await getBookingSettings();
    const [bookingRows, customerRows, blockRows, emailRows, activityRows] = await Promise.all([
      sql<RawBooking[]>`
        SELECT *
        FROM bookings
        ORDER BY appointment_date ASC, appointment_time ASC, created_at DESC;
      `,
      sql<RawCustomer[]>`
        SELECT *
        FROM customers
        ORDER BY created_at DESC;
      `,
      sql<RawAvailabilityBlock[]>`
        SELECT *
        FROM availability_blocks
        ORDER BY start_date ASC, start_time ASC;
      `,
      sql<RawEmailLog[]>`
        SELECT *
        FROM email_logs
        ORDER BY created_at DESC
        LIMIT 250;
      `,
      sql<RawActivity[]>`
        SELECT *
        FROM booking_activity
        ORDER BY created_at DESC
        LIMIT 500;
      `,
    ]);

    const customers = customerRows.map(customerFromRow);
    const customerMap = new Map(customers.map((customer) => [customer.id, customer]));
    const availabilityBlocks = blockRows.map(availabilityBlockFromRow);
    const emailLogs = emailRows.map(emailLogFromRow);
    const activity = activityRows.map(activityFromRow);
    const emailLogMap = new Map<string, BookingEmailLog[]>();
    const activityMap = new Map<string, BookingActivityItem[]>();

    for (const item of emailLogs) {
      const list = emailLogMap.get(item.bookingId) || [];
      list.push(item);
      emailLogMap.set(item.bookingId, list);
    }

    for (const item of activity) {
      const list = activityMap.get(item.bookingId) || [];
      list.push(item);
      activityMap.set(item.bookingId, list);
    }

    const bookings = bookingRows.map((row) =>
      bookingFromRow(
        row,
        customerMap.get(row.customer_id),
        emailLogMap.get(row.id) || [],
        activityMap.get(row.id) || []
      )
    );
    const bookingsByCustomerId = new Map<string, DashboardBooking[]>();
    for (const booking of bookings) {
      const list = bookingsByCustomerId.get(booking.customerId) || [];
      list.push(booking);
      bookingsByCustomerId.set(booking.customerId, list);
    }
    const customerSummaries = customers.map((customer) =>
      summarizeCustomer(customer, bookingsByCustomerId.get(customer.id) || [])
    );
    const today = new Date().toISOString().slice(0, 10);
    const upcomingBookings = bookings.filter(
      (item) =>
        item.status !== "cancelled" &&
        `${item.appointmentDate}T${item.appointmentTime}` >= `${today}T00:00`
    );
    const routePlan = getRoutePlan(
      upcomingBookings.filter((item) => item.status === "pending" || item.status === "approved")
    );

    const calendarMap = new Map<string, DashboardBooking[]>();
    for (const booking of bookings) {
      const list = calendarMap.get(booking.appointmentDate) || [];
      list.push(booking);
      calendarMap.set(booking.appointmentDate, list);
    }

    const blockMap = new Map<string, AvailabilityBlock[]>();
    for (const block of availabilityBlocks) {
      let cursor = new Date(`${block.startDate}T00:00:00`);
      const end = new Date(`${block.endDate}T00:00:00`);

      while (cursor.getTime() <= end.getTime()) {
        const key = cursor.toISOString().slice(0, 10);
        const list = blockMap.get(key) || [];
        list.push(block);
        blockMap.set(key, list);
        cursor.setDate(cursor.getDate() + 1);
      }
    }

    const calendarKeys = Array.from(new Set([...calendarMap.keys(), ...blockMap.keys()])).sort();
    const calendar = calendarKeys.map((date) => ({
      date,
      label: formatDateTimeLabel(date, "00:00").replace(/\s+kl\..*$/, ""),
      bookings:
        (calendarMap.get(date) || []).sort((left, right) =>
          compareText(left.appointmentTime, right.appointmentTime)
        ),
      blocks: blockMap.get(date) || [],
    }));

    return {
      databaseError: undefined,
      settings,
      stats: {
        totalBookings: bookings.length,
        pendingBookings: bookings.filter((item) => item.status === "pending").length,
        approvedBookings: bookings.filter((item) => item.status === "approved").length,
        completedBookings: bookings.filter((item) => item.status === "completed").length,
        cancelledBookings: bookings.filter((item) => item.status === "cancelled").length,
        totalRevenue: bookings
          .filter((item) => item.status !== "cancelled")
          .reduce((sum, item) => sum + item.total, 0),
        upcomingBookings: upcomingBookings.length,
        totalCustomers: customerSummaries.length,
        todayBookings: bookings.filter((item) => item.appointmentDate === today).length,
        unpaidBookings: bookings.filter((item) => item.paymentStatus !== "paid").length,
        outstandingRevenue: bookings
          .filter((item) => item.status !== "cancelled" && item.paymentStatus !== "paid")
          .reduce((sum, item) => sum + item.total, 0),
      },
      bookings,
      customers: customerSummaries,
      availabilityBlocks,
      emailLogs,
      routePlan,
      calendar,
    };
  } catch (error) {
    console.error("Could not load admin dashboard data", error);
    return {
      databaseError: getDatabaseErrorMessage(error),
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
        todayBookings: 0,
        unpaidBookings: 0,
        outstandingRevenue: 0,
      },
      bookings: [],
      customers: [],
      availabilityBlocks: [],
      emailLogs: [],
      routePlan: [],
      calendar: [],
    };
  }
};
