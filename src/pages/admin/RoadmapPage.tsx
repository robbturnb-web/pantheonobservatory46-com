import { SEO } from '@/components/SEO';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

type Status = 'done' | 'active' | 'planned';
interface Milestone { version: string; title: string; status: Status; items: string[]; }

const ROADMAP: Milestone[] = [
  {
    version: 'v0.9',
    title: 'Stabilization Pass',
    status: 'active',
    items: [
      'Admin gating on /diagnostics, /style-guide, /admin, /content-manager, /source-manager',
      'source_health backend + edge checker',
      'Disclosure briefing framework',
      'Observatory map dedup',
      'Mobile responsiveness sweep',
    ],
  },
  {
    version: 'v1.0',
    title: 'Public Launch',
    status: 'planned',
    items: [
      'Pyramid Scanner v1 (LIDAR overlay)',
      'Content Manager CRUD',
      'Echo voice mode polish',
      'PWA offline-first',
      'App store readiness pack',
    ],
  },
  {
    version: 'v1.1',
    title: 'Community + Live',
    status: 'planned',
    items: [
      'Live Disclosure Briefing daily auto-publish',
      'Community testimony moderation queue',
      'Echoverse threading',
    ],
  },
];

const ICON: Record<Status, JSX.Element> = {
  done: <CheckCircle2 className="w-5 h-5 text-signal-online" />,
  active: <Loader2 className="w-5 h-5 text-primary animate-spin" />,
  planned: <Circle className="w-5 h-5 text-muted-foreground" />,
};

export default function RoadmapPage() {
  return (
    <>
      <SEO title="Roadmap — Pantheon" description="Pantheon Frequency 46 product roadmap." />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="font-display text-4xl mb-2">Roadmap</h1>
        <p className="text-sm text-muted-foreground mb-10">Public dev tracker. Updated as milestones ship.</p>
        <div className="space-y-6">
          {ROADMAP.map((m) => (
            <div key={m.version} className="p-6 rounded-2xl border border-border bg-card/40 backdrop-blur">
              <div className="flex items-center gap-3 mb-4">
                {ICON[m.status]}
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{m.version}</div>
                  <div className="font-display text-xl">{m.title}</div>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                {m.items.map((it) => (
                  <li key={it} className="flex gap-2 text-muted-foreground">
                    <span className="text-primary">·</span>{it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
