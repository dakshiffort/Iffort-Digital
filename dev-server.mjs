import http from 'http';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '.env.local') });

// Start Vite dev server in a separate process
const viteProcess = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  cwd: __dirname,
  env: { ...process.env }
});

// Give Vite time to start (5 seconds)
setTimeout(() => {
  // Create a simple API proxy server on port 3002
  const proxyServer = http.createServer(async (req, res) => {
    if (req.url.startsWith('/api/send-email')) {
      // Forward to the actual handler
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', async () => {
        try {
          // Require the CommonJS handler
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
      return;
    }

    // Proxy other requests to Vite on port 5173
    const options = {
      hostname: 'localhost',
      port: 5173,
      path: req.url,
      method: req.method,
      headers: req.headers
    };

    const proxyReq = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });

    req.pipe(proxyReq);

    proxyReq.on('error', () => {
      res.statusCode = 503;
      res.end('Service unavailable');
    });
  });

  proxyServer.listen(3002, () => {
    console.log('\n✓ Local dev server with API support running at http://localhost:3002');
    console.log('✓ Frontend: http://localhost:3002 (proxied from Vite)');
    console.log('✓ API endpoint: http://localhost:3002/api/send-email\n');
  });

  proxyServer.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error('Port 3002 is already in use. Please close the existing process or use a different port.');
      process.exit(1);
    }
  });
}, 5000);

process.on('SIGINT', () => {
  viteProcess.kill();
  process.exit(0);
});
