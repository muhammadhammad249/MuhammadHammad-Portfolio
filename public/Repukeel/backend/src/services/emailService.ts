import nodemailer from 'nodemailer';
import { env } from '../config/env';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export interface ContactEmailPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function sendPasswordResetEmail(email: string, firstName: string, resetUrl: string): Promise<void> {
  await transporter.sendMail({
    from: `"RepuKeel" <${env.SMTP_USER}>`,
    to: email,
    subject: 'Reset your RepuKeel password',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:32px;color:#172033">
        <h1 style="color:#2563eb">Password reset</h1>
        <p>Hi ${firstName},</p>
        <p>We received a request to reset your password. Click below to choose a new password. This link expires in one hour.</p>
        <p style="margin:28px 0"><a href="${resetUrl}" style="background:#2563eb;color:#fff;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:bold">Reset Password</a></p>
        <p>If you did not request this, you can safely ignore this email.</p>
      </div>`,
  });
}

export async function sendContactInquiryEmail(data: ContactEmailPayload): Promise<void> {
  const { firstName, lastName, email, phone, subject, message } = data;

  const adminMailOptions = {
    from: `"RepuKeel Contact" <${env.SMTP_USER}>`,
    to: env.ADMIN_EMAIL,
    subject: `📩 New Inquiry: ${subject} — from ${firstName} ${lastName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; border-radius: 8px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #0c1526, #1a2e55); padding: 32px 28px; text-align: center;">
          <img src="https://repukeel.com/logo.jpg" alt="RepuKeel" style="height: 44px; margin-bottom: 12px;" />
          <h1 style="color: #e0ac2f; font-size: 22px; margin: 0;">New Contact Inquiry</h1>
          <p style="color: #a9b3c9; font-size: 13px; margin: 8px 0 0;">Received via RepuKeel Website</p>
        </div>

        <div style="padding: 28px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; width: 35%;">
                <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">From</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 15px; color: #111;">
                ${firstName} ${lastName}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 15px; color: #111;">
                <a href="mailto:${email}" style="color: #3b6fe0;">${email}</a>
              </td>
            </tr>
${phone ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Phone</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 15px; color: #111;">
                ${phone}
              </td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Subject</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 15px; color: #111;">
                ${subject}
              </td>
            </tr>
          </table>

          <div style="margin-top: 24px;">
            <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Message</strong>
            <div style="margin-top: 10px; padding: 16px; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 15px; color: #374151; line-height: 1.7; white-space: pre-wrap;">${message}</div>
          </div>

          <div style="margin-top: 28px; text-align: center;">
            <a href="mailto:${email}" style="display: inline-block; background: #e0ac2f; color: #12100a; font-weight: 700; font-size: 14px; padding: 12px 28px; border-radius: 6px; text-decoration: none;">
              Reply to ${firstName}
            </a>
          </div>
        </div>

        <div style="background: #f3f4f6; padding: 16px 28px; text-align: center; font-size: 12px; color: #9ca3af;">
          &copy; ${new Date().getFullYear()} RepuKeel. All rights reserved.
        </div>
      </div>
    `,
  };

  // Auto-reply to the person who submitted
  const autoReplyOptions = {
    from: `"RepuKeel" <${env.SMTP_USER}>`,
    to: email,
    subject: `✅ We received your inquiry — RepuKeel`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; border-radius: 8px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #0c1526, #1a2e55); padding: 32px 28px; text-align: center;">
          <h1 style="color: #e0ac2f; font-size: 22px; margin: 0;">Thank you, ${firstName}!</h1>
          <p style="color: #a9b3c9; font-size: 13px; margin: 8px 0 0;">We've received your inquiry.</p>
        </div>
        <div style="padding: 28px; font-size: 15px; color: #374151; line-height: 1.7;">
          <p>Hi <strong>${firstName}</strong>,</p>
          <p>We have received your inquiry regarding <strong>"${subject}"</strong> and our team will review it immediately.</p>
          <p>You can expect a response from us within <strong>24–48 hours</strong>. For urgent matters, please call us directly:</p>
          <p style="text-align: center; margin: 24px 0;">
            <a href="tel:+923353126688" style="display: inline-block; background: #e0ac2f; color: #12100a; font-weight: 700; font-size: 14px; padding: 12px 28px; border-radius: 6px; text-decoration: none;">
              📞 +92 335 3126688
            </a>
          </p>
          <p style="color: #9ca3af; font-size: 13px;">— The RepuKeel Team</p>
        </div>
        <div style="background: #f3f4f6; padding: 16px 28px; text-align: center; font-size: 12px; color: #9ca3af;">
          &copy; ${new Date().getFullYear()} RepuKeel. All rights reserved.
        </div>
      </div>
    `,
  };

  await transporter.sendMail(adminMailOptions);
  await transporter.sendMail(autoReplyOptions);
}
