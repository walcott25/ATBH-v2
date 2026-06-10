import { useRef, useState, useEffect, type ReactNode } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'

interface SmoothScrollProps {
  children: ReactNode
  className?: string
}

export default function SmoothScroll({ children, className = '' }: SmoothScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const y = useTransform(smoothProgress, [0, 1], ['0px', `-${contentHeight - window.innerHeight}px`])

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContentHeight(containerRef.current.scrollHeight)
      }
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [children])

  return (
    <div ref={containerRef} className={`h-screen overflow-y-auto ${className}`}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  )
}
