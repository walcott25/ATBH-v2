import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.json({
    status: 'ok',
    keyConfigured: !!process.env.OPENROUTER_API_KEY,
    paystackConfigured: !!process.env.PAYSTACK_SECRET_KEY,
    dbConfigured: !!process.env.POSTGRES_URL,
  });
}
