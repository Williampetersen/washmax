import Link from "next/link";
import { BarChart3, Calendar, ListFilter, LogOut, Settings2, UserRound, Users, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatShortPrice } from "@/lib/shared/booking";
import type { DashboardData } from "@/lib/server/bookings";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { id: "overview", label: "Dashboard", icon: BarChart3 },
  { id: "bookings", label: "Bookings", icon: ListFilter },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "customers", label: "Customers", icon: Users },
  { id: "agents", label: "Agents", icon: UserRound },
  { id: "booking-setup", label: "Booking Setup", icon: Wrench },
  { id: "settings", label: "Settings", icon: Settings2 },
] as const;

export type AdminSidebarView = (typeof sidebarItems)[number]["id"] | string;

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
    <aside className="overflow-hidden rounded-3xl border border-white/55 bg-white/[0.65] text-[#1F2340] shadow-[0_8px_32px_rgba(99,102,241,0.08)] backdrop-blur-2xl xl:sticky xl:top-4 xl:self-start">
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

      <nav className="flex snap-x gap-2 overflow-x-auto px-3 py-3 xl:grid xl:grid-cols-1 xl:overflow-visible">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = view === item.id;
          return (
            <Link
              key={item.id}
              href={`/admin?view=${item.id}`}
              scroll={false}
              className={cn(
                "flex min-w-[8.75rem] snap-start items-center gap-2 rounded-2xl px-3 py-2.5 text-[13px] font-semibold transition duration-[250ms] xl:min-w-0",
                isActive
                  ? "bg-[#6366F1] text-white shadow-[0_8px_20px_rgba(99,102,241,0.18)]"
                  : "text-[#8E95B5] hover:-translate-y-0.5 hover:bg-white/70 hover:text-[#1F2340]"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/55 px-4 py-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#6366F1]">
            Today
          </p>
          <span className="rounded-full border border-[#10B981]/20 bg-[#10B981]/10 px-2.5 py-1 text-[12px] font-semibold text-[#047857]">
            Live
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-[13px] text-[#1F2340]">
          <SidebarStat label="Jobs" value={dashboard.stats.todayBookings.toString()} />
          <SidebarStat label="Pending" value={dashboard.stats.pendingBookings.toString()} />
          <SidebarStat label="Open" value={formatShortPrice(dashboard.stats.outstandingRevenue)} />
        </div>
      </div>

      <div className="border-t border-white/55 px-4 py-4">
        <form action="/api/admin/logout" method="POST">
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start rounded-2xl text-[13px] font-semibold text-[#8E95B5] hover:bg-white/70 hover:text-[#1F2340]"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </form>
      </div>
    </aside>
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
