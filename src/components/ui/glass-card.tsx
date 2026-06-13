import { type ReactNode } from 'react'
import { motion } from 'motion/react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  variant?: 'glass' | 'glass-dark' | 'surface'
  hover?: 'lift' | 'shine' | 'glow' | 'none'
  as?: 'div' | 'motion'
  onClick?: () => void
}

export default function GlassCard({
  children,
  className = '',
  variant = 'surface',
  hover = 'lift',
  as = 'div',
  onClick,
}: GlassCardProps) {
  const variantClasses = {
    glass: 'glass',
    'glass-dark': 'glass-dark',
    surface: 'bg-surface border border-border',
  }

  const hoverClasses = {
    lift: 'hover-lift cursor-pointer',
    shine: 'card-shine cursor-pointer',
    glow: 'card-shine hover-lift cursor-pointer',
    none: '',
  }

  const Tag = as === 'motion' ? motion.div : 'div'
  const motionProps = as === 'motion'
    ? { whileHover: { y: -4 }, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } }
    : {}

  return (
    <Tag
      onClick={onClick}
      className={`rounded-xl overflow-hidden transition-all duration-300 ${variantClasses[variant]} ${hoverClasses[hover]} ${className}`}
      {...motionProps}
    >
      {children}
    </Tag>
  )
}
