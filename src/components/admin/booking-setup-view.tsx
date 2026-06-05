import type { ReactNode } from "react";
import { CalendarClock, Eye, EyeOff, Image as ImageIcon, Plus, Settings2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type {
  BookingSetupAddon,
  BookingSetupData,
  BookingSetupService,
} from "@/lib/server/booking-setup";
import { formatPrice } from "@/lib/shared/booking";
import { cn } from "@/lib/utils";

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function BookingSetupView({
  data,
  saved,
  error,
}: {
  data: BookingSetupData;
  saved?: string;
  error?: string;
}) {
  return (
    <div className="space-y-5">
      {saved === "booking-setup" || error === "booking-setup" ? (
        <div
          className={cn(
            "rounded-3xl border px-4 py-4 text-[13px] font-medium",
            error === "booking-setup"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-[#CDE6F6] bg-[#F6FBFF] text-[#1A506D]"
          )}
        >
          {error === "booking-setup"
            ? "Booking setup kunne ikke gemmes."
            : "Booking setup er gemt."}
        </div>
      ) : null}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <CreateServiceCard />
        <CreateAddonCard services={data.services} />
      </div>

      <SetupSection
        eyebrow="Services"
        title="Main services / packages"
        description="Shown in the public booking flow when visible."
      >
        <div className="grid gap-4">
          {data.services.map((service) => (
            <ServiceEditor key={service.id} service={service} />
          ))}
        </div>
      </SetupSection>

      <SetupSection
        eyebrow="Add-ons"
        title="Extra services / additional options"
        description="Hidden add-ons are excluded from the public booking flow."
      >
        <div className="grid gap-4">
          {data.addons.map((addon) => (
            <AddonEditor key={addon.id} addon={addon} services={data.services} />
          ))}
        </div>
      </SetupSection>

      <SetupSection
        eyebrow="Options"
        title="Booking options"
        description="Vehicle category and other customer choices."
      >
        <div className="grid gap-4">
          {data.optionGroups.map((group) => (
            <div key={group.id} className="rounded-2xl border border-white/55 bg-white/55 p-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[14px] font-semibold text-[#1F2340]">{group.name}</p>
                  <p className="text-[12px] font-medium text-[#8E95B5]">{group.description}</p>
                </div>
                <StatusPill visible={group.isVisible} />
              </div>
              <div className="mt-3 grid gap-2">
                {group.options.map((option) => (
                  <form
                    key={option.id}
                    action={`/api/admin/booking-setup/options/${option.id}`}
                    method="POST"
                    className="grid gap-2 rounded-2xl border border-white/55 bg-white/60 p-3 lg:grid-cols-[1fr_7rem_7rem_5rem_auto]"
                  >
                    <input type="hidden" name="group_id" value={group.id} />
                    <Input name="label" defaultValue={option.label} />
                    <Input type="number" name="price_adjustment_dkk" defaultValue={option.priceAdjustmentDkk} />
                    <Input type="number" name="duration_adjustment_minutes" defaultValue={option.durationAdjustmentMinutes} />
                    <Input type="number" name="sort_order" defaultValue={option.sortOrder} />
                    <div className="flex flex-wrap gap-2">
                      <label className="flex items-center gap-2 text-[12px] font-semibold">
                        <input type="checkbox" name="is_visible" defaultChecked={option.isVisible} />
                        Visible
                      </label>
                      <Button type="submit" className="h-10">Save</Button>
                      <Button type="submit" name="action" value="delete" variant="outline" className="h-10">
                        Delete
                      </Button>
                    </div>
                  </form>
                ))}
              </div>
              <form action="/api/admin/booking-setup/options" method="POST" className="mt-3 grid gap-2 rounded-2xl border border-dashed border-[#DDE3F5] bg-white/45 p-3 lg:grid-cols-[1fr_7rem_7rem_auto]">
                <input type="hidden" name="group_id" value={group.id} />
                <Input name="label" placeholder="New option" required />
                <Input type="number" name="price_adjustment_dkk" placeholder="Price" />
                <Input type="number" name="duration_adjustment_minutes" placeholder="Minutes" />
                <Button type="submit">Add option</Button>
              </form>
            </div>
          ))}
        </div>
      </SetupSection>

      <div className="grid gap-5 xl:grid-cols-2">
        <OpeningHoursCard data={data} />
        <TimeSettingsCard data={data} />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <UnavailableDatesCard data={data} />
        <FormFieldsCard data={data} />
      </div>

      <GeneralSettingsCard data={data} />
    </div>
  );
}

function CreateServiceCard() {
  return (
    <SetupPanel title="Add main service" icon={<Plus className="h-5 w-5" />}>
      <form action="/api/admin/booking-setup/services" method="POST" className="grid gap-3">
        <Field label="Service name"><Input name="name" required /></Field>
        <Field label="Short description"><Input name="short_description" /></Field>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Price DKK"><Input type="number" name="price_dkk" min="0" defaultValue="0" /></Field>
          <Field label="Duration min"><Input type="number" name="duration_minutes" min="1" defaultValue="60" /></Field>
          <Field label="Sort order"><Input type="number" name="sort_order" defaultValue="0" /></Field>
        </div>
        <label className="flex items-center gap-2 text-[13px] font-semibold">
          <input type="checkbox" name="is_visible" defaultChecked /> Visible
        </label>
        <label className="flex items-center gap-2 text-[13px] font-semibold">
          <input type="checkbox" name="is_featured" /> Featured
        </label>
        <Button type="submit">Create service</Button>
      </form>
    </SetupPanel>
  );
}

function CreateAddonCard({ services }: { services: BookingSetupService[] }) {
  return (
    <SetupPanel title="Add extra service" icon={<Sparkles className="h-5 w-5" />}>
      <form action="/api/admin/booking-setup/addons" method="POST" className="grid gap-3">
        <Field label="Add-on name"><Input name="name" required /></Field>
        <Field label="Description"><Input name="description" /></Field>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Price DKK"><Input type="number" name="price_dkk" min="0" defaultValue="0" /></Field>
          <Field label="Duration min"><Input type="number" name="duration_minutes" min="0" defaultValue="0" /></Field>
          <Field label="Sort order"><Input type="number" name="sort_order" defaultValue="0" /></Field>
        </div>
        <Field label="Category">
          <select name="addon_category" defaultValue="interior" className={selectClassName}>
            <option value="interior">Interior</option>
            <option value="exterior">Exterior</option>
            <option value="quantity">Quantity/manual</option>
          </select>
        </Field>
        <Field label="Allowed service IDs">
          <Input name="allowed_service_ids" placeholder={services.map((service) => service.id).join(", ")} />
        </Field>
        <label className="flex items-center gap-2 text-[13px] font-semibold">
          <input type="checkbox" name="is_visible" defaultChecked /> Visible
        </label>
        <Button type="submit">Create add-on</Button>
      </form>
    </SetupPanel>
  );
}

function ServiceEditor({ service }: { service: BookingSetupService }) {
  return (
    <article className="rounded-2xl border border-white/55 bg-white/55 p-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
        <ImagePreview imageUrl={service.imageUrl} label={service.name} />
        <form action={`/api/admin/booking-setup/services/${service.id}`} method="POST" className="grid flex-1 gap-3">
          <div className="grid gap-3 sm:grid-cols-[1fr_7rem_7rem_5rem]">
            <Input name="name" defaultValue={service.name} />
            <Input type="number" name="price_dkk" defaultValue={service.priceDkk} />
            <Input type="number" name="duration_minutes" defaultValue={service.durationMinutes} />
            <Input type="number" name="sort_order" defaultValue={service.sortOrder} />
          </div>
          <Input name="short_description" defaultValue={service.shortDescription} />
          <Textarea name="description" defaultValue={service.description} className="min-h-16" />
          <div className="flex flex-wrap items-center gap-3">
            <StatusPill visible={service.isVisible} />
            <label className="flex items-center gap-2 text-[12px] font-semibold">
              <input type="checkbox" name="is_visible" defaultChecked={service.isVisible} /> Visible
            </label>
            <label className="flex items-center gap-2 text-[12px] font-semibold">
              <input type="checkbox" name="is_featured" defaultChecked={service.isFeatured} /> Featured
            </label>
            <Button type="submit" className="h-10">Save</Button>
            <Button type="submit" name="action" value="delete" variant="outline" className="h-10 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-700">
              Delete
            </Button>
          </div>
        </form>
        <ImageUploadForm action={`/api/admin/booking-setup/services/${service.id}/image`} />
      </div>
    </article>
  );
}

function AddonEditor({ addon, services }: { addon: BookingSetupAddon; services: BookingSetupService[] }) {
  return (
    <article className="rounded-2xl border border-white/55 bg-white/55 p-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
        <ImagePreview imageUrl={addon.imageUrl} label={addon.name} />
        <form action={`/api/admin/booking-setup/addons/${addon.id}`} method="POST" className="grid flex-1 gap-3">
          <div className="grid gap-3 sm:grid-cols-[1fr_7rem_7rem_5rem]">
            <Input name="name" defaultValue={addon.name} />
            <Input type="number" name="price_dkk" defaultValue={addon.priceDkk} />
            <Input type="number" name="duration_minutes" defaultValue={addon.durationMinutes} />
            <Input type="number" name="sort_order" defaultValue={addon.sortOrder} />
          </div>
          <Input name="description" defaultValue={addon.description} />
          <div className="grid gap-3 sm:grid-cols-2">
            <select name="addon_category" defaultValue={addon.addonCategory} className={selectClassName}>
              <option value="interior">Interior</option>
              <option value="exterior">Exterior</option>
              <option value="quantity">Quantity/manual</option>
            </select>
            <Input
              name="allowed_service_ids"
              defaultValue={addon.allowedServiceIds.join(", ")}
              placeholder={services.map((service) => service.id).join(", ")}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <StatusPill visible={addon.isVisible} />
            <label className="flex items-center gap-2 text-[12px] font-semibold">
              <input type="checkbox" name="is_visible" defaultChecked={addon.isVisible} /> Visible
            </label>
            <Button type="submit" className="h-10">Save</Button>
            <Button type="submit" name="action" value="delete" variant="outline" className="h-10 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-700">
              Delete
            </Button>
          </div>
        </form>
        <ImageUploadForm action={`/api/admin/booking-setup/addons/${addon.id}/image`} />
      </div>
    </article>
  );
}

function OpeningHoursCard({ data }: { data: BookingSetupData }) {
  const byWeekday = new Map(data.openingHours.map((item) => [item.weekday, item]));
  return (
    <SetupPanel title="Opening hours" icon={<CalendarClock className="h-5 w-5" />}>
      <form action="/api/admin/booking-setup/opening-hours" method="POST" className="grid gap-2">
        {weekdays.map((weekday, index) => {
          const item = byWeekday.get(index);
          return (
            <div key={weekday} className="grid gap-2 rounded-2xl border border-white/55 bg-white/55 p-3 sm:grid-cols-[7rem_1fr_1fr] sm:items-center">
              <label className="flex items-center gap-2 text-[13px] font-semibold">
                <input type="checkbox" name={`is_open_${index}`} defaultChecked={item?.isOpen ?? true} />
                {weekday}
              </label>
              <Input type="time" name={`start_time_${index}`} defaultValue={item?.startTime || "09:00"} />
              <Input type="time" name={`end_time_${index}`} defaultValue={item?.endTime || "17:00"} />
            </div>
          );
        })}
        <Button type="submit">Save opening hours</Button>
      </form>
    </SetupPanel>
  );
}

function TimeSettingsCard({ data }: { data: BookingSetupData }) {
  const settings = data.timeSettings;
  return (
    <SetupPanel title="Time slots & buffer" icon={<Settings2 className="h-5 w-5" />}>
      <form action="/api/admin/booking-setup/time-settings" method="POST" className="grid gap-3 sm:grid-cols-2">
        <Field label="Slot interval"><Input type="number" name="slot_interval_minutes" defaultValue={settings.slotIntervalMinutes} /></Field>
        <Field label="Minimum notice hours"><Input type="number" name="minimum_notice_hours" defaultValue={settings.minimumNoticeHours} /></Field>
        <Field label="Maximum days ahead"><Input type="number" name="maximum_days_ahead" defaultValue={settings.maximumDaysAhead} /></Field>
        <Field label="Buffer before minutes"><Input type="number" name="buffer_before_minutes" defaultValue={settings.bufferBeforeMinutes} /></Field>
        <Field label="Buffer after minutes"><Input type="number" name="buffer_after_minutes" defaultValue={settings.bufferAfterMinutes} /></Field>
        <Field label="Max bookings per slot"><Input type="number" name="max_bookings_per_slot" defaultValue={settings.maxBookingsPerSlot} /></Field>
        <Field label="Max bookings per day"><Input type="number" name="max_bookings_per_day" defaultValue={settings.maxBookingsPerDay} /></Field>
        <label className="flex items-center gap-2 text-[13px] font-semibold">
          <input type="checkbox" name="allow_same_day_booking" defaultChecked={settings.allowSameDayBooking} />
          Allow same-day booking
        </label>
        <div className="sm:col-span-2"><Button type="submit">Save time rules</Button></div>
      </form>
    </SetupPanel>
  );
}

function UnavailableDatesCard({ data }: { data: BookingSetupData }) {
  return (
    <SetupPanel title="Unavailable dates" icon={<CalendarClock className="h-5 w-5" />}>
      <form action="/api/admin/booking-setup/unavailable-dates" method="POST" className="grid gap-2 rounded-2xl border border-dashed border-[#DDE3F5] bg-white/45 p-3">
        <Input name="title" placeholder="Holiday / vacation / closed" required />
        <div className="grid gap-2 sm:grid-cols-2">
          <Input type="date" name="start_date" required />
          <Input type="date" name="end_date" />
        </div>
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-2 text-[12px] font-semibold"><input type="checkbox" name="is_full_day" defaultChecked /> Full day</label>
          <label className="flex items-center gap-2 text-[12px] font-semibold"><input type="checkbox" name="repeat_yearly" /> Repeat yearly</label>
          <Button type="submit">Block date</Button>
        </div>
      </form>
      <div className="mt-3 grid gap-2">
        {data.unavailableDates.map((item) => (
          <form key={item.id} action={`/api/admin/booking-setup/unavailable-dates/${item.id}`} method="POST" className="grid gap-2 rounded-2xl border border-white/55 bg-white/55 p-3 sm:grid-cols-[1fr_8rem_8rem_auto]">
            <Input name="title" defaultValue={item.title} />
            <Input type="date" name="start_date" defaultValue={item.startDate} />
            <Input type="date" name="end_date" defaultValue={item.endDate} />
            <div className="flex gap-2">
              <Button type="submit" className="h-10">Save</Button>
              <Button type="submit" name="action" value="delete" variant="outline" className="h-10">Delete</Button>
            </div>
          </form>
        ))}
      </div>
    </SetupPanel>
  );
}

function FormFieldsCard({ data }: { data: BookingSetupData }) {
  return (
    <SetupPanel title="Booking form fields" icon={<Settings2 className="h-5 w-5" />}>
      <form action="/api/admin/booking-setup/form-fields" method="POST" className="grid gap-2">
        {data.formFields.map((field) => (
          <div key={field.id} className="grid gap-2 rounded-2xl border border-white/55 bg-white/55 p-3 lg:grid-cols-[1fr_1fr_auto]">
            <Input name={`label_${field.fieldKey}`} defaultValue={field.label} />
            <Input name={`placeholder_${field.fieldKey}`} defaultValue={field.placeholder} />
            <div className="flex flex-wrap gap-3">
              <input type="hidden" name={`sort_order_${field.fieldKey}`} value={field.sortOrder} />
              <label className="flex items-center gap-2 text-[12px] font-semibold"><input type="checkbox" name={`is_visible_${field.fieldKey}`} defaultChecked={field.isVisible} /> Visible</label>
              <label className="flex items-center gap-2 text-[12px] font-semibold"><input type="checkbox" name={`is_required_${field.fieldKey}`} defaultChecked={field.isRequired} /> Required</label>
            </div>
          </div>
        ))}
        <Button type="submit">Save form fields</Button>
      </form>
    </SetupPanel>
  );
}

function GeneralSettingsCard({ data }: { data: BookingSetupData }) {
  const general = data.general;
  return (
    <SetupSection eyebrow="General" title="General booking settings" description="Public booking availability, VAT, emails, and messages.">
      <form action="/api/admin/booking-setup/general" method="POST" className="grid gap-3 sm:grid-cols-2">
        <label className="flex items-center gap-2 text-[13px] font-semibold"><input type="checkbox" name="booking_enabled" defaultChecked={general.bookingEnabled} /> Booking enabled</label>
        <label className="flex items-center gap-2 text-[13px] font-semibold"><input type="checkbox" name="customer_confirmation_enabled" defaultChecked={general.customerConfirmationEnabled} /> Customer email enabled</label>
        <label className="flex items-center gap-2 text-[13px] font-semibold"><input type="checkbox" name="admin_notification_enabled" defaultChecked={general.adminNotificationEnabled} /> Admin notification enabled</label>
        <Field label="Currency"><Input name="currency" defaultValue={general.currency} /></Field>
        <Field label="VAT / moms rate"><Input type="number" name="vat_rate" defaultValue={general.vatRate} /></Field>
        <Field label="Company name"><Input name="company_name" defaultValue={general.companyName} /></Field>
        <Field label="Support email"><Input type="email" name="support_email" defaultValue={general.supportEmail} /></Field>
        <Field label="Admin notify email"><Input type="email" name="admin_notify_email" defaultValue={general.adminNotifyEmail} /></Field>
        <Field label="Disabled booking message" className="sm:col-span-2"><Textarea name="disabled_message" defaultValue={general.disabledMessage} /></Field>
        <Field label="Cancellation policy" className="sm:col-span-2"><Textarea name="cancellation_policy_text" defaultValue={general.cancellationPolicyText} /></Field>
        <Field label="Success message" className="sm:col-span-2"><Textarea name="success_message" defaultValue={general.successMessage} /></Field>
        <div className="sm:col-span-2"><Button type="submit">Save general settings</Button></div>
      </form>
    </SetupSection>
  );
}

function ImagePreview({ imageUrl, label }: { imageUrl: string; label: string }) {
  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={imageUrl} alt="" className="h-24 w-full rounded-2xl object-cover ring-1 ring-white/70 lg:w-32" />
    );
  }
  return (
    <div className="flex h-24 w-full items-center justify-center rounded-2xl border border-dashed border-[#DDE3F5] bg-white/50 text-[#8E95B5] lg:w-32">
      <ImageIcon className="h-5 w-5" />
      <span className="sr-only">{label}</span>
    </div>
  );
}

