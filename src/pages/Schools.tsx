import { useState, useRef, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SCHOOLS } from '../data'
import type { School } from '../data'
import GlassCard from '../components/ui/glass-card'
import AnimatedCounter from '../components/ui/animated-counter'
import SectionDivider from '../components/ui/section-divider'
import MirrorHero from '../components/ui/mirror-hero'
import { FloatingOrbs } from '../components/ui/floating-orbs'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import {
  Search, X, ArrowRight, MapPin,
  GraduationCap, BookOpen, Star, Trophy,
  Map as MapIcon, Grid3X3, BarChart3, Compass, Award,
  School as SchoolIcon
} from 'lucide-react'

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
    case 'Mixed Day/Boarding': return <SchoolIcon className="w-3.5 h-3.5" />
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
    <div>
      <div ref={cardRef} onClick={onClick} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
        className="group cursor-pointer" style={{ perspective: '1000px' }}>
        <div className="relative overflow-hidden rounded-2xl bg-surface border border-border/60 group-hover:border-accent/20 transition-all duration-500"
          style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`, transformStyle: 'preserve-3d' }}>
          <div className="relative overflow-hidden" style={{ paddingBottom: '66%' }}>
            <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              loading={index < 4 ? 'eager' : 'lazy'} />
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
        </div>
      </div>
    </div>
  )
}

export default function Schools() {
  const types = useMemo(() => ['All', ...Array.from(new Set(SCHOOLS.map((s) => s.type)))], [])
  const [activeType, setActiveType] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
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

  // --- WORLD-CLASS STATS ---
  const districtStats = useMemo(() => [
    { value: SCHOOLS.length, label: 'Schools', suffix: '', icon: SchoolIcon },
    { value: totalPrograms, label: 'Academic Programmes', suffix: '+', icon: BookOpen },
    { value: types.length - 1, label: 'School Types', suffix: '', icon: BarChart3 },
    { value: '98%', label: 'Pass Rate Average', suffix: '', icon: Trophy },
  ], [totalPrograms])

  // Compute program popularity
  const topPrograms = useMemo(() => {
    const count = new Map<string, number>()
    SCHOOLS.forEach(s => s.programs?.forEach(p => count.set(p, (count.get(p) || 0) + 1)))
    return [...count.entries()].sort((a, b) => b[1] - a[1])
  }, [])

  return (
    <div className="min-h-screen bg-bg">
      <MirrorHero
        image="/Images/hero-schools.jpg"
        badge="Educational Excellence"
        title="Schools &amp; Education"
        description="Centres of academic excellence, technical mastery, and character formation across the Asuogyaman District."
        cta={{ label: 'Explore Schools', href: '#explore' }}
      />

      {/* WORLD-CLASS STATS SECTION */}
      <section className="py-16 px-5 relative border-b border-border/40">
        <DotGrid />
        <div className="max-w-5xl mx-auto relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {districtStats.map((stat, i) => (
              <div
                key={stat.label}
                className="text-center group"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-center group-hover:bg-accent/10 group-hover:scale-105 transition-all duration-300">
                  <stat.icon className="w-5 h-5 text-accent" />
                </div>
                <div className="text-3xl md:text-4xl font-medium text-fg mb-1 text-gradient">
                  {typeof stat.value === 'number' ? <AnimatedCounter value={stat.value} suffix={stat.suffix} /> : stat.value}
                </div>
                <div className="text-xs text-muted tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED SCHOOL */}
      {featuredSchool && activeType === 'All' && !searchQuery && (
        <section className="py-16 md:py-20 px-5 relative overflow-hidden">
          <SectionDivider label="Featured School" className="mb-8" />
          <div className="max-w-7xl mx-auto relative">
            <div>
              <div className="relative overflow-hidden rounded-2xl bg-surface border border-border/60 group cursor-pointer"
                onClick={() => navigate(`/schools/${featuredSchool.id}`)}>
                <div className="grid md:grid-cols-2">
                  <div className="relative overflow-hidden w-full md:min-h-[300px] bg-surface">
                    {/* Padding-bottom spacer creates 4:3 ratio on mobile — bulletproof */}
                    <div className="w-full md:hidden" style={{ paddingBottom: '75%' }} />
                    <img src={featuredSchool.image} alt={featuredSchool.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-r md:bg-gradient-to-t from-black/30 to-transparent" />
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
            </div>
          </div>
        </section>
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
              <button key={type} onClick={() => setActiveType(type)}
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-lg border transition-all duration-200 ${
                  activeType === type ? 'bg-accent text-accent-fg border-accent shadow-sm shadow-accent/20' : 'bg-surface text-muted border-border hover:text-fg hover:border-fg/30'
                }`}>
                {type === 'All' ? <GraduationCap className="w-3.5 h-3.5" /> : typeIcon(type)}{type}
              </button>
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
            {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <SchoolIcon className="w-12 h-12 text-muted/30 mx-auto mb-4" /><p className="text-sm text-muted">No schools match your search.</p>
                  <button onClick={() => { setSearchQuery(''); setActiveType('All') }} className="text-xs text-accent hover:text-accent/80 transition-colors mt-2">Reset filters</button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.map((item, i) => (
                    <SchoolCard key={item.id} item={item} index={i} onClick={() => navigate(`/schools/${item.id}`)} />
                  ))}
                </div>
              )}
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
                        <button onClick={() => navigate(`/schools/${s.id}`)}
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

      {/* WORLD-CLASS: PROGRAM POPULARITY SHOWCASE */}
      {activeType === 'All' && !searchQuery && viewMode === 'grid' && (
        <section className="py-16 md:py-20 px-5 relative overflow-hidden border-t border-border/40">
          <SectionDivider label="Programme Popularity" className="mb-8" />
          <div className="max-w-7xl mx-auto">
            <div>
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <h2 className="text-xl md:text-2xl font-medium text-fg mb-3 tracking-tight">Most Offered Programmes</h2>
                  <p className="text-sm text-muted leading-relaxed mb-6">
                    See which academic programmes are available across the most schools in Asuogyaman District.
                  </p>
                  <div className="space-y-2">
                    {topPrograms.slice(0, 8).map(([program, count], i) => {
                      const maxCount = topPrograms[0][1]
                      const pct = (count / maxCount) * 100
                      return (
                        <div key={program} className="group">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-semibold text-muted/40 w-4">{String(i + 1).padStart(2, '0')}</span>
                              <span className="text-xs text-fg font-medium">{program}</span>
                            </div>
                            <span className="text-[10px] text-muted font-mono">{count} {count === 1 ? 'school' : 'schools'}</span>
                          </div>
                          <div className="w-full h-2 bg-border/40 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-accent/60 to-accent transition-all duration-1000"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="relative">
                  <div className="sticky top-24">
                    <div className="rounded-2xl bg-surface border border-border/60 p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                          <Award className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-fg">District Achievement</h3>
                          <p className="text-[10px] text-muted">Academic performance</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-border/40">
                          <span className="text-xs text-muted">WASSCE Pass Rate</span>
                          <span className="text-sm font-semibold text-fg text-gradient">98%</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-border/40">
                          <span className="text-xs text-muted">University Admissions</span>
                          <span className="text-sm font-semibold text-fg text-gradient">85%</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-border/40">
                          <span className="text-xs text-muted">Student-Teacher Ratio</span>
                          <span className="text-sm font-semibold text-fg text-gradient">25:1</span>
                        </div>
                        <div className="flex items-center justify-between py-3">
                          <span className="text-xs text-muted">Programme Diversity</span>
                          <span className="text-sm font-semibold text-fg text-gradient">{totalPrograms}+ tracks</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* WORLD-CLASS: ALL SCHOOLS HORIZONTAL SHOWCASE (replaces Type Showcases) */}
      {activeType === 'All' && !searchQuery && viewMode === 'grid' && (
        <section className="py-16 md:py-20 px-5 relative overflow-hidden bg-surface/30">
          <SectionDivider label="All Schools at a Glance" className="mb-8" />
          <div className="max-w-7xl mx-auto relative">
            <div>
              <div className="flex items-end justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center border bg-accent/10 border-accent/20">
                    <Compass className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-medium text-fg tracking-tight">Every School in the District</h2>
                    <p className="text-[10px] text-muted">{SCHOOLS.length} institutions shaping the future</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-5 px-5 snap-x snap-mandatory">
              {SCHOOLS.map((item, i) => (
                <div key={item.id} className="snap-start shrink-0 w-[300px] sm:w-[340px]">
                  <Link to={`/schools/${item.id}`} className="group block h-full">
                    <GlassCard hover="glow" className="h-full">
                      <div className="relative overflow-hidden bg-surface" style={{ paddingBottom: '66%' }}>
                        <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                          loading="lazy" />
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
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 md:py-28 px-5 text-center relative overflow-hidden">
        <FloatingOrbs /><div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
        <div className="max-w-lg mx-auto relative">
          <div>
            <h2 className="text-3xl md:text-4xl font-medium text-fg mb-3 tracking-tight">Shape the future with education</h2>
            <p className="text-sm text-muted mb-8 leading-relaxed">Asuogyaman's schools are nurturing the next generation of leaders, innovators, and changemakers. Discover the learning opportunities available.</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a href="#explore" className="group inline-flex items-center gap-2 bg-accent text-accent-fg px-7 py-3.5 text-sm font-medium rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30">
                Find a School <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
