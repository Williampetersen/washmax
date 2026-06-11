import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  Calendar,
  CalendarPlus,
  CheckCircle2,
  Clock3,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  ReceiptText,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import LogoutButton from "./LogoutButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getPortalData, type DashboardBooking } from "@/lib/server/bookings";
import { listInvoicesForCustomer } from "@/lib/server/invoices";
import {
  formatPrice,
  formatShortPrice,
  getPaymentStatusLabel,
  getPaymentStatusTone,
  getStatusLabel,
} from "@/lib/shared/booking";
import { cn } from "@/lib/utils";
import {
  CUSTOMER_COOKIE_NAME,
  verifyCustomerSessionToken,
} from "@/lib/server/customer-session";

export const metadata: Metadata = {
  title: "Kundeportal",
  description: "Se dine CleanWash bookinger, kontaktoplysninger og kommende aftaler.",
};

export default async function CustomerPortalPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { token } = await params;
  const query = await searchParams;

  // ── Session guard ──────────────────────────────────────────────────────────
  const cookieStore = await cookies();
  const session = verifyCustomerSessionToken(cookieStore.get(CUSTOMER_COOKIE_NAME)?.value);
  if (!session) {
    redirect(`/kunde/verify?t=${token}`);
  }

  const portalData = token ? await getPortalData(token) : null;

  if (!portalData || session.email.toLowerCase() !== portalData.customer.email.toLowerCase()) {
    redirect(`/kunde/verify?t=${token}`);
  }
  // ──────────────────────────────────────────────────────────────────────────

  const saved = (Array.isArray(query.saved) ? query.saved[0] : query.saved) === "1";
  const bookingConfirmed =
    (Array.isArray(query.booking) ? query.booking[0] : query.booking) === "confirmed";
  const requestedTab = Array.isArray(query.tab) ? query.tab[0] : query.tab;
  const portalTab =
    requestedTab === "invoices" || requestedTab === "profile" ? requestedTab : "bookings";

  if (!portalData) {
    return (
      <main className="min-h-screen bg-[linear-gradient(135deg,#F7F8FC_0%,#F5F7FF_48%,#F1F3FA_100%)] px-4 py-10 sm:px-6">
        <section className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/55 bg-white/[0.65] p-8 text-center shadow-[0_8px_32px_rgba(0,167,184,0.08)] backdrop-blur-2xl">
          <h1 className="text-2xl font-bold text-[#111827]">Linket er udlobet eller ugyldigt</h1>
          <p className="mt-3 text-sm font-medium text-[#6B7280]">
            Brug det seneste link fra din bookingmail, eller opret en ny booking.
          </p>
          <Link
            href="/booking"
            className="mt-6 inline-flex h-10 items-center gap-2 rounded-2xl bg-[#00A7B8] px-5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(0,167,184,0.18)] transition hover:bg-[#008A99]"
          >
            <CalendarPlus className="h-4 w-4" />
            Gaa til booking
          </Link>
        </section>
      </main>
    );
  }

  const { customer, bookings, settings } = portalData;
  const invoices = await listInvoicesForCustomer(customer.id);
  const customerName =
    [customer.firstName, customer.lastName].filter(Boolean).join(" ") || customer.email;

  const activeBookings = bookings
    .filter((b) => b.status === "pending" || b.status === "approved")
    .sort(sortBookings);
  const completedBookings = bookings.filter((b) => b.status === "completed");
  const nextBooking = activeBookings[0];
  const totalValue = bookings
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => sum + b.total, 0);

  const sidebarTabs = [
    { id: "bookings", label: "Bookinger", icon: ReceiptText },
    { id: "invoices", label: "Fakturaer", icon: CreditCard },
    { id: "profile", label: "Profil", icon: UserRound },
  ] as const;

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#F7F8FC_0%,#F5F7FF_48%,#F1F3FA_100%)] px-3 pb-8 pt-3 font-sans text-[#111827] sm:px-5 sm:pb-10">
      <section className="mx-auto max-w-[1480px]">
        <div className="grid gap-4 xl:grid-cols-[16rem_minmax(0,1fr)]">

          {/* ── Sidebar ── */}
          <aside className="overflow-hidden rounded-3xl border border-white/55 bg-white/[0.65] text-[#111827] shadow-[0_8px_32px_rgba(0,167,184,0.08)] backdrop-blur-2xl xl:sticky xl:top-4 xl:self-start">

            {/* Brand + customer */}
            <div className="border-b border-white/55 px-4 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#00A7B8] text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(0,167,184,0.18)]">
                  CW
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#00A7B8]">
                    CleanWash
                  </p>
                  <p className="mt-0.5 truncate text-[13px] font-semibold text-[#111827]">
                    {customerName}
                  </p>
                  <p className="truncate text-[12px] font-medium text-[#6B7280]">
                    {customer.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Nav tabs */}
            <nav className="flex snap-x gap-2 overflow-x-auto px-3 py-3 xl:grid xl:grid-cols-1 xl:overflow-visible">
              {sidebarTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = portalTab === tab.id;
                return (
                  <a
                    key={tab.id}
                    href={`/kunde/${token}?tab=${tab.id}`}
                    className={cn(
                      "flex min-w-[8.75rem] snap-start items-center gap-2 rounded-2xl px-3 py-2.5 text-[13px] font-semibold transition duration-[250ms] xl:min-w-0",
                      isActive
                        ? "bg-[#00A7B8] text-white shadow-[0_8px_20px_rgba(0,167,184,0.18)]"
                        : "text-[#6B7280] hover:-translate-y-0.5 hover:bg-white/70 hover:text-[#111827]"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="truncate">{tab.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Stats */}
            <div className="border-t border-white/55 px-4 py-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#00A7B8]">
                  Oversigt
                </p>
                {activeBookings.length > 0 ? (
                  <span className="rounded-full border border-[#10B981]/20 bg-[#10B981]/10 px-2.5 py-1 text-[12px] font-semibold text-[#047857]">
                    Aktiv
                  </span>
                ) : null}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <SidebarStat label="Bookinger" value={bookings.length.toString()} />
                <SidebarStat label="Kommende" value={activeBookings.length.toString()} />
                <SidebarStat label="Samlet" value={formatShortPrice(totalValue)} />
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 border-t border-white/55 px-4 py-4">
              <Link
                href="/booking"
                className="flex items-center gap-2 rounded-2xl bg-[#00A7B8] px-3 py-2.5 text-[13px] font-semibold text-white shadow-[0_8px_20px_rgba(0,167,184,0.18)] transition hover:bg-[#008A99]"
              >
                <CalendarPlus className="h-5 w-5 shrink-0" />
                Ny booking
              </Link>
              <LogoutButton />
            </div>
          </aside>

          {/* ── Main content ── */}
          <div className="space-y-4">

            {/* Status banners */}
            {saved ? (
              <div className="rounded-2xl border border-[#cde6f6] bg-[#f6fbff] px-5 py-4 text-sm font-medium text-[#1a506d]">
                Dine kontaktoplysninger er gemt.
              </div>
            ) : null}
            {bookingConfirmed ? (
              <div className="rounded-2xl border border-[#cde6f6] bg-[#f6fbff] px-5 py-4 text-sm font-medium text-[#1a506d]">
                Din booking er bekræftet. Tjek din e-mail for bekræftelse og bookingdetaljer.
              </div>
            ) : null}

            {/* ── Bookings view ── */}
            {portalTab === "bookings" ? (
              <div className="space-y-4">
                <ViewHeader
                  icon={ReceiptText}
                  title="Bookinger"
                  description={`${bookings.length} bookinger i alt · ${activeBookings.length} kommende`}
                  action={
                    <a
                      href="/booking"
                      className="inline-flex h-9 items-center gap-2 rounded-xl bg-[#00A7B8] px-4 text-[12.5px] font-semibold text-white shadow-[0_4px_14px_rgba(0,167,184,0.28)] transition hover:bg-[#008A99]"
                    >
                      <CalendarPlus className="h-3.5 w-3.5" />
                      Ny booking
                    </a>
                  }
                />

                {/* Metric cards */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <MetricCard
                    label="Alle bookinger"
                    value={bookings.length.toString()}
                    detail={`${completedBookings.length} afsluttede`}
                    icon={ReceiptText}
                    tone="blue"
                  />
                  <MetricCard
                    label="Kommende"
                    value={activeBookings.length.toString()}
                    detail="Aktive aftaler"
                    icon={Calendar}
                    tone={activeBookings.length > 0 ? "green" : "violet"}
                  />
                  <MetricCard
                    label="Afsluttede"
                    value={completedBookings.length.toString()}
                    detail="Gennemført"
                    icon={CheckCircle2}
                    tone="violet"
                  />
                  <MetricCard
                    label="Samlet værdi"
                    value={formatShortPrice(totalValue)}
                    detail={formatPrice(totalValue)}
                    icon={CreditCard}
                    tone="orange"
                  />
                </div>

                {/* Next booking */}
                {nextBooking ? (
                  <NextBookingCard booking={nextBooking} />
                ) : (
                  <section className="overflow-hidden rounded-3xl border border-white/55 bg-white/[0.65] p-6 shadow-[0_8px_32px_rgba(0,167,184,0.08)] backdrop-blur-2xl">
                    <EmptyState text="Ingen kommende booking. Book en ny tid, når bilen trænger til en grundig rengøring." />
                  </section>
                )}

                {/* All bookings */}
                <section className="overflow-hidden rounded-3xl border border-white/55 bg-white/[0.65] shadow-[0_8px_32px_rgba(0,167,184,0.08)] backdrop-blur-2xl">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/55 px-5 py-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#00A7B8]">
                        Historik
                      </p>
                      <h2 className="mt-0.5 text-base font-bold text-[#111827]">Alle bookinger</h2>
                    </div>
                    <span className="text-[12px] font-medium text-[#6B7280]">
                      {bookings.length} i alt
                    </span>
                  </div>
                  <div className="divide-y divide-white/55">
                    {bookings.length > 0 ? (
                      bookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} />
                      ))
                    ) : (
                      <div className="p-4">
                        <EmptyState text="Ingen bookinger endnu." />
                      </div>
                    )}
                  </div>
                </section>
              </div>
            ) : null}

            {/* ── Invoices view ── */}
            {portalTab === "invoices" ? (
              <div className="space-y-4">
                <ViewHeader
                  icon={CreditCard}
                  title="Fakturaer"
                  description={`${invoices.length} faktura${invoices.length !== 1 ? "er" : ""} i alt`}
                />

                <section className="overflow-hidden rounded-3xl border border-white/55 bg-white/[0.65] shadow-[0_8px_32px_rgba(0,167,184,0.08)] backdrop-blur-2xl">
                  <div className="divide-y divide-white/55">
                    {invoices.length > 0 ? (
                      invoices.map((invoice) => (
                        <article
                          key={invoice.id}
                          className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div>
                            <p className="text-[13px] font-semibold text-[#111827]">
                              {invoice.invoiceNumber}
                            </p>
                            <p className="mt-1 text-[12px] font-medium text-[#6B7280]">
                              {formatPrice(invoice.totalInclMomsDkk)} · {invoice.status}
                              {invoice.sentAt ? ` · Sendt ${invoice.sentAt.slice(0, 10)}` : ""}
                            </p>
                          </div>
                          <a
                            href={invoice.publicUrl}
                            target="_blank"
                            className="inline-flex h-9 items-center gap-2 rounded-xl border border-[#DCEEF2] bg-[#EEFBFC] px-4 text-[12.5px] font-semibold text-[#00A7B8] transition hover:bg-[#dff7fa]"
                          >
                            Vis / print faktura
                          </a>
                        </article>
                      ))
                    ) : (
                      <div className="p-4">
                        <EmptyState text="Ingen fakturaer endnu. Når en faktura er oprettet, vises den her." />
                      </div>
                    )}
                  </div>
                </section>
              </div>
            ) : null}

            {/* ── Profile view ── */}
            {portalTab === "profile" ? (
              <div className="space-y-4">
                <ViewHeader
                  icon={UserRound}
                  title="Profil"
                  description="Opdater dine kontaktoplysninger"
                />

                <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_18rem]">
                  {/* Edit form */}
                  <section className="overflow-hidden rounded-3xl border border-white/55 bg-white/[0.65] shadow-[0_8px_32px_rgba(0,167,184,0.08)] backdrop-blur-2xl">
                    <div className="border-b border-white/55 px-5 py-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#00A7B8]">
                        Kontaktoplysninger
                      </p>
                      <h2 className="mt-0.5 text-base font-bold text-[#111827]">Rediger profil</h2>
                    </div>
                    <form action={`/api/customer/${token}`} method="POST" className="px-5 py-5">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Fornavn">
                          <Input
                            name="first_name"
                            defaultValue={customer.firstName}
                            autoComplete="given-name"
                          />
                        </Field>
                        <Field label="Efternavn">
                          <Input
                            name="last_name"
                            defaultValue={customer.lastName}
                            autoComplete="family-name"
                          />
                        </Field>
                        <Field label="E-mail">
                          <Input
                            value={customer.email}
                            disabled
                            aria-describedby="email-help"
                          />
                          <span id="email-help" className="text-[12px] text-[#6B7280]">
                            Kontakt os, hvis e-mailen skal ændres.
                          </span>
                        </Field>
                        <Field label="Telefon">
                          <Input
                            name="phone"
                            defaultValue={customer.phone}
                            autoComplete="tel"
                          />
                        </Field>
                        <Field label="Adresse" className="sm:col-span-2">
                          <Input
                            name="address"
                            defaultValue={customer.address}
                            autoComplete="street-address"
                          />
                        </Field>
                        <Field label="Postnr.">
                          <Input
                            name="postal_code"
                            defaultValue={customer.postalCode}
                            autoComplete="postal-code"
                          />
                        </Field>
                        <Field label="By">
                          <Input
                            name="city"
                            defaultValue={customer.city}
                            autoComplete="address-level2"
                          />
                        </Field>
                        <Field label="Noter" className="sm:col-span-2">
                          <Textarea name="notes" defaultValue={customer.notes} />
                        </Field>
                      </div>
                      <div className="mt-5">
                        <Button
                          type="submit"
                          className="h-10 rounded-2xl bg-[#00A7B8] px-6 font-semibold text-white hover:bg-[#008A99]"
                        >
                          Gem ændringer
                        </Button>
                      </div>
                    </form>
                  </section>

                  {/* Support */}
                  <section className="overflow-hidden rounded-3xl border border-white/55 bg-white/[0.65] shadow-[0_8px_32px_rgba(0,167,184,0.08)] backdrop-blur-2xl">
                    <div className="border-b border-white/55 px-5 py-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#00A7B8]">
                        Support
                      </p>
                      <h2 className="mt-0.5 text-base font-bold text-[#111827]">Brug for hjælp?</h2>
                    </div>
                    <div className="grid gap-3 px-5 py-4">
                      <SupportLink
                        icon={Mail}
                        href={`mailto:${settings.supportEmail}`}
                        text={settings.supportEmail}
                      />
                      <SupportLink icon={Phone} href="tel:+4542504551" text="42 50 45 51" />
                    </div>
                  </section>
                </div>
              </div>
            ) : null}

          </div>
        </div>
      </section>
    </main>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────

function ViewHeader({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/60 bg-white/80 px-5 py-4 shadow-[0_2px_12px_rgba(0,167,184,0.06)] backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEFBFC] text-[#00A7B8]">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-base font-bold text-[#111827] sm:text-lg">{title}</h1>
          {description ? (
            <p className="text-[12px] font-medium text-[#6B7280]">{description}</p>
          ) : null}
        </div>
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

function MetricCard({
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
  tone?: "violet" | "green" | "orange" | "blue";
}) {
  const iconStyle = {
    violet: "bg-[#EEFBFC] text-[#00A7B8]",
    green:  "bg-[#ECFDF5] text-[#059669]",
    orange: "bg-[#FFF7ED] text-[#D97706]",
    blue:   "bg-[#EFF6FF] text-[#2563EB]",
  }[tone];

  return (
    <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-[0_2px_12px_rgba(0,167,184,0.06)]">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[12px] font-medium text-[#6B7280]">{label}</p>
            <p className="mt-2 truncate text-[22px] font-bold leading-none text-[#111827]">{value}</p>
            <p className="mt-2 truncate text-[12px] font-medium text-[#6B7280]">{detail}</p>
          </div>
          <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl", iconStyle)}>
            <Icon className="h-5 w-5" />
          </span>
        </div>
      </div>
    </div>
  );
}

function NextBookingCard({ booking }: { booking: DashboardBooking }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-white/55 bg-white/[0.65] shadow-[0_8px_32px_rgba(0,167,184,0.08)] backdrop-blur-2xl">
      <div className="border-b border-white/55 bg-[#EEFBFC] px-5 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#00A7B8]">
              Næste aftale
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#111827] sm:text-3xl">
              {booking.appointmentLabel}
            </h2>
            <p className="mt-1 text-[12px] font-medium text-[#6B7280]">
              {booking.packageLabel} · {booking.category}
            </p>
          </div>
          <StatusBadge status={booking.status} />
        </div>
      </div>
      <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4">
        <FactCard
          icon={Clock3}
          label="Tid"
          value={`${booking.appointmentTime} - ${booking.appointmentEndTime}`}
        />
        <FactCard
          icon={MapPin}
          label="Adresse"
          value={`${booking.address}, ${booking.postalCode} ${booking.city}`}
        />
        <FactCard
          icon={ReceiptText}
          label="Bil"
          value={`${booking.vehicleName} (${booking.registrationNumber})`}
        />
        <FactCard icon={CreditCard} label="Pris" value={formatPrice(booking.total)} />
      </div>
    </section>
  );
}

function BookingCard({ booking }: { booking: DashboardBooking }) {
  return (
    <details className="group">
      <summary className="cursor-pointer list-none px-5 py-4 transition hover:bg-white/50">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-[13px] font-semibold text-[#111827]">
                {booking.packageLabel} · {booking.category}
              </h3>
              <StatusBadge status={booking.status} />
              <PaymentBadge status={booking.paymentStatus} />
            </div>
            <p className="mt-1.5 text-[12px] font-medium text-[#6B7280]">
              {booking.appointmentLabel} · {booking.vehicleName} · {booking.registrationNumber}
            </p>
            {booking.addons.length > 0 ? (
              <p className="mt-1 text-[12px] text-[#6B7280]">
                Tilvalg: {booking.addons.map((a) => a.label).join(", ")}
              </p>
            ) : null}
          </div>
          <div className="shrink-0 rounded-2xl bg-[#EEFBFC] px-4 py-2.5 lg:text-right">
            <p className="text-[11px] font-medium text-[#6B7280]">Total</p>
            <p className="text-[18px] font-bold text-[#111827]">{formatPrice(booking.total)}</p>
          </div>
        </div>
      </summary>
      <div className="grid gap-3 border-t border-white/55 bg-white/40 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <FactCard
          icon={Clock3}
          label="Tid"
          value={`${booking.appointmentTime} - ${booking.appointmentEndTime}`}
        />
        <FactCard
          icon={MapPin}
          label="Adresse"
          value={`${booking.address}, ${booking.postalCode} ${booking.city}`}
        />
        <FactCard
          icon={ReceiptText}
          label="Bil"
          value={`${booking.vehicleName} (${booking.registrationNumber})`}
        />
        <FactCard
          icon={CreditCard}
          label="Tilvalg"
          value={booking.addons.length > 0 ? booking.addons.map((a) => a.label).join(", ") : "Ingen"}
        />
      </div>
    </details>
  );
}

function FactCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/55 bg-white/60 px-3 py-3">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
        <Icon className="h-4 w-4 shrink-0 text-[#00A7B8]" />
        {label}
      </div>
      <p className="mt-2 break-words text-[13px] font-semibold text-[#111827]">{value}</p>
    </div>
  );
}

function SidebarStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/55 bg-white/55 px-2.5 py-2">
      <span className="block truncate text-[11px] font-medium text-[#6B7280]">{label}</span>
      <strong className="mt-1 block truncate text-[12px] text-[#111827]">{value}</strong>
    </div>
  );
}

