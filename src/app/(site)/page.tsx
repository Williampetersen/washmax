import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  BrushCleaning,
  Building2,
  Car,
  Check,
  MapPinned,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Star,
  WandSparkles,
} from "lucide-react";
import { HomePlateForm } from "@/components/home-plate-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bilvask København og Sjælland",
  description:
    "Book professionel mobil bilvask i København og på Sjælland hos CleanWash. Bilvask på adressen, indvendig bilrengøring, udvendig bilvask og erhvervsaftaler.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CleanWash | Bilvask i København og på Sjælland",
    description:
      "Mobil bilvask på adressen. Nem booking, klar pris og professionel bilpleje til private og erhverv.",
    images: [
      {
        url: "/opengraph.jpg",
        width: 1200,
        height: 630,
        alt: "CleanWash bilvask i København og på Sjælland",
      },
    ],
  },
};

const benefits = [
  "Bilvask på din adresse",
  "Fleksible tider",
  "Professionel rengøring",
  "Til private og erhverv",
  "Service i København og på Sjælland",
];

const services = [
  {
    title: "Udvendig bilvask",
    text: "Skånsom vask, fælge, ruder og finish. Bilen står skarp igen.",
    icon: SprayCan,
  },
  {
    title: "Indvendig bilvask",
    text: "Støvsugning, aftørring, måtter og kabine. Godt til hverdagsbiler.",
    icon: BrushCleaning,
  },
  {
    title: "Komplet bilpleje",
    text: "Indvendig og udvendig bilrengøring samlet i én nem booking.",
    icon: Sparkles,
  },
  {
    title: "Sæderens og støvsugning",
    text: "Grundig behandling af sæder, gulve og svært tilgængelige områder.",
    icon: WandSparkles,
  },
  {
    title: "Fælgrens",
    text: "Målrettet rens af fælge, bremsestøv og snavs omkring hjul.",
    icon: Star,
  },
  {
    title: "Erhvervsaftaler",
    text: "Fast bilvask til firmabiler, flåder, taxa og transport.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Klargøring før salg",
    text: "Gør bilen klar til billeder, fremvisning, leasingretur eller salg.",
    icon: BadgeCheck,
  },
];

const copenhagenAreas = [
  "København",
  "Frederiksberg",
  "Amager",
  "Østerbro",
  "Nørrebro",
  "Vesterbro",
  "Valby",
  "Hvidovre",
  "Rødovre",
  "Glostrup",
  "Gentofte",
];

const zealandAreas = [
  "Sjælland",
  "Storkøbenhavn",
  "Roskilde",
  "Køge",
  "Hillerød",
  "Helsingør",
  "Holbæk",
  "Ringsted",
  "Næstved",
  "Slagelse",
];

const steps = [
  {
    title: "Indtast nummerplade",
    text: "Vi finder biltypen og hjælper med den rigtige pris.",
  },
  {
    title: "Vælg bilvask",
    text: "Vælg udvendig, indvendig eller komplet bilpleje.",
  },
  {
    title: "Vælg tid og adresse",
    text: "Du vælger en ledig tid. Vi kommer til bilen.",
  },
  {
    title: "Vi klarer resten",
    text: "Professionel bilvask uden kø og uden ventetid.",
  },
];

const whyItems = [
  "Ingen kø",
  "Ingen ventetid",
  "Klar pris",
  "Nem online booking",
  "Professionelt udstyr",
  "Perfekt til travle bilejere",
  "Perfekt til virksomheder med flere biler",
];

const businessItems = [
  "Firmabiler",
  "Leasingbiler",
  "Taxa og transport",
  "Ejendomsselskaber",
  "Bilforhandlere",
  "Flådeaftaler",
];

const faqs = [
  {
    question: "Tilbyder CleanWash bilvask i København?",
    answer:
      "Ja. CleanWash tilbyder bilvask i København, Frederiksberg, Amager, Østerbro, Nørrebro, Vesterbro, Valby og flere nærliggende bydele.",
  },
  {
    question: "Kører CleanWash ud på Sjælland?",
    answer:
      "Ja. Vi tilbyder mobil bilvask på Sjælland og i Storkøbenhavn. Dækningsområdet kan afhænge af dato, adresse og rute.",
  },
  {
    question: "Kan jeg booke bilvask hjemme?",
    answer:
      "Ja. Du kan booke bilvask hjemme, på arbejdspladsen eller et andet sted, hvor bilen holder lovligt og tilgængeligt.",
  },
  {
    question: "Tilbyder I indvendig bilvask?",
    answer:
      "Ja. Vi tilbyder indvendig bilvask med støvsugning, aftørring, måtter og kabinerengøring.",
  },
  {
    question: "Tilbyder I erhvervsaftaler?",
    answer:
      "Ja. CleanWash laver erhvervsaftaler for firmabiler, leasingbiler, taxa, transport, bilforhandlere og flåder.",
  },
  {
    question: "Hvor lang tid tager en bilvask?",
    answer:
      "Tiden afhænger af bilens størrelse, valgt service og tilvalg. Du ser varighed og ledige tider i bookingflowet.",
  },
  {
    question: "Hvordan kontakter jeg CleanWash?",
    answer: `Ring på ${siteConfig.phoneDisplay} eller skriv til ${siteConfig.email}. Du kan også booke direkte online.`,
  },
];

