import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowLeft, FileText } from 'lucide-react'

const sections = [
  {
    heading: 'Acceptance of Terms',
    body: 'By accessing or using the Asuogyaman Tourism Hub (ATBH) website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services. We reserve the right to update these terms at any time; continued use constitutes acceptance of changes.'
  },
  {
    heading: 'Use of Services',
    body: 'You agree to use our services only for lawful purposes and in accordance with these Terms. You must not use our services to transmit any harmful, fraudulent, or offensive content. We grant you a limited, non-exclusive, non-transferable license to access and use our platform for personal, non-commercial purposes.'
  },
  {
    heading: 'User Accounts',
    body: 'When you create an account, you are responsible for maintaining the confidentiality of your credentials and for all activities under your account. You must provide accurate, current, and complete information. We reserve the right to suspend or terminate accounts that violate these terms.'
  },
  {
    heading: 'Intellectual Property',
    body: 'All content on this platform — including text, images, logos, graphics, and software — is the property of ATBH or its licensors and is protected by applicable copyright, trademark, and intellectual property laws. You may not reproduce, distribute, or create derivative works without explicit permission.'
  },
  {
    heading: 'Third-Party Services',
    body: 'Our platform may link to or integrate with third-party services (e.g., booking platforms, payment processors). We are not responsible for the content, practices, or availability of these third-party services. Your interactions with them are governed by their own terms and policies.'
  },
  {
    heading: 'Limitation of Liability',
    body: 'ATBH provides its services on an "as is" and "as available" basis. To the fullest extent permitted by law, we disclaim all warranties, express or implied. We shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of our services.'
  },
  {
    heading: 'Indemnification',
    body: 'You agree to indemnify and hold harmless ATBH, its affiliates, officers, and employees from any claims, damages, or expenses arising from your violation of these Terms or your misuse of our services.'
  },
  {
    heading: 'Termination',
    body: 'We reserve the right to suspend or terminate your access to our services at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users, third parties, or our platform.'
  },
  {
    heading: 'Governing Law',
    body: 'These Terms shall be governed by and construed in accordance with the laws of the Republic of Ghana. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Ghana.'
  },
  {
    heading: 'Contact',
    body: 'For questions about these Terms, please contact us at legal@asuogyamantourismhub.com or write to ATBH, Akosombo, Eastern Region, Ghana.'
  }
]

const easeOut = [0.25, 0.1, 0.25, 1] as const

export default function Terms() {
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
              <FileText className="w-7 h-7 text-accent" />
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent mb-2 block">Legal</span>
              <h1 className="text-3xl md:text-4xl font-serif text-fg tracking-tight leading-tight">Terms &amp; Conditions</h1>
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
              Please read these Terms and Conditions carefully before using the Asuogyaman Tourism Hub platform.
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
              If you have any questions about these Terms, please contact us at{' '}
              <a href="mailto:legal@asuogyamantourismhub.com" className="text-accent hover:text-accent/80 transition-colors">legal@asuogyamantourismhub.com</a>
              {' '}or write to ATBH, Akosombo, Eastern Region, Ghana.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}