export type DashboardLocale = "da" | "en";

export const DASHBOARD_LOCALE_COOKIE_NAME = "washmax_dashboard_locale";

export const normalizeDashboardLocale = (
  value: string | null | undefined
): DashboardLocale => (value === "en" ? "en" : "da");

export const getDashboardHtmlLang = (locale: DashboardLocale) =>
  locale === "en" ? "en" : "da";

export const getDashboardLocaleLabel = (locale: DashboardLocale) =>
  locale === "en" ? "English" : "Dansk";
