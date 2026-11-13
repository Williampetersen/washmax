import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, Check, Clock3, Droplets, MapPinned, Phone, Search, Wallet } from "lucide-react";
import { HowItWorks } from "@/components/seo/how-it-works";
import { buildContentJsonLd, JsonLd } from "@/components/seo/json-ld";
import { AddOnPriceList, PriceTable } from "@/components/seo/price-table";
import { areaHref, hubs, linkLabel } from "@/lib/content/links";
import type { ContentPage } from "@/lib/content/types";
import { addOns, fromKr, kr, packageOrder, packages } from "@/lib/pricing";
import { siteConfig } from "@/lib/site";

const ui = {
  da: {
    home: "Forside",
    book: "Book bilvask",
    prices: "Se priser",
    call: "Ring",
    answer: "Kort svar",
    priceEyebrow: "Priser",
    priceTitle: "Hvad koster det?",
    faqEyebrow: "Spørgsmål og svar",
    relatedEyebrow: "Læs også",
    relatedTitle: "Relaterede sider",
    nearbyEyebrow: "I nærheden",
    ctaEyebrow: "Book online",
    ctaTitle: "Klar til en ren bil?",
    ctaText: "Vælg pakke og tidspunkt på to minutter. Vi kommer til din adresse med vand og strøm.",
    from: "fra",
    addOnNote: "Tilvalg bookes sammen med en bilvask og udføres i samme besøg.",
  },
  en: {
    home: "Home",
    book: "Book a car wash",
    prices: "See prices",
    call: "Call",
    answer: "Short answer",
    priceEyebrow: "Prices",
    priceTitle: "What does it cost?",
    faqEyebrow: "Questions and answers",
    relatedEyebrow: "Read more",
    relatedTitle: "Related pages",
    nearbyEyebrow: "Nearby",
    ctaEyebrow: "Book online",
    ctaTitle: "Ready for a clean car?",
    ctaText: "Pick a package and a time in two minutes. We come to your address with our own water and power.",
    from: "from",
    addOnNote: "Add-ons are booked together with a wash and done in the same visit.",
  },
};

const isAreaKind = (page: ContentPage) => page.kind === "area" || page.kind === "region";

