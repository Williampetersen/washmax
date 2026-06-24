import type { Metadata } from "next";
import { AdsPresentation } from "./ads-presentation";

export const metadata: Metadata = {
  title: "Survive the CleanWash | Growth Roadmap",
  description: "نقشه راه بازاریابی، اعتمادسازی و رشد CleanWash",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdsPage() {
  return <AdsPresentation />;
}
