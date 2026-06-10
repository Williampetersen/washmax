import type { Metadata } from "next";
import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getPortalData, type DashboardBooking } from "@/lib/server/bookings";
import { listInvoicesForCustomer } from "@/lib/server/invoices";
import {
  formatPrice,
  getPaymentStatusLabel,
  getPaymentStatusTone,
  getStatusLabel,
  getStatusTone,
} from "@/lib/shared/booking";
import { cn } from "@/lib/utils";

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
  const saved = (Array.isArray(query.saved) ? query.saved[0] : query.saved) === "1";
  const bookingConfirmed =
    (Array.isArray(query.booking) ? query.booking[0] : query.booking) === "confirmed";
  const requestedTab = Array.isArray(query.tab) ? query.tab[0] : query.tab;
  const portalTab =
    requestedTab === "invoices" || requestedTab === "profile"
      ? requestedTab
      : "bookings";
  const portalData = token ? await getPortalData(token) : null;

  if (!portalData) {
    return (
      <main className="min-h-screen bg-[#f5f8fb] px-4 py-10 sm:px-6">
        <section className="mx-auto max-w-2xl rounded-lg border border-[#dbe6ee] bg-white p-6 text-center shadow-[0_16px_42px_rgba(8,27,21,0.08)] sm:p-8">
          <h1 className="font-display text-3xl font-semibold text-[var(--ink)]">
            Linket er udlobet eller ugyldigt
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            Brug det seneste link fra din bookingmail, eller opret en ny booking.
          </p>
          <Link
            href="/booking"
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#12b886] px-5 text-sm font-semibold text-white transition hover:bg-[#0ca678]"
          >
            <CalendarPlus className="h-5 w-5" />
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
    .filter((booking) => booking.status === "pending" || booking.status === "approved")
    .sort(sortBookings);
  const completedBookings = bookings.filter((booking) => booking.status === "completed");
  const nextBooking = activeBookings[0];
  const totalValue = bookings
    .filter((booking) => booking.status !== "cancelled")
    .reduce((sum, booking) => sum + booking.total, 0);

  return (
    <main className="min-h-screen bg-[#f5f8fb] px-4 pb-12 pt-6 sm:px-6">
      <section className="mx-auto grid max-w-7xl gap-6">
        <nav className="flex flex-wrap items-center gap-2 rounded-lg border border-[#dbe6ee] bg-white p-2 shadow-[0_10px_30px_rgba(8,27,21,0.05)]">
          <PortalTabLink href={`/kunde/${token}?tab=bookings`} active={portalTab === "bookings"}>
            Bookinger
          </PortalTabLink>
          <PortalTabLink href={`/kunde/${token}?tab=invoices`} active={portalTab === "invoices"}>
            Fakturaer
          </PortalTabLink>
          <PortalTabLink href={`/kunde/${token}?tab=profile`} active={portalTab === "profile"}>
            Profil
          </PortalTabLink>
          <Link
            href="/booking"
            className="ml-auto inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#12b886] px-4 text-sm font-semibold text-white transition hover:bg-[#0ca678]"
          >
            <CalendarPlus className="h-4 w-4" />
            Ny booking
          </Link>
        </nav>

        {saved ? (
          <Alert tone="success">Dine kontaktoplysninger er gemt.</Alert>
        ) : null}
        {bookingConfirmed ? (
          <Alert tone="success">
            Din booking er bekræftet. Tjek din e-mail for bekræftelse og bookingdetaljer.
          </Alert>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="space-y-6">
            {portalTab === "bookings" ? (
              <>
                <NextBookingCard booking={nextBooking} />
                <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <SummaryCard label="Bookinger" value={bookings.length.toString()} icon={ReceiptText} />
                  <SummaryCard label="Kommende" value={activeBookings.length.toString()} icon={Calendar} />
                  <SummaryCard label="Afsluttede" value={completedBookings.length.toString()} icon={CheckCircle2} />
                  <SummaryCard label="Samlet værdi" value={formatPrice(totalValue)} icon={CreditCard} />
                </section>
              </>
            ) : null}

            {portalTab === "invoices" ? (
              <Card className="rounded-lg p-5 sm:p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0c7a61]">
                    Fakturaer
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-[var(--ink)]">
                    Se og print dine fakturaer
                  </h2>
                </div>
                <p className="text-sm text-[var(--muted)]">{invoices.length} i alt</p>
              </div>
              <div className="mt-5 grid gap-3">
                {invoices.length > 0 ? (
                  invoices.map((invoice) => (
                    <article
                      key={invoice.id}
                      className="flex flex-col gap-3 rounded-lg border border-[#dbe6ee] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-semibold text-[var(--ink)]">
                          {invoice.invoiceNumber}
                        </p>
                        <p className="mt-1 text-sm text-[var(--muted)]">
                          {formatPrice(invoice.totalInclMomsDkk)} · {invoice.status}
                          {invoice.sentAt
                            ? ` · Sendt ${invoice.sentAt.slice(0, 10)}`
                            : ""}
                        </p>
                      </div>
                      <a
                        href={invoice.publicUrl}
                        target="_blank"
                        className="inline-flex h-10 items-center justify-center rounded-md border border-[#b7e6cb] bg-[#effaf4] px-4 text-sm font-semibold text-[#08745a] transition hover:bg-[#e2f7eb]"
                      >
                        Vis / print faktura
                      </a>
                    </article>
                  ))
                ) : (
                  <EmptyState
                    title="Ingen fakturaer endnu"
                    text="Når en faktura er oprettet, vises den her."
                  />
                )}
              </div>
              </Card>
            ) : null}

            {portalTab === "bookings" ? (
              <Card className="rounded-lg p-5 sm:p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0c7a61]">
                    Bookinghistorik
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-[var(--ink)]">
                    Alle bookinger
                  </h2>
                </div>
                <p className="text-sm text-[var(--muted)]">{bookings.length} i alt</p>
              </div>

              <div className="mt-5 overflow-hidden rounded-lg border border-[#dbe6ee]">
                {bookings.length > 0 ? (
                  <div className="divide-y divide-[#dbe6ee]">
                    {bookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)}
                  </div>
                ) : (
                  <EmptyState
                    title="Ingen bookinger endnu"
                    text="Når du opretter en booking, vises den her med status, tid og pris."
                  />
                )}
              </div>
              </Card>
            ) : null}
          </div>

          <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
            <ContactCard
              customerName={customerName}
              email={customer.email}
              phone={customer.phone}
              address={[customer.address, [customer.postalCode, customer.city].filter(Boolean).join(" ")]
                .filter(Boolean)
                .join(", ")}
            />

            {portalTab === "profile" ? (
              <Card className="rounded-lg p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0c7a61]">
                Opdater profil
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-[var(--ink)]">
                Kontaktoplysninger
              </h2>
              <form action={`/api/customer/${token}`} method="POST" className="mt-5 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                  <Field label="Fornavn">
                    <Input name="first_name" defaultValue={customer.firstName} autoComplete="given-name" />
                  </Field>
                  <Field label="Efternavn">
                    <Input name="last_name" defaultValue={customer.lastName} autoComplete="family-name" />
                  </Field>
                  <Field label="E-mail">
                    <Input value={customer.email} disabled aria-describedby="email-help" />
                    <span id="email-help" className="text-xs text-[var(--muted)]">
                      Kontakt os, hvis e-mailen skal ændres.
                    </span>
                  </Field>
                  <Field label="Telefon">
                    <Input name="phone" defaultValue={customer.phone} autoComplete="tel" />
                  </Field>
                  <Field label="Adresse">
                    <Input name="address" defaultValue={customer.address} autoComplete="street-address" />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Postnr.">
                      <Input name="postal_code" defaultValue={customer.postalCode} autoComplete="postal-code" />
                    </Field>
                    <Field label="By">
                      <Input name="city" defaultValue={customer.city} autoComplete="address-level2" />
                    </Field>
                  </div>
                  <Field label="Noter">
                    <Textarea name="notes" defaultValue={customer.notes} />
                  </Field>
                </div>
                <Button type="submit" className="w-full">Gem ændringer</Button>
              </form>
              </Card>
            ) : null}

            <Card className="rounded-lg p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0c7a61]">
                Support
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-[var(--ink)]">
                Brug for hjælp?
              </h2>
              <div className="mt-4 grid gap-3 text-sm">
                <SupportLink icon={Mail} href={`mailto:${settings.supportEmail}`} text={settings.supportEmail} />
                <SupportLink icon={Phone} href="tel:+4542504551" text="42 50 45 51" />
              </div>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  );
}

function NextBookingCard({ booking }: { booking?: DashboardBooking }) {
  if (!booking) {
    return (
      <Card className="rounded-lg p-6">
        <EmptyState
          title="Ingen kommende booking"
          text="Du har ingen aktiv aftale lige nu. Book en ny tid, når bilen trænger til en grundig rengøring."
          actionHref="/booking"
          actionLabel="Book ny tid"
        />
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden rounded-lg">
      <div className="border-b border-[#dbe6ee] bg-[#eef8ff] px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0c7a61]">
              Næste aftale
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-[var(--ink)]">
              {booking.appointmentLabel}
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {booking.packageLabel} - {booking.category}
            </p>
          </div>
          <StatusBadge status={booking.status} />
        </div>
      </div>
      <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <Fact icon={Clock3} label="Tid" value={`${booking.appointmentTime} - ${booking.appointmentEndTime}`} />
        <Fact icon={MapPin} label="Adresse" value={`${booking.address}, ${booking.postalCode} ${booking.city}`} />
        <Fact icon={ReceiptText} label="Bil" value={`${booking.vehicleName} (${booking.registrationNumber})`} />
        <Fact icon={CreditCard} label="Pris" value={formatPrice(booking.total)} />
      </div>
    </Card>
  );
}

function BookingCard({ booking }: { booking: DashboardBooking }) {
  return (
    <details className="group bg-white">
      <summary className="cursor-pointer list-none px-4 py-4 transition hover:bg-[#f8fbfd]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-[var(--ink)]">
              {booking.packageLabel} - {booking.category}
            </h3>
            <StatusBadge status={booking.status} />
            <PaymentBadge status={booking.paymentStatus} />
          </div>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {booking.appointmentLabel} · {booking.vehicleName} · {booking.registrationNumber}
          </p>
          {booking.addons.length > 0 ? (
            <p className="mt-2 text-sm text-[var(--muted)]">
              Tilvalg: {booking.addons.map((addon) => addon.label).join(", ")}
            </p>
          ) : null}
        </div>
        <div className="shrink-0 rounded-md bg-[#f4f8f7] px-4 py-3 lg:text-right">
          <p className="text-xs text-[var(--muted)]">Total</p>
          <p className="text-xl font-semibold text-[var(--ink)]">{formatPrice(booking.total)}</p>
        </div>
        </div>
      </summary>
      <div className="grid gap-3 border-t border-[#dbe6ee] bg-[#f8fbfd] p-4 sm:grid-cols-2 lg:grid-cols-4">
        <Fact icon={Clock3} label="Tid" value={`${booking.appointmentTime} - ${booking.appointmentEndTime}`} />
        <Fact icon={MapPin} label="Adresse" value={`${booking.address}, ${booking.postalCode} ${booking.city}`} />
        <Fact icon={ReceiptText} label="Bil" value={`${booking.vehicleName} (${booking.registrationNumber})`} />
        <Fact
          icon={CreditCard}
          label="Tilvalg"
          value={booking.addons.length > 0 ? booking.addons.map((addon) => addon.label).join(", ") : "Ingen"}
        />
      </div>
    </details>
  );
}

function PortalTabLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-semibold transition",
        active
          ? "bg-[#102d38] text-white"
          : "text-[#536873] hover:bg-[#f1f6f7] hover:text-[#102d38]"
      )}
    >
      {children}
    </a>
  );
}

