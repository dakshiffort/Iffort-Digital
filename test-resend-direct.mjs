import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env.local') });

const resend = new Resend(process.env.RESEND_API_KEY);

console.log('\n========================================');
console.log('Direct Resend API Test');
console.log('========================================\n');

console.log('API Key:', process.env.RESEND_API_KEY?.substring(0, 10) + '...');
console.log('');

async function testDirectResend() {
  try {
    console.log('Sending test email via Resend SDK...\n');

    const emailData = {
      from: 'Iffort Digital <onboarding@resend.dev>',
      to: ['daksh.sharma@iffort.com'],
      replyTo: 'test@example.com',
      subject: 'Direct API Test - ' + new Date().toISOString(),
      html: '<strong>This is a direct API test!</strong><p>If you received this, the Resend integration is working.</p>',
      text: 'This is a direct API test! If you received this, the Resend integration is working.'
    };

    console.log('Email payload:', JSON.stringify(emailData, null, 2));
    console.log('');

    const response = await resend.emails.send(emailData);

    console.log('Response from Resend:');
    console.log(JSON.stringify(response, null, 2));
    console.log('');

    if (response.error) {
      console.log('✗ FAILED: Resend returned an error');
      console.error('Error details:', response.error);
      process.exit(1);
    } else {
      console.log('✓ SUCCESS: Email sent!');
      console.log('Email ID:', response.data?.id);
      process.exit(0);
    }
  } catch (error) {
    console.log('✗ FAILED: Exception thrown');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

testDirectResend();
