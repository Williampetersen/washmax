import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { getServerEnvironmentSummary } from "@/lib/server/env";
import { isMailConfigured } from "@/lib/server/mail";
import { getSimpleInvoiceDiagnostics } from "@/lib/server/simple-invoice-workflow";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET() {
  const cookieStore = await cookies();
  const session = getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  if (!session) {
    return NextResponse.json(
      {
        success: false,
        code: "UNAUTHORIZED",
        message: "Unauthorized.",
      },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  const database = await getSimpleInvoiceDiagnostics();
  const environment = getServerEnvironmentSummary();
  const success =
    database.databaseConnected &&
    database.invoicesTableExists &&
    database.pdfDataColumnExists &&
    database.pdfDataColumnType === "bytea";

  return NextResponse.json(
    {
      success,
      hasDatabaseUrl: database.hasDatabaseUrl,
      databaseConnected: database.databaseConnected,
      invoicesTableExists: database.invoicesTableExists,
      pdfDataColumnExists: database.pdfDataColumnExists,
      pdfDataColumnType: database.pdfDataColumnType,
      smtpConfigured: isMailConfigured(),
      appUrlConfigured: environment.appUrlConfigured,
      errorCode: database.errorCode || undefined,
    },
    {
      status: success ? 200 : 503,
      headers: { "Cache-Control": "no-store" },
    }
  );
}
