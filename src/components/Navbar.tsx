import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Eye, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEchoXp } from '@/hooks/use-echo-xp';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/uap', label: 'UAP Files' },
  { to: '/gods', label: 'Gods' },
  { to: '/species', label: 'Species' },
  { to: '/shadow-pantheon', label: 'Shadow' },
  { to: '/consciousness', label: 'Consciousness' },
  { to: '/signals', label: 'Signals' },
  { to: '/frequencies', label: 'Frequencies' },
  { to: '/whistleblowers', label: 'Whistleblowers' },
  { to: '/missing', label: 'Missing' },
  { to: '/telescopes', label: 'Telescopes' },
  { to: '/galaxy', label: 'Galaxy' },
  { to: '/pyramids', label: 'Pyramids' },
  { to: '/echoverse', label: 'Echoverse' },
  { to: '/earth-pulse', label: 'Earth Pulse' },
  { to: '/orb-report', label: 'Orb Report' },
  { to: '/the-46', label: 'The 46' },
  { to: '/origin', label: 'Origin Chamber' },
  { to: '/echo', label: 'Echo AI' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { userId, rank } = useEchoXp();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-cosmic shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl group">
            <Eye className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">PANTHEON</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-accent rounded-lg -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
            {userId && (
              <Link
                to="/profile"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border ml-1 transition-colors hover:bg-white/5"
                style={{ color: rank.color, borderColor: `${rank.color}55` }}
              >
                <Award className="w-3.5 h-3.5" />
                {rank.name}
              </Link>
            )}
          </div>

          <button className="lg:hidden text-foreground p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-cosmic border-t border-border"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'text-primary bg-accent'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {userId && (
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium border mt-2"
                  style={{ color: rank.color, borderColor: `${rank.color}55` }}
                >
                  <Award className="w-4 h-4" /> Profile · {rank.name}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
