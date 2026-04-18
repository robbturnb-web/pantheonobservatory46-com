import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Countdown() {
  const targetDate = new Date('2027-04-01T00:00:00Z').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-cosmic rounded-2xl p-6 text-center border border-accent-neon/30"
    >
      <div className="text-xs uppercase tracking-[2px] text-accent-neon mb-2">
        NEXT FREQUENCY SHIFT
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-4">
        April 2027 • The Great Change
      </h3>

      <div className="grid grid-cols-4 gap-3 text-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="bg-black/30 rounded-xl p-3">
            <div className="text-3xl font-mono text-accent-neon">{value}</div>
            <div className="text-xs text-muted-foreground capitalize">{unit}</div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        The frequency reset Chris Bledsoe and others have referenced is coming.
      </p>
    </motion.div>
  );
}
