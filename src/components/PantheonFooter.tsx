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
    <footer className="border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="grid grid-cols-4 md:grid-cols-1 gap-6">
              <Eye className="w-6 h-6" />
              <PantheonWordmark size="md" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              A knowledge platform exploring UAPs, ancient mysteries, consciousness research,
              and the cosmic questions humanity has asked since the beginning.
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              Not affiliated with any government, military, or intelligence agency.
            </p>
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

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Pantheon Observatory · CC0 Public Domain
          </p>
          <p className="text-xs text-muted-foreground italic">
            "The truth is not a destination — it is a practice."
          </p>
        </div>
      </div>
    </footer>
  );
}
