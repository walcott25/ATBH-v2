import { SignUp } from '@clerk/react';
import { motion } from 'motion/react';
import { useRef } from 'react';
import { Compass, Star, MapPin } from 'lucide-react';

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1.5,
  delay: Math.random() * 5,
  duration: Math.random() * 8 + 6,
  drift: (Math.random() - 0.5) * 15,
}));

const stats = [
  { value: '25+', label: 'Destinations', icon: MapPin },
  { value: '50+', label: 'Experiences', icon: Compass },
  { value: '4.9', label: 'Traveler Rating', icon: Star },
];

export default function SignUpPage() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="min-h-screen flex flex-col md:flex-row bg-brand-dark overflow-hidden">
      {/* Left — Cinematic Brand Panel */}
      <div
        className="relative w-full md:w-[55%] h-[40vh] md:h-screen overflow-hidden"
        style={{
          backgroundImage: 'url("/Images/adomi-bridge-hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-brand-dark/60" />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Gold glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-gold rounded-full blur-[180px] pointer-events-none"
        />

        {/* Floating particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-brand-gold pointer-events-none"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -30 - p.drift, 0], x: [0, p.drift / 2, 0], opacity: [0, 0.5, 0], scale: [0, 1, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-10 md:p-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-xl bg-brand-gold/10 flex items-center justify-center overflow-hidden p-2 ring-1 ring-brand-gold/20">
              <img src="/Images/a-minimalist-app-icon-design-of-a-tourist--vector-.png" alt="" className="w-full h-full object-contain" />
            </div>
            <span className="font-serif text-xl text-white tracking-[-0.02em] font-semibold">Asuogyaman <span className="text-brand-gold/60 font-normal">Tourism Hub</span></span>
          </motion.div>

          {/* Middle content */}
          <div className="space-y-8 max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="inline-flex items-center gap-2.5 bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] px-5 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.35em] text-white/40">
                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full shadow-lg shadow-brand-gold/50" />
                The Gateway to the Eastern Region
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[0.82] text-white tracking-[-0.03em]"
            >
              Join the
              <br />
              <span className="text-brand-gold italic font-semibold">
                Journey
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-white/50 text-sm md:text-base leading-[1.9] font-light max-w-sm"
            >
              Create an account to unlock exclusive guides, plan your itinerary, and experience
              the best of Asuogyaman — where the Volta River meets untamed African splendor.
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex gap-10 md:gap-14"
          >
            {stats.map((s) => (
              <div key={s.label} className="group relative">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-brand-gold/[0.08] flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                    <s.icon className="w-3.5 h-3.5 text-brand-gold/70" />
                  </div>
                  <span className="text-2xl md:text-3xl font-serif text-white group-hover:text-brand-gold transition-colors duration-500 tracking-[-0.02em]">{s.value}</span>
                </div>
                <div className="text-[9px] uppercase tracking-[0.3em] text-white/25 font-bold pl-[2.25rem]">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right — Sign-up Panel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative w-full md:w-[45%] h-auto md:h-screen overflow-y-auto flex flex-col items-center justify-center px-6 md:px-14 py-6 md:py-16 bg-brand-dark"
      >
        {/* Decorative line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-white/5 md:hidden" />
        <div className="absolute top-0 bottom-0 left-0 w-px bg-white/5 hidden md:block" />

        <div className="w-full max-w-md">
          {/* Mobile logo (hidden on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-2 mb-4 md:hidden"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center overflow-hidden p-1.5">
              <img src="/Images/a-minimalist-app-icon-design-of-a-tourist--vector-.png" alt="" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-serif text-base text-white tracking-tight">ATBH</div>
              <div className="text-[7px] text-brand-gold uppercase tracking-[0.3em] font-bold">Tourism Hub</div>
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-4 md:mb-8"
          >
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">
              Create Your Account
            </span>
            <div className="mt-2 w-12 h-px bg-brand-gold/40" />
          </motion.div>

          {/* Clerk SignUp */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <SignUp
              routing="path"
              path="/sign-up"
              signInUrl="/sign-in"
              appearance={{
                elements: {
                  card: 'bg-transparent shadow-none p-0',
                  header: 'hidden',
                  headerTitle: 'text-white font-serif text-2xl tracking-tight',
                  headerSubtitle: 'text-white/40',
                  socialButtonsBlockButton: 'border border-white/10 text-white hover:bg-white/5 hover:border-brand-gold/40 rounded-xl h-9 md:h-11 text-xs md:text-sm font-medium transition-all duration-300',
                  socialButtonsBlockButtonText: 'text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-wider',
                  socialButtonsBlockButtonArrow: 'text-white/40',
                  dividerLine: 'bg-white/5',
                  dividerText: 'text-white/20 text-[9px] md:text-[10px] uppercase tracking-widest font-bold',
                  formFieldLabel: 'text-white/50 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] mb-1',
                  formFieldInput: 'bg-white/5 border border-white/10 text-white rounded-xl h-9 md:h-11 px-3 md:px-4 text-xs md:text-sm focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 focus:bg-white/5 placeholder:text-white/20 transition-all duration-300',
                  formFieldInputShowPasswordButton: 'text-white/30 hover:text-brand-gold',
                  formButtonPrimary: 'bg-brand-gold text-brand-dark font-bold hover:bg-brand-gold/90 rounded-xl h-10 md:h-12 text-[10px] md:text-xs uppercase tracking-[0.25em] shadow-lg shadow-brand-gold/20 hover:shadow-xl hover:shadow-brand-gold/30 transition-all duration-300',
                  footerActionText: 'text-white/30 text-sm',
                  footerActionLink: 'text-brand-gold hover:text-brand-gold/80 font-semibold text-sm transition-colors',
                  identityPreviewEditButton: 'text-brand-gold hover:text-brand-gold/80 text-[11px] md:text-xs',
                  identityPreviewText: 'text-white/70 text-xs md:text-sm',
                  otpCodeFieldInput: 'bg-white/5 border border-white/10 text-white rounded-xl h-10 md:h-12 w-10 md:w-12 text-base md:text-lg focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30',
                  phoneInputBox: 'bg-white/5 border border-white/10 text-white rounded-xl h-9 md:h-11 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30',
                  phoneInputCountrySelect: 'text-white/70 text-xs md:text-sm',
                  phoneInputCountrySelectArrow: 'text-white/30',
                  formFieldError: 'text-red-400 text-[10px] md:text-xs mt-0.5',
                  alert: 'bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs md:text-sm',
                }
              }}
            />
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-4 md:mt-10 text-[9px] md:text-[10px] text-white/15 tracking-[0.2em] font-bold uppercase"
          >
            &copy; {new Date().getFullYear()} ATBH Tourism Board
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
