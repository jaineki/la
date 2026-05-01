// api/health.ts — Vercel Serverless Function for health check

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse): void {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
}
