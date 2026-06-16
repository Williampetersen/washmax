import { randomBytes } from "node:crypto";
import { cache } from "react";
import { ensureSchema, getSql, isDatabaseConfigured, shouldRunDatabaseSetup } from "@/lib/server/db";
import {
  defaultBookingSettings,
  defaultEmailAutomation,
  defaultServiceCatalog,
  findMatchingServiceArea,
  getCatalogPackage,
  type AddOn,
  type AvailabilityBlock,
  type BookingSettings,
  type EmailAutomationSettings,
  type ServiceArea,
  type ServiceCatalog,
  type VehicleCategory,
} from "@/lib/shared/booking";

type RawService = {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  price_dkk: number;
  duration_minutes: number;
  image_url: string | null;
  icon: string | null;
  sort_order: number;
  is_visible: boolean;
  is_featured: boolean;
  category_prices_json: Record<string, number> | null;
  created_at: string | Date;
  updated_at: string | Date;
};

type RawAddon = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price_dkk: number;
  duration_minutes: number;
  image_url: string | null;
  addon_category: string;
  sort_order: number;
  is_visible: boolean;
  allowed_service_ids: string[] | null;
  created_at: string | Date;
  updated_at: string | Date;
};

type RawOptionGroup = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  is_required: boolean;
  is_visible: boolean;
  sort_order: number;
  created_at: string | Date;
  updated_at: string | Date;
};

type RawOption = {
  id: string;
  group_id: string;
  label: string;
  slug: string;
  description: string | null;
  price_adjustment_dkk: number;
  duration_adjustment_minutes: number;
  image_url: string | null;
  sort_order: number;
  is_visible: boolean;
  is_required: boolean;
  created_at: string | Date;
  updated_at: string | Date;
};

type RawOpeningHour = {
  id: string;
  weekday: number;
  range_index: number;
  is_open: boolean;
  start_time: string | Date;
  end_time: string | Date;
  created_at: string | Date;
  updated_at: string | Date;
};

type RawUnavailableDate = {
  id: string;
  start_date: string | Date;
  end_date: string | Date;
  title: string;
  start_time: string | Date;
  end_time: string | Date;
  is_full_day: boolean;
  repeat_yearly: boolean;
  created_at: string | Date;
  updated_at: string | Date;
};

type RawTimeSettings = {
  slot_interval_minutes: number;
  minimum_notice_hours: number;
  maximum_days_ahead: number;
  buffer_before_minutes: number;
  buffer_after_minutes: number;
  max_bookings_per_slot: number;
  max_bookings_per_day: number;
  allow_same_day_booking: boolean;
};

type RawFormField = {
  id: string;
  field_key: string;
  label: string;
  placeholder: string | null;
  help_text: string | null;
  is_visible: boolean;
  is_required: boolean;
  sort_order: number;
  created_at: string | Date;
  updated_at: string | Date;
};

type RawGeneralSettings = {
  booking_enabled: boolean;
  disabled_message: string;
  currency: string;
  vat_rate: number;
  company_name: string;
  support_email: string;
  admin_notify_email: string;
  admin_notify_email_2: string;
  admin_notify_email_3: string;
  admin_notify_email_4: string;
  admin_notify_email_5: string;
  customer_confirmation_enabled: boolean;
  admin_notification_enabled: boolean;
  cancellation_policy_text: string | null;
  success_message: string | null;
};

type RawLegacySettings = {
  company_name: string;
  support_email: string;
  admin_notify_email: string;
  default_booking_status: string;
  service_areas_json: ServiceArea[] | null;
  email_automation_json: Partial<EmailAutomationSettings> | null;
};

export type BookingSetupService = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  priceDkk: number;
  durationMinutes: number;
  imageUrl: string;
  icon: string;
  sortOrder: number;
  isVisible: boolean;
  isFeatured: boolean;
  categoryPrices: Record<string, number>;
  createdAt: string;
  updatedAt: string;
};

export type BookingSetupAddon = {
  id: string;
  name: string;
  slug: string;
  description: string;
  priceDkk: number;
  durationMinutes: number;
  imageUrl: string;
  addonCategory: string;
  sortOrder: number;
  isVisible: boolean;
  allowedServiceIds: string[];
  createdAt: string;
  updatedAt: string;
};

export type BookingSetupOptionGroup = {
  id: string;
  name: string;
  slug: string;
  description: string;
  isRequired: boolean;
  isVisible: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  options: BookingSetupOption[];
};

