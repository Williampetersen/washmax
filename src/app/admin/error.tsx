"use client";

export default function AdminError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-[#f4f8fb] px-4 py-12 sm:px-6">
      <section className="mx-auto max-w-2xl rounded-[2rem] border border-red-200 bg-white p-8 shadow-[0_24px_70px_rgba(8,27,21,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
          Admin fejl
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-[var(--ink)]">
          Adminpanelet kunne ikke indlaeses
        </h1>
        <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
          Proev igen. Hvis fejlen fortsaetter, skal database- og
          adminmiljoevariablerne kontrolleres i hosting-panelet.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#101820] px-5 text-sm font-semibold text-white transition hover:bg-[#1f2c36]"
          >
            Proev igen
          </button>
          <a
            href="/admin/login"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[var(--line)] bg-white px-5 text-sm font-semibold text-[var(--ink)] transition hover:border-[#55b9df]"
          >
            Til login
          </a>
        </div>
      </section>
    </main>
  );
}
