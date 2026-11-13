import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, Check, Search } from "lucide-react";
import {
  buildLocalBusiness,
  buildWebSiteJsonLd,
  JsonLd,
  type JsonValue,
} from "@/components/seo/json-ld";
import { AddOnPriceList, PriceTable } from "@/components/seo/price-table";
import { contentPagesByKind } from "@/lib/content";
import { addOns, fromKr, fromPrice, packageOrder, packages } from "@/lib/pricing";
import { absoluteUrl } from "@/lib/seo-pages";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ydelser og tilvalg – alt hvad vi tilbyder",
  description:
    "Se alle CleanWashs ydelser: udvendig bilvask, indvendig bilrengøring, hele bilen med voks og tilvalg som sæderens, læderpleje og motorvask – med priser.",
  alternates: { canonical: "/ydelser" },
  openGraph: {
    title: "Ydelser og tilvalg hos CleanWash",
    description: "Tre pakker og en række tilvalg – alle med faste priser og udført på din adresse.",
    url: "/ydelser",
    type: "website",
    locale: "da_DK",
  },
};

const packageLinks: Record<string, string> = {
  outside: "/udvendig-bilvask-koebenhavn",
  inside: "/bilrengoering",
  whole: "/komplet-bilvask",
};

const legacyServiceLinks = [
  { label: "Håndvask af bil", href: "/haandvask-bil-koebenhavn" },
  { label: "Udvendig bilvask", href: "/udvendig-bilvask-koebenhavn" },
  { label: "Indvendig bilrengøring København", href: "/indvendig-bilrengoering-koebenhavn" },
  { label: "Bilvask priser", href: "/bilvask-priser" },
  { label: "Klargøring af bil til salg", href: "/klargoering-bil-salg" },
  { label: "Bilvask af leasingbil", href: "/bilvask-leasingbil" },
  { label: "Retur af leasingbil", href: "/retur-leasebil" },
  { label: "Bilvask efter vinter", href: "/bilvask-efter-vinter" },
  { label: "Erhvervs bilvask", href: "/erhvervs-bilvask" },
  { label: "Flådeaftale", href: "/erhverv/flaadeaftale" },
];

const guideLinks = [
  { label: "Hvad koster bilvask i København?", href: "/hvad-koster-bilvask-koebenhavn" },
  { label: "Mobil bilvask eller vaskehal?", href: "/mobil-bilvask-vs-vaskehal" },
  { label: "Hvor ofte skal man vaske bilen?", href: "/hvor-ofte-skal-man-vaske-bilen" },
  { label: "Indvendig bilrengøring før salg", href: "/indvendig-bilrengoering-foer-salg" },
  { label: "Bilvask på adressen", href: "/bilvask-paa-adressen" },
  { label: "Bilvask til firmabiler i København", href: "/bilvask-til-firmabiler-koebenhavn" },
  { label: "Vælg den rigtige bilvask", href: "/vaelg-den-rigtige-bilvask" },
  { label: "Spar penge på bilvask", href: "/spar-penge-paa-bilvask" },
  { label: "Alle guides i bloggen", href: "/blog" },
];

const servicePages = contentPagesByKind("service");
const occasionPages = contentPagesByKind("occasion");
const businessPages = contentPagesByKind("business");

const jsonLd: JsonValue = {
  "@context": "https://schema.org",
  "@graph": [
    buildLocalBusiness({
      areaServed: ["København", "Frederiksberg", "Storkøbenhavn", "Nordsjælland", "Sjælland"],
    }),
    buildWebSiteJsonLd(),
    {
      "@type": "OfferCatalog",
      "@id": `${absoluteUrl("/ydelser")}#catalog`,
      name: "CleanWash ydelser og tilvalg",
      url: absoluteUrl("/ydelser"),
      itemListElement: [
        ...packageOrder.map((id) => ({
          "@type": "Offer",
          name: packages[id].name,
          description: packages[id].summary,
          price: String(fromPrice(id)),
          priceCurrency: "DKK",
          url: absoluteUrl(packageLinks[id]),
        })),
        ...Object.values(addOns).map((item) => ({
          "@type": "Offer",
          name: item.name,
          description: item.text,
          price: String(item.price),
          priceCurrency: "DKK",
          url: absoluteUrl(item.href ?? "/ydelser"),
        })),
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Forside", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Ydelser", item: absoluteUrl("/ydelser") },
      ],
    },
  ],
};