export function ContentPageView({ page }: { page: ContentPage }) {
  const lang = page.kind === "english" ? "en" : "da";
  const t = ui[lang];
  const hub = hubs[page.kind];

  return (
    <main className="px-4 pb-12 sm:px-6" lang={lang === "en" ? "en" : undefined}>
      <JsonLd data={buildContentJsonLd(page, hub)} />

      <nav
        aria-label={lang === "en" ? "Breadcrumb" : "Brødkrumme"}
        className="mx-auto mt-6 max-w-7xl text-sm font-medium text-[var(--muted)]"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="transition hover:text-[var(--ink)]">
              {t.home}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={hub.href as Route} className="transition hover:text-[var(--ink)]">
              {hub.label}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-[var(--ink)]">{page.h1}</li>
        </ol>
      </nav>

      <Hero page={page} t={t} />

      <div className="mx-auto mt-12 max-w-7xl space-y-16">
        <section
          aria-labelledby="short-answer"
          className="rounded-[1.75rem] border border-[#00A7B8]/25 bg-[#eefbfc] px-6 py-7 sm:px-8"
        >
          <h2 id="short-answer" className="font-display text-2xl font-semibold text-[var(--ink)]">
            {t.answer}
          </h2>
          <p className="mt-3 max-w-4xl text-base leading-8 text-[var(--ink)] sm:text-lg">
            {page.answer}
          </p>
        </section>

        <section className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-10">
            {page.sections.map((section) => (
              <article key={section.h} className="border-b border-[var(--line)] pb-10 last:border-b-0 last:pb-0">
                <h2 className="font-display text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
                  {section.h}
                </h2>
                <div className="mt-5 space-y-4">
                  {section.p.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-[var(--muted)]">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.list ? (
                  <ul className="mt-5 grid gap-3">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-base leading-7 text-[var(--muted)]">
                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d6f5e8] text-[#1a7a4e]">
                          <Check className="h-3 w-3" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <SideCard page={page} t={t} />
          </aside>
        </section>

        {page.area ? <Nearby page={page} t={t} /> : null}

        <section>
          <div className="mb-8 max-w-2xl">
            <span className="eyebrow">{t.priceEyebrow}</span>
            <h2 className="mt-5 section-title">{t.priceTitle}</h2>
          </div>
          <PriceTable highlight={page.pkg} lang={lang} />
          {/* The add-on names and descriptions are Danish, so the list is left off the English pages. */}
          {page.kind === "service" || page.kind === "addon" ? (
            <div className="mt-8">
              <AddOnPriceList />
            </div>
          ) : null}
        </section>

        <HowItWorks lang={lang} />

        <section className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="eyebrow">{t.faqEyebrow}</span>
            <h2 className="mt-5 section-title">{faqTitle(page)}</h2>
          </div>
          <div className="mt-8 grid gap-3">
            {page.faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-lg border border-[var(--line)] bg-white/88 p-5 shadow-[0_14px_32px_rgba(11,31,58,0.06)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--ink)]">
                  <h3 className="text-base font-semibold">{faq.q}</h3>
                  <span className="text-[var(--brand)] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6 max-w-2xl">
            <span className="eyebrow">{t.relatedEyebrow}</span>
            <h2 className="mt-5 section-title">{t.relatedTitle}</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {page.related.map((href) => (
              <Link
                key={href}
                href={href as Route}
                className="flex min-h-16 items-center justify-between gap-4 rounded-lg border border-[var(--line)] bg-white/88 px-5 py-4 text-sm font-semibold text-[var(--ink)] shadow-[0_14px_32px_rgba(11,31,58,0.06)] transition hover:-translate-y-0.5 hover:bg-white"
              >
                {linkLabel(href)}
                <ArrowRight className="h-4 w-4 shrink-0 text-[var(--brand)]" />
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] bg-[linear-gradient(135deg,#0B1F3A,#00A7B8)] px-6 py-10 text-white shadow-[0_24px_80px_rgba(11,31,58,0.22)] sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/65">
              {t.ctaEyebrow}
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-none sm:text-5xl">
              {t.ctaTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-white/80">{t.ctaText}</p>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
            <Link
              href="/booking"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[var(--cta)] px-5 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(245,158,11,0.26)] transition hover:bg-[var(--cta-hover)]"
            >
              <Search className="h-5 w-5" />
              {t.book}
            </Link>
            <a
              href={siteConfig.phoneHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/25 px-5 text-sm font-semibold"
            >
              <Phone className="h-4 w-4" />
              {t.call} {siteConfig.phoneDisplay}
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

type Ui = (typeof ui)["da"];

function faqTitle(page: ContentPage) {
  if (page.kind === "english") return "Good to know";
  if (page.area) return `Bilvask ${page.area.name}: ofte stillede spørgsmål`;
  return "Ofte stillede spørgsmål";
}

function Hero({ page, t }: { page: ContentPage; t: Ui }) {
  return (
    <section className="mx-auto mt-6 max-w-7xl overflow-hidden rounded-[2rem] bg-[var(--accent)] shadow-[0_28px_90px_rgba(11,31,58,0.22)]">
      <div className="grid lg:grid-cols-[1.04fr_0.96fr]">
        <div className="relative px-6 py-12 text-white sm:px-10 lg:px-12 lg:py-16">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,167,184,0.18),transparent_48%,rgba(245,158,11,0.10))]" />
          <div className="relative">
            <span className="inline-flex rounded-full border border-white/12 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#67e8f9]">
              {page.eyebrow}
            </span>
            <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.2rem,4.6vw,4.2rem)] font-semibold leading-[1.02] text-white">
              {page.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">{page.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/booking"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--cta)] px-5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(245,158,11,0.26)] transition hover:bg-[var(--cta-hover)]"
              >
                <Search className="h-5 w-5" />
                {t.book}
              </Link>
              <Link
                href={"/bilvask-priser" as Route}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {t.prices}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {isAreaKind(page) ? (
          <AreaFacts page={page} />
        ) : (
          <div className="relative min-h-[18rem] bg-black lg:min-h-full">
            <Image
              src={page.image.src}
              alt={page.image.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              // The car-size illustrations are cut-outs on black: show the whole car.
              className={page.image.src.startsWith("/bilsize/") ? "object-contain p-8" : "object-cover"}
              priority
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,22,17,0.05),rgba(7,22,17,0.28))]" />
          </div>
        )}
      </div>
    </section>
  );
}

function AreaFacts({ page }: { page: ContentPage }) {
  const area = page.area;
  const rows = [
    {
      icon: MapPinned,
      label: area ? [area.postal, area.name].filter(Boolean).join(" ") : page.h1,
      value: area ? area.kommune : "København og Sjælland",
    },
    {
      icon: Wallet,
      label: `Udvendig bilvask fra ${fromKr("outside")}`,
      value: `Hele bilen fra ${fromKr("whole")}`,
    },
    {
      icon: Clock3,
      label: `Ca. ${packages.outside.minutes}–${packages.whole.minutes} minutter`,
      value: "Afhænger af pakke og bilstørrelse",
    },
    {
      icon: Droplets,
      label: "Vi medbringer vand og strøm",
      value: "Du skal ikke stille noget til rådighed",
    },
  ];

  return (
    <div className="relative flex items-center bg-[rgba(255,255,255,0.04)] px-6 py-10 sm:px-10 lg:px-12">
      <dl className="grid w-full gap-3">
        {rows.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-2xl border border-white/12 bg-white/8 px-5 py-4"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00A7B8]/20 text-[#67e8f9]">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <dt className="font-semibold text-white">{label}</dt>
              <dd className="text-sm text-white/70">{value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}

function SideCard({ page, t }: { page: ContentPage; t: Ui }) {
  const addOn = page.addOn ? addOns[page.addOn] : null;

  return (
    <div className="section-shell px-6 py-7">
      <div className="relative">
        {addOn ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {addOn.name}
            </p>
            <p className="mt-2 font-display text-5xl font-bold text-[var(--ink)]">{kr(addOn.price)}</p>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{t.addOnNote}</p>
          </>
        ) : (
          <ul className="grid gap-3">
            {packageOrder.map((id) => (
              <li
                key={id}
                className={`flex items-baseline justify-between gap-4 rounded-xl border px-4 py-3 ${
                  page.pkg === id
                    ? "border-[var(--brand)] bg-[#eefbfc]"
                    : "border-[var(--line)] bg-white/80"
                }`}
              >
                <span className="text-sm font-semibold text-[var(--ink)]">{packages[id].name}</span>
                <span className="shrink-0 text-sm text-[var(--muted)]">
                  {t.from}{" "}
                  <strong className="font-display text-lg text-[var(--ink)]">{fromKr(id)}</strong>
                </span>
              </li>
            ))}
          </ul>
        )}
        <Link
          href="/booking"
          className="mt-6 flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--cta)] text-sm font-semibold text-white shadow-[0_14px_32px_rgba(245,158,11,0.22)] transition hover:bg-[var(--cta-hover)]"
        >
          {t.book}
          <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href={siteConfig.phoneHref}
          className="mt-3 flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--line)] text-sm font-semibold text-[var(--ink)] transition hover:bg-white"
        >
          <Phone className="h-4 w-4" />
          {siteConfig.phoneDisplay}
        </a>
      </div>
    </div>
  );
}

function Nearby({ page, t }: { page: ContentPage; t: Ui }) {
  const area = page.area;
  if (!area) return null;

  return (
    <section className="section-shell px-6 py-8 sm:px-8">
      <div className="relative">
        <span className="eyebrow">{t.nearbyEyebrow}</span>
        <h2 className="mt-5 font-display text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
          Vi kører også i områderne omkring {area.name}
        </h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {area.nearby.map((name) => {
            const href = areaHref(name);
            const className =
              "inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/78 px-4 py-2 text-sm font-semibold text-[var(--ink)]";
            return href ? (
              <Link
                key={name}
                href={href as Route}
                className={`${className} transition hover:border-[var(--brand)]`}
              >
                <MapPinned className="h-4 w-4 text-[var(--brand)]" />
                Bilvask {name}
              </Link>
            ) : (
              <span key={name} className={className}>
                <MapPinned className="h-4 w-4 text-[var(--brand)]" />
                {name}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
