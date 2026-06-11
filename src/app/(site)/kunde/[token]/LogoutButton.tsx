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
      className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[var(--line)] px-4 text-sm font-semibold text-[var(--muted)] transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
      title="Log ud"
    >
      <LogOut className="h-4 w-4" />
      {loading ? "Logger ud…" : "Log ud"}
    </button>
  );
}
