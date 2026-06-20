/**
 * PantheonPathTeaser — homepage XP/rank teaser.
 * Auto-shows the six Pantheon ranks and 7 starter achievements.
 */
import { Link } from 'react-router-dom';
import { Trophy, Sparkles, Award, Compass, Eye, Mountain, Activity, BookOpen, Star } from 'lucide-react';

interface Rank {
  name: string;
  minXp: number;
  color: string;
  description: string;
}

const PANTHEON_RANKS: Rank[] = [
  { name: 'Seeker', minXp: 0, color: '#94A3B8', description: 'You\'ve crossed the threshold.' },
  { name: 'Researcher', minXp: 250, color: '#22D3EE', description: 'Connecting patterns across files.' },
  { name: 'Pathfinder', minXp: 750, color: '#7C3AED', description: 'Forging your own line through the archive.' },
  { name: 'Archivist', minXp: 1500, color: '#D6B35A', description: 'Curator of verified history and lost knowledge.' },
  { name: 'Guardian', minXp: 3000, color: '#10b981', description: 'Steward of the signal — keeper of integrity.' },
  { name: 'Ascendant', minXp: 6000, color: '#E5F8FF', description: 'Architect of the next layer of disclosure.' },
];

interface Achievement {
  id: string;
  name: string;
  icon: typeof Compass;
  unlock: string;
  color: string;
}

const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-contact', name: 'First Contact', icon: Compass, unlock: 'Visit Pantheon for the first time', color: '#22D3EE' },
  { id: 'solar-watcher', name: 'Solar Watcher', icon: Sparkles, unlock: 'Open the Earth Pulse during an active solar storm', color: '#D6B35A' },
  { id: 'archive-explorer', name: 'Archive Explorer', icon: BookOpen, unlock: 'Open 10 distinct archive files', color: '#7C3AED' },
  { id: 'myth-hunter', name: 'Myth Hunter', icon: Eye, unlock: 'Read 5 mythology dossiers', color: '#D6B35A' },
  { id: 'earth-pulse', name: 'Earth Pulse Tracker', icon: Activity, unlock: 'Check the seismic feed for 7 consecutive days', color: '#10b981' },
  { id: 'codex-initiate', name: 'Codex Initiate', icon: Mountain, unlock: 'Complete the Source Literacy learning path', color: '#22D3EE' },
  { id: 'pantheon-founder', name: 'Pantheon Founder', icon: Star, unlock: 'Be active in the first 1,000 days of the platform', color: '#E5F8FF' },
];

export function PantheonPathTeaser() {
  return (
    <section aria-labelledby="path-h" className="relative px-3 sm:px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-realm-observatory font-mono">
            Pantheon Path
          </span>
          <span className="h-px flex-1 bg-realm-observatory/30" />
        </div>
        <h2 id="path-h" className="font-display text-3xl sm:text-4xl text-foreground mb-2">
          Your <span className="text-realm-observatory">Journey</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
          Six ranks. Seven starter achievements. Earn XP by reading archives, completing learning paths,
          watching verified sources, and returning daily.
        </p>

        {/* Ranks */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
          {PANTHEON_RANKS.map((r, i) => (
            <div
              key={r.name}
              className="rounded-xl border bg-card/40 backdrop-blur p-3 text-center transition hover:bg-card/60"
              style={{ borderColor: `${r.color}55` }}
            >
              <Trophy className="w-5 h-5 mx-auto mb-2" style={{ color: r.color }} />
              <div className="text-[9px] uppercase tracking-[1.5px] font-mono text-muted-foreground">
                Rank {String(i + 1).padStart(2, '0')}
              </div>
              <div className="font-display text-sm" style={{ color: r.color }}>{r.name}</div>
              <div className="text-[10px] text-muted-foreground font-mono mt-1">
                {r.minXp.toLocaleString()} XP
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <h3 className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono mb-3">
          Starter Achievements
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 mb-6">
          {ACHIEVEMENTS.map((a) => (
            <div
              key={a.id}
              className="rounded-lg border bg-card/30 backdrop-blur p-3 text-center transition hover:bg-card/60"
              style={{ borderColor: `${a.color}33` }}
              title={a.unlock}
            >
              <div className="w-9 h-9 mx-auto rounded-full border flex items-center justify-center mb-2"
                style={{ borderColor: `${a.color}66`, background: `${a.color}11` }}>
                <a.icon className="w-4 h-4" style={{ color: a.color }} />
              </div>
              <div className="text-[10px] font-display leading-tight" style={{ color: a.color }}>
                {a.name}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary/15 border border-primary/50 text-foreground hover:bg-primary/25 transition text-sm font-medium"
          >
            <Award className="w-4 h-4" /> View My Profile
          </Link>
          <Link
            to="/academy"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-card/50 text-foreground hover:bg-card/80 transition text-sm font-medium"
          >
            <BookOpen className="w-4 h-4" /> Earn XP at the Academy
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PantheonPathTeaser;