export type BookingSetupOption = {
  id: string;
  groupId: string;
  label: string;
  slug: string;
  description: string;
  priceAdjustmentDkk: number;
  durationAdjustmentMinutes: number;
  imageUrl: string;
  sortOrder: number;
  isVisible: boolean;
  isRequired: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BookingOpeningHour = {
  id: string;
  weekday: number;
  rangeIndex: number;
  isOpen: boolean;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

export type BookingUnavailableDate = {
  id: string;
  startDate: string;
  endDate: string;
  title: string;
  startTime: string;
  endTime: string;
  isFullDay: boolean;
  repeatYearly: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BookingTimeSettings = {
  slotIntervalMinutes: number;
  minimumNoticeHours: number;
  maximumDaysAhead: number;
  bufferBeforeMinutes: number;
  bufferAfterMinutes: number;
  maxBookingsPerSlot: number;
  maxBookingsPerDay: number;
  allowSameDayBooking: boolean;
};

export type BookingFormField = {
  id: string;
  fieldKey: string;
  label: string;
  placeholder: string;
  helpText: string;
  isVisible: boolean;
  isRequired: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type BookingGeneralSettings = {
  bookingEnabled: boolean;
  disabledMessage: string;
  currency: string;
  vatRate: number;
  companyName: string;
  supportEmail: string;
  adminNotifyEmail: string;
  adminNotifyEmail2: string;
  adminNotifyEmail3: string;
  adminNotifyEmail4: string;
  adminNotifyEmail5: string;
  customerConfirmationEnabled: boolean;
  adminNotificationEnabled: boolean;
  cancellationPolicyText: string;
  successMessage: string;
};

export type BookingSetupData = {
  services: BookingSetupService[];
  addons: BookingSetupAddon[];
  optionGroups: BookingSetupOptionGroup[];
  openingHours: BookingOpeningHour[];
  unavailableDates: BookingUnavailableDate[];
  timeSettings: BookingTimeSettings;
  formFields: BookingFormField[];
  general: BookingGeneralSettings;
  publicSettings: BookingSettings;
};

export type BookingPricingResult = {
  packageId: string;
  packageLabel: string;
  addons: AddOn[];
  subtotal: number;
  travelSurcharge: number;
  total: number;
  estimatedMinutes: number;
  category: string;
};

const createId = (prefix: string) => `${prefix}_${randomBytes(10).toString("hex")}`;
let bookingSetupSeedPromise: Promise<void> | null = null;

const toDateText = (value: unknown) => {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "").slice(0, 10);
};

const toDateTimeText = (value: unknown) => {
  if (value instanceof Date) return value.toISOString();
  return String(value ?? "");
};

const toTimeText = (value: unknown, fallback = "00:00") => {
  if (value instanceof Date) {
    return `${value.getHours().toString().padStart(2, "0")}:${value
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }
  const text = String(value ?? "").trim();
  return text ? text.slice(0, 5) : fallback;
};

export const slugifyBookingSetup = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || `item-${Date.now().toString(36)}`;

const uniqueSlug = (base: string) => `${slugifyBookingSetup(base)}-${Date.now().toString(36)}`;

const serviceFromRow = (row: RawService): BookingSetupService => ({
  id: String(row.id),
  name: String(row.name || ""),
  slug: String(row.slug || ""),
  shortDescription: String(row.short_description || ""),
  description: String(row.description || ""),
  priceDkk: Number(row.price_dkk || 0),
  durationMinutes: Number(row.duration_minutes || 0),
  imageUrl: String(row.image_url || ""),
  icon: String(row.icon || ""),
  sortOrder: Number(row.sort_order || 0),
  isVisible: Boolean(row.is_visible),
  isFeatured: Boolean(row.is_featured),
  categoryPrices:
    row.category_prices_json && typeof row.category_prices_json === "object"
      ? (row.category_prices_json as Record<string, number>)
      : {},
  createdAt: toDateTimeText(row.created_at),
  updatedAt: toDateTimeText(row.updated_at),
});

const addonFromRow = (row: RawAddon): BookingSetupAddon => ({
  id: String(row.id),
  name: String(row.name || ""),
  slug: String(row.slug || ""),
  description: String(row.description || ""),
  priceDkk: Number(row.price_dkk || 0),
  durationMinutes: Number(row.duration_minutes || 0),
  imageUrl: String(row.image_url || ""),
  addonCategory: String(row.addon_category || "interior"),
  sortOrder: Number(row.sort_order || 0),
  isVisible: Boolean(row.is_visible),
  allowedServiceIds: Array.isArray(row.allowed_service_ids) ? row.allowed_service_ids : [],
  createdAt: toDateTimeText(row.created_at),
  updatedAt: toDateTimeText(row.updated_at),
});

const optionFromRow = (row: RawOption): BookingSetupOption => ({
  id: String(row.id),
  groupId: String(row.group_id),
  label: String(row.label || ""),
  slug: String(row.slug || ""),
  description: String(row.description || ""),
  priceAdjustmentDkk: Number(row.price_adjustment_dkk || 0),
  durationAdjustmentMinutes: Number(row.duration_adjustment_minutes || 0),
  imageUrl: String(row.image_url || ""),
  sortOrder: Number(row.sort_order || 0),
  isVisible: Boolean(row.is_visible),
  isRequired: Boolean(row.is_required),
  createdAt: toDateTimeText(row.created_at),
  updatedAt: toDateTimeText(row.updated_at),
});

const optionGroupFromRow = (
  row: RawOptionGroup,
  options: BookingSetupOption[]
): BookingSetupOptionGroup => ({
  id: String(row.id),
  name: String(row.name || ""),
  slug: String(row.slug || ""),
  description: String(row.description || ""),
  isRequired: Boolean(row.is_required),
  isVisible: Boolean(row.is_visible),
  sortOrder: Number(row.sort_order || 0),
  createdAt: toDateTimeText(row.created_at),
  updatedAt: toDateTimeText(row.updated_at),
  options,
});

const openingHourFromRow = (row: RawOpeningHour): BookingOpeningHour => ({
  id: String(row.id),
  weekday: Number(row.weekday || 0),
  rangeIndex: Number(row.range_index || 0),
  isOpen: Boolean(row.is_open),
  startTime: toTimeText(row.start_time, "09:00"),
  endTime: toTimeText(row.end_time, "17:00"),
  createdAt: toDateTimeText(row.created_at),
  updatedAt: toDateTimeText(row.updated_at),
});

const unavailableDateFromRow = (row: RawUnavailableDate): BookingUnavailableDate => ({
  id: String(row.id),
  startDate: toDateText(row.start_date),
  endDate: toDateText(row.end_date),
  title: String(row.title || ""),
  startTime: toTimeText(row.start_time, "00:00"),
  endTime: toTimeText(row.end_time, "23:59"),
  isFullDay: Boolean(row.is_full_day),
  repeatYearly: Boolean(row.repeat_yearly),
  createdAt: toDateTimeText(row.created_at),
  updatedAt: toDateTimeText(row.updated_at),
});

const timeSettingsFromRow = (row?: RawTimeSettings | null): BookingTimeSettings => ({
  slotIntervalMinutes: Number(row?.slot_interval_minutes ?? 30),
  minimumNoticeHours: Number(row?.minimum_notice_hours ?? 2),
  maximumDaysAhead: Number(row?.maximum_days_ahead ?? 180),
  bufferBeforeMinutes: Number(row?.buffer_before_minutes ?? 160),
  bufferAfterMinutes: Number(row?.buffer_after_minutes ?? 0),
  maxBookingsPerSlot: Number(row?.max_bookings_per_slot ?? 1),
  maxBookingsPerDay: Number(row?.max_bookings_per_day ?? 0),
  allowSameDayBooking: row?.allow_same_day_booking !== false,
});

const formFieldFromRow = (row: RawFormField): BookingFormField => ({
  id: String(row.id),
  fieldKey: String(row.field_key || ""),
  label: String(row.label || ""),
  placeholder: String(row.placeholder || ""),
  helpText: String(row.help_text || ""),
  isVisible: Boolean(row.is_visible),
  isRequired: Boolean(row.is_required),
  sortOrder: Number(row.sort_order || 0),
  createdAt: toDateTimeText(row.created_at),
  updatedAt: toDateTimeText(row.updated_at),
});

const generalFromRow = (row?: RawGeneralSettings | null): BookingGeneralSettings => ({
  bookingEnabled: row?.booking_enabled !== false,
  disabledMessage: row?.disabled_message || "Online booking is temporarily unavailable.",
  currency: row?.currency || "DKK",
  vatRate: Number(row?.vat_rate || 25),
  companyName: row?.company_name || defaultBookingSettings.companyName,
  supportEmail: row?.support_email || process.env.SMTP_USER || defaultBookingSettings.supportEmail,
  adminNotifyEmail:
    row?.admin_notify_email ||
    process.env.BOOKING_ADMIN_EMAIL ||
    defaultBookingSettings.adminNotifyEmail,
  adminNotifyEmail2: row?.admin_notify_email_2 || "",
  adminNotifyEmail3: row?.admin_notify_email_3 || "",
  adminNotifyEmail4: row?.admin_notify_email_4 || "",
  adminNotifyEmail5: row?.admin_notify_email_5 || "",
  customerConfirmationEnabled: row?.customer_confirmation_enabled !== false,
  adminNotificationEnabled: row?.admin_notification_enabled !== false,
  cancellationPolicyText: String(row?.cancellation_policy_text || ""),
  successMessage: String(row?.success_message || ""),
});

const getLegacySettings = async () => {
  const sql = getSql();
  const [row] = await sql<RawLegacySettings[]>`
    SELECT company_name, support_email, admin_notify_email, default_booking_status,
           service_areas_json, email_automation_json
    FROM booking_settings
    WHERE settings_key = 'default'
    LIMIT 1;
  `;
  return row;
};

export const ensureBookingSetupSeeded = async () => {
  if (!shouldRunDatabaseSetup()) {
    return;
  }

  if (bookingSetupSeedPromise) {
    return bookingSetupSeedPromise;
  }

  bookingSetupSeedPromise = seedBookingSetup();
  try {
    await bookingSetupSeedPromise;
  } catch (error) {
    bookingSetupSeedPromise = null;
    throw error;
  }
};

const seedBookingSetup = async () => {
  await ensureSchema();
  const sql = getSql();

  // Ensure columns added after initial schema deployment exist (idempotent migrations)
  await sql`
    ALTER TABLE booking_general_settings
      ADD COLUMN IF NOT EXISTS admin_notify_email_2 TEXT NOT NULL DEFAULT '',
      ADD COLUMN IF NOT EXISTS admin_notify_email_3 TEXT NOT NULL DEFAULT '',
      ADD COLUMN IF NOT EXISTS admin_notify_email_4 TEXT NOT NULL DEFAULT '',
      ADD COLUMN IF NOT EXISTS admin_notify_email_5 TEXT NOT NULL DEFAULT '';
  `.catch(() => null);

  const [serviceCount] = await sql<{ count: string }[]>`
    SELECT COUNT(*)::text AS count FROM booking_services;
  `;
  if (Number(serviceCount?.count || 0) === 0) {
    for (const [index, item] of defaultBookingSettings.catalog.packages.entries()) {
      await sql`
        INSERT INTO booking_services (
          id, name, slug, short_description, description, price_dkk,
          duration_minutes, icon, sort_order, is_visible, is_featured, category_prices_json
        )
        VALUES (
          ${item.id}, ${item.title}, ${slugifyBookingSetup(item.id)},
          ${item.description}, ${item.description}, 0,
          ${item.estimatedMinutes}, ${item.badge}, ${index}, true,
          ${item.id === "whole"}, ${sql.json(item.categoryPrices ?? {})}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
    }
  }

  const [addonCount] = await sql<{ count: string }[]>`
    SELECT COUNT(*)::text AS count FROM booking_addons;
  `;
  if (Number(addonCount?.count || 0) === 0) {
    const addonGroups: Array<[AddOn[], string]> = [
      [defaultBookingSettings.catalog.interiorAddOns, "interior"],
      [defaultBookingSettings.catalog.exteriorAddOns, "exterior"],
      [defaultBookingSettings.catalog.quantityAddOns, "quantity"],
    ];
    for (const [items, category] of addonGroups) {
      for (const [index, item] of items.entries()) {
        await sql`
          INSERT INTO booking_addons (
            id, name, slug, description, price_dkk, duration_minutes,
            addon_category, sort_order, is_visible, allowed_service_ids
          )
          VALUES (
            ${item.id}, ${item.label}, ${slugifyBookingSetup(item.id)}, ${item.description || ""},
            ${Number(item.price || 0)}, ${Number(item.durationMinutes || 0)},
            ${category}, ${index}, true, ${sql.json([])}
          )
          ON CONFLICT (id) DO NOTHING;
        `;
      }
    }
  }

  const [groupCount] = await sql<{ count: string }[]>`
    SELECT COUNT(*)::text AS count FROM booking_option_groups;
  `;
  if (Number(groupCount?.count || 0) === 0) {
    const groupId = "vehicle_category";
    await sql`
      INSERT INTO booking_option_groups (
        id, name, slug, description, is_required, is_visible, sort_order
      )
      VALUES (
        ${groupId}, 'Vehicle type / car size', 'vehicle-category',
        'Vehicle category used for default price logic.', true, true, 0
      )
      ON CONFLICT (id) DO NOTHING;
    `;
    for (const [index, item] of defaultBookingSettings.catalog.vehicleCategories.entries()) {
      await sql`
        INSERT INTO booking_options (
          id, group_id, label, slug, description, price_adjustment_dkk,
          duration_adjustment_minutes, sort_order, is_visible, is_required
        )
        VALUES (
          ${item.id}, ${groupId}, ${item.label}, ${slugifyBookingSetup(item.id)},
          ${item.description}, ${item.price}, 0, ${index}, true, false
        )
        ON CONFLICT (id) DO NOTHING;
      `;
    }
  }

  const [hourCount] = await sql<{ count: string }[]>`
    SELECT COUNT(*)::text AS count FROM booking_opening_hours;
  `;
  if (Number(hourCount?.count || 0) === 0) {
    for (let weekday = 0; weekday <= 6; weekday += 1) {
      await sql`
        INSERT INTO booking_opening_hours (
          id, weekday, range_index, is_open, start_time, end_time
        )
        VALUES (
          ${`boh_${weekday}`}, ${weekday}, 0,
          ${defaultBookingSettings.workingDays.includes(weekday)},
          ${`${defaultBookingSettings.startHour.toString().padStart(2, "0")}:00`},
          ${`${defaultBookingSettings.endHour.toString().padStart(2, "0")}:00`}
        )
        ON CONFLICT (weekday, range_index) DO NOTHING;
      `;
    }
  }

  await sql`
    INSERT INTO booking_time_settings (
      settings_key, slot_interval_minutes, minimum_notice_hours, maximum_days_ahead,
      buffer_before_minutes, buffer_after_minutes, max_bookings_per_slot,
      max_bookings_per_day, allow_same_day_booking
    )
    VALUES (
      'default', ${defaultBookingSettings.slotMinutes}, 2, 180,
      ${defaultBookingSettings.bufferBeforeMinutes ?? 160},
      ${defaultBookingSettings.bufferAfterMinutes ?? defaultBookingSettings.travelBufferMinutes},
      1, 0, true
    )
    ON CONFLICT (settings_key) DO NOTHING;
  `;

  const fields = [
    ["firstName", "Fornavn", "Fornavn", ""],
    ["lastName", "Efternavn", "Efternavn", ""],
    ["email", "Email", "Email", ""],
    ["phone", "Telefon", "Telefon", ""],
    ["address", "Adresse", "Adresse", ""],
    ["postalCode", "Postnr.", "Postnr.", ""],
    ["city", "By", "By", ""],
    ["plate", "Nummerplade", "AB12345", ""],
    ["notes", "Bemærkninger", "Fx parkering, adgang, særlige onsker...", ""],
  ] as const;
  for (const [index, field] of fields.entries()) {
    await sql`
      INSERT INTO booking_form_fields (
        id, field_key, label, placeholder, help_text, is_visible, is_required, sort_order
      )
      VALUES (
        ${`bff_${field[0]}`}, ${field[0]}, ${field[1]}, ${field[2]}, ${field[3]},
        true, ${field[0] !== "notes"}, ${index}
      )
      ON CONFLICT (field_key) DO NOTHING;
    `;
  }

  const legacy = await getLegacySettings().catch(() => null);
  await sql`
    INSERT INTO booking_general_settings (
      settings_key, booking_enabled, disabled_message, currency, vat_rate, company_name,
      support_email, admin_notify_email, customer_confirmation_enabled,
      admin_notification_enabled, cancellation_policy_text, success_message
    )
    VALUES (
      'default', true, 'Online booking is temporarily unavailable.', 'DKK', 25,
      ${legacy?.company_name || defaultBookingSettings.companyName},
      ${legacy?.support_email || defaultBookingSettings.supportEmail},
      ${legacy?.admin_notify_email || ""},
      true, true, '', 'Tak for din booking.'
    )
    ON CONFLICT (settings_key) DO NOTHING;
  `;
};

const _getBookingSetupData = async (): Promise<BookingSetupData> => {
  if (!isDatabaseConfigured()) {
    return {
      services: [],
      addons: [],
      optionGroups: [],
      openingHours: [],
      unavailableDates: [],
      timeSettings: timeSettingsFromRow(),
      formFields: [],
      general: generalFromRow(),
      publicSettings: defaultBookingSettings,
    };
  }

  await ensureBookingSetupSeeded();
  const sql = getSql();
  const [serviceRows, addonRows, groupRows, optionRows, openingRows, unavailableRows, timeRows, fieldRows, generalRows] =
    await Promise.all([
      sql<RawService[]>`SELECT * FROM booking_services ORDER BY sort_order ASC, created_at ASC;`,
      sql<RawAddon[]>`SELECT * FROM booking_addons ORDER BY sort_order ASC, created_at ASC;`,
      sql<RawOptionGroup[]>`SELECT * FROM booking_option_groups ORDER BY sort_order ASC, created_at ASC;`,
      sql<RawOption[]>`SELECT * FROM booking_options ORDER BY sort_order ASC, created_at ASC;`,
      sql<RawOpeningHour[]>`SELECT * FROM booking_opening_hours ORDER BY weekday ASC, range_index ASC;`,
      sql<RawUnavailableDate[]>`SELECT * FROM booking_unavailable_dates ORDER BY start_date ASC, start_time ASC;`,
      sql<RawTimeSettings[]>`SELECT * FROM booking_time_settings WHERE settings_key = 'default' LIMIT 1;`,
      sql<RawFormField[]>`SELECT * FROM booking_form_fields ORDER BY sort_order ASC, created_at ASC;`,
      sql<RawGeneralSettings[]>`SELECT * FROM booking_general_settings WHERE settings_key = 'default' LIMIT 1;`,
    ]);

  const options = optionRows.map(optionFromRow);
  const optionGroups = groupRows.map((group) =>
    optionGroupFromRow(group, options.filter((option) => option.groupId === group.id))
  );
  const services = serviceRows.map(serviceFromRow);
  const addons = addonRows.map(addonFromRow);
  const openingHours = openingRows.map(openingHourFromRow);
  const unavailableDates = unavailableRows.map(unavailableDateFromRow);
  const timeSettings = timeSettingsFromRow(timeRows[0]);
  const formFields = fieldRows.map(formFieldFromRow);
  const general = generalFromRow(generalRows[0]);
  const publicSettings = await buildBookingSettingsFromSetup({
    services,
    addons,
    optionGroups,
    openingHours,
    unavailableDates,
    timeSettings,
    formFields,
    general,
  });

  return {
    services,
    addons,
    optionGroups,
    openingHours,
    unavailableDates,
    timeSettings,
    formFields,
    general,
    publicSettings,
  };
};

export const getBookingSetupData = cache(_getBookingSetupData);

const buildBookingSettingsFromSetup = async (data: Omit<BookingSetupData, "publicSettings">): Promise<BookingSettings> => {
  const legacy = await getLegacySettings().catch(() => null);
  const visibleServices = data.services.filter((item) => item.isVisible);
  const vehicleGroup = data.optionGroups.find((group) => group.slug === "vehicle-category");
  const vehicleCategories: VehicleCategory[] = (vehicleGroup?.options || [])
    .filter((item) => item.isVisible)
    .map((item) => ({
      id: item.id,
      label: item.label,
      price: item.priceAdjustmentDkk,
      description: item.description,
    }));
  const toAddon = (item: BookingSetupAddon): AddOn => ({
    id: item.id,
    label: item.name,
    price: item.priceDkk,
    description: item.description,
    durationMinutes: item.durationMinutes,
    imageUrl: item.imageUrl,
  });
  const visibleAddons = data.addons.filter((item) => item.isVisible);
  const openHours = data.openingHours.filter((item) => item.isOpen);
  const firstOpen = openHours[0];
  const workingDays = Array.from(new Set(openHours.map((item) => item.weekday)));
  const catalog: ServiceCatalog = {
    packages: (visibleServices.length > 0 ? visibleServices : data.services).map((item) => {
      const defaultPkg = defaultServiceCatalog.packages.find((p) => p.id === item.id);
      const categoryPrices =
        Object.keys(item.categoryPrices).length > 0
          ? item.categoryPrices
          : (defaultPkg?.categoryPrices ?? {});
      return {
        id: item.id,
        title: item.name,
        description: item.shortDescription || item.description,
        duration: `${item.durationMinutes} min.`,
        estimatedMinutes: item.durationMinutes,
        badge: item.isFeatured ? "Featured" : item.icon || "",
        price: item.priceDkk,
        imageUrl: item.imageUrl,
        isFeatured: item.isFeatured,
        categoryPrices: Object.keys(categoryPrices).length > 0 ? categoryPrices : undefined,
      };
    }),
    vehicleCategories:
      vehicleCategories.length > 0 ? vehicleCategories : defaultBookingSettings.catalog.vehicleCategories,
    interiorAddOns: visibleAddons.filter((item) => item.addonCategory === "interior").map(toAddon),
    quantityAddOns: visibleAddons.filter((item) => item.addonCategory === "quantity").map(toAddon),
    exteriorAddOns: visibleAddons.filter((item) => item.addonCategory === "exterior").map(toAddon),
  };

  return {
    ...defaultBookingSettings,
    companyName: data.general.companyName,
    supportEmail: data.general.supportEmail,
    adminNotifyEmail: data.general.adminNotifyEmail,
    adminNotifyEmail2: data.general.adminNotifyEmail2,
    adminNotifyEmail3: data.general.adminNotifyEmail3,
    adminNotifyEmail4: data.general.adminNotifyEmail4,
    adminNotifyEmail5: data.general.adminNotifyEmail5,
    defaultBookingStatus:
      legacy?.default_booking_status === "approved" ? "approved" : defaultBookingSettings.defaultBookingStatus,
    startHour: Number(firstOpen?.startTime.slice(0, 2) || defaultBookingSettings.startHour),
    endHour: Number(firstOpen?.endTime.slice(0, 2) || defaultBookingSettings.endHour),
    slotMinutes: data.timeSettings.slotIntervalMinutes,
    bufferBeforeMinutes: data.timeSettings.bufferBeforeMinutes,
    bufferAfterMinutes: data.timeSettings.bufferAfterMinutes,
    travelBufferMinutes: data.timeSettings.bufferAfterMinutes,
    workingDays: workingDays.length > 0 ? workingDays : defaultBookingSettings.workingDays,
    catalog,
    serviceAreas: Array.isArray(legacy?.service_areas_json)
      ? legacy.service_areas_json
      : defaultBookingSettings.serviceAreas,
    emailAutomation: {
      ...defaultEmailAutomation,
      ...(legacy?.email_automation_json || {}),
      customerOnCreate: data.general.customerConfirmationEnabled,
      adminOnCreate: data.general.adminNotificationEnabled,
    },
    bookingEnabled: data.general.bookingEnabled,
    disabledMessage: data.general.disabledMessage,
    maximumDaysAhead: data.timeSettings.maximumDaysAhead,
    minimumNoticeHours: data.timeSettings.minimumNoticeHours,
    maxBookingsPerSlot: data.timeSettings.maxBookingsPerSlot,
    maxBookingsPerDay: data.timeSettings.maxBookingsPerDay,
    allowSameDayBooking: data.timeSettings.allowSameDayBooking,
    vatRate: data.general.vatRate,
  };
};

export const getPublicBookingConfig = async () => {
  const data = await getBookingSetupData();
  return {
    services: data.services.filter((item) => item.isVisible),
    addons: data.addons.filter((item) => item.isVisible),
    optionGroups: data.optionGroups
      .filter((group) => group.isVisible)
      .map((group) => ({
        ...group,
        options: group.options.filter((option) => option.isVisible),
      })),
    openingHours: data.openingHours.filter((item) => item.isOpen),
    unavailableDates: data.unavailableDates,
    timeSettings: data.timeSettings,
    formFields: data.formFields.filter((field) => field.isVisible),
    general: {
      bookingEnabled: data.general.bookingEnabled,
      disabledMessage: data.general.disabledMessage,
      currency: data.general.currency,
      vatRate: data.general.vatRate,
      supportEmail: data.general.supportEmail,
      cancellationPolicyText: data.general.cancellationPolicyText,
      successMessage: data.general.successMessage,
    },
    settings: data.publicSettings,
  };
};

export const getBookingSettingsFromSetup = async () => {
  const data = await getBookingSetupData();
  return data.publicSettings;
};

export const getSetupAvailabilityBlocks = async (): Promise<AvailabilityBlock[]> => {
  const data = await getBookingSetupData();
  return data.unavailableDates.map((item) => ({
    id: item.id,
    startDate: item.startDate,
    endDate: item.endDate,
    startTime: item.isFullDay ? "00:00" : item.startTime,
    endTime: item.isFullDay ? "23:59" : item.endTime,
    reason: item.title,
  }));
};

export const calculateBookingPriceFromSetup = async (input: {
  packageId: string;
  addonIds: string[];
  categoryLabel: string;
  postalCode: string;
  settings?: BookingSettings;
}) => {
  const settings = input.settings ?? (await getBookingSettingsFromSetup());
  const pkg = getCatalogPackage(settings.catalog, input.packageId);
  const category =
    settings.catalog.vehicleCategories.find(
      (item) => item.label === input.categoryLabel || item.id === input.categoryLabel
    ) || settings.catalog.vehicleCategories[0];
  const allAddons = [
    ...settings.catalog.interiorAddOns,
    ...settings.catalog.exteriorAddOns,
    ...settings.catalog.quantityAddOns,
  ];
  const addonSet = new Set(input.addonIds);
  const selectedAddons = allAddons
    .filter((item) => addonSet.has(item.id))
    .map((item) => ({
      id: item.id,
      label: item.label,
      price: Number(item.price || 0),
    }));
  const catSpecificPrice =
    pkg?.categoryPrices && category?.id != null
      ? (pkg.categoryPrices[category.id] ?? pkg.categoryPrices[category.label])
      : undefined;
  const basePrice =
    catSpecificPrice != null
      ? Number(catSpecificPrice)
      : Number(pkg?.price || 0) > 0
        ? Number(pkg.price)
        : Number(category?.price || 0);
  const addonsTotal = selectedAddons.reduce((sum, item) => sum + Number(item.price || 0), 0);
  const matchedArea = findMatchingServiceArea(input.postalCode, settings.serviceAreas);
  const travelSurcharge = Number(matchedArea?.surcharge || 0);

  return {
    packageId: pkg?.id || input.packageId,
    packageLabel: pkg?.title || "Booking",
    addons: selectedAddons,
    subtotal: basePrice,
    travelSurcharge,
    total: basePrice + addonsTotal + travelSurcharge,
    estimatedMinutes:
      Number(pkg?.estimatedMinutes || 0) +
      selectedAddons.reduce((sum, addon) => {
        const full = allAddons.find((item) => item.id === addon.id);
        return sum + Number(full?.durationMinutes || 0);
      }, 0),
    category: category?.label || input.categoryLabel,
  } satisfies BookingPricingResult;
};

export const upsertBookingGeneralSettings = async (input: Partial<BookingGeneralSettings>) => {
  await ensureBookingSetupSeeded();
  const current = (await getBookingSetupData()).general;
  const next = { ...current, ...input };
  const sql = getSql();
  await sql`
    ALTER TABLE booking_general_settings
      ADD COLUMN IF NOT EXISTS admin_notify_email_2 TEXT NOT NULL DEFAULT '',
      ADD COLUMN IF NOT EXISTS admin_notify_email_3 TEXT NOT NULL DEFAULT '',
      ADD COLUMN IF NOT EXISTS admin_notify_email_4 TEXT NOT NULL DEFAULT '',
      ADD COLUMN IF NOT EXISTS admin_notify_email_5 TEXT NOT NULL DEFAULT '';
  `.catch(() => null);
  await sql`
    UPDATE booking_general_settings
    SET
      booking_enabled = ${next.bookingEnabled},
      disabled_message = ${next.disabledMessage},
      currency = ${next.currency},
      vat_rate = ${next.vatRate},
      company_name = ${next.companyName},
      support_email = ${next.supportEmail},
      admin_notify_email = ${next.adminNotifyEmail},
      admin_notify_email_2 = ${next.adminNotifyEmail2},
      admin_notify_email_3 = ${next.adminNotifyEmail3},
      admin_notify_email_4 = ${next.adminNotifyEmail4},
      admin_notify_email_5 = ${next.adminNotifyEmail5},
      customer_confirmation_enabled = ${next.customerConfirmationEnabled},
      admin_notification_enabled = ${next.adminNotificationEnabled},
      cancellation_policy_text = ${next.cancellationPolicyText},
      success_message = ${next.successMessage},
      updated_at = NOW()
    WHERE settings_key = 'default';
  `;
};

export const saveBookingService = async (
  input: Partial<BookingSetupService> & { id?: string; name: string; categoryPrices?: Record<string, number> }
) => {
  await ensureBookingSetupSeeded();
  const sql = getSql();
  const id = input.id || createId("bsv");
  const categoryPrices = input.categoryPrices ?? {};
  await sql`
    INSERT INTO booking_services (
      id, name, slug, short_description, description, price_dkk, duration_minutes,
      image_url, icon, sort_order, is_visible, is_featured, category_prices_json
    )
    VALUES (
      ${id}, ${input.name}, ${input.slug || uniqueSlug(input.name)},
      ${input.shortDescription || ""}, ${input.description || ""},
      ${Number(input.priceDkk || 0)}, ${Number(input.durationMinutes || 60)},
      ${input.imageUrl || ""}, ${input.icon || ""}, ${Number(input.sortOrder || 0)},
      ${input.isVisible !== false}, ${Boolean(input.isFeatured)},
      ${sql.json(categoryPrices)}
    )
    ON CONFLICT (id)
    DO UPDATE SET
      name = EXCLUDED.name,
      short_description = EXCLUDED.short_description,
      description = EXCLUDED.description,
      price_dkk = EXCLUDED.price_dkk,
      duration_minutes = EXCLUDED.duration_minutes,
      icon = EXCLUDED.icon,
      sort_order = EXCLUDED.sort_order,
      is_visible = EXCLUDED.is_visible,
      is_featured = EXCLUDED.is_featured,
      category_prices_json = EXCLUDED.category_prices_json,
      updated_at = NOW();
  `;
  return id;
};

export const setBookingServiceImage = async (id: string, imageUrl: string) => {
  await ensureBookingSetupSeeded();
  await getSql()`
    UPDATE booking_services SET image_url = ${imageUrl}, updated_at = NOW()
    WHERE id = ${id};
  `;
};

export const deleteBookingService = async (id: string) => {
  await ensureBookingSetupSeeded();
  await getSql()`DELETE FROM booking_services WHERE id = ${id};`;
};

export const saveBookingAddon = async (
  input: Partial<BookingSetupAddon> & { id?: string; name: string }
) => {
  await ensureBookingSetupSeeded();
  const sql = getSql();
  const id = input.id || createId("bad");
  await sql`
    INSERT INTO booking_addons (
      id, name, slug, description, price_dkk, duration_minutes, image_url,
      addon_category, sort_order, is_visible, allowed_service_ids
    )
    VALUES (
      ${id}, ${input.name}, ${input.slug || uniqueSlug(input.name)},
      ${input.description || ""}, ${Number(input.priceDkk || 0)},
      ${Number(input.durationMinutes || 0)}, ${input.imageUrl || ""},
      ${input.addonCategory || "interior"}, ${Number(input.sortOrder || 0)},
      ${input.isVisible !== false}, ${sql.json(input.allowedServiceIds || [])}
    )
    ON CONFLICT (id)
    DO UPDATE SET
      name = EXCLUDED.name,
      description = EXCLUDED.description,
      price_dkk = EXCLUDED.price_dkk,
      duration_minutes = EXCLUDED.duration_minutes,
      addon_category = EXCLUDED.addon_category,
      sort_order = EXCLUDED.sort_order,
      is_visible = EXCLUDED.is_visible,
      allowed_service_ids = EXCLUDED.allowed_service_ids,
      updated_at = NOW();
  `;
  return id;
};

export const setBookingAddonImage = async (id: string, imageUrl: string) => {
  await ensureBookingSetupSeeded();
  await getSql()`
    UPDATE booking_addons SET image_url = ${imageUrl}, updated_at = NOW()
    WHERE id = ${id};
  `;
};

export const deleteBookingAddon = async (id: string) => {
  await ensureBookingSetupSeeded();
  await getSql()`DELETE FROM booking_addons WHERE id = ${id};`;
};

export const saveBookingOption = async (
  input: Partial<BookingSetupOption> & { id?: string; groupId: string; label: string }
) => {
  await ensureBookingSetupSeeded();
  const sql = getSql();
  const id = input.id || createId("bop");
  await sql`
    INSERT INTO booking_options (
      id, group_id, label, slug, description, price_adjustment_dkk,
      duration_adjustment_minutes, image_url, sort_order, is_visible, is_required
    )
    VALUES (
      ${id}, ${input.groupId}, ${input.label}, ${input.slug || uniqueSlug(input.label)},
      ${input.description || ""}, ${Number(input.priceAdjustmentDkk || 0)},
      ${Number(input.durationAdjustmentMinutes || 0)}, ${input.imageUrl || ""},
      ${Number(input.sortOrder || 0)}, ${input.isVisible !== false}, ${Boolean(input.isRequired)}
    )
    ON CONFLICT (id)
    DO UPDATE SET
      label = EXCLUDED.label,
      description = EXCLUDED.description,
      price_adjustment_dkk = EXCLUDED.price_adjustment_dkk,
      duration_adjustment_minutes = EXCLUDED.duration_adjustment_minutes,
      sort_order = EXCLUDED.sort_order,
      is_visible = EXCLUDED.is_visible,
      is_required = EXCLUDED.is_required,
      updated_at = NOW();
  `;
  return id;
};

export const deleteBookingOption = async (id: string) => {
  await ensureBookingSetupSeeded();
  await getSql()`DELETE FROM booking_options WHERE id = ${id};`;
};

export const saveOpeningHours = async (
  entries: Array<{ weekday: number; isOpen: boolean; startTime: string; endTime: string }>
) => {
  await ensureBookingSetupSeeded();
  const sql = getSql();
  for (const entry of entries) {
    await sql`
      INSERT INTO booking_opening_hours (
        id, weekday, range_index, is_open, start_time, end_time
      )
      VALUES (
        ${`boh_${entry.weekday}`}, ${entry.weekday}, 0, ${entry.isOpen},
        ${entry.startTime}, ${entry.endTime}
      )
      ON CONFLICT (weekday, range_index)
      DO UPDATE SET
        is_open = EXCLUDED.is_open,
        start_time = EXCLUDED.start_time,
        end_time = EXCLUDED.end_time,
        updated_at = NOW();
    `;
  }
};

export const saveUnavailableDate = async (
  input: Partial<BookingUnavailableDate> & { id?: string; startDate: string; title: string }
) => {
  await ensureBookingSetupSeeded();
  const sql = getSql();
  const id = input.id || createId("bud");
  await sql`
    INSERT INTO booking_unavailable_dates (
      id, start_date, end_date, title, start_time, end_time, is_full_day, repeat_yearly
    )
    VALUES (
      ${id}, ${input.startDate}, ${input.endDate || input.startDate}, ${input.title},
      ${input.startTime || "00:00"}, ${input.endTime || "23:59"},
      ${input.isFullDay !== false}, ${Boolean(input.repeatYearly)}
    )
    ON CONFLICT (id)
    DO UPDATE SET
      start_date = EXCLUDED.start_date,
      end_date = EXCLUDED.end_date,
      title = EXCLUDED.title,
      start_time = EXCLUDED.start_time,
      end_time = EXCLUDED.end_time,
      is_full_day = EXCLUDED.is_full_day,
      repeat_yearly = EXCLUDED.repeat_yearly,
      updated_at = NOW();
  `;
  return id;
};

export const deleteUnavailableDate = async (id: string) => {
  await ensureBookingSetupSeeded();
  await getSql()`DELETE FROM booking_unavailable_dates WHERE id = ${id};`;
};

export const saveTimeSettings = async (input: Partial<BookingTimeSettings>) => {
  await ensureBookingSetupSeeded();
  const current = (await getBookingSetupData()).timeSettings;
  const next = { ...current, ...input };
  await getSql()`
    UPDATE booking_time_settings
    SET
      slot_interval_minutes = ${next.slotIntervalMinutes},
      minimum_notice_hours = ${next.minimumNoticeHours},
      maximum_days_ahead = ${next.maximumDaysAhead},
      buffer_before_minutes = ${next.bufferBeforeMinutes},
      buffer_after_minutes = ${next.bufferAfterMinutes},
      max_bookings_per_slot = ${next.maxBookingsPerSlot},
      max_bookings_per_day = ${next.maxBookingsPerDay},
      allow_same_day_booking = ${next.allowSameDayBooking},
      updated_at = NOW()
    WHERE settings_key = 'default';
  `;
};

export const saveFormFields = async (fields: BookingFormField[]) => {
  await ensureBookingSetupSeeded();
  const sql = getSql();
  for (const field of fields) {
    await sql`
      UPDATE booking_form_fields
      SET
        label = ${field.label},
        placeholder = ${field.placeholder},
        help_text = ${field.helpText},
        is_visible = ${field.isVisible},
        is_required = ${field.isRequired},
        sort_order = ${field.sortOrder},
        updated_at = NOW()
      WHERE field_key = ${field.fieldKey};
    `;
  }
};
