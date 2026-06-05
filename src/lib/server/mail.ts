import { randomBytes } from "node:crypto";
import nodemailer from "nodemailer";
import {
  formatDateTimeLabel,
  formatPrice,
  getStatusLabel,
  type BookingStatus,
} from "@/lib/shared/booking";
import { recordEmailLog } from "@/lib/server/bookings";
import {
  EnvValidationError,
  getMailFromName,
  getNumberEnv,
  getOptionalEnv,
} from "@/lib/server/env";

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
  replyTo?: string;
  attachments?: nodemailer.SendMailOptions["attachments"];
};

let cachedTransporter: nodemailer.Transporter | null | undefined;
let mailConfigWarningShown = false;

type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  fromName: string;
  fromAddress: string;
  from: string;
  replyTo: string;
  missingVars: string[];
};

const extractEmailAddress = (value: string) => {
  const match = value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match?.[0]?.trim().toLowerCase() || "";
};

const formatFromHeader = (name: string, address: string) =>
  address ? `${name} <${address}>` : "";

const getMailConfig = (): MailConfig => {
  const host = getOptionalEnv("SMTP_HOST") || "";
  const port = getNumberEnv("SMTP_PORT", 587) || 587;
  const secureValue = getOptionalEnv("SMTP_SECURE");
  const secure =
    secureValue === undefined
      ? port === 465
      : ["1", "true", "yes", "on"].includes(secureValue.toLowerCase());
  const user = getOptionalEnv("SMTP_USER") || "";
  const pass = getOptionalEnv("SMTP_PASSWORD") || "";
  const fromName = getMailFromName();
  const fromAddress = extractEmailAddress(getOptionalEnv("MAIL_FROM") || "") || extractEmailAddress(user);
  const replyTo =
    extractEmailAddress(getOptionalEnv("BOOKING_ADMIN_EMAIL") || "") || fromAddress;
  const missingVars = [
    !host ? "SMTP_HOST" : "",
    !getOptionalEnv("SMTP_PORT") ? "SMTP_PORT" : "",
    secureValue === undefined ? "SMTP_SECURE" : "",
    !user ? "SMTP_USER" : "",
    !pass ? "SMTP_PASSWORD" : "",
    !fromAddress ? "MAIL_FROM" : "",
  ].filter(Boolean);

  return {
    host,
    port,
    secure,
    user,
    pass,
    fromName,
    fromAddress,
    from: formatFromHeader(fromName, fromAddress),
    replyTo,
    missingVars,
  };
};

export const isMailConfigured = () => {
  try {
    const config = getMailConfig();
    return config.missingVars.length === 0;
  } catch (error) {
    if (error instanceof EnvValidationError) {
      return false;
    }

    throw error;
  }
};

