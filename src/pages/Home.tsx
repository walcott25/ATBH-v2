import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { ATTRACTIONS, DINING, STAY, REVIEWS, EXPERIENCES, EVENTS } from '../data';
import { Star, MapPin, ArrowRight, Compass, Sun, Car, Sparkles, Droplets, Landmark, TreePine, Tent } from 'lucide-react';
import AnimatedSection from '../components/animations/animated-section';
import GlassCard from '../components/ui/glass-card';
import AppSection from '../components/ui/app-section';
import AnimatedCounter from '../components/ui/animated-counter';
import { FloatingOrbs } from '../components/ui/floating-orbs';

const easeOut = [0.25, 0.1, 0.25, 1] as const;

function DotGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.012]">
      <div className="w-full h-full" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />
    </div>
  )
}

function SectionHeading({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-2xl md:text-3xl font-medium text-fg tracking-tight ${className}`}>
      {children}
    </h2>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  const num = parseFloat(value)
  const suffix = value.includes('+') ? '+' : value.includes('.') ? '' : '+'
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-medium text-fg mb-1 text-gradient">
        <AnimatedCounter value={num} suffix={suffix} decimals={value.includes('.') ? 1 : 0} />
      </div>
      <div className="text-xs text-muted tracking-wide">{label}</div>
    </div>
  )
}

function HighlightCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: easeOut }}
      className="text-center group"
    >
      <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4 ring-1 ring-accent/20 group-hover:ring-accent/40 group-hover:bg-accent/15 transition-all duration-300">
        <Icon className="w-5 h-5 text-accent" />
      </div>
      <h3 className="text-sm font-medium text-fg mb-2">{title}</h3>
      <p className="text-xs text-muted leading-relaxed max-w-xs mx-auto">{description}</p>
    </motion.div>
  )
}

function ListingCard({ item, linkTo, featured = false }: { item: any; linkTo: string; featured?: boolean }) {
  return (
    <Link to={linkTo} className="block group">
      <div className={`relative overflow-hidden rounded-2xl bg-surface border border-border/60 group-hover:border-accent/20 transition-all duration-500 ${featured ? 'aspect-[21/9] md:aspect-[3/1]' : 'aspect-[4/3]'}`}>
        <img
          src={item.image}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 block max-w-none"
          style={{ height: '100%' }}
        />
        <div className={`absolute inset-0 transition-opacity duration-500 ${featured ? 'bg-gradient-to-t from-fg/90 via-fg/20 to-transparent' : 'bg-gradient-to-t from-fg/60 via-transparent to-transparent opacity-0 group-hover:opacity-100'}`} />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-accent/20 rounded-2xl transition-all duration-500 pointer-events-none" />

        {/* Gold glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(197,149,74,0.15), transparent 60%)' }} />

        {/* Shine sweep */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
          <div className="absolute -inset-full top-0 -left-full w-full h-full group-hover:left-full transition-all duration-1000" style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.08) 45%, transparent 55%)' }} />
        </div>

        {/* Category badge */}
        <span className={`absolute top-4 left-4 md:top-5 md:left-5 px-3 py-1 rounded-full text-[9px] font-semibold uppercase tracking-[0.2em] backdrop-blur-xl border border-white/10 bg-white/10 text-white/90 ${featured ? 'md:top-6 md:left-6' : ''}`}>
          {item.category}
        </span>

        {featured ? (
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
            <h3 className="text-xl md:text-3xl font-medium text-white tracking-tight mb-2 group-hover:translate-y-[-2px] transition-transform duration-300">{item.name}</h3>
            <p className="text-xs md:text-sm text-white/60 max-w-xl leading-relaxed line-clamp-2">{item.description}</p>
            <div className="flex items-center gap-3 mt-3 md:mt-4">
              {'rating' in item && item.rating && (
                <div className="flex items-center gap-1 bg-accent/15 backdrop-blur-xl px-2.5 py-1 rounded-full">
                  <Star className="w-3 h-3 fill-accent text-accent" />
                  <span className="text-[10px] font-semibold text-accent">{item.rating}</span>
                </div>
              )}
              <span className="text-[10px] text-white/40 font-medium tracking-wider flex items-center gap-1">
                <ArrowRight className="w-3 h-3" /> Explore
              </span>
            </div>
          </div>
        ) : (
          <div className="p-4 md:p-5">
            <h3 className="text-sm md:text-base font-medium text-fg mb-1 group-hover:text-accent transition-colors duration-300">{item.name}</h3>
            <p className="text-xs text-muted leading-relaxed line-clamp-2">{item.description}</p>
            {'rating' in item && item.rating && (
              <div className="flex items-center gap-1 mt-2">
                <Star className="w-3 h-3 fill-accent text-accent" />
                <span className="text-[10px] font-medium text-accent">{item.rating}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}

function ExperienceRow({ item, index }: { item: any; index: number }) {
  const isReversed = index % 2 === 1
  return (
    <Link to="/experience" className="block group">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: easeOut }}
        className={`grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden bg-surface border border-border/60 group-hover:border-accent/15 transition-all duration-500 ${isReversed ? 'md:grid-flow-dense' : ''}`}
      >
        <div className={`aspect-[4/3] md:aspect-auto md:h-full overflow-hidden relative ${isReversed ? 'md:col-start-2' : ''}`}>
          <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 block max-w-none" style={{ height: '100%' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-fg/30 via-transparent to-transparent md:bg-gradient-to-r md:from-fg/20 md:to-transparent" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-accent/20 rounded-2xl transition-all duration-500 pointer-events-none" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(197,149,74,0.1), transparent 70%)' }} />
        </div>
        <div className={`p-6 md:p-10 flex flex-col justify-center ${isReversed ? 'md:col-start-1 md:pr-8' : 'md:pl-8'}`}>
          <span className="inline-flex self-start text-[9px] font-semibold uppercase tracking-[0.25em] text-accent mb-3 px-3 py-1 rounded-full border border-accent/15 bg-accent/5">{item.category}</span>
          <h3 className="text-lg md:text-2xl font-medium text-fg mb-3 group-hover:text-accent transition-colors duration-300 tracking-tight">{item.name}</h3>
          <p className="text-xs md:text-sm text-muted leading-relaxed line-clamp-3 mb-4">{item.description}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-muted">
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-accent/5 rounded-full border border-accent/10"><MapPin className="w-3 h-3 text-accent" />{item.price}</span>
            {item.duration && <span className="flex items-center gap-1.5">{item.duration}</span>}
            {'rating' in item && item.rating && (
              <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-accent text-accent" />{item.rating}</span>
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-accent mt-4 group-hover:gap-2 transition-all duration-300">
            Discover this experience <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </motion.div>
    </Link>
  )
}

function EventCard({ item }: { item: any }) {
  return (
    <Link to="/events" className="block group">
      <GlassCard hover="glow" className="h-full">
        <div className="relative overflow-hidden bg-surface" style={{ paddingBottom: '75%' }}>
          <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover block max-w-none" style={{ height: '100%' }} loading="lazy" />
        </div>
        <div className="p-5 space-y-2.5">
          <span className="text-[10px] text-accent font-semibold uppercase tracking-widest">{item.category}</span>
          <h3 className="text-sm font-medium text-fg group-hover:text-accent transition-colors duration-300">{item.name}</h3>
          <p className="text-xs text-muted leading-relaxed line-clamp-2">{item.description}</p>
          <div className="flex items-center gap-2 text-[10px] text-muted pt-1">
            <span>{item.date}</span>
            {item.duration && <><span className="text-border">|</span><span>{item.duration}</span></>}
          </div>
        </div>
      </GlassCard>
    </Link>
  )
}

export default function Home() {
  const [reviewIndex, setReviewIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section ref={heroRef} className="relative h-dvh flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroImgY }}>
          <img
            src="/Images/adomi-bridge-hero.jpg"
            alt="Adomi Bridge"
            className="absolute inset-0 w-full h-full object-cover block max-w-none"
            style={{ height: '100%' }}
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-fg/50 via-fg/40 to-fg/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" style={{ mixBlendMode: 'soft-light' }} />
        </motion.div>

        <FloatingOrbs />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 text-center px-5 max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[10px] font-medium tracking-[0.25em] uppercase text-accent border border-accent/20 bg-accent/5 backdrop-blur-sm mb-6">
              <Sparkles className="w-3 h-3" />
              Eastern Region, Ghana
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: easeOut }}
            className="font-['Playfair_Display_SC'],serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-semibold tracking-wide leading-none mb-4"
          >
            Asuogyaman
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: easeOut }}
            className="text-xs md:text-sm text-white/40 font-medium tracking-[0.25em] uppercase mb-6"
          >
            Eastern Region, Ghana
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.55, ease: easeOut }}
            className="w-16 h-0.5 bg-accent/60 mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: easeOut }}
            className="text-sm md:text-base text-white/60 max-w-lg mx-auto mb-12 leading-relaxed font-light"
          >
            Where the Volta River shapes a landscape of engineering marvels, natural beauty, and quiet luxury.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: easeOut }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <Link
              to="/attractions"
              className="group inline-flex items-center gap-2 bg-accent text-accent-fg px-6 py-3 text-sm font-medium rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30"
            >
              Explore Attractions
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/map"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl text-white/80 border border-white/20 hover:bg-white/10 hover:text-white transition-all duration-300 backdrop-blur-sm"
            >
              <MapPin className="w-4 h-4" />
              View Map
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: easeOut }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Stats */}
      <AnimatedSection className="py-16 px-5 relative">
        <DotGrid />
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center relative">
          {[
            { value: '25+', label: 'Destinations' },
            { value: '50+', label: 'Experiences' },
            { value: '4.9', label: 'Rating' },
          ].map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </AnimatedSection>

      {/* Why Visit */}
      <AnimatedSection className="py-20 px-5 relative overflow-hidden">
        <DotGrid />
        <div className="max-w-6xl mx-auto relative">
          <SectionHeading className="text-center mb-12">Why Visit Asuogyaman</SectionHeading>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <HighlightCard
              icon={Compass}
              title="Sunset Cruises"
              description="Glide across Lake Volta aboard the Dodi Princess as golden light paints the water."
            />
            <HighlightCard
              icon={Sparkles}
              title="Engineering Marvels"
              description="Stand before the Akosombo Dam and walk the iconic Adomi Bridge across the Volta."
            />
            <HighlightCard
              icon={Star}
              title="Luxury Lakeside Stays"
              description="Unwind at world-class resorts perched on the banks of one of Africa's largest lakes."
            />
            <HighlightCard
              icon={Sun}
              title="Rich Cultural Heritage"
              description="Experience Akwama festivals, traditional drumming, and centuries-old customs."
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Featured Attractions — Editorial Hero + Grid */}
      <AnimatedSection className="py-20 md:py-28 px-5 relative overflow-hidden">
        <FloatingOrbs />
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="flex items-end justify-between mb-8 md:mb-12"
          >
            <div>
              <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-accent mb-2 block">Explore</span>
              <SectionHeading>Discover</SectionHeading>
            </div>
            <Link to="/attractions" className="group text-[10px] font-medium text-muted hover:text-accent transition-colors flex items-center gap-1.5">
              View all <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Hero feature card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="mb-5"
          >
            <ListingCard item={ATTRACTIONS[0]} linkTo="/attractions" featured />
          </motion.div>

          {/* Two smaller cards */}
          <div className="grid sm:grid-cols-2 gap-5">
            {ATTRACTIONS.slice(1, 3).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: easeOut }}
              >
                <ListingCard item={item} linkTo="/attractions" />
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* About Asuogyaman — Split Layout */}
      <AnimatedSection className="py-20 md:py-28 px-5 relative overflow-hidden">
        <DotGrid />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-accent mb-3 block">About</span>
            <SectionHeading>Discover Asuogyaman</SectionHeading>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-stretch">
            {/* Image side */}
            <div className="h-full">
              <div className="relative overflow-hidden rounded-2xl h-full min-h-[280px] md:min-h-[320px] bg-border/15">
                <img
                  src="/Images/volta-river-landscape.jpg"
                  alt="Serene Volta River landscape"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fg/30 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
                {/* World Class badge */}
                <div
                  className="absolute bottom-3 right-3 md:bottom-6 md:right-6 rounded-xl p-3 md:p-5 cursor-default"
                  style={{
                    background: 'linear-gradient(135deg, rgba(20,20,20,0.92), rgba(30,30,30,0.85))',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.3), 0 10px 24px -4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
                  }}
                >
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
                  <div className="flex items-center gap-2">
                    <span className="text-lg md:text-xl leading-none">🏆</span>
                    <div className="text-xl md:text-2xl font-medium text-white/90 tracking-tight">World Class</div>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-accent shadow-sm shadow-accent/50" />
                    <div className="text-[10px] text-white/40 tracking-wide">Premium Destination</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text side */}
            <div className="flex flex-col justify-center space-y-6">
              <h3 className="text-2xl md:text-3xl font-medium text-fg tracking-tight leading-tight">
                Where the Volta River{' '}
                <span className="text-accent">shapes a landscape</span> of wonder
              </h3>

              <p className="text-sm text-muted leading-relaxed">
                Nestled in Ghana's Eastern Region, Asuogyaman is a district defined by the majestic Volta River. 
                From the engineering marvel of the Akosombo Dam to the iconic Adomi Bridge, this land offers a 
                rare blend of natural beauty, cultural richness, and modern adventure.
              </p>

              <p className="text-sm text-muted leading-relaxed">
                Whether you're cruising Lake Volta aboard the Dodi Princess, hiking the Akwamu Gorge, 
                or unwinding at a luxury lakeside resort, every moment here tells a story of heritage, 
                innovation, and warm Ghanaian hospitality.
              </p>

              {/* Quick facts */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { icon: Droplets, label: 'Lake Volta', detail: 'World\'s largest man-made lake' },
                  { icon: Landmark, label: 'Adomi Bridge', detail: 'Iconic suspension bridge' },
                  { icon: TreePine, label: 'Akwamu Gorge', detail: 'Lush hiking trails' },
                  { icon: Tent, label: 'Luxury Resorts', detail: 'World-class lakeside stays' },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-border/60">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <f.icon className="w-4 h-4 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-fg">{f.label}</div>
                      <div className="text-[9px] text-muted truncate">{f.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/attractions"
                className="group inline-flex items-center gap-2 text-xs font-medium text-accent hover:text-accent/80 transition-colors pt-1"
              >
                Explore Asuogyaman <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Dining Preview — Editorial Scroll */}
      <AnimatedSection className="py-20 md:py-28 px-5 relative overflow-hidden">
        <DotGrid />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="flex items-end justify-between mb-8 md:mb-12"
          >
            <div>
              <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-accent mb-2 block">Dining</span>
              <SectionHeading>Where to Eat</SectionHeading>
            </div>
            <Link to="/dining" className="group text-[10px] font-medium text-muted hover:text-accent transition-colors flex items-center gap-1.5">
              View all <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Horizontal scroll */}
          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide -mx-5 px-5 snap-x snap-mandatory">
            {DINING.slice(0, 5).map((item, i) => (
              <Link
                key={item.id}
                to="/dining"
                className="group snap-start shrink-0 w-[280px] sm:w-[340px] aspect-[4/5] rounded-2xl overflow-hidden relative border border-border/60 group-hover:border-accent/20 transition-all duration-500"
              >
                <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 block max-w-none" style={{ height: '100%' }} loading={i < 2 ? 'eager' : 'lazy'} />
                <div className="absolute inset-0 bg-gradient-to-t from-fg/85 via-fg/10 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-accent/20 rounded-2xl transition-all duration-500 pointer-events-none" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(197,149,74,0.12), transparent 60%)' }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                  <div className="absolute -inset-full top-0 -left-full w-full h-full group-hover:left-full transition-all duration-1000" style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.06) 45%, transparent 55%)' }} />
                </div>
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[8px] font-semibold uppercase tracking-[0.2em] backdrop-blur-xl border border-white/10 bg-white/10 text-white/90">{item.category}</span>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <h3 className="text-sm md:text-base font-medium text-white mb-1 group-hover:translate-y-[-1px] transition-transform duration-300">{item.name}</h3>
                  <p className="text-[10px] text-white/50 leading-relaxed line-clamp-2">{item.description}</p>
                  {'rating' in item && item.rating && (
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-3 h-3 fill-accent text-accent" />
                      <span className="text-[9px] font-semibold text-accent">{item.rating}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Curated Experiences — Alternating Editorial Layout */}
      <AnimatedSection className="py-20 md:py-28 px-5 relative overflow-hidden">
        <FloatingOrbs />
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="flex items-end justify-between mb-8 md:mb-12"
          >
            <div>
              <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-accent mb-2 block">Experiences</span>
              <SectionHeading>Curated Experiences</SectionHeading>
            </div>
            <Link to="/experience" className="group text-[10px] font-medium text-muted hover:text-accent transition-colors flex items-center gap-1.5">
              View all <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          <div className="space-y-6 md:space-y-8">
            {EXPERIENCES.slice(0, 2).map((item, i) => (
              <ExperienceRow key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Stay Preview — Hero + Grid */}
      <AnimatedSection className="py-20 md:py-28 px-5 relative overflow-hidden">
        <DotGrid />
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="flex items-end justify-between mb-8 md:mb-12"
          >
            <div>
              <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-accent mb-2 block">Accommodation</span>
              <SectionHeading>Where to Stay</SectionHeading>
            </div>
            <Link to="/stay" className="group text-[10px] font-medium text-muted hover:text-accent transition-colors flex items-center gap-1.5">
              View all <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="mb-5"
          >
            <ListingCard item={STAY[0]} linkTo="/stay" featured />
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {STAY.slice(1, 3).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: easeOut }}
              >
                <ListingCard item={item} linkTo="/stay" />
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Gallery Strip — Cinematic Gallery */}
      <AnimatedSection className="py-20 md:py-28 px-5 relative overflow-hidden">
        <FloatingOrbs />
        <div className="max-w-full relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="flex items-end justify-between mb-8 md:mb-12 max-w-6xl mx-auto px-5"
          >
            <div>
              <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-accent mb-2 block">Gallery</span>
              <SectionHeading>Scenes from Asuogyaman</SectionHeading>
            </div>
            <Link to="/gallery" className="group text-[10px] font-medium text-muted hover:text-accent transition-colors flex items-center gap-1.5">
              View all <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          <div className="flex gap-3 md:gap-5 overflow-x-auto pb-6 scrollbar-hide px-5 snap-x snap-mandatory">
            {ATTRACTIONS.slice(0, 6).map((item, i) => (
              <Link
                key={item.id}
                to="/gallery"
                className="group snap-start shrink-0 w-[280px] sm:w-[360px] md:w-[440px] aspect-[16/10] rounded-2xl overflow-hidden relative border border-border/60 group-hover:border-accent/20 transition-all duration-500"
              >
                <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 block max-w-none" style={{ height: '100%' }} loading={i < 2 ? 'eager' : 'lazy'} />
                <div className="absolute inset-0 bg-gradient-to-t from-fg/70 via-transparent to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-accent/15 rounded-2xl transition-all duration-500 pointer-events-none" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(197,149,74,0.1), transparent 70%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <h3 className="text-sm md:text-lg font-medium text-white mb-1 group-hover:translate-y-[-1px] transition-transform duration-300">{item.name}</h3>
                  <p className="text-[11px] text-white/60 leading-relaxed line-clamp-1">{item.category}</p>
                </div>
                {/* Index indicator */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center">
                  <span className="text-[10px] font-mono text-white/80">{String(i + 1).padStart(2, '0')}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Gradient fade edges */}
          <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-bg to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-bg to-transparent pointer-events-none" />
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection className="py-24 px-5 relative overflow-hidden">
        <FloatingOrbs />
        <div className="max-w-3xl mx-auto text-center relative">
          <SectionHeading className="mb-10">What Visitors Say</SectionHeading>
          <div className="relative min-h-[140px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={reviewIndex}
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: easeOut }}
                className="space-y-6"
              >
                <p className="text-base md:text-lg text-fg leading-relaxed italic">&ldquo;{REVIEWS[reviewIndex].text}&rdquo;</p>
                <div className="flex items-center justify-center gap-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: REVIEWS[reviewIndex].rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                    ))}
                  </div>
                  <span className="text-sm text-muted font-medium">&mdash; {REVIEWS[reviewIndex].user}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-center gap-2 mt-8">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setReviewIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === reviewIndex ? 'w-6 bg-accent' : 'w-1.5 bg-border hover:bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Upcoming Events */}
      <AnimatedSection className="py-20 px-5 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <SectionHeading>Upcoming Events</SectionHeading>
            <Link to="/events" className="text-xs text-accent hover:text-accent/80 transition-colors font-medium flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {EVENTS.slice(0, 3).map((item) => (
              <EventCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Plan Your Trip */}
      <AnimatedSection className="py-20 px-5 relative overflow-hidden">
        <DotGrid />
        <div className="max-w-5xl mx-auto relative">
          <SectionHeading className="text-center mb-12">Plan Your Trip</SectionHeading>
          <div className="grid sm:grid-cols-3 gap-10">
            {[
              { icon: Sun, title: 'Best Time to Visit', body: 'November to March offers the most pleasant weather — clear skies, cool breezes, and calm lake waters perfect for cruising.' },
              { icon: Car, title: 'Getting There', body: 'A 90-minute drive from Accra via the Akosombo road. Regular buses and tro-tros run from major terminals throughout the day.' },
              { icon: Compass, title: 'Travel Tips', body: 'Pack light clothing, sunscreen, and a camera. Most attractions are cash-based. Local guides are available at major sites.' },
            ].map((item) => (
              <div key={item.title} className="glass rounded-xl p-6 hover-lift">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 ring-1 ring-accent/20">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-sm font-medium text-fg mb-2">{item.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* App Download */}
      <AppSection />

      {/* CTA Banner */}
      <AnimatedSection className="py-28 px-5 text-center relative overflow-hidden">
        <FloatingOrbs />
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
        <div className="max-w-lg mx-auto relative">
          <h2 className="text-3xl md:text-4xl font-medium text-fg mb-3 tracking-tight">Ready to explore?</h2>
          <p className="text-sm text-muted mb-8 leading-relaxed">
            Start planning your visit to Asuogyaman and discover everything the Eastern Region has to offer.
          </p>
          <Link
            to="/map"
            className="group inline-flex items-center gap-2 bg-accent text-accent-fg px-7 py-3.5 text-sm font-medium rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30"
          >
            Plan Your Visit
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}
