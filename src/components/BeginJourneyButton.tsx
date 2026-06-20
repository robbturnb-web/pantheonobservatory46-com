/**
 * BeginJourneyButton — top-right CTA that recommends a path by interest.
 * Lightweight modal, no extra deps.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, X } from 'lucide-react';

const PATHS = [
  { label: 'Mythology', route: '/gods', color: '#D6B35A', blurb: 'World pantheons, archetypes, and the symbolic mind.' },
  { label: 'Disclosure', route: '/uap', color: '#10b981', blurb: 'UAP cases, hearings, whistleblowers, and AARO files.' },
  { label: 'Space', route: '/observatory', color: '#22D3EE', blurb: 'Live solar weather, ISS tracking, JWST findings.' },
  { label: 'Ancient Civilizations', route: '/ancient-tech', color: '#D6B35A', blurb: 'Lost technology, pyramids, and pre-history.' },
  { label: 'Earth Mysteries', route: '/lost-places', color: '#7C3AED', blurb: 'Atlantis, submerged ruins, and unmapped places.' },
  { label: 'Human Potential', route: '/human-potential', color: '#E5F8FF', blurb: 'Meditation, focus, sleep, flow — practical practice.' },
];

export function BeginJourneyButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-realm-observatory/60 bg-realm-observatory/15 text-realm-observatory hover:bg-realm-observatory/25 transition text-xs uppercase tracking-[2px] font-mono ${className ?? ''}`}
      >
        <Compass className="w-3.5 h-3.5" /> Begin Journey
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/75 backdrop-blur"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl border border-primary/40 bg-card p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 p-1.5 rounded-md text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-display text-2xl text-foreground mb-1">Begin your journey</h3>
            <p className="text-xs text-muted-foreground mb-5">
              Choose what calls to you. We'll start you in the right corner of the observatory.
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {PATHS.map((p) => (
                <Link
                  key={p.route}
                  to={p.route}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-lg border bg-card/50 hover:bg-card transition"
                  style={{ borderColor: `${p.color}55` }}
                >
                  <div className="text-sm font-display" style={{ color: p.color }}>{p.label}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{p.blurb}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BeginJourneyButton;
