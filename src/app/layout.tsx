import type { Metadata } from "next";
import Script from "next/script";
import { Lexend } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { siteConfig } from "@/lib/site";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Bilvask i København og på Sjælland`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "bilvask", "bilvask København", "mobil bilvask", "indvendig bilrengøring",
    "bilpleje", "bilvask Sjælland", "håndvask bil", "erhvervs bilvask",
  ],
  authors: [{ name: "CleanWash", url: siteConfig.url }],
  creator: "CleanWash",
  publisher: "CleanWash",
  category: "Automotive",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "da_DK",
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: `${siteConfig.name} | Professionel mobil bilvask`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "CleanWash bilvask i København og på Sjælland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@washmaxdk",
    creator: "@washmaxdk",
    title: `${siteConfig.name} | Bilvask København og Sjælland`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
    languages: { "da-DK": siteConfig.url },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION ?? "",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="da" className={lexend.variable}>
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-W67LMJHPML" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W67LMJHPML');
          `}
        </Script>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
