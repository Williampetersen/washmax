import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import {
  generateSimpleInvoicePdf,
  isSimplePdfBuffer,
} from "@/server/invoices/generateSimpleInvoicePdf";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET() {
  const cookieStore = await cookies();
  const session = getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  if (!session) {
    return NextResponse.json(
      { success: false, code: "UNAUTHORIZED", message: "Unauthorized." },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const buffer = await generateSimpleInvoicePdf({
      invoiceNumber: "CW-SELF-TEST",
      invoiceDate: new Intl.DateTimeFormat("da-DK").format(new Date()),
      bookingId: "self-test",
      customerName: "Production self-test",
      customerEmail: "self-test@cleanwash.dk",
      customerPhone: "-",
      customerAddress: "-",
      vehicle: "Test vehicle",
      registrationNumber: "TEST123",
      service: "PDF engine self-test",
      appointment: "-",
      lines: [
        {
          description: "PDF engine self-test",
          quantity: 1,
          unitPriceDkk: 100,
          totalDkk: 100,
        },
      ],
      subtotalExVatDkk: 80,
      vatDkk: 20,
      totalDkk: 100,
      currency: "DKK",
    });
    const startsWithPDF = isSimplePdfBuffer(buffer);

    return NextResponse.json(
      {
        success: startsWithPDF,
        bytes: buffer.byteLength,
        startsWithPDF,
        code: startsWithPDF ? undefined : "PDF_ENGINE_FAILED",
      },
      {
        status: startsWithPDF ? 200 : 500,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    console.error("[invoice.pdf-self-test] failed", {
      errorName: error instanceof Error ? error.name : undefined,
      errorMessage: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      {
        success: false,
        code: "PDF_ENGINE_FAILED",
        message: "PDF engine failed in production.",
      },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
