import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'jwst-console', label: 'Console' },
  { id: 'jwst-physics', label: 'Physics' },
  { id: 'jwst-instruments', label: 'Instruments' },
  { id: 'jwst-orbit', label: 'L2 Orbit' },
  { id: 'jwst-why', label: 'Why Webb' },
  { id: 'jwst-mission', label: 'Mission' },
  { id: 'jwst-vault', label: 'Findings' },
  { id: 'jwst-timeline', label: 'Timeline' },
  { id: 'jwst-daily', label: 'Daily' },
  { id: 'jwst-live', label: 'Live' },
];

export function JwstSubNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string>('jwst-console');

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
      // active section detection
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < 120) current = s.id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <nav
      className="fixed top-16 left-1/2 -translate-x-1/2 z-40 px-2 py-1.5 rounded-full border backdrop-blur-xl flex gap-1 overflow-x-auto max-w-[96vw]"
      style={{
        background: 'rgba(15,8,40,0.85)',
        borderColor: 'rgba(167,139,250,0.35)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        fontFamily: "'Space Mono', monospace",
      }}
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.18em] font-bold whitespace-nowrap transition-colors"
            style={{
              color: isActive ? '#fde68a' : '#c4b5fd',
              background: isActive ? 'rgba(252,211,77,0.14)' : 'transparent',
            }}
          >
            {s.label}
          </button>
        );
      })}
    </nav>
  );
}
