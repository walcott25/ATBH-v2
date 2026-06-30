import { useState, useEffect } from 'react'
import { useQuery } from 'convex/react'
import { motion, AnimatePresence } from 'motion/react'
import { api } from '../../../convex/_generated/api'
import { X, ArrowRight, AlertTriangle, Info, CheckCircle, AlertOctagon } from 'lucide-react'

const typeConfig = {
  info: {
    gradient: 'from-blue-500 to-blue-600',
    border: 'border-blue-200',
    bg: 'bg-white',
    text: 'text-blue-800',
    icon: Info,
    glow: 'rgba(59,130,246,0.15)',
  },
  warning: {
    gradient: 'from-amber-500 to-amber-600',
    border: 'border-amber-200',
    bg: 'bg-white',
    text: 'text-amber-800',
    icon: AlertTriangle,
    glow: 'rgba(245,158,11,0.15)',
  },
  success: {
    gradient: 'from-emerald-500 to-emerald-600',
    border: 'border-emerald-200',
    bg: 'bg-white',
    text: 'text-emerald-800',
    icon: CheckCircle,
    glow: 'rgba(16,185,129,0.15)',
  },
  emergency: {
    gradient: 'from-red-500 to-red-600',
    border: 'border-red-200',
    bg: 'bg-white',
    text: 'text-red-800',
    icon: AlertOctagon,
    glow: 'rgba(239,68,68,0.15)',
  },
}

const DISMISSED_KEY = 'atbh_notification_dismissed'

export default function SiteNotificationBanner() {
  const notification = useQuery(api.notifications.getActive)
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem(DISMISSED_KEY) === '1' } catch { return false }
  })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (notification && !dismissed) {
      const timer = setTimeout(() => setVisible(true), 600)
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
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 pt-[20vh]"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320, mass: 0.8 }}
            className="relative w-full max-w-lg"
          >
            <div
              className={`relative rounded-2xl bg-white border shadow-2xl overflow-hidden ${config.border}`}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-50"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${config.glow}, transparent 70%)`,
                }}
              />

              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${config.gradient}`} />

              <div className="p-6 relative">
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg shadow-black/10`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-semibold text-gray-900 leading-snug">{notification.title}</h3>
                      <button
                        onClick={handleDismiss}
                        className="shrink-0 p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
                        aria-label="Dismiss notification"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">{notification.message}</p>

                    {notification.link && (
                      <a
                        href={notification.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-xl text-xs font-semibold transition-all bg-gradient-to-r ${config.gradient} text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]`}
                      >
                        {notification.linkText || 'Learn more'}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <button
                        onClick={handleDismiss}
                        className="w-full py-2 rounded-lg text-xs font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-2 -right-2 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
