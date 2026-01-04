import { createRequire } from 'module';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env.local') });

const handler = require('./api/send-email.cjs');

// Test cases
const testCases = [
  {
    name: 'Valid Complete Request',
    data: {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      service: 'Performance Marketing',
      message: 'This is a test message to verify the email API integration.'
    }
  },
  {
    name: 'Valid Request Without Phone',
    data: {
      name: 'Jane Doe',
      email: 'jane@example.com',
      service: 'Web Development',
      message: 'Testing without phone number field.'
    }
  },
  {
    name: 'XSS Attempt in Name',
    data: {
      name: '<script>alert("XSS")</script>Hacker',
      email: 'hacker@example.com',
      service: 'SEO',
      message: 'Testing XSS sanitization'
    }
  },
  {
    name: 'Missing Required Field (Email)',
    data: {
      name: 'Invalid User',
      service: 'Branding',
      message: 'Missing email field'
    },
    expectError: true
  },
  {
    name: 'Invalid Email Format',
    data: {
      name: 'Bad Email User',
      email: 'not-an-email',
      service: 'Marketing',
      message: 'Testing email validation'
    },
    expectError: true
  },
  {
    name: 'Empty Message',
    data: {
      name: 'Empty Message User',
      email: 'empty@example.com',
      service: 'Consulting',
      message: ''
    },
    expectError: true
  },
  {
    name: 'Long Message',
    data: {
      name: 'Verbose User',
      email: 'verbose@example.com',
      service: 'Strategy',
      message: 'A'.repeat(5000)
    }
  },
  {
    name: 'Special Characters in Message',
    data: {
      name: 'Unicode User',
      email: 'unicode@example.com',
      service: 'Development',
      message: 'Testing émojis 🚀 and spëcial çharacters: <>&"\'\n\nNew lines too!'
    }
  }
];

// Mock request/response objects
function createMockReq(body, method = 'POST') {
  return {
    method,
    body,
    headers: { 'content-type': 'application/json' }
  };
}

function createMockRes() {
  const res = {
    statusCode: 200,
    headers: {},
    responseData: null,
    setHeader(key, value) {
      this.headers[key] = value;
      return this;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.responseData = data;
      this.headers['Content-Type'] = 'application/json';
    },
    end(data) {
      if (data && !this.responseData) {
        this.responseData = data;
      }
    }
  };
  return res;
}

// Run tests
async function runTests() {
  console.log('\n========================================');
  console.log('Resend Email API Test Suite');
  console.log('========================================\n');

  console.log(`Environment Check:`);
  console.log(`- RESEND_API_KEY: ${process.env.RESEND_API_KEY ? '✓ Loaded' : '✗ MISSING'}`);
  if (process.env.RESEND_API_KEY) {
    console.log(`- API Key: ${process.env.RESEND_API_KEY.substring(0, 10)}...`);
  }
  console.log('');

  let passed = 0;
  let failed = 0;

  for (const testCase of testCases) {
    console.log(`\n[TEST] ${testCase.name}`);
    console.log('─'.repeat(50));

    const req = createMockReq(testCase.data);
    const res = createMockRes();

    try {
      await handler(req, res);

      const success = res.statusCode >= 200 && res.statusCode < 300;
      const expectedSuccess = !testCase.expectError;

      if (success === expectedSuccess) {
        console.log(`✓ PASSED`);
        console.log(`  Status: ${res.statusCode}`);
        console.log(`  Response:`, JSON.stringify(res.responseData, null, 2));
        passed++;
      } else {
        console.log(`✗ FAILED`);
        console.log(`  Expected: ${expectedSuccess ? 'success' : 'error'}`);
        console.log(`  Got: Status ${res.statusCode}`);
        console.log(`  Response:`, JSON.stringify(res.responseData, null, 2));
        failed++;
      }
    } catch (error) {
      if (testCase.expectError) {
        console.log(`✓ PASSED (Expected error caught)`);
        console.log(`  Error:`, error.message);
        passed++;
      } else {
        console.log(`✗ FAILED (Unexpected error)`);
        console.log(`  Error:`, error.message);
        console.log(`  Stack:`, error.stack);
        failed++;
      }
    }
  }

  console.log('\n========================================');
  console.log('Test Results');
  console.log('========================================');
  console.log(`Total: ${testCases.length}`);
  console.log(`✓ Passed: ${passed}`);
  console.log(`✗ Failed: ${failed}`);
  console.log('========================================\n');

  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(error => {
  console.error('Fatal test error:', error);
  process.exit(1);
});
