import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import {
  Calendar, ArrowRight, ExternalLink, Quote, Building2, Landmark,
  Handshake, Globe, Briefcase, ArrowUpRight, Sparkles,
} from 'lucide-react'
import MirrorHero from '../components/ui/mirror-hero'
import AnimatedSection from '../components/animations/animated-section'
import RevealSection from '../components/animations/reveal-section'
import SectionDivider from '../components/ui/section-divider'
import { FloatingOrbs } from '../components/ui/floating-orbs'
import StructuredData from '../components/seo/structured-data'

const easeOut = [0.25, 0.1, 0.25, 1] as const

const sectors = [
  { label: 'Tourism & Hospitality', icon: Globe },
  { label: 'Agro-processing', icon: Briefcase },
  { label: 'Real Estate', icon: Building2 },
  { label: 'Mineral Resources', icon: Landmark },
  { label: 'Agriculture & Livestock', icon: Landmark },
  { label: 'Limestone & Cement', icon: Landmark },
]

const participants = [
  {
    name: 'Hon. Godwin Bobobee',
    role: 'District Chief Executive',
    org: 'Asuogyaman District Assembly',
    initials: 'GB',
  },
  {
    name: 'Doris Kafui Afanyedey',
    role: 'Chief Executive Officer',
    org: 'AmCham Ghana',
    initials: 'DA',
  },
]

const partners = [
  {
    image: '/Images/program 1 (1).jpg',
    caption: 'Ghana Nebraska Chamber of Commerce',
  },
  {
    image: '/Images/program 1 (2).jpg',
    caption:
      'Engagement with Deputy CEO of Diaspora Affairs at the office of the President as partners to the Asuogyaman Tourism and Investment Festival',
  },
  {
    image: '/Images/program 1 (3).jpg',
    caption: 'America Chamber of Commerce',
  },
  {
    image: '/Images/program 1 (4).jpg',
    caption: 'National Development Planning Commission (NDPC)',
  },
]

const LEARN_MORE_URL = 'https://bit.ly/4xdDVBz'

