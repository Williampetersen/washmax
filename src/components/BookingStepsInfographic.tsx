"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


/* ─────────────────────────────────────────────────────────
   STEP 1 — Service picker with animated cursor
───────────────────────────────────────────────────────── */
function Step1Anim() {
  const options = ["Udvendig vask", "Komplet bilvask", "Premium bilpleje"];
  return (
    <>
      <style>{`
        @keyframes s1-cursor {
          0%,8%    { transform:translate(20px,148px); opacity:0; }
          16%      { transform:translate(20px,148px); opacity:1; }
          36%      { transform:translate(20px,52px);  opacity:1; }
          41%,43%  { transform:translate(20px,52px) scale(.85); opacity:1; }
          48%,80%  { transform:translate(20px,52px);  opacity:1; }
          91%      { transform:translate(20px,52px);  opacity:0; }
          100%     { transform:translate(20px,148px); opacity:0; }
        }
        @keyframes s1-ripple {
          0%,40%   { opacity:0; transform:translate(6px,38px) scale(.2); }
          45%      { opacity:.65; transform:translate(6px,38px) scale(1); }
          54%      { opacity:0;  transform:translate(6px,38px) scale(2.4); }
          100%     { opacity:0; }
        }
        @keyframes s1-opt2-bg {
          0%,38%   { border-color:rgba(11,31,58,.1); background:rgba(255,255,255,.6); }
          50%,80%  { border-color:#E8435A;            background:rgba(232,67,90,.08); }
          92%,100% { border-color:rgba(11,31,58,.1); background:rgba(255,255,255,.6); }
        }
        @keyframes s1-opt2-text {
          0%,38%   { color:#9ca3af; }
          50%,80%  { color:#E8435A; }
          92%,100% { color:#9ca3af; }
        }
        @keyframes s1-check {
          0%,38%   { opacity:0; transform:scale(0); }
          52%,80%  { opacity:1; transform:scale(1); }
          92%,100% { opacity:0; transform:scale(0); }
        }
      `}</style>

      <div className="relative h-40 select-none overflow-hidden px-4 pt-3">
        {options.map((label, i) => {
          const active = i === 1;
          return (
            <div
              key={label}
              className="mb-2 flex items-center gap-2.5 rounded-xl border px-3 py-2"
              style={
                active
                  ? { animation: "s1-opt2-bg 4.5s ease-in-out infinite" }
                  : { borderColor: "rgba(11,31,58,.1)", background: "rgba(255,255,255,.6)" }
              }
            >
              {/* Radio dot */}
              <div className="relative h-4 w-4 shrink-0">
                <div
                  className="h-4 w-4 rounded-full border-2"
                  style={{ borderColor: "currentColor", opacity: 0.3 }}
                />
                {active && (
                  <svg
                    className="absolute inset-0"
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    style={{ animation: "s1-check 4.5s ease-in-out infinite" }}
                  >
                    <circle cx="8" cy="8" r="8" fill="#E8435A" />
                    <path
                      d="M4.5 8.4L7 11 11.5 5.5"
                      stroke="white" strokeWidth="1.7"
                      strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span
                className="text-xs font-semibold"
                style={active ? { animation: "s1-opt2-text 4.5s ease-in-out infinite" } : { color: "#9ca3af" }}
              >
                {label}
              </span>
            </div>
          );
        })}

        {/* Click ripple ring */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-7 w-7 rounded-full border-[2px] border-[#E8435A]"
          style={{ animation: "s1-ripple 4.5s ease-in-out infinite" }}
        />

        {/* Arrow cursor */}
        <svg
          className="pointer-events-none absolute left-0 top-0 drop-shadow-sm"
          style={{ animation: "s1-cursor 4.5s ease-in-out infinite" }}
          width="20" height="24" viewBox="0 0 20 24" fill="none"
        >
          <path
            d="M2 2L2 19L7 14.5L9.8 21.5L12.2 20.5L9.4 13.5H16L2 2Z"
            fill="white" stroke="#1F2937" strokeWidth="1.4" strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   STEP 2 — Calendar with animated date selection
───────────────────────────────────────────────────────── */
function Step2Anim() {
  const DAYS = ["M", "T", "O", "T", "F", "L", "S"];
  // June 2026 starts on Monday
  const WEEKS = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
  ];

  return (
    <>
      <style>{`
        @keyframes s2-cell {
          0%,12%    { background:transparent; color:#374151; transform:scale(1); box-shadow:none; }
          32%,68%   { background:#F59E0B; color:#fff; transform:scale(1.22);
                      box-shadow:0 4px 18px rgba(245,158,11,.38); border-radius:8px; }
          86%,100%  { background:transparent; color:#374151; transform:scale(1); box-shadow:none; }
        }
        @keyframes s2-slot {
          0%,28%    { opacity:0; transform:translateY(8px); }
          48%,70%   { opacity:1; transform:translateY(0); }
          86%,100%  { opacity:0; transform:translateY(8px); }
        }
      `}</style>

      <div className="px-4 pt-3">
        {/* Month header */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#374151]">Juni 2026</span>
          <span className="cursor-default select-none text-xs text-[#9ca3af]">‹ ›</span>
        </div>

        {/* Day labels */}
        <div className="mb-1 grid grid-cols-7 text-center">
          {DAYS.map((d, i) => (
            <span key={i} className="text-[9px] font-bold text-[#9ca3af]">{d}</span>
          ))}
        </div>

        {/* Date grid */}
        {WEEKS.map((week, wi) => (
          <div key={wi} className="mb-0.5 grid grid-cols-7 text-center">
            {week.map((d) => (
              <div
                key={d}
                className="flex h-[22px] items-center justify-center text-[10px] font-semibold"
                style={
                  d === 17
                    ? { animation: "s2-cell 4.5s ease-in-out infinite" }
                    : { color: "#374151" }
                }
              >
                {d}
              </div>
            ))}
          </div>
        ))}

        {/* Time slot pill */}
        <div
          className="mt-2.5 flex items-center justify-center gap-1.5 rounded-lg border border-[rgba(245,158,11,.28)] bg-[rgba(245,158,11,.07)] px-3 py-1.5"
          style={{ animation: "s2-slot 4.5s ease-in-out infinite" }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <circle cx="5.5" cy="5.5" r="5" stroke="#F59E0B" />
            <path d="M5.5 2.5v3l2 1.5" stroke="#F59E0B" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
          <span className="text-[10px] font-bold text-[#F59E0B]">10:00 – 11:00</span>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   STEP 3 — Minimal circular confirmation
───────────────────────────────────────────────────────── */
function Step3Anim() {
  const R = 30;
  const C = 188; // ≈ 2π × 30

  return (
    <>
      <style>{`
        @keyframes s3-ring {
          0%,5%     { stroke-dashoffset:${C}; opacity:0; }
          10%       { opacity:1; }
          42%,82%   { stroke-dashoffset:0; opacity:1; }
          95%,100%  { stroke-dashoffset:0; opacity:0; }
        }
        @keyframes s3-tick {
          0%,40%    { stroke-dashoffset:52; opacity:0; }
          58%,82%   { stroke-dashoffset:0;  opacity:1; }
          95%,100%  { stroke-dashoffset:0;  opacity:0; }
        }
        @keyframes s3-label {
          0%,54%    { opacity:0; transform:translateY(5px); }
          70%,80%   { opacity:1; transform:translateY(0); }
          94%,100%  { opacity:0; transform:translateY(5px); }
        }
        @keyframes s3-bg {
          0%,8%     { transform:scale(.5); opacity:0; }
          38%,82%   { transform:scale(1);  opacity:1; }
          95%,100%  { transform:scale(.5); opacity:0; }
        }
      `}</style>

      <div className="flex h-40 flex-col items-center justify-center gap-3">
        <div className="relative flex items-center justify-center">
          {/* Soft glow behind circle */}
          <div
            className="absolute h-20 w-20 rounded-full bg-[rgba(59,130,246,.10)]"
            style={{ animation: "s3-bg 5s ease-in-out infinite" }}
          />

          <svg width="76" height="76" viewBox="0 0 76 76" fill="none">
            {/* Animated ring */}
            <circle
              cx="38" cy="38" r={R}
              stroke="#3B82F6"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              style={{
                strokeDasharray: C,
                animation: "s3-ring 5s ease-in-out infinite",
                transformOrigin: "center",
                transform: "rotate(-90deg)",
              }}
            />
            {/* Checkmark */}
            <path
              d="M24 38L33 48L52 28"
              stroke="#3B82F6"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              style={{
                strokeDasharray: 52,
                animation: "s3-tick 5s ease-in-out infinite",
              }}
            />
          </svg>
        </div>

        {/* Label */}
        <span
          className="text-sm font-bold text-[#3B82F6]"
          style={{ animation: "s3-label 5s ease-in-out infinite" }}
        >
          Bil klar!
        </span>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   STEPS DATA
───────────────────────────────────────────────────────── */
const STEPS = [
  {
    number: "01",
    color: "#E8435A",
    glow: "rgba(232,67,90,.20)",
    border: "rgba(232,67,90,.15)",
    bg: "rgba(232,67,90,.04)",
    title: "Vælg din bilvask",
    text: "Udvendig, indvendig eller komplet – vælg hvad din bil har brug for.",
  },
  {
    number: "02",
    color: "#F59E0B",
    glow: "rgba(245,158,11,.20)",
    border: "rgba(245,158,11,.15)",
    bg: "rgba(245,158,11,.04)",
    title: "Book tid online",
    text: "Vælg en ledig tid i kalenderen – hurtigt og uden ventetid.",
  },
  {
    number: "03",
    color: "#3B82F6",
    glow: "rgba(59,130,246,.20)",
    border: "rgba(59,130,246,.15)",
    bg: "rgba(59,130,246,.04)",
    title: "Vi klarer resten",
    text: "Vi møder op til din aftalte tid og vasker bilen professionelt.",
  },
] as const;

const ANIMS = [<Step1Anim key="s1" />, <Step2Anim key="s2" />, <Step3Anim key="s3" />];

/* ─────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────── */
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
      </div>

      {/* ── Cards ── */}
      <div className="relative mx-auto mt-10 max-w-6xl">

        {/* Desktop connector lines */}
        <svg
          aria-hidden="true"
          viewBox="0 0 900 60"
          className="pointer-events-none absolute left-1/2 top-5 z-0 hidden h-14 w-[58%] -translate-x-1/2 lg:block"
          fill="none"
        >
          <defs>
            <linearGradient id="sg1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#E8435A" stopOpacity=".5" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity=".5" />
            </linearGradient>
            <linearGradient id="sg2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity=".5" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity=".5" />
            </linearGradient>
          </defs>
          <path
            d="M60 30 C200 8 280 52 440 30"
            stroke="url(#sg1)" strokeWidth="2" strokeDasharray="7 7" strokeLinecap="round"
            style={{ opacity: inView ? 1 : 0, transition: inView ? "opacity .7s ease .5s" : "none" }}
          />
          <path
            d="M460 30 C620 8 700 52 840 30"
            stroke="url(#sg2)" strokeWidth="2" strokeDasharray="7 7" strokeLinecap="round"
            style={{ opacity: inView ? 1 : 0, transition: inView ? "opacity .7s ease .9s" : "none" }}
          />
          <circle cx="250" cy="22" r="4.5" fill="#E8435A"
            style={{ opacity: inView ? 1 : 0, transition: inView ? "opacity .3s ease 1.25s" : "none" }} />
          <circle cx="650" cy="38" r="4.5" fill="#F59E0B"
            style={{ opacity: inView ? 1 : 0, transition: inView ? "opacity .3s ease 1.5s" : "none" }} />
        </svg>

        <ol className="relative z-10 grid gap-5 lg:grid-cols-3">
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
              {/* Animation illustration */}
              <div className="border-b" style={{ borderColor: step.border }}>
                {ANIMS[i]}
              </div>

              {/* Text content */}
              <div className="flex items-start gap-3 px-5 py-4">
                <span
                  className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-display text-xs font-bold text-white"
                  style={{ background: step.color, boxShadow: `0 4px 14px ${step.glow}` }}
                >
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-[var(--ink)]">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{step.text}</p>
                </div>
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
