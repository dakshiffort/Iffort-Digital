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

          // Log incoming API request details
          console.log('[Dev Server] Received API request:', {
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.url,
            bodyKeys: Object.keys(req.body),
            bodyPreview: req.body ? {
              name: req.body.name?.substring(0, 20) + (req.body.name?.length > 20 ? '...' : ''),
              email: req.body.email,
              service: req.body.service,
              hasPhone: !!req.body.phone,
              messageLength: req.body.message?.length
            } : 'empty'
          });

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

    // Proxy other requests to Vite (try common ports: 5173, 3000, 3001)
    // Vite tries 5173 first, then auto-increments if ports are in use
    const tryProxyToVite = (portList) => {
      if (portList.length === 0) {
        res.statusCode = 503;
        res.end('Vite development server is not available. Please ensure it is running.');
        return;
      }

      const currentPort = portList[0];
      const remainingPorts = portList.slice(1);

      const options = {
        hostname: 'localhost',
        port: currentPort,
        path: req.url,
        method: req.method,
        headers: req.headers
      };

      const proxyReq = http.request(options, (proxyRes) => {
        console.log('[Dev Server] Successfully proxied to Vite on port', currentPort);
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res);
      });

      proxyReq.on('error', (error) => {
        console.log('[Dev Server] Vite not responding on port', currentPort, '- trying next port...');
        if (remainingPorts.length > 0) {
          tryProxyToVite(remainingPorts);
        } else {
          res.statusCode = 503;
          res.end('Vite development server is not available.');
        }
      });

      req.pipe(proxyReq);
    };

    // Try ports in order: 5173 (default), 3000 (common fallback), 3001
    tryProxyToVite([5173, 3000, 3001]);
  });

  proxyServer.listen(3002, () => {
    console.log('\n✓ Local dev server with API support running at http://localhost:3002');
    console.log('✓ Frontend: http://localhost:3002 (proxied from Vite)');
    console.log('✓ API endpoint: http://localhost:3002/api/send-email\n');
  });

  proxyServer.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error('Port 3002 is already in use. Trying port 3003...');
      proxyServer.listen(3003, () => {
        console.log('\n✓ Local dev server with API support running at http://localhost:3003');
        console.log('✓ Frontend: http://localhost:3003 (proxied from Vite)');
        console.log('✓ API endpoint: http://localhost:3003/api/send-email\n');
      });
    }
  });
}, 5000);

process.on('SIGINT', () => {
  viteProcess.kill();
  process.exit(0);
});
