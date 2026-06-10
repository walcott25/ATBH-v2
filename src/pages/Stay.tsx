import { useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import { STAY } from '../data'
import type { Stay } from '../data'
import ImageCard from '../components/ui/image-card'
import RevealSection from '../components/animations/reveal-section'
import ParallaxImage from '../components/animations/parallax-image'
import AnimatedCounter from '../components/ui/animated-counter'
import DetailPanel from '../DetailPanel'
import { useNavigate } from 'react-router-dom'
import { Crown, Building2, Wallet, Star, MapPin, ChevronRight, ArrowUpRight, Sparkles, Bed } from 'lucide-react'
import AdinkraBg from '../components/ui/adinkra-bg'

const categoryIcons: Record<string, typeof Crown> = {
  Luxury: Crown,
  'Mid-Range': Building2,
  Budget: Wallet,
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const categories = ['All', 'Luxury', 'Mid-Range', 'Budget']

export default function StayPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null)
  const filteredStay =
    activeCategory === 'All'
      ? STAY
      : STAY.filter((s) => s.category === activeCategory)

  const topRated = useMemo(() =>
    [...STAY].sort((a, b) => (b.rating || 0) - (a.rating || 0))[0],
  [])

  const featured = STAY.find(s => s.rating === 5.0) || STAY[0]

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
              <img src="/Images/ghana-stay-bg.jpg" alt="Asuogyaman Stay" className="w-full h-full object-cover" fetchPriority="high" style={{ willChange: 'transform' }} />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/30 to-brand-dark/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/60 via-transparent to-transparent" />
            <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.4)]" />
            <div className="absolute bottom-0 left-0 p-10 lg:p-16 text-left">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-10 h-[2px] bg-brand-gold" />
                  <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-brand-gold">Premium Stays</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif text-white leading-[0.95] tracking-tighter mb-4">
                  Where to<br />
                  <span className="text-brand-gold">Stay</span>
                </h3>
                <p className="text-white/50 text-sm font-light max-w-md leading-relaxed">
                  From world-class lakeside resorts to cozy lodges — find your perfect home away from home.
                </p>
              </motion.div>
            </div>
          </motion.div>
          {/* RIGHT — Content panel */}
          <div className="relative flex items-center bg-white">
            <div className="px-10 lg:px-20 py-20 max-w-xl">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}>
                <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Explore Stays</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[0.9] tracking-tighter text-brand-dark mb-8">{STAY.length} Properties</h1>
                <p className="text-brand-dark/50 text-base font-light leading-relaxed mb-12 max-w-md">
                  From world-class lakeside resorts and boutique hotels to cozy lodges and guesthouses — find your perfect escape.
                </p>
                <div className="flex flex-wrap gap-8 md:gap-12">
                  {[
                    { label: 'Properties', value: STAY.length },
                    { label: 'Categories', value: categories.length - 1 },
                    { label: 'Top Rated', value: topRated?.rating || 0 },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-2xl md:text-3xl font-serif text-brand-gold tracking-tight">
                        {typeof stat.value === 'number' ? (<><AnimatedCounter value={stat.value} />{stat.label === 'Top Rated' && <Star className="inline w-4 h-4 ml-1.5 text-brand-gold fill-brand-gold -mt-2" />}</>) : (stat.value)}
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

      {/* ========== FEATURED PROPERTY SPOTLIGHT ========== */}
      {featured && (
        <AdinkraBg variant="gye-nyame" opacity={0.025} color="#c8a96e">
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-12 md:gap-20 items-center"
            >
              <motion.div variants={fadeInUp}>
                <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">
                  Top Rated
                </span>
                <h2 className="text-4xl md:text-5xl font-serif leading-[0.9] tracking-tighter text-brand-dark mb-6">
                  {featured.name}
                </h2>
                <p className="text-brand-dark/50 text-base leading-relaxed font-light mb-8">
                  {featured.longDescription || featured.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="px-4 py-2 bg-brand-gold/5 border border-brand-gold/10 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold text-brand-gold flex items-center gap-2">
                    <Bed className="w-3 h-3" />
                    {featured.category}
                  </span>
                  {featured.phone && (
                    <span className="px-4 py-2 bg-brand-dark/5 border border-brand-dark/10 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold text-brand-dark/50 flex items-center gap-2">
                      {featured.phone}
                    </span>
                  )}
                  {featured.rating && (
                    <span className="px-4 py-2 bg-brand-dark/5 border border-brand-dark/10 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold text-brand-dark/50 flex items-center gap-2">
                      <Star className="w-3 h-3 fill-brand-gold text-brand-gold" />
                      {featured.rating}
                    </span>
                  )}
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="relative">
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/10 group">
                  <ParallaxImage
                    src={featured.image}
                    alt={featured.name}
                    className="transition-transform duration-1000 group-hover:scale-105"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-brand-dark/60" />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-xl px-4 py-1.5 rounded-full text-[8px] uppercase tracking-[0.25em] font-bold text-brand-dark flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-brand-gold" />
                      Featured
                    </span>
                  </div>
                  {featured.rating && (
                    <div className="absolute top-6 right-6 bg-brand-dark/60 backdrop-blur-xl px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <Star className="w-3 h-3 fill-brand-gold text-brand-gold" />
                      <span className="text-[10px] font-bold text-white">{featured.rating}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        </AdinkraBg>
      )}

      {/* ========== STICKY FILTER BAR ========== */}
      <section className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-brand-dark/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between gap-6 py-4">
            <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
              {categories.map((cat) => {
                const Icon = cat !== 'All' ? categoryIcons[cat] : Bed
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full border text-[9px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                      activeCategory === cat
                        ? 'bg-brand-dark text-white border-brand-dark shadow-lg shadow-brand-dark/15'
                        : 'border-brand-dark/10 text-brand-dark/50 hover:border-brand-gold hover:text-brand-gold'
                    }`}
                  >
                    {cat !== 'All' && <Icon className="w-3 h-3" />}
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========== STAY GRID ========== */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredStay.length > 0 ? (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                {filteredStay.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
                    viewport={{ once: true, margin: '-50px' }}
                    style={{ willChange: 'transform, opacity' }}
                    onClick={() => setSelectedStay(item)}
                  >
                    <ImageCard
                      image={item.image}
                      name={item.name}
                      description={item.description}
                      category={item.category}
                      variant="stay"
                      rating={item.rating}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-32"
              >
                <Bed className="w-16 h-16 text-brand-dark/10 mx-auto mb-6" />
                <p className="text-brand-dark/40 font-serif text-2xl mb-4">No accommodations found</p>
                <p className="text-brand-dark/30 text-sm mb-8">Try a different category</p>
                <button
                  onClick={() => setActiveCategory('All')}
                  className="px-8 py-3 rounded-full bg-brand-dark text-white text-[10px] font-bold uppercase tracking-widest hover:bg-brand-gold transition-all"
                >
                  View All
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <AdinkraBg variant="akoma" opacity={0.03} color="#c8a96e">
      {/* ========== CATEGORIES EXPLORER ========== */}
      <RevealSection variant="slideRight" className="py-24 px-6 bg-brand-cream/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">
              Choose Your Style
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif leading-[0.9] tracking-tighter text-brand-dark">
              Find Your Perfect Stay
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {categories.filter(c => c !== 'All').map((cat, idx) => {
              const Icon = categoryIcons[cat]
              const count = STAY.filter(s => s.category === cat).length
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
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-brand-dark flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-gold transition-all duration-500">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-serif tracking-tight text-brand-dark mb-2">{cat}</h3>
                    <p className="text-brand-dark/40 text-sm font-light">{count} propert{count !== 1 ? 'ies' : 'y'}</p>
                  </div>
                  <ArrowUpRight className="absolute top-6 right-6 w-4 h-4 text-brand-dark/20 group-hover:text-brand-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </motion.button>
              )
            })}
          </div>
        </div>
      </RevealSection>
      </AdinkraBg>

      <AdinkraBg variant="aban" opacity={0.025} color="#c8a96e">
      {/* ========== TIPS ========== */}
      <RevealSection variant="fadeUp" className="py-24 px-6 bg-white border-b border-brand-dark/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-12"
          >
            {[
              {
                title: 'Luxury & Views',
                desc: 'The Royal Senchi, BridgeView Resort, Penninsula Resort, and The FLOAT offer stunning lakeside or dam views with premium amenities — ideal for special getaways.',
                icon: Crown,
              },
              {
                title: 'Mid-Range Comfort',
                desc: 'Volta Hotel, Afrikiko Riverfront, and Aylos Bay provide solid comfort and location close to the region\'s main attractions at accessible rates.',
                icon: Building2,
              },
              {
                title: 'Budget & Local Flavor',
                desc: 'Guest houses and budget lodges deliver affordable, authentic stays with local character — perfect if you plan to spend your days exploring.',
                icon: Wallet,
              },
            ].map((tip, idx) => {
              const Icon = tip.icon
              return (
                <motion.div key={tip.title} variants={fadeInUp} className="p-8 rounded-[2rem] bg-brand-cream/30 border border-brand-dark/5">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5 text-brand-gold" />
                  </div>
                  <h3 className="text-xl font-serif tracking-tight text-brand-dark mb-3">{tip.title}</h3>
                  <p className="text-brand-dark/50 text-sm font-light leading-relaxed">{tip.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </RevealSection>
      </AdinkraBg>

      <AdinkraBg variant="adinkrahene" opacity={0.04} color="#ffffff">
      {/* ========== CTA ========== */}
      <section className="relative py-32 px-6 bg-brand-dark overflow-hidden">
        <RevealSection variant="fadeUp" className="relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp}>
              <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">
                Book Your Stay
              </span>
              <h2 className="text-4xl md:text-5xl font-serif leading-[0.9] tracking-tighter text-white mb-8">
                Ready to Unwind?
              </h2>
              <p className="text-white/40 leading-relaxed font-light mb-12 max-w-lg mx-auto">
                Wake up to lake views, fall asleep to the sounds of nature — your perfect
                Asuogyaman escape is just a click away.
              </p>
              <button
                onClick={() => navigate('/map')}
                className="group inline-flex items-center gap-3 bg-brand-gold text-brand-dark px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.25em] hover:shadow-2xl hover:shadow-brand-gold/30 transition-all"
              >
                <MapPin className="w-4 h-4" />
                Explore on Map
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        </RevealSection>
      </section>
      </AdinkraBg>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedStay && (
          <DetailPanel item={selectedStay} type="stay" onClose={() => setSelectedStay(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
