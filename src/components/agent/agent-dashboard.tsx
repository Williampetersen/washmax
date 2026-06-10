import Link from "next/link";
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock3,
  LogOut,
  MapPin,
  MessageCircle,
  Phone,
  ReceiptText,
  UserRound,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type {
  AgentAvailability,
  AgentBooking,
  AgentDashboardData,
  AgentService,
} from "@/lib/server/agents";
import type { Invoice } from "@/lib/server/invoices";
import { BookingTabs } from "@/components/dashboard/booking-tabs";
import { LazyBookingInvoice } from "@/components/invoices/lazy-booking-invoice";
import { formatPrice } from "@/lib/shared/booking";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "tasks", label: "Tasks", icon: CheckCircle2 },
  { id: "invoices", label: "Invoices", icon: ReceiptText },
  { id: "availability", label: "Availability", icon: Clock3 },
  { id: "services", label: "Services", icon: Wrench },
  { id: "chat", label: "Chat", icon: MessageCircle },
  { id: "profile", label: "Profile", icon: UserRound },
] as const;

export type AgentView = (typeof tabs)[number]["id"];

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function AgentDashboard({
  data,
  invoices,
  view,
  saved,
  error,
}: {
  data: AgentDashboardData;
  invoices: Invoice[];
  view: AgentView;
  saved?: string;
  error?: string;
}) {
  const unread = data.notifications.filter((item) => !item.isRead).length;

  return (
    <main className="min-h-screen bg-[#F6F8FE] px-4 py-5 text-[#1F2340] sm:px-6">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-4 xl:grid-cols-[16rem_minmax(0,1fr)]">
          <aside className="overflow-hidden rounded-3xl border border-white/55 bg-white/[0.72] shadow-[0_8px_32px_rgba(99,102,241,0.08)] backdrop-blur-2xl xl:sticky xl:top-5 xl:self-start">
            <div className="border-b border-white/55 px-4 py-5">
              <div className="flex items-center gap-3">
                <AgentAvatar name={data.agent.fullName} avatarUrl={data.agent.avatarUrl} />
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#6366F1]">
                    Agent
                  </p>
                  <p className="mt-1 truncate text-[13px] font-semibold">{data.agent.fullName}</p>
                  <p className="truncate text-[12px] font-medium text-[#8E95B5]">{data.agent.email}</p>
                </div>
              </div>
            </div>

            <nav className="flex snap-x gap-2 overflow-x-auto px-3 py-3 xl:grid xl:grid-cols-1 xl:overflow-visible">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = view === tab.id;
                return (
                  <Link
                    key={tab.id}
                    href={`/agent?view=${tab.id}`}
                    scroll={false}
                    className={cn(
                      "flex min-w-[8.75rem] items-center gap-2 rounded-2xl px-3 py-2.5 text-[13px] font-semibold transition xl:min-w-0",
                      active
                        ? "bg-[#6366F1] text-white shadow-[0_8px_20px_rgba(99,102,241,0.18)]"
                        : "text-[#8E95B5] hover:bg-white/70 hover:text-[#1F2340]"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="truncate">{tab.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-white/55 px-4 py-4">
              <div className="grid grid-cols-3 gap-2">
                <SmallStat label="Pending" value={data.stats.pending.toString()} />
                <SmallStat label="Done" value={data.stats.done.toString()} />
                <SmallStat label="Unread" value={unread.toString()} />
              </div>
              <form action="/api/agent/logout" method="POST" className="mt-4">
                <Button type="submit" variant="ghost" className="w-full justify-start rounded-2xl">
                  <LogOut className="h-5 w-5" />
                  Logout
                </Button>
              </form>
            </div>
          </aside>

          <div className="space-y-5">
            {saved || error ? (
              <div
                className={cn(
                  "rounded-3xl border px-4 py-4 text-[13px] font-medium",
                  error ? "border-red-200 bg-red-50 text-red-700" : "border-[#CDE6F6] bg-[#F6FBFF] text-[#1A506D]"
                )}
              >
                {error ? "Handlingen kunne ikke gennemføres." : "Ændringen er gemt."}
              </div>
            ) : null}

            {view === "overview" ? <Overview data={data} /> : null}
            {view === "calendar" ? <CalendarView bookings={data.bookings} /> : null}
            {view === "tasks" ? (
              <TasksView
                bookings={data.bookings}
                services={data.services}
              />
            ) : null}
            {view === "invoices" ? <AgentInvoicesView invoices={invoices} /> : null}
            {view === "availability" ? (
              <AvailabilityView availability={data.availability} />
            ) : null}
            {view === "services" ? <ServicesView services={data.services} /> : null}
            {view === "chat" ? <ChatView data={data} /> : null}
            {view === "profile" ? <ProfileView data={data} /> : null}
          </div>
        </div>
      </section>
    </main>
  );
}

function Overview({ data }: { data: AgentDashboardData }) {
  const nextJob = [...data.bookings]
    .filter((booking) => booking.agentStatus !== "done" && booking.agentStatus !== "cancelled_by_agent")
    .sort((left, right) =>
      `${left.appointmentDate}T${left.appointmentTime}`.localeCompare(
        `${right.appointmentDate}T${right.appointmentTime}`
      )
    )[0];
  const cards = [
    { label: "Assigned", value: data.stats.totalAssigned, detail: "All bookings", icon: Calendar },
    { label: "Pending", value: data.stats.pending, detail: "Awaiting your answer", icon: Clock3 },
    { label: "Accepted", value: data.stats.accepted, detail: "Ready to work", icon: CheckCircle2 },
    { label: "Done", value: data.stats.done, detail: `${data.stats.currentMonthDone} this month`, icon: BarChart3 },
  ];

  return (
    <div className="space-y-5">
      <NextAgentJobCard booking={nextJob} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <section key={card.label} className="rounded-3xl border border-white/55 bg-white/[0.72] p-4 shadow-[0_8px_32px_rgba(99,102,241,0.08)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[12px] font-medium text-[#8E95B5]">{card.label}</p>
                  <p className="mt-2 text-2xl font-bold">{card.value}</p>
                  <p className="mt-1 text-[12px] font-medium text-[#4B5563]">{card.detail}</p>
                </div>
                <Icon className="h-5 w-5 text-[#6366F1]" />
              </div>
            </section>
          );
        })}
      </div>
      <section className="rounded-3xl border border-white/55 bg-white/[0.72] p-4 shadow-[0_8px_32px_rgba(99,102,241,0.08)]">
        <p className="text-[14px] font-semibold">Status chart</p>
        <div className="mt-4 grid gap-3">
          {data.stats.byStatus.map((item) => (
            <div key={item.status} className="grid gap-1">
              <div className="flex justify-between text-[12px] font-semibold text-[#4B5563]">
                <span>{item.label}</span>
                <span>{item.count}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#E7EAF6]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(100, item.count * 15)}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function NextAgentJobCard({ booking }: { booking?: AgentBooking }) {
  if (!booking) {
    return (
      <section className="rounded-3xl border border-white/55 bg-white/[0.72] p-5 shadow-[0_8px_32px_rgba(99,102,241,0.08)]">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#6366F1]">
          Next job
        </p>
        <h2 className="mt-2 text-2xl font-bold">No active jobs</h2>
        <p className="mt-2 text-[13px] font-medium leading-6 text-[#4B5563]">
          New assigned bookings will appear here first.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-[#DDE3F5] bg-white p-5 shadow-[0_12px_36px_rgba(99,102,241,0.1)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#6366F1]">
            Next job
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#1F2340]">
            {booking.appointmentLabel}
          </h2>
          <p className="mt-1 text-[13px] font-semibold text-[#4B5563]">
            {booking.customerName || booking.customerEmail}
          </p>
        </div>
        <AgentStatusPill status={booking.agentStatus} />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        <Info label="Address" value={booking.customerAddress} />
        <Info label="Vehicle" value={`${booking.vehicleName} (${booking.registrationNumber})`} />
        <Info label="Service" value={`${booking.packageLabel} - ${booking.category}`} />
        <Info label="Price" value={formatPrice(booking.total)} />
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        {booking.customerPhone ? (
          <a
            href={`tel:${booking.customerPhone.replace(/\s+/g, "")}`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#6366F1] px-4 text-[13px] font-semibold text-white"
          >
            <Phone className="h-5 w-5" />
            Call customer
          </a>
        ) : null}
        {booking.customerAddress ? (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.customerAddress)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-[#DDE3F5] bg-white px-4 text-[13px] font-semibold text-[#1F2340]"
          >
            <MapPin className="h-5 w-5" />
            Open route
          </a>
        ) : null}
        <Link
          href={`/agent?view=tasks#booking-${booking.id}`}
          className="inline-flex h-11 items-center justify-center rounded-2xl border border-[#DDE3F5] bg-white px-4 text-[13px] font-semibold text-[#1F2340]"
        >
          Open task
        </Link>
      </div>
    </section>
  );
}

function CalendarView({ bookings }: { bookings: AgentBooking[] }) {
  const days = Array.from(
    bookings.reduce((map, booking) => {
      const list = map.get(booking.appointmentDate) || [];
      list.push(booking);
      map.set(booking.appointmentDate, list);
      return map;
    }, new Map<string, AgentBooking[]>())
  ).sort(([left], [right]) => left.localeCompare(right));

  return (
    <section className="rounded-3xl border border-white/55 bg-white/[0.72] p-4 shadow-[0_8px_32px_rgba(99,102,241,0.08)]">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {days.length > 0 ? (
          days.map(([date, items]) => (
            <div key={date} className="rounded-2xl border border-white/55 bg-white/55 p-3">
              <p className="text-[13px] font-bold">{date}</p>
              <div className="mt-3 grid gap-2">
                {items.map((booking) => (
                  <a
                    key={booking.id}
                    href={`/agent?view=tasks#booking-${booking.id}`}
                    className={cn(
                      "rounded-2xl border px-3 py-2 text-[12px] font-semibold",
                      getAgentStatusTone(booking.agentStatus)
                    )}
                  >
                    <span className="block">{booking.appointmentTime} | {booking.customerName}</span>
                    <span className="block truncate opacity-80">{booking.packageLabel}</span>
                  </a>
                ))}
              </div>
            </div>
          ))
        ) : (
          <EmptyState text="No assigned bookings in your calendar." />
        )}
      </div>
    </section>
  );
}

function TasksView({
  bookings,
  services,
}: {
  bookings: AgentBooking[];
  services: AgentService[];
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-[0_10px_32px_rgba(31,35,64,0.06)]">
      {bookings.length > 0 ? (
        <div className="divide-y divide-[#e8ebf5]">
          {bookings.map((booking) => (
            <TaskCard key={booking.id} booking={booking} services={services} />
          ))}
        </div>
      ) : (
        <div className="p-4">
          <EmptyState text="No bookings assigned to you yet." />
        </div>
      )}
    </div>
  );
}

function TaskCard({
  booking,
  services,
}: {
  booking: AgentBooking;
  services: AgentService[];
}) {
  return (
    <details id={`booking-${booking.id}`} className="group bg-white/35 open:bg-white">
      <summary className="cursor-pointer list-none px-4 py-4 transition hover:bg-white/75">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_9rem_8rem] lg:items-center">
          <div className="min-w-0">
            <p className="truncate text-[14px] font-bold text-[#1f2340]">
              {booking.customerName || booking.customerEmail}
            </p>
            <p className="mt-1 truncate text-[12px] font-medium text-[#7b829f]">
              {booking.vehicleName} · {booking.registrationNumber}
            </p>
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-[#374151]">
              {booking.appointmentLabel}
            </p>
            <p className="mt-1 truncate text-[12px] font-medium text-[#7b829f]">
              {booking.packageLabel} · {booking.category}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <AgentStatusPill status={booking.agentStatus} />
            <InvoiceBadge status={booking.invoiceStatus} />
          </div>
          <p className="text-[14px] font-bold text-[#1f2340] lg:text-right">
            {formatPrice(booking.total)}
          </p>
        </div>
      </summary>

      <div className="border-t border-[#e8ebf5] px-4 py-5">
        <BookingTabs
          tabs={[
            {
              id: "details",
              label: "Details",
              content: (
                <div>
                  <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                    <Info label="Phone" value={booking.customerPhone} />
                    <Info label="Email" value={booking.customerEmail} />
                    <Info label="Address" value={booking.customerAddress} />
                    <Info label="Vehicle" value={`${booking.vehicleName} (${booking.registrationNumber})`} />
                    <Info label="Service" value={`${booking.packageLabel} - ${booking.category}`} />
                    <Info label="Customer notes" value={booking.customerNotes || "-"} />
                    <Info label="Admin notes" value={booking.adminNotes || "-"} />
                    <Info label="Agent note" value={booking.agentNote || "-"} />
                  </div>
                  {booking.addons.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {booking.addons.map((addon) => (
                        <span key={addon.id} className="rounded-full border border-[#DDE3F5] bg-white/60 px-2.5 py-1 text-[12px] font-semibold text-[#4B5563]">
                          {addon.label}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              ),
            },
            {
              id: "actions",
              label: "Job actions",
              content: (
                <div className="grid gap-3">
                  <div className="grid gap-3 lg:grid-cols-2">
                    <form action={`/api/agent/bookings/${booking.id}/accept`} method="POST" className="grid gap-2 rounded-2xl border border-white/55 bg-white/50 p-3">
                      <Textarea name="note" placeholder="Optional note for admin" className="min-h-16" />
                      <Button type="submit">Accept booking</Button>
                    </form>
                    <form action={`/api/agent/bookings/${booking.id}/reject`} method="POST" className="grid gap-2 rounded-2xl border border-white/55 bg-white/50 p-3">
                      <Textarea name="note" placeholder="Optional rejection reason" className="min-h-16" />
                      <Button type="submit" variant="outline">Reject booking</Button>
                    </form>
                  </div>
                  <form action={`/api/agent/bookings/${booking.id}/status`} method="POST" className="grid gap-3 rounded-2xl border border-white/55 bg-white/50 p-3 md:grid-cols-[12rem_minmax(0,1fr)_auto]">
                    <select name="status" defaultValue={booking.agentStatus || "accepted"} className="h-10 rounded-2xl border border-[#DDE3F5] bg-white/70 px-3 text-[13px] font-medium outline-none">
                      <option value="accepted">Accepted</option>
                      <option value="in_progress">In progress</option>
                      <option value="done">Done</option>
                      <option value="cancelled_by_agent">Cancel</option>
                    </select>
                    <Input name="note" placeholder="Internal note or cancellation reason" defaultValue={booking.agentNote} />
                    <Button type="submit">Update status</Button>
                  </form>
                </div>
              ),
            },
            {
              id: "invoice",
              label: "Invoice",
              content: (
                <div className="grid gap-4">
                  <div className="grid gap-3 xl:grid-cols-2">
                    <form
                      action={`/api/agent/bookings/${booking.id}/line-items`}
                      method="POST"
                      className="grid gap-2 rounded-2xl border border-white/55 bg-white/55 p-3"
                    >
                      <input type="hidden" name="item_type" value="existing_extra_service" />
                      <p className="text-[13px] font-semibold">Add existing service</p>
                      <select name="description" className="h-10 rounded-2xl border border-[#DDE3F5] bg-white/70 px-3 text-[13px] font-medium outline-none">
                        {services.length > 0 ? (
                          services.map((service) => (
                            <option key={service.id} value={service.serviceName}>
                              {service.serviceName}
                            </option>
                          ))
                        ) : (
                          <option value="Extra service">Extra service</option>
                        )}
                      </select>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <Input type="number" name="quantity" min="1" defaultValue="1" />
                        <Input type="number" name="unit_price_dkk" min="0" placeholder="Unit price DKK" required />
                      </div>
                      <Button type="submit">Add service</Button>
                    </form>
                    <form
                      action={`/api/agent/bookings/${booking.id}/line-items`}
                      method="POST"
                      className="grid gap-2 rounded-2xl border border-white/55 bg-white/55 p-3"
                    >
                      <input type="hidden" name="item_type" value="manual_extra_charge" />
                      <p className="text-[13px] font-semibold">Add manual line</p>
                      <Input name="description" placeholder="Description" required />
                      <div className="grid gap-2 sm:grid-cols-2">
                        <Input type="number" name="quantity" min="1" defaultValue="1" />
                        <Input type="number" name="unit_price_dkk" min="0" placeholder="Unit price DKK" required />
                      </div>
                      <Button type="submit" variant="outline">Add manual charge</Button>
                    </form>
                  </div>
                  <LazyBookingInvoice
                    bookingId={booking.id}
                    endpoint={`/api/agent/bookings/${booking.id}/invoice`}
                    locale="en"
                  />
                </div>
              ),
            },
          ]}
        />
      </div>
    </details>
  );
}

function InvoiceBadge({ status }: { status: string }) {
  return (
    <span className="rounded-full border border-[#DDE3F5] bg-white/70 px-2.5 py-1 text-[12px] font-semibold text-[#4B5563]">
      {status}
    </span>
  );
}

function AgentInvoicesView({ invoices }: { invoices: Invoice[] }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-[0_10px_32px_rgba(31,35,64,0.06)]">
      {invoices.length > 0 ? (
        <div className="divide-y divide-[#e8ebf5]">
          {invoices.map((invoice) => (
            <article
              key={invoice.id}
              className="grid gap-3 px-4 py-4 lg:grid-cols-[1fr_1fr_8rem_auto] lg:items-center"
            >
              <div>
                <p className="text-[14px] font-bold text-[#1f2340]">
                  {invoice.invoiceNumber}
                </p>
                <p className="mt-1 text-[12px] font-medium text-[#7b829f]">
                  Booking {invoice.bookingId}
                </p>
              </div>
              <p className="text-[13px] font-semibold text-[#374151]">
                {invoice.customerEmail || invoice.sentToEmail}
              </p>
              <div>
                <p className="text-[14px] font-bold text-[#1f2340]">
                  {formatPrice(invoice.totalInclMomsDkk)}
                </p>
                <p className="mt-1 text-[12px] font-semibold uppercase text-[#7b829f]">
                  {invoice.status}
                </p>
              </div>
              {invoice.publicUrl ? (
                <a
                  href={invoice.publicUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-[#d4e3ed] bg-white px-4 text-[13px] font-semibold text-[#08745a]"
                >
                  View / print
                </a>
              ) : null}
            </article>
          ))}
        </div>
      ) : (
        <div className="p-4">
          <EmptyState text="No invoices are available yet." />
        </div>
      )}
    </section>
  );
}

function AvailabilityView({ availability }: { availability: AgentAvailability[] }) {
  const byWeekday = new Map(availability.map((item) => [item.weekday, item]));

  return (
    <section className="rounded-3xl border border-white/55 bg-white/[0.72] p-4 shadow-[0_8px_32px_rgba(99,102,241,0.08)]">
      <form action="/api/agent/availability" method="POST" className="grid gap-3">
        {weekdays.map((day, index) => {
          const item = byWeekday.get(index);
          return (
            <div key={day} className="grid gap-2 rounded-2xl border border-white/55 bg-white/55 p-3 md:grid-cols-[10rem_1fr_1fr_1fr_1fr] md:items-center">
              <label className="flex items-center gap-2 text-[13px] font-semibold">
                <input type="checkbox" name={`is_available_${index}`} defaultChecked={item?.isAvailable ?? true} />
                {day}
              </label>
              <Input type="time" name={`start_time_${index}`} defaultValue={item?.startTime || "09:00"} />
              <Input type="time" name={`end_time_${index}`} defaultValue={item?.endTime || "17:00"} />
              <Input type="time" name={`break_start_time_${index}`} defaultValue={item?.breakStartTime || ""} />
              <Input type="time" name={`break_end_time_${index}`} defaultValue={item?.breakEndTime || ""} />
            </div>
          );
        })}
        <Button type="submit">Save availability</Button>
      </form>
      <form action="/api/agent/availability" method="POST" className="mt-4 grid gap-3 rounded-2xl border border-white/55 bg-white/55 p-3 sm:grid-cols-[1fr_1fr_1fr_auto]">
        <input type="hidden" name="action" value="unavailable" />
        <Input type="date" name="start_date" required />
        <Input type="date" name="end_date" />
        <Input name="reason" placeholder="Vacation / blocked reason" />
        <Button type="submit" variant="outline">Block dates</Button>
      </form>
    </section>
  );
}

function ServicesView({ services }: { services: AgentService[] }) {
  return (
    <section className="rounded-3xl border border-white/55 bg-white/[0.72] p-4 shadow-[0_8px_32px_rgba(99,102,241,0.08)]">
      <form action="/api/agent/services" method="POST" className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <Input name="service_name" placeholder="Add service name" required />
        <Button type="submit">Add service</Button>
      </form>
      <div className="mt-4 grid gap-3">
        {services.length > 0 ? (
          services.map((service) => (
            <form key={service.id} action={`/api/agent/services/${service.id}`} method="POST" className="grid gap-3 rounded-2xl border border-white/55 bg-white/55 p-3 sm:grid-cols-[1fr_auto_auto]">
              <Input name="service_name" defaultValue={service.serviceName} />
              <label className="flex items-center gap-2 text-[13px] font-semibold">
                <input type="checkbox" name="is_enabled" defaultChecked={service.isEnabled} />
                Enabled
              </label>
              <div className="flex gap-2">
                <Button type="submit" className="h-10">Save</Button>
                <Button type="submit" name="action" value="delete" variant="outline" className="h-10">
                  Delete
                </Button>
              </div>
            </form>
          ))
        ) : (
          <EmptyState text="No services on your profile yet." />
        )}
      </div>
    </section>
  );
}

function ChatView({ data }: { data: AgentDashboardData }) {
  return (
    <section className="rounded-3xl border border-white/55 bg-white/[0.72] p-4 shadow-[0_8px_32px_rgba(99,102,241,0.08)]">
      <div className="grid gap-3">
        {data.chatMessages.length > 0 ? (
          data.chatMessages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[42rem] rounded-2xl border px-3 py-3 text-[13px] font-medium",
                message.senderType === "agent"
                  ? "ml-auto border-[#6366F1]/20 bg-[#6366F1]/10 text-[#312E81]"
                  : "border-white/55 bg-white/60 text-[#4B5563]"
              )}
            >
              <p>{message.message}</p>
              <p className="mt-1 text-[11px] font-semibold opacity-70">{message.createdAt}</p>
            </div>
          ))
        ) : (
          <EmptyState text="No chat messages yet." />
        )}
      </div>
      <form action="/api/agent/chat" method="POST" className="mt-4 grid gap-3">
        <select name="booking_id" className="h-10 rounded-2xl border border-[#DDE3F5] bg-white/70 px-3 text-[13px] font-medium outline-none">
          <option value="">General message</option>
          {data.bookings.map((booking) => (
            <option key={booking.id} value={booking.id}>
              {booking.appointmentDate} | {booking.customerName}
            </option>
          ))}
        </select>
        <Textarea name="message" className="min-h-24" placeholder="Write to admin" required />
        <Button type="submit">
          <MessageCircle className="h-5 w-5" />
          Send message
        </Button>
      </form>
    </section>
  );
}

function ProfileView({ data }: { data: AgentDashboardData }) {
  return (
    <section className="rounded-3xl border border-white/55 bg-white/[0.72] p-4 shadow-[0_8px_32px_rgba(99,102,241,0.08)]">
      <div className="flex items-center gap-3">
        <AgentAvatar name={data.agent.fullName} avatarUrl={data.agent.avatarUrl} large />
        <div>
          <h2 className="text-2xl font-bold">{data.agent.fullName}</h2>
          <p className="text-[13px] font-medium text-[#8E95B5]">{data.agent.email}</p>
        </div>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        <Info label="Phone" value={data.agent.phone || "-"} />
        <Info label="Status" value={data.agent.status} />
        <Info label="Working area" value={data.agent.workingArea || "-"} />
        <Info label="Last login" value={data.agent.lastLoginAt || "-"} />
      </div>
      <div className="mt-4 rounded-2xl border border-white/55 bg-white/55 p-3 text-[13px] font-medium text-[#4B5563]">
        {data.agent.notes || "No profile notes."}
      </div>
    </section>
  );
}

function AgentAvatar({
  name,
  avatarUrl,
  large = false,
}: {
  name: string;
  avatarUrl: string;
  large?: boolean;
}) {
  const size = large ? "h-20 w-20" : "h-11 w-11";
  if (avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={avatarUrl} alt="" className={cn(size, "shrink-0 rounded-2xl object-cover ring-1 ring-white/70")} />
    );
  }

  return (
    <span className={cn(size, "flex shrink-0 items-center justify-center rounded-2xl bg-[#EEF0FF] font-bold text-[#6366F1]")}>
      {(name || "A").slice(0, 2).toUpperCase()}
    </span>
  );
}

function AgentStatusPill({ status }: { status: string }) {
  return (
    <span className={cn("rounded-full border px-2.5 py-1 text-[12px] font-semibold", getAgentStatusTone(status))}>
      {status ? status.replaceAll("_", " ") : "unassigned"}
    </span>
  );
}

function getAgentStatusTone(status: string) {
  switch (status) {
    case "accepted":
      return "border-[#2563EB]/20 bg-[#2563EB]/10 text-[#1D4ED8]";
    case "in_progress":
      return "border-[#7C3AED]/20 bg-[#7C3AED]/10 text-[#6D28D9]";
    case "done":
      return "border-[#10B981]/20 bg-[#10B981]/10 text-[#047857]";
    case "cancelled_by_agent":
      return "border-[#EF4444]/20 bg-[#EF4444]/10 text-[#B91C1C]";
    case "rejected":
      return "border-[#F97316]/20 bg-[#F97316]/10 text-[#C2410C]";
    default:
      return "border-[#F59E0B]/20 bg-[#F59E0B]/10 text-[#92400E]";
  }
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/55 bg-white/55 px-3 py-2.5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8E95B5]">{label}</p>
      <p className="mt-1 break-words text-[13px] font-semibold text-[#1F2340]">{value || "-"}</p>
    </div>
  );
}

function SmallStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/55 bg-white/55 px-2.5 py-2">
      <span className="block truncate text-[11px] font-medium text-[#8E95B5]">{label}</span>
      <strong className="mt-1 block truncate text-[12px] text-[#1F2340]">{value}</strong>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-[#DDE3F5] bg-white/55 px-4 py-5 text-[13px] font-medium text-[#8E95B5]">
      {text}
    </div>
  );
}
