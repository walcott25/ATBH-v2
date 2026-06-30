import { motion } from 'motion/react'
import { Construction, Wrench } from 'lucide-react'

export default function MaintenanceMode() {
  return (
    <div className="fixed inset-0 z-[9999] bg-bg flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6"
        >
          <Construction className="w-8 h-8 text-accent" />
        </motion.div>

        <h1 className="text-2xl font-semibold text-fg mb-3">Under Maintenance</h1>
        <p className="text-sm text-muted leading-relaxed">
          We're currently performing scheduled maintenance to improve your experience.
          The site will be back shortly. Thank you for your patience.
        </p>

        <div className="flex items-center justify-center gap-2 mt-8 text-[10px] text-muted/50">
          <Wrench className="w-3 h-3" />
          <span>Asuogyaman Tourism Hub</span>
        </div>
      </motion.div>
    </div>
  )
}
