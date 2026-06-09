"use client";

import { memo, useCallback, useMemo, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BookingTab = {
  id: string;
  label: string;
  content: ReactNode;
};

function BookingTabsComponent({
  tabs,
  defaultTab,
  className,
}: {
  tabs: BookingTab[];
  defaultTab?: string;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || "");
  const activeContent = useMemo(
    () => tabs.find((tab) => tab.id === activeTab)?.content,
    [activeTab, tabs]
  );
  const selectTab = useCallback((tabId: string) => {
    setActiveTab((current) => (current === tabId ? current : tabId));
  }, []);

  return (
    <div className={cn("grid gap-4", className)}>
      <div
        className="flex gap-1 overflow-x-auto rounded-2xl border border-[#e1e6f7] bg-[#f7f8fc] p-1"
        role="tablist"
        aria-label="Booking sections"
      >
        {tabs.map((tab) => {
          const active = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => selectTab(tab.id)}
              className={cn(
                "min-w-max rounded-xl px-3.5 py-2 text-[13px] font-semibold transition",
                active
                  ? "bg-white text-[#1f2340] shadow-[0_6px_18px_rgba(31,35,64,0.08)]"
                  : "text-[#7b829f] hover:text-[#1f2340]"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel">{activeContent}</div>
    </div>
  );
}

export const BookingTabs = memo(BookingTabsComponent);
