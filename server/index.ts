import crypto from 'crypto';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';
import { Webhook } from 'svix';

// Load .env from project root
dotenv.config({ path: path.resolve(fileURLToPath(import.meta.url), '../../.env') });

const app = express();
const PORT = process.env.PROXY_PORT || 3001;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API = 'https://api.groq.com/openai/v1/chat/completions';

// ===== SQLite Database for donations =====
const DB_PATH = path.resolve(fileURLToPath(import.meta.url), '../../donations.db');
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS donations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

// ===== Paystack configuration =====
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_WEBHOOK_SECRET = process.env.PAYSTACK_WEBHOOK_SECRET;
const PAYSTACK_VERIFY_API = 'https://api.paystack.co/transaction/verify';

// ===== Paystack Webhook — MUST be before express.json() to capture raw body =====
app.post('/api/paystack/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  try {
    if (!PAYSTACK_WEBHOOK_SECRET) {
      console.warn('⚠️  PAYSTACK_WEBHOOK_SECRET not configured — webhook signature skipped');
    }

    const signature = req.headers['x-paystack-signature'] as string | undefined;
    if (!signature) {
      console.error('❌ Missing x-paystack-signature header');
      return res.status(401).json({ error: 'Missing signature' });
    }

    const rawBody = req.body as Buffer;
    if (!rawBody || rawBody.length === 0) {
      return res.status(400).json({ error: 'Empty request body' });
    }

    // Verify HMAC-SHA256 signature
    if (PAYSTACK_WEBHOOK_SECRET) {
      const expectedSignature = crypto
        .createHmac('sha256', PAYSTACK_WEBHOOK_SECRET)
        .update(rawBody)
        .digest('hex');

      if (signature !== expectedSignature) {
        console.error('❌ Invalid webhook signature');
        return res.status(401).json({ error: 'Invalid signature' });
      }
    }

    // Parse the JSON body from the buffer
    const event = JSON.parse(rawBody.toString('utf8'));
    const eventType = event.event;

    console.log(`📡 Paystack webhook received: ${eventType}`);

    // Handle charge.success events
    if (eventType === 'charge.success') {
      const data = event.data;
      const reference = data.reference;
      const amount = (data.amount || 0) / 100;
      const currency = data.currency || 'GHS';
      const channel = data.channel || 'card';
      const paidAt = data.paid_at || null;
      const customerEmail = data.customer?.email || 'unknown@paystack.com';
      const customerName = data.customer?.first_name
        ? `${data.customer.first_name} ${data.customer.last_name || ''}`.trim()
        : 'N/A';

      // Extract custom fields from metadata (set by frontend in Donate.tsx)
      const customFields = data.metadata?.custom_fields || [];
      const donorName = customFields.find((f: any) => f.variable_name === 'donor_name')?.value || customerName;
      const donorEmail = customFields.find((f: any) => f.variable_name === 'donor_email')?.value || customerEmail;
      const purpose = customFields.find((f: any) => f.variable_name === 'donation_reason')?.value || 'general';
      const message = customFields.find((f: any) => f.variable_name === 'donation_message')?.value || '';

      // Check for duplicate
      const existing = db.prepare('SELECT id FROM donations WHERE reference = ?').get(reference);
      if (existing) {
        console.log(`⏭️  Donation ${reference} already recorded — skipping`);
        return res.status(200).json({ status: 'duplicate' });
      }

      // Record the donation
      db.prepare(`
        INSERT INTO donations (reference, amount, currency, channel, donor_name, donor_email, purpose, message, paid_at, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'completed')
      `).run(reference, amount, currency, channel, donorName, donorEmail, purpose || 'general', message || '', paidAt);

      console.log(`✅ Donation recorded via webhook: ${reference} — GH₵${amount} from ${donorName}`);
    } else {
      console.log(`ℹ️  Unhandled webhook event type: ${eventType}`);
    }

    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    res.status(200).json({ status: 'error', message: 'Webhook processing error' });
  }
});

// ===== Clerk Webhook — MUST be before express.json() to capture raw body =====
const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

