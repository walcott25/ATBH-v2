import { SignIn, SignUp } from '@clerk/react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, Link } from 'react-router-dom';

const sharedAppearance = {
  elements: {
    card: 'bg-surface shadow-none p-0',
    header: 'hidden',
    socialButtonsBlockButton:
      'border border-border text-fg hover:bg-bg rounded-lg h-10 text-sm font-medium transition-colors',
    socialButtonsBlockButtonText: 'text-muted text-xs font-semibold',
    dividerLine: 'bg-border',
    dividerText: 'text-muted text-xs uppercase tracking-wider font-medium',
    formFieldLabel: 'text-muted text-xs font-medium mb-1.5',
    formFieldInput:
      'bg-bg border border-border text-fg rounded-lg h-10 px-3 text-sm focus:border-accent focus:ring-1 focus:ring-accent/20 placeholder:text-muted/50 transition-colors',
    formFieldInputShowPasswordButton: 'text-muted hover:text-fg',
    formButtonPrimary:
      'bg-accent text-accent-fg font-semibold hover:bg-accent/90 rounded-lg h-10 text-sm transition-colors',
    footerActionText: 'text-muted text-sm',
    footerActionLink: 'text-accent hover:text-accent/80 font-medium text-sm transition-colors',
    identityPreviewEditButton: 'text-accent hover:text-accent/80 text-sm',
    identityPreviewText: 'text-muted text-sm',
    otpCodeFieldInput:
      'bg-bg border border-border text-fg rounded-lg h-11 w-11 text-base focus:border-accent focus:ring-1 focus:ring-accent/20',
    phoneInputBox:
      'bg-bg border border-border text-fg rounded-lg h-10 focus:border-accent focus:ring-1 focus:ring-accent/20',
    phoneInputCountrySelect: 'text-muted text-sm',
    phoneInputCountrySelectArrow: 'text-muted',
    formFieldError: 'text-red-500 text-xs mt-1',
    alert: 'bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm',
    alternativeMethodsBlockButton:
      'border border-border text-fg hover:bg-bg rounded-lg h-10 text-sm transition-colors',
    alternativeMethodsBlockButtonText: 'text-muted text-sm',
  },
};

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const } },
};


export default function AuthPage() {
  const location = useLocation();
  const isSignIn = location.pathname === '/sign-in';

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex flex-col md:flex-row"
    >
      {/* Left — Dark Brand Panel */}
      <div
        className="relative w-full md:w-1/2 h-[30vh] md:h-screen flex flex-col justify-between p-8 md:p-14 overflow-hidden"
        style={{
          backgroundImage: 'url("/Images/adomi-bridge-hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#0A0A0A',
        }}
      >
        <div className="absolute inset-0 bg-fg/60 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] animate-pulse-soft" />
          <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-accent/3 rounded-full blur-[100px] animate-pulse-soft" style={{ animationDelay: '-2s' }} />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden p-1.5 ring-1 ring-white/10">
            <img
              src="/Images/a-minimalist-app-icon-design-of-a-tourist--vector-.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-sm font-semibold text-white tracking-tight">
            ATBH
          </span>
        </div>

        <div className="space-y-4 max-w-sm relative z-10">
          <AnimatePresence mode="wait">
            {isSignIn ? (
              <motion.h1
                key="signin-heading"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-4xl md:text-5xl font-semibold text-white leading-[1.1] tracking-tight"
              >
                Welcome Back
              </motion.h1>
            ) : (
              <motion.h1
                key="signup-heading"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-4xl md:text-5xl font-semibold text-white leading-[1.1] tracking-tight"
              >
                Join Us
              </motion.h1>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {isSignIn ? (
              <motion.p
                key="signin-desc"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-sm text-white/40 leading-relaxed"
              >
                Sign in to continue exploring Asuogyaman.
              </motion.p>
            ) : (
              <motion.p
                key="signup-desc"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-sm text-white/40 leading-relaxed"
              >
                Create an account to plan your journey.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="text-xs text-white/15 font-medium tracking-wider uppercase relative z-10">
          Asuogyaman Tourism Hub
        </div>
      </div>

      {/* Right — Auth Panel */}
      <div className="relative w-full md:w-1/2 h-auto md:h-screen overflow-y-auto flex items-center justify-center px-6 py-10 md:py-0 bg-bg">
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>

        <div className="w-full max-w-sm relative">
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-8 md:hidden">
            <div className="w-8 h-8 rounded-lg bg-fg/5 flex items-center justify-center overflow-hidden p-1.5">
              <img
                src="/Images/a-minimalist-app-icon-design-of-a-tourist--vector-.png"
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-sm font-semibold text-fg tracking-tight">ATBH</span>
          </div>

          <AnimatePresence mode="wait">
            {isSignIn ? (
              <motion.div
                key="signin-form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <SignIn
                  routing="path"
                  path="/sign-in"
                  signUpUrl="/sign-up"
                  appearance={sharedAppearance}
                />
              </motion.div>
            ) : (
              <motion.div
                key="signup-form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <SignUp
                  routing="path"
                  path="/sign-up"
                  signInUrl="/sign-in"
                  appearance={sharedAppearance}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Legal links */}
          <div className="mt-5 text-center">
            <p className="text-xs text-muted/60 leading-relaxed">
              By continuing, you agree to our{' '}
              <Link to="/terms" target="_blank" className="text-accent hover:text-accent/80 underline underline-offset-2 transition-colors">Terms</Link>
              {' '}and{' '}
              <Link to="/privacy" target="_blank" className="text-accent hover:text-accent/80 underline underline-offset-2 transition-colors">Privacy Policy</Link>
            </p>
          </div>

          <p className="text-center mt-5 text-xs text-muted/60 font-medium tracking-wider uppercase">
            &copy; {new Date().getFullYear()} ATBH
          </p>
        </div>
      </div>
    </motion.div>
  );
}
