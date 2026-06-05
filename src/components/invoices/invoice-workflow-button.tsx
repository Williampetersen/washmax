"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, type ButtonProps } from "@/components/ui/button";

type InvoiceWorkflowButtonProps = {
  endpoint: string;
  label: string;
  pendingLabel: string;
  body?: Record<string, unknown>;
  successMessage?: string;
  className?: string;
  buttonVariant?: ButtonProps["variant"];
};

type ApiResponse = {
  success?: boolean;
  message?: string;
};

export function InvoiceWorkflowButton({
  endpoint,
  label,
  pendingLabel,
  body,
  successMessage,
  className,
  buttonVariant = "primary",
}: InvoiceWorkflowButtonProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{
    tone: "success" | "error";
    message: string;
  } | null>(null);

  const handleClick = () => {
    setFeedback(null);
    setIsPending(true);

    void (async () => {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body ? JSON.stringify(body) : undefined,
        });
        const payload = (await response.json().catch(() => ({}))) as ApiResponse;

        if (!response.ok || payload.success === false) {
          setFeedback({
            tone: "error",
            message: payload.message || "The invoice action failed.",
          });
          return;
        }

        setFeedback({
          tone: "success",
          message: payload.message || successMessage || "Invoice updated successfully.",
        });
        startTransition(() => {
          router.refresh();
        });
      } catch {
        setFeedback({
          tone: "error",
          message: "The invoice action failed.",
        });
      } finally {
        setIsPending(false);
      }
    })();
  };

  return (
    <div className={className}>
      <Button onClick={handleClick} disabled={isPending} variant={buttonVariant}>
        {isPending ? pendingLabel : label}
      </Button>
      {feedback ? (
        <p
          className={`mt-2 text-xs font-medium ${
            feedback.tone === "success" ? "text-[#08745a]" : "text-[#c43d3d]"
          }`}
        >
          {feedback.message}
        </p>
      ) : null}
    </div>
  );
}
