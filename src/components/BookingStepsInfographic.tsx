"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TITLE_WORDS = "Så nemt booker du din bilvask".split(" ");

/* ──────────────────────────────────────────────
   Step 1 – animated service picker with cursor
────────────────────────────────────────────── */
function Step1Anim() {
  return (
    <>
      <style>{`
        @keyframes s1-cursor {
          0%,8%   { transform: translate(36px,110px); opacity:0; }
          18%     { transform: translate(36px,110px); opacity:1; }
          38%     { transform: translate(36px,44px);  opacity:1; }
          43%,45% { transform: translate(36px,44px) scale(.86); opacity:1; }
          48%,80% { transform: translate(36px,44px);  opacity:1; }
          92%     { transform: translate(36px,44px);  opacity:0; }
          100%    { transform: translate(36px,110px); opacity:0; }
        }
        @keyframes s1-click-ring {
          0%,42%  { opacity:0; transform:translate(42px,50px) scale(.3); }
          46%     { opacity:.7; transform:translate(42px,50px) scale(1); }
          52%     { opacity:0; transform:translate(42px,50px) scale(1.8); }
          100%    { opacity:0; }
        }
        @keyframes s1-highlight {
          0%,42%  { background:rgba(255,255,255,.6); border-color:rgba(11,31,58,.1); color:#9ca3af; }
          52%,80% { background:rgba(232,67,90,.09); border-color:#E8435A; color:#E8435A; }
          93%,100%{ background:rgba(255,255,255,.6); border-color:rgba(11,31,58,.1); color:#9ca3af; }
        }
        @keyframes s1-check {
          0%,42%  { opacity:0; transform:scale(0); }
          52%,80% { opacity:1; transform:scale(1); }
          93%,100%{ opacity:0; transform:scale(0); }
        }
      `}</style>

      <div className="relative h-36 w-full select-none overflow-hidden px-4 pt-3">
        {/* Option 1 */}
        <div className="mb-2 flex items-center gap-2 rounded-xl border border-[rgba(11,31,58,.1)] bg-white/60 px-3 py-2">
          <div className="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-[rgba(11,31,58,.2)]" />
          <span className="text-xs font-semibold text-[#9ca3af]">Udvendig vask</span>
        </div>

        {/* Option 2 – animated */}
        <div
          className="mb-2 flex items-center gap-2 rounded-xl border px-3 py-2"
          style={{ animation: "s1-highlight 4s ease-in-out infinite" }}
        >
          <div className="relative h-3.5 w-3.5 shrink-0">
            <div className="absolute inset-0 rounded-full border-2 border-current opacity-40" />
            <svg
              className="absolute inset-0"
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              style={{ animation: "s1-check 4s ease-in-out infinite" }}
            >
              <circle cx="7" cy="7" r="7" fill="#E8435A" />
              <path d="M4 7.2l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-xs font-semibold">Komplet bilvask</span>
        </div>

        {/* Option 3 */}
        <div className="mb-2 flex items-center gap-2 rounded-xl border border-[rgba(11,31,58,.1)] bg-white/60 px-3 py-2">
          <div className="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-[rgba(11,31,58,.2)]" />
          <span className="text-xs font-semibold text-[#9ca3af]">Premium bilpleje</span>
        </div>

        {/* Click ripple */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-6 w-6 rounded-full border-2 border-[#E8435A]"
          style={{ animation: "s1-click-ring 4s ease-in-out infinite" }}
        />

        {/* Cursor */}
        <div
          className="pointer-events-none absolute left-0 top-0"
          style={{ animation: "s1-cursor 4s ease-in-out infinite" }}
        >
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
            <path
              d="M1.5 1.5L1.5 17L5.5 13L8 20L10 19L7.5 12H13L1.5 1.5Z"
              fill="white" stroke="#374151" strokeWidth="1.3" strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

/* ──────────────────────────────────────────────
   Step 2 – animated calendar + time slot
────────────────────────────────────────────── */
function Step2Anim() {
  const DAYS = ["M", "T", "O", "T", "F", "L", "S"];
  const WEEKS = [
    [null, null, null, null, null, 1, 2],
    [3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
  ];

  return (
    <>
      <style>{`
        @keyframes s2-cell {
          0%,15%  { background:transparent; color:#374151; transform:scale(1); box-shadow:none; }
          35%,70% { background:#F59E0B; color:white; transform:scale(1.18);
                    box-shadow:0 4px 14px rgba(245,158,11,.38); border-radius:8px; }
          85%,100%{ background:transparent; color:#374151; transform:scale(1); box-shadow:none; }
        }
        @keyframes s2-timeslot {
          0%,28%  { opacity:0; transform:translateY(8px); }
          48%,72% { opacity:1; transform:translateY(0); }
          88%,100%{ opacity:0; transform:translateY(8px); }
        }
      `}</style>

      <div className="px-4 pt-3">
        {/* Month + nav */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#374151]">Juni 2026</span>
          <div className="flex gap-1 text-[#9ca3af]">
            <span className="cursor-pointer px-1 text-xs">‹</span>
            <span className="cursor-pointer px-1 text-xs">›</span>
          </div>
        </div>

        {/* Day headers */}
        <div className="mb-1 grid grid-cols-7">
          {DAYS.map((d, i) => (
            <div key={i} className="text-center text-[9px] font-semibold text-[#9ca3af]">{d}</div>
          ))}
        </div>

        {/* Dates */}
        {WEEKS.map((week, wi) => (
          <div key={wi} className="mb-0.5 grid grid-cols-7">
            {week.map((d, di) => (
              <div
                key={di}
                className="flex h-6 w-full items-center justify-center rounded-lg text-[10px] font-semibold"
                style={
                  d === 17
                    ? { animation: "s2-cell 4.5s ease-in-out infinite" }
                    : { color: d ? "#374151" : "transparent" }
                }
              >
                {d ?? "."}
              </div>
            ))}
          </div>
        ))}

        {/* Time slot */}
        <div
          className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-[rgba(245,158,11,.3)] bg-[rgba(245,158,11,.06)] px-3 py-1.5"
          style={{ animation: "s2-timeslot 4.5s ease-in-out infinite" }}
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

/* ──────────────────────────────────────────────
   Step 3 – van drives to house
────────────────────────────────────────────── */
function Step3Anim() {
  return (
    <>
      <style>{`
        @keyframes s3-van {
          0%      { transform: translateX(-130%); }
          52%     { transform: translateX(0%); }
          60%,85% { transform: translateX(-3%); }
          100%    { transform: translateX(-130%); }
        }
        @keyframes s3-sparkle1 {
          0%,50%  { opacity:0; transform:scale(0) rotate(0deg); }
          65%,78% { opacity:1; transform:scale(1) rotate(15deg); }
          90%,100%{ opacity:0; transform:scale(.3) rotate(30deg); }
        }
        @keyframes s3-sparkle2 {
          0%,53%  { opacity:0; transform:scale(0) rotate(0deg); }
          68%,80% { opacity:1; transform:scale(1) rotate(-10deg); }
          92%,100%{ opacity:0; transform:scale(.3) rotate(-20deg); }
        }
        @keyframes s3-wheel {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes s3-road-line {
          from { transform: translateX(0); }
          to   { transform: translateX(-40px); }
        }
      `}</style>

      <div className="relative h-36 w-full overflow-hidden">
        {/* Sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#EFF6FF] to-[#DBEAFE] opacity-60" />

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#E5E7EB]" />

        {/* Road */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#4B5563]">
          {/* Road lines */}
          <div className="relative h-full overflow-hidden">
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="absolute top-1/2 h-1 w-8 -translate-y-1/2 bg-[#FCD34D] opacity-80"
                style={{
                  left: n * 40,
                  animation: "s3-road-line 0.6s linear infinite",
                }}
              />
            ))}
          </div>
        </div>

        {/* House */}
        <div className="absolute bottom-8 right-4">
          <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
            {/* Roof */}
            <path d="M4 26L27 4L50 26H4Z" fill="#F59E0B" />
            <path d="M4 26L27 4L50 26" stroke="#D97706" strokeWidth="1" />
            {/* Walls */}
            <rect x="10" y="25" width="34" height="29" fill="#FEF3C7" />
            <rect x="10" y="25" width="34" height="29" stroke="#D97706" strokeWidth="0.5" />
            {/* Door */}
            <rect x="21" y="37" width="12" height="17" rx="1" fill="#92400E" />
            <circle cx="31" cy="46" r="1" fill="#FCD34D" />
            {/* Windows */}
            <rect x="12" y="29" width="9" height="8" rx="1" fill="#BFDBFE" />
            <line x1="16.5" y1="29" x2="16.5" y2="37" stroke="#93C5FD" strokeWidth="0.8" />
            <line x1="12" y1="33" x2="21" y2="33" stroke="#93C5FD" strokeWidth="0.8" />
            <rect x="33" y="29" width="9" height="8" rx="1" fill="#BFDBFE" />
            <line x1="37.5" y1="29" x2="37.5" y2="37" stroke="#93C5FD" strokeWidth="0.8" />
            <line x1="33" y1="33" x2="42" y2="33" stroke="#93C5FD" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Van wrapper (animated) */}
        <div
          className="absolute bottom-8 right-[58px]"
          style={{ animation: "s3-van 5s ease-in-out infinite" }}
        >
          {/* Sparkle 1 */}
          <div
            className="pointer-events-none absolute -right-5 -top-3"
            style={{ animation: "s3-sparkle1 5s ease-in-out infinite" }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 1l1.4 5.6L16 9l-5.6 1.4L9 16l-1.4-5.6L2 9l5.6-1.4L9 1Z" fill="#F59E0B" />
            </svg>
          </div>

          {/* Sparkle 2 */}
          <div
            className="pointer-events-none absolute -right-1 -top-6"
            style={{ animation: "s3-sparkle2 5s ease-in-out infinite" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1l1 4L11 6l-4 1-1 4-1-4-4-1 4-1 1-4Z" fill="#60A5FA" />
            </svg>
          </div>

          {/* Van SVG */}
          <svg width="80" height="44" viewBox="0 0 80 44" fill="none">
            {/* Van body */}
            <rect x="1" y="10" width="68" height="26" rx="4" fill="#3B82F6" />
            {/* Cab */}
            <rect x="50" y="6" width="27" height="30" rx="4" fill="#2563EB" />
            {/* Windshield */}
            <rect x="53" y="9" width="19" height="13" rx="2" fill="#BFDBFE" opacity="0.9" />
            <line x1="62.5" y1="9" x2="62.5" y2="22" stroke="#93C5FD" strokeWidth="0.8" />
            {/* Side window */}
            <rect x="54" y="24" width="8" height="6" rx="1" fill="#BFDBFE" opacity="0.7" />
            {/* Body brand text */}
            <text x="6" y="25" fontSize="6.5" fontWeight="800" fill="white" fontFamily="system-ui,sans-serif" letterSpacing="0.5">CLEAN WASH</text>
            {/* Water drop on body */}
            <path d="M4 32 Q4 26 8 26 Q12 26 12 32 Q12 37 8 38 Q4 37 4 32Z" fill="#60A5FA" opacity="0.6" />
            {/* Wheel 1 */}
            <circle cx="18" cy="37" r="7" fill="#1F2937" />
            <circle cx="18" cy="37" r="4.5" fill="#374151" />
            <g style={{ transformBox: "fill-box", transformOrigin: "center", animation: "s3-wheel .7s linear infinite" }}>
              <line x1="18" y1="30" x2="18" y2="44" stroke="#6B7280" strokeWidth="1.4" />
              <line x1="11" y1="37" x2="25" y2="37" stroke="#6B7280" strokeWidth="1.4" />
            </g>
            <circle cx="18" cy="37" r="2" fill="#9CA3AF" />
            {/* Wheel 2 */}
            <circle cx="59" cy="37" r="7" fill="#1F2937" />
            <circle cx="59" cy="37" r="4.5" fill="#374151" />
            <g style={{ transformBox: "fill-box", transformOrigin: "center", animation: "s3-wheel .7s linear infinite" }}>
              <line x1="59" y1="30" x2="59" y2="44" stroke="#6B7280" strokeWidth="1.4" />
              <line x1="52" y1="37" x2="66" y2="37" stroke="#6B7280" strokeWidth="1.4" />
            </g>
            <circle cx="59" cy="37" r="2" fill="#9CA3AF" />
            {/* Headlight */}
            <rect x="70" y="18" width="7" height="4" rx="1.5" fill="#FCD34D" opacity="0.9" />
          </svg>
        </div>
      </div>
    </>
  );
}

/* ──────────────────────────────────────────────
   Main section
────────────────────────────────────────────── */
const STEPS = [
  {
    number: "01",
    color: "#E8435A",
    glow: "rgba(232,67,90,0.22)",
    border: "rgba(232,67,90,0.18)",
    bg: "rgba(232,67,90,0.04)",
    title: "Vælg din bilvask",
    text: "Udvendig, indvendig eller komplet – vælg hvad din bil har brug for.",
  },
  {
    number: "02",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.22)",
    border: "rgba(245,158,11,0.18)",
    bg: "rgba(245,158,11,0.04)",
    title: "Book tid online",
    text: "Vælg et ledigt tidspunkt direkte i kalenderen – hurtigt og nemt.",
  },
  {
    number: "03",
    color: "#3B82F6",
    glow: "rgba(59,130,246,0.22)",
    border: "rgba(59,130,246,0.18)",
    bg: "rgba(59,130,246,0.04)",
    title: "Vi kommer til dig",
    text: "Vores bil kører ud til din adresse og vasker bilen professionelt.",
  },
] as const;

const ANIMS = [<Step1Anim key="s1" />, <Step2Anim key="s2" />, <Step3Anim key="s3" />];

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
                  ? `word-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) both ${i * 68 + 150}ms`
                  : "none",
              }}
            >
              {word}
              {i < TITLE_WORDS.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>
      </div>

      {/* ── Steps grid ── */}
      <div className="relative mx-auto mt-10 max-w-6xl">
        {/* Desktop connector lines */}
        <svg
          aria-hidden="true"
          viewBox="0 0 900 50"
          className="pointer-events-none absolute left-1/2 top-5 z-0 hidden h-12 w-[58%] -translate-x-1/2 lg:block"
          fill="none"
        >
          <defs>
            <linearGradient id="steps-g1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#E8435A" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="steps-g2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d="M60 25 C200 5 280 45 440 25"
            stroke="url(#steps-g1)" strokeWidth="2" strokeDasharray="8 8" strokeLinecap="round"
            style={{ opacity: inView ? 1 : 0, transition: inView ? "opacity 0.7s ease 0.5s" : "none" }}
          />
          <path
            d="M460 25 C620 5 700 45 840 25"
            stroke="url(#steps-g2)" strokeWidth="2" strokeDasharray="8 8" strokeLinecap="round"
            style={{ opacity: inView ? 1 : 0, transition: inView ? "opacity 0.7s ease 0.9s" : "none" }}
          />
          <circle cx="250" cy="21" r="5" fill="#E8435A"
            style={{ opacity: inView ? 1 : 0, transition: inView ? "opacity 0.3s ease 1.2s" : "none" }} />
          <circle cx="650" cy="29" r="5" fill="#F59E0B"
            style={{ opacity: inView ? 1 : 0, transition: inView ? "opacity 0.3s ease 1.45s" : "none" }} />
        </svg>

        <ol className="relative z-10 grid gap-6 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <li
              key={step.number}
              className="flex flex-col overflow-hidden rounded-2xl"
              style={{
                border: `1px solid ${step.border}`,
                background: step.bg,
                opacity: inView ? undefined : 0,
                animation: inView
                  ? `step-card-in 0.65s cubic-bezier(0.22,1,0.36,1) both ${i * 220 + 380}ms`
                  : "none",
              }}
            >
              {/* Step header */}
              <div className="flex items-center gap-3 px-4 pt-4">
                <span
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-white"
                  style={{
                    background: step.color,
                    boxShadow: `0 6px 20px ${step.glow}`,
                  }}
                >
                  {step.number}
                </span>
                <h3 className="font-display text-base font-semibold leading-tight text-[var(--ink)]">
                  {step.title}
                </h3>
              </div>

              {/* Illustration */}
              <div className="flex-1">{ANIMS[i]}</div>

              {/* Description */}
              <p className="px-4 pb-4 text-sm leading-6 text-[var(--muted)]">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* ── CTA ── */}
      <div
        className="mt-10 text-center"
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
          Det tager kun få minutter.
        </p>
      </div>
    </section>
  );
}
