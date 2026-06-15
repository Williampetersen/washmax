import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { getBookingSettingsFromSetup } from "@/lib/server/booking-setup";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vælg bilstørrelse – Pris på bilvask",
  description:
    "Kender du ikke nummerpladen? Vælg din bilstørrelse og se pris på bilvask med det samme. Lille bil, mellem bil, stor bil og varevogn – book online hos Wash Max.",
  keywords: ["vælg bilstørrelse", "bilvask pris", "lille bil bilvask", "stor bil bilvask", "varevogn bilvask"],
  alternates: { canonical: "/velg-storrelse" },
  openGraph: {
    title: "Vælg bilstørrelse | Wash Max",
    description: "Vælg din bilstørrelse og book bilvask hos Wash Max. Pris, tid og service for alle biltyper.",
    type: "website",
    locale: "da_DK",
  },
  robots: { index: true, follow: true },
};

const categoryMeta: Record<
  string,
  {
    examples: string;
    minMinutes: number;
    svgPath: string;
    color: string;
    bg: string;
    badge: string;
  }
> = {
  small: {
    examples: "Polo · Yaris · Fiesta · 208 · Up · Aygo",
    minMinutes: 50,
    svgPath:
      "M3 14h18M5 14l2-5h10l2 5M7 14v3m10-3v3M6 9l1.5-3h9L18 9",
    color: "text-[#1D4ED8]",
    bg: "bg-[#EFF6FF]",
    badge: "bg-[#DBEAFE] text-[#1D4ED8]",
  },
  medium: {
    examples: "Golf · Focus · Octavia · A4 · 3-serie · Corolla",
    minMinutes: 65,
    svgPath:
      "M2 14h20M4 14l2-6h12l2 6M7 14v3m10-3v3M5 8l2-3h10l2 3",
    color: "text-[#047857]",
    bg: "bg-[#ECFDF5]",
    badge: "bg-[#D1FAE5] text-[#047857]",
  },
  large: {
    examples: "Passat · Touareg · Q5 · X5 · Tiguan · Kodiaq",
    minMinutes: 75,
    svgPath:
      "M2 15h20M3 15l2-7h14l2 7M7 15v3m10-3v3M4 8l3-4h10l3 4",
    color: "text-[#9333EA]",
    bg: "bg-[#F5F3FF]",
    badge: "bg-[#EDE9FE] text-[#7C3AED]",
  },
  van: {
    examples: "Transit · Sprinter · Ducato · Master · Daily",
    minMinutes: 90,
    svgPath:
      "M2 15h20M3 15V8h14l3 7M7 15v3m10-3v3M3 8h14M3 8V6h11l3 2",
    color: "text-[#B45309]",
    bg: "bg-[#FFFBEB]",
    badge: "bg-[#FEF3C7] text-[#92400E]",
  },
};

export default async function VelgStorrelse() {
  const settings = await getBookingSettingsFromSetup();
  const categories = settings.catalog.vehicleCategories;
  const packages = settings.catalog.packages;

  const minPrice = (categoryId: string): number => {
    const prices = packages
      .flatMap((pkg) => {
        const cp = pkg.categoryPrices as Record<string, number> | undefined;
        const p = cp?.[categoryId];
        return typeof p === "number" && p > 0 ? [p] : [];
      });
    const fallback = categories.find((c) => c.id === categoryId)?.price ?? 0;
    return prices.length > 0 ? Math.min(...prices) : fallback;
  };

  const fmt = (n: number) => `${n.toLocaleString("da-DK")} kr`;

  const pageUrl = `${siteConfig.url}/velg-storrelse`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Vælg bilstørrelse – Bilvask pris hos Wash Max",
        description: "Vælg bilstørrelse og se pris på bilvask. Lille bil, mellem bil, stor bil og varevogn med online booking.",
        inLanguage: "da-DK",
        isPartOf: { "@id": `${siteConfig.url}#website` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Forside", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Vælg bilstørrelse", item: pageUrl },
        ],
      },
      {
        "@type": "ItemList",
        name: "Bilstørrelser og priser",
        description: "Oversigt over bilstørrelser og startpriser for bilvask hos Wash Max",
        itemListElement: categories.map((cat, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: cat.label,
          description: cat.description,
          url: `${siteConfig.url}/booking?category=${cat.id}&manual=true`,
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen px-4 pb-24 sm:px-6">
      <JsonLd data={jsonLd as unknown as import("@/components/seo/json-ld").JsonValue} />
      <section className="mx-auto mt-10 max-w-4xl">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--brand)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Tilbage til forsiden
        </Link>

        {/* Hero */}
        <div className="mt-8">
          <span className="inline-block rounded-full bg-[#eefbfc] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand)]">
            Manuel valg
          </span>
          <h1 className="mt-4 font-display text-[2.5rem] font-bold leading-tight text-[var(--ink)] sm:text-5xl">
            Vælg din bilstørrelse
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-[var(--muted)]">
            Vi prissætter bilvask efter bilens størrelse. Vælg herunder og fortsæt til booking &mdash; du angiver bilmærke og model undervejs.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {categories.map((cat) => {
            const meta = categoryMeta[cat.id];
            if (!meta) return null;
            const fromPrice = minPrice(cat.id);

            return (
              <Link
                key={cat.id}
                href={`/booking?category=${cat.id}&manual=true`}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-[var(--line)] bg-white p-6 shadow-[0_8px_32px_rgba(11,31,58,0.06)] transition duration-200 hover:-translate-y-1 hover:border-[var(--brand)] hover:shadow-[0_20px_48px_rgba(0,167,184,0.13)]"
              >
                {/* Top row: icon + badge */}
                <div className="flex items-start justify-between gap-3">
                  {/* Car SVG silhouette */}
                  <span
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${meta.bg}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`h-8 w-8 ${meta.color}`}
                    >
                      <path d={meta.svgPath} />
                      <circle cx="7.5" cy="17.5" r="1.5" fill="currentColor" stroke="none" />
                      <circle cx="16.5" cy="17.5" r="1.5" fill="currentColor" stroke="none" />
                    </svg>
                  </span>

                  {/* Price badge */}
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-bold ${meta.badge}`}
                  >
                    Fra {fmt(fromPrice)}
                  </span>
                </div>

                {/* Name + description */}
                <h2 className="mt-5 text-[1.35rem] font-bold text-[var(--ink)]">
                  {cat.label}
                </h2>
                <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">
                  {cat.description}
                </p>

                {/* Examples */}
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Fx: {meta.examples}
                </p>

                {/* Bottom row */}
                <div className="mt-5 flex items-center justify-between border-t border-[var(--line)] pt-4">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-[var(--muted)]">
                    <Clock3 className="h-3.5 w-3.5" />
                    Fra {meta.minMinutes} min.
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-sm font-bold transition-all duration-200 group-hover:gap-2.5 ${meta.color}`}
                  >
                    Vælg
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA: use plate instead */}
        <div className="mt-10 rounded-2xl border border-[var(--line)] bg-[#f8fafc] px-6 py-5">
          <p className="text-sm font-medium text-[var(--muted)]">
            Kender du nummerpladen?{" "}
            <Link
              href="/"
              className="font-semibold text-[var(--brand)] underline-offset-2 hover:underline"
            >
              Slå den op her – vi finder bilstørrelsen automatisk →
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
