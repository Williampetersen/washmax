"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InvoiceWorkflowButton,
  type InvoiceWorkflowResponse,
} from "@/components/invoices/invoice-workflow-button";
import { Input } from "@/components/ui/input";
import type { DashboardBooking } from "@/lib/server/bookings";
import type { BookingInvoiceData, BookingLineItem } from "@/lib/server/invoices";
import { formatPrice } from "@/lib/shared/booking";
import { cn } from "@/lib/utils";

export function AdminInvoicePanel({ booking }: { booking: DashboardBooking }) {
  const [invoiceData, setInvoiceData] = useState<BookingInvoiceData | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const summary = invoiceData?.summary ?? {
    originalBookingPriceDkk: booking.total,
    existingExtraServicesDkk: 0,
    manualExtraChargesDkk: 0,
    totalInclMomsDkk: booking.total,
    momsAmountDkk: Math.round(booking.total * 0.2),
    subtotalExMomsDkk: booking.total - Math.round(booking.total * 0.2),
  };
  const invoice = invoiceData?.invoice;
  const lineItems = invoiceData?.lineItems ?? [];

  const loadInvoiceData = async () => {
    setStatus("loading");
    try {
      const response = await fetch(`/api/admin/bookings/${booking.id}/invoice`, {
        cache: "no-store",
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setInvoiceData((await response.json()) as BookingInvoiceData);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  const applyInvoiceResponse = (payload: InvoiceWorkflowResponse) => {
    if (payload.invoiceData) {
      setInvoiceData(payload.invoiceData as BookingInvoiceData);
      setStatus("idle");
    }
  };

  return (
    <section className="rounded-3xl border border-white/55 bg-white/[0.65] px-4 py-4 shadow-[0_8px_32px_rgba(99,102,241,0.08)] backdrop-blur-2xl">
      <div className="grid gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-[var(--ink)]">Agent extras og faktura</p>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Alle priser er DKK inkl. moms.
            </p>
          </div>
          <span className="rounded-full border border-[#DDE3F5] bg-white/70 px-2.5 py-1 text-[12px] font-semibold text-[#4B5563]">
            {invoice ? invoice.status : "No invoice"}
          </span>
        </div>

        {invoiceData ? (
          lineItems.length > 0 ? (
            <div className="grid gap-2">
              {lineItems.map((item) => (
                <AdminLineItemRow key={item.id} bookingId={booking.id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyInvoiceState text="Ingen prislinjer er indlaest endnu." />
          )
        ) : (
          <div className="rounded-2xl border border-dashed border-[#DDE3F5] bg-[#fbfdff] px-4 py-4 text-sm text-[#4B5563]">
            <p>Prislinjer og fakturahistorik loader nu foerst ved behov for hurtigere bookingvisning.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                onClick={loadInvoiceData}
                disabled={status === "loading"}
                variant="outline"
              >
                {status === "loading" ? "Indlaeser..." : "Indlaes fakturadetaljer"}
              </Button>
              {status === "error" ? (
                <span className="text-xs font-medium text-red-600">
                  Fakturadata kunne ikke indlaeses.
                </span>
              ) : null}
            </div>
          </div>
        )}

        {invoiceData ? (
          <form
            action={`/api/admin/bookings/${booking.id}/line-items`}
            method="POST"
            className="grid gap-2 rounded-2xl border border-[#e4edf3] bg-[#fbfdff] p-3"
          >
            <input type="hidden" name="return_tab" value="details" />
            <p className="text-sm font-semibold text-[var(--ink)]">Tilfoej ekstra linje</p>
            <div className="grid gap-2 sm:grid-cols-[1fr_5rem_8rem]">
              <Input name="description" placeholder="Beskrivelse" required />
              <Input type="number" name="quantity" min="1" defaultValue="1" />
              <Input type="number" name="unit_price_dkk" min="0" placeholder="Pris" required />
            </div>
            <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
              <select
                name="item_type"
                defaultValue="manual_extra_charge"
                className={selectClassName}
              >
                <option value="existing_extra_service">Existing extra service</option>
                <option value="manual_extra_charge">Manual extra charge</option>
              </select>
              <Button type="submit">Tilfoej linje</Button>
            </div>
          </form>
        ) : null}

        <AdminPriceSummary summary={summary} />

        <div className="flex flex-wrap gap-2">
          <InvoiceWorkflowButton
            endpoint={`/api/admin/bookings/${booking.id}/generate-invoice`}
            label="Generer faktura"
            pendingLabel="Genererer PDF..."
            successMessage="Invoice PDF generated successfully."
            buttonVariant="outline"
            onComplete={applyInvoiceResponse}
          />
          {invoice?.pdfUrl ? (
            <>
              <a
                href={invoice.pdfUrl}
                target="_blank"
                className="inline-flex h-10 items-center justify-center rounded-2xl border border-[#DDE3F5] bg-white/70 px-3 text-[13px] font-semibold text-[#1F2340]"
              >
                View invoice
              </a>
              <a
                href={`${invoice.pdfUrl}?download=1`}
                className="inline-flex h-10 items-center justify-center rounded-2xl border border-[#DDE3F5] bg-white/70 px-3 text-[13px] font-semibold text-[#1F2340]"
              >
                Download PDF
              </a>
            </>
          ) : null}
          <InvoiceWorkflowButton
            endpoint="/api/invoices/generate-send"
            body={{ bookingId: booking.id }}
            label="Generate and send invoice"
            pendingLabel="Generating and sending..."
            onComplete={applyInvoiceResponse}
          />
          {invoice ? (
            <InvoiceWorkflowButton
              endpoint={`/api/invoices/${invoice.id}/resend`}
              label="Send again"
              pendingLabel="Sending..."
              buttonVariant="outline"
              onComplete={applyInvoiceResponse}
            />
          ) : null}
        </div>

        {invoiceData && invoice ? (
          <form
            action={`/api/admin/invoices/${invoice.id}`}
            method="POST"
            className="grid gap-2 rounded-2xl border border-[#e4edf3] bg-[#fbfdff] p-3 sm:grid-cols-[1fr_auto]"
          >
            <select name="status" defaultValue={invoice.status} className={selectClassName}>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <Button type="submit" variant="outline">
              Opdater fakturastatus
            </Button>
          </form>
        ) : null}
      </div>
    </section>
  );
}

function AdminLineItemRow({
  bookingId,
  item,
}: {
  bookingId: string;
  item: BookingLineItem;
}) {
  if (item.itemType === "original_service") {
    return (
      <div className="grid gap-2 rounded-2xl border border-[#e4edf3] bg-[#fbfdff] px-3 py-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="text-sm font-semibold text-[var(--ink)]">{item.description}</p>
          <p className="text-xs text-[var(--muted)]">
            Original service | Qty {item.quantity} | {item.agentName || "System"}
          </p>
        </div>
        <strong>{formatPrice(item.totalPriceDkk)}</strong>
      </div>
    );
  }

  return (
    <form
      action={`/api/admin/bookings/${bookingId}/line-items/${item.id}`}
      method="POST"
      className="grid gap-2 rounded-2xl border border-[#e4edf3] bg-[#fbfdff] p-3 lg:grid-cols-[minmax(0,1fr)_5rem_8rem_auto]"
    >
      <input type="hidden" name="return_tab" value="details" />
      <div className="grid gap-1">
        <Input name="description" defaultValue={item.description} />
        <p className="text-xs text-[var(--muted)]">
          {item.itemType.replaceAll("_", " ")} | Added by {item.agentName || item.createdByType} | {item.createdAt}
          {item.lockedAt ? " | Locked" : ""}
        </p>
      </div>
      <Input type="number" name="quantity" min="1" defaultValue={item.quantity} />
      <Input type="number" name="unit_price_dkk" min="0" defaultValue={item.unitPriceDkk} />
      <div className="flex gap-2">
        <Button type="submit" className="h-10">
          Gem
        </Button>
        <Button type="submit" name="action" value="delete" variant="outline" className="h-10">
          Fjern
        </Button>
      </div>
    </form>
  );
}

function AdminPriceSummary({ summary }: { summary: BookingInvoiceData["summary"] }) {
  return (
    <div className="grid gap-2 rounded-2xl border border-[#e4edf3] bg-[#fbfdff] p-3 text-sm text-[var(--muted)]">
      <AdminSummaryRow label="Original booking price" value={summary.originalBookingPriceDkk} />
      <AdminSummaryRow label="Extra services" value={summary.existingExtraServicesDkk} />
      <AdminSummaryRow label="Manual extra charges" value={summary.manualExtraChargesDkk} />
      <AdminSummaryRow label="Subtotal ex. moms" value={summary.subtotalExMomsDkk} />
      <AdminSummaryRow label="Moms 25% included" value={summary.momsAmountDkk} />
      <AdminSummaryRow label="Total customer pays" value={summary.totalInclMomsDkk} strong />
    </div>
  );
}

function AdminSummaryRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: number;
  strong?: boolean;
}) {
  return (
    <div className={cn("flex justify-between gap-3", strong ? "text-[var(--ink)]" : "")}>
      <span>{label}</span>
      <strong>{formatPrice(value)}</strong>
    </div>
  );
}

function EmptyInvoiceState({ text }: { text: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-[#DDE3F5] bg-white/55 px-4 py-4 text-[13px] font-medium text-[#8E95B5]">
      {text}
    </div>
  );
}

const selectClassName =
  "h-10 w-full rounded-2xl border border-[#E1E6F7] bg-white/70 px-3 text-[13px] font-medium text-[#1F2340] outline-none transition focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10";
