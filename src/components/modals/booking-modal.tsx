import { motion, AnimatePresence } from 'motion/react';
import { X, Hotel } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { trackEvent } from '../../services/analytics';

export default function BookingModal() {
  const { isBookingOpen, setIsBookingOpen, setIsChatOpen } = useApp();

  return (
    <AnimatePresence>
      {isBookingOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsBookingOpen(false)} className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white/80 backdrop-blur-2xl w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-white/30">
            <div className="p-8 md:p-12 text-center">
              <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <Hotel className="text-brand-gold w-10 h-10" />
              </div>
              <h3 className="text-3xl font-serif mb-4">Plan Your Journey</h3>
              <p className="text-brand-dark/60 mb-8">Our booking system is being updated. Please contact our concierge or call us directly.</p>
              <div className="space-y-4">
                <a href="tel:+233240000000" onClick={() => trackEvent('booking_call', { number: '+233240000000' })} className="block w-full bg-brand-dark text-white py-4 rounded-xl font-medium hover:bg-brand-gold transition-all">Call Reservations</a>
                <button onClick={() => { trackEvent('booking_chat'); setIsBookingOpen(false); setIsChatOpen(true); }} className="block w-full border border-brand-dark/10 py-4 rounded-xl font-medium hover:bg-brand-cream transition-all">Chat with Concierge</button>
              </div>
            </div>
            <button onClick={() => setIsBookingOpen(false)} className="absolute top-6 right-6 text-brand-dark/40 hover:text-brand-dark"><X className="w-6 h-6" /></button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
