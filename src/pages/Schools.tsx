import { useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { SCHOOLS } from '../data'
import GlassCard from '../components/ui/glass-card'
import AnimatedCounter from '../components/ui/animated-counter'
import AnimatedSection from '../components/animations/animated-section'
import RevealSection from '../components/animations/reveal-section'
import MirrorHero from '../components/ui/mirror-hero'
import {
  Search, X, ArrowRight, MapPin, Phone, Mail, ExternalLink,
  GraduationCap, BookOpen, ChevronDown, School
} from 'lucide-react'

const easeOut = [0.25, 0.1, 0.25, 1] as const

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

export default function Schools() {
  const types = useMemo(() => ['All', ...Array.from(new Set(SCHOOLS.map((s) => s.type)))], [])
  const [activeType, setActiveType] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)



  const filtered = useMemo(() =>
    SCHOOLS
      .filter((s) => {
        if (activeType !== 'All' && s.type !== activeType) return false
        if (searchQuery) {
          const q = searchQuery.toLowerCase()
          return s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) ||
            s.location.toLowerCase().includes(q)
        }
        return true
      }),
    [activeType, searchQuery]
  )

  const totalPrograms = useMemo(() => {
    const set = new Set<string>()
    SCHOOLS.forEach(s => s.programs?.forEach(p => set.add(p)))
    return set.size
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

      {/* STATS */}
      <AnimatedSection className="py-16 px-5 relative border-b border-border/40">
        <DotGrid />
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center relative">
          <div><div className="text-3xl md:text-4xl font-medium text-fg mb-1 text-gradient"><AnimatedCounter value={SCHOOLS.length} suffix="+" /></div><div className="text-xs text-muted tracking-wide">Schools</div></div>
          <div><div className="text-3xl md:text-4xl font-medium text-fg mb-1 text-gradient"><AnimatedCounter value={totalPrograms} suffix="+" /></div><div className="text-xs text-muted tracking-wide">Programmes</div></div>
          <div><div className="text-3xl md:text-4xl font-medium text-fg mb-1 text-gradient"><AnimatedCounter value={types.length - 1} /></div><div className="text-xs text-muted tracking-wide">School Types</div></div>
        </div>
      </AnimatedSection>

      {/* FILTER BAR */}
      <div id="explore" className="sticky top-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-7xl mx-auto px-5 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
              <input type="text" placeholder="Search schools..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface border border-border rounded-xl text-fg placeholder:text-muted/60 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-fg transition-colors"><X className="w-4 h-4" /></button>}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap mt-4">
            {types.map((type) => (
              <motion.button key={type} layout onClick={() => { setActiveType(type); setExpandedId(null) }}
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-lg border transition-all duration-200 ${
                  activeType === type ? 'bg-accent text-accent-fg border-accent shadow-sm shadow-accent/20' : 'bg-surface text-muted border-border hover:text-fg hover:border-fg/30'
                }`}>
                <GraduationCap className="w-3.5 h-3.5" />{type}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* SCHOOLS GRID */}
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
                {filtered.map((item, i) => {
                  const isExpanded = expandedId === item.id
                  return (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.4, delay: i * 0.04 }}>
                      <GlassCard hover="shine" className="h-full">
                        <button onClick={() => setExpandedId(isExpanded ? null : item.id)} className="w-full text-left">
                          <div className="relative overflow-hidden bg-surface" style={{ paddingBottom: '66%' }}>
                            <img src={item.image} alt={item.name}
                              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 block max-w-none"
                              style={{ height: '100%' }} loading={i < 4 ? 'eager' : 'lazy'} />
                            <div className="absolute inset-0 bg-gradient-to-t from-fg/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-accent/20 transition-all duration-500 pointer-events-none" />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(197,149,74,0.12), transparent 60%)' }} />
                            <span className="absolute top-3 left-3 md:top-4 md:left-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[8px] font-semibold uppercase tracking-[0.2em] backdrop-blur-xl border border-white/10 bg-white/10 text-white/90">
                              <GraduationCap className="w-3 h-3" />{item.type}
                            </span>
                          </div>
                          <div className="p-4 md:p-5 space-y-2">
                            <h3 className="text-sm font-medium text-fg line-clamp-1">{item.name}</h3>
                            <div className="flex items-center gap-1.5 text-[10px] text-muted">
                              <MapPin className="w-3 h-3 shrink-0" /><span>{item.location}</span>
                            </div>
                            <p className="text-xs text-muted leading-relaxed line-clamp-2">{item.description}</p>
                            <div className="flex items-center gap-1.5 pt-1 text-[10px] text-muted">
                              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                              <span>{isExpanded ? 'Less details' : 'More details'}</span>
                            </div>
                          </div>
                        </button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: easeOut }}
                              className="overflow-hidden border-t border-border">
                              <div className="p-4 md:p-5 pt-3 space-y-3">
                                {item.longDescription && <p className="text-xs text-muted leading-relaxed">{item.longDescription}</p>}
                                {item.programs && item.programs.length > 0 && (
                                  <div>
                                    <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-fg mb-2">
                                      <BookOpen className="w-3 h-3" /> Programmes Offered
                                    </span>
                                    <div className="flex flex-wrap gap-1.5">
                                      {item.programs.map((p) => (
                                        <span key={p} className="text-[10px] text-muted bg-border/50 px-2 py-0.5 rounded font-medium">{p}</span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                <div className="flex flex-wrap items-center gap-3 pt-1">
                                  {item.phone && (
                                    <a href={`tel:${item.phone}`} onClick={(e) => e.stopPropagation()}
                                      className="flex items-center gap-1 text-[10px] text-muted hover:text-accent transition-colors">
                                      <Phone className="w-3 h-3" />{item.phone}
                                    </a>
                                  )}
                                  {item.email && (
                                    <a href={`mailto:${item.email}`} onClick={(e) => e.stopPropagation()}
                                      className="flex items-center gap-1 text-[10px] text-muted hover:text-accent transition-colors">
                                      <Mail className="w-3 h-3" />Email
                                    </a>
                                  )}
                                  {item.website && (
                                    <a href={item.website} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                                      className="flex items-center gap-1 text-[10px] text-muted hover:text-accent transition-colors">
                                      <ExternalLink className="w-3 h-3" />Website
                                    </a>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </GlassCard>
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
    </div>
  )
}