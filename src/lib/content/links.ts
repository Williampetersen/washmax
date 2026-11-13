import { blogPosts } from "@/lib/blog-posts";
import { seoPages } from "@/lib/seo-pages";
import { contentPages } from "./index";
import type { ContentKind } from "./types";

export type Hub = { label: string; href: string };

export const hubs: Record<ContentKind, Hub> = {
  area: { label: "Områder", href: "/serviceomraader" },
  region: { label: "Områder", href: "/serviceomraader" },
  service: { label: "Ydelser", href: "/ydelser" },
  addon: { label: "Ydelser", href: "/ydelser" },
  occasion: { label: "Ydelser", href: "/ydelser" },
  vehicle: { label: "Biltyper", href: "/biltyper" },
  brand: { label: "Biltyper", href: "/biltyper" },
  business: { label: "Erhverv", href: "/erhvervs-bilvask" },
  english: { label: "English", href: "/car-wash-copenhagen" },
};

// Pages that are not part of a content registry.
const staticLabels: Record<string, string> = {
  "/": "Forside",
  "/booking": "Book bilvask",
  "/om-os": "Om CleanWash",
  "/blog": "Blog om bilvask og bilpleje",
  "/handelsbetingelser": "Handelsbetingelser",
  "/persondatapolitik": "Persondatapolitik",
  "/retur-leasebil": "Retur af leasingbil",
  "/velg-storrelse": "Vælg bilstørrelse",
  "/serviceomraader": "Alle serviceområder",
  "/ydelser": "Alle ydelser og tilvalg",
  "/biltyper": "Biltyper og bilmærker",
};

const labels = new Map<string, string>();

for (const page of seoPages) labels.set(`/${page.slug}`, page.h1);
for (const page of contentPages) labels.set(`/${page.slug}`, page.h1);
for (const post of blogPosts) labels.set(`/blog/${post.slug}`, post.title);
for (const [href, label] of Object.entries(staticLabels)) labels.set(href, label);

export const linkLabel = (href: string) => labels.get(href) ?? href;

export const hasInternalLink = (href: string) => labels.has(href);

// Area name → page. The hand-written legacy area pages keep their original slugs.
const areaHrefs = new Map<string, string>([
  ["København", "/bilvask-koebenhavn"],
  ["Frederiksberg", "/bilvask-frederiksberg"],
  ["Amager", "/bilvask-amager"],
  ["Østerbro", "/bilvask-osterbro"],
  ["Nørrebro", "/bilvask-noerrebro"],
  ["Vesterbro", "/bilvask-vesterbro"],
  ["Valby", "/bilvask-valby"],
  ["Hellerup", "/bilvask-hellerup"],
  ["Hvidovre", "/bilvask-hvidovre"],
  ["Lyngby", "/bilvask-lyngby"],
  ["Roskilde", "/bilvask-roskilde"],
  ["Køge", "/bilvask-koege"],
  ["Taastrup", "/bilvask-taastrup"],
  ["Hillerød", "/bilvask-hilleroed"],
  ["Hørsholm", "/bilvask-horsholm"],
  ["Helsingør", "/bilvask-helsingoer"],
  ["Næstved", "/bilvask-naestved"],
  ["Slagelse", "/bilvask-slagelse"],
  ["Sjælland", "/bilvask-sjaelland"],
]);

for (const page of contentPages) {
  if (page.area) areaHrefs.set(page.area.name, `/${page.slug}`);
}

export const areaHref = (name: string) => areaHrefs.get(name);

export type AreaLink = { name: string; href: string };

const byName = (a: AreaLink, b: AreaLink) => a.name.localeCompare(b.name, "da");

/** Every area page on the site (legacy and new), sorted by name. */
export const allAreaLinks: AreaLink[] = [...areaHrefs.entries()]
  .map(([name, href]) => ({ name, href }))
  .sort(byName);
