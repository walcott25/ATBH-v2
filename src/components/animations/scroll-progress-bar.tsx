import { motion, useScroll, useSpring } from 'motion/react'

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[999] h-[2px] origin-left bg-gradient-to-r from-brand-gold/40 via-brand-gold to-brand-gold/40"
      style={{ scaleX }}
    />
  )
}
