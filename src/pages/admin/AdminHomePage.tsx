import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Shield, Activity, Database, FileText, Map, Pyramid, Newspaper, GitBranch, Heart, Link2 } from 'lucide-react';

const TILES = [
  { to: '/diagnostics', icon: Activity, title: 'Live Diagnostics', desc: 'Edge function + live-data health' },
  { to: '/admin/link-scanner', icon: Link2, title: 'Link Scanner', desc: 'Crawl every tracked URL' },
  { to: '/source-manager', icon: Database, title: 'Source Manager', desc: 'Verify every external URL' },
  { to: '/content-manager', icon: FileText, title: 'Content Manager', desc: 'Vault, experts, YouTube' },
  { to: '/observatory', icon: Map, title: 'Observatory Map', desc: 'Global live event globe' },
  { to: '/pyramids/scanner', icon: Pyramid, title: 'Pyramid Scanner', desc: 'Scan foundations & alignments' },
  { to: '/admin/briefing', icon: Newspaper, title: 'Briefing Composer', desc: 'Curate the daily disclosure note' },
  { to: '/briefing', icon: Newspaper, title: 'Public Briefing', desc: 'Live composed briefing' },
  { to: '/roadmap', icon: GitBranch, title: 'Roadmap', desc: 'Version targets' },
  { to: '/changelog', icon: FileText, title: 'Changelog', desc: 'Shipped per build' },
  { to: '/system-status', icon: Heart, title: 'System Status', desc: 'Live infra health' },
];

export default function AdminHomePage() {
  return (
    <>
      <SEO title="Command Center — Pantheon" description="Admin command center for Pantheon Frequency 46." />
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        <header className="mb-8 sm:mb-10 flex items-center gap-3 sm:gap-4">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-primary/10 border border-primary/30 shrink-0">
            <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-2xl sm:text-4xl tracking-tight truncate">Command Center</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Admin clearance verified.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TILES.map(({ to, icon: Icon, title, desc }) => (
            <Link
              key={to}
              to={to}
              className="group p-5 rounded-2xl border border-border bg-card/50 backdrop-blur hover:border-primary/50 hover:bg-card/80 transition-all"
            >
              <Icon className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <div className="font-display text-lg">{title}</div>
              <div className="text-xs text-muted-foreground mt-1">{desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
