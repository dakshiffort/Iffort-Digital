import { Resend } from 'resend';

// Lead-alert handler for the "Book a Meeting" landing page.
// Emails each meeting request to the Iffort team.
const resend = new Resend(process.env.RESEND_API_KEY);

// Where meeting-request alerts are delivered.
const ALERT_RECIPIENTS = ['daksh.sharma@iffort.com', 'lav.singh@iffort.com'];

function isValid(data) {
  return (
    typeof data.name === 'string' && data.name.trim().length > 0 &&
    typeof data.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
    typeof data.message === 'string' && data.message.trim().length > 0 &&
    (data.service === undefined || typeof data.service === 'string') &&
    (data.phone === undefined || typeof data.phone === 'string')
  );
}

function sanitize(input) {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

function emailHTML(data) {
  const submitted = new Date().toLocaleString('en-US', {
    dateStyle: 'full', timeStyle: 'short', timeZone: 'Asia/Dubai'
  });
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background:#f5f5f5;">
  <table role="presentation" style="width:100%;border-collapse:collapse;"><tr><td style="padding:40px 20px;">
    <table role="presentation" style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
      <tr><td style="padding:36px 40px 20px;background:linear-gradient(135deg,#0f172a 0%,#1a2942 100%);border-radius:8px 8px 0 0;">
        <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">New Meeting Request</h1>
        <p style="margin:8px 0 0;color:#e0e0e0;font-size:14px;">From the Book a Meeting landing page</p>
      </td></tr>
      <tr><td style="padding:36px 40px;">
        <div style="margin-bottom:22px;"><div style="font-size:12px;font-weight:600;color:#666;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">Name</div>
          <div style="font-size:16px;color:#333;font-weight:500;">${sanitize(data.name)}</div></div>
        <div style="margin-bottom:22px;"><div style="font-size:12px;font-weight:600;color:#666;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">Email</div>
          <div style="font-size:16px;"><a href="mailto:${sanitize(data.email)}" style="color:#FF2E63;text-decoration:none;">${sanitize(data.email)}</a></div></div>
        ${data.phone ? `<div style="margin-bottom:22px;"><div style="font-size:12px;font-weight:600;color:#666;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">Phone</div>
          <div style="font-size:16px;color:#333;">${sanitize(data.phone)}</div></div>` : ''}
        <div style="margin-bottom:22px;"><div style="font-size:12px;font-weight:600;color:#666;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">Needs help with</div>
          <div style="font-size:16px;color:#333;background:#f8f9fa;padding:12px 16px;border-radius:6px;border-left:4px solid #FF2E63;">${sanitize(data.service || 'Not specified')}</div></div>
        <div style="margin-bottom:8px;"><div style="font-size:12px;font-weight:600;color:#666;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">Details</div>
          <div style="font-size:15px;color:#333;line-height:1.6;background:#f8f9fa;padding:16px;border-radius:6px;white-space:pre-wrap;">${sanitize(data.message)}</div></div>
      </td></tr>
      <tr><td style="padding:18px 40px;background:#f8f9fa;border-radius:0 0 8px 8px;border-top:1px solid #e0e0e0;">
        <p style="margin:0;font-size:13px;color:#666;text-align:center;">Submitted ${submitted} (UAE time)</p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

function emailText(data) {
  return [
    'NEW MEETING REQUEST',
    'From the Book a Meeting landing page',
    '',
    `NAME: ${data.name}`,
    `EMAIL: ${data.email}`,
    data.phone ? `PHONE: ${data.phone}` : null,
    `NEEDS HELP WITH: ${data.service || 'Not specified'}`,
    '',
    'DETAILS:',
    data.message
  ].filter(Boolean).join('\n');
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed', message: 'Only POST requests are accepted' });
  }

  try {
    if (!isValid(req.body)) {
      return res.status(400).json({ error: 'Invalid request', message: 'name, email and message are required' });
    }
    const data = req.body;

    const response = await resend.emails.send({
      from: 'Iffort Meetings <onboarding@resend.dev>',
      to: ALERT_RECIPIENTS,
      replyTo: data.email,
      subject: `New Meeting Request: ${data.service || 'General'} - ${data.name}`,
      html: emailHTML(data),
      text: emailText(data),
    });

    if (response.error) {
      console.error('[send-email] Resend error:', response.error);
      return res.status(500).json({ error: 'Email delivery failed', message: 'Unable to send. Please try again later.' });
    }
    return res.status(200).json({ success: true, message: 'Sent', emailId: response.data?.id });
  } catch (err) {
    console.error('[send-email] Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error', message: 'An unexpected error occurred.' });
  }
}
