import { useState, useCallback, ReactNode } from 'react';
import { Check, Copy } from 'lucide-react';
import { SEO } from '@/components/SEO';

/* ─────────────────────────────────────────────────────────────
 * Pantheon Living Style Guide
 * Click any swatch / chip / class name to copy it to clipboard.
 * Pulls directly from tailwind.config.ts + index.css tokens.
 * ───────────────────────────────────────────────────────────── */

type CopyableProps = {
  value: string;
  children: ReactNode;
  className?: string;
  title?: string;
};

function Copyable({ value, children, className = '', title }: CopyableProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* ignore clipboard errors */
    }
  }, [value]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={title ?? `Copy "${value}"`}
      className={`group/copy relative text-left transition-all ${className}`}
    >
      {children}
      <span
        className={`pointer-events-none absolute right-2 top-2 inline-flex items-center gap-1 rounded bg-black/70 px-2 py-1 text-[10px] font-mono uppercase tracking-wider backdrop-blur-sm transition-opacity ${
          copied
            ? 'opacity-100 text-sacred-light'
            : 'opacity-0 group-hover/copy:opacity-100 text-clarity-silver'
        }`}
      >
        {copied ? (
          <>
            <Check className="h-3 w-3" /> copied
          </>
        ) : (
          <>
            <Copy className="h-3 w-3" /> copy
          </>
        )}
      </span>
    </button>
  );
}

type Swatch = {
  name: string;
  cls: string; // e.g. bg-sacred
  hex?: string;
  cssVar?: string;
};

function ColorGrid({ title, swatches }: { title: string; swatches: Swatch[] }) {
  return (
    <section className="mb-12">
      <h3 className="text-xl font-semibold text-mystic-light mb-4 uppercase tracking-widest">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {swatches.map((s) => (
          <Copyable
            key={s.cls}
            value={s.cls}
            className="rounded-lg overflow-hidden border border-mystic/30 hover:border-sacred-light hover:shadow-neon-purple"
          >
            <div className={`${s.cls} h-20 w-full`} />
            <div className="bg-space-blue/60 backdrop-blur-sm p-3">
              <div className="text-xs font-mono text-sacred-light truncate">{s.cls}</div>
              <div className="text-[10px] text-clarity-gray mt-1 truncate">
                {s.hex ?? s.cssVar ?? s.name}
              </div>
            </div>
          </Copyable>
        ))}
      </div>
    </section>
  );
}

function ClassChip({ value }: { value: string }) {
  return (
    <Copyable
      value={value}
      className="inline-block rounded-md border border-mystic/40 bg-space-blue/60 px-3 py-1.5 font-mono text-xs text-sacred-light hover:border-sacred-light hover:bg-space-blue/80"
    >
      {value}
    </Copyable>
  );
}

function ExampleCard({
  label,
  classes,
  children,
}: {
  label: string;
  classes: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-mystic/30 bg-space-navy/60 overflow-hidden">
      <div className="p-6 flex items-center justify-center min-h-[140px] bg-cosmic-gradient">
        {children}
      </div>
      <div className="border-t border-mystic/20 bg-space-black/60 p-3 flex items-center justify-between gap-2">
        <span className="text-xs uppercase tracking-wider text-clarity-gray">{label}</span>
        <Copyable
          value={classes}
          className="rounded bg-space-blue/80 px-2 py-1 font-mono text-[11px] text-sacred-light hover:text-sacred-light max-w-[70%] truncate"
        >
          <span className="truncate inline-block max-w-full">{classes}</span>
        </Copyable>
      </div>
    </div>
  );
}

/* ────────── token tables ────────── */

const sacred: Swatch[] = [
  { name: 'sacred', cls: 'bg-sacred', hex: '#00cc66' },
  { name: 'sacred-light', cls: 'bg-sacred-light', hex: '#00ff88' },
  { name: 'sacred-glow', cls: 'bg-sacred-glow', hex: '#4ade80' },
  { name: 'sacred-dark', cls: 'bg-sacred-dark', hex: '#009955' },
];

const mystic: Swatch[] = [
  { name: 'mystic', cls: 'bg-mystic', hex: '#9d4edd' },
  { name: 'mystic-light', cls: 'bg-mystic-light', hex: '#c77dff' },
  { name: 'mystic-deep', cls: 'bg-mystic-deep', hex: '#7209b7' },
];

