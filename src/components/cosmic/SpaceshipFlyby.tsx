import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useEchoXp } from '@/hooks/use-echo-xp';

/**
 * Periodically flies a small SVG saucer across the starfield.
 * Click for a 25 XP easter egg (one grant per session per sighting).
 */
export function SpaceshipFlyby() {
  const [ship, setShip] = useState<null | { id: number; fromLeft: boolean; topPct: number; tilt: number }>(null);
  const counter = useRef(0);
  const grantedRef = useRef(false);
  const { addXp, userId } = useEchoXp();

  useEffect(() => {
    const launch = () => {
      counter.current++;
      grantedRef.current = false;
      setShip({
        id: counter.current,
        fromLeft: Math.random() > 0.5,
        topPct: 12 + Math.random() * 60,
        tilt: -6 + Math.random() * 12,
      });
    };

    // First flyby after 30s, then every 90-180s
    const initialT = setTimeout(launch, 30000);
    const interval = setInterval(launch, 90000 + Math.random() * 90000);

    return () => {
      clearTimeout(initialT);
      clearInterval(interval);
    };
  }, []);

  const handleClick = async () => {
    if (grantedRef.current) return;
    grantedRef.current = true;
    toast('👽 You spotted a Lazar-class craft', {
      description: userId ? 'Sport-Model sighting — +25 XP' : 'Sign in to bank XP from sightings',
    });
    if (userId) {
      await addXp(25, 'Saucer sighting');
    }
  };

  return (
    <AnimatePresence>
      {ship && (
        <motion.div
          key={ship.id}
          initial={{ x: ship.fromLeft ? -120 : window.innerWidth + 120 }}
          animate={{ x: ship.fromLeft ? window.innerWidth + 120 : -120 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 14, ease: 'linear' }}
          onAnimationComplete={() => setShip(null)}
          style={{
            position: 'fixed',
            top: `${ship.topPct}%`,
            left: 0,
            transform: `rotate(${ship.tilt}deg)`,
            zIndex: 5,
            pointerEvents: 'none',
          }}
          aria-hidden
        >
          <button
            onClick={handleClick}
            className="relative pointer-events-auto cursor-pointer group"
            aria-label="Unidentified craft"
          >
            <div className="absolute inset-0 -z-10 blur-xl bg-accent-neon/30 rounded-full" />
            <svg width="56" height="22" viewBox="0 0 56 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="28" cy="12" rx="22" ry="3.5" fill="url(#hull)" />
              <ellipse cx="28" cy="9" rx="9" ry="5" fill="url(#dome)" />
              <circle cx="10" cy="13" r="1" fill="#39ff14" className="animate-pulse" />
              <circle cx="46" cy="13" r="1" fill="#39ff14" className="animate-pulse" />
              <circle cx="28" cy="14.5" r="0.8" fill="#fff" />
              <defs>
                <linearGradient id="hull" x1="0" y1="12" x2="56" y2="12">
                  <stop offset="0" stopColor="#1a1a2e" />
                  <stop offset="0.5" stopColor="#9ca3af" />
                  <stop offset="1" stopColor="#1a1a2e" />
                </linearGradient>
                <radialGradient id="dome" cx="0.5" cy="0.5">
                  <stop offset="0" stopColor="#a5f3fc" />
                  <stop offset="1" stopColor="#0e7490" />
                </radialGradient>
              </defs>
            </svg>
            {/* Engine trail */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 ${ship.fromLeft ? 'right-full' : 'left-full'} w-12 h-[2px] bg-gradient-to-${ship.fromLeft ? 'l' : 'r'} from-accent-neon/80 to-transparent`}
            />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