function ContactCard({
  customerName,
  email,
  phone,
  address,
}: {
  customerName: string;
  email: string;
  phone: string;
  address: string;
}) {
  return (
    <Card className="rounded-lg p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-md bg-[#e9fbf5] text-[#08745a]">
          <UserRound className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0c7a61]">
            Kunde
          </p>
          <h2 className="truncate text-xl font-semibold text-[var(--ink)]">{customerName}</h2>
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        <Fact icon={Mail} label="E-mail" value={email} />
        <Fact icon={Phone} label="Telefon" value={phone || "Ikke angivet"} />
        <Fact icon={MapPin} label="Adresse" value={address || "Ikke angivet"} />
      </div>
    </Card>
  );
}

function SummaryCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="rounded-lg p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-[var(--muted)]">{label}</p>
          <p className="mt-2 truncate text-2xl font-semibold text-[var(--ink)]">{value}</p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#e9fbf5] text-[#08745a]">
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </Card>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-md border border-[#dbe6ee] bg-white px-3 py-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
        <Icon className="h-4 w-4 shrink-0 text-[#0c7a61]" />
        {label}
      </div>
      <p className="mt-2 break-words text-sm font-semibold text-[var(--ink)]">{value}</p>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm text-[var(--ink)]">
      <span className="font-medium">{label}</span>
      {children}
    </label>
  );
}

