"use client";

import {
  CalendarClock,
  CarFront,
  CreditCard,
  MapPinned,
  StickyNote,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";
import type { DashboardBooking } from "@/lib/server/bookings";
import { formatPrice } from "@/lib/shared/booking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PaymentBadge, StatusBadge } from "@/components/admin/status-badge";
import { cn } from "@/lib/utils";

export function BookingDetailDrawer({
  booking,
  open,
  onClose,
  timeSlots,
}: {
  booking: DashboardBooking | null;
  open: boolean;
  onClose: () => void;
  timeSlots: string[];
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close booking drawer"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-slate-950/55 transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
      />
      <aside
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-[29rem] flex-col border-l border-white/55 bg-white/[0.82] text-[#111827] shadow-[0_8px_32px_rgba(0,167,184,0.16)] backdrop-blur-2xl transition-transform duration-200",
          open ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Booking details"
      >
        {booking ? (
          <>
            <div className="flex items-start justify-between gap-4 border-b border-white/55 px-5 py-5">
              <div className="min-w-0">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#00A7B8]">
                  Booking detail
                </p>
                <h2 className="mt-2 truncate text-xl font-bold">
                  {booking.customerName || booking.customerEmail}
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  <StatusBadge status={booking.status} />
                  <PaymentBadge status={booking.paymentStatus} />
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl border border-white/55 bg-white/60 p-2 text-[#6B7280] transition hover:bg-white hover:text-[#111827]"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
              <div className="grid gap-3">
                <DrawerInfo
                  icon={UserRound}
                  label="Customer"
                  value={booking.customerName || booking.customerEmail}
                  detail={`${booking.customerEmail} | ${booking.customerPhone || "No phone"}`}
                />
                <DrawerInfo
                  icon={CarFront}
                  label="Vehicle"
                  value={booking.vehicleName || booking.registrationNumber}
                  detail={`${booking.registrationNumber} | ${booking.category || "No category"}`}
                />
                <DrawerInfo
                  icon={CalendarClock}
                  label="Appointment"
                  value={booking.appointmentLabel}
                  detail={`${booking.appointmentTime} - ${booking.appointmentEndTime}`}
                />
                <DrawerInfo
                  icon={MapPinned}
                  label="Address"
                  value={`${booking.address}, ${booking.postalCode} ${booking.city}`}
                  detail={booking.areaName || "No route area"}
                />
                <DrawerInfo
                  icon={CreditCard}
                  label="Payment"
                  value={formatPrice(booking.total)}
                  detail={`${booking.paymentMethod || "No method"} | Invoice: ${booking.invoiceStatus}`}
                />
                <DrawerInfo
                  icon={StickyNote}
                  label="Notes"
                  value={booking.adminNotes || "No admin notes"}
                  detail={booking.addons.length > 0 ? `Add-ons: ${booking.addons.map((item) => item.label).join(", ")}` : "No add-ons"}
                />
              </div>

              {booking.vehicles.length > 1 ? (
                <div className="mt-4 rounded-3xl border border-white/55 bg-white/50 p-4">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#00A7B8]">
                    Biler i bookingen
                  </p>
                  <div className="mt-3 grid gap-3">
                    {booking.vehicles.map((vehicle) => (
                      <div key={vehicle.id} className="rounded-2xl bg-white/70 px-4 py-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[13px] font-bold text-[#111827]">
                              {vehicle.label} · {vehicle.registrationNumber}
                            </p>
                            <p className="mt-1 text-[12px] font-medium text-[#6B7280]">
                              {vehicle.vehicleName}
                            </p>
                          </div>
                          <span className="text-[12px] font-bold text-[#00A7B8]">
                            {formatPrice(vehicle.totalPrice)}
                          </span>
                        </div>
                        <p className="mt-2 text-[12px] text-[#6B7280]">
                          {vehicle.packageLabel} {vehicle.category ? `· ${vehicle.category}` : ""}
                        </p>
                        {vehicle.addons.length > 0 ? (
                          <p className="mt-1 text-[12px] text-[#6B7280]">
                            Tilvalg: {vehicle.addons.map((item) => item.label).join(", ")}
                          </p>
                        ) : null}
                        {vehicle.discountAmount > 0 ? (
                          <p className="mt-1 text-[12px] font-semibold text-[#047857]">
                            15% rabat på bil 2: -{formatPrice(vehicle.discountAmount)}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-6 rounded-3xl border border-white/55 bg-white/50 p-4">
                <p className="text-[14px] font-semibold">Status actions</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  <BookingActionForm booking={booking} action="approve" label="Approve" />
                  <BookingActionForm booking={booking} action="complete" label="Complete" />
                  <BookingActionForm booking={booking} action="cancel" label="Cancel" danger />
                </div>
              </div>

              <form
                action={`/api/admin/bookings/${booking.id}`}
                method="POST"
                className="mt-4 rounded-3xl border border-white/55 bg-white/50 p-4"
              >
                <input type="hidden" name="action" value="reschedule" />
                <input type="hidden" name="return_view" value="overview" />
                <p className="text-[14px] font-semibold">Reschedule</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <label className="grid gap-1.5 text-[12px] font-medium text-[#6B7280]">
                    Date
                    <Input
                      type="date"
                      name="appointment_date"
                      defaultValue={booking.appointmentDate}
                      className="rounded-2xl border-white/55 bg-white/65 text-[#111827]"
                    />
                  </label>
                  <label className="grid gap-1.5 text-[12px] font-medium text-[#6B7280]">
                    Time
                    <select
                      name="appointment_time"
                      defaultValue={booking.appointmentTime}
                      className="h-10 rounded-2xl border border-white/55 bg-white/65 px-3 text-[13px] font-medium text-[#111827] outline-none"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-1.5 text-[12px] font-medium text-[#6B7280] sm:col-span-2">
                    Admin notes
                    <Textarea
                      name="admin_notes"
                      defaultValue={booking.adminNotes}
                      className="min-h-20 rounded-2xl border-white/55 bg-white/65 text-[#111827]"
                    />
                  </label>
                </div>
                <label className="mt-3 flex items-center gap-2 text-[12px] font-medium text-[#6B7280]">
                  <input
                    type="checkbox"
                    name="notify_customer"
                    defaultChecked
                    className="h-4 w-4 rounded border-[#DCEEF2] bg-white"
                  />
                  Notify customer
                </label>
                <Button type="submit" className="mt-4 w-full">
                  Save new time
                </Button>
              </form>
            </div>
          </>
        ) : null}
      </aside>
    </div>
  );
}

function BookingActionForm({
  booking,
  action,
  label,
  danger = false,
}: {
  booking: DashboardBooking;
  action: "approve" | "complete" | "cancel";
  label: string;
  danger?: boolean;
}) {
  return (
    <form action={`/api/admin/bookings/${booking.id}`} method="POST">
      <input type="hidden" name="action" value={action} />
      <input type="hidden" name="return_view" value="overview" />
      <input type="hidden" name="admin_notes" value={booking.adminNotes} />
      <button
        type="submit"
        className={cn(
          "h-10 w-full rounded-2xl border px-3 text-[12px] font-semibold transition duration-[250ms] hover:-translate-y-0.5",
          danger
            ? "border-[#EF4444]/20 bg-[#EF4444]/10 text-[#B91C1C] hover:bg-[#EF4444]/15"
            : "border-white/55 bg-white/65 text-[#111827] hover:bg-white"
        )}
      >
        {label}
      </button>
    </form>
  );
}

function DrawerInfo({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="flex min-w-0 gap-3 rounded-3xl border border-white/55 bg-white/50 px-4 py-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#EEFBFC] text-[#00A7B8]">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#6B7280]">
          {label}
        </p>
        <p className="mt-1 truncate text-[13px] font-semibold text-[#111827]">{value}</p>
        <p className="mt-0.5 truncate text-[12px] font-medium text-[#6B7280]">{detail}</p>
      </div>
    </div>
  );
}
