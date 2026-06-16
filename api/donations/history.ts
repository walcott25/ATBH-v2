import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const email = req.query.email as string | undefined;
  if (!email) {
    return res.status(400).json({ error: 'Email query parameter is required' });
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

    const rows = await sql`
      SELECT reference, amount, currency, purpose, message, status, paid_at, created_at
      FROM donations WHERE donor_email = ${email} ORDER BY created_at DESC
    `;

    return res.json({ donations: rows });
  } catch (error: any) {
    console.error('Error fetching donations:', error);
    return res.status(500).json({ error: 'Failed to fetch donation history' });
  }
}
