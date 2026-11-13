import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, MapPinned, Search } from "lucide-react";
import {
  buildLocalBusiness,
  buildWebSiteJsonLd,
  JsonLd,
  type JsonValue,
} from "@/components/seo/json-ld";
import { allAreaLinks, areaHref } from "@/lib/content/links";
import { absoluteUrl } from "@/lib/seo-pages";
import { fromKr } from "@/lib/pricing";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Serviceområder – her kører CleanWash",
  description:
    "Se alle byer og bydele, hvor CleanWash tilbyder mobil bilvask: København, Storkøbenhavn, Nordsjælland, Vestegnen og resten af Sjælland.",
  alternates: { canonical: "/serviceomraader" },
  openGraph: {
    title: "Serviceområder – her kører CleanWash",
    description:
      "Mobil bilvask i København, Storkøbenhavn og på Sjælland. Find din by, og book en tid.",
    url: "/serviceomraader",
    type: "website",
    locale: "da_DK",
  },
};

// Grouped by geography so visitors can find their town quickly.
const groups: { title: string; intro: string; region?: string; areas: string[] }[] = [
  {
    title: "København og Frederiksberg",
    intro: "Brokvartererne, Indre By og de nye bydele ved havnen.",
    region: "/bilvask-storkoebenhavn",
    areas: [
      "København",
      "Indre By",
      "Frederiksberg",
      "Østerbro",
      "Nørrebro",
      "Vesterbro",
      "Amager",
      "Valby",
      "Vanløse",
      "Brønshøj",
      "Bispebjerg",
      "Christianshavn",
      "Islands Brygge",
      "Sydhavnen",
      "Nordhavn",
      "Ørestad",
    ],
  },
  {
    title: "Nord for København",
    intro: "Fra Hellerup og Gentofte op langs Øresund til Helsingør.",
    region: "/bilvask-nordsjaelland",
    areas: [
      "Hellerup",
      "Gentofte",
      "Charlottenlund",
      "Klampenborg",
      "Lyngby",
      "Virum",
      "Holte",
      "Nærum",
      "Vedbæk",
      "Søborg",
      "Gladsaxe",
      "Bagsværd",
      "Birkerød",
      "Hørsholm",
      "Rungsted",
      "Kokkedal",
      "Nivå",
      "Humlebæk",
      "Espergærde",
      "Helsingør",
      "Fredensborg",
      "Hillerød",
      "Allerød",
      "Farum",
      "Værløse",
    ],
  },
  {
    title: "Nordvest og fjordbyerne",
    intro: "Ballerup, Egedal og byerne ved Roskilde Fjord og Arresø.",
    region: "/bilvask-nordsjaelland",
    areas: [
      "Herlev",
      "Ballerup",
      "Skovlunde",
      "Måløv",
      "Smørum",
      "Stenløse",
      "Slangerup",
      "Frederikssund",
      "Frederiksværk",
      "Helsinge",
      "Jyllinge",
    ],
  },
  {
    title: "Vestegnen og Køge Bugt",
    intro: "Fra Rødovre og Hvidovre til strandbyerne langs bugten.",
    region: "/bilvask-vestegnen",
    areas: [
      "Rødovre",
      "Hvidovre",
      "Brøndby",
      "Glostrup",
      "Albertslund",
      "Taastrup",
      "Hedehusene",
      "Vallensbæk",
      "Ishøj",
      "Greve",
      "Karlslunde",
      "Solrød Strand",
      "Køge",
    ],
  },
  {
    title: "Amager syd",
    intro: "Tårnby, Kastrup og Dragør.",
    areas: ["Tårnby", "Kastrup", "Dragør"],
  },
  {
    title: "Midt-, Vest- og Sydsjælland",
    intro: "Vi kører efter ledige tider – se dem i bookingen.",
    region: "/bilvask-sjaelland",
    areas: [
      "Roskilde",
      "Lejre",
      "Holbæk",
      "Kalundborg",
      "Ringsted",
      "Sorø",
      "Slagelse",
      "Korsør",
      "Haslev",
      "Næstved",
      "Vordingborg",
    ],
  },
];

const regionLinks = [
  { label: "Bilvask Storkøbenhavn", href: "/bilvask-storkoebenhavn" },
  { label: "Bilvask Nordsjælland", href: "/bilvask-nordsjaelland" },
  { label: "Bilvask Vestegnen", href: "/bilvask-vestegnen" },
  { label: "Bilvask Vestsjælland", href: "/bilvask-vestsjaelland" },
  { label: "Bilvask Sydsjælland", href: "/bilvask-sydsjaelland" },
  { label: "Bilvask Sjælland", href: "/bilvask-sjaelland" },
];

