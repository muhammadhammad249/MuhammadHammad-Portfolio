import { Request, Response } from 'express';
import { sendContactInquiryEmail } from '../services/emailService';

export async function submitContactInquiry(req: Request, res: Response): Promise<void> {
  try {
    const { firstName, lastName, email, phone, subject, message } = req.body;

    // Basic validation — subject is optional, phone is optional
    if (!firstName || !lastName || !email || !message) {
      res.status(400).json({ success: false, error: 'First name, last name, email, and message are required.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ success: false, error: 'Invalid email address.' });
      return;
    }

    const resolvedSubject = subject || 'General Inquiry';

    await sendContactInquiryEmail({
      firstName,
      lastName,
      email,
      phone: phone || '',
      subject: resolvedSubject,
      message,
    });

    res.status(200).json({
      success: true,
      message: 'Your inquiry has been submitted. We will get back to you within 24–48 hours.',
    });
  } catch (err) {
    console.error('[ContactController] Email send error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to send inquiry: ' + (err instanceof Error ? err.message : String(err)),
    });
  }
}
