export type HtmlInvoiceLine = {
  description: string;
  quantity: number;
  unitPriceDkk: number;
  totalDkk: number;
};

export type HtmlInvoiceDocument = {
  invoiceNumber: string;
  invoiceDate: string;
  status: string;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress?: string;
  companyCvr?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  bookingId: string;
  vehicle: string;
  registrationNumber: string;
  service: string;
  appointment: string;
  lines: HtmlInvoiceLine[];
  subtotalExVatDkk: number;
  vatDkk: number;
  totalDkk: number;
  notes?: string;
  paymentInstructions?: string;
};

const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const formatMoney = (value: number) =>
  new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    minimumFractionDigits: 2,
  }).format(value);

const companyLine = (label: string, value?: string) =>
  value
    ? `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`
    : "";

export const renderInvoiceHtml = (invoice: HtmlInvoiceDocument) => `<!doctype html>
<html lang="da">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(invoice.invoiceNumber)} | ${escapeHtml(invoice.companyName)}</title>
    <style>
      :root{--ink:#102d38;--navy:#123d52;--green:#12b886;--mist:#edf4f5;--line:#d8e5e8;--muted:#647983}
      *{box-sizing:border-box}
      body{margin:0;background:linear-gradient(145deg,#dcebed,#f7faf9 48%,#d8eee7);color:var(--ink);font-family:Arial,Helvetica,sans-serif;line-height:1.45}
      .toolbar{position:sticky;top:0;z-index:10;display:flex;align-items:center;justify-content:center;gap:14px;padding:14px;background:rgba(16,45,56,.94);color:#fff}
      .toolbar button{border:0;border-radius:999px;background:#fff;color:var(--navy);padding:11px 20px;font-size:14px;font-weight:800;cursor:pointer}
      .toolbar button.secondary{border:1px solid rgba(255,255,255,.45);background:transparent;color:#fff}
      .toolbar span{font-size:12px;color:#d9eff1}
      .invoice{width:min(920px,calc(100% - 28px));margin:28px auto 54px;background:#fff;border-radius:24px;box-shadow:0 24px 70px rgba(18,61,82,.16);overflow:hidden}
      .top{display:grid;grid-template-columns:1fr auto;gap:32px;padding:42px;background:linear-gradient(130deg,#102d38,#174f61);color:#fff}
      .brand{font-size:25px;font-weight:900;letter-spacing:.08em}.brand-sub{margin-top:8px;color:#bfe7df;font-size:13px}
      .title{text-align:right}.title h1{margin:0;font-size:38px;letter-spacing:.04em}.title p{margin:8px 0 0;color:#d9eff1}
      .status{display:inline-flex;margin-top:14px;border:1px solid rgba(255,255,255,.3);border-radius:999px;padding:5px 10px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.1em}
      .content{padding:38px 42px 44px}.parties{display:grid;grid-template-columns:1fr 1fr;gap:26px;margin-bottom:32px}
      .card{border:1px solid var(--line);border-radius:18px;padding:20px;background:#fbfdfd}.label{margin:0 0 12px;color:var(--green);font-size:11px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}
      .card h2{margin:0 0 8px;font-size:18px}.card p{margin:4px 0;color:#3d5964;font-size:14px}
      .company{display:grid;gap:5px}.company div{display:flex;justify-content:space-between;gap:14px;font-size:13px}.company span{color:var(--muted)}.company strong{text-align:right}
      .booking{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:28px}.booking div{padding:14px;border-radius:14px;background:var(--mist)}
      .booking span{display:block;color:var(--muted);font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:.08em}.booking strong{display:block;margin-top:5px;font-size:13px}
      table{width:100%;border-collapse:collapse}th{padding:13px 12px;background:var(--navy);color:#fff;font-size:11px;text-align:left;text-transform:uppercase;letter-spacing:.07em}
      th:first-child{border-radius:12px 0 0 12px}th:last-child{border-radius:0 12px 12px 0}td{padding:15px 12px;border-bottom:1px solid var(--line);font-size:14px}.number{text-align:right;white-space:nowrap}
      .totals{width:min(390px,100%);margin:24px 0 0 auto}.totals td{padding:9px 8px}.totals .grand td{border-top:2px solid var(--navy);border-bottom:0;color:var(--navy);font-size:19px;font-weight:900}
      .notes{margin-top:28px;padding:18px 20px;border-left:4px solid var(--green);border-radius:0 14px 14px 0;background:#f0faf6}.notes h3{margin:0 0 6px;font-size:13px}.notes p{margin:0;color:#46616a;font-size:13px;white-space:pre-wrap}
      footer{margin-top:34px;padding-top:22px;border-top:1px solid var(--line);color:var(--muted);font-size:12px;text-align:center}
      @media(max-width:700px){.toolbar span{display:none}.top,.parties{grid-template-columns:1fr}.title{text-align:left}.booking{grid-template-columns:1fr 1fr}.content,.top{padding:26px 22px}.invoice{width:min(100% - 16px,920px);margin-top:12px}.table-wrap{overflow-x:auto}table{min-width:620px}}
      @media print{@page{size:A4;margin:12mm}body{background:#fff}.toolbar{display:none!important}.invoice{width:100%;margin:0;border:0;border-radius:0;box-shadow:none}.top{padding:24px 28px}.content{padding:24px 28px}.card,.notes{break-inside:avoid}}
    </style>
  </head>
  <body>
    <div class="toolbar">
      <button type="button" onclick="window.print()">Print / Save as PDF</button>
      <button class="secondary" type="button" onclick="const blob=new Blob([document.documentElement.outerHTML],{type:'text/html;charset=utf-8'});const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download='${escapeHtml(invoice.invoiceNumber)}.html';link.click();setTimeout(()=>URL.revokeObjectURL(link.href),1000)">Download invoice</button>
      <span>Choose "Save as PDF" in the print dialog for a PDF copy.</span>
    </div>
    <main class="invoice">
      <header class="top">
        <div><div class="brand">${escapeHtml(invoice.companyName)}</div><div class="brand-sub">Professionel bilpleje hos kunden</div></div>
        <div class="title"><h1>FAKTURA</h1><p>${escapeHtml(invoice.invoiceNumber)} · ${escapeHtml(invoice.invoiceDate)}</p><span class="status">${escapeHtml(invoice.status)}</span></div>
      </header>
      <div class="content">
        <section class="parties">
          <div class="card"><p class="label">Faktureret til</p><h2>${escapeHtml(invoice.customerName)}</h2><p>${escapeHtml(invoice.customerEmail)}</p><p>${escapeHtml(invoice.customerPhone)}</p><p>${escapeHtml(invoice.customerAddress)}</p></div>
          <div class="card"><p class="label">Afsender</p><div class="company">${companyLine("Virksomhed", invoice.companyName)}${companyLine("CVR", invoice.companyCvr)}${companyLine("Adresse", invoice.companyAddress)}${companyLine("Email", invoice.companyEmail)}${companyLine("Telefon", invoice.companyPhone)}</div></div>
        </section>
        <section class="booking">
          <div><span>Booking</span><strong>${escapeHtml(invoice.bookingId)}</strong></div>
          <div><span>Bil</span><strong>${escapeHtml(invoice.vehicle)}</strong></div>
          <div><span>Nummerplade</span><strong>${escapeHtml(invoice.registrationNumber)}</strong></div>
          <div><span>Tidspunkt</span><strong>${escapeHtml(invoice.appointment)}</strong></div>
        </section>
        <div class="table-wrap"><table><thead><tr><th>Beskrivelse</th><th class="number">Antal</th><th class="number">Stk. pris</th><th class="number">Beløb</th></tr></thead><tbody>${invoice.lines
          .map((line) => `<tr><td>${escapeHtml(line.description)}</td><td class="number">${line.quantity}</td><td class="number">${escapeHtml(formatMoney(line.unitPriceDkk))}</td><td class="number">${escapeHtml(formatMoney(line.totalDkk))}</td></tr>`)
          .join("")}</tbody></table></div>
        <table class="totals">
          <tr><td>Subtotal ekskl. moms</td><td class="number">${escapeHtml(formatMoney(invoice.subtotalExVatDkk))}</td></tr>
          <tr><td>Moms 25%</td><td class="number">${escapeHtml(formatMoney(invoice.vatDkk))}</td></tr>
          <tr class="grand"><td>Total inkl. moms</td><td class="number">${escapeHtml(formatMoney(invoice.totalDkk))}</td></tr>
        </table>
        ${invoice.notes || invoice.paymentInstructions ? `<section class="notes"><h3>Bemærkninger og betaling</h3><p>${escapeHtml([invoice.notes, invoice.paymentInstructions].filter(Boolean).join("\n\n"))}</p></section>` : ""}
        <footer>${escapeHtml(invoice.companyName)} · ${escapeHtml(invoice.companyEmail)} · ${escapeHtml(invoice.companyPhone)}</footer>
      </div>
    </main>
  </body>
</html>`;
