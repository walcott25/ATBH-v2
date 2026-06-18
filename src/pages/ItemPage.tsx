import { useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { ATTRACTIONS, DINING, STAY, EVENTS, EXPERIENCES, BUSINESS, SCHOOLS } from '../data'
import { Star, MapPin, Phone, Mail, ExternalLink, ArrowLeft, BookOpen, GraduationCap, Clock, Compass, Calendar, Eye } from 'lucide-react'
import type { Attraction, Dining, Stay, Event, Experience, Business, School } from '../data'
import VirtualTour from '../components/ui/virtual-tour'
import StructuredData from '../components/seo/structured-data'
import { BarChart, Bar, Cell, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [30, 46],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})
L.Marker.prototype.options.icon = DefaultIcon

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

        {/* Business services */}
        {'services' in item && (item as Business).services && (item as Business).services!.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">Services & Offerings</h2>
            <div className="flex flex-wrap gap-2">
              {(item as Business).services!.map((s) => (
                <span key={s} className="text-xs text-muted bg-surface border border-border/60 px-3 py-1.5 rounded-lg font-medium">{s}</span>
              ))}
            </div>
          </section>
        )}

        {/* Business key info */}
        {type === 'business' && (('founded' in item && (item as Business).founded) || ('employees' in item && (item as Business).employees)) && (
          <div className="grid grid-cols-2 gap-4">
            {'founded' in item && (item as Business).founded && (
              <div className="text-center p-4 rounded-xl bg-surface border border-border/60">
                <div className="text-[9px] uppercase tracking-widest font-semibold text-muted mb-1">Established</div>
                <div className="text-sm font-medium text-fg">{(item as Business).founded}</div>
              </div>
            )}
            {'employees' in item && (item as Business).employees && (
              <div className="text-center p-4 rounded-xl bg-surface border border-border/60">
                <div className="text-[9px] uppercase tracking-widest font-semibold text-muted mb-1">Employees</div>
                <div className="text-sm font-medium text-fg">{(item as Business).employees}</div>
              </div>
            )}
          </div>
        )}

        {/* Business impact */}
        {'impact' in item && (item as Business).impact && (
          <section className="p-4 rounded-xl bg-surface border border-border/60">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">Community Impact</h2>
            <p className="text-sm text-fg leading-relaxed">{(item as Business).impact}</p>
          </section>
        )}

        {/* Business rating chart */}
        {type === 'business' && 'rating' in item && item.rating && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">Rating Overview</h2>
            <div className="p-4 rounded-xl bg-surface border border-border/60">
              <ResponsiveContainer width="100%" height={60}>
                <BarChart data={[{ name: item.name, rating: item.rating, max: 5 }]} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <Bar dataKey="rating" radius={[0, 4, 4, 0]} maxBarSize={24}>
                    <Cell fill="#C5954A" />
                  </Bar>
                  <XAxis type="number" domain={[0, 5]} hide />
                  <YAxis type="category" hide />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-muted">0</span>
                <span className="flex items-center gap-1 text-xs font-semibold text-accent">
                  <Star className="w-3 h-3 fill-accent text-accent" />{item.rating} / 5
                </span>
                <span className="text-[10px] text-muted">5</span>
              </div>
            </div>
          </section>
        )}

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

        {/* Map */}
        {type === 'business' && 'coordinates' in item && item.coordinates && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">Location</h2>
            <div className="h-[250px] rounded-xl overflow-hidden border border-border/60">
              <MapContainer center={item.coordinates} zoom={14} scrollWheelZoom={false} className="h-full w-full" zoomControl={false}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={item.coordinates}>
                  <Popup><div className="text-sm font-medium">{item.name}</div></Popup>
                </Marker>
              </MapContainer>
            </div>
          </section>
        )}

        {/* Related businesses */}
        {type === 'business' && (() => {
          const related = BUSINESS.filter(b => b.id !== item.id && b.category === (item as Business).category)
          if (related.length === 0) return null
          return (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">Related Businesses</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {related.slice(0, 4).map(r => (
                  <Link key={r.id} to={`/business/${r.id}`} className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-border/60 hover:border-accent/30 hover:bg-accent/5 transition-all">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-bg">
                      <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-fg truncate">{r.name}</div>
                      <div className="text-[10px] text-muted mt-0.5">{r.location} · {r.rating && <><Star className="w-2.5 h-2.5 inline fill-accent text-accent -mt-0.5" /> {r.rating}</>}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })()}

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
