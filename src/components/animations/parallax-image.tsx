import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  speed?: number
  containerClassName?: string
}

export default function ParallaxImage({
  src,
  alt,
  className = '',
  speed = 0.3,
  containerClassName = '',
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100])

  return (
    <div ref={ref} className={`overflow-hidden ${containerClassName}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, willChange: 'transform' }}
        loading="lazy"
        className={`w-full h-full object-cover ${className}`}
      />
    </div>
  )
}
