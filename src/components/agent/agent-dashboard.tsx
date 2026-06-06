"use client";

import Link from "next/link";
import { createContext, useContext, useState } from "react";
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock3,
  LogOut,
  MessageCircle,
  Settings2,
  UserRound,
  Wrench,
  XCircle,
} from "lucide-react";
import { DashboardLanguageSwitch } from "@/components/ui/dashboard-language-switch";
import { Button } from "@/components/ui/button";
import {
  InvoiceWorkflowButton,
  type InvoiceWorkflowResponse,
} from "@/components/invoices/invoice-workflow-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { DashboardLocale } from "@/lib/shared/dashboard-locale";
import type {
  AgentAvailability,
  AgentBooking,
  AgentDashboardData,
  AgentService,
} from "@/lib/server/agents";
import type { BookingInvoiceData, BookingLineItem } from "@/lib/server/invoices";
import { formatPrice } from "@/lib/shared/booking";
import { cn } from "@/lib/utils";

const tabIds = [
  "overview",
  "calendar",
  "tasks",
  "availability",
  "services",
  "chat",
  "profile",
] as const;

export type AgentView = (typeof tabIds)[number];

const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
const maxAvatarSizeBytes = 2 * 1024 * 1024;

const getAgentCopy = (locale: DashboardLocale) => ({
  locale,
  tabs:
    locale === "en"
      ? {
          overview: "Overview",
          calendar: "Calendar",
          tasks: "Tasks",
          availability: "Availability",
          services: "Services",
          chat: "Chat",
          profile: "Profile",
        }
      : {
          overview: "Overblik",
          calendar: "Kalender",
          tasks: "Opgaver",
          availability: "Tilgaengelighed",
          services: "Services",
          chat: "Chat",
          profile: "Profil",
        },
  weekdays:
    locale === "en"
      ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      : ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Loerdag", "Soendag"],
  savedMessage: locale === "en" ? "The update was saved." : "Aendringen blev gemt.",
  errorMessage:
    locale === "en"
      ? "The action could not be completed."
      : "Handlingen kunne ikke gennemfoeres.",
  roleLabel: locale === "en" ? "Agent" : "Agent",
  pending: locale === "en" ? "Pending" : "Venter",
  done: locale === "en" ? "Done" : "Faerdig",
  unread: locale === "en" ? "Unread" : "Ulæst",
  logout: locale === "en" ? "Logout" : "Log ud",
  dashboardTitle: locale === "en" ? "Agent dashboard" : "Agent dashboard",
  dashboardDescription:
    locale === "en"
      ? "Only your assigned bookings, working hours, services and messages are shown here."
      : "Kun dine tildelte bookinger, arbejdstider, services og beskeder vises her.",
});

type AgentCopy = ReturnType<typeof getAgentCopy>;
const AgentCopyContext = createContext<AgentCopy | null>(null);
const useAgentCopy = () => {
  const copy = useContext(AgentCopyContext);
  if (!copy) {
    throw new Error("Agent copy context missing");
  }
  return copy;
};

