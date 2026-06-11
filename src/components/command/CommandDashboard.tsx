import {
  Sparkles, Star, Mountain, Waves, Eye, Pyramid, Dna, Activity,
} from 'lucide-react';
import { CommandCard } from './CommandCard';

const CARDS = [
  { to: '/gods',        title: 'Gods & Mythology',   desc: 'Pantheons, archetypes, deep deity dossiers.',   Icon: Sparkles, accent: 'text-amber-300' },
  { to: '/star-seed',   title: 'Starseed Archive',   desc: 'Origins, lineages, and the awakening codex.',   Icon: Star,     accent: 'text-cyan-300' },
  { to: '/antarctica',  title: 'Antarctica Files',   desc: 'Frozen anomalies, expeditions, suppressed maps.',Icon: Mountain, accent: 'text-sky-300' },
  { to: '/atlantis',    title: 'Atlantis Archive',   desc: 'Lost civilizations and pre-flood evidence.',    Icon: Waves,    accent: 'text-teal-300' },
  { to: '/uap',         title: 'UAP / Disclosure',   desc: 'Case files, hearings, declassified records.',   Icon: Eye,      accent: 'text-emerald-300' },
  { to: '/pyramids',    title: 'Pyramids & Ancient Tech', desc: 'Megaliths, stellar alignments, lost engineering.', Icon: Pyramid, accent: 'text-yellow-300' },
  { to: '/species',     title: 'Bloodline & RH Research', desc: 'Genetic anomalies, RH-negative inquiry.',  Icon: Dna,      accent: 'text-fuchsia-300' },
  { to: '/live-feeds',  title: 'Live Intelligence Hub', desc: 'Solar, orbital, geologic and signal watch.', Icon: Activity, accent: 'text-primary' },
];

export function CommandDashboard() {
  return (
    <section className="relative z-10 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <p className="text-[10px] uppercase tracking-[4px] text-primary mb-2">Command Center</p>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            Pantheon Dashboard
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
            Every chamber of the observatory, one tap away.
          </p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CARDS.map((c) => <CommandCard key={c.to} {...c} />)}
        </div>
      </div>
    </section>
  );
}

export default CommandDashboard;
