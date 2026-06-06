"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { DashboardLocale } from "@/lib/shared/dashboard-locale";
import { cn } from "@/lib/utils";

const locales: Array<{
  id: DashboardLocale;
  flag: string;
  label: string;
}> = [
  { id: "da", flag: "🇩🇰", label: "DA" },
  { id: "en", flag: "🇬🇧", label: "EN" },
];

export function DashboardLanguageSwitch({
  currentLocale,
  className,
  compact = false,
  light = false,
}: {
  currentLocale: DashboardLocale;
  className?: string;
  compact?: boolean;
  light?: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const redirect = `${pathname}${query ? `?${query}` : ""}`;

  return (
    <div className={cn("inline-flex items-center gap-1 rounded-2xl p-1", className)}>
      {locales.map((locale) => {
        const active = currentLocale === locale.id;
        return (
          <Link
            key={locale.id}
            href={`/api/preferences/locale?locale=${locale.id}&redirect=${encodeURIComponent(redirect)}`}
            className={cn(
              "inline-flex items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-[12px] font-semibold transition",
              compact ? "min-w-[3rem]" : "min-w-[4rem]",
              light
                ? active
                  ? "bg-white text-[#10243b] shadow-[0_10px_24px_rgba(255,255,255,0.18)]"
                  : "text-white/78 hover:bg-white/10 hover:text-white"
                : active
                  ? "bg-[#eff6ff] text-[#1d4ed8]"
                  : "text-[#64748b] hover:bg-white hover:text-[#1F2340]"
            )}
          >
            <span aria-hidden="true">{locale.flag}</span>
            {!compact ? <span>{locale.label}</span> : null}
          </Link>
        );
      })}
    </div>
  );
}
