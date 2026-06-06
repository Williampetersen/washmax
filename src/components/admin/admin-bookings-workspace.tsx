"use client";

import { useEffect, useState, type ReactNode } from "react";
import { CalendarPlus, ListFilter } from "lucide-react";
import { cn } from "@/lib/utils";

export type AdminBookingsTab = "details" | "manual";

const storageKey = "washmax-admin-bookings-tab";

export function AdminBookingsWorkspace({
  initialTab,
  detailsCount,
  pendingCount,
  manualContent,
  detailsContent,
}: {
  initialTab: AdminBookingsTab;
  detailsCount: number;
  pendingCount: number;
  manualContent: ReactNode;
  detailsContent: ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<AdminBookingsTab>(() => {
    if (typeof window === "undefined") {
      return initialTab;
    }

    const stored = window.sessionStorage.getItem(storageKey);
    return stored === "details" || stored === "manual" ? stored : initialTab;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.sessionStorage.setItem(storageKey, activeTab);

    const url = new URL(window.location.href);
    url.searchParams.set("bookings_tab", activeTab);
    window.history.replaceState({}, "", url.toString());
  }, [activeTab]);

  return (
    <div className="space-y-6">
      <div className="rounded-[1.8rem] border border-[#d9e7f0] bg-white/88 p-3 shadow-[0_20px_60px_rgba(8,27,21,0.06)] backdrop-blur-xl">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setActiveTab("details")}
              className={cn(
                "flex items-start justify-between gap-3 rounded-[1.35rem] border px-4 py-4 text-left transition duration-200",
                activeTab === "details"
                  ? "border-[#2563eb] bg-[linear-gradient(145deg,#eef5ff,#dbeafe)] shadow-[0_14px_34px_rgba(37,99,235,0.14)]"
                  : "border-[#dbe3f2] bg-[#f8fbff] hover:border-[#bfdbfe] hover:bg-white"
              )}
            >
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#2563eb]">
                  Koe
                </p>
                <h2 className="mt-1 text-lg font-bold text-[#10243b]">Bookinger</h2>
                <p className="mt-1 text-sm text-[#5b6b7c]">
                  Venter og faerdig i et kort flow.
                </p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-[#2563eb] shadow-[0_8px_20px_rgba(37,99,235,0.1)]">
                {detailsCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("manual")}
              className={cn(
                "flex items-start justify-between gap-3 rounded-[1.35rem] border px-4 py-4 text-left transition duration-200",
                activeTab === "manual"
                  ? "border-[#2563eb] bg-[linear-gradient(145deg,#eef5ff,#dbeafe)] shadow-[0_14px_34px_rgba(37,99,235,0.14)]"
                  : "border-[#dbe3f2] bg-[#f8fbff] hover:border-[#bfdbfe] hover:bg-white"
              )}
            >
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#2563eb]">
                  Opret
                </p>
                <h2 className="mt-1 text-lg font-bold text-[#10243b]">Ny booking</h2>
                <p className="mt-1 text-sm text-[#5b6b7c]">
                  Til telefon og hurtige manuelle bookinger.
                </p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-[#2563eb] shadow-[0_8px_20px_rgba(37,99,235,0.1)]">
                Ny
              </span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <WorkspacePill icon={ListFilter} label="Vises" value={detailsCount.toString()} />
            <WorkspacePill
              icon={CalendarPlus}
              label="Venter"
              value={pendingCount.toString()}
              tone="blue"
            />
          </div>
        </div>
      </div>

      <div className={cn(activeTab === "details" ? "block" : "hidden")}>{detailsContent}</div>
      <div className={cn(activeTab === "manual" ? "block" : "hidden")}>{manualContent}</div>
    </div>
  );
}

function WorkspacePill({
  icon: Icon,
  label,
  value,
  tone = "slate",
}: {
  icon: typeof ListFilter;
  label: string;
  value: string;
  tone?: "slate" | "blue";
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border px-3 py-2",
        tone === "blue"
          ? "border-[#bfdbfe] bg-[#eff6ff] text-[#1d4ed8]"
          : "border-[#dbe3f2] bg-white text-[#334155]"
      )}
    >
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-xl",
          tone === "blue" ? "bg-white text-[#2563eb]" : "bg-[#f8fbff] text-[#475569]"
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span>
        <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] opacity-70">
          {label}
        </span>
        <strong className="block text-sm font-bold">{value}</strong>
      </span>
    </div>
  );
}
