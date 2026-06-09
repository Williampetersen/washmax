import nodemailer from "nodemailer";
import {
  formatDateTimeLabel,
  formatPrice,
  getStatusLabel,
  type BookingStatus,
} from "@/lib/shared/booking";
import { recordEmailLog } from "@/lib/server/bookings";

type MailBooking = {
  id: string;
  plate: string;
  registrationNumber: string;
  vehicleName: string;
  packageLabel: string;
  category: string;
  addons: Array<{ label: string; price: number }>;
  total: number;
  appointmentDate: string;
  appointmentTime: string;
  status: BookingStatus;
  adminNotes?: string;
};

type MailCustomer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  customerType: string;
  company: string;
  companyId: string;
  notes: string;
};

type MailSettings = {
  companyName: string;
  supportEmail: string;
  adminNotifyEmail: string;
};

type CustomerMailInput = {
  booking: MailBooking;
  customer: MailCustomer;
  settings: MailSettings;
  portalUrl?: string;
};

type LoggedMessage = {
  bookingId?: string;
  customerId?: string;
  recipient: string;
  recipientRole: string;
  templateKey: string;
  subject: string;
  html: string;
  text: string;
  attachments?: nodemailer.SendMailOptions["attachments"];
};

type LoggedMailResult = {
  status: "sent" | "not_configured";
  messageId?: string;
};

let cachedTransporter: nodemailer.Transporter | null | undefined;

const getMailConfig = () => ({
  host: process.env.SMTP_HOST || "",
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE || "false") === "true",
  user: process.env.SMTP_USER || "",
  pass: process.env.SMTP_PASSWORD || "",
  from:
    process.env.MAIL_FROM ||
    `${process.env.MAIL_FROM_NAME || "WashMax"} <${process.env.SMTP_USER || ""}>`,
});

export const isMailConfigured = () => {
  const config = getMailConfig();
  return Boolean(config.host && config.user && config.pass && config.from);
};

