import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { STAY } from '../data'
import type { Stay } from '../data'
import { Link } from 'react-router-dom'
import GlassCard from '../components/ui/glass-card'
import AnimatedCounter from '../components/ui/animated-counter'
import SectionDivider from '../components/ui/section-divider'
import AnimatedSection from '../components/animations/animated-section'
import RevealSection from '../components/animations/reveal-section'
import MirrorHero from '../components/ui/mirror-hero'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import {
  Star, MapPin, Search, X, SlidersHorizontal, Compass, Hotel,
  ArrowRight, Building2, Home, TreePine,
  ChevronDown, ChevronLeft, Phone, Mail, Clock, Navigation,
  Info, Sun, Quote, ExternalLink
} from 'lucide-react'

const easeOut = [0.25, 0.1, 0.25, 1] as const

const categories = [
  { label: 'All', icon: Compass, color: '' },
  { label: 'Luxury', icon: Hotel, color: 'text-amber-400' },
  { label: 'Mid-Range', icon: Building2, color: 'text-sky-400' },
  { label: 'Budget', icon: Home, color: 'text-emerald-400' },
] as const

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Rating (High)', value: 'rating-desc' },
  { label: 'Rating (Low)', value: 'rating-asc' },
  { label: 'Name (A-Z)', value: 'name-asc' },
  { label: 'Name (Z-A)', value: 'name-desc' },
] as const

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [30, 46],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})
L.Marker.prototype.options.icon = DefaultIcon

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

function getCategoryIcon(category: string) {
  switch(category) {
    case 'Luxury': return <Hotel className="w-3.5 h-3.5" />
    case 'Mid-Range': return <Building2 className="w-3.5 h-3.5" />
    case 'Budget': return <Home className="w-3.5 h-3.5" />
    default: return <MapPin className="w-3.5 h-3.5" />
  }
}

function getCategoryColor(category: string) {
  switch(category) {
    case 'Luxury': return 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    case 'Mid-Range': return 'text-sky-400 bg-sky-500/10 border-sky-500/20'
    case 'Budget': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    default: return 'text-accent bg-accent/10 border-accent/20'
  }
}

