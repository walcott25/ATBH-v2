import { useState, useMemo, useCallback } from 'react'
import { motion } from 'motion/react'
import { Link, useNavigate } from 'react-router-dom'
import { SCHOOLS } from '../data'
import type { School } from '../data'
import SectionDivider from '../components/ui/section-divider'
import AnimatedCounter from '../components/ui/animated-counter'
import { FloatingOrbs } from '../components/ui/floating-orbs'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import {
  Search, X, ArrowRight, MapPin,
  GraduationCap, BookOpen, Star, Trophy,
  Map as MapIcon, Grid3X3, BarChart3, Compass, Award,
  School as SchoolIcon, Users, ChevronDown,
  Lightbulb, Target, TrendingUp, CheckCircle2
} from 'lucide-react'

/* ── Leaflet default icon ── */
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [30, 46], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
})
L.Marker.prototype.options.icon = DefaultIcon

/* ── Helpers ── */
function typeIcon(type: string) {
  switch (type) {
    case 'Public Mixed': return <GraduationCap className="w-3.5 h-3.5" />
    case 'High/Technical': return <BookOpen className="w-3.5 h-3.5" />
    case 'Mixed Day/Boarding': return <SchoolIcon className="w-3.5 h-3.5" />
    default: return <GraduationCap className="w-3.5 h-3.5" />
  }
}

/* ═══════════════════════════════════════════════════
   SCHOOL CARD — 3D tilt, glow, scanline, no Framer
   ═══════════════════════════════════════════════════ */
