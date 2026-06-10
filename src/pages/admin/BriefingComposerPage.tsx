import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Plus, Save, Eye, EyeOff } from 'lucide-react';

interface Briefing {
  id: string;
  briefing_date: string;
  headline: string;
  summary: string;
  evidence_grade: string;
  tags: string[];
  published: boolean;
  updated_at: string;
}

const EMPTY: Omit<Briefing, 'id' | 'updated_at'> = {
  briefing_date: new Date().toISOString().slice(0, 10),
  headline: '',
  summary: '',
  evidence_grade: 'B',
  tags: [],
  published: false,
};

export default function BriefingComposerPage() {
  const [rows, setRows] = useState<Briefing[]>([]);
  const [draft, setDraft] = useState<typeof EMPTY & { id?: string }>(EMPTY);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const load = async () => {
    const { data, error } = await supabase
      .from('disclosure_briefings')
      .select('*')
      .order('briefing_date', { ascending: false })
      .limit(50);
    if (error) toast({ title: 'Load failed', description: error.message, variant: 'destructive' });
    setRows((data ?? []) as Briefing[]);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!draft.headline.trim() || !draft.summary.trim()) {
      toast({ title: 'Headline and summary required', variant: 'destructive' });
      return;
    }
    setSaving(true);
    const payload = {
      briefing_date: draft.briefing_date,
      headline: draft.headline.trim(),
      summary: draft.summary.trim(),
      evidence_grade: draft.evidence_grade,
      tags: draft.tags,
      published: draft.published,
    };
    const { error } = draft.id
      ? await supabase.from('disclosure_briefings').update(payload).eq('id', draft.id)
      : await supabase.from('disclosure_briefings').insert(payload);
    setSaving(false);
    if (error) {
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: draft.id ? 'Briefing updated' : 'Briefing created' });
    setDraft(EMPTY);
    void load();
  };

  const togglePublish = async (b: Briefing) => {
    const { error } = await supabase
      .from('disclosure_briefings')
      .update({ published: !b.published })
      .eq('id', b.id);
    if (error) toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
    else void load();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this briefing?')) return;
    const { error } = await supabase.from('disclosure_briefings').delete().eq('id', id);
    if (error) toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    else void load();
  };

  const edit = (b: Briefing) => {
    setDraft({
      id: b.id,
      briefing_date: b.briefing_date,
      headline: b.headline,
      summary: b.summary,
      evidence_grade: b.evidence_grade,
      tags: b.tags ?? [],
      published: b.published,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEO title="Briefing Composer — Pantheon" description="Curate the daily disclosure briefing." />
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <header className="mb-8">
          <h1 className="font-display text-3xl">Briefing Composer</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Curator's note for the Daily Disclosure Briefing. Published entries surface at the top of <code>/briefing</code>.
          </p>
        </header>

        {/* Composer */}
        <div className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur space-y-4 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={draft.briefing_date}
                onChange={(e) => setDraft({ ...draft, briefing_date: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="grade">Evidence Grade</Label>
              <select id="grade" className="w-full mt-1 h-10 px-3 rounded-md border border-input bg-background text-sm"
                value={draft.evidence_grade}
                onChange={(e) => setDraft({ ...draft, evidence_grade: e.target.value })}>
                {['A', 'B', 'C', 'D', 'F'].map((g) => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div className="flex items-end gap-2">
              <Switch id="pub" checked={draft.published}
                onCheckedChange={(c) => setDraft({ ...draft, published: c })} />
              <Label htmlFor="pub" className="cursor-pointer">Publish</Label>
            </div>
          </div>
          <div>
            <Label htmlFor="headline">Headline</Label>
            <Input id="headline" value={draft.headline} maxLength={200}
              onChange={(e) => setDraft({ ...draft, headline: e.target.value })}
              placeholder="e.g. Senate hearing reopens UAP records request" />
          </div>
          <div>
            <Label htmlFor="summary">Summary</Label>
            <Textarea id="summary" rows={5} value={draft.summary} maxLength={2000}
              onChange={(e) => setDraft({ ...draft, summary: e.target.value })}
              placeholder="2–4 sentence brief. Markdown not rendered." />
          </div>
          <div className="flex gap-2">
            <Button onClick={save} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving…' : draft.id ? 'Update' : 'Create'}
            </Button>
            {draft.id && (
              <Button variant="ghost" onClick={() => setDraft(EMPTY)}>Cancel edit</Button>
            )}
          </div>
        </div>

        {/* List */}
        <h2 className="font-display text-xl mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Briefings ({rows.length})
        </h2>
        {rows.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm">No briefings yet.</div>
        ) : (
          <div className="space-y-3">
            {rows.map((b) => (
              <div key={b.id} className="p-4 rounded-xl border border-border bg-card/30 flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <div className="flex-1 min-w-0 w-full">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1 flex-wrap">
                    <span className="font-mono">{b.briefing_date}</span>
                    <span>·</span>
                    <span className="font-mono">Grade {b.evidence_grade}</span>
                    <span>·</span>
                    <span className={b.published ? 'text-signal-online' : 'text-muted-foreground'}>
                      {b.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <div className="font-medium break-words">{b.headline}</div>
                  <div className="text-sm text-muted-foreground line-clamp-2 mt-1">{b.summary}</div>
                </div>
                <div className="flex flex-row sm:flex-col gap-1 shrink-0 w-full sm:w-auto justify-end">
                  <Button size="sm" variant="ghost" onClick={() => edit(b)}>Edit</Button>
                  <Button size="sm" variant="ghost" onClick={() => togglePublish(b)}>
                    {b.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => remove(b.id)}>
                    <Trash2 className="w-4 h-4 text-realm-blackProjects" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