export default function StayPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<string>('featured')
  const [showSort, setShowSort] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Stay | null>(null)
  const [reviewIndex, setReviewIndex] = useState(0)



  const filtered = STAY
    .filter((s) => {
      if (activeCategory !== 'All' && s.category !== activeCategory) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      }
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating-desc': return (b.rating || 0) - (a.rating || 0)
        case 'rating-asc': return (a.rating || 0) - (b.rating || 0)
        case 'name-asc': return a.name.localeCompare(b.name)
        case 'name-desc': return b.name.localeCompare(a.name)
        default: return 0
      }
    })

  const featured = [...STAY].sort((a, b) => (b.rating || 0) - (a.rating || 0))[0]

  const reviews = [
    { user: 'Amara O.', text: 'The Royal Senchi is absolutely breathtaking. The infinity pool overlooking Lake Volta is an experience I will never forget.', rating: 5, location: 'Lagos, Nigeria' },
    { user: 'Sarah M.', text: 'BridgeView Resort has the best view of the Akosombo Dam. Waking up to that panorama is worth every cedi.', rating: 5, location: 'London, UK' },
    { user: 'Kwame A.', text: 'Volta Hotel Akosombo offers great value. Clean rooms, friendly staff, and an unbeatable location near the dam.', rating: 4, location: 'Accra, Ghana' },
    { user: 'Elena R.', text: 'Alberjah Train City Guest House is perfect for backpackers. Great atmosphere and very affordable.', rating: 4, location: 'Madrid, Spain' },
  ]

  return (
    <div className="min-h-screen bg-bg">
      <MirrorHero
        image="/Images/hero-stay.jpg"
        badge="Stay in Style"
        title="Where to Stay"
        description="From world-class lakeside resorts to cozy budget-friendly guesthouses — find your perfect stay along the Volta River."
        cta={{ label: 'Start Exploring', href: '#explore' }}
      />

      {/* ============ STATS ============ */}
      <AnimatedSection className="py-16 px-5 relative border-b border-border/40">
        <DotGrid />
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center relative">
          <div><div className="text-3xl md:text-4xl font-medium text-fg mb-1 text-gradient"><AnimatedCounter value={STAY.length} suffix="+" /></div><div className="text-xs text-muted tracking-wide">Stays</div></div>
          <div><div className="text-3xl md:text-4xl font-medium text-fg mb-1 text-gradient"><AnimatedCounter value={5.0} decimals={1} /></div><div className="text-xs text-muted tracking-wide">Top Rating</div></div>
          <div><div className="text-3xl md:text-4xl font-medium text-fg mb-1 text-gradient"><AnimatedCounter value={categories.length - 1} /></div><div className="text-xs text-muted tracking-wide">Categories</div></div>
        </div>
      </AnimatedSection>

      {/* ============ FILTER BAR ============ */}
      <div id="explore" className="sticky top-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-7xl mx-auto px-5 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
              <input type="text" placeholder="Search stays..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface border border-border rounded-xl text-fg placeholder:text-muted/60 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-fg transition-colors"><X className="w-4 h-4" /></button>}
            </div>
            <div className="relative">
              <button onClick={() => setShowSort(!showSort)} className="flex items-center gap-2 px-4 py-2.5 text-sm bg-surface border border-border rounded-xl text-muted hover:text-fg hover:border-fg/30 transition-all">
                <SlidersHorizontal className="w-4 h-4" /><span className="hidden sm:inline">{sortOptions.find((o) => o.value === sortBy)?.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSort ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>{showSort && (
                <motion.div initial={{ opacity: 0, y: -4, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -4, scale: 0.96 }} transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-xl shadow-xl shadow-black/5 overflow-hidden z-50">
                  {sortOptions.map((opt) => (
                    <button key={opt.value} onClick={() => { setSortBy(opt.value); setShowSort(false) }}
                      className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${sortBy === opt.value ? 'text-accent bg-accent/5 font-medium' : 'text-muted hover:text-fg hover:bg-bg'}`}>{opt.label}</button>
                  ))}
                </motion.div>
              )}</AnimatePresence>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap mt-4">
            {categories.map((cat) => (
              <motion.button key={cat.label} layout onClick={() => setActiveCategory(cat.label)}
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-lg border transition-all duration-200 ${
                  activeCategory === cat.label ? 'bg-accent text-accent-fg border-accent shadow-sm shadow-accent/20' : 'bg-surface text-muted border-border hover:text-fg hover:border-fg/30'
                }`}>
                <cat.icon className={`w-3.5 h-3.5 ${activeCategory === cat.label ? '' : cat.color || 'text-muted'}`} />{cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ============ FEATURED ============ */}
      {activeCategory === 'All' && !searchQuery && (
        <AnimatedSection className="py-12 md:py-16 px-5 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <RevealSection>
              <div className="flex items-end justify-between mb-6">
                <div><span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-accent mb-2 block">Featured</span><h2 className="text-xl md:text-2xl font-medium text-fg tracking-tight">Top-Rated Stay</h2></div>
              </div>
            </RevealSection>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: easeOut }}
              className="group cursor-pointer" onClick={() => setSelectedItem(featured)}>
              <div className="relative overflow-hidden rounded-2xl bg-surface border border-border/60 group-hover:border-accent/20 transition-all duration-500 aspect-[21/9] md:aspect-[3/1]">
                <img src={featured.image} alt={featured.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 block max-w-none" style={{ height: '100%' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-fg/90 via-fg/20 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-accent/20 rounded-2xl transition-all duration-500 pointer-events-none" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(197,149,74,0.15), transparent 60%)' }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                  <div className="absolute -inset-full top-0 -left-full w-full h-full group-hover:left-full transition-all duration-1000" style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.08) 45%, transparent 55%)' }} />
                </div>
                <span className="absolute top-4 left-4 md:top-6 md:left-6 px-3 py-1 rounded-full text-[9px] font-semibold uppercase tracking-[0.2em] backdrop-blur-xl border border-white/10 bg-white/10 text-white/90 inline-flex items-center gap-1.5">
                  {getCategoryIcon(featured.category)}{featured.category}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                  <h3 className="text-xl md:text-3xl font-medium text-white tracking-tight mb-2 group-hover:translate-y-[-2px] transition-transform duration-300">{featured.name}</h3>
                  <p className="text-xs md:text-sm text-white/60 max-w-xl leading-relaxed line-clamp-2">{featured.description}</p>
                  <div className="flex items-center gap-3 mt-3 md:mt-4">
                    <div className="flex items-center gap-1 bg-accent/15 backdrop-blur-xl px-2.5 py-1 rounded-full"><Star className="w-3 h-3 fill-accent text-accent" /><span className="text-[10px] font-semibold text-accent">{featured.rating}</span></div>
                    <span className="text-[10px] text-white/40 font-medium tracking-wider flex items-center gap-1"><ArrowRight className="w-3 h-3" /> View Details</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      )}

      {/* ============ GRID ============ */}
      <section className="py-8 md:py-12 px-5 pb-24 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs text-muted">{filtered.length} {filtered.length === 1 ? 'stay' : 'stays'} found</p>
            {activeCategory !== 'All' && <button onClick={() => setActiveCategory('All')} className="text-xs text-accent hover:text-accent/80 transition-colors flex items-center gap-1"><X className="w-3 h-3" /> Clear filter</button>}
          </div>
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="text-center py-20">
                <Hotel className="w-12 h-12 text-muted/30 mx-auto mb-4" /><p className="text-sm text-muted">No stays match your search.</p>
                <button onClick={() => { setSearchQuery(''); setActiveCategory('All') }} className="text-xs text-accent hover:text-accent/80 transition-colors mt-2">Reset filters</button>
              </motion.div>
            ) : (
              <motion.div key={`${activeCategory}-${searchQuery}-${sortBy}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((item, i) => <StayCard key={item.id} item={item} index={i} onClick={() => setSelectedItem(item)} />)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ============ CATEGORY SHOWCASES ============ */}
      {activeCategory === 'All' && !searchQuery && (
        <>
          {categories.slice(1).map((cat) => {
            const items = STAY.filter((s) => s.category === cat.label)
            if (items.length === 0) return null
            return (
              <AnimatedSection key={cat.label} className="py-16 md:py-20 px-5 relative overflow-hidden">
                <SectionDivider label={cat.label} className="mb-8" />
                <div className="max-w-7xl mx-auto relative">
                  <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-[0.04] pointer-events-none">
                    <img src={cat.label === 'Luxury' ? '/Images/category-engineering.jpg' : cat.label === 'Mid-Range' ? '/Images/category-nature.jpg' : '/Images/category-culture.jpg'} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <RevealSection>
                    <div className="flex items-end justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.color ? `bg-${cat.color.split(' ')[0].replace('text-', '')}/10 border-${cat.color.split(' ')[0].replace('text-', '')}/20` : 'bg-accent/10 border-accent/20'} border`}>
                          <cat.icon className={`w-5 h-5 ${cat.color || 'text-accent'}`} />
                        </div>
                        <div><h2 className="text-lg md:text-xl font-medium text-fg tracking-tight">{cat.label}</h2><p className="text-[10px] text-muted">{items.length} {items.length === 1 ? 'stay' : 'stays'}</p></div>
                      </div>
                      <button onClick={() => setActiveCategory(cat.label)} className="text-[10px] font-medium text-accent hover:text-accent/80 transition-colors flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></button>
                    </div>
                  </RevealSection>
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-5 px-5 snap-x snap-mandatory">
                    {items.map((item, i) => (
                      <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="snap-start shrink-0 w-[300px] sm:w-[340px]">
                        <div className="group cursor-pointer h-full" onClick={() => setSelectedItem(item)}>
                          <GlassCard hover="glow" className="h-full">
                            <div className="relative overflow-hidden bg-surface" style={{ paddingBottom: '66%' }}>
                              <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 block max-w-none" style={{ height: '100%' }} loading="lazy" />
                              <div className="absolute inset-0 bg-gradient-to-t from-fg/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                              <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-accent/20 transition-all duration-500 pointer-events-none" />
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(197,149,74,0.12), transparent 60%)' }} />
                            </div>
                            <div className="p-5 space-y-2.5">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0"><h3 className="text-sm font-medium text-fg group-hover:text-accent transition-colors duration-300">{item.name}</h3>
                                  <div className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest ${cat.color}`}>{getCategoryIcon(item.category)}{item.category}</div>
                                </div>
                                {item.rating && (
                                  <div className="flex items-center gap-1 shrink-0 bg-accent/5 px-2 py-0.5 rounded-full"><Star className="w-3 h-3 fill-accent text-accent" /><span className="text-[10px] font-medium text-accent">{item.rating}</span></div>
                                )}
                              </div>
                              <p className="text-xs text-muted leading-relaxed line-clamp-2">{item.description}</p>
                            </div>
                          </GlassCard>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </>
      )}

      {/* ============ REVIEWS ============ */}
      <AnimatedSection className="py-20 md:py-24 px-5 relative overflow-hidden bg-surface/50">
        <FloatingOrbs /><SectionDivider label="Reviews" className="mb-8" />
        <div className="max-w-3xl mx-auto text-center relative">
          <RevealSection>
            <h2 className="text-xl md:text-2xl font-medium text-fg tracking-tight mb-2">What Guests Say</h2>
            <p className="text-xs text-muted mb-10 max-w-md mx-auto">Real experiences from travellers who have stayed across Asuogyaman.</p>
          </RevealSection>
          <div className="relative min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div key={reviewIndex} initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }} transition={{ duration: 0.4, ease: easeOut }} className="space-y-6">
                <Quote className="w-8 h-8 text-accent/20 mx-auto" />
                <p className="text-base md:text-lg text-fg leading-relaxed italic">&ldquo;{reviews[reviewIndex].text}&rdquo;</p>
                <div><div className="flex items-center justify-center gap-1 mb-2">{Array.from({ length: reviews[reviewIndex].rating }).map((_, i) => (<Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />))}</div>
                  <div className="text-sm text-muted font-medium">&mdash; {reviews[reviewIndex].user}</div><div className="text-[10px] text-muted/60">{reviews[reviewIndex].location}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-center gap-2 mt-8">{reviews.map((_, i) => (<button key={i} onClick={() => setReviewIndex(i)} className={`h-1.5 rounded-full transition-all duration-500 ${i === reviewIndex ? 'w-6 bg-accent' : 'w-1.5 bg-border hover:bg-muted'}`} />))}</div>
        </div>
      </AnimatedSection>

      {/* ============ CTA ============ */}
      <AnimatedSection className="py-24 md:py-28 px-5 text-center relative overflow-hidden">
        <FloatingOrbs /><div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
        <div className="max-w-lg mx-auto relative">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-medium text-fg mb-3 tracking-tight">Ready to book your stay?</h2>
            <p className="text-sm text-muted mb-8 leading-relaxed">From luxury lakeside resorts to charming budget guesthouses — find the perfect home base for your Asuogyaman adventure.</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link to="/experience" className="group inline-flex items-center gap-2 bg-accent text-accent-fg px-7 py-3.5 text-sm font-medium rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30">
                Plan Your Stay <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </RevealSection>
        </div>
      </AnimatedSection>

      {/* ============ DETAIL PANEL ============ */}
      <AnimatePresence>
        {selectedItem && <StayDetailPanel item={selectedItem} onClose={() => setSelectedItem(null)} onNavigate={(id) => { const next = STAY.find((s) => s.id === id); if (next) setSelectedItem(next) }} />}
      </AnimatePresence>
    </div>
  )
}

// ---------- 3D Tilt Card ----------

function StayCard({ item, index, onClick }: { item: Stay; index: number; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0); const [rotateY, setRotateY] = useState(0)
  const [glowX, setGlowX] = useState(50); const [glowY, setGlowY] = useState(50)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return; const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left; const y = e.clientY - rect.top
    setRotateX((y - rect.height / 2) / 20); setRotateY((rect.width / 2 - x) / 20)
    setGlowX((x / rect.width) * 100); setGlowY((y / rect.height) * 100)
  }, [])
  const handleMouseLeave = useCallback(() => { setRotateX(0); setRotateY(0); setGlowX(50); setGlowY(50) }, [])

  const catColor = item.category === 'Luxury' ? 'text-amber-400' : item.category === 'Mid-Range' ? 'text-sky-400' : 'text-emerald-400'

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.4, delay: index * 0.03 }}>
      <motion.div ref={cardRef} onClick={onClick} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="group cursor-pointer" style={{ perspective: '1000px' }}>
        <motion.div className="relative overflow-hidden rounded-2xl bg-surface border border-border/60 group-hover:border-accent/20 transition-all duration-500"
          style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`, transformStyle: 'preserve-3d' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
          <div className="relative overflow-hidden" style={{ paddingBottom: '66%' }}>
            <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 block max-w-none" style={{ height: '100%' }} loading={index < 4 ? 'eager' : 'lazy'} />
            <div className="absolute inset-0 bg-gradient-to-t from-fg/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-accent/20 transition-all duration-500 pointer-events-none rounded-2xl" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(197,149,74,0.2), transparent 60%)` }} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
              <div className="absolute -inset-full top-0 -left-full w-full h-full group-hover:left-full transition-all duration-1000" style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.08) 45%, transparent 55%)' }} />
            </div>
            <span className="absolute top-3 left-3 md:top-4 md:left-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[8px] font-semibold uppercase tracking-[0.2em] backdrop-blur-xl border border-white/10 bg-white/10 text-white/90">
              {getCategoryIcon(item.category)}{item.category}
            </span>
            {item.rating && <div className="absolute top-3 right-3 md:top-4 md:right-4 flex items-center gap-1 bg-black/40 backdrop-blur-xl px-2 py-0.5 rounded-full"><Star className="w-2.5 h-2.5 fill-accent text-accent" /><span className="text-[9px] font-semibold text-accent">{item.rating}</span></div>}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-medium px-4 py-2 rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">View Details</span>
            </div>
          </div>
          <div className="p-4 md:p-5 space-y-2" style={{ transform: 'translateZ(20px)' }}>
            <h3 className="text-sm font-medium text-fg group-hover:text-accent transition-colors duration-300 line-clamp-1">{item.name}</h3>
            <p className="text-xs text-muted leading-relaxed line-clamp-2">{item.description}</p>
            {(item.phone || item.email || item.bookingUrl) && (
              <div className="flex items-center gap-2 pt-0.5">
                {item.phone && <a href={`tel:${item.phone}`} onClick={(e) => e.stopPropagation()} className="text-[10px] text-muted hover:text-accent transition-colors flex items-center gap-1" title={item.phone}><Phone className="w-3 h-3" /></a>}
                {item.email && <a href={`mailto:${item.email}`} onClick={(e) => e.stopPropagation()} className="text-[10px] text-muted hover:text-accent transition-colors flex items-center gap-1" title={item.email}><Mail className="w-3 h-3" /></a>}
                {item.bookingUrl && <a href={item.bookingUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-[10px] text-accent hover:text-accent/80 transition-colors flex items-center gap-1 font-medium" title="Book online"><ExternalLink className="w-3 h-3" /><span>Book</span></a>}
              </div>
            )}
            <div className="flex items-center justify-between pt-1"><span className={`text-[9px] font-semibold uppercase tracking-widest ${catColor}`}>{item.category}</span>
              <span className="text-[10px] text-muted/60 flex items-center gap-1 group-hover:text-accent/60 transition-colors"><ArrowRight className="w-3 h-3" />Explore</span></div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ---------- Detail Panel ----------

function StayDetailPanel({ item, onClose, onNavigate }: { item: Stay; onClose: () => void; onNavigate: (id: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: scrollRef })
  const heroParallax = useTransform(scrollYProgress, [0, 0.3], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.6])

  const currentIndex = STAY.findIndex((s) => s.id === item.id)
  const prevId = currentIndex > 0 ? STAY[currentIndex - 1].id : null
  const nextId = currentIndex < STAY.length - 1 ? STAY[currentIndex + 1].id : null

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0 }, [item.id])

  const highlights = item.amenities?.slice(0, 5) || ['Great location', 'Comfortable rooms', 'Friendly staff', 'Good value', 'Clean facilities']
  const visitingTips = [
    { icon: Sun, label: 'Check-in', value: 'Standard check-in from 14:00. Early check-in may be available on request.' },
    { icon: Clock, label: 'Category', value: `${item.category} — ${item.description.split('.')[0]}` },
    { icon: Phone, label: 'Contact', value: item.phone || 'Contact property for reservations' },
    { icon: Navigation, label: 'Location', value: item.coordinates ? `${item.coordinates[0].toFixed(3)}, ${item.coordinates[1].toFixed(3)}` : 'Asuogyaman District' },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-[400]">
      <motion.div onClick={onClose} className="fixed inset-0 bg-brand-dark" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} />
      <div ref={scrollRef} className="relative z-10 h-full overflow-y-auto overflow-x-hidden scrollbar-hide">
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <motion.button initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} transition={{ duration: 0.5, delay: 0.3 }} onClick={onClose}
          className="fixed top-8 right-8 z-30 w-12 h-12 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center hover:bg-white/20 transition-all group shadow-xl shadow-black/20 border border-white/10">
          <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
        </motion.button>

        {/* Hero */}
        <div className="relative h-[70vh] min-h-[520px] overflow-hidden">
          <motion.img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover block max-w-none" style={{ y: heroParallax, scale: 1.1, height: '100%' }} />
          <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 bg-brand-dark/70" />
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.14, 0.08] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brand-gold rounded-full blur-[100px] pointer-events-none" />
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.08, 0.04] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] bg-brand-gold rounded-full blur-[80px] pointer-events-none" />
          <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} onClick={onClose}
            className="absolute top-8 left-8 z-20 flex items-center gap-2.5 text-white/60 hover:text-white bg-white/10 backdrop-blur-2xl border border-white/10 px-5 py-2.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold transition-all hover:bg-white/20 hover:border-white/20 shadow-xl shadow-black/10">
            <ChevronLeft className="w-3.5 h-3.5" /> Back
          </motion.button>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="absolute top-8 right-8 md:right-28 z-20">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-2xl border border-white/10 px-5 py-2.5 rounded-full text-[9px] uppercase tracking-[0.25em] font-black text-white/80 shadow-xl shadow-black/10">
              <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" /> {item.category}
            </span>
          </motion.div>
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-16 pb-8 md:pb-12 lg:pb-20">
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}>
                <div className="flex flex-wrap items-center gap-4 mb-5">
                  <span className="text-brand-gold text-[10px] uppercase tracking-[0.35em] font-bold">Premium Accommodation</span>
                  {item.rating && <div className="flex items-center gap-1.5 bg-brand-gold/20 backdrop-blur-xl border border-brand-gold/30 px-3 py-1 rounded-full"><Star className="w-3 h-3 fill-brand-gold text-brand-gold" /><span className="text-[10px] font-black text-brand-gold">{item.rating}</span></div>}
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif text-white leading-[0.88] tracking-tighter max-w-4xl drop-shadow-2xl">{item.name}</h1>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="relative z-20 -mt-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12" style={{ minHeight: 'calc(100dvh - 70vh + 4rem)' }}>
            <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: easeOut }}
              className="relative bg-brand-dark/70 backdrop-blur-sm border border-white/[0.08] rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-8 lg:p-12 mb-8 overflow-hidden shadow-2xl shadow-black/20">
              <div className="absolute top-0 left-12 right-12 h-[1px] bg-brand-gold/30" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/[0.04] rounded-full blur-[100px] pointer-events-none" />
              <div className="flex items-start gap-6 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center shrink-0 ring-1 ring-brand-gold/20"><Hotel className="w-6 h-6 text-brand-gold" /></div>
                <div><h2 className="text-2xl font-serif text-white tracking-tight mb-1">About</h2><div className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold">Discover the details</div></div>
              </div>
              <p className="text-white/70 text-base md:text-lg leading-[1.8] font-light">{item.longDescription || item.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
                <div className="text-center p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]"><div className="text-white/40 text-[9px] uppercase tracking-[0.25em] font-bold mb-2">Category</div><div className="text-sm font-medium text-accent">{item.category}</div></div>
                <div className="text-center p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]"><div className="text-white/40 text-[9px] uppercase tracking-[0.25em] font-bold mb-2">Rating</div><div className="text-sm font-medium text-brand-gold flex items-center justify-center gap-1"><Star className="w-4 h-4 fill-brand-gold" />{item.rating || 'N/A'}</div></div>
                <div className="text-center p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]"><div className="text-white/40 text-[9px] uppercase tracking-[0.25em] font-bold mb-2">Location</div><div className="text-sm font-medium text-white/80">Volta Region</div></div>
                <div className="text-center p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]"><div className="text-white/40 text-[9px] uppercase tracking-[0.25em] font-bold mb-2">Contact</div><div className="text-sm font-medium text-white/80 truncate">{item.phone || 'N/A'}</div></div>
              </div>
            </motion.div>

            {/* Highlights */}
            {highlights.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-8">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center ring-1 ring-brand-gold/20"><Star className="w-6 h-6 text-brand-gold" /></div>
                  <div><h2 className="text-2xl font-serif text-white tracking-tight">Amenities</h2><p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold mt-1">What&apos;s included</p></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {highlights.map((h, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-brand-gold shrink-0" /><span className="text-sm text-white/70">{h}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Contact */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }} className="mb-8">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center ring-1 ring-brand-gold/20"><Info className="w-6 h-6 text-brand-gold" /></div>
                <div><h2 className="text-2xl font-serif text-white tracking-tight">Contact &amp; Location</h2><p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold mt-1">Get in touch</p></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {item.phone && <a href={`tel:${item.phone}`} className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0 ring-1 ring-brand-gold/20"><Phone className="w-5 h-5 text-brand-gold" /></div>
                  <div className="min-w-0"><div className="text-[9px] uppercase tracking-[0.25em] font-bold text-white/40 mb-1">Phone</div><div className="text-sm text-white/70">{item.phone}</div></div>
                </a>}
                {item.email && <a href={`mailto:${item.email}`} className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0 ring-1 ring-brand-gold/20"><Mail className="w-5 h-5 text-brand-gold" /></div>
                  <div className="min-w-0"><div className="text-[9px] uppercase tracking-[0.25em] font-bold text-white/40 mb-1">Email</div><div className="text-sm text-white/70 truncate">{item.email}</div></div>
                </a>}
                {item.bookingUrl && <a href={item.bookingUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-5 rounded-xl bg-brand-gold/[0.08] border border-brand-gold/20 hover:bg-brand-gold/[0.12] transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center shrink-0 ring-1 ring-brand-gold/30"><ExternalLink className="w-5 h-5 text-brand-gold" /></div>
                  <div className="min-w-0"><div className="text-[9px] uppercase tracking-[0.25em] font-bold text-brand-gold/60 mb-1">Book Online</div><div className="text-sm text-brand-gold">Book Now</div></div>
                </a>}
                {item.coordinates && <a href={`https://www.google.com/maps/dir/?api=1&destination=${item.coordinates[0]},${item.coordinates[1]}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0 ring-1 ring-brand-gold/20"><Navigation className="w-5 h-5 text-brand-gold" /></div>
                  <div className="min-w-0"><div className="text-[9px] uppercase tracking-[0.25em] font-bold text-white/40 mb-1">Directions</div><div className="text-sm text-white/70">Open in Google Maps</div></div>
                </a>}
              </div>
            </motion.div>

            {/* Map */}
            {item.coordinates && (
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                className="h-[300px] rounded-[2rem] overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/20 relative group mb-8">
                <MapContainer center={item.coordinates} zoom={15} scrollWheelZoom={true} className="h-full w-full" zoomControl={false}>
                  <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={item.coordinates}><Popup><div className="text-sm font-medium">{item.name}</div></Popup></Marker>
                </MapContainer>
                <div className="absolute top-4 left-4 z-10 bg-brand-dark/60 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full text-[9px] uppercase tracking-[0.25em] font-bold text-white/60">
                  <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-brand-gold" />Location</span>
                </div>
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between my-12">
              <div>{prevId && <button onClick={() => onNavigate(prevId)} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs uppercase tracking-[0.2em] font-medium"><ChevronLeft className="w-4 h-4" />Previous</button>}</div>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onClose}
                className="inline-flex items-center gap-3 bg-brand-dark/60 backdrop-blur-sm border border-white/[0.08] text-white/60 hover:text-white px-10 py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold transition-all hover:bg-brand-dark/80 hover:border-white/20 shadow-xl shadow-black/10">
                <X className="w-3.5 h-3.5" /> Close
              </motion.button>
              <div>{nextId && <button onClick={() => onNavigate(nextId)} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs uppercase tracking-[0.2em] font-medium">Next<ChevronLeft className="w-4 h-4 rotate-180" /></button>}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
