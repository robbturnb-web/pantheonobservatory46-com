import { motion } from 'framer-motion';
import { useHomeTheme } from '@/contexts/HomeThemeContext';

/**
 * Full-bleed live backdrop driven by the active HomeTheme domain.
 * Crossfades the gradient + corner glow when the user's attention shifts.
 * Sits behind layout content (z-0). Layouts add their own ornaments on top.
 */
export function LiveBackdrop({ children }: { children?: React.ReactNode }) {
  const { palette, domain } = useHomeTheme();

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        key={domain}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="absolute inset-0"
        style={{ background: palette.background }}
      />
      {/* Corner bleed glows — repaint when palette changes */}
      <motion.div
        key={`glow-${domain}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 0% 0%, ${palette.glow}, transparent 45%), radial-gradient(circle at 100% 100%, ${palette.glow}, transparent 45%)`,
        }}
      />
      {children}
    </div>
  );
}
