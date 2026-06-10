import { useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import { SCHOOLS } from '../data'
import ImageCard from '../components/ui/image-card'
import RevealSection from '../components/animations/reveal-section'
import AdinkraBg from '../components/ui/adinkra-bg'
import AnimatedCounter from '../components/ui/animated-counter'
import DetailPanel from '../DetailPanel'
import { GraduationCap, BookOpen, MapPin, Phone, Star, ChevronRight, Sparkles, Users, Award, Library, ArrowUpRight } from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}

const allPrograms = [...new Set(SCHOOLS.flatMap(s => s.programs || []))].sort()

export default function Schools() {
  const [selectedSchool, setSelectedSchool] = useState<typeof SCHOOLS[number] | null>(null)
  const [activeLocation, setActiveLocation] = useState<string>('All')

  const locations = ['All', ...new Set(SCHOOLS.map(s => s.location))].sort()

  const filteredSchools = useMemo(() =>
    activeLocation === 'All' ? SCHOOLS : SCHOOLS.filter(s => s.location === activeLocation),
  [activeLocation])

  const featured = SCHOOLS[0]

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
              <img src="/Images/ghana-schools-bg.jpg" alt="Asuogyaman Schools" className="w-full h-full object-cover" fetchPriority="high" style={{ willChange: 'transform' }} />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/30 to-brand-dark/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/60 via-transparent to-transparent" />
            <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.4)]" />
            <div className="absolute bottom-0 left-0 p-10 lg:p-16 text-left">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-10 h-[2px] bg-brand-gold" />
                  <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-brand-gold">Academic Excellence</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif text-white leading-[0.95] tracking-tighter mb-4">
                  Senior High<br />
                  <span className="text-brand-gold">Schools</span>
                </h3>
                <p className="text-white/50 text-sm font-light max-w-md leading-relaxed">
                  Discover the finest secondary institutions — centres of academic excellence, technical mastery, and character formation.
                </p>
              </motion.div>
            </div>
          </motion.div>
          {/* RIGHT — Content panel */}
          <div className="relative flex items-center bg-white">
            <div className="px-10 lg:px-20 py-20 max-w-xl">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}>
                <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Explore Schools</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[0.9] tracking-tighter text-brand-dark mb-8">{SCHOOLS.length} Institutions</h1>
                <p className="text-brand-dark/50 text-base font-light leading-relaxed mb-12 max-w-md">
                  Centres of academic excellence, technical mastery, and character formation serving generations of students.
                </p>
                <div className="flex flex-wrap gap-8 md:gap-12">
                  {[
                    { label: 'Schools', value: SCHOOLS.length },
                    { label: 'Programmes', value: allPrograms.length },
                    { label: 'Locations', value: locations.length - 1 },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-2xl md:text-3xl font-serif text-brand-gold tracking-tight">
                        {typeof stat.value === 'number' ? (<AnimatedCounter value={stat.value} />) : (stat.value)}
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

      {/* ========== FEATURED SCHOOL SPOTLIGHT ========== */}
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
              <motion.div variants={fadeInUp} className="relative order-2 md:order-1">
                <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">
                  Featured Institution
                </span>
                <h2 className="text-4xl md:text-5xl font-serif leading-[0.9] tracking-tighter text-brand-dark mb-6">
                  {featured.name}
                </h2>
                <p className="text-brand-dark/50 text-base leading-relaxed font-light mb-8">
                  {featured.longDescription || featured.description}
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {featured.programs?.slice(0, 4).map(p => (
                    <span key={p} className="px-3 py-1.5 bg-brand-dark/5 rounded-full text-[8px] font-bold uppercase tracking-widest text-brand-dark/60">
                      {p}
                    </span>
                  ))}
                  {(featured.programs?.length || 0) > 4 && (
                    <span className="px-3 py-1.5 bg-brand-gold/5 border border-brand-gold/10 rounded-full text-[8px] font-bold uppercase tracking-widest text-brand-gold">
                      +{featured.programs!.length - 4} more
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-4">
                  <span className="px-4 py-2 bg-brand-dark/5 border border-brand-dark/10 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold text-brand-dark/50 flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    {featured.location}
                  </span>
                  <span className="px-4 py-2 bg-brand-dark/5 border border-brand-dark/10 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold text-brand-dark/50 flex items-center gap-2">
                    <GraduationCap className="w-3 h-3" />
                    {featured.type}
                  </span>
                  {featured.phone && (
                    <span className="px-4 py-2 bg-brand-dark/5 border border-brand-dark/10 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold text-brand-dark/50 flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      {featured.phone}
                    </span>
                  )}
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="relative order-1 md:order-2">
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/10 group">
                  <img
                    src={featured.image}
                    alt={featured.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-brand-dark/40" />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-xl px-4 py-1.5 rounded-full text-[8px] uppercase tracking-[0.25em] font-bold text-brand-dark flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-brand-gold" />
                      Featured
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        </AdinkraBg>
      )}

      {/* ========== STICKY FILTER ========== */}
      <section className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-brand-dark/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide py-4">
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => setActiveLocation(loc)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full border text-[9px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeLocation === loc
                    ? 'bg-brand-dark text-white border-brand-dark shadow-lg shadow-brand-dark/15'
                    : 'border-brand-dark/10 text-brand-dark/50 hover:border-brand-gold hover:text-brand-gold'
                }`}
              >
                {loc !== 'All' && <MapPin className="w-3 h-3" />}
                {loc}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SCHOOLS GRID ========== */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredSchools.length > 0 ? (
              <motion.div
                key={activeLocation}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                  {filteredSchools.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      viewport={{ once: true, margin: '-50px' }}
                      onClick={() => setSelectedSchool(item)}
                    >
                      <div className="group h-full p-6 rounded-[2rem] border border-brand-dark/5 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 cursor-pointer bg-white">
                        {/* Image */}
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-brand-dark/10" />
                          <div className="absolute top-3 left-3">
                            <span className="bg-white/90 backdrop-blur-xl px-3 py-1 rounded-full text-[7px] uppercase tracking-[0.25em] font-bold text-brand-dark">
                              {item.type}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="mb-4">
                          <h3 className="text-lg font-serif tracking-tight text-brand-dark mb-1.5 group-hover:text-brand-gold transition-colors leading-snug">
                            {item.name}
                          </h3>
                          <p className="text-brand-dark/40 text-xs font-light leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                        </div>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-dark/5 rounded-full text-[7px] font-bold uppercase tracking-widest text-brand-dark/50">
                            <MapPin className="w-2.5 h-2.5" />
                            {item.location}
                          </span>
                          {item.phone && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-dark/5 rounded-full text-[7px] font-bold uppercase tracking-widest text-brand-dark/50">
                              <Phone className="w-2.5 h-2.5" />
                              Contact
                            </span>
                          )}
                        </div>

                        {/* Programs */}
                        {item.programs && item.programs.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {item.programs.slice(0, 3).map(p => (
                              <span key={p} className="px-2.5 py-1 bg-brand-gold/5 rounded-full text-[7px] font-bold uppercase tracking-widest text-brand-gold/80">
                                {p}
                              </span>
                            ))}
                            {item.programs.length > 3 && (
                              <span className="px-2.5 py-1 text-[7px] font-bold text-brand-dark/30">
                                +{item.programs.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-32"
              >
                <GraduationCap className="w-16 h-16 text-brand-dark/10 mx-auto mb-6" />
                <p className="text-brand-dark/40 font-serif text-2xl mb-4">No schools found</p>
                <p className="text-brand-dark/30 text-sm mb-8">Try a different location</p>
                <button
                  onClick={() => setActiveLocation('All')}
                  className="px-8 py-3 rounded-full bg-brand-dark text-white text-[10px] font-bold uppercase tracking-widest hover:bg-brand-gold transition-all"
                >
                  View All
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ========== ACADEMIC PROGRAMMES ========== */}
      <AdinkraBg variant="akoma" opacity={0.03} color="#c8a96e">
      <RevealSection variant="scaleIn" className="py-24 px-6 bg-brand-cream/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">
              Academic Catalog
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif leading-[0.9] tracking-tighter text-brand-dark mb-6">
              Programmes Offered
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-brand-dark/50 text-sm font-light max-w-xl mx-auto">
              Across all institutions, students can pursue a diverse range of academic and
              vocational programmes designed for tertiary readiness and career success.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allPrograms.map((program, idx) => {
              const schoolCount = SCHOOLS.filter(s => s.programs?.includes(program)).length
              return (
                <motion.div
                  key={program}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white border border-brand-dark/5 hover:shadow-md hover:border-brand-gold/20 transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-brand-gold/10 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-dark leading-tight">{program}</p>
                    <p className="text-[9px] text-brand-dark/30 font-bold uppercase tracking-widest">
                      {schoolCount} school{schoolCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </RevealSection>
      </AdinkraBg>

      {/* ========== WHY STUDY HERE ========== */}
      <AdinkraBg variant="aban" opacity={0.025} color="#c8a96e">
      <RevealSection variant="slideRight" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">
                Why Asuogyaman
              </span>
              <h2 className="text-4xl md:text-5xl font-serif leading-[0.9] tracking-tighter text-brand-dark mb-6">
                Excellence in Education
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  icon: Award,
                  title: 'Academic Excellence',
                  desc: 'Schools in Asuogyaman consistently produce outstanding WASSCE results, with graduates gaining admission to top universities in Ghana and abroad. Dedicated faculty and rigorous curricula ensure every student reaches their full potential.',
                },
                {
                  icon: Users,
                  title: 'Holistic Development',
                  desc: 'Beyond academics, students engage in sports, leadership programmes, cultural activities, and community service. Our institutions nurture well-rounded individuals ready to lead and serve.',
                },
                {
                  icon: Library,
                  title: 'Modern Facilities',
                  desc: 'From well-equipped science laboratories and computer centres to comprehensive libraries and sports complexes, our schools provide an environment conducive to 21st-century learning.',
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
        </div>
      </RevealSection>
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
              Enrol Today
            </span>
            <h2 className="text-4xl md:text-5xl font-serif leading-[0.9] tracking-tighter text-white mb-8">
              Shape Your Future
            </h2>
            <p className="text-white/40 leading-relaxed font-light mb-12 max-w-lg mx-auto">
              Asuogyaman's senior high schools offer a world-class education grounded in
              discipline, excellence, and tradition. Take the first step toward a brighter future.
            </p>
          </motion.div>
        </motion.div>
      </section>
      </AdinkraBg>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedSchool && (
          <DetailPanel item={selectedSchool} type="school" onClose={() => setSelectedSchool(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