function LinkGrid({ links }: { links: { label: string; href: string }[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href as Route}
          className="flex min-h-16 items-center justify-between gap-4 rounded-lg border border-[var(--line)] bg-white/88 px-5 py-4 text-sm font-semibold text-[var(--ink)] shadow-[0_14px_32px_rgba(11,31,58,0.06)] transition hover:-translate-y-0.5 hover:bg-white"
        >
          {link.label}
          <ArrowRight className="h-4 w-4 shrink-0 text-[var(--brand)]" />
        </Link>
      ))}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main className="px-4 pb-12 sm:px-6">
      <JsonLd data={jsonLd} />

      <nav aria-label="Brødkrumme" className="mx-auto mt-6 max-w-7xl text-sm font-medium text-[var(--muted)]">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="transition hover:text-[var(--ink)]">
              Forside
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-[var(--ink)]">Ydelser</li>
        </ol>
      </nav>

      <section className="mx-auto mt-6 max-w-7xl overflow-hidden rounded-[2rem] bg-[var(--accent)] shadow-[0_28px_90px_rgba(11,31,58,0.22)]">
        <div className="relative px-6 py-14 text-white sm:px-10 lg:px-12 lg:py-16">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,167,184,0.18),transparent_48%,rgba(245,158,11,0.10))]" />
          <div className="relative max-w-3xl">
            <span className="inline-flex rounded-full border border-white/12 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#67e8f9]">
              Ydelser og tilvalg
            </span>
            <h1 className="mt-5 font-display text-[clamp(2.35rem,5vw,4.2rem)] font-semibold leading-[0.98] text-white">
              Alt, hvad vi kan gøre for din bil
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Tre pakker og en række tilvalg. Alt udføres på din adresse med vores eget vand og
              strøm, og du betaler først, når bilen er færdig. Udvendig bilvask fra{" "}
              {fromKr("outside")}, hele bilen fra {fromKr("whole")}.
            </p>
            <div className="mt-8">
              <Link
                href="/booking"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--cta)] px-5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(245,158,11,0.26)] transition hover:bg-[var(--cta-hover)]"
              >
                <Search className="h-5 w-5" />
                Book bilvask
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-12 max-w-7xl space-y-16">
        <section>
          <div className="mb-8 max-w-2xl">
            <span className="eyebrow">Pakker</span>
            <h2 className="mt-5 section-title">Vælg mellem tre pakker</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {packageOrder.map((id) => {
              const pkg = packages[id];
              return (
                <article
                  key={id}
                  className="flex flex-col rounded-2xl border border-[var(--line)] bg-white p-8 shadow-[0_18px_48px_rgba(11,31,58,0.07)]"
                >
                  <h3 className="font-display text-2xl font-semibold text-[var(--ink)]">{pkg.name}</h3>
                  <p className="mt-3 flex items-baseline gap-1.5">
                    <span className="text-sm text-[var(--muted)]">fra</span>
                    <span className="font-display text-4xl font-bold text-[var(--ink)]">
                      {fromKr(id)}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">Ca. {pkg.minutes} minutter</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={packageLinks[id] as Route}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]"
                  >
                    Læs mere om {pkg.name.toLowerCase()}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section>
          <div className="mb-8 max-w-2xl">
            <span className="eyebrow">Priser</span>
            <h2 className="mt-5 section-title">Pris efter bilens størrelse</h2>
          </div>
          <PriceTable />
        </section>

        <section>
          <div className="mb-8 max-w-2xl">
            <span className="eyebrow">Tilvalg</span>
            <h2 className="mt-5 section-title">Når bilen har brug for mere</h2>
            <p className="mt-5 support-copy">
              Tilvalg bookes sammen med en pakke og udføres i samme besøg. Klik på et tilvalg for
              at læse, hvad det indebærer.
            </p>
          </div>
          <AddOnPriceList />
        </section>

        <section>
          <div className="mb-6 max-w-2xl">
            <span className="eyebrow">Sådan kan du bruge os</span>
            <h2 className="mt-5 section-title">Mobil bilvask – hjemme, på jobbet og i lejligheden</h2>
          </div>
          <LinkGrid links={servicePages.map((page) => ({ label: page.h1, href: `/${page.slug}` }))} />
        </section>

        <section>
          <div className="mb-6 max-w-2xl">
            <span className="eyebrow">Anledninger</span>
            <h2 className="mt-5 section-title">Til weekenden, ferien og vinteren</h2>
          </div>
          <LinkGrid links={occasionPages.map((page) => ({ label: page.h1, href: `/${page.slug}` }))} />
        </section>

        <section>
          <div className="mb-6 max-w-2xl">
            <span className="eyebrow">Flere ydelser</span>
            <h2 className="mt-5 section-title">Klargøring, leasing og håndvask</h2>
          </div>
          <LinkGrid links={legacyServiceLinks} />
        </section>

        <section>
          <div className="mb-6 max-w-2xl">
            <span className="eyebrow">Guides</span>
            <h2 className="mt-5 section-title">Svar på de mest stillede spørgsmål</h2>
          </div>
          <LinkGrid links={guideLinks} />
        </section>

        <section>
          <div className="mb-6 max-w-2xl">
            <span className="eyebrow">Erhverv</span>
            <h2 className="mt-5 section-title">Løsninger til virksomheder</h2>
          </div>
          <LinkGrid links={businessPages.map((page) => ({ label: page.h1, href: `/${page.slug}` }))} />
        </section>
      </div>
    </main>
  );
}
