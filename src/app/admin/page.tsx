import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  BarChart3,
  Calendar,
  CalendarPlus,
  Cog,
  LogOut,
  Mail,
  Users,
} from "lucide-react";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { getAdminDashboardData } from "@/lib/server/bookings";
import { isDatabaseConfigured } from "@/lib/server/db";
import {
  cleaningPackages,
  formatPrice,
  formatShortPrice,
  getStatusLabel,
  getStatusTone,
  getTimeSlots,
} from "@/lib/shared/booking";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "calendar", label: "Kalender", icon: Calendar },
  { id: "customers", label: "Kunder", icon: Users },
  { id: "settings", label: "Indstillinger", icon: Cog },
] as const;

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
  const view = Array.isArray(params.view) ? params.view[0] : params.view || "dashboard";
  const saved = Array.isArray(params.saved) ? params.saved[0] : params.saved || "";
  const error = Array.isArray(params.error) ? params.error[0] : params.error || "";
  const dashboard = await getAdminDashboardData();
  const timeSlots = getTimeSlots(dashboard.settings);
  const hasDatabase = isDatabaseConfigured();
  const statusMessage =
    saved === "created"
      ? "Booking oprettet."
      : saved === "updated"
        ? "Booking opdateret."
        : saved === "deleted"
          ? "Booking slettet."
          : saved === "settings"
            ? "Indstillinger gemt."
            : "";
  const errorMessage = error === "action" ? "Handlingen kunne ikke gennemfoeres." : "";
  const recentCustomers = dashboard.customers.slice(0, 12);

  return (
    <main className="px-4 pb-12 pt-8 sm:px-6">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-6 xl:grid-cols-[18rem_1fr]">
          <aside className="rounded-[2rem] bg-[linear-gradient(180deg,#0e3557,#14486b)] p-5 text-white shadow-[0_28px_80px_rgba(8,27,21,0.2)]">
            <div className="rounded-[1.5rem] border border-white/12 bg-white/8 p-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#6ec7eb] text-3xl font-semibold text-[#083047]">
                A
              </div>
              <p className="mt-4 text-2xl font-semibold">Admin</p>
              <p className="mt-1 text-sm text-white/72">{session.email}</p>
            </div>

            <nav className="mt-5 grid gap-2 text-sm">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = view === item.id;
                return (
                  <Link
                    key={item.id}
                    href={`/admin?view=${item.id}`}
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
                  <strong>{dashboard.stats.totalBookings}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Omsaetning</span>
                  <strong>{formatPrice(dashboard.stats.totalRevenue)}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Kunder</span>
                  <strong>{dashboard.stats.totalCustomers}</strong>
                </div>
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2388d1]">
                    WashMax Admin
                  </p>
                  <h1 className="mt-3 font-display text-4xl font-semibold text-[var(--ink)]">
                    {view === "calendar"
                      ? "Kalender og dagsplan"
                      : view === "customers"
                        ? "Kunder og bookinghistorik"
                        : view === "settings"
                          ? "Booking- og emailindstillinger"
                          : "Booking dashboard"}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                    Godkend bookinger, tilfoej bookinger manuelt, styr arbejdstider og
                    hold styr pa kundeoplysningerne fra et samlet panel.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/booking"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--line)] bg-white px-4 text-sm font-semibold text-[var(--ink)] transition hover:border-[#55b9df]"
                  >
                    <CalendarPlus className="h-5 w-5" />
                    Ny booking
                  </Link>
                  <form action="/api/admin/logout" method="POST">
                    <Button type="submit">
                      <LogOut className="h-5 w-5" />
                      Log ud
                    </Button>
                  </form>
                </div>
              </div>
            </Card>

            {!hasDatabase ? (
              <div className="rounded-[1.5rem] border border-[#ffe3b5] bg-[#fff7e8] px-5 py-4 text-sm text-[#8d5d08]">
                DATABASE_URL mangler. Adminpanelet kan vises, men bookinger bliver ikke gemt
                foer databasen er sat op.
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

            {view === "dashboard" ? (
              <>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {[
                    ["Afventer", dashboard.stats.pendingBookings],
                    ["Kommende", dashboard.stats.upcomingBookings],
                    ["Omsaetning", formatShortPrice(dashboard.stats.totalRevenue)],
                    ["Kunder", dashboard.stats.totalCustomers],
                  ].map(([label, value]) => (
                    <Card key={label as string} className="p-5">
                      <p className="text-sm text-[var(--muted)]">{label}</p>
                      <p className="mt-3 text-4xl font-semibold text-[var(--ink)]">{value}</p>
                    </Card>
                  ))}
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                  <Card className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
                          Bookinger
                        </h2>
                        <p className="mt-1 text-sm text-[var(--muted)]">
                          Godkend, afslut eller annuller direkte fra listen.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-4">
                      {dashboard.bookings.length > 0 ? (
                        dashboard.bookings.map((booking) => (
                          <article key={booking.id} className="rounded-[1.5rem] border border-[var(--line)] p-5">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                              <div>
                                <div className="flex flex-wrap items-center gap-3">
                                  <h3 className="text-xl font-semibold text-[var(--ink)]">
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

                              <div className="w-full max-w-sm space-y-3">
                                <form action={`/api/admin/bookings/${booking.id}`} method="POST" className="grid gap-3">
                                  <Textarea
                                    name="admin_notes"
                                    defaultValue={booking.adminNotes}
                                    className="min-h-24"
                                    placeholder="Admin-noter"
                                  />
                                  <div className="grid gap-2 sm:grid-cols-2">
                                    <Button type="submit" name="action" value="approve" variant="secondary">
                                      Godkend
                                    </Button>
                                    <Button type="submit" name="action" value="complete" variant="success">
                                      Afslut
                                    </Button>
                                    <Button type="submit" name="action" value="cancel" variant="outline">
                                      Annuller
                                    </Button>
                                    <Button
                                      type="submit"
                                      name="action"
                                      value="delete"
                                      variant="outline"
                                      className="border-red-200 text-red-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                                    >
                                      Slet
                                    </Button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </article>
                        ))
                      ) : (
                        <p className="text-sm text-[var(--muted)]">Ingen bookinger endnu.</p>
                      )}
                    </div>
                  </Card>

                  <div className="space-y-6">
                    <Card className="p-6">
                      <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
                        Tilfoej booking manuelt
                      </h2>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        Brug denne formular, hvis du vil oprette en booking direkte fra admin.
                      </p>

                      <form action="/api/admin/bookings/create" method="POST" className="mt-5 grid gap-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label="Fornavn">
                            <Input name="first_name" />
                          </Field>
                          <Field label="Efternavn">
                            <Input name="last_name" />
                          </Field>
                          <Field label="Email">
                            <Input name="email" type="email" />
                          </Field>
                          <Field label="Telefon">
                            <Input name="phone" />
                          </Field>
                          <Field label="Adresse" className="sm:col-span-2">
                            <Input name="address" />
                          </Field>
                          <Field label="Postnr.">
                            <Input name="postal_code" />
                          </Field>
                          <Field label="By">
                            <Input name="city" />
                          </Field>
                          <Field label="Nummerplade">
                            <Input name="plate" />
                          </Field>
                          <Field label="Regnr.">
                            <Input name="registration_number" />
                          </Field>
                          <Field label="Bilnavn">
                            <Input name="vehicle_name" />
                          </Field>
                          <Field label="Biltype">
                            <Input name="vehicle_type" />
                          </Field>
                          <Field label="Kategori">
                            <Input name="category" placeholder="Fx Mellem bil" />
                          </Field>
                          <Field label="Pakke">
                            <select
                              name="package_id"
                              className="h-12 rounded-xl border border-[#cbd9e4] bg-white px-4 outline-none transition focus:border-[#55b9df]"
                            >
                              {cleaningPackages.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </Field>
                          <Field label="Pris">
                            <Input name="total" type="number" min="0" />
                          </Field>
                          <Field label="Dato">
                            <Input name="appointment_date" type="date" />
                          </Field>
                          <Field label="Tid">
                            <select
                              name="appointment_time"
                              className="h-12 rounded-xl border border-[#cbd9e4] bg-white px-4 outline-none transition focus:border-[#55b9df]"
                            >
                              {timeSlots.map((slot) => (
                                <option key={slot} value={slot}>
                                  {slot}
                                </option>
                              ))}
                            </select>
                          </Field>
                        </div>
                        <label className="flex items-center gap-3 text-sm text-[var(--ink)]">
                          <input type="checkbox" name="send_email" className="h-4 w-4 rounded border-[#9cb0bd]" />
                          Send bookingmail til kunden
                        </label>
                        <Button type="submit">
                          <CalendarPlus className="h-5 w-5" />
                          Opret booking
                        </Button>
                      </form>
                    </Card>

                    <Card className="p-6">
                      <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
                        Seneste kunder
                      </h2>
                      <div className="mt-5 grid gap-3">
                        {recentCustomers.length > 0 ? (
                          recentCustomers.map((customer) => (
                            <div
                              key={customer.id}
                              className="rounded-2xl border border-[var(--line)] px-4 py-4"
                            >
                              <p className="font-semibold text-[var(--ink)]">
                                {[customer.firstName, customer.lastName].filter(Boolean).join(" ") ||
                                  customer.email}
                              </p>
                              <p className="mt-1 text-sm text-[var(--muted)]">{customer.email}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-[var(--muted)]">Ingen kunder endnu.</p>
                        )}
                      </div>
                    </Card>
                  </div>
                </div>
              </>
            ) : null}

            {view === "calendar" ? (
              <div className="grid gap-4">
                {dashboard.calendar.length > 0 ? (
                  dashboard.calendar.map((day) => (
                    <Card key={day.date} className="p-6">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
                            {day.label}
                          </h2>
                          <p className="mt-1 text-sm text-[var(--muted)]">
                            {day.bookings.length} booking(er)
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 grid gap-3">
                        {day.bookings.map((booking) => (
                          <div
                            key={booking.id}
                            className="flex flex-col gap-3 rounded-2xl border border-[var(--line)] px-4 py-4 lg:flex-row lg:items-center lg:justify-between"
                          >
                            <div>
                              <p className="font-semibold text-[var(--ink)]">
                                {booking.appointmentTime} | {booking.vehicleName}
                              </p>
                              <p className="mt-1 text-sm text-[var(--muted)]">
                                {booking.packageLabel} - {booking.category} | {booking.registrationNumber}
                              </p>
                            </div>
                            <span
                              className={cn(
                                "inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold",
                                getStatusTone(booking.status)
                              )}
                            >
                              {getStatusLabel(booking.status)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))
                ) : (
                  <Card className="p-6">
                    <p className="text-sm text-[var(--muted)]">Ingen kalenderbookinger endnu.</p>
                  </Card>
                )}
              </div>
            ) : null}

            {view === "customers" ? (
              <Card className="p-6">
                <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
                  Kunder
                </h2>
                <div className="mt-5 grid gap-4">
                  {dashboard.customers.length > 0 ? (
                    dashboard.customers.map((customer) => (
                      <article
                        key={customer.id}
                        className="rounded-[1.5rem] border border-[var(--line)] p-5"
                      >
                        <p className="text-lg font-semibold text-[var(--ink)]">
                          {[customer.firstName, customer.lastName].filter(Boolean).join(" ") ||
                            "Kunde"}
                        </p>
                        <p className="mt-1 text-sm text-[var(--muted)]">{customer.email}</p>
                        <p className="mt-2 text-sm text-[var(--muted)]">
                          {customer.address}, {customer.postalCode} {customer.city}
                        </p>
                        {customer.company ? (
                          <p className="mt-2 text-sm text-[var(--muted)]">
                            {customer.company}
                            {customer.companyId ? ` | ${customer.companyId}` : ""}
                          </p>
                        ) : null}
                        <p className="mt-3 text-xs text-[#2388d1]">
                          Portal: /kunde/{customer.portalToken.slice(0, 8)}...
                        </p>
                      </article>
                    ))
                  ) : (
                    <p className="text-sm text-[var(--muted)]">Ingen kunder endnu.</p>
                  )}
                </div>
              </Card>
            ) : null}

            {view === "settings" ? (
              <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
                <Card className="p-6">
                  <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
                    Bookingindstillinger
                  </h2>
                  <form action="/api/admin/settings" method="POST" className="mt-5 grid gap-4">
                    <Field label="Firmanavn">
                      <Input name="company_name" defaultValue={dashboard.settings.companyName} />
                    </Field>
                    <Field label="Support email">
                      <Input name="support_email" defaultValue={dashboard.settings.supportEmail} />
                    </Field>
                    <Field label="Admin notifikation email">
                      <Input
                        name="admin_notify_email"
                        defaultValue={dashboard.settings.adminNotifyEmail}
                      />
                    </Field>
                    <div className="grid gap-4 sm:grid-cols-3">
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
                    </div>
                    <Button type="submit">Gem indstillinger</Button>
                  </form>
                </Card>

                <div className="space-y-6">
                  <Card className="p-6">
                    <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
                      Mailopsaetning
                    </h2>
                    <div className="mt-5 grid gap-3 text-sm text-[var(--muted)]">
                      <p className="flex items-center justify-between gap-4">
                        <span>SMTP host</span>
                        <strong className="text-[var(--ink)]">
                          {process.env.SMTP_HOST || "Ikke sat"}
                        </strong>
                      </p>
                      <p className="flex items-center justify-between gap-4">
                        <span>SMTP user</span>
                        <strong className="text-[var(--ink)]">
                          {process.env.SMTP_USER || "Ikke sat"}
                        </strong>
                      </p>
                      <p className="flex items-center justify-between gap-4">
                        <span>Mail from</span>
                        <strong className="text-[var(--ink)]">
                          {process.env.MAIL_FROM || "Ikke sat"}
                        </strong>
                      </p>
                    </div>
                    <div className="mt-5 rounded-2xl bg-[#f6fbff] px-4 py-4 text-sm text-[#1a506d]">
                      SMTP-password vises ikke her. Den skal ligge i SMTP_PASSWORD i Vercel.
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
                      Aktive tidsrum
                    </h2>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {timeSlots.map((slot) => (
                        <span
                          key={slot}
                          className="rounded-full bg-[#eef8ff] px-4 py-2 text-sm font-semibold text-[#2388d1]"
                        >
                          {slot}
                        </span>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
                      Hurtige links
                    </h2>
                    <div className="mt-5 grid gap-3 text-sm">
                      <Link href="/booking" className="text-[#2388d1] underline-offset-4 hover:underline">
                        Gaa til booking
                      </Link>
                      <div className="flex items-center gap-2 text-[var(--muted)]">
                        <Mail className="h-4 w-4 text-[#55b9df]" />
                        {dashboard.settings.supportEmail}
                      </div>
                    </div>
                  </Card>
                </div>
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
