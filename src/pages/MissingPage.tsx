import { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Eye,
  FileSearch,
  Lock,
  MapPin,
  Network,
  Newspaper,
  ShieldAlert,
  Skull,
  Users,
  X,
} from 'lucide-react';
import {
  missingScientists,
  historicalPrecedent,
  programInfo,
  type MissingScientist,
  type ConfidenceGrade,
  type Program,
} from '@/data/missing-scientists';
import silhouetteMale from '@/assets/missing/silhouette-male.jpg';
import silhouetteFemale from '@/assets/missing/silhouette-female.jpg';
import silhouetteMilitary from '@/assets/missing/silhouette-military.jpg';
import heroLab from '@/assets/missing/hero-empty-lab.jpg';
import { SEO } from '@/components/SEO';

const portraitMap = {
  male: silhouetteMale,
  female: silhouetteFemale,
  military: silhouetteMilitary,
};

const statusConfig: Record<MissingScientist['status'], { label: string; tone: string }> = {
  missing: { label: 'Missing', tone: '#9a3412' },
  deceased: { label: 'Deceased — no public cause', tone: '#52525b' },
  murdered: { label: 'Murdered', tone: '#991b1b' },
};

const confidenceConfig: Record<
  ConfidenceGrade,
  { label: string; color: string }
> = {
  VERIFIED: { label: 'Verified', color: '#10b981' },
  REPORTED: { label: 'Reported', color: '#22D3EE' },
  ALLEGED: { label: 'Alleged', color: '#D6B35A' },
  UNDER_INVESTIGATION: { label: 'Under investigation', color: '#4F46E5' },
};

function ConfidenceBadge({ grade }: { grade: ConfidenceGrade }) {
  const c = confidenceConfig[grade];
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider border transition-shadow hover:shadow-[0_0_12px_currentColor]"
      style={{
        background: `${c.color}15`,
        color: c.color,
        borderColor: `${c.color}55`,
      }}
    >
      <ShieldAlert className="w-2.5 h-2.5" />
      {c.label}
    </span>
  );
}

function StatusPill({ status }: { status: MissingScientist['status'] }) {
  const s = statusConfig[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{
        background: `${s.tone}15`,
        color: s.tone,
        border: `1px solid ${s.tone}40`,
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.tone }} />
      {s.label}
    </span>
  );
}

