import { useState, useRef, useMemo, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import { BUSINESS } from '../data'
import ImageCard from '../components/ui/image-card'
import RevealSection from '../components/animations/reveal-section'
import AdinkraBg from '../components/ui/adinkra-bg'
import AnimatedCounter from '../components/ui/animated-counter'
import { useNavigate } from 'react-router-dom'
import { Settings, Truck, Factory, Sprout, Compass, Hotel, ShoppingBag, Star, MapPin, ChevronRight, ArrowUpRight, Sparkles, TrendingUp, Users, Globe, Briefcase, Building2 } from 'lucide-react'

const categoryIcons: Record<string, typeof Settings> = {
  Services: Settings,
  Transport: Truck,
  Manufacturing: Factory,
  Agriculture: Sprout,
  Tourism: Compass,
  Hospitality: Hotel,
  Retail: ShoppingBag,
}

const industryDescriptions: Record<string, string> = {
  Services: 'Essential infrastructure and professional services powering the district',
  Transport: 'Logistics and connectivity across the Volta Lake region',
  Manufacturing: 'Industrial production and value-added processing',
  Agriculture: 'Farming, aquaculture, and agro-processing at scale',
  Tourism: 'Hospitality and travel services welcoming global visitors',
  Hospitality: 'Accommodation and dining at world-class standards',
  Retail: 'Commerce and trade serving local communities',
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}

const categories = ['All', 'Agriculture', 'Manufacturing', 'Services', 'Transport', 'Tourism', 'Hospitality', 'Retail']

export default function Business() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const carouselRef = useRef<HTMLDivElement>(null)
  const filteredBusiness = useMemo(() =>
    activeCategory === 'All'
      ? BUSINESS
      : BUSINESS.filter((b) => b.category === activeCategory),
  [activeCategory])

  const topRated = useMemo(() =>
    [...BUSINESS].sort((a, b) => (b.rating || 0) - (a.rating || 0))[0],
  [])

  const featured = BUSINESS.find(b => b.rating === (topRated?.rating || 0)) || BUSINESS[0]

  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const carouselContainerRef = useRef<HTMLDivElement>(null)

  const scrollCarousel = useCallback((direction: 'left' | 'right') => {
    if (!carouselRef.current) return
    const scroll = direction === 'left' ? -400 : 400
    carouselRef.current.scrollBy({ left: scroll, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (!isAutoScrolling) return
    const interval = setInterval(() => {
      if (!carouselRef.current) return
      const el = carouselRef.current
      const maxScroll = el.scrollWidth - el.clientWidth
      const nextPos = el.scrollLeft + 1.5
      if (nextPos >= maxScroll) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollLeft = nextPos
      }
    }, 30)
    return () => clearInterval(interval)
  }, [isAutoScrolling])

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
                src="/Images/ghana-business-bg.jpg"
                alt="Asuogyaman Business"
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
                  <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-brand-gold">Enterprise Directory</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif text-white leading-[0.95] tracking-tighter mb-4">
                  Business<br />
                  <span className="text-brand-gold">Directory</span>
                </h3>
                <p className="text-white/50 text-sm font-light max-w-md leading-relaxed">
                  Discover the enterprises powering Asuogyaman's economy.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT — Content panel */}
          <div className="relative flex items-center bg-white">
            <div className="px-10 lg:px-20 py-20 max-w-xl">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}>
                <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">
                  Explore Enterprises
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[0.9] tracking-tighter text-brand-dark mb-8">
                  {BUSINESS.length} Enterprises
                </h1>
                <p className="text-brand-dark/50 text-base font-light leading-relaxed mb-12 max-w-md">
                  From the monumental Volta River Authority to innovative agribusinesses — discover the enterprises powering Asuogyaman's economy.
                </p>
                <div className="flex flex-wrap gap-8 md:gap-12">
                  {[
                    { label: 'Enterprises', value: BUSINESS.length },
                    { label: 'Sectors', value: 7 },
                    { label: 'Top Rated', value: topRated?.rating || 0 },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-2xl md:text-3xl font-serif text-brand-gold tracking-tight">
                        {typeof stat.value === 'number' ? (
                          <><AnimatedCounter value={stat.value} />
                            {stat.label === 'Top Rated' && <Star className="inline w-4 h-4 ml-1.5 text-brand-gold fill-brand-gold -mt-2" />}
                          </>
                        ) : (stat.value)}
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

      {/* ========== FEATURED ENTERPRISE SPOTLIGHT ========== */}
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
                  {featured.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="px-4 py-2 bg-brand-gold/5 border border-brand-gold/10 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold text-brand-gold flex items-center gap-2">
                    <Briefcase className="w-3 h-3" />
                    {featured.category}
                  </span>
                  {featured.location && (
                    <span className="px-4 py-2 bg-brand-dark/5 border border-brand-dark/10 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold text-brand-dark/50 flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      {featured.location}
                    </span>
                  )}
                  {featured.contact && (
                    <span className="px-4 py-2 bg-brand-dark/5 border border-brand-dark/10 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold text-brand-dark/50 flex items-center gap-2">
                      {featured.contact}
                    </span>
                  )}
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="relative">
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/10 group">
                  <img
                    src={featured.image}
                    alt={featured.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-brand-dark/60" />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-xl px-4 py-1.5 rounded-full text-[8px] uppercase tracking-[0.25em] font-bold text-brand-dark flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-brand-gold" />
                      Featured Enterprise
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
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide py-4">
            {categories.map((cat) => {
              const Icon = cat !== 'All' ? categoryIcons[cat] : Building2
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
      </section>

      {/* ========== ENTERPRISE SHOWCASE ========== */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredBusiness.length > 0 ? (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-3xl font-serif tracking-tight text-brand-dark">
                      {activeCategory === 'All' ? 'All Enterprises' : activeCategory}
                    </h2>
                    <p className="text-brand-dark/40 text-sm font-light mt-1">
                      {filteredBusiness.length} entit{filteredBusiness.length === 1 ? 'y' : 'ies'}
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <button
                      onClick={() => scrollCarousel('left')}
                      className="w-10 h-10 rounded-full border border-brand-dark/10 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-all"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" />
                    </button>
                    <button
                      onClick={() => scrollCarousel('right')}
                      className="w-10 h-10 rounded-full border border-brand-dark/10 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div
                  ref={carouselContainerRef}
                  onMouseEnter={() => setIsAutoScrolling(false)}
                  onMouseLeave={() => setIsAutoScrolling(true)}
                  className="relative"
                >
                  <div
                    ref={carouselRef}
                    className="overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6"
                  >
                    <div className="flex gap-8 w-max">
                        {filteredBusiness.map((item, idx) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                            className="flex-shrink-0 w-[55vw] max-w-[520px] h-[65vh] max-h-[500px]"
                          >
                            <ImageCard
                              image={item.image}
                              name={item.name}
                              description={item.description}
                              category={item.category}
                              variant="business"
                              rating={item.rating}
                              location={item.location}
                              contact={item.contact}
                              index={idx}
                              total={filteredBusiness.length}
                            />
                          </motion.div>
                        ))}
                    </div>
                  </div>

                  {/* Auto-scroll indicator */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isAutoScrolling ? 'bg-brand-gold' : 'bg-brand-dark/10'}`} />
                    <span className="text-[7px] uppercase tracking-[0.3em] text-brand-dark/20 font-bold">
                      {isAutoScrolling ? 'Auto-scrolling' : 'Paused'}
                    </span>
                    <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isAutoScrolling ? 'bg-brand-gold' : 'bg-brand-dark/10'}`} />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-32"
              >
                <Building2 className="w-16 h-16 text-brand-dark/10 mx-auto mb-6" />
                <p className="text-brand-dark/40 font-serif text-2xl mb-4">No enterprises found</p>
                <p className="text-brand-dark/30 text-sm mb-8">Try a different sector</p>
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

      {/* ========== INDUSTRY EXPLORER ========== */}
      <AdinkraBg variant="akoma" opacity={0.03} color="#c8a96e">
      <section className="py-24 px-6 bg-brand-cream/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">
              Explore by Sector
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif leading-[0.9] tracking-tighter text-brand-dark">
              Industries Driving Growth
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.filter(c => c !== 'All').map((cat, idx) => {
              const Icon = categoryIcons[cat]
              const count = BUSINESS.filter(b => b.category === cat).length
              return (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  onClick={() => {
                    setActiveCategory(cat)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="group relative p-6 rounded-[2rem] bg-white border border-brand-dark/5 text-left hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-brand-dark flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-brand-gold transition-all duration-500">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-serif tracking-tight text-brand-dark mb-1">{cat}</h3>
                    <p className="text-brand-dark/40 text-xs font-light leading-relaxed line-clamp-2 mb-3">
                      {industryDescriptions[cat]}
                    </p>
                    <p className="text-brand-gold text-[10px] font-bold uppercase tracking-wider">
                      {count} entit{count === 1 ? 'y' : 'ies'}
                    </p>
                  </div>
                  <ArrowUpRight className="absolute top-5 right-5 w-4 h-4 text-brand-dark/20 group-hover:text-brand-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>
      </AdinkraBg>

      {/* ========== WHY INVEST ========== */}
      <AdinkraBg variant="aban" opacity={0.025} color="#c8a96e">
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <RevealSection variant="fadeUp">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">
                Economic Opportunity
              </span>
              <h2 className="text-4xl md:text-5xl font-serif leading-[0.9] tracking-tighter text-brand-dark mb-6">
                Why Asuogyaman?
              </h2>
              <p className="text-brand-dark/50 text-sm font-light max-w-2xl mx-auto leading-relaxed">
                The Asuogyaman District is a strategic economic corridor with unmatched access
                to energy, water, transport routes, and a growing skilled workforce.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  icon: TrendingUp,
                  title: 'Strategic Location',
                  desc: 'Situated along the Volta Lake with direct access to the Akosombo Dam hydroelectric power, major road networks, and proximity to Accra. Ideal for manufacturing, logistics, and energy-intensive industries.',
                },
                {
                  icon: Users,
                  title: 'Skilled Workforce',
                  desc: 'Home to a growing pool of talent supported by local educational institutions, technical training centres, and a strong tradition of engineering excellence dating back to the construction of the Akosombo Dam.',
                },
                {
                  icon: Globe,
                  title: 'Export Potential',
                  desc: 'With established agricultural exports (tilapia, cassava products), manufacturing capacity, and tourism infrastructure, Asuogyaman businesses are well-positioned for regional and international markets.',
                },
              ].map((pillar, idx) => {
                const Icon = pillar.icon
                return (
                  <motion.div key={pillar.title} variants={fadeInUp} className="p-8 rounded-[2rem] bg-brand-cream/30 border border-brand-dark/5">
                    <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-brand-gold" />
                    </div>
                    <h3 className="text-xl font-serif tracking-tight text-brand-dark mb-4">{pillar.title}</h3>
                    <p className="text-brand-dark/50 text-sm font-light leading-relaxed">{pillar.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
          </RevealSection>
        </div>
      </section>
      </AdinkraBg>

      {/* ========== CTA ========== */}
      <AdinkraBg variant="adinkrahene" opacity={0.04} color="#ffffff">
      <section className="relative py-32 px-6 bg-brand-dark overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <motion.div variants={fadeInUp}>
            <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">
              Invest & Partner
            </span>
            <h2 className="text-4xl md:text-5xl font-serif leading-[0.9] tracking-tighter text-white mb-8">
              Grow With Asuogyaman
            </h2>
            <p className="text-white/40 leading-relaxed font-light mb-12 max-w-lg mx-auto">
              Whether you're looking to invest, partner, or source products, the enterprises
              of Asuogyaman offer unmatched opportunities in Ghana's Eastern Region.
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
      </section>
      </AdinkraBg>
    </div>
  )
}