export function AgentDashboard({
  data,
  initialView,
  locale,
  saved,
  error,
}: {
  data: AgentDashboardData;
  initialView: AgentView;
  locale: DashboardLocale;
  saved?: string;
  error?: string;
}) {
  const copy = getAgentCopy(locale);
  const tabs = [
    { id: "overview" as const, label: copy.tabs.overview, icon: BarChart3 },
    { id: "calendar" as const, label: copy.tabs.calendar, icon: Calendar },
    { id: "tasks" as const, label: copy.tabs.tasks, icon: CheckCircle2 },
    { id: "availability" as const, label: copy.tabs.availability, icon: Clock3 },
    { id: "services" as const, label: copy.tabs.services, icon: Wrench },
    { id: "chat" as const, label: copy.tabs.chat, icon: MessageCircle },
    { id: "profile" as const, label: copy.tabs.profile, icon: UserRound },
  ];
  const [dashboardData, setDashboardData] = useState(data);
  const [view, setView] = useState(initialView);
  const [feedback, setFeedback] = useState<{
    tone: "success" | "error";
    message: string;
  } | null>(
    saved
      ? { tone: "success", message: copy.savedMessage }
      : error
        ? { tone: "error", message: copy.errorMessage }
        : null
  );
  const unread = dashboardData.notifications.filter((item) => !item.isRead).length;

  const switchView = (nextView: AgentView) => {
    setView(nextView);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("view", nextView);
      url.searchParams.delete("saved");
      url.searchParams.delete("error");
      window.history.replaceState({}, "", url.toString());
    }
  };

  return (
    <AgentCopyContext.Provider value={copy}>
      <main className="min-h-screen bg-[#F6F8FE] px-4 py-5 text-[#1F2340] sm:px-6">
        <section className="mx-auto max-w-7xl">
        <div className="grid gap-4 xl:grid-cols-[16rem_minmax(0,1fr)]">
          <aside className="overflow-hidden rounded-3xl border border-white/55 bg-white/[0.72] shadow-[0_8px_32px_rgba(99,102,241,0.08)] backdrop-blur-2xl xl:sticky xl:top-5 xl:self-start">
            <div className="border-b border-white/55 px-4 py-5">
              <div className="flex items-center gap-3">
                <AgentAvatar name={dashboardData.agent.fullName} avatarUrl={dashboardData.agent.avatarUrl} />
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#6366F1]">
                    {copy.roleLabel}
                  </p>
                  <p className="mt-1 truncate text-[13px] font-semibold">{dashboardData.agent.fullName}</p>
                  <p className="truncate text-[12px] font-medium text-[#8E95B5]">{dashboardData.agent.email}</p>
                </div>
              </div>
            </div>

            <nav className="flex snap-x gap-2 overflow-x-auto px-3 py-3 xl:grid xl:grid-cols-1 xl:overflow-visible">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = view === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => switchView(tab.id)}
                    className={cn(
                      "flex min-w-[8.75rem] items-center gap-2 rounded-2xl px-3 py-2.5 text-[13px] font-semibold transition xl:min-w-0",
                      active
                        ? "bg-[#6366F1] text-white shadow-[0_8px_20px_rgba(99,102,241,0.18)]"
                        : "text-[#8E95B5] hover:bg-white/70 hover:text-[#1F2340]"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="border-t border-white/55 px-4 py-4">
              <div className="grid grid-cols-3 gap-2">
                <SmallStat label={copy.pending} value={dashboardData.stats.pending.toString()} />
                <SmallStat label={copy.done} value={dashboardData.stats.done.toString()} />
                <SmallStat label={copy.unread} value={unread.toString()} />
              </div>
              <div className="mt-4 flex items-center justify-between gap-2">
                <DashboardLanguageSwitch currentLocale={locale} />
                <form action="/api/agent/logout" method="POST" className="flex-1">
                  <Button type="submit" variant="ghost" className="w-full justify-start rounded-2xl">
                  <LogOut className="h-5 w-5" />
                    {copy.logout}
                  </Button>
                </form>
              </div>
            </div>
          </aside>

          <div className="space-y-5">
            <header className="rounded-3xl border border-white/55 bg-white/[0.72] px-5 py-5 shadow-[0_8px_32px_rgba(99,102,241,0.08)] backdrop-blur-2xl">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#6366F1]">
                {tabs.find((tab) => tab.id === view)?.label}
              </p>
              <h1 className="mt-2 text-3xl font-bold">{copy.dashboardTitle}</h1>
              <p className="mt-2 max-w-2xl text-[13px] font-medium leading-6 text-[#4B5563]">
                {copy.dashboardDescription}
              </p>
            </header>

            {feedback ? (
              <div
                className={cn(
                  "rounded-3xl border px-4 py-4 text-[13px] font-medium",
                  feedback.tone === "error"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-[#CDE6F6] bg-[#F6FBFF] text-[#1A506D]"
                )}
              >
                {feedback.message}
              </div>
            ) : null}

            {view === "overview" ? <Overview data={dashboardData} /> : null}
            {view === "calendar" ? <CalendarView bookings={dashboardData.bookings} /> : null}
            {view === "tasks" ? (
              <TasksView
                bookings={dashboardData.bookings}
                services={dashboardData.services}
              />
            ) : null}
            {view === "availability" ? (
              <AvailabilityView
                availability={dashboardData.availability}
                onSaved={(availability) => {
                  setDashboardData((current) => ({ ...current, availability }));
                  setFeedback({
                    tone: "success",
                    message:
                      locale === "en"
                        ? "Availability saved successfully."
                        : "Tilgaengelighed blev gemt.",
                  });
                }}
                onError={(message) => setFeedback({ tone: "error", message })}
              />
            ) : null}
            {view === "services" ? (
              <ServicesView
                services={dashboardData.services}
                onSaved={(services) => {
                  setDashboardData((current) => ({ ...current, services }));
                  setFeedback({
                    tone: "success",
                    message:
                      locale === "en" ? "Services saved successfully." : "Services blev gemt.",
                  });
                }}
                onError={(message) => setFeedback({ tone: "error", message })}
              />
            ) : null}
            {view === "chat" ? <ChatView data={dashboardData} /> : null}
            {view === "profile" ? (
              <ProfileView
                agent={dashboardData.agent}
                onSaved={(agent) => {
                  setDashboardData((current) => ({ ...current, agent }));
                  setFeedback({
                    tone: "success",
                    message:
                      locale === "en" ? "Profile saved successfully." : "Profilen blev gemt.",
                  });
                }}
                onError={(message) => setFeedback({ tone: "error", message })}
              />
            ) : null}
          </div>
        </div>
        </section>
      </main>
    </AgentCopyContext.Provider>
  );
}

function Overview({ data }: { data: AgentDashboardData }) {
  const copy = useAgentCopy();
  const cards = [
    {
      label: copy.locale === "en" ? "Assigned" : "Tildelt",
      value: data.stats.totalAssigned,
      detail: copy.locale === "en" ? "All bookings" : "Alle bookinger",
      icon: Calendar,
    },
    {
      label: copy.locale === "en" ? "Pending" : "Venter",
      value: data.stats.pending,
      detail: copy.locale === "en" ? "Awaiting your answer" : "Afventer dit svar",
      icon: Clock3,
    },
    {
      label: copy.locale === "en" ? "Accepted" : "Accepteret",
      value: data.stats.accepted,
      detail: copy.locale === "en" ? "Ready to work" : "Klar til opgaven",
      icon: CheckCircle2,
    },
    {
      label: copy.locale === "en" ? "Done" : "Faerdig",
      value: data.stats.done,
      detail:
        copy.locale === "en"
          ? `${data.stats.currentMonthDone} this month`
          : `${data.stats.currentMonthDone} denne maaned`,
      icon: BarChart3,
    },
  ];

  return (
    <div className="space-y-5">
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
        <p className="text-[14px] font-semibold">
          {copy.locale === "en" ? "Status chart" : "Statusoversigt"}
        </p>
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

function CalendarView({ bookings }: { bookings: AgentBooking[] }) {
  const copy = useAgentCopy();
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
          <EmptyState
            text={
              copy.locale === "en"
                ? "No assigned bookings in your calendar."
                : "Ingen tildelte bookinger i din kalender."
            }
          />
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
  const copy = useAgentCopy();
  return (
    <div className="grid gap-4">
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <TaskCard
            key={booking.id}
            booking={booking}
            services={services}
          />
        ))
      ) : (
        <EmptyState
          text={
            copy.locale === "en"
              ? "No bookings assigned to you yet."
              : "Ingen bookinger er tildelt dig endnu."
          }
        />
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
  const copy = useAgentCopy();
  return (
    <details
      id={`booking-${booking.id}`}
      className={cn(
        "overflow-hidden rounded-[1.75rem] border shadow-[0_8px_32px_rgba(99,102,241,0.08)]",
        getAgentTaskRowTone(booking.agentStatus)
      )}
    >
      <summary className="cursor-pointer list-none px-4 py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-lg font-bold text-[#10243b]">
                {booking.customerName || booking.customerEmail}
              </h2>
              <AgentStatusPill status={booking.agentStatus} />
            </div>
            <p className="mt-1 text-[13px] font-medium text-[#475569]">
              {booking.appointmentLabel} | {booking.packageLabel} | {formatPrice(booking.total)}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[12px] font-semibold text-[#334155]">
            <span>{booking.appointmentTime}</span>
            <span>{booking.vehicleName}</span>
            <span>{copy.locale === "en" ? "Open" : "Aabn"}</span>
          </div>
        </div>
      </summary>

      <div className="border-t border-white/70 bg-white/80 px-4 py-4 backdrop-blur-xl">
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          <Info label={copy.locale === "en" ? "Phone" : "Telefon"} value={booking.customerPhone} />
          <Info label="Email" value={booking.customerEmail} />
          <Info label={copy.locale === "en" ? "Address" : "Adresse"} value={booking.customerAddress} />
          <Info label={copy.locale === "en" ? "Vehicle" : "Bil"} value={`${booking.vehicleName} (${booking.registrationNumber})`} />
          <Info label={copy.locale === "en" ? "Service" : "Service"} value={`${booking.packageLabel} - ${booking.category}`} />
          <Info label={copy.locale === "en" ? "Customer notes" : "Kundenoter"} value={booking.customerNotes || "-"} />
          <Info label={copy.locale === "en" ? "Admin notes" : "Adminnoter"} value={booking.adminNotes || "-"} />
          <Info label={copy.locale === "en" ? "Agent note" : "Agentnote"} value={booking.agentNote || "-"} />
        </div>

        {booking.addons.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {booking.addons.map((addon) => (
              <span key={addon.id} className="rounded-full border border-[#DDE3F5] bg-white/80 px-2.5 py-1 text-[12px] font-semibold text-[#4B5563]">
                {addon.label}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          <form action={`/api/agent/bookings/${booking.id}/accept`} method="POST" className="grid gap-2 rounded-2xl border border-white/70 bg-white/72 p-3">
            <Textarea
              name="note"
              placeholder={copy.locale === "en" ? "Optional note for admin" : "Valgfri note til admin"}
              className="min-h-16"
            />
            <Button type="submit">{copy.locale === "en" ? "Accept booking" : "Accepter booking"}</Button>
          </form>
          <form action={`/api/agent/bookings/${booking.id}/reject`} method="POST" className="grid gap-2 rounded-2xl border border-white/70 bg-white/72 p-3">
            <Textarea
              name="note"
              placeholder={copy.locale === "en" ? "Optional rejection reason" : "Valgfri aarsag til afvisning"}
              className="min-h-16"
            />
            <Button type="submit" variant="outline">
              {copy.locale === "en" ? "Reject booking" : "Afvis booking"}
            </Button>
          </form>
        </div>

        <form action={`/api/agent/bookings/${booking.id}/status`} method="POST" className="mt-3 grid gap-3 rounded-2xl border border-white/70 bg-white/72 p-3 md:grid-cols-[12rem_minmax(0,1fr)_auto]">
          <select name="status" defaultValue={booking.agentStatus || "accepted"} className="h-10 rounded-2xl border border-[#DDE3F5] bg-white/90 px-3 text-[13px] font-medium outline-none">
            <option value="accepted">{copy.locale === "en" ? "Accepted" : "Accepteret"}</option>
            <option value="in_progress">{copy.locale === "en" ? "In progress" : "I gang"}</option>
            <option value="done">{copy.locale === "en" ? "Done" : "Faerdig"}</option>
            <option value="cancelled_by_agent">{copy.locale === "en" ? "Cancel" : "Annuller"}</option>
          </select>
          <Input
            name="note"
            placeholder={
              copy.locale === "en"
                ? "Internal note or cancellation reason"
                : "Intern note eller aarsag til annullering"
            }
            defaultValue={booking.agentNote}
          />
          <Button type="submit">{copy.locale === "en" ? "Update status" : "Opdater status"}</Button>
        </form>

        <InvoiceWorkbench
          booking={booking}
          services={services}
        />
      </div>
    </details>
  );
}

function InvoiceWorkbench({
  booking,
  services,
}: {
  booking: AgentBooking;
  services: AgentService[];
}) {
  const copy = useAgentCopy();
  const [invoiceData, setInvoiceData] = useState<BookingInvoiceData | null>(null);
  const [invoiceStatus, setInvoiceStatus] = useState<"idle" | "loading" | "error">("idle");
  const invoiceLocked = invoiceData?.invoice
    ? ["sent", "paid"].includes(invoiceData.invoice.status)
    : false;
  const summary = invoiceData?.summary ?? {
    originalBookingPriceDkk: booking.total,
    existingExtraServicesDkk: 0,
    manualExtraChargesDkk: 0,
    totalInclMomsDkk: booking.total,
    momsAmountDkk: Math.round(booking.total * 0.2),
    subtotalExMomsDkk: booking.total - Math.round(booking.total * 0.2),
  };
  const lineItems = invoiceData?.lineItems ?? [];
  const invoice = invoiceData?.invoice;

  const loadInvoiceData = async () => {
    setInvoiceStatus("loading");
    try {
      const response = await fetch(`/api/agent/bookings/${booking.id}/invoice`, {
        cache: "no-store",
      });
      if (!response.ok) {
        setInvoiceStatus("error");
        return;
      }

      const payload = (await response.json()) as BookingInvoiceData;
      setInvoiceData(payload);
      setInvoiceStatus("idle");
    } catch {
      setInvoiceStatus("error");
    }
  };

  const applyInvoiceResponse = (payload: InvoiceWorkflowResponse) => {
    if (payload.invoiceData) {
      setInvoiceData(payload.invoiceData as BookingInvoiceData);
      setInvoiceStatus("idle");
    }
  };

  return (
    <section className="mt-4 rounded-3xl border border-white/55 bg-white/50 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[14px] font-semibold">
            {copy.locale === "en" ? "Extra services / charges" : "Ekstra services / tillaeg"}
          </p>
          <p className="mt-1 text-[12px] font-medium text-[#8E95B5]">
            {copy.locale === "en"
              ? "All prices are DKK incl. Danish VAT."
              : "Alle priser er DKK inkl. dansk moms."}
          </p>
        </div>
        <InvoiceBadge status={invoice?.status || "No invoice"} />
      </div>

      <div className="mt-4 grid gap-3">
        {invoiceData ? (
          lineItems.length > 0 ? (
            lineItems.map((item) => (
              <LineItemRow
                key={item.id}
                bookingId={booking.id}
                invoiceLocked={invoiceLocked}
                item={item}
              />
            ))
          ) : (
            <EmptyState
              text={
                copy.locale === "en"
                  ? "Line items will appear after the first invoice refresh."
                  : "Prislinjer vises efter foerste fakturaopdatering."
              }
            />
          )
        ) : (
          <div className="rounded-2xl border border-dashed border-[#DDE3F5] bg-white/60 px-4 py-4 text-[13px] font-medium text-[#4B5563]">
            <p>
              {copy.locale === "en"
                ? "Invoice details now load on demand so the tasks tab opens faster."
                : "Fakturadetaljer hentes nu efter behov, saa opgavefanen aabner hurtigere."}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button onClick={loadInvoiceData} disabled={invoiceStatus === "loading"} variant="outline">
                {invoiceStatus === "loading"
                  ? copy.locale === "en"
                    ? "Loading..."
                    : "Henter..."
                  : copy.locale === "en"
                    ? "Load invoice details"
                    : "Hent fakturadetaljer"}
              </Button>
              {invoiceStatus === "error" ? (
                <span className="text-xs font-medium text-red-600">
                  {copy.locale === "en"
                    ? "Invoice details could not be loaded."
                    : "Fakturadetaljer kunne ikke hentes."}
                </span>
              ) : null}
            </div>
          </div>
        )}
      </div>

      {invoiceData && !invoiceLocked ? (
        <div className="mt-4 grid gap-3 xl:grid-cols-2">
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
      ) : invoiceData ? (
        <div className="mt-4 rounded-2xl border border-[#DDE3F5] bg-white/60 px-3 py-3 text-[13px] font-medium text-[#4B5563]">
          Invoice has been sent or paid, so extra charge lines are locked.
        </div>
      ) : null}

      <PriceSummaryCard summary={summary} />

      <div className="mt-4 flex flex-wrap gap-2">
        <InvoiceWorkflowButton
          endpoint={`/api/agent/bookings/${booking.id}/generate-invoice`}
          label="Generate invoice"
          pendingLabel="Generating PDF..."
          buttonVariant="outline"
          onComplete={applyInvoiceResponse}
        />
        {invoice?.pdfUrl ? (
          <>
            <a
              href={invoice.pdfUrl}
              target="_blank"
              className="inline-flex h-10 items-center justify-center rounded-2xl border border-[#DDE3F5] bg-white/70 px-3 text-[13px] font-semibold text-[#1F2340]"
            >
              View invoice
            </a>
            <a
              href={`${invoice.pdfUrl}?download=1`}
              className="inline-flex h-10 items-center justify-center rounded-2xl border border-[#DDE3F5] bg-white/70 px-3 text-[13px] font-semibold text-[#1F2340]"
            >
              Download PDF
            </a>
          </>
        ) : null}
        <InvoiceWorkflowButton
          endpoint="/api/invoices/generate-send"
          body={{ bookingId: booking.id }}
          label="Generate and send invoice"
          pendingLabel="Generating and sending..."
          onComplete={applyInvoiceResponse}
        />
        {invoice ? (
          <InvoiceWorkflowButton
            endpoint={`/api/invoices/${invoice.id}/resend`}
            label="Send again"
            pendingLabel="Sending..."
            buttonVariant="outline"
            onComplete={applyInvoiceResponse}
          />
        ) : null}
      </div>
    </section>
  );
}

function LineItemRow({
  bookingId,
  invoiceLocked,
  item,
}: {
  bookingId: string;
  invoiceLocked: boolean;
  item: BookingLineItem;
}) {
  const editable = item.itemType !== "original_service" && !invoiceLocked && !item.lockedAt;
  if (!editable) {
    return (
      <div className="grid gap-2 rounded-2xl border border-white/55 bg-white/55 p-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="text-[13px] font-semibold">{item.description}</p>
          <p className="mt-1 text-[12px] font-medium text-[#8E95B5]">
            {item.itemType.replaceAll("_", " ")} | Qty {item.quantity} | {formatPrice(item.unitPriceDkk)}
          </p>
        </div>
        <strong className="text-[13px]">{formatPrice(item.totalPriceDkk)}</strong>
      </div>
    );
  }

  return (
    <form
      action={`/api/agent/bookings/${bookingId}/line-items/${item.id}`}
      method="POST"
      className="grid gap-2 rounded-2xl border border-white/55 bg-white/55 p-3 lg:grid-cols-[minmax(0,1fr)_5rem_8rem_auto] lg:items-center"
    >
      <Input name="description" defaultValue={item.description} />
      <Input type="number" name="quantity" min="1" defaultValue={item.quantity} />
      <Input type="number" name="unit_price_dkk" min="0" defaultValue={item.unitPriceDkk} />
      <div className="flex gap-2">
        <Button type="submit" className="h-10">Save</Button>
        <Button type="submit" name="action" value="delete" variant="outline" className="h-10">
          Remove
        </Button>
      </div>
    </form>
  );
}

function PriceSummaryCard({ summary }: { summary: BookingInvoiceData["summary"] }) {
  return (
    <div className="mt-4 grid gap-2 rounded-2xl border border-white/55 bg-white/55 p-3 text-[13px] font-medium text-[#4B5563]">
      <SummaryRow label="Original booking price" value={summary.originalBookingPriceDkk} />
      <SummaryRow label="Extra services" value={summary.existingExtraServicesDkk} />
      <SummaryRow label="Manual extra charges" value={summary.manualExtraChargesDkk} />
      <SummaryRow label="Subtotal ex. moms" value={summary.subtotalExMomsDkk} />
      <SummaryRow label="Moms 25% included" value={summary.momsAmountDkk} />
      <SummaryRow label="Total customer pays" value={summary.totalInclMomsDkk} strong />
    </div>
  );
}

function SummaryRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: number;
  strong?: boolean;
}) {
  return (
    <div className={cn("flex justify-between gap-3", strong ? "text-[#1F2340]" : "")}>
      <span>{label}</span>
      <strong>{formatPrice(value)}</strong>
    </div>
  );
}

function InvoiceBadge({ status }: { status: string }) {
  return (
    <span className="rounded-full border border-[#DDE3F5] bg-white/70 px-2.5 py-1 text-[12px] font-semibold text-[#4B5563]">
      {status}
    </span>
  );
}

function AvailabilityView({
  availability,
  onSaved,
  onError,
}: {
  availability: AgentAvailability[];
  onSaved: (availability: AgentAvailability[]) => void;
  onError: (message: string) => void;
}) {
  const copy = useAgentCopy();
  const [entries, setEntries] = useState(
    Array.from({ length: 7 }, (_, weekday) => {
      const item = availability.find((value) => value.weekday === weekday);
      return {
        weekday,
        startTime: item?.startTime || "09:00",
        endTime: item?.endTime || "17:00",
        breakStartTime: item?.breakStartTime || "",
        breakEndTime: item?.breakEndTime || "",
        isAvailable: item?.isAvailable ?? true,
      };
    })
  );
  const [unavailableForm, setUnavailableForm] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [pending, setPending] = useState(false);
  const [blocking, setBlocking] = useState(false);

  const saveAvailability = async () => {
    setPending(true);
    try {
      const response = await fetch("/api/agent/availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ entries }),
      });
      const payload = (await response.json().catch(() => ({}))) as {
        availability?: AgentAvailability[];
      };
      if (!response.ok || !payload.availability) {
        onError("Availability could not be saved.");
        return;
      }
      onSaved(payload.availability);
    } catch {
      onError("Availability could not be saved.");
    } finally {
      setPending(false);
    }
  };

  const addUnavailable = async () => {
    setBlocking(true);
    try {
      const formData = new FormData();
      formData.set("action", "unavailable");
      formData.set("start_date", unavailableForm.startDate);
      formData.set("end_date", unavailableForm.endDate);
      formData.set("reason", unavailableForm.reason);
      const response = await fetch("/api/agent/availability", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        onError("Blocked dates could not be saved.");
        return;
      }
      setUnavailableForm({ startDate: "", endDate: "", reason: "" });
      onSaved(availability);
    } catch {
      onError("Blocked dates could not be saved.");
    } finally {
      setBlocking(false);
    }
  };

  return (
    <section className="rounded-3xl border border-white/55 bg-white/[0.72] p-4 shadow-[0_8px_32px_rgba(99,102,241,0.08)]">
      <div className="grid gap-3">
        {copy.weekdays.map((day, index) => {
          const item = entries[index];
          return (
            <div key={day} className="grid gap-2 rounded-2xl border border-white/55 bg-white/55 p-3 md:grid-cols-[10rem_1fr_1fr_1fr_1fr] md:items-center">
              <label className="flex items-center gap-2 text-[13px] font-semibold">
                <input
                  type="checkbox"
                  checked={item.isAvailable}
                  onChange={(event) =>
                    setEntries((current) =>
                      current.map((entry) =>
                        entry.weekday === index ? { ...entry, isAvailable: event.target.checked } : entry
                      )
                    )
                  }
                />
                {day}
              </label>
              <Input type="time" value={item.startTime} onChange={(event) => setEntries((current) => current.map((entry) => entry.weekday === index ? { ...entry, startTime: event.target.value } : entry))} />
              <Input type="time" value={item.endTime} onChange={(event) => setEntries((current) => current.map((entry) => entry.weekday === index ? { ...entry, endTime: event.target.value } : entry))} />
              <Input type="time" value={item.breakStartTime} onChange={(event) => setEntries((current) => current.map((entry) => entry.weekday === index ? { ...entry, breakStartTime: event.target.value } : entry))} />
              <Input type="time" value={item.breakEndTime} onChange={(event) => setEntries((current) => current.map((entry) => entry.weekday === index ? { ...entry, breakEndTime: event.target.value } : entry))} />
            </div>
          );
        })}
        <Button onClick={saveAvailability} disabled={pending}>
          {pending
            ? copy.locale === "en"
              ? "Saving..."
              : "Gemmer..."
            : copy.locale === "en"
              ? "Save availability"
              : "Gem tilgaengelighed"}
        </Button>
      </div>
      <div className="mt-4 grid gap-3 rounded-2xl border border-white/55 bg-white/55 p-3 sm:grid-cols-[1fr_1fr_1fr_auto]">
        <Input type="date" value={unavailableForm.startDate} onChange={(event) => setUnavailableForm((current) => ({ ...current, startDate: event.target.value }))} required />
        <Input type="date" value={unavailableForm.endDate} onChange={(event) => setUnavailableForm((current) => ({ ...current, endDate: event.target.value }))} />
        <Input value={unavailableForm.reason} onChange={(event) => setUnavailableForm((current) => ({ ...current, reason: event.target.value }))} placeholder={copy.locale === "en" ? "Vacation / blocked reason" : "Ferie / aarsag"} />
        <Button onClick={addUnavailable} disabled={blocking || !unavailableForm.startDate} variant="outline">
          {blocking
            ? copy.locale === "en"
              ? "Saving..."
              : "Gemmer..."
            : copy.locale === "en"
              ? "Block dates"
              : "Bloker datoer"}
        </Button>
      </div>
    </section>
  );
}

function ServicesView({
  services,
  onSaved,
  onError,
}: {
  services: AgentService[];
  onSaved: (services: AgentService[]) => void;
  onError: (message: string) => void;
}) {
  const copy = useAgentCopy();
  const [items, setItems] = useState(services);
  const [newService, setNewService] = useState("");
  const [pending, setPending] = useState(false);

  const addService = async () => {
    setPending(true);
    try {
      const response = await fetch("/api/agent/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serviceName: newService, isEnabled: true }),
      });
      const payload = (await response.json().catch(() => ({}))) as { service?: AgentService };
      if (!response.ok || !payload.service) {
        onError("Service could not be added.");
        return;
      }
      const next = [...items, payload.service];
      setItems(next);
      setNewService("");
      onSaved(next);
    } catch {
      onError("Service could not be added.");
    } finally {
      setPending(false);
    }
  };

  const updateService = async (serviceId: string, updates: Partial<AgentService>) => {
    try {
      const response = await fetch(`/api/agent/services/${serviceId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceName: updates.serviceName,
          isEnabled: updates.isEnabled,
        }),
      });
      const payload = (await response.json().catch(() => ({}))) as { service?: AgentService };
      if (!response.ok || !payload.service) {
        onError("Service could not be saved.");
        return;
      }
      const next = items.map((item) => (item.id === serviceId ? payload.service! : item));
      setItems(next);
      onSaved(next);
    } catch {
      onError("Service could not be saved.");
    }
  };

  const removeService = async (serviceId: string) => {
    try {
      const response = await fetch(`/api/agent/services/${serviceId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        onError("Service could not be deleted.");
        return;
      }
      const next = items.filter((item) => item.id !== serviceId);
      setItems(next);
      onSaved(next);
    } catch {
      onError("Service could not be deleted.");
    }
  };

  return (
    <section className="rounded-3xl border border-white/55 bg-white/[0.72] p-4 shadow-[0_8px_32px_rgba(99,102,241,0.08)]">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <Input value={newService} onChange={(event) => setNewService(event.target.value)} placeholder={copy.locale === "en" ? "Add service name" : "Tilfoej service"} required />
        <Button onClick={addService} disabled={pending || !newService.trim()}>
          {pending
            ? copy.locale === "en"
              ? "Saving..."
              : "Gemmer..."
            : copy.locale === "en"
              ? "Add service"
              : "Tilfoej service"}
        </Button>
      </div>
      <div className="mt-4 grid gap-3">
        {items.length > 0 ? (
          items.map((service) => (
            <div key={service.id} className="grid gap-3 rounded-2xl border border-white/55 bg-white/55 p-3 sm:grid-cols-[1fr_auto_auto]">
              <Input
                value={service.serviceName}
                onChange={(event) =>
                  setItems((current) =>
                    current.map((item) =>
                      item.id === service.id ? { ...item, serviceName: event.target.value } : item
                    )
                  )
                }
              />
              <label className="flex items-center gap-2 text-[13px] font-semibold">
                <input
                  type="checkbox"
                  checked={service.isEnabled}
                  onChange={(event) =>
                    setItems((current) =>
                      current.map((item) =>
                        item.id === service.id ? { ...item, isEnabled: event.target.checked } : item
                      )
                    )
                  }
                />
                {copy.locale === "en" ? "Enabled" : "Aktiv"}
              </label>
              <div className="flex gap-2">
                <Button onClick={() => updateService(service.id, service)} className="h-10">{copy.locale === "en" ? "Save" : "Gem"}</Button>
                <Button onClick={() => removeService(service.id)} variant="outline" className="h-10">
                  {copy.locale === "en" ? "Delete" : "Slet"}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <EmptyState text={copy.locale === "en" ? "No services on your profile yet." : "Ingen services paa din profil endnu."} />
        )}
      </div>
    </section>
  );
}

function ChatView({ data }: { data: AgentDashboardData }) {
  const copy = useAgentCopy();
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
          <EmptyState text={copy.locale === "en" ? "No chat messages yet." : "Ingen chatbeskeder endnu."} />
        )}
      </div>
      <form action="/api/agent/chat" method="POST" className="mt-4 grid gap-3">
        <select name="booking_id" className="h-10 rounded-2xl border border-[#DDE3F5] bg-white/70 px-3 text-[13px] font-medium outline-none">
          <option value="">{copy.locale === "en" ? "General message" : "Generel besked"}</option>
          {data.bookings.map((booking) => (
            <option key={booking.id} value={booking.id}>
              {booking.appointmentDate} | {booking.customerName}
            </option>
          ))}
        </select>
        <Textarea name="message" className="min-h-24" placeholder={copy.locale === "en" ? "Write to admin" : "Skriv til admin"} required />
        <Button type="submit">
          <MessageCircle className="h-5 w-5" />
          {copy.locale === "en" ? "Send message" : "Send besked"}
        </Button>
      </form>
    </section>
  );
}

function ProfileView({
  agent,
  onSaved,
  onError,
}: {
  agent: AgentDashboardData["agent"];
  onSaved: (agent: AgentDashboardData["agent"]) => void;
  onError: (message: string) => void;
}) {
  const copy = useAgentCopy();
  const [form, setForm] = useState({
    fullName: agent.fullName,
    email: agent.email,
    phone: agent.phone,
    workingArea: agent.workingArea,
    notes: agent.notes,
    password: "",
  });
  const [pending, setPending] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarPending, setAvatarPending] = useState(false);

  const saveProfile = async () => {
    setPending(true);
    try {
      const response = await fetch("/api/agent/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          workingArea: form.workingArea,
          notes: form.notes,
          password: form.password || undefined,
        }),
      });
      const payload = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        agent?: AgentDashboardData["agent"];
        message?: string;
      };
      if (!response.ok || !payload.success || !payload.agent) {
        onError(payload.message || "Profile could not be saved.");
        return;
      }

      setForm((current) => ({ ...current, password: "" }));
      onSaved(payload.agent);
    } catch {
      onError("Profile could not be saved.");
    } finally {
      setPending(false);
    }
  };

  const saveAvatar = async () => {
    if (!avatarFile) {
      onError("Please choose an image file first.");
      return;
    }

    setAvatarPending(true);
    try {
      const formData = new FormData();
      formData.set("avatar", avatarFile);
      const response = await fetch("/api/agent/me/avatar", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        agent?: AgentDashboardData["agent"];
        message?: string;
      };
      if (!response.ok || !payload.success || !payload.agent) {
        onError(payload.message || "Avatar could not be saved.");
        return;
      }

      setAvatarFile(null);
      setAvatarPreview("");
      onSaved(payload.agent);
    } catch {
      onError("Avatar could not be saved.");
    } finally {
      setAvatarPending(false);
    }
  };

  return (
    <section className="rounded-3xl border border-white/55 bg-white/[0.72] p-4 shadow-[0_8px_32px_rgba(99,102,241,0.08)]">
      <div className="flex items-center gap-3">
        <AgentAvatar name={form.fullName} avatarUrl={avatarPreview || agent.avatarUrl} large />
        <div>
          <h2 className="text-2xl font-bold">{form.fullName}</h2>
          <p className="text-[13px] font-medium text-[#8E95B5]">{form.email}</p>
        </div>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        <Info label={copy.locale === "en" ? "Phone" : "Telefon"} value={form.phone || "-"} />
        <Info label={copy.locale === "en" ? "Status" : "Status"} value={agent.status} />
        <Info label={copy.locale === "en" ? "Working area" : "Arbejdsomraade"} value={form.workingArea || "-"} />
        <Info label={copy.locale === "en" ? "Last login" : "Sidste login"} value={agent.lastLoginAt || "-"} />
      </div>
      <div className="mt-4 grid gap-3 rounded-2xl border border-white/55 bg-white/55 p-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Full name">
            <Input value={form.fullName} onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))} />
          </Field>
          <Field label="Email">
            <Input type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
          </Field>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Phone">
            <Input value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} />
          </Field>
          <Field label="Working area">
            <Input value={form.workingArea} onChange={(event) => setForm((current) => ({ ...current, workingArea: event.target.value }))} />
          </Field>
        </div>
        <Field label="New password">
          <Input type="password" autoComplete="new-password" value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} />
        </Field>
        <Field label="Notes">
          <Textarea value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} className="min-h-24" />
        </Field>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <Field label="Avatar">
            <Input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(event) => {
                const file = event.target.files?.[0] || null;
                if (file && (!allowedImageTypes.includes(file.type) || file.size > maxAvatarSizeBytes)) {
                  setAvatarFile(null);
                  setAvatarPreview("");
                  onError(
                    !allowedImageTypes.includes(file.type)
                      ? "Invalid image file. Use JPG, PNG, or WebP."
                      : "Image is too large. Maximum size is 2MB."
                  );
                  return;
                }
                setAvatarFile(file);
                setAvatarPreview(file ? URL.createObjectURL(file) : "");
              }}
            />
          </Field>
          <Button onClick={saveAvatar} disabled={avatarPending || !avatarFile} variant="outline">
            {avatarPending ? "Saving avatar..." : "Save avatar"}
          </Button>
        </div>
        <Button onClick={saveProfile} disabled={pending}>
          {pending ? "Saving..." : "Save profile"}
        </Button>
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

function getAgentTaskRowTone(status: string) {
  switch (status) {
    case "accepted":
    case "done":
      return "border-[#10B981]/25 bg-[linear-gradient(135deg,rgba(16,185,129,0.18),rgba(255,255,255,0.92))]";
    case "cancelled_by_agent":
    case "rejected":
      return "border-[#EF4444]/25 bg-[linear-gradient(135deg,rgba(239,68,68,0.18),rgba(255,255,255,0.92))]";
    case "in_progress":
      return "border-[#6366F1]/25 bg-[linear-gradient(135deg,rgba(99,102,241,0.16),rgba(255,255,255,0.92))]";
    default:
      return "border-[#F59E0B]/25 bg-[linear-gradient(135deg,rgba(245,158,11,0.2),rgba(255,255,255,0.92))]";
  }
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1.5 text-[13px] font-medium text-[#1F2340]">
      <span>{label}</span>
      {children}
    </label>
  );
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
