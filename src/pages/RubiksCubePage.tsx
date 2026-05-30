import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Radio,
  Eye,
  Brain,
  FileWarning,
  ScanLine,
  ExternalLink,
  ArrowLeft,
  Calendar,
  Users,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  XCircle,
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import heroImg from '@/assets/black-programs/rubiks-hero-wide.jpg';
import cubeImg from '@/assets/black-programs/rubiks-cube.jpg';

/**
 * Rubik's Cube — dedicated deep-dive page.
 * A cinematic, single-topic dossier covering today's status, key findings,
 * and what is publicly verifiable vs. speculative about the alleged
 * UAP retrieval / psionic-pilot program surfaced in 2024-2025.
 */

const CRIMSON = '#DC2626';
const CRIMSON_SOFT = '#fee2e2';
const MONO = "'Space Mono', monospace";

interface TimelineItem {
  date: string;
  title: string;
  body: string;
}

const timeline: TimelineItem[] = [
  {
    date: '2017',
    title: 'AATIP / To The Stars era',
    body: 'Luis Elizondo exits AATIP. Tic Tac, GIMBAL and GoFast footage enter the public record — the cultural runway for later SAP disclosures.',
  },
  {
    date: 'Jul 2023',
    title: 'Grusch testifies to Congress',
    body: 'Former intel officer David Grusch tells House Oversight that the U.S. operates a decades-long, multi-vehicle UAP retrieval and reverse-engineering program. Names withheld in open session.',
  },
  {
    date: 'Dec 2024',
    title: 'Jake Barber goes on-record',
    body: 'Former USAF Lt. Col. Jake Barber surfaces on NewsNation\'s Reality Check with Ross Coulthart and Matt Ford, describing a compartmented retrieval program internally referenced as "Rubik\'s Cube".',
  },
  {
    date: 'Jan 7 2025',
    title: 'Shawn Ryan Show interview drops',
    body: 'Barber, joined by Matt Adams, delivers a 4-hour testimony describing the recovery of an intact egg-shaped craft, the use of trained "psionic" operators to summon it, and material that allegedly rearranges its internal lattice when handled.',
  },
  {
    date: 'Jan-Mar 2025',
    title: 'Corroborating press cycle',
    body: 'Liberation Times (Christopher Sharp) runs independent sourcing. Coulthart and Ford continue weekly NewsNation segments. Tim Gallaudet (former NOAA) lends adjacent credibility on safety-of-flight concerns.',
  },
  {
    date: '2025 → today',
    title: 'Skywatcher / Merlin civilian effort',
    body: 'Barber\'s post-service team — referenced as Skywatcher / Merlin — claims to be running private retrieval ops with psionic operators outside the SAP. AARO maintains no verified evidence of a non-human craft program exists. Congressional UAP Disclosure Act stalls in Senate conference.',
  },
];

interface VerdictItem {
  icon: typeof CheckCircle2;
  color: string;
  label: string;
  body: string;
}

const publiclyKnown: VerdictItem[] = [
  {
    icon: CheckCircle2,
    color: '#10b981',
    label: 'On-record testimony exists',
    body: 'Jake Barber and Matt Adams are real, identified people who appeared on Shawn Ryan Show and NewsNation under their own names with verifiable service records.',
  },
  {
    icon: CheckCircle2,
    color: '#10b981',
    label: 'The term "Rubik\'s Cube" was used publicly',
    body: 'The codename — whether internal label, nickname, or post-hoc descriptor — was introduced into the public record by Barber and amplified by Coulthart and Ford.',
  },
  {
    icon: CheckCircle2,
    color: '#10b981',
    label: 'Skywatcher / Merlin is a real entity',
    body: 'Barber\'s civilian "Skywatcher" team is a real, named effort with a website, public ops, and recorded interviews.',
  },
  {
    icon: CheckCircle2,
    color: '#10b981',
    label: 'Congress is engaged',
    body: 'The 2023 Schumer-Rounds UAP Disclosure Act and the 2024-25 House Oversight UAP hearings explicitly reference unacknowledged SAPs and call for an eminent-domain transfer of recovered material.',
  },
];

