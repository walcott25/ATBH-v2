import { motion } from 'motion/react'
import { X, Shield, FileText } from 'lucide-react'

const content = {
  terms: {
    title: 'Terms of Service',
    icon: FileText,
    sections: [
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
        body: 'For questions about these Terms, please contact us at legal@asuoagyamantourismhub.com or write to ATBH, Akosombo, Eastern Region, Ghana.'
      }
    ]
  },
  privacy: {
    title: 'Privacy Policy',
    icon: Shield,
    sections: [
      {
        heading: 'Information We Collect',
        body: 'We collect information you provide directly, such as your name, email address, phone number, and any details you submit through forms, account registration, or communications with our concierge. We also automatically collect certain technical data, including IP address, browser type, device information, and usage patterns when you interact with our platform.'
      },
      {
        heading: 'How We Use Your Information',
        body: 'We use your information to: provide, maintain, and improve our services; process inquiries and bookings; send relevant updates, promotions, and travel information (with your consent); analyze usage to enhance user experience; comply with legal obligations and protect our rights.'
      },
      {
        heading: 'Legal Basis for Processing (GDPR)',
        body: 'We process your personal data based on: your consent (which you may withdraw at any time); the necessity to perform a contract with you; our legitimate interests in operating and improving our services; and compliance with legal obligations.'
      },
      {
        heading: 'Data Sharing and Disclosure',
        body: 'We do not sell your personal data to third parties. We may share your information with: trusted service providers who assist in operating our platform (e.g., hosting, analytics, payment processing); law enforcement or regulatory authorities when required by law; other parties with your explicit consent. All third-party processors are bound by data protection agreements.'
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
        body: 'Under applicable data protection laws, you have the right to: access your personal data; rectify inaccurate data; request deletion of your data ("right to be forgotten"); restrict or object to processing; data portability; withdraw consent at any time. To exercise these rights, contact us at privacy@asuoagyamantourismhub.com.'
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
        body: 'For privacy-related inquiries or to file a complaint, contact our Data Protection Officer at dpo@asuoagyamantourismhub.com or write to ATBH, Akosombo, Eastern Region, Ghana. You also have the right to lodge a complaint with your local data protection authority.'
      }
    ]
  }
}

interface LegalModalProps {
  type: 'terms' | 'privacy'
  isOpen: boolean
  onClose: () => void
}

export default function LegalModal({ type, isOpen, onClose }: LegalModalProps) {
  const data = content[type]
  const Icon = data.icon

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl border border-white/20"
      >
        <div className="sticky top-0 bg-white/90 backdrop-blur-xl border-b border-brand-dark/5 px-8 py-6 flex items-center gap-4 z-10">
          <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-brand-gold" />
          </div>
          <h2 className="text-xl font-serif tracking-tight">{data.title}</h2>
          <button onClick={onClose} className="ml-auto text-brand-dark/30 hover:text-brand-dark transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          <p className="text-sm text-brand-dark/50 leading-relaxed">
            Last updated: June 2026
          </p>

          {data.sections.map((section, i) => (
            <div key={i}>
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-brand-dark mb-3">
                {i + 1}. {section.heading}
              </h3>
              <p className="text-sm text-brand-dark/70 leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