const cosmic: Swatch[] = [
  { name: 'cosmic', cls: 'bg-cosmic', hex: '#4a7ba7' },
  { name: 'cosmic-bright', cls: 'bg-cosmic-bright', hex: '#00d9ff' },
  { name: 'cosmic-deep', cls: 'bg-cosmic-deep', hex: '#1a1f3a' },
  { name: 'cosmic-dark', cls: 'bg-cosmic-dark', hex: '#2a4a6f' },
];

const space: Swatch[] = [
  { name: 'space-black', cls: 'bg-space-black', hex: '#000000' },
  { name: 'space-navy', cls: 'bg-space-navy', hex: '#0a0e1a' },
  { name: 'space-blue', cls: 'bg-space-blue', hex: '#1a1f3a' },
];

const clarity: Swatch[] = [
  { name: 'clarity', cls: 'bg-clarity', hex: '#ffffff' },
  { name: 'clarity-silver', cls: 'bg-clarity-silver', hex: '#e5e7eb' },
  { name: 'clarity-gray', cls: 'bg-clarity-gray', hex: '#9ca3af' },
];

const alertGold: Swatch[] = [
  { name: 'alert', cls: 'bg-alert', hex: '#ff3366' },
  { name: 'alert-deep', cls: 'bg-alert-deep', hex: '#cc0033' },
  { name: 'gold', cls: 'bg-gold', hex: '#fbbf24' },
  { name: 'gold-glow', cls: 'bg-gold-glow', hex: '#fde68a' },
];

const hub: Swatch[] = [
  { name: 'hub-disclosure', cls: 'bg-hub-disclosure', hex: '#dc2626' },
  { name: 'hub-ancient', cls: 'bg-hub-ancient', hex: '#d4a574' },
  { name: 'hub-cosmic', cls: 'bg-hub-cosmic', hex: '#8b5cf6' },
  { name: 'hub-life', cls: 'bg-hub-life', hex: '#10b981' },
  { name: 'hub-signal', cls: 'bg-hub-signal', hex: '#22d3ee' },
  { name: 'hub-warning', cls: 'bg-hub-warning', hex: '#f59e0b' },
];

const gradients: Swatch[] = [
  { name: 'cosmic-gradient', cls: 'bg-cosmic-gradient' },
  { name: 'purple-green', cls: 'bg-purple-green' },
  { name: 'purple-blue', cls: 'bg-purple-blue' },
  { name: 'green-cyan', cls: 'bg-green-cyan' },
  { name: 'full-spectrum', cls: 'bg-full-spectrum' },
];

const shadows = [
  'shadow-neon-green',
  'shadow-neon-purple',
  'shadow-neon-blue',
  'shadow-cosmic-glow',
];

const utilityClasses = [
  'glass-cosmic',
  'glass-neon',
  'gradient-cta',
  'gradient-highlight',
  'neon-glow',
  'cosmic-pulse',
  'cosmic-float',
  'cosmic-glow-pulse',
  'ambient-flicker',
  'holo-text',
  'holo-divider',
  'text-highlight',
];

