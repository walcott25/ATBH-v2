import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Attractions', path: '/attractions' },
  { label: 'Dining', path: '/dining' },
  { label: 'Stay', path: '/stay' },
  { label: 'Events', path: '/events' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Map', path: '/map' },
  { label: 'Experience', path: '/experience' },
  { label: 'More', path: '#', children: [
    { label: 'Business', path: '/business' },
    { label: 'Schools', path: '/schools' },
  ]},
];

export default function MainLayout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMoreOpen(false); setMobileOpen(false); }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-bg text-fg">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-white/70 backdrop-blur-2xl border-b border-white/20 shadow-lg shadow-black/5'
            : 'bg-gradient-to-b from-black/30 to-transparent'
        }`}
      >
        {/* Liquid glass gradient edge glow */}
        {scrolled && (
          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent pointer-events-none" />
        )}

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5 group">
              <span className={`text-sm font-semibold tracking-tight transition-colors duration-300 ${scrolled ? 'text-fg' : 'text-white'}`}>
                Asuogyaman
              </span>
              <span className={`text-xs font-light transition-colors duration-300 hidden sm:inline ${scrolled ? 'text-muted' : 'text-white/50'}`}>
                Tourism Hub
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                if (item.children) {
                  const hasActiveChild = item.children.some(c => isActive(c.path));
                  return (
                    <div key={item.label} className="relative" onMouseLeave={() => setMoreOpen(false)}>
                      <button
                        onMouseEnter={() => setMoreOpen(true)}
                        onClick={() => setMoreOpen(!moreOpen)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                          hasActiveChild
                            ? `${scrolled ? 'text-fg bg-accent/10' : 'text-white bg-white/15'}`
                            : `${scrolled ? 'text-muted hover:text-fg hover:bg-accent/5' : 'text-white/70 hover:text-white hover:bg-white/15'}`
                        }`}
                      >
                        {item.label}
                      </button>
                      <AnimatePresence>
                        {moreOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                            onMouseEnter={() => setMoreOpen(true)}
                            className="absolute top-full right-0 mt-2 w-44 bg-white/80 backdrop-blur-2xl border border-white/20 rounded-xl py-2 shadow-xl shadow-black/5"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.path}
                                to={child.path}
                                className={`block px-4 py-2.5 text-xs font-medium transition-all duration-150 relative ${
                                  isActive(child.path)
                                    ? 'text-accent bg-accent/5' : 'text-muted hover:text-fg hover:bg-accent/5'
                                }`}
                              >
                                {isActive(child.path) && (
                                  <motion.span layoutId="navIndicator" className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-accent rounded-full" />
                                )}
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.path}
                    to={item.path!}
                    className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      isActive(item.path!)
                        ? `${scrolled ? 'text-fg bg-accent/10' : 'text-white bg-white/15'}`
                        : `${scrolled ? 'text-muted hover:text-fg hover:bg-accent/5' : 'text-white/70 hover:text-white hover:bg-white/15'}`
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                to="/donate"
                className={`ml-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  scrolled
                    ? 'bg-accent text-accent-fg hover:bg-accent/90 shadow-sm shadow-accent/20'
                    : 'bg-accent/90 text-accent-fg hover:bg-accent backdrop-blur-sm'
                }`}
              >
                Donate
              </Link>
            </nav>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-8 h-8 flex items-center justify-center relative z-50"
              aria-label="Menu"
            >
              <motion.div
                animate={mobileOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-0.5 rounded-full relative"
                style={{ backgroundColor: scrolled ? '#0A0A0A' : '#FFFFFF' }}
              >
                <motion.div
                  className="absolute w-5 h-0.5 rounded-full -top-1.5"
                  style={{ backgroundColor: scrolled ? '#0A0A0A' : '#FFFFFF' }}
                  animate={mobileOpen ? { rotate: 45, top: 0 } : { rotate: 0, top: -6 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute w-5 h-0.5 rounded-full top-1.5"
                  style={{ backgroundColor: scrolled ? '#0A0A0A' : '#FFFFFF' }}
                  animate={mobileOpen ? { rotate: -45, top: 0 } : { rotate: 0, top: 6 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-border overflow-hidden"
            >
              <div className="px-6 py-4 space-y-1">
                {navItems.map((item) => {
                  if (item.children) {
                    return item.children.map((child) => (
                      <motion.div key={child.path} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
                        <Link to={child.path} className={`block py-2.5 text-sm transition-colors ${isActive(child.path) ? 'text-accent font-medium' : 'text-muted hover:text-fg'}`}>
                          {child.label}
                        </Link>
                      </motion.div>
                    ));
                  }
                  return (
                    <motion.div key={item.path} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
                      <Link to={item.path!} className={`block py-2.5 text-sm transition-colors ${isActive(item.path!) ? 'text-accent font-medium' : 'text-muted hover:text-fg'}`}>
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
                <div className="pt-2 border-t border-border mt-2 space-y-1">
                  <Link to="/donate" className="block py-2.5 text-sm text-accent font-medium">Donate</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main><Outlet /></main>

      <footer className="border-t border-border mt-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <span className="text-sm font-semibold tracking-tight">Asuogyaman</span>
              <p className="text-xs text-muted mt-2 leading-relaxed max-w-xs">
                Discover the beauty of Eastern Region, Ghana — where the Volta River meets engineering marvels and quiet luxury.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-medium text-fg mb-4 uppercase tracking-widest">Navigate</h4>
              <div className="flex flex-col gap-2.5">
                {['/', '/attractions', '/dining', '/stay', '/map'].map((p) => (
                  <Link key={p} to={p} className="text-xs text-muted hover:text-fg transition-colors duration-200">
                    {p === '/' ? 'Home' : p.slice(1).charAt(0).toUpperCase() + p.slice(2)}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-medium text-fg mb-4 uppercase tracking-widest">Connect</h4>
              <div className="flex flex-col gap-2.5">
                <Link to="/donate" className="text-xs text-muted hover:text-fg transition-colors duration-200">Support Us</Link>
                <Link to="/experience" className="text-xs text-muted hover:text-fg transition-colors duration-200">Experiences</Link>
                <Link to="/gallery" className="text-xs text-muted hover:text-fg transition-colors duration-200">Gallery</Link>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted">&copy; {new Date().getFullYear()} Asuogyaman Tourism Board. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link to="/terms" className="text-xs text-muted hover:text-fg transition-colors duration-200">Terms</Link>
              <span className="text-xs text-border">|</span>
              <Link to="/privacy" className="text-xs text-muted hover:text-fg transition-colors duration-200">Privacy</Link>
              <span className="text-xs text-border">|</span>
              <p className="text-xs text-muted/50">Crafted with care in Ghana</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
