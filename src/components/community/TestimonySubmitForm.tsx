import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useEchoXp } from '@/hooks/use-echo-xp';
import { XP_VALUES } from '@/lib/xp-events';

const TestimonySchema = z.object({
  title: z.string().trim().min(4, 'Title needs at least 4 chars').max(120),
  body: z.string().trim().min(40, 'Tell us more — at least 40 chars').max(5000),
  category: z.enum(['sighting', 'encounter', 'contact', 'dream', 'synchronicity', 'other']),
  tags: z.string().max(200).optional(),
  flow_drive_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

const CATEGORIES = [
  { value: 'sighting', label: 'Sighting' },
  { value: 'encounter', label: 'Encounter' },
  { value: 'contact', label: 'Contact' },
  { value: 'dream', label: 'Dream / Vision' },
  { value: 'synchronicity', label: 'Synchronicity' },
  { value: 'other', label: 'Other' },
] as const;

export function TestimonySubmitForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState<typeof CATEGORIES[number]['value']>('sighting');
  const [tags, setTags] = useState('');
  const [flowDriveUrl, setFlowDriveUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { userId, awardEvent } = useEchoXp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      toast.error('Sign in to submit a testimony');
      return;
    }
    const parsed = TestimonySchema.safeParse({ title, body, category, tags, flow_drive_url: flowDriveUrl });
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      toast.error(first.message);
      return;
    }
    setLoading(true);
    const tagArr = tags.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean).slice(0, 8);
    const { error } = await supabase.from('community_testimonies').insert({
      user_id: userId,
      title: parsed.data.title,
      body: parsed.data.body,
      category: parsed.data.category,
      tags: tagArr,
      flow_drive_url: parsed.data.flow_drive_url || null,
    });
    setLoading(false);
    if (error) {
      toast.error('Submission failed');
      return;
    }
    toast.success('Testimony submitted — pending moderator review');
    await awardEvent('page', `testimony:${Date.now()}`, XP_VALUES.TESTIMONY_SUBMIT, 'Testimony submitted');
    setTitle(''); setBody(''); setTags(''); setFlowDriveUrl('');
    onSubmitted?.();
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3 p-4 rounded-xl border border-border bg-card"
    >
      <h3 className="font-bold text-sm flex items-center gap-2">
        <Send className="w-4 h-4 text-primary" /> Share your testimony
      </h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={120}
        placeholder="Title (e.g. Triangle craft over Phoenix, 1997)"
        className="w-full px-3 py-2 rounded-md bg-input border border-border text-sm"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as typeof CATEGORIES[number]['value'])}
        className="w-full px-3 py-2 rounded-md bg-input border border-border text-sm"
      >
        {CATEGORIES.map((c) => (
          <option key={c.value} value={c.value}>{c.label}</option>
        ))}
      </select>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        maxLength={5000}
        rows={5}
        placeholder="Tell your story. Date, location, what you saw, how it felt…"
        className="w-full px-3 py-2 rounded-md bg-input border border-border text-sm resize-y"
      />
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        maxLength={200}
        placeholder="tags, comma, separated"
        className="w-full px-3 py-2 rounded-md bg-input border border-border text-sm"
      />
      <input
        type="url"
        value={flowDriveUrl}
        onChange={(e) => setFlowDriveUrl(e.target.value)}
        placeholder="Optional: video URL (Flow Drive, YouTube, Vimeo)"
        className="w-full px-3 py-2 rounded-md bg-input border border-border text-sm"
      />
      <button
        type="submit"
        disabled={loading || !userId}
        className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {userId ? 'Submit for review' : 'Sign in to submit'}
      </button>
      <p className="text-[10px] text-muted-foreground">
        Submissions go through moderator review before appearing publicly.
      </p>
    </motion.form>
  );
}
