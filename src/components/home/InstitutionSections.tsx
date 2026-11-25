import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowRight, ChevronRight, ExternalLink, Search, FileText, Eye, Users, Zap, Satellite, Bot,
  Film, Database, Activity, BookOpen, Library, Clock, ShieldCheck,
} from 'lucide-react';

import heroImg from '@/assets/home/observatory-hero.jpg';
import sigil46 from '@/assets/temple/sigil-46.png';
import divDisclosure from '@/assets/temple/portal-disclosure.jpg';
import divEntities from '@/assets/temple/portal-echo.jpg';
import divPlasma from '@/assets/chambers/atmosphere.jpg';
import divObservatory from '@/assets/temple/portal-observatory.jpg';
import divInvestigate from '@/assets/chambers/codex.jpg';
import divEcho from '@/assets/temple/portal-consciousness.jpg';

import { CLAIM_STATUS_LABEL, SOURCE_TIER_LABEL, MEDIA_KIND_LABEL, type ClaimStatus, type SourceTierKey } from '@/lib/evidence';
import { officialMedia } from '@/data/official-media';
import {
  pursueReleases, pursueFeaturedRecords, pursueScope, PURSUE_ARCHIVE_URL, PURSUE_SEARCH_URL, PURSUE_LAST_REVIEWED,
} from '@/data/pursue-releases';

const fmtDate = (iso: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(iso)
    ? new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })
    : iso;

