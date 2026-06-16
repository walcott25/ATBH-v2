import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) {
    return res.json({
      totalRaised: 0,
      donorCount: 0,
      projectsFunded: 0,
      recentDonors: [],
    });
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

    const totalResult = await sql`SELECT COALESCE(SUM(amount), 0) as total, COUNT(*) as count FROM donations WHERE status = 'completed'`;
    const donorResult = await sql`SELECT COUNT(DISTINCT donor_email) as count FROM donations WHERE status = 'completed'`;
    const purposesResult = await sql`SELECT COUNT(DISTINCT purpose) as count FROM donations WHERE status = 'completed' AND purpose != '' AND purpose != 'general'`;
    const recentResult = await sql`
      SELECT donor_name, amount, purpose, created_at FROM donations
      WHERE status = 'completed' ORDER BY created_at DESC LIMIT 10
    `;

    const totalRaised = totalResult[0]?.total || 0;
    const donorCount = donorResult[0]?.count || 0;
    const projectsFunded = Math.max(1, purposesResult[0]?.count || 0);

    const recentDonors = recentResult.map((r: any) => {
      const createdAt = r.created_at ? new Date(r.created_at) : new Date();
      const diffMs = Date.now() - createdAt.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);
      let time: string;
      if (diffMins < 1) time = 'Just now';
      else if (diffMins < 60) time = `${diffMins}m ago`;
      else if (diffHours < 24) time = `${diffHours}h ago`;
      else if (diffDays < 7) time = `${diffDays}d ago`;
      else time = createdAt.toLocaleDateString();

      return {
        name: r.donor_name,
        amount: r.amount || 0,
        purpose: r.purpose || 'General',
        time,
      };
    });

    return res.json({
      totalRaised,
      donorCount,
      projectsFunded,
      recentDonors,
    });
  } catch (error: any) {
    console.error('Error fetching donation stats:', error);
    return res.json({
      totalRaised: 0,
      donorCount: 0,
      projectsFunded: 0,
      recentDonors: [],
    });
  }
}
