import { areasAmagerSjaelland } from "./areas-amager-sjaelland";
import { areasKoebenhavn } from "./areas-koebenhavn";
import { areasNord1 } from "./areas-nord-1";
import { areasNord2 } from "./areas-nord-2";
import { areasNordvest } from "./areas-nordvest";
import { areasRegioner } from "./areas-regioner";
import { areasVest } from "./areas-vest";
import { brands } from "./brands";
import { business } from "./business";
import { english } from "./english";
import { occasions } from "./occasions";
import { servicesAddOns } from "./services-addons";
import { servicesCore } from "./services-core";
import type { ContentKind, ContentPage } from "./types";
import { vehicles } from "./vehicles";

export type { ContentKind, ContentPage } from "./types";

export const contentPages: ContentPage[] = [
  ...servicesCore,
  ...servicesAddOns,
  ...occasions,
  ...vehicles,
  ...brands,
  ...business,
  ...areasRegioner,
  ...areasKoebenhavn,
  ...areasNord1,
  ...areasNord2,
  ...areasNordvest,
  ...areasVest,
  ...areasAmagerSjaelland,
  ...english,
];

export const contentPagesBySlug: Record<string, ContentPage> = Object.fromEntries(
  contentPages.map((page) => [page.slug, page])
);

export const contentPagesByKind = (...kinds: ContentKind[]) =>
  contentPages.filter((page) => kinds.includes(page.kind));

// Sitemap priority per page type: the commercial pillars rank above long-tail pages.
export const contentPriority: Record<ContentKind, number> = {
  service: 0.88,
  region: 0.84,
  area: 0.8,
  addon: 0.78,
  vehicle: 0.76,
  business: 0.76,
  occasion: 0.72,
  brand: 0.7,
  english: 0.7,
};
