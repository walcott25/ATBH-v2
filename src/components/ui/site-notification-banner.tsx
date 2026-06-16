import { useState, useEffect } from 'react'
import { useQuery } from 'convex/react'
import { motion, AnimatePresence } from 'motion/react'
import { api } from '../../../convex/_generated/api'
import { X, ArrowRight, AlertTriangle, Info, CheckCircle, AlertOctagon, Bell } from 'lucide-react'

const typeConfig = {
  info: {
    gradient: 'from-blue-500 to-blue-600',
    border: 'border-blue-200',
    bg: 'bg-white',
    text: 'text-blue-800',
    icon: Info,
  },
  warning: {
    gradient: 'from-amber-500 to-amber-600',
    border: 'border-amber-200',
    bg: 'bg-white',
    text: 'text-amber-800',
    icon: AlertTriangle,
  },
  success: {
    gradient: 'from-emerald-500 to-emerald-600',
    border: 'border-emerald-200',
    bg: 'bg-white',
    text: 'text-emerald-800',
    icon: CheckCircle,
  },
  emergency: {
    gradient: 'from-red-500 to-red-600',
    border: 'border-red-200',
    bg: 'bg-white',
    text: 'text-red-800',
    icon: AlertOctagon,
  },
}

const DISMISSED_KEY = 'atbh_notification_dismissed'

export default function SiteNotificationCard() {
  const notification = useQuery(api.notifications.getActive)
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem(DISMISSED_KEY) === '1' } catch { return false }
  })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (notification && !dismissed) {
      const timer = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(timer)
    }
    setVisible(false)
  }, [notification, dismissed])

  if (!notification) return null

  const config = typeConfig[notification.type] || typeConfig.info
  const Icon = config.icon

  const handleDismiss = () => {
    setDismissed(true)
    setVisible(false)
    try { sessionStorage.setItem(DISMISSED_KEY, '1') } catch {}
  }

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 80, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full"
        >
          <div className={`relative rounded-2xl ${config.bg} border ${config.border} shadow-2xl shadow-black/10 overflow-hidden`}>
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient}`} />
            <div className="p-5">
              <div className="flex items-start gap-4">
                <div className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-semibold text-gray-900">{notification.title}</h4>
                    <button
                      onClick={handleDismiss}
                      className="shrink-0 p-0.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                      aria-label="Dismiss"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{notification.message}</p>
                  {notification.link && (
                    <a
                      href={notification.link}
                      className={`inline-flex items-center gap-1 mt-3 text-xs font-semibold ${config.text} hover:underline`}
                    >
                      {notification.linkText || 'Learn more'} <ArrowRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full pointer-events-none" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
