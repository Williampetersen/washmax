import type { Sql, TransactionSql } from "postgres";
import { ensureSchema, getSql, isDatabaseConfigured } from "@/lib/server/db";
import {
  defaultBookingSettings,
  timeStringToMinutes,
  type AvailabilityBlock,
  type BookingSettings,
} from "@/lib/shared/booking";

export const BOOKING_TIME_ZONE = "Europe/Copenhagen";
export const SLOT_UNAVAILABLE_MESSAGE =
  "This time slot is no longer available. Please choose another time.";

type SqlClient = Sql | TransactionSql;

type RawAgent = {
  id: string;
  status: string;
  assigned_services_json: string[] | null;
};

type RawAgentAvailability = {
  start_time: string | Date;
  end_time: string | Date;
  break_start_time: string | Date | null;
  break_end_time: string | Date | null;
  is_available: boolean;
};

type RawAgentUnavailableDate = {
  start_date: string | Date;
  end_date: string | Date;
};

type RawBookingForAvailability = {
  id: string;
  appointment_date: string | Date;
  appointment_time: string | Date;
  estimated_duration_minutes: number;
};

type RawSetupUnavailableDate = {
  id: string;
  start_date: string | Date;
  end_date: string | Date;
  title: string;
  start_time: string | Date;
  end_time: string | Date;
  is_full_day: boolean;
};

type RawLegacyAvailabilityBlock = {
  id: string;
  start_date: string | Date;
  end_date: string | Date;
  start_time: string | Date;
  end_time: string | Date;
  reason: string;
};

type AvailabilityWindow = {
  startTime: string;
  endTime: string;
  breakStartTime?: string;
  breakEndTime?: string;
};

export type SlotAvailabilityInput = {
  appointmentDate: string;
  appointmentTime: string;
  durationMinutes: number;
  settings: BookingSettings;
  agentId?: string;
  excludeBookingId?: string;
};

export type SlotAvailabilityResult = {
  available: boolean;
  agentId: string;
  reason?: string;
};

export type AvailableSlotsInput = {
  date: string;
  durationMinutes: number;
  settings: BookingSettings;
  agentId?: string;
};

const formatterCache = new Map<string, Intl.DateTimeFormat>();

const getFormatter = (options: Intl.DateTimeFormatOptions, tz = BOOKING_TIME_ZONE) => {
  const key = `${tz}:${JSON.stringify(options)}`;
  const cached = formatterCache.get(key);
  if (cached) return cached;
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    hourCycle: "h23",
    ...options,
  });
  formatterCache.set(key, formatter);
  return formatter;
};

const toDateText = (value: unknown, tz = BOOKING_TIME_ZONE) => {
  if (value instanceof Date) {
    const parts = getFormatter({
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }, tz).formatToParts(value);
    const year = parts.find((part) => part.type === "year")?.value || "0000";
    const month = parts.find((part) => part.type === "month")?.value || "01";
    const day = parts.find((part) => part.type === "day")?.value || "01";
    return `${year}-${month}-${day}`;
  }

  const text = String(value ?? "").trim();
  return text.length >= 10 ? text.slice(0, 10) : text;
};

const toTimeText = (value: unknown, fallback = "00:00", tz = BOOKING_TIME_ZONE) => {
  if (value instanceof Date) {
    const parts = getFormatter({
      hour: "2-digit",
      minute: "2-digit",
    }, tz).formatToParts(value);
    const hour = parts.find((part) => part.type === "hour")?.value || "00";
    const minute = parts.find((part) => part.type === "minute")?.value || "00";
    return `${hour}:${minute}`;
  }

  const text = String(value ?? "").trim();
  return text ? text.slice(0, 5) : fallback;
};

const parseDate = (dateValue: string) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateValue);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return { year, month, day };
};

const parseTime = (timeValue: string) => {
  const match = /^(\d{2}):(\d{2})$/.exec(timeValue);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
  return { hours, minutes };
};

const getZonedParts = (date: Date, tz = BOOKING_TIME_ZONE) => {
  const parts = getFormatter({
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }, tz).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value || 0);

  return {
    year: value("year"),
    month: value("month"),
    day: value("day"),
    hour: value("hour"),
    minute: value("minute"),
    second: value("second"),
  };
};

const getTimeZoneOffsetMs = (date: Date, tz = BOOKING_TIME_ZONE) => {
  const parts = getZonedParts(date, tz);
  const asUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );
  return asUtc - date.getTime();
};

export const zonedDateTimeToUtc = (dateValue: string, timeValue: string, tz = BOOKING_TIME_ZONE) => {
  const date = parseDate(dateValue);
  const time = parseTime(timeValue);
  if (!date || !time) return null;

  const utcGuess = Date.UTC(date.year, date.month - 1, date.day, time.hours, time.minutes, 0);
  const first = new Date(utcGuess - getTimeZoneOffsetMs(new Date(utcGuess), tz));
  return new Date(utcGuess - getTimeZoneOffsetMs(first, tz));
};

