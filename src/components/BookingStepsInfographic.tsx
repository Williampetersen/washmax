"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Vælg din bilvask",
    text: "Vælg den løsning, der passer til din bil – udvendig vask, indvendig rengøring eller komplet bilpleje.",
    from: "#E8435A",
    to: "#FF6B80",
    glow: "rgba(232,67,90,0.28)",
    border: "rgba(232,67,90,0.16)",
    fill: "rgba(232,67,90,0.05)",
    blob: "62% 38% 34% 66% / 60% 32% 68% 40%",
  },
  {
    number: "02",
    title: "Book tid online",
    text: "Vælg en ledig tid direkte på booking-siden. Det er hurtigt, enkelt og uden besvær.",
    from: "#F59E0B",
    to: "#FBC645",
    glow: "rgba(245,158,11,0.28)",
    border: "rgba(245,158,11,0.16)",
    fill: "rgba(245,158,11,0.05)",
    blob: "38% 62% 68% 32% / 42% 52% 48% 58%",
  },
  {
    number: "03",
    title: "Mød op – vi klarer resten",
    text: "Kom med bilen til din aftalte tid, og lad Clean Wash sørge for en ren, frisk og velplejet bil.",
    from: "#3B82F6",
    to: "#60A5FA",
    glow: "rgba(59,130,246,0.28)",
    border: "rgba(59,130,246,0.16)",
    fill: "rgba(59,130,246,0.05)",
    blob: "52% 48% 30% 70% / 48% 68% 32% 52%",
  },
] as const;

const TITLE_WORDS = "Så nemt booker du din bilvask".split(" ");

