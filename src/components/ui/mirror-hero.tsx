import { motion } from 'motion/react'
import { Sparkles, ArrowRight } from 'lucide-react'

interface MirrorHeroProps {
  image: string
  badge: string
  title: string
  description: string
  cta?: { label: string; href: string }
}

export default function MirrorHero({ image, badge, title, description, cta }: MirrorHeroProps) {
  return (
    <section className="min-h-[50vh] md:min-h-screen flex flex-col md:flex-row">
      {/* Left — Image Panel */}
      <div
        className="relative w-full md:w-1/2 h-[45vh] md:h-screen flex flex-col justify-between p-8 md:p-14 overflow-hidden group"
        style={{
          backgroundImage: `url("${image}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#0A0A0A',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-fg/95 via-fg/70 to-fg/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-fg/40 via-transparent to-transparent pointer-events-none opacity-40" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[180px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>

        {/* Decorative corner accent */}
        <div className="absolute top-8 right-8 w-12 h-12 pointer-events-none">
          <div className="absolute top-0 right-0 w-8 h-px bg-accent/40" />
          <div className="absolute top-0 right-0 w-px h-8 bg-accent/40" />
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden p-1.5 ring-1 ring-white/10">
            <img
              src="/Images/a-minimalist-app-icon-design-of-a-tourist--vector-.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-sm font-semibold text-white tracking-tight">ATBH</span>
        </div>

        {/* Title + CTA — bottom portion of image */}
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-['Playfair_Display_SC'],serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] mb-3 tracking-wide drop-shadow-lg"
          >
            {title}
          </motion.h1>
          <div className="w-16 h-0.5 bg-accent/70 mb-6" />
          {cta && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <a
                href={cta.href}
                className="group inline-flex items-center gap-2.5 px-6 py-2.5 text-sm font-medium tracking-[0.15em] uppercase text-white/90 border border-white/25 bg-white/5 backdrop-blur-sm rounded-sm hover:bg-accent hover:border-accent hover:text-accent-fg transition-all duration-400"
              >
                {cta.label}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.div>
          )}
        </div>

        <div className="text-[10px] text-white/10 font-medium tracking-[0.3em] uppercase relative z-10">
          Asuogyaman Tourism Hub
        </div>
      </div>

      {/* Right — Solid Background Panel */}
      <div className="relative w-full md:w-1/2 min-h-[70vh] md:min-h-screen bg-bg px-8 md:px-14 py-10 md:py-14 flex flex-col">
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>

        <div className="absolute top-0 left-8 md:left-14 right-8 md:right-14 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="relative z-10 flex-1 flex flex-col justify-center -mt-10 md:-mt-16">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[10px] font-medium tracking-[0.25em] uppercase text-accent border border-accent/20 bg-accent/5 mb-6">
              <Sparkles className="w-3 h-3" />
              {badge}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-base md:text-lg text-muted/80 leading-[2] max-w-lg font-light tracking-wide">
              {description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-8 flex items-center gap-4"
          >
            <div className="w-12 h-px bg-accent/30" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted/40 font-medium">
              Premium Destination
            </span>
            <div className="w-12 h-px bg-accent/30" />
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-8 md:left-14 right-8 md:right-14 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>
    </section>
  )
}
