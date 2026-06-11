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
  { label: "Services", href: "/#services" },
  { label: "København", href: "/#koebenhavn" },
  { label: "Sjælland", href: "/#sjaelland" },
  { label: "Erhverv", href: "/#erhverv" },
  { label: "Om os", href: "/om-os" },
  { label: "FAQ", href: "/#faq" },
] as const;
