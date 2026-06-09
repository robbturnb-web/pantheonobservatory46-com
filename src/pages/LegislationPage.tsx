import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Landmark, ScrollText, ShieldCheck } from 'lucide-react';
import { SEO } from '@/components/SEO';
import {
  legislation,
  STATUS_LABEL,
  STATUS_TONE,
  CHAMBER_LABEL,
  LEGISLATION_LAST_UPDATED,
  type BillStatus,
} from '@/data/legislation';

const STATUS_FILTERS: { key: 'all' | BillStatus; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'enacted', label: 'Enacted' },
  { key: 'stalled', label: 'Stalled' },
  { key: 'passed-chamber', label: 'Passed Chamber' },
  { key: 'committee', label: 'In Committee' },
];

export function LegislationPage() {
  const [filter, setFilter] = useState<'all' | BillStatus>('all');

  const sorted = useMemo(
    () =>
      [...legislation].sort(
        (a, b) =>
          new Date(b.introduced).getTime() - new Date(a.introduced).getTime(),
      ),
    [],
  );

  const filtered = useMemo(
    () => (filter === 'all' ? sorted : sorted.filter((b) => b.status === filter)),
    [filter, sorted],
  );

  const enactedCount = legislation.filter((b) => b.status === 'enacted').length;
  const stalledCount = legislation.filter((b) => b.status === 'stalled').length;

  return (
    <>
      <SEO
        title="UAP Disclosure Legislation Tracker — Pantheon Observatory"
        description="Live tracker of U.S. UAP disclosure legislation: Schumer-Rounds UAP Disclosure Act, NDAA amendments, AARO mandates, House Task Force hearings. Sourced to congress.gov and AARO."
        path="/legislation"
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'UAP Disclosure Legislation Tracker',
            url: 'https://pantheonobservatory46.com/legislation',
            description:
              'Authoritative timeline of U.S. UAP disclosure legislation and congressional hearings.',
            numberOfItems: legislation.length,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pantheonobservatory46.com/' },
              { '@type': 'ListItem', position: 2, name: 'Disclosure', item: 'https://pantheonobservatory46.com/uap' },
              { '@type': 'ListItem', position: 3, name: 'Legislation Tracker', item: 'https://pantheonobservatory46.com/legislation' },
            ],
          },
        ]}
      />

      <main className="relative min-h-screen bg-[#05030D] text-white">
        {/* Background wash */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.10),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(124,58,237,0.12),transparent_60%)]" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 pt-12 pb-24">
          {/* Header */}
          <header className="mb-10 border-b border-white/10 pb-8">
            <p className="text-[10px] uppercase tracking-[4px] text-emerald-300/80 mb-3 flex items-center gap-2">
              <Landmark className="h-3 w-3" /> Disclosure · Legislative Watch
            </p>
            <h1
              className="text-3xl sm:text-5xl font-black tracking-tight leading-tight"
              style={{ fontFamily: '"Cinzel", "Space Grotesk", serif' }}
            >
              UAP Disclosure Legislation Tracker
            </h1>
            <p className="mt-4 max-w-3xl text-sm sm:text-base text-white/70 leading-relaxed">
              A live timeline of every U.S. federal bill, public law, and sworn
              congressional hearing that shapes what the public is allowed to
              know about <abbr title="Unidentified Anomalous Phenomena">UAP</abbr>.
              From the establishment of <Link to="/aaro" className="text-emerald-300 underline-offset-4 hover:underline">AARO</Link>
              {' '}to the Schumer–Rounds UAP Disclosure Act and the standing House Task Force —
              every entry is sourced to congress.gov, AARO, or the official hearing record.
            </p>

            <dl className="mt-6 grid grid-cols-3 gap-3 text-xs">
              <Stat label="Tracked items" value={legislation.length.toString()} />
              <Stat label="Enacted" value={enactedCount.toString()} tone="emerald" />
              <Stat label="Stalled / blocked" value={stalledCount.toString()} tone="yellow" />
            </dl>

            <p className="mt-4 text-[10px] uppercase tracking-[2px] text-white/40">
              Last updated {LEGISLATION_LAST_UPDATED} ·
              {' '}<a href="#sources" className="underline underline-offset-2 hover:text-white/70">how we verify</a>
            </p>
          </header>

          {/* Filter chips */}
          <nav aria-label="Filter by status" className="mb-8 flex flex-wrap gap-2">
            {STATUS_FILTERS.map((f) => {
              const isActive = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  className={`px-3 py-1.5 rounded-full text-[11px] uppercase tracking-[2px] border transition-colors ${
                    isActive
                      ? 'bg-emerald-400/15 border-emerald-400/50 text-emerald-200'
                      : 'border-white/15 text-white/60 hover:text-white hover:border-white/30'
                  }`}
                  aria-pressed={isActive}
                >
                  {f.label}
                </button>
              );
            })}
          </nav>

          {/* Timeline list */}
          <ol className="relative space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-emerald-400/40 before:via-white/10 before:to-transparent">
            {filtered.map((bill) => {
              const tone = STATUS_TONE[bill.status];
              return (
                <li key={bill.id} className="relative pl-10">
                  <span
                    className={`absolute left-0 top-3 grid h-6 w-6 place-items-center rounded-full bg-[#0a0518] ring-2 ${tone.ring}`}
                  >
                    <span className={`h-2 w-2 rounded-full ${tone.dot}`} />
                  </span>

                  <article
                    className={`rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 sm:p-6 shadow-lg transition-colors hover:border-white/20`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h2 className="text-lg sm:text-xl font-bold leading-tight">
                          {bill.shortTitle}
                        </h2>
                        <p className="mt-1 text-[11px] uppercase tracking-[2px] text-white/50 font-mono">
                          {bill.citation} · {CHAMBER_LABEL[bill.chamber]} · {bill.congress}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[2px] ring-1 ${tone.ring} ${tone.text} bg-black/40`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
                        {STATUS_LABEL[bill.status]}
                      </span>
                    </div>

                    <p className="text-sm text-white/80 leading-relaxed mb-4">{bill.summary}</p>

                    <details className="group rounded-lg border border-white/5 bg-black/30 px-4 py-3 mb-4">
                      <summary className="cursor-pointer text-[11px] uppercase tracking-[2px] text-white/60 hover:text-white">
                        Key provisions · Significance
                      </summary>
                      <div className="mt-3 space-y-3 text-sm text-white/75">
                        <div>
                          <p className="text-[10px] uppercase tracking-[2px] text-emerald-300/80 mb-1">Provisions</p>
                          <ul className="list-disc pl-5 space-y-1">
                            {bill.provisions.map((p) => (
                              <li key={p}>{p}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[2px] text-emerald-300/80 mb-1">Why it matters</p>
                          <p>{bill.significance}</p>
                        </div>
                      </div>
                    </details>

                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-white/60">
                      <div>
                        <p className="text-[10px] uppercase tracking-[2px] text-white/40 mb-1">Sponsors</p>
                        <p className="text-white/80">{bill.sponsors.join(' · ')}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[2px] text-white/40 mb-1">Last action</p>
                        <p className="text-white/80">{bill.lastAction}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3 border-t border-white/5 pt-3">
                      {bill.sources.map((s) => (
                        <a
                          key={s.url}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[2px] text-emerald-300/90 hover:text-emerald-200"
                        >
                          <ExternalLink className="h-3 w-3" />
                          {s.label}
                        </a>
                      ))}
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>

          {/* Sources / methodology */}
          <section
            id="sources"
            className="mt-14 rounded-xl border border-white/10 bg-white/[0.02] p-6"
          >
            <h2 className="text-sm uppercase tracking-[3px] text-white/70 flex items-center gap-2 mb-3">
              <ShieldCheck className="h-4 w-4 text-emerald-300" /> How we verify
            </h2>
            <p className="text-sm text-white/70 leading-relaxed">
              Every bill on this tracker links to its primary record on{' '}
              <a href="https://www.congress.gov" target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:underline">congress.gov</a>,
              its enacted public-law citation, or the official record at{' '}
              <a href="https://www.aaro.mil" target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:underline">aaro.mil</a>.
              Hearing entries link directly to the House Oversight committee video and the prepared statements entered into the Congressional Record.
              We do not source from secondary commentary.
            </p>
            <p className="mt-3 text-sm text-white/70 leading-relaxed flex items-start gap-2">
              <ScrollText className="h-4 w-4 mt-0.5 shrink-0 text-emerald-300" />
              <span>
                Spot a bill we missed or a status change? Cross-reference the related{' '}
                <Link to="/aaro" className="text-emerald-300 hover:underline">AARO Watch</Link>,{' '}
                <Link to="/whistleblowers" className="text-emerald-300 hover:underline">Whistleblower Vault</Link>, and{' '}
                <Link to="/timeline" className="text-emerald-300 hover:underline">Disclosure Timeline</Link> dossiers — or open a thread in the{' '}
                <Link to="/echoverse" className="text-emerald-300 hover:underline">Echoverse</Link>.
              </span>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}

function Stat({
  label,
  value,
  tone = 'default',
}: {
  label: string;
  value: string;
  tone?: 'default' | 'emerald' | 'yellow';
}) {
  const valueTone =
    tone === 'emerald'
      ? 'text-emerald-300'
      : tone === 'yellow'
      ? 'text-yellow-300'
      : 'text-white';
  return (
    <div className="rounded-lg border border-white/10 bg-black/30 px-3 py-2">
      <dt className="text-[9px] uppercase tracking-[2px] text-white/40">{label}</dt>
      <dd className={`mt-1 text-xl font-bold font-mono ${valueTone}`}>{value}</dd>
    </div>
  );
}

export default LegislationPage;
