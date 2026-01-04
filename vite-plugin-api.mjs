import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Load environment variables from .env.local and .env
dotenv.config({ path: path.join(__dirname, '.env.local') });
dotenv.config({ path: path.join(__dirname, '.env') });

// Ensure RESEND_API_KEY is available (support both RESEND_API_KEY and VITE_RESEND_API_KEY)
if (process.env.VITE_RESEND_API_KEY && !process.env.RESEND_API_KEY) {
  process.env.RESEND_API_KEY = process.env.VITE_RESEND_API_KEY;
}

export default function apiPlugin() {
  return {
    name: 'api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/send-email', async (req, res, next) => {
        // Only handle POST requests
        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });

        req.on('end', async () => {
          try {
            // Ensure environment variables are loaded and synced before requiring handler
            dotenv.config({ path: path.join(__dirname, '.env.local') });
            dotenv.config({ path: path.join(__dirname, '.env') });
            
            // Sync VITE_RESEND_API_KEY to RESEND_API_KEY if needed
            if (process.env.VITE_RESEND_API_KEY && !process.env.RESEND_API_KEY) {
              process.env.RESEND_API_KEY = process.env.VITE_RESEND_API_KEY;
            }
            
            // Require the CommonJS handler (cache cleared to reload with fresh env vars)
            delete require.cache[path.join(__dirname, 'api/send-email.cjs')];
            const handler = require('./api/send-email.cjs');

            // Prepare request body
            req.body = body ? JSON.parse(body) : {};

            // Add helper methods to response
            const originalSetHeader = res.setHeader.bind(res);
            res.status = function(code) {
              this.statusCode = code;
              return this;
            };
            res.json = function(data) {
              originalSetHeader('Content-Type', 'application/json');
              this.end(JSON.stringify(data));
            };

            // Call handler
            if (typeof handler === 'function') {
              await handler(req, res);
            } else {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Handler not found' }));
            }
          } catch (error) {
            console.error('API Error:', error);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Internal server error', message: error.message }));
          }
        });
      });
    }
  };
}

