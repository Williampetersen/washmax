import { absoluteUrl, type SeoPageConfig } from "@/lib/seo-pages";
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

export function buildSeoJsonLd(page: SeoPageConfig) {
  const pageUrl = absoluteUrl(`/${page.slug}`);
  const businessId = `${siteConfig.url}#localbusiness`;
  const serviceId = `${pageUrl}#service`;
  const faqId = `${pageUrl}#faq`;

  const localBusiness = {
    "@type": ["AutoWash", "LocalBusiness"],
    "@id": businessId,
    name: "Wash Max",
    alternateName: siteConfig.name,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.ogImage),
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    openingHours: "Mo-Su 08:00-17:00",
    areaServed: page.schemaAreaServed.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    potentialAction: {
      "@type": "ReserveAction",
      target: absoluteUrl("/booking"),
      name: "Book bilvask online",
    },
    priceRange: "349-849 DKK",
    sameAs: [
      "https://www.facebook.com/carwashadk/",
      "https://www.instagram.com/washmaxdk/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phoneDisplay,
      email: siteConfig.email,
      contactType: "customer service",
      availableLanguage: ["Danish", "da"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "08:00",
        closes: "17:00",
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Wash Max bilvask services",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Udvendig bilvask",
          description: "Skånsom udvendig vask: lak, fælge, hjulbuer, ruder og finish.",
          price: "349",
          priceCurrency: "DKK",
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
          url: absoluteUrl("/booking"),
          seller: { "@type": "Organization", name: "Wash Max" },
        },
        {
          "@type": "Offer",
          name: "Komplet bilvask",
          description: "Udvendig vask plus grundig indvendig rengøring af kabine, sæder og bagagerum.",
          price: "599",
          priceCurrency: "DKK",
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
          url: absoluteUrl("/booking"),
          seller: { "@type": "Organization", name: "Wash Max" },
        },
        {
          "@type": "Offer",
          name: "Premium bilpleje",
          description: "Komplet bilvask plus polering, voksbeskyttelse og klargøring til salg.",
          price: "849",
          priceCurrency: "DKK",
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
          url: absoluteUrl("/booking"),
          seller: { "@type": "Organization", name: "Wash Max" },
        },
      ],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Birkeholmen 24",
      addressLocality: "Solrød Strand",
      addressCountry: "DK",
    },
    vatID: "44605074",
  };

  const service = {
    "@type": "Service",
    "@id": serviceId,
    name: page.serviceType,
    serviceType: page.serviceType,
    description: page.description,
    url: pageUrl,
    provider: {
      "@id": businessId,
    },
    areaServed: page.schemaAreaServed.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    potentialAction: {
      "@type": "ReserveAction",
      target: absoluteUrl("/booking"),
      name: "Book bilvask hos Wash Max",
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
    author: { "@type": "Organization", name: "Wash Max", url: siteConfig.url },
    publisher: {
      "@type": "Organization",
      name: "Wash Max",
      url: siteConfig.url,
      logo: { "@type": "ImageObject", url: absoluteUrl("/logowashmax.png") },
    },
    datePublished: "2025-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    mainEntityOfPage: pageUrl,
    keywords: page.keywords.join(", "),
  };
}
