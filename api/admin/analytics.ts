import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';
import { createClerkClient } from '@clerk/backend';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  const clerkSecretKey = process.env.CLERK_SECRET_KEY;
  let clerkData = {
    totalUsers: 0,
    newUsersThisMonth: 0,
    totalOrganizations: 0,
    activeSessions: 0,
    recentSignUps: [] as { id: string; email: string; created_at: string }[],
  };

  if (clerkSecretKey) {
    try {
      const clerk = createClerkClient({ secretKey: clerkSecretKey });
      const [users, orgs, sessions] = await Promise.all([
        clerk.users.getUserList({ limit: 500 }),
        clerk.organizations.getOrganizationList({ limit: 100 }),
        clerk.sessions.getSessionList({ limit: 100 }),
      ]);

      const now = new Date();
      const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      clerkData = {
        totalUsers: users.data.length || 0,
        newUsersThisMonth: users.data.filter((u: any) => u.createdAt && new Date(u.createdAt) >= firstOfMonth).length || 0,
        totalOrganizations: orgs.data.length || 0,
        activeSessions: sessions.data.filter((s: any) => s.status === 'active').length || 0,
        recentSignUps: users.data.slice(0, 10).map((u: any) => ({
          id: u.id,
          email: u.emailAddresses?.[0]?.emailAddress || 'no email',
          created_at: u.createdAt,
        })),
      };
    } catch (e) {
      console.error('Clerk fetch error:', e);
    }
  }

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
      clerk: clerkData,
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
      clerk: clerkData,
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
      clerk: clerkData,
    });
  }
}
