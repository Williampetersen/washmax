"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Sparkles } from "lucide-react";

const STEPS = [
  {
    number: "01",
    Icon: CalendarDays,
    title: "Bestil på 2 min.",
    text: "Vælg tid, sted og service direkte online – ingen ventetid, ingen kø.",
  },
  {
    number: "02",
    Icon: MapPin,
    title: "Vi kører til dig",
    text: "Vi møder op præcis der, hvor bilen holder – hjemme, på job eller i garagen.",
  },
  {
    number: "03",
    Icon: Sparkles,
    title: "Bilen skinner igen",
    text: "Sæt dig ind i en frisk og skinnende ren bil. Vi håndterer det hele.",
  },
] as const;

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
      aria-labelledby="steps-title"
      className="mx-auto mt-12 max-w-7xl overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white/92 px-5 py-12 shadow-[0_24px_70px_rgba(11,31,58,0.10)] sm:px-8 lg:px-10 lg:py-16"
    >
      {/* ── Header ── */}
      <div className="mx-auto max-w-xl text-center">
        <span
          className="eyebrow"
          style={{
            opacity: inView ? undefined : 0,
            animation: inView ? "word-fade-up 0.5s ease both 50ms" : "none",
          }}
        >
          Vores koncept
        </span>
        <h2
          id="steps-title"
          className="mt-4 font-display text-4xl font-semibold leading-none tracking-tight text-[var(--ink)] sm:text-5xl"
          style={{
            opacity: inView ? undefined : 0,
            animation: inView ? "word-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) both 150ms" : "none",
          }}
        >
          Så nemt er det
        </h2>
      </div>

      {/* ── Steps ── */}
      <div className="relative mx-auto mt-12 max-w-5xl">

        {/* Dashed connector line — desktop only */}
        <div
          aria-hidden="true"
          className="absolute left-[16.67%] right-[16.67%] top-5 hidden border-t-2 border-dashed border-[#dceef2] lg:block"
          style={{
            opacity: inView ? 1 : 0,
            transition: inView ? "opacity 0.6s ease 0.4s" : "none",
          }}
        />

        <ol className="grid gap-8 lg:grid-cols-3">
          {STEPS.map(({ number, Icon, title, text }, i) => (
            <li
              key={number}
              className="flex flex-col items-center text-center"
              style={{
                opacity: inView ? undefined : 0,
                animation: inView
                  ? `step-card-in 0.55s cubic-bezier(0.22,1,0.36,1) both ${i * 160 + 300}ms`
                  : "none",
              }}
            >
              {/* Step number bubble — sits on top of the connector line */}
              <div
                className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-bold text-white"
                style={{
                  background: "var(--brand)",
                  boxShadow: "0 4px 20px rgba(0,167,184,0.32)",
                }}
              >
                {number}
              </div>

              {/* Card */}
              <div className="mt-5 w-full rounded-2xl border border-[var(--line)] bg-white p-6 text-left shadow-[0_8px_32px_rgba(11,31,58,0.07)]">
                {/* Icon block */}
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#eefbfc]">
                  <Icon className="h-7 w-7 text-[var(--brand)]" />
                </div>

                <h3 className="mt-5 font-display text-xl font-bold leading-tight text-[var(--ink)]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* ── CTA ── */}
      <div
        className="mt-10 text-center"
        style={{
          opacity: inView ? undefined : 0,
          animation: inView ? "word-fade-up 0.5s ease both 900ms" : "none",
        }}
      >
        <Link
          href="/booking"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--cta)] px-7 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(245,158,11,0.24)] transition hover:-translate-y-0.5 hover:bg-[var(--cta-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
        >
          Book bilvask nu
          <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="mt-3 text-sm font-medium text-[var(--muted)]">
          Det tager kun få minutter.
        </p>
      </div>
    </section>
  );
}
