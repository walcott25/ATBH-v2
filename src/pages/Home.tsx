import { motion, useTransform, useScroll } from 'motion/react';
import { Star, Play, MapPin, Phone, Hotel, ChevronRight, Waves, Menu, X, Mountain, UtensilsCrossed, Building2, Calendar, Briefcase, GraduationCap, Clock, ArrowRight } from 'lucide-react';
import { REVIEWS, ATTRACTIONS, EVENTS } from '../data';
import AdinkraBg from '../components/ui/adinkra-bg';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }
  }
};

export default function Home() {
  const navigate = useNavigate();
  const { isVideoOpen, setIsVideoOpen } = useApp();

  // Page scroll progress
  const { scrollYProgress: pageProgress } = useScroll();

  // Section parallax
  const parallaxBg = useTransform(pageProgress, [0, 1], [0, 60]);
  const parallaxBgFast = useTransform(pageProgress, [0, 1], [0, 100]);



  return (
    <div className="min-h-screen selection:bg-brand-gold selection:text-white overflow-x-hidden">
      {/* Split-screen Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="grid lg:grid-cols-2 min-h-screen">
          {/* LEFT — Image panel */}
          <motion.div
            initial={{ clipPath: 'inset(0 0 0 100%)' }}
            animate={{ clipPath: 'inset(0 0 0 0)' }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative h-[60vh] lg:h-auto overflow-hidden order-1 lg:order-1"
          >
            {/* Ken Burns bg */}
            <motion.div
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0"
            >
              <img
                src="/Images/adomi-bridge-hero.jpg"
                alt="Adomi Bridge at Golden Hour"
                className="w-full h-full object-cover"
                fetchPriority="high"
                style={{ willChange: 'transform' }}
              />
            </motion.div>

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/30 to-brand-dark/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/60 via-transparent to-transparent" />
            <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.4)]" />

            {/* Content overlay on image — bottom-left */}
            <div className="absolute bottom-0 left-0 p-10 lg:p-16 text-left">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-10 h-[2px] bg-brand-gold" />
                  <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-brand-gold">Discover</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif text-white leading-[0.95] tracking-tighter mb-4">
                  The Gateway<br />
                  <span className="text-brand-gold">to the East</span>
                </h3>
                <p className="text-white/50 text-sm font-light max-w-md leading-relaxed">
                  Where the Volta River carves a majestic path through verdant hills,
                  connecting communities and cultures.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT — White content panel */}
          <div className="relative flex items-center bg-white order-2 lg:order-2">
            <div className="px-10 lg:px-20 py-20 max-w-xl">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}>
                <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">
                  Welcome to Asuogyaman
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[0.9] tracking-tighter text-brand-dark mb-8">
                  Begin Your<br />
                  <span className="italic text-brand-gold/90">Journey</span>
                </h1>
                <p className="text-brand-dark/50 text-base font-light leading-relaxed mb-16 max-w-md">
                  The gateway to the Eastern Region — where the mighty Volta River meets
                  engineering marvels, luxury escapes, and untamed African beauty.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <button
                    onClick={() => navigate('/attractions')}
                    className="group inline-flex items-center gap-3 bg-brand-dark text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-[0.2em] hover:bg-brand-gold transition-all duration-500"
                  >
                    Begin the Journey
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => setIsVideoOpen(true)}
                    className="group flex items-center gap-4 text-brand-dark/60 hover:text-brand-dark font-medium tracking-wider text-xs uppercase transition-all duration-500"
                  >
                    <span className="relative w-14 h-14 rounded-full border-2 border-brand-dark/15 group-hover:border-brand-gold flex items-center justify-center transition-all duration-500 group-hover:bg-brand-gold/10 group-hover:scale-110">
                      <Play className="w-4 h-4 fill-current ml-0.5 text-brand-dark/60 group-hover:text-brand-gold" />
                    </span>
                    <span className="border-b border-brand-dark/15 group-hover:border-brand-gold pb-1 transition-all duration-500">Watch Film</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom gradient bridge */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-cream/50 to-transparent z-10 pointer-events-none" />
      </section>

      {/* Quick Navigation Strip */}
      <AdinkraBg variant="akoma" opacity={0.035} color="#c8a96e" className="relative">
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-16 px-6 bg-brand-cream relative"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { label: 'Attractions', icon: Mountain, route: '/attractions' },
              { label: 'Dining', icon: UtensilsCrossed, route: '/dining' },
              { label: 'Stay', icon: Building2, route: '/stay' },
              { label: 'Events', icon: Calendar, route: '/events' },
              { label: 'Business', icon: Briefcase, route: '/business' },
              { label: 'Schools', icon: GraduationCap, route: '/schools' },
            ].map(({ label, icon: Icon, route }) => (
              <motion.button
                key={label}
                onClick={() => navigate(route)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.96 }}
                className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-brand-dark/5 hover:border-brand-gold/30 hover:shadow-xl hover:shadow-brand-gold/5 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center group-hover:bg-brand-gold group-hover:scale-110 transition-all duration-500">
                  <Icon className="w-5 h-5 text-brand-gold group-hover:text-white transition-colors" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-dark/50 group-hover:text-brand-dark transition-colors">
                  {label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>
      </AdinkraBg>

      {/* ========== ABOUT ASUOGYAMAN — WORLD-CLASS ========== */}
      <section className="relative overflow-hidden bg-white">
        {/* Top gradient bridge */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-brand-cream to-white z-10 pointer-events-none" />

        <div className="relative z-20">
          {/* Split layout: story panel left, image panel right */}
          <div className="grid lg:grid-cols-2 min-h-[90vh]">
            {/* LEFT — Story Panel */}
            <div className="relative flex items-center bg-white">
              <div className="px-10 lg:px-20 py-20 max-w-2xl">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                  >
                    <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">
                      About Asuogyaman
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[0.9] tracking-tighter text-brand-dark mb-8">
                      A District of<br />
                      <span className="italic text-brand-gold/90">Extraordinary</span> Heritage
                    </h2>
                  </motion.div>

                  {/* Story paragraphs */}
                  <div className="space-y-6 text-brand-dark/60 leading-relaxed">
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-base font-light"
                    >
                      Nestled in the Eastern Region of Ghana, Asuogyaman District is a captivating tapestry of
                      natural wonder, engineering brilliance, and rich cultural heritage. It is home to the
                      legendary <span className="text-brand-dark font-medium">Akosombo Dam</span> — the monumental
                      hydroelectric project that gave birth to Lake Volta, the world's largest man-made lake
                      by surface area.
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.35 }}
                      className="text-base font-light"
                    >
                      The district takes its name from the meandering Volta River, which carves a majestic
                      path through verdant hills and valleys. Here, the iconic <span className="text-brand-dark font-medium">Adomi Bridge</span> —
                      Ghana's most famous suspension bridge — stands as a symbol of national pride and
                      engineering prowess, connecting communities and cultures.
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="text-base font-light"
                    >
                      Beyond its landmarks, Asuogyaman is a vibrant hub of tourism, hospitality, and
                      enterprise. From world-class lakeside resorts like <span className="text-brand-dark font-medium">The Royal Senchi</span> to
                      thrilling boat cruises aboard the Dodi Princess, the district offers an
                      unparalleled blend of relaxation and adventure.
                    </motion.p>
                  </div>

                  {/* Signature line */}
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.65 }}
                    className="flex items-center gap-4 mt-12 mb-10"
                    style={{ transformOrigin: 'left' }}
                  >
                    <span className="w-16 h-[2px] bg-brand-gold/60" />
                    <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-brand-gold">
                      The Gateway to the Eastern Region
                    </span>
                  </motion.div>
                </motion.div>

                {/* Milestone Strip */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="grid grid-cols-3 gap-6 pt-10 border-t border-brand-dark/5"
                >
                  {[
                    { value: '1957', label: 'Adomi Bridge Built' },
                    { value: '1965', label: 'Akosombo Dam Completed' },
                    { value: '8,502', label: 'km² Lake Volta' },
                  ].map((m, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-xl md:text-2xl font-serif text-brand-gold tracking-tight">{m.value}</div>
                      <div className="text-[7px] uppercase tracking-[0.3em] font-bold text-brand-dark/30 mt-1">{m.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* RIGHT — Image Panel */}
            <motion.div
              initial={{ clipPath: 'inset(0 0 0 100%)' }}
              whileInView={{ clipPath: 'inset(0 0 0 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative h-[60vh] lg:h-auto overflow-hidden"
            >
              {/* Ken Burns bg */}
              <motion.div
                initial={{ scale: 1.15 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0"
              >
                <img
                  src="/Images/volta-river-landscape.jpg"
                  alt="Sunset on the Volta River"
                  className="w-full h-full object-cover"
                  style={{ willChange: 'transform' }}
                />
              </motion.div>

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/30 to-brand-dark/10" />
              <div className="absolute inset-0 bg-gradient-to-l from-brand-dark/60 via-transparent to-transparent" />
              <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.4)]" />

              {/* Content overlay on image — bottom-right */}
              <div className="absolute bottom-0 right-0 p-10 lg:p-16 text-right">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="flex items-center justify-end gap-3 mb-6">
                    <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-brand-gold">The Land</span>
                    <span className="w-10 h-[2px] bg-brand-gold" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif text-white leading-[0.95] tracking-tighter mb-4">
                    Where the Volta<br />
                    <span className="text-brand-gold">Meets the Sky</span>
                  </h3>
                  <p className="text-white/50 text-sm font-light max-w-md leading-relaxed ml-auto">
                    Stretching along the eastern banks of the Volta River, Asuogyaman is a land of
                    dramatic contrasts — from the thundering spillways of Akosombo to the tranquil
                    shores of Dodi Island.
                  </p>

                  {/* Quick geographic badges */}
                  <div className="flex flex-wrap gap-3 mt-8 justify-end">
                    {['Eastern Region', 'Volta River', 'Ghana'].map((tag) => (
                      <span key={tag} className="px-4 py-2 bg-white/8 backdrop-blur-xl border border-white/10 rounded-full text-[8px] uppercase tracking-[0.3em] font-bold text-white/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient bridge */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-cream/50 to-transparent z-10 pointer-events-none" />
      </section>

      {/* Featured Experience */}
      <motion.section
        id="experience"
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative py-48 overflow-hidden bg-brand-dark text-white"
      >
        <div className="absolute inset-0 z-0">
          <motion.img
            style={{ y: parallaxBg }}
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 2 }}
            src="/Images/penninsula.jpg"
            alt="Luxury Resort"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-gold font-bold tracking-[0.5em] uppercase text-[10px] mb-8 block">The Royal Standard</span>
            <h2 className="text-3xl md:text-5xl font-serif leading-[0.9] mb-12 tracking-tighter">Elegance on the <br /><span className="italic text-brand-gold/80">Volta River</span></h2>
            <p className="text-white/60 text-xl leading-relaxed mb-16 font-light max-w-xl">
              Experience the pinnacle of Ghanaian hospitality at Asuogyaman. Most locations are nestled on acres of lush greenery, these resort offers a sanctuary where luxury meets the soul of the river.
            </p>
            <div className="flex gap-16">
              <div className="group">
                <div className="text-3xl font-serif text-brand-gold mb-2 group-hover:scale-110 transition-transform">84</div>
                <div className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">Luxury Rooms</div>
              </div>
              <div className="group">
                <div className="text-3xl font-serif text-brand-gold mb-2 group-hover:scale-110 transition-transform">4.9</div>
                <div className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">Guest Rating</div>
              </div>
              <div className="group">
                <div className="text-3xl font-serif text-brand-gold mb-2 group-hover:scale-110 transition-transform">100%</div>
                <div className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">Serenity</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-full border border-brand-gold/20 p-12 animate-spin-slow">
              <div className="w-full h-full rounded-full border border-brand-gold/40 border-dashed" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rotate-6 group">
                <img
                  src="/Images/adomi gh.jpg"
                  alt="Resort View"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Travel Tips */}
      <AdinkraBg variant="aban" opacity={0.025} color="#c8a96e">
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-32 px-6 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Traveler Guide</span>
              <h2 className="text-3xl md:text-4xl font-serif leading-tight mb-8 tracking-tighter">Tips for your <br /><span className="italic text-brand-gold/80">Journey</span></h2>
              <div className="space-y-8 mt-12">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Waves className="text-brand-gold w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif mb-2">Best Time to Visit</h4>
                    <p className="text-brand-dark/60 text-sm font-light leading-relaxed">
                      The best time to enjoy lake activities is during the dry season (November to March) when the weather is most favorable.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Waves className="text-brand-gold w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif mb-2">Cultural Immersion</h4>
                    <p className="text-brand-dark/60 text-sm font-light leading-relaxed">
                      Try local boat tours and don't miss the annual Asuogyaman Tourism & Arts Festival in December for a deep dive into local culture.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <img
                src="/Images/photo.jpg"
                alt="Travel Tips"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-dark/20" />
            </motion.div>
          </div>
        </div>
      </motion.section>
      </AdinkraBg>

      {/* Featured Attractions */}
      <AdinkraBg variant="gye-nyame" opacity={0.025} color="#c8a96e">
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-32 px-6 bg-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={staggerItem} className="text-center mb-16">
            <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Discover More</span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-6">Iconic Destinations</h2>
            <p className="text-brand-dark/50 text-sm max-w-xl mx-auto font-light">
              Curated experiences that define the Asuogyaman travel experience.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ATTRACTIONS.slice(0, 4).map((attraction, i) => (
              <motion.div
                key={attraction.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                onClick={() => navigate('/attractions')}
                className="group relative h-[320px] rounded-3xl overflow-hidden cursor-pointer"
              >
                <img
                  src={attraction.image}
                  alt={attraction.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block text-[9px] font-black uppercase tracking-[0.3em] text-brand-gold bg-brand-gold/10 backdrop-blur-xl border border-brand-gold/20 px-3 py-1.5 rounded-full mb-3">
                    {attraction.category}
                  </span>
                  <h3 className="text-lg font-serif text-white mb-1">{attraction.name}</h3>
                  <p className="text-white/50 text-xs font-light line-clamp-2">{attraction.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => navigate('/attractions')}
              className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-brand-dark hover:text-brand-gold transition-colors"
            >
              View All Attractions
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </motion.section>
      </AdinkraBg>

      {/* Upcoming Events Preview */}
      <AdinkraBg variant="adinkrahene" opacity={0.04} color="#ffffff">
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-32 px-6 bg-brand-dark relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, rgba(212,175,55,0.3) 0%, transparent 60%)`,
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div variants={staggerItem} className="text-center mb-16">
            <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block text-center">Plan Ahead</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight mb-6">Upcoming Events & Festivals</h2>
            <p className="text-white/40 text-sm max-w-xl mx-auto font-light">
              Mark your calendar for these unforgettable experiences.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {EVENTS.slice(0, 4).map((ev, i) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                onClick={() => navigate('/events')}
                className="group relative bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] rounded-3xl overflow-hidden cursor-pointer hover:border-brand-gold/30 transition-all duration-500"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={ev.image}
                    alt={ev.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
                  <div className="absolute top-4 left-4 bg-brand-gold text-brand-dark text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-full">
                    {ev.category}
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/70 text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{ev.date}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-brand-gold/60 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">
                    <Clock className="w-3 h-3" />
                    <span>{ev.duration}</span>
                  </div>
                  <h3 className="text-base font-serif text-white group-hover:text-brand-gold transition-colors">{ev.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => navigate('/events')}
              className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-brand-gold hover:text-white transition-colors"
            >
              View Full Calendar
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </motion.section>
      </AdinkraBg>

      {/* Testimonials */}
      <AdinkraBg variant="akoma" opacity={0.03} color="#c8a96e">
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="py-24 px-6 bg-brand-cream"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-brand-gold font-medium tracking-[0.3em] uppercase text-[10px] mb-4 block">Testimonials</span>
            <h2 className="text-3xl font-serif mb-16 tracking-tight">Voices of the Volta</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                className="bg-white p-10 rounded-3xl shadow-sm border border-brand-dark/5 text-left"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <p className="text-lg font-serif italic mb-8 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-brand-gold/20 shrink-0">
                    <img src={review.avatar} alt={review.user} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-sm tracking-tight">{review.user}</div>
                    <div className="text-[10px] text-brand-dark/40 uppercase tracking-[0.2em]">Verified Traveler</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      </AdinkraBg>

      {/* App Download Section */}
      <AdinkraBg variant="aban" opacity={0.03} color="#ffffff">
      <section className="py-32 px-6 bg-brand-dark overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <motion.div
            style={{ y: parallaxBgFast }}
            className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-gold rounded-full blur-[120px]"
          />
          <motion.div
            style={{ y: useTransform(pageProgress, [0.7, 0.9], [0, -60]) }}
            className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-gold rounded-full blur-[120px]"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Experience More</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-8 tracking-tighter">
                Download the <br />
                <span className="italic text-brand-gold/80">Asuogyaman Tourism and Business App</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-12 font-light max-w-xl">
                Explore more about Asuogyaman Tourism with our dedicated mobile application. Get exclusive guides, real-time updates, and seamless booking right at your fingertips.
              </p>

              <div className="flex flex-wrap gap-6">
                <button className="flex items-center gap-4 bg-white text-brand-dark px-8 py-4 rounded-2xl hover:bg-brand-gold hover:text-white transition-all duration-500 group">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.67-.82 1.76-1.36 2.72-1.39.13 1.04-.3 2.08-.93 2.83-.63.75-1.66 1.32-2.68 1.24-.1-1.02.32-2.03.89-2.68z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-widest opacity-60 font-bold">Download on the</div>
                    <div className="text-lg font-bold leading-none">App Store</div>
                  </div>
                </button>
                <button className="flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-8 py-4 rounded-2xl hover:bg-white hover:text-brand-dark transition-all duration-500 group">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 0 1 0 1.732l-2.807 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-widest opacity-60 font-bold">Get it on</div>
                    <div className="text-lg font-bold leading-none">Google Play</div>
                  </div>
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
              className="relative flex justify-center"
            >
              <div className="w-[300px] h-[600px] bg-brand-dark rounded-[3rem] border-[8px] border-white/10 shadow-2xl overflow-hidden relative">
                <img
                  src="/Images/6aac0c6942b56c97175d4c80b3b68413.jpg"
                  alt="App Preview"
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
                <div className="absolute bottom-10 left-0 w-full px-8 text-center">
                  <div className="w-12 h-12 bg-brand-gold rounded-full mx-auto mb-4 flex items-center justify-center p-2.5">
                    <img src="/Images/a-minimalist-app-icon-design-of-a-tourist--vector-.png" alt="ATBH" className="w-full h-full object-contain" />
                  </div>
                  <div className="text-white font-serif text-xl mb-1">Asuogyaman Tourism & Business Guide</div>
                  <div className="text-brand-gold text-[10px] uppercase tracking-widest font-bold">Your Digital Companion</div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-gold/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl animate-pulse" />
            </motion.div>
          </div>
        </div>
      </section>
      </AdinkraBg>
    </div>
  );
}
