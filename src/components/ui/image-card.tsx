import { Star, MapPin, Phone, Calendar } from 'lucide-react'
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
    radius: 'rounded-3xl',
    overlay: 'bg-gradient-to-t from-fg/90 via-fg/20 to-transparent',
    badgeStyle: 'glass text-fg text-[8px]',
    contentStyle: 'absolute bottom-0 left-0 right-0 p-8',
    hoverEffect: 'group-hover:scale-105 duration-700',
  },
  dining: {
    aspect: 'aspect-[4/3]',
    radius: 'rounded-2xl',
    overlay: 'bg-gradient-to-t from-fg/85 via-fg/10 to-transparent',
    badgeStyle: 'glass text-fg text-[8px]',
    contentStyle: 'p-5',
    hoverEffect: 'group-hover:scale-105 duration-700',
  },
  stay: {
    aspect: 'aspect-[4/3]',
    radius: 'rounded-2xl',
    overlay: 'bg-gradient-to-t from-fg/85 via-fg/10 to-transparent',
    badgeStyle: 'glass text-fg text-[8px]',
    contentStyle: 'p-5',
    hoverEffect: 'group-hover:scale-105 duration-700',
  },
  school: {
    aspect: 'aspect-[4/3]',
    radius: 'rounded-2xl',
    overlay: 'bg-gradient-to-t from-fg/80 via-fg/5 to-transparent',
    badgeStyle: 'bg-fg/10 backdrop-blur-xl border border-fg/10 text-fg text-[8px]',
    contentStyle: 'p-5',
    hoverEffect: 'group-hover:scale-105 duration-700',
  },
  event: {
    aspect: 'aspect-[4/3]',
    radius: 'rounded-2xl',
    overlay: 'bg-gradient-to-t from-fg/85 via-fg/10 to-transparent',
    badgeStyle: 'glass text-fg text-[8px]',
    contentStyle: 'p-5',
    hoverEffect: 'group-hover:scale-105 duration-700',
  },
  business: {
    aspect: 'aspect-[4/3]',
    radius: 'rounded-3xl',
    overlay: 'bg-gradient-to-t from-fg/90 via-fg/20 to-transparent',
    badgeStyle: 'glass-dark text-white/90 text-[8px]',
    contentStyle: 'absolute bottom-0 left-0 right-0 p-10',
    hoverEffect: 'group-hover:scale-105 duration-700',
  },
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="w-3 h-3 fill-accent text-accent" />
      <span className="text-[10px] font-semibold text-accent">{rating}</span>
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
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className={`relative ${styles.aspect} overflow-hidden ${styles.radius} shadow-lg shadow-black/5 group-hover:shadow-2xl group-hover:shadow-black/20 transition-shadow duration-500`}>
        {/* Image */}
        <div className={`absolute inset-0 ${styles.radius}`}>
          <img
            src={image}
            alt={name}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${styles.hoverEffect} max-w-none`}
            style={{ height: '100%' }}
            referrerPolicy="no-referrer"
            style={{ willChange: 'transform' }}
          />
        </div>

        {/* Gradient overlay */}
        <div className={`absolute inset-0 ${styles.overlay} transition-opacity duration-500`} />

        {/* Vignette */}
        <div className="absolute inset-0 shadow-[inset_0_-80px_60px_-40px_rgba(0,0,0,0.4),inset_0_80px_60px_-40px_rgba(0,0,0,0.15)] pointer-events-none" />

        {/* Gold glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(197,149,74,0.2), transparent 70%)' }} />

        {/* Shine sweep on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
          <div className="absolute -inset-full top-0 -left-full w-full h-full group-hover:left-full transition-all duration-700"
            style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, transparent 50%)' }} />
        </div>

        {/* Inner border glow on hover */}
        <div className={`absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-white/20 ${styles.radius} transition-all duration-500 pointer-events-none`} />

        {/* Category badge */}
        <span className={`absolute top-4 left-4 md:top-5 md:left-5 px-3 py-1 rounded-full uppercase tracking-[0.2em] font-semibold backdrop-blur-xl border border-white/10 ${styles.badgeStyle}`}>
          {category}
        </span>

        {/* Index for business slides */}
        {total !== undefined && index !== undefined && variant === 'business' && (
          <span className="absolute top-5 right-5 text-white/15 font-mono text-xs">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        )}

        {/* Expand icon for overlay cards */}
        {isOverlay && (
          <div className="absolute top-4 right-4 md:top-5 md:right-5 w-8 h-8 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center group-hover:bg-accent/25 group-hover:scale-110 transition-all duration-300">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
        )}

        {/* Overlaid content */}
        {isOverlay && (
          <div className={styles.contentStyle}>
            <h3 className="text-white font-sans text-xl md:text-2xl tracking-tight leading-tight mb-3 group-hover:translate-y-[-2px] transition-transform duration-300">
              {name}
            </h3>
            <p className="text-white/60 text-xs md:text-sm leading-relaxed line-clamp-2 font-light max-w-md">
              {description}
            </p>
            {variant === 'business' && (
              <div className="mt-5 flex items-center gap-6">
                {location && (
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold text-accent">
                    <MapPin className="w-3.5 h-3.5" />
                    {location}
                  </div>
                )}
                {contact && (
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold text-white/50">
                    <Phone className="w-3.5 h-3.5" />
                    {contact}
                  </div>
                )}
                {rating && <StarRating rating={rating} />}
              </div>
            )}
            {variant === 'attraction' && rating && (
              <div className="mt-4"><StarRating rating={rating} /></div>
            )}
          </div>
        )}
      </div>

      {/* Non-overlay content */}
      {!isOverlay && (
        <div className={styles.contentStyle}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h4 className="text-base md:text-lg font-sans mb-1.5 group-hover:text-accent transition-colors duration-300 tracking-tight">
                {name}
              </h4>
              <p className="text-muted text-xs md:text-sm leading-relaxed line-clamp-2 font-light">
                {description}
              </p>

              {variant === 'school' && location && (
                <div className="mt-3 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-semibold text-accent">
                  <MapPin className="w-3 h-3" />
                  {location}
                </div>
              )}

              {variant === 'event' && (
                <div className="mt-3 space-y-1">
                  {date && (
                    <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-semibold text-accent">
                      <Calendar className="w-3 h-3" />
                      {date}
                    </div>
                  )}
                  {duration && (
                    <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-semibold text-accent/70">
                      <Calendar className="w-3 h-3" />
                      {duration}
                    </div>
                  )}
                </div>
              )}
            </div>

            {rating && (
              <div className="flex items-center gap-1 bg-accent/5 px-2.5 py-1 rounded-full border border-accent/10 shrink-0 self-start">
                <Star className="w-3 h-3 fill-accent text-accent" />
                <span className="text-[10px] font-semibold text-accent">{rating}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  )
}
