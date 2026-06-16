import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { trackEvent } from '../../services/analytics';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Attractions', path: '/attractions' },
  { label: 'Dining', path: '/dining' },
  { label: 'Stay', path: '/stay' },
  { label: 'Events', path: '/events' },
  { label: 'Business', path: '/business' },
  { label: 'Schools', path: '/schools' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Map', path: '/map' },
  { label: 'Donate', path: '/donate' },
  { label: 'Donation History', path: '/donation-history' },
];

const mobileItemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: (i: number) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { delay: i * 0.06, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }) as const,
} as const;

export default function MobileMenu() {
  const { isMenuOpen, setIsMenuOpen } = useApp();

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-brand-dark/98 backdrop-blur-2xl flex flex-col justify-center items-center gap-4 md:gap-8 overflow-y-auto"
        >
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10">
            <X className="w-5 h-5 text-white" />
          </button>
          {[...navItems, { label: 'Experience', path: '/experience' }].map((item, i) => (
            <motion.div
              key={item.path}
              custom={i}
              variants={mobileItemVariants}
              initial="hidden"
              animate="visible"
            >
              <Link
                to={item.path}
                onClick={() => { trackEvent('nav_click', { page: item.label, source: 'mobile_menu' }); setIsMenuOpen(false); }}
                className="text-white/80 hover:text-brand-gold text-xl md:text-2xl font-serif tracking-tight transition-colors"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
