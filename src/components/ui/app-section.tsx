import { Smartphone, MapPin, Navigation, Wifi, Compass, Camera } from 'lucide-react'
import { motion } from 'motion/react'
import AnimatedSection from '../animations/animated-section'

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

const features = [
  { icon: MapPin, label: 'Discover nearby attractions' },
  { icon: Navigation, label: 'Turn-by-turn directions' },
  { icon: Compass, label: 'Curated trip planner' },
  { icon: Wifi, label: 'Offline access to guides' },
  { icon: Camera, label: 'Share your moments' },
  { icon: Smartphone, label: 'Real-time event alerts' },
]

function AppStoreBadge() {
  return (
    <motion.a
      href="#"
      className="group inline-flex items-center gap-2.5 bg-[#0A0A0A] text-white px-5 py-2.5 md:px-6 md:py-3 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>
      <div className="text-left">
        <div className="text-[8px] leading-tight text-white/50 font-medium tracking-wider uppercase">Download on the</div>
        <div className="text-sm md:text-base leading-tight font-semibold tracking-tight">App Store</div>
      </div>
    </motion.a>
  )
}

function PlayStoreBadge() {
  return (
    <motion.a
      href="#"
      className="group inline-flex items-center gap-2.5 bg-[#0A0A0A] text-white px-5 py-2.5 md:px-6 md:py-3 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 010 1.732l-2.807 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
      </svg>
      <div className="text-left">
        <div className="text-[8px] leading-tight text-white/50 font-medium tracking-wider uppercase">Get it on</div>
        <div className="text-sm md:text-base leading-tight font-semibold tracking-tight">Google Play</div>
      </div>
    </motion.a>
  )
}

export default function AppSection() {
  return (
    <AnimatedSection className="py-24 px-5 relative overflow-hidden">
      <DotGrid />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />

      <div className="max-w-6xl mx-auto relative grid md:grid-cols-2 gap-16 items-center">
        {/* Phone mockup */}
        <motion.div
          className="relative mx-auto w-56 md:w-64"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="relative aspect-[9/19] bg-surface rounded-[2.5rem] border-4 border-border shadow-2xl shadow-accent/5 overflow-hidden">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-black rounded-b-xl z-10" />
            {/* Screen content */}
            <div className="absolute inset-0 top-5 bg-gradient-to-b from-fg/5 to-bg">
              <div className="p-4 pt-6 space-y-2">
                <div className="w-3/4 h-3 bg-accent/30 rounded-full animate-pulse" />
                <div className="w-1/2 h-2 bg-fg/10 rounded-full" />
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-[3/2] bg-fg/5 rounded-lg overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
                      <div className="absolute bottom-1.5 left-1.5 right-1.5">
                        <div className="w-full h-1.5 bg-fg/10 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 pt-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                  ))}
                  <div className="w-2 h-1.5 bg-fg/10 rounded-full ml-1" />
                </div>
                <div className="w-full h-6 bg-accent/10 rounded-lg mt-2 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full border border-accent/40" />
                </div>
              </div>
            </div>
            {/* Screen reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
            {/* Home indicator */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 bg-fg/20 rounded-full" />
          </div>
          {/* Glow behind phone */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-gradient-radial from-accent/[0.07] to-transparent pointer-events-none" />
        </motion.div>

        {/* Text content */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium tracking-widest uppercase text-accent border border-accent/20 bg-accent/5 mb-5">
            <Smartphone className="w-3 h-3" />
            Mobile App
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-fg mb-4 leading-tight">
            Explore Asuogyaman <br />
            <span className="text-accent">on the go</span>
          </h2>

          <p className="text-sm md:text-base text-muted max-w-md mx-auto md:mx-0 leading-relaxed mb-8">
            Download the official tourism app for curated itineraries, offline maps,
            real-time event updates, and exclusive travel tips — all in your pocket.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-10">
            {features.map((feat) => (
              <span
                key={feat.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-muted bg-surface border border-border rounded-lg"
              >
                <feat.icon className="w-3 h-3 text-accent" />
                {feat.label}
              </span>
            ))}
          </div>

          {/* Store badges */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <AppStoreBadge />
            <PlayStoreBadge />
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
