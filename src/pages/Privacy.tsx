import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Shield } from 'lucide-react'

const sections = [
  {
    heading: 'Information We Collect',
    body: 'We collect information you provide directly, such as your name, email address, phone number, and any details you submit through forms, account registration, or communications with our concierge. We also automatically collect certain technical data, including IP address, browser type, device information, and usage patterns when you interact with our platform.'
  },
  {
    heading: 'How We Use Your Information',
    body: 'We use your information to: provide, maintain, and improve our services; process inquiries and bookings; send relevant updates, promotions, and travel information (with your consent); analyze usage to enhance user experience; and comply with legal obligations and protect our rights.'
  },
  {
    heading: 'Legal Basis for Processing (GDPR)',
    body: 'We process your personal data based on: your consent (which you may withdraw at any time); the necessity to perform a contract with you; our legitimate interests in operating and improving our services; and compliance with legal obligations.'
  },
  {
    heading: 'Data Sharing and Disclosure',
    body: 'We do not sell your personal data to third parties. We may share your information with: trusted service providers who assist in operating our platform (e.g., hosting, analytics, payment processing); law enforcement or regulatory authorities when required by law; and other parties with your explicit consent. All third-party processors are bound by data protection agreements.'
  },
  {
    heading: 'International Data Transfers',
    body: 'Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place, including Standard Contractual Clauses where required, to protect your data in accordance with applicable data protection laws.'
  },
  {
    heading: 'Data Retention',
    body: 'We retain your personal data only as long as necessary to fulfill the purposes described in this policy, or as required by law. When data is no longer needed, we securely delete or anonymize it.'
  },
  {
    heading: 'Your Rights',
    body: 'Under applicable data protection laws, you have the right to: access your personal data; rectify inaccurate data; request deletion of your data ("right to be forgotten"); restrict or object to processing; data portability; and withdraw consent at any time. To exercise these rights, contact us at privacy@asuogyamantourismhub.com.'
  },
  {
    heading: 'Cookies and Tracking',
    body: 'We use cookies and similar technologies to improve functionality, analyze usage, and deliver relevant content. You can manage cookie preferences through your browser settings. Essential cookies are required for basic platform functionality.'
  },
  {
    heading: 'Data Security',
    body: 'We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. This includes encryption, access controls, and regular security audits. No method of transmission over the Internet is 100% secure, however.'
  },
  {
    heading: 'Children\'s Privacy',
    body: 'Our services are not directed to individuals under the age of 16. We do not knowingly collect personal data from children. If we become aware that a child has provided us with personal data, we will delete it promptly.'
  },
  {
    heading: 'Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. Material changes will be notified through our platform or via email. Your continued use after changes constitutes acceptance of the updated policy.'
  },
  {
    heading: 'Contact and Complaints',
    body: 'For privacy-related inquiries or to file a complaint, contact our Data Protection Officer at dpo@asuogyamantourismhub.com or write to ATBH, Akosombo, Eastern Region, Ghana. You also have the right to lodge a complaint with your local data protection authority.'
  }
]

const easeOut = [0.25, 0.1, 0.25, 1] as const

export default function Privacy() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 px-5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/3 -right-1/4 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>
        <div className="max-w-3xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: easeOut }}>
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-fg transition-colors mb-8">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
            className="flex items-start gap-5 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0 ring-1 ring-accent/20">
              <Shield className="w-7 h-7 text-accent" />
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent mb-2 block">Legal</span>
              <h1 className="text-3xl md:text-4xl font-serif text-fg tracking-tight leading-tight">Privacy Policy</h1>
              <p className="text-sm text-muted mt-2 leading-relaxed">Last updated: June 2026</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="px-5 pb-24">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}>
            <p className="text-sm text-muted leading-relaxed mb-12 p-5 rounded-xl bg-surface border border-border">
              This Privacy Policy explains how Asuogyaman Tourism Hub collects, uses, and protects your personal data.
            </p>
          </motion.div>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.03, ease: easeOut }}>
                <div className="flex items-start gap-4">
                  <span className="text-[10px] font-bold text-accent bg-accent/10 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="text-base font-medium text-fg mb-2">{section.heading}</h2>
                    <p className="text-sm text-muted leading-relaxed">{section.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="mt-16 p-6 rounded-xl bg-surface border border-border">
            <p className="text-xs text-muted leading-relaxed">
              For privacy-related inquiries, contact our Data Protection Officer at{' '}
              <a href="mailto:dpo@asuogyamantourismhub.com" className="text-accent hover:text-accent/80 transition-colors">dpo@asuogyamantourismhub.com</a>
              {' '}or write to ATBH, Akosombo, Eastern Region, Ghana.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}