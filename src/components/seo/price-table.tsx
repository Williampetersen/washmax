import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import {
  addOns,
  exteriorAddOnIds,
  interiorAddOnIds,
  kr,
  packageOrder,
  packages,
  secondCarDiscountPercent,
  vehicleSizes,
  type AddOnId,
  type PackageId,
} from "@/lib/pricing";

type Lang = "da" | "en";

const copy = {
  da: {
    size: "Bilstørrelse",
    minutes: "ca.",
    note: `Alle priser er inkl. moms. Vi medbringer selv vand og strøm, og du betaler først, når bilen er færdig. Booker du to biler til samme besøg, får bil nummer to ${secondCarDiscountPercent} % rabat på grundprisen.`,
    packages: {
      outside: "Udvendig bilvask",
      inside: "Indvendig bilrengøring",
      whole: "Hele bilen",
    } as Record<PackageId, string>,
    sizes: {
      small: "Lille bil",
      medium: "Mellem bil",
      large: "Stor bil",
      van: "Varevogn",
    } as Record<string, string>,
    interior: "Tilvalg indvendigt",
    exterior: "Tilvalg udvendigt",
  },
  en: {
    size: "Car size",
    minutes: "approx.",
    note: `All prices include Danish VAT. We bring our own water and power, and you pay when the car is finished. Book two cars for the same visit and the second car gets ${secondCarDiscountPercent}% off its base price.`,
    packages: {
      outside: "Exterior wash",
      inside: "Interior cleaning",
      whole: "Full car (inside + outside)",
    } as Record<PackageId, string>,
    sizes: {
      small: "Small car",
      medium: "Medium car",
      large: "Large car / SUV",
      van: "Van",
    } as Record<string, string>,
    interior: "Interior add-ons",
    exterior: "Exterior add-ons",
  },
};

export function PriceTable({
  highlight,
  lang = "da",
}: {
  highlight?: PackageId;
  lang?: Lang;
}) {
  const t = copy[lang];

  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-[var(--line)] bg-white shadow-[0_18px_48px_rgba(11,31,58,0.07)]">
        <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-[var(--accent)] text-white">
              <th scope="col" className="px-5 py-4 font-semibold">
                {t.size}
              </th>
              {packageOrder.map((id) => (
                <th
                  key={id}
                  scope="col"
                  className={`px-5 py-4 font-semibold ${highlight === id ? "bg-[var(--brand)]" : ""}`}
                >
                  {t.packages[id]}
                  <span className="block text-xs font-medium text-white/70">
                    {t.minutes} {packages[id].minutes} min.
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vehicleSizes.map((size) => (
              <tr key={size.id} className="border-t border-[var(--line)]">
                <th scope="row" className="px-5 py-4 align-middle font-semibold text-[var(--ink)]">
                  <span className="flex items-center gap-3">
                    <Image
                      src={size.image}
                      alt=""
                      width={72}
                      height={32}
                      className="hidden h-8 w-[4.5rem] rounded bg-black object-contain sm:block"
                    />
                    {t.sizes[size.id]}
                  </span>
                </th>
                {packageOrder.map((id) => (
                  <td
                    key={id}
                    className={`px-5 py-4 font-display text-lg font-semibold text-[var(--ink)] ${
                      highlight === id ? "bg-[#eefbfc]" : ""
                    }`}
                  >
                    {kr(packages[id].prices[size.id])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{t.note}</p>
    </div>
  );
}

function AddOnGroup({ title, ids }: { title: string; ids: AddOnId[] }) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-[0_18px_48px_rgba(11,31,58,0.07)]">
      <h3 className="font-display text-2xl font-semibold text-[var(--ink)]">{title}</h3>
      <ul className="mt-4 divide-y divide-[var(--line)]">
        {ids.map((id) => {
          const item = addOns[id];
          return (
            <li key={id} className="flex items-start justify-between gap-4 py-3">
              <div>
                {item.href ? (
                  <Link
                    href={item.href as Route}
                    className="font-semibold text-[var(--ink)] underline decoration-[var(--line)] underline-offset-4 transition hover:decoration-[var(--brand)]"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className="font-semibold text-[var(--ink)]">{item.name}</span>
                )}
                <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
              </div>
              <span className="shrink-0 font-display text-lg font-semibold text-[var(--ink)]">
                {kr(item.price)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function AddOnPriceList({ lang = "da" }: { lang?: Lang }) {
  const t = copy[lang];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <AddOnGroup title={t.interior} ids={interiorAddOnIds} />
      <AddOnGroup title={t.exterior} ids={exteriorAddOnIds} />
    </div>
  );
}
