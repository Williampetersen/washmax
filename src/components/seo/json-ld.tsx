import { absoluteUrl, type SeoPageConfig } from "@/lib/seo-pages";
import type { BlogPost } from "@/lib/blog-posts";
import type { Hub } from "@/lib/content/links";
import type { ContentPage } from "@/lib/content/types";
import {
  addOns,
  fromPrice,
  highestPrice,
  lowestPrice,
  packageOrder,
  packages,
  vehicleSizes,
} from "@/lib/pricing";
import { siteConfig } from "@/lib/site";

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | {
      [key: string]: JsonValue;
    };

export function JsonLd({ data }: { data: JsonValue }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Rolling offer expiry: end of this year, or next year once fewer than 60 days remain,
// so Google never sees an expired priceValidUntil.
export function priceValidUntil(now = new Date()) {
  const endOfYear = new Date(Date.UTC(now.getUTCFullYear(), 11, 31));
  const daysLeft = (endOfYear.getTime() - now.getTime()) / 86_400_000;
  const year = daysLeft < 60 ? now.getUTCFullYear() + 1 : now.getUTCFullYear();
  return `${year}-12-31`;
}

// Offers mirror the live booking catalog via src/lib/pricing.ts. The listed price is
// the lowest (small car) price for each package.
const packageOffers = packageOrder.map((id) => ({
  name: packages[id].name,
  price: fromPrice(id),
  description: packages[id].summary,
}));

// Coverage used on pages that are not about one specific place.
const defaultAreaServed = ["København", "Frederiksberg", "Storkøbenhavn", "Nordsjælland", "Sjælland"];

// Single source for the business entity. Every page that emits the LocalBusiness
// schema (home, om-os, landing pages) must use this so name, address, phone and
// profiles stay identical across the site. No postal address on purpose: CleanWash
// is a service-area business (no public premises), matching the Google Business Profile.
export function buildLocalBusiness({
  areaServed,
  knowsAbout,
}: {
  areaServed: string[];
  knowsAbout?: string[];
}) {
  const validUntil = priceValidUntil();

  return {
    "@type": ["AutoWash", "LocalBusiness"],
    "@id": `${siteConfig.url}#localbusiness`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl("/logo.png"),
    image: absoluteUrl(siteConfig.ogImage),
    description: siteConfig.description,
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    vatID: siteConfig.vatId,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: allDays,
      opens: siteConfig.openingHours.opens,
      closes: siteConfig.openingHours.closes,
    },
    priceRange: siteConfig.priceRange,
    areaServed: areaServed.map((name) => ({ "@type": "Place", name })),
    ...(knowsAbout ? { knowsAbout } : {}),
    potentialAction: {
      "@type": "ReserveAction",
      target: absoluteUrl("/booking"),
      name: "Book bilvask online",
    },
    sameAs: siteConfig.social,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phoneDisplay,
      email: siteConfig.email,
      contactType: "customer service",
      availableLanguage: ["Danish", "da"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "CleanWash bilvask services",
      itemListElement: packageOffers.map((offer) => ({
        "@type": "Offer",
        name: offer.name,
        description: offer.description,
        price: String(offer.price),
        priceCurrency: "DKK",
        priceValidUntil: validUntil,
        availability: "https://schema.org/InStock",
        url: absoluteUrl("/booking"),
        seller: { "@id": `${siteConfig.url}#localbusiness` },
      })),
    },
  };
}

export function buildSeoJsonLd(page: SeoPageConfig) {
  const pageUrl = absoluteUrl(`/${page.slug}`);
  const businessId = `${siteConfig.url}#localbusiness`;
  const serviceId = `${pageUrl}#service`;
  const faqId = `${pageUrl}#faq`;

  const localBusiness = buildLocalBusiness({
    areaServed: page.schemaAreaServed,
    knowsAbout: page.keywords,
  });

  const service = {
    "@type": "Service",
    "@id": serviceId,
    name: page.serviceType,
    serviceType: page.serviceType,
    description: page.description,
    url: pageUrl,
    keywords: page.keywords.join(", "),
    provider: {
      "@id": businessId,
    },
    areaServed: page.schemaAreaServed.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    offers: {
      "@type": "AggregateOffer",
      lowPrice: lowestPrice,
      highPrice: highestPrice,
      priceCurrency: "DKK",
      offerCount: packageOrder.length * vehicleSizes.length,
      url: absoluteUrl("/booking"),
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: absoluteUrl("/booking"),
      name: "Book bilvask hos CleanWash",
    },
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": faqId,
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Forside",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.h1,
        item: pageUrl,
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [localBusiness, service, faqPage, breadcrumbList],
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${siteConfig.url}#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "da-DK",
    publisher: { "@id": `${siteConfig.url}#localbusiness` },
  };
}

