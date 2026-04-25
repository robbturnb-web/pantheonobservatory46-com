import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './Navbar';
import { PantheonFooter } from './PantheonFooter';
import { BackgroundManager } from './BackgroundManager';
import { CosmicCursorTrail } from './CosmicCursorTrail';
import { CometTrails } from './cosmic/CometTrails';
import { SpaceshipFlyby } from './cosmic/SpaceshipFlyby';
import { XPBar } from './XPBar';
import { Walkthrough } from './Walkthrough';
import { ErrorBoundary } from './ErrorBoundary';
import { AudioPlayer } from './AudioPlayer';
import { useEchoXp } from '@/hooks/use-echo-xp';

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -12, scale: 0.99, filter: 'blur(4px)' },
};

const pageTransition = {
  type: 'tween' as const,
  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  duration: 0.4,
};

export function Layout() {
  const location = useLocation();
  const { trackPageVisit } = useEchoXp();

  useEffect(() => {
    trackPageVisit(location.pathname);
  }, [location.pathname, trackPageVisit]);

  return (
    <div className="min-h-screen relative cinematic-letterbox">
      <div className="cinematic-vignette" />
      <div className="ambient-flicker">
        <BackgroundManager />
      </div>
      <CosmicCursorTrail />
      <CometTrails />
      <SpaceshipFlyby />
      <Navbar />
      <XPBar />
      <AudioPlayer />
      <Walkthrough />
      <main className="pt-16 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ErrorBoundary key={location.pathname}>
              <Outlet />
            </ErrorBoundary>
          </motion.div>
        </AnimatePresence>
      </main>
      <PantheonFooter />
    </div>
  );
}
