import Link from "next/link";
import type { Route } from "next";

const helpfulLinks: { label: string; href: string }[] = [
  { label: "Book bilvask", href: "/booking" },
  { label: "Priser", href: "/bilvask-priser" },
  { label: "Alle ydelser", href: "/ydelser" },
  { label: "Alle områder", href: "/serviceomraader" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function NotFound() {
  return (
    <main className="px-4 pb-12 pt-10 sm:px-6">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-[var(--line)] bg-white p-10 text-center shadow-[0_24px_70px_rgba(11,31,58,0.1)]">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
          404
        </p>
        <h1 className="mt-4 font-display text-5xl font-semibold text-[var(--ink)]">
          Siden blev ikke fundet
        </h1>
        <p className="mt-4 text-base text-[var(--muted)]">
          Linket findes ikke længere, eller adressen er skrevet forkert. Prøv en af siderne
          herunder.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--cta)] px-5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(245,158,11,0.24)] transition hover:bg-[var(--cta-hover)]"
        >
          Gå til forsiden
        </Link>
        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {helpfulLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href as Route}
                className="inline-flex rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--brand)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
