import { useMemo, useState } from 'react';
import { BookOpen, Search, Trash2, FolderOpen, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'pantheon-archive';

type ArchiveItem = { id: string; title: string; type: string; createdAt: string };

function readArchive(): ArchiveItem[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

export function ArchivePage() {
  const [items, setItems] = useState<ArchiveItem[]>(readArchive);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => items.filter((item) =>
    `${item.title} ${item.type}`.toLowerCase().includes(query.toLowerCase())
  ), [items, query]);

  const clearArchive = () => {
    localStorage.removeItem(STORAGE_KEY);
    setItems([]);
  };

  return (
    <main className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Personal Observatory</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">My Archive</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">Your saved investigations, sources, and Echo discoveries in one place.</p>
        </div>
        <Button variant="outline" onClick={clearArchive} disabled={!items.length}>
          <Trash2 className="mr-2 h-4 w-4" /> Clear archive
        </Button>
      </div>

      <div className="mb-6 flex items-center gap-2 rounded-lg border bg-background/60 px-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search your archive…" className="h-11 w-full bg-transparent text-sm outline-none" />
      </div>

      {filtered.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex min-h-64 flex-col items-center justify-center text-center">
            <FolderOpen className="mb-4 h-10 w-10 text-muted-foreground" />
            <h2 className="text-xl font-medium">Your archive is empty</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">Save an investigation or Echo discovery and it will appear here.</p>
            <Button className="mt-5" asChild><a href="/echo"><Sparkles className="mr-2 h-4 w-4" /> Ask Echo</a></Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((item) => (
            <Card key={item.id}>
              <CardHeader><CardTitle className="flex items-center gap-2 text-base"><BookOpen className="h-4 w-4 text-primary" />{item.title}</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">{item.type} · {new Date(item.createdAt).toLocaleDateString()}</CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
