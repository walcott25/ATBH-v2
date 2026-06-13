import type { VercelRequest, VercelResponse } from '@vercel/node';

const GROQ_API = 'https://api.groq.com/openai/v1/chat/completions';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server' });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60000);

  try {
    const response = await fetch(GROQ_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const contentType = response.headers.get('content-type') || '';
    let data;
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { error: `Unexpected response (${response.status})`, detail: text.slice(0, 500) };
    }
    return res.status(response.status).json(data);
  } catch (error: any) {
    clearTimeout(timeout);
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Failed to proxy request to AI API' });
  }
}