export function BookingStepsInfographic() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hvordan"
      aria-labelledby="steps-infographic-title"
      className="mx-auto mt-12 max-w-7xl overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white/92 px-5 py-12 shadow-[0_24px_70px_rgba(11,31,58,0.10)] sm:px-8 lg:px-10 lg:py-16"
    >
      {/* ── Header ── */}
      <div className="mx-auto max-w-3xl text-center">
        <span
          className="eyebrow"
          style={{
            opacity: inView ? undefined : 0,
            animation: inView ? "word-fade-up 0.5s ease both 50ms" : "none",
          }}
        >
          3 nemme trin
        </span>

        <h2
          id="steps-infographic-title"
          className="mt-5 font-display text-4xl font-semibold leading-none tracking-tight text-[var(--ink)] sm:text-5xl"
          aria-label="Så nemt booker du din bilvask"
        >
          {TITLE_WORDS.map((word, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                opacity: inView ? undefined : 0,
                animation: inView
                  ? `word-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) both ${i * 68 + 150}ms`
                  : "none",
              }}
            >
              {word}
              {i < TITLE_WORDS.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>

        <p
          className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--muted)]"
          style={{
            opacity: inView ? undefined : 0,
            animation: inView
              ? `word-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) both ${TITLE_WORDS.length * 68 + 190}ms`
              : "none",
          }}
        >
          Bilvask på 3 nemme trin – vælg din løsning, find en tid, og lad os gøre bilen ren og klar.
        </p>
      </div>

      {/* ── Steps ── */}
      <div className="relative mx-auto mt-12 max-w-6xl">
        {/* Desktop SVG connectors */}
        <svg
          aria-hidden="true"
          viewBox="0 0 900 110"
          className="pointer-events-none absolute left-1/2 top-14 z-0 hidden h-28 w-[86%] -translate-x-1/2 lg:block"
          fill="none"
          overflow="visible"
        >
          <defs>
            <linearGradient id="steps-cg1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#E8435A" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.55" />
            </linearGradient>
            <linearGradient id="steps-cg2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.55" />
            </linearGradient>
          </defs>

          {/* Connector 1 → 2 */}
          <path
            d="M172 55 C240 18 320 92 392 55"
            stroke="url(#steps-cg1)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="9 9"
            style={{
              opacity: inView ? 1 : 0,
              transition: inView ? "opacity 0.6s ease 0.5s" : "none",
            }}
          />
          {/* Connector 2 → 3 */}
          <path
            d="M508 55 C578 18 660 92 728 55"
            stroke="url(#steps-cg2)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="9 9"
            style={{
              opacity: inView ? 1 : 0,
              transition: inView ? "opacity 0.6s ease 0.9s" : "none",
            }}
          />

          {/* Midpoint dots */}
          <circle
            cx="282"
            cy="50"
            r="5"
            fill="#E8435A"
            style={{ opacity: inView ? 1 : 0, transition: inView ? "opacity 0.3s ease 1.2s" : "none" }}
          />
          <circle
            cx="618"
            cy="50"
            r="5"
            fill="#F59E0B"
            style={{ opacity: inView ? 1 : 0, transition: inView ? "opacity 0.3s ease 1.45s" : "none" }}
          />
        </svg>

        {/* Mobile vertical dashed line */}
        <div
          aria-hidden="true"
          className="absolute bottom-36 left-1/2 top-32 z-0 -translate-x-1/2 border-l-2 border-dashed border-[var(--line)] lg:hidden"
        />

        <ol className="relative z-10 grid gap-12 lg:grid-cols-3 lg:gap-6">
          {steps.map((step, i) => {
            const blobDelay = i * 230;
            const cardDelay = blobDelay + 380;
            const floatDelay = blobDelay + 760;

            return (
              <li key={step.number} className="flex flex-col items-center text-center">
                {/* Float wrapper — separate element so scale-in and float don't conflict */}
                <div
                  style={{
                    animation: inView
                      ? `blob-float 5s ease-in-out ${floatDelay}ms infinite`
                      : "none",
                  }}
                >
                  {/* Blob */}
                  <div
                    className="relative flex h-28 w-28 items-center justify-center"
                    style={{
                      background: `linear-gradient(145deg, ${step.from}, ${step.to})`,
                      borderRadius: step.blob,
                      boxShadow: `0 20px 52px ${step.glow}, 0 4px 16px ${step.glow}`,
                      opacity: inView ? undefined : 0,
                      animation: inView
                        ? `step-blob-in 0.75s cubic-bezier(0.34,1.56,0.64,1) both ${blobDelay}ms`
                        : "none",
                    }}
                  >
                    {/* Inner highlight */}
                    <div
                      className="absolute inset-0"
                      style={{
                        borderRadius: "inherit",
                        background:
                          "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.28), transparent 62%)",
                      }}
                    />
                    <span className="relative font-display text-4xl font-bold leading-none tracking-tight text-white drop-shadow-sm">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Vertical accent line blob → card */}
                <div
                  className="my-4 h-10 w-px"
                  style={{
                    background: `linear-gradient(to bottom, ${step.from}90, transparent)`,
                    opacity: inView ? 1 : 0,
                    transition: inView ? `opacity 0.4s ease ${blobDelay + 360}ms` : "none",
                  }}
                  aria-hidden="true"
                />

                {/* Text card */}
                <article
                  className="w-full max-w-xs rounded-2xl px-6 py-5"
                  style={{
                    border: `1px solid ${step.border}`,
                    background: step.fill,
                    opacity: inView ? undefined : 0,
                    animation: inView
                      ? `step-card-in 0.6s cubic-bezier(0.22,1,0.36,1) both ${cardDelay}ms`
                      : "none",
                  }}
                >
                  <h3 className="font-display text-xl font-semibold leading-tight text-[var(--ink)]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{step.text}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>

      {/* ── CTA ── */}
      <div
        className="mt-12 text-center"
        style={{
          opacity: inView ? undefined : 0,
          animation: inView ? "word-fade-up 0.5s ease both 1100ms" : "none",
        }}
      >
        <Link
          href="/booking"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--cta)] px-6 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(245,158,11,0.24)] transition hover:-translate-y-0.5 hover:bg-[var(--cta-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
        >
          Book bilvask nu
          <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="mt-3 text-sm font-medium text-[var(--muted)]">
          Det tager kun få minutter at booke din tid.
        </p>
      </div>
    </section>
  );
}
