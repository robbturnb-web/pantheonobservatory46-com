import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { CitationCard, StatusChip } from '@/components/research/CitationCard';
import { establishedPlasma, plasmaHypotheses, PLASMA_LAST_REVIEWED, type PlasmaTopic } from '@/data/plasma';

function Topic({ t }: { t: PlasmaTopic }) {
  return (
    <article className="rounded-xl border border-border bg-card/40 p-5">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <h3 className="font-display text-xl text-foreground">{t.title}</h3>
        <StatusChip status={t.status} />
      </div>
      <p className="text-muted-foreground leading-relaxed">{t.summary}</p>
      {t.sources.length > 0 ? (
        <div className="mt-4 grid gap-3">{t.sources.map((c) => <CitationCard key={c.url} c={c} />)}</div>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground italic">No peer-reviewed or official source supports this claim.</p>
      )}
    </article>
  );
}

export function PlasmaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Plasma & Atmospheric Phenomena — Pantheon Observatory"
        description="Ball lightning, sprites, plasmoids, dusty plasma and plasma propulsion — established physics with sources, kept separate from hypotheses about intelligent plasma."
        path="/plasma"
      />
      <section className="container mx-auto max-w-4xl px-4 pt-24 pb-16">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">Research division · Reviewed {PLASMA_LAST_REVIEWED}</p>
        <h1 className="font-display text-4xl md:text-5xl mb-4">Plasma &amp; Atmospheric Phenomena</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Plasma — electrically charged gas — produces some of the strangest lights in the sky. This page separates what
          physics has measured from what people have proposed. For the periodic table and element mixer, see the{' '}
          <Link to="/elements" className="underline hover:text-foreground">Elements Lab</Link>.
        </p>

        <div role="note" className="mt-8 rounded-xl border border-realm-gods/40 bg-realm-gods/5 p-5">
          <p className="font-semibold text-foreground">Bottom line</p>
          <p className="text-muted-foreground mt-1">
            No demonstrated evidence establishes atmospheric plasma as intelligent or as extraterrestrial life. Natural plasma
            phenomena are real and some remain only partly understood.
          </p>
        </div>

        <h2 className="font-display text-2xl mt-12 mb-4">Established physics</h2>
        <div className="grid gap-5">{establishedPlasma.map((t) => <Topic key={t.id} t={t} />)}</div>

        <h2 className="font-display text-2xl mt-14 mb-2">Hypotheses and claims</h2>
        <p className="text-muted-foreground mb-4">Labeled as speculation or disputed. Included so you can examine them, not because they are supported.</p>
        <div className="grid gap-5">{plasmaHypotheses.map((t) => <Topic key={t.id} t={t} />)}</div>

        <h2 className="font-display text-2xl mt-14 mb-4">How to test a plasma claim</h2>
        <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
          <li><strong className="text-foreground">Calibrated sensors:</strong> spectra, radar, magnetometer and radio data recorded at the same time — not just phone video.</li>
          <li><strong className="text-foreground">Multiple angles:</strong> two or more cameras to measure distance, size and speed.</li>
          <li><strong className="text-foreground">Rule out ordinary causes:</strong> weather, aircraft, satellites, insects, lens artifacts.</li>
          <li><strong className="text-foreground">Repeatable prediction:</strong> an "intelligent" behavior must be defined in advance and shown to beat chance.</li>
          <li><strong className="text-foreground">Open data and peer review.</strong></li>
        </ol>
        <h3 className="font-semibold mt-6 mb-2">What data is missing</h3>
        <p className="text-muted-foreground">
          No publicly available, instrumented dataset shows a plasma formation responding to stimuli in a goal-directed way.
          Ball lightning itself has only one published spectrum from a natural event.
        </p>
      </section>
    </div>
  );
}
export default PlasmaPage;
