import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { LogOut, ChevronDown } from 'lucide-react'
import { useFakeAuth } from '../../context/FakeAuthContext'

export default function UserBadge() {
  const { user, signOut } = useFakeAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  if (!user) return null

  const initial = user.email.charAt(0).toUpperCase()

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted hover:text-fg hover:bg-accent/5 transition-all"
      >
        <span className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center text-[10px] font-semibold">
          {initial}
        </span>
        <span className="max-w-[100px] truncate hidden md:inline">{user.email}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute right-0 top-full mt-2 w-52 bg-white/80 backdrop-blur-2xl border border-white/20 rounded-xl py-2 shadow-xl shadow-black/5"
          >
            <div className="px-4 py-2 border-b border-border/40">
              <div className="text-[10px] text-muted uppercase tracking-widest">Signed in as</div>
              <div className="text-xs text-fg font-medium truncate mt-0.5">{user.email}</div>
            </div>
            <button
              onClick={() => { signOut(); setOpen(false) }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-muted hover:text-fg hover:bg-accent/5 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
