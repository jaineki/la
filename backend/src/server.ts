// server.ts — TypeScript Express backend (converted from server.js)

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import path from 'path';

// ── Types ──────────────────────────────────────────────────────

interface ExternalApiResponse {
  response?: string;
  reply?: string;
  operator?: string;
  [key: string]: unknown;
}

interface ChatSuccessResponse {
  status: true;
  response: string;
  operator: string;
  system: string;
  timestamp: string;
}

interface ChatErrorResponse {
  status: false;
  error: string;
  response?: string;
}

interface HealthResponse {
  status: 'healthy';
  timestamp: string;
  uptime: number;
}

// ── App setup ──────────────────────────────────────────────────

const app = express();
const PORT: number = parseInt(process.env['PORT'] ?? '3000', 10);
const EXTERNAL_API_URL = 'https://pasayloakomego.onrender.com/api/toolbot';

// ── Middleware ─────────────────────────────────────────────────

app.use(
  helmet({
    contentSecurityPolicy: false, // allows your frontend styles/scripts
  }),
);

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',      // Vite dev server
      'http://127.0.0.1:3000',
      'https://yourdomain.onrender.com',
      'https://yourdomain.vercel.app',
    ],
    credentials: true,
  }),
);

app.use(express.json());

// Rate limiting — 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { status: false, error: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// Serve frontend static files (built by Vite → dist/)
app.use(express.static(path.join(__dirname, '..', '..', 'dist')));

// ── Routes ─────────────────────────────────────────────────────

/**
 * GET /api/chat?query=<message>
 * Proxies the query to the external AI API securely.
 */
app.get(
  '/api/chat',
  async (req: Request, res: Response<ChatSuccessResponse | ChatErrorResponse>): Promise<void> => {
    const userQuery = (req.query['query'] as string | undefined)
                   ?? (req.query['q'] as string | undefined)
                   ?? '';

    if (!userQuery.trim()) {
      res.status(400).json({
        status: false,
        error: 'Missing query parameter. Example: /api/chat?query=Hello',
      });
      return;
    }

    try {
      const upstream = await fetch(
        `${EXTERNAL_API_URL}?query=${encodeURIComponent(userQuery)}`,
      );

      if (!upstream.ok) {
        throw new Error(`External API responded with status ${upstream.status}`);
      }

      const data = (await upstream.json()) as ExternalApiResponse;

      const response: ChatSuccessResponse = {
        status: true,
        response:  data.response ?? data.reply ?? "I couldn't process that request.",
        operator:  (data.operator as string | undefined) ?? 'JayBohol',
        system:    'SELOV-Portfolio',
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (err: unknown) {
  removeTyping();
  const msg = err instanceof Error ? err.message : 'Unknown error';
  appendBubble(`⚠️ ${msg}`, false);
    }

      res.status(500).json({
        status: false,
        error: 'AI service temporarily unavailable',
        response: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
      });
    }
  },
);

/**
 * GET /api/health
 * Health-check endpoint used by the frontend and monitoring services.
 */
app.get('/api/health', (_req: Request, res: Response<HealthResponse>): void => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

/**
 * GET * — SPA fallback: serves index.html for client-side routing
 */
app.get('*', (_req: Request, res: Response, next: NextFunction): void => {
  const indexPath = path.join(__dirname, '..', '..', 'dist', 'index.html');
  res.sendFile(indexPath, err => {
    if (err) next(err);
  });
});

// ── Start ──────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║   🔒 SELOV SECURE BACKEND (TS)         ║
  ╠════════════════════════════════════════╣
  ║   Local:   http://localhost:${PORT}      ║
  ║   Chat:    /api/chat?query=hi          ║
  ║   Health:  /api/health                 ║
  ╚════════════════════════════════════════╝
  `);
});

export default app;
