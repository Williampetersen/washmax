export const siteConfig = {
  name: "Clean Wash",
  description:
    "Beregn pris online hos Clean Wash med dansk nummerpladeopslag, automatisk bilkategori og hurtig booking af mobil bilrengoring.",
  url: process.env.APP_URL || "https://cleanwash.dk",
  ogImage: "/opengraph.jpg",
  phoneDisplay: "+45 91 67 14 52",
  phoneHref: "tel:+4591671452",
  email: "info@cleanwash.dk",
  bookingExternalUrl: "https://cleanwash.dk/book-nu/",
  giftCardUrl: "https://cleanwash.dk/shop/",
};

export const navItems = [
  { label: "Pakker", href: "/#pakker" },
  { label: "Sa nemt er det", href: "/#hvordan" },
  { label: "Daekningsomrade", href: "/#omrader" },
  { label: "Anmeldelser", href: "/#anmeldelser" },
] as const;