/* ───────────── shared heading ───────────── */
export function InstSectionHeader({ eyebrow, title, lede, id, action }: {
  eyebrow: string; title: string; lede?: string; id: string; action?: { to: string; label: string };
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <div className="inst-eyebrow mb-3">{eyebrow}</div>
        <h2 id={id} className="inst-title text-2xl sm:text-3xl">{title}</h2>
        {lede && <p className="inst-lede mt-3 text-sm sm:text-base">{lede}</p>}
      </div>
      {action && (
        <Link to={action.to} className="inst-link inst-focus inline-flex items-center gap-1.5 text-sm font-medium shrink-0">
          {action.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

/* ───────────── HERO ───────────── */
export interface HeroLive {
  kp: number | null; kpOk: boolean; kpAt?: string;
  flareClass: string | null; flareOk: boolean; flareAt?: string;
}

export function InstitutionHero({ kp, kpOk, kpAt, flareClass, flareOk, flareAt }: HeroLive) {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const observed = kpAt || flareAt;
  return (
    <section aria-labelledby="home-title" className="relative isolate overflow-hidden">
      <img
        src={heroImg} alt="" aria-hidden="true" fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-inst-ink via-inst-ink/85 to-inst-ink/20" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-inst-ink to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-8 pt-14 pb-16 sm:pt-24 sm:pb-24">
        <div className="flex items-center gap-3 mb-8">
          <img src={sigil46} alt="" aria-hidden="true" className="h-12 w-12 sm:h-14 sm:w-14 object-contain" />
          <div className="leading-none">
            <div className="text-sm sm:text-base font-semibold uppercase tracking-[0.32em] text-inst-bone" style={{ fontFamily: '"Cinzel", serif' }}>Pantheon</div>
            <div className="mt-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-inst-gold">Observatory 46</div>
          </div>
        </div>

        <div className="inst-eyebrow mb-4">Independent research &amp; public-source archive</div>
        <h1 id="home-title" className="inst-title max-w-3xl text-[2rem] sm:text-5xl lg:text-[3.5rem]">
          Examining the unexplained — on the evidence.
        </h1>
        <p className="inst-lede mt-6 max-w-2xl text-base sm:text-lg">
          Pantheon collects public sources on UAP, government records, space and earth science, history, consciousness and
          cultural traditions — and labels each one as official record, research, testimony, speculation or folklore.
        </p>
        <p className="mt-4 text-sm sm:text-base text-inst-gold">No question off limits. No claim true by default. Follow the evidence.</p>

        <form
          role="search" className="mt-8 flex max-w-2xl flex-col gap-2 sm:flex-row"
          onSubmit={(e) => { e.preventDefault(); navigate(q.trim() ? `/search?q=${encodeURIComponent(q.trim())}` : '/search'); }}
        >
          <label htmlFor="home-search" className="sr-only">Search the archive</label>
          <div className="relative flex-1 min-w-0">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-inst-muted" aria-hidden="true" />
            <input
              id="home-search" value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search cases, records, people, topics…"
              className="h-12 w-full rounded-md border border-inst-silver/20 bg-inst-ink/70 pl-10 pr-4 text-sm text-inst-bone placeholder:text-inst-muted focus:outline-none focus:ring-2 focus:ring-inst-gold/60"
            />
          </div>
          <button type="submit" className="inst-focus h-12 rounded-md bg-inst-crimson px-6 text-sm font-semibold text-inst-bone hover:bg-inst-crimson/85 transition-colors">
            Investigate
          </button>
        </form>

        {(kpOk || flareOk) && (
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-inst-muted">
            <span className="inline-flex items-center gap-1.5 text-signal-online">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-online" aria-hidden="true" />NOAA SWPC
            </span>
            {kpOk && kp != null && <span>Kp index <strong className="text-inst-bone">{kp.toFixed(1)}</strong></span>}
            {flareOk && flareClass && <span>X-ray flux class <strong className="text-inst-bone">{flareClass}</strong></span>}
            {observed && <span>Observed {new Date(observed).toUTCString().slice(5, 22)} UTC</span>}
            <Link to="/health" className="inst-link">Source status</Link>
          </div>
        )}
      </div>
    </section>
  );
}

/* ───────────── SIX RESEARCH DIVISIONS ───────────── */
const DIVISIONS = [
  { to: '/search', label: 'Investigate', sub: 'Search every archive, case file and source in one place.', icon: Search, img: divInvestigate },
  { to: '/disclosure', label: 'Disclosure', sub: 'Official UAP records, PURSUE releases, hearings and legislation.', icon: FileText, img: divDisclosure },
  { to: '/encounters', label: 'Entities', sub: 'Witness reports and folklore, each labeled by evidence status.', icon: Users, img: divEntities },
  { to: '/plasma', label: 'Plasma', sub: 'Measured atmospheric physics, kept apart from hypotheses.', icon: Zap, img: divPlasma },
  { to: '/live-feeds', label: 'Live Observatory', sub: 'NOAA, NASA, USGS and NWS data with source and timestamp.', icon: Satellite, img: divObservatory },
  { to: '/echo', label: 'Echo', sub: 'Ask a research question; Echo separates fact from theory.', icon: Bot, img: divEcho },
];

export function ResearchDivisions() {
  return (
    <section aria-labelledby="divisions" className="px-4 sm:px-8 py-14">
      <div className="mx-auto max-w-6xl">
        <InstSectionHeader id="divisions" eyebrow="Research divisions" title="Six ways into the record" lede="Each division links to existing archives — nothing is duplicated, and every entry carries its source." />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DIVISIONS.map((d) => (
            <li key={d.to}>
              <Link to={d.to} className="group inst-panel inst-panel-hover inst-focus block h-full overflow-hidden">
                <div className="relative h-36 overflow-hidden">
                  <img src={d.img} alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-cover saturate-[.4] transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-inst-charcoal via-inst-charcoal/40 to-transparent" />
                  <span className="absolute left-4 bottom-3 flex h-9 w-9 items-center justify-center rounded-md border border-inst-gold/40 bg-inst-ink/70">
                    <d.icon className="h-4 w-4 text-inst-gold" aria-hidden="true" />
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="flex items-center justify-between text-base font-semibold text-inst-bone">
                    {d.label}
                    <ChevronRight className="h-4 w-4 text-inst-gold transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-inst-muted">{d.sub}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────── EVIDENCE ROOM ───────────── */
const STATUS_NOTES: Partial<Record<ClaimStatus, string>> = {
  verified: 'Independently confirmed by primary records or measurement.',
  'official-statement': 'What an agency or official said — not proof it is correct.',
  historical: 'Documented in contemporary records of the period.',
  academic: 'Published research, ideally peer-reviewed.',
  testimony: 'A person’s account. Taken seriously, not treated as fact.',
  unresolved: 'Not enough data for a determination either way.',
  speculation: 'An idea or hypothesis without supporting evidence yet.',
  folklore: 'Cultural tradition or myth, studied as such.',
  disputed: 'Credible sources disagree.',
  debunked: 'Shown false by stronger evidence.',
};
const TIER_ORDER: SourceTierKey[] = ['official', 'peer-reviewed', 'journalism', 'testimony', 'community'];

export function EvidenceRoom() {
  return (
    <section aria-labelledby="evidence-room" className="px-4 sm:px-8 py-14 border-y border-inst-line bg-inst-charcoal/40">
      <div className="mx-auto max-w-6xl">
        <InstSectionHeader id="evidence-room" eyebrow="The Evidence Room" title="How every claim is labeled"
          lede="Two separate labels: how reliable the source is, and what kind of claim the content makes. A reliable source can still report an unverified claim."
          action={{ to: '/sources', label: 'Source standards' }} />
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <div className="inst-panel p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-inst-bone"><ShieldCheck className="h-4 w-4 text-inst-gold" aria-hidden="true" />Source reliability</h3>
            <ol className="mt-4 space-y-2.5">
              {TIER_ORDER.map((t, i) => (
                <li key={t} className="flex items-center gap-3 text-sm text-inst-muted">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-inst-silver/25 text-[11px] text-inst-silver">{i + 1}</span>
                  {SOURCE_TIER_LABEL[t]}
                </li>
              ))}
            </ol>
          </div>
          <dl className="grid gap-3 sm:grid-cols-2">
            {(Object.keys(CLAIM_STATUS_LABEL) as ClaimStatus[]).map((s) => (
              <div key={s} className="inst-panel p-4">
                <dt className="text-sm font-semibold text-inst-bone">{CLAIM_STATUS_LABEL[s]}</dt>
                <dd className="mt-1 text-xs leading-relaxed text-inst-muted">{STATUS_NOTES[s]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ───────────── FEATURED INVESTIGATION ───────────── */
export function FeaturedInvestigation() {
  const latest = pursueReleases[pursueReleases.length - 1];
  return (
    <section aria-labelledby="featured" className="px-4 sm:px-8 py-14">
      <div className="mx-auto max-w-6xl">
        <InstSectionHeader id="featured" eyebrow="Featured investigation" title="PURSUE: the official UAP records releases"
          action={{ to: '/disclosure', label: 'Open in Disclosure Center' }} />
        <article className="inst-panel grid overflow-hidden lg:grid-cols-[1.1fr_1fr]">
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em]">
              <span className="rounded border border-inst-gold/40 px-2 py-1 text-inst-gold">{SOURCE_TIER_LABEL.official}</span>
              <span className="rounded border border-inst-silver/30 px-2 py-1 text-inst-silver">{CLAIM_STATUS_LABEL.unresolved}</span>
            </div>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-inst-bone/90">
              The U.S. Department of War publishes declassified UAP records in rolling releases. Latest verified:{' '}
              <strong>Release {latest.number}, {fmtDate(latest.date)}</strong>.
            </p>
            <div className="mt-5 space-y-3 text-sm leading-relaxed">
              <p className="text-inst-muted"><span className="font-semibold text-inst-bone">Establishes: </span>{pursueScope.establishes}</p>
              <p className="text-inst-muted"><span className="font-semibold text-inst-bone">Does not establish: </span>{pursueScope.doesNotEstablish}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={PURSUE_ARCHIVE_URL} target="_blank" rel="noopener noreferrer" className="inst-focus inline-flex items-center gap-1.5 rounded-md bg-inst-crimson px-4 py-2.5 text-sm font-semibold text-inst-bone hover:bg-inst-crimson/85">
                Official archive <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a href={PURSUE_SEARCH_URL} target="_blank" rel="noopener noreferrer" className="inst-focus inline-flex items-center gap-1.5 rounded-md border border-inst-silver/25 px-4 py-2.5 text-sm text-inst-bone hover:border-inst-gold/50">
                Search records <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
            <p className="mt-4 text-xs text-inst-muted">Checked against the official archive {fmtDate(PURSUE_LAST_REVIEWED)}. The archive may have changed since.</p>
          </div>
          <div className="border-t border-inst-line bg-inst-ink/50 p-6 sm:p-8 lg:border-l lg:border-t-0">
            <h3 className="text-xs uppercase tracking-[0.2em] text-inst-gold">Records featured with Release {latest.number}</h3>
            <ul className="mt-4 divide-y divide-inst-line">
              {pursueFeaturedRecords.map((r) => (
                <li key={r.id}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="group inst-focus flex items-start justify-between gap-3 py-3">
                    <span>
                      <span className="block font-mono text-[11px] text-inst-silver">{r.id}</span>
                      <span className="mt-0.5 block text-sm text-inst-bone group-hover:text-inst-gold">{r.title}</span>
                    </span>
                    <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-inst-muted" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ───────────── DOCUMENTARY LIBRARY ───────────── */
export function DocumentaryLibrary() {
  const items = officialMedia.slice(0, 6);
  return (
    <section aria-labelledby="doc-library" className="px-4 sm:px-8 py-14">
      <div className="mx-auto max-w-6xl">
        <InstSectionHeader id="doc-library" eyebrow="Documentary library" title="Official videos and primary documents"
          lede="Each item opens the original publisher’s page. Entertainment documentaries are labeled separately and are not treated as evidence."
          action={{ to: '/documentaries', label: 'Full documentary library' }} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((m) => (
            <li key={m.url} className="inst-panel flex flex-col p-5">
              <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.16em]">
                <span className="inline-flex items-center gap-1 rounded border border-inst-gold/40 px-2 py-0.5 text-inst-gold">
                  {m.youtubeId ? <Film className="h-3 w-3" aria-hidden="true" /> : <FileText className="h-3 w-3" aria-hidden="true" />}
                  {MEDIA_KIND_LABEL[m.kind]}
                </span>
                <span className="text-inst-muted normal-case tracking-normal">{m.publisher} · {fmtDate(m.date)}</span>
              </div>
              <h3 className="mt-3 text-sm font-semibold leading-snug text-inst-bone">{m.title}</h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-inst-muted">{m.description}</p>
              <a href={m.url} target="_blank" rel="noopener noreferrer" className="inst-link mt-4 inline-flex items-center gap-1.5 text-sm">
                {m.linkLabel} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /><span className="sr-only">(opens in new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────── OBSERVATORY RESOURCES ───────────── */
const RESOURCES = [
  { to: '/live-feeds', label: 'Live Feed', sub: 'Space weather, earthquakes, ISS and storms', icon: Activity },
  { to: '/health', label: 'Source status', sub: 'Which live feeds are reachable right now', icon: ShieldCheck },
  { to: '/earth-pulse', label: 'Earth Pulse', sub: 'Planetary activity from USGS and NOAA', icon: Satellite },
  { to: '/jwst', label: 'James Webb', sub: 'Telescope imagery and science', icon: Eye },
  { to: '/missions', label: 'Missions', sub: 'NASA and ESA mission records', icon: Satellite },
  { to: '/sources', label: 'Source register', sub: 'Every outlet we cite and how it is rated', icon: Database },
];

export function ObservatoryResources() {
  return (
    <section aria-labelledby="resources" className="px-4 sm:px-8 py-14 border-y border-inst-line bg-inst-charcoal/40">
      <div className="mx-auto max-w-6xl">
        <InstSectionHeader id="resources" eyebrow="Observatory resources" title="Science data, with sources and timestamps"
          lede="Live readings appear only when the source answers. Otherwise you will see the last verified value and when it was taken." />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((r) => (
            <li key={r.to}>
              <Link to={r.to} className="group inst-panel inst-panel-hover inst-focus flex items-center gap-4 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-inst-silver/20 bg-inst-ink/60">
                  <r.icon className="h-4 w-4 text-inst-silver" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-inst-bone">{r.label}</span>
                  <span className="block text-xs text-inst-muted">{r.sub}</span>
                </span>
                <ChevronRight className="h-4 w-4 text-inst-muted group-hover:text-inst-gold" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────── 46 ARCHIVE ───────────── */
const ARCHIVE = [
  { to: '/codex', label: 'Codex 46', sub: 'The core reference index', icon: BookOpen },
  { to: '/library', label: "Builder's Library", sub: 'Books, papers and long reads', icon: Library },
  { to: '/timeline', label: 'Timeline', sub: 'Events in date order, with sources', icon: Clock },
  { to: '/whistleblowers', label: 'Witness archive', sub: 'Testimony, clearly labeled', icon: Users },
  { to: '/gods', label: 'Mythology', sub: 'Traditions studied as folklore', icon: BookOpen },
  { to: '/ancient-tech', label: 'Ancient technologies', sub: 'Archaeology vs speculation', icon: Database },
];

export function Archive46() {
  return (
    <section aria-labelledby="archive46" className="px-4 sm:px-8 py-14">
      <div className="mx-auto max-w-6xl">
        <InstSectionHeader id="archive46" eyebrow="The 46 Archive" title="The wider collection" action={{ to: '/codex', label: 'Open Codex 46' }} />
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {ARCHIVE.map((a) => (
            <li key={a.to}>
              <Link to={a.to} className="group inst-panel inst-panel-hover inst-focus block h-full p-4">
                <a.icon className="h-4 w-4 text-inst-gold" aria-hidden="true" />
                <span className="mt-3 block text-sm font-semibold text-inst-bone">{a.label}</span>
                <span className="mt-0.5 block text-xs text-inst-muted">{a.sub}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
