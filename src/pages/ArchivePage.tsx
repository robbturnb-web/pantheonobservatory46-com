import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, Trash2, FolderOpen, Sparkles, ExternalLink, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { clearArchive, getArchive, removeFromArchive, type ArchiveItem } from '@/lib/archive';

export function ArchivePage() {
  const [items, setItems] = useState<ArchiveItem[]>(getArchive);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((item) =>
      [item.title, item.type, item.description ?? '', ...(item.tags ?? [])]
        .join(' ')
        .toLowerCase()
        .includes(normalized)
    );
  }, [items, query]);

  const handleClear = () => {
    clearArchive();
    setItems([]);
  };

  const handleRemove = (id: string) => {
    setItems(removeFromArchive(id));
  };

  return (
    <>
      <SEO
        title="My Archive · Pantheon Observatory"
        description="Your saved investigations, sources, notes, and Echo discoveries."
        path="/archive"
        noindex
      />
      <main className="container mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Personal Observatory</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">My Archive</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Your saved investigations, sources, and Echo discoveries in one place, stored on this device.
            </p>
          </div>
          <Button variant="outline" onClick={handleClear} disabled={!items.length} className="min-h-11 w-full sm:w-auto">
            <Trash2 className="mr-2 h-4 w-4" /> Clear archive
          </Button>
        </div>

        <label htmlFor="archive-search" className="sr-only">Search your archive</label>
        <div className="mb-6 flex items-center gap-2 rounded-lg border bg-background/60 px-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            id="archive-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your archive…"
            className="h-11 w-full bg-transparent text-sm outline-none"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md" aria-label="Clear search">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
              <FolderOpen className="mb-4 h-10 w-10 text-muted-foreground" aria-hidden="true" />
              <h2 className="text-xl font-medium">{items.length ? 'No matching discoveries' : 'Your archive is empty'}</h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                {items.length
                  ? 'Try another search term, or clear the search to see everything you saved.'
                  : 'Save an investigation, source, or Echo discovery and it will appear here.'}
              </p>
              {!items.length && (
                <Button className="mt-5 min-h-11" asChild>
                  <Link to="/echo"><Sparkles className="mr-2 h-4 w-4" /> Ask Echo</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((item) => (
              <Card key={item.id} className="min-w-0">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-start gap-2 text-base">
                    <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="min-w-0 break-words">{item.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground">
                  {item.description && <p className="break-words">{item.description}</p>}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span>{item.type} · {new Date(item.createdAt).toLocaleDateString()}</span>
                    <div className="flex items-center gap-2">
                      {item.href && (
                        <Button variant="outline" size="sm" asChild>
                          <Link to={item.href}><ExternalLink className="mr-1 h-3.5 w-3.5" /> Open</Link>
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => handleRemove(item.id)} aria-label={`Remove ${item.title} from archive`}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {!!item.tags?.length && <div className="flex flex-wrap gap-1.5">{item.tags.map((tag) => <span key={tag} className="rounded-full border px-2 py-0.5 text-xs">{tag}</span>)}</div>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
