import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  { year: '1950s', title: 'The Vision', description: 'Plans for a hydroelectric dam on the Volta River take shape, envisioning a future of energy and prosperity for Ghana.', icon: '01' },
  { year: '1965', title: 'Akosombo Dam Completed', description: 'The Akosombo Dam is inaugurated — at 660m wide and 114m tall, it creates Lake Volta, the largest man-made lake by surface area.', icon: '02' },
  { year: '1972', title: 'Adomi Bridge Opens', description: 'Ghana\'s first suspension bridge spans the Volta River at Atimpoku, connecting the Eastern and Volta Regions for the first time.', icon: '03' },
  { year: '2000s', title: 'Tourism Awakens', description: 'Luxury lakeside resorts begin to emerge along the Volta\'s pristine shores, attracting international visitors to the region.', icon: '04' },
  { year: '2010s', title: 'Cultural Renaissance', description: 'The Akwamu Traditional Council revitalises festivals and cultural sites, drawing visitors to experience authentic Ghanaian heritage.', icon: '05' },
  { year: '2024', title: 'ATBH Launches', description: 'The Asuogyaman Tourism & Business Hub goes live — a digital gateway to the region\'s attractions, dining, stays, and experiences.', icon: '06' },
]

export default function HorizonTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.timeline-card')
      if (!cards.length) return

      gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${(cards.length - 1) * window.innerWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0.3, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.to(cards, { paused: true }),
              start: 'left 60%',
              end: 'left 40%',
              scrub: 1,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-brand-dark">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-accent/10 pointer-events-none z-10" />

      <div className="absolute top-8 left-0 right-0 text-center z-20">
        <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-accent">Timeline</span>
        <h2 className="text-2xl md:text-3xl font-medium text-white tracking-tight mt-1">
          The Story of Asuogyaman
        </h2>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-[10px] text-white/30 uppercase tracking-widest">Scroll horizontally</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-white/40 animate-bounce" />
        </div>
      </div>

      <div
        ref={trackRef}
        className="absolute inset-0 flex items-center"
        style={{ padding: '0 20vw' }}
      >
        <div className="flex gap-12 md:gap-24">
          {milestones.map((m) => (
            <div
              key={m.year}
              className="timeline-card flex-shrink-0 w-[320px] md:w-[420px]"
            >
              <div className="relative p-6 md:p-8 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/30 hover:border-accent/50 transition-all duration-500 shadow-xl shadow-black/30">
                {/* Year */}
                <span className="text-accent text-sm font-bold tracking-wider">{m.year}</span>

                {/* Title */}
                <h3 className="text-white text-xl md:text-2xl font-bold mt-2 mb-3">{m.title}</h3>

                {/* Description */}
                <p className="text-white/85 text-sm leading-relaxed">{m.description}</p>

                {/* Icon/Number */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 flex items-center justify-center">
                  <span className="text-accent text-xs font-bold">{m.icon}</span>
                </div>

                {/* Connecting line */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-px h-6 bg-gradient-to-b from-accent/40 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
