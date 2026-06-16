import type { VercelRequest, VercelResponse } from '@vercel/node'

const webpush = require('web-push')

const VAPID_PUBLIC_KEY = 'BDXcAAlmufYcxjhFmktmjnLjo_XnJXwwXmEZnoMB01M5ME-W2oFsawk2RiWK472sX4jzG4WpRedI2KLJW2TYSlA'
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || 'AAB4r8hlV1xWY0Alk_roKiSVik7HSRtS6IXJwFcUlDg'

webpush.setVapidDetails('mailto:admin@asougyaman.com', VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY)

let subscriptions: any[] = []

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { endpoint, keys } = req.body
    if (!endpoint || !keys) return res.status(400).json({ error: 'Missing subscription' })

    const sub = { endpoint, keys }
    subscriptions = subscriptions.filter(s => s.endpoint !== endpoint)
    subscriptions.push(sub)

    try {
      await webpush.sendNotification(sub, JSON.stringify({
        title: 'Notifications Enabled',
        body: 'You will now receive updates from Asuogyaman Tourism Hub',
        url: '/',
      }))
    } catch {}

    return res.json({ success: true })
  }

  if (req.method === 'DELETE') {
    const { endpoint } = req.body
    subscriptions = subscriptions.filter(s => s.endpoint !== endpoint)
    return res.json({ success: true })
  }

  if (req.method === 'GET' && req.url?.includes('test')) {
    if (subscriptions.length === 0) return res.status(404).json({ error: 'No subscribers' })
    const results = await Promise.allSettled(
      subscriptions.map(sub =>
        webpush.sendNotification(sub, JSON.stringify({
          title: 'Test Notification',
          body: 'Your push notifications are working!',
          url: '/',
        })).catch(() => {})
      )
    )
    return res.json({ sent: results.filter(r => r.status === 'fulfilled').length })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
