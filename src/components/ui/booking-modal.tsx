import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Calendar, Users, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import FocusTrap from './FocusTrap'

interface BookingModalProps {
  open: boolean
  onClose: () => void
  itemName: string
  itemType: string
  price?: string
}

export default function BookingModal({ open, onClose, itemName, itemType, price }: BookingModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState(1)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !date) { setError('Please fill in all required fields'); return }
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemName, itemType, name, email, phone, date, guests, notes }),
      })
      if (!res.ok) throw new Error('Booking failed')
      setSuccess(true)
    } catch {
      setError('Failed to submit booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Booking form"
        >
          <FocusTrap active={open}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-surface border border-border rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-sm font-semibold text-fg">Book {itemName}</h2>
                <p className="text-xs text-muted mt-0.5 capitalize">{itemType}{price && ` · ${price}`}</p>
              </div>
              <button onClick={onClose} aria-label="Close booking form" className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-border transition-colors">
                <X className="w-4 h-4 text-muted" />
              </button>
            </div>

            {success ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <p className="text-sm font-medium text-fg mb-1">Booking Request Sent!</p>
                <p className="text-xs text-muted">We will confirm your reservation within 24 hours.</p>
                <button onClick={onClose} className="mt-4 text-xs text-accent hover:text-accent/80 transition-colors font-medium">Close</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-medium text-muted mb-1 block">Name *</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 text-xs bg-bg border border-border rounded-lg text-fg focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="text-[10px] font-medium text-muted mb-1 block">Email *</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 text-xs bg-bg border border-border rounded-lg text-fg focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-medium text-muted mb-1 block">Phone</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 text-xs bg-bg border border-border rounded-lg text-fg focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-medium text-muted mb-1 block"><Calendar className="w-3 h-3 inline mr-1" />Date *</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 text-xs bg-bg border border-border rounded-lg text-fg focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="text-[10px] font-medium text-muted mb-1 block"><Users className="w-3 h-3 inline mr-1" />Guests</label>
                    <input type="number" min={1} max={20} value={guests} onChange={(e) => setGuests(parseInt(e.target.value) || 1)} className="w-full px-3 py-2 text-xs bg-bg border border-border rounded-lg text-fg focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-medium text-muted mb-1 block">Notes</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className="w-full px-3 py-2 text-xs bg-bg border border-border rounded-lg text-fg focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-colors resize-none" />
                </div>
                {error && <p className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-accent text-accent-fg text-xs font-medium rounded-lg hover:bg-accent/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Submitting...</> : 'Request Booking'}
                </button>
              </form>
            )}
          </motion.div>
          </FocusTrap>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
