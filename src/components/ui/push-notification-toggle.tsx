import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Bell, BellOff } from 'lucide-react'

const VAPID_PUBLIC_KEY = 'BDXcAAlmufYcxjhFmktmjnLjo_XnJXwwXmEZnoMB01M5ME-W2oFsawk2RiWK472sX4jzG4WpRedI2KLJW2TYSlA'

export default function PushNotificationToggle() {
  const [supported, setSupported] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setSupported(true)
      navigator.serviceWorker.ready.then(reg =>
        reg.pushManager.getSubscription().then(sub => setSubscribed(!!sub))
      )
    }
  }, [])

  const toggle = async () => {
    try {
      const reg = await navigator.serviceWorker.ready
      if (subscribed) {
        const sub = await reg.pushManager.getSubscription()
        await sub?.unsubscribe()
        await fetch('/api/push-subscribe', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ endpoint: sub?.endpoint }) })
        setSubscribed(false)
      } else {
        const sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: VAPID_PUBLIC_KEY,
        })
        await fetch('/api/push-subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ endpoint: sub.endpoint, keys: sub.toJSON().keys }) })
        setSubscribed(true)
      }
    } catch {}
  }

  if (!supported) return null

  return (
    <button
      onClick={toggle}
      aria-label={subscribed ? 'Disable notifications' : 'Enable notifications'}
      className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-accent/10 transition-colors relative"
    >
      <AnimatePresence mode="wait">
        {subscribed ? (
          <motion.span
            key="on"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Bell className="w-4 h-4 text-accent" />
          </motion.span>
        ) : (
          <motion.span
            key="off"
            initial={{ scale: 0, rotate: 45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -45 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <BellOff className="w-4 h-4 text-muted" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
