import { useState, useEffect, useMemo, useCallback } from 'react';
import { ATTRACTIONS, DINING, STAY, EVENTS, EXPERIENCES } from '../data';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, Grid3X3, LayoutGrid, Eye } from 'lucide-react';
import PageHero from '../components/ui/page-hero';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  featured?: boolean;
}

// Collect all images from across the data sources
const GALLERY_IMAGES: GalleryImage[] = [
  // Attractions
  ...ATTRACTIONS.map((a, i) => ({ id: `attraction-${a.id}`, src: a.image, alt: a.name, category: 'Attractions', featured: i < 2 })),
  // Dining — select a curated subset
  ...DINING.filter(d => d.rating && d.rating >= 4.5).map(d => ({ id: `dining-${d.id}`, src: d.image, alt: d.name, category: 'Dining' })),
  // Stay — resorts & hotels
  ...STAY.filter(s => s.category === 'Luxury' || (s.rating && s.rating >= 4.5)).map(s => ({ id: `stay-${s.id}`, src: s.image, alt: s.name, category: 'Stay' })),
  // Events — festivals & celebrations (exclude End Child Marriage)
  ...EVENTS.filter(e => e.id !== 'end-child-marriage').map(e => ({ id: `event-${e.id}`, src: e.image, alt: e.name, category: 'Events' })),
  // Experiences
  ...EXPERIENCES.map(e => ({ id: `exp-${e.id}`, src: e.image, alt: e.name, category: 'Experiences' })),
  // Extra scenic images not yet referenced
  { id: 'scenic-1', src: '/Images/volta-river-landscape.jpg', alt: 'Volta River Landscape', category: 'Scenic', featured: true },
  { id: 'scenic-2', src: '/Images/lake volta.jpg', alt: 'Lake Volta Panorama', category: 'Scenic' },
  { id: 'scenic-3', src: '/Images/bridge.jpg', alt: 'Adomi Bridge Detail', category: 'Scenic' },
  { id: 'scenic-4', src: '/Images/Bridge1.jpg', alt: 'Adomi Bridge Sunset', category: 'Scenic' },
  { id: 'scenic-5', src: '/Images/Bridge2.jpg', alt: 'Bridge Engineering', category: 'Scenic' },
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

const categoryIcons: Record<string, string> = {
  All: '✦',
  Attractions: '🏛️',
  Dining: '🍽️',
  Stay: '🏨',
  Events: '🎉',
  Experiences: '🌟',
  Scenic: '🏔️',
  Culture: '🎭',
  Nature: '🌿',
};

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [layout, setLayout] = useState<'bento' | 'grid'>('bento');

  const filtered = useMemo(() =>
    activeCategory === 'All'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter(img => img.category === activeCategory),
    [activeCategory]
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: GALLERY_IMAGES.length };
    GALLERY_IMAGES.forEach(img => {
      counts[img.category] = (counts[img.category] || 0) + 1;
    });
    return counts;
  }, []);

  const goTo = useCallback((dir: 'next' | 'prev') => {
    setSelectedIndex(prev => {
      if (prev === null) return null;
      const len = filtered.length;
      if (len === 0) return null;
      return dir === 'next' ? (prev + 1) % len : (prev - 1 + len) % len;
    });
  }, [filtered.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') goTo('next');
      if (e.key === 'ArrowLeft') goTo('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedIndex, goTo]);

  // Assign bento sizes based on position pattern
  const getBentoSize = (index: number, featured: boolean) => {
    if (featured) return 'col-span-2 row-span-2';
    const pattern = index % 7;
    if (pattern === 0) return 'col-span-2 row-span-1';
    if (pattern === 3) return 'col-span-1 row-span-2';
    return 'col-span-1 row-span-1';
  };

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      <PageHero
        title="Gallery"
        description="Explore the beauty and heritage of Asuogyaman through our curated collection of photographs."
        badge="Photography"
      />

      {/* ── Stats Bar ── */}
      <section className="py-8 px-6 relative border-b border-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Eye className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-fg text-gradient">{filtered.length}</p>
                <p className="text-[10px] text-muted uppercase tracking-wider">{filtered.length === 1 ? 'photo' : 'photos'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLayout('bento')}
                className={`p-2.5 rounded-lg border transition-all ${layout === 'bento' ? 'bg-accent text-accent-fg border-accent' : 'bg-surface text-muted border-border hover:text-fg'}`}
                aria-label="Bento layout"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayout('grid')}
                className={`p-2.5 rounded-lg border transition-all ${layout === 'grid' ? 'bg-accent text-accent-fg border-accent' : 'bg-surface text-muted border-border hover:text-fg'}`}
                aria-label="Grid layout"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Filter — Glassmorphism Bar ── */}
      <section className="sticky top-0 z-40 py-4 px-6 bg-bg/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide -mx-2 px-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setSelectedIndex(null); }}
                  className={`relative shrink-0 inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-accent text-accent-fg border-accent shadow-lg shadow-accent/20'
                      : 'bg-surface/80 text-muted border-border/60 hover:text-fg hover:border-accent/30 hover:bg-surface'
                  }`}
                >
                  <span className="text-sm">{categoryIcons[cat] || '📸'}</span>
                  <span>{cat}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                    isActive ? 'bg-white/20 text-white/90' : 'bg-border/40 text-muted/70'
                  }`}>
                    {categoryCounts[cat] || 0}
                  </span>
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-accent/10 animate-pulse-soft pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Gallery Grid ── */}
      <section className="py-8 md:py-12 px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-center">
                <ImageIcon className="w-7 h-7 text-accent/40" />
              </div>
              <p className="text-sm text-muted mb-2">No photos in this category.</p>
              <button onClick={() => setActiveCategory('All')} className="text-xs text-accent hover:text-accent/80 transition-colors">
                View all photos
              </button>
            </div>
          ) : layout === 'bento' ? (
            /* ── Bento Masonry Layout ── */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3 md:gap-4">
              {filtered.map((item, index) => (
                <div
                  key={item.id}
                  className={`group relative overflow-hidden rounded-2xl bg-surface border border-border/60 hover:border-accent/30 cursor-pointer transition-all duration-500 ${getBentoSize(index, !!item.featured)}`}
                  onClick={() => setSelectedIndex(index)}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading={index < 8 ? 'eager' : 'lazy'}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    style={{ objectFit: 'cover' }}
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-fg/70 via-fg/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Scan line on hover */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-40 transition-opacity duration-300">
                    <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent animate-[scanline_3s_linear_infinite]" />
                  </div>
                  {/* Corner brackets on hover */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-accent/40 rounded-tl-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-accent/40 rounded-br-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  {/* Gold glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 50% 90%, rgba(197,149,74,0.15), transparent 60%)' }} />
                  {/* Info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                    <h3 className="text-white text-xs md:text-sm font-medium drop-shadow-lg">{item.alt}</h3>
                    <span className="inline-flex items-center gap-1 text-white/50 text-[9px] uppercase tracking-wider mt-1">
                      <span>{categoryIcons[item.category]}</span>
                      {item.category}
                    </span>
                  </div>
                  {/* Featured badge */}
                  {item.featured && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest bg-accent/20 backdrop-blur-xl border border-accent/30 text-accent">
                        ★ Featured
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* ── Uniform Grid Layout ── */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {filtered.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl bg-surface border border-border/60 hover:border-accent/30 cursor-pointer transition-all duration-500 aspect-square"
                  onClick={() => setSelectedIndex(index)}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading={index < 8 ? 'eager' : 'lazy'}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-fg/70 via-fg/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-40 transition-opacity duration-300">
                    <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent animate-[scanline_3s_linear_infinite]" />
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 50% 90%, rgba(197,149,74,0.15), transparent 60%)' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                    <h3 className="text-white text-xs md:text-sm font-medium drop-shadow-lg">{item.alt}</h3>
                    <span className="inline-flex items-center gap-1 text-white/50 text-[9px] uppercase tracking-wider mt-1">
                      <span>{categoryIcons[item.category]}</span>
                      {item.category}
                    </span>
                  </div>
                  {item.featured && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest bg-accent/20 backdrop-blur-xl border border-accent/30 text-accent">
                        ★ Featured
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Immersive Lightbox (CSS transitions, no Framer Motion) ── */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
          onClick={() => setSelectedIndex(null)}
          style={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)' }}
        >
          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
            className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 border border-white/10"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); goTo('prev'); }}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 border border-white/10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); goTo('next'); }}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 border border-white/10"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Image container */}
          <div
            className="relative max-w-[90vw] max-h-[85vh] animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedIndex !== null && filtered[selectedIndex] && (
              <>
                <img
                  key={selectedIndex}
                  src={filtered[selectedIndex].src}
                  alt={filtered[selectedIndex].alt}
                  className="max-h-[75vh] w-auto mx-auto rounded-2xl shadow-2xl animate-fade-in"
                />
                {/* Info bar */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-b-2xl">
                  <h3 className="text-white text-base font-medium">{filtered[selectedIndex].alt}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-white/50 text-[10px] uppercase tracking-wider">
                      {categoryIcons[filtered[selectedIndex].category]} {filtered[selectedIndex].category}
                    </span>
                    <span className="text-white/30 text-xs font-mono">
                      {selectedIndex + 1} / {filtered.length}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Bottom counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {filtered.slice(Math.max(0, selectedIndex - 4), Math.min(filtered.length, selectedIndex + 5)).map((img, i) => {
              const actualIndex = Math.max(0, selectedIndex - 4) + i;
              return (
                <button
                  key={img.id}
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(actualIndex); }}
                  className={`w-8 h-8 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    actualIndex === selectedIndex ? 'border-accent scale-110' : 'border-white/20 opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={img.src} alt="" className="w-full h-full object-cover" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
