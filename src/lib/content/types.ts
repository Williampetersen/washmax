import type { AddOnId, PackageId } from "@/lib/pricing";

export type ContentKind =
  | "area"
  | "region"
  | "service"
  | "addon"
  | "vehicle"
  | "brand"
  | "business"
  | "occasion"
  | "english";

export type ContentSection = {
  /** H2 heading */
  h: string;
  /** Paragraphs */
  p: string[];
  /** Optional bullet list rendered after the paragraphs */
  list?: string[];
};

export type ContentFaq = { q: string; a: string };

export type ContentPage = {
  slug: string;
  kind: ContentKind;
  /** <title> without the brand suffix (the root layout appends " | CleanWash"). */
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  /** Lead paragraph in the hero. */
  intro: string;
  /** Two to three sentences that answer the search directly. */
  answer: string;
  sections: ContentSection[];
  faqs: ContentFaq[];
  keywords: string[];
  image: { src: string; alt: string };
  /** Internal links shown at the bottom, as hrefs ("/bilvask-holte"). */
  related: string[];
  /** Area pages: the place and its neighbours. */
  area?: {
    name: string;
    /** "Rudersdal Kommune", "Københavns Kommune" … */
    kommune: string;
    postal: string;
    nearby: string[];
  };
  /** Which package the page is mainly about (drives the highlighted price). */
  pkg?: PackageId;
  /** Which add-on the page is about (drives the highlighted price). */
  addOn?: AddOnId;
  /** ISO date used for sitemap lastmod and schema dateModified. */
  updated: string;
};

export const CONTENT_UPDATED = "2026-11-13";

type PageInput = Omit<ContentPage, "kind" | "updated"> & { updated?: string };

const make =
  (kind: ContentKind) =>
  (input: PageInput): ContentPage => ({
    ...input,
    kind,
    updated: input.updated ?? CONTENT_UPDATED,
  });

export const areaPage = make("area");
export const regionPage = make("region");
export const servicePage = make("service");
export const addOnPage = make("addon");
export const vehiclePage = make("vehicle");
export const brandPage = make("brand");
export const businessPage = make("business");
export const occasionPage = make("occasion");
export const englishPage = make("english");
