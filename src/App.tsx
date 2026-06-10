/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { preloadAllHeroImages } from './utils/assetPreloader';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@clerk/react';
import { AppProvider } from './context/AppContext';
import MainLayout from './layouts/MainLayout';

import Home from './pages/Home';
import Attractions from './pages/Attractions';
import Dining from './pages/Dining';
import Stay from './pages/Stay';
import Schools from './pages/Schools';
import Events from './pages/Events';
import MapPage from './pages/MapPage';
import Gallery from './pages/Gallery';
import Business from './pages/Business';
import Experience from './pages/Experience';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Donate from './pages/Donate';
import DonationHistory from './pages/DonationHistory';

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function ProtectedRoute() {
  const { isLoaded, isSignedIn } = useAuth();
  const [showIntro, setShowIntro] = useState(() => !sessionStorage.getItem('atbh_intro_played'));
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !showIntro) return;
    setStep(1);
    const t1 = setTimeout(() => setStep(2), 4000);
    const t2 = setTimeout(() => {
      sessionStorage.setItem('atbh_intro_played', '1');
      setShowIntro(false);
    }, 8000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isLoaded, isSignedIn, showIntro]);

  if (!isLoaded) return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center relative overflow-hidden">
      {/* Cinematic background layers */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(212, 175, 55, 0.6) 0%, transparent 60%), radial-gradient(circle at 70% 60%, rgba(212, 175, 55, 0.3) 0%, transparent 50%)`,
        }}
      />
      {/* Animated grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />
      {/* Pulsing gold glow */}
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.06, 0.15, 0.06] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-[600px] h-[600px] bg-brand-gold rounded-full blur-[200px] pointer-events-none"
      />
      {/* Secondary glow */}
      <motion.div
        animate={{ scale: [1.2, 0.8, 1.2], opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-[400px] h-[400px] bg-brand-gold rounded-full blur-[150px] pointer-events-none"
        style={{ top: '30%', right: '10%' }}
      />
      {/* Logo with refined animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative"
      >
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-[1.5rem] bg-brand-gold/[0.06] flex items-center justify-center overflow-hidden p-4 ring-1 ring-brand-gold/20 shadow-2xl shadow-brand-gold/5">
          <img src="/Images/a-minimalist-app-icon-design-of-a-tourist--vector-.png" alt="" className="w-full h-full object-contain" />
        </div>
        {/* Subtle ring animation */}
        <motion.div
          className="absolute inset-0 rounded-[1.5rem]"
          animate={{
            boxShadow: [
              '0 0 0 0px rgba(197,160,89,0)',
              '0 0 0 3px rgba(197,160,89,0.25)',
              '0 0 0 0px rgba(197,160,89,0)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
      {/* Brand text with staggered entrance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="mt-10 text-center"
      >
        <div className="font-serif text-3xl md:text-4xl text-white tracking-[-0.02em]">Asuogyaman <span className="text-brand-gold/60 font-normal">Tourism Hub</span></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-[9px] text-white/20 uppercase tracking-[0.4em] font-bold mt-3"
        >
          The Gateway to the Eastern Region
        </motion.div>
      </motion.div>
      {/* Elegant loading indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 relative"
      >
        <div className="relative w-10 h-10">
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-[2px] border-brand-gold/15"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          {/* Spinning indicator */}
          <motion.div
            className="absolute inset-0 rounded-full border-[2px] border-transparent border-t-brand-gold/70 border-r-brand-gold/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
          {/* Center dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-gold/40"
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
  if (!isSignedIn) return <Navigate to="/sign-in" replace />;

  if (showIntro) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden px-6">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.3) 0%, transparent 70%)`
        }}
      />
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="line1"
            initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10"
          >
            <p className="font-serif text-3xl md:text-5xl lg:text-6xl text-brand-gold text-center tracking-wide italic leading-relaxed">
              We are glad you are here with us
            </p>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="line2"
            initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10"
          >
            <p className="font-serif text-2xl md:text-4xl lg:text-5xl text-white text-center tracking-wide italic leading-relaxed drop-shadow-lg">
              Asuogyaman is the best place to be…
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return <Outlet />;
}

export default function App() {
  const location = useLocation()    // Preload all hero background images in the background
    // so they are cached before the user navigates to those pages
    useEffect(() => {
      preloadAllHeroImages();
    }, []);

  return (
    <AppProvider>
      <ScrollToTop />
      <Routes location={location} key={location.pathname}>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/donation-history" element={<DonationHistory />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/attractions" element={<Attractions />} />
            <Route path="/dining" element={<Dining />} />
            <Route path="/stay" element={<Stay />} />
            <Route path="/schools" element={<Schools />} />
            <Route path="/events" element={<Events />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/business" element={<Business />} />
            <Route path="/experience" element={<Experience />} />
          </Route>
        </Route>
      </Routes>
    </AppProvider>
  );
}
