import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';
import crypto from 'crypto';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  /* Verify Paystack webhook signature */
  const paystackSignature = req.headers['x-paystack-signature'] as string | undefined;
  const webhookSecret = process.env.PAYSTACK_WEBHOOK_SECRET;
  if (webhookSecret) {
    if (!paystackSignature) {
      return res.status(401).json({ error: 'Missing Paystack signature' });
    }
    const payload = JSON.stringify(req.body);
    const expected = crypto.createHmac('sha512', webhookSecret).update(payload).digest('hex');
    if (paystackSignature !== expected) {
      return res.status(403).json({ error: 'Invalid signature' });
    }
  }

  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) {
    return res.status(500).json({ error: 'Database not configured' });
  }
  const sql = neon(connectionString);

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS donations (
        id SERIAL PRIMARY KEY,
        reference TEXT UNIQUE NOT NULL,
        amount REAL NOT NULL,
        currency TEXT NOT NULL DEFAULT 'GHS',
        channel TEXT,
        donor_name TEXT NOT NULL,
        donor_email TEXT NOT NULL,
        purpose TEXT DEFAULT 'general',
        message TEXT DEFAULT '',
        status TEXT NOT NULL DEFAULT 'completed',
        paid_at TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    const { reference, amount, currency, channel, donorName, donorEmail, purpose, message, paidAt } = req.body;

    if (!reference || !donorName || !donorEmail) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existing = await sql`SELECT id FROM donations WHERE reference = ${reference}`;
    if (existing.length > 0) {
      return res.json({ saved: true, message: 'Donation already recorded' });
    }

    await sql`
      INSERT INTO donations (reference, amount, currency, channel, donor_name, donor_email, purpose, message, paid_at)
      VALUES (${reference}, ${amount}, ${currency || 'GHS'}, ${channel || 'card'}, ${donorName}, ${donorEmail}, ${purpose || 'general'}, ${message || ''}, ${paidAt || null})
    `;

    return res.json({ saved: true });
  } catch (error: any) {
    console.error('Error recording donation:', error);
    return res.status(500).json({ error: 'Failed to record donation' });
  }
}
