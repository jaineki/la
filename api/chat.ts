import type { VercelRequest, VercelResponse } from '@vercel/node';

const EXTERNAL_API_URL = 'https://pasayloakomego.onrender.com/api/toolbot';

interface ExternalApiResponse {
  response?: string;
  reply?: string;
  operator?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const upstream = await fetch(
      `${EXTERNAL_API_URL}?query=${encodeURIComponent(userQuery)}`,
      { signal: controller.signal },
    );
    clearTimeout(timeout);

    if (!upstream.ok) {
      throw new Error(`External API responded with status ${upstream.status}`);
    }

    const data = (await upstream.json()) as ExternalApiResponse;

    res.status(200).json({
      status: true,
      response:  data.response ?? data.reply ?? "I couldn't process that request.",
      operator:  data.operator ?? 'JayBohol',
      system:    'SELOV-Portfolio',
      timestamp: new Date().toISOString(),
    });

  } catch (error: unknown) {
    clearTimeout(timeout);

    const isTimeout = error instanceof Error && error.name === 'AbortError';
    const message   = isTimeout ? 'Request timed out' : (error instanceof Error ? error.message : 'Unknown error');

    console.error('Proxy Error:', message);

    res.status(500).json({
      status: false,
      error: message,
      response: isTimeout
        ? 'The AI is waking up, please try again in a few seconds.'
        : "Sorry, I'm having trouble connecting right now. Please try again.",
    });
  }
}
