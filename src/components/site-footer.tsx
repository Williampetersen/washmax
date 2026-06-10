import Image from "next/image";
import Link from "next/link";
import { navItems, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="px-4 pb-8 pt-16 sm:px-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[#081a14] px-6 py-10 text-white shadow-[0_24px_80px_rgba(6,18,15,0.22)] sm:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.8fr_0.8fr]">
          <div className="max-w-xl">
            <Image
              src="/logo.png"
              alt="CleanWash professionel bilvask"
              width={220}
              height={48}
              className="h-12 w-auto max-w-[14rem] object-contain"
            />
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Mobil bilvask i København og på Sjælland.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/68 sm:text-base">
              CleanWash kommer ud til dig privat, på jobbet eller der hvor bilen holder.
              Book online på få minutter og få professionel bilrengøring uden kø.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
              Hurtige links
            </h3>
            <div className="mt-5 grid gap-3 text-sm text-white/75">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              ))}
              <Link href="/booking" className="transition hover:text-white">
                Book bilvask
              </Link>
              <a href={`mailto:${siteConfig.email}`} className="transition hover:text-white">
                Skriv til os
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
              Kontakt
            </h3>
            <div className="mt-5 grid gap-3 text-sm text-white/75">
              <a href={siteConfig.phoneHref} className="transition hover:text-white">
                {siteConfig.phoneDisplay}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="transition hover:text-white">
                {siteConfig.email}
              </a>
              <p>Alle ugens dage kl. 08-17</p>
              <p>Dækker København, Storkøbenhavn og store dele af Sjælland</p>
            </div>
            <Link
              href="/booking"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#2cd2a6,#15946f)] px-5 text-sm font-semibold text-[#04150f] shadow-[0_18px_40px_rgba(17,148,111,0.22)] transition hover:brightness-105"
            >
              Book bilvask
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} CleanWash. Alle rettigheder forbeholdes.</p>
          <p>Ekstra kørsel udenfor dækningsområdet kan udløse et tillæg.</p>
        </div>
      </div>
    </footer>
  );
}
