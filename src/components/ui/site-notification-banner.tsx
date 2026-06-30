import { useState, useEffect } from 'react'
import { useQuery } from 'convex/react'
import { motion, AnimatePresence } from 'motion/react'
import { api } from '../../../convex/_generated/api'
import { X, ArrowRight, AlertTriangle, Info, CheckCircle, AlertOctagon } from 'lucide-react'
import { useFeatureFlags } from '../../hooks/useFeatureFlags'

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
  const { isLoading: _nl, ...notifFlags } = useFeatureFlags()
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

  if (!notifFlags.notifications) return null

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
          initial={{ opacity: 0, x: -20, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -20, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300, mass: 0.7 }}
          className="fixed bottom-6 left-6 z-[100] w-full max-w-xs sm:max-w-sm"
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

            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient}`} />

            <div className="p-4 relative">
              <div className="flex items-start gap-3">
                <div className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg shadow-black/10`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-gray-900 leading-snug">{notification.title}</h3>
                    <button
                      onClick={handleDismiss}
                      className="shrink-0 p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
                      aria-label="Dismiss notification"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{notification.message}</p>

                  <div className="flex items-center gap-2 mt-3">
                    {notification.link && (
                      <a
                        href={notification.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all bg-gradient-to-r ${config.gradient} text-white shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]`}
                      >
                        {notification.linkText || 'Learn more'}
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    )}
                    <button
                      onClick={handleDismiss}
                      className={`text-[10px] font-medium text-gray-400 hover:text-gray-600 transition-colors ${notification.link ? '' : 'ml-auto'}`}
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-full pointer-events-none" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
