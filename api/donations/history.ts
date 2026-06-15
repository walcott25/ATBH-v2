import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';
import { createClerkClient } from '@clerk/backend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  /* Require authenticated Clerk session */
  const sessionId = req.headers['x-clerk-session-id'] as string | undefined;
  if (!sessionId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  const clerkSecretKey = process.env.CLERK_SECRET_KEY;
  if (!clerkSecretKey) {
    return res.status(500).json({ error: 'Auth not configured' });
  }
  const clerk = createClerkClient({ secretKey: clerkSecretKey });
  let session;
  try {
    session = await clerk.sessions.getSession(sessionId);
    if (!session || session.status !== 'active') {
      return res.status(403).json({ error: 'Invalid or expired session' });
    }
  } catch {
    return res.status(401).json({ error: 'Authentication failed' });
  }

  const userId = session.userId;
  const user = await clerk.users.getUser(userId);
  const userEmail = user.emailAddresses?.[0]?.emailAddress;
  if (!userEmail) {
    return res.status(400).json({ error: 'User has no email on file' });
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
      FROM donations WHERE donor_email = ${userEmail} ORDER BY created_at DESC
    `;

    return res.json({ donations: rows });
  } catch (error: any) {
    console.error('Error fetching donations:', error);
    return res.status(500).json({ error: 'Failed to fetch donation history' });
  }
}