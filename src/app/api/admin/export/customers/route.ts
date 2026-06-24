import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { getSql, isDatabaseConfigured } from "@/lib/server/db";

type RawCustomer = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  address: string | null;
  postal_code: string | null;
  city: string | null;
  notes: string | null;
  customer_type: string | null;
  company: string | null;
  company_id: string | null;
  marketing_opt_in: boolean | null;
  tags_json: unknown;
  created_at: Date | null;
  updated_at: Date | null;
};

export async function GET(request: Request) {
  const cookieStore = await cookies();
  if (!getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const sql = getSql();
  const rows = await sql<RawCustomer[]>`
    SELECT
      c.*,
      COUNT(b.id) AS bookings_count,
      COALESCE(SUM(b.total_price), 0) AS total_spent
    FROM customers c
    LEFT JOIN bookings b ON b.customer_id = c.id
    GROUP BY c.id
    ORDER BY c.created_at DESC;
  `;

  const data = rows.map((r) => ({
    ID: r.id,
    Fornavn: r.first_name ?? "",
    Efternavn: r.last_name ?? "",
    Email: r.email,
    Telefon: r.phone ?? "",
    Adresse: r.address ?? "",
    Postnummer: r.postal_code ?? "",
    By: r.city ?? "",
    Kundetype: r.customer_type === "business" ? "Erhverv" : "Privat",
    Firma: r.company ?? "",
    CVR: r.company_id ?? "",
    "Marketing opt-in": r.marketing_opt_in ? "Ja" : "Nej",
    Tags: Array.isArray(r.tags_json) ? (r.tags_json as string[]).join(", ") : "",
    Bookinger: Number((r as unknown as Record<string, unknown>).bookings_count ?? 0),
    "Total forbrug (DKK)": Number((r as unknown as Record<string, unknown>).total_spent ?? 0),
    Noter: r.notes ?? "",
    Oprettet: r.created_at ? new Date(r.created_at).toLocaleDateString("da-DK") : "",
    Opdateret: r.updated_at ? new Date(r.updated_at).toLocaleDateString("da-DK") : "",
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);

  // Column widths
  ws["!cols"] = [
    { wch: 36 }, // ID
    { wch: 16 }, // Fornavn
    { wch: 16 }, // Efternavn
    { wch: 28 }, // Email
    { wch: 16 }, // Telefon
    { wch: 28 }, // Adresse
    { wch: 12 }, // Postnummer
    { wch: 16 }, // By
    { wch: 12 }, // Kundetype
    { wch: 20 }, // Firma
    { wch: 12 }, // CVR
    { wch: 16 }, // Marketing opt-in
    { wch: 20 }, // Tags
    { wch: 12 }, // Bookinger
    { wch: 20 }, // Total forbrug
    { wch: 36 }, // Noter
    { wch: 14 }, // Oprettet
    { wch: 14 }, // Opdateret
  ];

  XLSX.utils.book_append_sheet(wb, ws, "Kunder");

  const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  const date = new Date().toISOString().slice(0, 10);
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="kunder-${date}.xlsx"`,
    },
  });
}
