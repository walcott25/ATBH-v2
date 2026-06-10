import { Star, MapPin, Calendar, Phone } from 'lucide-react'
import { motion } from 'motion/react'

type CardVariant = 'attraction' | 'dining' | 'stay' | 'school' | 'event' | 'business'

interface ImageCardProps {
  image: string
  name: string
  description: string
  category: string
  variant: CardVariant
  rating?: number
  location?: string
  date?: string
  duration?: string
  contact?: string
  index?: number
  total?: number
  onClick?: () => void
  layoutId?: string
}

const variantStyles: Record<CardVariant, {
  aspect: string
  radius: string
  overlay: string
  badgeStyle: string
  contentStyle: string
  hoverEffect: string
}> = {
  attraction: {
    aspect: 'aspect-[4/5]',
    radius: 'rounded-[2.5rem]',
    overlay: 'bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent',
    badgeStyle: 'bg-white/95 backdrop-blur-xl border border-brand-gold/20 text-brand-dark',
    contentStyle: 'absolute bottom-0 left-0 right-0 p-8',
    hoverEffect: 'group-hover:scale-105 group-hover:rotate-[0.5deg]',
  },
  dining: {
    aspect: 'aspect-[4/3]',
    radius: 'rounded-[2rem]',
    overlay: 'bg-gradient-to-t from-brand-dark/85 via-brand-dark/10 to-transparent',
    badgeStyle: 'bg-white/95 backdrop-blur-xl border border-brand-gold/15 text-brand-dark',
    contentStyle: 'px-3 pt-6',
    hoverEffect: 'group-hover:scale-[1.03]',
  },
  stay: {
    aspect: 'aspect-[4/3]',
    radius: 'rounded-[2rem]',
    overlay: 'bg-gradient-to-t from-brand-dark/85 via-brand-dark/10 to-transparent',
    badgeStyle: 'bg-white/95 backdrop-blur-xl border border-brand-gold/15 text-brand-dark',
    contentStyle: 'px-3 pt-6',
    hoverEffect: 'group-hover:scale-[1.03]',
  },
  school: {
    aspect: 'aspect-[4/3]',
    radius: 'rounded-[2rem]',
    overlay: 'bg-gradient-to-t from-brand-dark/80 via-brand-dark/5 to-transparent',
    badgeStyle: 'bg-brand-dark/10 backdrop-blur-xl border border-brand-dark/10 text-brand-dark',
    contentStyle: 'px-3 pt-6',
    hoverEffect: 'group-hover:scale-[1.03]',
  },
  event: {
    aspect: 'aspect-[4/3]',
    radius: 'rounded-[2rem]',
    overlay: 'bg-gradient-to-t from-brand-dark/85 via-brand-dark/10 to-transparent',
    badgeStyle: 'bg-white/95 backdrop-blur-xl border border-brand-gold/15 text-brand-dark',
    contentStyle: 'px-3 pt-6',
    hoverEffect: 'group-hover:scale-[1.03]',
  },
  business: {
    aspect: 'aspect-[4/3]',
    radius: 'rounded-[2.5rem]',
    overlay: 'bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent',
    badgeStyle: 'bg-white/10 backdrop-blur-xl border border-white/10 text-white/90',
    contentStyle: 'absolute bottom-0 left-0 right-0 p-10',
    hoverEffect: 'group-hover:scale-[1.02]',
  },
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="w-3 h-3 fill-brand-gold text-brand-gold" />
      <span className="text-[10px] font-bold text-brand-gold">{rating}</span>
    </div>
  )
}

