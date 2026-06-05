import type { Metadata } from "next";
import { BookingFlow } from "@/components/booking/booking-flow";
import { getBookingSettingsFromSetup, getSetupAvailabilityBlocks } from "@/lib/server/booking-setup";
import { sanitizePlate } from "@/lib/shared/booking";

export const metadata: Metadata = {
  title: "Booking",
  description: "Vaelg rengoring, tilvalg og se samlet pris for din bil hos WashMax.",
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
  const minDate = new Date().toISOString().slice(0, 10);

  return (
    <BookingFlow
      initialPlate={sanitizePlate(initialPlate)}
      minDate={minDate}
      settings={bookingSettings}
      availabilityBlocks={availabilityBlocks}
    />
  );
}
