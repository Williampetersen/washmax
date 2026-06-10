import type { ReactNode } from "react";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#F7F8FC_0%,#F5F7FF_48%,#F1F3FA_100%)] px-4 pb-10 pt-4 font-sans text-[#1F2340] sm:px-6">
      <div className="mx-auto max-w-[1520px] space-y-4">{children}</div>
    </main>
  );
}
