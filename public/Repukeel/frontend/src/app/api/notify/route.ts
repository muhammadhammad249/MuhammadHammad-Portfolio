import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const FROM_ADDRESS = process.env.SMTP_USER || 'repukeel@gmail.com';
const ADMIN_EMAIL  = process.env.ADMIN_EMAIL || 'repukeel@gmail.com';

function makeTransport() {
  const smtpUser = process.env.SMTP_USER || 'repukeel@gmail.com';
  const smtpPass = (process.env.SMTP_PASS || process.env.SMTP_APP_PASSWORD || "").replace(/\s+/g, "");
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT || 465);

  if (!smtpPass) {
    throw new Error('SMTP_PASS or SMTP_APP_PASSWORD environment variable is not set. Please configure it in Vercel Environment Variables.');
  }

  return nodemailer.createTransport({
    host:   smtpHost,
    port:   smtpPort,
    secure: true,
    auth: {
      user: smtpUser || 'legal@repukeel.com',
      pass: smtpPass,
    },
  });
}

/**
 * POST /api/notify
 * Body: { type: 'new_signup' | 'new_case' | 'reset_password', ...fields }
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type } = body;
    const transporter = makeTransport();

    if (type === 'new_signup') {
      const { name, email, phone } = body;

      // Notify admin
      await transporter.sendMail({
        from: FROM_ADDRESS,
        to:   ADMIN_EMAIL,
        subject: `New Client Signup — ${name}`,
        html: `
          <h2>New client registered on RepuKeel</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone / WhatsApp:</b> ${phone || 'Not provided'}</p>
          <p>View in admin: <a href="https://repukeel.com/dashboard/admin/clients">Clients Directory</a></p>
        `,
      });

      return NextResponse.json({ success: true });
    }

    if (type === 'new_case') {
      const { clientName, clientEmail, caseId, serviceType, contactPreference } = body;

      // Notify admin
      await transporter.sendMail({
        from: FROM_ADDRESS,
        to:   ADMIN_EMAIL,
        replyTo: clientEmail,
        subject: `New Case Submitted — ${caseId}`,
        html: `
          <h2>A new case has been submitted</h2>
          <p><b>Case ID:</b> ${caseId}</p>
          <p><b>Client:</b> ${clientName} (${clientEmail})</p>
          <p><b>Service:</b> ${serviceType}</p>
          <p><b>Preferred Contact:</b> ${contactPreference || 'Not specified'}</p>
          <p>View in admin: <a href="https://repukeel.com/dashboard/admin/cases">Admin Cases</a></p>
        `,
      });

      // Confirm to client
      await transporter.sendMail({
        from: FROM_ADDRESS,
        to:   clientEmail,
        subject: `Your RepuKeel Case ${caseId} Has Been Received`,
        html: `
          <p>Dear ${clientName},</p>
          <p>Thank you for submitting your case to RepuKeel. We have received your inquiry and will be in touch shortly.</p>
          <p><b>Case ID:</b> ${caseId}<br/><b>Service:</b> ${serviceType}</p>
          <p>You can track your case at any time by visiting your <a href="https://repukeel.com/dashboard">client dashboard</a>.</p>
          <p>Best regards,<br/>RepuKeel Legal Team</p>
        `,
      });

      return NextResponse.json({ success: true });
    }

    if (type === 'reset_password') {
      const { email, resetLink } = body;

      await transporter.sendMail({
        from: FROM_ADDRESS,
        to:   email,
        subject: 'Reset Your RepuKeel Password',
        html: `
          <p>You requested a password reset for your RepuKeel account.</p>
          <p><a href="${resetLink}" style="background:#d4af37;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Reset Password</a></p>
          <p>This link expires in 1 hour. If you did not request a reset, you can safely ignore this email.</p>
          <p>RepuKeel Legal Team</p>
        `,
      });

      return NextResponse.json({ success: true });
    }

    if (type === 'contact_form') {
      const { firstName, lastName, email, reason, message } = body;

      await transporter.sendMail({
        from: FROM_ADDRESS,
        to:   ADMIN_EMAIL,
        replyTo: email,
        subject: `New Contact Form Message — ${reason}`,
        html: `
          <h2>New Message from Contact Page</h2>
          <p><b>Name:</b> ${firstName} ${lastName}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Reason for Inquiry:</b> ${reason}</p>
          <p><b>Message:</b><br/>${message}</p>
        `,
      });

      return NextResponse.json({ success: true });
    }

    if (type === 'chatbot_lead') {
      const { name, email, phone, category, contentType, location, volume, description, urgency, contactPreference } = body;

      await transporter.sendMail({
        from: FROM_ADDRESS,
        to:   ADMIN_EMAIL,
        replyTo: email || undefined,
        subject: `New Chatbot Lead — ${name || 'Unknown'} (${category || 'General'})`,
        html: `
          <h2 style="color:#1e3a8a;">New Chatbot Lead Captured</h2>
          <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px;">
            <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Name</td><td style="padding:8px;border:1px solid #e5e7eb;">${name || 'N/A'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Email</td><td style="padding:8px;border:1px solid #e5e7eb;">${email || 'N/A'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Phone</td><td style="padding:8px;border:1px solid #e5e7eb;">${phone || 'N/A'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Issue Category</td><td style="padding:8px;border:1px solid #e5e7eb;">${category || 'N/A'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Content Type</td><td style="padding:8px;border:1px solid #e5e7eb;">${contentType || 'N/A'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Location</td><td style="padding:8px;border:1px solid #e5e7eb;">${location || 'N/A'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Volume</td><td style="padding:8px;border:1px solid #e5e7eb;">${volume || 'N/A'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Urgency</td><td style="padding:8px;border:1px solid #e5e7eb;">${urgency || 'N/A'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Contact Preference</td><td style="padding:8px;border:1px solid #e5e7eb;">${contactPreference || 'N/A'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Description</td><td style="padding:8px;border:1px solid #e5e7eb;">${description || 'N/A'}</td></tr>
          </table>
        `,
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Unknown notification type' }, { status: 400 });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[notify API error]', err);
    // Don't block the user — return success even if email fails
    // so the main action (signup/case create) still proceeds
    return NextResponse.json({ success: true, warning: 'Email delivery failed', detail: message });
  }
}
