import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="px-4 pb-12 pt-10 sm:px-6">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-[var(--line)] bg-white p-10 text-center shadow-[0_24px_70px_rgba(8,27,21,0.1)]">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2388d1]">
          404
        </p>
        <h1 className="mt-4 font-display text-5xl font-semibold text-[var(--ink)]">
          Siden blev ikke fundet
        </h1>
        <p className="mt-4 text-base text-[var(--muted)]">
          Linket findes ikke laengere eller adressen er skrevet forkert.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#5ec1eb,#39aee0)] px-5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(43,147,220,0.24)] transition hover:brightness-105"
        >
          Ga til forsiden
        </Link>
      </section>
    </main>
  );
}
