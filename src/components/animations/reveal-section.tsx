import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'motion/react'

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

const variants: Record<RevealVariant, { initial: Record<string, unknown>; animate: Record<string, unknown> }> = {
  fadeUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideRight: {
    initial: { opacity: 0, x: -80 },
    animate: { opacity: 1, x: 0 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 80 },
    animate: { opacity: 1, x: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9, filter: 'blur(4px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
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
  duration = 0.7,
  margin = '-50px',
  once = true,
}: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin })
  const v = variants[variant]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={v.initial}
      animate={isInView ? v.animate : v.initial}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}
