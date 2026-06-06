import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { getInvoiceDatabaseDiagnostics } from "@/lib/server/db";
import { getServerEnvironmentSummary } from "@/lib/server/env";
import { isMailConfigured } from "@/lib/server/mail";

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

  const database = await getInvoiceDatabaseDiagnostics();
  const environment = getServerEnvironmentSummary();
  const success =
    database.databaseConnected &&
    database.schemaReady &&
    database.invoicesTableExists &&
    Object.values(database.requiredColumns).every(Boolean);

  return NextResponse.json(
    {
      success,
      hasDatabaseUrl: database.hasDatabaseUrl,
      databaseConnected: database.databaseConnected,
      schemaReady: database.schemaReady,
      invoicesTableExists: database.invoicesTableExists,
      requiredColumns: database.requiredColumns,
      columnTypes: database.columnTypes,
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
