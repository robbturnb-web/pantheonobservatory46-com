import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './Navbar';
import { PantheonFooter } from './PantheonFooter';
import { StarfieldCanvas } from './StarfieldCanvas';
import { CosmicCursorTrail } from './CosmicCursorTrail';

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -12, filter: 'blur(4px)' },
};

const pageTransition = {
  type: 'tween',
  ease: [0.25, 0.46, 0.45, 0.94],
  duration: 0.4,
};

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen relative">
      <StarfieldCanvas />
      <CosmicCursorTrail />
      <Navbar />
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
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <PantheonFooter />
    </div>
  );
}
