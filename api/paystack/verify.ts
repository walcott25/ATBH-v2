import type { VercelRequest, VercelResponse } from '@vercel/node';

const PAYSTACK_VERIFY_API = 'https://api.paystack.co/transaction/verify';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({ verified: false, error: 'Payment gateway not configured' });
  }

  const { reference } = req.body;
  if (!reference) {
    return res.status(400).json({ verified: false, error: 'Missing transaction reference' });
  }

  try {
    const response = await fetch(`${PAYSTACK_VERIFY_API}/${encodeURIComponent(reference)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Paystack verification failed:', data);
      return res.status(response.status).json({ verified: false, error: data.message || 'Verification failed' });
    }

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
  } catch (error: any) {
    console.error('Paystack verification error:', error);
    return res.status(500).json({ verified: false, error: 'Failed to verify transaction' });
  }
}
