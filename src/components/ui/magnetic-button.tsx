import { useRef, type ReactNode } from 'react'
import { motion } from 'motion/react'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  as?: 'button' | 'a'
  href?: string
}

export default function MagneticButton({ children, className = '', onClick, as = 'button', href }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
  }

  const reset = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
  }

  const Tag = as === 'a' ? 'a' : 'button'

  return (
    <div ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} className="inline-block transition-transform duration-200 ease-out">
      <Tag
        href={href}
        onClick={onClick}
        className={className}
      >
        {children}
      </Tag>
    </div>
  )
}
