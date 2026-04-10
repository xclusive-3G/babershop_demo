// src/services/emailService.js
const nodemailer = require("nodemailer");

let _transport = null;

function getTransport() {
  if (_transport) return _transport;
  _transport = nodemailer.createTransport({
    host:   process.env.SMTP_HOST || "smtp.gmail.com",
    port:   parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return _transport;
}

const FROM = process.env.EMAIL_FROM || '"Chop Shop" <noreply@chopshopbarbershop.com>';

// ─── HTML email shell ─────────────────────────────────────────────────────────
function wrap(body) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;background:#f4f4f4;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#111010;border-radius:8px;overflow:hidden;max-width:560px;">
  <tr><td style="background:#ef4444;padding:24px 36px;text-align:center;">
    <h1 style="color:#fff;font-size:26px;font-weight:900;letter-spacing:4px;margin:0;text-transform:uppercase;">
      CHOP SHOP<sup style="font-size:10px;color:rgba(255,255,255,.6);letter-spacing:2px;">®</sup>
    </h1>
    <p style="color:rgba(255,255,255,.7);font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:4px 0 0;">Men's Haircuts &amp; Grooming</p>
  </td></tr>
  <tr><td style="padding:36px;color:#f9f5f0;">${body}</td></tr>
  <tr><td style="padding:20px 36px;border-top:1px solid rgba(255,255,255,.07);text-align:center;">
    <p style="color:rgba(249,245,240,.3);font-size:11px;margin:0;">
      142 King Street, Downtown &nbsp;·&nbsp; +1 (555) 123-4567<br/>
      <a href="mailto:cuts@chopshopbarbershop.com" style="color:rgba(249,245,240,.3);">cuts@chopshopbarbershop.com</a>
    </p>
    <p style="color:rgba(249,245,240,.15);font-size:10px;margin:6px 0 0;">© ${new Date().getFullYear()} Chop Shop Barbershop</p>
  </td></tr>
</table>
</td></tr></table></body></html>`;
}

// table row helper
function tr(label, value) {
  return `<tr>
    <td style="padding:9px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(249,245,240,.4);font-weight:bold;">${label}</td>
    <td style="padding:9px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:13px;font-weight:600;color:#f9f5f0;text-align:right;">${value}</td>
  </tr>`;
}

// ─── Booking confirmation to customer ─────────────────────────────────────────
async function sendConfirmation(booking) {
  const { firstName, email, reference, service, barber, bookingDate, bookingTime, price } = booking;

  const fmtDate = new Date(bookingDate + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });

  const body = `
    <p style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#ef4444;margin:0 0 6px;">Booking Confirmed</p>
    <h2 style="font-size:26px;font-weight:900;margin:0 0 22px;color:#f9f5f0;">You're all set, ${firstName}! 🎉</h2>
    <p style="color:rgba(249,245,240,.65);line-height:1.7;margin:0 0 28px;font-size:14px;">
      Your appointment at Chop Shop has been confirmed. We're looking forward to seeing you.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      ${tr("Reference", `<span style="color:#ef4444;font-weight:900;">${reference}</span>`)}
      ${tr("Service",   service)}
      ${tr("Barber",    barber === "No Preference" ? "First Available" : barber)}
      ${tr("Date",      fmtDate)}
      ${tr("Time",      bookingTime)}
      ${tr("Price",     `<span style="color:#ef4444;">${price}</span>`)}
    </table>
    <div style="text-align:center;margin:28px 0;">
      <p style="color:rgba(249,245,240,.4);font-size:11px;letter-spacing:2px;text-transform:uppercase;margin-bottom:14px;">Need to make changes?</p>
      <a href="mailto:cuts@chopshopbarbershop.com?subject=Change Booking ${reference}"
         style="background:#ef4444;color:#fff;padding:12px 30px;text-decoration:none;font-weight:700;font-size:11px;letter-spacing:2px;text-transform:uppercase;display:inline-block;border-radius:2px;">
        CONTACT US
      </a>
    </div>
    <p style="color:rgba(249,245,240,.3);font-size:11px;line-height:1.6;border-top:1px solid rgba(255,255,255,.08);padding-top:20px;margin:0;">
      📍 142 King Street, Downtown &nbsp;·&nbsp; 🅿️ Free parking behind the building<br/>
      Please cancel at least 2 hours in advance if your plans change.
    </p>`;

  return _send({ to: email, subject: `Booking Confirmed — ${reference} | Chop Shop`, html: wrap(body) });
}

// ─── Admin notification ───────────────────────────────────────────────────────
async function sendAdminNotification(booking) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
  if (!adminEmail) return;

  const body = `
    <p style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#ef4444;margin:0 0 6px;">New Booking</p>
    <h2 style="font-size:24px;font-weight:900;margin:0 0 22px;color:#f9f5f0;">New appointment received</h2>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${tr("Reference", booking.reference)}
      ${tr("Customer",  `${booking.firstName} ${booking.lastName}`)}
      ${tr("Email",     booking.email)}
      ${tr("Phone",     booking.phone || "—")}
      ${tr("Service",   booking.service)}
      ${tr("Barber",    booking.barber || "No Preference")}
      ${tr("Date",      booking.bookingDate)}
      ${tr("Time",      booking.bookingTime)}
      ${tr("Price",     booking.price)}
      ${booking.notes ? tr("Notes", booking.notes) : ""}
    </table>`;

  return _send({
    to:      adminEmail,
    subject: `📋 New Booking: ${booking.reference} — ${booking.firstName} ${booking.lastName}`,
    html:    wrap(body),
  });
}

// ─── Cancellation email ───────────────────────────────────────────────────────
async function sendCancellation(booking) {
  const body = `
    <p style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:rgba(249,245,240,.5);margin:0 0 6px;">Booking Cancelled</p>
    <h2 style="font-size:24px;font-weight:900;margin:0 0 22px;color:#f9f5f0;">Your appointment has been cancelled</h2>
    <p style="color:rgba(249,245,240,.65);line-height:1.7;margin:0 0 22px;font-size:14px;">
      Hi ${booking.firstName}, your appointment <strong style="color:#f9f5f0;">${booking.reference}</strong> on 
      <strong style="color:#f9f5f0;">${booking.bookingDate}</strong> at 
      <strong style="color:#f9f5f0;">${booking.bookingTime}</strong> has been cancelled.
    </p>
    <div style="text-align:center;margin:28px 0;">
      <a href="${process.env.FRONTEND_URL || "http://localhost:3000"}"
         style="background:#ef4444;color:#fff;padding:12px 30px;text-decoration:none;font-weight:700;font-size:11px;letter-spacing:2px;text-transform:uppercase;display:inline-block;">
        BOOK AGAIN
      </a>
    </div>`;

  return _send({
    to:      booking.email,
    subject: `Booking Cancelled — ${booking.reference} | Chop Shop`,
    html:    wrap(body),
  });
}

// ─── Internal send helper ─────────────────────────────────────────────────────
async function _send({ to, subject, html }) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log(`[Email] (no SMTP configured) Would send to: ${to} | ${subject}`);
    return;
  }
  try {
    const info = await getTransport().sendMail({ from: FROM, to, subject, html });
    console.log(`[Email] ✅ Sent to ${to} — ${info.messageId}`);
  } catch (err) {
    console.error(`[Email] ❌ Failed: ${err.message}`);
    // Don't throw — email failure should never break the booking flow
  }
}

module.exports = { sendConfirmation, sendAdminNotification, sendCancellation };