export default function ImageCard({
  image,
  name,
  description,
  category,
  variant,
  rating,
  location,
  date,
  duration,
  contact,
  index,
  total,
  onClick,
  layoutId,
}: ImageCardProps) {
  const styles = variantStyles[variant]
  const isOverlay = variant === 'attraction' || variant === 'business'

  return (
    <motion.div
      onClick={onClick}
      className="group cursor-pointer"
      layoutId={layoutId}
    >
      {/* Image Container */}
      <div className={`relative ${styles.aspect} overflow-hidden ${styles.radius} shadow-2xl shadow-black/8`}>
        <div className={`w-full h-full overflow-hidden ${styles.radius}`}>
          <img
            src={image}
            alt={name}
            className={`w-full h-full object-cover transition-transform duration-700 ${styles.hoverEffect}`}
            referrerPolicy="no-referrer"
            style={{ willChange: 'transform' }}
          />
        </div>

        {/* Always-on gradient overlay for depth */}
        <div className={`absolute inset-0 ${styles.overlay} transition-opacity duration-500`} />

        {/* Vignette overlay for atmospheric depth */}
        <div className="absolute inset-0 shadow-[inset_0_-80px_60px_-40px_rgba(0,0,0,0.4),inset_0_80px_60px_-40px_rgba(0,0,0,0.15)] pointer-events-none" />

        {/* Glow overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.15), transparent 70%)',
          }}
        />

        {/* Subtle inner border glow on hover */}
        <div className={`absolute inset-0 border border-white/0 group-hover:border-white/10 ${styles.radius} transition-all duration-500 pointer-events-none`} />

        {/* Category badge */}
        <span className={`absolute top-6 left-6 px-4 py-1.5 rounded-full text-[8px] uppercase tracking-[0.25em] font-bold ${styles.badgeStyle}`}>
          {category}
        </span>

        {/* Index for business slides */}
        {total !== undefined && index !== undefined && variant === 'business' && (
          <span className="absolute top-6 right-6 text-white/10 font-mono text-xs">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        )}

        {/* Expand icon for overlay cards */}
        {isOverlay && (
          <div className="absolute top-6 right-6 w-8 h-8 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors duration-300">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
        )}

        {/* Overlaid content for attraction/business */}
        {isOverlay && (
          <div className={styles.contentStyle}>
            <h3 className="text-white font-serif text-xl md:text-2xl tracking-tight leading-tight mb-3 group-hover:translate-y-[-2px] transition-transform duration-300">
              {name}
            </h3>
            <p className="text-white/60 text-xs md:text-sm leading-relaxed line-clamp-2 font-light max-w-md">
              {description}
            </p>
            {variant === 'business' && (
              <div className="mt-6 flex items-center gap-6">
                {location && (
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-brand-gold">
                    <MapPin className="w-3.5 h-3.5" />
                    {location}
                  </div>
                )}
                {contact && (
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white/50">
                    <Phone className="w-3.5 h-3.5" />
                    {contact}
                  </div>
                )}
                {rating && <StarRating rating={rating} />}
              </div>
            )}
            {variant === 'attraction' && rating && (
              <div className="mt-4">
                <StarRating rating={rating} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content below image for non-overlay variants */}
      {!isOverlay && (
        <div className={styles.contentStyle}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h4 className="text-lg md:text-xl font-serif mb-2 group-hover:text-brand-gold transition-colors tracking-tight">
                {name}
              </h4>
              <p className="text-brand-dark/50 text-sm leading-relaxed line-clamp-2 font-light">
                {description}
              </p>

              {variant === 'school' && location && (
                <div className="mt-4 flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] font-bold text-brand-gold">
                  <MapPin className="w-3 h-3" />
                  {location}
                </div>
              )}

              {variant === 'event' && (
                <div className="mt-4 space-y-1.5">
                  {date && (
                    <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] font-bold text-brand-gold">
                      <Calendar className="w-3 h-3" />
                      {date}
                    </div>
                  )}
                  {duration && (
                    <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] font-bold text-brand-gold/70">
                      <Calendar className="w-3 h-3" />
                      Duration: {duration}
                    </div>
                  )}
                </div>
              )}
            </div>

            {rating && (
              <div className="flex items-center gap-1.5 bg-brand-gold/5 px-3 py-1.5 rounded-full border border-brand-gold/10 shrink-0 self-start">
                <Star className="w-3 h-3 fill-brand-gold text-brand-gold" />
                <span className="text-[10px] font-bold text-brand-gold">{rating}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  )
}