export const getCopenhagenNow = (tz = BOOKING_TIME_ZONE, now = new Date()) => {
  const parts = getZonedParts(now, tz);
  return {
    date: `${parts.year.toString().padStart(4, "0")}-${parts.month
      .toString()
      .padStart(2, "0")}-${parts.day.toString().padStart(2, "0")}`,
    minutes: parts.hour * 60 + parts.minute,
    instant: now,
  };
};

const dateToUtcNoon = (dateValue: string) => {
  const parsed = parseDate(dateValue);
  if (!parsed) return null;
  return new Date(Date.UTC(parsed.year, parsed.month - 1, parsed.day, 12));
};

const addDays = (dateValue: string, days: number) => {
  const date = dateToUtcNoon(dateValue);
  if (!date) return dateValue;
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
};

const getWeekday = (dateValue: string) => {
  const date = dateToUtcNoon(dateValue);
  return date ? date.getUTCDay() : -1;
};

const isDateInRange = (dateValue: string, startDate: string, endDate: string) =>
  dateValue >= startDate && dateValue <= endDate;

const settingsBufferBefore = (settings: BookingSettings) =>
  Math.max(0, Number(settings.bufferBeforeMinutes ?? defaultBookingSettings.bufferBeforeMinutes ?? 0));

const settingsBufferAfter = (settings: BookingSettings) =>
  Math.max(
    0,
    Number(
      settings.bufferAfterMinutes ??
        settings.travelBufferMinutes ??
        defaultBookingSettings.bufferAfterMinutes ??
        0
    )
  );

const getActiveAgents = async (sql: SqlClient) => {
  const rows = await sql<RawAgent[]>`
    SELECT id, status, assigned_services_json
    FROM agents
    WHERE status = 'active'
    ORDER BY created_at ASC;
  `;
  return rows;
};

export const resolveDefaultBookingAgentId = async (sql: SqlClient = getSql(), agentId?: string) => {
  const requestedAgentId = String(agentId || "").trim();
  const agents = await getActiveAgents(sql);

  if (requestedAgentId) {
    return agents.some((agent) => agent.id === requestedAgentId) ? requestedAgentId : "";
  }

  return agents.length === 1 ? agents[0].id : "";
};

const getAvailabilityWindow = async (
  sql: SqlClient,
  dateValue: string,
  settings: BookingSettings,
  agentId: string
): Promise<AvailabilityWindow | null> => {
  const weekday = getWeekday(dateValue);
  if (weekday < 0) return null;

  if (agentId) {
    const unavailableRows = await sql<RawAgentUnavailableDate[]>`
      SELECT start_date, end_date
      FROM agent_unavailable_dates
      WHERE agent_id = ${agentId}
        AND start_date <= ${dateValue}
        AND end_date >= ${dateValue};
    `;
    if (unavailableRows.length > 0) return null;

    const [availability] = await sql<RawAgentAvailability[]>`
      SELECT start_time, end_time, break_start_time, break_end_time, is_available
      FROM agent_availability
      WHERE agent_id = ${agentId}
        AND weekday = ${weekday}
      LIMIT 1;
    `;

    if (availability) {
      if (!availability.is_available) return null;
      return {
        startTime: toTimeText(availability.start_time, "09:00"),
        endTime: toTimeText(availability.end_time, "17:00"),
        breakStartTime: toTimeText(availability.break_start_time, ""),
        breakEndTime: toTimeText(availability.break_end_time, ""),
      };
    }
  }

  if (!settings.workingDays.includes(weekday)) return null;
  return {
    startTime: `${Math.max(0, Math.min(23, Number(settings.startHour) || 8))
      .toString()
      .padStart(2, "0")}:00`,
    endTime: `${Math.max(1, Math.min(24, Number(settings.endHour) || 18))
      .toString()
      .padStart(2, "0")}:00`,
  };
};

const getGlobalAvailabilityBlocks = async (sql: SqlClient): Promise<AvailabilityBlock[]> => {
  const [setupRows, legacyRows] = await Promise.all([
    sql<RawSetupUnavailableDate[]>`
      SELECT id, start_date, end_date, title, start_time, end_time, is_full_day
      FROM booking_unavailable_dates;
    `,
    sql<RawLegacyAvailabilityBlock[]>`
      SELECT id, start_date, end_date, start_time, end_time, reason
      FROM availability_blocks;
    `.catch(() => [] as RawLegacyAvailabilityBlock[]),
  ]);

  return [
    ...setupRows.map((row) => ({
      id: String(row.id),
      startDate: toDateText(row.start_date),
      endDate: toDateText(row.end_date),
      startTime: row.is_full_day ? "00:00" : toTimeText(row.start_time, "00:00"),
      endTime: row.is_full_day ? "23:59" : toTimeText(row.end_time, "23:59"),
      reason: String(row.title || "Blokeret"),
    })),
    ...legacyRows.map((row) => ({
      id: String(row.id),
      startDate: toDateText(row.start_date),
      endDate: toDateText(row.end_date),
      startTime: toTimeText(row.start_time, "00:00"),
      endTime: toTimeText(row.end_time, "23:59"),
      reason: String(row.reason || "Blokeret"),
    })),
  ];
};

