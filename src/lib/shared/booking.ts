export type CleaningPackage = {
  id: string;
  title: string;
  description: string;
  duration: string;
  badge: string;
};

export type AddOn = {
  id: string;
  label: string;
  price?: number;
};

export type VehicleCategory = {
  id: string;
  label: string;
  price: number;
  description: string;
};

export type BookingStatus = "pending" | "approved" | "completed" | "cancelled";
export type CustomerType = "private" | "business";

export type VehicleLookupResult = {
  registration_number: string;
  make: string | null;
  model: string | null;
  model_year: number | null;
  color: string | null;
  type: string | null;
  total_weight: number | null;
  chassis_type: string | null;
};

export type BookingSettings = {
  companyName: string;
  supportEmail: string;
  adminNotifyEmail: string;
  startHour: number;
  endHour: number;
  slotMinutes: number;
};

export const cleaningPackages: CleaningPackage[] = [
  {
    id: "whole",
    title: "Hele bilen",
    description: "Grundig og professionel rengoring af hele bilen.",
    duration: "85 - 130 min.",
    badge: "Gratis voks",
  },
  {
    id: "inside",
    title: "Indvendigt",
    description: "Grundig og professionel indvendig rengoring.",
    duration: "60 - 80 min.",
    badge: "Kabine",
  },
  {
    id: "outside",
    title: "Udvendigt",
    description: "Grundig og professionel udvendig rengoring.",
    duration: "50 - 70 min.",
    badge: "Finish",
  },
];

export const vehicleCategories: VehicleCategory[] = [
  {
    id: "van",
    label: "Varevogn",
    price: 1500,
    description: "Varebil eller totalvaegt over 2.500 kg.",
  },
  {
    id: "large",
    label: "Stor bil",
    price: 999,
    description: "Stor familiebil, SUV eller totalvaegt over 2.000 kg.",
  },
  {
    id: "medium",
    label: "Mellem bil",
    price: 899,
    description: "Almindelig personbil med totalvaegt over 1.300 kg.",
  },
  {
    id: "small",
    label: "Lille bil",
    price: 799,
    description: "Kompakt bil under eller lig 1.300 kg.",
  },
];

export const interiorAddOns: AddOn[] = [
  { id: "dyrehaar", label: "Dyrehar", price: 299 },
  { id: "ekstra-beskidt", label: "Ekstra beskidt", price: 299 },
  { id: "laederpleje", label: "Laederpleje af saeder", price: 399 },
  { id: "toemning-foererkabine", label: "Toemning af foererkabine", price: 99 },
  { id: "vinylpleje", label: "Vinylpleje", price: 249 },
  { id: "gummimaatter", label: "Pleje af gummimaatter", price: 99 },
  { id: "ventilationsrens", label: "Ventilationsrens", price: 99 },
  { id: "hulrumsrengoering", label: "Hulrumsrengoering", price: 99 },
];

export const quantityAddOns: AddOn[] = [
  { id: "saederens", label: "Dybdegaende saederens" },
  { id: "boernesaeder", label: "Rens af boernesaeder" },
];

export const exteriorAddOns: AddOn[] = [
  { id: "lakrens", label: "Lakrens (tjaerepletter, mm.)", price: 199 },
  { id: "faelgrens", label: "Ekstra faelgrens", price: 149 },
  { id: "daekshine", label: "Daekshine", price: 99 },
  { id: "vinylpleje-udvendig", label: "Vinylpleje udvendig", price: 199 },
];

export const bookingStatuses: BookingStatus[] = [
  "pending",
  "approved",
  "completed",
  "cancelled",
];

export const defaultBookingSettings: BookingSettings = {
  companyName: "WashMax",
  supportEmail: "info@washmax.dk",
  adminNotifyEmail: "",
  startHour: 8,
  endHour: 18,
  slotMinutes: 150,
};

export const sanitizePlate = (plate: string) =>
  plate
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 10);

export const buildVehicleName = (vehicle?: Partial<VehicleLookupResult> | null) =>
  [vehicle?.make, vehicle?.model].filter(Boolean).join(" ") || "Din bil";

export const getVehicleCategory = (vehicle?: Partial<VehicleLookupResult> | null) => {
  const type = String(vehicle?.type || "").toLowerCase();
  const totalWeight = Number(vehicle?.total_weight || 0);

  if (type === "varebil" || totalWeight > 2500) return vehicleCategories[0];
  if (totalWeight > 2000) return vehicleCategories[1];
  if (totalWeight > 1300) return vehicleCategories[2];
  return vehicleCategories[3];
};

export const formatPrice = (price: number) =>
  `${Math.round(price).toLocaleString("da-DK")} kr`;

export const formatShortPrice = (price: number) =>
  `${Math.round(price).toLocaleString("da-DK")},-`;

export const formatDateTimeLabel = (
  appointmentDate: string,
  appointmentTime: string,
  locale = "da-DK"
) => {
  try {
    const date = new Date(`${appointmentDate}T${appointmentTime}:00`);
    return `${date.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    })} kl. ${appointmentTime}`;
  } catch {
    return `${appointmentDate} kl. ${appointmentTime}`;
  }
};

export const getTimeSlots = (settings: BookingSettings) => {
  const slots: string[] = [];
  const startMinutes = settings.startHour * 60;
  const endMinutes = settings.endHour * 60;

  for (
    let minutes = startMinutes;
    minutes + settings.slotMinutes <= endMinutes;
    minutes += settings.slotMinutes
  ) {
    const hours = Math.floor(minutes / 60)
      .toString()
      .padStart(2, "0");
    const mins = (minutes % 60).toString().padStart(2, "0");
    slots.push(`${hours}:${mins}`);
  }

  return slots;
};

export const getPackageTitle = (packageId: string) =>
  cleaningPackages.find((item) => item.id === packageId)?.title ?? "Hele bilen";

export const getStatusLabel = (status: BookingStatus) => {
  switch (status) {
    case "approved":
      return "Godkendt";
    case "completed":
      return "Afsluttet";
    case "cancelled":
      return "Annulleret";
    default:
      return "Afventer";
  }
};

export const getStatusTone = (status: BookingStatus) => {
  switch (status) {
    case "approved":
      return "bg-[#ebf8f1] text-[#1f7a4b]";
    case "completed":
      return "bg-[#eef8ff] text-[#1f6aa4]";
    case "cancelled":
      return "bg-[#fff0f0] text-[#c43d3d]";
    default:
      return "bg-[#fff7e8] text-[#9a6a14]";
  }
};
