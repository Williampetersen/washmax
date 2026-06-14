"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TITLE_WORDS = "Så nemt booker du din bilvask".split(" ");

const STEPS = [
  {
    number: "01",
    svg: "/steps/step1.svg",
    title: "Vælg din bilvask",
    text: "Udvendig, indvendig eller komplet – vælg den løsning der passer dig.",
    color: "#E8435A",
    glow: "rgba(232,67,90,0.18)",
    border: "rgba(232,67,90,0.14)",
    bg: "rgba(232,67,90,0.04)",
  },
  {
    number: "02",
    svg: "/steps/step2.svg",
    title: "Book tid online",
    text: "Vælg en ledig tid i kalenderen – hurtigt og uden ventetid.",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.18)",
    border: "rgba(245,158,11,0.14)",
    bg: "rgba(245,158,11,0.04)",
  },
  {
    number: "03",
    svg: "/steps/step3.svg",
    title: "Vi klarer resten",
    text: "Vi møder op til din aftalte tid og vasker bilen professionelt.",
    color: "#3B82F6",
    glow: "rgba(59,130,246,0.18)",
    border: "rgba(59,130,246,0.14)",
    bg: "rgba(59,130,246,0.04)",
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
      <div className="mx-auto max-w-2xl text-center">
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
          id="steps-title"
          className="mt-4 font-display text-4xl font-semibold leading-none tracking-tight text-[var(--ink)] sm:text-5xl"
          aria-label="Så nemt booker du din bilvask"
        >
          {TITLE_WORDS.map((word, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                opacity: inView ? undefined : 0,
                animation: inView
                  ? `word-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) both ${i * 65 + 150}ms`
                  : "none",
              }}
            >
              {word}
              {i < TITLE_WORDS.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>
      </div>

      {/* ── Cards ── */}
      <ol className="mx-auto mt-10 grid max-w-6xl gap-5 lg:grid-cols-3">
        {STEPS.map((step, i) => (
          <li
            key={step.number}
            className="flex flex-col overflow-hidden rounded-2xl"
            style={{
              border: `1px solid ${step.border}`,
              background: step.bg,
              opacity: inView ? undefined : 0,
              animation: inView
                ? `step-card-in 0.6s cubic-bezier(0.22,1,0.36,1) both ${i * 180 + 350}ms`
                : "none",
            }}
          >
            {/* Illustration */}
            <div className="flex items-center justify-center px-6 pt-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={step.svg}
                alt=""
                aria-hidden="true"
                className="h-40 w-full object-contain"
              />
            </div>

            {/* Content */}
            <div className="px-6 pb-6 pt-4">
              <div className="flex items-center gap-2.5">
                <span
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-display text-xs font-bold text-white"
                  style={{
                    background: step.color,
                    boxShadow: `0 4px 14px ${step.glow}`,
                  }}
                >
                  {step.number}
                </span>
                <h3 className="font-display text-base font-semibold text-[var(--ink)]">
                  {step.title}
                </h3>
              </div>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* ── CTA ── */}
      <div
        className="mt-10 text-center"
        style={{
          opacity: inView ? undefined : 0,
          animation: inView ? "word-fade-up 0.5s ease both 950ms" : "none",
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
