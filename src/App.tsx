import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useAuth } from '@clerk/react';
import { AppProvider } from './context/AppContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

const Attractions = lazy(() => import('./pages/Attractions'));
const Dining = lazy(() => import('./pages/Dining'));
const Stay = lazy(() => import('./pages/Stay'));
const Schools = lazy(() => import('./pages/Schools'));
const Events = lazy(() => import('./pages/Events'));
const MapPage = lazy(() => import('./pages/MapPage'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Business = lazy(() => import('./pages/Business'));
const Experience = lazy(() => import('./pages/Experience'));
const ItemPage = lazy(() => import('./pages/ItemPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const ScrollToTopButton = lazy(() => import('./components/ui/scroll-to-top'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Donate = lazy(() => import('./pages/Donate'));
const Admin = lazy(() => import('./pages/Admin'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const easeOut = [0.25, 0.1, 0.25, 1] as const;

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

function PageSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
        <p className="text-xs text-muted animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

function ProtectedRoute() {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
          <p className="text-xs text-muted animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }
  if (!isSignedIn) return <Navigate to="/sign-in" replace />;
  return <Outlet />;
}

function PublicOnlyRoute() {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return null;
  if (isSignedIn) return <Navigate to="/" replace />;
  return <Outlet />;
}

export default function App() {
  const location = useLocation();

  return (
    <AppProvider>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public-only routes (redirect to / if signed in) */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/sign-in" element={
              <Suspense fallback={<PageSkeleton />}><PageTransition><AuthPage /></PageTransition></Suspense>
            } />
            <Route path="/sign-up" element={
              <Suspense fallback={<PageSkeleton />}><PageTransition><AuthPage /></PageTransition></Suspense>
            } />
          </Route>

          {/* Strict: all main routes require auth */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/attractions" element={
                <Suspense fallback={<PageSkeleton />}><PageTransition><Attractions /></PageTransition></Suspense>
              } />
              <Route path="/dining" element={
                <Suspense fallback={<PageSkeleton />}><PageTransition><Dining /></PageTransition></Suspense>
              } />
              <Route path="/stay" element={
                <Suspense fallback={<PageSkeleton />}><PageTransition><Stay /></PageTransition></Suspense>
              } />
              <Route path="/schools" element={
                <Suspense fallback={<PageSkeleton />}><PageTransition><Schools /></PageTransition></Suspense>
              } />
              <Route path="/events" element={
                <Suspense fallback={<PageSkeleton />}><PageTransition><Events /></PageTransition></Suspense>
              } />
              <Route path="/map" element={
                <Suspense fallback={<PageSkeleton />}><PageTransition><MapPage /></PageTransition></Suspense>
              } />
              <Route path="/gallery" element={
                <Suspense fallback={<PageSkeleton />}><PageTransition><Gallery /></PageTransition></Suspense>
              } />
              <Route path="/business" element={
                <Suspense fallback={<PageSkeleton />}><PageTransition><Business /></PageTransition></Suspense>
              } />
              <Route path="/experience" element={
                <Suspense fallback={<PageSkeleton />}><PageTransition><Experience /></PageTransition></Suspense>
              } />
              <Route path="/:type/:id" element={
                <Suspense fallback={<PageSkeleton />}><ItemPage /></Suspense>
              } />
            </Route>
            <Route path="/admin" element={
              <Suspense fallback={<PageSkeleton />}><PageTransition><Admin /></PageTransition></Suspense>
            } />
          </Route>

          {/* Public utility pages */}
          <Route path="/donate" element={
            <Suspense fallback={<PageSkeleton />}><PageTransition><Donate /></PageTransition></Suspense>
          } />
          <Route path="/terms" element={
            <Suspense fallback={<PageSkeleton />}><PageTransition><Terms /></PageTransition></Suspense>
          } />
          <Route path="/privacy" element={
            <Suspense fallback={<PageSkeleton />}><PageTransition><Privacy /></PageTransition></Suspense>
          } />
        </Routes>
      </AnimatePresence>
      <Suspense fallback={null}><ScrollToTopButton /></Suspense>
    </AppProvider>
  );
}
