"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";
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
  const [isPending, startTransition] = useTransition();
  const warmLookupTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const nextPlate = sanitizePlate(plate);

    if (!/^[A-Z0-9]{2,10}$/.test(nextPlate)) {
      return undefined;
    }

    if (warmLookupTimerRef.current) {
      window.clearTimeout(warmLookupTimerRef.current);
    }

    warmLookupTimerRef.current = window.setTimeout(() => {
      void fetch(`/api/vehicle/${encodeURIComponent(nextPlate)}`, {
        headers: { Accept: "application/json" },
      }).catch(() => {});
    }, 250);

    return () => {
      if (warmLookupTimerRef.current) {
        window.clearTimeout(warmLookupTimerRef.current);
        warmLookupTimerRef.current = null;
      }
    };
  }, [plate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

    setStatus({
      message: "Vi tjekker nummerpladen hos MotorAPI.dk...",
      type: "info",
    });

    try {
      const response = await fetch(`/api/vehicle/${encodeURIComponent(nextPlate)}`, {
        headers: { Accept: "application/json" },
      });
      const payload = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        throw new Error(
          payload?.error || "Nummerpladen kunne ikke findes. Tjek nummeret og prov igen."
        );
      }

      startTransition(() => {
        router.push(`/booking?plate=${encodeURIComponent(nextPlate)}`);
      });
    } catch (error) {
      setStatus({
        message:
          error instanceof Error
            ? error.message
            : "Nummerpladen kunne ikke findes. Tjek nummeret og prov igen.",
        type: "error",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mt-7 flex max-w-3xl flex-col gap-2 sm:flex-row sm:items-stretch"
      >
        <label className="block sm:w-[20rem]">
          <span className="sr-only">Dansk nummerplade</span>
          <span className="flex h-12 overflow-hidden rounded-md border border-white/30 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.18)] focus-within:border-[#55b9df] focus-within:ring-4 focus-within:ring-[#55b9df]/22">
            <Image
              src="/DKEU.svg"
              alt="DK"
              width={48}
              height={54}
              className="h-full w-10 shrink-0 object-cover"
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
              onChange={(event) => setPlate(sanitizePlate(event.target.value))}
              className="min-w-0 flex-1 border-0 bg-white px-3 text-xl font-semibold uppercase tracking-[0.08em] text-[#222] outline-none placeholder:text-[#cfcfcf]"
            />
          </span>
        </label>

        <Button type="submit" size="lg" className="h-12 rounded-md px-7" disabled={isPending}>
          <Search className="h-5 w-5" />
          {isPending ? "Tjekker..." : "Se din pris"}
        </Button>
      </form>

      {status ? (
        <div
          className={[
            "mt-3 max-w-2xl rounded-md border px-4 py-3 text-sm",
            status.type === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-[#2388d1]/30 bg-[#eef8ff] text-[#0d526d]",
          ].join(" ")}
        >
          {status.message}
        </div>
      ) : null}
    </>
  );
}
