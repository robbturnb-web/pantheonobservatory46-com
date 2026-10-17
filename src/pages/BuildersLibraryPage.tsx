import { SEO } from '@/components/SEO';
import { buildersLibrary, type LibraryEntry } from '@/data/builders-library';
import { Book, Video, FileText, ExternalLink, Bookmark } from 'lucide-react';
import { toast } from 'sonner';
import { isArchived, saveToArchive } from '@/lib/archive';

const formatIcon: Record<LibraryEntry['format'], typeof Book> = {
  Book, Source: FileText, Video, Paper: FileText,
};

const categoryColor: Record<string, string> = {
  'Ancient History': 'border-realm-gods/40 text-realm-gods',
  'Mythology': 'border-realm-gods/40 text-realm-gods',
  'Astronomy': 'border-realm-cosmos/40 text-realm-cosmos',
  'Philosophy': 'border-realm-consciousness/40 text-realm-consciousness',
  'Survival': 'border-amber-500/40 text-amber-400',
  'Psychology': 'border-realm-consciousness/40 text-realm-consciousness',
  'Source Research': 'border-signal-online/40 text-signal-online',
  'Human Potential': 'border-realm-echo/40 text-realm-echo',
};

export function BuildersLibraryPage() {
  const save = (entry: LibraryEntry) => {
    const id = `library-${entry.id}`;
    if (isArchived(id)) { toast('Already saved to My Archive'); return; }
    saveToArchive({
      id,
      type: 'source',
      title: entry.title,
      description: [entry.author, entry.category, entry.whyItMatters].filter(Boolean).join(' · '),
      href: '/library',
      externalUrl: entry.link || undefined,
      tags: [entry.category, entry.format, entry.readingLevel],
    });
    toast.success(`Saved · ${entry.title}`);
  };

  return (
    <>
      <SEO
        title="The Builder's Library — Curated Reading & Resources | Pantheon"
        description="A curated library for builders, researchers, and seekers. Ancient history, mythology, astronomy, philosophy, psychology, and human potential."
        canonical="/library"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-realm-gods font-mono">Library · {buildersLibrary.length} entries</span>
          <span className="h-px flex-1 bg-realm-gods/30" />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-3">
          The Builder's <span className="text-realm-gods">Library</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-8">
          A curated knowledge library for people who want to go deeper than the dashboard.
          Build your own canon — start with these.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {buildersLibrary.map((b) => {
            const Icon = formatIcon[b.format];
            const cls = categoryColor[b.category] ?? 'border-primary/40 text-primary';
            return (
              <article key={b.id} className={`rounded-xl border bg-card/50 backdrop-blur p-5 flex flex-col hover:bg-card/70 transition ${cls.split(' ')[0]}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg border bg-card flex items-center justify-center ${cls}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[9px] uppercase tracking-[1.5px] font-mono px-2 py-0.5 rounded-full border ${cls}`}>
                    {b.format}
                  </span>
                </div>
                <h2 className="font-display text-base text-foreground leading-tight">{b.title}</h2>
                {b.author && <p className="text-[11px] text-muted-foreground mt-0.5">{b.author}</p>}
                <p className={`text-[10px] uppercase tracking-[1.5px] font-mono mt-2 mb-3 ${cls.split(' ')[1] ?? ''}`}>
                  {b.category} · {b.readingLevel}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">{b.whyItMatters}</p>
                <div className="flex items-center justify-between pt-3 border-t border-border/40">
                  <button
                    onClick={() => save(b)}
                    className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[1.5px] font-mono text-muted-foreground hover:text-foreground"
                  >
                    <Bookmark className="w-3 h-3" /> Save
                  </button>
                  {b.link && (
                    <a
                      href={b.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[1.5px] font-mono text-primary hover:text-primary/80"
                    >
                      Open <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default BuildersLibraryPage;
