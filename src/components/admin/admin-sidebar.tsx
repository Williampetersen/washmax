import Link from "next/link";
import { BarChart3, Calendar, ListFilter, Settings2, UserRound, Users, Wrench } from "lucide-react";
import { DashboardLanguageSwitch } from "@/components/ui/dashboard-language-switch";
import { formatShortPrice } from "@/lib/shared/booking";
import type { DashboardData } from "@/lib/server/bookings";
import type { DashboardLocale } from "@/lib/shared/dashboard-locale";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { id: "overview", label: "Dashboard", shortLabel: "Hjem", icon: BarChart3 },
  { id: "bookings", label: "Bookings", shortLabel: "Booking", icon: ListFilter },
  { id: "calendar", label: "Calendar", shortLabel: "Kalender", icon: Calendar },
  { id: "customers", label: "Customers", shortLabel: "Kunder", icon: Users },
  { id: "agents", label: "Agents", shortLabel: "Agents", icon: UserRound },
  { id: "booking-setup", label: "Booking Setup", shortLabel: "Setup", icon: Wrench },
  { id: "settings", label: "Settings", shortLabel: "Indstil", icon: Settings2 },
] as const;

const mobileDockItems = [
  { id: "overview", label: "Hjem", icon: BarChart3 },
  { id: "bookings", label: "Booking", icon: ListFilter },
  { id: "calendar", label: "Kalender", icon: Calendar },
  { id: "customers", label: "Kunder", icon: Users },
  { id: "settings", label: "Indstil", icon: Settings2 },
] as const;

export type AdminSidebarView = (typeof sidebarItems)[number]["id"] | string;

export function AdminSidebar({
  dashboard,
  sessionEmail,
  view,
  locale,
}: {
  dashboard: DashboardData;
  sessionEmail: string;
  view: AdminSidebarView;
  locale: DashboardLocale;
}) {
  const copy =
    locale === "en"
      ? {
          overview: "Dashboard",
          bookings: "Bookings",
          calendar: "Calendar",
          customers: "Customers",
          agents: "Agents",
          setup: "Setup",
          settings: "Settings",
          today: "Today",
          jobs: "Jobs",
          pending: "Pending",
          open: "Open",
        }
      : {
          overview: "Overblik",
          bookings: "Bookinger",
          calendar: "Kalender",
          customers: "Kunder",
          agents: "Agents",
          setup: "Setup",
          settings: "Indstil",
          today: "I dag",
          jobs: "Jobs",
          pending: "Venter",
          open: "Aaben",
        };

  const labels: Record<string, string> = {
    overview: copy.overview,
    bookings: copy.bookings,
    calendar: copy.calendar,
    customers: copy.customers,
    agents: copy.agents,
    "booking-setup": copy.setup,
    settings: copy.settings,
  };

  return (
    <>
      <div className="xl:hidden">
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = view === item.id;
            return (
              <Link
                key={item.id}
                href={`/admin?view=${item.id}`}
                scroll={false}
                className={cn(
                  "inline-flex min-w-fit shrink-0 items-center gap-2 rounded-2xl border px-3 py-2 text-[12px] font-semibold transition",
                  isActive
                    ? "border-[#2563eb] bg-[#eff6ff] text-[#1d4ed8]"
                    : "border-[#dbe3f2] bg-white/88 text-[#475569]"
                )}
              >
                <Icon className="h-4 w-4" />
                {labels[item.id] || item.shortLabel}
              </Link>
            );
          })}
        </div>
      </div>

      <aside className="hidden overflow-hidden rounded-3xl border border-white/55 bg-white/[0.65] text-[#1F2340] shadow-[0_8px_32px_rgba(99,102,241,0.08)] backdrop-blur-2xl xl:sticky xl:top-4 xl:block xl:self-start">
        <div className="border-b border-white/55 px-4 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#6366F1] text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(99,102,241,0.18)]">
              W
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#6366F1]">
                Clean Wash
              </p>
              <p className="mt-1 text-[13px] font-semibold">Admin</p>
              <p className="truncate text-[12px] font-medium text-[#8E95B5]">{sessionEmail}</p>
            </div>
          </div>
        </div>

        <nav className="grid gap-2 px-3 py-3">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = view === item.id;
            return (
              <Link
                key={item.id}
                href={`/admin?view=${item.id}`}
                scroll={false}
                className={cn(
                  "flex items-center gap-2 rounded-2xl px-3 py-2.5 text-[13px] font-semibold transition duration-[250ms]",
                  isActive
                    ? "bg-[#6366F1] text-white shadow-[0_8px_20px_rgba(99,102,241,0.18)]"
                    : "text-[#8E95B5] hover:-translate-y-0.5 hover:bg-white/70 hover:text-[#1F2340]"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="truncate">{labels[item.id] || item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/55 px-4 py-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#6366F1]">
              {copy.today}
            </p>
            <span className="rounded-full border border-[#10B981]/20 bg-[#10B981]/10 px-2.5 py-1 text-[12px] font-semibold text-[#047857]">
              Live
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-[13px] text-[#1F2340]">
            <SidebarStat label={copy.jobs} value={dashboard.stats.todayBookings.toString()} />
            <SidebarStat label={copy.pending} value={dashboard.stats.pendingBookings.toString()} />
            <SidebarStat label={copy.open} value={formatShortPrice(dashboard.stats.outstandingRevenue)} />
          </div>
        </div>
      </aside>

      <nav className="fixed bottom-3 left-3 right-3 z-40 xl:hidden">
        <div className="grid grid-cols-5 rounded-[1.8rem] border border-white/70 bg-white/95 p-2 shadow-[0_18px_50px_rgba(15,23,42,0.16)] backdrop-blur-xl">
          {mobileDockItems.map((item) => {
            const Icon = item.icon;
            const isActive = view === item.id;
            return (
              <Link
                key={item.id}
                href={`/admin?view=${item.id}`}
                scroll={false}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-semibold transition",
                  isActive ? "bg-[#eff6ff] text-[#1d4ed8]" : "text-[#64748b]"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="truncate">{labels[item.id] || item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="fixed bottom-24 right-3 z-40 xl:hidden">
        <DashboardLanguageSwitch currentLocale={locale} />
      </div>
    </>
  );
}

function SidebarStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/55 bg-white/55 px-2.5 py-2">
      <span className="block truncate text-[11px] font-medium text-[#8E95B5]">{label}</span>
      <strong className="mt-1 block truncate text-[12px] text-[#1F2340]">{value}</strong>
    </div>
  );
}
