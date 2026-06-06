"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Invoice } from "@/lib/server/invoices";
import type { InvoiceWorkflowResponse } from "@/components/invoices/invoice-workflow-button";

type EditableLine = {
  id: string;
  description: string;
  quantity: number;
  unitPriceDkk: number;
};

export function HtmlInvoiceEditor({
  invoice,
  onComplete,
  allowPaid = false,
}: {
  invoice: Invoice;
  onComplete: (payload: InvoiceWorkflowResponse) => void;
  allowPaid?: boolean;
}) {
  const [customerEmail, setCustomerEmail] = useState(invoice.customerEmail);
  const [notes, setNotes] = useState(invoice.invoiceNotes);
  const [status, setStatus] = useState(invoice.status);
  const [lines, setLines] = useState<EditableLine[]>(
    invoice.items.map((item) => ({
      id: item.id,
      description: item.description,
      quantity: item.quantity,
      unitPriceDkk: item.unitPriceDkk,
    }))
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const locked = invoice.status === "sent" || invoice.status === "paid";

  const updateLine = (
    index: number,
    field: keyof Omit<EditableLine, "id">,
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

  const save = async () => {
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch(`/api/invoices/${invoice.id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerEmail,
          notes,
          status,
          manualLines: locked ? undefined : lines,
        }),
      });
      const payload = (await response.json().catch(() => ({}))) as InvoiceWorkflowResponse;
      if (!response.ok || payload.success === false) {
        setMessage(payload.message || "Invoice could not be saved.");
        return;
      }
      onComplete(payload);
      setMessage(payload.message || "Invoice saved.");
    } catch {
      setMessage("Invoice could not be saved.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-3 rounded-2xl border border-[#dce8ec] bg-[#f8fbfb] p-4">
      <div className="grid gap-3 md:grid-cols-[1fr_12rem]">
        <label className="grid gap-1 text-xs font-semibold text-[#48616b]">
          Customer email
          <Input
            type="email"
            value={customerEmail}
            onChange={(event) => setCustomerEmail(event.target.value)}
            disabled={locked}
          />
        </label>
        <label className="grid gap-1 text-xs font-semibold text-[#48616b]">
          Status
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as Invoice["status"])}
            className="h-10 rounded-2xl border border-[#dce8ec] bg-white px-3 text-sm"
          >
            <option value="draft">Draft</option>
            <option value="ready">Ready</option>
            <option value="sent">Sent</option>
            {allowPaid || status === "paid" ? (
              <option value="paid" disabled={!allowPaid}>
                Paid
              </option>
            ) : null}
            <option value="cancelled">Cancelled</option>
          </select>
        </label>
      </div>

      {!locked ? (
        <div className="grid gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#218665]">
            Invoice lines
          </p>
          {lines.map((line, index) => (
            <div
              key={line.id || index}
              className="grid gap-2 md:grid-cols-[minmax(0,1fr)_5rem_8rem_auto]"
            >
              <Input
                value={line.description}
                onChange={(event) => updateLine(index, "description", event.target.value)}
                aria-label={`Line ${index + 1} description`}
              />
              <Input
                type="number"
                min="1"
                value={line.quantity}
                onChange={(event) => updateLine(index, "quantity", event.target.value)}
                aria-label={`Line ${index + 1} quantity`}
              />
              <Input
                type="number"
                min="0"
                value={line.unitPriceDkk}
                onChange={(event) => updateLine(index, "unitPriceDkk", event.target.value)}
                aria-label={`Line ${index + 1} unit price`}
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
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setLines((current) => [
                ...current,
                {
                  id: "",
                  description: "Extra service",
                  quantity: 1,
                  unitPriceDkk: 0,
                },
              ])
            }
            className="justify-self-start"
          >
            Add line
          </Button>
        </div>
      ) : null}

      <label className="grid gap-1 text-xs font-semibold text-[#48616b]">
        Notes and payment details
        <Textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={3}
        />
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" onClick={save} disabled={saving || lines.length === 0}>
          {saving ? "Saving..." : status === "draft" ? "Save draft" : "Save invoice"}
        </Button>
        {message ? (
          <span className="text-xs font-medium text-[#48616b]">{message}</span>
        ) : null}
      </div>
    </div>
  );
}