function DotGrid({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04] ${className}`}>
      <div
        className="w-full h-full"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  )
}

export default function Activity() {
  return (
    <div className="min-h-screen bg-bg">
      <StructuredData
        type="TouristDestination"
        name="Asuogyaman Activities & Engagements"
        description="Investment partnerships, engagements and the Asuogyaman Business and Investment Festival story"
        url={typeof window !== 'undefined' ? window.location.href : undefined}
      />

      <MirrorHero
        image="/Images/tourism festival.jpg"
        badge="Activities & Engagements"
        title="Partnerships in Motion"
        description="From investment dialogues with AmCham Ghana to strategic engagements across institutions — follow how the Asuogyaman District is building the partnerships shaping its tourism, business and investment future."
        cta={{ label: 'Read the Update', href: '#update' }}
      />

      {/* ============ UPDATE / ARTICLE ============ */}
      <section id="update" className="relative py-20 md:py-28 px-5 overflow-hidden">
        <DotGrid />
        <div className="max-w-3xl mx-auto relative">
          <RevealSection>
            <div className="flex flex-col items-center text-center mb-12">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-medium tracking-[0.25em] uppercase text-accent border border-accent/20 bg-accent/5 mb-5">
                <Sparkles className="w-3 h-3" />
                Investment Partnership News
              </span>
              <div className="inline-flex items-center gap-2 text-[10px] text-muted mb-4 bg-surface border border-border rounded-full px-4 py-1.5">
                <Calendar className="w-3 h-3 text-accent" />
                <span className="font-medium">Wednesday, August 16, 2026</span>
              </div>
              <h1 className="text-2xl md:text-4xl lg:text-[2.75rem] font-serif text-fg tracking-tight leading-[1.15] max-w-2xl">
                Asuogyaman District Assembly&nbsp;×&nbsp;AmCham&nbsp;Ghana — A Strategic Proposal
              </h1>
            </div>
          </RevealSection>

          {/* Lead + sectors */}
          <RevealSection delay={0.05}>
            <p className="text-[15px] md:text-base text-fg/90 leading-[1.9] font-light mb-8">
              On Wednesday, August 16, 2026, the Asuogyaman District Assembly proposed a partnership
              with AmCham Ghana to attract U.S. private-sector investment — with priority interest
              spanning tourism and hospitality, agro-processing, real estate, and mineral resources
              across the district.
            </p>

            <div className="mb-10">
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-accent mb-4">
                Priority Investment Sectors
              </p>
              <div className="flex flex-wrap gap-2">
                {sectors.map((s, i) => (
                  <motion.span
                    key={s.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.04, ease: easeOut }}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface border border-border text-xs text-muted hover:text-accent hover:border-accent/30 transition-colors duration-300"
                  >
                    <s.icon className="w-3.5 h-3.5 text-accent/70" />
                    {s.label}
                  </motion.span>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* Body */}
          <RevealSection delay={0.05}>
            <div className="space-y-6 border-l-2 border-accent/15 pl-6 md:pl-8">
              <p className="text-[15px] md:text-base text-muted leading-[1.9] font-light">
                A key component of the proposal is the district's planned{' '}
                <em className="text-fg not-italic font-normal">Business and Investment Festival</em>,
                anchoring a broader push to develop the Volta Lake area's undeveloped islands for
                tourism, alongside a proposed hospitality and tourism training institute.
              </p>
              <p className="text-[15px] md:text-base text-muted leading-[1.9] font-light">
                The district also flagged agriculture and livestock opportunities, available land for
                real estate development, and limestone deposits for potential cement production.
              </p>
              <p className="text-[15px] md:text-base text-muted leading-[1.9] font-light">
                The discussions were held during a meeting between Hon. Godwin Bobobee, District
                Chief Executive, and Assembly officials, and AmCham Ghana leadership, led by Chief
                Executive Officer Doris Kafui Afanyedey.
              </p>
            </div>
          </RevealSection>

          <div className="mt-14 -mx-2 md:mx-0">
            <RevealSection>
              <div className="rounded-3xl bg-surface border border-border/70 overflow-hidden relative">
                <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
                <div className="p-6 md:p-10">
                  {/* Key Participants */}
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-accent mb-4">
                      Key Participants
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {participants.map((p) => (
                        <div
                          key={p.name}
                          className="flex items-start gap-3 p-4 rounded-2xl bg-bg border border-border/70"
                        >
                          <div className="w-10 h-10 rounded-xl bg-accent/10 ring-1 ring-accent/20 flex items-center justify-center shrink-0">
                            <span className="text-[11px] font-semibold text-accent">{p.initials}</span>
                          </div>
                          <div className="min-w-0">
                            <div className="text-[13px] font-medium text-fg leading-tight">{p.name}</div>
                            <div className="text-[11px] text-accent mt-0.5">{p.role}</div>
                            <div className="text-[10px] text-muted mt-0.5">{p.org}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Quote — full-width landscape band */}
                  <div className="mt-8 md:mt-12 border-t border-border/70 pt-8 md:pt-10">
                    <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 md:px-6 lg:px-12">
                      <Quote className="w-7 h-7 text-accent/30 shrink-0 sm:mt-1" />
                      <div className="flex-1">
                        <p className="text-[15px] md:text-lg text-fg/90 leading-[1.9] font-light italic">
                          Ms. Afanyedey welcomed the district's proposal and reaffirmed AmCham
                          Ghana's commitment to connecting member companies with investment-ready
                          opportunities across Ghana's regions — including support for the
                          district's engagement with national investment promotion partners ahead
                          of the festival.
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-5 text-[10px]">
                          <span className="text-muted">Learn more here:</span>
                          <a
                            href={LEARN_MORE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-accent font-medium hover:text-accent/80 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            bit.ly/4xdDVBz
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ============ PARTNERS ============ */}
      <div className="relative">
        <SectionDivider label="Programme Partners" />
      </div>

      <section className="py-8 md:py-12 px-5 pb-24 relative overflow-hidden">
        <FloatingOrbs />
        <DotGrid />
        <div className="max-w-7xl mx-auto relative">
          <RevealSection>
            <div className="flex items-end justify-between mb-10 md:mb-14 flex-wrap gap-4">
              <div>
                <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-accent mb-3 block">
                  Who We Are Engaging With
                </span>
                <h2 className="text-2xl md:text-4xl font-serif text-fg tracking-tight">
                  Partners in the Festival's Success
                </h2>
              </div>
              <p className="text-xs text-muted max-w-xs leading-relaxed">
                Institutions engaged as partners to the Asuogyaman Tourism and Investment Festival.
              </p>
            </div>
          </RevealSection>

          <div className="grid sm:grid-cols-2 gap-5 md:gap-7 auto-rows-fr">
            {partners.map((partner, i) => (
              <motion.div
                key={partner.image}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: (i % 2) * 0.08, ease: easeOut }}
                className="group h-full"
              >
                <div className="relative overflow-hidden rounded-[1.5rem] bg-surface border border-border/70 group-hover:border-accent/25 transition-all duration-500 h-full flex flex-col">
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={partner.image}
                      alt={partner.caption}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 block max-w-none"
                      style={{ height: '100%' }}
                      loading={i < 2 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-fg/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(197,149,74,0.15), transparent 60%)' }} />
                    <span className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                      <span className="text-[11px] font-semibold text-white/90">{String(i + 1).padStart(2, '0')}</span>
                    </span>
                  </div>
                  <div className="p-5 md:p-6 flex-1 flex flex-col justify-end">
                    <div className="w-8 h-0.5 bg-accent/50 mb-3 transition-all duration-500 group-hover:w-14" />
                    <p className="text-sm md:text-[15px] font-medium text-fg leading-relaxed group-hover:text-accent transition-colors duration-300">
                      {partner.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <AnimatedSection className="py-24 md:py-32 px-5 relative overflow-hidden bg-brand-dark text-white">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #C5954A 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 left-1/4 w-[420px] h-[420px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[360px] h-[360px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-2xl mx-auto text-center relative">
          <RevealSection>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-medium tracking-[0.25em] uppercase text-accent border border-accent/20 bg-accent/10 mb-6">
              <Handshake className="w-3 h-3" />
              Learn More Here
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-[1.1] mb-5">
              Discover the full story of the Asuogyaman Tourism &amp; Investment Festival
            </h2>
            <p className="text-sm md:text-base text-white/60 leading-relaxed font-light mb-10 max-w-lg mx-auto">
              Explore the official announcement, partnership details and what this means for
              investors, businesses and the future of the district.
            </p>
            <a
              href={LEARN_MORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 bg-accent text-accent-fg px-8 py-4 text-sm font-medium rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30"
            >
              Learn more here
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
            <div className="mt-5 text-[11px] text-white/40 font-medium tracking-[0.2em] flex items-center justify-center gap-2">
              <ExternalLink className="w-3 h-3 text-accent/70" />
              bit.ly/4xdDVBz
            </div>
          </RevealSection>
        </div>
      </AnimatedSection>

      {/* ============ BOTTOM LINK ============ */}
      <div className="py-16 px-5 text-center">
        <Link
          to="/events"
          className="group inline-flex items-center gap-2 text-xs text-muted hover:text-accent transition-colors"
        >
          Explore festivals &amp; events in Asuogyaman
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  )
}