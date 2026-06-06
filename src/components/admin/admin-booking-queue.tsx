"use client";

import { useMemo, useState, type ReactNode } from "react";
import { CalendarClock, ChevronDown, CircleCheckBig, Eye } from "lucide-react";
import { AdminInvoicePanel } from "@/components/admin/admin-invoice-panel";
import { PaymentBadge, StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { DashboardBooking } from "@/lib/server/bookings";
import {
  formatPrice,
  getInvoiceStatusLabel,
  getPaymentStatusLabel,
  invoiceStatuses,
  paymentStatuses,
  type BookingStatus,
} from "@/lib/shared/booking";
import { cn } from "@/lib/utils";

type QueueTab = "waiting" | "complete";
type DetailTab = "customer" | "payment" | "invoice";
type BookingAction = "approve" | "complete" | "cancel";

const queueStorageKey = "washmax-admin-booking-queue";
const detailTabs = [
  { id: "customer", label: "Kunde" },
  { id: "payment", label: "Betaling" },
  { id: "invoice", label: "Faktura" },
] as const satisfies Array<{ id: DetailTab; label: string }>;

export function AdminBookingQueue({
  bookings,
  timeSlots,
}: {
  bookings: DashboardBooking[];
  timeSlots: string[];
}) {
  const [activeQueue, setActiveQueue] = useState<QueueTab>(() => {
    if (typeof window === "undefined") {
      return "waiting";
    }

    return window.sessionStorage.getItem(queueStorageKey) === "complete"
      ? "complete"
      : "waiting";
  });

  const waitingBookings = useMemo(
    () =>
      bookings.filter(
        (booking) => booking.status !== "completed" && booking.status !== "cancelled"
      ),
    [bookings]
  );
  const completedBookings = useMemo(
    () =>
      bookings.filter(
        (booking) => booking.status === "completed" || booking.status === "cancelled"
      ),
    [bookings]
  );
  const activeBookings = activeQueue === "waiting" ? waitingBookings : completedBookings;

  const switchQueue = (nextQueue: QueueTab) => {
    setActiveQueue(nextQueue);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(queueStorageKey, nextQueue);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.6rem] border border-[#d9e7f0] bg-white px-4 py-4 shadow-[0_14px_40px_rgba(8,27,21,0.05)]">
        <div className="flex flex-wrap gap-2">
          <QueueToggle
            active={activeQueue === "waiting"}
            count={waitingBookings.length}
            icon={CalendarClock}
            label="Waiting"
            onClick={() => switchQueue("waiting")}
          />
          <QueueToggle
            active={activeQueue === "complete"}
            count={completedBookings.length}
            icon={CircleCheckBig}
            label="Complete"
            onClick={() => switchQueue("complete")}
          />
        </div>
        <p className="text-sm font-medium text-[#5b6b7c]">
          {activeQueue === "waiting"
            ? "Aabn kunden og handter bookingen hurtigt."
            : "Faerdige og stoppede bookinger."}
        </p>
      </div>

      {activeQueue === "waiting" ? (
        <MobileWaitingLane bookings={waitingBookings.slice(0, 8)} />
      ) : null}

      <div className="grid gap-4">
        {activeBookings.length > 0 ? (
          activeBookings.map((booking) => (
            <CompactBookingCard
              key={booking.id}
              booking={booking}
              timeSlots={timeSlots}
              showQuickActions={activeQueue === "waiting"}
            />
          ))
        ) : (
          <SmallEmptyState
            title={
              activeQueue === "waiting" ? "Ingen ventende bookinger" : "Ingen afsluttede bookinger"
            }
            detail="Listen opdateres automatisk."
          />
        )}
      </div>
    </div>
  );
}

function QueueToggle({
  active,
  count,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean;
  count: number;
  icon: typeof CalendarClock;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition",
        active
          ? "border-[#2563eb] bg-[#eff6ff] text-[#1d4ed8] shadow-[0_12px_32px_rgba(37,99,235,0.14)]"
          : "border-[#dbe3f2] bg-[#f8fbff] text-[#334155] hover:border-[#bfdbfe] hover:bg-white"
      )}
    >
      <span
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl",
          active ? "bg-white" : "bg-white/70"
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span>
        <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] opacity-70">
          {label}
        </span>
        <strong className="block text-base font-bold">{count}</strong>
      </span>
    </button>
  );
}

