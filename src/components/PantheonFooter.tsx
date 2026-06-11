import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { PantheonWordmark } from './Wordmark';

const navGroups = [
  {
    title: 'Explore',
    links: [
      { to: '/timeline', label: 'Cosmic Timeline' },
      { to: '/uap', label: 'UAP Case Files' },
      { to: '/gods', label: 'Gods & Archetypes' },
      { to: '/live-feeds', label: 'Live Feeds' },
      { to: '/missions', label: 'Missions' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { to: '/consciousness', label: 'Consciousness Lab' },
      { to: '/signals', label: 'Signal Watch' },
      { to: '/origin', label: 'Origin Chamber' },
      { to: '/echo', label: 'Echo AI' },
      { to: '/sources', label: 'Facts vs Speculation' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { to: '/about', label: 'About' },
      { to: '/contact', label: 'Contact' },
      { to: '/privacy', label: 'Privacy' },
      { to: '/terms', label: 'Terms' },
      { to: '/disclaimer', label: 'Disclaimer' },
    ],
  },
];

export function PantheonFooter() {
  return (
    <footer className="border-t border-border mt-20 bg-background/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 text-primary">
              <Eye className="w-6 h-6" />
              <PantheonWordmark size="md" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pantheon Observatory 46 — a living archive of mythology, cosmic mysteries, disclosure,
              ancient civilizations, and human awakening.
            </p>
            <a
              href="https://pantheonobservatory.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-xs uppercase tracking-[2.5px] text-primary hover:text-primary/80 transition-colors"
            >
              pantheonobservatory.com →
            </a>
          </div>

          {/* Nav groups */}
          {navGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-foreground mb-3">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer block */}
        <div className="mt-10 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
          <p className="text-[10px] uppercase tracking-[3px] text-amber-300 font-bold mb-2">Disclaimer</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Pantheon is an educational and exploratory archive. Some topics include mythology, speculation,
            and unresolved mysteries. Verified information and speculative content should remain clearly labeled.
            Not affiliated with any government, military, or intelligence agency.
          </p>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Pantheon Observatory 46 · CC0 Public Domain
          </p>
          <p className="text-xs text-muted-foreground italic">
            "The truth is not a destination — it is a practice."
          </p>
        </div>
      </div>
    </footer>
  );
}
