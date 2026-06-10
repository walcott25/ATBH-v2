import { useState, useMemo } from 'react'
import { motion } from 'motion/react'
import { EXPERIENCES } from '../data'
import type { Experience } from '../data'
import AnimatedCounter from '../components/ui/animated-counter'
import { useNavigate } from 'react-router-dom'
import { Anchor, Compass, Mountain, Landmark, Utensils, Heart, Star, Clock, MapPin, ChevronRight, ArrowUpRight, Sparkles, Users, Ship } from 'lucide-react'
import AdinkraBg from '../components/ui/adinkra-bg'

const categoryIcons: Record<string, typeof Anchor> = {
  'Water Adventures': Anchor,
  'Cultural Tours': Compass,
  'Nature & Hiking': Mountain,
  'Heritage & History': Landmark,
  'Food & Dining': Utensils,
  'Wellness & Relaxation': Heart,
}

const categoryDescriptions: Record<string, string> = {
  'Water Adventures': 'Cruises, boat tours, and aquatic thrills on Lake Volta',
  'Cultural Tours': 'Immersive journeys into Akwamu heritage and traditions',
  'Nature & Hiking': 'Trails, forests, and wildlife encounters in the wild',
  'Heritage & History': 'Landmarks, engineering marvels, and historical sites',
  'Food & Dining': 'Culinary experiences from lake to table',
  'Wellness & Relaxation': 'Spa days, resort escapes, and peaceful retreats',
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const categories = ['All', 'Water Adventures', 'Cultural Tours', 'Nature & Hiking', 'Heritage & History', 'Food & Dining', 'Wellness & Relaxation']

export default function Experience() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const filtered = useMemo(() =>
    activeCategory === 'All' ? EXPERIENCES : EXPERIENCES.filter(e => e.category === activeCategory),
  [activeCategory])

  const featured = useMemo(() =>
    [...EXPERIENCES].sort((a, b) => (b.rating || 0) - (a.rating || 0))[0],
  [])

  return (
    <div className="min-h-screen bg-white">
      {/* ========== SPLIT-SCREEN HERO ========== */}
      <section className="relative overflow-hidden bg-white">
        <div className="grid lg:grid-cols-2 min-h-screen">
          {/* LEFT — Image panel */}
          <motion.div
            initial={{ clipPath: 'inset(0 0 0 100%)' }}
            animate={{ clipPath: 'inset(0 0 0 0)' }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative h-[60vh] lg:h-auto overflow-hidden"
          >
            <motion.div
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0"
            >
              <img
                src="/Images/dodi-princess.jpg"
                alt="Experiences in Asuogyaman"
                className="w-full h-full object-cover"
                fetchPriority="high"
                style={{ willChange: 'transform' }}
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/30 to-brand-dark/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/60 via-transparent to-transparent" />
            <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.4)]" />
            <div className="absolute bottom-0 left-0 p-10 lg:p-16 text-left">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-10 h-[2px] bg-brand-gold" />
                  <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-brand-gold">Curated Adventures</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif text-white leading-[0.95] tracking-tighter mb-4">
                  Experiences<br />
                  <span className="text-brand-gold">Collection</span>
                </h3>
                <p className="text-white/50 text-sm font-light max-w-md leading-relaxed">
                  From cruising Lake Volta aboard the Dodi Princess to hiking the forest trails
                  of Akwamu Gorge — every moment is designed to leave you with stories worth telling.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT — Content panel */}
          <div className="relative flex items-center bg-white">
            <div className="px-10 lg:px-20 py-20 max-w-xl">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}>
                <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">
                  Explore Experiences
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[0.9] tracking-tighter text-brand-dark mb-8">
                  {EXPERIENCES.length} Experiences
                </h1>
                <p className="text-brand-dark/50 text-base font-light leading-relaxed mb-12 max-w-md">
                  From cruising the vast expanse of Lake Volta to hiking the forest trails of
                  Akwamu Gorge — every experience is designed to leave you with stories worth telling.
                </p>

                <div className="flex flex-wrap gap-8 md:gap-12">
                  {[
                    { label: 'Activities', value: EXPERIENCES.length },
                    { label: 'Categories', value: categories.length - 1 },
                    { label: 'Top Rated', value: featured?.rating || 0 },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-2xl md:text-3xl font-serif text-brand-gold tracking-tight">
                        {typeof stat.value === 'number' ? (
                          <>
                            <AnimatedCounter value={stat.value} />
                            {stat.label === 'Top Rated' && (
                              <Star className="inline w-4 h-4 ml-1.5 text-brand-gold fill-brand-gold -mt-2" />
                            )}
                          </>
                        ) : (
                          stat.value
                        )}
                      </div>
                      <div className="text-[9px] uppercase tracking-[0.3em] text-brand-dark/30 font-bold mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-cream/50 to-transparent z-10 pointer-events-none" />
      </section>

      {/* ========== FEATURED SPOTLIGHT ========== */}
      {featured && (
        <AdinkraBg variant="gye-nyame" opacity={0.025} color="#c8a96e">
        <section className="relative py-28 px-6 bg-white border-b border-brand-dark/5">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-16 items-center"
            >
                  <div>
                <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Featured Experience</span>
                <h2 className="text-4xl md:text-5xl font-serif leading-[0.9] tracking-tighter text-brand-dark mb-6">{featured.name}</h2>
                <div className="flex items-center gap-4 text-sm text-brand-dark/50 mb-6">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{featured.duration}</span>
                  <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-brand-gold fill-brand-gold" />{featured.rating}</span>
                  <span className="flex items-center gap-1.5"><Ship className="w-4 h-4" />{featured.price}</span>
                </div>
                <p className="text-brand-dark/60 leading-relaxed font-light text-lg mb-8">{featured.longDescription?.split('.')[0] || featured.description}</p>
                {featured.highlights && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {featured.highlights.slice(0, 4).map((h) => (
                      <span key={h} className="px-3 py-1.5 bg-brand-dark/[0.04] rounded-full text-[11px] text-brand-dark/50 font-medium">{h}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden group">
                <img
                  src={featured.image}
                  alt={featured.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="px-4 py-1.5 bg-brand-gold/20 backdrop-blur-sm rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold border border-brand-gold/30">
                    Editor's Pick
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        </AdinkraBg>
      )}

      {/* ========== STICKY CATEGORY FILTER ========== */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-brand-dark/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-4 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat === 'All' ? Sparkles : categoryIcons[cat]
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] md:text-xs uppercase tracking-[0.15em] font-bold whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                    activeCategory === cat
                      ? 'bg-brand-dark text-white shadow-lg shadow-black/10'
                      : 'bg-brand-dark/[0.04] text-brand-dark/50 hover:bg-brand-dark/[0.08]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat === 'All' ? 'All Experiences' : cat}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ========== EXPERIENCES GRID ========== */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            key={activeCategory}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((exp) => {
              const Icon = categoryIcons[exp.category]
              return (
                <motion.div
                  key={exp.id}
                  variants={fadeInUp}
                  className="group relative bg-white rounded-[2rem] border border-brand-dark/5 overflow-hidden hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={exp.image}
                      alt={exp.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[9px] uppercase tracking-[0.2em] font-bold text-white/80 border border-white/10">
                        {exp.duration}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 text-white/70 text-xs">
                        <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                        <span>{exp.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-brand-gold" />
                      </div>
                      <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-brand-gold">{exp.category}</span>
                    </div>
                    <h3 className="text-xl font-serif tracking-tight text-brand-dark mb-2">{exp.name}</h3>
                    <p className="text-brand-dark/50 text-sm leading-relaxed font-light mb-4 line-clamp-2">{exp.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-brand-dark/40">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{exp.duration}</span>
                        {exp.rating && (
                          <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />{exp.rating}</span>
                        )}
                      </div>
                      <span className="text-sm font-bold text-brand-dark">{exp.price}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-32">
              <Compass className="w-16 h-16 text-brand-dark/10 mx-auto mb-6" />
              <p className="text-brand-dark/30 text-lg font-light">No experiences found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <AdinkraBg variant="akoma" opacity={0.03} color="#c8a96e">
      {/* ========== CATEGORIES EXPLORER ========== */}
      <section className="relative py-28 px-6 bg-brand-dark/[0.02] border-t border-brand-dark/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">
              Browse by Category
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif leading-[0.9] tracking-tighter text-brand-dark">
              Find Your Adventure
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.filter(c => c !== 'All').map((cat, idx) => {
              const Icon = categoryIcons[cat]
              const count = EXPERIENCES.filter(e => e.category === cat).length
              return (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => {
                    setActiveCategory(cat)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="group relative p-8 rounded-[2rem] bg-white border border-brand-dark/5 text-left hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 via-transparent to-brand-dark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-brand-dark flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-gold transition-all duration-500">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-serif tracking-tight text-brand-dark mb-2">{cat}</h3>
                    <p className="text-brand-dark/40 text-sm font-light mb-3">{categoryDescriptions[cat]}</p>
                    <p className="text-brand-gold text-xs font-bold tracking-wide">{count} experience{count !== 1 ? 's' : ''}</p>
                  </div>
                  <ArrowUpRight className="absolute top-6 right-6 w-4 h-4 text-brand-dark/20 group-hover:text-brand-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>
      </AdinkraBg>

      {/* ========== CTA ========== */}
      <section className="relative py-32 px-6 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/Images/Dodi4.jpg"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-brand-dark" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block"
          >
            Start Your Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif leading-[0.9] tracking-tighter text-white mb-8"
          >
            Asuogyaman
            <br />
            <span className="text-brand-gold">Awaits You</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-lg leading-relaxed font-light max-w-2xl mx-auto mb-12"
          >
            Every moment here is a story waiting to be written. From the tranquil waters
            of Lake Volta to the rich traditions of the Akwamu Kingdom — your adventure
            begins now.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate('/attractions')}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-gold text-brand-dark font-bold rounded-full text-sm tracking-wide hover:bg-brand-gold/90 transition-all duration-300 shadow-xl shadow-brand-gold/20"
          >
            Explore Attractions
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>
      </section>
    </div>
  )
}
