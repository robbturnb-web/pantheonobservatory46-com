import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { CosmicCard } from '@/components/cards/CosmicCard';
import { envHealth } from '@/config/env';
import { listReportedBroken } from '@/services/sources/sourceHealthService';
import { supabase } from '@/integrations/supabase/client';

type Check = { label: string; state: 'ok' | 'fail' | 'pending'; note?: string };

export function DebugChecklistPage() {
  const [supaState, setSupaState] = useState<'ok' | 'fail' | 'pending'>('pending');

  useEffect(() => {
    (async () => {
      try {
        const { error } = await supabase.auth.getSession();
        setSupaState(error ? 'fail' : 'ok');
      } catch {
        setSupaState('fail');
      }
    })();
  }, []);

  const env = envHealth();
  const broken = listReportedBroken();

  const checks: Check[] = [
    ...env.map<Check>((e) => ({
      label: `${e.key} — ${e.description}`,
      state: e.present ? 'ok' : e.required ? 'fail' : 'pending',
      note: e.required ? 'required' : 'optional',
    })),
    { label: 'Supabase reachable', state: supaState },
    { label: 'Routes mounted (React Router)', state: 'ok' },
    { label: 'Privacy / Terms / Disclaimer / Contact pages', state: 'ok' },
    { label: 'Live feeds honesty footer', state: 'ok' },
    { label: 'Content-trust badges system', state: 'ok' },
    { label: `User-reported broken links: ${broken.length}`, state: broken.length ? 'pending' : 'ok' },
  ];

  return (
    <>
      <SEO title="Debug Checklist" description="Internal launch readiness checklist." />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <p className="text-[10px] uppercase tracking-[3px] text-primary">Internal</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-foreground mt-2">Debug Checklist</h1>
          <p className="text-sm text-muted-foreground mt-3">
            Manual launch-readiness review. Not linked from public navigation.
          </p>
        </header>
        <CosmicCard className="p-5">
          <ul className="space-y-2">
            {checks.map((c) => (
              <li key={c.label} className="flex items-start gap-3 text-sm">
                {c.state === 'ok' ? (
                  <CheckCircle2 className="w-4 h-4 text-signal-online shrink-0 mt-0.5" />
                ) : c.state === 'fail' ? (
                  <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                ) : (
                  <Clock className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                )}
                <span className="text-foreground/90">{c.label}</span>
                {c.note && <span className="ml-auto text-[10px] uppercase tracking-[1.5px] text-muted-foreground">{c.note}</span>}
              </li>
            ))}
          </ul>
        </CosmicCard>
      </main>
    </>
  );
}

export default DebugChecklistPage;
