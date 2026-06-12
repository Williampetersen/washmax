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
  const packageOffers = [
    {
      name: "Udvendig vask",
      price: 349,
      description: "Udvendig bilvask med fokus på lak, fælge, ruder og finish.",
    },
    {
      name: "Komplet bilvask",
      price: 599,
      description: "Udvendig bilvask kombineret med indvendig rengøring.",
    },
    {
      name: "Premium bilpleje",
      price: 849,
      description: "Udvidet bilpleje til biler, der kræver en grundigere behandling.",
    },
  ];

  const localBusiness = {
    "@type": ["AutoWash", "LocalBusiness"],
    "@id": businessId,
    name: "Clean Wash",
    alternateName: siteConfig.name,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.ogImage),
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    priceRange: "DKK 349-849+",
    openingHours: "Mo-Su 08:00-17:00",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phoneDisplay,
      contactType: "customer service",
      areaServed: "DK",
      availableLanguage: ["da", "en"],
    },
    areaServed: page.schemaAreaServed.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    knowsAbout: page.keywords,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Bilvask og bilpleje",
      itemListElement: [
        ...packageOffers.map((offer) => ({
          "@type": "Offer",
          name: offer.name,
          price: offer.price,
          priceCurrency: "DKK",
          availability: "https://schema.org/InStock",
          url: absoluteUrl("/booking"),
          itemOffered: {
            "@type": "Service",
            name: offer.name,
            description: offer.description,
          },
        })),
        ...["Mobil bilvask", "Indvendig bilrengøring", "Erhverv bilvask"].map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
        },
        })),
      ],
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: absoluteUrl("/booking"),
      name: "Book bilvask online",
    },
    // TODO: Add postalAddress when Clean Wash has a confirmed public business address.
  };

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
      name: "Book bilvask hos Clean Wash",
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
