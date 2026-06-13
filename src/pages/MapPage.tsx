import { useEffect, useState, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { ATTRACTIONS, DINING, STAY, EVENTS, SCHOOLS, BUSINESS } from '../data'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'attraction', label: 'Attractions' },
  { key: 'dining', label: 'Dining' },
  { key: 'stay', label: 'Stay' },
  { key: 'event', label: 'Events' },
  { key: 'school', label: 'Schools' },
  { key: 'business', label: 'Business' },
] as const

type CategoryKey = (typeof CATEGORIES)[number]['key']

const ROUTES: Record<string, string> = {
  attraction: '/attractions',
  dining: '/dining',
  stay: '/stay',
  event: '/events',
  school: '/schools',
  business: '/business',
}

export default function MapPage() {
  const navigate = useNavigate()
  const [active, setActive] = useState<CategoryKey>('all')

  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })
  }, [])

  const allLocations = useMemo(() => {
    const tagged = [
      ...ATTRACTIONS.filter(a => a.coordinates).map(i => ({ ...i, type: 'attraction' as const })),
      ...DINING.filter(d => d.coordinates).map(i => ({ ...i, type: 'dining' as const })),
      ...STAY.filter(s => s.coordinates).map(i => ({ ...i, type: 'stay' as const })),
      ...EVENTS.filter(e => e.coordinates).map(i => ({ ...i, type: 'event' as const })),
      ...SCHOOLS.filter(s => s.coordinates).map(i => ({ ...i, type: 'school' as const })),
      ...BUSINESS.filter(b => b.coordinates).map(i => ({ ...i, type: 'business' as const })),
    ]
    return tagged
  }, [])

  const filtered = useMemo(
    () => (active === 'all' ? allLocations : allLocations.filter(l => l.type === active)),
    [active, allLocations]
  )

  const center: [number, number] =
    allLocations.length > 0 && allLocations[0].coordinates
      ? allLocations[0].coordinates
      : [6.2667, 0.0667]

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] glass rounded-xl shadow-sm px-3 py-2 flex gap-1"
      >
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActive(cat.key)}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200 ${
              active === cat.key
                ? 'bg-accent text-accent-fg shadow-sm shadow-accent/20'
                : 'text-muted hover:text-fg'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      <MapContainer
        center={center}
        zoom={11}
        scrollWheelZoom={true}
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filtered.map(location => (
          <Marker
            key={location.id}
            position={location.coordinates as [number, number]}
          >
            <Popup className="[&_.leaflet-popup-content-wrapper]:rounded-xl [&_.leaflet-popup-content-wrapper]:shadow-lg [&_.leaflet-popup-content-wrapper]:border [&_.leaflet-popup-content-wrapper]:border-border [&_.leaflet-popup-content]:m-3 [&_.leaflet-popup-tip]:border-border [&_.leaflet-popup-content-wrapper]:overflow-hidden">
              <div className="min-w-[200px]">
                {location.image && (
                  <img src={location.image} alt={location.name} className="w-full h-24 object-cover rounded-lg mb-3" />
                )}
                <p className="text-sm font-medium text-fg mb-0.5">{location.name}</p>
                <p className="text-xs text-muted leading-relaxed mb-2 line-clamp-2">{location.description}</p>
                <button
                  onClick={() => navigate(ROUTES[location.type])}
                  className="text-[11px] font-medium text-accent hover:text-accent/80 transition-colors"
                >
                  View details &rarr;
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
