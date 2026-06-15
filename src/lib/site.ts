export const siteConfig = {
  name: "Wash Max",
  description:
    "Wash Max tilbyder professionel mobil bilvask i København og på Sjælland. Book bilvask på adressen med nummerpladeopslag, klar pris og fleksible tider.",
  url: process.env.APP_URL || "https://washmax.dk",
  ogImage: "/opengraph.jpg",
  phoneDisplay: "+45 50 13 84 26",
  phoneHref: "tel:+4550138426",
  email: "info@washmax.dk",
  address: "Birkeholmen 24, Solrød Strand",
  cvr: "44605074",
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
