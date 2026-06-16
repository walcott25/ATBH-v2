import { useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import { BUSINESS } from '../data'
import { Link, useNavigate } from 'react-router-dom'
import GlassCard from '../components/ui/glass-card'
import AnimatedCounter from '../components/ui/animated-counter'
import AnimatedSection from '../components/animations/animated-section'
import RevealSection from '../components/animations/reveal-section'
import { FloatingOrbs } from '../components/ui/floating-orbs'
import {
  Star, Search, X, Compass, ArrowRight, Sparkles, MapPin, Phone, Mail, ExternalLink,
  Building2, Store, Truck, Wrench, Factory, Hotel, TrendingUp, Shield, Globe, Users,
  ChevronRight
} from 'lucide-react'

const easeOut = [0.25, 0.1, 0.25, 1] as const

const categoryConfig: Record<string, { icon: typeof Building2; color: string }> = {
  'Agriculture': { icon: Factory, color: 'text-emerald-400' },
  'Manufacturing': { icon: Wrench, color: 'text-sky-400' },
  'Services': { icon: Store, color: 'text-blue-400' },
  'Transport': { icon: Truck, color: 'text-amber-400' },
  'Tourism': { icon: Compass, color: 'text-rose-400' },
  'Hospitality': { icon: Hotel, color: 'text-purple-400' },
  'Retail': { icon: Building2, color: 'text-cyan-400' },
}

const categories = ['All', ...Object.keys(categoryConfig)]

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

export default function Business() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroImgY = useTransform(heroScroll, [0, 1], ['0%', '25%'])
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0])
  const heroScale = useTransform(heroScroll, [0, 0.8], [1, 0.95])

  const filtered = useMemo(() =>
    BUSINESS
      .filter((b) => {
        if (activeCategory !== 'All' && b.category !== activeCategory) return false
        if (searchQuery) {
          const q = searchQuery.toLowerCase()
          return b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q) ||
            (b.location && b.location.toLowerCase().includes(q))
        }
        return true
      }),
    [activeCategory, searchQuery]
  )

  return (
    <div className="min-h-screen bg-bg">
      {/* HERO */}
      <section ref={heroRef} className="relative h-dvh flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroImgY }}>
          <img src="/Images/hero-business.jpg" alt="Asuogyaman business directory"
            className="absolute inset-0 w-full h-full object-cover block max-w-none" style={{ height: '100%' }} fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-b from-fg/60 via-fg/40 to-fg/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" style={{ mixBlendMode: 'soft-light' }} />
        </motion.div>
        <FloatingOrbs />
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative z-10 text-center px-5 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium tracking-widest uppercase text-white/70 border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
              <Sparkles className="w-3 h-3" /> Local Enterprise
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: easeOut }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-sans text-white font-medium tracking-tight leading-none mb-6">
            Business Directory
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5, ease: easeOut }}
            className="text-sm md:text-base text-white/60 max-w-xl mx-auto mb-10 leading-relaxed font-light">
            Discover the enterprises driving the Asuogyaman economy — from agriculture and manufacturing to tourism and transport.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7, ease: easeOut }}
            className="flex items-center justify-center gap-4 flex-wrap">
            <a href="#explore" className="group inline-flex items-center gap-2 bg-accent text-accent-fg px-6 py-3 text-sm font-medium rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30">
              Browse Directory <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
        <motion.div style={{ opacity: heroOpacity }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: easeOut }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* STATS */}
      <AnimatedSection className="py-16 px-5 relative border-b border-border/40">
        <DotGrid />
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center relative">
          <div><div className="text-3xl md:text-4xl font-medium text-fg mb-1 text-gradient"><AnimatedCounter value={BUSINESS.length} suffix="+" /></div><div className="text-xs text-muted tracking-wide">Enterprises</div></div>
          <div><div className="text-3xl md:text-4xl font-medium text-fg mb-1 text-gradient"><AnimatedCounter value={4.7} decimals={1} /></div><div className="text-xs text-muted tracking-wide">Top Rating</div></div>
          <div><div className="text-3xl md:text-4xl font-medium text-fg mb-1 text-gradient"><AnimatedCounter value={categories.length - 1} /></div><div className="text-xs text-muted tracking-wide">Sectors</div></div>
        </div>
      </AnimatedSection>

      {/* FILTER BAR */}
      <div id="explore" className="sticky top-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-7xl mx-auto px-5 py-4">
          <div className="relative flex-1 max-w-md mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
            <input type="text" placeholder="Search businesses..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface border border-border rounded-xl text-fg placeholder:text-muted/60 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all" />
            {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-fg transition-colors"><X className="w-4 h-4" /></button>}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => {
              const isActive = activeCategory === cat
              const config = categoryConfig[cat]
              const Icon = cat === 'All' ? Compass : (config?.icon || Building2)
              return (
                <motion.button key={cat} layout onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-lg border transition-all duration-200 ${
                    isActive ? 'bg-accent text-accent-fg border-accent shadow-sm shadow-accent/20' : 'bg-surface text-muted border-border hover:text-fg hover:border-fg/30'
                  }`}>
                  <Icon className={`w-3.5 h-3.5 ${isActive ? '' : (config?.color || '')}`} />{cat}
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ═══ SECTOR SPOTLIGHT ═══ */}
      <section className="py-16 md:py-20 px-5 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-4">Sector Spotlight</span>
            <h2 className="text-xl md:text-2xl font-medium text-fg tracking-tight">District Industries at a Glance</h2>
            <p className="text-xs text-muted mt-2 max-w-md mx-auto">The economic pillars driving growth across Asuogyaman.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(categoryConfig).map(([cat, config]) => {
              const Icon = config.icon
              const count = BUSINESS.filter(b => b.category === cat).length
              return (
                <button key={cat} onClick={() => { setActiveCategory(cat); document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' }) }}
                  className="group relative rounded-2xl bg-surface border border-border/60 p-5 text-left hover:border-accent/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <h3 className="text-sm font-medium text-fg mb-1">{cat}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted">{count} {count === 1 ? 'business' : 'businesses'}</span>
                    <ChevronRight className="w-3 h-3 text-muted/40 group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ WHY ASUOGYAMAN ═══ */}
      <section className="py-16 md:py-20 px-5 relative overflow-hidden bg-surface/30 border-t border-border/40">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-32 w-[500px] h-[500px] rounded-full blur-[120px] bg-accent/[0.04]" />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-4">Why Here</span>
            <h2 className="text-xl md:text-2xl font-medium text-fg tracking-tight">Why Asuogyaman?</h2>
            <p className="text-xs text-muted mt-2 max-w-md mx-auto">A strategic location for business growth in the Volta Region.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Globe, title: 'Strategic Location', desc: 'Gateway between Greater Accra and the Volta Region, with direct access to Lake Volta and the Akosombo transport corridor.', color: 'text-sky-400' },
              { icon: TrendingUp, title: 'Rapid Growth', desc: 'One of the fastest-growing districts in the Eastern Region, driven by tourism, hydroelectric power, and agriculture.', color: 'text-emerald-400' },
              { icon: Users, title: 'Skilled Workforce', desc: 'Home to multiple senior high and technical schools producing graduates ready for industry and entrepreneurship.', color: 'text-amber-400' },
              { icon: Shield, title: 'Stable Environment', desc: 'A peaceful community with strong traditional leadership, low crime, and supportive infrastructure for businesses.', color: 'text-rose-400' },
            ].map((item) => (
              <div key={item.title} className="group rounded-2xl bg-surface border border-border/60 p-6 hover:border-accent/20 transition-all duration-500">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <h3 className="text-sm font-medium text-fg mb-2">{item.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DIRECTORY GRID ═══ */}
      <section className="py-8 md:py-12 px-5 pb-24 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs text-muted">{filtered.length} {filtered.length === 1 ? 'business' : 'businesses'} found</p>
            {activeCategory !== 'All' && <button onClick={() => setActiveCategory('All')} className="text-xs text-accent hover:text-accent/80 transition-colors flex items-center gap-1"><X className="w-3 h-3" /> Clear filter</button>}
          </div>
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="text-center py-20">
                <Building2 className="w-12 h-12 text-muted/30 mx-auto mb-4" /><p className="text-sm text-muted">No businesses match your search.</p>
                <button onClick={() => { setSearchQuery(''); setActiveCategory('All') }} className="text-xs text-accent hover:text-accent/80 transition-colors mt-2">Reset filters</button>
              </motion.div>
            ) : (
              <motion.div key={`${activeCategory}-${searchQuery}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((item, i) => {
                  const config = categoryConfig[item.category]
                  const Icon = config?.icon || Building2
                  const color = config?.color || 'text-accent'
                  return (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.4, delay: i * 0.03 }}>
                      <Link to={`/business/${item.id}`} className="block h-full">
                      <GlassCard hover="shine" className="h-full">
                        <div className="relative overflow-hidden bg-surface" style={{ paddingBottom: '56%' }}>
                          <img src={item.image} alt={item.name}
                            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 block max-w-none"
                            style={{ height: '100%' }} loading={i < 4 ? 'eager' : 'lazy'} />
                          <div className="absolute inset-0 bg-gradient-to-t from-fg/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                          <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-accent/20 transition-all duration-500 pointer-events-none" />
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(197,149,74,0.12), transparent 60%)' }} />
                          <span className={`absolute top-3 left-3 md:top-4 md:left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[8px] font-semibold uppercase tracking-[0.2em] backdrop-blur-xl border border-white/10 bg-white/10 text-white/90 ${color}`}>
                            <Icon className="w-3 h-3" />{item.category}
                          </span>
                        </div>
                        <div className="p-4 md:p-5 space-y-2.5">
                          <h3 className="text-sm font-medium text-fg line-clamp-1">{item.name}</h3>
                          <p className="text-xs text-muted leading-relaxed line-clamp-2">{item.description}</p>
                          <div className="space-y-1.5 pt-1">
                            {item.location && (
                              <div className="flex items-center gap-1.5 text-[10px] text-muted">
                                <MapPin className="w-3 h-3 shrink-0" /><span>{item.location}</span>
                              </div>
                            )}
                            {item.phone && (
                              <div className="flex items-center gap-1.5 text-[10px] text-muted">
                                <Phone className="w-3 h-3 shrink-0" /><span>{item.phone}</span>
                              </div>
                            )}
                            {item.contact && !item.phone && (
                              <div className="flex items-center gap-1.5 text-[10px] text-muted">
                                <Phone className="w-3 h-3 shrink-0" /><span>{item.contact}</span>
                              </div>
                            )}
                            {item.email && (
                              <a href={`mailto:${item.email}`} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 text-[10px] text-muted hover:text-accent transition-colors">
                                <Mail className="w-3 h-3 shrink-0" /><span>Email</span>
                              </a>
                            )}
                            {item.website && (
                              <a href={item.website} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 text-[10px] text-accent hover:text-accent/80 transition-colors font-medium">
                                <ExternalLink className="w-3 h-3 shrink-0" /><span>Book</span>
                              </a>
                            )}
                            {item.rating && (
                              <div className="flex items-center gap-1.5 text-[10px]">
                                <Star className="w-3 h-3 fill-accent text-accent" /><span className="text-accent font-medium">{item.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </GlassCard>
                      </Link>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <AnimatedSection className="py-24 md:py-28 px-5 text-center relative overflow-hidden">
        <FloatingOrbs /><div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
        <div className="max-w-lg mx-auto relative">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-medium text-fg mb-3 tracking-tight">Join our business community</h2>
            <p className="text-sm text-muted mb-8 leading-relaxed">Asuogyaman is open for business. Connect with local enterprises and discover opportunities in the Volta Region's fastest-growing district.</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link to="/experience" className="group inline-flex items-center gap-2 bg-accent text-accent-fg px-7 py-3.5 text-sm font-medium rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30">
                Explore Opportunities <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </RevealSection>
        </div>
      </AnimatedSection>
    </div>
  )
}