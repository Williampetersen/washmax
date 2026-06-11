"use client";

import { useMemo, useState } from "react";
import {
  BarChart3,
  CalendarClock,
  CheckCircle2,
  Clock3,
  CreditCard,
  ReceiptText,
  Settings2,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BookingDetailDrawer } from "@/components/admin/booking-detail-drawer";
import { GlassCard } from "@/components/admin/glass-card";
import { KpiCard } from "@/components/admin/kpi-card";
import { RecentBookingsTable } from "@/components/admin/recent-bookings-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { TodayBookings } from "@/components/admin/today-bookings";
import type { DashboardBooking, DashboardData } from "@/lib/server/bookings";
import {
  formatPrice,
  formatShortPrice,
  type BookingStatus,
} from "@/lib/shared/booking";

const chartPrimary = "#00A7B8";
const chartSecondary = "#99DFE7";

export function AdminCommandCenter({
  dashboard,
  searchQuery,
  timeSlots,
  today,
}: {
  dashboard: DashboardData;
  searchQuery: string;
  timeSlots: string[];
  today: string;
}) {
  const [selectedBooking, setSelectedBooking] = useState<DashboardBooking | null>(null);

  const upcomingBookings = useMemo(
    () =>
      dashboard.bookings
        .filter(
          (booking) =>
            booking.status !== "cancelled" &&
            `${booking.appointmentDate}T${booking.appointmentTime}` >= `${today}T00:00`
        )
        .sort(sortDashboardBookings),
    [dashboard.bookings, today]
  );

  const visibleBookings = useMemo(
    () =>
      dashboard.bookings
        .filter((booking) => matchesSearch(booking, searchQuery))
        .sort(sortRecentBookings),
    [dashboard.bookings, searchQuery]
  );

  const todayBookings = visibleBookings
    .filter((booking) => booking.appointmentDate === today && booking.status !== "cancelled")
    .sort(sortDashboardBookings);
  const pendingBookings = dashboard.bookings.filter((booking) => booking.status === "pending");
  const unpaidBookings = dashboard.bookings.filter(
    (booking) => booking.status !== "cancelled" && booking.paymentStatus !== "paid"
  );
  const paidRevenue = dashboard.bookings
    .filter((booking) => booking.status !== "cancelled" && booking.paymentStatus === "paid")
    .reduce((sum, booking) => sum + booking.total, 0);
  const activeCustomers = dashboard.customers.filter((customer) => customer.upcomingBookings > 0);

  return (
    <>
      <div className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Today's bookings"
            value={dashboard.stats.todayBookings.toString()}
            detail={`${upcomingBookings.length} upcoming`}
            icon={CalendarClock}
            tone="blue"
          />
          <KpiCard
            label="Total bookings"
            value={dashboard.stats.totalBookings.toString()}
            detail={`${dashboard.stats.completedBookings} completed`}
            icon={ReceiptText}
          />
          <KpiCard
            label="Pending"
            value={pendingBookings.length.toString()}
            detail="Awaiting review"
            icon={Clock3}
            tone="orange"
          />
          <KpiCard
            label="Revenue"
            value={formatShortPrice(dashboard.stats.totalRevenue)}
            detail={`${formatShortPrice(paidRevenue)} paid`}
            icon={BarChart3}
            tone="green"
          />
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
          <RevenueTrendCard bookings={dashboard.bookings} />
          <TodayBookings bookings={todayBookings} onSelectBooking={setSelectedBooking} />
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
          <RecentBookingsTable
            bookings={visibleBookings.slice(0, 10)}
            onSelectBooking={setSelectedBooking}
            searchQuery={searchQuery}
          />
          <div className="grid gap-5">
            <StatusDistributionCard bookings={dashboard.bookings} />
            <BusinessSnapshotCard
              activeCustomers={activeCustomers.length}
              nextBooking={upcomingBookings[0]}
              outstandingRevenue={dashboard.stats.outstandingRevenue}
              unpaidBookings={unpaidBookings.length}
            />
          </div>
        </div>
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

function RevenueTrendCard({ bookings }: { bookings: DashboardBooking[] }) {
  const monthly = buildDashboardMonths(bookings, 6);

  return (
    <GlassCard className="p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[14px] font-semibold text-[#111827]">Revenue and bookings</p>
          <p className="mt-1 text-[12px] font-medium text-[#6B7280]">
            Monthly totals from booking records
          </p>
        </div>
        <span className="rounded-full border border-[#DCEEF2] bg-white/60 px-3 py-1 text-[12px] font-semibold text-[#00A7B8]">
          {getRevenueTrendLabel(bookings)}
        </span>
      </div>
      <div className="mt-5 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthly} margin={{ left: -12, right: 8, top: 12, bottom: 0 }}>
            <defs>
              <linearGradient id="adminRevenueFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor={chartPrimary} stopOpacity={0.2} />
                <stop offset="95%" stopColor={chartPrimary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#DCEEF2" strokeDasharray="3 3" vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="label"
              tick={{ fill: "#6B7280", fontSize: 11, fontWeight: 600 }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "#6B7280", fontSize: 11 }}
              tickFormatter={(value: number) => formatShortPrice(value)}
              tickLine={false}
              width={54}
            />
            <Tooltip
              cursor={{ stroke: "#99DFE7", strokeWidth: 1 }}
              formatter={(value, name) => {
                const metricName = String(name);
                const numericValue =
                  typeof value === "number" ? value : Number(value ?? 0);
                return [
                  metricName === "revenue" ? formatPrice(numericValue) : numericValue,
                  metricName === "revenue" ? "Revenue" : "Bookings",
                ];
              }}
              labelStyle={{ color: "#111827", fontWeight: 700 }}
              contentStyle={{
                background: "rgba(255,255,255,0.92)",
                border: "1px solid rgba(255,255,255,0.7)",
                borderRadius: "18px",
                boxShadow: "0 8px 32px rgba(0,167,184,0.12)",
              }}
            />
            <Area
              dataKey="revenue"
              fill="url(#adminRevenueFill)"
              stroke={chartPrimary}
              strokeWidth={3}
              type="monotone"
            />
            <Line
              dataKey="bookings"
              dot={{ fill: chartSecondary, r: 3 }}
              stroke={chartSecondary}
              strokeWidth={2}
              type="monotone"
              yAxisId={0}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}

function StatusDistributionCard({ bookings }: { bookings: DashboardBooking[] }) {
  const statuses: BookingStatus[] = ["pending", "approved", "completed", "cancelled"];
  const data = statuses.map((status) => ({
    status,
    label: getShortStatusLabel(status),
    count: bookings.filter((booking) => booking.status === status).length,
    color: getStatusColor(status),
  }));
  const activeBookings = bookings.filter((booking) => booking.status !== "cancelled");

  return (
    <GlassCard className="p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[14px] font-semibold text-[#111827]">Status distribution</p>
          <p className="mt-1 text-[12px] font-medium text-[#6B7280]">
            {activeBookings.length} active bookings
          </p>
        </div>
        <ShieldCheck className="h-5 w-5 text-[#6B7280]" />
      </div>
      <div className="mt-4 h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: -24, right: 0, top: 8, bottom: 0 }}>
            <XAxis
              axisLine={false}
              dataKey="label"
              tick={{ fill: "#6B7280", fontSize: 11, fontWeight: 600 }}
              tickLine={false}
            />
            <YAxis allowDecimals={false} axisLine={false} tick={false} tickLine={false} />
            <Tooltip
              cursor={{ fill: "rgba(0,167,184,0.06)" }}
              contentStyle={{
                background: "rgba(255,255,255,0.92)",
                border: "1px solid rgba(255,255,255,0.7)",
                borderRadius: "16px",
                boxShadow: "0 8px 32px rgba(0,167,184,0.12)",
              }}
            />
            <Bar dataKey="count" radius={[10, 10, 10, 10]}>
              {data.map((entry) => (
                <Cell key={entry.status} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {data.map((item) => (
          <div key={item.status} className="flex items-center justify-between gap-2 text-[12px]">
            <StatusBadge status={item.status} />
            <span className="font-semibold text-[#6B7280]">{item.count}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function BusinessSnapshotCard({
  activeCustomers,
  nextBooking,
  outstandingRevenue,
  unpaidBookings,
}: {
  activeCustomers: number;
  nextBooking?: DashboardBooking;
  outstandingRevenue: number;
  unpaidBookings: number;
}) {
  const items = [
    {
      label: "Next job",
      value: nextBooking
        ? `${nextBooking.appointmentTime} ${nextBooking.customerName || nextBooking.customerEmail}`
        : "None",
      icon: CheckCircle2,
    },
    { label: "Unpaid", value: `${unpaidBookings} bookings`, icon: CreditCard },
    { label: "Customers", value: `${activeCustomers} active`, icon: Users },
    { label: "Open revenue", value: formatShortPrice(outstandingRevenue), icon: Settings2 },
  ];

  return (
    <GlassCard className="p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[14px] font-semibold text-[#111827]">Business snapshot</p>
          <p className="mt-1 text-[12px] font-medium text-[#6B7280]">What needs attention now</p>
        </div>
        <Settings2 className="h-5 w-5 text-[#6B7280]" />
      </div>
      <div className="mt-4 grid gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-2xl border border-white/55 bg-white/50 px-3 py-3"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#EEFBFC] text-[#00A7B8]">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[12px] font-medium text-[#6B7280]">{item.label}</span>
                <span className="block truncate text-[13px] font-semibold text-[#111827]">
                  {item.value}
                </span>
              </span>
            </div>
          );
        })}
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

function getRevenueTrendLabel(bookings: DashboardBooking[]) {
  const months = buildDashboardMonths(bookings, 2);
  const previous = months[0]?.revenue || 0;
  const current = months[1]?.revenue || 0;
  if (current === previous) {
    return "Revenue flat";
  }
  return current > previous ? "Revenue up" : "Revenue down";
}

function getShortStatusLabel(status: BookingStatus) {
  switch (status) {
    case "approved":
      return "Approved";
    case "completed":
      return "Done";
    case "cancelled":
      return "Cancel";
    default:
      return "Pending";
  }
}

function getStatusColor(status: BookingStatus) {
  switch (status) {
    case "approved":
      return "#10B981";
    case "completed":
      return "#00A7B8";
    case "cancelled":
      return "#EF4444";
    default:
      return "#F59E0B";
  }
}

function sortDashboardBookings(left: DashboardBooking, right: DashboardBooking) {
  return `${left.appointmentDate}T${left.appointmentTime}`.localeCompare(
    `${right.appointmentDate}T${right.appointmentTime}`
  );
}

function sortRecentBookings(left: DashboardBooking, right: DashboardBooking) {
  return `${right.createdAt || right.appointmentDate}T${right.appointmentTime}`.localeCompare(
    `${left.createdAt || left.appointmentDate}T${left.appointmentTime}`
  );
}

function buildDashboardMonths(bookings: DashboardBooking[], count: number) {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth() - count + 1, 1);
  const months = Array.from({ length: count }, (_, index) => {
    const date = new Date(start.getFullYear(), start.getMonth() + index, 1);
    return {
      key: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`,
      label: formatShortMonth(date),
      revenue: 0,
      bookings: 0,
    };
  });
  const monthMap = new Map(months.map((month) => [month.key, month]));

  for (const booking of bookings) {
    if (booking.status === "cancelled") {
      continue;
    }
    const month = monthMap.get(booking.appointmentDate.slice(0, 7));
    if (month) {
      month.revenue += booking.total;
      month.bookings += 1;
    }
  }

  return months;
}

function formatShortMonth(date: Date) {
  try {
    return new Intl.DateTimeFormat("da-DK", { month: "short" })
      .format(date)
      .replace(".", "")
      .toUpperCase();
  } catch {
    return (date.getMonth() + 1).toString().padStart(2, "0");
  }
}
