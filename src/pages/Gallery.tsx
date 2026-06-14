import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ATTRACTIONS, DINING, STAY, EVENTS, EXPERIENCES } from '../data';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import PageHero from '../components/ui/page-hero';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

// Collect all images from across the data sources
const GALLERY_IMAGES: GalleryImage[] = [
  // Attractions
  ...ATTRACTIONS.map(a => ({ id: `attraction-${a.id}`, src: a.image, alt: a.name, category: 'Attractions' })),
  // Dining — select a curated subset
  ...DINING.filter(d => d.rating && d.rating >= 4.5).map(d => ({ id: `dining-${d.id}`, src: d.image, alt: d.name, category: 'Dining' })),
  // Stay — resorts & hotels
  ...STAY.filter(s => s.category === 'Luxury' || (s.rating && s.rating >= 4.5)).map(s => ({ id: `stay-${s.id}`, src: s.image, alt: s.name, category: 'Stay' })),
  // Events — festivals & celebrations
  ...EVENTS.map(e => ({ id: `event-${e.id}`, src: e.image, alt: e.name, category: 'Events' })),
  // Experiences
  ...EXPERIENCES.map(e => ({ id: `exp-${e.id}`, src: e.image, alt: e.name, category: 'Experiences' })),
  // Extra scenic images not yet referenced
  { id: 'scenic-1', src: '/Images/volta-river-landscape.jpg', alt: 'Volta River Landscape', category: 'Scenic' },
  { id: 'scenic-2', src: '/Images/lake volta.jpg', alt: 'Lake Volta Panorama', category: 'Scenic' },
  { id: 'scenic-3', src: '/Images/bridge.jpg', alt: 'Adomi Bridge Detail', category: 'Scenic' },
  { id: 'scenic-4', src: '/Images/Bridge1.jpg', alt: 'Adomi Bridge Sunset', category: 'Scenic' },
  { id: 'scenic-5', src: '/Images/Bridge2.jpg', alt: 'Bridge Engineering', category: 'Scenic' },
  { id: 'scenic-6', src: '/Images/smiling-community-1.jpg', alt: 'Community Life', category: 'Culture' },
  { id: 'scenic-7', src: '/Images/smiling-community-2.jpg', alt: 'Local Community', category: 'Culture' },
  { id: 'scenic-8', src: '/Images/smiling-community-3.jpg', alt: 'Community Spirit', category: 'Culture' },
  { id: 'scenic-9', src: '/Images/smiling-community-4.jpg', alt: 'Community Together', category: 'Culture' },
  { id: 'scenic-10', src: '/Images/senior high.jpg', alt: 'Students at School', category: 'Culture' },
  { id: 'scenic-11', src: '/Images/tourism.jpg', alt: 'Tourism in Asuogyaman', category: 'Culture' },
  { id: 'scenic-12', src: '/Images/night market.jpg', alt: 'Night Market', category: 'Culture' },
  { id: 'scenic-13', src: '/Images/aks mt.jpg', alt: 'Akosombo Market Scene', category: 'Culture' },
  { id: 'scenic-14', src: '/Images/Akw market.jpg', alt: 'Akwamu Market', category: 'Culture' },
  { id: 'scenic-15', src: '/Images/adomi-bridge-garden-gh-adomme-bc.jpg', alt: 'Adomi Bridge Gardens', category: 'Scenic' },
  { id: 'scenic-16', src: '/Images/funcity.jpg', alt: 'Fun City', category: 'Scenic' },
  { id: 'scenic-17', src: '/Images/Paintball-1024x481.jpg', alt: 'Paintball Adventure', category: 'Experiences' },
  { id: 'scenic-18', src: '/Images/Vulcan-Rock-1024x544.jpg', alt: 'Vulcan Rock', category: 'Nature' },
  { id: 'scenic-19', src: '/Images/dodi-princess.jpg', alt: 'Dodi Princess Cruise Boat', category: 'Experiences' },
  { id: 'scenic-20', src: '/Images/Akosombo inland port.jpg', alt: 'Akosombo Inland Port', category: 'Scenic' },
];

const categories = ['All', ...Array.from(new Set(GALLERY_IMAGES.map(img => img.category)))];

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() =>
    activeCategory === 'All'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter(img => img.category === activeCategory),
    [activeCategory]
  );

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedIndex(prev => prev !== null ? (prev + 1) % filtered.length : null);
      }
      if (e.key === 'ArrowLeft') {
        setSelectedIndex(prev => prev !== null ? (prev - 1 + filtered.length) % filtered.length : null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filtered.length]);

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      <PageHero
        title="Gallery"
        description="Explore the beauty and heritage of Asuogyaman through our curated collection of photographs."
        badge="Photography"
      />

      {/* Category Filter */}
      <section className="pb-8 px-6 -mt-4 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-lg border transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-accent text-accent-fg border-accent shadow-sm shadow-accent/20'
                  : 'bg-surface text-muted border-border hover:text-fg hover:border-fg/30'
              }`}
            >
              {cat === 'All' ? <ImageIcon className="w-3.5 h-3.5" /> : null}
              {cat}
              {cat !== 'All' && (
                <span className="text-[10px] opacity-60">({GALLERY_IMAGES.filter(i => i.category === cat).length})</span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs text-muted">{filtered.length} {filtered.length === 1 ? 'photo' : 'photos'}</p>
            {activeCategory !== 'All' && (
              <button onClick={() => setActiveCategory('All')}
                className="text-xs text-accent hover:text-accent/80 transition-colors">Show all</button>
            )}
          </div>
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="group relative aspect-square overflow-hidden rounded-xl bg-surface border border-border cursor-pointer"
                  onClick={() => setSelectedIndex(index)}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-fg/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                    <div>
                      <h3 className="text-white text-xs font-medium">{item.alt}</h3>
                      <span className="text-white/50 text-[9px] uppercase tracking-wider">{item.category}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <ImageIcon className="w-12 h-12 text-muted/30 mx-auto mb-4" />
              <p className="text-sm text-muted">No photos in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
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
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(prev => prev !== null ? (prev - 1 + filtered.length) % filtered.length : null); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(prev => prev !== null ? (prev + 1) % filtered.length : null); }}
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
                    src={filtered[selectedIndex].src}
                    alt={filtered[selectedIndex].alt}
                    className="max-h-[75vh] w-auto mx-auto rounded-xl shadow-2xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-fg/80 to-transparent rounded-b-xl">
                    <h3 className="text-white text-base font-medium">{filtered[selectedIndex].alt}</h3>
                    <p className="text-white/50 text-[10px] uppercase tracking-wider mt-1">{filtered[selectedIndex].category}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs pointer-events-none">
              {selectedIndex + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
