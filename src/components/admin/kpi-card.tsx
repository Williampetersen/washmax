import type { LucideIcon } from "lucide-react";
import { GlassCard } from "@/components/admin/glass-card";
import { cn } from "@/lib/utils";

type KpiTone = "violet" | "blue" | "green" | "orange" | "red";

export function KpiCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = "violet",
}: {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone?: KpiTone;
}) {
  const toneClass: Record<KpiTone, string> = {
    violet: "bg-[#EEFBFC] text-[#00A7B8] ring-[#99DFE7]/30",
    blue: "bg-[#EEFBFC] text-[#00A7B8] ring-[#99DFE7]/30",
    green: "bg-[#10B981]/10 text-[#047857] ring-[#10B981]/20",
    orange: "bg-[#F59E0B]/10 text-[#92400E] ring-[#F59E0B]/20",
    red: "bg-[#EF4444]/10 text-[#B91C1C] ring-[#EF4444]/20",
  };

  return (
    <GlassCard className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[12px] font-medium text-[#6B7280]">{label}</p>
          <p className="mt-2 truncate text-[22px] font-bold leading-none text-[#111827]">{value}</p>
          <p className="mt-2 truncate text-[12px] font-medium text-[#6B7280]">{detail}</p>
        </div>
        <span className={cn("flex h-10 w-10 items-center justify-center rounded-2xl ring-1", toneClass[tone])}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </GlassCard>
  );
}
