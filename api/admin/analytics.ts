import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

  if (!connectionString) {
    return res.json({
      donations: {
        totalRaised: 0,
        donorCount: 0,
        donationCount: 0,
        monthlyRaised: 0,
        monthlyGoal: 50000,
        byDay: [],
        recentDonations: [],
      },
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
    const monthlyResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as total, COUNT(*) as count FROM donations
      WHERE status = 'completed' AND created_at >= date_trunc('month', CURRENT_TIMESTAMP)
    `;
    const monthlyDonors = await sql`
      SELECT COUNT(DISTINCT donor_email) as count FROM donations
      WHERE status = 'completed' AND created_at >= date_trunc('month', CURRENT_TIMESTAMP)
    `;
    const byDay = await sql`
      SELECT DATE(created_at) as day, COALESCE(SUM(amount), 0) as total, COUNT(*) as count FROM donations
      WHERE status = 'completed' AND created_at >= CURRENT_TIMESTAMP - INTERVAL '30 days'
      GROUP BY DATE(created_at) ORDER BY day ASC
    `;
    const byPurpose = await sql`
      SELECT COALESCE(NULLIF(purpose, ''), 'General') as purpose, COALESCE(SUM(amount), 0) as total, COUNT(*) as count FROM donations
      WHERE status = 'completed'
      GROUP BY purpose ORDER BY total DESC LIMIT 8
    `;
    const recent = await sql`
      SELECT donor_name, amount, purpose, donor_email, created_at FROM donations
      WHERE status = 'completed' ORDER BY created_at DESC LIMIT 10
    `;
    const prevMonth = await sql`
      SELECT COALESCE(SUM(amount), 0) as total FROM donations
      WHERE status = 'completed' AND created_at >= date_trunc('month', CURRENT_TIMESTAMP - INTERVAL '1 month')
        AND created_at < date_trunc('month', CURRENT_TIMESTAMP)
    `;

    return res.json({
      donations: {
        totalRaised: totalResult[0]?.total || 0,
        donorCount: donorResult[0]?.count || 0,
        donationCount: totalResult[0]?.count || 0,
        monthlyRaised: monthlyResult[0]?.total || 0,
        monthlyDonations: monthlyResult[0]?.count || 0,
        monthlyDonors: monthlyDonors[0]?.count || 0,
        monthlyGoal: 50000,
        prevMonthRaised: prevMonth[0]?.total || 0,
        byDay: byDay.map((r: any) => ({
          day: r.day ? r.day.toString().split('T')[0] : '',
          total: r.total || 0,
          count: r.count || 0,
        })),
        byPurpose: byPurpose.map((r: any) => ({
          purpose: r.purpose || 'General',
          total: r.total || 0,
          count: r.count || 0,
        })),
        recentDonations: recent.map((r: any) => ({
          donor_name: r.donor_name,
          donor_email: r.donor_email,
          amount: r.amount,
          purpose: r.purpose || 'General',
          created_at: r.created_at ? r.created_at.toString() : '',
        })),
      },
    });
  } catch (error: any) {
    console.error('Error fetching analytics:', error);
    return res.json({
      donations: {
        totalRaised: 0,
        donorCount: 0,
        donationCount: 0,
        monthlyRaised: 0,
        monthlyDonations: 0,
        monthlyDonors: 0,
        monthlyGoal: 50000,
        prevMonthRaised: 0,
        byDay: [],
        byPurpose: [],
        recentDonations: [],
      },
    });
  }
}
