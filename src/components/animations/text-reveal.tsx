import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

interface TextRevealProps {
  children: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  delay?: number
  stagger?: number
  wordClassName?: string
}

export default function TextReveal({
  children,
  className = '',
  as: Tag = 'p',
  delay = 0,
  stagger = 0.03,
  wordClassName = '',
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })
  const words = children.split(' ')

  return (
    <Tag ref={ref} className={className} aria-label={children}>
      <span className="sr-only">{children}</span>
      <span aria-hidden className="inline-flex flex-wrap">
        {words.map((word, i) => (
          <span key={i} className={`inline-block overflow-hidden ${wordClassName}`}>
            <motion.span
              className="inline-block"
              initial={{ y: '100%', opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: delay + i * stagger,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {word}{'\u00A0'}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  )
}
