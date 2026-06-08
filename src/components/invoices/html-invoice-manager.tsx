"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type {
  BookingInvoiceData,
  Invoice,
  InvoiceStatus,
} from "@/lib/server/invoices";

type ApiResponse = {
  success?: boolean;
  message?: string;
  emailSent?: boolean;
  invoiceId?: string;
  invoiceUrl?: string;
  invoiceData?: BookingInvoiceData;
};

type EditableLine = {
  id: string;
  description: string;
  quantity: number;
  unitPriceDkk: number;
};

export function HtmlInvoiceManager({
  bookingId,
  initialData,
  allowPaid = false,
  locale = "da",
}: {
  bookingId: string;
  initialData?: BookingInvoiceData;
  allowPaid?: boolean;
  locale?: "da" | "en";
}) {
  const [invoice, setInvoice] = useState<Invoice | null>(
    initialData?.invoice || null
  );
  const [customerEmail, setCustomerEmail] = useState(
    initialData?.invoice?.customerEmail || initialData?.customer.email || ""
  );
  const [notes, setNotes] = useState(initialData?.invoice?.invoiceNotes || "");
  const [status, setStatus] = useState<InvoiceStatus>(
    initialData?.invoice?.status || "draft"
  );
  const [lines, setLines] = useState<EditableLine[]>(
    initialData?.invoice?.items.map((item) => ({
      id: item.id,
      description: item.description,
      quantity: item.quantity,
      unitPriceDkk: item.unitPriceDkk,
    })) || []
  );
  const [pending, setPending] = useState<"create" | "save" | "send" | null>(null);
  const [feedback, setFeedback] = useState<{
    tone: "success" | "warning" | "error";
    message: string;
  } | null>(null);
  const locked = invoice?.status === "sent" || invoice?.status === "paid";
  const t =
    locale === "en"
      ? {
          create: "Create invoice",
          creating: "Creating...",
          save: "Save invoice",
          saving: "Saving...",
          send: "Send invoice",
          resend: "Send again",
          sending: "Sending...",
          preview: "Preview / print",
          email: "Customer email",
          status: "Status",
          lines: "Invoice lines",
          add: "Add line",
          remove: "Remove",
          notes: "Notes and payment details",
        }
      : {
          create: "Opret faktura",
          creating: "Opretter...",
          save: "Gem faktura",
          saving: "Gemmer...",
          send: "Send faktura",
          resend: "Send igen",
          sending: "Sender...",
          preview: "Vis / print",
          email: "Kundens e-mail",
          status: "Status",
          lines: "Fakturalinjer",
          add: "Tilføj linje",
          remove: "Fjern",
          notes: "Bemærkninger og betalingsdetaljer",
        };

  const applyPayload = (payload: ApiResponse) => {
    const next = payload.invoiceData?.invoice;
    if (!next) return;
    setInvoice(next);
    setCustomerEmail(next.customerEmail || payload.invoiceData?.customer.email || "");
    setNotes(next.invoiceNotes);
    setStatus(next.status);
    setLines(
      next.items.map((item) => ({
        id: item.id,
        description: item.description,
        quantity: item.quantity,
        unitPriceDkk: item.unitPriceDkk,
      }))
    );
  };

  const request = async (
    endpoint: string,
    method: "POST" | "PATCH",
    body?: Record<string, unknown>
  ) => {
    const response = await fetch(endpoint, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    const payload = (await response.json().catch(() => ({}))) as ApiResponse;
    if (!response.ok || payload.success === false) {
      throw new Error(payload.message || "Invoice action failed.");
    }
    applyPayload(payload);
    return payload;
  };

  const create = async () => {
    setPending("create");
    setFeedback(null);
    try {
      const payload = await request("/api/invoices/create-draft", "POST", {
        bookingId,
      });
      setFeedback({
        tone: "success",
        message: payload.message || "Invoice created.",
      });
    } catch (error) {
      setFeedback({
        tone: "error",
        message: error instanceof Error ? error.message : "Invoice could not be created.",
      });
    } finally {
      setPending(null);
    }
  };

  const save = async () => {
    if (!invoice) return;
    setPending("save");
    setFeedback(null);
    try {
      const payload = await request(`/api/invoices/${invoice.id}`, "PATCH", {
        customerEmail,
        invoiceNotes: notes,
        status,
        manualLines: locked ? undefined : lines,
      });
      setFeedback({
        tone: "success",
        message: payload.message || "Invoice saved.",
      });
    } catch (error) {
      setFeedback({
        tone: "error",
        message: error instanceof Error ? error.message : "Invoice could not be saved.",
      });
    } finally {
      setPending(null);
    }
  };

  const send = async () => {
    setPending("send");
    setFeedback(null);
    try {
      let current = invoice;
      let createdNow = false;
      if (!current) {
        const created = await request("/api/invoices/create-draft", "POST", {
          bookingId,
        });
        current = created.invoiceData?.invoice || null;
        createdNow = true;
      }
      if (!current) throw new Error("Invoice could not be created.");
      if (createdNow) {
        // Creation already snapshots the current booking lines on the server.
      } else if (current.status === "sent" || current.status === "paid") {
        const saved = await request(`/api/invoices/${current.id}`, "PATCH", {
          invoiceNotes: notes,
        });
        current = saved.invoiceData?.invoice || current;
      } else {
        const saved = await request(`/api/invoices/${current.id}`, "PATCH", {
          customerEmail,
          invoiceNotes: notes,
          manualLines: lines,
        });
        current = saved.invoiceData?.invoice || current;
      }
      const payload = await request(`/api/invoices/${current.id}/send`, "POST");
      setFeedback({
        tone: payload.emailSent ? "success" : "warning",
        message: payload.message || "Invoice send action completed.",
      });
    } catch (error) {
      setFeedback({
        tone: "error",
        message: error instanceof Error ? error.message : "Invoice could not be sent.",
      });
    } finally {
      setPending(null);
    }
  };

  const updateLine = (
    index: number,
    field: "description" | "quantity" | "unitPriceDkk",
    value: string
  ) => {
    setLines((current) =>
      current.map((line, lineIndex) =>
        lineIndex === index
          ? {
              ...line,
              [field]:
                field === "description"
                  ? value
                  : Math.max(field === "quantity" ? 1 : 0, Number(value || 0)),
            }
          : line
      )
    );
  };

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={create}
          disabled={pending !== null}
        >
          {pending === "create" ? t.creating : t.create}
        </Button>
        {invoice?.publicUrl ? (
          <a
            href={invoice.publicUrl}
            target="_blank"
            className="inline-flex h-10 items-center justify-center rounded-md border border-[#DDE3F5] bg-white px-3 text-[13px] font-semibold text-[#1F2340]"
          >
            {t.preview}
          </a>
        ) : null}
        <Button type="button" onClick={send} disabled={pending !== null}>
          {pending === "send"
            ? t.sending
            : invoice?.emailSent
              ? t.resend
              : t.send}
        </Button>
      </div>

      {invoice ? (
        <div className="grid gap-3 rounded-lg border border-[#dce8ec] bg-[#f8fbfb] p-4">
          <div className="grid gap-3 md:grid-cols-[1fr_12rem]">
            <label className="grid gap-1 text-xs font-semibold text-[#48616b]">
              {t.email}
              <Input
                type="email"
                value={customerEmail}
                onChange={(event) => setCustomerEmail(event.target.value)}
                disabled={locked}
              />
            </label>
            <label className="grid gap-1 text-xs font-semibold text-[#48616b]">
              {t.status}
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value as InvoiceStatus)}
                className="h-10 rounded-md border border-[#dce8ec] bg-white px-3 text-sm"
              >
                <option value="draft">Draft</option>
                <option value="ready">Ready</option>
                <option value="sent">Sent</option>
                {allowPaid || status === "paid" ? (
                  <option value="paid" disabled={!allowPaid}>Paid</option>
                ) : null}
                <option value="cancelled">Cancelled</option>
              </select>
            </label>
          </div>

          {!locked ? (
            <div className="grid gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0c7a61]">
                {t.lines}
              </p>
              {lines.map((line, index) => (
                <div
                  key={line.id || index}
                  className="grid gap-2 md:grid-cols-[minmax(0,1fr)_5rem_8rem_auto]"
                >
                  <Input
                    value={line.description}
                    onChange={(event) =>
                      updateLine(index, "description", event.target.value)
                    }
                  />
                  <Input
                    type="number"
                    min="1"
                    value={line.quantity}
                    onChange={(event) =>
                      updateLine(index, "quantity", event.target.value)
                    }
                  />
                  <Input
                    type="number"
                    min="0"
                    value={line.unitPriceDkk}
                    onChange={(event) =>
                      updateLine(index, "unitPriceDkk", event.target.value)
                    }
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setLines((current) =>
                        current.filter((_, lineIndex) => lineIndex !== index)
                      )
                    }
                  >
                    {t.remove}
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="justify-self-start"
                onClick={() =>
                  setLines((current) => [
                    ...current,
                    {
                      id: "",
                      description: locale === "en" ? "Extra service" : "Ekstra service",
                      quantity: 1,
                      unitPriceDkk: 0,
                    },
                  ])
                }
              >
                {t.add}
              </Button>
            </div>
          ) : null}

          <label className="grid gap-1 text-xs font-semibold text-[#48616b]">
            {t.notes}
            <Textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={3}
            />
          </label>
          <Button
            type="button"
            onClick={save}
            disabled={pending !== null || lines.length === 0}
            className="justify-self-start"
          >
            {pending === "save" ? t.saving : t.save}
          </Button>
        </div>
      ) : null}

      {feedback ? (
        <p
          className={`text-xs font-medium ${
            feedback.tone === "success"
              ? "text-[#08745a]"
              : feedback.tone === "warning"
                ? "text-[#9a6700]"
                : "text-red-600"
          }`}
        >
          {feedback.message}
        </p>
      ) : null}
    </div>
  );
}
