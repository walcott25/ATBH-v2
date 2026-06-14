import { useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import { SCHOOLS } from '../data'
import type { School } from '../data'
import GlassCard from '../components/ui/glass-card'
import AnimatedCounter from '../components/ui/animated-counter'
import AnimatedSection from '../components/animations/animated-section'
import RevealSection from '../components/animations/reveal-section'
import SectionDivider from '../components/ui/section-divider'
import MirrorHero from '../components/ui/mirror-hero'
import { FloatingOrbs } from '../components/ui/floating-orbs'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import {
  Search, X, ArrowRight, MapPin, Phone, Mail, ExternalLink,
  GraduationCap, BookOpen, School, Star, ChevronLeft,
  Map as MapIcon, Grid3X3
} from 'lucide-react'

const easeOut = [0.25, 0.1, 0.25, 1] as const

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

function typeColor(type: string) {
  switch (type) {
    case 'Public Mixed': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    case 'High/Technical': return 'text-sky-400 bg-sky-500/10 border-sky-500/20'
    case 'Mixed Day/Boarding': return 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    default: return 'text-accent bg-accent/10 border-accent/20'
  }
}

function typeIcon(type: string) {
  switch (type) {
    case 'Public Mixed': return <GraduationCap className="w-3.5 h-3.5" />
    case 'High/Technical': return <BookOpen className="w-3.5 h-3.5" />
    case 'Mixed Day/Boarding': return <School className="w-3.5 h-3.5" />
    default: return <GraduationCap className="w-3.5 h-3.5" />
  }
}

function SchoolCard({ item, index, onClick }: { item: School; index: number; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0); const [rotateY, setRotateY] = useState(0)
  const [glowX, setGlowX] = useState(50); const [glowY, setGlowY] = useState(50)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return; const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left; const y = e.clientY - rect.top
    setRotateX((y - rect.height / 2) / 20); setRotateY((rect.width / 2 - x) / 20)
    setGlowX((x / rect.width) * 100); setGlowY((y / rect.height) * 100)
  }
  const handleMouseLeave = () => { setRotateX(0); setRotateY(0); setGlowX(50); setGlowY(50) }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.4, delay: index * 0.03 }}>
      <motion.div ref={cardRef} onClick={onClick} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
        className="group cursor-pointer" style={{ perspective: '1000px' }}>
        <motion.div className="relative overflow-hidden rounded-2xl bg-surface border border-border/60 group-hover:border-accent/20 transition-all duration-500"
          style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`, transformStyle: 'preserve-3d' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
          <div className="relative overflow-hidden" style={{ paddingBottom: '66%' }}>
            <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 block max-w-none"
              style={{ height: '100%' }} loading={index < 4 ? 'eager' : 'lazy'} />
            <div className="absolute inset-0 bg-gradient-to-t from-fg/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-accent/20 transition-all duration-500 pointer-events-none rounded-2xl" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(197,149,74,0.2), transparent 60%)` }} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
              <div className="absolute -inset-full top-0 -left-full w-full h-full group-hover:left-full transition-all duration-1000"
                style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.08) 45%, transparent 55%)' }} />
            </div>
            <span className={`absolute top-3 left-3 md:top-4 md:left-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[8px] font-semibold uppercase tracking-[0.2em] backdrop-blur-xl border border-white/10 bg-white/10 text-white/90`}>
              {typeIcon(item.type)}{item.type}
            </span>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-medium px-4 py-2 rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                View Details
              </span>
            </div>
          </div>
          <div className="p-4 md:p-5 space-y-2" style={{ transform: 'translateZ(20px)' }}>
            <h3 className="text-sm font-medium text-fg group-hover:text-accent transition-colors duration-300 line-clamp-1">{item.name}</h3>
            <div className="flex items-center gap-1.5 text-[10px] text-muted">
              <MapPin className="w-3 h-3 shrink-0" /><span>{item.location}</span>
            </div>
            <p className="text-xs text-muted leading-relaxed line-clamp-2">{item.description}</p>
            {item.programs && item.programs.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {item.programs.slice(0, 3).map((p) => (
                  <span key={p} className="text-[9px] text-muted bg-border/40 px-1.5 py-0.5 rounded font-medium">{p}</span>
                ))}
                {item.programs.length > 3 && <span className="text-[9px] text-muted/50">+{item.programs.length - 3}</span>}
              </div>
            )}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5 text-[10px] text-muted">
                <BookOpen className="w-3 h-3" /><span>{item.programs?.length || 0} programmes</span>
              </div>
              <span className="text-[10px] text-muted/60 flex items-center gap-1 group-hover:text-accent transition-colors cursor-pointer">
                Explore<ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function SchoolDetailPanel({ item, onClose, onNavigate }: { item: School; onClose: () => void; onNavigate: (id: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: scrollRef })
  const heroParallax = useTransform(scrollYProgress, [0, 0.3], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.6])

  const idx = SCHOOLS.findIndex((s) => s.id === item.id)
  const prevId = idx > 0 ? SCHOOLS[idx - 1].id : null
  const nextId = idx < SCHOOLS.length - 1 ? SCHOOLS[idx + 1].id : null

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex flex-col bg-bg/95 backdrop-blur-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/40 shrink-0 bg-bg/80 backdrop-blur-xl z-10">
        <button onClick={onClose} className="flex items-center gap-2 text-xs text-muted hover:text-fg transition-colors">
          <ChevronLeft className="w-4 h-4" />Back
        </button>
        <div className="flex items-center gap-2">
          {prevId && <button onClick={() => onNavigate(prevId)} className="px-3 py-1.5 text-[10px] text-muted hover:text-fg border border-border rounded-lg hover:border-fg/30 transition-all">Previous</button>}
          {nextId && <button onClick={() => onNavigate(nextId)} className="px-3 py-1.5 text-[10px] text-muted hover:text-fg border border-border rounded-lg hover:border-fg/30 transition-all">Next</button>}
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-fg hover:bg-surface transition-all"><X className="w-4 h-4" /></button>
        </div>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="relative overflow-hidden" style={{ height: '45vh', minHeight: '320px' }}>
          <motion.img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" style={{ y: heroParallax }} />
          <motion.div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" style={{ opacity: heroOpacity }} />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 right-6">
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-semibold uppercase tracking-[0.2em] ${typeColor(item.type)}`}>
              {typeIcon(item.type)}{item.type}
            </span>
            <h2 className="text-xl md:text-3xl font-medium text-white mt-3 tracking-tight">{item.name}</h2>
            <div className="flex items-center gap-2 mt-2 text-xs text-white/70">
              <MapPin className="w-3.5 h-3.5" />{item.location}
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-5 md:px-10 py-8 space-y-8">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">About</h3>
            <p className="text-sm text-fg leading-relaxed">{item.longDescription || item.description}</p>
          </div>
          {item.programs && item.programs.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted mb-3 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Programmes Offered
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.programs.map((p) => (
                  <span key={p} className="text-xs text-muted bg-border/50 px-3 py-1.5 rounded-lg font-medium border border-border/40">{p}</span>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {item.phone && (
              <a href={`tel:${item.phone}`} className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-border rounded-xl text-xs text-muted hover:text-accent hover:border-accent/30 transition-all">
                <Phone className="w-4 h-4" />{item.phone}
              </a>
            )}
            {item.email && (
              <a href={`mailto:${item.email}`} className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-border rounded-xl text-xs text-muted hover:text-accent hover:border-accent/30 transition-all">
                <Mail className="w-4 h-4" />Send Email
              </a>
            )}
            {item.website && (
              <a href={item.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-border rounded-xl text-xs text-muted hover:text-accent hover:border-accent/30 transition-all">
                <ExternalLink className="w-4 h-4" />Visit Website
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Schools() {
  const types = useMemo(() => ['All', ...Array.from(new Set(SCHOOLS.map((s) => s.type)))], [])
  const [activeType, setActiveType] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState<School | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid')

  const filtered = useMemo(() =>
    SCHOOLS.filter((s) => {
      if (activeType !== 'All' && s.type !== activeType) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) ||
          s.location.toLowerCase().includes(q) || s.programs?.some((p) => p.toLowerCase().includes(q))
      }
      return true
    }), [activeType, searchQuery])

  const totalPrograms = useMemo(() => {
    const set = new Set<string>()
    SCHOOLS.forEach(s => s.programs?.forEach(p => set.add(p)))
    return set.size
  }, [])

  const featuredSchool = useMemo(() =>
    [...SCHOOLS].sort((a, b) => (b.programs?.length || 0) - (a.programs?.length || 0))[0], [])

  return (
    <div className="min-h-screen bg-bg">
      <MirrorHero
        image="/Images/hero-schools.jpg"
        badge="Educational Excellence"
        title="Schools &amp; Education"
        description="Centres of academic excellence, technical mastery, and character formation across the Asuogyaman District."
        cta={{ label: 'Explore Schools', href: '#explore' }}
      />

      {/* STATS */}
      <AnimatedSection className="py-16 px-5 relative border-b border-border/40">
        <DotGrid />
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center relative">
          <div><div className="text-3xl md:text-4xl font-medium text-fg mb-1 text-gradient"><AnimatedCounter value={SCHOOLS.length} suffix="+" /></div><div className="text-xs text-muted tracking-wide">Schools</div></div>
          <div><div className="text-3xl md:text-4xl font-medium text-fg mb-1 text-gradient"><AnimatedCounter value={totalPrograms} suffix="+" /></div><div className="text-xs text-muted tracking-wide">Programmes</div></div>
          <div><div className="text-3xl md:text-4xl font-medium text-fg mb-1 text-gradient"><AnimatedCounter value={types.length - 1} /></div><div className="text-xs text-muted tracking-wide">School Types</div></div>
        </div>
      </AnimatedSection>

      {/* FEATURED SCHOOL */}
      {featuredSchool && activeType === 'All' && !searchQuery && (
        <AnimatedSection className="py-16 md:py-20 px-5 relative overflow-hidden">
          <SectionDivider label="Featured School" className="mb-8" />
          <div className="max-w-7xl mx-auto relative">
            <RevealSection>
              <div className="relative overflow-hidden rounded-2xl bg-surface border border-border/60 group cursor-pointer"
                onClick={() => setSelectedItem(featuredSchool)}>
                <div className="grid md:grid-cols-2">
                  <div className="relative overflow-hidden" style={{ minHeight: '300px' }}>
                    <img src={featuredSchool.image} alt={featuredSchool.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-r from-fg/20 to-transparent" />
                    <span className={`absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-semibold uppercase tracking-[0.2em] ${typeColor(featuredSchool.type)}`}>
                      {typeIcon(featuredSchool.type)}{featuredSchool.type}
                    </span>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">Featured</span>
                    </div>
                    <h3 className="text-lg md:text-2xl font-medium text-fg mb-2">{featuredSchool.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted mb-3">
                      <MapPin className="w-3.5 h-3.5" />{featuredSchool.location}
                    </div>
                    <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-3">{featuredSchool.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {featuredSchool.programs?.map((p) => (
                        <span key={p} className="text-[10px] text-muted bg-border/50 px-2 py-0.5 rounded font-medium">{p}</span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs text-accent group-hover:gap-2 transition-all">
                      View full details <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </AnimatedSection>
      )}

      {/* FILTER BAR */}
      <div id="explore" className="sticky top-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-7xl mx-auto px-5 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
              <input type="text" placeholder="Search schools or programmes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface border border-border rounded-xl text-fg placeholder:text-muted/60 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-fg transition-colors"><X className="w-4 h-4" /></button>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-lg border transition-all ${viewMode === 'grid' ? 'bg-accent text-accent-fg border-accent' : 'bg-surface text-muted border-border hover:text-fg'}`}>
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode('map')}
                className={`p-2.5 rounded-lg border transition-all ${viewMode === 'map' ? 'bg-accent text-accent-fg border-accent' : 'bg-surface text-muted border-border hover:text-fg'}`}>
                <MapIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap mt-4">
            {types.map((type) => (
              <motion.button key={type} layout onClick={() => { setActiveType(type); setSelectedItem(null) }}
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-lg border transition-all duration-200 ${
                  activeType === type ? 'bg-accent text-accent-fg border-accent shadow-sm shadow-accent/20' : 'bg-surface text-muted border-border hover:text-fg hover:border-fg/30'
                }`}>
                <GraduationCap className="w-3.5 h-3.5" />{type}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* SCHOOLS GRID / MAP */}
      {viewMode === 'grid' ? (
        <section className="py-8 md:py-12 px-5 pb-24 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs text-muted">{filtered.length} {filtered.length === 1 ? 'school' : 'schools'} found</p>
              {activeType !== 'All' && <button onClick={() => setActiveType('All')} className="text-xs text-accent hover:text-accent/80 transition-colors flex items-center gap-1"><X className="w-3 h-3" /> Clear filter</button>}
            </div>
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div key="empty" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="text-center py-20">
                  <School className="w-12 h-12 text-muted/30 mx-auto mb-4" /><p className="text-sm text-muted">No schools match your search.</p>
                  <button onClick={() => { setSearchQuery(''); setActiveType('All') }} className="text-xs text-accent hover:text-accent/80 transition-colors mt-2">Reset filters</button>
                </motion.div>
              ) : (
                <motion.div key={`${activeType}-${searchQuery}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.map((item, i) => (
                    <SchoolCard key={item.id} item={item} index={i} onClick={() => setSelectedItem(item)} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      ) : (
        <section className="py-8 md:py-12 px-5 pb-24 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs text-muted">{filtered.length} {filtered.length === 1 ? 'school' : 'schools'} mapped</p>
              <button onClick={() => setViewMode('grid')} className="text-xs text-accent hover:text-accent/80 transition-colors flex items-center gap-1"><Grid3X3 className="w-3 h-3" /> Grid view</button>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border/60" style={{ height: '500px' }}>
              <MapContainer center={[6.2, 0.08]} zoom={11} className="w-full h-full" scrollWheelZoom={true}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://openstreetmap.org/copyright">OSM</a>' />
                {SCHOOLS.map((s) => (
                  <Marker key={s.id} position={s.coordinates as [number, number]}>
                    <Popup>
                      <div className="text-center">
                        <p className="text-xs font-medium mb-1">{s.name}</p>
                        <p className="text-[10px] text-muted mb-1">{s.location}</p>
                        <button onClick={() => { setSelectedItem(s); setViewMode('grid') }}
                          className="text-[10px] text-accent font-medium hover:text-accent/80 transition-colors">View details</button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </section>
      )}

      {/* TYPE SHOWCASES */}
      {activeType === 'All' && !searchQuery && viewMode === 'grid' && (
        <>
          {types.slice(1).map((type) => {
            const items = SCHOOLS.filter((s) => s.type === type)
            if (items.length === 0) return null
            return (
              <AnimatedSection key={type} className="py-16 md:py-20 px-5 relative overflow-hidden">
                <SectionDivider label={type} className="mb-8" />
                <div className="max-w-7xl mx-auto relative">
                  <RevealSection>
                    <div className="flex items-end justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center border bg-accent/10 border-accent/20">
                          <GraduationCap className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h2 className="text-lg md:text-xl font-medium text-fg tracking-tight">{type} Schools</h2>
                          <p className="text-[10px] text-muted">{items.length} {items.length === 1 ? 'school' : 'schools'}</p>
                        </div>
                      </div>
                      <button onClick={() => setActiveType(type)} className="text-[10px] font-medium text-accent hover:text-accent/80 transition-colors flex items-center gap-1">
                        View all <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </RevealSection>
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-5 px-5 snap-x snap-mandatory">
                    {items.map((item, i) => (
                      <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                        className="snap-start shrink-0 w-[300px] sm:w-[340px]">
                        <div className="group cursor-pointer h-full" onClick={() => setSelectedItem(item)}>
                          <GlassCard hover="glow" className="h-full">
                            <div className="relative overflow-hidden bg-surface" style={{ paddingBottom: '66%' }}>
                              <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 block max-w-none"
                                style={{ height: '100%' }} loading="lazy" />
                              <div className="absolute inset-0 bg-gradient-to-t from-fg/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                              <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-accent/20 transition-all duration-500 pointer-events-none" />
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(197,149,74,0.12), transparent 60%)' }} />
                            </div>
                            <div className="p-5 space-y-2.5">
                              <h3 className="text-sm font-medium text-fg group-hover:text-accent transition-colors duration-300">{item.name}</h3>
                              <div className="flex items-center gap-1.5 text-[10px] text-muted">
                                <MapPin className="w-3 h-3" /><span>{item.location}</span>
                              </div>
                              <p className="text-xs text-muted leading-relaxed line-clamp-2">{item.description}</p>
                              <div className="flex items-center gap-1.5 text-[10px] text-muted">
                                <BookOpen className="w-3 h-3" /><span>{item.programs?.length || 0} programmes</span>
                              </div>
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

      {/* CTA */}
      <AnimatedSection className="py-24 md:py-28 px-5 text-center relative overflow-hidden">
        <FloatingOrbs /><div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
        <div className="max-w-lg mx-auto relative">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-medium text-fg mb-3 tracking-tight">Shape the future with education</h2>
            <p className="text-sm text-muted mb-8 leading-relaxed">Asuogyaman's schools are nurturing the next generation of leaders, innovators, and changemakers. Discover the learning opportunities available.</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a href="#explore" className="group inline-flex items-center gap-2 bg-accent text-accent-fg px-7 py-3.5 text-sm font-medium rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30">
                Find a School <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </RevealSection>
        </div>
      </AnimatedSection>

      {/* DETAIL PANEL */}
      <AnimatePresence>
        {selectedItem && (
          <SchoolDetailPanel
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onNavigate={(id) => {
              const next = SCHOOLS.find((s) => s.id === id)
              if (next) setSelectedItem(next)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
