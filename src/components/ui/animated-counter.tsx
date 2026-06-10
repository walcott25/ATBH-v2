import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  decimals?: number
}

export default function AnimatedCounter({ value, suffix = '', decimals = 0 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(interval)
      } else {
        setCount(current)
      }
    }, duration / steps)
    return () => clearInterval(interval)
  }, [isInView, value])

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {count.toFixed(decimals)}{suffix}
    </motion.span>
  )
}