export default function HomePage() {
  return (
    <main id="top" className="px-4 pb-12 sm:px-6">
      <section className="-mx-4 -mt-24 sm:-mx-6">
        <div className="relative overflow-hidden bg-[#071611] pt-24">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/frontvideo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,9,8,0.9)_0%,rgba(5,17,13,0.72)_48%,rgba(7,21,17,0.45)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(3,9,8,0.8))]" />

          <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-10">
            <div className="text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8ce7ff]">
                CleanWash · mobil bilvask
              </p>
              <h1 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.2vw,3.8rem)] font-normal leading-[1.08] text-white">
                Professionel bilvask i København og på Sjælland
              </h1>

              <HomePlateForm />

              <div className="mt-5 flex flex-wrap gap-3">
                {["Bilvask hjemme", "Bilpleje København", "Bilrengøring Sjælland"].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-xl border border-white/16 bg-white/10 px-4 py-2.5 backdrop-blur-sm"
                  >
                    <Check className="h-4 w-4 text-[#8ce7ff]" />
                    <span className="text-sm font-semibold text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-8 max-w-7xl">
        <div className="grid gap-3 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-[0_24px_70px_rgba(8,27,21,0.12)] backdrop-blur sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-xl bg-[#f4fafc] px-4 py-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-[#1f6aa4]" />
              <span className="text-sm font-semibold text-[var(--ink)]">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto mt-16 max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="section-shell px-6 py-8 sm:px-8">
            <span className="eyebrow">Services</span>
            <h2 className="mt-5 section-title">Bilvask uden turen til vaskehallen.</h2>
            <p className="mt-5 support-copy">
              CleanWash leverer professionel bilvask, indvendig bilrengøring og bilpleje på
              adressen. Du vælger service. Vi møder op.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/booking"
                className="inline-flex h-11 items-center justify-center rounded-md bg-[#123549] px-5 text-sm font-semibold text-white transition hover:bg-[#0b2634]"
              >
                Book bilvask
              </Link>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex h-11 items-center justify-center rounded-md border border-[var(--line)] px-5 text-sm font-semibold text-[var(--ink)] transition hover:bg-white"
              >
                Ring {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="rounded-lg border border-[var(--line)] bg-white/88 p-5 shadow-[0_18px_40px_rgba(8,27,21,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(8,27,21,0.12)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-[#e9f8ff] text-[#1f6aa4]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-[var(--ink)]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{service.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Feature sections ── */}
      <section className="mx-auto mt-20 max-w-7xl space-y-24">

        {/* 01 — Udvendig bilvask */}
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="group relative overflow-hidden rounded-3xl shadow-[0_24px_80px_rgba(8,27,21,0.18)]">
            <div className="relative aspect-[4/3]">
              <Image
                src="/service/udenfor.jpg"
                alt="Udvendig bilvask udført af CleanWash på adressen"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
              <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold tracking-wide text-[#0d1f19] backdrop-blur-sm">
                01
              </span>
              <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-xl bg-black/50 px-4 py-2.5 backdrop-blur-sm">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold text-white">Mest populære service</span>
              </div>
            </div>
          </div>
          <div className="lg:pl-6">
            <span className="eyebrow">Udvendig bilvask</span>
            <h2 className="mt-3 section-title">Skinnende ren. Fra top til hjul.</h2>
            <ul className="mt-7 space-y-3.5">
              {[
                "Komplet udvendig vask og skyl",
                "Fælge, hjulbuer og dæksider rengjort",
                "Ruder, spejle og lister aftørret",
                "Miljøvenligt udstyr og teknikker",
                "Vi kommer til dig — ingen kø eller ventetid",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[var(--muted)]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d6f5e8] text-[#1a7a4e]">
                    <Check className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href="/booking"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#0d1f19] px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(8,27,21,0.22)] transition hover:bg-[#162e24] hover:shadow-[0_14px_36px_rgba(8,27,21,0.3)]"
              >
                Book udvendig bilvask
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 02 — Indvendig bilrengøring */}
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:pr-6">
            <span className="eyebrow">Indvendig bilrengøring</span>
            <h2 className="mt-3 section-title">Ren kabine. Frisk fornemmelse.</h2>
            <ul className="mt-7 space-y-3.5">
              {[
                "Grundig støvsugning af kabine og bagagerum",
                "Paneler, instrumentbræt og rat aftørret",
                "Måtter og gulve rengjort i bunden",
                "Sæder og rygstød behandlet",
                "Frisk og lugtfri kabine ved aflevering",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[var(--muted)]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d6f5e8] text-[#1a7a4e]">
                    <Check className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href="/booking"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#0d1f19] px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(8,27,21,0.22)] transition hover:bg-[#162e24] hover:shadow-[0_14px_36px_rgba(8,27,21,0.3)]"
              >
                Book indvendig rengøring
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-3xl shadow-[0_24px_80px_rgba(8,27,21,0.18)]">
            <div className="relative aspect-[4/3]">
              <Image
                src="/service/inside.jpg"
                alt="Indvendig bilrengøring udført af CleanWash"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
              <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold tracking-wide text-[#0d1f19] backdrop-blur-sm">
                02
              </span>
              <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-xl bg-black/50 px-4 py-2.5 backdrop-blur-sm">
                <ShieldCheck className="h-4 w-4 text-[#8ce7ff]" />
                <span className="text-sm font-semibold text-white">Synligt resultat garanteret</span>
              </div>
            </div>
          </div>
        </div>

        {/* 03 — Komplet bilvask (dark featured card) */}
        <div className="overflow-hidden rounded-3xl bg-[#0d1f19] shadow-[0_32px_100px_rgba(8,27,21,0.35)]">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 text-white sm:p-10 lg:p-14">
              <span className="inline-flex rounded-full bg-[#8ce7ff]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#8ce7ff]">
                03 — Anbefalet
              </span>
              <h2 className="mt-4 section-title text-white">Alt i én. Komplet bilvask.</h2>
              <ul className="mt-7 space-y-3.5">
                {[
                  "Udvendig vask + indvendig rengøring",
                  "Fælge, ruder og kabine behandlet",
                  "Klar pris — ingen skjulte tillæg",
                  "Professionelt udstyr og erfarne vaskere",
                  "Perfekt til private og virksomheder",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/78">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8ce7ff]/20 text-[#8ce7ff]">
                      <Check className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/booking"
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-[#0d1f19] shadow-[0_8px_24px_rgba(0,0,0,0.22)] transition hover:bg-[#eef8ff] hover:shadow-[0_14px_36px_rgba(0,0,0,0.32)]"
                >
                  Book komplet bilvask
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/20 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" />
                  Ring til os
                </a>
              </div>
            </div>
            <div className="group relative min-h-72 overflow-hidden">
              <Image
                src="/service/helebil.jpg"
                alt="Komplet bilvask udvendig og indvendig hos CleanWash"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f19]/50 via-[#0d1f19]/10 to-transparent" />
            </div>
          </div>
        </div>

      </section>

      {/* ── Priser ── */}
      <section id="priser" className="mx-auto mt-20 max-w-7xl">
        <div className="text-center">
          <span className="eyebrow">Priser</span>
          <h2 className="mt-4 section-title">Mobil bilvask fra 349 kr.</h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--muted)]">
            Fast pris fra start — ingen skjulte gebyrer. Du betaler kun efter bilvask er udført.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
          {/* Udvendig */}
          <div className="rounded-2xl border border-[var(--line)] bg-white p-8 shadow-[0_18px_48px_rgba(8,27,21,0.07)]">
            <h3 className="font-display text-2xl font-semibold text-[var(--ink)]">Udvendig vask</h3>
            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="text-sm text-[var(--muted)]">fra</span>
              <span className="font-display text-5xl font-bold text-[var(--ink)]">349</span>
              <span className="text-lg font-semibold text-[var(--muted)]">kr.</span>
            </div>
            <ul className="mt-7 space-y-3.5">
              {[
                "Skånsom vask med skum og skyl",
                "Fælge og hjulbuer rengjort",
                "Ruder og spejle aftørret",
                "Finish og tøring af bil",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#19af84]" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/booking"
              className="mt-8 flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-[#0d2e22] text-sm font-semibold text-[#0d2e22] transition hover:bg-[#0d2e22] hover:text-white"
            >
              Vælg pakke <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Komplet — featured */}
          <div className="relative rounded-2xl bg-[#0d2e22] p-8 shadow-[0_32px_80px_rgba(8,27,21,0.30)] lg:-mt-4 lg:pb-10 lg:pt-12">
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#19af84] px-4 py-1.5 text-sm font-bold text-white shadow-[0_4px_16px_rgba(25,175,132,0.4)]">
                <Sparkles className="h-3.5 w-3.5" />
                Mest populær
              </span>
            </div>
            <h3 className="font-display text-2xl font-semibold text-white">Komplet bilvask</h3>
            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="text-sm text-white/60">fra</span>
              <span className="font-display text-5xl font-bold text-white">599</span>
              <span className="text-lg font-semibold text-white/60">kr.</span>
            </div>
            <ul className="mt-7 space-y-3.5">
              {[
                "Alt fra udvendig vask inkluderet",
                "Grundig støvsugning af kabine",
                "Instrumentbræt og paneler rengjort",
                "Vinyl, rat og sæder behandlet",
                "Frisk og klar bil ved aflevering",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#4ade80]" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/booking"
              className="mt-8 flex h-12 items-center justify-center gap-2 rounded-xl bg-[#19af84] text-sm font-semibold text-white shadow-[0_8px_24px_rgba(25,175,132,0.38)] transition hover:bg-[#15976f]"
            >
              Vælg pakke <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Premium */}
          <div className="rounded-2xl border border-[var(--line)] bg-white p-8 shadow-[0_18px_48px_rgba(8,27,21,0.07)]">
            <h3 className="font-display text-2xl font-semibold text-[var(--ink)]">Premium bilpleje</h3>
            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="text-sm text-[var(--muted)]">fra</span>
              <span className="font-display text-5xl font-bold text-[var(--ink)]">849</span>
              <span className="text-lg font-semibold text-[var(--muted)]">kr.</span>
            </div>
            <ul className="mt-7 space-y-3.5">
              {[
                "Alt fra komplet bilvask inkluderet",
                "Polering og voksbeskyttelse",
                "Dybderens af sæder og tæpper",
                "Klargøring til salg eller fremvisning",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#19af84]" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/booking"
              className="mt-8 flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-[#0d2e22] text-sm font-semibold text-[#0d2e22] transition hover:bg-[#0d2e22] hover:text-white"
            >
              Vælg pakke <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="koebenhavn" className="mx-auto mt-16 max-w-7xl">
        <LocalSeoSection
          eyebrow="Bilvask København"
          title="Mobil bilvask i København."
          text="CleanWash gør bilvask i København enkel. Du slipper for kø, kørsel og ventetid. Vi kommer til adressen og udfører professionel bilvask, når bilen alligevel holder stille."
          areas={copenhagenAreas}
          bullets={[
            "Bilvask på adressen i København",
            "Indvendig og udvendig bilrengøring",
            "Fleksibel bilvask til private og erhverv",
            "Nem online booking med nummerpladeopslag",
          ]}
        />
      </section>

      <section id="sjaelland" className="mx-auto mt-8 max-w-7xl">
        <LocalSeoSection
          eyebrow="Bilvask Sjælland"
          title="Bilvask på Sjælland uden besvær."
          text="Har du brug for bilvask på Sjælland, kan CleanWash hjælpe med mobil bilvask, bilpleje og klargøring af bil. Perfekt til hjemmet, arbejdspladsen og virksomheder med flere biler."
          areas={zealandAreas}
          bullets={[
            "Mobil bilvask på Sjælland",
            "Bilpleje Sjælland og Storkøbenhavn",
            "Klargøring af bil før salg eller leasingretur",
            "Erhvervs bilvask og faste aftaler",
          ]}
        />
      </section>

      <section id="hvordan" className="mx-auto mt-16 max-w-7xl">
        <div className="mb-8 max-w-2xl">
          <span className="eyebrow">Sådan fungerer det</span>
          <h2 className="mt-5 section-title">Fire korte trin.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-lg border border-[var(--line)] bg-white/88 p-5 shadow-[0_18px_40px_rgba(8,27,21,0.08)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#123549] text-sm font-semibold text-white">
                {index + 1}
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="rounded-[2rem] bg-[#0d1f19] p-6 text-white shadow-[0_24px_70px_rgba(8,27,21,0.2)] sm:p-8">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#8ce7ff]">
            Hvorfor CleanWash
          </span>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-none sm:text-5xl">
            Mindre ventetid. Mere ren bil.
          </h2>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {whyItems.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl bg-white/8 px-4 py-3">
                <Check className="h-5 w-5 text-[#8ce7ff]" />
                <span className="text-sm font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="section-shell px-6 py-8 sm:px-8">
          <span className="eyebrow">Miljø og hverdag</span>
          <h2 className="mt-5 section-title">Miljøvenlig bilvask med omtanke.</h2>
          <p className="mt-5 support-copy">
            Vi planlægger ruter effektivt og arbejder med professionelt udstyr. Det giver en
            fleksibel bilvask, der passer bedre ind i hverdagen.
          </p>
          <ul className="mt-6 grid gap-3 text-sm font-semibold text-[var(--ink)]">
            <li className="flex gap-3"><Check className="h-5 w-5 text-[#19af84]" /> Mindre spildtid for dig</li>
            <li className="flex gap-3"><Check className="h-5 w-5 text-[#19af84]" /> God løsning til travle adresser</li>
            <li className="flex gap-3"><Check className="h-5 w-5 text-[#19af84]" /> Professionel bilpleje København og Sjælland</li>
          </ul>
        </div>
      </section>

      <section id="erhverv" className="mx-auto mt-16 max-w-7xl">
        <div className="rounded-[2rem] border border-[var(--line)] bg-white/88 p-6 shadow-[0_24px_70px_rgba(8,27,21,0.1)] sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <span className="eyebrow">Erhvervs bilvask</span>
              <h2 className="mt-5 section-title">Ren bilflåde uden intern koordinering.</h2>
              <p className="mt-5 support-copy">
                CleanWash hjælper virksomheder med mobil bilvask og faste aftaler. Godt til
                firmabiler, leasingbiler, taxa, transport og bilforhandlere.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex h-11 items-center justify-center rounded-md bg-[#123549] px-5 text-sm font-semibold text-white transition hover:bg-[#0b2634]"
                >
                  Få erhvervsaftale
                </a>
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex h-11 items-center justify-center rounded-md border border-[var(--line)] px-5 text-sm font-semibold"
                >
                  Ring {siteConfig.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {businessItems.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl bg-[#f4fafc] px-4 py-4">
                  <Building2 className="h-5 w-5 text-[#1f6aa4]" />
                  <span className="font-semibold text-[var(--ink)]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto mt-16 max-w-5xl">
        <div className="text-center">
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-5 section-title">Spørgsmål om bilvask.</h2>
        </div>
        <div className="mt-8 grid gap-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-lg border border-[var(--line)] bg-white/88 p-5 shadow-[0_14px_32px_rgba(8,27,21,0.06)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--ink)]">
                {faq.question}
                <span className="text-[#1f6aa4] transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl">
        <div className="rounded-[2rem] bg-[linear-gradient(135deg,#123549,#1f6aa4)] px-6 py-10 text-white shadow-[0_24px_80px_rgba(31,106,164,0.22)] sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/65">
              Book din bilvask i dag
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-none sm:text-5xl">
              Klar til en renere bil?
            </h2>
            <p className="mt-4 max-w-2xl text-white/76">
              Book professionel bilvask i København og på Sjælland. Eller kontakt CleanWash direkte.
            </p>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <Link
              href="/booking"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-[#123549] transition hover:bg-[#eef8ff]"
            >
              <Search className="h-5 w-5" />
              Book bilvask
            </Link>
            <a
              href={siteConfig.phoneHref}
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/20 px-5 text-sm font-semibold"
            >
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/20 px-5 text-sm font-semibold"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}


function LocalSeoSection({
  eyebrow,
  title,
  text,
  areas,
  bullets,
}: {
  eyebrow: string;
  title: string;
  text: string;
  areas: string[];
  bullets: string[];
}) {
  return (
    <div className="section-shell px-6 py-8 sm:px-8">
      <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-5 section-title">{title}</h2>
          <p className="mt-5 support-copy">{text}</p>
          <ul className="mt-6 grid gap-3">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-sm font-semibold text-[var(--ink)]">
                <MapPinned className="h-5 w-5 shrink-0 text-[#1f6aa4]" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Områder
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {areas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-[var(--line)] bg-white/78 px-4 py-2 text-sm font-semibold text-[var(--ink)]"
              >
                {area}
              </span>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-[#f4fafc] p-5">
            <div className="flex items-center gap-3">
              <Car className="h-6 w-6 text-[#1f6aa4]" />
              <p className="font-semibold text-[var(--ink)]">
                Book mobil bilvask, bilrengøring og bilpleje direkte online.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
