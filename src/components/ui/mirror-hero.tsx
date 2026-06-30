import { motion } from 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react'

interface MirrorHeroProps {
  image: string
  badge: string
  title: string
  description: string
  cta?: { label: string; href: string }
}

export default function MirrorHero({ image, badge, title, description, cta }: MirrorHeroProps) {
  return (
    <section className="relative h-dvh w-full overflow-hidden">
      {/* Full-viewport background image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover"
        />
        {/* Layered gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/95 via-[#0A0A0A]/60 to-[#0A0A0A]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-transparent to-transparent" />
      </div>

      {/* Subtle ambient glow */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-accent/8 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Minimal dot pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />

      {/* Top bar — badge + brand */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-6 md:p-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center p-1.5 ring-1 ring-white/10">
            <img
              src="/Images/a-minimalist-app-icon-design-of-a-tourist--vector-.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xs font-semibold text-white/70 tracking-tight">ATBH</span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium tracking-[0.2em] uppercase text-accent border border-accent/20 bg-accent/8">
          <Sparkles className="w-3 h-3" />
          {badge}
        </span>
      </div>

      {/* Bottom-left content block */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-10 lg:p-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-2xl"
        >
          <div className="w-12 h-0.5 bg-accent/60 mb-4" />
          <h1 className="font-['Playfair_Display_SC'],serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] tracking-wide drop-shadow-xl mb-5">
            {title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/70 leading-[1.9] max-w-lg font-light tracking-wide">
            {description}
          </p>
          {cta && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-6"
            >
              <a
                href={cta.href}
                className="group inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium tracking-[0.15em] uppercase text-white/90 border border-white/25 bg-white/5 backdrop-blur-sm rounded-sm hover:bg-accent hover:border-accent hover:text-accent-fg transition-all duration-400"
              >
                {cta.label}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom-right subtle watermark */}
      <div className="absolute bottom-6 md:bottom-10 right-6 md:right-10 z-20 text-[10px] text-white/10 font-medium tracking-[0.3em] uppercase pointer-events-none">
        Asuogyaman Tourism Hub
      </div>

      {/* Bottom gradient edge */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent z-20" />
    </section>
  )
}
