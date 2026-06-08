import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowLeft, CalendarPlus } from "lucide-react";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { getBookingSettings } from "@/lib/server/bookings";
import {
  formatPrice,
  getAutoBookingStatusDescription,
  getAutoBookingStatusLabel,
  getTimeSlots,
} from "@/lib/shared/booking";
import { AdminShell } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: "Opret booking",
  description: "Opret en manuel booking i admin.",
};

const selectClassName =
  "h-10 w-full rounded-xl border border-[#e1e6f7] bg-white px-3 text-[13px] font-medium text-[#1f2340] outline-none transition focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f1]/10";

export default async function NewAdminBookingPage() {
  const cookieStore = await cookies();
  if (!getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    redirect("/admin/login");
  }

  const settings = await getBookingSettings();
  const timeSlots = getTimeSlots(settings);

  return (
    <AdminShell>
      <div className="mx-auto max-w-4xl">
        <Link
          href="/admin?view=bookings"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#6366f1] hover:text-[#4f46e5]"
        >
          <ArrowLeft className="h-4 w-4" />
          Tilbage til bookinger
        </Link>

        <section className="mt-4 rounded-3xl border border-white/60 bg-white/75 p-5 shadow-[0_12px_40px_rgba(31,35,64,0.08)] sm:p-7">
          <div className="mb-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#6366f1]">
              Manuel booking
            </p>
            <h1 className="mt-2 text-2xl font-bold text-[#1f2340]">
              Opret booking
            </h1>
            <p className="mt-2 text-sm text-[#667085]">
              Brug formularen til telefonbookinger og aftaler oprettet af admin.
            </p>
          </div>

          <form action="/api/admin/bookings/create" method="POST" className="grid gap-5">
            <input type="hidden" name="return_view" value="bookings" />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Fornavn">
                <Input name="first_name" required />
              </Field>
              <Field label="Efternavn">
                <Input name="last_name" required />
              </Field>
              <Field label="E-mail">
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
              <Field label="Firma">
                <Input name="company" placeholder="Valgfrit" />
              </Field>
              <Field label="CVR">
                <Input name="company_id" placeholder="Valgfrit" />
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
              <Field label="Årgang">
                <Input name="vehicle_year" type="number" min="1980" max="2100" />
              </Field>
              <Field label="Biltype">
                <Input name="vehicle_type" />
              </Field>
              <Field label="Kategori">
                <select name="category" className={selectClassName}>
                  {settings.catalog.vehicleCategories.map((category) => (
                    <option key={category.id} value={category.label}>
                      {category.label} - {formatPrice(category.price)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Pakke">
                <select name="package_id" className={selectClassName}>
                  {settings.catalog.packages.map((pkg) => (
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

            <div className="rounded-2xl border border-[#cde6f6] bg-[#f6fbff] px-4 py-4 text-sm text-[#1a506d]">
              <p className="font-semibold text-[#1f2340]">
                Standardstatus: {getAutoBookingStatusLabel(settings.defaultBookingStatus)}
              </p>
              <p className="mt-2 leading-6">
                {getAutoBookingStatusDescription(settings.defaultBookingStatus)}
              </p>
            </div>

            <label className="flex items-start gap-3 text-sm text-[#1f2340]">
              <input
                type="checkbox"
                name="send_email"
                defaultChecked
                className="mt-1 h-4 w-4 rounded border-[#9cb0bd]"
              />
              <span>Send bookingbekræftelse og kundeportal-link til kunden</span>
            </label>

            <Button type="submit" size="lg" className="w-full sm:w-auto">
              <CalendarPlus className="h-4 w-4" />
              Opret booking
            </Button>
          </form>
        </section>
      </div>
    </AdminShell>
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
    <label className={`grid gap-1.5 text-[13px] font-medium text-[#1f2340] ${className || ""}`}>
      <span>{label}</span>
      {children}
    </label>
  );
}
