export const siteConfig = {
  name: "CleanWash",
  description:
    "CleanWash tilbyder professionel mobil bilvask i København og på Sjælland. Book bilvask på adressen med nummerpladeopslag, klar pris og fleksible tider.",
  url: process.env.APP_URL || "https://cleanwash.dk",
  ogImage: "/opengraph.jpg",
  phoneDisplay: "42 50 45 51",
  phoneHref: "tel:+4542504551",
  email: "info@cleanwash.dk",
  bookingExternalUrl: "/booking",
  giftCardUrl: "/booking",
};

export const navItems = [
  { label: "Mobil bilvask", href: "/mobil-bilvask-koebenhavn" },
  { label: "København", href: "/bilvask-koebenhavn" },
  { label: "Priser", href: "/bilvask-priser" },
  { label: "Områder", href: "/serviceomraader" },
  { label: "Sjælland", href: "/bilvask-sjaelland" },
  { label: "Erhverv", href: "/erhverv-bilvask-koebenhavn" },
  { label: "Om os", href: "/om-os" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "FAQ", href: "/#faq" },
] as const;
