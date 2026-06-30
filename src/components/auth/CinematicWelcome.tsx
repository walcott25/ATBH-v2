import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface CinematicWelcomeProps {
  email: string
  onComplete: () => void
}

export default function CinematicWelcome({ email, onComplete }: CinematicWelcomeProps) {
  const [phase, setPhase] = useState<'welcome' | 'explore' | 'done'>('welcome')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('explore'), 2600)
    const t2 = setTimeout(() => setPhase('done'), 5200)
    const t3 = setTimeout(onComplete, 6000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  const userName = email.split('@')[0]

  return (
    <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, rgba(197,149,74,0.08) 0%, transparent 60%)'
      }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />
      <div className="absolute inset-0" style={{
        boxShadow: 'inset 0 0 200px rgba(0,0,0,0.5)'
      }} />

      <AnimatePresence mode="wait">
        {phase === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 text-center px-5"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-12 h-0.5 bg-accent/60 mx-auto mb-8"
            />
            <h1 className="font-['Playfair_Display_SC'],serif text-4xl sm:text-5xl md:text-7xl text-white font-semibold tracking-wide">
              Welcome to<br />
              <span className="text-accent">Asuogyaman</span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-12 h-0.5 bg-accent/60 mx-auto mt-8"
            />
          </motion.div>
        )}

        {phase === 'explore' && (
          <motion.div
            key="explore"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 text-center px-5"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-12 h-0.5 bg-accent/60 mx-auto mb-8"
            />
            <p className="text-base sm:text-lg md:text-2xl text-white/70 font-light tracking-wide mb-4">
              Enjoy your exploration in Asuogyaman
            </p>
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-xs md:text-sm text-accent/80 font-medium tracking-wider"
            >
              {userName}
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-12 h-0.5 bg-accent/60 mx-auto mt-8"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
