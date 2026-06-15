import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Link } from 'react-router-dom'
import { EXPERIENCES } from '../data'
import GlassCard from '../components/ui/glass-card'
import AnimatedCounter from '../components/ui/animated-counter'
import AnimatedSection from '../components/animations/animated-section'
import RevealSection from '../components/animations/reveal-section'
import MirrorHero from '../components/ui/mirror-hero'
import { FloatingOrbs } from '../components/ui/floating-orbs'
import {
  ArrowRight, Ship, Compass, Mountain, Landmark,
  Utensils, Heart, Star, Quote, Clock, Search, X,
  Calendar, MapPin, Sparkles, Zap, Shield
} from 'lucide-react'

const easeOut = [0.25, 0.1, 0.25, 1] as const

const categoryIcons: Record<string, typeof Ship> = {
  'Water Adventures': Ship,
  'Cultural Tours': Compass,
  'Nature & Hiking': Mountain,
  'Heritage & History': Landmark,
  'Food & Dining': Utensils,
  'Wellness & Relaxation': Heart,
}

const categoryColors: Record<string, string> = {
  'Water Adventures': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  'Cultural Tours': 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  'Nature & Hiking': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  'Heritage & History': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  'Food & Dining': 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  'Wellness & Relaxation': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
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

const categories = ['All', ...Object.keys(categoryIcons)]

export default function Experience() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [reviewIndex, setReviewIndex] = useState(0)



  const filtered = EXPERIENCES
    .filter((e) => {
      if (activeCategory !== 'All' && e.category !== activeCategory) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)
      }
      return true
    })

  const reviews = [
    { user: 'Kwame A.', text: 'The Dodi Princess cruise was the highlight of our trip. The lake is vast and beautiful, and the onboard experience was unforgettable.', rating: 5, location: 'Accra, Ghana' },
    { user: 'Elena R.', text: 'The cultural village tour gave me a profound appreciation for Akwamu heritage. The chief\'s palace visit was awe-inspiring.', rating: 5, location: 'Madrid, Spain' },
    { user: 'Sarah M.', text: 'Hiking through Akwamu Gorge with a local guide was an adventure I\'ll never forget. The views are breathtaking.', rating: 5, location: 'London, UK' },
    { user: 'David C.', text: 'The luxury resort day pass was worth every cedi. Infinity pool overlooking the lake — pure bliss.', rating: 4, location: 'Singapore' },
  ]

  return (
    <div className="min-h-screen bg-bg">
      <MirrorHero
        image="/Images/hero-experience.jpg"
        badge="Curated Journey"
        title="The Asuogyaman Experience"
        description="From cruising Lake Volta to hiking the Akwamu Gorge — discover curated adventures that showcase the very best of the Volta Region."
        cta={{ label: 'Start Exploring', href: '#explore' }}
      />

      {/* STATS */}
      <AnimatedSection className="py-16 px-5 relative border-b border-border/40">
        <DotGrid />
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center relative">
          <div>
            <div className="text-3xl md:text-4xl font-medium text-fg mb-1 text-gradient"><AnimatedCounter value={EXPERIENCES.length} suffix="+" /></div>
            <div className="text-xs text-muted tracking-wide">Experiences</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-medium text-fg mb-1 text-gradient"><AnimatedCounter value={5.0} decimals={1} /></div>
            <div className="text-xs text-muted tracking-wide">Top Rating</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-medium text-fg mb-1 text-gradient"><AnimatedCounter value={categories.length - 1} /></div>
            <div className="text-xs text-muted tracking-wide">Categories</div>
          </div>
        </div>
      </AnimatedSection>

      {/* FILTER BAR */}
      <div id="explore" className="sticky top-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-7xl mx-auto px-5 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
              <input type="text" placeholder="Search experiences..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface border border-border rounded-xl text-fg placeholder:text-muted/60 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-fg transition-colors"><X className="w-4 h-4" /></button>}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap mt-4">
            {categories.map((cat) => {
              const isActive = activeCategory === cat
              const Icon = cat === 'All' ? Compass : (categoryIcons[cat] || Compass)
              const color = cat === 'All' ? '' : categoryColors[cat]?.split(' ')[0] || 'text-accent'
              return (
                <motion.button key={cat} layout onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-lg border transition-all duration-200 ${
                    isActive ? 'bg-accent text-accent-fg border-accent shadow-sm shadow-accent/20' : 'bg-surface text-muted border-border hover:text-fg hover:border-fg/30'
                  }`}>
                  <Icon className={`w-3.5 h-3.5 ${isActive ? '' : color}`} />{cat}
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      {/* EXPERIENCE CARDS */}
      <section className="py-8 md:py-12 px-5 pb-24 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs text-muted">{filtered.length} {filtered.length === 1 ? 'experience' : 'experiences'} found</p>
          </div>
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="text-center py-20">
                <Compass className="w-12 h-12 text-muted/30 mx-auto mb-4" />
                <p className="text-sm text-muted">No experiences match your search.</p>
                <button onClick={() => { setSearchQuery(''); setActiveCategory('All') }} className="text-xs text-accent hover:text-accent/80 transition-colors mt-2">Reset filters</button>
              </motion.div>
            ) : (
              <motion.div key={`${activeCategory}-${searchQuery}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((item, i) => {
                  const Icon = categoryIcons[item.category] || Compass
                  const colorClass = categoryColors[item.category] || 'text-accent bg-accent/10 border-accent/20'
                  return (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.4, delay: i * 0.03 }}>
                      <Link to={`/experience/${item.id}`} className="group block h-full">
                        <GlassCard hover="glow" className="h-full">
                          <div className="relative overflow-hidden bg-surface" style={{ paddingBottom: '66%' }}>
                            <img src={item.image} alt={item.name}
                              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 block max-w-none"
                              style={{ height: '100%' }} loading={i < 4 ? 'eager' : 'lazy'} />
                            <div className="absolute inset-0 bg-gradient-to-t from-fg/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-accent/20 transition-all duration-500 pointer-events-none" />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(197,149,74,0.12), transparent 60%)' }} />
                            <div className="absolute top-3 left-3 md:top-4 md:left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[8px] font-semibold uppercase tracking-[0.2em] backdrop-blur-xl border border-white/10 bg-white/10 text-white/90">
                              <Icon className="w-3 h-3" />{item.category}
                            </div>
                            <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 flex items-center gap-2">
                              <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-xl px-2.5 py-1 rounded-full text-[9px] font-medium text-white/80">
                                <Clock className="w-2.5 h-2.5" />{item.duration}
                              </span>
                              {item.rating && (
                                <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-xl px-2.5 py-1 rounded-full text-[9px] font-semibold text-accent">
                                  <Star className="w-2.5 h-2.5 fill-accent" />{item.rating}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="p-4 md:p-5 space-y-2">
                            <h3 className="text-sm font-medium text-fg group-hover:text-accent transition-colors duration-300 line-clamp-1">{item.name}</h3>
                            <p className="text-xs text-muted leading-relaxed line-clamp-2">{item.description}</p>
                            <div className="flex items-center justify-between pt-1">
                              <span className="text-[9px] font-mono font-semibold text-accent">{item.price}</span>
                              <span className="text-[10px] text-muted/60 flex items-center gap-1 group-hover:text-accent transition-colors cursor-pointer">
                                Explore<ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                              </span>
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

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-16 md:py-20 px-5 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-4">Your Journey</span>
            <h2 className="text-xl md:text-2xl font-medium text-fg tracking-tight">How It Works</h2>
            <p className="text-xs text-muted mt-2 max-w-md mx-auto">Three simple steps to your perfect Asuogyaman experience.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[1px] bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20" />
            {[
              { step: '01', icon: Compass, title: 'Choose Your Adventure', desc: 'Browse our curated experiences — from lake cruises and cultural tours to nature hikes and wellness retreats.', color: 'text-cyan-400', bg: 'from-cyan-500/10 to-cyan-500/[0.02]' },
              { step: '02', icon: Calendar, title: 'Plan Your Trip', desc: 'Select dates, check availability, and get instant pricing. Our experiences cater to solo travellers, couples, and groups.', color: 'text-rose-400', bg: 'from-rose-500/10 to-rose-500/[0.02]' },
              { step: '03', icon: Sparkles, title: 'Create Memories', desc: 'Arrive, explore, and be amazed. Our local guides ensure every moment is authentic, safe, and unforgettable.', color: 'text-amber-400', bg: 'from-amber-500/10 to-amber-500/[0.02]' },
            ].map((item) => (
              <div key={item.step} className={`relative group rounded-2xl bg-gradient-to-b ${item.bg} border border-border/60 p-6 md:p-8 text-center hover:border-accent/20 transition-all duration-500`}>
                <div className="relative z-10">
                  <span className="inline-block text-3xl font-bold text-accent/15 font-mono mb-4">{item.step}</span>
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-accent/10 border border-accent/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <h3 className="text-sm font-medium text-fg mb-2">{item.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED EXPERIENCE SPOTLIGHT ═══ */}
      <section className="py-16 md:py-20 px-5 relative overflow-hidden bg-surface/30 border-t border-border/40">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-32 w-[500px] h-[500px] rounded-full blur-[120px] bg-accent/[0.04]" />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-4">Editor's Pick</span>
            <h2 className="text-xl md:text-2xl font-medium text-fg tracking-tight">Featured Experience</h2>
          </div>
          {EXPERIENCES.filter(e => e.rating === 5).slice(0, 1).map(exp => (
            <div key={exp.id} className="group relative rounded-3xl p-[1px] overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(197,149,74,0.4), rgba(197,149,74,0.05) 30%, rgba(197,149,74,0.2) 50%, rgba(197,149,74,0.05) 70%, rgba(197,149,74,0.4))', backgroundSize: '200% 200%', animation: 'border-flow 6s ease-in-out infinite' }}>
              <div className="relative rounded-3xl bg-surface overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="relative overflow-hidden min-h-[280px] md:min-h-[400px]">
                    <img src={exp.image} alt={exp.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" style={{ objectFit: 'cover' }} />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-surface/95 hidden md:block pointer-events-none" />
                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30"><div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent animate-[scanline_5s_linear_infinite]" /></div>
                    <div className="absolute top-5 left-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-semibold uppercase tracking-[0.2em] backdrop-blur-xl border border-accent/25 bg-accent/10 text-accent z-10">
                      <Zap className="w-3 h-3" />Top Rated
                    </div>
                  </div>
                  <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">Featured Experience</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-fg mb-3 leading-tight">{exp.name}</h3>
                    <p className="text-sm text-muted leading-relaxed mb-6 line-clamp-3">{exp.description}</p>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {[{ value: exp.rating || '5.0', label: 'Rating' }, { value: exp.duration, label: 'Duration' }, { value: exp.price, label: 'From' }].map((s) => (
                        <div key={s.label} className="text-center p-3 rounded-xl bg-accent/[0.04] border border-accent/10">
                          <div className="text-sm font-bold text-fg text-gradient">{s.value}</div>
                          <div className="text-[9px] text-muted uppercase tracking-wider mt-0.5">{s.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted mb-6">
                      <MapPin className="w-3.5 h-3.5 text-accent" />{exp.category}
                    </div>
                    <Link to={`/experience/${exp.id}`} className="group/cta inline-flex items-center gap-2.5 bg-gradient-to-r from-accent to-accent/80 text-accent-fg px-7 py-3 text-sm font-medium rounded-xl shadow-lg shadow-accent/15 hover:shadow-xl hover:shadow-accent/25 hover:translate-y-[-1px] transition-all duration-500 w-fit">
                      <span>Book Now</span><ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SEASONAL HIGHLIGHTS ═══ */}
      <section className="py-16 md:py-20 px-5 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-4">Seasonal</span>
            <h2 className="text-xl md:text-2xl font-medium text-fg tracking-tight">When to Visit</h2>
            <p className="text-xs text-muted mt-2 max-w-md mx-auto">Every season brings unique experiences in Asuogyaman.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { season: 'Dry Season', months: 'Nov – Mar', desc: 'Perfect for outdoor adventures, hiking, and lake cruises. Clear skies and calm waters.', icon: Zap, color: 'text-amber-400', bg: 'from-amber-500/10 to-amber-500/[0.02]' },
              { season: 'Rainy Season', months: 'Apr – Oct', desc: 'Lush green landscapes, waterfall visits, and cultural festivals. The district comes alive.', icon: Heart, color: 'text-emerald-400', bg: 'from-emerald-500/10 to-emerald-500/[0.02]' },
              { season: 'Festival Period', months: 'Sep – Oct', desc: 'Experience the Homowo and other traditional festivals with parades, music, and local cuisine.', icon: Sparkles, color: 'text-rose-400', bg: 'from-rose-500/10 to-rose-500/[0.02]' },
              { season: 'Year-Round', months: 'Anytime', desc: 'Lake Volta cruises, historical tours, and nature reserves are available throughout the year.', icon: Shield, color: 'text-sky-400', bg: 'from-sky-500/10 to-sky-500/[0.02]' },
            ].map((item) => (
              <div key={item.season} className={`group rounded-2xl bg-gradient-to-b ${item.bg} border border-border/60 p-5 hover:border-accent/20 transition-all duration-500`}>
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <h3 className="text-sm font-medium text-fg mb-0.5">{item.season}</h3>
                <p className="text-[10px] text-accent font-mono mb-2">{item.months}</p>
                <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <AnimatedSection className="py-20 md:py-24 px-5 relative overflow-hidden bg-surface/50">
        <FloatingOrbs />
        <div className="max-w-3xl mx-auto text-center relative">
          <RevealSection>
            <h2 className="text-xl md:text-2xl font-medium text-fg tracking-tight mb-2">What Travellers Say</h2>
            <p className="text-xs text-muted mb-10 max-w-md mx-auto">Real stories from visitors who have experienced Asuogyaman.</p>
          </RevealSection>
          <div className="relative min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div key={reviewIndex}
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: easeOut }} className="space-y-6">
                <Quote className="w-8 h-8 text-accent/20 mx-auto" />
                <p className="text-base md:text-lg text-fg leading-relaxed italic">&ldquo;{reviews[reviewIndex].text}&rdquo;</p>
                <div>
                  <div className="flex items-center justify-center gap-1 mb-2">{Array.from({ length: reviews[reviewIndex].rating }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />)}</div>
                  <div className="text-sm text-muted font-medium">&mdash; {reviews[reviewIndex].user}</div>
                  <div className="text-[10px] text-muted/60">{reviews[reviewIndex].location}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-center gap-2 mt-8">{reviews.map((_, i) => <button key={i} onClick={() => setReviewIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === reviewIndex ? 'w-6 bg-accent' : 'w-1.5 bg-border hover:bg-muted'}`} />)}</div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="py-24 md:py-28 px-5 text-center relative overflow-hidden">
        <FloatingOrbs />
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
        <div className="max-w-lg mx-auto relative">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-medium text-fg mb-3 tracking-tight">Ready for adventure?</h2>
            <p className="text-sm text-muted mb-8 leading-relaxed">From lake cruises to cultural immersions — your Asuogyaman journey starts here.</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a href="#explore" className="group inline-flex items-center gap-2 bg-accent text-accent-fg px-7 py-3.5 text-sm font-medium rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30">
                Book an Experience <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <Link to="/attractions" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium rounded-xl text-muted border border-border hover:text-fg hover:border-fg/30 transition-all duration-300">
                Explore Attractions
              </Link>
            </div>
          </RevealSection>
        </div>
      </AnimatedSection>
    </div>
  )
}