import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ATTRACTIONS } from '../data';
import { Star, X, ChevronLeft, ChevronRight } from 'lucide-react';
import AdinkraBg from '../components/ui/adinkra-bg';

const items = ATTRACTIONS;

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedIndex(prev => prev !== null ? (prev + 1) % items.length : null);
      }
      if (e.key === 'ArrowLeft') {
        setSelectedIndex(prev => prev !== null ? (prev - 1 + items.length) % items.length : null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Header */}
      <AdinkraBg variant="adinkrahene" opacity={0.04} color="#ffffff">
      <section className="relative bg-brand-dark pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[200px] pointer-events-none" />
        <div className="relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block"
          >
            Visual Journey
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tighter text-white"
          >
            The ATBH Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-sm md:text-base mt-4 max-w-xl mx-auto"
          >
            Explore the beauty and heritage of Asuogyaman through our curated collection
          </motion.p>
        </div>
      </section>
      </AdinkraBg>

      {/* Masonry Grid */}
      <section className="relative pb-32 px-6">
        <div className="max-w-7xl mx-auto columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
          {items.map((item, index) => {
            const heightClasses = [
              'aspect-[3/4]', 'aspect-[4/5]', 'aspect-square', 'aspect-[5/7]',
              'aspect-[3/5]', 'aspect-[4/3]', 'aspect-[5/6]', 'aspect-[2/3]',
              'aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[3/5]',
            ];
            const aspectClass = heightClasses[index % heightClasses.length];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                className="break-inside-avoid group relative overflow-hidden rounded-2xl bg-brand-dark/50 border border-white/[0.04] cursor-pointer"
              >
                <div
                  onClick={() => setSelectedIndex(index)}
                  className={`relative ${aspectClass}`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-[1deg]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <span className="absolute top-3 left-3 md:top-4 md:left-4 bg-white/10 backdrop-blur-xl border border-white/10 px-2.5 py-1 md:px-3 md:py-1 rounded-full text-[7px] md:text-[8px] uppercase tracking-[0.2em] font-bold text-white/70 pointer-events-none">
                    {item.category}
                  </span>

                  <div className="absolute top-3 right-3 md:top-4 md:right-4 w-7 h-7 md:w-8 md:h-8 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 text-left pointer-events-none">
                    <h3 className="text-white font-serif text-sm md:text-lg leading-tight group-hover:-translate-y-0.5 transition-transform duration-300">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5 md:mt-2">
                      <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-brand-gold text-brand-gold" />
                      <span className="text-brand-gold/80 text-[9px] md:text-[10px] font-bold">{item.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* World-Class Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[500] bg-brand-dark/98 flex items-center justify-center select-none"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Cinematic vignette overlays */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_black_90%)] pointer-events-none z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent pointer-events-none z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-transparent to-transparent pointer-events-none z-[1]" />

            {/* Top bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>
                <span className="text-white/40 text-[11px] font-mono tracking-wider">
                  {String(selectedIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
                className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.12] hover:border-white/20 transition-all duration-300 group"
              >
                <X className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-90" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Close</span>
              </button>
            </motion.div>

            {/* Navigation arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(prev => prev !== null ? (prev - 1 + items.length) % items.length : null); }}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/[0.06] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300 z-20 group"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(prev => prev !== null ? (prev + 1) % items.length : null); }}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/[0.06] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300 z-20 group"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>

            {/* Image container */}
            <div className="relative z-10 w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.92, filter: 'blur(20px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.92, filter: 'blur(20px)' }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative max-w-[92vw] max-h-[82vh] md:max-w-[88vw] md:max-h-[85vh]"
                >
                  <motion.img
                    src={items[selectedIndex].image}
                    alt={items[selectedIndex].name}
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 6, ease: 'easeOut' }}
                    className="w-full h-full object-contain rounded-2xl md:rounded-3xl shadow-2xl shadow-black/50"
                    style={{ maxHeight: '82vh', maxWidth: '92vw' }}
                  />

                  {/* Floating close button on image */}
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
                    className="absolute top-3 right-3 md:top-4 md:right-4 w-9 h-9 md:w-11 md:h-11 rounded-xl bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 hover:border-white/20 transition-all duration-300 z-30 group"
                    aria-label="Close lightbox"
                  >
                    <X className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:rotate-90" />
                  </button>

                  {/* Subtle border glow */}
                  <div className="absolute inset-0 rounded-2xl md:rounded-3xl ring-1 ring-white/[0.06] pointer-events-none" />
                  <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none opacity-60" />

                  {/* Bottom info panel */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-b-2xl md:rounded-b-3xl"
                  >
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                      <div>
                        <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">
                          {items[selectedIndex].category}
                        </span>
                        <h3 className="text-white font-serif text-xl md:text-3xl lg:text-4xl tracking-tight mt-1">
                          {items[selectedIndex].name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-brand-gold text-brand-gold" />
                          <span className="text-brand-gold text-sm md:text-base font-bold">{items[selectedIndex].rating}</span>
                        </div>
                        <span className="text-white/20 text-[10px] md:text-xs uppercase tracking-[0.15em]">
                          {items.length} attractions
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnail strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/[0.06]"
              onClick={(e) => e.stopPropagation()}
            >
              {items.map((thumb, i) => (
                <button
                  key={thumb.id}
                  onClick={() => setSelectedIndex(i)}
                  className={`relative w-8 h-8 md:w-10 md:h-10 rounded-lg overflow-hidden border transition-all duration-300 flex-shrink-0 ${
                    i === selectedIndex
                      ? 'border-brand-gold ring-1 ring-brand-gold/50 scale-110'
                      : 'border-white/[0.06] opacity-40 hover:opacity-70 hover:border-white/20'
                  }`}
                >
                  <img
                    src={thumb.image}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
