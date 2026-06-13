import { type ReactNode } from 'react'
import { motion } from 'motion/react'

type RevealVariant = 'fadeUp' | 'fadeIn' | 'slideRight' | 'slideLeft' | 'scaleIn' | 'clipUp'

interface RevealSectionProps {
  children: ReactNode
  className?: string
  variant?: RevealVariant
  delay?: number
  duration?: number
  margin?: string
  once?: boolean
}

const variants: Record<RevealVariant, { initial: Record<string, string | number>; animate: Record<string, string | number> }> = {
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideRight: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
  },
  clipUp: {
    initial: { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
    animate: { opacity: 1, clipPath: 'inset(0% 0 0 0)' },
  },
}

export default function RevealSection({
  children,
  className = '',
  variant = 'fadeUp',
  delay = 0,
  duration = 0.5,
  margin = '-80px',
  once = true,
}: RevealSectionProps) {
  const v = variants[variant]

  return (
    <motion.div
      className={className}
      initial={v.initial}
      whileInView={v.animate}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