const isBlockedByGlobalBlock = (
  dateValue: string,
  timeValue: string,
  durationMinutes: number,
  blocks: AvailabilityBlock[]
) => {
  const start = timeStringToMinutes(timeValue);
  const end = start + durationMinutes;

  return blocks.some((block) => {
    if (!isDateInRange(dateValue, block.startDate, block.endDate)) return false;
    const blockStart = timeStringToMinutes(block.startTime || "00:00");
    const blockEnd = timeStringToMinutes(block.endTime || "23:59");
    return start < blockEnd && end > blockStart;
  });
};

const getRelevantBookings = async (
  sql: SqlClient,
  dateValue: string,
  agentId: string,
  excludeBookingId = ""
) => {
  const startDate = addDays(dateValue, -1);
  const endDate = addDays(dateValue, 1);

  if (agentId) {
    return sql<RawBookingForAvailability[]>`
      SELECT id, appointment_date, appointment_time, estimated_duration_minutes
      FROM bookings
      WHERE status <> 'cancelled'
        AND appointment_date BETWEEN ${startDate} AND ${endDate}
        AND (${excludeBookingId} = '' OR id <> ${excludeBookingId})
        AND (assigned_agent_id = ${agentId} OR assigned_agent_id IS NULL)
      ORDER BY appointment_date ASC, appointment_time ASC;
    `;
  }

  return sql<RawBookingForAvailability[]>`
    SELECT id, appointment_date, appointment_time, estimated_duration_minutes
    FROM bookings
    WHERE status <> 'cancelled'
      AND appointment_date BETWEEN ${startDate} AND ${endDate}
      AND (${excludeBookingId} = '' OR id <> ${excludeBookingId})
    ORDER BY appointment_date ASC, appointment_time ASC;
  `;
};

const getOccupiedPeriod = (
  dateValue: string,
  timeValue: string,
  durationMinutes: number,
  settings: BookingSettings
) => {
  const start = zonedDateTimeToUtc(dateValue, timeValue, settingsTimeZone(settings));
  if (!start) return null;

  const serviceStart = start.getTime();
  const serviceEnd = serviceStart + Math.max(1, durationMinutes) * 60_000;
  return {
    start: serviceStart - settingsBufferBefore(settings) * 60_000,
    end: serviceEnd + settingsBufferAfter(settings) * 60_000,
  };
};

const periodsOverlap = (
  left: { start: number; end: number },
  right: { start: number; end: number }
) => left.start < right.end && left.end > right.start;

const slotFitsWindow = (
  timeValue: string,
  durationMinutes: number,
  window: AvailabilityWindow
) => {
  const start = timeStringToMinutes(timeValue);
  const end = start + durationMinutes;
  const windowStart = timeStringToMinutes(window.startTime);
  const windowEnd = timeStringToMinutes(window.endTime);

  if (start < windowStart || end > windowEnd) return false;

  if (window.breakStartTime && window.breakEndTime) {
    const breakStart = timeStringToMinutes(window.breakStartTime);
    const breakEnd = timeStringToMinutes(window.breakEndTime);
    if (start < breakEnd && end > breakStart) return false;
  }

  return true;
};

const settingsTimeZone = (settings: BookingSettings) =>
  settings.timeZone || BOOKING_TIME_ZONE;

const passesCurrentTimeRules = (
  dateValue: string,
  timeValue: string,
  settings: BookingSettings,
  now = getCopenhagenNow(settingsTimeZone(settings))
) => {
  if (settings.allowSameDayBooking === false && dateValue === now.date) return false;
  if (dateValue < now.date) return false;
  if (dateValue !== now.date) return true;

  const minimumNoticeMinutes = Math.max(0, Number(settings.minimumNoticeHours || 0)) * 60;
  return timeStringToMinutes(timeValue) > now.minutes + minimumNoticeMinutes;
};

const withinMaximumAdvanceWindow = (dateValue: string, settings: BookingSettings) => {
  const maximumDaysAhead = Number(settings.maximumDaysAhead || 0);
  if (!maximumDaysAhead) return true;
  const today = getCopenhagenNow(settingsTimeZone(settings)).date;
  return dateValue <= addDays(today, maximumDaysAhead);
};

