import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, Search } from "lucide-react";
import {
  buildLocalBusiness,
  buildWebSiteJsonLd,
  JsonLd,
  type JsonValue,
} from "@/components/seo/json-ld";
import { PriceTable } from "@/components/seo/price-table";
import { contentPagesByKind } from "@/lib/content";
import { kr, packages, vehicleSizes } from "@/lib/pricing";
import { absoluteUrl } from "@/lib/seo-pages";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Biltyper og bilmærker – pris efter størrelse",
  description:
    "Se hvad bilvask koster for din biltype: lille bil, mellem bil, stor bil og varevogn. Find også guides til Tesla, VW, BMW, Audi og flere mærker.",
  alternates: { canonical: "/biltyper" },
  openGraph: {
    title: "Biltyper og bilmærker hos CleanWash",
    description: "Fire størrelser, faste priser – og gode råd til netop dit bilmærke.",
    url: "/biltyper",
    type: "website",
    locale: "da_DK",
  },
};

const vehiclePages = contentPagesByKind("vehicle");
const brandPages = contentPagesByKind("brand");

const jsonLd: JsonValue = {
  "@context": "https://schema.org",
  "@graph": [
    buildLocalBusiness({
      areaServed: ["København", "Frederiksberg", "Storkøbenhavn", "Nordsjælland", "Sjælland"],
    }),
    buildWebSiteJsonLd(),
    {
      "@type": "CollectionPage",
      "@id": `${absoluteUrl("/biltyper")}#webpage`,
      url: absoluteUrl("/biltyper"),
      name: "Biltyper og bilmærker",
      inLanguage: "da-DK",
      isPartOf: { "@id": `${siteConfig.url}#website` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: [...vehiclePages, ...brandPages].map((page, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: page.h1,
          url: absoluteUrl(`/${page.slug}`),
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Forside", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Biltyper", item: absoluteUrl("/biltyper") },
      ],
    },
  ],
};

function LinkGrid({ links }: { links: { label: string; href: string }[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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

export default function VehicleTypesPage() {
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
          <li className="text-[var(--ink)]">Biltyper</li>
        </ol>
      </nav>

      <section className="mx-auto mt-6 max-w-7xl overflow-hidden rounded-[2rem] bg-[var(--accent)] shadow-[0_28px_90px_rgba(11,31,58,0.22)]">
        <div className="relative px-6 py-14 text-white sm:px-10 lg:px-12 lg:py-16">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,167,184,0.18),transparent_48%,rgba(245,158,11,0.10))]" />
          <div className="relative max-w-3xl">
            <span className="inline-flex rounded-full border border-white/12 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#67e8f9]">
              Biltyper og bilmærker
            </span>
            <h1 className="mt-5 font-display text-[clamp(2.35rem,5vw,4.2rem)] font-semibold leading-[0.98] text-white">
              Hvad koster bilvask for din bil?
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Prisen afhænger af bilens størrelse. Den finder bookingen selv, når du taster
              nummerpladen – ud fra bilens registrerede totalvægt. Herunder kan du se de fire
              kategorier og læse om netop din biltype.
            </p>
            <div className="mt-8">
              <Link
                href="/booking"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--cta)] px-5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(245,158,11,0.26)] transition hover:bg-[var(--cta-hover)]"
              >
                <Search className="h-5 w-5" />
                Tast nummerplade og se pris
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-12 max-w-7xl space-y-16">
        <section>
          <div className="mb-8 max-w-2xl">
            <span className="eyebrow">Fire størrelser</span>
            <h2 className="mt-5 section-title">Sådan inddeles bilerne</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {vehicleSizes.map((size) => (
              <article
                key={size.id}
                className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-[0_18px_48px_rgba(11,31,58,0.07)]"
              >
                <div className="bg-black px-4 py-5">
                  <Image
                    src={size.image}
                    alt={`${size.label} – størrelseskategori for bilvask`}
                    width={432}
                    height={185}
                    className="mx-auto h-24 w-auto object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-semibold text-[var(--ink)]">{size.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{size.hint}</p>
                  <p className="mt-4 text-sm text-[var(--muted)]">
                    Udvendig vask{" "}
                    <strong className="text-[var(--ink)]">{kr(packages.outside.prices[size.id])}</strong>
                    <br />
                    Hele bilen{" "}
                    <strong className="text-[var(--ink)]">{kr(packages.whole.prices[size.id])}</strong>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-8 max-w-2xl">
            <span className="eyebrow">Priser</span>
            <h2 className="mt-5 section-title">Alle priser samlet</h2>
          </div>
          <PriceTable />
        </section>

        <section>
          <div className="mb-6 max-w-2xl">
            <span className="eyebrow">Biltyper</span>
            <h2 className="mt-5 section-title">Find din type bil</h2>
          </div>
          <LinkGrid links={vehiclePages.map((page) => ({ label: page.h1, href: `/${page.slug}` }))} />
        </section>

        <section>
          <div className="mb-6 max-w-2xl">
            <span className="eyebrow">Bilmærker</span>
            <h2 className="mt-5 section-title">Råd til netop dit mærke</h2>
            <p className="mt-5 support-copy">
              CleanWash er en uafhængig bilvask og ikke tilknyttet nogen bilproducent. Siderne
              beskriver, hvad der er værd at vide om rengøring af de enkelte mærker.
            </p>
          </div>
          <LinkGrid links={brandPages.map((page) => ({ label: page.h1, href: `/${page.slug}` }))} />
        </section>
      </div>
    </main>
  );
}
