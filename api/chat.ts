// api/chat.ts — Vercel Serverless Function (replaces the Express /api/chat route)
// Vercel auto-routes this to GET /api/chat

import type { VercelRequest, VercelResponse } from '@vercel/node';

const EXTERNAL_API_URL = 'https://pasayloakomego.onrender.com/api/toolbot';

interface ExternalApiResponse {
  response?: string;
  reply?: string;
  operator?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

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

    res.status(200).json({
      status: true,
      response:  data.response ?? data.reply ?? "I couldn't process that request.",
      operator:  data.operator ?? 'JayBohol',
      system:    'SECURED SELOV-API',
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Proxy Error:', message);

    res.status(500).json({
      status: false,
      error: 'AI service temporarily unavailable',
      response: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
    });
  }
}
