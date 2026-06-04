import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { getBookingSettings, saveBookingSettings } from "@/lib/server/bookings";
import type { AddOn, CleaningPackage, ServiceArea, VehicleCategory } from "@/lib/shared/booking";

const asText = (value: FormDataEntryValue | null) => String(value || "").trim();
const asNumber = (value: FormDataEntryValue | null, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const updatePackages = (formData: FormData, packages: CleaningPackage[]) =>
  packages.map((item) => ({
    ...item,
    title: asText(formData.get(`package_title_${item.id}`)) || item.title,
    description: asText(formData.get(`package_description_${item.id}`)) || item.description,
    duration: asText(formData.get(`package_duration_${item.id}`)) || item.duration,
    estimatedMinutes: asNumber(
      formData.get(`package_estimated_minutes_${item.id}`),
      item.estimatedMinutes
    ),
    badge: asText(formData.get(`package_badge_${item.id}`)) || item.badge,
  }));

const updateVehicleCategories = (formData: FormData, categories: VehicleCategory[]) =>
  categories.map((item) => ({
    ...item,
    label: asText(formData.get(`vehicle_label_${item.id}`)) || item.label,
    description:
      asText(formData.get(`vehicle_description_${item.id}`)) || item.description,
    price: asNumber(formData.get(`vehicle_price_${item.id}`), item.price),
  }));

const updatePricedAddOns = (
  formData: FormData,
  addOns: AddOn[],
  prefix: "interior" | "exterior"
) =>
  addOns.map((item) => ({
    ...item,
    label: asText(formData.get(`${prefix}_label_${item.id}`)) || item.label,
    price: asNumber(formData.get(`${prefix}_price_${item.id}`), Number(item.price || 0)),
  }));

const updateLabelOnlyAddOns = (formData: FormData, addOns: AddOn[], prefix: "quantity") =>
  addOns.map((item) => ({
    ...item,
    label: asText(formData.get(`${prefix}_label_${item.id}`)) || item.label,
  }));

const sortAreas = (areas: ServiceArea[]) =>
  [...areas].sort((left, right) => left.label.localeCompare(right.label, "da-DK"));

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const formData = await request.formData();
  const section = asText(formData.get("section")) || "general";
  const returnView = asText(formData.get("return_view")) || section || "settings";
  const settings = await getBookingSettings();

  switch (section) {
    case "availability": {
      const workingDays = formData
        .getAll("working_days")
        .map((value) => Number(value))
        .filter((value) => Number.isInteger(value) && value >= 0 && value <= 6);

      await saveBookingSettings({
        ...settings,
        startHour: asNumber(formData.get("start_hour"), settings.startHour),
        endHour: asNumber(formData.get("end_hour"), settings.endHour),
        slotMinutes: asNumber(formData.get("slot_minutes"), settings.slotMinutes),
        travelBufferMinutes: asNumber(
          formData.get("travel_buffer_minutes"),
          settings.travelBufferMinutes
        ),
        workingDays: workingDays.length > 0 ? workingDays : settings.workingDays,
      });
      break;
    }

    case "emails": {
      await saveBookingSettings({
        ...settings,
        emailAutomation: {
          customerOnCreate: Boolean(formData.get("customer_on_create")),
          customerOnApprove: Boolean(formData.get("customer_on_approve")),
          customerOnComplete: Boolean(formData.get("customer_on_complete")),
          customerOnCancel: Boolean(formData.get("customer_on_cancel")),
          adminOnCreate: Boolean(formData.get("admin_on_create")),
        },
      });
      break;
    }

    case "services": {
      await saveBookingSettings({
        ...settings,
        catalog: {
          packages: updatePackages(formData, settings.catalog.packages),
          vehicleCategories: updateVehicleCategories(
            formData,
            settings.catalog.vehicleCategories
          ),
          interiorAddOns: updatePricedAddOns(
            formData,
            settings.catalog.interiorAddOns,
            "interior"
          ),
          quantityAddOns: updateLabelOnlyAddOns(
            formData,
            settings.catalog.quantityAddOns,
            "quantity"
          ),
          exteriorAddOns: updatePricedAddOns(
            formData,
            settings.catalog.exteriorAddOns,
            "exterior"
          ),
        },
      });
      break;
    }

    case "areas": {
      const mode = asText(formData.get("area_action")) || "update";
      const areaId = asText(formData.get("area_id")) || `area_${Date.now().toString(36)}`;

      if (mode === "delete") {
        await saveBookingSettings({
          ...settings,
          serviceAreas: settings.serviceAreas.filter((area) => area.id !== areaId),
        });
        break;
      }

      const nextArea: ServiceArea = {
        id: areaId,
        label: asText(formData.get("label")) || "Nyt omrade",
        postalPrefixes: asText(formData.get("postal_prefixes"))
          .split(/[\n,]+/)
          .map((value) => value.trim())
          .filter(Boolean),
        cityHints: asText(formData.get("city_hints")),
        surcharge: asNumber(formData.get("surcharge"), 0),
        notes: asText(formData.get("notes")),
        isActive: Boolean(formData.get("is_active")),
      };

      const existingIndex = settings.serviceAreas.findIndex((area) => area.id === areaId);
      const serviceAreas =
        existingIndex === -1
          ? [...settings.serviceAreas, nextArea]
          : settings.serviceAreas.map((area) => (area.id === areaId ? nextArea : area));

      await saveBookingSettings({
        ...settings,
        serviceAreas: sortAreas(serviceAreas),
      });
      break;
    }

    default: {
      await saveBookingSettings({
        ...settings,
        companyName: asText(formData.get("company_name")) || settings.companyName,
        supportEmail: asText(formData.get("support_email")) || settings.supportEmail,
        adminNotifyEmail:
          asText(formData.get("admin_notify_email")) || settings.adminNotifyEmail,
        defaultBookingStatus:
          asText(formData.get("default_booking_status")) === "approved" ? "approved" : "pending",
      });
      break;
    }
  }

  return NextResponse.redirect(
    new URL(`/admin?view=${encodeURIComponent(returnView)}&saved=settings`, request.url),
    303
  );
}
