import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowLeft, Bell, Flame, RefreshCw, Wind } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { useFlare, useKp, useSolarWind, useSwpcAlerts } from '@/hooks/use-live-data';
import type { LiveResult } from '@/lib/live-data';
import { cn } from '@/lib/utils';

interface FeedHealthProps {
  name: string;
  Icon: typeof Activity;
  reading: string;
  feed: {
    data: LiveResult<unknown> | null;
    loading: boolean;
    refresh: () => void;
    retryAttempt: number;
    nextRetryAt: number | null;
    maxRetries: number;
  };
  now: number;
}

function timestamp(value?: string | null) {
  if (!value || !Number.isFinite(Date.parse(value))) return 'Not yet verified';
  return new Date(value).toLocaleString();
}

function FeedHealth({ name, Icon, reading, feed, now }: FeedHealthProps) {
  const { data, loading, refresh, nextRetryAt, retryAttempt, maxRetries } = feed;
  const cached = data?.ok && (data.stale || data.degraded);
  const live = data?.ok && !cached;
  const status = loading ? 'Checking' : cached ? 'Degraded · Cached' : live ? 'Live' : 'Unavailable';
  const seconds = nextRetryAt ? Math.max(0, Math.ceil((nextRetryAt - now) / 1000)) : null;

  return (
    <article aria-label={name} aria-busy={loading} className="rounded-lg border border-border bg-card/40 p-5 backdrop-blur-md">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground"><Icon className="h-5 w-5 text-hub-signal" />{name}</h2>
        <span role="status" className={cn('text-xs font-medium', loading ? 'text-muted-foreground' : cached ? 'text-hub-warning' : live ? 'text-accent-emerald' : 'text-destructive')}>{status}</span>
      </header>
      <p className="mt-5 min-h-8 text-2xl font-semibold text-foreground">{data?.value != null ? reading : '—'}</p>
      <dl className="mt-4 space-y-2 text-xs">
        <div><dt className="text-muted-foreground">Last checked</dt><dd className="mt-1 text-foreground">{data ? timestamp(data.fetchedAt) : 'Checking…'}</dd></div>
        <div><dt className="text-muted-foreground">Last verified</dt><dd className="mt-1 text-foreground">{timestamp(data?.lastSuccessAt ?? (live ? data?.fetchedAt : null))}</dd></div>
      </dl>
      {cached && <p className="mt-4 text-sm text-hub-warning">Showing the last verified reading; live connectivity is degraded.</p>}
      {!loading && !data?.ok && <p className="mt-4 text-sm text-destructive">Source unavailable — no cached reading yet.</p>}
      {data?.error && <p className="mt-2 break-words text-xs text-destructive">{data.error}</p>}
      <p className="mt-4 min-h-10 text-xs text-muted-foreground" aria-live="polite">
        {loading ? 'Checking feed connectivity…' : seconds != null ? `Automatic retry ${retryAttempt}/${maxRetries} in ${seconds}s` : retryAttempt >= maxRetries ? 'Automatic retries paused. Retry to check again.' : live ? 'Live connection verified.' : cached ? 'Cached source response.' : 'Waiting for a verified response.'}
      </p>
      <footer className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        {data?.source ? <a className="text-xs text-hub-signal underline underline-offset-4" href={data.source.url} target="_blank" rel="noopener noreferrer">{data.source.label}</a> : <span className="text-xs text-muted-foreground">NOAA SWPC</span>}
        <Button variant="outline" className="min-h-11" onClick={refresh} disabled={loading} aria-label={`Retry ${name}`}>
          <RefreshCw className={cn(loading && 'animate-spin motion-reduce:animate-none')} />{loading ? 'Checking…' : 'Retry'}
        </Button>
      </footer>
    </article>
  );
}

export function HealthPage() {
  const kp = useKp();
  const flare = useFlare();
  const wind = useSolarWind();
  const alerts = useSwpcAlerts();
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <SEO title="Feed Health — Pantheon Observatory 46" description="Current connectivity, verified readings, and retry status for Pantheon's NOAA space-weather feeds." path="/health" />
      <div className="relative mx-auto max-w-5xl px-4 py-12">
        <Button asChild variant="link" className="mb-6 min-h-11 px-0"><Link to="/live-feeds"><ArrowLeft />Live Feeds</Link></Button>
        <p className="mb-3 text-xs uppercase tracking-widest text-hub-signal">Pantheon Observatory 46 · NOAA SWPC</p>
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Feed Health</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <FeedHealth name="Kp index" Icon={Activity} feed={kp} now={now} reading={kp.data?.value ? `${kp.data.value.kp} · ${kp.data.value.stormLevel}` : '—'} />
          <FeedHealth name="Solar flares" Icon={Flame} feed={flare} now={now} reading={flare.data?.value?.class ?? '—'} />
          <FeedHealth name="Solar wind" Icon={Wind} feed={wind} now={now} reading={wind.data?.value ? `${Math.round(wind.data.value.speedKmS)} km/s` : '—'} />
          <FeedHealth name="Space-weather alerts" Icon={Bell} feed={alerts} now={now} reading={alerts.data?.value ? `${alerts.data.value.length} NOAA alerts` : '—'} />
        </div>
      </div>
    </>
  );
}