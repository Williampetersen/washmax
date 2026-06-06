import Link from "next/link";
import { CalendarPlus, LogOut, Search, ShieldCheck } from "lucide-react";
import { GlassCard } from "@/components/admin/glass-card";
import { DashboardLanguageSwitch } from "@/components/ui/dashboard-language-switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DashboardLocale } from "@/lib/shared/dashboard-locale";
import { cn } from "@/lib/utils";

export function AdminTopbar({
  searchQuery,
  sessionEmail,
  view,
  viewTitle,
  locale,
}: {
  searchQuery: string;
  sessionEmail: string;
  view: string;
  viewTitle: string;
  locale: DashboardLocale;
}) {
  const copy =
    locale === "en"
      ? {
          view: "View",
          searchLong: "Search booking, customer or car...",
          searchShort: "Search...",
          newBooking: "New booking",
          logout: "Logout",
          ariaNewBooking: "New booking",
          ariaLogout: "Logout",
        }
      : {
          view: "Visning",
          searchLong: "Soeg booking, kunde eller bil...",
          searchShort: "Soeg...",
          newBooking: "Ny booking",
          logout: "Log ud",
          ariaNewBooking: "Ny booking",
          ariaLogout: "Log ud",
        };

  return (
    <>
      <GlassCard className="hidden px-4 py-3 xl:block">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="rounded-2xl border border-[#dbe3f2] bg-[#f8fbff] px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6366F1]">
                {copy.view}
              </p>
              <p className="mt-1 text-sm font-bold text-[#10243b]">{viewTitle}</p>
            </div>
            <AdminSearch
              query={searchQuery}
              view={view}
              placeholder={copy.searchLong}
              className="max-w-2xl flex-1"
              inputClassName="h-11 rounded-2xl border-[#dbe3f2] bg-white pl-10 text-[13px] font-medium text-[#1F2340] placeholder:text-[#8E95B5] focus:border-[#6366F1] focus:ring-[#6366F1]/10"
            />
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <DashboardLanguageSwitch currentLocale={locale} />
            <span className="hidden max-w-[14rem] truncate rounded-full border border-white/55 bg-white/70 px-3 py-2 text-[12px] font-medium text-[#4B5563] 2xl:inline-flex">
              {sessionEmail}
            </span>
            <Link
              href="/booking"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-[#6366F1] bg-[#6366F1] px-4 text-[13px] font-semibold text-white shadow-[0_8px_20px_rgba(99,102,241,0.18)] transition duration-[250ms] hover:-translate-y-0.5 hover:bg-[#5B5BF7]"
            >
              <CalendarPlus className="h-4 w-4" />
              {copy.newBooking}
            </Link>
            <form action="/api/admin/logout" method="POST">
              <Button
                type="submit"
                variant="outline"
                className="h-11 rounded-2xl border-[#E1E6F7] bg-white/70 px-4 text-[13px] font-semibold text-[#4B5563] hover:bg-white"
              >
                <LogOut className="h-4 w-4" />
                {copy.logout}
              </Button>
            </form>
          </div>
        </div>
      </GlassCard>

      <div className="sticky top-3 z-30 xl:hidden">
        <div className="overflow-hidden rounded-[1.8rem] bg-[linear-gradient(145deg,#10243b,#1d4ed8)] px-4 pb-4 pt-4 text-white shadow-[0_20px_55px_rgba(15,23,42,0.24)]">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
                <ShieldCheck className="h-3.5 w-3.5" />
                Clean Wash
              </span>
              <h1 className="mt-3 truncate text-[22px] font-bold leading-tight">{viewTitle}</h1>
              <p className="mt-1 truncate text-[12px] font-medium text-white/72">
                {sessionEmail}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <DashboardLanguageSwitch currentLocale={locale} compact light />
              <Link
                href="/booking"
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#1d4ed8] shadow-[0_10px_24px_rgba(255,255,255,0.2)]"
                aria-label={copy.ariaNewBooking}
              >
                <CalendarPlus className="h-5 w-5" />
              </Link>
              <form action="/api/admin/logout" method="POST">
                <button
                  type="submit"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white"
                  aria-label={copy.ariaLogout}
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>

          <AdminSearch
            query={searchQuery}
            view={view}
            placeholder={copy.searchShort}
            className="mt-4"
            inputClassName="h-11 rounded-2xl border-white/10 bg-white/95 pl-10 text-[13px] font-medium text-[#10243b] placeholder:text-[#64748b] focus:border-white focus:ring-white/20"
          />
        </div>
      </div>
    </>
  );
}

export function AdminSearch({
  query,
  view,
  className,
  inputClassName,
  placeholder,
}: {
  query: string;
  view: string;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
}) {
  return (
    <form action="/admin" className={cn("relative", className)}>
      <input type="hidden" name="view" value={view} />
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <Input
        name="q"
        defaultValue={query}
        placeholder={placeholder || "Soeg..."}
        className={cn(
          "h-10 rounded-2xl border-white/55 bg-white/60 pl-9 text-[13px] font-medium text-[#1F2340] placeholder:text-[#8E95B5] focus:border-[#6366F1] focus:ring-[#6366F1]/10",
          inputClassName
        )}
      />
    </form>
  );
}
