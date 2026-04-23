import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Eye,
  Award,
  Satellite,
  Mountain,
  Users as UsersIcon,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEchoXp } from '@/hooks/use-echo-xp';

interface NavLink {
  to: string;
  label: string;
}

interface NavCategory {
  id: string;
  label: string;
  color: string;
  icon: typeof Eye;
  links: NavLink[];
}

const categories: NavCategory[] = [
  {
    id: 'cosmos',
    label: 'Cosmos & Disclosure',
    color: '#a855f7',
    icon: Satellite,
    links: [
      { to: '/uap', label: 'UAP Catalog' },
      { to: '/aaro', label: 'AARO Watch' },
      { to: '/crash-retrieval', label: 'Crash Retrieval' },
      { to: '/timeline', label: 'Disclosure Timeline' },
      { to: '/whistleblowers', label: 'Whistleblower Vault' },
      { to: '/missing', label: 'Missing Scientists' },
      { to: '/earth-pulse', label: 'Cosmos Pulse' },
      { to: '/orb-report', label: 'Orb Report' },
      { to: '/telescopes', label: 'Telescopes' },
      { to: '/galaxy', label: 'Galaxy Explorer' },
      { to: '/signals', label: 'Signals' },
    ],
  },
  {
    id: 'ancient',
    label: 'Ancient Mysteries',
    color: '#fbbf24',
    icon: Mountain,
    links: [
      { to: '/atlantis', label: 'Atlantis' },
      { to: '/pyramids', label: 'Pyramid Interior' },
      { to: '/glyphs', label: 'Glyphs Codex' },
      { to: '/stone-faces', label: 'Stone Faces' },
      { to: '/gods', label: 'Pantheon of Gods' },
      { to: '/antarctica', label: 'Antarctica Files' },
    ],
  },
  {
    id: 'entity',
    label: 'Entity Encounters',
    color: '#ef4444',
    icon: UsersIcon,
    links: [
      { to: '/species', label: 'Alien Species' },
      { to: '/encounters', label: 'Entity Encounters' },
      { to: '/extinct', label: 'Extinct Species' },
      { to: '/underground', label: 'Underground Bases' },
      { to: '/shadow-pantheon', label: 'Shadow Pantheon' },
    ],
  },
  {
    id: 'forge',
    label: 'Federation & Forge',
    color: '#22d3ee',
    icon: Sparkles,
    links: [
      { to: '/federation', label: 'Galactic Federation' },
      { to: '/builders', label: "Builder's Arena" },
      { to: '/frequencies', label: 'Frequencies' },
      { to: '/cern', label: 'CERN Watch' },
      { to: '/consciousness', label: 'Consciousness' },
      { to: '/origin', label: 'Origin Chamber' },
      { to: '/echo', label: 'Echo AI' },
      { to: '/echoverse', label: 'Echoverse' },
      { to: '/the-46', label: 'The 46' },
      { to: '/profile', label: 'Observer Profile' },
    ],
  },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();
  const { userId, rank } = useEchoXp();
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
    setHovered(null);
    setMobileExpanded(null);
  }, [location.pathname]);

  function handleEnter(id: string) {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setHovered(id);
  }
  function handleLeave() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setHovered(null), 120);
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || hovered ? 'glass-cosmic shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl group shrink-0">
            <Eye className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">PANTHEON</span>
          </Link>

          {/* Desktop categorized menu */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Home
            </Link>
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="relative"
                onMouseEnter={() => handleEnter(cat.id)}
                onMouseLeave={handleLeave}
              >
                <button
                  type="button"
                  className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  style={hovered === cat.id ? { color: cat.color } : undefined}
                >
                  <cat.icon className="w-3.5 h-3.5" />
                  {cat.label}
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>
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

          <button
            className="lg:hidden text-foreground p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop mega-menu panel */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={() => handleEnter(hovered)}
            onMouseLeave={handleLeave}
            className="hidden lg:block absolute left-0 right-0 top-full glass-cosmic border-t border-border shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-6 py-6">
              {categories
                .filter((c) => c.id === hovered)
                .map((cat) => (
                  <div key={cat.id}>
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
                      <cat.icon className="w-4 h-4" style={{ color: cat.color }} />
                      <h3
                        className="text-xs font-bold uppercase tracking-[0.25em]"
                        style={{ color: cat.color }}
                      >
                        {cat.label}
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5">
                      {cat.links.map((link) => {
                        const active = location.pathname === link.to;
                        return (
                          <Link
                            key={link.to}
                            to={link.to}
                            className="px-3 py-2 rounded-md text-sm transition-all hover:bg-white/5"
                            style={{
                              color: active ? cat.color : 'var(--foreground)',
                              borderLeft: active ? `2px solid ${cat.color}` : '2px solid transparent',
                            }}
                          >
                            {link.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile accordion */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-cosmic border-t border-border max-h-[80vh] overflow-y-auto"
          >
            <div className="px-4 py-3 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === '/'
                    ? 'text-primary bg-accent'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                Home
              </Link>
              {categories.map((cat) => {
                const expanded = mobileExpanded === cat.id;
                return (
                  <div key={cat.id}>
                    <button
                      onClick={() => setMobileExpanded(expanded ? null : cat.id)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider"
                      style={{ color: cat.color }}
                    >
                      <span className="inline-flex items-center gap-2">
                        <cat.icon className="w-4 h-4" />
                        {cat.label}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {expanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden pl-4"
                        >
                          {cat.links.map((link) => (
                            <Link
                              key={link.to}
                              to={link.to}
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                location.pathname === link.to
                                  ? 'text-primary bg-accent'
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
                );
              })}
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
