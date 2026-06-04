import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import {
  createAvailabilityBlock,
  deleteAvailabilityBlock,
} from "@/lib/server/bookings";

const asText = (value: FormDataEntryValue | null) => String(value || "").trim();

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const formData = await request.formData();
  const action = asText(formData.get("action")) || "create";
  const returnView = asText(formData.get("return_view")) || "availability";
  const redirectWith = (query: string) =>
    NextResponse.redirect(
      new URL(`/admin?view=${encodeURIComponent(returnView)}&${query}`, request.url),
      303
    );

  try {
    if (action === "delete") {
      const blockId = asText(formData.get("block_id"));
      if (!blockId) {
        return redirectWith("error=action");
      }

      await deleteAvailabilityBlock(blockId);
    } else {
      const startDate = asText(formData.get("start_date"));
      if (!startDate) {
        return redirectWith("error=action");
      }

      await createAvailabilityBlock({
        startDate,
        endDate: asText(formData.get("end_date")) || startDate,
        startTime: asText(formData.get("start_time")) || "00:00",
        endTime: asText(formData.get("end_time")) || "23:59",
        reason: asText(formData.get("reason")) || "Blokeret",
      });
    }

    return redirectWith("saved=availability");
  } catch (error) {
    console.error("Could not update availability", error);
    return redirectWith("error=action");
  }
}
