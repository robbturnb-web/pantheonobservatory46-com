import { SEO } from '@/components/SEO';

interface Entry { date: string; version: string; changes: string[]; }

const CHANGELOG: Entry[] = [
  {
    date: '2026-06-10',
    version: 'v0.9.0',
    changes: [
      'Phase 2 stabilization: admin gating, source verification backend, briefing framework',
      'New admin tools: /admin, /source-manager, /content-manager',
      'Public dev trackers: /roadmap, /changelog, /system-status',
      'live-data-proxy: graceful upstream-failure fallback (no more 502 blank screens)',
      'YouTube placeholders removed',
    ],
  },
  {
    date: '2026-06-09',
    version: 'v0.8.5',
    changes: ['Apple sign-in on /auth (signin + signup)', 'SolarEventsPanel duplicate key fix'],
  },
];

export default function ChangelogPage() {
  return (
    <>
      <SEO title="Changelog — Pantheon" description="Shipped builds for Pantheon Frequency 46." />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="font-display text-4xl mb-2">Changelog</h1>
        <p className="text-sm text-muted-foreground mb-10">What shipped, when.</p>
        <div className="space-y-8">
          {CHANGELOG.map((e) => (
            <div key={e.version} className="border-l-2 border-primary/40 pl-5">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-sm text-primary">{e.version}</span>
                <span className="text-xs text-muted-foreground">{e.date}</span>
              </div>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {e.changes.map((c) => <li key={c}>· {c}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
