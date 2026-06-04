import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  Calendar,
  CalendarClock,
  CalendarPlus,
  CheckCircle2,
  Clock3,
  Cog,
  CreditCard,
  ListFilter,
  LogOut,
  Mail,
  MapPinned,
  ReceiptText,
  Route,
  Settings2,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
  Wrench,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import {
  getAdminDashboardData,
  type BookingEmailLog,
  type CustomerSummary,
  type DashboardBooking,
  type DashboardData,
} from "@/lib/server/bookings";
import { isDatabaseConfigured } from "@/lib/server/db";
import {
  formatPrice,
  formatShortPrice,
  getAutoBookingStatusDescription,
  getAutoBookingStatusLabel,
  getInvoiceStatusLabel,
  getInvoiceStatusTone,
  getPaymentStatusLabel,
  getPaymentStatusTone,
  getStatusLabel,
  getStatusTone,
  getTimeSlots,
  invoiceStatuses,
  paymentStatuses,
  weekdayOptions,
  type BookingStatus,
} from "@/lib/shared/booking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin",
  description: "WashMax admin dashboard.",
  alternates: {
    canonical: "/admin",
  },
};

const navItems = [
  { id: "overview", label: "Overblik", icon: BarChart3 },
  { id: "calendar", label: "Kalender", icon: Calendar },
  { id: "bookings", label: "Bookinger", icon: ListFilter },
  { id: "customers", label: "Kunder", icon: Users },
  { id: "services", label: "Ydelser", icon: Sparkles },
  { id: "availability", label: "Tilgængelighed", icon: CalendarClock },
  { id: "emails", label: "E-mails", icon: Mail },
  { id: "areas", label: "Områder", icon: MapPinned },
  { id: "payments", label: "Betalinger", icon: CreditCard },
  { id: "settings", label: "Indstillinger", icon: Settings2 },
] as const;

type AdminView = (typeof navItems)[number]["id"];

const viewMeta: Record<AdminView, { title: string; description: string }> = {
  overview: {
    title: "Driftsoversigt",
    description:
      "Få overblik over dagens bookinger, ventende godkendelser, kunder, betalinger og beskeder fra ét samlet panel.",
  },
  calendar: {
    title: "Kalender og kapacitet",
    description:
      "Se de kommende dage, blokeringer og dagens forløb i et format, der fungerer lige godt på mobil og desktop.",
  },
  bookings: {
    title: "Bookingkø og detaljer",
    description:
      "Godkend, flyt, annuller, fuldfør og opret bookinger manuelt med fuld historik, mailspor og betaling på samme booking.",
  },
  customers: {
    title: "Kunder og historik",
    description:
      "Hold styr på kundedata, tags, noter, værdi og tilbagevendende kunder uden at hoppe mellem flere systemer.",
  },
  services: {
    title: "Ydelser og priser",
    description:
      "Opdater pakketekster, varigheder, kategori-priser og tilvalg. Ændringerne slår direkte igennem i bookingflowet.",
  },
  availability: {
    title: "Arbejdstider og blokeringer",
    description:
      "Vælg arbejdsdage, bookingvindue, slotlængde og blokeringer for ferier, heldage eller travle tidsrum.",
  },
  emails: {
    title: "E-mailcenter",
    description:
      "Styr hvilke automatiske e-mails der sendes, se loggen over udsendelser og send nuværende kundemail eller admin-notifikation igen.",
  },
  areas: {
    title: "Områder og ruter",
    description:
      "Definér serviceområder med postnumre og tillæg, og se den kommende ruteplan grupperet efter dag og zone.",
  },
  payments: {
    title: "Betalinger og fakturaer",
    description:
      "Følg ubetalte bookinger, opdater betalingsstatus, noter betalingsmetode og hold styr på fakturastatus.",
  },
  settings: {
    title: "Generelle indstillinger",
    description:
      "Juster standardstatus for nye bookinger, virksomhedsoplysninger og de vigtigste kontaktpunkter for systemet.",
  },
};

const selectClassName =
  "h-12 w-full rounded-2xl border border-[#d7e5ee] bg-white/96 px-4 text-[var(--ink)] outline-none transition focus:border-[#7fc8ea] focus:ring-4 focus:ring-[#7fc8ea]/18";