function SchoolCard({ item, index, onClick }: { item: School; index: number; onClick: () => void }) {
  const [transform, setTransform] = useState('')
  const [glow, setGlow] = useState('')

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rx = (y - rect.height / 2) / 20
    const ry = (rect.width / 2 - x) / 20
    setTransform(`rotateX(${rx}deg) rotateY(${ry}deg)`)
    setGlow(`radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(197,149,74,0.2), transparent 60%)`)
  }, [])

  const handleMouseLeave = useCallback(() => { setTransform(''); setGlow('') }, [])

  return (
    <div onClick={onClick} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className="group cursor-pointer" style={{ perspective: '1000px' }}>
      <div className="relative overflow-hidden rounded-2xl bg-surface border border-border/60 group-hover:border-accent/20 transition-all duration-500"
        style={{ transform, transformStyle: 'preserve-3d' }}>
        {/* Image — padding-bottom for stable aspect ratio */}
        <div className="relative overflow-hidden" style={{ paddingBottom: '66%' }}>
          <img src={item.image} alt={item.name}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            style={{ objectFit: 'cover' }}
            loading={index < 4 ? 'eager' : 'lazy'} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-accent/20 transition-all duration-500 pointer-events-none rounded-2xl" />
          {/* Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: glow }} />
          {/* Scanline */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-40 transition-opacity duration-300">
            <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent animate-[scanline_3s_linear_infinite]" />
          </div>
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[8px] font-semibold uppercase tracking-[0.2em] backdrop-blur-xl border border-white/10 bg-white/10 text-white/90 z-10">
            {typeIcon(item.type)}{item.type}
          </span>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <span className="bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-medium px-4 py-2 rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              View Details
            </span>
          </div>
        </div>
        <div className="p-4 md:p-5 space-y-2" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="text-sm font-medium text-fg group-hover:text-accent transition-colors duration-300 line-clamp-1">{item.name}</h3>
          <div className="flex items-center gap-1.5 text-[10px] text-muted"><MapPin className="w-3 h-3 shrink-0" /><span>{item.location}</span></div>
          <p className="text-xs text-muted leading-relaxed line-clamp-2">{item.description}</p>
          {item.programs && item.programs.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {item.programs.slice(0, 3).map((p) => <span key={p} className="text-[9px] text-muted bg-border/40 px-1.5 py-0.5 rounded font-medium">{p}</span>)}
              {item.programs.length > 3 && <span className="text-[9px] text-muted/50">+{item.programs.length - 3}</span>}
            </div>
          )}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 text-[10px] text-muted"><BookOpen className="w-3 h-3" /><span>{item.programs?.length || 0} programmes</span></div>
            <span className="text-[10px] text-muted/60 flex items-center gap-1 group-hover:text-accent transition-colors cursor-pointer">Explore<ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" /></span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   FAQ ACCORDION
   ═══════════════════════════════════════════════════ */
const faqData = [
  { q: 'How many schools are in the Asuogyaman District?', a: 'The Asuogyaman District is home to over a dozen senior high and technical schools, each offering unique academic and technical programmes to suit diverse student needs.' },
  { q: 'What types of schools are available?', a: "Schools in the district include Public Mixed schools, High/Technical institutions, and Mixed Day/Boarding schools. Each type offers distinct advantages depending on the student's learning style and goals." },
  { q: 'How do I choose the right school for my child?', a: "Consider your child's interests, preferred learning environment (day vs boarding), and the programmes offered. Compare pass rates, facilities, and extracurricular activities to make an informed decision." },
  { q: 'What is the average pass rate for schools in the district?', a: 'Schools in the Asuogyaman District maintain an impressive average WASSCE pass rate of approximately 98%, reflecting the quality of education and dedication of both students and teachers.' },
  { q: 'Are boarding facilities available?', a: 'Yes, several schools in the district offer boarding facilities. Schools like Anum Presbyterian Senior High (ANSEC) and Adjena SHS provide well-maintained dormitories for students from across the region.' },
  { q: 'What technical programmes are offered?', a: 'Technical schools offer programmes in areas such as woodwork, metalwork, building construction, and applied sciences alongside standard academic subjects, providing practical skills for the job market.' },
]

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <section className="py-16 md:py-20 px-6 relative overflow-hidden">
      <SectionDivider label="Frequently Asked" className="mb-10" />
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl md:text-2xl font-medium text-fg mb-3 tracking-tight text-center">Common Questions</h2>
        <p className="text-sm text-muted text-center mb-10 max-w-md mx-auto leading-relaxed">Everything you need to know about education in Asuogyaman.</p>
        <div className="space-y-3">
          {faqData.map((item, i) => (
            <div key={i} className={`rounded-2xl border transition-all duration-300 ${openIndex === i ? 'bg-surface border-accent/20 shadow-lg shadow-accent/5' : 'bg-surface/50 border-border/60 hover:border-accent/10'}`}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-5 md:p-6 text-left">
                <span className="text-sm font-medium text-fg pr-4">{item.q}</span>
                <ChevronDown className={`w-4 h-4 text-muted shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-accent' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-48 pb-5 md:pb-6' : 'max-h-0'}`}>
                <div className="px-5 md:px-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <p className="text-xs text-muted leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════ */
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
    const set = new Set<string>(); SCHOOLS.forEach(s => s.programs?.forEach(p => set.add(p))); return set.size
  }, [])

  const featuredSchool = useMemo(() =>
    [...SCHOOLS].sort((a, b) => (b.programs?.length || 0) - (a.programs?.length || 0))[0], [])

  const districtStats = useMemo(() => [
    { value: SCHOOLS.length, label: 'Schools', suffix: '', icon: SchoolIcon },
    { value: totalPrograms, label: 'Academic Programmes', suffix: '+', icon: BookOpen },
    { value: types.length - 1, label: 'School Types', suffix: '', icon: BarChart3 },
    { value: 98, label: 'Pass Rate Average', suffix: '%', icon: Trophy },
  ], [totalPrograms])

  const topPrograms = useMemo(() => {
    const count = new Map<string, number>()
    SCHOOLS.forEach(s => s.programs?.forEach(p => count.set(p, (count.get(p) || 0) + 1)))
    return [...count.entries()].sort((a, b) => b[1] - a[1])
  }, [])

  return (
    <div className="min-h-screen bg-bg">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-48 -left-32 w-[700px] h-[700px] rounded-full blur-[120px] animate-[float_14s_ease-in-out_infinite] bg-gradient-to-br from-accent/[0.07] to-transparent" />
          <div className="absolute -bottom-32 -right-24 w-[600px] h-[600px] rounded-full blur-[100px] animate-[float_18s_ease-in-out_infinite] bg-gradient-to-tl from-accent/[0.05] to-transparent" style={{ animationDirection: 'reverse' }} />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[140px] animate-pulse-soft bg-accent/[0.03]" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">Educational Excellence</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-fg mb-4 leading-tight tracking-tight">
            Schools &amp; <span className="text-gradient-shimmer">Education</span>
          </h1>
          <p className="text-sm md:text-base text-muted leading-relaxed mb-8 max-w-xl mx-auto">
            Centres of academic excellence, technical mastery, and character formation across the Asuogyaman District.
          </p>
          <a href="#explore" className="group inline-flex items-center gap-2 bg-accent text-accent-fg px-7 py-3.5 text-sm font-medium rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30">
            Explore Schools <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-16 px-6 relative border-b border-border/40">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {districtStats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-center group-hover:bg-accent/10 group-hover:scale-105 transition-all duration-300">
                  <stat.icon className="w-5 h-5 text-accent" />
                </div>
                <div className="text-3xl md:text-4xl font-medium text-fg mb-1 text-gradient">{typeof stat.value === 'number' ? <AnimatedCounter value={stat.value} suffix={stat.suffix} /> : <>{stat.value}{stat.suffix}</>}</div>
                <div className="text-xs text-muted tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED SCHOOL ═══ */}
      {featuredSchool && activeType === 'All' && !searchQuery && (
        <section className="py-16 md:py-24 px-6 relative overflow-hidden">
          <SectionDivider label="Featured School" className="mb-10" />
          <div className="max-w-6xl mx-auto relative">
            <div className="relative rounded-3xl p-[1px] overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(197,149,74,0.4), rgba(197,149,74,0.05) 30%, rgba(197,149,74,0.2) 50%, rgba(197,149,74,0.05) 70%, rgba(197,149,74,0.4))', backgroundSize: '200% 200%', animation: 'border-flow 6s ease-in-out infinite' }}>
              <div className="relative rounded-3xl bg-surface overflow-hidden">
                <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute top-[8%] left-[5%] w-1 h-1 bg-accent/30 rounded-full animate-[float_5s_ease-in-out_infinite]" />
                  <div className="absolute top-[15%] right-[8%] w-1.5 h-1.5 bg-accent/20 rounded-full animate-[float_7s_ease-in-out_infinite]" style={{ animationDelay: '1s' }} />
                  <div className="absolute bottom-[12%] left-[12%] w-1 h-1 bg-accent/25 rounded-full animate-[float_6s_ease-in-out_infinite]" style={{ animationDelay: '2s' }} />
                  <div className="absolute bottom-[20%] right-[15%] w-0.5 h-0.5 bg-accent/35 rounded-full animate-[float_8s_ease-in-out_infinite]" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute top-[45%] left-[42%] w-0.5 h-0.5 bg-accent/20 rounded-full animate-[float_9s_ease-in-out_infinite]" style={{ animationDelay: '3s' }} />
                </div>
                <div className="grid md:grid-cols-2">
                  <div className="relative overflow-hidden group cursor-pointer min-h-[280px] md:min-h-[420px]" onClick={() => navigate(`/schools/${featuredSchool.id}`)}>
                    <img src={featuredSchool.image} alt={featuredSchool.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" style={{ objectFit: 'cover' }} />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-surface/95 hidden md:block pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent md:hidden pointer-events-none" />
                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30"><div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent animate-[scanline_5s_linear_infinite]" /></div>
                    <div className="absolute top-5 left-5 md:top-6 md:left-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-semibold uppercase tracking-[0.2em] backdrop-blur-xl border border-accent/25 bg-accent/10 text-accent z-10">
                      {typeIcon(featuredSchool.type)}{featuredSchool.type}
                    </div>
                  </div>
                  <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="relative"><Star className="w-4 h-4 fill-accent text-accent" /><div className="absolute inset-0 bg-accent/30 rounded-full blur-md" /></div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">Featured Institution</span>
                    </div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-fg mb-3 leading-tight text-gradient-shimmer">{featuredSchool.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted mb-4">
                      <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent/15 flex items-center justify-center shrink-0"><MapPin className="w-3 h-3 text-accent" /></div>
                      {featuredSchool.location}
                    </div>
                    <p className="text-sm text-muted leading-relaxed mb-6 line-clamp-3">{featuredSchool.description}</p>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {[{ value: featuredSchool.programs?.length || 0, label: 'Programs' }, { value: 'A+', label: 'Excellence' }, { value: '100%', label: 'Commitment' }].map((s) => (
                        <div key={s.label} className="text-center p-3 rounded-xl bg-accent/[0.04] border border-accent/10 hover:border-accent/25 transition-colors duration-300">
                          <div className="text-lg font-bold text-fg text-gradient">{s.value}</div>
                          <div className="text-[9px] text-muted uppercase tracking-wider mt-0.5">{s.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {featuredSchool.programs?.slice(0, 6).map((p) => <span key={p} className="text-[10px] text-accent/80 bg-accent/[0.06] border border-accent/15 px-2.5 py-1 rounded-full font-medium cursor-default">{p}</span>)}
                      {(featuredSchool.programs?.length || 0) > 6 && <span className="text-[10px] text-muted/50 bg-border/30 px-2.5 py-1 rounded-full">+{(featuredSchool.programs?.length || 0) - 6} more</span>}
                    </div>
                    <button onClick={() => navigate(`/schools/${featuredSchool.id}`)} className="group/cta inline-flex items-center gap-2.5 bg-gradient-to-r from-accent to-accent/80 text-accent-fg px-7 py-3 text-sm font-medium rounded-xl shadow-lg shadow-accent/15 hover:shadow-xl hover:shadow-accent/25 hover:translate-y-[-1px] transition-all duration-500 w-fit">
                      <span>Explore Institution</span><ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
                <div className="absolute bottom-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ FILTER BAR ═══ */}
      <div id="explore" className="sticky top-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
              <input type="text" placeholder="Search schools or programmes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface border border-border rounded-xl text-fg placeholder:text-muted/60 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-fg transition-colors"><X className="w-4 h-4" /></button>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setViewMode('grid')} className={`p-2.5 rounded-lg border transition-all ${viewMode === 'grid' ? 'bg-accent text-accent-fg border-accent' : 'bg-surface text-muted border-border hover:text-fg'}`}><Grid3X3 className="w-4 h-4" /></button>
              <button onClick={() => setViewMode('map')} className={`p-2.5 rounded-lg border transition-all ${viewMode === 'map' ? 'bg-accent text-accent-fg border-accent' : 'bg-surface text-muted border-border hover:text-fg'}`}><MapIcon className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap mt-4">
            {types.map((type) => (
              <button key={type} onClick={() => setActiveType(type)}
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-lg border transition-all duration-200 ${activeType === type ? 'bg-accent text-accent-fg border-accent shadow-sm shadow-accent/20' : 'bg-surface text-muted border-border hover:text-fg hover:border-fg/30'}`}>
                {type === 'All' ? <GraduationCap className="w-3.5 h-3.5" /> : typeIcon(type)}{type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ SCHOOLS GRID / MAP ═══ */}
      {viewMode === 'grid' ? (
        <section className="py-8 md:py-12 px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs text-muted">{filtered.length} {filtered.length === 1 ? 'school' : 'schools'} found</p>
              {activeType !== 'All' && <button onClick={() => setActiveType('All')} className="text-xs text-accent hover:text-accent/80 transition-colors flex items-center gap-1"><X className="w-3 h-3" /> Clear filter</button>}
            </div>
            {filtered.length === 0 ? (
              <div className="text-center py-20"><SchoolIcon className="w-12 h-12 text-muted/30 mx-auto mb-4" /><p className="text-sm text-muted">No schools match your search.</p>
                <button onClick={() => { setSearchQuery(''); setActiveType('All') }} className="text-xs text-accent hover:text-accent/80 transition-colors mt-2">Reset filters</button></div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((item, i) => <SchoolCard key={item.id} item={item} index={i} onClick={() => navigate(`/schools/${item.id}`)} />)}
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="py-8 md:py-12 px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs text-muted">{filtered.length} {filtered.length === 1 ? 'school' : 'schools'} mapped</p>
              <button onClick={() => setViewMode('grid')} className="text-xs text-accent hover:text-accent/80 transition-colors flex items-center gap-1"><Grid3X3 className="w-3 h-3" /> Grid view</button>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border/60" style={{ height: '500px' }}>
              <MapContainer center={[6.2, 0.08]} zoom={11} className="w-full h-full" scrollWheelZoom={true}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://openstreetmap.org/copyright">OSM</a>' />
                {SCHOOLS.map((s) => (
                  <Marker key={s.id} position={s.coordinates as [number, number]}>
                    <Popup><div className="text-center"><p className="text-xs font-medium mb-1">{s.name}</p><p className="text-[10px] text-muted mb-1">{s.location}</p>
                      <button onClick={() => navigate(`/schools/${s.id}`)} className="text-[10px] text-accent font-medium hover:text-accent/80 transition-colors">View details</button></div></Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </section>
      )}

      {/* ═══ PROGRAMME POPULARITY ═══ */}
      {activeType === 'All' && !searchQuery && viewMode === 'grid' && (
        <section className="py-16 md:py-20 px-6 relative overflow-hidden border-t border-border/40">
          <SectionDivider label="Programme Popularity" className="mb-8" />
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <h2 className="text-xl md:text-2xl font-medium text-fg mb-3 tracking-tight">Most Offered Programmes</h2>
                <p className="text-sm text-muted leading-relaxed mb-6">See which academic programmes are available across the most schools.</p>
                <div className="space-y-2">
                  {topPrograms.slice(0, 8).map(([program, count], i) => {
                    const maxCount = topPrograms[0][1]; const pct = (count / maxCount) * 100
                    return (<div key={program} className="group"><div className="flex items-center justify-between mb-1"><div className="flex items-center gap-2"><span className="text-[10px] font-semibold text-muted/40 w-4">{String(i + 1).padStart(2, '0')}</span><span className="text-xs text-fg font-medium">{program}</span></div><span className="text-[10px] text-muted font-mono">{count} {count === 1 ? 'school' : 'schools'}</span></div>
                      <div className="w-full h-2 bg-border/40 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }} className="h-full rounded-full bg-gradient-to-r from-accent/60 to-accent" /></div></div>)
                  })}
                </div>
              </div>
              <div className="sticky top-24">
                <div className="rounded-2xl bg-surface border border-border/60 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center"><Award className="w-5 h-5 text-accent" /></div><div><h3 className="text-sm font-medium text-fg">District Achievement</h3><p className="text-[10px] text-muted">Academic performance</p></div></div>
                  <div className="space-y-4">
                    {[{ l: 'WASSCE Pass Rate', v: '98%' }, { l: 'University Admissions', v: '85%' }, { l: 'Student-Teacher Ratio', v: '25:1' }, { l: 'Programme Diversity', v: `${totalPrograms}+ tracks` }].map((s) => (
                      <div key={s.l} className="flex items-center justify-between py-3 border-b border-border/40 last:border-0"><span className="text-xs text-muted">{s.l}</span><span className="text-sm font-semibold text-fg text-gradient">{s.v}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ ALL SCHOOLS SHOWCASE ═══ */}
      {activeType === 'All' && !searchQuery && viewMode === 'grid' && (
        <section className="py-16 md:py-20 px-6 relative overflow-hidden bg-surface/30">
          <SectionDivider label="All Schools at a Glance" className="mb-8" />
          <div className="max-w-7xl mx-auto relative">
            <div className="flex items-center gap-3 mb-8"><div className="w-10 h-10 rounded-xl flex items-center justify-center border bg-accent/10 border-accent/20"><Compass className="w-5 h-5 text-accent" /></div><div><h2 className="text-lg md:text-xl font-medium text-fg tracking-tight">Every School in the District</h2><p className="text-[10px] text-muted">{SCHOOLS.length} institutions shaping the future</p></div></div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6 snap-x snap-mandatory">
              {SCHOOLS.map((item) => (
                <div key={item.id} className="snap-start shrink-0 w-[300px] sm:w-[340px]">
                  <Link to={`/schools/${item.id}`} className="group block h-full">
                    <div className="rounded-xl bg-surface border border-border/60 overflow-hidden hover:border-accent/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5">
                      <div className="relative overflow-hidden" style={{ paddingBottom: '66%' }}>
                        <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105" style={{ objectFit: 'cover' }} loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
                      </div>
                      <div className="p-5 space-y-2.5">
                        <h3 className="text-sm font-medium text-fg group-hover:text-accent transition-colors duration-300">{item.name}</h3>
                        <div className="flex items-center gap-1.5 text-[10px] text-muted"><MapPin className="w-3 h-3" /><span>{item.location}</span></div>
                        <p className="text-xs text-muted leading-relaxed line-clamp-2">{item.description}</p>
                        <div className="flex items-center gap-1.5 text-[10px] text-muted"><BookOpen className="w-3 h-3" /><span>{item.programs?.length || 0} programmes</span></div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ HOW TO CHOOSE ═══ */}
      {activeType === 'All' && !searchQuery && viewMode === 'grid' && (
        <section className="py-16 md:py-20 px-6 relative overflow-hidden">
          <SectionDivider label="How to Choose" className="mb-10" />
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl md:text-2xl font-medium text-fg mb-3 tracking-tight text-center">Finding the Right School</h2>
            <p className="text-sm text-muted text-center mb-10 max-w-lg mx-auto leading-relaxed">Every student deserves a school that fits their goals. Here is how to navigate your options.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: '01', icon: Target, title: 'Define Your Goals', desc: 'Consider whether your child thrives in academic, technical, or mixed environments. Each school type offers a unique pathway.', color: 'from-accent/10 to-accent/[0.02]' },
                { step: '02', icon: Lightbulb, title: 'Compare Programmes', desc: 'Review available programmes \u2014 from sciences to arts and technical tracks. More programmes mean more pathways to success.', color: 'from-emerald-500/10 to-emerald-500/[0.02]' },
                { step: '03', icon: TrendingUp, title: 'Check Track Record', desc: "Look at pass rates, university admissions, and alumni achievements. A school's reputation speaks through its results.", color: 'from-sky-500/10 to-sky-500/[0.02]' },
              ].map((item) => (
                <div key={item.step} className={`group relative rounded-2xl bg-gradient-to-b ${item.color} border border-border/60 p-6 md:p-8 hover:border-accent/20 transition-all duration-500`}> 
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-accent/20 font-mono">{item.step}</span>
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-fg mb-2">{item.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ FAQ ═══ */}
      {activeType === 'All' && !searchQuery && viewMode === 'grid' && (
        <FaqSection />
      )}

      {/* ═══ CTA ═══ */}
      <section className="py-24 md:py-28 px-6 text-center relative overflow-hidden">
        <FloatingOrbs />
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
        <div className="max-w-lg mx-auto relative">
          <h2 className="text-3xl md:text-4xl font-medium text-fg mb-3 tracking-tight">Shape the future with education</h2>
          <p className="text-sm text-muted mb-8 leading-relaxed">Asuogyaman&apos;s schools are nurturing the next generation of leaders, innovators, and changemakers.</p>
          <a href="#explore" className="group inline-flex items-center gap-2 bg-accent text-accent-fg px-7 py-3.5 text-sm font-medium rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30">
            Find a School <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  )
}
