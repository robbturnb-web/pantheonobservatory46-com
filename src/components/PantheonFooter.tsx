import { Link } from 'react-router-dom';
import sigil46 from '@/assets/temple/sigil-46.png';

const navGroups = [
  {
    title: 'Research',
    links: [
      { to: '/disclosure', label: 'Research & Disclosure Center' },
      { to: '/uap', label: 'UAP Case Files' },
      { to: '/plasma', label: 'Plasma & Atmospheric Phenomena' },
      { to: '/encounters', label: 'Entity Reports' },
      { to: '/timeline', label: 'Timeline' },
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
    <footer className="relative z-10 border-t border-inst-line bg-inst-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inst-focus flex items-center gap-3 mb-4 rounded-sm" aria-label="Pantheon Observatory 46 home">
              <img src={sigil46} alt="" aria-hidden="true" className="h-10 w-10 object-contain" />
              <span className="leading-none">
                <span className="block text-sm font-semibold uppercase tracking-[0.3em] text-inst-bone" style={{ fontFamily: '"Cinzel", serif' }}>Pantheon</span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.38em] text-inst-gold">Observatory 46</span>
              </span>
            </Link>
            <p className="text-sm text-inst-muted leading-relaxed">
              An independent research and public-source archive. No question off limits. No claim true by default.
              Follow the evidence.
            </p>
          </div>

          {/* Nav groups */}
          {navGroups.map((group) => (
            <div key={group.title}>
              <h3 className="inst-eyebrow mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="inst-focus rounded-sm text-sm text-inst-muted hover:text-inst-bone transition-colors"
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
        <div className="mt-10 inst-panel p-4">
          <p className="inst-eyebrow mb-2">Disclaimer</p>
          <p className="text-xs text-inst-muted leading-relaxed">
            Pantheon is an educational and exploratory archive. Some topics include mythology, speculation,
            and unresolved mysteries. Every entry is labeled by source reliability and claim status.
            Not affiliated with any government, military, or intelligence agency.
          </p>
        </div>

        <div className="border-t border-inst-line mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-inst-muted">
            © {new Date().getFullYear()} Pantheon Observatory 46 · CC0 Public Domain
          </p>
          <p className="text-xs text-inst-muted italic">
            "The truth is not a destination — it is a practice."
          </p>
        </div>
      </div>
    </footer>
  );
}
