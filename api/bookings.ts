import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { itemName, itemType, name, email, phone, date, guests, notes } = req.body
  if (!itemName || !name || !email || !date) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const payload = {
      itemName,
      itemType,
      name,
      email,
      phone: phone || '',
      date,
      guests: guests || 1,
      notes: notes || '',
      createdAt: new Date().toISOString(),
    }

    if (process.env.BOOKING_WEBHOOK_URL) {
      await fetch(process.env.BOOKING_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {})
    }

    console.log('Booking received:', payload)
    res.json({ success: true })
  } catch (error) {
    console.error('Booking error:', error)
    res.status(500).json({ error: 'Failed to process booking' })
  }
}
