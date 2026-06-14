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
        className="relative w-full md:w-1/2 h-[30vh] md:h-screen flex flex-col justify-between p-10 md:p-16 overflow-hidden"
        style={{
          backgroundImage: `url("${image}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#0A0A0A',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-fg/90 via-fg/50 to-fg/30 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
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

        {/* Title + CTA — bottom of image */}
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-['Playfair_Display_SC'],serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] mb-8 tracking-wide"
          >
            {title}
          </motion.h1>
          {cta && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <a
                href={cta.href}
                className="group inline-flex items-center gap-2.5 bg-accent text-accent-fg px-7 py-3 text-sm font-medium rounded-sm hover:bg-accent/90 transition-all duration-300 tracking-wider uppercase"
              >
                {cta.label}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.div>
          )}
        </div>

        <div className="text-[10px] text-white/10 font-medium tracking-[0.3em] uppercase relative z-10">
          Asuogyaman Tourism Hub
        </div>
      </div>

      {/* Right — Solid Background Panel */}
      <div className="relative w-full md:w-1/2 min-h-[70vh] md:min-h-screen bg-bg px-10 md:px-16 py-10 md:py-16 flex flex-col">
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>

        <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        {/* Badge */}
        <div className="relative z-10 mt-12 md:mt-16">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[10px] font-medium tracking-[0.25em] uppercase text-accent border border-accent/20 bg-accent/5 mb-8">
              <Sparkles className="w-3 h-3" />
              {badge}
            </span>
          </motion.div>
        </div>

        {/* Description */}
        <div className="relative z-10 flex-1 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-sm md:text-base text-muted/80 leading-[1.9] max-w-md">
              {description}
            </p>
          </motion.div>
        </div>

        {/* Bottom gold accent */}
        <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>
    </section>
  )
}
