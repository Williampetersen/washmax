import nodemailer from "nodemailer";
import {
  formatDateTimeLabel,
  formatPrice,
  getStatusLabel,
  type BookingStatus,
} from "@/lib/shared/booking";

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
};

type MailCustomer = {
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

const getAddonMarkup = (addons: MailBooking["addons"]) => {
  if (addons.length === 0) {
    return '<p style="margin:0;color:#5b6b75;">Ingen tilvalg</p>';
  }

  return `<ul style="margin:0;padding-left:18px;color:#16303a;">${addons
    .map((item) => `<li>${item.label} (${formatPrice(item.price)})</li>`)
    .join("")}</ul>`;
};

export const sendBookingConfirmationEmails = async (input: {
  booking: MailBooking;
  customer: MailCustomer;
  settings: MailSettings;
  portalUrl: string;
}) => {
  const transporter = getTransporter();
  if (!transporter) return;

  const config = getMailConfig();
  const appointmentLabel = formatDateTimeLabel(
    input.booking.appointmentDate,
    input.booking.appointmentTime
  );
  const customerName = [input.customer.firstName, input.customer.lastName]
    .filter(Boolean)
    .join(" ");
  const adminEmail =
    input.settings.adminNotifyEmail || process.env.BOOKING_ADMIN_EMAIL || config.user;

  const customerHtml = `
    <div style="font-family:Inter,Arial,sans-serif;color:#16303a;line-height:1.6;">
      <h2 style="margin:0 0 12px;">Tak for din booking hos ${input.settings.companyName}</h2>
      <p>Hej ${customerName || "kunde"},</p>
      <p>Vi har modtaget din booking og sender dig videre til dit kundeoverblik her:</p>
      <p><a href="${input.portalUrl}" style="display:inline-block;background:#55b9df;color:#fff;text-decoration:none;padding:12px 18px;border-radius:12px;font-weight:700;">Aabn din kundeportal</a></p>
      <table style="border-collapse:collapse;width:100%;margin-top:18px;">
        <tr><td style="padding:8px 0;font-weight:700;">Bil</td><td>${input.booking.vehicleName}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700;">Regnr.</td><td>${input.booking.registrationNumber}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700;">Pakke</td><td>${input.booking.packageLabel} - ${input.booking.category}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700;">Tid</td><td>${appointmentLabel}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700;">Adresse</td><td>${input.customer.address}, ${input.customer.postalCode} ${input.customer.city}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700;">Total</td><td>${formatPrice(input.booking.total)}</td></tr>
      </table>
      <div style="margin-top:16px;">
        <strong>Tilvalg</strong>
        ${getAddonMarkup(input.booking.addons)}
      </div>
      <p style="margin-top:20px;">Hvis noget skal aendres, kan du svare direkte pa denne mail eller kontakte os pa ${input.settings.supportEmail}.</p>
    </div>
  `;

  const customerText = [
    `Tak for din booking hos ${input.settings.companyName}`,
    "",
    `Bil: ${input.booking.vehicleName}`,
    `Regnr.: ${input.booking.registrationNumber}`,
    `Pakke: ${input.booking.packageLabel} - ${input.booking.category}`,
    `Tid: ${appointmentLabel}`,
    `Adresse: ${input.customer.address}, ${input.customer.postalCode} ${input.customer.city}`,
    `Total: ${formatPrice(input.booking.total)}`,
    `Kundeportal: ${input.portalUrl}`,
  ].join("\n");

  const adminHtml = `
    <div style="font-family:Inter,Arial,sans-serif;color:#16303a;line-height:1.6;">
      <h2 style="margin:0 0 12px;">Ny booking modtaget</h2>
      <p><strong>${customerName || input.customer.email}</strong> har lavet en booking.</p>
      <table style="border-collapse:collapse;width:100%;margin-top:18px;">
        <tr><td style="padding:8px 0;font-weight:700;">Status</td><td>${getStatusLabel(input.booking.status)}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700;">Tid</td><td>${appointmentLabel}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700;">Telefon</td><td>${input.customer.phone}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700;">Email</td><td>${input.customer.email}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700;">Adresse</td><td>${input.customer.address}, ${input.customer.postalCode} ${input.customer.city}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700;">Bil</td><td>${input.booking.vehicleName} (${input.booking.registrationNumber})</td></tr>
        <tr><td style="padding:8px 0;font-weight:700;">Service</td><td>${input.booking.packageLabel} - ${input.booking.category}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700;">Pris</td><td>${formatPrice(input.booking.total)}</td></tr>
      </table>
      <div style="margin-top:16px;">
        <strong>Tilvalg</strong>
        ${getAddonMarkup(input.booking.addons)}
      </div>
      ${
        input.customer.notes
          ? `<p style="margin-top:16px;"><strong>Bemaerkninger:</strong><br />${input.customer.notes}</p>`
          : ""
      }
    </div>
  `;

  const adminText = [
    "Ny booking modtaget",
    "",
    `Kunde: ${customerName || input.customer.email}`,
    `Status: ${getStatusLabel(input.booking.status)}`,
    `Tid: ${appointmentLabel}`,
    `Telefon: ${input.customer.phone}`,
    `Email: ${input.customer.email}`,
    `Adresse: ${input.customer.address}, ${input.customer.postalCode} ${input.customer.city}`,
    `Bil: ${input.booking.vehicleName} (${input.booking.registrationNumber})`,
    `Service: ${input.booking.packageLabel} - ${input.booking.category}`,
    `Pris: ${formatPrice(input.booking.total)}`,
  ].join("\n");

  await Promise.all([
    transporter.sendMail({
      from: config.from,
      to: input.customer.email,
      subject: `${input.settings.companyName}: booking modtaget`,
      html: customerHtml,
      text: customerText,
    }),
    transporter.sendMail({
      from: config.from,
      to: adminEmail,
      subject: `${input.settings.companyName}: ny booking ${input.booking.registrationNumber}`,
      html: adminHtml,
      text: adminText,
    }),
  ]);
};

export const sendBookingStatusEmail = async (input: {
  booking: MailBooking;
  customer: MailCustomer;
  settings: MailSettings;
}) => {
  const transporter = getTransporter();
  if (!transporter) return;

  const config = getMailConfig();
  const appointmentLabel = formatDateTimeLabel(
    input.booking.appointmentDate,
    input.booking.appointmentTime
  );

  await transporter.sendMail({
    from: config.from,
    to: input.customer.email,
    subject: `${input.settings.companyName}: din booking er ${getStatusLabel(input.booking.status).toLowerCase()}`,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;color:#16303a;line-height:1.6;">
        <h2 style="margin:0 0 12px;">Opdatering pa din booking</h2>
        <p>Din booking for ${appointmentLabel} er nu markeret som <strong>${getStatusLabel(
          input.booking.status
        )}</strong>.</p>
        <p>Service: ${input.booking.packageLabel} - ${input.booking.category}</p>
        <p>Regnr.: ${input.booking.registrationNumber}</p>
      </div>
    `,
    text: `Din booking for ${appointmentLabel} er nu ${getStatusLabel(
      input.booking.status
    ).toLowerCase()}.`,
  });
};
