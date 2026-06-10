import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

// Load .env from project root
dotenv.config({ path: path.resolve(fileURLToPath(import.meta.url), '../../.env') });

const app = express();
const PORT = process.env.PROXY_PORT || 3001;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API = 'https://openrouter.ai/api/v1/chat/completions';

app.use(express.json());

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

// ===== Paystack donation verification =====
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_VERIFY_API = 'https://api.paystack.co/transaction/verify';

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

// ===== Health check (updated) =====
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    keyConfigured: !!OPENROUTER_API_KEY,
    paystackConfigured: !!PAYSTACK_SECRET_KEY,
    dbConnected: true,
    donationCount: (db.prepare('SELECT COUNT(*) as count FROM donations').get() as any)?.count || 0,
  });
});

// Proxy endpoint for OpenRouter AI API — the key stays server-side
app.post('/api/nvidia/chat', async (req, res) => {
  try {
    if (!OPENROUTER_API_KEY) {
      console.error('OPENROUTER_API_KEY not configured on server');
      return res.status(500).json({ error: 'API key not configured on server' });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const response = await fetch(OPENROUTER_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://asuogyaman-tourism-hub.com',
        'X-Title': 'Asuogyaman Tourism Hub',
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
  if (OPENROUTER_API_KEY) {
    console.log('✅ OPENROUTER_API_KEY is configured (key is kept server-side)');
  } else {
    console.warn('⚠️  WARNING: OPENROUTER_API_KEY is not set. The AI concierge will not work.');
  }
});