export function MissingPage() {
  const [open, setOpen] = useState<MissingScientist | null>(null);
  const [activeTab, setActiveTab] = useState<'background' | 'project' | 'circumstances' | 'theories' | 'connections' | 'sources'>('background');
  const navRef = useRef<HTMLDivElement>(null);

  const stats = useMemo(() => {
    const m = missingScientists.filter((s) => s.status === 'missing').length;
    const d = missingScientists.filter((s) => s.status === 'deceased').length;
    const k = missingScientists.filter((s) => s.status === 'murdered').length;
    const programs = new Set(missingScientists.map((s) => s.program));
    const earliest = missingScientists.reduce((min, s) => (s.date < min ? s.date : min), '9999');
    const years = new Date().getFullYear() - parseInt(earliest.slice(0, 4), 10);
    return { total: missingScientists.length, missing: m, deceased: d, murdered: k, programs: programs.size, years };
  }, []);

  const byProgram = useMemo(() => {
    const grouped = new Map<Program, MissingScientist[]>();
    for (const s of missingScientists) {
      const list = grouped.get(s.program) || [];
      list.push(s);
      grouped.set(s.program, list);
    }
    return Array.from(grouped.entries()).sort((a, b) => b[1].length - a[1].length);
  }, []);

  const sortedByDate = useMemo(
    () => [...missingScientists].sort((a, b) => (a.date < b.date ? -1 : 1)),
    []
  );

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <SEO
        title="The Missing — Scientists & Insiders Who Vanished | Pantheon"
        description="A forensic registry of physicists, aerospace insiders, and UAP-adjacent researchers who disappeared or died under suspicious circumstances. Cases, patterns, and the historical precedent."
        canonical="/missing"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'The Missing',
          description: 'Registry of vanished scientists and insiders connected to UAP and black programs.',
          url: 'https://pantheonobservatory46.com/missing',
        }}
      />
    <div
      className="missing-page font-serif"
      style={{
        background: '#f7f3ec',
        color: '#1c1917',
        minHeight: '100vh',
      }}
    >
      <style>{`
        .missing-page { font-family: 'Source Serif Pro', 'Georgia', 'Times New Roman', serif; }
        .missing-page .sans { font-family: 'Inter', 'Helvetica Neue', system-ui, sans-serif; }
        .missing-page .ink { color: #1c1917; }
        .missing-page .ink-muted { color: #57534e; }
        .missing-page .ink-faded { color: #78716c; }
        .missing-page .accent-red { color: #991b1b; }
        .missing-page .border-rule { border-color: #d6d3d1; }
        .missing-page .bg-paper { background: #f7f3ec; }
        .missing-page .bg-paper-deep { background: #ede7da; }
        .missing-page .drop-cap::first-letter {
          float: left;
          font-size: 4.5rem;
          line-height: 0.85;
          padding: 0.25rem 0.5rem 0 0;
          font-weight: 700;
          color: #991b1b;
        }
        .missing-page .rule {
          border-top: 1px solid #1c1917;
          height: 4px;
          border-bottom: 1px solid #1c1917;
          padding-top: 1px;
        }
      `}</style>

      {/* Top utility bar — back to site */}
      <div className="border-b border-rule bg-paper-deep">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between text-xs sans">
          <Link to="/" className="inline-flex items-center gap-1.5 ink-muted hover:ink transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Pantheon Observatory
          </Link>
          <div className="ink-faded">
            Updated April 21, 2026 · Investigative Desk
          </div>
        </div>
      </div>

      {/* HERO */}
      <header className="border-b border-rule">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="sans inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] accent-red mb-5">
                <FileSearch className="w-3 h-3" />
                Investigation
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-5 ink">
                The Vanishing
              </h1>
              <p className="text-xl sm:text-2xl ink-muted italic leading-snug mb-6 max-w-2xl">
                Eleven scientists, engineers, and cleared personnel tied to America's most sensitive nuclear, aerospace, and rocket programs are dead or missing. Congress is now asking why.
              </p>
              <div className="sans flex flex-wrap items-center gap-x-4 gap-y-1 text-sm ink-faded">
                <span>By the Pantheon Observatory Investigative Desk</span>
                <span>·</span>
                <span>Apr 21, 2026</span>
                <span>·</span>
                <span>~22 min read</span>
              </div>
            </div>
            <div className="lg:col-span-5">
              <figure className="border border-rule bg-paper-deep">
                <img
                  src={heroLab}
                  alt="Editorial illustration of an empty laboratory with a chalkboard of equations and an abandoned lab coat"
                  className="w-full h-auto block"
                  width={1600}
                  height={900}
                />
                <figcaption className="text-[11px] sans ink-faded p-2 italic">
                  Illustration: Pantheon Observatory. All portraits in this report are anonymous editorial silhouettes — not photographs of the named individuals.
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-10 border-l-4 px-4 py-3 sans text-sm ink-muted" style={{ borderColor: '#991b1b', background: '#fee2e2' }}>
            <strong className="ink">Editor's note:</strong> This report aggregates publicly-available reporting. Each claim carries a confidence badge — <em>Verified, Reported, Alleged,</em> or <em>Under investigation</em>. No classified material has been used. Persons charged are presumed innocent until proven guilty. Theories are presented as theories.
          </div>
        </div>
      </header>

      {/* STATS STRIP */}
      <section className="border-b border-rule bg-paper-deep">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 sans text-center">
          {[
            { v: stats.total, l: 'cases' },
            { v: stats.missing, l: 'still missing' },
            { v: stats.deceased, l: 'deceased — no cause' },
            { v: stats.murdered, l: 'shot dead' },
            { v: stats.programs, l: 'programs' },
            { v: `${stats.years}+`, l: 'years span' },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-3xl sm:text-4xl font-bold ink font-serif">{s.v}</div>
              <div className="text-[10px] uppercase tracking-widest ink-faded mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* INTRO LEDE */}
      <section className="border-b border-rule">
        <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
          <p className="text-lg leading-relaxed ink drop-cap mb-5">
            On April 21, 2026, the Chairman of the U.S. House Committee on Oversight and Government Reform, James Comer of Kentucky, and Subcommittee Chairman Eric Burlison of Missouri sent letters to four federal agencies — the Department of Energy, the Department of War, the FBI, and NASA — requesting briefings on the deaths and disappearances of at least ten Americans connected to U.S. nuclear secrets or rocket technology.
          </p>
          <p className="text-lg leading-relaxed ink mb-5">
            Within hours, an eleventh name was added. President Donald Trump, asked the prior Thursday whether he had been briefed on the cluster, called it "pretty serious stuff" and promised an answer "in the next week and a half." White House Press Secretary Karoline Leavitt confirmed the FBI and other federal agencies are now examining the cases for "potential commonalities."
          </p>
          <p className="text-lg leading-relaxed ink">
            Taken individually, each death or disappearance carries its own circumstances and its own local investigation. Taken together, the eleven represent something more specific: a near-complete map of America's most strategically sensitive science and technology, with each person holding a distinct and non-redundant piece of that map. No single one of them knew everything. Together, they knew most of it. This is what is publicly known.
          </p>
        </div>
      </section>

      {/* IN-PAGE NAV */}
      <nav className="sticky top-0 z-30 border-b border-rule bg-paper-deep/95 backdrop-blur-sm">
        <div ref={navRef} className="max-w-6xl mx-auto px-4 py-3 flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide sans text-xs">
          <button onClick={() => scrollTo('the-eleven')} className="whitespace-nowrap font-semibold ink hover:accent-red transition-colors uppercase tracking-wider">
            The Eleven
          </button>
          <span className="ink-faded">·</span>
          <button onClick={() => scrollTo('connections')} className="whitespace-nowrap font-semibold ink hover:accent-red transition-colors uppercase tracking-wider">
            Connections
          </button>
          <span className="ink-faded">·</span>
          <button onClick={() => scrollTo('timeline')} className="whitespace-nowrap font-semibold ink hover:accent-red transition-colors uppercase tracking-wider">
            Timeline
          </button>
          <span className="ink-faded">·</span>
          <button onClick={() => scrollTo('precedent')} className="whitespace-nowrap font-semibold ink hover:accent-red transition-colors uppercase tracking-wider">
            Precedent
          </button>
          <span className="ink-faded">·</span>
          <button onClick={() => scrollTo('programs')} className="whitespace-nowrap font-semibold ink hover:accent-red transition-colors uppercase tracking-wider">
            Programs
          </button>
          <span className="ink-faded">·</span>
          <button onClick={() => scrollTo('open')} className="whitespace-nowrap font-semibold ink hover:accent-red transition-colors uppercase tracking-wider">
            Open Questions
          </button>
        </div>
      </nav>

      {/* THE ELEVEN */}
      <section id="the-eleven" className="border-b border-rule">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <div className="rule mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold ink mb-2">The Eleven</h2>
          <p className="ink-muted text-lg italic mb-10 max-w-3xl">
            Each dossier opens to a full file with background, the project, circumstances, the official explanation, and competing theories. Tap a name to read.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            {missingScientists.map((s, i) => (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.04 }}
                onClick={() => {
                  setOpen(s);
                  setActiveTab('background');
                }}
                className="text-left group"
              >
                <article className="grid grid-cols-[100px_1fr] gap-4">
                  <figure className="border border-rule bg-paper-deep overflow-hidden">
                    <img
                      src={portraitMap[s.portrait]}
                      alt={`Editorial silhouette representing ${s.name}`}
                      loading="lazy"
                      className="w-full h-auto block grayscale opacity-90 group-hover:opacity-100 transition-opacity"
                      width={400}
                      height={400}
                    />
                  </figure>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="sans text-[10px] font-bold uppercase tracking-widest ink-faded">
                        №{String(i + 1).padStart(2, '0')}
                      </span>
                      <ConfidenceBadge grade={s.confidence} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold leading-tight ink group-hover:accent-red transition-colors mb-1.5">
                      {s.name}
                    </h3>
                    <p className="ink-muted text-sm italic mb-2">{s.field}</p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sans ink-muted mb-2">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {s.date}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {s.location.split(',')[0]}
                      </span>
                    </div>
                    <StatusPill status={s.status} />
                    <p className="text-sm ink mt-3 line-clamp-3 leading-snug">
                      {s.circumstances.split('.').slice(0, 2).join('.') + '.'}
                    </p>
                    <span className="sans text-[11px] font-bold uppercase tracking-widest accent-red mt-3 inline-flex items-center gap-1">
                      Read the file <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </article>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* CONNECTIONS */}
      <section id="connections" className="border-b border-rule bg-paper-deep">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <div className="rule mb-6" />
          <div className="flex items-start gap-3 mb-3">
            <Network className="w-7 h-7 ink mt-1" />
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold ink mb-2">Connections</h2>
              <p className="ink-muted text-lg italic max-w-3xl">
                Grouped by program. Where a single program holds two or more of the eleven, the cluster is statistically significant.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {byProgram.map(([program, people]) => {
              const info = programInfo[program];
              return (
                <div
                  key={program}
                  className="border border-rule bg-paper p-5"
                  style={{ borderLeftWidth: 4, borderLeftColor: info.accent }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold ink text-lg leading-tight">{info.name}</h3>
                    <span
                      className="sans text-xs font-bold uppercase tracking-widest"
                      style={{ color: info.accent }}
                    >
                      {people.length}× linked
                    </span>
                  </div>
                  <p className="text-sm ink-muted leading-relaxed mb-3">{info.description}</p>
                  <ul className="space-y-1">
                    {people.map((p) => (
                      <li key={p.id}>
                        <button
                          onClick={() => {
                            setOpen(p);
                            setActiveTab('background');
                          }}
                          className="text-sm ink hover:accent-red transition-colors text-left inline-flex items-center gap-1.5"
                        >
                          <span className="ink-faded">▸</span>
                          {p.name}
                          <span className="ink-faded">— {statusConfig[p.status].label.toLowerCase()}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" className="border-b border-rule">
        <div className="max-w-3xl mx-auto px-4 py-14">
          <div className="rule mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold ink mb-2">Timeline</h2>
          <p className="ink-muted text-lg italic mb-10">
            Chronological sequence of every death and disappearance in the cluster.
          </p>

          <ol className="relative border-l-2 ml-3" style={{ borderColor: '#1c1917' }}>
            {sortedByDate.map((s) => (
              <li key={s.id} className="ml-6 mb-8">
                <span
                  className="absolute -left-[9px] w-4 h-4 rounded-full border-2"
                  style={{ background: '#f7f3ec', borderColor: statusConfig[s.status].tone }}
                />
                <div className="sans text-xs font-bold uppercase tracking-widest ink-faded mb-1">
                  {s.date}
                </div>
                <button
                  onClick={() => {
                    setOpen(s);
                    setActiveTab('circumstances');
                  }}
                  className="text-left"
                >
                  <h3 className="font-bold text-lg ink hover:accent-red transition-colors">{s.name}</h3>
                </button>
                <p className="ink-muted text-sm mt-1 italic">
                  {statusConfig[s.status].label} · {s.location}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* HISTORICAL PRECEDENT */}
      <section id="precedent" className="border-b border-rule bg-paper-deep">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <div className="rule mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold ink mb-2">This Has Happened Before</h2>
          <p className="ink-muted text-lg italic max-w-3xl mb-10">
            Six historical precedents that informed how the Eleven are being read. Each shaped the playbook for how clusters of scientist deaths are investigated, dismissed, or eventually confirmed.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            {historicalPrecedent.map((h) => (
              <article key={h.id} className="border-t-2 border-rule pt-5" style={{ borderTopColor: '#1c1917' }}>
                <div className="sans text-[10px] font-bold uppercase tracking-widest ink-faded mb-2">
                  {h.era} · {h.field}
                </div>
                <h3 className="text-xl font-bold ink mb-3">{h.name}</h3>
                <p className="text-sm ink leading-relaxed mb-3">{h.summary}</p>
                <div className="border-l-2 pl-3 mb-4" style={{ borderColor: '#991b1b' }}>
                  <p className="text-sm ink-muted leading-relaxed italic">
                    <strong className="accent-red not-italic">Why it matters: </strong>
                    {h.whyItMatters}
                  </p>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {h.sources.map((src) => (
                    <a
                      key={src.url}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sans text-xs ink-muted hover:accent-red inline-flex items-center gap-1 underline underline-offset-2"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {src.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS REFERENCE */}
      <section id="programs" className="border-b border-rule">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <div className="rule mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold ink mb-2">The Programs Explained</h2>
          <p className="ink-muted text-lg italic max-w-3xl mb-10">
            Why each institution matters — what the work is, why it's classified, and what it would mean to lose the personnel who run it.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.entries(programInfo).map(([key, info]) => (
              <div key={key} className="border border-rule bg-paper-deep p-4" style={{ borderTopWidth: 3, borderTopColor: info.accent }}>
                <h3 className="font-bold ink mb-2">{info.name}</h3>
                <p className="text-sm ink-muted leading-relaxed">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN QUESTIONS / TIP LINE */}
      <section id="open" className="border-b border-rule bg-paper-deep">
        <div className="max-w-3xl mx-auto px-4 py-14">
          <div className="rule mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold ink mb-6">Open Questions</h2>
          <ul className="space-y-4 mb-10">
            {[
              'Why has no federal agency publicly connected any two of the eleven cases as of April 21, 2026?',
              'What was discussed in the classified March 2026 congressional briefing on McCasland and its relationship to UAP programs?',
              'Why were both of Melissa Casias\'s phones factory-reset before she was reported missing?',
              'Why did Caltech\'s public statement on Carl Grillmair omit the words shot, killed, or murder?',
              'Who is Dallis Hardwick, the second Mondaloy co-inventor reported missing, and why has there been no public update?',
              'What is the status of the FBI examination announced by the White House Press Secretary?',
            ].map((q, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-serif text-3xl accent-red leading-none">{i + 1}.</span>
                <p className="ink leading-relaxed pt-1">{q}</p>
              </li>
            ))}
          </ul>

          <div className="border-2 p-5" style={{ borderColor: '#1c1917', background: '#fef9c3' }}>
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 ink mt-1 shrink-0" />
              <div>
                <h3 className="font-bold ink mb-1 sans uppercase tracking-wider text-sm">Confidential tip line</h3>
                <p className="text-sm ink leading-relaxed mb-3">
                  If you have information about any of the eleven cases — particularly first-hand professional knowledge of the institutions or programs named — the Bernalillo County Sheriff's tip line for the McCasland investigation remains active.
                </p>
                <p className="sans text-sm">
                  <span className="font-bold ink">McCasland tip line: </span>
                  <a href="tel:5054687070" className="accent-red font-bold underline">505-468-7070</a>
                </p>
                <p className="sans text-xs ink-faded mt-2 italic">
                  This site does not collect tips. Contact your local FBI field office or the agency above directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className="bg-paper">
        <div className="max-w-3xl mx-auto px-4 py-12 text-sm">
          <div className="rule mb-6" />
          <h2 className="text-2xl font-bold ink mb-4">Methodology & Sources</h2>
          <p className="ink-muted leading-relaxed mb-3">
            All eleven dossiers and six historical precedents were compiled from publicly-available reporting between April 10 and April 21, 2026. Primary anchors include the House Committee on Oversight and Government Reform letter dated April 21, 2026; reporting by Newsweek, CNN, the Washington Examiner, and NewsNation; and institutional statements from MIT, Caltech, NASA JPL, and the Los Alamos Reporter. No classified material has been used or referenced.
          </p>
          <p className="ink-muted leading-relaxed mb-3">
            Confidence badges are applied per claim:{' '}
            <strong className="ink">Verified</strong> indicates multi-source mainstream confirmation;{' '}
            <strong className="ink">Reported</strong> indicates single credible-source confirmation;{' '}
            <strong className="ink">Alleged</strong> indicates self-reported or single-witness claims;{' '}
            <strong className="ink">Under investigation</strong> indicates an active open case where details may change.
          </p>
          <p className="ink-muted leading-relaxed">
            Theories are presented as theories, not findings. All persons charged are presumed innocent until proven guilty. Portraits are anonymous editorial silhouettes — no AI-generated likenesses of the named individuals appear in this report.
          </p>
        </div>
      </section>

      {/* DOSSIER MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm overflow-y-auto"
            onClick={() => setOpen(null)}
          >
            <div className="min-h-screen flex items-start justify-center p-2 sm:p-6">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ type: 'spring', damping: 24, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
                className="missing-page font-serif w-full max-w-3xl my-4 shadow-2xl"
                style={{ background: '#f7f3ec' }}
              >
                {/* Modal header */}
                <div className="border-b border-rule sticky top-0 bg-paper-deep z-10 flex items-center justify-between px-4 py-3">
                  <div className="sans text-[10px] font-bold uppercase tracking-[0.25em] accent-red">
                    Dossier · №{String(missingScientists.findIndex((x) => x.id === open.id) + 1).padStart(2, '0')}
                  </div>
                  <button
                    onClick={() => setOpen(null)}
                    aria-label="Close dossier"
                    className="p-1 ink hover:accent-red transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal hero */}
                <div className="px-5 sm:px-8 pt-6 pb-5 border-b border-rule">
                  <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[120px_1fr] gap-4 sm:gap-6">
                    <figure className="border border-rule bg-paper-deep overflow-hidden">
                      <img
                        src={portraitMap[open.portrait]}
                        alt={`Editorial silhouette representing ${open.name}`}
                        className="w-full h-auto block grayscale"
                      />
                    </figure>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <ConfidenceBadge grade={open.confidence} />
                        <StatusPill status={open.status} />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold ink leading-tight mb-1.5">
                        {open.name}
                      </h2>
                      {open.age && <p className="ink-muted text-sm sans mb-2">Age {open.age}</p>}
                      <p className="ink-muted italic text-sm">{open.field}</p>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-xs sans ink-muted">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {open.date}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {open.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal tabs */}
                <div className="border-b border-rule overflow-x-auto scrollbar-hide">
                  <div className="flex gap-1 px-3 sans">
                    {([
                      ['background', 'Background'],
                      ['project', 'The Project'],
                      ['circumstances', 'Circumstances'],
                      ['theories', 'Theories'],
                      ['connections', 'Connections'],
                      ['sources', 'Sources'],
                    ] as const).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`px-3 py-2.5 text-xs font-bold uppercase tracking-widest whitespace-nowrap border-b-2 transition-colors ${
                          activeTab === key
                            ? 'ink border-current accent-red'
                            : 'ink-muted hover:ink border-transparent'
                        }`}
                        style={activeTab === key ? { borderColor: '#991b1b', color: '#991b1b' } : {}}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Modal content */}
                <div className="px-5 sm:px-8 py-6 text-base leading-relaxed">
                  {activeTab === 'background' && (
                    <>
                      <p className="ink mb-5">{open.background}</p>
                      <div className="border-l-2 pl-4 py-1" style={{ borderColor: programInfo[open.program].accent }}>
                        <div className="sans text-[10px] font-bold uppercase tracking-widest ink-faded mb-1">Program</div>
                        <h4 className="font-bold ink mb-1.5">{programInfo[open.program].name}</h4>
                        <p className="text-sm ink-muted leading-relaxed">{open.programBlurb}</p>
                      </div>
                    </>
                  )}
                  {activeTab === 'project' && <p className="ink">{open.theProject}</p>}
                  {activeTab === 'circumstances' && (
                    <>
                      <p className="ink mb-5">{open.circumstances}</p>
                      <div className="border-l-2 pl-4 py-1 sans" style={{ borderColor: '#1c1917' }}>
                        <div className="text-[10px] font-bold uppercase tracking-widest ink-faded mb-1">Official explanation</div>
                        <p className="text-sm ink leading-relaxed font-serif">{open.officialExplanation}</p>
                      </div>
                    </>
                  )}
                  {activeTab === 'theories' && (
                    <ul className="space-y-5">
                      {open.theories.map((t, i) => (
                        <li key={i} className="border-l-4 pl-4" style={{ borderColor: '#991b1b' }}>
                          <div className="sans text-[10px] font-bold uppercase tracking-widest accent-red mb-1.5">
                            Theory {i + 1} · {t.label}
                          </div>
                          <p className="ink text-base leading-relaxed">{t.body}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                  {activeTab === 'connections' && (
                    <ul className="space-y-3">
                      {open.connections.map((c, i) => (
                        <li key={i} className="flex gap-3">
                          <Network className="w-4 h-4 accent-red mt-1 shrink-0" />
                          <p className="ink leading-relaxed">{c}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                  {activeTab === 'sources' && (
                    <>
                      <p className="ink-muted text-sm italic mb-4">{open.confidenceNote}</p>
                      <ul className="space-y-2">
                        {open.sources.map((src) => (
                          <li key={src.url}>
                            <a
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="sans text-sm ink hover:accent-red inline-flex items-center gap-1.5 underline underline-offset-2"
                            >
                              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                              {src.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
