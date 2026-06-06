import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { GlobalProgressOverlay } from "@/components/ui/global-progress-overlay";
import {
  DASHBOARD_LOCALE_COOKIE_NAME,
  getDashboardHtmlLang,
  normalizeDashboardLocale,
} from "@/lib/shared/dashboard-locale";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Mobil bilrengoring`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: `${siteConfig.name} | Mobil bilrengoring`,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Mobil bilrengoring`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const locale = normalizeDashboardLocale(
    cookieStore.get(DASHBOARD_LOCALE_COOKIE_NAME)?.value
  );

  return (
    <html lang={getDashboardHtmlLang(locale)}>
      <body>
        {children}
        <GlobalProgressOverlay />
      </body>
    </html>
  );
}
