"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/customer/auth/logout", { method: "POST" });
    } finally {
      router.push("/");
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-[13px] font-semibold text-[#6B7280] transition hover:bg-white/70 hover:text-[#111827] disabled:opacity-50"
    >
      <LogOut className="h-5 w-5 shrink-0" />
      {loading ? "Logger ud…" : "Log ud"}
    </button>
  );
}
