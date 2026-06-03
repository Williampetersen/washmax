export const siteConfig = {
  name: "WashMax",
  description:
    "Beregn pris online hos WashMax med dansk nummerpladeopslag, automatisk bilkategori og hurtig booking af mobil bilrengoring.",
  url: process.env.APP_URL || "https://washmax.dk",
  ogImage: "/opengraph.jpg",
  phoneDisplay: "+45 91 67 14 52",
  phoneHref: "tel:+4591671452",
  email: "info@washmax.dk",
  bookingExternalUrl: "https://washmax.dk/book-nu/",
  giftCardUrl: "https://washmax.dk/shop/",
};

export const navItems = [
  { label: "Pakker", href: "/#pakker" },
  { label: "Sa nemt er det", href: "/#hvordan" },
  { label: "Daekningsomrade", href: "/#omrader" },
  { label: "Anmeldelser", href: "/#anmeldelser" },
] as const;