const getTransporter = () => {
  if (cachedTransporter === undefined) {
    const config = getMailConfig();

    cachedTransporter = isMailConfigured()
      ? nodemailer.createTransport({
          host: config.host,
          port: config.port,
          secure: config.secure,
          auth: {
            user: config.user,
            pass: config.pass,
          },
        })
      : null;
  }

  return cachedTransporter;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const getCustomerName = (customer: MailCustomer) =>
  [customer.firstName, customer.lastName].filter(Boolean).join(" ");

const getAppointmentLabel = (booking: MailBooking) =>
  formatDateTimeLabel(booking.appointmentDate, booking.appointmentTime);

const getAddressLine = (customer: MailCustomer) =>
  [customer.address, [customer.postalCode, customer.city].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(", ");

const getAddonMarkup = (addons: MailBooking["addons"]) => {
  if (addons.length === 0) {
    return '<p style="margin:0;color:#5b6b75;">Ingen tilvalg</p>';
  }

  return `<ul style="margin:0;padding-left:18px;color:#16303a;">${addons
    .map(
      (item) =>
        `<li>${escapeHtml(item.label)} (${escapeHtml(formatPrice(item.price))})</li>`
    )
    .join("")}</ul>`;
};

const getAddonText = (addons: MailBooking["addons"]) =>
  addons.length > 0
    ? addons.map((item) => `${item.label} (${formatPrice(item.price)})`).join(", ")
    : "Ingen tilvalg";

const renderRows = (rows: Array<[string, string]>) =>
  `<table style="border-collapse:collapse;width:100%;margin-top:18px;">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 0;font-weight:700;vertical-align:top;">${escapeHtml(
          label
        )}</td><td style="padding:8px 0;">${escapeHtml(value)}</td></tr>`
    )
    .join("")}</table>`;

const renderPortalButton = (portalUrl?: string, label = "Aabn kundeportal") =>
  portalUrl
    ? `<p style="margin:20px 0 0;"><a href="${escapeHtml(
        portalUrl
      )}" style="display:inline-block;background:#55b9df;color:#fff;text-decoration:none;padding:12px 18px;border-radius:12px;font-weight:700;">${escapeHtml(
        label
      )}</a></p>`
    : "";

const renderAdminNote = (adminNotes?: string) => {
  const note = String(adminNotes || "").trim();
  if (!note) return "";

  return `
    <div style="margin-top:18px;padding:14px 16px;border-radius:14px;background:#f6fbff;border:1px solid #cde6f6;">
      <p style="margin:0 0 6px;font-weight:700;color:#16303a;">Besked fra WashMax</p>
      <p style="margin:0;color:#36505d;">${escapeHtml(note)}</p>
    </div>
  `;
};

const renderCustomerEmailHtml = (input: {
  eyebrow: string;
  title: string;
  intro: string;
  highlight: string;
  footer: string;
  booking: MailBooking;
  customer: MailCustomer;
  settings: MailSettings;
  portalUrl?: string;
  portalLabel?: string;
}) => {
  const appointmentLabel = getAppointmentLabel(input.booking);
  const addressLine = getAddressLine(input.customer);

  return `
    <div style="font-family:Inter,Arial,sans-serif;color:#16303a;line-height:1.6;max-width:640px;">
      <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#2388d1;">${escapeHtml(
        input.eyebrow
      )}</p>
      <h2 style="margin:0 0 12px;font-size:28px;line-height:1.2;">${escapeHtml(input.title)}</h2>
      <p style="margin:0;color:#36505d;">${escapeHtml(input.intro)}</p>
      <div style="margin-top:16px;padding:14px 16px;border-radius:14px;background:#eef8ff;border:1px solid #cde6f6;color:#1a506d;">
        ${escapeHtml(input.highlight)}
      </div>
      ${renderPortalButton(input.portalUrl, input.portalLabel)}
      ${renderRows([
        ["Status", getStatusLabel(input.booking.status)],
        ["Tid", appointmentLabel],
        ["Bil", input.booking.vehicleName],
        ["Regnr.", input.booking.registrationNumber],
        ["Pakke", `${input.booking.packageLabel} - ${input.booking.category}`],
        ["Adresse", addressLine],
        ["Total", formatPrice(input.booking.total)],
      ])}
      <div style="margin-top:16px;">
        <strong>Tilvalg</strong>
        ${getAddonMarkup(input.booking.addons)}
      </div>
      ${renderAdminNote(input.booking.adminNotes)}
      <p style="margin-top:20px;color:#36505d;">${escapeHtml(input.footer)}</p>
      <p style="margin-top:10px;color:#36505d;">Support: ${escapeHtml(input.settings.supportEmail)}</p>
    </div>
  `;
};

const renderCustomerEmailText = (input: {
  title: string;
  intro: string;
  highlight: string;
  footer: string;
  booking: MailBooking;
  customer: MailCustomer;
  settings: MailSettings;
  portalUrl?: string;
}) => {
  const appointmentLabel = getAppointmentLabel(input.booking);
  const addressLine = getAddressLine(input.customer);
  const lines = [
    input.title,
    "",
    input.intro,
    input.highlight,
    "",
    `Status: ${getStatusLabel(input.booking.status)}`,
    `Tid: ${appointmentLabel}`,
    `Bil: ${input.booking.vehicleName}`,
    `Regnr.: ${input.booking.registrationNumber}`,
    `Pakke: ${input.booking.packageLabel} - ${input.booking.category}`,
    `Adresse: ${addressLine}`,
    `Total: ${formatPrice(input.booking.total)}`,
    `Tilvalg: ${getAddonText(input.booking.addons)}`,
  ];

  if (input.booking.adminNotes?.trim()) {
    lines.push("", `Besked fra WashMax: ${input.booking.adminNotes.trim()}`);
  }

  if (input.portalUrl) {
    lines.push("", `Kundeportal: ${input.portalUrl}`);
  }

  lines.push("", input.footer, `Support: ${input.settings.supportEmail}`);

  return lines.join("\n");
};

const getCustomerCreationCopy = (
  booking: MailBooking,
  settings: MailSettings
): {
  subject: string;
  eyebrow: string;
  title: string;
  intro: string;
  highlight: string;
  footer: string;
  portalLabel: string;
} => {
  const appointmentLabel = getAppointmentLabel(booking);

  switch (booking.status) {
    case "approved":
      return {
        subject: `${settings.companyName}: din booking er godkendt`,
        eyebrow: "Booking godkendt",
        title: "Din booking er godkendt",
        intro: `Vi har godkendt din booking hos ${settings.companyName} og reserveret tiden ${appointmentLabel}.`,
        highlight:
          "Du har nu en aktiv tid i kalenderen. Brug kundeportalen, hvis du vil gennemga detaljerne eller opdatere dine oplysninger.",
        footer:
          "Har du brug for at aendre noget, kan du svare pa denne mail eller kontakte os direkte.",
        portalLabel: "Se din booking",
      };
    default:
      return {
        subject: `${settings.companyName}: booking modtaget`,
        eyebrow: "Booking modtaget",
        title: "Vi har modtaget din booking",
        intro: `Tak for din booking hos ${settings.companyName}. Vi gennemgaar nu forespoergslen for ${appointmentLabel}.`,
        highlight:
          "Du faar en ny mail, saa snart bookingen er godkendt eller hvis vi har brug for at justere noget.",
        footer:
          "Du kan bruge kundeportalen allerede nu, hvis du vil tjekke oplysningerne eller sende os en kommentar.",
        portalLabel: "Aabn kundeportal",
      };
  }
};

const getCustomerStatusCopy = (
  booking: MailBooking,
  settings: MailSettings
): {
  subject: string;
  eyebrow: string;
  title: string;
  intro: string;
  highlight: string;
  footer: string;
  portalLabel: string;
} => {
  const appointmentLabel = getAppointmentLabel(booking);

  switch (booking.status) {
    case "approved":
      return {
        subject: `${settings.companyName}: din booking er godkendt`,
        eyebrow: "Booking godkendt",
        title: "Din booking er godkendt",
        intro: `Vi har nu godkendt din booking for ${appointmentLabel}.`,
        highlight:
          "Din tid er reserveret. Har du brug for at justere adresse eller kontaktoplysninger, kan du gore det fra kundeportalen.",
        footer:
          "Tak for at booke hos os. Svar gerne pa mailen, hvis der er noget, vi skal vide inden besoeg.",
        portalLabel: "Se din booking",
      };
    case "completed":
      return {
        subject: `${settings.companyName}: din booking er afsluttet`,
        eyebrow: "Booking afsluttet",
        title: "Tak for din booking",
        intro: `Din booking for ${appointmentLabel} er nu afsluttet.`,
        highlight:
          "Tak fordi du valgte WashMax. Du kan altid finde forlobet igen i kundeportalen og booke en ny tid derfra.",
        footer:
          "Hvis du vil have en ny tid eller har feedback, er du altid velkommen til at kontakte os.",
        portalLabel: "Se bookinghistorik",
      };
    case "cancelled":
      return {
        subject: `${settings.companyName}: din booking er annulleret`,
        eyebrow: "Booking annulleret",
        title: "Din booking er annulleret",
        intro: `Din booking for ${appointmentLabel} er blevet annulleret.`,
        highlight:
          "Hvis du gerne vil have en ny tid, kan du booke igen fra kundeportalen eller skrive til os, saa finder vi en ny aftale.",
        footer:
          "Vi hjaelper gerne med at finde en ny tid, hvis annulleringen skal aendres til en ombooking.",
        portalLabel: "Aabn kundeportal",
      };
    default:
      return {
        subject: `${settings.companyName}: booking afventer godkendelse`,
        eyebrow: "Booking afventer",
        title: "Din booking afventer godkendelse",
        intro: `Vi er i gang med at behandle din booking for ${appointmentLabel}.`,
        highlight:
          "Du faar en ny mail, saa snart bookingen er godkendt eller hvis vi mangler noget fra dig.",
        footer:
          "Du kan bruge kundeportalen til at holde overblik over status og dine kontaktoplysninger.",
        portalLabel: "Aabn kundeportal",
      };
  }
};

const sendLoggedMailDetailed = async (message: LoggedMessage): Promise<LoggedMailResult> => {
  const transporter = getTransporter();

  if (!transporter) {
    await recordEmailLog({
      bookingId: message.bookingId,
      customerId: message.customerId,
      recipient: message.recipient,
      recipientRole: message.recipientRole,
      templateKey: message.templateKey,
      subject: message.subject,
      status: "not_configured",
      errorMessage: "SMTP is not configured.",
    });
    return { status: "not_configured" };
  }

  const config = getMailConfig();

  try {
    const info = await transporter.sendMail({
      from: config.from,
      to: message.recipient,
      subject: message.subject,
      html: message.html,
      text: message.text,
      attachments: message.attachments,
    });
    const messageId =
      typeof info.messageId === "string" ? info.messageId : String(info.messageId || "");

    await recordEmailLog({
      bookingId: message.bookingId,
      customerId: message.customerId,
      recipient: message.recipient,
      recipientRole: message.recipientRole,
      templateKey: message.templateKey,
      subject: message.subject,
      status: "sent",
      sentAt: new Date().toISOString(),
    });
    return { status: "sent", messageId };
  } catch (error) {
    await recordEmailLog({
      bookingId: message.bookingId,
      customerId: message.customerId,
      recipient: message.recipient,
      recipientRole: message.recipientRole,
      templateKey: message.templateKey,
      subject: message.subject,
      status: "failed",
      errorMessage: error instanceof Error ? error.message : "Unknown mail error.",
    });
    throw error;
  }
};

const sendLoggedMail = async (message: LoggedMessage) =>
  (await sendLoggedMailDetailed(message)).status;

export const sendCustomerBookingCreatedEmail = async (input: CustomerMailInput) => {
  const copy = getCustomerCreationCopy(input.booking, input.settings);
  const customerName = getCustomerName(input.customer);

  return sendLoggedMail({
    bookingId: input.booking.id,
    customerId: input.customer.id,
    recipient: input.customer.email,
    recipientRole: "customer",
    templateKey:
      input.booking.status === "approved" ? "customer_created_approved" : "customer_created_pending",
    subject: copy.subject,
    html: renderCustomerEmailHtml({
      ...copy,
      booking: input.booking,
      customer: input.customer,
      settings: input.settings,
      portalUrl: input.portalUrl,
      intro: customerName ? `Hej ${customerName}. ${copy.intro}` : copy.intro,
    }),
    text: renderCustomerEmailText({
      ...copy,
      booking: input.booking,
      customer: input.customer,
      settings: input.settings,
      portalUrl: input.portalUrl,
      intro: customerName ? `Hej ${customerName}. ${copy.intro}` : copy.intro,
    }),
  });
};

export const sendCustomerBookingStatusEmail = async (input: CustomerMailInput) => {
  const copy = getCustomerStatusCopy(input.booking, input.settings);
  const customerName = getCustomerName(input.customer);

  await sendLoggedMail({
    bookingId: input.booking.id,
    customerId: input.customer.id,
    recipient: input.customer.email,
    recipientRole: "customer",
    templateKey: `customer_status_${input.booking.status}`,
    subject: copy.subject,
    html: renderCustomerEmailHtml({
      ...copy,
      booking: input.booking,
      customer: input.customer,
      settings: input.settings,
      portalUrl: input.portalUrl,
      intro: customerName ? `Hej ${customerName}. ${copy.intro}` : copy.intro,
    }),
    text: renderCustomerEmailText({
      ...copy,
      booking: input.booking,
      customer: input.customer,
      settings: input.settings,
      portalUrl: input.portalUrl,
      intro: customerName ? `Hej ${customerName}. ${copy.intro}` : copy.intro,
    }),
  });
};

export const sendAdminNewBookingAlert = async (input: {
  booking: MailBooking;
  customer: MailCustomer;
  settings: MailSettings;
  portalUrl: string;
}) => {
  const appointmentLabel = getAppointmentLabel(input.booking);
  const customerName = getCustomerName(input.customer);
  const config = getMailConfig();
  const adminEmail =
    input.settings.adminNotifyEmail || process.env.BOOKING_ADMIN_EMAIL || config.user;

  await sendLoggedMail({
    bookingId: input.booking.id,
    customerId: input.customer.id,
    recipient: adminEmail,
    recipientRole: "admin",
    templateKey: "admin_new_booking",
    subject: `${input.settings.companyName}: ny booking ${input.booking.registrationNumber}`,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;color:#16303a;line-height:1.6;max-width:640px;">
        <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#2388d1;">Ny booking</p>
        <h2 style="margin:0 0 12px;font-size:28px;line-height:1.2;">Ny booking modtaget</h2>
        <p style="margin:0;color:#36505d;"><strong>${escapeHtml(
          customerName || input.customer.email
        )}</strong> har lavet en booking fra websitet.</p>
        ${renderPortalButton(input.portalUrl, "Aabn kundeportal")}
        ${renderRows([
          ["Status", getStatusLabel(input.booking.status)],
          ["Tid", appointmentLabel],
          ["Kunde", customerName || input.customer.email],
          ["Telefon", input.customer.phone],
          ["Email", input.customer.email],
          ["Adresse", getAddressLine(input.customer)],
          ["Bil", `${input.booking.vehicleName} (${input.booking.registrationNumber})`],
          ["Service", `${input.booking.packageLabel} - ${input.booking.category}`],
          ["Pris", formatPrice(input.booking.total)],
        ])}
        <div style="margin-top:16px;">
          <strong>Tilvalg</strong>
          ${getAddonMarkup(input.booking.addons)}
        </div>
        ${
          input.customer.notes
            ? `<p style="margin-top:16px;"><strong>Bemaerkninger:</strong><br />${escapeHtml(
                input.customer.notes
              )}</p>`
            : ""
        }
      </div>
    `,
    text: [
      "Ny booking modtaget",
      "",
      `Kunde: ${customerName || input.customer.email}`,
      `Status: ${getStatusLabel(input.booking.status)}`,
      `Tid: ${appointmentLabel}`,
      `Telefon: ${input.customer.phone}`,
      `Email: ${input.customer.email}`,
      `Adresse: ${getAddressLine(input.customer)}`,
      `Bil: ${input.booking.vehicleName} (${input.booking.registrationNumber})`,
      `Service: ${input.booking.packageLabel} - ${input.booking.category}`,
      `Pris: ${formatPrice(input.booking.total)}`,
      `Tilvalg: ${getAddonText(input.booking.addons)}`,
      `Kundeportal: ${input.portalUrl}`,
      input.customer.notes ? `Bemaerkninger: ${input.customer.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  });
};

export const sendCustomerInvoiceEmail = async (input: {
  bookingId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  invoiceNumber: string;
  totalInclMomsDkk: number;
  appointmentLabel?: string;
  invoiceUrl: string;
  invoiceHtml?: string;
  invoiceText?: string;
  settings: MailSettings;
}) => {
  const subject = `${input.settings.companyName}: faktura ${input.invoiceNumber}`;
  const total = formatPrice(input.totalInclMomsDkk);
  const greeting = input.customerName ? `Hej ${input.customerName}` : "Hej";

  return sendLoggedMailDetailed({
    bookingId: input.bookingId,
    customerId: input.customerId,
    recipient: input.customerEmail,
    recipientRole: "customer",
    templateKey: "customer_invoice",
    subject,
    html: input.invoiceHtml || `
      <div style="margin:0;background:#edf4f5;padding:28px 14px;font-family:Arial,Helvetica,sans-serif;color:#102d38;line-height:1.6;">
        <div style="max-width:640px;margin:0 auto;overflow:hidden;border-radius:22px;background:#ffffff;box-shadow:0 20px 60px rgba(18,61,82,.12);">
          <div style="padding:30px;background:linear-gradient(135deg,#102d38,#174f61);color:#ffffff;">
            <p style="margin:0 0 8px;font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#a9e8d8;">Faktura klar</p>
            <h1 style="margin:0;font-size:29px;line-height:1.2;">${escapeHtml(subject)}</h1>
          </div>
          <div style="padding:30px;">
            <p style="margin:0 0 18px;color:#36505d;">${escapeHtml(
              `${greeting}. Din faktura er klar og kan åbnes sikkert i browseren.`
            )}</p>
            ${renderRows([
              ["Fakturanummer", input.invoiceNumber],
              ["Booking", input.bookingId],
              ["Tid", input.appointmentLabel || "-"],
              ["Beløb inkl. moms", total],
            ])}
            <p style="margin:24px 0 0;">
              <a href="${escapeHtml(input.invoiceUrl)}" style="display:inline-block;border-radius:999px;background:#12b886;color:#ffffff;padding:13px 22px;text-decoration:none;font-weight:800;">Se og print faktura</a>
            </p>
            <p style="margin:22px 0 0;color:#5b6b75;font-size:13px;">
              Fra fakturasiden kan du vælge Print / Save as PDF. Der er ingen PDF-vedhæftning.
            </p>
            <p style="margin:14px 0 0;color:#5b6b75;font-size:13px;">
              Hvis knappen ikke virker, åbn dette link: ${escapeHtml(input.invoiceUrl)}
            </p>
          </div>
        </div>
      </div>
    `,
    text: input.invoiceText || [
      subject,
      "",
      `${greeting}. Din faktura er klar.`,
      `Fakturanummer: ${input.invoiceNumber}`,
      `Booking: ${input.bookingId}`,
      `Tid: ${input.appointmentLabel || "-"}`,
      `Beløb inkl. moms: ${total}`,
      `Se og print faktura: ${input.invoiceUrl}`,
      "",
      `Support: ${input.settings.supportEmail}`,
    ].join("\n"),
  });
};

export const sendAdminInvoiceNotice = async (input: {
  bookingId: string;
  agentName: string;
  invoiceNumber: string;
  totalInclMomsDkk: number;
  settings: MailSettings;
}) => {
  const config = getMailConfig();
  const adminEmail =
    input.settings.adminNotifyEmail || process.env.BOOKING_ADMIN_EMAIL || config.user;
  const total = formatPrice(input.totalInclMomsDkk);
  const message = `Agent ${input.agentName} generated and sent invoice ${input.invoiceNumber} for booking ${input.bookingId}. Total: ${total}.`;

  return sendLoggedMail({
    bookingId: input.bookingId,
    recipient: adminEmail,
    recipientRole: "admin",
    templateKey: "admin_invoice_sent",
    subject: `${input.settings.companyName}: invoice ${input.invoiceNumber} sent`,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;color:#16303a;line-height:1.6;max-width:640px;">
        <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#2388d1;">Invoice sent</p>
        <h2 style="margin:0 0 12px;font-size:28px;line-height:1.2;">Invoice ${escapeHtml(
          input.invoiceNumber
        )} sent</h2>
        <p style="margin:0;color:#36505d;">${escapeHtml(message)}</p>
      </div>
    `,
    text: message,
  });
};
