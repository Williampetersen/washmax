import type { Metadata } from "next";
import { BookingFlow } from "@/components/booking/booking-flow";
<<<<<<< HEAD
import { getCopenhagenNow } from "@/lib/server/availability";
import { getBookingSettingsFromSetup, getSetupAvailabilityBlocks } from "@/lib/server/booking-setup";
=======
import { getBookingSetupData } from "@/lib/server/booking-setup";
>>>>>>> ac175710bc5eca8986bbd839ea75a3fe57e35559
import { sanitizePlate } from "@/lib/shared/booking";

export const metadata: Metadata = {
  title: "Book bilvask",
  description:
    "Book mobil bilvask hos CleanWash. Vælg indvendig bilvask, udvendig bilvask eller komplet bilpleje i København og på Sjælland.",
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
<<<<<<< HEAD
  const bookingSettings = await getBookingSettingsFromSetup();
  const availabilityBlocks = await getSetupAvailabilityBlocks();
  const minDate = getCopenhagenNow().date;
=======
  const setupData = await getBookingSetupData();
  const bookingSettings = setupData.publicSettings;
  const availabilityBlocks = setupData.unavailableDates.map((item) => ({
    id: item.id,
    startDate: item.startDate,
    endDate: item.endDate,
    startTime: item.isFullDay ? "00:00" : item.startTime,
    endTime: item.isFullDay ? "23:59" : item.endTime,
    reason: item.title,
  }));
  const minDate = new Date().toISOString().slice(0, 10);
>>>>>>> ac175710bc5eca8986bbd839ea75a3fe57e35559

  return (
    <BookingFlow
      initialPlate={sanitizePlate(initialPlate)}
      minDate={minDate}
      settings={bookingSettings}
      availabilityBlocks={availabilityBlocks}
    />
  );
}
