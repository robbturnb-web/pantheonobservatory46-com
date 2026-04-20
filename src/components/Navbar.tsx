import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Eye, Award, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEchoXp } from '@/hooks/use-echo-xp';

interface NavLink { to: string; label: string; }
interface NavCategory { label: string; links: NavLink[]; }

const NAV_CATEGORIES: NavCategory[] = [
  {
    label: 'Cosmos',
    links: [
      { to: '/timeline', label: 'Timeline' },
      { to: '/telescopes', label: 'Telescopes' },
      { to: '/galaxy', label: 'Galaxy' },
      { to: '/pyramids', label: 'Pyramids' },
      { to: '/earth-pulse', label: 'Earth Pulse' },
    ],
  },
  {
    label: 'Disclosure',
    links: [
      { to: '/uap', label: 'UAP Files' },
      { to: '/whistleblowers', label: 'Whistleblowers' },
      { to: '/orb-report', label: 'Orb Report' },
      { to: '/the-46', label: 'The 46' },
    ],
  },
  {
    label: 'Lore',
    links: [
      { to: '/gods', label: 'Gods' },
      { to: '/shadow-pantheon', label: 'Shadow' },
      { to: '/species', label: 'Species' },
      { to: '/consciousness', label: 'Consciousness' },
      { to: '/signals', label: 'Signals' },
      { to: '/frequencies', label: 'Frequencies' },
      { to: '/elements', label: 'Elements Lab' },
      { to: '/glyphs', label: 'Glyphs' },
      { to: '/stone-faces', label: 'Stone Faces' },
    ],
  },
  {
    label: 'Community',
    links: [
      { to: '/echoverse', label: 'Echoverse' },
      { to: '/community', label: 'Vault' },
      { to: '/origin', label: 'Origin Chamber' },
      { to: '/echo', label: 'Echo AI' },
    ],
  },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const location = useLocation();
  const { userId, rank } = useEchoXp();
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setOpen(false); setActiveMenu(null); }, [location.pathname]);

  const openMenu = (label: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setActiveMenu(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setActiveMenu(null), 180);
  };

  const isCategoryActive = (cat: NavCategory) =>
    cat.links.some((l) => location.pathname === l.to);

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
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Home
            </Link>
            {NAV_CATEGORIES.map((cat) => (
              <div
                key={cat.label}
                className="relative"
                onMouseEnter={() => openMenu(cat.label)}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                    isCategoryActive(cat)
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat.label}
                  <ChevronDown className="w-3 h-3" />
                </button>
                <AnimatePresence>
                  {activeMenu === cat.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-1 min-w-[180px] glass-cosmic border border-border rounded-lg p-1 shadow-xl"
                    >
                      {cat.links.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                            location.pathname === link.to
                              ? 'text-primary bg-primary/10'
                              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                          }`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
            className="lg:hidden glass-cosmic border-t border-border max-h-[80vh] overflow-y-auto"
          >
            <div className="px-4 py-3 space-y-3">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  location.pathname === '/' ? 'text-primary bg-accent' : 'text-muted-foreground'
                }`}
              >
                Home
              </Link>
              {NAV_CATEGORIES.map((cat) => (
                <div key={cat.label}>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 px-3 mb-1">
                    {cat.label}
                  </div>
                  <div className="space-y-0.5">
                    {cat.links.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={`block px-3 py-2 rounded-lg text-sm ${
                          location.pathname === link.to
                            ? 'text-primary bg-accent'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
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
