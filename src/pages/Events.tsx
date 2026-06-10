import { useState, useRef, useMemo, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import { EVENTS } from '../data'
import type { Event as EventType } from '../data'
import DetailPanel from '../DetailPanel'
import { useNavigate } from 'react-router-dom'
import RevealSection from '../components/animations/reveal-section'
import AdinkraBg from '../components/ui/adinkra-bg'
import AnimatedCounter from '../components/ui/animated-counter'
import { Music, Church, Sprout, Palette, Flag, Star, MapPin, ChevronRight, Calendar, Clock, Sparkles } from 'lucide-react'

const categoryIcons: Record<string, typeof Music> = {
  Cultural: Music,
  Religious: Church,
  Harvest: Sprout,
  Arts: Palette,
  National: Flag,
}

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function extractMonth(dateStr: string): number {
  const lower = dateStr.toLowerCase()
  if (lower.includes('january')) return 1
  if (lower.includes('february')) return 2
  if (lower.includes('march')) return 3
  if (lower.includes('april')) return 4
  if (lower.includes('may')) return 5
  if (lower.includes('june')) return 6
  if (lower.includes('july')) return 7
  if (lower.includes('august')) return 8
  if (lower.includes('september')) return 9
  if (lower.includes('october')) return 10
  if (lower.includes('november')) return 11
  if (lower.includes('december')) return 12
  return 0
}

function formatDate(dateStr: string): string {
  const month = extractMonth(dateStr)
  if (month > 0 && dateStr.length <= 12) return monthNames[month - 1]
  return dateStr
}

type MonthGroup = {
  month: number
  label: string
  events: typeof EVENTS
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}

const categories = ['All', 'Cultural', 'National', 'Arts', 'Harvest', 'Religious']

export default function Events() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null)
  const [focusedMonth, setFocusedMonth] = useState<number | null>(null)

  const filteredEvents = useMemo(() =>
    activeCategory === 'All' ? EVENTS : EVENTS.filter((e) => e.category === activeCategory),
  [activeCategory])

  const topRated = useMemo(() =>
    [...EVENTS].sort((a, b) => (b.rating || 0) - (a.rating || 0))[0],
  [])

  const featured = EVENTS.find(e => e.rating === (topRated?.rating || 0)) || EVENTS[0]

  const monthGroups = useMemo(() => {
    const groups: Record<number, MonthGroup> = {}
    filteredEvents.forEach((ev) => {
      const m = extractMonth(ev.date)
      if (!groups[m]) {
        groups[m] = { month: m, label: monthNames[m - 1] || 'Unknown', events: [] }
      }
      groups[m].events.push(ev)
    })
    return Object.values(groups).sort((a, b) => a.month - b.month)
  }, [filteredEvents])

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
              <img src="/Images/ghana-events-bg.jpg" alt="Asuogyaman Events" className="w-full h-full object-cover" fetchPriority="high" style={{ willChange: 'transform' }} />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/30 to-brand-dark/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/60 via-transparent to-transparent" />
            <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.4)]" />
            <div className="absolute bottom-0 left-0 p-10 lg:p-16 text-left">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-10 h-[2px] bg-brand-gold" />
                  <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-brand-gold">Annual Calendar</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif text-white leading-[0.95] tracking-tighter mb-4">
                  Events<br />
                  <span className="text-brand-gold">Calendar</span>
                </h3>
                <p className="text-white/50 text-sm font-light max-w-md leading-relaxed">
                  From spectacular festivals to national observances — explore the vibrant events that bring Asuogyaman to life.
                </p>
              </motion.div>
            </div>
          </motion.div>
          {/* RIGHT — Content panel */}
          <div className="relative flex items-center bg-white">
            <div className="px-10 lg:px-20 py-20 max-w-xl">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}>
                <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Explore Events</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[0.9] tracking-tighter text-brand-dark mb-8">{EVENTS.length} Events</h1>
                <p className="text-brand-dark/50 text-base font-light leading-relaxed mb-12 max-w-md">
                  From the spectacular Akwamu Odwira Festival to national observances — vibrant events bring Asuogyaman to life all year round.
                </p>
                <div className="flex flex-wrap gap-8 md:gap-12">
                  {[
                    { label: 'Events', value: EVENTS.length },
                    { label: 'Categories', value: 5 },
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

      {/* ========== FEATURED EVENT SPOTLIGHT ========== */}
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
                    Must-Attend
                  </span>
                  <h2 className="text-4xl md:text-5xl font-serif leading-[0.9] tracking-tighter text-brand-dark mb-6">
                    {featured.name}
                  </h2>
                  <p className="text-brand-dark/50 text-base leading-relaxed font-light mb-8">
                    {featured.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <span className="px-4 py-2 bg-brand-gold/5 border border-brand-gold/10 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold text-brand-gold flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {featured.date}
                    </span>
                    <span className="px-4 py-2 bg-brand-dark/5 border border-brand-dark/10 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold text-brand-dark/50 flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {featured.duration}
                    </span>
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
                    <img
                      src={featured.image}
                      alt={featured.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-brand-dark/60" />
                    <div className="absolute top-6 left-6">
                      <span className="bg-white/90 backdrop-blur-xl px-4 py-1.5 rounded-full text-[8px] uppercase tracking-[0.25em] font-bold text-brand-dark flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-brand-gold" />
                        Highlight
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
              const Icon = cat !== 'All' ? categoryIcons[cat] : Calendar
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

      {/* ========== MONTH NAVIGATION ========== */}
      {monthGroups.length > 0 && (
        <RevealSection variant="fadeIn" className="border-b border-brand-dark/5 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide py-4">
              {monthGroups.map((g) => (
                <button
                  key={g.month}
                  onClick={() => {
                    setFocusedMonth(g.month)
                    const el = document.getElementById(`month-${g.month}`)
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={`px-4 py-2 rounded-full border text-[9px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                    focusedMonth === g.month
                      ? 'bg-brand-gold text-brand-dark border-brand-gold'
                      : 'border-brand-dark/10 text-brand-dark/50 hover:border-brand-gold hover:text-brand-gold'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        </RevealSection>
      )}

      {/* ========== CALENDAR TIMELINE ========== */}
      <RevealSection variant="slideLeft" className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {monthGroups.length > 0 ? (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {monthGroups.map((group, gi) => (
                  <div key={group.month} id={`month-${group.month}`} className="mb-16 last:mb-0">
                    {/* Month header */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center gap-5 mb-8 pb-4 border-b border-brand-dark/5"
                    >
                      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-dark text-white shadow-lg shrink-0">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[8px] uppercase tracking-[0.4em] font-bold text-brand-gold">
                          {gi === 0 ? 'Opening' : gi === monthGroups.length - 1 ? 'Closing' : 'Month of'}
                        </span>
                        <h2 className="text-3xl font-serif tracking-tight text-brand-dark leading-tight">
                          {group.label}
                        </h2>
                        <span className="text-brand-dark/30 text-[9px] font-bold uppercase tracking-widest">
                          {group.events.length} event{group.events.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </motion.div>

                    {/* Events for this month */}
                    <div className="flex flex-col gap-4">
                      {group.events.map((ev, idx) => {
                        const Icon = categoryIcons[ev.category] || Calendar
                        return (
                          <motion.div
                            key={ev.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                          >
                            <div
                              onClick={() => setSelectedEvent(ev)}
                              className="group flex gap-5 p-4 rounded-2xl border border-brand-dark/5 hover:shadow-xl hover:shadow-black/5 transition-all duration-500 bg-white cursor-pointer"
                            >
                              {/* Image */}
                              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-xl overflow-hidden shrink-0">
                                <img
                                  src={ev.image}
                                  alt={ev.name}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-brand-dark/10" />
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1.5">
                                  <div className="w-7 h-7 rounded-lg bg-brand-dark flex items-center justify-center shrink-0">
                                    <Icon className="w-3 h-3 text-white" />
                                  </div>
                                  <span className="text-[7px] uppercase tracking-[0.3em] font-bold text-brand-gold">
                                    {ev.category}
                                  </span>
                                  {ev.rating && (
                                    <span className="ml-auto flex items-center gap-1 text-[9px] font-bold text-brand-gold">
                                      <Star className="w-2.5 h-2.5 fill-brand-gold" />
                                      {ev.rating}
                                    </span>
                                  )}
                                </div>

                                <h3 className="text-base md:text-lg font-serif tracking-tight text-brand-dark leading-tight group-hover:text-brand-gold transition-colors">
                                  {ev.name}
                                </h3>
                                <p className="text-brand-dark/40 text-xs font-light leading-relaxed line-clamp-1 mt-1 mb-3">
                                  {ev.description}
                                </p>

                                <div className="flex items-center gap-3">
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-dark/5 rounded-full text-[7px] font-bold uppercase tracking-widest text-brand-dark/50">
                                    <Calendar className="w-2.5 h-2.5" />
                                    {formatDate(ev.date)}
                                  </span>
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-dark/5 rounded-full text-[7px] font-bold uppercase tracking-widest text-brand-dark/50">
                                    <Clock className="w-2.5 h-2.5" />
                                    {ev.duration}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-32"
              >
                <Calendar className="w-16 h-16 text-brand-dark/10 mx-auto mb-6" />
                <p className="text-brand-dark/40 font-serif text-2xl mb-4">No events found</p>
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
      </RevealSection>

      <AdinkraBg variant="akoma" opacity={0.03} color="#c8a96e">
      {/* ========== CATEGORIES EXPLORER ========== */}
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
              Browse by Type
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif leading-[0.9] tracking-tighter text-brand-dark">
              Find Your Event
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.filter(c => c !== 'All').map((cat, idx) => {
              const Icon = categoryIcons[cat]
              const count = EVENTS.filter(e => e.category === cat).length
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
                  className="group relative p-6 rounded-[2rem] bg-white border border-brand-dark/5 text-left hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-brand-dark flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-brand-gold transition-all duration-500">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-serif tracking-tight text-brand-dark mb-1">{cat}</h3>
                    <p className="text-brand-dark/40 text-sm font-light">{count} event{count !== 1 ? 's' : ''}</p>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
        </section>
      </AdinkraBg>


      <AdinkraBg variant="adinkrahene" opacity={0.045} color="#ffffff">
      {/* ========== CTA ========== */}
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
              Plan Your Visit
            </span>
            <h2 className="text-4xl md:text-5xl font-serif leading-[0.9] tracking-tighter text-white mb-8">
              Save the Date
            </h2>
            <p className="text-white/40 leading-relaxed font-light mb-12 max-w-lg mx-auto">
              From cultural festivals to national celebrations, every season brings something
              special to Asuogyaman. Plan your trip around these unforgettable experiences.
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

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedEvent && (
          <DetailPanel
            item={selectedEvent}
            type="event"
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