export function buildContentJsonLd(page: ContentPage, hub: Hub): JsonValue {
  const pageUrl = absoluteUrl(`/${page.slug}`);
  const businessId = `${siteConfig.url}#localbusiness`;
  const serviceId = `${pageUrl}#service`;
  const bookingUrl = absoluteUrl("/booking");
  const isEnglish = page.kind === "english";
  const language = isEnglish ? "en" : "da-DK";
  const pkg = page.pkg ? packages[page.pkg] : null;
  const addOn = page.addOn ? addOns[page.addOn] : null;

  const offers: JsonValue = addOn
    ? {
        "@type": "Offer",
        name: addOn.name,
        price: String(addOn.price),
        priceCurrency: "DKK",
        priceValidUntil: priceValidUntil(),
        availability: "https://schema.org/InStock",
        url: bookingUrl,
      }
    : {
        "@type": "AggregateOffer",
        lowPrice: pkg ? Math.min(...Object.values(pkg.prices)) : lowestPrice,
        highPrice: pkg ? Math.max(...Object.values(pkg.prices)) : highestPrice,
        priceCurrency: "DKK",
        offerCount: pkg ? vehicleSizes.length : packageOrder.length * vehicleSizes.length,
        url: bookingUrl,
      };

  const areaServed: JsonValue = page.area
    ? [
        {
          "@type": page.kind === "area" ? "City" : "AdministrativeArea",
          name: page.area.name,
          containedInPlace: { "@type": "Country", name: "Danmark" },
        },
      ]
    : defaultAreaServed.map((name) => ({ "@type": "Place", name }));

  const service = {
    "@type": "Service",
    "@id": serviceId,
    name: page.h1,
    serviceType: addOn?.name ?? pkg?.name ?? "Mobil bilvask",
    description: page.description,
    url: pageUrl,
    provider: { "@id": businessId },
    areaServed,
    offers,
    potentialAction: {
      "@type": "ReserveAction",
      target: bookingUrl,
      name: isEnglish ? "Book a car wash" : "Book bilvask hos CleanWash",
    },
  };

  const webPage = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: page.title,
    description: page.description,
    inLanguage: language,
    dateModified: page.updated,
    isPartOf: { "@id": `${siteConfig.url}#website` },
    about: { "@id": serviceId },
    primaryImageOfPage: absoluteUrl(page.image.src),
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    inLanguage: language,
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const breadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEnglish ? "Home" : "Forside", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: hub.label, item: absoluteUrl(hub.href) },
      { "@type": "ListItem", position: 3, name: page.h1, item: pageUrl },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildLocalBusiness({ areaServed: defaultAreaServed }),
      buildWebSiteJsonLd(),
      service,
      webPage,
      faqPage,
      breadcrumbList,
    ],
  };
}

export function buildArticleJsonLd(page: SeoPageConfig) {
  const pageUrl = absoluteUrl(`/${page.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1,
    description: page.description,
    url: pageUrl,
    image: absoluteUrl(page.image.src),
    author: { "@type": "Organization", name: "CleanWash", url: siteConfig.url },
    publisher: {
      "@type": "Organization",
      name: "CleanWash",
      url: siteConfig.url,
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") },
    },
    datePublished: "2025-01-01",
    mainEntityOfPage: pageUrl,
    keywords: page.keywords.join(", "),
  };
}

export function buildBlogPostingJsonLd(post: BlogPost) {
  const postUrl = absoluteUrl(`/blog/${post.slug}`);
  const articleId = `${postUrl}#article`;
  const faqId = `${postUrl}#faq`;

  const blogPosting = {
    "@type": "BlogPosting",
    "@id": articleId,
    headline: post.title,
    description: post.description,
    url: postUrl,
    image: absoluteUrl(post.coverImage.src),
    articleSection: post.category,
    keywords: post.keywords.join(", "),
    wordCount: post.sections.reduce(
      (total, section) => total + section.paragraphs.join(" ").split(/\s+/).length,
      0
    ),
    author: { "@type": "Organization", name: "CleanWash", url: siteConfig.url },
    publisher: {
      "@type": "Organization",
      name: "CleanWash",
      url: siteConfig.url,
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: postUrl,
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": faqId,
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forside", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [blogPosting, faqPage, breadcrumbList],
  };
}

export function buildBlogIndexJsonLd(posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Bilvask og bilpleje blog",
    url: absoluteUrl("/blog"),
    hasPart: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
    })),
  };
}
