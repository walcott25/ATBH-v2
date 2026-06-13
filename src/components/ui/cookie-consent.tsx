import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Cookie, X, Shield, FileText } from 'lucide-react'
import { useApp } from '../../context/AppContext'

import { grantAnalyticsConsent } from '../../services/analytics'

const STORAGE_KEY = 'atbh_cookie_consent'

type ConsentLevel = 'accepted' | 'essential' | null

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentLevel>(null)
  const [showDetails, setShowDetails] = useState(false)
  const { setIsPrivacyOpen, setIsTermsOpen } = useApp()

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'accepted') {
      setConsent('accepted')
      grantAnalyticsConsent()
    } else if (stored === 'essential') {
      setConsent('essential')
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setConsent('accepted')
    grantAnalyticsConsent()
  }

  const handleEssentialOnly = () => {
    localStorage.setItem(STORAGE_KEY, 'essential')
    setConsent('essential')
  }

  const isVisible = consent === null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
          className="fixed bottom-0 left-0 right-0 z-[300] p-4 md:p-6 pointer-events-none"
        >
          <div className="max-w-5xl mx-auto pointer-events-auto">
            <div
              role="alert"
              aria-label="Cookie consent"
              className="relative bg-fg/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl md:rounded-3xl shadow-2xl shadow-black/40 overflow-hidden"
            >
              {/* Gold accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

              <div className="p-5 md:p-8">
                <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                  {/* Icon */}
                  <div className="hidden md:flex w-12 h-12 rounded-xl bg-accent/10 items-center justify-center shrink-0 ring-1 ring-accent/20">
                    <Cookie className="w-6 h-6 text-accent" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base md:text-lg font-medium text-white tracking-tight">
                          We value your privacy
                        </h3>
                        <p className="text-white/50 text-sm leading-relaxed mt-1.5 max-w-2xl">
                          We use cookies and similar technologies to enhance your browsing experience,
                          analyze site traffic, and deliver personalized content. You can choose which
                          cookies to accept.
                        </p>
                      </div>
                      <button
                        onClick={handleEssentialOnly}
                        className="flex shrink-0 w-8 h-8 rounded-full border border-white/10 items-center justify-center hover:bg-white/5 transition-colors text-white/30 hover:text-white/60"
                        aria-label="Dismiss"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Expandable details */}
                    <AnimatePresence>
                      {showDetails && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 pb-2 space-y-3">
                            <div className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                              <div>
                                <p className="text-white/80 text-sm font-semibold">Essential Cookies</p>
                                <p className="text-white/40 text-xs leading-relaxed mt-0.5">
                                  Required for basic platform functionality — authentication, session
                                  management, and security. These cannot be disabled.
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                              <div>
                                <p className="text-white/80 text-sm font-semibold">Analytics Cookies</p>
                                <p className="text-white/40 text-xs leading-relaxed mt-0.5">
                                  Help us understand how visitors interact with our site so we can
                                  improve your experience. We use anonymized, aggregated data only.
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                              <div>
                                <p className="text-white/80 text-sm font-semibold">Functional Cookies</p>
                                <p className="text-white/40 text-xs leading-relaxed mt-0.5">
                                  Enable enhanced features like remembering your preferences, language
                                  settings, and personalized recommendations.
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-5">
                      <button
                        onClick={handleAcceptAll}
                        className="px-6 py-2.5 bg-accent text-accent-fg text-[10px] font-bold uppercase tracking-[0.25em] rounded-full hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30"
                      >
                        Accept All
                      </button>
                      <button
                        onClick={handleEssentialOnly}
                        className="px-6 py-2.5 border border-white/[0.12] text-white/70 text-[10px] font-bold uppercase tracking-[0.25em] rounded-full hover:bg-white/5 hover:text-white transition-all"
                      >
                        Essential Only
                      </button>
                      <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="text-white/40 hover:text-accent text-[10px] font-bold uppercase tracking-[0.2em] transition-colors px-2"
                      >
                        {showDetails ? 'Show Less' : 'Learn More'}
                      </button>
                    </div>

                    {/* Legal links */}
                    <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/[0.06]">
                      <button
                        onClick={() => setIsPrivacyOpen(true)}
                        className="flex items-center gap-1.5 text-white/30 hover:text-accent text-[9px] font-bold uppercase tracking-[0.2em] transition-colors"
                      >
                        <Shield className="w-3 h-3" />
                        Privacy Policy
                      </button>
                      <button
                        onClick={() => setIsTermsOpen(true)}
                        className="flex items-center gap-1.5 text-white/30 hover:text-accent text-[9px] font-bold uppercase tracking-[0.2em] transition-colors"
                      >
                        <FileText className="w-3 h-3" />
                        Terms of Service
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
