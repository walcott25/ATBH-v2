import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ATTRACTIONS } from '../data';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHero from '../components/ui/page-hero';

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
    <div className="min-h-screen bg-bg relative overflow-hidden">
      <PageHero
        title="Gallery"
        description="Explore the beauty and heritage of Asuogyaman through our curated collection of photographs."
        badge="Photography"
      />

      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="group relative aspect-square overflow-hidden rounded-xl bg-surface border border-border cursor-pointer"
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 block max-w-none"
                style={{ height: '100%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-fg/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                <h3 className="text-white text-xs font-medium">{item.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-fg/95 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(prev => prev !== null ? (prev - 1 + items.length) % items.length : null); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(prev => prev !== null ? (prev + 1) % items.length : null); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="relative max-w-[90vw] max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <img
                    src={items[selectedIndex].image}
                    alt={items[selectedIndex].name}
                    className="max-h-[75vh] w-auto mx-auto rounded-xl shadow-2xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-fg/80 to-transparent rounded-b-xl">
                    <h3 className="text-white text-base font-medium">{items[selectedIndex].name}</h3>
                    <p className="text-white/70 text-xs mt-1">{items[selectedIndex].description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs pointer-events-none">
              {selectedIndex + 1} / {items.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
