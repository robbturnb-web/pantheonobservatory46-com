/**
 * Disclosure Command Center — Phase 2 · Priority #4.
 *
 * A single command surface that unifies what already exists across the
 * platform (AARO dossier, Whistleblower Vault, Legislation Tracker, UAP
 * archive) into one chronological intelligence picture, so a returning
 * visitor can answer in 5 seconds: "what's actually happening right now
 * with UAP disclosure?"
 *
 * No new data — derives entirely from existing typed datasets.
 */
import { Link } from 'react-router-dom';
import { lazy, Suspense, useMemo, useState } from 'react';
import {
  Shield, FileText, Gavel, Users, Radar, FlaskConical,
  ArrowRight, ScrollText, Building2, AlertTriangle,
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { legislation, STATUS_LABEL, STATUS_TONE, LEGISLATION_LAST_UPDATED, type LegislationItem } from '@/data/legislation';
import { aaroEntries } from '@/data/aaro';
import { whistleblowers } from '@/data/whistleblowers';

// ── Unified timeline event model ──────────────────────────────────────
type EventKind = 'law' | 'hearing' | 'report' | 'office' | 'testimony';

interface DisclosureEvent {
  id: string;
  kind: EventKind;
  date: string;          // ISO yyyy-mm-dd
  title: string;
  body: string;
  href?: string;
  badge?: string;
  status?: keyof typeof STATUS_LABEL;
}

const KIND_VISUAL: Record<EventKind, { label: string; text: string; bg: string; border: string; icon: typeof FileText }> = {
  law:       { label: 'Legislation', text: 'text-realm-disclosure', bg: 'bg-realm-disclosure/10', border: 'border-realm-disclosure/40', icon: Gavel },
  hearing:   { label: 'Hearing',     text: 'text-realm-cosmos',     bg: 'bg-realm-cosmos/10',     border: 'border-realm-cosmos/40',     icon: ScrollText },
  report:    { label: 'Report',      text: 'text-realm-observatory',bg: 'bg-realm-observatory/10',border: 'border-realm-observatory/40',icon: FileText },
  office:    { label: 'Office',      text: 'text-realm-gods',       bg: 'bg-realm-gods/10',       border: 'border-realm-gods/40',       icon: Building2 },
  testimony: { label: 'Testimony',   text: 'text-realm-cosmos',     bg: 'bg-realm-cosmos/10',     border: 'border-realm-cosmos/40',     icon: Users },
};

function classifyLegislation(l: LegislationItem): EventKind {
  if (l.shortTitle.toLowerCase().includes('hearing')) return 'hearing';
  if (l.shortTitle.toLowerCase().includes('report')) return 'report';
  return 'law';
}

function classifyAaro(category: string): EventKind {
  const c = category.toLowerCase();
  if (c === 'hearing') return 'hearing';
  if (c === 'report') return 'report';
  if (c === 'leadership' || c === 'office' || c === 'lineage') return 'office';
  return 'testimony';
}

function eraToDate(era: string): string {
  // Best-effort: pull a yyyy-mm-dd or "Mon yyyy" out of an era string.
  const iso = era.match(/\d{4}-\d{2}-\d{2}/);
  if (iso) return iso[0];
  const monthYr = era.match(/([A-Z][a-z]{2,8})\s+(\d{1,2})?[,\s]*(\d{4})/);
  if (monthYr) {
    const months: Record<string, string> = {
      January: '01', February: '02', March: '03', April: '04', May: '05', June: '06',
      July: '07', August: '08', September: '09', October: '10', November: '11', December: '12',
      Jan: '01', Feb: '02', Mar: '03', Apr: '04', Jun: '06', Jul: '07', Aug: '08',
      Sep: '09', Sept: '09', Oct: '10', Nov: '11', Dec: '12',
    };
    const m = months[monthYr[1]] ?? '01';
    const d = (monthYr[2] ?? '01').padStart(2, '0');
    return `${monthYr[3]}-${m}-${d}`;
  }
  const yr = era.match(/\d{4}/);
  if (yr) return `${yr[0]}-01-01`;
  return '1970-01-01';
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function DisclosureCommandPage() {
  const [filter, setFilter] = useState<'all' | EventKind>('all');

  const events = useMemo<DisclosureEvent[]>(() => {
    const legEvents: DisclosureEvent[] = legislation.map((l) => ({
      id: `leg-${l.id}`,
      kind: classifyLegislation(l),
      date: l.introduced,
      title: l.shortTitle,
      body: l.summary,
      href: '/legislation',
      badge: l.citation,
      status: l.status,
    }));
    const aaroEvents: DisclosureEvent[] = aaroEntries.map((a) => ({
      id: `aaro-${a.id}`,
      kind: classifyAaro(a.category ?? ''),
      date: eraToDate(a.era ?? ''),
      title: a.title,
      body: a.summary,
      href: '/aaro',
      badge: a.subtitle,
    }));
    return [...legEvents, ...aaroEvents].sort((a, b) => b.date.localeCompare(a.date));
  }, []);

  const filtered = filter === 'all' ? events : events.filter((e) => e.kind === filter);

  // ── Stats ───────────────────────────────────────────────────────────
  const enactedCount = legislation.filter((l) => l.status === 'enacted').length;
  const stalledCount = legislation.filter((l) => l.status === 'stalled').length;
  const hearingsCount = events.filter((e) => e.kind === 'hearing').length;
  const livingWitnesses = whistleblowers.filter((w) => w.status === 'alive').length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Disclosure Command Center — Pantheon Frequency 46"
        description="Unified live posture for UAP disclosure: AARO lineage, congressional hearings, enacted and stalled laws, whistleblower record. One command surface, sourced and dated."
      />

      <section className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-realm-disclosure font-mono">
            Phase 2 · Disclosure Command
          </span>
          <span className="h-px flex-1 bg-realm-disclosure/30" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">
            Updated {LEGISLATION_LAST_UPDATED}
          </span>
        </div>
        <h1 className="font-display text-4xl md:text-6xl text-foreground mb-3">
          UAP <span className="text-realm-disclosure">Disclosure</span> Command
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-8">
          The live posture of U.S. UAP disclosure — every enacted law, every public hearing,
          every AARO milestone, every credible whistleblower — collapsed into one
          chronological intelligence picture.
        </p>

        {/* Stat grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { v: enactedCount,     l: 'Laws enacted',       t: KIND_VISUAL.law },
            { v: stalledCount,     l: 'Stalled bills',      t: { ...KIND_VISUAL.law, text: 'text-amber-300', bg: 'bg-amber-500/10', border: 'border-amber-500/40' } },
            { v: hearingsCount,    l: 'Public hearings',    t: KIND_VISUAL.hearing },
            { v: livingWitnesses,  l: 'Living witnesses',   t: KIND_VISUAL.testimony },
          ].map((s) => (
            <div key={s.l} className={`p-4 rounded-xl border ${s.t.border} ${s.t.bg} backdrop-blur`}>
              <div className={`font-display text-3xl ${s.t.text}`}>{s.v}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono mt-1">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Hub tiles */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
          {[
            { to: '/aaro',            label: 'AARO Watch',            sub: 'Office · lineage · leadership',         icon: Shield,        kind: 'office' as EventKind },
            { to: '/legislation',     label: 'Legislation Tracker',   sub: `${legislation.length} bills · sourced`, icon: Gavel,         kind: 'law' as EventKind },
            { to: '/whistleblowers',  label: 'Whistleblower Vault',   sub: `${whistleblowers.length} witnesses`,    icon: Users,         kind: 'testimony' as EventKind },
            { to: '/uap',             label: 'UAP Case Archive',      sub: 'Tic Tac · GIMBAL · GOFAST · more',      icon: Radar,         kind: 'report' as EventKind },
            { to: '/crash-retrieval', label: 'Crash Retrieval',       sub: 'Recovered material claims',             icon: FlaskConical,  kind: 'report' as EventKind },
            { to: '/black-programs',  label: 'Black Programs',        sub: 'Unacknowledged SAPs',                   icon: AlertTriangle, kind: 'office' as EventKind },
          ].map((tile) => {
            const v = KIND_VISUAL[tile.kind];
            const Icon = tile.icon;
            return (
              <Link
                key={tile.to}
                to={tile.to}
                className={`group p-4 rounded-xl border ${v.border} ${v.bg} backdrop-blur hover:scale-[1.01] transition`}
              >
                <div className="flex items-start justify-between mb-2">
                  <Icon className={`w-5 h-5 ${v.text}`} />
                  <ArrowRight className={`w-4 h-4 ${v.text} opacity-0 group-hover:opacity-100 transition`} />
                </div>
                <div className="text-foreground font-semibold">{tile.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{tile.sub}</div>
              </Link>
            );
          })}
        </div>

        {/* Active Watch (stalled) */}
        {stalledCount > 0 && (
          <div className="mb-10 p-4 rounded-xl border border-amber-500/40 bg-amber-500/5 backdrop-blur">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-300" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-mono">
                Active Watch · Stalled Disclosure Mechanisms
              </span>
            </div>
            <ul className="space-y-2">
              {legislation.filter((l) => l.status === 'stalled').map((l) => (
                <li key={l.id} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-amber-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Link to="/legislation" className="text-sm text-foreground hover:text-amber-200 transition">
                      {l.shortTitle}
                    </Link>
                    <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono">
                      {l.citation} · {l.lastAction}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Unified Timeline */}
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <h2 className="font-display text-2xl text-foreground">Unified Disclosure Timeline</h2>
          <div className="flex flex-wrap gap-2">
            {(['all', 'law', 'hearing', 'report', 'office'] as const).map((f) => {
              const active = filter === f;
              const v = f === 'all' ? null : KIND_VISUAL[f];
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-2.5 py-1 rounded border text-[10px] uppercase tracking-[0.18em] font-mono transition ${
                    active
                      ? v ? `${v.border} ${v.bg} ${v.text}` : 'border-foreground/50 bg-foreground/10 text-foreground'
                      : 'border-primary/15 bg-card/40 text-muted-foreground hover:border-primary/40'
                  }`}
                  aria-pressed={active}
                >
                  {f === 'all' ? `All · ${events.length}` : KIND_VISUAL[f].label}
                </button>
              );
            })}
          </div>
        </div>

        <ol className="relative space-y-3 border-l border-realm-disclosure/30 pl-5">
          {filtered.map((e) => {
            const v = KIND_VISUAL[e.kind];
            const Icon = v.icon;
            const tone = e.status ? STATUS_TONE[e.status] : null;
            return (
              <li key={e.id} className="relative">
                <span className={`absolute -left-[26px] top-3 w-2.5 h-2.5 rounded-full ${v.bg} ring-2 ${v.border.replace('border-', 'ring-')}`} />
                <div className={`p-4 rounded-xl border ${v.border} bg-card/30 backdrop-blur`}>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Icon className={`w-3.5 h-3.5 ${v.text}`} />
                    <span className={`text-[9px] uppercase tracking-[0.2em] font-mono ${v.text}`}>{v.label}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">· {fmtDate(e.date)}</span>
                    {tone && e.status && (
                      <span className={`ml-auto inline-flex items-center gap-1 px-1.5 py-0.5 rounded ring-1 ${tone.ring} ${tone.text} text-[9px] uppercase tracking-[0.15em] font-mono`}>
                        <span className={`w-1 h-1 rounded-full ${tone.dot}`} /> {STATUS_LABEL[e.status]}
                      </span>
                    )}
                  </div>
                  <Link to={e.href ?? '#'} className="block">
                    <h3 className="text-foreground font-semibold hover:text-realm-disclosure transition">{e.title}</h3>
                    {e.badge && (
                      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono mt-0.5">{e.badge}</div>
                    )}
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{e.body}</p>
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}

export default DisclosureCommandPage;
