import { type ReactNode } from 'react'
import { motion } from 'motion/react'
import { Sparkles } from 'lucide-react'

interface PageHeroProps {
  title: string
  description?: string
  badge?: string
  children?: ReactNode
  className?: string
}

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse-soft" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/3 rounded-full blur-[100px] animate-pulse-soft" style={{ animationDelay: '-2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/2 rounded-full blur-[150px] animate-pulse-soft" style={{ animationDelay: '-4s' }} />
    </div>
  )
}

function DotGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
      <div className="w-full h-full" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />
    </div>
  )
}

export default function PageHero({ title, description, badge, children, className = '' }: PageHeroProps) {
  return (
    <section className={`relative overflow-hidden min-h-[30vh] md:min-h-0 pt-20 pb-10 md:pt-36 md:pb-20 px-6 flex items-center ${className}`}>
      <FloatingOrbs />
      <DotGrid />
      {children}
      <div className="w-full max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {badge && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium tracking-widest uppercase text-accent border border-accent/20 bg-accent/5 mb-4">
              <Sparkles className="w-3 h-3" />
              {badge}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-fg max-w-3xl">
            {title}
          </h1>
          {description && (
            <p className="text-sm md:text-base text-muted max-w-xl mt-3 leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
