"use client";

import { ArrowRight } from "lucide-react";
import type { DashboardBooking } from "@/lib/server/bookings";
import { formatPrice } from "@/lib/shared/booking";
import { StatusBadge } from "@/components/admin/status-badge";

export function RecentBookingsTable({
  bookings,
  searchQuery,
  onSelectBooking,
}: {
  bookings: DashboardBooking[];
  searchQuery: string;
  onSelectBooking: (booking: DashboardBooking) => void;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/55 bg-white/[0.65] text-[#1F2340] shadow-[0_8px_32px_rgba(99,102,241,0.08)] backdrop-blur-2xl transition duration-[250ms] hover:-translate-y-0.5">
      <div className="flex items-center justify-between gap-3 border-b border-white/55 px-4 py-4">
        <div>
          <p className="text-[14px] font-semibold text-[#1F2340]">Recent bookings</p>
          <p className="mt-1 text-[12px] font-medium text-[#8E95B5]">
            {searchQuery ? `Filtered by "${searchQuery}"` : "Latest matching records"}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#6366F1]">
          Open drawer
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-[13px]">
          <thead className="text-[12px] uppercase tracking-[0.1em] text-[#8E95B5]">
            <tr className="border-b border-white/55">
              <th className="px-4 py-3 font-semibold">Customer</th>
              <th className="px-4 py-3 font-semibold">Appointment</th>
              <th className="px-4 py-3 font-semibold">Service</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/55">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id} className="transition hover:bg-white/45">
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => onSelectBooking(booking)}
                      className="text-left font-semibold text-[#1F2340] hover:text-[#6366F1]"
                    >
                      {booking.customerName || booking.customerEmail}
                    </button>
                    <p className="mt-0.5 text-[12px] font-medium text-[#8E95B5]">{booking.registrationNumber}</p>
                  </td>
                  <td className="px-4 py-3 font-medium text-[#4B5563]">{booking.appointmentLabel}</td>
                  <td className="px-4 py-3 font-medium text-[#4B5563]">{booking.packageLabel}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-[#1F2340]">
                    {formatPrice(booking.total)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-8">
                  <div className="rounded-2xl border border-dashed border-[#DDE3F5] bg-white/45 px-4 py-5 text-center">
                    <p className="text-[13px] font-semibold text-[#1F2340]">No matching bookings</p>
                    <p className="mt-1 text-[12px] font-medium text-[#8E95B5]">Adjust search or create a new booking.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