app.post('/api/webhooks/clerk', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    if (!CLERK_WEBHOOK_SECRET) {
      console.warn('⚠️  CLERK_WEBHOOK_SIGNING_SECRET not configured — webhook signature skipped');
      return res.status(500).json({ error: 'Webhook secret not configured' });
    }

    const svixId = req.headers['svix-id'] as string;
    const svixTimestamp = req.headers['svix-timestamp'] as string;
    const svixSignature = req.headers['svix-signature'] as string;

    if (!svixId || !svixTimestamp || !svixSignature) {
      console.error('❌ Missing Svix headers');
      return res.status(401).json({ error: 'Missing Svix headers' });
    }

    const rawBody = req.body as Buffer;
    if (!rawBody || rawBody.length === 0) {
      return res.status(400).json({ error: 'Empty request body' });
    }

    const wh = new Webhook(CLERK_WEBHOOK_SECRET);
    let evt: Record<string, any>;
    try {
      evt = wh.verify(rawBody.toString('utf8'), {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      }) as Record<string, any>;
    } catch (err) {
      console.error('❌ Invalid Clerk webhook signature:', err);
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const eventType = evt.type as string;
    console.log(`📡 Clerk webhook received: ${eventType}`);

    if (eventType === 'user.created') {
      const { id, email_addresses, first_name, last_name } = evt.data || {};
      const email = email_addresses?.[0]?.email_address;
      const name = `${first_name ?? ''} ${last_name ?? ''}`.trim();
      console.log(`👤 New user created: ${name} (${email}) — Clerk ID: ${id}`);
    }

    if (eventType === 'user.updated') {
      const { id, email_addresses, first_name, last_name } = evt.data || {};
      const email = email_addresses?.[0]?.email_address;
      const name = `${first_name ?? ''} ${last_name ?? ''}`.trim();
      console.log(`👤 User updated: ${name} (${email}) — Clerk ID: ${id}`);
    }

    if (eventType === 'user.deleted') {
      const { id } = evt.data || {};
      console.log(`👤 User deleted — Clerk ID: ${id}`);
    }

    if (eventType === 'session.created') {
      console.log(`🔑 Session created for user: ${evt.data?.user_id}`);
    }

    if (eventType === 'session.ended' || eventType === 'session.revoked') {
      console.log(`🔑 Session ${eventType.replace('session.', '')} for user: ${evt.data?.user_id}`);
    }

    if (eventType === 'organization.created') {
      const { id, name } = evt.data || {};
      console.log(`🏢 Organization created: ${name} (${id})`);
    }

    if (eventType === 'organizationMembership.created') {
      const { organization, public_user_data, role } = evt.data || {};
      console.log(`👥 ${public_user_data?.first_name} joined ${organization?.name} as ${role}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('❌ Clerk webhook processing error:', error);
    res.status(200).json({ received: true, error: 'Processing error' });
  }
});

app.use(express.json());

app.post('/api/paystack/verify', async (req, res) => {
  try {
    const { reference } = req.body;

    if (!reference) {
      return res.status(400).json({ verified: false, error: 'Missing transaction reference' });
    }

    if (!PAYSTACK_SECRET_KEY) {
      console.error('PAYSTACK_SECRET_KEY not configured on server');
      return res.status(500).json({ verified: false, error: 'Payment gateway not configured' });
    }

    const response = await fetch(`${PAYSTACK_VERIFY_API}/${encodeURIComponent(reference)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Paystack verification failed:', data);
      return res.status(response.status).json({ verified: false, error: data.message || 'Verification failed' });
    }

    // Check that the transaction was actually successful
    if (data.status && data.data?.status === 'success') {
      const txnData = {
        reference: data.data.reference,
        amount: data.data.amount / 100,
        currency: data.data.currency,
        paidAt: data.data.paid_at,
        channel: data.data.channel,
        customer: {
          email: data.data.customer?.email,
          name: data.data.customer?.first_name
            ? `${data.data.customer.first_name} ${data.data.customer.last_name || ''}`.trim()
            : 'N/A',
        },
      };
      return res.json({ verified: true, transaction: txnData });
    }

    return res.json({ verified: false, error: 'Transaction was not successful' });
  } catch (error) {
    console.error('Paystack verification error:', error);
    return res.status(500).json({ verified: false, error: 'Failed to verify transaction' });
  }
});

// ===== Record verified donation =====
app.post('/api/donations/record', (req, res) => {
  try {
    const { reference, amount, currency, channel, donorName, donorEmail, purpose, message, paidAt } = req.body;

    if (!reference || !donorName || !donorEmail) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existing = db.prepare('SELECT id FROM donations WHERE reference = ?').get(reference);
    if (existing) {
      return res.json({ saved: true, message: 'Donation already recorded' });
    }

    db.prepare(`
      INSERT INTO donations (reference, amount, currency, channel, donor_name, donor_email, purpose, message, paid_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(reference, amount, currency || 'GHS', channel || 'card', donorName, donorEmail, purpose || 'general', message || '', paidAt || null);

    res.json({ saved: true });
  } catch (error) {
    console.error('Error recording donation:', error);
    res.status(500).json({ error: 'Failed to record donation' });
  }
});

// ===== Get donation history by email =====
app.get('/api/donations/history', (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.status(400).json({ error: 'Email parameter is required' });
    }

    const donations = db.prepare(`
      SELECT * FROM donations WHERE donor_email = ? ORDER BY created_at DESC
    `).all(email);

    res.json({ donations });
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ error: 'Failed to fetch donation history' });
  }
});

// ===== Donation stats for the frontend =====
app.get('/api/donations/stats', (_req, res) => {
  try {
    const totalRaised = (db.prepare('SELECT COALESCE(SUM(amount), 0) as total FROM donations').get() as any)?.total || 0;
    const donorCount = (db.prepare('SELECT COUNT(DISTINCT donor_email) as count FROM donations').get() as any)?.count || 0;
    const projectsCount = (db.prepare('SELECT COUNT(DISTINCT purpose) as count FROM donations').get() as any)?.count || 0;
    const monthlyRaised = (db.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total FROM donations
      WHERE strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')
    `).get() as any)?.total || 0;

    const recentDonors = db.prepare(`
      SELECT donor_name as name, amount FROM donations
      ORDER BY created_at DESC LIMIT 10
    `).all();

    res.json({
      totalRaised,
      donorCount,
      projectsFunded: Math.max(projectsCount, 1),
      monthlyRaised,
      monthlyGoal: 50000,
      recentDonors: recentDonors.map((d: any) => ({
        name: d.name,
        amount: Math.round(d.amount),
      })),
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch donation stats' });
  }
});

// ===== Page Visit Tracking for Analytics (simple in-memory) =====
interface PageVisit {
  path: string;
  timestamp: number;
  day: string;
}

const pageVisits: PageVisit[] = [];

// Log page views from the frontend
app.post('/api/analytics/pageview', (req, res) => {
  const { path: pagePath } = req.body;
  if (!pagePath) return res.status(400).json({ error: 'Path required' });
  const now = new Date();
  pageVisits.push({
    path: pagePath,
    timestamp: Date.now(),
    day: now.toISOString().slice(0, 10),
  });
  // Trim old visits (keep last 30 days)
  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  while (pageVisits.length > 0 && pageVisits[0].timestamp < cutoff) {
    pageVisits.shift();
  }
  res.json({ logged: true });
});

// ===== Admin Dashboard Analytics =====
app.get('/api/admin/analytics', (_req, res) => {
  try {
    // Donation stats
    const totalRaised = (db.prepare('SELECT COALESCE(SUM(amount), 0) as total FROM donations').get() as any)?.total || 0;
    const donorCount = (db.prepare('SELECT COUNT(DISTINCT donor_email) as count FROM donations').get() as any)?.count || 0;
    const donationCount = (db.prepare('SELECT COUNT(*) as count FROM donations').get() as any)?.count || 0;
    const monthlyRaised = (db.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total FROM donations
      WHERE strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')
    `).get() as any)?.total || 0;

    // Donations by purpose
    const byPurpose = db.prepare(`
      SELECT purpose, COUNT(*) as count, COALESCE(SUM(amount), 0) as total
      FROM donations
      WHERE status = 'completed'
      GROUP BY purpose
      ORDER BY total DESC
    `).all();

    // Donations by day (last 30 days)
    const byDay = db.prepare(`
      SELECT date(created_at) as day, COALESCE(SUM(amount), 0) as total, COUNT(*) as count
      FROM donations
      WHERE created_at >= date('now', '-30 days')
      GROUP BY date(created_at)
      ORDER BY day ASC
    `).all();

    // Recent donations
    const recentDonations = db.prepare(`
      SELECT donor_name, donor_email, amount, purpose, created_at, channel
      FROM donations
      ORDER BY created_at DESC LIMIT 20
    `).all();

    // Page visit stats
    const today = new Date().toISOString().slice(0, 10);
    const visitsToday = pageVisits.filter(v => v.day === today).length;
    const visitsThisWeek = pageVisits.filter(v => {
      const d = new Date();
      d.setDate(d.getDate() - 7);
      return v.timestamp > d.getTime();
    }).length;

    // Top pages
    const pageCounts: Record<string, number> = {};
    pageVisits.forEach(v => {
      pageCounts[v.path] = (pageCounts[v.path] || 0) + 1;
    });
    const topPages = Object.entries(pageCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Visits by day (last 30 days)
    const visitsByDay: Record<string, number> = {};
    const todayDate = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(todayDate);
      d.setDate(d.getDate() - i);
      const dayKey = d.toISOString().slice(0, 10);
      visitsByDay[dayKey] = 0;
    }
    pageVisits.forEach(v => {
      if (visitsByDay[v.day] !== undefined) {
        visitsByDay[v.day]++;
      }
    });
    const visitsChart = Object.entries(visitsByDay).map(([day, count]) => ({ day, count }));

    // Health info
    const health = {
      groqConfigured: !!GROQ_API_KEY,
      paystackConfigured: !!process.env.PAYSTACK_SECRET_KEY,
      webhookConfigured: !!PAYSTACK_WEBHOOK_SECRET,
    };

    res.json({
      donations: {
        totalRaised: Math.round(totalRaised),
        donorCount,
        donationCount,
        monthlyRaised: Math.round(monthlyRaised),
        monthlyGoal: 50000,
        byPurpose,
        byDay,
        recentDonations,
      },
      traffic: {
        visitsToday,
        visitsThisWeek,
        totalVisits: pageVisits.length,
        topPages,
        visitsByDay: visitsChart,
      },
      health,
    });
  } catch (error) {
    console.error('Admin analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// ===== Health check (updated) =====
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    groqConfigured: !!GROQ_API_KEY,
    paystackConfigured: !!PAYSTACK_SECRET_KEY,
    webhookConfigured: !!PAYSTACK_WEBHOOK_SECRET,
    dbConnected: true,
    donationCount: (db.prepare('SELECT COUNT(*) as count FROM donations').get() as any)?.count || 0,
  });
});

// Proxy endpoint for Groq AI API — the key stays server-side
app.post('/api/nvidia/chat', async (req, res) => {
  try {
    if (!GROQ_API_KEY) {
      console.error('GROQ_API_KEY not configured on server');
      return res.status(500).json({ error: 'API key not configured on server' });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000);

    const response = await fetch(GROQ_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
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
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to proxy request to AI API' });
  }
});

// Serve built static files in production with aggressive caching for assets
if (process.env.NODE_ENV === 'production') {
  const distPath = path.resolve(fileURLToPath(import.meta.url), '../../dist');

  // Static assets with hashed filenames — cache forever
  app.use('/assets', express.static(path.join(distPath, 'assets'), {
    maxAge: '365d',
    immutable: true,
    setHeaders: (res) => {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }));

  // Images — cache for 7 days, revalidate
  app.use('/Images', express.static(path.join(distPath, 'Images'), {
    maxAge: '7d',
    setHeaders: (res) => {
      res.setHeader('Cache-Control', 'public, max-age=604800, must-revalidate');
    }
  }));

  // All other static files
  app.use(express.static(distPath, {
    maxAge: '1h',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      }
    }
  }));

  // Fallback to index.html for client-side routing
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🔒 Proxy server running on http://localhost:${PORT}`);
  if (GROQ_API_KEY) {
    console.log('✅ GROQ_API_KEY is configured (key is kept server-side)');
  } else {
    console.warn('⚠️  WARNING: GROQ_API_KEY is not set. The AI concierge will not work.');
  }
});
