"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Clock3, type LucideIcon } from "lucide-react";
import { BookingDetailDrawer } from "@/components/admin/booking-detail-drawer";
import { GlassCard } from "@/components/admin/glass-card";
import type { DashboardBooking, DashboardData } from "@/lib/server/bookings";
import { timeStringToMinutes, type BookingStatus } from "@/lib/shared/booking";
import { cn } from "@/lib/utils";

type CalendarMode = "day" | "week";

export function AdminCalendarPanel({
  bookings,
  calendar,
  searchQuery,
  timeSlots,
  today,
}: {
  bookings: DashboardBooking[];
  calendar: DashboardData["calendar"];
  searchQuery: string;
  timeSlots: string[];
  today: string;
}) {
  const [calendarMode, setCalendarMode] = useState<CalendarMode>("week");
  const [calendarDate, setCalendarDate] = useState(today);
  const [selectedBooking, setSelectedBooking] = useState<DashboardBooking | null>(null);

  const filteredBookings = useMemo(
    () =>
      bookings
        .filter((booking) => matchesSearch(booking, searchQuery))
        .sort(sortDashboardBookings),
    [bookings, searchQuery]
  );
  const days = getCalendarDays(calendar, calendarDate, calendarMode);
  const bookingMap = new Map(filteredBookings.map((booking) => [booking.id, booking]));
  const blockedSlots = days.reduce(
    (count, day) => count + day.blocks.length,
    0
  );

  return (
    <>
      <div className="space-y-5">
        <div className="grid gap-3 md:grid-cols-3">
          <CalendarMetric
            icon={CalendarDays}
            label="Visible days"
            value={days.length.toString()}
            detail={calendarMode === "week" ? "Week view" : "Day view"}
          />
          <CalendarMetric
            icon={Clock3}
            label="Bookings"
            value={filteredBookings.length.toString()}
            detail="Matching calendar records"
          />
          <CalendarMetric
            icon={Clock3}
            label="Blocked time"
            value={blockedSlots.toString()}
            detail="Availability blocks"
          />
        </div>

        <GlassCard className="overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-white/55 px-4 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[14px] font-semibold text-[#111827]">Calendar</p>
              <p className="mt-1 text-[12px] font-medium text-[#6B7280]">
                Day/week appointments, blocked time, and empty slots
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="date"
                value={calendarDate}
                onChange={(event) => setCalendarDate(event.target.value || today)}
                className="h-9 rounded-2xl border border-[#DCEEF2] bg-white/70 px-3 text-[13px] font-medium text-[#111827] outline-none transition focus:border-[#00A7B8] focus:ring-4 focus:ring-[#00A7B8]/10"
              />
              <div className="rounded-2xl border border-[#DCEEF2] bg-white/55 p-1">
                {(["day", "week"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setCalendarMode(mode)}
                    className={cn(
                      "h-7 rounded-xl px-3 text-[12px] font-semibold capitalize transition duration-[250ms]",
                      calendarMode === mode
                        ? "bg-[#00A7B8] text-white shadow-[0_8px_20px_rgba(0,167,184,0.18)]"
                        : "text-[#6B7280] hover:bg-white/70 hover:text-[#111827]"
                    )}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[760px]">
              <div
                className="grid border-b border-white/55"
                style={{ gridTemplateColumns: `5rem repeat(${days.length}, minmax(9rem, 1fr))` }}
              >
                <div className="border-r border-white/55 px-3 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
                  Time
                </div>
                {days.map((day) => (
                  <div key={day.date} className="border-r border-white/55 px-3 py-3 last:border-r-0">
                    <p className="text-[13px] font-semibold text-[#111827]">{day.label}</p>
                    <p className="mt-1 text-[12px] font-medium text-[#6B7280]">{day.date}</p>
                  </div>
                ))}
              </div>

              {timeSlots.slice(0, 16).map((slot) => (
                <div
                  key={slot}
                  className="grid border-b border-white/45 last:border-b-0"
                  style={{ gridTemplateColumns: `5rem repeat(${days.length}, minmax(9rem, 1fr))` }}
                >
                  <div className="border-r border-white/55 px-3 py-3 text-[12px] font-semibold text-[#6B7280]">
                    {slot}
                  </div>
                  {days.map((day) => {
                    const slotBookings = day.bookings
                      .filter((booking) => booking.appointmentTime === slot)
                      .map((booking) => bookingMap.get(booking.id))
                      .filter((booking): booking is DashboardBooking => Boolean(booking));
                    const block = day.blocks.find((item) => isSlotBlocked(slot, item.startTime, item.endTime));

                    return (
                      <div
                        key={`${day.date}-${slot}`}
                        className={cn(
                          "min-h-20 border-r border-white/55 px-2 py-2 last:border-r-0",
                          block ? "bg-[#F59E0B]/8" : ""
                        )}
                      >
                        {block ? (
                          <div className="mb-2 rounded-2xl border border-[#F59E0B]/25 bg-[#F59E0B]/10 px-2 py-1 text-[12px] font-semibold text-[#9A5B00]">
                            Blocked: {block.reason}
                          </div>
                        ) : null}
                        {slotBookings.length > 0 ? (
                          <div className="grid gap-2">
                            {slotBookings.map((booking) => (
                              <button
                                key={booking.id}
                                type="button"
                                onClick={() => setSelectedBooking(booking)}
                                className={cn(
                                  "rounded-2xl border px-3 py-2 text-left text-[12px] transition duration-[250ms] hover:-translate-y-0.5",
                                  getCalendarStatusClass(booking.status)
                                )}
                              >
                                <span className="block truncate font-semibold">
                                  {booking.customerName || booking.customerEmail}
                                </span>
                                <span className="mt-1 block truncate opacity-80">{booking.packageLabel}</span>
                              </button>
                            ))}
                          </div>
                        ) : !block ? (
                          <span className="text-[12px] font-medium text-[#94A3B8]">Available</span>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      <BookingDetailDrawer
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
        open={Boolean(selectedBooking)}
        timeSlots={timeSlots}
      />
    </>
  );
}

function CalendarMetric({
  detail,
  icon: Icon,
  label,
  value,
}: {
  detail: string;
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <GlassCard className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-medium text-[#6B7280]">{label}</p>
          <p className="mt-2 text-[22px] font-bold leading-none text-[#111827]">{value}</p>
          <p className="mt-2 text-[12px] font-medium text-[#6B7280]">{detail}</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EEFBFC] text-[#00A7B8]">
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </GlassCard>
  );
}

function matchesSearch(booking: DashboardBooking, query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return true;
  }

  const text = [
    booking.customerName,
    booking.customerEmail,
    booking.customerPhone,
    booking.registrationNumber,
    booking.plate,
    booking.packageLabel,
    booking.category,
    booking.city,
    booking.status,
    booking.paymentStatus,
  ]
    .join(" ")
    .toLowerCase();

  return text.includes(normalizedQuery);
}

function getCalendarDays(
  calendar: DashboardData["calendar"],
  date: string,
  mode: CalendarMode
) {
  const map = new Map(calendar.map((day) => [day.date, day]));
  const anchor = parseDateText(date);
  const start = mode === "week" ? getWeekStart(anchor) : anchor;
  const length = mode === "week" ? 7 : 1;

  return Array.from({ length }, (_, index) => {
    const current = new Date(start);
    current.setDate(start.getDate() + index);
    const key = toDateText(current);
    const existing = map.get(key);
    return {
      date: key,
      label: formatDayLabel(current),
      bookings: existing?.bookings || [],
      blocks: existing?.blocks || [],
    };
  });
}

function isSlotBlocked(slot: string, blockStart: string, blockEnd: string) {
  const slotStart = timeStringToMinutes(slot);
  const slotEnd = slotStart + 30;
  const start = timeStringToMinutes(blockStart || "00:00");
  const end = timeStringToMinutes(blockEnd || "23:59");
  return slotStart < end && slotEnd > start;
}

function getCalendarStatusClass(status: BookingStatus) {
  switch (status) {
    case "approved":
      return "border-[#10B981]/20 bg-[#10B981]/12 text-[#047857]";
    case "completed":
      return "border-[#00A7B8]/20 bg-[#00A7B8]/12 text-[#008A99]";
    case "cancelled":
      return "border-[#EF4444]/20 bg-[#EF4444]/12 text-[#B91C1C]";
    default:
      return "border-[#F59E0B]/20 bg-[#F59E0B]/12 text-[#92400E]";
  }
}

function parseDateText(value: string) {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function toDateText(date: Date) {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getWeekStart(date: Date) {
  const start = new Date(date);
  const day = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - day);
  start.setHours(0, 0, 0, 0);
  return start;
}

function formatDayLabel(date: Date) {
  try {
    return new Intl.DateTimeFormat("da-DK", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    }).format(date);
  } catch {
    return toDateText(date);
  }
}

function sortDashboardBookings(left: DashboardBooking, right: DashboardBooking) {
  return `${left.appointmentDate}T${left.appointmentTime}`.localeCompare(
    `${right.appointmentDate}T${right.appointmentTime}`
  );
}
