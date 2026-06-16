import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export default function AnimatedCounter({ value, suffix = '', prefix = '', decimals = 0 }: AnimatedCounterProps) {
  const numValue = Number(value) || 0
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const hasAnimated = useRef(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const duration = 2000
    const startTime = performance.now()

    function animate(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(progress)
      const currentValue = easedProgress * numValue

      setCount(currentValue)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setCount(numValue)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isInView, numValue])

  const display = isNaN(count) ? '0' : count.toFixed(decimals)

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="inline-block"
    >
      {prefix}{display}{suffix}
    </motion.span>
  )
}