const faqs = [
  {
    question: "Hvor kører CleanWash?",
    answer:
      "I København, på Frederiksberg, i hele Storkøbenhavn og i store dele af Sjælland – blandt andet Nordsjælland, Vestegnen, Roskilde, Køge, Holbæk, Ringsted, Slagelse og Næstved.",
  },
  {
    question: "Min by står ikke på listen. Kan jeg stadig booke?",
    answer:
      "Prøv at begynde en booking med din adresse. Kalenderen viser, om vi har ledige tider hos dig. Du er også velkommen til at ringe.",
  },
  {
    question: "Koster det ekstra uden for København?",
    answer:
      "Pakkepriserne er de samme overalt. Hvis der gælder et kørselstillæg for en adresse, vises det i prisen, før du bekræfter bookingen.",
  },
  {
    question: "Skal jeg stille vand eller strøm til rådighed?",
    answer: "Nej. Vi medbringer selv både vand og strøm, uanset hvor på Sjælland vi kommer.",
  },
];

const jsonLd: JsonValue = {
  "@context": "https://schema.org",
  "@graph": [
    buildLocalBusiness({
      areaServed: ["København", "Frederiksberg", "Storkøbenhavn", "Nordsjælland", "Sjælland"],
    }),
    buildWebSiteJsonLd(),
    {
      "@type": "CollectionPage",
      "@id": `${absoluteUrl("/serviceomraader")}#webpage`,
      url: absoluteUrl("/serviceomraader"),
      name: "Serviceområder for CleanWash",
      inLanguage: "da-DK",
      isPartOf: { "@id": `${siteConfig.url}#website` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: allAreaLinks.length,
        itemListElement: allAreaLinks.map((area, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `Bilvask ${area.name}`,
          url: absoluteUrl(area.href),
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Forside", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Områder", item: absoluteUrl("/serviceomraader") },
      ],
    },
  ],
};

export default function ServiceAreasPage() {
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
          <li className="text-[var(--ink)]">Områder</li>
        </ol>
      </nav>

      <section className="mx-auto mt-6 max-w-7xl overflow-hidden rounded-[2rem] bg-[var(--accent)] shadow-[0_28px_90px_rgba(11,31,58,0.22)]">
        <div className="relative px-6 py-14 text-white sm:px-10 lg:px-12 lg:py-16">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,167,184,0.18),transparent_48%,rgba(245,158,11,0.10))]" />
          <div className="relative max-w-3xl">
            <span className="inline-flex rounded-full border border-white/12 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#67e8f9]">
              {allAreaLinks.length} byer og bydele
            </span>
            <h1 className="mt-5 font-display text-[clamp(2.35rem,5vw,4.2rem)] font-semibold leading-[0.98] text-white">
              Her kører CleanWash
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Vi kommer til din adresse i København, Storkøbenhavn og store dele af Sjælland –
              med eget vand og strøm. Find din by herunder, eller gå direkte til bookingen og
              tast din adresse. Udvendig bilvask fra {fromKr("outside")}.
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

      <div className="mx-auto mt-12 max-w-7xl space-y-14">
        <section>
          <div className="mb-6 max-w-2xl">
            <span className="eyebrow">Regioner</span>
            <h2 className="mt-5 section-title">Overblik over de større områder</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {regionLinks.map((link) => (
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
        </section>

        {groups.map((group) => (
          <section key={group.title} className="section-shell px-6 py-8 sm:px-8">
            <div className="relative">
              <h2 className="font-display text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
                {group.title}
              </h2>
              <p className="mt-3 support-copy">{group.intro}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {group.areas.map((name) => {
                  const href = areaHref(name);
                  if (!href) return null;
                  return (
                    <li key={name}>
                      <Link
                        href={href as Route}
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/78 px-4 py-2 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--brand)]"
                      >
                        <MapPinned className="h-4 w-4 text-[var(--brand)]" />
                        Bilvask {name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        ))}

        <section className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="eyebrow">Spørgsmål og svar</span>
            <h2 className="mt-5 section-title">Om vores dækning</h2>
          </div>
          <div className="mt-8 grid gap-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-lg border border-[var(--line)] bg-white/88 p-5 shadow-[0_14px_32px_rgba(11,31,58,0.06)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--ink)]">
                  <h3 className="text-base font-semibold">{faq.question}</h3>
                  <span className="text-[var(--brand)] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
