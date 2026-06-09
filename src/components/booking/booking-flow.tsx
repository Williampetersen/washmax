"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { da } from "date-fns/locale";
import { format } from "date-fns";
import {
  CalendarDays,
  Check,
  Clock3,
  LoaderCircle,
  Mail,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { bookingCustomerSchema } from "@/lib/schemas/booking";
import {
  findMatchingServiceArea,
  buildVehicleName,
  formatDateTimeLabel,
  formatPrice,
  formatShortPrice,
  getAvailableTimeSlots,
  getCatalogPackage,
  getVehicleCategory,
  isDateBlocked,
  isWorkingDay,
  sanitizePlate,
  type AvailabilityBlock,
  type BookingSettings,
  type BookingStatus,
  type VehicleLookupResult,
} from "@/lib/shared/booking";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const bookingFormSchema = bookingCustomerSchema.extend({
  company: z.string().default(""),
  companyId: z.string().default(""),
});

type BookingFlowProps = {
  initialPlate: string;
  minDate: string;
  settings: BookingSettings;
  availabilityBlocks: AvailabilityBlock[];
};

type BookingFormValues = z.input<typeof bookingFormSchema>;
type AddOnSelection = { id: string; label: string; price: number };
type LookupStatus = {
  message: string;
  type: "error" | "info";
};
type VehicleCacheEntry = {
  vehicle: VehicleLookupResult;
  cachedAt: number;
};

const toCalendarDate = (dateValue: string) => new Date(`${dateValue}T12:00:00`);
const platePattern = /^[A-Z0-9]{2,10}$/;
const lookupDebounceMs = 400;
const minAutoLookupPlateLength = 5;
const clientVehicleCacheTtlMs = 5 * 60 * 1000;
const vehicleLookupCache = new Map<string, VehicleCacheEntry>();

const createManualVehicle = (plate: string): VehicleLookupResult => ({
  registration_number: plate,
  make: null,
  model: null,
  model_year: null,
  color: null,
  type: null,
  total_weight: null,
  chassis_type: null,
  lookupUnavailable: true,
});

const createIdempotencyKey = (input: {
  plate: string;
  email: string;
  appointmentDate: string;
  appointmentTime: string;
  packageId: string;
}) =>
  [
    "website",
    sanitizePlate(input.plate),
    input.email.trim().toLowerCase(),
    input.appointmentDate,
    input.appointmentTime,
    input.packageId,
  ]
    .join(":")
    .slice(0, 120);

const findFirstBookableDate = (
  minDate: string,
  settings: Pick<BookingSettings, "startHour" | "endHour" | "slotMinutes" | "workingDays">,
  availabilityBlocks: AvailabilityBlock[]
) => {
  const start = toCalendarDate(minDate);

  for (let offset = 0; offset < 90; offset += 1) {
    const nextDate = new Date(start);
    nextDate.setDate(start.getDate() + offset);
    const dateValue = format(nextDate, "yyyy-MM-dd");
    if (getAvailableTimeSlots(dateValue, settings, availabilityBlocks).length > 0) {
      return nextDate;
    }
  }

  return undefined;
};

export function BookingFlow({
  initialPlate,
  minDate,
  settings,
  availabilityBlocks,
}: BookingFlowProps) {
  const initialBookableDate = useMemo(
    () => findFirstBookableDate(minDate, settings, availabilityBlocks),
    [availabilityBlocks, minDate, settings]
  );
  const [plate, setPlate] = useState(initialPlate);
  const [lookupStatus, setLookupStatus] = useState<LookupStatus | null>(null);
  const [formStatus, setFormStatus] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);
  const [vehicle, setVehicle] = useState<VehicleLookupResult | null>(null);
  const [activePackage, setActivePackage] = useState(settings.catalog.packages[0]?.id || "");
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(initialBookableDate);
  const [selectedAppointmentTime, setSelectedAppointmentTime] = useState("");
  const [isLookupPending, setIsLookupPending] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idempotencyKey, setIdempotencyKey] = useState("");
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);
  const lookupControllerRef = useRef<AbortController | null>(null);
  const lookupDebounceRef = useRef<number | null>(null);
  const latestLookupPlateRef = useRef("");

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      customerType: "private",
      company: "",
      companyId: "",
      address: "",
      postalCode: "",
      city: "",
      notes: "",
      wantsMarketing: false,
      acceptsTerms: false,
    },
  });

  const selectedAddons = useMemo(() => {
    const available = [...settings.catalog.interiorAddOns, ...settings.catalog.exteriorAddOns];
    return selectedAddonIds
      .map((id) => available.find((item) => item.id === id))
      .filter(Boolean)
      .map((item) => ({
        id: item!.id,
        label: item!.label,
        price: Number(item!.price || 0),
      }));
  }, [selectedAddonIds, settings.catalog.exteriorAddOns, settings.catalog.interiorAddOns]);

  const category = useMemo(
    () => (vehicle ? getVehicleCategory(vehicle, settings.catalog.vehicleCategories) : null),
    [settings.catalog.vehicleCategories, vehicle]
  );
  const activePackageData = useMemo(
    () => getCatalogPackage(settings.catalog, activePackage),
    [activePackage, settings.catalog]
  );
  const vehicleName = useMemo(() => buildVehicleName(vehicle), [vehicle]);
  const vehicleTypeLabel = vehicle?.type ? `Biltype: ${vehicle.type}` : "Biltype: -";
  const activePackagePrice = Number(activePackageData?.price || 0);
  const basePrice = activePackagePrice > 0 ? activePackagePrice : category?.price ?? 0;
  const postalCodeValue = useWatch({
    control: form.control,
    name: "postalCode",
  });
  const addonsTotal = useMemo(
    () => selectedAddons.reduce((sum, item) => sum + item.price, 0),
    [selectedAddons]
  );
  const matchedArea = useMemo(
    () => findMatchingServiceArea(postalCodeValue || "", settings.serviceAreas),
    [postalCodeValue, settings.serviceAreas]
  );
  const travelSurcharge = matchedArea?.surcharge ?? 0;
  const total = useMemo(
    () => basePrice + addonsTotal + travelSurcharge,
    [addonsTotal, basePrice, travelSurcharge]
  );
  const appointmentDateValue = appointmentDate ? format(appointmentDate, "yyyy-MM-dd") : "";
  const availableTimeSlots = useMemo(
    () =>
      appointmentDateValue
        ? getAvailableTimeSlots(appointmentDateValue, settings, availabilityBlocks)
        : [],
    [appointmentDateValue, availabilityBlocks, settings]
  );
  const appointmentTime = useMemo(
    () =>
      availableTimeSlots.includes(selectedAppointmentTime)
        ? selectedAppointmentTime
        : availableTimeSlots[0] || "",
    [availableTimeSlots, selectedAppointmentTime]
  );
  const appointmentLabel = useMemo(
    () =>
      appointmentDateValue
        ? formatDateTimeLabel(appointmentDateValue, appointmentTime || "00:00")
        : "Vaelg en ledig dag",
    [appointmentDateValue, appointmentTime]
  );
  const appointmentDateLabel = useMemo(
    () => (appointmentDate ? format(appointmentDate, "d. MMMM yyyy", { locale: da }) : ""),
    [appointmentDate]
  );
  const customerType = useWatch({
    control: form.control,
    name: "customerType",
  });
  const bookingStatusHint =
    settings.defaultBookingStatus === "approved"
      ? "Din booking bliver godkendt med det samme, og du faar en endelig bekraeftelse pa email."
      : "Din booking starter som afventer. Du faar en mail med det samme og en ny mail, naar vi har godkendt tiden.";
  const maxBookableDate = useMemo(() => {
    const date = toCalendarDate(minDate);
    date.setDate(date.getDate() + Number(settings.maximumDaysAhead || 90));
    return date;
  }, [minDate, settings.maximumDaysAhead]);
  const areaCoverageHint = !postalCodeValue?.trim()
    ? "Indtast dit postnummer for at se, om der er en koerselszone eller et tillaeg."
    : matchedArea
      ? `${matchedArea.label} matcher din adresse${
          matchedArea.surcharge > 0
            ? ` med et koerselstillaeg pa ${formatPrice(matchedArea.surcharge)}.`
            : " uden ekstra koerselstillaeg."
        }`
      : settings.serviceAreas.length > 0
        ? "Dit postnummer ligger uden for de faste zoner. Vi gennemgaar bookingen manuelt, hvis koersel skal justeres."
        : "Vi daekker fortsat din adresse uden registreret zonetillaeg.";

  const lookupVehicle = useCallback(async (nextPlateValue: string) => {
    const normalizedPlate = sanitizePlate(nextPlateValue);
    setPlate(normalizedPlate);

    if (!platePattern.test(normalizedPlate)) {
      lookupControllerRef.current?.abort();
      latestLookupPlateRef.current = "";
      setVehicle(null);
      setLookupStatus({
        message: "Indtast en gyldig dansk nummerplade, fx AB12345.",
        type: "error",
      });
      return;
    }

    const cached = vehicleLookupCache.get(normalizedPlate);
    const cacheIsFresh = cached && Date.now() - cached.cachedAt < clientVehicleCacheTtlMs;

    if (cached) {
      setVehicle(cached.vehicle);
      setLookupStatus(cacheIsFresh ? null : { message: "Opdaterer biloplysninger...", type: "info" });
      window.history.replaceState({}, "", `/booking?plate=${encodeURIComponent(normalizedPlate)}`);
      if (cacheIsFresh) {
        setIsLookupPending(false);
        return;
      }
    } else {
      setVehicle(createManualVehicle(normalizedPlate));
      setLookupStatus({
        message: "Vi tjekker bilen...",
        type: "info",
      });
    }

    if (
      latestLookupPlateRef.current === normalizedPlate &&
      lookupControllerRef.current &&
      !lookupControllerRef.current.signal.aborted
    ) {
      return;
    }

    lookupControllerRef.current?.abort();
    const controller = new AbortController();
    lookupControllerRef.current = controller;
    latestLookupPlateRef.current = normalizedPlate;
    setIsLookupPending(true);
    setFormStatus(null);
    const startedAt = performance.now();

    try {
      const response = await fetch(`/api/vehicle/${encodeURIComponent(normalizedPlate)}`, {
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      const payload = (await response.json().catch(() => ({}))) as
        | VehicleLookupResult
        | { error?: string };

      if (!response.ok) {
        throw new Error(
          "error" in payload && payload.error
            ? payload.error
            : "Nummerpladen kunne ikke findes. Tjek nummeret og prov igen."
        );
      }

      const nextVehicle = payload as VehicleLookupResult;
      if (latestLookupPlateRef.current !== normalizedPlate || controller.signal.aborted) {
        return;
      }
      vehicleLookupCache.set(normalizedPlate, {
        vehicle: nextVehicle,
        cachedAt: Date.now(),
      });
      setVehicle(nextVehicle);
      setLookupStatus(
        nextVehicle.lookupUnavailable
          ? {
              message:
                "Vi kunne ikke hente biloplysninger lige nu. Du kan fortsaette manuelt.",
              type: "error",
            }
          : null
      );
      window.history.replaceState({}, "", `/booking?plate=${encodeURIComponent(normalizedPlate)}`);
      if (process.env.NODE_ENV === "development") {
        console.info(`[perf] booking.lookup ${normalizedPlate} ${Math.round(performance.now() - startedAt)}ms`);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      if (latestLookupPlateRef.current !== normalizedPlate) {
        return;
      }
      setVehicle(createManualVehicle(normalizedPlate));
      setLookupStatus({
        message:
          "Vi kunne ikke hente biloplysninger lige nu. Du kan fortsaette manuelt.",
        type: "error",
      });
      window.history.replaceState({}, "", `/booking?plate=${encodeURIComponent(normalizedPlate)}`);
    } finally {
      if (latestLookupPlateRef.current === normalizedPlate) {
        setIsLookupPending(false);
        lookupControllerRef.current = null;
      }
    }
  }, []);

  useEffect(() => {
    const normalizedPlate = sanitizePlate(initialPlate);
    if (!normalizedPlate) return;
    if (
      latestLookupPlateRef.current === normalizedPlate &&
      lookupControllerRef.current &&
      !lookupControllerRef.current.signal.aborted
    ) {
      return;
    }
    void lookupVehicle(initialPlate);
  }, [initialPlate, lookupVehicle]);

  useEffect(
    () => () => {
      lookupControllerRef.current?.abort();
      if (lookupDebounceRef.current) {
        window.clearTimeout(lookupDebounceRef.current);
      }
    },
    []
  );

  const schedulePlateLookup = useCallback(
    (nextPlateValue: string) => {
      const normalizedPlate = sanitizePlate(nextPlateValue);
      setPlate(normalizedPlate);

      if (lookupDebounceRef.current) {
        window.clearTimeout(lookupDebounceRef.current);
      }

      if (!normalizedPlate) {
        lookupControllerRef.current?.abort();
        latestLookupPlateRef.current = "";
        setVehicle(null);
        setLookupStatus(null);
        return;
      }

      if (normalizedPlate.length < minAutoLookupPlateLength) {
        setLookupStatus(null);
        return;
      }

      lookupDebounceRef.current = window.setTimeout(() => {
        void lookupVehicle(normalizedPlate);
      }, lookupDebounceMs);
    },
    [lookupVehicle]
  );

  const submitPlateLookup = useCallback(() => {
    if (lookupDebounceRef.current) {
      window.clearTimeout(lookupDebounceRef.current);
      lookupDebounceRef.current = null;
    }
    void lookupVehicle(plate);
  }, [lookupVehicle, plate]);

  const handleAddonToggle = (addon: AddOnSelection) => {
    setSelectedAddonIds((current) =>
      current.includes(addon.id)
        ? current.filter((item) => item !== addon.id)
        : [...current, addon.id]
    );
  };

  const handleChangeVehicle = () => {
    lookupControllerRef.current?.abort();
    if (lookupDebounceRef.current) {
      window.clearTimeout(lookupDebounceRef.current);
      lookupDebounceRef.current = null;
    }
    latestLookupPlateRef.current = "";
    setVehicle(null);
    setPlate("");
    setLookupStatus(null);
    setFormStatus(null);
    setIdempotencyKey("");
    window.history.replaceState({}, "", "/booking");
  };

  const onSubmit = form.handleSubmit((values) => {
    if (!vehicle || !category) {
      setFormStatus({
        message: "Vi mangler stadig biloplysninger for at oprette bookingen.",
        type: "error",
      });
      return;
    }

    if (!appointmentDateValue || !appointmentTime) {
      setFormStatus({
        message: "Vaelg en dag med ledige tider for bookingen.",
        type: "error",
      });
      return;
    }

    setFormStatus(null);
    const nextIdempotencyKey =
      idempotencyKey ||
      createIdempotencyKey({
        plate,
        email: values.email,
        appointmentDate: appointmentDateValue,
        appointmentTime,
        packageId: activePackageData.id,
      });

    if (!idempotencyKey) {
      setIdempotencyKey(nextIdempotencyKey);
    }

    setIsSubmitting(true);

    void (async () => {
      try {
        const response = await fetch("/api/bookings/create", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            plate,
            registrationNumber: vehicle.registration_number,
            vehicleName,
            vehicleYear: vehicle.model_year,
            vehicleType: vehicle.type || "",
            category: category.label,
            packageId: activePackageData.id,
            packageLabel: activePackageData.title,
            addons: selectedAddons,
            subtotal: basePrice,
            total,
            appointmentDate: appointmentDateValue,
            appointmentTime,
            idempotencyKey: nextIdempotencyKey,
            customer: values,
          }),
        });

        const payload = (await response.json().catch(() => ({}))) as {
          ok?: boolean;
          error?: string;
          portalUrl?: string;
          bookingStatus?: BookingStatus;
          confirmationEmailSent?: boolean;
        };

        if (!response.ok || !payload?.ok || !payload.portalUrl) {
          throw new Error(payload?.error || "Kunne ikke oprette bookingen. Prov igen.");
        }

        const successMessage = payload.confirmationEmailSent
          ? "Din booking er bekræftet. Tjek venligst din e-mail. Din bekræftelse og link til kundeportalen er sendt."
          : "Din booking er bekræftet, men e-mailen kunne ikke leveres. Du bliver sendt til kundeportalen nu.";

        setFormStatus({
          message: successMessage,
          type: "success",
        });
        window.setTimeout(() => {
          const portalUrl = new URL(payload.portalUrl!, window.location.origin);
          portalUrl.searchParams.set("booking", "confirmed");
          window.location.href = portalUrl.toString();
        }, 1800);
      } catch (error) {
        setFormStatus({
          message:
            error instanceof Error ? error.message : "Kunne ikke oprette bookingen. Prov igen.",
          type: "error",
        });
        setIsSubmitting(false);
      }
    })();
  });

  if (settings.bookingEnabled === false) {
    return (
      <main className="px-4 pb-10 sm:px-6">
        <section className="mx-auto mt-8 max-w-3xl">
          <Card className="p-6">
            <p className="text-sm font-semibold uppercase text-[#6b7780]">Booking</p>
            <h1 className="mt-3 font-display text-3xl font-semibold text-[var(--ink)]">
              Online booking er lukket
            </h1>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              {settings.disabledMessage || "Online booking er midlertidigt lukket."}
            </p>
          </Card>
        </section>
      </main>
    );
  }

  const lookupCard = (
    <Card className="p-5 sm:p-7">
      <p className="text-sm font-semibold uppercase text-[#6b7780]">Booking</p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
        Sla nummerplade op
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--muted)]">
        Indtast nummerpladen og se prisen. Derefter vaelger du pakke, tilvalg,
        tidspunkt og kontaktoplysninger i samme flow.
      </p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitPlateLookup();
        }}
        className="mt-6 grid max-w-xl gap-3"
      >
        <label className="block">
          <span className="sr-only">Dansk nummerplade</span>
          <div className="flex w-full max-w-full overflow-hidden rounded-md border border-[#9cb0bd] bg-white focus-within:border-[#2388d1] focus-within:ring-4 focus-within:ring-[#2388d1]/16">
            <Image
              src="/DKEU.svg"
              alt="DK"
              width={48}
              height={54}
              className="h-[4.35rem] w-14 shrink-0 object-cover"
            />
            <input
              name="plate"
              type="text"
              inputMode="text"
              autoComplete="off"
              autoCapitalize="characters"
              placeholder="AB12345"
              maxLength={10}
              value={plate}
              onChange={(event) => schedulePlateLookup(event.target.value)}
              className="w-0 min-w-0 flex-1 border-0 bg-white px-4 text-[clamp(1.5rem,7vw,3rem)] font-semibold uppercase tracking-[0.08em] text-[#222] outline-none placeholder:text-[#d7d7d7]"
            />
          </div>
        </label>

        <Button type="submit" size="lg" className="h-14 rounded-md" disabled={isLookupPending}>
          {isLookupPending ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
          {isLookupPending ? "Tjekker..." : "Se din pris"}
        </Button>
      </form>

      {lookupStatus ? (
        <div
          className={cn(
            "mt-4 rounded-md border px-4 py-3 text-sm",
            lookupStatus.type === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-[#2388d1]/30 bg-[#eef8ff] text-[#0d526d]"
          )}
        >
          {lookupStatus.message}
        </div>
      ) : null}
    </Card>
  );

  return (
    <main className={cn("px-4 sm:px-6", vehicle && category ? "pb-32 xl:pb-10" : "pb-10")}>
      {vehicle && category ? (
        <section className="mx-auto mt-8 grid max-w-[88rem] gap-8 xl:grid-cols-[minmax(0,1fr)_21rem] xl:items-start">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-end gap-3">
              {isLookupPending ? (
                <span className="inline-flex items-center gap-2 rounded-md bg-white/70 px-3 py-2 text-sm font-semibold text-[#2388d1]">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Tjekker bil...
                </span>
              ) : null}
              <button
                type="button"
                onClick={handleChangeVehicle}
                className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-[var(--ink)] transition hover:bg-white/70 hover:text-[#2388d1]"
              >
                <RotateCcw className="h-4 w-4" />
                Skift bil
              </button>
            </div>

            <Card className="p-5 sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase text-[#2388d1]">Din bil</p>
                  <h2 className="mt-1 font-display text-3xl font-semibold text-[var(--ink)]">
                    {vehicleName}
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-[var(--muted)] sm:text-sm">
                    <span className="rounded-md bg-[#f4f8f7] px-3 py-2">
                      Regnr: <strong className="text-[var(--ink)]">{vehicle.registration_number}</strong>
                    </span>
                    <span className="rounded-md bg-[#f4f8f7] px-3 py-2">
                      Ar: <strong className="text-[var(--ink)]">{vehicle.model_year || "-"}</strong>
                    </span>
                    <span className="rounded-md bg-[#f4f8f7] px-3 py-2">
                      Biltype: <strong className="text-[var(--ink)]">{vehicle.type || "-"}</strong>
                    </span>
                  </div>
                </div>

                <div className="rounded-[1.5rem] bg-[#e9f8ff] px-5 py-4 lg:min-w-56 lg:text-right">
                  <p className="text-sm font-semibold text-[var(--ink)]">{vehicleTypeLabel}</p>
                  <p className="mt-1 text-4xl font-semibold text-[#2388d1]">
                    {formatShortPrice(category.price)}
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-6">
                <div>
                  <Card className="p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2388d1]">
                          Trin 1
                        </p>
                        <h3 className="mt-2 font-display text-3xl font-semibold text-[var(--ink)]">
                          Vaelg pakke
                        </h3>
                      </div>
                      <Sparkles className="h-8 w-8 text-[#55b9df]" />
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                      {settings.catalog.packages.map((item) => {
                        const isActive = item.id === activePackage;
                        const itemPrice = Number(item.price || 0) > 0 ? Number(item.price) : category.price;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setActivePackage(item.id)}
                            className={cn(
                              "flex min-h-52 flex-col rounded-[1.5rem] border p-5 text-left transition",
                              isActive
                                ? "border-[#55b9df] bg-[#f8fdff] shadow-[0_18px_40px_rgba(43,147,220,0.16)]"
                                : "border-[var(--line)] bg-white hover:border-[#8bd4ef]"
                            )}
                          >
                            {item.imageUrl ? (
                              <Image
                                src={item.imageUrl}
                                alt=""
                                width={420}
                                height={220}
                                className="mb-4 h-28 w-full rounded-2xl object-cover"
                              />
                            ) : null}
                            <div className="flex items-start justify-between gap-3">
                              <span className="text-2xl font-semibold text-[var(--ink)]">
                                {item.title}
                              </span>
                              <span className="text-xl font-semibold text-[#55b9df]">
                                {formatShortPrice(itemPrice)}
                              </span>
                            </div>
                            <span
                              className={cn(
                                "mt-3 inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold",
                                item.id === "whole" && isActive
                                  ? "bg-[#78c742] text-white"
                                  : "bg-[#eef2f0] text-[var(--muted)]"
                              )}
                            >
                              {item.badge}
                            </span>
                            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                              {item.description}
                            </p>
                            <div className="mt-5 flex items-center gap-2 text-sm text-[var(--muted)]">
                              <Clock3 className="h-4 w-4" />
                              {item.duration}
                            </div>
                            <div
                              className={cn(
                                "mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold",
                                isActive ? "text-[#2388d1]" : "text-[var(--muted)]"
                              )}
                            >
                              {isActive ? <Check className="h-4 w-4" /> : null}
                              {isActive ? "Valgt" : "Vaelg denne pakke"}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </Card>
                </div>

                <div>
                  <Card className="p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2388d1]">
                          Trin 2
                        </p>
                        <h3 className="mt-2 font-display text-3xl font-semibold text-[var(--ink)]">
                          Tilvalg
                        </h3>
                      </div>
                      <ShieldCheck className="h-8 w-8 text-[#55b9df]" />
                    </div>

                    <div className="mt-5 grid gap-6">
                      <div>
                        <h4 className="text-sm font-semibold uppercase text-[#2388d1]">Indvendigt</h4>
                        <div className="mt-3 grid gap-3">
                          {settings.catalog.interiorAddOns.map((addon) => {
                            const isSelected = selectedAddonIds.includes(addon.id);
                            return (
                              <button
                                key={addon.id}
                                type="button"
                                onClick={() =>
                                  handleAddonToggle({
                                    id: addon.id,
                                    label: addon.label,
                                    price: Number(addon.price || 0),
                                  })
                                }
                                className={cn(
                                  "flex items-center justify-between gap-4 rounded-2xl border px-4 py-4 text-left transition",
                                  isSelected
                                    ? "border-[#55b9df] bg-[#eef8ff] shadow-[0_12px_28px_rgba(43,147,220,0.12)]"
                                    : "border-[var(--line)] bg-white hover:border-[#b3dff0]"
                                )}
                              >
                                <span className="flex items-center gap-3">
                                  {addon.imageUrl ? (
                                    <Image
                                      src={addon.imageUrl}
                                      alt=""
                                      width={56}
                                      height={56}
                                      className="h-12 w-12 rounded-xl object-cover"
                                    />
                                  ) : null}
                                  <span
                                    className={cn(
                                      "flex h-5 w-5 items-center justify-center rounded-md border",
                                      isSelected
                                        ? "border-[#55b9df] bg-[#55b9df] text-white"
                                        : "border-[#9ab2c0] bg-white text-transparent"
                                    )}
                                  >
                                    <Check className="h-3.5 w-3.5" />
                                  </span>
                                  <span className="text-sm font-medium text-[var(--ink)]">
                                    {addon.label}
                                  </span>
                                </span>
                                <span className="text-sm font-semibold text-[var(--ink)]">
                                  {formatShortPrice(Number(addon.price || 0))}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold uppercase text-[#2388d1]">Udvendigt</h4>
                        <div className="mt-3 grid gap-3">
                          <div className="flex items-center justify-between rounded-2xl border border-[#cde6f6] bg-[#f6fbff] px-4 py-4">
                            <span className="flex items-center gap-3 text-sm font-medium text-[var(--ink)]">
                              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#55b9df] text-white">
                                <Check className="h-3.5 w-3.5" />
                              </span>
                              Voksbehandling
                            </span>
                            <span className="text-sm font-semibold text-[#2388d1]">
                              {activePackage === "whole" ? "Inkl." : "Kun inkl. i Hele bilen"}
                            </span>
                          </div>

                          {settings.catalog.exteriorAddOns.map((addon) => {
                            const isSelected = selectedAddonIds.includes(addon.id);
                            return (
                              <button
                                key={addon.id}
                                type="button"
                                onClick={() =>
                                  handleAddonToggle({
                                    id: addon.id,
                                    label: addon.label,
                                    price: Number(addon.price || 0),
                                  })
                                }
                                className={cn(
                                  "flex items-center justify-between gap-4 rounded-2xl border px-4 py-4 text-left transition",
                                  isSelected
                                    ? "border-[#55b9df] bg-[#eef8ff] shadow-[0_12px_28px_rgba(43,147,220,0.12)]"
                                    : "border-[var(--line)] bg-white hover:border-[#b3dff0]"
                                )}
                              >
                                <span className="flex items-center gap-3">
                                  {addon.imageUrl ? (
                                    <Image
                                      src={addon.imageUrl}
                                      alt=""
                                      width={56}
                                      height={56}
                                      className="h-12 w-12 rounded-xl object-cover"
                                    />
                                  ) : null}
                                  <span
                                    className={cn(
                                      "flex h-5 w-5 items-center justify-center rounded-md border",
                                      isSelected
                                        ? "border-[#55b9df] bg-[#55b9df] text-white"
                                        : "border-[#9ab2c0] bg-white text-transparent"
                                    )}
                                  >
                                    <Check className="h-3.5 w-3.5" />
                                  </span>
                                  <span className="text-sm font-medium text-[var(--ink)]">
                                    {addon.label}
                                  </span>
                                </span>
                                <span className="text-sm font-semibold text-[var(--ink)]">
                                  {formatShortPrice(Number(addon.price || 0))}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="rounded-[1.5rem] border border-dashed border-[#cde6f6] bg-[#fbfeff] px-4 py-4 text-sm text-[var(--muted)]">
                        <p className="font-semibold text-[var(--ink)]">Manuelle tilvalg</p>
                        <p className="mt-2">
                          {settings.catalog.quantityAddOns.map((item) => item.label).join(" og ")}{" "}
                          kan stadig laegges pa senere. De er bevaret i systemet, men har ikke
                          automatisk prisberegning endnu.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div>
                  <Card className="p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2388d1]">
                          Trin 3
                        </p>
                        <h3 className="mt-2 font-display text-3xl font-semibold text-[var(--ink)]">
                          Vaelg dato og tidspunkt
                        </h3>
                      </div>
                      <CalendarDays className="h-8 w-8 text-[#55b9df]" />
                    </div>

                    <div className="mt-5 grid gap-6 lg:grid-cols-[1.06fr_0.94fr]">
                      <div className="rounded-[1.5rem] border border-[var(--line)] p-4">
                        <DayPicker
                          mode="single"
                          selected={appointmentDate}
                          onSelect={setAppointmentDate}
                          locale={da}
                          weekStartsOn={1}
                          showOutsideDays
                          disabled={(date) => {
                            const dateValue = format(date, "yyyy-MM-dd");
                            return (
                              date < toCalendarDate(minDate) ||
                              date > maxBookableDate ||
                              !isWorkingDay(date, settings.workingDays) ||
                              isDateBlocked(dateValue, availabilityBlocks)
                            );
                          }}
                        />
                      </div>

                      <div className="rounded-[1.5rem] border border-[var(--line)] p-4">
                        <p className="text-sm font-semibold text-[var(--ink)]">Ledige tider</p>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          {availableTimeSlots.map((slot) => {
                            const isActive = slot === appointmentTime;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedAppointmentTime(slot)}
                                className={cn(
                                  "rounded-xl border px-4 py-3 text-sm font-semibold transition",
                                  isActive
                                    ? "border-[#55b9df] bg-[#6ec7eb] text-[#083047]"
                                    : "border-[var(--line)] bg-[#f6f8fa] text-[var(--ink)] hover:border-[#8bd4ef]"
                                )}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                        {availableTimeSlots.length === 0 ? (
                          <p className="mt-4 text-sm text-[var(--muted)]">
                            Der er ingen ledige tider pa den valgte dag. Vaelg en anden dag i
                            kalenderen.
                          </p>
                        ) : null}
                        <p className="mt-4 text-sm text-[var(--muted)]">
                          {settings.defaultBookingStatus === "approved"
                            ? "Denne booking bliver godkendt automatisk, og du faar bekraeftelsen pa email med det samme."
                            : "Denne booking starter som afventer, og vi sender en ny email, saa snart tiden er godkendt."}
                        </p>
                        <p className="mt-3 text-sm text-[var(--muted)]">{areaCoverageHint}</p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div>
                  <Card id="booking-details" className="p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2388d1]">
                          Trin 4
                        </p>
                        <h3 className="mt-2 font-display text-3xl font-semibold text-[var(--ink)]">
                          Dine oplysninger
                        </h3>
                      </div>
                      <UserRound className="h-8 w-8 text-[#55b9df]" />
                    </div>

                    <form onSubmit={onSubmit} className="mt-5 space-y-6">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <button
                          type="button"
                          onClick={() => form.setValue("customerType", "private")}
                          className={cn(
                            "rounded-2xl border px-4 py-4 text-sm font-semibold transition",
                            customerType === "private"
                              ? "border-[#55b9df] bg-[#eef8ff] text-[#2388d1]"
                              : "border-[var(--line)] bg-white text-[var(--ink)]"
                          )}
                        >
                          Privat
                        </button>
                        <button
                          type="button"
                          onClick={() => form.setValue("customerType", "business")}
                          className={cn(
                            "rounded-2xl border px-4 py-4 text-sm font-semibold transition",
                            customerType === "business"
                              ? "border-[#55b9df] bg-[#eef8ff] text-[#2388d1]"
                              : "border-[var(--line)] bg-white text-[var(--ink)]"
                          )}
                        >
                          Erhverv
                        </button>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Fornavn" error={form.formState.errors.firstName?.message}>
                          <Input {...form.register("firstName")} placeholder="Fornavn" />
                        </Field>
                        <Field label="Efternavn" error={form.formState.errors.lastName?.message}>
                          <Input {...form.register("lastName")} placeholder="Efternavn" />
                        </Field>
                        <Field label="Email" error={form.formState.errors.email?.message}>
                          <Input {...form.register("email")} type="email" placeholder="Email" />
                        </Field>
                        <Field label="Telefon" error={form.formState.errors.phone?.message}>
                          <Input {...form.register("phone")} placeholder="Telefon" />
                        </Field>
                        {customerType === "business" ? (
                          <>
                            <Field label="Firmanavn" error={form.formState.errors.company?.message}>
                              <Input {...form.register("company")} placeholder="Firmanavn" />
                            </Field>
                            <Field label="CVR / EAN">
                              <Input {...form.register("companyId")} placeholder="CVR eller EAN" />
                            </Field>
                          </>
                        ) : null}
                        <Field
                          label="Adresse"
                          className="md:col-span-2"
                          error={form.formState.errors.address?.message}
                        >
                          <Input {...form.register("address")} placeholder="Adresse" />
                        </Field>
                        <Field label="Postnr." error={form.formState.errors.postalCode?.message}>
                          <Input {...form.register("postalCode")} placeholder="Postnr." />
                        </Field>
                        <Field label="By" error={form.formState.errors.city?.message}>
                          <Input {...form.register("city")} placeholder="By" />
                        </Field>
                        <Field className="md:col-span-2" label="Bemaerkninger (valgfrit)">
                          <Textarea
                            {...form.register("notes")}
                            placeholder="Fx parkering, adgang, saerlige onsker..."
                          />
                        </Field>
                      </div>

                      <div className="space-y-3 text-sm">
                        <div className="rounded-[1.5rem] border border-[#cde6f6] bg-[#f6fbff] px-4 py-4 text-[#1a506d]">
                          <p className="flex items-center gap-2 font-semibold text-[var(--ink)]">
                            <Mail className="h-4 w-4 text-[#2388d1]" />
                            Emailopdateringer
                          </p>
                          <p className="mt-2 leading-6">{bookingStatusHint}</p>
                        </div>
                        <label className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            className="mt-1 h-4 w-4 rounded border-[#9cb0bd]"
                            {...form.register("acceptsTerms")}
                          />
                          <span>
                            Jeg accepterer handelsbetingelserne og persondatapolitikken
                          </span>
                        </label>
                        {form.formState.errors.acceptsTerms?.message ? (
                          <p className="-mt-1 text-sm text-red-600">
                            {form.formState.errors.acceptsTerms.message}
                          </p>
                        ) : null}
                        <label className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            className="mt-1 h-4 w-4 rounded border-[#9cb0bd]"
                            {...form.register("wantsMarketing")}
                          />
                          <span>Ja tak, jeg vil gerne modtage tilbud og nyheder</span>
                        </label>
                      </div>

                      {formStatus ? (
                        <div
                          className={cn(
                            "rounded-xl border px-4 py-3 text-sm",
                            formStatus.type === "success"
                              ? "border-[#b7e6cb] bg-[#effaf4] text-[#16643f]"
                              : "border-red-200 bg-red-50 text-red-700"
                          )}
                        >
                          {formStatus.message}
                        </div>
                      ) : null}

                      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <LoaderCircle className="h-5 w-5 animate-spin" />
                        ) : (
                          <Check className="h-5 w-5" />
                        )}
                        {isSubmitting ? "Sender booking..." : `Book nu | ${formatShortPrice(total)}`}
                      </Button>
                    </form>
                  </Card>
                </div>
            </div>
          </div>

          <aside className="hidden xl:sticky xl:top-28 xl:block">
            <Card className="rounded-lg border-[#d8e5ea] p-6 shadow-none">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#e9f8ff] text-[#2388d1]">
                  <CalendarDays className="h-5 w-5" />
                </span>
                <h3 className="font-display text-2xl font-semibold text-[var(--ink)]">
                  Din booking
                </h3>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-lg bg-[#f8fafb] px-4 py-4">
                  <SummaryRow label="Bil" value={vehicleName} />
                  <div className="mt-3 border-t border-[#dce8ed] pt-3">
                    <SummaryRow label={activePackageData.title} value={formatPrice(basePrice)} />
                  </div>
                  <p className="mt-2 text-xs font-medium text-[var(--muted)]">
                    {vehicle.registration_number} | {vehicleTypeLabel}
                  </p>
                </div>

                <div className="rounded-lg bg-[#f8fafb] px-4 py-4">
                  <SummaryRow label="Dato og tid" value={appointmentLabel} />
                </div>

                <div className="rounded-lg bg-[#f8fafb] px-4 py-4">
                  <SummaryRow
                    label="Serviceomrade"
                    value={matchedArea ? matchedArea.label : "Standard daekning"}
                  />
                  {travelSurcharge > 0 ? (
                    <div className="mt-3 border-t border-[#dce8ed] pt-3">
                      <SummaryRow
                        label="Koerselstillaeg"
                        value={formatPrice(travelSurcharge)}
                      />
                    </div>
                  ) : null}
                </div>

                {selectedAddons.length > 0 ? (
                  <div className="rounded-lg bg-[#f8fafb] px-4 py-4 text-sm">
                    <p className="font-semibold text-[var(--ink)]">Tilvalg</p>
                    <div className="mt-2 space-y-2">
                      {selectedAddons.map((addon) => (
                        <SummaryRow
                          key={addon.id}
                          label={addon.label}
                          value={formatPrice(addon.price)}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="rounded-lg bg-[#eef8ff] px-4 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-[var(--ink)]">Total</span>
                    <span className="text-2xl font-semibold text-[#55b9df]">
                      {formatShortPrice(total)}
                    </span>
                  </div>
                  <p className="mt-1 text-right text-xs font-medium text-[var(--muted)]">
                    inkl. moms
                  </p>
                </div>

              </div>
            </Card>
          </aside>

          {isMobileSummaryOpen ? (
            <div className="fixed inset-0 z-[60] flex items-end bg-black/55 px-3 xl:hidden">
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-booking-summary-title"
                className="mx-auto flex max-h-[calc(100dvh-3rem)] max-w-xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-[0_-20px_60px_rgba(0,0,0,0.22)]"
              >
                <div className="flex items-start justify-between gap-4 border-b border-[#e1edf2] px-5 py-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#e9f8ff] text-[#55b9df]">
                        <CalendarDays className="h-4 w-4" />
                      </span>
                      <h3
                        id="mobile-booking-summary-title"
                        className="font-display text-xl font-semibold text-[var(--ink)]"
                      >
                        Din booking
                      </h3>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-[var(--muted)]">
                      1 bil · 1 service
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMobileSummaryOpen(false)}
                    aria-label="Luk bookingoversigt"
                    className="rounded-md p-2 text-[var(--muted)] transition hover:bg-[#f2f7f9] hover:text-[var(--ink)]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4 overflow-y-auto px-5 py-4">
                  <div className="rounded-lg bg-[#f8fafb] px-4 py-4">
                    <p className="text-sm font-semibold text-[var(--ink)]">{activePackageData.title}</p>
                    <div className="mt-4 flex items-start justify-between gap-4 border-t border-[#dce8ed] pt-4">
                      <div>
                        <p className="font-semibold text-[var(--ink)]">{activePackageData.title}</p>
                        <p className="mt-2 text-xs font-medium text-[var(--muted)]">
                          {vehicle.registration_number} | {vehicleTypeLabel}
                        </p>
                      </div>
                      <strong className="shrink-0 text-[var(--ink)]">{formatPrice(basePrice)}</strong>
                    </div>

                    {selectedAddons.length > 0 ? (
                      <div className="mt-3 space-y-1 text-sm">
                        {selectedAddons.map((addon) => (
                          <div key={addon.id} className="flex items-center justify-between gap-3">
                            <span className="text-[var(--ink)]">+ {addon.label}</span>
                            <strong className="shrink-0 text-[var(--ink)]">
                              +{formatPrice(addon.price)}
                            </strong>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className="rounded-lg bg-[#f8fafb] px-4 py-4">
                    <p className="font-semibold text-[var(--ink)]">Tidspunkt</p>
                    <div className="mt-3 border-t border-[#dce8ed] pt-3 text-sm text-[var(--ink)]">
                      <p className="font-semibold">{appointmentDateLabel || appointmentLabel}</p>
                      <p className="mt-1 text-[var(--muted)]">kl. {appointmentTime || "-"}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Input placeholder="Rabatkode" />
                    <Button type="button" variant="outline" className="shrink-0" disabled>
                      Tilfoj
                    </Button>
                  </div>

                  <div className="rounded-lg bg-[#eef8ff] px-4 py-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-lg font-semibold text-[var(--ink)]">Total</span>
                      <span className="text-2xl font-semibold text-[#55b9df]">
                        {formatShortPrice(total)}
                      </span>
                    </div>
                    <p className="mt-1 text-right text-xs font-medium text-[var(--muted)]">
                      inkl. moms
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#e1edf2] bg-white px-5 py-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileSummaryOpen(false);
                      document
                        .getElementById("booking-details")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="flex h-13 w-full items-center justify-center rounded-md bg-[#78cdea] px-4 text-sm font-semibold text-[#123549]"
                  >
                    Fortsaet booking · {formatShortPrice(total)}
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          <div
            className={cn(
              "fixed inset-x-0 bottom-0 z-50 border-t border-[#d8e5ea] bg-white/95 px-4 py-3 shadow-[0_-16px_40px_rgba(8,27,21,0.12)] backdrop-blur xl:hidden",
              isMobileSummaryOpen && "hidden"
            )}
          >
            <div className="mx-auto flex max-w-xl items-center gap-2 overflow-hidden">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#e9f8ff] text-[#55b9df]">
                <CalendarDays className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xl font-semibold leading-none text-[#2388d1]">
                  {formatShortPrice(total)}
                </p>
                <p className="mt-1 truncate text-xs font-medium text-[var(--muted)]">
                  {activePackageData.title} | {appointmentLabel}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileSummaryOpen(true)}
                className="inline-flex h-11 shrink-0 items-center justify-center rounded-md bg-[#55b9df] px-3 text-sm font-semibold text-white"
              >
                Se oversigt
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="mx-auto mt-8 max-w-6xl">{lookupCard}</section>
      )}
    </main>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("grid gap-2 text-sm text-[var(--ink)]", className)}>
      <span className="font-medium">{label}</span>
      {children}
      {error ? <span className="text-sm text-red-600">{error}</span> : null}
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-[var(--muted)]">{label}</span>
      <strong className="max-w-[14rem] text-right text-[var(--ink)]">{value}</strong>
    </div>
  );
}
