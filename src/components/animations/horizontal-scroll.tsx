import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

interface HorizontalScrollProps {
  children: ReactNode
  className?: string
  containerClassName?: string
}

export default function HorizontalScroll({
  children,
  className = '',
  containerClassName = '',
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.6, 1, 1, 0.6])

  return (
    <div ref={containerRef} className={`relative ${containerClassName}`}>
      <div className="sticky top-0 overflow-hidden" style={{ height: '60vh' }}>
        <motion.div
          style={{ x, opacity }}
          className={`absolute inset-0 flex items-center ${className}`}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
