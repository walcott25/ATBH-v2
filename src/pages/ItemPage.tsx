import { useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { ATTRACTIONS, DINING, STAY, EVENTS, EXPERIENCES, BUSINESS, SCHOOLS } from '../data'
import { Star, MapPin, Phone, Mail, ExternalLink, ArrowLeft, BookOpen, GraduationCap, Clock, Compass, Calendar, Eye } from 'lucide-react'
import type { Attraction, Dining, Stay, Event, Experience, Business, School } from '../data'
import VirtualTour from '../components/ui/virtual-tour'
import StructuredData from '../components/seo/structured-data'

const DATA: Record<string, (Attraction | Dining | Stay | Event | Experience | Business | School)[]> = {
  attractions: ATTRACTIONS,
  dining: DINING,
  stay: STAY,
  events: EVENTS,
  experience: EXPERIENCES,
  business: BUSINESS,
  schools: SCHOOLS,
}

const LABELS: Record<string, { back: string; section: string }> = {
  attractions: { back: 'Attractions', section: 'Attraction' },
  dining: { back: 'Dining', section: 'Dining' },
  stay: { back: 'Stay', section: 'Accommodation' },
  events: { back: 'Events', section: 'Event' },
  experience: { back: 'Experiences', section: 'Experience' },
  business: { back: 'Business', section: 'Business' },
  schools: { back: 'Schools', section: 'School' },
}

export default function ItemPage() {
  const { type, id } = useParams<{ type: string; id: string }>()
  const [tourOpen, setTourOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const scaleIn = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  if (!type || !id || !DATA[type]) return <NotFound />

  const items = DATA[type]
  const item = items.find((i) => i.id === id)
  if (!item) return <NotFound />

  const label = LABELS[type] || { back: 'Home', section: '' }
  const idx = items.findIndex((i) => i.id === id)
  const prevItem = idx > 0 ? items[idx - 1] : null
  const nextItem = idx < items.length - 1 ? items[idx + 1] : null

  const hasPanorama = 'panorama' in item && item.panorama

  return (
    <div className="min-h-screen bg-bg">
      {hasPanorama && tourOpen && (
        <VirtualTour
          panorama={(item as any).panorama}
          attractionName={item.name}
          onClose={() => setTourOpen(false)}
        />
      )}
      <StructuredData
        type={
          type === 'attractions' ? 'TouristAttraction' :
          type === 'dining' ? 'Restaurant' :
          type === 'stay' ? 'Hotel' :
          type === 'events' ? 'Event' :
          'TouristDestination'
        }
        name={item.name}
        description={item.description}
        image={item.image}
        telephone={'phone' in item ? (item as any).phone : undefined}
        email={'email' in item ? (item as any).email : undefined}
        url={typeof window !== 'undefined' ? window.location.href : undefined}
        geo={'coordinates' in item ? { latitude: (item as any).coordinates?.[0], longitude: (item as any).coordinates?.[1] } : undefined}
        rating={'rating' in item ? { value: (item as any).rating || 0 } : undefined}
      />
      {/* Back nav */}
      <div className="sticky top-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          <Link to={`/${type}`} className="flex items-center gap-2 text-xs text-muted hover:text-fg transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to {label.back}
          </Link>
          <div className="flex items-center gap-2">
            {prevItem && <Link to={`/${type}/${prevItem.id}`} className="px-3 py-1.5 text-[10px] text-muted hover:text-fg border border-border rounded-lg hover:border-fg/30 transition-all">Previous</Link>}
            {nextItem && <Link to={`/${type}/${nextItem.id}`} className="px-3 py-1.5 text-[10px] text-muted hover:text-fg border border-border rounded-lg hover:border-fg/30 transition-all">Next</Link>}
          </div>
        </div>
      </div>

      {/* Hero */}
      <div ref={heroRef} className={`relative overflow-hidden bg-surface ${type === 'business' ? 'h-[55vh] min-h-[380px]' : 'h-[45vh] min-h-[320px]'}`}>
        {type === 'business' ? (
          <motion.img
            src={item.image} alt={item.name}
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
            style={{ y: parallaxY, scale: scaleIn }}
          />
        ) : (
          <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
        )}
        {type !== 'business' && <div className={`absolute inset-0 ${(type === 'events' || type === 'schools') ? 'bg-gradient-to-t from-black/80 via-black/40 to-transparent' : 'bg-gradient-to-t from-bg via-bg/30 to-transparent'}`} />}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            {'category' in item && item.category && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-semibold uppercase tracking-widest bg-accent/10 text-accent border border-accent/20">
                {item.category}
              </span>
            )}
            {'type' in item && item.type && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-semibold uppercase tracking-widest bg-accent/10 text-accent border border-accent/20">
                {item.type}
              </span>
            )}
            {'rating' in item && item.rating && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20">
                <Star className="w-3 h-3 fill-accent text-accent" />
                <span className="text-[10px] font-semibold text-accent">{item.rating}</span>
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-4xl font-medium text-white tracking-tight drop-shadow-lg">{item.name}</h1>
          {'location' in item && item.location && (
            <div className="flex items-center gap-1.5 mt-2 text-xs text-white/70">
              <MapPin className="w-3.5 h-3.5" />{item.location}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 py-8 space-y-8">
        {/* Description */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">About</h2>
          <p className="text-sm text-fg leading-relaxed">
            {'longDescription' in item && item.longDescription ? item.longDescription : item.description}
          </p>
        </section>

        {/* Type-specific sections */}

        {/* Attraction extras */}
        {'highlights' in item && (item as Experience).highlights && (item as Experience).highlights!.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">Highlights</h2>
            <div className="flex flex-wrap gap-2">
              {(item as Experience).highlights!.map((h) => (
                <span key={h} className="text-xs text-muted bg-surface border border-border/60 px-3 py-1.5 rounded-lg font-medium">{h}</span>
              ))}
            </div>
          </section>
        )}

        {/* Programs (Schools) */}
        {'programs' in item && item.programs && item.programs.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted mb-3 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Programmes Offered
            </h2>
            <div className="flex flex-wrap gap-2">
              {item.programs.map((p: string) => (
                <span key={p} className="text-xs text-muted bg-surface border border-border/60 px-3 py-1.5 rounded-lg font-medium">{p}</span>
              ))}
            </div>
          </section>
        )}

        {/* Date/Duration (Events, Experiences) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {'category' in item && item.category && (
            <div className="text-center p-4 rounded-xl bg-surface border border-border/60">
              <div className="text-[9px] uppercase tracking-widest font-semibold text-muted mb-1">Category</div>
              <div className="text-sm font-medium text-fg">{item.category}</div>
            </div>
          )}
          {'price' in item && item.price && (
            <div className="text-center p-4 rounded-xl bg-surface border border-border/60">
              <div className="text-[9px] uppercase tracking-widest font-semibold text-muted mb-1">Price</div>
              <div className="text-sm font-medium text-accent">{item.price}</div>
            </div>
          )}
          {'duration' in item && item.duration && (
            <div className="text-center p-4 rounded-xl bg-surface border border-border/60">
              <div className="text-[9px] uppercase tracking-widest font-semibold text-muted mb-1">Duration</div>
              <div className="text-sm font-medium text-fg">{item.duration}</div>
            </div>
          )}
          {'date' in item && item.date && (
            <div className="text-center p-4 rounded-xl bg-surface border border-border/60">
              <div className="text-[9px] uppercase tracking-widest font-semibold text-muted mb-1">Date</div>
              <div className="text-sm font-medium text-fg">{item.date}</div>
            </div>
          )}
          {'rating' in item && item.rating && (
            <div className="text-center p-4 rounded-xl bg-surface border border-border/60">
              <div className="text-[9px] uppercase tracking-widest font-semibold text-muted mb-1">Rating</div>
              <div className="text-sm font-medium text-accent flex items-center justify-center gap-1">
                <Star className="w-3.5 h-3.5 fill-accent text-accent" />{item.rating}
              </div>
            </div>
          )}
          {'location' in item && item.location && (
            <div className="text-center p-4 rounded-xl bg-surface border border-border/60">
              <div className="text-[9px] uppercase tracking-widest font-semibold text-muted mb-1">Location</div>
              <div className="text-sm font-medium text-fg">{item.location}</div>
            </div>
          )}
        </div>

        {/* Amenities (Dining, Stay) */}
        {'amenities' in item && item.amenities && item.amenities.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">Amenities</h2>
            <div className="grid grid-cols-2 gap-2">
              {item.amenities.map((a: string) => (
                <div key={a} className="flex items-center gap-2 text-xs text-muted bg-surface border border-border/60 px-3 py-2 rounded-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />{a}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Virtual Tour */}
        {hasPanorama && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">Virtual Tour</h2>
            <button
              onClick={() => setTourOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-accent text-accent-fg border border-accent rounded-xl text-xs font-medium hover:bg-accent/90 transition-all"
            >
              <Eye className="w-4 h-4" /> 360° Virtual Tour
            </button>
          </section>
        )}

        {/* Contact */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">Contact</h2>
          <div className="flex flex-wrap gap-3">
            {'phone' in item && item.phone && (
              <a href={`tel:${item.phone}`} className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-border/60 rounded-xl text-xs text-muted hover:text-accent hover:border-accent/30 transition-all">
                <Phone className="w-4 h-4" />{item.phone}
              </a>
            )}
            {'email' in item && item.email && (
              <a href={`mailto:${item.email}`} className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-border/60 rounded-xl text-xs text-muted hover:text-accent hover:border-accent/30 transition-all">
                <Mail className="w-4 h-4" />Send Email
              </a>
            )}
            {'website' in item && item.website && (
              <a href={item.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-border/60 rounded-xl text-xs text-muted hover:text-accent hover:border-accent/30 transition-all">
                <ExternalLink className="w-4 h-4" />Website
              </a>
            )}
            {'website' in item && item.website && (
              <a href={item.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 bg-accent text-accent-fg border border-accent rounded-xl text-xs font-medium hover:bg-accent/90 transition-all">
                <ExternalLink className="w-4 h-4" />Book Now
              </a>
            )}
          </div>
        </section>

        {/* Prev/Next footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border/40">
          <div>
            {prevItem && (
              <Link to={`/${type}/${prevItem.id}`} className="flex items-center gap-2 text-xs text-muted hover:text-fg transition-colors">
                <ArrowLeft className="w-4 h-4" /> {prevItem.name}
              </Link>
            )}
          </div>
          <div className="text-right">
            {nextItem && (
              <Link to={`/${type}/${nextItem.id}`} className="flex items-center gap-2 text-xs text-muted hover:text-fg transition-colors">
                {nextItem.name} <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center">
        <p className="text-sm text-muted mb-4">Page not found</p>
        <Link to="/" className="text-xs text-accent hover:text-accent/80 transition-colors">Go home</Link>
      </div>
    </div>
  )
}
