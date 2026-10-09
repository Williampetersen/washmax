export const siteConfig = {
  name: "CleanWash",
  description:
    "CleanWash tilbyder professionel mobil bilvask i København og på Sjælland. Book bilvask på adressen med nummerpladeopslag, klar pris og fleksible tider.",
  url: process.env.APP_URL || "https://cleanwash.dk",
  ogImage: "/opengraph.jpg",
  phoneDisplay: "42 50 45 51",
  phoneHref: "tel:+4542504551",
  email: "info@cleanwash.dk",
  legalName: "CleanWash",
  vatId: "44605074",
  openingHours: { days: "Mo-Su", opens: "08:00", closes: "17:00" },
  priceRange: "349-849 DKK",
  // Profiles that describe the same business. Add the Google Business Profile
  // and Trustpilot URLs here once confirmed — they feed the schema `sameAs`.
  social: [
    "https://www.facebook.com/carwashadk/",
    "https://www.instagram.com/washmaxdk/",
  ],
  bookingExternalUrl: "/booking",
  giftCardUrl: "/booking",
};

export const navItems = [
  { label: "Priser", href: "/bilvask-priser" },
  { label: "Områder", href: "/serviceomraader" },
  { label: "Retur leasebil", href: "/retur-leasebil" },
  { label: "Blog", href: "/blog" },
  { label: "Om os", href: "/om-os" },
  { label: "Kontakt", href: "/kontakt" },
] as const;
