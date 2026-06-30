import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Mail, ArrowRight } from 'lucide-react'
import { useFakeAuth } from '../../context/FakeAuthContext'

interface FakeSignInProps {
  open: boolean
  onClose?: () => void
  required?: boolean
}

export default function FakeSignIn({ open, onClose, required }: FakeSignInProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const { signIn } = useFakeAuth()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    const trimmed = email.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address')
      return
    }
    signIn(trimmed)
    setEmail('')
    onClose?.()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={required ? undefined : onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8"
          >
            {!required && onClose && (
              <button onClick={onClose} className="absolute top-4 right-4 text-muted hover:text-fg transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}

            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-lg font-semibold text-fg">Welcome</h2>
              <p className="text-xs text-muted mt-1 max-w-[220px]">{required ? 'Enter your email to explore Asuogyaman.' : 'Enter your email to continue. No password needed.'}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="auth-email" className="text-[10px] uppercase tracking-widest font-semibold text-muted block mb-1.5">Email address</label>
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError('') }}
                  placeholder="you@example.com"
                  autoComplete="off"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border bg-bg text-fg placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                />
                {error && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-accent text-accent-fg rounded-xl text-sm font-medium hover:bg-accent/90 transition-all"
              >
                Continue <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <p className="text-[10px] text-muted/60 text-center mt-4">
              No data is collected or stored. This is a demo sign-in.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