const statusMessages: Record<string, string> = {
  created: "Bookingen er oprettet.",
  updated: "Ændringerne er gemt.",
  deleted: "Bookingen er slettet.",
  settings: "Indstillingerne er gemt.",
  customer: "Kunden er opdateret.",
  availability: "Kalenderblokken er opdateret.",
  email: "E-mailen er sendt igen.",
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const cookieStore = await cookies();
  const session = getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  if (!session) {
    redirect("/admin/login");
  }

  const params = await searchParams;
  const rawView = Array.isArray(params.view) ? params.view[0] : params.view || "overview";
  const view = navItems.some((item) => item.id === rawView)
    ? (rawView as AdminView)
    : "overview";
  const saved = Array.isArray(params.saved) ? params.saved[0] : params.saved || "";
  const error = Array.isArray(params.error) ? params.error[0] : params.error || "";
  const dashboard = await getAdminDashboardData();
  const hasDatabase = isDatabaseConfigured();
  const today = new Date().toISOString().slice(0, 10);
  const timeSlots = getTimeSlots(dashboard.settings);
  const upcomingBookings = [...dashboard.bookings]
    .filter(
      (item) =>
        item.status !== "cancelled" &&
        `${item.appointmentDate}T${item.appointmentTime}` >= `${today}T00:00`
    )
    .sort(sortBookings);
  const pendingBookings = dashboard.bookings.filter((item) => item.status === "pending");
  const todayBookings = upcomingBookings.filter((item) => item.appointmentDate === today);
  const unpaidBookings = dashboard.bookings
    .filter((item) => item.status !== "cancelled" && item.paymentStatus !== "paid")
    .sort(sortBookings);
  const calendarDays = dashboard.calendar
    .filter((item) => item.date >= today || item.blocks.length > 0)
    .slice(0, 12);
  const bookingsByCustomer = new Map<string, DashboardBooking[]>();
  for (const booking of dashboard.bookings) {
    const list = bookingsByCustomer.get(booking.customerId) || [];
    list.push(booking);
    bookingsByCustomer.set(booking.customerId, list);
  }
  for (const list of bookingsByCustomer.values()) {
    list.sort(sortBookings);
  }
  const statusMessage = statusMessages[saved] || "";
  const errorMessage = error === "action" ? "Handlingen kunne ikke gennemføres." : "";

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(146,214,244,0.22),transparent_28rem),radial-gradient(circle_at_100%_0%,rgba(25,103,146,0.08),transparent_22rem),linear-gradient(180deg,#f8fbfe_0%,#eef4f9_45%,#e7eff6_100%)] px-4 pb-10 pt-4 sm:px-6 sm:pb-12">
      <section className="mx-auto max-w-[1480px]">
        <div className="grid gap-5 xl:grid-cols-[18rem_minmax(0,1fr)]">
          <aside className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,#113a5c,#0c304e_62%,#102c46)] text-white shadow-[0_28px_90px_rgba(7,38,63,0.2)] xl:sticky xl:top-5 xl:self-start">
            <div className="border-b border-white/10 px-5 py-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#8fdcf6] text-xl font-semibold text-[#0b3049] shadow-[0_12px_24px_rgba(143,220,246,0.22)]">
                  A
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b8ebff]">WashMax</p>
                  <p className="mt-1 text-xl font-semibold">Admin</p>
                  <p className="text-sm text-white/72">{session.email}</p>
                </div>
              </div>
            </div>

            <nav className="flex snap-x gap-2 overflow-x-auto px-4 py-4 xl:grid xl:grid-cols-1 xl:overflow-visible">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = view === item.id;
                return (
                  <Link
                    key={item.id}
                    href={`/admin?view=${item.id}`}
                    className={cn(
                      "min-w-[10.75rem] snap-start flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition xl:min-w-0",
                      isActive
                        ? "bg-white text-[#0f3555] shadow-[0_14px_32px_rgba(255,255,255,0.14)]"
                        : "bg-white/6 text-white/84 hover:bg-white/12"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-white/10 px-5 py-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9fdff7]">
                  Dagens drift
                </p>
                <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs text-white/72">
                  Live
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm text-white/84">
                <div className="rounded-2xl border border-white/8 bg-white/6 px-3 py-3">
                  <span className="block text-xs text-white/56">I dag</span>
                  <strong>{dashboard.stats.todayBookings}</strong>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/6 px-3 py-3">
                  <span className="block text-xs text-white/56">Afventer</span>
                  <strong>{dashboard.stats.pendingBookings}</strong>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/6 px-3 py-3">
                  <span className="block text-xs text-white/56">Udestår</span>
                  <strong>{formatShortPrice(dashboard.stats.outstandingRevenue)}</strong>
                </div>
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <section className="rounded-[2rem] border border-[#d8e6ef] bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(245,250,255,0.94))] px-5 py-6 shadow-[0_22px_65px_rgba(7,38,63,0.08)] sm:px-7">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#2388d1]">
                    {navItems.find((item) => item.id === view)?.label}
                  </p>
                  <h1 className="mt-3 font-display text-3xl font-semibold text-[#0c2132] sm:text-5xl">
                    {viewMeta[view].title}
                  </h1>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-[#4b6474]">
                    {viewMeta[view].description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/booking"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-[#d4e3ed] bg-white px-4 text-sm font-semibold text-[var(--ink)] transition hover:border-[#7fc8ea] hover:text-[#0d526d]"
                  >
                    <CalendarPlus className="h-4 w-4" />
                    Ny booking
                  </Link>
                  <form action="/api/admin/logout" method="POST">
                    <Button type="submit" variant="outline">
                      <LogOut className="h-4 w-4" />
                      Log ud
                    </Button>
                  </form>
                </div>
              </div>
            </section>

            {!hasDatabase ? (
              <div className="rounded-[1.6rem] border border-[#ffe2af] bg-[#fff8ea] px-5 py-4 text-sm text-[#8d5d08] shadow-[0_12px_32px_rgba(141,93,8,0.08)]">
                DATABASE_URL mangler. Panelet kan vises, men bookinger og ændringer bliver
                ikke gemt, før databasen er sat op.
              </div>
            ) : null}

            {dashboard.databaseError ? (
              <div className="rounded-[1.6rem] border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 shadow-[0_12px_32px_rgba(176,38,38,0.08)]">
                Databasen kunne ikke indlæses: {dashboard.databaseError}
              </div>
            ) : null}

            {statusMessage || errorMessage ? (
              <div
                className={cn(
                  "rounded-[1.5rem] border px-5 py-4 text-sm",
                  errorMessage
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-[#cde6f6] bg-[#f6fbff] text-[#1a506d]"
                )}
              >
                {errorMessage || statusMessage}
              </div>
            ) : null}

            {view === "overview" ? (
              <OverviewView
                dashboard={dashboard}
                pendingBookings={pendingBookings}
                todayBookings={todayBookings}
                upcomingBookings={upcomingBookings}
                unpaidBookings={unpaidBookings}
              />
            ) : null}

            {view === "calendar" ? (
              <CalendarView
                calendarDays={calendarDays}
                upcomingBookings={upcomingBookings}
                pendingBookings={pendingBookings}
              />
            ) : null}

            {view === "bookings" ? (
              <BookingsView
                dashboard={dashboard}
                bookings={dashboard.bookings}
                pendingBookings={pendingBookings}
                upcomingBookings={upcomingBookings}
                timeSlots={timeSlots}
              />
            ) : null}

            {view === "customers" ? (
              <CustomersView
                customers={dashboard.customers}
                bookingsByCustomer={bookingsByCustomer}
              />
            ) : null}

            {view === "services" ? <ServicesView dashboard={dashboard} /> : null}

            {view === "availability" ? (
              <AvailabilityView dashboard={dashboard} timeSlots={timeSlots} />
            ) : null}

            {view === "emails" ? (
              <EmailsView dashboard={dashboard} recentEmails={dashboard.emailLogs.slice(0, 30)} />
            ) : null}

            {view === "areas" ? <AreasView dashboard={dashboard} /> : null}

            {view === "payments" ? (
              <PaymentsView unpaidBookings={unpaidBookings} dashboard={dashboard} />
            ) : null}

            {view === "settings" ? (
              <SettingsView dashboard={dashboard} smtpConfigured={Boolean(process.env.SMTP_HOST)} />
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}

function OverviewView({
  dashboard,
  pendingBookings,
  todayBookings,
  upcomingBookings,
  unpaidBookings,
}: {
  dashboard: DashboardData;
  pendingBookings: DashboardBooking[];
  todayBookings: DashboardBooking[];
  upcomingBookings: DashboardBooking[];
  unpaidBookings: DashboardBooking[];
}) {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          label="Ventende godkendelser"
          value={dashboard.stats.pendingBookings.toString()}
          detail={`${dashboard.stats.upcomingBookings} kommende bookinger`}
          icon={Clock3}
        />
        <MetricCard
          label="Dagens jobs"
          value={dashboard.stats.todayBookings.toString()}
          detail={`${dashboard.stats.completedBookings} afsluttede samlet`}
          icon={CalendarClock}
        />
        <MetricCard
          label="Omsætning"
          value={formatShortPrice(dashboard.stats.totalRevenue)}
          detail={`${formatShortPrice(dashboard.stats.outstandingRevenue)} mangler betaling`}
          icon={BarChart3}
        />
        <MetricCard
          label="Kunder"
          value={dashboard.stats.totalCustomers.toString()}
          detail={`${dashboard.customers.filter((item) => item.upcomingBookings > 0).length} aktive`}
          icon={Users}
        />
        <MetricCard
          label="E-mails"
          value={dashboard.emailLogs.length.toString()}
          detail={`${dashboard.emailLogs.filter((item) => item.status === "failed").length} fejl i loggen`}
          icon={Mail}
        />
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="space-y-4">
          <SectionHeading
            eyebrow="Næste handlinger"
            title="Ventende bookinger"
            description="De bookinger der typisk skal ses først af admin."
          />
          <div className="grid gap-4">
            {pendingBookings.length > 0 ? (
              pendingBookings.slice(0, 6).map((booking) => (
                <article
                  key={booking.id}
                  className="rounded-[1.5rem] border border-[#d9e7f0] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(8,27,21,0.05)]"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold text-[var(--ink)]">
                          {booking.customerName || booking.customerEmail}
                        </h3>
                        <StatusPill status={booking.status} />
                      </div>
                      <p className="mt-2 text-sm text-[var(--muted)]">
                        {booking.appointmentLabel} | {booking.packageLabel} - {booking.category}
                      </p>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        {booking.address}, {booking.postalCode} {booking.city}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-[#f5fafc] px-4 py-3 text-right">
                        <p className="text-xs uppercase tracking-[0.12em] text-[#2388d1]">
                          Total
                        </p>
                        <p className="mt-1 font-semibold text-[var(--ink)]">
                          {formatPrice(booking.total)}
                        </p>
                      </div>
                      <Link
                        href={`/admin?view=bookings#booking-${booking.id}`}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--line)] bg-white px-4 text-sm font-semibold text-[var(--ink)] transition hover:border-[#55b9df]"
                      >
                        Åbn
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <EmptyState text="Ingen ventende bookinger lige nu." />
            )}
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <SectionHeading
              eyebrow="I dag"
              title="Dagens plan"
              description="Et kompakt overblik der fungerer godt på mobilen i felten."
            />
            <div className="mt-4 grid gap-3">
              {todayBookings.length > 0 ? (
                todayBookings.map((booking) => (
                  <article
                    key={booking.id}
                    className="rounded-[1.4rem] border border-[#d9e7f0] bg-white px-4 py-4 shadow-[0_12px_32px_rgba(8,27,21,0.05)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[var(--ink)]">
                          {booking.appointmentTime} - {booking.customerName || booking.customerEmail}
                        </p>
                        <p className="mt-1 text-sm text-[var(--muted)]">
                          {booking.packageLabel} | {booking.areaName || booking.city}
                        </p>
                      </div>
                      <StatusPill status={booking.status} />
                    </div>
                  </article>
                ))
              ) : (
                <EmptyState text="Ingen jobs planlagt i dag." />
              )}
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Næste ruter"
              title="Områdeplan"
              description="Grupperet efter dag og zone, så ruten er lettere at planlægge."
            />
            <div className="mt-4 grid gap-4">
              {dashboard.routePlan.slice(0, 3).map((day) => (
                <article
                  key={day.date}
                  className="rounded-[1.4rem] border border-[#d9e7f0] bg-white px-4 py-4 shadow-[0_12px_32px_rgba(8,27,21,0.05)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-[var(--ink)]">{day.label}</p>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        {day.areas.length} områder planlagt
                      </p>
                    </div>
                    <Route className="h-5 w-5 text-[#2388d1]" />
                  </div>
                  <div className="mt-3 grid gap-2">
                    {day.areas.map((area) => (
                      <div
                        key={area.key}
                        className="flex items-center justify-between rounded-2xl bg-[#f6fafc] px-3 py-3 text-sm"
                      >
                        <span className="font-medium text-[var(--ink)]">
                          {area.label} ({area.count})
                        </span>
                        <span className="text-[var(--muted)]">
                          {formatPrice(area.totalRevenue)}
                        </span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Betaling"
              title="Udestående betalinger"
              description="Bookinger der mangler betaling eller fakturaopfølgning."
            />
            <div className="mt-4 grid gap-3">
              {unpaidBookings.length > 0 ? (
                unpaidBookings.slice(0, 5).map((booking) => (
                  <article
                    key={booking.id}
                    className="rounded-[1.4rem] border border-[#d9e7f0] bg-white px-4 py-4 shadow-[0_12px_32px_rgba(8,27,21,0.05)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[var(--ink)]">
                          {booking.customerName || booking.customerEmail}
                        </p>
                        <p className="mt-1 text-sm text-[var(--muted)]">
                          {booking.appointmentLabel}
                        </p>
                      </div>
                      <PaymentPill status={booking.paymentStatus} />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-[var(--muted)]">Fakturastatus</span>
                      <InvoicePill status={booking.invoiceStatus} />
                    </div>
                  </article>
                ))
              ) : (
                <EmptyState text="Ingen ubetalte bookinger lige nu." />
              )}
            </div>
          </div>
        </section>
      </div>

      <section className="space-y-4">
        <SectionHeading
          eyebrow="Kommende"
          title="Næste bookinger"
          description="Et hurtigt kig pa de naeste jobs i kalenderen."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {upcomingBookings.slice(0, 6).map((booking) => (
            <article
              key={booking.id}
              className="rounded-[1.5rem] border border-[#d9e7f0] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(8,27,21,0.05)]"
            >
              <div className="flex items-center justify-between gap-4">
                <StatusPill status={booking.status} />
                <PaymentPill status={booking.paymentStatus} />
              </div>
              <p className="mt-4 text-lg font-semibold text-[var(--ink)]">
                {booking.packageLabel} - {booking.category}
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {booking.customerName || booking.customerEmail}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">{booking.appointmentLabel}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {booking.areaName || booking.city}
              </p>
              <Link
                href={`/admin?view=bookings#booking-${booking.id}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#2388d1]"
              >
                Åbn booking
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function CalendarView({
  calendarDays,
  upcomingBookings,
  pendingBookings,
}: {
  calendarDays: DashboardData["calendar"];
  upcomingBookings: DashboardBooking[];
  pendingBookings: DashboardBooking[];
}) {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          label="Kalenderdage i view"
          value={calendarDays.length.toString()}
          detail="Viser naeste arbejdsdage og blokeringer"
          icon={Calendar}
        />
        <MetricCard
          label="Kommende jobs"
          value={upcomingBookings.length.toString()}
          detail={`${pendingBookings.length} af dem afventer`}
          icon={CalendarClock}
        />
        <MetricCard
          label="Blokerede dage"
          value={calendarDays.filter((item) => item.blocks.length > 0).length.toString()}
          detail="Heldage og delvise blokeringer samlet"
          icon={XCircle}
        />
      </div>

      <section className="space-y-4">
        <SectionHeading
          eyebrow="Næste 12 dage"
          title="Kalenderoversigt"
          description="Hver dag viser bookinger og blokeringer i samme kort."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {calendarDays.length > 0 ? (
            calendarDays.map((day) => (
              <article
                key={day.date}
                className="rounded-[1.5rem] border border-[#d9e7f0] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(8,27,21,0.05)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-[var(--ink)]">{day.label}</p>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {day.bookings.length} booking(er)
                    </p>
                  </div>
                  <Calendar className="h-5 w-5 text-[#2388d1]" />
                </div>

                {day.blocks.length > 0 ? (
                  <div className="mt-4 space-y-2">
                    {day.blocks.map((block) => (
                      <div
                        key={block.id}
                        className="rounded-2xl border border-[#ffe3b5] bg-[#fff7e8] px-3 py-3 text-sm text-[#8d5d08]"
                      >
                        <p className="font-semibold">{block.reason}</p>
                        <p className="mt-1">
                          {block.startTime} - {block.endTime}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="mt-4 grid gap-3">
                  {day.bookings.length > 0 ? (
                    day.bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="rounded-2xl border border-[#e4edf3] bg-[#fbfdff] px-3 py-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-medium text-[var(--ink)]">
                            {booking.appointmentTime} - {booking.customerName || booking.customerEmail}
                          </p>
                          <StatusPill status={booking.status} />
                        </div>
                        <p className="mt-2 text-sm text-[var(--muted)]">
                          {booking.packageLabel} | {booking.areaName || booking.city}
                        </p>
                      </div>
                    ))
                  ) : (
                    <EmptyState text="Ingen bookinger pa denne dag." />
                  )}
                </div>
              </article>
            ))
          ) : (
            <EmptyState text="Ingen kalenderdata at vise endnu." />
          )}
        </div>
      </section>
    </div>
  );
}

function BookingsView({
  dashboard,
  bookings,
  pendingBookings,
  upcomingBookings,
  timeSlots,
}: {
  dashboard: DashboardData;
  bookings: DashboardBooking[];
  pendingBookings: DashboardBooking[];
  upcomingBookings: DashboardBooking[];
  timeSlots: string[];
}) {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          label="Alle bookinger"
          value={dashboard.stats.totalBookings.toString()}
          detail={`${dashboard.stats.cancelledBookings} annullerede`}
          icon={ListFilter}
        />
        <MetricCard
          label="Ventende"
          value={pendingBookings.length.toString()}
          detail="Kraver typisk hurtigst handling"
          icon={Clock3}
        />
        <MetricCard
          label="Kommende"
          value={upcomingBookings.length.toString()}
          detail={`${dashboard.stats.todayBookings} i dag`}
          icon={CalendarClock}
        />
        <MetricCard
          label="Afsluttede"
          value={dashboard.stats.completedBookings.toString()}
          detail="Bevares i historikken"
          icon={CheckCircle2}
        />
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="space-y-4">
          <SectionHeading
            eyebrow="Admin oprettelse"
            title="Opret booking manuelt"
            description="Bruges til telefonbookinger, walk-ins eller hvis admin selv vil indlaegge en tid."
          />
          <form
            action="/api/admin/bookings/create"
            method="POST"
            className="grid gap-4 rounded-[1.6rem] border border-[#d9e7f0] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(8,27,21,0.05)]"
          >
            <input type="hidden" name="return_view" value="bookings" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Fornavn">
                <Input name="first_name" required />
              </Field>
              <Field label="Efternavn">
                <Input name="last_name" required />
              </Field>
              <Field label="Email">
                <Input name="email" type="email" required />
              </Field>
              <Field label="Telefon">
                <Input name="phone" required />
              </Field>
              <Field label="Adresse" className="sm:col-span-2">
                <Input name="address" required />
              </Field>
              <Field label="Postnr.">
                <Input name="postal_code" required />
              </Field>
              <Field label="By">
                <Input name="city" required />
              </Field>
              <Field label="Kundetype">
                <select name="customer_type" className={selectClassName} defaultValue="private">
                  <option value="private">Privat</option>
                  <option value="business">Erhverv</option>
                </select>
              </Field>
              <Field label="Firma / CVR">
                <Input name="company" placeholder="Valgfrit" />
              </Field>
              <Field label="Nummerplade">
                <Input name="plate" required />
              </Field>
              <Field label="Regnr.">
                <Input name="registration_number" />
              </Field>
              <Field label="Bilnavn">
                <Input name="vehicle_name" />
              </Field>
              <Field label="Aargang">
                <Input name="vehicle_year" type="number" min="1980" max="2100" />
              </Field>
              <Field label="Biltype">
                <Input name="vehicle_type" />
              </Field>
              <Field label="Kategori">
                <select name="category" className={selectClassName}>
                  {dashboard.settings.catalog.vehicleCategories.map((category) => (
                    <option key={category.id} value={category.label}>
                      {category.label} - {formatPrice(category.price)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Pakke">
                <select name="package_id" className={selectClassName}>
                  {dashboard.settings.catalog.packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.title}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Pris">
                <Input name="total" type="number" min="0" required />
              </Field>
              <Field label="Dato">
                <Input name="appointment_date" type="date" required />
              </Field>
              <Field label="Tid">
                <select name="appointment_time" className={selectClassName}>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Admin-noter" className="sm:col-span-2">
                <Textarea
                  name="admin_notes"
                  placeholder="Interne noter eller besked til kunden..."
                  className="min-h-24"
                />
              </Field>
            </div>

            <div className="rounded-[1.4rem] border border-[#cde6f6] bg-[#f6fbff] px-4 py-4 text-sm text-[#1a506d]">
              <p className="font-semibold text-[var(--ink)]">
                Standardstatus:{" "}
                {getAutoBookingStatusLabel(dashboard.settings.defaultBookingStatus)}
              </p>
              <p className="mt-2 leading-6">
                {getAutoBookingStatusDescription(dashboard.settings.defaultBookingStatus)}
              </p>
            </div>

            <label className="flex items-start gap-3 text-sm text-[var(--ink)]">
              <input
                type="checkbox"
                name="send_email"
                defaultChecked
                className="mt-1 h-4 w-4 rounded border-[#9cb0bd]"
              />
              <span>Send den indledende bookingmail til kunden med det samme</span>
            </label>

            <Button type="submit">
              <CalendarPlus className="h-4 w-4" />
              Opret booking
            </Button>
          </form>
        </section>

        <section className="space-y-4">
          <SectionHeading
            eyebrow="Queue"
            title="Bookingdetaljer"
            description="Hver booking kan aabnes med statusstyring, ombooking, betaling, mails og historik."
          />
          <div className="grid gap-4">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <BookingActionCard
                  key={booking.id}
                  booking={booking}
                  returnView="bookings"
                  timeSlots={timeSlots}
                />
              ))
            ) : (
              <EmptyState text="Ingen bookinger endnu." />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function CustomersView({
  customers,
  bookingsByCustomer,
}: {
  customers: CustomerSummary[];
  bookingsByCustomer: Map<string, DashboardBooking[]>;
}) {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          label="Kunder"
          value={customers.length.toString()}
          detail={`${customers.filter((item) => item.customerType === "business").length} erhverv`}
          icon={Users}
        />
        <MetricCard
          label="Gentagne kunder"
          value={customers.filter((item) => item.bookingsCount > 1).length.toString()}
          detail="Har booket mere end en gang"
          icon={UserRound}
        />
        <MetricCard
          label="Aktive kunder"
          value={customers.filter((item) => item.upcomingBookings > 0).length.toString()}
          detail="Har kommende booking"
          icon={CalendarClock}
        />
        <MetricCard
          label="Marketing opt-in"
          value={customers.filter((item) => item.marketingOptIn).length.toString()}
          detail="Kan bruges til kampagner"
          icon={Sparkles}
        />
      </div>

      <section className="space-y-4">
        <SectionHeading
          eyebrow="Kundeoversigt"
          title="CRM-light"
          description="Noter, tags, bookinghistorik og vaerdi samlet per kunde."
        />
        <div className="grid gap-4">
          {customers.length > 0 ? (
            customers.map((customer) => (
              <CustomerCard
                key={customer.id}
                customer={customer}
                bookings={bookingsByCustomer.get(customer.id) || []}
              />
            ))
          ) : (
            <EmptyState text="Ingen kunder endnu." />
          )}
        </div>
      </section>
    </div>
  );
}

function ServicesView({ dashboard }: { dashboard: DashboardData }) {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          label="Pakker"
          value={dashboard.settings.catalog.packages.length.toString()}
          detail="Vises direkte i bookingflowet"
          icon={Sparkles}
        />
        <MetricCard
          label="Bilkategorier"
          value={dashboard.settings.catalog.vehicleCategories.length.toString()}
          detail="Styrer grundpriserne"
          icon={Wrench}
        />
        <MetricCard
          label="Pris-tilvalg"
          value={(
            dashboard.settings.catalog.interiorAddOns.length +
            dashboard.settings.catalog.exteriorAddOns.length
          ).toString()}
          detail="Har direkte prismodel"
          icon={CreditCard}
        />
        <MetricCard
          label="Manuelle tilvalg"
          value={dashboard.settings.catalog.quantityAddOns.length.toString()}
          detail="Gemmes i kataloget uden auto-pris"
          icon={ShieldCheck}
        />
      </div>

      <form
        action="/api/admin/settings"
        method="POST"
        className="space-y-8"
      >
        <input type="hidden" name="section" value="services" />
        <input type="hidden" name="return_view" value="services" />

        <section className="space-y-4">
          <SectionHeading
            eyebrow="Pakker"
            title="Servicepakker"
            description="Ændringer her rammer bookingkortene og tidsestimaterne med det samme."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {dashboard.settings.catalog.packages.map((pkg) => (
              <article
                key={pkg.id}
                className="rounded-[1.5rem] border border-[#d9e7f0] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(8,27,21,0.05)]"
              >
                <div className="grid gap-4">
                  <Field label="Titel">
                    <Input name={`package_title_${pkg.id}`} defaultValue={pkg.title} />
                  </Field>
                  <Field label="Badge">
                    <Input name={`package_badge_${pkg.id}`} defaultValue={pkg.badge} />
                  </Field>
                  <Field label="Varighedstekst">
                    <Input name={`package_duration_${pkg.id}`} defaultValue={pkg.duration} />
                  </Field>
                  <Field label="Estimerede minutter">
                    <Input
                      name={`package_estimated_minutes_${pkg.id}`}
                      type="number"
                      min="15"
                      step="5"
                      defaultValue={pkg.estimatedMinutes}
                    />
                  </Field>
                  <Field label="Beskrivelse">
                    <Textarea
                      name={`package_description_${pkg.id}`}
                      defaultValue={pkg.description}
                      className="min-h-28"
                    />
                  </Field>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <SectionHeading
            eyebrow="Priser"
            title="Bilkategorier"
            description="Prislisten der bruges som grundlag for automatisk pris i bookingflowet."
          />
          <div className="grid gap-4 lg:grid-cols-2">
            {dashboard.settings.catalog.vehicleCategories.map((category) => (
              <article
                key={category.id}
                className="rounded-[1.5rem] border border-[#d9e7f0] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(8,27,21,0.05)]"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Label">
                    <Input name={`vehicle_label_${category.id}`} defaultValue={category.label} />
                  </Field>
                  <Field label="Pris">
                    <Input
                      name={`vehicle_price_${category.id}`}
                      type="number"
                      min="0"
                      step="1"
                      defaultValue={category.price}
                    />
                  </Field>
                  <Field label="Beskrivelse" className="sm:col-span-2">
                    <Textarea
                      name={`vehicle_description_${category.id}`}
                      defaultValue={category.description}
                      className="min-h-24"
                    />
                  </Field>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <SectionHeading
            eyebrow="Tilvalg"
            title="Add-ons"
            description="Pris-tilvalg opdateres direkte i bookingflowet, mens manuelle tilvalg stadig ligger i kataloget."
          />
          <div className="grid gap-4 xl:grid-cols-3">
            <div className="space-y-4 rounded-[1.5rem] border border-[#d9e7f0] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(8,27,21,0.05)]">
              <p className="text-lg font-semibold text-[var(--ink)]">Indvendige tilvalg</p>
              {dashboard.settings.catalog.interiorAddOns.map((addon) => (
                <div key={addon.id} className="grid gap-3 sm:grid-cols-[1fr_9rem]">
                  <Input name={`interior_label_${addon.id}`} defaultValue={addon.label} />
                  <Input
                    name={`interior_price_${addon.id}`}
                    type="number"
                    min="0"
                    step="1"
                    defaultValue={addon.price}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4 rounded-[1.5rem] border border-[#d9e7f0] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(8,27,21,0.05)]">
              <p className="text-lg font-semibold text-[var(--ink)]">Udvendige tilvalg</p>
              {dashboard.settings.catalog.exteriorAddOns.map((addon) => (
                <div key={addon.id} className="grid gap-3 sm:grid-cols-[1fr_9rem]">
                  <Input name={`exterior_label_${addon.id}`} defaultValue={addon.label} />
                  <Input
                    name={`exterior_price_${addon.id}`}
                    type="number"
                    min="0"
                    step="1"
                    defaultValue={addon.price}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4 rounded-[1.5rem] border border-[#d9e7f0] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(8,27,21,0.05)]">
              <p className="text-lg font-semibold text-[var(--ink)]">Manuelle tilvalg</p>
              {dashboard.settings.catalog.quantityAddOns.map((addon) => (
                <Input
                  key={addon.id}
                  name={`quantity_label_${addon.id}`}
                  defaultValue={addon.label}
                />
              ))}
            </div>
          </div>
        </section>

        <Button type="submit">Gem services og priser</Button>
      </form>
    </div>
  );
}

function AvailabilityView({
  dashboard,
  timeSlots,
}: {
  dashboard: DashboardData;
  timeSlots: string[];
}) {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          label="Arbejdsdage"
          value={dashboard.settings.workingDays.length.toString()}
          detail={dashboard.settings.workingDays
            .map((value) => weekdayOptions.find((item) => item.value === value)?.label)
            .filter(Boolean)
            .join(", ")}
          icon={CalendarClock}
        />
        <MetricCard
          label="Slots"
          value={timeSlots.length.toString()}
          detail={`${dashboard.settings.slotMinutes} min. per slot`}
          icon={Clock3}
        />
        <MetricCard
          label="Rejsebuffer"
          value={`${dashboard.settings.travelBufferMinutes} min.`}
          detail="Til intern planlaegning mellem jobs"
          icon={Route}
        />
        <MetricCard
          label="Blokeringer"
          value={dashboard.availabilityBlocks.length.toString()}
          detail="Heldage og delvise tidsrum"
          icon={XCircle}
        />
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_0.9fr]">
        <section className="space-y-4">
          <SectionHeading
            eyebrow="Bookingvindue"
            title="Arbejdstider og arbejdsdage"
            description="Disse indstillinger bruges baade i adminplanlaegning og i kundens bookingflow."
          />
          <form
            action="/api/admin/settings"
            method="POST"
            className="grid gap-4 rounded-[1.6rem] border border-[#d9e7f0] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(8,27,21,0.05)]"
          >
            <input type="hidden" name="section" value="availability" />
            <input type="hidden" name="return_view" value="availability" />
            <div className="grid gap-4 sm:grid-cols-4">
              <Field label="Start time">
                <Input
                  name="start_hour"
                  type="number"
                  min="0"
                  max="23"
                  defaultValue={dashboard.settings.startHour}
                />
              </Field>
              <Field label="Slut time">
                <Input
                  name="end_hour"
                  type="number"
                  min="1"
                  max="24"
                  defaultValue={dashboard.settings.endHour}
                />
              </Field>
              <Field label="Slot minutter">
                <Input
                  name="slot_minutes"
                  type="number"
                  min="15"
                  step="15"
                  defaultValue={dashboard.settings.slotMinutes}
                />
              </Field>
              <Field label="Rejsebuffer">
                <Input
                  name="travel_buffer_minutes"
                  type="number"
                  min="0"
                  step="5"
                  defaultValue={dashboard.settings.travelBufferMinutes}
                />
              </Field>
            </div>
            <div className="grid gap-3">
              <p className="text-sm font-medium text-[var(--ink)]">Arbejdsdage</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {weekdayOptions.map((day) => (
                  <label
                    key={day.value}
                    className="flex items-center gap-3 rounded-2xl border border-[#d9e7f0] bg-[#fbfdff] px-4 py-3 text-sm text-[var(--ink)]"
                  >
                    <input
                      type="checkbox"
                      name="working_days"
                      value={day.value}
                      defaultChecked={dashboard.settings.workingDays.includes(day.value)}
                      className="h-4 w-4 rounded border-[#9cb0bd]"
                    />
                    <span>{day.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <Button type="submit">Gem arbejdstider</Button>
          </form>
        </section>

        <section className="space-y-4">
          <SectionHeading
            eyebrow="Bloker tider"
            title="Ny blokering"
            description="Bruges til ferie, heldage, frokostvinduer eller travle perioder."
          />
          <form
            action="/api/admin/availability"
            method="POST"
            className="grid gap-4 rounded-[1.6rem] border border-[#d9e7f0] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(8,27,21,0.05)]"
          >
            <input type="hidden" name="return_view" value="availability" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Startdato">
                <Input name="start_date" type="date" required />
              </Field>
              <Field label="Slutdato">
                <Input name="end_date" type="date" required />
              </Field>
              <Field label="Starttid">
                <Input name="start_time" type="time" defaultValue="00:00" />
              </Field>
              <Field label="Sluttid">
                <Input name="end_time" type="time" defaultValue="23:59" />
              </Field>
              <Field label="Aarsag" className="sm:col-span-2">
                <Input name="reason" placeholder="Fx ferie, frokost, servicebil optaget..." required />
              </Field>
            </div>
            <Button type="submit">Tilfoej blokering</Button>
          </form>
        </section>
      </div>

      <section className="space-y-4">
        <SectionHeading
          eyebrow="Oversigt"
          title="Aktive blokeringer"
          description="Alle blokeringer ligger her og kan fjernes enkeltvis."
        />
        <div className="grid gap-4">
          {dashboard.availabilityBlocks.length > 0 ? (
            dashboard.availabilityBlocks.map((block) => (
              <article
                key={block.id}
                className="rounded-[1.5rem] border border-[#d9e7f0] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(8,27,21,0.05)]"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-[var(--ink)]">{block.reason}</p>
                    <p className="mt-2 text-sm text-[var(--muted)]">
                      {block.startDate} til {block.endDate} | {block.startTime} - {block.endTime}
                    </p>
                  </div>
                  <form action="/api/admin/availability" method="POST">
                    <input type="hidden" name="action" value="delete" />
                    <input type="hidden" name="block_id" value={block.id} />
                    <input type="hidden" name="return_view" value="availability" />
                    <Button type="submit" variant="outline">
                      Fjern blokering
                    </Button>
                  </form>
                </div>
              </article>
            ))
          ) : (
            <EmptyState text="Ingen blokeringer oprettet endnu." />
          )}
        </div>
      </section>
    </div>
  );
}

function EmailsView({
  dashboard,
  recentEmails,
}: {
  dashboard: DashboardData;
  recentEmails: BookingEmailLog[];
}) {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-5">
        <MetricCard
          label="Create mail"
          value={dashboard.settings.emailAutomation.customerOnCreate ? "Til" : "Fra"}
          detail="Kunde faar oprettelsesmail"
          icon={Mail}
        />
        <MetricCard
          label="Approve mail"
          value={dashboard.settings.emailAutomation.customerOnApprove ? "Til" : "Fra"}
          detail="Kunde faar godkendelsesmail"
          icon={CheckCircle2}
        />
        <MetricCard
          label="Cancel mail"
          value={dashboard.settings.emailAutomation.customerOnCancel ? "Til" : "Fra"}
          detail="Kunde faar aflysningsmail"
          icon={XCircle}
        />
        <MetricCard
          label="Admin alert"
          value={dashboard.settings.emailAutomation.adminOnCreate ? "Til" : "Fra"}
          detail="Admin får notifikation ved ny booking"
          icon={BellRing}
        />
        <MetricCard
          label="Fejl i log"
          value={recentEmails.filter((item) => item.status === "failed").length.toString()}
          detail="Baseret pa de seneste loglinjer"
          icon={ShieldCheck}
        />
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="space-y-4">
          <SectionHeading
            eyebrow="Automation"
            title="Hvilke mails skal sendes?"
            description="Slå til eller fra pr. situation. Ændringer virker med det samme."
          />
          <form
            action="/api/admin/settings"
            method="POST"
            className="grid gap-3 rounded-[1.6rem] border border-[#d9e7f0] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(8,27,21,0.05)]"
          >
            <input type="hidden" name="section" value="emails" />
            <input type="hidden" name="return_view" value="emails" />
            {[
              {
                name: "customer_on_create",
                title: "Kunde ved booking modtaget",
                description: "Sendes naar en ny booking er oprettet fra website eller admin.",
                checked: dashboard.settings.emailAutomation.customerOnCreate,
              },
              {
                name: "customer_on_approve",
                title: "Kunde ved godkendelse",
                description: "Sendes naar en booking skifter til godkendt.",
                checked: dashboard.settings.emailAutomation.customerOnApprove,
              },
              {
                name: "customer_on_complete",
                title: "Kunde ved afslutning",
                description: "Sendes naar jobbet er markeret som afsluttet.",
                checked: dashboard.settings.emailAutomation.customerOnComplete,
              },
              {
                name: "customer_on_cancel",
                title: "Kunde ved annullering",
                description: "Sendes naar en booking bliver annulleret.",
                checked: dashboard.settings.emailAutomation.customerOnCancel,
              },
              {
                name: "admin_on_create",
                title: "Admin ved ny booking",
                description: "Send notifikation til admin-mail ved ny booking fra website.",
                checked: dashboard.settings.emailAutomation.adminOnCreate,
              },
            ].map((item) => (
              <label
                key={item.name}
                className="flex items-start gap-3 rounded-2xl border border-[#d9e7f0] bg-[#fbfdff] px-4 py-4"
              >
                <input
                  type="checkbox"
                  name={item.name}
                  defaultChecked={item.checked}
                  className="mt-1 h-4 w-4 rounded border-[#9cb0bd]"
                />
                <span>
                  <span className="block font-semibold text-[var(--ink)]">{item.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-[var(--muted)]">
                    {item.description}
                  </span>
                </span>
              </label>
            ))}
            <Button type="submit">Gem emailregler</Button>
          </form>

          <div className="rounded-[1.6rem] border border-[#d9e7f0] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(8,27,21,0.05)]">
            <p className="text-lg font-semibold text-[var(--ink)]">Mailopsaetning</p>
            <div className="mt-4 grid gap-3 text-sm text-[var(--muted)]">
              <p className="flex items-center justify-between gap-4">
                <span>SMTP host</span>
                <strong className="text-[var(--ink)]">{process.env.SMTP_HOST || "Ikke sat"}</strong>
              </p>
              <p className="flex items-center justify-between gap-4">
                <span>SMTP user</span>
                <strong className="text-[var(--ink)]">{process.env.SMTP_USER || "Ikke sat"}</strong>
              </p>
              <p className="flex items-center justify-between gap-4">
                <span>Mail from</span>
                <strong className="text-[var(--ink)]">{process.env.MAIL_FROM || "Ikke sat"}</strong>
              </p>
              <p className="flex items-center justify-between gap-4">
                <span>Support email</span>
                <strong className="text-[var(--ink)]">{dashboard.settings.supportEmail}</strong>
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <SectionHeading
            eyebrow="Log"
            title="Seneste emailhændelser"
            description="Her kan admin se, hvad der er sendt, om det fejlede, og sende den nuværende mail igen med ét klik."
          />
          <div className="grid gap-4">
            {recentEmails.length > 0 ? (
              recentEmails.map((email) => <EmailLogCard key={email.id} email={email} />)
            ) : (
              <EmptyState text="Ingen mailhistorik endnu." />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function AreasView({ dashboard }: { dashboard: DashboardData }) {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          label="Aktive omraader"
          value={dashboard.settings.serviceAreas.filter((item) => item.isActive).length.toString()}
          detail={`${dashboard.settings.serviceAreas.length} samlet`}
          icon={MapPinned}
        />
        <MetricCard
          label="Planlagte rutedage"
          value={dashboard.routePlan.length.toString()}
          detail="Med mindst en pending/godkendt booking"
          icon={Route}
        />
        <MetricCard
          label="Omrader med tillaeg"
          value={dashboard.settings.serviceAreas.filter((item) => item.surcharge > 0).length.toString()}
          detail="Bruges i kundeprisen"
          icon={CreditCard}
        />
        <MetricCard
          label="Samlet koerselstillaeg"
          value={formatShortPrice(
            dashboard.routePlan.reduce(
              (sum, day) =>
                sum + day.areas.reduce((areaSum, area) => areaSum + area.travelSurcharge, 0),
              0
            )
          )}
          detail="Baseret pa kommende ruteplan"
          icon={BarChart3}
        />
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_1fr]">
        <section className="space-y-4">
          <SectionHeading
            eyebrow="Zoner"
            title="Serviceomraader"
            description="Postnumre og tillaeg bruges direkte i bookingflowet, saa kunder ser korrekt pris."
          />

          <form
            action="/api/admin/settings"
            method="POST"
            className="grid gap-4 rounded-[1.6rem] border border-[#d9e7f0] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(8,27,21,0.05)]"
          >
            <input type="hidden" name="section" value="areas" />
            <input type="hidden" name="return_view" value="areas" />
            <input type="hidden" name="area_action" value="add" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Navn">
                <Input name="label" placeholder="Fx Koebenhavn nord" required />
              </Field>
              <Field label="Tillaeg">
                <Input name="surcharge" type="number" min="0" step="1" defaultValue="0" />
              </Field>
              <Field label="Postnumre / prefixes" className="sm:col-span-2">
                <Textarea
                  name="postal_prefixes"
                  className="min-h-24"
                  placeholder="Fx 2100, 2150, 2200"
                />
              </Field>
              <Field label="By-noter">
                <Input name="city_hints" placeholder="Fx Oesterbro, Nordhavn" />
              </Field>
              <Field label="Interne noter">
                <Input name="notes" placeholder="Fx parkering svaer i myldretid" />
              </Field>
            </div>
            <label className="flex items-center gap-3 text-sm text-[var(--ink)]">
              <input
                type="checkbox"
                name="is_active"
                defaultChecked
                className="h-4 w-4 rounded border-[#9cb0bd]"
              />
              Aktivt serviceomraade
            </label>
            <Button type="submit">Tilfoej omraade</Button>
          </form>

          <div className="grid gap-4">
            {dashboard.settings.serviceAreas.length > 0 ? (
              dashboard.settings.serviceAreas.map((area) => (
                <AreaCard key={area.id} area={area} />
              ))
            ) : (
              <EmptyState text="Ingen serviceomraader oprettet endnu." />
            )}
          </div>
        </section>

        <section className="space-y-4">
          <SectionHeading
            eyebrow="Ruteplan"
            title="Kommende omraadegrupper"
            description="Næste jobs er samlet pr. dag og zone, så admin hurtigt kan se belastning og omsætning."
          />
          <div className="grid gap-4">
            {dashboard.routePlan.length > 0 ? (
              dashboard.routePlan.map((day) => (
                <article
                  key={day.date}
                  className="rounded-[1.5rem] border border-[#d9e7f0] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(8,27,21,0.05)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-[var(--ink)]">{day.label}</p>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        {day.areas.length} omrader planlagt
                      </p>
                    </div>
                    <Route className="h-5 w-5 text-[#2388d1]" />
                  </div>
                  <div className="mt-4 grid gap-3">
                    {day.areas.map((area) => (
                      <div
                        key={area.key}
                        className="rounded-2xl border border-[#e4edf3] bg-[#fbfdff] px-4 py-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-semibold text-[var(--ink)]">
                            {area.label} ({area.count})
                          </p>
                          <p className="text-sm text-[var(--muted)]">
                            {formatPrice(area.totalRevenue)}
                          </p>
                        </div>
                        <div className="mt-3 grid gap-2">
                          {area.bookings.map((booking) => (
                            <div key={booking.id} className="flex items-center justify-between gap-3 text-sm">
                              <span className="text-[var(--ink)]">
                                {booking.appointmentTime} - {booking.customerName || booking.customerEmail}
                              </span>
                              <span className="text-[var(--muted)]">
                                {formatPrice(booking.total)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))
            ) : (
              <EmptyState text="Ingen ruteplan endnu. Den fyldes automatisk af kommende bookinger." />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function PaymentsView({
  unpaidBookings,
  dashboard,
}: {
  unpaidBookings: DashboardBooking[];
  dashboard: DashboardData;
}) {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          label="Ubetalte"
          value={dashboard.bookings.filter((item) => item.paymentStatus === "unpaid").length.toString()}
          detail="Ingen betaling registreret"
          icon={CreditCard}
        />
        <MetricCard
          label="Afventer betaling"
          value={dashboard.bookings.filter((item) => item.paymentStatus === "pending").length.toString()}
          detail="Belobet er ikke afsluttet"
          icon={Clock3}
        />
        <MetricCard
          label="Fakturaklare"
          value={dashboard.bookings.filter((item) => item.invoiceStatus === "ready").length.toString()}
          detail="Mangler at blive sendt"
          icon={ReceiptText}
        />
        <MetricCard
          label="Udestående omsætning"
          value={formatShortPrice(dashboard.stats.outstandingRevenue)}
          detail="Ikke markeret som betalt endnu"
          icon={BarChart3}
        />
      </div>

      <section className="space-y-4">
        <SectionHeading
          eyebrow="Opfoelgning"
          title="Betalinger og fakturaer"
          description="Hver booking kan opdateres med betalingsstatus, metode og fakturaforlob."
        />
        <div className="grid gap-4">
          {unpaidBookings.length > 0 ? (
            unpaidBookings.map((booking) => (
              <PaymentCard key={booking.id} booking={booking} />
            ))
          ) : (
            <EmptyState text="Ingen ubetalte eller delvist betalte bookinger lige nu." />
          )}
        </div>
      </section>
    </div>
  );
}

function SettingsView({
  dashboard,
  smtpConfigured,
}: {
  dashboard: DashboardData;
  smtpConfigured: boolean;
}) {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          label="Standardstatus"
          value={getAutoBookingStatusLabel(dashboard.settings.defaultBookingStatus)}
          detail="Bruges ved nye bookinger"
          icon={Cog}
        />
        <MetricCard
          label="Support email"
          value={dashboard.settings.supportEmail}
          detail="Vises til kunden"
          icon={Mail}
        />
        <MetricCard
          label="Admin notify"
          value={dashboard.settings.adminNotifyEmail || "Ikke sat"}
          detail="Modtager booking-alerts"
          icon={BellRing}
        />
        <MetricCard
          label="SMTP"
          value={smtpConfigured ? "Klar" : "Mangler"}
          detail="Mailserver for udsendelser"
          icon={ShieldCheck}
        />
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_0.95fr]">
        <section className="space-y-4">
          <SectionHeading
            eyebrow="Generelt"
            title="Virksomheds- og bookingopsætning"
            description="Alt det admin typisk justerer først, inkl. standardstatus for nye bookinger."
          />
          <form
            action="/api/admin/settings"
            method="POST"
            className="grid gap-4 rounded-[1.6rem] border border-[#d9e7f0] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(8,27,21,0.05)]"
          >
            <input type="hidden" name="section" value="general" />
            <input type="hidden" name="return_view" value="settings" />
            <Field label="Firmanavn">
              <Input name="company_name" defaultValue={dashboard.settings.companyName} />
            </Field>
            <Field label="Support email">
              <Input name="support_email" defaultValue={dashboard.settings.supportEmail} />
            </Field>
            <Field label="Admin notifikation email">
              <Input name="admin_notify_email" defaultValue={dashboard.settings.adminNotifyEmail} />
            </Field>
            <div className="grid gap-3">
              <p className="text-sm font-medium text-[var(--ink)]">Nye bookinger som standard</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    value: "pending",
                    title: "Afventer godkendelse",
                    description:
                      "Bookingen oprettes som pending, og kunden faar en modtaget-mail med det samme.",
                    icon: Clock3,
                  },
                  {
                    value: "approved",
                    title: "Godkend automatisk",
                    description:
                      "Bookingen oprettes som godkendt med det samme og kunden faar den endelige bekraeftelse.",
                    icon: CheckCircle2,
                  },
                ].map((option) => {
                  const Icon = option.icon;
                  return (
                    <label key={option.value} className="block cursor-pointer">
                      <input
                        type="radio"
                        name="default_booking_status"
                        value={option.value}
                        defaultChecked={dashboard.settings.defaultBookingStatus === option.value}
                        className="peer sr-only"
                      />
                      <span className="flex h-full min-h-36 flex-col rounded-[1.25rem] border border-[var(--line)] bg-white p-4 transition peer-checked:border-[#55b9df] peer-checked:bg-[#eef8ff] peer-checked:shadow-[0_16px_32px_rgba(43,147,220,0.12)]">
                        <span className="flex items-center gap-3 text-[var(--ink)]">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2f7fa] text-[#2388d1]">
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="font-semibold">{option.title}</span>
                        </span>
                        <span className="mt-3 text-sm leading-6 text-[var(--muted)]">
                          {option.description}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
            <Button type="submit">Gem generelle indstillinger</Button>
          </form>
        </section>

        <section className="space-y-4">
          <div className="rounded-[1.6rem] border border-[#d9e7f0] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(8,27,21,0.05)]">
            <p className="text-lg font-semibold text-[var(--ink)]">Hvad betyder standardstatus?</p>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              {getAutoBookingStatusDescription(dashboard.settings.defaultBookingStatus)}
            </p>
            <div className="mt-4 rounded-[1.2rem] bg-[#f6fbff] px-4 py-4 text-sm text-[#1a506d]">
              Denne indstilling paavirker baade website-bookinger og manuelle bookinger oprettet fra admin.
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-[#d9e7f0] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(8,27,21,0.05)]">
            <p className="text-lg font-semibold text-[var(--ink)]">Mailmiljoe</p>
            <div className="mt-4 grid gap-3 text-sm text-[var(--muted)]">
              <p className="flex items-center justify-between gap-4">
                <span>SMTP host</span>
                <strong className="text-[var(--ink)]">{process.env.SMTP_HOST || "Ikke sat"}</strong>
              </p>
              <p className="flex items-center justify-between gap-4">
                <span>SMTP port</span>
                <strong className="text-[var(--ink)]">{process.env.SMTP_PORT || "587"}</strong>
              </p>
              <p className="flex items-center justify-between gap-4">
                <span>MAIL_FROM</span>
                <strong className="text-[var(--ink)]">{process.env.MAIL_FROM || "Ikke sat"}</strong>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function BookingActionCard({
  booking,
  timeSlots,
  returnView,
}: {
  booking: DashboardBooking;
  timeSlots: string[];
  returnView: string;
}) {
  const actions = getBookingActions(booking.status);
  return (
    <details
      id={`booking-${booking.id}`}
      className="group rounded-[1.6rem] border border-[#d9e7f0] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(8,27,21,0.05)]"
    >
      <summary className="cursor-pointer list-none">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-semibold text-[var(--ink)]">
                {booking.packageLabel} - {booking.category}
              </h3>
              <StatusPill status={booking.status} />
              <PaymentPill status={booking.paymentStatus} />
            </div>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {booking.customerName || booking.customerEmail} | {booking.vehicleName} |{" "}
              {booking.registrationNumber}
            </p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm text-[var(--muted)]">
              <span>{booking.appointmentLabel}</span>
              <span>{booking.address}</span>
              <span>{formatPrice(booking.total)}</span>
            </div>
          </div>
          <div className="rounded-2xl bg-[#f6fafc] px-4 py-3 text-right">
            <p className="text-xs uppercase tracking-[0.12em] text-[#2388d1]">Detaljer</p>
            <p className="mt-1 text-sm font-semibold text-[var(--ink)]">
              Klik for at styre booking
            </p>
          </div>
        </div>
      </summary>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-4">
          <InfoPanel title="Kunde og booking">
            <div className="grid gap-3 sm:grid-cols-2 text-sm">
              <DetailRow label="Kunde" value={booking.customerName || booking.customerEmail} />
              <DetailRow label="Email" value={booking.customerEmail} />
              <DetailRow label="Telefon" value={booking.customerPhone} />
              <DetailRow label="Adresse" value={`${booking.address}, ${booking.postalCode} ${booking.city}`} />
              <DetailRow label="Pakke" value={`${booking.packageLabel} - ${booking.category}`} />
              <DetailRow label="Bil" value={`${booking.vehicleName} (${booking.registrationNumber})`} />
              <DetailRow label="Område" value={booking.areaName || booking.city || "Ikke sat"} />
              <DetailRow label="Varighed" value={`${booking.estimatedMinutes} min.`} />
            </div>
            {booking.addons.length > 0 ? (
              <div className="mt-4 rounded-2xl bg-[#f7fafb] px-4 py-4 text-sm text-[var(--muted)]">
                {booking.addons.map((addon) => (
                  <div key={addon.id} className="flex items-center justify-between gap-4 py-1">
                    <span>{addon.label}</span>
                    <strong className="text-[var(--ink)]">{formatPrice(addon.price)}</strong>
                  </div>
                ))}
              </div>
            ) : null}
          </InfoPanel>

          <InfoPanel title="Emailhistorik">
            {booking.emailLogs.length > 0 ? (
              <div className="grid gap-3">
                {booking.emailLogs.slice(0, 5).map((email) => (
                  <div
                    key={email.id}
                    className="rounded-2xl border border-[#e4edf3] bg-[#fbfdff] px-4 py-4 text-sm"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-semibold text-[var(--ink)]">{email.subject}</span>
                      <span
                        className={cn(
                          "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                          email.status === "sent"
                            ? "bg-[#ebf8f1] text-[#1f7a4b]"
                            : email.status === "failed"
                              ? "bg-[#fff0f0] text-[#c43d3d]"
                              : "bg-[#eef8ff] text-[#1f6aa4]"
                        )}
                      >
                        {email.status}
                      </span>
                    </div>
                    <p className="mt-2 text-[var(--muted)]">
                      {email.recipientRole} | {email.recipient}
                    </p>
                    <p className="mt-1 text-[var(--muted)]">
                      {email.sentAt || email.createdAt}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState text="Ingen registrerede emails pa denne booking endnu." />
            )}
          </InfoPanel>

          <InfoPanel title="Aktivitet">
            {booking.activity.length > 0 ? (
              <div className="grid gap-3">
                {booking.activity.slice(0, 6).map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-[#e4edf3] bg-[#fbfdff] px-4 py-4 text-sm"
                  >
                    <p className="font-semibold text-[var(--ink)]">{item.summary}</p>
                    <p className="mt-1 text-[var(--muted)]">
                      {item.actor} | {item.createdAt}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState text="Ingen aktivitet registreret endnu." />
            )}
          </InfoPanel>
        </div>

        <div className="space-y-4">
          <InfoPanel title="Statushandlinger">
            <form action={`/api/admin/bookings/${booking.id}`} method="POST" className="grid gap-3">
              <input type="hidden" name="return_view" value={returnView} />
              <Textarea
                name="admin_notes"
                defaultValue={booking.adminNotes}
                className="min-h-24"
                placeholder="Interne noter eller besked til kunden..."
              />
              {actions.length > 0 ? (
                <div className="grid gap-2 sm:grid-cols-2">
                  {actions.map((action) => (
                    <Button
                      key={action.value}
                      type="submit"
                      name="action"
                      value={action.value}
                      variant={action.variant}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              ) : (
                <EmptyState text="Ingen flere lifecycle-handlinger er typisk noedvendige." />
              )}
              <Button
                type="submit"
                name="action"
                value="delete"
                variant="outline"
                className="border-red-200 text-red-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
              >
                Slet booking
              </Button>
            </form>
          </InfoPanel>

          <InfoPanel title="Ombooking">
            <form action={`/api/admin/bookings/${booking.id}`} method="POST" className="grid gap-3">
              <input type="hidden" name="action" value="reschedule" />
              <input type="hidden" name="return_view" value={returnView} />
              <Field label="Ny dato">
                <Input name="appointment_date" type="date" defaultValue={booking.appointmentDate} />
              </Field>
              <Field label="Ny tid">
                <select name="appointment_time" defaultValue={booking.appointmentTime} className={selectClassName}>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Admin-noter">
                <Textarea
                  name="admin_notes"
                  defaultValue={booking.adminNotes}
                  className="min-h-24"
                />
              </Field>
              <label className="flex items-start gap-3 text-sm text-[var(--ink)]">
                <input
                  type="checkbox"
                  name="notify_customer"
                  defaultChecked
                  className="mt-1 h-4 w-4 rounded border-[#9cb0bd]"
                />
                <span>Send opdateret statusmail til kunden efter ombooking</span>
              </label>
              <Button type="submit" variant="secondary">
                Gem ny tid
              </Button>
            </form>
          </InfoPanel>

          <InfoPanel title="Betaling og faktura">
            <form action={`/api/admin/bookings/${booking.id}`} method="POST" className="grid gap-3">
              <input type="hidden" name="action" value="financial" />
              <input type="hidden" name="return_view" value={returnView} />
              <Field label="Betalingsstatus">
                <select name="payment_status" defaultValue={booking.paymentStatus} className={selectClassName}>
                  {paymentStatuses.map((status) => (
                    <option key={status} value={status}>
                      {getPaymentStatusLabel(status)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Betalingsmetode">
                <Input name="payment_method" defaultValue={booking.paymentMethod} placeholder="Fx MobilePay, kort, faktura" />
              </Field>
              <label className="flex items-start gap-3 text-sm text-[var(--ink)]">
                <input
                  type="checkbox"
                  name="invoice_requested"
                  defaultChecked={booking.invoiceRequested}
                  className="mt-1 h-4 w-4 rounded border-[#9cb0bd]"
                />
                <span>Faktura ønskes eller er påkrævet</span>
              </label>
              <Field label="Fakturastatus">
                <select name="invoice_status" defaultValue={booking.invoiceStatus} className={selectClassName}>
                  {invoiceStatuses.map((status) => (
                    <option key={status} value={status}>
                      {getInvoiceStatusLabel(status)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Fakturanummer">
                <Input name="invoice_number" defaultValue={booking.invoiceNumber} />
              </Field>
              <Field label="Admin-noter">
                <Textarea name="admin_notes" defaultValue={booking.adminNotes} className="min-h-24" />
              </Field>
              <Button type="submit" variant="secondary">
                Gem betaling
              </Button>
            </form>
          </InfoPanel>

          <InfoPanel title="Emailhandlinger">
            <div className="grid gap-3">
              <form action={`/api/admin/bookings/${booking.id}`} method="POST">
                <input type="hidden" name="action" value="resend_customer" />
                <input type="hidden" name="return_view" value={returnView} />
                <input type="hidden" name="admin_notes" value={booking.adminNotes} />
                <Button type="submit" variant="outline" className="w-full">
                  Send nuværende kundemail igen
                </Button>
              </form>
              <form action={`/api/admin/bookings/${booking.id}`} method="POST">
                <input type="hidden" name="action" value="resend_admin" />
                <input type="hidden" name="return_view" value={returnView} />
                <input type="hidden" name="admin_notes" value={booking.adminNotes} />
                <Button type="submit" variant="outline" className="w-full">
                  Send adminnotifikation igen
                </Button>
              </form>
            </div>
          </InfoPanel>
        </div>
      </div>
    </details>
  );
}

function CustomerCard({
  customer,
  bookings,
}: {
  customer: CustomerSummary;
  bookings: DashboardBooking[];
}) {
  return (
    <details className="group rounded-[1.6rem] border border-[#d9e7f0] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(8,27,21,0.05)]">
      <summary className="cursor-pointer list-none">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-semibold text-[var(--ink)]">
                {[customer.firstName, customer.lastName].filter(Boolean).join(" ") || customer.email}
              </h3>
              {customer.company ? (
                <span className="inline-flex rounded-full bg-[#eef8ff] px-3 py-1 text-xs font-semibold text-[#1f6aa4]">
                  {customer.customerType === "business" ? "Erhverv" : "Privat"}
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {customer.email} | {customer.phone}
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {customer.address}, {customer.postalCode} {customer.city}
            </p>
          </div>
          <div className="grid gap-2 text-right text-sm">
            <p className="font-semibold text-[var(--ink)]">{customer.bookingsCount} booking(er)</p>
            <p className="text-[var(--muted)]">{formatPrice(customer.totalSpent)}</p>
            <p className="text-[var(--muted)]">{customer.lastBookingLabel || "Ingen historik"}</p>
          </div>
        </div>
      </summary>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <InfoPanel title="Kundenoter og tags">
          <form action={`/api/admin/customers/${customer.id}`} method="POST" className="grid gap-3">
            <input type="hidden" name="return_view" value="customers" />
            <Field label="Tags">
              <Input
                name="tags"
                defaultValue={customer.tags.join(", ")}
                placeholder="Fx VIP, no-show, fleet, firmakunde"
              />
            </Field>
            <Field label="Noter">
              <Textarea name="notes" defaultValue={customer.notes} className="min-h-28" />
            </Field>
            <Button type="submit">Gem kundeinfo</Button>
          </form>
        </InfoPanel>

        <InfoPanel title="Bookinghistorik">
          {bookings.length > 0 ? (
            <div className="grid gap-3">
              {bookings.slice(0, 6).map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-2xl border border-[#e4edf3] bg-[#fbfdff] px-4 py-4 text-sm"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-semibold text-[var(--ink)]">{booking.packageLabel}</span>
                    <StatusPill status={booking.status} />
                    <PaymentPill status={booking.paymentStatus} />
                  </div>
                  <p className="mt-2 text-[var(--muted)]">{booking.appointmentLabel}</p>
                  <p className="mt-1 text-[var(--muted)]">
                    {booking.vehicleName} | {booking.registrationNumber}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="Kunden har ingen bookinger endnu." />
          )}
        </InfoPanel>
      </div>
    </details>
  );
}

function AreaCard({ area }: { area: DashboardData["settings"]["serviceAreas"][number] }) {
  return (
    <article className="rounded-[1.5rem] border border-[#d9e7f0] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(8,27,21,0.05)]">
      <form action="/api/admin/settings" method="POST" className="grid gap-4">
        <input type="hidden" name="section" value="areas" />
        <input type="hidden" name="return_view" value="areas" />
        <input type="hidden" name="area_action" value="update" />
        <input type="hidden" name="area_id" value={area.id} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Navn">
            <Input name="label" defaultValue={area.label} />
          </Field>
          <Field label="Tillaeg">
            <Input name="surcharge" type="number" min="0" step="1" defaultValue={area.surcharge} />
          </Field>
          <Field label="Postnumre / prefixes" className="sm:col-span-2">
            <Textarea
              name="postal_prefixes"
              defaultValue={area.postalPrefixes.join(", ")}
              className="min-h-24"
            />
          </Field>
          <Field label="By-noter">
            <Input name="city_hints" defaultValue={area.cityHints} />
          </Field>
          <Field label="Interne noter">
            <Input name="notes" defaultValue={area.notes} />
          </Field>
        </div>
        <label className="flex items-center gap-3 text-sm text-[var(--ink)]">
          <input
            type="checkbox"
            name="is_active"
            defaultChecked={area.isActive}
            className="h-4 w-4 rounded border-[#9cb0bd]"
          />
          Aktivt serviceomraade
        </label>
        <div className="flex flex-wrap gap-3">
          <Button type="submit" variant="secondary">
            Gem omraade
          </Button>
        </div>
      </form>
      <form action="/api/admin/settings" method="POST" className="mt-3">
        <input type="hidden" name="section" value="areas" />
        <input type="hidden" name="return_view" value="areas" />
        <input type="hidden" name="area_action" value="delete" />
        <input type="hidden" name="area_id" value={area.id} />
        <Button
          type="submit"
          variant="outline"
          className="border-red-200 text-red-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
        >
          Slet omraade
        </Button>
      </form>
    </article>
  );
}

function PaymentCard({ booking }: { booking: DashboardBooking }) {
  return (
    <article className="rounded-[1.5rem] border border-[#d9e7f0] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(8,27,21,0.05)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-semibold text-[var(--ink)]">
              {booking.customerName || booking.customerEmail}
            </h3>
            <PaymentPill status={booking.paymentStatus} />
            <InvoicePill status={booking.invoiceStatus} />
          </div>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {booking.appointmentLabel} | {booking.packageLabel} - {booking.category}
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">{formatPrice(booking.total)}</p>
        </div>
      </div>

      <form action={`/api/admin/bookings/${booking.id}`} method="POST" className="mt-5 grid gap-4 sm:grid-cols-2">
        <input type="hidden" name="action" value="financial" />
        <input type="hidden" name="return_view" value="payments" />
        <Field label="Betalingsstatus">
          <select name="payment_status" defaultValue={booking.paymentStatus} className={selectClassName}>
            {paymentStatuses.map((status) => (
              <option key={status} value={status}>
                {getPaymentStatusLabel(status)}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Betalingsmetode">
          <Input name="payment_method" defaultValue={booking.paymentMethod} />
        </Field>
        <Field label="Fakturastatus">
          <select name="invoice_status" defaultValue={booking.invoiceStatus} className={selectClassName}>
            {invoiceStatuses.map((status) => (
              <option key={status} value={status}>
                {getInvoiceStatusLabel(status)}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Fakturanummer">
          <Input name="invoice_number" defaultValue={booking.invoiceNumber} />
        </Field>
        <Field label="Admin-noter" className="sm:col-span-2">
          <Textarea name="admin_notes" defaultValue={booking.adminNotes} className="min-h-24" />
        </Field>
        <label className="flex items-center gap-3 text-sm text-[var(--ink)] sm:col-span-2">
          <input
            type="checkbox"
            name="invoice_requested"
            defaultChecked={booking.invoiceRequested}
            className="h-4 w-4 rounded border-[#9cb0bd]"
          />
          Faktura ønskes eller skal udsendes
        </label>
        <div className="sm:col-span-2">
          <Button type="submit">Gem betaling</Button>
        </div>
      </form>
    </article>
  );
}

function EmailLogCard({ email }: { email: BookingEmailLog }) {
  return (
    <article className="rounded-[1.5rem] border border-[#d9e7f0] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(8,27,21,0.05)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-lg font-semibold text-[var(--ink)]">{email.subject}</p>
            <span
              className={cn(
                "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                email.status === "sent"
                  ? "bg-[#ebf8f1] text-[#1f7a4b]"
                  : email.status === "failed"
                    ? "bg-[#fff0f0] text-[#c43d3d]"
                    : "bg-[#eef8ff] text-[#1f6aa4]"
              )}
            >
              {email.status}
            </span>
          </div>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {email.recipientRole} | {email.recipient}
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">{email.sentAt || email.createdAt}</p>
          {email.errorMessage ? (
            <p className="mt-2 text-sm text-red-600">{email.errorMessage}</p>
          ) : null}
        </div>
        {email.bookingId ? (
          <form action={`/api/admin/bookings/${email.bookingId}`} method="POST" className="flex gap-3">
            <input
              type="hidden"
              name="action"
              value={email.recipientRole === "admin" ? "resend_admin" : "resend_customer"}
            />
            <input type="hidden" name="return_view" value="emails" />
            <input type="hidden" name="admin_notes" value="" />
            <Button type="submit" variant="outline">
              Send igen
            </Button>
          </form>
        ) : null}
      </div>
    </article>
  );
}

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
}) {
  return (
    <article className="rounded-[1.6rem] border border-[#d9e7f0] bg-[linear-gradient(180deg,#ffffff,#f7fbff)] px-5 py-5 shadow-[0_16px_42px_rgba(7,38,63,0.07)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#5f7888]">{label}</p>
          <p className="mt-3 text-4xl font-semibold text-[#0c2132] break-words">{value}</p>
          <p className="mt-3 text-sm leading-6 text-[#5f7888]">{detail}</p>
        </div>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef7ff] text-[#2388d1] shadow-[inset_0_0_0_1px_rgba(35,136,209,0.08)]">
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </article>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#2388d1]">{eyebrow}</p>
      <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.45rem)] font-semibold text-[#0c2132]">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-7 text-[#5f7888]">{description}</p>
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
    <label className={cn("grid gap-2 text-sm text-[var(--ink)]", className)}>
      <span className="font-medium">{label}</span>
      {children}
    </label>
  );
}

function InfoPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-[1.5rem] border border-[#e1ebf2] bg-[linear-gradient(180deg,#fbfdff,#f6fbff)] px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2388d1]">{title}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#e4edf3] bg-white px-4 py-3 shadow-[0_8px_20px_rgba(7,38,63,0.04)]">
      <p className="text-xs uppercase tracking-[0.16em] text-[#8aa0ae]">{label}</p>
      <p className="mt-1 text-[#0c2132]">{value || "-"}</p>
    </div>
  );
}

function StatusPill({ status }: { status: BookingStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
        getStatusTone(status)
      )}
    >
      {getStatusLabel(status)}
    </span>
  );
}

function PaymentPill({ status }: { status: (typeof paymentStatuses)[number] }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
        getPaymentStatusTone(status)
      )}
    >
      {getPaymentStatusLabel(status)}
    </span>
  );
}

function InvoicePill({ status }: { status: (typeof invoiceStatuses)[number] }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
        getInvoiceStatusTone(status)
      )}
    >
      {getInvoiceStatusLabel(status)}
    </span>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-[#cfe0ea] bg-[rgba(255,255,255,0.72)] px-5 py-5 text-sm text-[#5f7888]">
      {text}
    </div>
  );
}

function getBookingActions(status: BookingStatus) {
  switch (status) {
    case "approved":
      return [
        { value: "complete", label: "Marker som afsluttet", variant: "success" as const },
        { value: "cancel", label: "Annuller", variant: "outline" as const },
      ];
    case "cancelled":
      return [{ value: "approve", label: "Godkend igen", variant: "secondary" as const }];
    case "completed":
      return [];
    default:
      return [
        { value: "approve", label: "Godkend", variant: "secondary" as const },
        { value: "cancel", label: "Annuller", variant: "outline" as const },
      ];
  }
}

function sortBookings(left: DashboardBooking, right: DashboardBooking) {
  return `${left.appointmentDate}T${left.appointmentTime}`.localeCompare(
    `${right.appointmentDate}T${right.appointmentTime}`
  );
}
