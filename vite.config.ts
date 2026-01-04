import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import apiPlugin from './vite-plugin-api.mjs';

export default defineConfig(({ mode }) => {
    // Load all env vars (not just VITE_ prefixed ones) for the API plugin
    const env = loadEnv(mode, '.', '');
    
    // Make sure RESEND_API_KEY is available in process.env for the API plugin
    // Check both RESEND_API_KEY and VITE_RESEND_API_KEY
    const resendKey = env.RESEND_API_KEY || env.VITE_RESEND_API_KEY;
    if (resendKey) {
      process.env.RESEND_API_KEY = resendKey;
      process.env.VITE_RESEND_API_KEY = resendKey;
    } else {
      console.warn('⚠️  Warning: RESEND_API_KEY or VITE_RESEND_API_KEY not found in environment variables');
    }
    
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), apiPlugin()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