function Alert({ children, tone }: { children: ReactNode; tone: "success" | "error" }) {
  return (
    <div
      className={cn(
        "rounded-lg border px-4 py-3 text-sm",
        tone === "success"
          ? "border-[#b7e6cb] bg-[#effaf4] text-[#16643f]"
          : "border-red-200 bg-red-50 text-red-700"
      )}
    >
      {children}
    </div>
  );
}

function EmptyState({
  title,
  text,
  actionHref,
  actionLabel,
}: {
  title: string;
  text: string;
  actionHref?: "/booking";
  actionLabel?: string;
}) {
  return (
    <div className="rounded-lg border border-dashed border-[#c8d7e0] bg-[#f8fbfd] px-5 py-6 text-center">
      <p className="font-semibold text-[var(--ink)]">{title}</p>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">{text}</p>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="mt-4 inline-flex h-10 items-center justify-center rounded-md bg-[#12b886] px-4 text-sm font-semibold text-white transition hover:bg-[#0ca678]"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}

function SupportLink({
  icon: Icon,
  href,
  text,
}: {
  icon: ComponentType<{ className?: string }>;
  href: string;
  text: string;
}) {
  return (
    <a
      href={href}
      className="flex min-w-0 items-center gap-3 rounded-md border border-[#dbe6ee] bg-[#f8fbfd] px-3 py-3 font-semibold text-[var(--ink)] transition hover:border-[#12b886]"
    >
      <Icon className="h-4 w-4 shrink-0 text-[#0c7a61]" />
      <span className="truncate">{text}</span>
    </a>
  );
}

function StatusBadge({ status }: { status: DashboardBooking["status"] }) {
  return (
    <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", getStatusTone(status))}>
      {getStatusLabel(status)}
    </span>
  );
}

function PaymentBadge({ status }: { status: DashboardBooking["paymentStatus"] }) {
  return (
    <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", getPaymentStatusTone(status))}>
      {getPaymentStatusLabel(status)}
    </span>
  );
}

function sortBookings(left: DashboardBooking, right: DashboardBooking) {
  return `${left.appointmentDate}T${left.appointmentTime}`.localeCompare(
    `${right.appointmentDate}T${right.appointmentTime}`
  );
}
