import { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

import L from 'leaflet'
import { ATTRACTIONS, DINING, STAY, EVENTS, SCHOOLS, BUSINESS } from '../data'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Search, X } from 'lucide-react'

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

const CATEGORY_COLORS: Record<string, string> = {
  attraction: '#C5954A',
  dining: '#E8A87C',
  stay: '#4A9E8E',
  event: '#7C6BB5',
  school: '#5B8CC5',
  business: '#C56B4A',
}

const easeOut = [0.25, 0.1, 0.25, 1] as const

function createColoredIcon(color: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
    <path d="M16 0C7.16 0 0 7.16 0 16c0 12 16 24 16 24s16-12 16-24C32 7.16 24.84 0 16 0z" fill="${color}"/>
    <circle cx="16" cy="14" r="8" fill="white"/>
  </svg>`

  return L.divIcon({
    html: svg,
    className: 'custom-marker',
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -42],
  })
}

const INITIAL_CENTER: [number, number] = [6.2667, 0.0667]
const INITIAL_ZOOM = 11

function MapController({ center, zoom, selectedId, onMapClick }: { center: [number, number]; zoom?: number; selectedId: string | null; onMapClick: () => void }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(center, zoom || map.getZoom(), { duration: 0.6 })
  }, [center, zoom, map])
  useEffect(() => {
    if (!selectedId) return
    const handler = () => {
      onMapClick()
      map.flyTo(INITIAL_CENTER, INITIAL_ZOOM, { duration: 0.6 })
    }
    map.on('click', handler)
    return () => { map.off('click', handler) }
  }, [selectedId, map, onMapClick])
  return null
}

function MapMarker({ location, selectedId, onSelect, navigate }: { location: any; selectedId: string | null; onSelect: (id: string) => void; navigate: (path: string) => void }) {
  const markerRef = useRef<L.Marker>(null)

  useEffect(() => {
    if (selectedId === location.id && markerRef.current) {
      markerRef.current.openPopup()
    }
  }, [selectedId, location.id])

  return (
    <Marker
      ref={markerRef}
      position={location.coordinates as [number, number]}
      icon={createColoredIcon(CATEGORY_COLORS[location.type] || '#C5954A')}
      eventHandlers={{
        click: () => onSelect(location.id),
      }}
    >
      <Popup className="[&_.leaflet-popup-content-wrapper]:rounded-xl [&_.leaflet-popup-content-wrapper]:shadow-lg [&_.leaflet-popup-content-wrapper]:border [&_.leaflet-popup-content-wrapper]:border-border [&_.leaflet-popup-content]:m-3 [&_.leaflet-popup-content-wrapper]:overflow-hidden">
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
  )
}

export default function MapPage() {
  const navigate = useNavigate()
  const [active, setActive] = useState<CategoryKey>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number]>([6.2667, 0.0667])
  const [searchQuery, setSearchQuery] = useState('')
  const cardsRef = useRef<HTMLDivElement>(null)

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

  const filtered = useMemo(() => {
    let result = active === 'all' ? allLocations : allLocations.filter(l => l.type === active)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(l => l.name.toLowerCase().includes(q) || l.description.toLowerCase().includes(q))
    }
    return result
  }, [active, allLocations, searchQuery])

  const handleCardClick = useCallback((location: any) => {
    setSelectedId(location.id)
    if (location.coordinates) {
      setMapCenter(location.coordinates as [number, number])
    }
  }, [])

  const center: [number, number] = INITIAL_CENTER

  return (
    <div className="relative h-screen pt-16 w-full flex flex-col md:flex-row">
      {/* Cards panel (left/bottom) */}
      <div className="relative md:w-[380px] lg:w-[420px] shrink-0 bg-bg border-r border-border overflow-hidden flex flex-col">
        {/* Search + Filters */}
        <div className="p-4 border-b border-border space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
            <input
              type="text"
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-surface border border-border rounded-lg text-fg placeholder:text-muted/50 focus:outline-none focus:border-accent/40 transition-colors"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-3 h-3 text-muted hover:text-fg" />
              </button>
            )}
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`text-[10px] px-2.5 py-1.5 rounded-lg font-medium transition-all duration-200 ${
                  active === cat.key
                    ? 'bg-accent text-accent-fg shadow-sm shadow-accent/20'
                    : 'text-muted hover:text-fg bg-surface border border-border/60 hover:border-accent/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Card list */}
        <div ref={cardsRef} className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-4 space-y-3"
            >
              {filtered.map((location) => (
                <motion.div
                  key={location.id}
                  layoutId={location.id}
                  onClick={() => handleCardClick(location)}
                  className={`group flex gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 border ${
                    selectedId === location.id
                      ? 'bg-accent/5 border-accent/30 shadow-sm'
                      : 'bg-surface border-border/60 hover:border-accent/20 hover:shadow-sm'
                  }`}
                >
                  {location.image && (
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={location.image}
                        alt={location.name}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xs font-medium text-fg leading-snug line-clamp-1">{location.name}</h3>
                      <span
                        className="shrink-0 w-2 h-2 rounded-full mt-1"
                        style={{ backgroundColor: CATEGORY_COLORS[location.type] || '#C5954A' }}
                      />
                    </div>
                    <p className="text-[10px] text-muted leading-relaxed line-clamp-2 mt-1">{location.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[9px] font-medium uppercase tracking-wider text-accent/70">{location.type}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); navigate(ROUTES[location.type]); }}
                        className="ml-auto text-[10px] text-accent hover:text-accent/80 transition-colors font-medium"
                      >
                        Details &rarr;
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              {filtered.length === 0 && (
                <p className="text-xs text-muted text-center py-8">No locations found</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Map panel */}
      <div className="flex-1 relative">
        {/* Category count badge */}
        <div className="absolute top-4 left-4 z-[1000] glass rounded-lg px-3 py-1.5 text-xs text-muted">
          {filtered.length} {filtered.length === 1 ? 'location' : 'locations'}
        </div>

        <MapContainer
          center={center}
          zoom={11}
          scrollWheelZoom={false}
          dragging={false}
          touchZoom={false}
          doubleClickZoom={false}
          keyboard={false}
          className="h-full w-full"
          zoomControl={false}
        >
          <MapController center={mapCenter} zoom={selectedId ? 13 : undefined} selectedId={selectedId} onMapClick={() => { setSelectedId(null); setMapCenter(INITIAL_CENTER) }} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filtered.map(location => (
            <MapMarker
              key={location.id}
              location={location}
              selectedId={selectedId}
              onSelect={setSelectedId}
              navigate={(path) => navigate(path)}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
