import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

interface Chapter {
  title: string
  subtitle: string
  body: string
  image: string
  color: string
}

const chapters: Chapter[] = [
  {
    title: 'The Volta River',
    subtitle: 'Lifeblood of the East',
    body: 'The Volta River carved this landscape over millennia — one of Africa\'s great waterways, stretching from the Burkina Faso highlands to the Atlantic. Here, at Asuogyaman, it pools into the vast Lake Volta, the largest man-made lake on Earth.',
    image: '/Images/Aylos bay1.jpg',
    color: 'from-blue-900/80 via-blue-800/40 to-transparent',
  },
  {
    title: 'Engineering Marvels',
    subtitle: 'Where human ingenuity meets nature',
    body: 'The Akosombo Dam, completed in 1965, generates 912 MW of electricity that powers Ghana\'s industries and homes. The Adomi Bridge — Ghana\'s first suspension bridge — arcs gracefully over the Volta, connecting the Eastern and Volta Regions.',
    image: '/Images/adomi-bridge-hero.jpg',
    color: 'from-amber-900/70 via-amber-800/30 to-transparent',
  },
  {
    title: 'Culture & Tradition',
    subtitle: 'Centuries of heritage',
    body: 'The Akwamu people have stewarded these lands for generations. Traditional festivals, drumming ceremonies, and vibrant kente weaving tell stories of a culture that thrives alongside the river. Every village has a rhythm, every chief a history.',
    image: '/Images/ghana-culture-festival.jpg',
    color: 'from-emerald-900/70 via-emerald-800/30 to-transparent',
  },
  {
    title: 'A Future of Discovery',
    subtitle: 'Your journey begins here',
    body: 'Today, Asuogyaman welcomes the world. From luxury lakeside resorts to eco-adventures, from world-class dining to cultural immersion — this is a destination that honours its past while embracing its future.',
    image: '/Images/luxury-resort-infinity.jpg',
    color: 'from-stone-900/70 via-stone-800/30 to-transparent',
  },
  {
    title: 'Wildlife & Nature',
    subtitle: 'A sanctuary for biodiversity',
    body: 'The Volta Basin teems with life. From the graceful African fish eagle soaring above the lake to the playful monkeys that inhabit the riverside forests, Asuogyaman is a paradise for nature lovers. The wetlands and riverine ecosystems support an astonishing variety of bird species, making it a premier destination for birdwatching. Hippos wallow in the shallows while colourful kingfishers dart across the water — a living tapestry of West Africa\'s natural heritage.',
    image: '/Images/story-nature.jpg',
    color: 'from-teal-900/70 via-teal-800/30 to-transparent',
  },
  {
    title: 'Adventure & Exploration',
    subtitle: 'Where every day is an expedition',
    body: 'For the adventurous traveller, Asuogyaman offers endless horizons. Cruise the calm waters of Lake Volta on a traditional canoe, hike the dramatic Akwamu Gorge with its breathtaking views, or cycle through quaint riverside villages. Dodi Island\'s sandy beaches invite you to unwind after days of exploration. Whether you seek adrenaline or serenity, the landscape here delivers an experience you will never forget.',
    image: '/Images/story-adventure.jpg',
    color: 'from-orange-900/70 via-orange-800/30 to-transparent',
  },
]

function ChapterCard({ chapter, index }: { chapter: Chapter; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4])
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [80, 0, 0, -80])

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className="relative h-[90vh] min-h-[600px] w-full overflow-hidden rounded-3xl"
    >
      <div className="absolute inset-0">
        <img
          src={chapter.image}
          alt={chapter.title}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${chapter.color}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      <motion.div
        style={{ y }}
        className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24"
      >
        <div className="max-w-2xl">
          <span className="text-accent text-xs font-semibold uppercase tracking-[0.3em] mb-3 block">
            Chapter {String(index + 1).padStart(2, '0')}
          </span>
          <h2 className="font-['Playfair_Display_SC'],serif text-4xl md:text-5xl lg:text-6xl text-white font-semibold tracking-wide leading-tight mb-3">
            {chapter.title}
          </h2>
          <p className="text-accent/80 text-sm md:text-base font-medium mb-5 tracking-wide">
            {chapter.subtitle}
          </p>
          <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl">
            {chapter.body}
          </p>
        </div>
      </motion.div>

      {/* Chapter number */}
      <div className="absolute bottom-8 right-8 text-[120px] md:text-[200px] font-['Playfair_Display_SC'],serif text-white/5 leading-none select-none pointer-events-none">
        {String(index + 1).padStart(2, '0')}
      </div>
    </motion.div>
  )
}

export default function StorytellingChapters() {
  const progressRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: progressRef,
    offset: ['start start', 'end end'],
  })

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="py-20 md:py-28 px-5 relative" ref={progressRef}>
      <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
        <div className="text-center mb-8">
          <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-accent mb-2 block">
            The Story
          </span>
          <h2 className="text-2xl md:text-3xl font-medium text-fg tracking-tight">
            Journey Through Asuogyaman
          </h2>
        </div>

        {chapters.map((chapter, i) => (
          <ChapterCard key={chapter.title} chapter={chapter} index={i} />
        ))}
      </div>

      {/* Progress bar */}
      <div className="fixed top-16 left-0 right-0 h-0.5 z-50 bg-border/30 pointer-events-none">
        <motion.div
          style={{ width: progressWidth }}
          className="h-full bg-accent origin-left"
        />
      </div>
    </section>
  )
}
