"use client";

import Image from "next/image";
import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { type DashboardLocale } from "@/lib/shared/dashboard-locale";
import { cn } from "@/lib/utils";

const locales: Array<{
  id: DashboardLocale;
  flagSrc: string;
  label: string;
}> = [
  { id: "da", flagSrc: "/danish.webp", label: "DA" },
  { id: "en", flagSrc: "/english.svg", label: "EN" },
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
  const router = useRouter();
  const [pendingLocale, setPendingLocale] = useState<DashboardLocale | null>(null);
  const activeLocale = pendingLocale ?? currentLocale;

  const switchLocale = async (nextLocale: DashboardLocale) => {
    if (nextLocale === activeLocale) {
      return;
    }

    setPendingLocale(nextLocale);
    await fetch(`/api/preferences/locale?locale=${nextLocale}`, {
      method: "POST",
      credentials: "same-origin",
    });
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className={cn("inline-flex items-center gap-1 rounded-2xl p-1", className)}>
      {locales.map((locale) => {
        const active = activeLocale === locale.id;
        const isPending = pendingLocale === locale.id;

        return (
          <button
            key={locale.id}
            type="button"
            onClick={() => {
              void switchLocale(locale.id);
            }}
            className={cn(
              "inline-flex items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-[12px] font-semibold transition",
              compact ? "min-w-[3rem]" : "min-w-[4rem]",
              light
                ? active
                  ? "bg-white text-[#10243b] shadow-[0_10px_24px_rgba(255,255,255,0.18)]"
                  : "text-white/78 hover:bg-white/10 hover:text-white"
                : active
                  ? "bg-[#eff6ff] text-[#1d4ed8]"
                  : "text-[#64748b] hover:bg-white hover:text-[#1F2340]",
              isPending ? "opacity-70" : ""
            )}
            aria-pressed={active}
          >
            <Image
              src={locale.flagSrc}
              alt={locale.label}
              width={18}
              height={18}
              className="h-[18px] w-[18px] rounded-full object-cover"
            />
            {!compact ? <span>{locale.label}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
