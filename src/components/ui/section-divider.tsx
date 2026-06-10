import { motion } from 'motion/react'
import { Diamond } from 'lucide-react'

interface SectionDividerProps {
  label?: string
  className?: string
}

export default function SectionDivider({ label, className = '' }: SectionDividerProps) {
  return (
    <div className={`relative py-12 md:py-16 overflow-hidden ${className}`}>
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-px h-0 bg-brand-gold/20"
        initial={{ height: 0 }}
        whileInView={{ height: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      />
      <div className="relative flex items-center justify-center gap-4">
        <motion.div
          className="flex-1 max-w-[200px] h-px bg-gradient-to-r from-transparent via-brand-gold/10 to-brand-gold/30"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ transformOrigin: 'right' }}
        />
        <motion.div
          initial={{ opacity: 0, rotate: -90, scale: 0 }}
          whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative"
        >
          <div className="w-8 h-8 rounded-full bg-brand-dark border border-brand-gold/20 flex items-center justify-center shadow-lg shadow-brand-gold/5">
            <Diamond className="w-3.5 h-3.5 text-brand-gold/60" />
          </div>
          {label && (
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-[0.3em] font-bold text-brand-gold/40 whitespace-nowrap">
              {label}
            </span>
          )}
        </motion.div>
        <motion.div
          className="flex-1 max-w-[200px] h-px bg-gradient-to-l from-transparent via-brand-gold/10 to-brand-gold/30"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </div>
  )
}