const getTransporter = () => {
  if (cachedTransporter === undefined) {
    const config = getMailConfig();
    const smtpDomain = config.user.split("@")[1]?.toLowerCase() || "";
    const fromDomain = config.fromAddress.split("@")[1]?.toLowerCase() || "";

    if (
      !mailConfigWarningShown &&
      config.fromAddress &&
      config.user &&
      smtpDomain &&
      fromDomain &&
      smtpDomain !== fromDomain
    ) {
      mailConfigWarningShown = true;
      console.warn(
        `MAIL_FROM (${fromDomain}) does not match SMTP_USER (${smtpDomain}). This can increase spam placement.`
      );
    }

    cachedTransporter = config.missingVars.length === 0
      ? nodemailer.createTransport({
          host: config.host,
          port: config.port,
          secure: config.secure,
          requireTLS: !config.secure,
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
      <p style="margin:0 0 6px;font-weight:700;color:#16303a;">Besked fra Clean Wash</p>
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
      <p style="margin-top:18px;color:#5b6b75;font-size:13px;">
        Du modtager denne mail, fordi du har en booking hos ${escapeHtml(input.settings.companyName)}.
      </p>
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
    lines.push("", `Besked fra Clean Wash: ${input.booking.adminNotes.trim()}`);
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
          "Tak fordi du valgte Clean Wash. Du kan altid finde forlobet igen i kundeportalen og booke en ny tid derfra.",
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

const sendLoggedMail = async (message: LoggedMessage) => {
  let transporter: nodemailer.Transporter | null;
  let config: MailConfig;

  try {
    config = getMailConfig();
    transporter = getTransporter();
  } catch (error) {
    if (!(error instanceof EnvValidationError)) {
      throw error;
    }

    console.error(error.message);
    await recordEmailLog({
      bookingId: message.bookingId,
      customerId: message.customerId,
      recipient: message.recipient,
      recipientRole: message.recipientRole,
      templateKey: message.templateKey,
      subject: message.subject,
      status: "not_configured",
      errorMessage: error.message,
    });
    return "not_configured";
  }

  if (!transporter) {
    const errorMessage = config.missingVars.length
      ? `SMTP is not configured. Missing: ${config.missingVars.join(", ")}.`
      : "SMTP is not configured.";
    console.error(errorMessage);
    await recordEmailLog({
      bookingId: message.bookingId,
      customerId: message.customerId,
      recipient: message.recipient,
      recipientRole: message.recipientRole,
      templateKey: message.templateKey,
      subject: message.subject,
      status: "not_configured",
      errorMessage,
    });
    return "not_configured";
  }

  const messageIdDomain = config.fromAddress.split("@")[1] || "localhost";
  const messageId = `<${message.templateKey}.${randomBytes(12).toString("hex")}@${messageIdDomain}>`;

  try {
    const info = await transporter.sendMail({
      from: {
        name: config.fromName,
        address: config.fromAddress,
      },
      sender: config.fromAddress,
      envelope: {
        from: config.fromAddress,
        to: [message.recipient],
      },
      to: message.recipient,
      replyTo: message.replyTo || config.replyTo,
      subject: message.subject,
      messageId,
      headers: {
        "X-Clean-Wash-Template": message.templateKey,
        "X-Auto-Response-Suppress": "OOF, AutoReply",
      },
      html: message.html,
      text: message.text,
      attachments: message.attachments,
    });

    if (info.rejected.length > 0) {
      throw new Error(`SMTP rejected recipient(s): ${info.rejected.join(", ")}`);
    }

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
    return "sent";
  } catch (error) {
    console.error("Mail delivery failed", {
      recipient: message.recipient,
      templateKey: message.templateKey,
      error: error instanceof Error ? error.message : "Unknown mail error.",
    });
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

export const sendCustomerBookingCreatedEmail = async (input: CustomerMailInput) => {
  const copy = getCustomerCreationCopy(input.booking, input.settings);
  const customerName = getCustomerName(input.customer);

  await sendLoggedMail({
    bookingId: input.booking.id,
    customerId: input.customer.id,
    recipient: input.customer.email,
    recipientRole: "customer",
    templateKey:
      input.booking.status === "approved" ? "customer_created_approved" : "customer_created_pending",
    subject: copy.subject,
    replyTo: input.settings.supportEmail,
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
    replyTo: input.settings.supportEmail,
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
    input.settings.adminNotifyEmail || getOptionalEnv("BOOKING_ADMIN_EMAIL") || config.user;

  await sendLoggedMail({
    bookingId: input.booking.id,
    customerId: input.customer.id,
    recipient: adminEmail,
    recipientRole: "admin",
    templateKey: "admin_new_booking",
    subject: `${input.settings.companyName}: ny booking ${input.booking.registrationNumber}`,
    replyTo: input.settings.supportEmail,
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
  invoiceUrl?: string;
  pdfBuffer?: Buffer;
  settings: MailSettings;
}) => {
  const subject = `${input.settings.companyName}: faktura ${input.invoiceNumber}`;
  const total = formatPrice(input.totalInclMomsDkk);
  const greeting = input.customerName ? `Hej ${input.customerName}` : "Hej";
  const paymentInstructions = "Betaling sker efter aftale med Clean Wash.";

  return sendLoggedMail({
    bookingId: input.bookingId,
    customerId: input.customerId,
    recipient: input.customerEmail,
    recipientRole: "customer",
    templateKey: "customer_invoice",
    subject,
    replyTo: input.settings.supportEmail,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;color:#16303a;line-height:1.6;max-width:640px;">
        <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#2388d1;">Faktura</p>
        <h2 style="margin:0 0 12px;font-size:28px;line-height:1.2;">${escapeHtml(
          subject
        )}</h2>
        <p style="margin:0;color:#36505d;">${escapeHtml(
          `${greeting}. Din faktura for booking ${input.bookingId} er klar.`
        )}</p>
        ${renderRows([
          ["Fakturanummer", input.invoiceNumber],
          ["Booking", input.bookingId],
          ["Tid", input.appointmentLabel || "-"],
          ["Belob", total],
          ["Betaling", paymentInstructions],
        ])}
        ${
          input.invoiceUrl
            ? `<p style="margin-top:16px;"><a href="${escapeHtml(
                input.invoiceUrl
              )}" style="display:inline-block;background:#55b9df;color:#fff;text-decoration:none;padding:12px 18px;border-radius:12px;font-weight:700;">Se faktura online</a></p>`
            : ""
        }
        <p style="margin-top:20px;color:#36505d;">Tak fordi du valgte ${escapeHtml(
          input.settings.companyName
        )}.</p>
        <p style="margin-top:10px;color:#5b6b75;font-size:13px;">
          Du modtager denne mail, fordi du har bedt om en faktura for din booking hos ${escapeHtml(
            input.settings.companyName
          )}.
        </p>
        ${
          input.invoiceUrl
            ? `<p style="margin-top:10px;color:#36505d;">Hvis vedhaeftningen er blokeret i din mailapp, kan du bruge dette link i stedet: ${escapeHtml(
                input.invoiceUrl
              )}</p>`
            : ""
        }
      </div>
    `,
    text: [
      subject,
      "",
      `${greeting}. Din faktura for booking ${input.bookingId} er klar.`,
      `Fakturanummer: ${input.invoiceNumber}`,
      `Booking: ${input.bookingId}`,
      `Tid: ${input.appointmentLabel || "-"}`,
      `Belob: ${total}`,
      `Betaling: ${paymentInstructions}`,
      input.invoiceUrl ? `Se faktura online: ${input.invoiceUrl}` : "",
      "",
      `Support: ${input.settings.supportEmail}`,
    ].join("\n"),
    attachments: input.pdfBuffer
      ? [
          {
            filename: `${input.invoiceNumber}.pdf`,
            content: input.pdfBuffer,
            contentType: "application/pdf",
          },
        ]
      : undefined,
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
    input.settings.adminNotifyEmail || getOptionalEnv("BOOKING_ADMIN_EMAIL") || config.user;
  const total = formatPrice(input.totalInclMomsDkk);
  const message = `Agent ${input.agentName} generated and sent invoice ${input.invoiceNumber} for booking ${input.bookingId}. Total: ${total}.`;

  return sendLoggedMail({
    bookingId: input.bookingId,
    recipient: adminEmail,
    recipientRole: "admin",
    templateKey: "admin_invoice_sent",
    subject: `${input.settings.companyName}: invoice ${input.invoiceNumber} sent`,
    replyTo: input.settings.supportEmail,
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
