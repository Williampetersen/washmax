import {
  getPaymentStatusLabel,
  getStatusLabel,
  type BookingStatus,
  type DashboardLocale,
  type PaymentStatus,
} from "@/lib/shared/booking";
import { cn } from "@/lib/utils";

export function StatusBadge({
  status,
  locale = "da",
}: {
  status: BookingStatus;
  locale?: DashboardLocale;
}) {
  const styles: Record<BookingStatus, string> = {
    pending: "border-[#F59E0B]/20 bg-[#F59E0B]/10 text-[#92400E]",
    approved: "border-[#10B981]/20 bg-[#10B981]/10 text-[#047857]",
    completed: "border-[#6366F1]/20 bg-[#6366F1]/10 text-[#4F46E5]",
    cancelled: "border-[#EF4444]/20 bg-[#EF4444]/10 text-[#B91C1C]",
  };

  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-1 text-[12px] font-semibold",
        styles[status]
      )}
    >
      {getStatusLabel(status, locale)}
    </span>
  );
}

export function PaymentBadge({
  status,
  locale = "da",
}: {
  status: PaymentStatus;
  locale?: DashboardLocale;
}) {
  const styles: Record<PaymentStatus, string> = {
    unpaid: "border-[#EF4444]/20 bg-[#EF4444]/10 text-[#B91C1C]",
    pending: "border-[#F59E0B]/20 bg-[#F59E0B]/10 text-[#92400E]",
    paid: "border-[#10B981]/20 bg-[#10B981]/10 text-[#047857]",
    refunded: "border-[#6366F1]/20 bg-[#6366F1]/10 text-[#4F46E5]",
  };

  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-1 text-[12px] font-semibold",
        styles[status]
      )}
    >
      {getPaymentStatusLabel(status, locale)}
    </span>
  );
}
