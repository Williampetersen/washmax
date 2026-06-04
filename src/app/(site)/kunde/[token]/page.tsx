import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, Calendar, CalendarPlus, UserRound } from "lucide-react";
import { getPortalData } from "@/lib/server/bookings";
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
  description: "Se dine WashMax bookinger.",
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
  const view = Array.isArray(query.view) ? query.view[0] : query.view || "history";
  const saved = (Array.isArray(query.saved) ? query.saved[0] : query.saved) === "1";
  const portalData = token ? await getPortalData(token) : null;

  if (!portalData) {
    return (
      <main className="px-4 pb-12 pt-10 sm:px-6">
        <section className="mx-auto max-w-3xl rounded-[2rem] border border-[var(--line)] bg-white p-8 text-center shadow-[0_24px_70px_rgba(8,27,21,0.1)]">
          <h1 className="font-display text-4xl font-semibold text-[var(--ink)]">
            Linket er udloeber eller ugyldigt
          </h1>
          <p className="mt-4 text-[var(--muted)]">
            Bed kunden bruge det seneste link fra bookingmailen eller oprette en ny
            booking.
          </p>
          <Link
            href="/booking"
            className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#5ec1eb,#39aee0)] px-5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(43,147,220,0.24)] transition hover:brightness-105"
          >
            Gaa til booking
          </Link>
        </section>
      </main>
    );
  }

  const { customer, bookings } = portalData;
  const initials =
    `${customer.firstName?.[0] || ""}${customer.lastName?.[0] || ""}`.toUpperCase() || "K";
  const completedBookings = bookings.filter((item) => item.status === "completed");
  const upcomingBookings = bookings.filter(
    (item) => item.status === "pending" || item.status === "approved"
  );
  const totalValue = bookings
    .filter((item) => item.status !== "cancelled")
    .reduce((sum, item) => sum + item.total, 0);

  return (
    <main className="px-4 pb-12 pt-8 sm:px-6">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-6 xl:grid-cols-[18rem_1fr]">
          <aside className="rounded-[2rem] bg-[linear-gradient(180deg,#0e3557,#14486b)] p-5 text-white shadow-[0_28px_80px_rgba(8,27,21,0.2)]">
            <div className="rounded-[1.5rem] border border-white/12 bg-white/8 p-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#6ec7eb] text-3xl font-semibold text-[#083047]">
                {initials}
              </div>
              <p className="mt-4 text-2xl font-semibold">
                {[customer.firstName, customer.lastName].filter(Boolean).join(" ")}
              </p>
              <p className="mt-1 text-sm text-white/72">{customer.email}</p>
            </div>

            <nav className="mt-5 grid gap-2 text-sm">
              {[
                { id: "history", label: "Booking historik", icon: Calendar },
                { id: "profile", label: "Personlige oplysninger", icon: UserRound },
                { id: "payments", label: "Betalingsmetoder", icon: CreditCard },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = view === item.id;
                return (
                  <Link
                    key={item.id}
                    href={`/kunde/${token}?view=${item.id}`}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl px-4 py-3 transition",
                      isActive ? "bg-white text-[#0f3555]" : "text-white/82 hover:bg-white/8"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-5 rounded-[1.5rem] border border-white/12 bg-white/8 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a7e7ff]">
                Hurtige stats
              </p>
              <div className="mt-4 grid gap-3 text-sm text-white/82">
                <div className="flex items-center justify-between">
                  <span>Bookinger</span>
                  <strong>{bookings.length}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total vaerdi</span>
                  <strong>{formatPrice(totalValue)}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Kommende</span>
                  <strong>{upcomingBookings.length}</strong>
                </div>
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2388d1]">
                    Kundeportal
                  </p>
                  <h1 className="mt-3 font-display text-4xl font-semibold text-[var(--ink)]">
                    {view === "profile"
                      ? "Personlige oplysninger"
                      : view === "payments"
                        ? "Betalingsmetoder"
                        : "Booking historik"}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                    Se dine kommende tider, opdater kontaktoplysninger og behold
                    overblikket over dine bookinger.
                  </p>
                </div>
                <Link
                  href="/booking"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#5ec1eb,#39aee0)] px-5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(43,147,220,0.24)] transition hover:brightness-105"
                >
                  <CalendarPlus className="h-5 w-5" />
                  Ny booking
                </Link>
              </div>
            </Card>

            {saved ? (
              <div className="rounded-[1.5rem] border border-[#cde6f6] bg-[#f6fbff] px-5 py-4 text-sm text-[#1a506d]">
                Dine oplysninger er gemt.
              </div>
            ) : null}

            {view === "history" ? (
              <>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {[
                    ["Bookinger", bookings.length],
                    ["Kommende", upcomingBookings.length],
                    ["Afsluttede", completedBookings.length],
                    ["Total vaerdi", formatShortPrice(totalValue)],
                  ].map(([label, value]) => (
                    <Card key={label as string} className="p-5">
                      <p className="text-sm text-[var(--muted)]">{label}</p>
                      <p className="mt-3 text-4xl font-semibold text-[var(--ink)]">{value}</p>
                    </Card>
                  ))}
                </div>

                <Card className="p-6">
                  <div className="grid gap-4">
                    {bookings.map((booking) => (
                      <article key={booking.id} className="rounded-[1.5rem] border border-[var(--line)] p-5">
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
                                Tilvalg: {booking.addons.map((item) => item.label).join(", ")}
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
              <Card className="p-6">
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
                  <Button type="submit">Gem aendringer</Button>
                </form>
              </Card>
            ) : null}

            {view === "payments" ? (
              <div className="space-y-6">
                <Card className="p-10 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#eef8ff] text-[#2388d1]">
                    <CreditCard className="h-10 w-10" />
                  </div>
                  <h2 className="mt-5 font-display text-3xl font-semibold text-[var(--ink)]">
                    Ingen gemte betalingsmetoder
                  </h2>
                  <p className="mt-3 text-[var(--muted)]">
                    Betalingsdelen er bevaret som separat kundevisning og kan kobles til
                    Stripe eller anden betalingsgateway senere.
                  </p>
                </Card>

                <Card className="bg-[#f6fbff] p-6">
                  <h3 className="text-2xl font-semibold text-[var(--ink)]">
                    100% sikker betaling
                  </h3>
                  <ul className="mt-4 grid gap-2 text-sm text-[var(--muted)]">
                    <li>PCI-DSS kompatibel integration kan tilfoejes senere</li>
                    <li>Ingen skjulte gebyrer i kundeportalen</li>
                    <li>Klar til kortbetaling eller faktura-flow</li>
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
