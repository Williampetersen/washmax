"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ProgressState = {
  active: boolean;
  label: string;
  progress: number;
  done: boolean;
};

const defaultLabel = "Gemmer dine ændringer...";

const normalizeLabel = (value: unknown) => {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return text || defaultLabel;
};

export function GlobalProgressOverlay() {
  const [state, setState] = useState<ProgressState>({
    active: false,
    label: defaultLabel,
    progress: 0,
    done: false,
  });
  const pendingCountRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  const start = (label?: string) => {
    pendingCountRef.current += 1;
    setState({
      active: true,
      label: normalizeLabel(label),
      progress: 12,
      done: false,
    });
  };

  const finish = () => {
    pendingCountRef.current = Math.max(0, pendingCountRef.current - 1);
    if (pendingCountRef.current > 0) {
      return;
    }

    setState((current) => ({
      ...current,
      progress: 100,
      done: true,
    }));

    window.setTimeout(() => {
      setState({
        active: false,
        label: defaultLabel,
        progress: 0,
        done: false,
      });
    }, 220);
  };

  useEffect(() => {
    if (!state.active || state.done) {
      if (animationRef.current) {
        window.clearInterval(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    animationRef.current = window.setInterval(() => {
      setState((current) => {
        if (!current.active || current.done) {
          return current;
        }

        const remaining = 92 - current.progress;
        const step = remaining > 40 ? 9 : remaining > 20 ? 5 : 2;
        return {
          ...current,
          progress: Math.min(92, current.progress + step),
        };
      });
    }, 180);

    return () => {
      if (animationRef.current) {
        window.clearInterval(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [state.active, state.done]);

  useEffect(() => {
    const handleCustomStart = (event: Event) => {
      const customEvent = event as CustomEvent<{ label?: string }>;
      start(customEvent.detail?.label);
    };

    const handleCustomDone = () => {
      finish();
    };

    const handleSubmit = (event: Event) => {
      const submitEvent = event as SubmitEvent;
      const submitter = submitEvent.submitter as HTMLElement | null;
      const label =
        submitter?.getAttribute("data-progress-label") ||
        submitter?.textContent ||
        (submitEvent.target as HTMLFormElement | null)?.getAttribute("data-progress-label") ||
        defaultLabel;
      start(label);
    };

    const originalFetch = window.fetch.bind(window);
    window.fetch = async (input, init) => {
      const request = input instanceof Request ? input : null;
      const method = (init?.method || request?.method || "GET").toUpperCase();
      const url = typeof input === "string" ? input : request?.url || "";
      const isMutation = method !== "GET" && method !== "HEAD";
      const isLocal =
        !url ||
        url.startsWith("/") ||
        url.startsWith(window.location.origin);
      const label =
        typeof init?.headers === "object" && init.headers && "X-Progress-Label" in init.headers
          ? String((init.headers as Record<string, string>)["X-Progress-Label"] || "")
          : defaultLabel;

      if (isMutation && isLocal) {
        start(label);
      }

      try {
        return await originalFetch(input, init);
      } finally {
        if (isMutation && isLocal) {
          finish();
        }
      }
    };

    const resetOverlay = () => {
      pendingCountRef.current = 0;
      setState({
        active: false,
        label: defaultLabel,
        progress: 0,
        done: false,
      });
    };

    window.addEventListener("washmax:progress:start", handleCustomStart);
    window.addEventListener("washmax:progress:done", handleCustomDone);
    document.addEventListener("submit", handleSubmit, true);
    window.addEventListener("pageshow", resetOverlay);

    return () => {
      window.fetch = originalFetch;
      window.removeEventListener("washmax:progress:start", handleCustomStart);
      window.removeEventListener("washmax:progress:done", handleCustomDone);
      document.removeEventListener("submit", handleSubmit, true);
      window.removeEventListener("pageshow", resetOverlay);
    };
  }, []);

  const progressLabel = useMemo(() => `${Math.round(state.progress)}%`, [state.progress]);

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-[120] flex items-center justify-center px-4 transition duration-200",
        state.active ? "opacity-100" : "opacity-0"
      )}
      aria-hidden={!state.active}
    >
      <div className="absolute inset-0 bg-[#0f172a]/34 backdrop-blur-[2px]" />
      <div className="relative w-full max-w-sm rounded-[1.8rem] border border-[#d8e8ff] bg-white px-5 py-5 shadow-[0_24px_80px_rgba(37,99,235,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#2563EB]">
              Arbejder
            </p>
            <h2 className="mt-2 text-[22px] font-bold text-[#10243b]">{state.label}</h2>
            <p className="mt-1 text-sm text-[#5b6b7c]">
              Vent et øjeblik mens vi opdaterer siden.
            </p>
          </div>
          <span className="rounded-full bg-[#eff6ff] px-3 py-1 text-[12px] font-semibold text-[#2563EB]">
            {progressLabel}
          </span>
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#dbeafe]">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#2563eb,#3b82f6,#60a5fa)] transition-[width] duration-200"
            style={{ width: `${state.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
