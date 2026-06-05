import Image from "next/image";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { navItems, siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[1.75rem] border border-black/6 bg-[rgba(255,255,255,0.88)] px-5 py-4 text-[var(--ink)] shadow-[0_18px_60px_rgba(7,19,15,0.12)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Clean Wash"
                width={208}
                height={48}
                className="h-11 w-auto max-w-[13rem] object-contain sm:h-12"
                priority
              />
            </Link>

            <nav className="hidden items-center gap-2 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm text-[var(--muted)] transition hover:bg-black/4 hover:text-[var(--ink)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={siteConfig.phoneHref}
                className="rounded-full border border-black/8 px-4 py-2 text-sm text-[var(--muted)] transition hover:border-black/15 hover:text-[var(--ink)]"
              >
                {siteConfig.phoneDisplay}
              </a>
              <Link
                href="/booking"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#5ec1eb,#39aee0)] px-5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(43,147,220,0.24)] transition hover:brightness-105"
              >
                Se pris og bestil
              </Link>
            </div>

            <details className="group relative lg:hidden">
              <summary className="flex list-none cursor-pointer items-center gap-2 rounded-full border border-black/8 px-4 py-2 text-sm text-[var(--ink)] transition hover:border-black/15">
                <Menu className="h-4 w-4" />
                Menu
              </summary>
              <div className="absolute right-0 top-[calc(100%+0.75rem)] w-[min(20rem,calc(100vw-2rem))] rounded-[1.5rem] border border-black/8 bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-2xl px-4 py-3 text-sm text-[var(--ink)] transition hover:bg-black/4"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-4 grid gap-3">
                  <a
                    href={siteConfig.phoneHref}
                    className="rounded-2xl border border-black/8 px-4 py-3 text-center text-sm text-[var(--ink)]"
                  >
                    Ring: {siteConfig.phoneDisplay}
                  </a>
                  <Link
                    href="/booking"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#5ec1eb,#39aee0)] px-5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(43,147,220,0.24)] transition hover:brightness-105"
                  >
                    Se pris og bestil
                  </Link>
                  <a
                    href={siteConfig.giftCardUrl}
                    className="rounded-2xl border border-black/8 px-4 py-3 text-center text-sm text-[var(--ink)]"
                  >
                    Gavekort
                  </a>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
