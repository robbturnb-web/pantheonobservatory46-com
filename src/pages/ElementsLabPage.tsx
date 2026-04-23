import { useState } from 'react';
import { motion } from 'framer-motion';
import { Beaker, Atom, Flame, ExternalLink, Sparkles } from 'lucide-react';
import { PeriodicTable } from '@/components/elements/PeriodicTable';
import { ElementMixer } from '@/components/elements/ElementMixer';
import { ELEMENTS, ELEMENT_CATEGORY_COLORS, type ChemElement } from '@/data/elements';

const SPOTLIGHTS = [
  {
    symbol: 'Mc',
    title: 'Element 115 — Moscovium',
    blurb:
      'Synthesized 2003 by Dubna/Livermore. Half-life ~650ms observed. Bob Lazar (1989) claimed S-4 reverse-engineered craft used a stable isotope of 115 as antimatter-reactor fuel — bombarded with protons to release a gravity A-wave used for propulsion. The "Island of Stability" predicted near Z=114-126 remains physics\' open frontier.',
    sources: [
      { label: 'IUPAC — Discovery of Element 115', url: 'https://iupac.org/elements/' },
      { label: 'JINR Dubna — Superheavy Element Research', url: 'https://www.jinr.ru/' },
      { label: 'Bob Lazar Documentary (Corbell)', url: 'https://www.imdb.com/title/tt9358992/' },
    ],
  },
  {
    symbol: 'Th',
    title: 'Element 90 — Thorium',
    blurb:
      'Fertile, not fissile. Hit Th-232 with a neutron and it transmutes into fissile U-233. Molten-Salt Reactors (LFTR) using thorium fluoride salts are passively safe — no high pressure, no meltdown geometry. Oak Ridge ran the MSRE successfully from 1965-1969. India and China are now racing to commercialize. 200× the energy yield of uranium per ton mined.',
    sources: [
      { label: 'Oak Ridge MSRE Final Report', url: 'https://www.osti.gov/biblio/4030941' },
      { label: 'IAEA — Thorium Fuel Cycle', url: 'https://www-pub.iaea.org/MTCD/Publications/PDF/Pub1450_web.pdf' },
      { label: 'World Nuclear — Thorium', url: 'https://world-nuclear.org/information-library/current-and-future-generation/thorium' },
    ],
  },
];

const CREDIBLE_VIDEOS = [
  { id: 'EK8GVT-fNZc', title: 'Bob Lazar: Area 51 & Element 115 — Joe Rogan Experience' },
  { id: 'ROSf-5BX1Yk', title: 'Thorium — Why Hasn\'t It Replaced Uranium? (Real Engineering)' },
  { id: 'P9M__yYbsZ4', title: 'Sam Altman & Kirk Sorensen on Thorium Power' },
  { id: 'tyDbq5HRs0o', title: 'The Island of Stability — PBS Space Time' },
];

export function ElementsLabPage() {
  const [selected, setSelected] = useState<ChemElement | null>(
    ELEMENTS.find((e) => e.symbol === 'Mc') ?? null
  );

  return (
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(180deg, #050214 0%, #0a0420 50%, #03000f 100%)' }}>
      {/* Atmosphere — hex grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none hidden lg:block"
        style={{
          backgroundImage:
            'linear-gradient(60deg, transparent 49%, hsl(var(--primary)) 50%, transparent 51%), linear-gradient(-60deg, transparent 49%, hsl(var(--primary)) 50%, transparent 51%)',
          backgroundSize: '40px 70px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-[10px] font-mono tracking-widest text-primary">
            <Atom className="w-3 h-3" /> ELEMENTS LAB · COMPOUND FORGE
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-br from-[#c77dff] via-[#39ff14] to-[#00d9ff] bg-clip-text text-transparent">
            Periodic Forge
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground text-sm sm:text-base">
            Click two elements to fuse them. <strong className="text-foreground">Factual mode</strong> returns documented chemistry.
            Toggle <strong className="text-[#39ff14]">Mad-Scientist Mode</strong> to explore speculative outcomes —
            Element 115 lattices, antimatter triggers, exotic propulsion candidates.
          </p>
        </motion.section>

        {/* Spotlights */}
        <section className="grid md:grid-cols-2 gap-4">
          {SPOTLIGHTS.map((s) => {
            const el = ELEMENTS.find((e) => e.symbol === s.symbol);
            const color = el ? ELEMENT_CATEGORY_COLORS[el.category] : '#c77dff';
            return (
              <motion.div
                key={s.symbol}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border p-5 sm:p-6"
                style={{
                  borderColor: `${color}50`,
                  background: `linear-gradient(135deg, ${color}10, transparent)`,
                  boxShadow: `0 0 30px ${color}20`,
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-lg flex flex-col items-center justify-center font-bold text-lg shrink-0"
                    style={{ background: `${color}20`, border: `1px solid ${color}`, color }}
                  >
                    {s.symbol}
                  </div>
                  <div>
                    <h3 className="font-bold text-base flex items-center gap-2">
                      <Flame className="w-4 h-4" style={{ color }} /> {s.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{s.blurb}</p>
                <div className="space-y-1">
                  {s.sources.map((src) => (
                    <a
                      key={src.url}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[11px] text-primary hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" /> {src.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* Forge Lab */}
        <section className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-5 sm:p-8">
          <ElementMixer />
        </section>

        {/* Periodic Table */}
        <section className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-5 sm:p-8">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Beaker className="w-5 h-5 text-primary" /> Full Periodic Table
            </h2>
            {selected && (
              <div className="text-xs text-muted-foreground">
                Selected: <span className="text-foreground font-mono">{selected.symbol} · {selected.name}</span>
              </div>
            )}
          </div>
          <PeriodicTable
            selected={selected?.symbol ?? null}
            highlightSymbol={selected?.symbol === 'Mc' ? 'Th' : selected?.symbol === 'Th' ? 'Mc' : null}
            onSelect={(el) => setSelected(el)}
          />
          {selected?.lore && (
            <motion.div
              key={selected.symbol}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm"
            >
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="font-bold">{selected.name} ({selected.symbol}) — Disclosure Lore</span>
              </div>
              <p className="text-muted-foreground">{selected.lore}</p>
            </motion.div>
          )}
        </section>

        {/* Credible videos */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Atom className="w-5 h-5 text-primary" /> Watch · Credible Sources
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {CREDIBLE_VIDEOS.map((v) => (
              <div key={v.id} className="rounded-xl overflow-hidden border border-border bg-card/60">
                <div className="aspect-video bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-3 text-sm">{v.title}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
