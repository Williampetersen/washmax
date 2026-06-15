"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { sanitizePlate } from "@/lib/shared/booking";
import { Button } from "@/components/ui/button";

export function HomePlateForm() {
  const router = useRouter();
  const [plate, setPlate] = useState("");
  const [status, setStatus] = useState<{ message: string; type: "error" | "info" } | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextPlate = sanitizePlate(plate);
    setPlate(nextPlate);

    if (!/^[A-Z0-9]{2,10}$/.test(nextPlate)) {
      setStatus({
        message: "Indtast en gyldig dansk nummerplade, fx AB12345.",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({
      message: "Sender dig videre til booking...",
      type: "info",
    });
    router.push(`/booking?plate=${encodeURIComponent(nextPlate)}`);
  };

  return (
    <>
      <p className="mt-5 text-sm font-semibold text-[var(--muted)]">
        Indtast din nummerplade og se prisen med det samme
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-3 flex max-w-2xl flex-col gap-2 sm:flex-row sm:items-stretch"
      >
        <label className="block sm:flex-1">
          <span className="sr-only">Dansk nummerplade</span>
          <span className="flex h-16 overflow-hidden rounded-xl border border-[var(--line)] bg-white shadow-[0_16px_40px_rgba(11,31,58,0.12)] focus-within:border-[var(--brand)] focus-within:ring-4 focus-within:ring-[#00A7B8]/15">
            <Image
              src="/DKEU.svg"
              alt="DK"
              width={56}
              height={64}
              className="h-full w-12 shrink-0 object-cover"
            />
            <input
              name="plate"
              type="text"
              inputMode="text"
              autoComplete="off"
              autoCapitalize="characters"
              placeholder="AB12345"
              maxLength={10}
              value={plate}
              onFocus={() => router.prefetch("/booking")}
              onChange={(event) => setPlate(sanitizePlate(event.target.value))}
              className="min-w-0 flex-1 border-0 bg-white px-4 text-2xl font-bold uppercase tracking-[0.1em] text-[var(--ink)] outline-none placeholder:text-[#cbd5e1]"
            />
          </span>
        </label>

        <Button type="submit" size="lg" className="h-16 rounded-xl px-8 text-base" disabled={isSubmitting}>
          <Search className="h-5 w-5" />
          {isSubmitting ? "Åbner..." : "Se din pris"}
        </Button>
      </form>

      {status ? (
        <div
          className={[
            "mt-3 max-w-2xl rounded-md border px-4 py-3 text-sm",
            status.type === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-[#00A7B8]/30 bg-[#eefbfc] text-[var(--accent)]",
          ].join(" ")}
        >
          {status.message}
        </div>
      ) : null}

      <p className="mt-4 text-sm text-[var(--muted)]">
        Kender du ikke nummerpladen?{" "}
        <Link
          href="/velg-storrelse"
          className="font-semibold text-[var(--brand)] underline-offset-2 hover:underline"
        >
          Vælg bilstørrelse manuelt →
        </Link>
      </p>
    </>
  );
}
