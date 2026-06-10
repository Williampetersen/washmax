import type { ReactNode } from "react";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#F7F8FC_0%,#F5F7FF_48%,#F1F3FA_100%)] px-3 pb-8 pt-3 font-sans text-[#1F2340] sm:px-5 sm:pb-10">
      <section className="mx-auto max-w-[1480px]">{children}</section>
    </main>
  );
}