export const checkBookingSlotAvailability = async (
  input: SlotAvailabilityInput,
  sql: SqlClient = getSql()
): Promise<SlotAvailabilityResult> => {
  if (!parseDate(input.appointmentDate) || !parseTime(input.appointmentTime)) {
    return { available: false, agentId: "", reason: "Invalid date or time." };
  }

  const durationMinutes = Math.max(1, Number(input.durationMinutes || input.settings.slotMinutes));
  const agentId = await resolveDefaultBookingAgentId(sql, input.agentId);
  const window = await getAvailabilityWindow(sql, input.appointmentDate, input.settings, agentId);

  if (!window || !slotFitsWindow(input.appointmentTime, durationMinutes, window)) {
    return { available: false, agentId, reason: SLOT_UNAVAILABLE_MESSAGE };
  }

  if (
    !passesCurrentTimeRules(input.appointmentDate, input.appointmentTime, input.settings) ||
    !withinMaximumAdvanceWindow(input.appointmentDate, input.settings)
  ) {
    return { available: false, agentId, reason: SLOT_UNAVAILABLE_MESSAGE };
  }

  const blocks = await getGlobalAvailabilityBlocks(sql);
  if (
    isBlockedByGlobalBlock(input.appointmentDate, input.appointmentTime, durationMinutes, blocks)
  ) {
    return { available: false, agentId, reason: SLOT_UNAVAILABLE_MESSAGE };
  }

  const newPeriod = getOccupiedPeriod(
    input.appointmentDate,
    input.appointmentTime,
    durationMinutes,
    input.settings
  );
  if (!newPeriod) {
    return { available: false, agentId, reason: "Invalid date or time." };
  }

  const existingBookings = await getRelevantBookings(
    sql,
    input.appointmentDate,
    agentId,
    input.excludeBookingId
  );

  const hasConflict = existingBookings.some((booking) => {
    const existingPeriod = getOccupiedPeriod(
      toDateText(booking.appointment_date),
      toTimeText(booking.appointment_time, "00:00"),
      Number(booking.estimated_duration_minutes || input.settings.slotMinutes),
      input.settings
    );
    return existingPeriod ? periodsOverlap(newPeriod, existingPeriod) : false;
  });

  return hasConflict
    ? { available: false, agentId, reason: SLOT_UNAVAILABLE_MESSAGE }
    : { available: true, agentId };
};

export const getAvailableBookingSlots = async (input: AvailableSlotsInput) => {
  if (!isDatabaseConfigured()) {
    return { slots: [] as string[], agentId: "" };
  }

  await ensureSchema();
  const sql = getSql();
  const agentId = await resolveDefaultBookingAgentId(sql, input.agentId);
  const window = await getAvailabilityWindow(sql, input.date, input.settings, agentId);
  if (!window || !withinMaximumAdvanceWindow(input.date, input.settings)) {
    return { slots: [] as string[], agentId };
  }

  const durationMinutes = Math.max(1, Number(input.durationMinutes || input.settings.slotMinutes));
  const intervalMinutes = Math.max(15, Number(input.settings.slotMinutes || 30));
  const start = timeStringToMinutes(window.startTime);
  const end = timeStringToMinutes(window.endTime);

  // Pre-fetch all shared data in parallel — one round-trip instead of N×3.
  const [blocks, existingBookings] = await Promise.all([
    getGlobalAvailabilityBlocks(sql),
    getRelevantBookings(sql, input.date, agentId),
  ]);

  const now = getCopenhagenNow(settingsTimeZone(input.settings));
  const slots: string[] = [];

  for (let minutes = start; minutes + durationMinutes <= end; minutes += intervalMinutes) {
    const hours = Math.floor(minutes / 60).toString().padStart(2, "0");
    const mins = (minutes % 60).toString().padStart(2, "0");
    const slot = `${hours}:${mins}`;

    if (!slotFitsWindow(slot, durationMinutes, window)) continue;
    if (!passesCurrentTimeRules(input.date, slot, input.settings, now)) continue;
    if (isBlockedByGlobalBlock(input.date, slot, durationMinutes, blocks)) continue;

    const newPeriod = getOccupiedPeriod(input.date, slot, durationMinutes, input.settings);
    if (!newPeriod) continue;

    const hasConflict = existingBookings.some((booking) => {
      const existingPeriod = getOccupiedPeriod(
        toDateText(booking.appointment_date),
        toTimeText(booking.appointment_time, "00:00"),
        Number(booking.estimated_duration_minutes || input.settings.slotMinutes),
        input.settings
      );
      return existingPeriod ? periodsOverlap(newPeriod, existingPeriod) : false;
    });

    if (!hasConflict) slots.push(slot);
  }

  return { slots, agentId };
};

export const getBookingSlotLockKey = (dateValue: string, agentId: string) =>
  `booking:${agentId || "admin"}:${dateValue}`;
