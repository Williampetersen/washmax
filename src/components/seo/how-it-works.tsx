// The same four steps are shown on every landing page, so they live in one place.
const copy = {
  da: {
    eyebrow: "Sådan foregår det",
    title: "Fra booking til ren bil",
    steps: [
      {
        title: "Book online",
        text: "Indtast nummerpladen, vælg pakke og tilvalg, og se prisen med det samme.",
      },
      {
        title: "Vi kommer til dig",
        text: "Vi møder op på adressen med eget vand, strøm og udstyr – hjemme eller på jobbet.",
      },
      {
        title: "Bilen bliver vasket",
        text: "Du behøver ikke at være ved bilen undervejs. Den skal blot holde lovligt og tilgængeligt.",
      },
      {
        title: "Betal bagefter",
        text: "Du betaler først, når bilen er færdig – for eksempel med MobilePay.",
      },
    ],
  },
  en: {
    eyebrow: "How it works",
    title: "From booking to clean car",
    steps: [
      {
        title: "Book online",
        text: "Enter your licence plate, pick a package and extras, and see the price right away.",
      },
      {
        title: "We come to you",
        text: "We arrive at your address with our own water, power and equipment – at home or at work.",
      },
      {
        title: "Your car gets cleaned",
        text: "You don't need to stay by the car. It just has to be legally parked and accessible.",
      },
      {
        title: "Pay afterwards",
        text: "You pay when the car is finished – for example with MobilePay.",
      },
    ],
  },
};

export function HowItWorks({ lang = "da" }: { lang?: "da" | "en" }) {
  const t = copy[lang];

  return (
    <section>
      <div className="mb-8 max-w-2xl">
        <span className="eyebrow">{t.eyebrow}</span>
        <h2 className="mt-5 section-title">{t.title}</h2>
      </div>
      <ol className="grid gap-4 md:grid-cols-4">
        {t.steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-lg border border-[var(--line)] bg-white/88 p-5 shadow-[0_18px_40px_rgba(11,31,58,0.08)]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--accent)] text-sm font-semibold text-white">
              {index + 1}
            </span>
            <h3 className="mt-5 font-display text-2xl font-semibold text-[var(--ink)]">{step.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
