import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin, Waves, Hotel, Info, Menu, Instagram, Facebook, Twitter, Phone, Play, Star, ArrowUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import RainbowBordersButton from '../components/ui/rainbow-borders-button';
import LegalModal from '../components/ui/legal-modal';
import ScrollProgressBar from '../components/animations/scroll-progress-bar';
import ChatConcierge from '../components/chat/chat-concierge';
import BookingModal from '../components/modals/booking-modal';
import VideoModal from '../components/modals/video-modal';
import MobileMenu from '../components/layout/mobile-menu';
import { SignInButton, UserButton, useUser } from '@clerk/react';

const primaryNavItems = [
  { label: 'Home', path: '/' },
  { label: 'Attractions', path: '/attractions' },
  { label: 'Dining', path: '/dining' },
  { label: 'Stay', path: '/stay' },
  { label: 'Events', path: '/events' },
];

const secondaryNavItems = [
  { label: 'Business', path: '/business' },
  { label: 'Schools', path: '/schools' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Map', path: '/map' },
  { label: 'Experience', path: '/experience' },
  { label: 'Donate', path: '/donate' },
  { label: 'Donation History', path: '/donation-history' },
];

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoaded, isSignedIn } = useUser();
  const {
    isMenuOpen, setIsMenuOpen,
    isTermsOpen, setIsTermsOpen,
    isPrivacyOpen, setIsPrivacyOpen,
  } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navHidden, setNavHidden] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (moreDropdownOpen) setMoreDropdownOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [moreDropdownOpen]);

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      setScrolled(sy > 50);
      setShowScrollTop(sy > 500);
      if (sy > 200) {
        setNavHidden(sy > lastScrollY);
      } else {
        setNavHidden(false);
      }
      setLastScrollY(sy);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-brand-cream text-foreground overflow-x-hidden">
      <ScrollProgressBar />

      {/* Navbar */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: navHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 bg-brand-dark/95 backdrop-blur-xl shadow-2xl shadow-black/10`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-brand-gold/[0.08] flex items-center justify-center overflow-hidden p-2 ring-1 ring-brand-gold/20 group-hover:ring-brand-gold/40 shadow-lg shadow-brand-gold/5 group-hover:shadow-brand-gold/20 transition-all duration-500">
              <img
                src="/Images/a-minimalist-app-icon-design-of-a-tourist--vector-.png"
                alt="ATBH"
                className="w-full h-full object-contain"
              />
            </div>
            <span className={`font-serif text-xl tracking-[-0.02em] font-semibold transition-all duration-500 text-white`}><span className="sm:hidden">ATBH</span><span className="hidden sm:inline">Asuogyaman <span className="text-brand-gold/60 font-normal">Tourism Hub</span></span></span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {primaryNavItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-300 ${
                  location.pathname === item.path ? 'text-brand-gold' : 'text-white/70 hover:text-brand-gold'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div layoutId="nav-active" className="absolute -bottom-2 left-0 right-0 h-[2px] bg-brand-gold rounded-full" />
                )}
              </Link>
            ))}

            {/* More dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMoreDropdownOpen(true)}
              onMouseLeave={() => setMoreDropdownOpen(false)}
            >
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`relative flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-300 ${
                  secondaryNavItems.some(item => location.pathname === item.path)
                    ? 'text-brand-gold'
                    : 'text-white/70 hover:text-brand-gold'
                }`}
              >
                More
                <svg
                  className={`w-3 h-3 transition-transform duration-300 ${moreDropdownOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
                {secondaryNavItems.some(item => location.pathname === item.path) && (
                  <motion.div layoutId="nav-active" className="absolute -bottom-2 left-0 right-0 h-[2px] bg-brand-gold rounded-full" />
                )}
              </button>

              <AnimatePresence>
              {moreDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute top-full right-0 mt-3 w-52 bg-brand-dark/98 backdrop-blur-2xl border border-white/[0.08] rounded-2xl py-3 shadow-2xl shadow-black/30"
                >
                  {secondaryNavItems.map((item, i) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMoreDropdownOpen(false)}
                      className={`block px-6 py-3 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-200 ${
                        location.pathname === item.path
                          ? 'text-brand-gold bg-brand-gold/[0.06]'
                          : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="flex items-center gap-3">
            {/* Donate button */}
            <Link
              to="/donate"
              className={`hidden sm:inline-flex text-[10px] font-bold uppercase tracking-[0.3em] transition-all px-5 py-2 rounded-full ${
                location.pathname === '/donate'
                  ? 'bg-brand-gold text-brand-dark'
                  : 'bg-brand-gold/15 text-brand-gold hover:bg-brand-gold hover:text-brand-dark border border-brand-gold/30'
              }`}
            >
              Donate
            </Link>
            {/* Auth */}
            {isLoaded && !isSignedIn && (
              <SignInButton mode="modal">
                <button className="hidden sm:inline-flex text-[10px] font-bold uppercase tracking-[0.3em] text-white/70 hover:text-brand-gold transition-all px-4 py-2 rounded-full border border-white/10 hover:border-brand-gold/30">
                  Sign In
                </button>
              </SignInButton>
            )}
            {isLoaded && isSignedIn && (
              <UserButton />
            )}
            {isHome && (
              <RainbowBordersButton onClick={() => navigate('/attractions')}>
                Explore
              </RainbowBordersButton>
            )}
            <button onClick={() => setIsMenuOpen(true)} className="lg:hidden w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all">
              <Menu className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <MobileMenu />

      {/* Page content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative bg-brand-dark text-white py-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[200px]" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/[0.08] flex items-center justify-center overflow-hidden p-2.5 ring-1 ring-brand-gold/20 shadow-lg shadow-brand-gold/10">
                  <img
                    src="/Images/a-minimalist-app-icon-design-of-a-tourist--vector-.png"
                    alt="ATBH"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="font-serif text-xl tracking-[-0.02em] text-white font-semibold">Asuogyaman</div>
                  <div className="text-[10px] text-brand-gold/60 uppercase tracking-[0.25em] font-bold">Tourism Hub</div>
                </div>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">Discover the beauty, culture, and adventure of Asuogyaman — your gateway to the Volta Region's most unforgettable experiences.</p>
            </div>
            <div>
              <h5 className="font-serif text-xl mb-6">Quick Links</h5>
              <ul className="space-y-4 text-white/40 text-sm">
                <li><Link to="/" className="hover:text-brand-gold transition-colors">Home</Link></li>
                <li><Link to="/attractions" className="hover:text-brand-gold transition-colors">Attractions</Link></li>
                <li><Link to="/dining" className="hover:text-brand-gold transition-colors">Dining</Link></li>
                <li><Link to="/stay" className="hover:text-brand-gold transition-colors">Stay</Link></li>
                <li><Link to="/events" className="hover:text-brand-gold transition-colors">Events</Link></li>
                <li><Link to="/map" className="hover:text-brand-gold transition-colors">Map</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-serif text-xl mb-6">More</h5>
              <ul className="space-y-4 text-white/40 text-sm">
                <li><Link to="/business" className="hover:text-brand-gold transition-colors">Business Directory</Link></li>
                <li><Link to="/schools" className="hover:text-brand-gold transition-colors">Schools</Link></li>
                <li><Link to="/gallery" className="hover:text-brand-gold transition-colors">Gallery</Link></li>
                <li><Link to="/donate" className="hover:text-brand-gold transition-colors">Donate</Link></li>
                <li><Link to="/donation-history" className="hover:text-brand-gold transition-colors">Donation History</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-serif text-xl mb-6">Follow Us</h5>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold transition-all group">
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://web.facebook.com/people/Asuogyaman-Tourism-Hub/61573134887291/" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold transition-all group">
                  <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold transition-all group">
                  <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] uppercase tracking-[0.2em] text-white/30">
            <div>&copy; 2024 ATBH Tourism Board. All Rights Reserved.</div>
            <div className="flex gap-8">
              <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
              <button onClick={() => setIsTermsOpen(true)} className="hover:text-white transition-colors cursor-pointer">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat concierge */}
      <ChatConcierge />

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 left-6 z-[150] w-12 h-12 bg-brand-dark/80 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-brand-gold transition-all shadow-2xl border border-white/10"
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Global modals */}
      <BookingModal />
      <VideoModal />

      <AnimatePresence>
        <LegalModal type="privacy" isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
        <LegalModal type="terms" isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      </AnimatePresence>
    </div>
  );
}
