import type { Metadata } from "next";
import { BookingFlow } from "@/components/booking/booking-flow";
import { getCopenhagenNow } from "@/lib/server/availability";
import { getBookingSettingsFromSetup, getSetupAvailabilityBlocks } from "@/lib/server/booking-setup";
import { sanitizePlate } from "@/lib/shared/booking";

export const metadata: Metadata = {
  title: "Book bilvask",
  description:
    "Book mobil bilvask hos Wash Max. Vælg indvendig bilvask, udvendig bilvask eller komplet bilpleje i København og på Sjælland.",
  alternates: {
    canonical: "/booking",
  },
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialPlate = Array.isArray(params.plate) ? params.plate[0] : params.plate || "";
  const bookingSettings = await getBookingSettingsFromSetup();
  const availabilityBlocks = await getSetupAvailabilityBlocks();
  const minDate = getCopenhagenNow().date;

  return (
    <BookingFlow
      initialPlate={sanitizePlate(initialPlate)}
      minDate={minDate}
      settings={bookingSettings}
      availabilityBlocks={availabilityBlocks}
    />
  );
}
