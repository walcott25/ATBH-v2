import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

interface StickyCardsProps {
  children: ReactNode[]
  className?: string
}

export default function StickyCards({ children, className = '' }: StickyCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {children.map((child, i) => {
        const progress = i / (children.length - 1 || 1)
        const nextProgress = (i + 1) / (children.length || 1)
        const scale = useTransform(
          scrollYProgress,
          [Math.max(0, progress - 0.1), progress, Math.min(1, nextProgress + 0.1)],
          [0.95, 1, 0.95]
        )
        const opacity = useTransform(
          scrollYProgress,
          [Math.max(0, progress - 0.2), progress, Math.min(1, nextProgress + 0.2)],
          [0.4, 1, 0.4]
        )
        const y = useTransform(
          scrollYProgress,
          [Math.max(0, progress - 0.1), progress, Math.min(1, nextProgress + 0.1)],
          [20, 0, -20]
        )

        return (
          <motion.div
            key={i}
            style={{ scale, opacity, y, willChange: 'transform, opacity' }}
            className="sticky top-[15vh] h-[70vh] flex items-center justify-center"
          >
            {child}
          </motion.div>
        )
      })}
    </div>
  )
}
