import React, { useMemo, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  X,
  Phone,
  Mail,
  Globe,
  MapPin,
  Star,
  Wifi,
  ParkingCircle,
  Wind,
  Utensils,
  Waves,
  Trees,
  Music,
  Tv,
  Monitor,
  Car,
  Coffee,
  Sun,
  Hotel,
  ArrowLeft,
  ExternalLink,
  GraduationCap,
  Calendar,
  Clock,
  Check,
  ChevronRight
} from 'lucide-react';
import type { Dining, Stay, School, Event } from './data';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [30, 46],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const amenityIcons: Record<string, React.ReactNode> = {
  'WiFi': <Wifi className="w-4 h-4" />,
  'Air Conditioning': <Wind className="w-4 h-4" />,
  'Parking': <ParkingCircle className="w-4 h-4" />,
  'Restaurant': <Utensils className="w-4 h-4" />,
  'Bar': <Coffee className="w-4 h-4" />,
  'Pool': <Waves className="w-4 h-4" />,
  'Swimming Pool': <Waves className="w-4 h-4" />,
  'Outdoor Seating': <Sun className="w-4 h-4" />,
  'Lake Views': <Waves className="w-4 h-4" />,
  'Lake View Rooms': <Waves className="w-4 h-4" />,
  'Garden': <Trees className="w-4 h-4" />,
  'Live Music': <Music className="w-4 h-4" />,
  'TV': <Tv className="w-4 h-4" />,
  'Room Service': <Hotel className="w-4 h-4" />,
  'Spa & Wellness': <Sun className="w-4 h-4" />,
  'Fine Dining': <Utensils className="w-4 h-4" />,
  'Family Friendly': <Monitor className="w-4 h-4" />,
  'Takeaway': <Car className="w-4 h-4" />,
};

const fallbackIcon = <Star className="w-4 h-4" />;

function AmenityBadge({ label, index }: { label: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex items-center gap-2.5 bg-brand-dark/70 backdrop-blur-sm border border-white/[0.08] px-4 py-2.5 rounded-full text-white/80 text-xs font-medium group hover:bg-white/[0.08] hover:border-brand-gold/30 hover:text-white transition-all duration-300"
    >
      <span className="text-brand-gold/60 group-hover:text-brand-gold transition-colors">
        {amenityIcons[label] || <Check className="w-4 h-4" />}
      </span>
      <span className="tracking-wide">{label}</span>
    </motion.div>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
  primary
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  primary?: boolean;
}) {
  const content = (
    <motion.div
      whileHover={{ scale: 1.02, x: 4 }}
      className={`flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 group cursor-pointer ${
        primary
          ? 'bg-brand-gold/[0.12] border-brand-gold/20 hover:border-brand-gold/40 shadow-lg shadow-brand-gold/5'
          : 'bg-brand-dark/60 backdrop-blur-sm border-white/[0.08] hover:bg-white/[0.06] hover:border-white/20'
      }`}
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 backdrop-blur-xl ${
        primary
          ? 'bg-brand-gold/25 text-brand-gold ring-1 ring-brand-gold/30'
          : 'bg-brand-dark/40 text-white/60 ring-1 ring-white/10'
      }`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-[10px] uppercase tracking-[0.25em] font-bold mb-0.5 ${
          primary ? 'text-brand-gold/60' : 'text-white/40'
        }`}>
          {label}
        </div>
        <div className={`text-sm font-medium truncate ${
          primary ? 'text-brand-gold' : 'text-white/80'
        }`}>
          {value}
        </div>
      </div>
      {href && (
        <div className={`shrink-0 mt-2 ${primary ? 'text-brand-gold/40' : 'text-white/20'} group-hover:translate-x-1 group-hover:opacity-100 transition-all`}>
          <ExternalLink className="w-4 h-4" />
        </div>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {content}
      </a>
    );
  }
  return content;
}

function Divider() {
  return (
    <div className="flex items-center gap-3 my-16">
      <span className="flex-1 h-px bg-white/10" />
      <span className="w-2 h-2 bg-brand-gold/40 rounded-full" />
      <span className="flex-1 h-px bg-white/10" />
    </div>
  );
}

type DetailItem = Dining | Stay | School | Event;