const reported: VerdictItem[] = [
  {
    icon: HelpCircle,
    color: '#f59e0b',
    label: 'The "egg" retrieval',
    body: 'A photo of an alleged intact egg-shaped craft was presented during interviews. Chain-of-custody, location, and verification are not in the public record.',
  },
  {
    icon: HelpCircle,
    color: '#f59e0b',
    label: 'Psionic-summoning protocol',
    body: 'Barber describes trained operators who mentally summon craft prior to recovery. The claim is unfalsifiable by current public methods — no peer-reviewed protocol, no third-party replication.',
  },
  {
    icon: HelpCircle,
    color: '#f59e0b',
    label: 'Self-reconfiguring material',
    body: 'The cube namesake — material that allegedly rearranges its internal lattice when handled — has not been independently sampled, imaged, or published in any open scientific record.',
  },
  {
    icon: HelpCircle,
    color: '#f59e0b',
    label: 'Multiple retrievals',
    body: 'Barber implies "Rubik\'s Cube" is one of several active retrieval lines run through aerospace primes. No specific contractor, facility, or program element number has been confirmed.',
  },
];

const speculative: VerdictItem[] = [
  {
    icon: XCircle,
    color: '#ef4444',
    label: 'Specific program-element number',
    body: 'No PE number, SAR control channel, or codeword has been entered into the public record. "Rubik\'s Cube" may be a colloquialism, a real bigot-list codeword, or a composite name across multiple compartments.',
  },
  {
    icon: XCircle,
    color: '#ef4444',
    label: 'Facility locations',
    body: 'Speculation ranges across Wright-Patterson, S4/Area 51, Sandia, Lockheed Skunk Works, and various LM/Northrop/Raytheon black sites. None has been confirmed by named witnesses.',
  },
  {
    icon: XCircle,
    color: '#ef4444',
    label: 'NHI craft origin',
    body: 'Whether recovered objects are non-human-intelligence, exotic black-project terrestrial tech, or an intelligence-operation construct remains unresolved. Each model has named proponents.',
  },
  {
    icon: XCircle,
    color: '#ef4444',
    label: 'Consciousness-active matter',
    body: 'The strongest claim — that material responds to operator consciousness — has no peer-reviewed replication and would, if true, overturn substantial portions of physics.',
  },
];

interface Person {
  name: string;
  role: string;
  context: string;
}

const people: Person[] = [
  { name: 'Jake Barber', role: 'Source / Operator (alleged)', context: 'Former USAF Lt. Col., helicopter test pilot. Primary on-record witness for Rubik\'s Cube. Founder of Skywatcher / Merlin.' },
  { name: 'Matt Adams', role: 'Co-witness', context: 'Joined Barber on Shawn Ryan Show. Describes himself as a psionic operator on the retrieval team.' },
  { name: 'Ross Coulthart', role: 'Journalist', context: 'NewsNation Reality Check anchor. Has carried the Rubik\'s Cube reporting since Barber went on record.' },
  { name: 'Matt Ford', role: 'Journalist', context: 'Good Trouble Show, NewsNation contributor. Weekly follow-ups and independent sourcing.' },
  { name: 'Shawn Ryan', role: 'Platform', context: 'Former Navy SEAL, host of the Shawn Ryan Show. Released the long-form Barber/Adams interview.' },
  { name: 'David Grusch', role: 'Predecessor witness', context: 'Former NGA / NRO intel officer. 2023 House Oversight testimony established the precedent of a multi-vehicle SAP.' },
  { name: 'Christopher Sharp', role: 'Investigative reporter', context: 'Liberation Times. Independent corroborating sourcing on Skywatcher and adjacent SAP activity.' },
  { name: 'Tim Gallaudet', role: 'Adjacent credibility', context: 'Former NOAA Administrator, retired Rear Admiral. Public on safety-of-flight implications.' },
];

interface SourceLink {
  label: string;
  url: string;
}

