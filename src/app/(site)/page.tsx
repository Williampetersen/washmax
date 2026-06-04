import { Clock3, Gift, MapPinned, Search, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { HomePlateForm } from "@/components/home-plate-form";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { vehicleCategories } from "@/lib/shared/booking";

const trustItems = [
  {
    icon: Clock3,
    title: "Alle ugens dage",
    text: "Book mobil bilrengoring nar bilen alligevel holder stille.",
  },
  {
    icon: MapPinned,
    title: "Vi kommer til dig",
    text: "Privatadresse, arbejdsplads eller parkeringsanlaeg pa Sjaelland.",
  },
  {
    icon: ShieldCheck,
    title: "Tydelig pris",
    text: "Nummerpladen finder bilkategori og pris for dig.",
  },
];

export default function HomePage() {
  return (
    <main id="top" className="px-4 pb-12 sm:px-6">
      <section className="-mx-4 sm:-mx-6">
        <div className="relative overflow-hidden bg-[#071611]">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,9,8,0.88)_0%,rgba(5,17,13,0.68)_54%,rgba(7,21,17,0.42)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(3,9,8,0.78))]" />

          <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:px-10">
            <div className="max-w-3xl text-white">
              <p className="text-sm font-semibold uppercase text-[#61c8f4]">
                Mobil bilrengoring hos dig
              </p>
              <h1 className="mt-4 max-w-2xl font-display text-[clamp(3rem,7vw,5.9rem)] font-semibold leading-none text-white">
                Beregn pris online
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-white/78">
                Sla nummerpladen op, fa bilen fundet automatisk og ga direkte videre
                til booking med den rigtige bilkategori.
              </p>

              <HomePlateForm />

              <p className="mt-3 max-w-2xl text-xs font-semibold text-white/88">
                Vaelg rengoring af hele bilen og spar min. 398 kr. inkl. gratis
                voksbehandling.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {trustItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-white/82 backdrop-blur-sm"
                    >
                      <Icon className="h-5 w-5 text-[#61c8f4]" />
                      <span className="font-semibold">{item.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="hidden justify-center lg:flex">
              <div className="relative flex h-64 w-64 rotate-[7deg] items-center justify-center rounded-full border-[8px] border-white/85 bg-[radial-gradient(circle_at_40%_30%,#a8ea62,#7bc93b_58%,#62aa24_100%)] p-8 text-center text-white shadow-[0_28px_70px_rgba(0,0,0,0.3)]">
                <div className="absolute inset-[0.65rem] rounded-full border border-white/70" />
                <div className="absolute inset-[1.35rem] rounded-full border border-white/25" />
                <div className="relative z-10 -rotate-[7deg]">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/84">
                    Bestil komplet bilrengoring
                  </p>
                  <p className="mt-4 font-display text-3xl font-semibold leading-tight">
                    Fa gratis voksbehandling
                  </p>
                  <p className="mt-2 text-2xl font-semibold leading-tight">
                    &amp; hel bils rabat
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/82">
                    Spar minimum
                  </p>
                  <p className="font-display text-5xl font-semibold leading-none">398,-</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="section-shell px-6 py-8 sm:px-8">
            <span className="eyebrow">Prislogik</span>
            <h2 className="mt-5 section-title">Den rigtige kategori uden gaetteri.</h2>
            <p className="mt-5 support-copy">
              Nummerpladen bruges til at finde biltype og totalvaegt. Derfor kan
              WashMax vise den rigtige pris, for kunden gar videre i bookingflowet.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {vehicleCategories.map((rule) => (
              <article
                key={rule.id}
                className="rounded-lg border border-[var(--line)] bg-white/86 p-5 shadow-[0_18px_40px_rgba(8,27,21,0.08)]"
              >
                <p className="text-xs font-semibold uppercase text-[var(--muted)]">
                  Bilkategori
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-[var(--ink)]">
                  {rule.label}
                </h3>
                <p className="mt-2 text-3xl font-semibold text-[#2388d1]">
                  {rule.price.toLocaleString("da-DK")} kr
                </p>
                <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                  {rule.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl">
        <div className="rounded-lg bg-[#0d1f19] px-6 py-8 text-white shadow-[0_24px_70px_rgba(8,27,21,0.2)] sm:px-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div>
            <p className="text-sm font-semibold uppercase text-[#88ddc2]">WashMax</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Klar til en renere bil uden turen til vaskehallen?
            </h2>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <Link
              href="/booking"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-[#0d1f19] transition hover:bg-[#eef8f4]"
            >
              <Search className="h-5 w-5" />
              Beregn pris
            </Link>
            <a
              href={siteConfig.giftCardUrl}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/18 px-5 text-sm font-semibold text-white transition hover:bg-white/8"
            >
              <Gift className="h-5 w-5" />
              Gavekort
            </a>
            <a
              href={siteConfig.phoneHref}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-white/18 px-5 text-sm text-white/85 transition hover:bg-white/8"
            >
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