export default function DetailPanel({
  item,
  type,
  onClose
}: {
  item: DetailItem;
  type: 'dining' | 'stay' | 'school' | 'event';
  onClose: () => void;
}) {
  const categoryLabel = type === 'school' ? (item as School).type : (item as Event).category;

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const heroParallax = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.6]);

  // Scroll to top whenever the item changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [item]);

  // Reduced particle count for performance
  const particles = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
      duration: Math.random() * 10 + 8,
      driftX: (Math.random() - 0.5) * 30,
      driftY: (Math.random() - 0.5) * 20,
    })), []
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[400]"
    >
      <motion.div
        onClick={onClose}
        className="fixed inset-0 bg-brand-dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      />

      <div
        ref={scrollRef}
        className="relative z-10 h-full overflow-y-auto overflow-x-hidden scrollbar-hide"
        style={{ willChange: 'scroll-position' }}
      >
        {/* Grid overlay */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Close button */}
        <motion.button
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onClick={onClose}
          className="fixed top-8 right-8 z-30 w-12 h-12 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center hover:bg-white/20 transition-all group shadow-xl shadow-black/20 border border-white/10"
        >
          <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
        </motion.button>

        {/* Hero Section */}
        <div className="relative w-full min-h-[50vh] md:min-h-[60vh] flex items-center justify-center bg-fg/5">
          <div className="absolute inset-0 bg-gradient-to-b from-fg/10 to-fg/60" />
          <motion.img
            src={item.image}
            alt={item.name}
            className="relative w-full h-full max-h-[85vh] object-contain px-4 py-8"
            loading="lazy"
            style={{ y: heroParallax }}
          />
          <motion.div
            style={{ opacity: heroOpacity }}

          />

          {/* Animated organic glow */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.14, 0.08] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brand-gold rounded-full blur-[100px] pointer-events-none"
            style={{ willChange: 'transform, opacity' }}
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.08, 0.04] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] bg-brand-gold rounded-full blur-[80px] pointer-events-none"
            style={{ willChange: 'transform, opacity' }}
          />

          {/* Floating particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-brand-gold pointer-events-none"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{
                y: [0, p.driftY, 0],
                x: [0, p.driftX, 0],
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Subtle static glow lines - static for performance */}
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none opacity-30">

          </div>

          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={onClose}
            className="absolute top-8 left-8 z-20 flex items-center gap-2.5 text-white/60 hover:text-white bg-white/10 backdrop-blur-2xl border border-white/10 px-5 py-2.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold transition-all hover:bg-white/20 hover:border-white/20 shadow-xl shadow-black/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </motion.button>

          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute top-8 right-8 md:right-28 z-20"
          >
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-2xl border border-white/10 px-5 py-2.5 rounded-full text-[9px] uppercase tracking-[0.25em] font-black text-white/80 shadow-xl shadow-black/10">
              <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
              {categoryLabel}
            </span>
          </motion.div>

          {/* Hero text */}
          <div className="absolute bottom-0 left-0 right-0 z-20">              <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-16 pb-8 md:pb-12 lg:pb-20">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="flex flex-wrap items-center gap-4 mb-5">
                  <span className="text-brand-gold text-[10px] uppercase tracking-[0.35em] font-bold">
                    {type === 'stay' ? 'Premium Accommodation' : type === 'school' ? 'Educational Institution' : type === 'event' ? 'Annual Event' : 'Dining Experience'}
                  </span>
                  {'rating' in item && item.rating && (
                    <div className="flex items-center gap-1.5 bg-brand-gold/20 backdrop-blur-xl border border-brand-gold/30 px-3 py-1 rounded-full">
                      <Star className="w-3 h-3 fill-brand-gold text-brand-gold" />
                      <span className="text-[10px] font-black text-brand-gold">{item.rating}</span>
                    </div>
                  )}
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif text-white leading-[0.88] tracking-tighter max-w-4xl drop-shadow-2xl">
                  {item.name}
                </h1>
                {type === 'school' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.35 }}
                    className="flex items-center gap-2 mt-5 text-white/60 text-sm"
                  >
                    <MapPin className="w-4 h-4 text-brand-gold" />
                    <span className="tracking-wide">{(item as School).location}</span>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Bottom fade */}

        </div>

        {/* Body */}          <div className="relative z-20 -mt-16">
            <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12" style={{ minHeight: 'calc(100dvh - 70vh + 4rem)' }}>
            {/* Description Card */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative bg-brand-dark/70 backdrop-blur-sm border border-white/[0.08] rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-8 lg:p-12 mb-8 overflow-hidden shadow-2xl shadow-black/20"
            >
              {/* Gold accent line */}
              <div className="absolute top-0 left-12 right-12 h-[1px] bg-brand-gold/30" />
              {/* Subtle glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/[0.04] rounded-full blur-[100px] pointer-events-none" />

              <div className="flex items-start gap-6 mb-8">                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center shrink-0 ring-1 ring-brand-gold/20">
                  {type === 'school' ? <GraduationCap className="w-6 h-6 text-brand-gold" /> : <Utensils className="w-6 h-6 text-brand-gold" />}
                </div>
                <div>
                  <h2 className="text-2xl font-serif text-white tracking-tight mb-1">About</h2>
                  <div className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold">
                    Discover the details
                  </div>
                </div>
              </div>

              <p className="text-white/70 text-base md:text-lg leading-[1.8] font-light">
                {type !== 'event' && (item as any).longDescription ? (item as any).longDescription : item.description}
              </p>
            </motion.div>

            {/* Amenities / Programs / Event Info Section */}
            {((type === 'school' && (item as School).programs && (item as School).programs!.length > 0) ||
              (type !== 'school' && type !== 'event' && (item as Dining).amenities && (item as Dining).amenities!.length > 0) ||
              type === 'event') && (
              <>
                <Divider />
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-5 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center ring-1 ring-brand-gold/20">
                      {type === 'school' ? <GraduationCap className="w-6 h-6 text-brand-gold" /> : type === 'event' ? <Calendar className="w-6 h-6 text-brand-gold" /> : <Star className="w-6 h-6 text-brand-gold" />}
                    </div>
                    <div>
                      <h2 className="text-2xl font-serif text-white tracking-tight">
                        {type === 'school' ? 'Academic Programs' : type === 'event' ? 'Event Schedule' : 'Amenities & Features'}
                      </h2>
                      <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold mt-1">
                        {type === 'event' ? 'When & how long' : 'Everything you need to know'}
                      </p>
                    </div>
                  </div>
                  {type === 'event' ? (
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-3 bg-brand-dark/70 backdrop-blur-sm border border-white/[0.08] px-6 py-4 rounded-2xl text-white/80">
                        <Calendar className="w-5 h-5 text-brand-gold" />
                        <div>
                          <div className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/40 mb-0.5">Date</div>
                          <div className="text-base font-medium">{(item as Event).date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-brand-dark/70 backdrop-blur-sm border border-white/[0.08] px-6 py-4 rounded-2xl text-white/80">
                        <Clock className="w-5 h-5 text-brand-gold" />
                        <div>
                          <div className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/40 mb-0.5">Duration</div>
                          <div className="text-base font-medium">{(item as Event).duration}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-3">
                      {(type === 'school' ? (item as School).programs! : (item as Dining).amenities!).map((label, i) => (
                        <AmenityBadge key={label} label={label} index={i} />
                      ))}
                    </div>
                  )}
                </motion.div>
              </>
            )}

            {/* Map & Contact Grid */}
            <Divider />
            <div className="grid lg:grid-cols-5 gap-8 mb-8">
              {/* Map */}
              {item.coordinates && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="lg:col-span-3 h-[400px] rounded-[2rem] overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/20 relative group"
                >

                  <MapContainer
                    center={item.coordinates}
                    zoom={15}
                    scrollWheelZoom={true}
                    className="h-full w-full"
                    zoomControl={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={item.coordinates}>
                      <Popup>
                        <div className="text-sm font-medium font-serif">{item.name}</div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                  {/* Map overlay label */}
                  <div className="absolute top-4 left-4 z-10 bg-brand-dark/60 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full text-[9px] uppercase tracking-[0.25em] font-bold text-white/60">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-brand-gold" />
                      Location
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Contact Cards */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="lg:col-span-2 space-y-4"
              >
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center ring-1 ring-brand-gold/20">
                    <Phone className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif text-white tracking-tight">Get in Touch</h2>
                    <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold mt-1">
                      Contact &amp; directions
                    </p>
                  </div>
                </div>

                {type !== 'event' && 'phone' in item && item.phone && (
                  <ContactCard
                    icon={<Phone className="w-5 h-5" />}
                    label="Phone"
                    value={(item as any).phone}
                    href={`tel:${(item as any).phone.replace(/\s/g, '')}`}
                  />
                )}

                {type !== 'event' && 'email' in item && item.email && (
                  <ContactCard
                    icon={<Mail className="w-5 h-5" />}
                    label="Email"
                    value={(item as any).email}
                    href={`mailto:${(item as any).email}`}
                  />
                )}

                {type === 'school' && (item as School).website && (
                  <ContactCard
                    icon={<Globe className="w-5 h-5" />}
                    label="Website"
                    value={(item as School).website!}
                    href={(item as School).website}
                    primary
                  />
                )}

                {type !== 'school' && (item as Dining).bookingUrl && (
                  <ContactCard
                    icon={<Globe className="w-5 h-5" />}
                    label="Book Online"
                    value="Visit Website"
                    href={(item as Dining).bookingUrl}
                    primary
                  />
                )}

                {item.coordinates && (
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${item.coordinates[0]},${item.coordinates[1]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ContactCard
                      icon={<MapPin className="w-5 h-5" />}
                      label="Get Directions"
                      value="Open in Google Maps"
                      primary
                    />
                  </a>
                )}
              </motion.div>
            </div>

            {/* Back to listings button */}
            <Divider />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="inline-flex items-center gap-3 bg-brand-dark/60 backdrop-blur-sm border border-white/[0.08] text-white/60 hover:text-white px-10 py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold transition-all hover:bg-brand-dark/80 hover:border-white/20 shadow-xl shadow-black/10"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to {type === 'stay' ? 'Accommodations' : type === 'school' ? 'Schools' : type === 'event' ? 'Events' : 'Dining'}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