const sources: SourceLink[] = [
  { label: 'Shawn Ryan Show — Jake Barber / Matt Adams (full interview)', url: 'https://www.youtube.com/@ShawnRyanShow' },
  { label: 'NewsNation — Reality Check with Ross Coulthart', url: 'https://www.newsnationnow.com/space/ufo/' },
  { label: 'Liberation Times — UAP investigations (Christopher Sharp)', url: 'https://www.liberationtimes.com/' },
  { label: 'Good Trouble Show — Matt Ford', url: 'https://www.youtube.com/@goodtroubleshow' },
  { label: 'Skywatcher (Barber\'s civilian retrieval team)', url: 'https://www.skywatcher.us/' },
  { label: 'House Oversight UAP Hearing — Grusch testimony (Jul 2023)', url: 'https://oversight.house.gov/hearing/unidentified-anomalous-phenomena-implications-on-national-security-public-safety-and-government-transparency/' },
];

export function RubiksCubePage() {
  return (
    <>
      <SEO
        title="Rubik's Cube — The Alleged UAP Program | Pantheon"
        description="Today's status, key findings, and the line between what is publicly known and what is speculative about the alleged Rubik's Cube UAP retrieval and psionic-pilot program."
        canonical="/rubiks-cube"
      />

      <div
        className="min-h-screen text-foreground"
        style={{ background: 'radial-gradient(ellipse at top, #0d0204 0%, #050103 55%, #000 100%)' }}
      >
        {/* === HERO === */}
        <section className="relative w-full overflow-hidden">
          <div className="relative aspect-[21/10] md:aspect-[21/9] w-full">
            <img
              src={heroImg}
              alt="Rubik's Cube — alleged UAP retrieval program visual"
              width={1920}
              height={1080}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(5,1,3,0.55) 0%, rgba(5,1,3,0.4) 45%, rgba(5,1,3,0.98) 100%)',
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, rgba(220,38,38,0.22) 0px, rgba(220,38,38,0.22) 1px, transparent 1px, transparent 3px)',
              }}
            />

            {/* Back link */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6">
              <Link
                to="/black-programs"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-[0.25em] border rounded backdrop-blur-sm"
                style={{
                  color: CRIMSON_SOFT,
                  borderColor: 'rgba(220,38,38,0.5)',
                  background: 'rgba(5,1,3,0.5)',
                  fontFamily: MONO,
                }}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                BLACK PROGRAMS
              </Link>
            </div>

            {/* Classification strip */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6">
              <div
                className="inline-flex items-center gap-2 px-2.5 py-1 text-[10px] font-bold tracking-[0.3em] border"
                style={{
                  color: CRIMSON,
                  borderColor: CRIMSON,
                  background: 'rgba(220,38,38,0.1)',
                  fontFamily: MONO,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: CRIMSON }} />
                UNACKNOWLEDGED SAP // CRITICAL READ
              </div>
            </div>

            {/* Title block */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10 lg:p-14">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div
                  className="flex items-center gap-2 mb-3 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em]"
                  style={{ color: CRIMSON }}
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Dedicated Dossier · 2024-2025 Disclosure Wave
                </div>
                <h1
                  className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-4"
                  style={{ color: CRIMSON_SOFT, fontFamily: "'Cinzel', serif" }}
                >
                  Rubik&rsquo;s Cube
                </h1>
                <p
                  className="text-sm md:text-lg max-w-3xl leading-relaxed opacity-90"
                  style={{ color: CRIMSON_SOFT }}
                >
                  The program they&rsquo;re not telling us about — and what we can actually verify
                  today. A retrieval &amp; reverse-engineering effort, allegedly run outside
                  congressional oversight, named for material said to reconfigure its own internal
                  geometry like a cube being turned.
                </p>

                {/* Status row */}
                <div className="mt-5 flex flex-wrap gap-2 md:gap-3">
                  <StatusChip icon={Radio} label="Status today" value="Active disclosure cycle" />
                  <StatusChip icon={ScanLine} label="Confidence" value="REPORTED · uncorroborated by AARO" />
                  <StatusChip icon={Calendar} label="Surface date" value="Dec 2024 – present" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* === STATUS TODAY === */}
        <Section icon={Radio} eyebrow="Signal Check" title="Where it stands today">
          <div className="grid gap-4 md:grid-cols-3">
            <StatusCard
              tone="warn"
              title="On the record"
              body="Barber, Adams, Coulthart and Ford are still publicly active. The Shawn Ryan interview remains the foundational primary source."
            />
            <StatusCard
              tone="alert"
              title="Officially denied"
              body="AARO Director Jon Kosloski has testified that no verified evidence of a non-human craft retrieval program exists in records reviewed to date."
            />
            <StatusCard
              tone="info"
              title="Civilian continuation"
              body="Skywatcher / Merlin claims to be running private retrieval operations with psionic operators outside the SAP — generating ongoing case material."
            />
          </div>

          <p className="mt-6 text-sm md:text-base leading-relaxed opacity-85 max-w-3xl">
            The legislative front has cooled since the 2023 UAP Disclosure Act was stripped of its
            eminent-domain teeth in conference, but House Oversight continues to hold UAP-adjacent
            hearings. The press front is the opposite — NewsNation, Liberation Times and Good
            Trouble Show have kept Rubik&rsquo;s Cube in active news rotation throughout 2025.
          </p>
        </Section>

        {/* === TIMELINE === */}
        <Section icon={Calendar} eyebrow="Chronology" title="How we got here">
          <ol className="relative border-l-2 space-y-6 pl-6 ml-2" style={{ borderColor: 'rgba(220,38,38,0.35)' }}>
            {timeline.map((item, i) => (
              <motion.li
                key={item.date}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="relative"
              >
                <span
                  className="absolute -left-[34px] top-1.5 w-3 h-3 rounded-full border-2"
                  style={{ background: '#050103', borderColor: CRIMSON }}
                />
                <div
                  className="text-[10px] font-bold tracking-[0.3em] mb-1"
                  style={{ color: CRIMSON, fontFamily: MONO }}
                >
                  {item.date.toUpperCase()}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-1" style={{ color: CRIMSON_SOFT }}>
                  {item.title}
                </h3>
                <p className="text-sm md:text-[15px] opacity-85 leading-relaxed max-w-2xl">{item.body}</p>
              </motion.li>
            ))}
          </ol>
        </Section>

        {/* === KEY FINDINGS / VERDICT MATRIX === */}
        <Section icon={Eye} eyebrow="Findings Matrix" title="Public vs. speculative">
          <div className="grid gap-5 lg:grid-cols-3">
            <VerdictColumn
              title="Publicly known"
              subtitle="Verifiable in the open record"
              accent="#10b981"
              items={publiclyKnown}
            />
            <VerdictColumn
              title="Reported, unverified"
              subtitle="Claimed on the record but uncorroborated"
              accent="#f59e0b"
              items={reported}
            />
            <VerdictColumn
              title="Speculative"
              subtitle="Inference, rumor, or contested"
              accent="#ef4444"
              items={speculative}
            />
          </div>
        </Section>

        {/* === THE CUBE MATERIAL === */}
        <Section icon={Brain} eyebrow="Core Claim" title="The cube — what it allegedly is">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-xl border" style={{ borderColor: 'rgba(220,38,38,0.4)' }}>
              <img
                src={cubeImg}
                alt="Rubik's Cube — alleged self-reconfiguring craft material"
                loading="lazy"
                width={1024}
                height={1280}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, rgba(220,38,38,0.25) 0px, rgba(220,38,38,0.25) 1px, transparent 1px, transparent 3px)',
                }}
              />
            </div>
            <div className="space-y-4 text-sm md:text-[15px] leading-relaxed opacity-90">
              <p>
                The name &ldquo;Rubik&rsquo;s Cube&rdquo; reportedly comes from a behavior described by
                operators inside the alleged program: when recovered material samples are handled, their
                internal lattice physically rearranges — like the faces of a puzzle cube turning to
                present new geometry.
              </p>
              <p>
                Barber describes this as a hallmark of <em>consciousness-responsive matter</em> — material
                whose state depends on the observer&rsquo;s focused intent. In the program&rsquo;s framing,
                the same property is what allows trained operators to summon and recover the craft in
                the first place.
              </p>
              <p>
                If literally true, the claim would represent a class of physics that is currently
                undocumented in peer-reviewed literature. If metaphorically true — describing, for
                example, a programmable metamaterial — it would still constitute a generational leap
                in materials science. Either reading carries enormous implications, which is why the
                burden of evidence is correspondingly high.
              </p>
              <BlockQuote
                quote="The material doesn't just sit there. You handle it, the inside changes. That's where the name comes from."
                attribution="Paraphrase of on-record description, Shawn Ryan Show, Jan 2025"
              />
            </div>
          </div>
        </Section>

        {/* === PEOPLE === */}
        <Section icon={Users} eyebrow="Roster" title="People & sources linked to the claim">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {people.map((p) => (
              <div
                key={p.name}
                className="p-4 rounded-lg border backdrop-blur-sm"
                style={{
                  borderColor: 'rgba(220,38,38,0.25)',
                  background: 'linear-gradient(180deg, rgba(20,5,8,0.7) 0%, rgba(10,2,4,0.7) 100%)',
                }}
              >
                <div className="text-base font-bold mb-0.5" style={{ color: CRIMSON_SOFT }}>
                  {p.name}
                </div>
                <div
                  className="text-[10px] font-bold tracking-[0.2em] mb-2 uppercase"
                  style={{ color: CRIMSON, fontFamily: MONO }}
                >
                  {p.role}
                </div>
                <p className="text-[13px] leading-relaxed opacity-85">{p.context}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* === SKEPTICAL READ === */}
        <Section icon={FileWarning} eyebrow="Counter-read" title="The skeptical case">
          <div
            className="p-5 md:p-7 rounded-xl border space-y-4 text-sm md:text-[15px] leading-relaxed"
            style={{
              borderColor: 'rgba(220,38,38,0.3)',
              background: 'linear-gradient(180deg, rgba(20,5,8,0.7) 0%, rgba(8,2,4,0.7) 100%)',
            }}
          >
            <p>
              The Pentagon&rsquo;s All-domain Anomaly Resolution Office (AARO) has stated in
              testimony that, across records it has reviewed, it has not found evidence of a
              non-human craft retrieval or reverse-engineering program. Skeptical analysts
              including Mick West and Steven Greenstreet argue that:
            </p>
            <ul className="list-disc list-inside space-y-2 marker:text-[color:var(--c)]" style={{ ['--c' as never]: CRIMSON }}>
              <li>The imagery shown lacks chain-of-custody and could not be independently authenticated.</li>
              <li>The &ldquo;psionic-summoning&rdquo; mechanism is unfalsifiable by any current public protocol.</li>
              <li>The codename surfaces only through paid interview platforms, not via leaks to legacy outlets or oversight referrals.</li>
              <li>The 2024-25 disclosure wave correlates with monetized podcast cycles and book launches.</li>
            </ul>
            <p>
              None of this falsifies the claim — but it sets the bar for what would: a sample
              entered into peer review, a corroborating named insider with documents, or an IG /
              Senate Intelligence reference to a real bigot-list codename.
            </p>
          </div>
        </Section>

        {/* === SOURCES === */}
        <Section icon={Sparkles} eyebrow="Source Index" title="Where to read & watch directly">
          <div className="grid gap-2 md:grid-cols-2">
            {sources.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 px-4 py-3 rounded-lg border transition-colors"
                style={{
                  borderColor: 'rgba(220,38,38,0.25)',
                  background: 'rgba(15,3,6,0.55)',
                }}
              >
                <span className="text-sm font-medium" style={{ color: CRIMSON_SOFT }}>
                  {s.label}
                </span>
                <ExternalLink
                  className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ color: CRIMSON }}
                />
              </a>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/black-programs"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold tracking-[0.25em] rounded border"
              style={{
                color: CRIMSON_SOFT,
                borderColor: CRIMSON,
                background: 'rgba(220,38,38,0.12)',
                fontFamily: MONO,
              }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              BACK TO BLACK PROGRAMS VAULT
            </Link>
            <Link
              to="/whistleblowers"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold tracking-[0.25em] rounded border"
              style={{
                color: CRIMSON_SOFT,
                borderColor: 'rgba(220,38,38,0.4)',
                background: 'rgba(15,3,6,0.55)',
                fontFamily: MONO,
              }}
            >
              WHISTLEBLOWER VAULT
            </Link>
          </div>
        </Section>

        <div className="h-16" />
      </div>
    </>
  );
}

