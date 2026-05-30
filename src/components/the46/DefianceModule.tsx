import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertOctagon, Radio, Moon, Sun } from 'lucide-react';
import { daysOverdue, VAULT_LORE } from '@/data/the-46';

/**
 * PANTHEON FREQUENCY 46 — Defiance Module
 * Post-deadline status banner + Shadow-Pantheon toggle.
 * Toggling adds `shadow-pantheon` to <html>; index.css overrides
 * a small set of accent vars when that class is present.
 */
export function DefianceModule() {
  const overdue = daysOverdue();
  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (shadow) root.classList.add('shadow-pantheon');
    else root.classList.remove('shadow-pantheon');
    return () => root.classList.remove('shadow-pantheon');
  }, [shadow]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative mb-8 rounded-2xl border border-hub-disclosure/50 bg-background/80 backdrop-blur-xl overflow-hidden shadow-[0_0_60px_-20px_var(--hub-disclosure)]"
    >
      {/* Scanline shimmer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent 0 3px, rgba(255,255,255,0.6) 3px 4px)',
        }}
      />
      <div className="relative p-5 sm:p-7">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-2 text-hub-disclosure">
            <AlertOctagon className="w-4 h-4 animate-pulse" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[4px] font-bold">
              Status · Pentagon Defiance
            </span>
          </div>
          <div className="text-[10px] uppercase tracking-[3px] text-muted-foreground font-mono">
            May 30, 2026 ·{' '}
            <span className="text-hub-disclosure font-bold">{overdue} Days Past Deadline</span>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-3 text-foreground">
          The Silent Spring of 2026
        </h2>

        <div className="font-mono text-[12px] sm:text-[13px] leading-relaxed text-foreground/80 border-l-2 border-hub-disclosure/60 pl-3 mb-5">
          <span className="text-hub-disclosure">[ECHO DIAGNOSTIC]</span> The April 14, 2026
          metadata mandate has been ignored. The 46 classified UAP files (Luna Letter) remain in
          the shadow. Frequencies are transitioning from{' '}
          <span className="text-hub-warning">Observation</span> →{' '}
          <span className="text-hub-disclosure">Interception</span>.
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-5">
          {[
            {
              tag: 'DOCUMENTED',
              cls: 'text-accent-neon border-accent-neon/40',
              body: "Luna's office has flagged inter-agency friction — Pentagon vs. IC — suggesting a shadow government within the shadow government.",
            },
            {
              tag: 'CREDIBLE',
              cls: 'text-hub-signal border-hub-signal/40',
              body: 'Several of the 46 files involve transmedium transitions that may invalidate current US Navy sensor patents.',
            },
            {
              tag: 'SPECULATIVE',
              cls: 'text-hub-disclosure border-hub-disclosure/40',
              body: 'Footage may show craft interacting with human nuclear assets during the 2025 tensions.',
            },
          ].map((row) => (
            <div key={row.tag} className={`rounded-lg border bg-background/40 p-3 ${row.cls}`}>
              <div className="text-[10px] uppercase tracking-[3px] font-bold mb-1.5">{row.tag}</div>
              <p className="text-[12px] leading-snug text-foreground/80">{row.body}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <a
            href={VAULT_LORE.letterUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[3px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <Radio className="w-3.5 h-3.5" />
            Luna Letter · Primary Source
          </a>
          <button
            onClick={() => setShadow((s) => !s)}
            className={`group inline-flex items-center gap-2 px-4 py-2 rounded-md text-[11px] uppercase tracking-[3px] font-bold border transition-all ${
              shadow
                ? 'border-accent-neon/60 bg-accent-neon/10 text-accent-neon shadow-[0_0_22px_-4px_var(--accent-neon)]'
                : 'border-hub-disclosure/60 bg-hub-disclosure/10 text-hub-disclosure hover:bg-hub-disclosure/20'
            }`}
            aria-pressed={shadow}
          >
            {shadow ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            {shadow ? 'Disengage Shadow Pantheon' : 'Sync to Shadow Pantheon'}
          </button>
        </div>
      </div>
    </motion.section>
  );
}