export function StyleGuidePage() {
  return (
    <div className="min-h-screen bg-cosmic-gradient text-clarity">
      <SEO
        title="Pantheon Style Guide — Living Token Reference"
        description="Living style-guide for Pantheon Observatory: cosmic color palette, gradients, shadows, glassmorphism, and animation utilities. Click any token to copy."
      />

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* ────────── Header ────────── */}
        <header className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-mystic-light mb-3">
            Pantheon Observatory · Living Reference
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="holo-text">Style Guide</span>
          </h1>
          <p className="max-w-2xl mx-auto text-clarity-silver">
            Every token, gradient, shadow, and utility — rendered live. Click any swatch or class name
            to copy it to your clipboard.
          </p>
          <div className="holo-divider mt-8 max-w-md mx-auto" />
        </header>

        {/* ────────── Colors ────────── */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-sacred-light mb-2">Colors</h2>
          <p className="text-clarity-gray mb-10">Semantic palette grouped by cosmic role.</p>

          <ColorGrid title="Sacred · Life Force" swatches={sacred} />
          <ColorGrid title="Mystic · Consciousness" swatches={mystic} />
          <ColorGrid title="Cosmic · Truth" swatches={cosmic} />
          <ColorGrid title="Space · Void" swatches={space} />
          <ColorGrid title="Clarity · Light" swatches={clarity} />
          <ColorGrid title="Alert & Gold" swatches={alertGold} />
          <ColorGrid title="Hub Accents" swatches={hub} />
        </section>

        {/* ────────── Gradients ────────── */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-sacred-light mb-2">Gradients</h2>
          <p className="text-clarity-gray mb-10">Backgrounds used for hero panels & CTAs.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gradients.map((g) => (
              <Copyable
                key={g.cls}
                value={g.cls}
                className="rounded-lg overflow-hidden border border-mystic/30 hover:border-sacred-light"
              >
                <div className={`${g.cls} h-32 w-full`} />
                <div className="bg-space-blue/60 backdrop-blur-sm p-3">
                  <div className="text-xs font-mono text-sacred-light">{g.cls}</div>
                </div>
              </Copyable>
            ))}
          </div>
        </section>

        {/* ────────── Shadows / Glows ────────── */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-sacred-light mb-2">Shadows & Glows</h2>
          <p className="text-clarity-gray mb-10">Neon halo system for cards and CTAs.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {shadows.map((s) => (
              <Copyable
                key={s}
                value={s}
                className="rounded-lg p-6 bg-space-blue/60 border border-mystic/30 hover:border-sacred-light"
              >
                <div className={`${s} h-16 w-full rounded-md bg-space-navy mb-4`} />
                <div className="text-xs font-mono text-sacred-light text-center">{s}</div>
              </Copyable>
            ))}
          </div>
        </section>

        {/* ────────── Typography ────────── */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-sacred-light mb-2">Typography</h2>
          <p className="text-clarity-gray mb-10">Space Grotesk hierarchy with neon accents.</p>
          <div className="space-y-6 rounded-lg border border-mystic/30 bg-space-navy/60 p-8">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <h1 className="text-5xl font-bold">H1 · Cosmic Title</h1>
              <ClassChip value="text-5xl font-bold" />
            </div>
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <h2 className="text-3xl font-bold">H2 · Section Header</h2>
              <ClassChip value="text-3xl font-bold" />
            </div>
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <h3 className="text-xl font-semibold text-mystic-light">H3 · Subheader</h3>
              <ClassChip value="text-xl font-semibold text-mystic-light" />
            </div>
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <p className="text-base text-clarity">Body text — the truth lives in the signal.</p>
              <ClassChip value="text-base text-clarity" />
            </div>
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <p className="text-sm text-clarity-gray">Muted caption text</p>
              <ClassChip value="text-sm text-clarity-gray" />
            </div>
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <p className="holo-text text-2xl font-bold">Holographic Title</p>
              <ClassChip value="holo-text" />
            </div>
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <p className="text-xl text-sacred-light neon-glow">Neon Glow Heading</p>
              <ClassChip value="text-sacred-light neon-glow" />
            </div>
          </div>
        </section>

        {/* ────────── Buttons ────────── */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-sacred-light mb-2">Buttons</h2>
          <p className="text-clarity-gray mb-10">Reference variants composed from the token system.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ExampleCard
              label="Primary CTA"
              classes="px-6 py-3 gradient-cta rounded-md font-semibold"
            >
              <button className="px-6 py-3 gradient-cta rounded-md font-semibold">
                Open the Vault
              </button>
            </ExampleCard>

            <ExampleCard
              label="Sacred Outline"
              classes="px-6 py-3 border-2 border-sacred-light text-sacred-light rounded-md hover:bg-sacred-light/10"
            >
              <button className="px-6 py-3 border-2 border-sacred-light text-sacred-light rounded-md hover:bg-sacred-light/10 transition-colors">
                Activate Signal
              </button>
            </ExampleCard>

            <ExampleCard
              label="Mystic Solid"
              classes="px-6 py-3 bg-mystic text-clarity rounded-md hover:bg-mystic-light shadow-neon-purple"
            >
              <button className="px-6 py-3 bg-mystic text-clarity rounded-md hover:bg-mystic-light transition-colors shadow-neon-purple">
                Enter Pantheon
              </button>
            </ExampleCard>

            <ExampleCard
              label="Cosmic Ghost"
              classes="px-6 py-3 border border-cosmic-bright text-cosmic-bright rounded-md hover:shadow-neon-blue"
            >
              <button className="px-6 py-3 border border-cosmic-bright text-cosmic-bright rounded-md hover:shadow-neon-blue transition-shadow">
                View Telemetry
              </button>
            </ExampleCard>

            <ExampleCard
              label="Alert"
              classes="px-6 py-3 bg-alert text-clarity rounded-md hover:bg-alert-deep"
            >
              <button className="px-6 py-3 bg-alert text-clarity rounded-md hover:bg-alert-deep transition-colors">
                Disclose
              </button>
            </ExampleCard>

            <ExampleCard
              label="Gold Wisdom"
              classes="px-6 py-3 bg-gold text-space-black rounded-md hover:bg-gold-glow font-bold"
            >
              <button className="px-6 py-3 bg-gold text-space-black rounded-md hover:bg-gold-glow transition-colors font-bold">
                Ascend
              </button>
            </ExampleCard>
          </div>
        </section>

        {/* ────────── Cards ────────── */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-sacred-light mb-2">Cards</h2>
          <p className="text-clarity-gray mb-10">Glassmorphic surfaces and accent-bordered panels.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ExampleCard label="Glass Cosmic" classes="glass-cosmic p-6 rounded-lg">
              <div className="glass-cosmic p-6 rounded-lg w-full">
                <h4 className="text-lg font-semibold text-mystic-light mb-2">Cosmic Glass</h4>
                <p className="text-sm text-clarity-silver">
                  Default backdrop-blur surface with mystic border.
                </p>
              </div>
            </ExampleCard>

            <ExampleCard label="Glass Neon" classes="glass-neon p-6 rounded-lg">
              <div className="glass-neon p-6 rounded-lg w-full">
                <h4 className="text-lg font-semibold text-sacred-light mb-2">Neon Glass</h4>
                <p className="text-sm text-clarity-silver">
                  Sacred-tinted glass for life-force panels.
                </p>
              </div>
            </ExampleCard>

            <ExampleCard
              label="Sacred Border"
              classes="bg-space-blue/40 border-2 border-sacred-light rounded-lg p-6 shadow-neon-green"
            >
              <div className="bg-space-blue/40 border-2 border-sacred-light rounded-lg p-6 shadow-neon-green w-full">
                <h4 className="text-lg font-semibold text-sacred-light mb-2">Sacred Card</h4>
                <p className="text-sm text-clarity-silver">High-priority signal surface.</p>
              </div>
            </ExampleCard>
          </div>
        </section>

        {/* ────────── Badges & Alerts ────────── */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-sacred-light mb-2">Badges & Alerts</h2>
          <p className="text-clarity-gray mb-10">Status pills and inline callouts.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ExampleCard
              label="Sacred Badge"
              classes="px-3 py-1 rounded-full bg-sacred/20 text-sacred-light border border-sacred text-xs uppercase tracking-wider"
            >
              <span className="px-3 py-1 rounded-full bg-sacred/20 text-sacred-light border border-sacred text-xs uppercase tracking-wider">
                Verified
              </span>
            </ExampleCard>
            <ExampleCard
              label="Mystic Badge"
              classes="px-3 py-1 rounded-full bg-mystic/20 text-mystic-light border border-mystic text-xs uppercase tracking-wider"
            >
              <span className="px-3 py-1 rounded-full bg-mystic/20 text-mystic-light border border-mystic text-xs uppercase tracking-wider">
                Mystery
              </span>
            </ExampleCard>
            <ExampleCard
              label="Alert Badge"
              classes="px-3 py-1 rounded-full bg-alert/20 text-alert border border-alert text-xs uppercase tracking-wider"
            >
              <span className="px-3 py-1 rounded-full bg-alert/20 text-alert border border-alert text-xs uppercase tracking-wider">
                Disclosure
              </span>
            </ExampleCard>
            <ExampleCard
              label="Gold Badge"
              classes="px-3 py-1 rounded-full bg-gold/20 text-gold border border-gold text-xs uppercase tracking-wider"
            >
              <span className="px-3 py-1 rounded-full bg-gold/20 text-gold border border-gold text-xs uppercase tracking-wider">
                Wisdom
              </span>
            </ExampleCard>
          </div>
        </section>

        {/* ────────── Utility classes ────────── */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-sacred-light mb-2">Utility Classes</h2>
          <p className="text-clarity-gray mb-10">
            Custom helpers from <code className="text-mystic-light">index.css</code>.
          </p>
          <div className="flex flex-wrap gap-3">
            {utilityClasses.map((u) => (
              <ClassChip key={u} value={u} />
            ))}
          </div>
        </section>

        {/* ────────── Footer ────────── */}
        <footer className="text-center pt-12 border-t border-mystic/20">
          <p className="text-xs uppercase tracking-[0.3em] text-clarity-gray">
            Pantheon Observatory — Living style guide
          </p>
        </footer>
      </div>
    </div>
  );
}

export default StyleGuidePage;
