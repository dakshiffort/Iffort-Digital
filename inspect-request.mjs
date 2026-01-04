import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Intercept Resend SDK
const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function(id) {
  const module = originalRequire.apply(this, arguments);

  if (id === 'resend') {
    return new Proxy(module, {
      get(target, prop) {
        if (prop === 'Resend') {
          return new Proxy(target[prop], {
            construct(Target, args) {
              const instance = new Target(...args);

              // Wrap emails.send
              const originalSend = instance.emails.send.bind(instance.emails);
              instance.emails.send = async function(data) {
                console.log('\n[INTERCEPTED] Resend.emails.send() called');
                console.log('[INTERCEPTED] Payload being sent to Resend API:');
                console.log(JSON.stringify(data, null, 2));
                console.log('[INTERCEPTED] Payload size:', JSON.stringify(data).length, 'bytes');
                console.log('');

                const result = await originalSend(data);

                console.log('[INTERCEPTED] Resend API response:');
                console.log(JSON.stringify(result, null, 2));
                console.log('');

                return result;
              };

              return instance;
            }
          });
        }
        return target[prop];
      }
    });
  }

  return module;
};

// Now require the handler
const handler = require('./api/send-email.cjs');

// Test data
const testData = {
  name: 'Inspection Test User',
  email: 'inspect@example.com',
  phone: '+1234567890',
  service: 'Performance Marketing',
  message: 'This request is being inspected to verify the exact payload sent to Resend API.'
};

// Create mock request/response
const req = {
  method: 'POST',
  body: testData,
  headers: { 'content-type': 'application/json' }
};

const res = {
  statusCode: 200,
  headers: {},
  setHeader(key, value) { this.headers[key] = value; return this; },
  status(code) { this.statusCode = code; return this; },
  json(data) {
    console.log('[RESPONSE] Status:', this.statusCode);
    console.log('[RESPONSE] Body:', JSON.stringify(data, null, 2));
  },
  end() {}
};

console.log('========================================');
console.log('Request Inspection Tool');
console.log('========================================\n');
console.log('[INPUT] Test form data:');
console.log(JSON.stringify(testData, null, 2));
console.log('');

handler(req, res).catch(error => {
  console.error('[ERROR]', error);
  process.exit(1);
});