/* =================== sub-components =================== */

function Section({
  icon: Icon,
  eyebrow,
  title,
  children,
}: {
  icon: typeof Radio;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-16">
      <div
        className="flex items-center gap-2 mb-2 text-[10px] md:text-[11px] font-bold tracking-[0.3em] uppercase"
        style={{ color: CRIMSON, fontFamily: MONO }}
      >
        <Icon className="w-3.5 h-3.5" />
        {eyebrow}
      </div>
      <h2
        className="text-2xl md:text-4xl font-bold mb-6 md:mb-8"
        style={{ color: CRIMSON_SOFT, fontFamily: "'Cinzel', serif" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function StatusChip({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Radio;
  label: string;
  value: string;
}) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded border text-[11px] backdrop-blur-sm"
      style={{
        borderColor: 'rgba(220,38,38,0.35)',
        background: 'rgba(10,2,4,0.55)',
        color: CRIMSON_SOFT,
        fontFamily: MONO,
      }}
    >
      <Icon className="w-3.5 h-3.5" style={{ color: CRIMSON }} />
      <span className="opacity-60 tracking-[0.2em]">{label.toUpperCase()}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

function StatusCard({
  tone,
  title,
  body,
}: {
  tone: 'warn' | 'alert' | 'info';
  title: string;
  body: string;
}) {
  const tones = {
    warn: { border: 'rgba(245,158,11,0.4)', glow: '#f59e0b' },
    alert: { border: 'rgba(220,38,38,0.5)', glow: CRIMSON },
    info: { border: 'rgba(34,211,238,0.4)', glow: '#22d3ee' },
  }[tone];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="relative p-5 rounded-xl border backdrop-blur-sm overflow-hidden"
      style={{
        borderColor: tones.border,
        background: 'linear-gradient(180deg, rgba(20,5,8,0.7) 0%, rgba(8,2,4,0.7) 100%)',
      }}
    >
      <div
        className="absolute -top-px left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${tones.glow}, transparent)` }}
      />
      <h3 className="text-base md:text-lg font-bold mb-2" style={{ color: CRIMSON_SOFT }}>
        {title}
      </h3>
      <p className="text-[13px] md:text-sm opacity-85 leading-relaxed">{body}</p>
    </motion.div>
  );
}

function VerdictColumn({
  title,
  subtitle,
  accent,
  items,
}: {
  title: string;
  subtitle: string;
  accent: string;
  items: VerdictItem[];
}) {
  return (
    <div
      className="rounded-xl border p-5 space-y-4"
      style={{
        borderColor: `${accent}55`,
        background: 'linear-gradient(180deg, rgba(15,4,7,0.7) 0%, rgba(8,2,4,0.7) 100%)',
      }}
    >
      <div>
        <div
          className="text-[10px] font-bold tracking-[0.3em] uppercase mb-1"
          style={{ color: accent, fontFamily: MONO }}
        >
          {subtitle}
        </div>
        <h3 className="text-xl font-bold" style={{ color: CRIMSON_SOFT }}>
          {title}
        </h3>
      </div>
      <ul className="space-y-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.label} className="flex gap-3">
              <Icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: item.color }} />
              <div>
                <div className="text-[13px] font-bold" style={{ color: CRIMSON_SOFT }}>
                  {item.label}
                </div>
                <p className="text-[12.5px] opacity-80 leading-relaxed mt-0.5">{item.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function BlockQuote({ quote, attribution }: { quote: string; attribution: string }) {
  return (
    <blockquote
      className="border-l-2 pl-4 py-1 italic text-sm md:text-base opacity-90"
      style={{ borderColor: CRIMSON, color: CRIMSON_SOFT }}
    >
      &ldquo;{quote}&rdquo;
      <footer
        className="not-italic mt-1 text-[10px] font-bold tracking-[0.25em] opacity-70"
        style={{ color: CRIMSON, fontFamily: MONO }}
      >
        — {attribution.toUpperCase()}
      </footer>
    </blockquote>
  );
}
