import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';
import crypto from 'crypto';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({ status: 'ok' });
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

  const event = req.body;
  const eventType = event?.event;

  if (eventType !== 'charge.success') {
    return res.json({ status: 'ignored' });
  }

  const data = event.data;
  const reference = data.reference;
  const amount = (data.amount || 0) / 100;
  const currency = data.currency || 'GHS';
  const channel = data.channel || 'card';
  const paidAt = data.paid_at || null;
  const customerEmail = data.customer?.email || '';
  const customerName = data.customer?.first_name
    ? `${data.customer.first_name} ${data.customer.last_name || ''}`.trim()
    : '';

  const customFields = data.metadata?.custom_fields || [];
  const donorName = customFields.find((f: any) => f.variable_name === 'donor_name')?.value || customerName;
  const donorEmail = customFields.find((f: any) => f.variable_name === 'donor_email')?.value || customerEmail;
  const purpose = customFields.find((f: any) => f.variable_name === 'donation_reason')?.value || 'general';
  const message = customFields.find((f: any) => f.variable_name === 'donation_message')?.value || '';

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

    const existing = await sql`SELECT id FROM donations WHERE reference = ${reference}`;
    if (existing.length > 0) {
      return res.json({ status: 'duplicate' });
    }

    await sql`
      INSERT INTO donations (reference, amount, currency, channel, donor_name, donor_email, purpose, message, paid_at)
      VALUES (${reference}, ${amount}, ${currency}, ${channel}, ${donorName}, ${donorEmail}, ${purpose}, ${message}, ${paidAt})
    `;

    return res.json({ status: 'success' });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.json({ status: 'error' });
  }
}
