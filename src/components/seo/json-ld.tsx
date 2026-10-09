import { absoluteUrl, type SeoPageConfig } from "@/lib/seo-pages";
import type { BlogPost } from "@/lib/blog-posts";
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

const packageOffers = [
  {
    name: "Udvendig bilvask",
    price: 349,
    description: "Skånsom udvendig vask: lak, fælge, hjulbuer, ruder og finish.",
  },
  {
    name: "Komplet bilvask",
    price: 599,
    description: "Udvendig vask plus grundig indvendig rengøring af kabine, sæder og bagagerum.",
  },
  {
    name: "Premium bilpleje",
    price: 849,
    description: "Komplet bilvask plus polering, voksbeskyttelse og klargøring til salg.",
  },
];

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
      lowPrice: 349,
      highPrice: 849,
      priceCurrency: "DKK",
      offerCount: packageOffers.length,
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
