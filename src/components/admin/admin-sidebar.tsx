import Link from "next/link";
import {
  BarChart3,
  Calendar,
  CalendarClock,
  CreditCard,
  ListFilter,
  LogOut,
  Mail,
  MapPinned,
  ReceiptText,
  Settings2,
  Sparkles,
  UserRound,
  Users,
  Wrench,
} from "lucide-react";
import { formatShortPrice } from "@/lib/shared/booking";
import type { DashboardData } from "@/lib/server/bookings";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "overview",      label: "Overblik",        icon: BarChart3 },
  { id: "calendar",      label: "Kalender",         icon: Calendar },
  { id: "bookings",      label: "Bookinger",        icon: ListFilter },
  { id: "customers",     label: "Kunder",           icon: Users },
  { id: "agents",        label: "Agenter",          icon: UserRound },
  { id: "booking-setup", label: "Booking Setup",    icon: Wrench },
  { id: "services",      label: "Ydelser",          icon: Sparkles },
  { id: "availability",  label: "Tilgængelighed",   icon: CalendarClock },
  { id: "emails",        label: "E-mails",          icon: Mail },
  { id: "invoices",      label: "Fakturaer",        icon: ReceiptText },
  { id: "areas",         label: "Områder",          icon: MapPinned },
  { id: "payments",      label: "Betalinger",       icon: CreditCard },
  { id: "settings",      label: "Indstillinger",    icon: Settings2 },
] as const;

export type AdminSidebarView = (typeof navItems)[number]["id"] | string;

export function AdminSidebar({
  dashboard,
  sessionEmail,
  view,
}: {
  dashboard: DashboardData;
  sessionEmail: string;
  view: AdminSidebarView;
}) {
  return (
    <div className="space-y-2">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-[0_2px_16px_rgba(99,102,241,0.07)] backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6366F1] text-[13px] font-bold text-white shadow-[0_4px_12px_rgba(99,102,241,0.28)]">
            CW
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6366F1]">CleanWash</p>
            <p className="text-[13px] font-semibold text-[#1F2340]">Admin Panel</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="hidden items-center gap-4 sm:flex">
            <HeaderStat label="I dag" value={dashboard.stats.todayBookings.toString()} />
            <HeaderStat label="Afventer" value={dashboard.stats.pendingBookings.toString()} accent="orange" />
            <HeaderStat label="Udestående" value={formatShortPrice(dashboard.stats.outstandingRevenue)} accent="green" />
          </div>
          <span className="hidden text-[12px] font-medium text-[#8E95B5] lg:block">{sessionEmail}</span>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl border border-[#E1E6F7] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#8E95B5] transition hover:border-[#6366F1]/30 hover:bg-[#EEF0FF] hover:text-[#6366F1]"
            >
              <LogOut className="h-3.5 w-3.5" />
              Log ud
            </button>
          </form>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 overflow-x-auto rounded-2xl border border-white/60 bg-white/80 p-1.5 shadow-[0_2px_16px_rgba(99,102,241,0.07)] backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = view === item.id;
          return (
            <Link
              key={item.id}
              href={`/admin?view=${item.id}`}
              scroll={false}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-[12.5px] font-semibold whitespace-nowrap transition-all duration-150",
                isActive
                  ? "bg-[#6366F1] text-white shadow-[0_4px_14px_rgba(99,102,241,0.28)]"
                  : "text-[#8E95B5] hover:bg-white hover:text-[#1F2340] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function HeaderStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "orange" | "green";
}) {
  const valueClass =
    accent === "orange"
      ? "text-[#D97706]"
      : accent === "green"
        ? "text-[#047857]"
        : "text-[#1F2340]";

  return (
    <div className="text-center">
      <p className="text-[10px] font-medium uppercase tracking-wide text-[#8E95B5]">{label}</p>
      <p className={cn("text-[13px] font-bold", valueClass)}>{value}</p>
    </div>
  );
}