function StatusBadge({ status }: { status: DashboardBooking["status"] }) {
  const styles: Record<string, string> = {
    pending:   "border-[#F59E0B]/20 bg-[#F59E0B]/10 text-[#92400E]",
    approved:  "border-[#10B981]/20 bg-[#10B981]/10 text-[#047857]",
    completed: "border-[#00A7B8]/20 bg-[#00A7B8]/10 text-[#008A99]",
    cancelled: "border-[#EF4444]/20 bg-[#EF4444]/10 text-[#B91C1C]",
  };
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-1 text-[12px] font-semibold",
        styles[status] ?? "border-[#DCEEF2] bg-[#EEFBFC] text-[#00A7B8]"
      )}
    >
      {getStatusLabel(status)}
    </span>
  );
}

function PaymentBadge({ status }: { status: DashboardBooking["paymentStatus"] }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-1 text-[12px] font-semibold",
        getPaymentStatusTone(status)
      )}
    >
      {getPaymentStatusLabel(status)}
    </span>
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
    <label className={cn("grid gap-1.5 text-[13px] font-medium text-[#111827]", className)}>
      <span className="font-medium">{label}</span>
      {children}
    </label>
  );
}

function SupportLink({
  icon: Icon,
  href,
  text,
}: {
  icon: LucideIcon;
  href: string;
  text: string;
}) {
  return (
    <a
      href={href}
      className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/55 bg-white/50 px-3 py-3 text-[13px] font-semibold text-[#111827] transition hover:border-[#00A7B8]/40 hover:bg-[#EEFBFC]"
    >
      <Icon className="h-4 w-4 shrink-0 text-[#00A7B8]" />
      <span className="truncate">{text}</span>
    </a>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-[#DCEEF2] bg-white/55 px-4 py-4 text-[13px] font-medium text-[#6B7280]">
      {text}
    </div>
  );
}

function sortBookings(left: DashboardBooking, right: DashboardBooking) {
  return `${left.appointmentDate}T${left.appointmentTime}`.localeCompare(
    `${right.appointmentDate}T${right.appointmentTime}`
  );
}
