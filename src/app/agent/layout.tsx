import { GlobalProgressOverlay } from "@/components/ui/global-progress-overlay";

export default function AgentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <GlobalProgressOverlay />
    </>
  );
}
