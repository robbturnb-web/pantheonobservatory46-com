import { SEO } from '@/components/SEO';
import { Link } from 'react-router-dom';
import { FileText, Users, Youtube, Archive } from 'lucide-react';

const SECTIONS = [
  { label: 'The 46 Vault', count: 'static', icon: Archive, path: '/the-46' },
  { label: 'Experts Index', count: 'static', icon: Users, path: '/experts' },
  { label: 'YouTube Resources', count: '0 (empty)', icon: Youtube, path: '/documentaries' },
  { label: 'Documentaries', count: 'static', icon: FileText, path: '/documentaries' },
];

export default function ContentManagerPage() {
  return (
    <>
      <SEO title="Content Manager — Pantheon" description="Manage Pantheon content collections." />
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <header className="mb-8">
          <h1 className="font-display text-3xl">Content Manager</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Read-only catalog view. Editable CRUD lands in Phase 3 once each collection is migrated from static <code>src/data/*</code> to backend tables.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SECTIONS.map(({ label, count, icon: Icon, path }) => (
            <Link key={label} to={path} className="p-5 rounded-2xl border border-border bg-card/40 hover:border-primary/50 transition-all">
              <Icon className="w-6 h-6 text-primary mb-3" />
              <div className="font-display text-lg">{label}</div>
              <div className="text-xs text-muted-foreground mt-1">{count}</div>
            </Link>
          ))}
        </div>

        <div className="mt-10 p-5 rounded-2xl border border-dashed border-border/60 bg-card/20 text-sm text-muted-foreground">
          <strong className="text-foreground">Phase 3 plan:</strong> migrate static collections into Lovable Cloud tables with admin RLS,
          enable inline editing, version history, and publish/draft workflow.
        </div>
      </div>
    </>
  );
}
