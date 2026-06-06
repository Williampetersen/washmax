import { GlobalProgressOverlay } from "@/components/ui/global-progress-overlay";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <GlobalProgressOverlay />
    </>
  );
}
