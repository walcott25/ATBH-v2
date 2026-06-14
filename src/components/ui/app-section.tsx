import { Smartphone, MapPin, Navigation, Wifi, Compass, Camera } from 'lucide-react'
import { motion } from 'motion/react'
import AnimatedSection from '../animations/animated-section'

function DotGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.012]">
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
        {/* Phone mockup — realistic */}
        <div className="relative mx-auto w-60 md:w-72">
          {/* Glow behind */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-radial from-accent/[0.06] to-transparent pointer-events-none" />
          {/* Phone body */}
          <div className="relative aspect-[9/19.5] bg-[#1a1a1a] rounded-[3rem] shadow-[0_0_0_2px_#333,0_20px_60px_-8px_rgba(0,0,0,0.4)] overflow-hidden">
            {/* Side buttons */}
            <div className="absolute right-[-2px] top-24 w-[3px] h-8 bg-[#333] rounded-r-sm" />
            <div className="absolute right-[-2px] top-36 w-[3px] h-12 bg-[#333] rounded-r-sm" />
            <div className="absolute left-[-2px] top-32 w-[3px] h-10 bg-[#333] rounded-l-sm" />
            {/* Screen bezel */}
            <div className="absolute inset-1 bg-black rounded-[2.6rem] overflow-hidden">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-2xl z-20 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#1a1a1a] border border-[#333]" />
                <div className="w-5 h-5 rounded-full bg-[#1a1a1a]" />
              </div>
              {/* Screen */}
              <div className="absolute inset-0 top-0 bg-[#f5f5f0]">
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-[38px] pb-1 text-[10px] text-fg/70 font-medium">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="w-3.5 h-2 border border-fg/40 rounded-[2px] flex items-center px-[1.5px]">
                      <div className="w-2 h-[5px] bg-fg/60 rounded-[1px]" />
                    </div>
                    <svg className="w-3 h-3 text-fg/60" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                    </svg>
                  </div>
                </div>
                {/* App header */}
                <div className="flex items-center justify-between px-4 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
                      <Compass className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-[11px] font-semibold text-fg tracking-tight">Asuogyaman</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-fg/5 flex items-center justify-center">
                      <svg className="w-3 h-3 text-fg/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m18.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414"/></svg>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-fg/5 flex items-center justify-center">
                      <svg className="w-3 h-3 text-fg/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
                    </div>
                  </div>
                </div>
                {/* Hero card — Adomi Bridge */}
                <div className="mx-4 rounded-xl overflow-hidden relative h-28 mb-2" style={{ background: 'linear-gradient(135deg, #1a3a2a 0%, #2d5a3f 30%, #4a7a5f 60%, #6b9a7f 100%)' }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2 bg-accent/90 text-white text-[8px] font-semibold px-1.5 py-0.5 rounded">FEATURED</div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="text-white text-[11px] font-semibold">Adomi Bridge</div>
                    <div className="text-white/60 text-[8px] flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" />
                      Volta Region
                    </div>
                  </div>
                </div>
                {/* Section title */}
                <div className="flex items-center justify-between px-4 mb-2">
                  <span className="text-[10px] font-semibold text-fg/80 tracking-wide">Popular Destinations</span>
                  <span className="text-[8px] text-accent font-medium">See all</span>
                </div>
                {/* Horizontal scroll cards */}
                <div className="flex gap-2 px-4 mb-3 overflow-hidden">
                  {[
                    { bg: 'linear-gradient(135deg, #1a2a4a, #2a4a7a, #4a7aaa)', label: 'Akosombo Dam', sub: 'Engineering marvel' },
                    { bg: 'linear-gradient(135deg, #3a1a1a, #5a2a2a, #7a4a4a)', label: 'Dodi Princess', sub: 'Lake cruise' },
                    { bg: 'linear-gradient(135deg, #1a3a3a, #2a5a5a, #4a7a7a)', label: 'Akwamu Gorge', sub: 'Hiking trail' },
                  ].map((item, i) => (
                    <div key={i} className="shrink-0 w-28 rounded-lg overflow-hidden relative h-20" style={{ background: item.bg }}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute bottom-1.5 left-2 right-2">
                        <div className="text-[9px] text-white font-semibold">{item.label}</div>
                        <div className="text-[7px] text-white/50">{item.sub}</div>
                      </div>
                      <div className="absolute top-1 right-1 w-3 h-3 rounded-full border border-white/30 flex items-center justify-center">
                        <svg className="w-2 h-2 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Bottom tab bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 border-t border-fg/5 px-4 py-1.5 flex items-center justify-around">
                  {[
                    { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', active: true },
                    { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', active: false },
                    { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', active: false },
                    { icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', active: false },
                  ].map((tab, i) => (
                    <svg key={i} className={`w-4 h-4 ${tab.active ? 'text-accent' : 'text-fg/30'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={tab.icon} />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

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
