import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import {
  Calendar,
  CalendarPlus,
  CheckCircle2,
  Clock3,
  CreditCard,
  Mail,
  MapPinned,
  Phone,
  Sparkles,
  UserRound,
} from "lucide-react";
import { DashboardLanguageSwitch } from "@/components/ui/dashboard-language-switch";
import { getCachedPortalData } from "@/lib/server/cache-tags";
import { getPortalData, type DashboardBooking } from "@/lib/server/bookings";
import { listInvoicesForCustomer } from "@/lib/server/invoices";
import {
  DASHBOARD_LOCALE_COOKIE_NAME,
  normalizeDashboardLocale,
} from "@/lib/shared/dashboard-locale";
import {
  formatPrice,
  formatShortPrice,
  getStatusLabel,
  getStatusTone,
} from "@/lib/shared/booking";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Kundeportal",
  description: "Se dine Clean Wash bookinger.",
};

export default async function CustomerPortalPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const cookieStore = await cookies();
  const locale = normalizeDashboardLocale(
    cookieStore.get(DASHBOARD_LOCALE_COOKIE_NAME)?.value
  );
  const copy =
    locale === "en"
      ? {
          invalidTitle: "This link is expired or invalid",
          invalidText:
            "Please use the latest link from your booking email or create a new booking.",
          goBooking: "Go to booking",
          history: "Booking history",
          profile: "Personal details",
          payments: "Payment methods",
          quickStats: "Quick stats",
          bookings: "Bookings",
          totalValue: "Total value",
          upcoming: "Upcoming",
          portal: "Customer portal",
          historyTitle: "Booking history",
          profileTitle: "Personal details",
          paymentsTitle: "Payment methods",
          heroText:
            "See your upcoming appointments, update contact details and keep track of your bookings.",
          newBooking: "New booking",
          saved: "Your details were saved.",
          completed: "Completed",
          invoices: "Invoices",
          invoicesText: "View, print or save your Clean Wash invoices as PDF.",
          noInvoices: "No invoices yet.",
          viewInvoice: "View invoice",
          downloadPdf: "Print / Save as PDF",
          addons: "Extras",
          saveChanges: "Save changes",
          noPaymentMethods: "No saved payment methods",
          paymentText:
            "The payment section is kept as a separate customer view and can be connected to Stripe or another payment gateway later.",
          safePayment: "100% secure payment",
          safeOne: "A PCI-DSS compatible integration can be added later",
          safeTwo: "No hidden fees in the customer portal",
          safeThree: "Ready for card payment or invoice flow",
          nextAppointment: "Next appointment",
          noUpcoming: "No upcoming booking",
          noUpcomingText:
            "Your portal is ready, and new bookings will appear here automatically when they are created.",
          bookTime: "Book time",
        }
      : {
          invalidTitle: "Linket er udloeber eller ugyldigt",
          invalidText:
            "Bed kunden bruge det seneste link fra bookingmailen eller oprette en ny booking.",
          goBooking: "Gaa til booking",
          history: "Booking historik",
          profile: "Personlige oplysninger",
          payments: "Betalingsmetoder",
          quickStats: "Hurtige stats",
          bookings: "Bookinger",
          totalValue: "Total vaerdi",
          upcoming: "Kommende",
          portal: "Kundeportal",
          historyTitle: "Booking historik",
          profileTitle: "Personlige oplysninger",
          paymentsTitle: "Betalingsmetoder",
          heroText:
            "Se dine kommende tider, opdater kontaktoplysninger og behold overblikket over dine bookinger.",
          newBooking: "Ny booking",
          saved: "Dine oplysninger er gemt.",
          completed: "Afsluttede",
          invoices: "Fakturaer",
          invoicesText: "Se, print eller gem dine Clean Wash fakturaer som PDF.",
          noInvoices: "Ingen fakturaer endnu.",
          viewInvoice: "Se faktura",
          downloadPdf: "Print / Gem som PDF",
          addons: "Tilvalg",
          saveChanges: "Gem aendringer",
          noPaymentMethods: "Ingen gemte betalingsmetoder",
          paymentText:
            "Betalingsdelen er bevaret som separat kundevisning og kan kobles til Stripe eller anden betalingsgateway senere.",
          safePayment: "100% sikker betaling",
          safeOne: "PCI-DSS kompatibel integration kan tilfoejes senere",
          safeTwo: "Ingen skjulte gebyrer i kundeportalen",
          safeThree: "Klar til kortbetaling eller faktura-flow",
          nextAppointment: "Naeste aftale",
          noUpcoming: "Ingen kommende booking",
          noUpcomingText:
            "Din portal er klar, og nye bookinger vises automatisk her, naar de er oprettet.",
          bookTime: "Book tid",
        };
  const { token } = await params;
  const query = await searchParams;
  const view = Array.isArray(query.view) ? query.view[0] : query.view || "history";
  const saved = (Array.isArray(query.saved) ? query.saved[0] : query.saved) === "1";
  const portalData = token ? await getCachedPortalData(token) : null;

  if (!portalData) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#10243b_0%,#3f5870_44%,#826f63_100%)] px-4 pb-12 pt-10 sm:px-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.04)_36%,rgba(24,184,143,0.18)_100%)]"
        />
        <section className="relative mx-auto max-w-3xl rounded-[2rem] border border-white/22 bg-white/16 p-8 text-center text-white shadow-[0_30px_90px_rgba(5,18,32,0.28)] backdrop-blur-2xl">
          <h1 className="font-display text-4xl font-semibold text-white">
            {copy.invalidTitle}
          </h1>
          <p className="mt-4 text-white/76">
            {copy.invalidText}
          </p>
          <Link
            href="/booking"
            className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#5ec1eb,#39aee0)] px-5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(43,147,220,0.24)] transition hover:brightness-105"
          >
            {copy.goBooking}
          </Link>
        </section>
      </main>
    );
  }

  const { customer, bookings } = portalData;
  const invoices = view === "history" ? await listInvoicesForCustomer(customer.id) : [];
  const initials =
    `${customer.firstName?.[0] || ""}${customer.lastName?.[0] || ""}`.toUpperCase() || "K";
  const completedBookings = bookings.filter((item) => item.status === "completed");
  const upcomingBookings = bookings.filter(
    (item) => item.status === "pending" || item.status === "approved"
  );
  const nextBooking = [...upcomingBookings].sort((left, right) =>
    `${left.appointmentDate}T${left.appointmentTime}`.localeCompare(
      `${right.appointmentDate}T${right.appointmentTime}`
    )
  )[0];
  const totalValue = bookings
    .filter((item) => item.status !== "cancelled")
    .reduce((sum, item) => sum + item.total, 0);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#10243b_0%,#3f5870_44%,#826f63_100%)] px-4 pb-12 pt-8 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.04)_36%,rgba(24,184,143,0.18)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:6rem_6rem]"
      />
      <section className="relative mx-auto max-w-7xl">
        <div className="grid gap-6 xl:grid-cols-[18rem_1fr]">
          <aside className="rounded-[2rem] border border-white/18 bg-white/12 p-5 text-white shadow-[0_28px_90px_rgba(5,18,32,0.28)] backdrop-blur-2xl">
            <div className="rounded-[1.5rem] border border-white/14 bg-white/10 p-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/24 bg-white/90 text-3xl font-semibold text-[#083047] shadow-[0_16px_40px_rgba(5,18,32,0.18)]">
                {initials}
              </div>
              <p className="mt-4 text-2xl font-semibold">
                {[customer.firstName, customer.lastName].filter(Boolean).join(" ")}
              </p>
              <p className="mt-1 text-sm text-white/72">{customer.email}</p>
            </div>

            <nav className="mt-5 grid gap-2 text-sm">
              {[
                { id: "history", label: copy.history, icon: Calendar },
                { id: "profile", label: copy.profile, icon: UserRound },
                { id: "payments", label: copy.payments, icon: CreditCard },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = view === item.id;
                return (
                  <Link
                    key={item.id}
                    href={`/kunde/${token}?view=${item.id}`}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl px-4 py-3 transition",
                      isActive
                        ? "bg-white text-[#0f3555] shadow-[0_16px_34px_rgba(255,255,255,0.16)]"
                        : "border border-white/8 bg-white/6 text-white/82 hover:bg-white/12"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-5 rounded-[1.5rem] border border-white/14 bg-white/10 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a7e7ff]">
                {copy.quickStats}
              </p>
              <div className="mt-4 grid gap-3 text-sm text-white/82">
                <div className="flex items-center justify-between">
                  <span>{copy.bookings}</span>
                  <strong>{bookings.length}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>{copy.totalValue}</span>
                  <strong>{formatPrice(totalValue)}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>{copy.upcoming}</span>
                  <strong>{upcomingBookings.length}</strong>
                </div>
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <section className="rounded-[2rem] border border-white/22 bg-white/16 p-6 text-white shadow-[0_24px_70px_rgba(5,18,32,0.22)] backdrop-blur-2xl">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a7f3d0]">
                    {copy.portal}
                  </p>
                  <h1 className="mt-3 font-display text-4xl font-semibold text-white">
                    {view === "profile"
                      ? copy.profileTitle
                      : view === "payments"
                        ? copy.paymentsTitle
                        : copy.historyTitle}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/76">
                    {copy.heroText}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <DashboardLanguageSwitch currentLocale={locale} />
                  <Link
                    href="/booking"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#5ec1eb,#39aee0)] px-5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(43,147,220,0.24)] transition hover:brightness-105"
                  >
                    <CalendarPlus className="h-5 w-5" />
                    {copy.newBooking}
                  </Link>
                </div>
              </div>
            </section>

            <CustomerNextBooking booking={nextBooking} customerEmail={customer.email} locale={locale} />

            {saved ? (
                <div className="rounded-[1.5rem] border border-[#cde6f6] bg-[#f6fbff] px-5 py-4 text-sm text-[#1a506d]">
                {copy.saved}
              </div>
            ) : null}

            {view === "history" ? (
              <>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {[
                    [copy.bookings, bookings.length],
                    [copy.upcoming, upcomingBookings.length],
                    [copy.completed, completedBookings.length],
                    [copy.totalValue, formatShortPrice(totalValue)],
                  ].map(([label, value]) => (
                    <Card key={label as string} className="!border-white/20 !bg-white/82 p-5 backdrop-blur-xl">
                      <p className="text-sm text-[var(--muted)]">{label}</p>
                      <p className="mt-3 text-4xl font-semibold text-[var(--ink)]">{value}</p>
                    </Card>
                  ))}
                </div>

                <Card className="!border-white/20 !bg-white/82 p-6 backdrop-blur-xl">
                  <div className="mb-6 rounded-[1.5rem] border border-white/60 bg-white/70 p-5 shadow-[0_14px_34px_rgba(5,18,32,0.07)]">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-[var(--ink)]">{copy.invoices}</h3>
                        <p className="mt-1 text-sm text-[var(--muted)]">
                          {copy.invoicesText}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 grid gap-3">
                      {invoices.length > 0 ? (
                        invoices.map((invoice) => (
                          <div
                            key={invoice.id}
                            className="flex flex-col gap-3 rounded-[1.2rem] border border-white/60 bg-white/80 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                          >
                            <div>
                              <p className="text-sm font-semibold text-[var(--ink)]">
                                {invoice.invoiceNumber}
                              </p>
                              <p className="mt-1 text-sm text-[var(--muted)]">
                                {formatPrice(invoice.totalInclMomsDkk)} | {invoice.status}
                              </p>
                              <p className="mt-1 text-xs text-[var(--muted)]">
                                Booking: {invoice.appointmentDate.slice(0, 10) || invoice.bookingId}
                                {invoice.sentAt
                                  ? ` | Sent: ${invoice.sentAt.slice(0, 10)}`
                                  : ""}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <a
                                href={invoice.publicUrl || invoice.pdfUrl}
                                target="_blank"
                                className="inline-flex h-10 items-center justify-center rounded-xl border border-[#d9e7f0] bg-white px-4 text-sm font-semibold text-[var(--ink)]"
                              >
                                {copy.viewInvoice}
                              </a>
                              <a
                                href={invoice.publicUrl || invoice.pdfUrl}
                                target="_blank"
                                className="inline-flex h-10 items-center justify-center rounded-xl border border-[#d9e7f0] bg-white px-4 text-sm font-semibold text-[var(--ink)]"
                              >
                                {copy.downloadPdf}
                              </a>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-[var(--muted)]">{copy.noInvoices}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {bookings.map((booking) => (
                      <article key={booking.id} className="rounded-[1.5rem] border border-white/60 bg-white/70 p-5 shadow-[0_14px_34px_rgba(5,18,32,0.07)]">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="text-2xl font-semibold text-[var(--ink)]">
                                {booking.packageLabel} - {booking.category}
                              </h3>
                              <span
                                className={cn(
                                  "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                                  getStatusTone(booking.status)
                                )}
                              >
                                {getStatusLabel(booking.status)}
                              </span>
                            </div>
                            <p className="mt-2 text-sm text-[var(--muted)]">
                              {booking.vehicleName} | {booking.registrationNumber}
                            </p>
                            <div className="mt-4 grid gap-2 text-sm text-[var(--ink)] sm:grid-cols-2">
                              <p>{booking.appointmentLabel}</p>
                              <p>{formatPrice(booking.total)}</p>
                            </div>
                            {booking.addons.length > 0 ? (
                              <p className="mt-3 text-sm text-[var(--muted)]">
                                {copy.addons}: {booking.addons.map((item) => item.label).join(", ")}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </Card>
              </>
            ) : null}

            {view === "profile" ? (
              <Card className="!border-white/20 !bg-white/86 p-6 backdrop-blur-xl">
                <form action={`/api/customer/${token}`} method="POST" className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Fornavn">
                      <Input name="first_name" defaultValue={customer.firstName} />
                    </Field>
                    <Field label="Efternavn">
                      <Input name="last_name" defaultValue={customer.lastName} />
                    </Field>
                    <Field label="Email" className="md:col-span-2">
                      <Input value={customer.email} disabled />
                    </Field>
                    <Field label="Telefon">
                      <Input name="phone" defaultValue={customer.phone} />
                    </Field>
                    <Field label="Adresse" className="md:col-span-2">
                      <Input name="address" defaultValue={customer.address} />
                    </Field>
                    <Field label="Postnr.">
                      <Input name="postal_code" defaultValue={customer.postalCode} />
                    </Field>
                    <Field label="By">
                      <Input name="city" defaultValue={customer.city} />
                    </Field>
                    <Field label="Noter" className="md:col-span-2">
                      <Textarea name="notes" defaultValue={customer.notes} />
                    </Field>
                  </div>
                  <Button type="submit">{copy.saveChanges}</Button>
                </form>
              </Card>
            ) : null}

            {view === "payments" ? (
              <div className="space-y-6">
                <Card className="!border-white/20 !bg-white/86 p-10 text-center backdrop-blur-xl">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#eef8ff] text-[#2388d1]">
                    <CreditCard className="h-10 w-10" />
                  </div>
                  <h2 className="mt-5 font-display text-3xl font-semibold text-[var(--ink)]">
                    {copy.noPaymentMethods}
                  </h2>
                  <p className="mt-3 text-[var(--muted)]">
                    {copy.paymentText}
                  </p>
                </Card>

                <Card className="!border-white/20 !bg-white/82 p-6 backdrop-blur-xl">
                  <h3 className="text-2xl font-semibold text-[var(--ink)]">
                    {copy.safePayment}
                  </h3>
                  <ul className="mt-4 grid gap-2 text-sm text-[var(--muted)]">
                    <li>{copy.safeOne}</li>
                    <li>{copy.safeTwo}</li>
                    <li>{copy.safeThree}</li>
                  </ul>
                </Card>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}

function CustomerNextBooking({
  booking,
  customerEmail,
  locale,
}: {
  booking?: DashboardBooking;
  customerEmail: string;
  locale: "da" | "en";
}) {
  const copy =
    locale === "en"
      ? {
          nextAppointment: "Next appointment",
          noUpcoming: "No upcoming booking",
          noUpcomingText:
            "Your portal is ready, and new bookings will appear here automatically when they are created.",
          bookTime: "Book time",
        }
      : {
          nextAppointment: "Naeste aftale",
          noUpcoming: "Ingen kommende booking",
          noUpcomingText:
            "Din portal er klar, og nye bookinger vises automatisk her, naar de er oprettet.",
          bookTime: "Book tid",
        };

  if (!booking) {
    return (
      <section className="rounded-[2rem] border border-white/18 bg-white/12 p-6 text-white shadow-[0_24px_70px_rgba(5,18,32,0.18)] backdrop-blur-2xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a7f3d0]">
              {copy.nextAppointment}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold">{copy.noUpcoming}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/72">
              {copy.noUpcomingText}
            </p>
          </div>
          <Link
            href="/booking"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-semibold text-[#10243b] shadow-[0_18px_42px_rgba(5,18,32,0.18)] transition hover:brightness-105"
          >
            <CalendarPlus className="h-5 w-5" />
            {copy.bookTime}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="grid gap-4 rounded-[2rem] border border-white/18 bg-white/12 p-5 text-white shadow-[0_24px_70px_rgba(5,18,32,0.18)] backdrop-blur-2xl lg:grid-cols-[1.05fr_0.95fr]">
      <div className="rounded-[1.5rem] border border-white/14 bg-white/10 p-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#10243b]">
            <Calendar className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a7f3d0]">
              {copy.nextAppointment}
            </p>
            <h2 className="mt-1 font-display text-3xl font-semibold">
              {booking.appointmentLabel}
            </h2>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <CustomerFact icon={Sparkles} label="Service" value={`${booking.packageLabel} - ${booking.category}`} />
          <CustomerFact icon={Clock3} label="Tid" value={`${booking.appointmentTime} - ${booking.appointmentEndTime}`} />
          <CustomerFact icon={MapPinned} label="Adresse" value={`${booking.address}, ${booking.postalCode} ${booking.city}`} />
          <CustomerFact icon={CheckCircle2} label="Status" value={getStatusLabel(booking.status)} />
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-white/14 bg-white/82 p-5 text-[#10243b]">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0c7a61]">
          Kontakt og betaling
        </p>
        <div className="mt-4 grid gap-3 text-sm">
          <CustomerFactDark icon={Mail} label="E-mail" value={customerEmail} />
          <CustomerFactDark icon={Phone} label="Telefon" value={booking.customerPhone || "Ikke angivet"} />
          <CustomerFactDark icon={CreditCard} label="Pris" value={formatPrice(booking.total)} />
        </div>
      </div>
    </section>
  );
}

function CustomerFact({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/12 bg-white/10 px-4 py-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/58">
        <Icon className="h-4 w-4 shrink-0" />
        {label}
      </div>
      <p className="mt-2 truncate text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function CustomerFactDark({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-[#d9e7f0] bg-white/74 px-4 py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e9fbf5] text-[#0c7a61]">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-[#617382]">{label}</p>
        <p className="truncate text-sm font-semibold text-[#10243b]">{value}</p>
      </div>
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
  children: React.ReactNode;
}) {
  return (
    <label className={cn("grid gap-2 text-sm text-[var(--ink)]", className)}>
      <span className="font-medium">{label}</span>
      {children}
    </label>
  );
}
