import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

// Type definitions for request body
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
}

// Validation helper
function validateFormData(data: any): data is ContactFormData {
  return (
    typeof data.name === 'string' && data.name.trim().length > 0 &&
    typeof data.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
    typeof data.service === 'string' && data.service.trim().length > 0 &&
    typeof data.message === 'string' && data.message.trim().length > 0 &&
    (data.phone === undefined || typeof data.phone === 'string')
  );
}

// Sanitize input to prevent XSS
function sanitize(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Generate email HTML template
function generateEmailHTML(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; background: linear-gradient(135deg, #0A1628 0%, #1a2942 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">New Contact Form Submission</h1>
              <p style="margin: 8px 0 0; color: #e0e0e0; font-size: 14px;">From Iffort Digital Website</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <!-- Name -->
              <div style="margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Name</div>
                <div style="font-size: 16px; color: #333; font-weight: 500;">${sanitize(data.name)}</div>
              </div>

              <!-- Email -->
              <div style="margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Email Address</div>
                <div style="font-size: 16px; color: #333;">
                  <a href="mailto:${sanitize(data.email)}" style="color: #EC4899; text-decoration: none;">${sanitize(data.email)}</a>
                </div>
              </div>

              ${data.phone ? `
              <!-- Phone -->
              <div style="margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Phone Number</div>
                <div style="font-size: 16px; color: #333;">
                  <a href="tel:${sanitize(data.phone)}" style="color: #EC4899; text-decoration: none;">${sanitize(data.phone)}</a>
                </div>
              </div>
              ` : ''}

              <!-- Service -->
              <div style="margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Interested In</div>
                <div style="font-size: 16px; color: #333; background-color: #f8f9fa; padding: 12px 16px; border-radius: 6px; border-left: 4px solid #EC4899;">${sanitize(data.service)}</div>
              </div>

              <!-- Message -->
              <div style="margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Message</div>
                <div style="font-size: 15px; color: #333; line-height: 1.6; background-color: #f8f9fa; padding: 16px; border-radius: 6px; white-space: pre-wrap;">${sanitize(data.message)}</div>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0; font-size: 13px; color: #666; text-align: center;">
                Submitted on ${new Date().toLocaleString('en-US', {
                  dateStyle: 'full',
                  timeStyle: 'short',
                  timeZone: 'Asia/Dubai'
                })} (UAE Time)
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// Generate plain text version
function generateEmailText(data: ContactFormData): string {
  return `
NEW CONTACT FORM SUBMISSION
From Iffort Digital Website

NAME: ${data.name}

EMAIL: ${data.email}

${data.phone ? `PHONE: ${data.phone}\n\n` : ''}
INTERESTED IN: ${data.service}

MESSAGE:
${data.message}

---
Submitted on ${new Date().toLocaleString('en-US', {
  dateStyle: 'full',
  timeStyle: 'short',
  timeZone: 'Asia/Dubai'
})} (UAE Time)
  `.trim();
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Only POST requests are accepted'
    });
  }

  try {
    // Validate request body
    if (!validateFormData(req.body)) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Missing or invalid required fields: name, email, service, and message are required'
      });
    }

    const formData: ContactFormData = req.body;

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: 'Iffort Digital <onboarding@resend.dev>',
      to: ['daksh.sharma@iffort.com'],
      replyTo: formData.email,
      subject: `New Contact Form: ${formData.service} - ${formData.name}`,
      html: generateEmailHTML(formData),
      text: generateEmailText(formData),
    });

    // Check if email was sent successfully
    if (emailResponse.error) {
      console.error('Resend API Error:', emailResponse.error);
      return res.status(500).json({
        error: 'Email delivery failed',
        message: 'Unable to send email. Please try again later.'
      });
    }

    console.log('Email sent successfully:', emailResponse.data?.id);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      emailId: emailResponse.data?.id
    });

  } catch (error) {
    console.error('Unexpected error:', error);

    return res.status(500).json({
      error: 'Internal server error',
      message: 'An unexpected error occurred. Please try again later.'
    });
  }
}
