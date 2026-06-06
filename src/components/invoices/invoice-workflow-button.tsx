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
  onComplete?: (payload: InvoiceWorkflowResponse) => void | Promise<void>;
  className?: string;
  buttonVariant?: ButtonProps["variant"];
};

export type InvoiceWorkflowResponse = {
  success?: boolean;
  message?: string;
  invoiceGenerated?: boolean;
  invoiceStored?: boolean;
  emailSent?: boolean;
  invoiceId?: string;
  invoiceNumber?: string;
  invoiceUrl?: string;
  invoiceHtmlUrl?: string;
  invoiceData?: unknown;
};

export function InvoiceWorkflowButton({
  endpoint,
  label,
  pendingLabel,
  body,
  successMessage,
  onComplete,
  className,
  buttonVariant = "primary",
}: InvoiceWorkflowButtonProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{
    tone: "success" | "warning" | "error";
    message: string;
    url?: string;
  } | null>(null);

  const handleClick = () => {
    setFeedback(null);
    setIsPending(true);

    void (async () => {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: body ? JSON.stringify(body) : undefined,
        });
        const payload = (await response.json().catch(() => ({}))) as InvoiceWorkflowResponse;

        if (
          payload.success === false &&
          payload.invoiceGenerated &&
          payload.emailSent === false
        ) {
          await onComplete?.(payload);
          setFeedback({
            tone: "warning",
            message:
              payload.message ||
              "Invoice was generated and saved, but email could not be sent.",
          });
          return;
        }

        if (!response.ok || payload.success === false) {
          setFeedback({
            tone: "error",
            message: payload.message || "The invoice action failed.",
            url: payload.invoiceHtmlUrl,
          });
          return;
        }

        setFeedback({
          tone: "success",
          message: payload.message || successMessage || "Invoice updated successfully.",
        });
        if (onComplete) {
          await onComplete(payload);
        } else {
          startTransition(() => {
            router.refresh();
          });
        }
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
            feedback.tone === "success"
              ? "text-[#08745a]"
              : feedback.tone === "warning"
                ? "text-[#9a6700]"
                : "text-[#c43d3d]"
          }`}
        >
          {feedback.message}
          {feedback.url ? (
            <>
              {" "}
              <a
                href={feedback.url}
                target="_blank"
                className="font-semibold underline underline-offset-2"
              >
                Open printable invoice
              </a>
            </>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}