function ImageUploadForm({ action }: { action: string }) {
  return (
    <form action={action} method="POST" encType="multipart/form-data" className="grid gap-2 lg:w-44">
      <Input type="file" name="image" accept="image/png,image/jpeg,image/webp" />
      <Button type="submit" variant="outline" className="h-10">Upload image</Button>
    </form>
  );
}

function StatusPill({ visible }: { visible: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[12px] font-semibold", visible ? "border-[#10B981]/20 bg-[#10B981]/10 text-[#047857]" : "border-[#EF4444]/20 bg-[#EF4444]/10 text-[#B91C1C]")}>
      {visible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
      {visible ? "Visible" : "Hidden"}
    </span>
  );
}

function SetupSection({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-white/55 bg-white/[0.65] p-4 shadow-[0_8px_32px_rgba(99,102,241,0.08)] backdrop-blur-2xl">
      <div className="mb-4">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#6366F1]">{eyebrow}</p>
        <h2 className="mt-1.5 text-xl font-bold text-[#1F2340]">{title}</h2>
        <p className="mt-1.5 text-[13px] font-medium leading-6 text-[#4B5563]">{description}</p>
      </div>
      {children}
    </section>
  );
}

function SetupPanel({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-white/55 bg-white/[0.65] p-4 shadow-[0_8px_32px_rgba(99,102,241,0.08)] backdrop-blur-2xl">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#EEF0FF] text-[#6366F1]">{icon}</span>
        <p className="text-[14px] font-semibold text-[#1F2340]">{title}</p>
      </div>
      {children}
    </section>
  );
}

function Field({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <label className={cn("grid gap-1.5 text-[13px] font-medium text-[#1F2340]", className)}>
      <span>{label}</span>
      {children}
    </label>
  );
}

const selectClassName =
  "h-10 w-full rounded-2xl border border-[#DDE3F5] bg-white/70 px-3 text-[13px] font-medium text-[#1F2340] outline-none";
