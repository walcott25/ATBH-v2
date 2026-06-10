import { useEffect } from 'react'
import { motion } from 'motion/react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { ATTRACTIONS, STAY, DINING, SCHOOLS, BUSINESS, EVENTS } from '../data'
import { useNavigate } from 'react-router-dom'
import AdinkraBg from '../components/ui/adinkra-bg'

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

const typeColors: Record<string, string> = {
  attraction: '#e74c3c',
  stay: '#2ecc71',
  dining: '#f39c12',
  school: '#3498db',
  business: '#9b59b6',
  event: '#1abc9c',
}

const typeRoutes: Record<string, string> = {
  attraction: '/attractions',
  stay: '/stay',
  dining: '/dining',
  school: '/schools',
  business: '/business',
  event: '/events',
}

export default function MapPage() {
  const navigate = useNavigate()

  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })
  }, [])

  const mapAttractions = ATTRACTIONS.filter(a => a.coordinates)
  const mapStay = STAY.filter(s => s.coordinates)
  const mapDining = DINING.filter(d => d.coordinates)
  const mapSchools = SCHOOLS.filter(s => s.coordinates)
  const mapBusiness = BUSINESS.filter(b => b.coordinates)
  const mapEvents = EVENTS.filter(f => f.coordinates)

  const allMapLocations = [
    ...mapAttractions.map(item => ({ ...item, type: 'attraction' as const })),
    ...mapStay.map(item => ({ ...item, type: 'stay' as const })),
    ...mapDining.map(item => ({ ...item, type: 'dining' as const })),
    ...mapSchools.map(item => ({ ...item, type: 'school' as const })),
    ...mapBusiness.map(item => ({ ...item, type: 'business' as const })),
    ...mapEvents.map(item => ({ ...item, type: 'event' as const })),
  ]

  const center: [number, number] =
    allMapLocations.length > 0 && allMapLocations[0].coordinates
      ? allMapLocations[0].coordinates
      : [6.2667, 0.0667]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <AdinkraBg variant="adinkrahene" opacity={0.04} color="#ffffff">
      <section className="relative py-32 px-6 overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(183,151,90,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(183,151,90,0.06),transparent_50%)]" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="max-w-3xl">
            <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">
              Explore the Region
            </span>
            <h1 className="text-5xl md:text-7xl font-serif leading-[0.9] tracking-tighter text-white mb-8">
              Interactive Map
            </h1>
            <p className="text-white/60 text-lg leading-relaxed font-light max-w-xl">
              Navigate through the Asuogyaman District and discover the exact locations of our most famous landmarks.
            </p>
          </div>
        </motion.div>
      </section>
      </AdinkraBg>

      {/* Map Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-24 px-6 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-brand-dark/5 relative z-0">
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
              {allMapLocations.map((location) => (
                <Marker
                  key={location.id}
                  position={location.coordinates as [number, number]}
                  icon={L.divIcon({
                    className: 'custom-marker',
                    html: `<div style="background:${typeColors[location.type]};width:24px;height:24px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>`,
                    iconSize: [24, 24],
                    iconAnchor: [12, 24],
                    popupAnchor: [0, -28],
                  })}
                >
                  <Popup className="custom-popup">
                    <div className="p-2 max-w-[200px]">
                      <img
                        src={location.image}
                        alt={location.name}
                        className="w-full h-24 object-cover rounded-lg mb-2"
                      />
                      <h4 className="font-serif font-bold text-lg mb-1">{location.name}</h4>
                      <p className="text-xs text-brand-dark/70 mb-2">{location.description}</p>
                      <button
                        onClick={() => navigate(typeRoutes[location.type])}
                        className="text-brand-gold text-[10px] uppercase tracking-widest font-bold hover:underline"
                      >
                        View Details
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