function MobileWaitingLane({ bookings }: { bookings: DashboardBooking[] }) {
  if (bookings.length === 0) {
    return null;
  }

  return (
    <section className="md:hidden">
      <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2">
        {bookings.map((booking) => {
          const actions = getBookingActions(booking.status);

          return (
            <article
              key={booking.id}
              className="min-w-[18rem] snap-center rounded-[1.5rem] border border-[#bfdbfe] bg-[linear-gradient(155deg,#eff6ff,#ffffff)] px-4 py-4 shadow-[0_18px_45px_rgba(37,99,235,0.12)]"
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#2563eb]">
                {booking.appointmentTime}
              </p>
              <h3 className="mt-1 text-lg font-bold text-[#10243b]">
                {booking.customerName || booking.customerEmail}
              </h3>
              <p className="mt-1 text-sm text-[#5b6b7c]">
                {booking.packageLabel} - {booking.category}
              </p>
              <p className="mt-3 text-sm text-[#334155]">{formatPrice(booking.total)}</p>

              <div
                className={cn(
                  "mt-4 grid gap-2",
                  actions.length >= 3 ? "grid-cols-3" : actions.length === 2 ? "grid-cols-2" : "grid-cols-1"
                )}
              >
                {actions.map((action) => (
                  <QuickAction
                    key={action.value}
                    booking={booking}
                    action={action.value}
                    label={shortActionLabel(action.value)}
                    danger={action.value === "cancel"}
                  />
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function CompactBookingCard({
  booking,
  timeSlots,
  showQuickActions,
}: {
  booking: DashboardBooking;
  timeSlots: string[];
  showQuickActions: boolean;
}) {
  const [activeTab, setActiveTab] = useState<DetailTab>("customer");
  const actions = getBookingActions(booking.status);

  return (
    <details
      id={`booking-${booking.id}`}
      className="group overflow-hidden rounded-[1.6rem] border border-[#d9e7f0] bg-white shadow-[0_14px_40px_rgba(8,27,21,0.05)]"
    >
      <summary className="list-none cursor-pointer px-4 py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-lg font-bold text-[#10243b]">
                {booking.customerName || booking.customerEmail}
              </h3>
              <StatusBadge status={booking.status} />
              <PaymentBadge status={booking.paymentStatus} />
            </div>
            <p className="mt-1 text-sm text-[#5b6b7c]">
              {booking.packageLabel} - {booking.category}
            </p>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-[#475569]">
              <span>{booking.appointmentLabel}</span>
              <span>{booking.registrationNumber}</span>
              <span>{formatPrice(booking.total)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {showQuickActions ? (
              <div className="hidden sm:flex sm:flex-wrap sm:gap-2">
                {actions.map((action) => (
                  <QuickAction
                    key={action.value}
                    booking={booking}
                    action={action.value}
                    label={shortActionLabel(action.value)}
                    danger={action.value === "cancel"}
                  />
                ))}
              </div>
            ) : null}
            <span className="inline-flex items-center gap-2 rounded-2xl bg-[#f8fbff] px-3 py-2 text-[12px] font-semibold text-[#2563eb]">
              <Eye className="h-4 w-4" />
              Aabn
              <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
            </span>
          </div>
        </div>
      </summary>

      <div className="border-t border-[#e8eef6] px-4 py-4">
        <div className="mb-4 flex flex-wrap gap-2">
          {detailTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "rounded-2xl border px-3 py-2 text-[12px] font-semibold transition",
                activeTab === tab.id
                  ? "border-[#2563eb] bg-[#eff6ff] text-[#1d4ed8]"
                  : "border-[#dbe3f2] bg-white text-[#475569] hover:bg-[#f8fbff]"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "customer" ? (
          <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-3xl border border-[#e8eef6] bg-[#fbfdff] px-4 py-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#2563eb]">
                Kunde og booking
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <MiniRow label="Kunde" value={booking.customerName || booking.customerEmail} />
                <MiniRow label="E-mail" value={booking.customerEmail} />
                <MiniRow label="Telefon" value={booking.customerPhone} />
                <MiniRow
                  label="Adresse"
                  value={`${booking.address}, ${booking.postalCode} ${booking.city}`}
                />
                <MiniRow label="Pakke" value={`${booking.packageLabel} - ${booking.category}`} />
                <MiniRow
                  label="Bil"
                  value={`${booking.vehicleName} (${booking.registrationNumber})`}
                />
                <MiniRow label="Omraade" value={booking.areaName || booking.city || "Ikke sat"} />
                <MiniRow
                  label="Agent"
                  value={booking.assignedAgentId ? booking.agentStatus || "Assigned" : "Ikke tildelt"}
                />
              </div>

              {booking.addons.length > 0 ? (
                <div className="mt-4 rounded-2xl border border-[#e4edf3] bg-white px-3 py-3">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8e95b5]">
                    Tilvalg
                  </p>
                  <div className="mt-2 grid gap-2">
                    {booking.addons.map((addon) => (
                      <div
                        key={addon.id}
                        className="flex items-center justify-between gap-3 text-sm text-[#334155]"
                      >
                        <span>{addon.label}</span>
                        <strong>{formatPrice(addon.price)}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-4 rounded-2xl border border-[#e4edf3] bg-white px-3 py-3">
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8e95b5]">
                  Ombooking
                </p>
                <form
                  action={`/api/admin/bookings/${booking.id}`}
                  method="POST"
                  className="mt-3 grid gap-3"
                >
                  <input type="hidden" name="action" value="reschedule" />
                  <input type="hidden" name="return_view" value="bookings" />
                  <input type="hidden" name="return_tab" value="details" />
                  <Field label="Dato">
                    <Input
                      name="appointment_date"
                      type="date"
                      defaultValue={booking.appointmentDate}
                    />
                  </Field>
                  <Field label="Tid">
                    <select
                      name="appointment_time"
                      defaultValue={booking.appointmentTime}
                      className={selectClassName}
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Note">
                    <Textarea
                      name="admin_notes"
                      defaultValue={booking.adminNotes}
                      className="min-h-20"
                    />
                  </Field>
                  <label className="flex items-start gap-3 text-sm text-[#334155]">
                    <input
                      type="checkbox"
                      name="notify_customer"
                      defaultChecked
                      className="mt-1 h-4 w-4 rounded border-[#9cb0bd]"
                    />
                    <span>Send besked til kunden</span>
                  </label>
                  <Button
                    type="submit"
                    variant="secondary"
                    data-progress-label="Gemmer ny tid..."
                  >
                    Gem tid
                  </Button>
                </form>
              </div>
            </section>

            <section className="rounded-3xl border border-[#e8eef6] bg-[#fbfdff] px-4 py-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#2563eb]">
                Handlinger
              </p>
              <form
                action={`/api/admin/bookings/${booking.id}`}
                method="POST"
                className="mt-3 grid gap-3"
              >
                <input type="hidden" name="return_view" value="bookings" />
                <input type="hidden" name="return_tab" value="details" />
                <Textarea
                  name="admin_notes"
                  defaultValue={booking.adminNotes}
                  className="min-h-24"
                  placeholder="Kort note til teamet"
                />
                {actions.length > 0 ? (
                  <div className="grid gap-2">
                    {actions.map((action) => (
                      <Button
                        key={action.value}
                        type="submit"
                        name="action"
                        value={action.value}
                        variant={
                          action.value === "approve"
                            ? "success"
                            : action.value === "complete"
                              ? "secondary"
                              : "outline"
                        }
                        data-progress-label={`${shortActionLabel(action.value)} booking...`}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <SmallEmptyState title="Ingen handlinger" detail="Bookingen er allerede afsluttet." />
                )}
                <Button
                  type="submit"
                  name="action"
                  value="delete"
                  variant="outline"
                  className="border-red-200 text-red-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                  data-progress-label="Sletter booking..."
                >
                  Slet booking
                </Button>
              </form>
            </section>
          </div>
        ) : null}

        {activeTab === "payment" ? (
          <section className="rounded-3xl border border-[#e8eef6] bg-[#fbfdff] px-4 py-4">
            <form
              action={`/api/admin/bookings/${booking.id}`}
              method="POST"
              className="grid gap-3 lg:grid-cols-2"
            >
              <input type="hidden" name="action" value="financial" />
              <input type="hidden" name="return_view" value="bookings" />
              <input type="hidden" name="return_tab" value="details" />
              <Field label="Betaling">
                <select
                  name="payment_status"
                  defaultValue={booking.paymentStatus}
                  className={selectClassName}
                >
                  {paymentStatuses.map((status) => (
                    <option key={status} value={status}>
                      {getPaymentStatusLabel(status)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Metode">
                <Input
                  name="payment_method"
                  defaultValue={booking.paymentMethod}
                  placeholder="Fx kort eller MobilePay"
                />
              </Field>
              <Field label="Faktura">
                <select
                  name="invoice_status"
                  defaultValue={booking.invoiceStatus}
                  className={selectClassName}
                >
                  {invoiceStatuses.map((status) => (
                    <option key={status} value={status}>
                      {getInvoiceStatusLabel(status)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Nummer">
                <Input name="invoice_number" defaultValue={booking.invoiceNumber} />
              </Field>
              <Field label="Note" className="lg:col-span-2">
                <Textarea
                  name="admin_notes"
                  defaultValue={booking.adminNotes}
                  className="min-h-20"
                />
              </Field>
              <label className="flex items-center gap-3 text-sm text-[#334155] lg:col-span-2">
                <input
                  type="checkbox"
                  name="invoice_requested"
                  defaultChecked={booking.invoiceRequested}
                  className="h-4 w-4 rounded border-[#9cb0bd]"
                />
                <span>Faktura oenskes</span>
              </label>
              <div className="lg:col-span-2">
                <Button
                  type="submit"
                  variant="secondary"
                  data-progress-label="Gemmer betaling..."
                >
                  Gem betaling
                </Button>
              </div>
            </form>
          </section>
        ) : null}

        {activeTab === "invoice" ? (
          <section className="space-y-4">
            <AdminInvoicePanel booking={booking} />
          </section>
        ) : null}
      </div>
    </details>
  );
}

function QuickAction({
  booking,
  action,
  label,
  danger = false,
}: {
  booking: DashboardBooking;
  action: BookingAction;
  label: string;
  danger?: boolean;
}) {
  return (
    <form action={`/api/admin/bookings/${booking.id}`} method="POST">
      <input type="hidden" name="action" value={action} />
      <input type="hidden" name="return_view" value="bookings" />
      <input type="hidden" name="return_tab" value="details" />
      <input type="hidden" name="admin_notes" value={booking.adminNotes} />
      <button
        type="submit"
        data-progress-label={`${label} booking...`}
        className={cn(
          "h-10 w-full rounded-2xl border px-2 text-[12px] font-semibold transition active:scale-[0.98]",
          danger
            ? "border-red-200 bg-red-50 text-red-700"
            : "border-[#bfdbfe] bg-white text-[#1d4ed8]"
        )}
      >
        {label}
      </button>
    </form>
  );
}

function MiniRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/60 bg-white px-3 py-2.5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8e95b5]">
        {label}
      </p>
      <p className="mt-1 text-[13px] font-semibold text-[#10243b]">{value || "-"}</p>
    </div>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={cn("grid gap-1.5 text-[13px] font-medium text-[#1F2340]", className)}>
      <span>{label}</span>
      {children}
    </label>
  );
}

function SmallEmptyState({
  title,
  detail,
}: {
  title: string;
  detail: string;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-[#DDE3F5] bg-white/55 px-4 py-4">
      <p className="text-[13px] font-semibold text-[#1F2340]">{title}</p>
      <p className="mt-1 text-[12px] font-medium text-[#8E95B5]">{detail}</p>
    </div>
  );
}

function getBookingActions(status: BookingStatus) {
  switch (status) {
    case "approved":
      return [
        { value: "complete", label: "Afslut booking" },
        { value: "cancel", label: "Stop booking" },
      ] as const;
    case "cancelled":
      return [{ value: "approve", label: "Godkend igen" }] as const;
    case "completed":
      return [] as const;
    default:
      return [
        { value: "approve", label: "Godkend" },
        { value: "cancel", label: "Stop booking" },
      ] as const;
  }
}

function shortActionLabel(action: BookingAction) {
  switch (action) {
    case "approve":
      return "Godkend";
    case "complete":
      return "Afslut";
    default:
      return "Stop";
  }
}

const selectClassName =
  "h-10 w-full rounded-2xl border border-[#E1E6F7] bg-white/70 px-3 text-[13px] font-medium text-[#1F2340] outline-none transition focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10";
