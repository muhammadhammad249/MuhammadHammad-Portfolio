import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });

async function testEmail() {
  console.log('SMTP_HOST:', process.env.SMTP_HOST);
  console.log('SMTP_PORT:', process.env.SMTP_PORT);
  console.log('SMTP_USER:', process.env.SMTP_USER);
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER || 'Legal@Repukeel.com',
      to: 'legal@repukeel.com',
      subject: 'Test Email from Local Environment',
      html: '<p>This is a test email to verify SMTP configuration.</p>'
    });
    console.log('Email sent successfully!', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

testEmail();
