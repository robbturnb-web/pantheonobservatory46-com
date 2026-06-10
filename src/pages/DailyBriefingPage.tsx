/**
 * Daily Briefing — Phase 2 · Priority #8.
 *
 * Composes every live feed (seismic, solar, geomagnetic, weather, SWPC
 * alerts, ISS) plus the most recent disclosure events (legislation +
 * AARO lineage) into a single dated snapshot a visitor can open every
 * morning. Pure client composition — no new edge function.
 */
import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity, AlertTriangle, Radio, Sun, Waves, Wind, Satellite,
  Gavel, ScrollText, FileText, Building2, Users, Radar,
  Cloud, RefreshCw, ChevronRight, CalendarDays, Download, Settings,
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

import {
  FILENAME_PREFIX_MAX,
  FilenamePrefixError,
  assertValidFilenamePrefix,
  sanitizeFilenamePrefix,
  validateFilenamePrefix,
} from '@/lib/filename-prefix';

import {
  useEarthquakes, useKp, useFlare, useSolarWind, useCMEs,
  useFlareEvents, useGSTs, useSwpcAlerts, useISS, useNwsAlerts,
} from '@/hooks/use-live-data';
import { legislation, STATUS_LABEL, type LegislationItem } from '@/data/legislation';
import { aaroEntries } from '@/data/aaro';

type SignalTone = 'calm' | 'watch' | 'warning' | 'severe';

const TONE: Record<SignalTone, { text: string; bg: string; border: string; dot: string; label: string }> = {
  calm:    { text: 'text-signal-online',    bg: 'bg-signal-online/10',    border: 'border-signal-online/40',    dot: 'bg-signal-online',    label: 'Nominal' },
  watch:   { text: 'text-realm-cosmos',     bg: 'bg-realm-cosmos/10',     border: 'border-realm-cosmos/40',     dot: 'bg-realm-cosmos',     label: 'Watch' },
  warning: { text: 'text-amber-300',        bg: 'bg-amber-500/10',        border: 'border-amber-500/40',        dot: 'bg-amber-400',        label: 'Warning' },
  severe:  { text: 'text-realm-blackProjects', bg: 'bg-realm-blackProjects/10', border: 'border-realm-blackProjects/40', dot: 'bg-realm-blackProjects', label: 'Severe' },
};

type Domain = 'seismic' | 'solar' | 'geomag' | 'weather' | 'orbital' | 'disclosure';

interface BriefingItem {
  id: string;
  domain: Domain;
  tone: SignalTone;
  title: string;
  body: string;
  meta?: string;
  href?: string;
  timestamp: string;
  icon: typeof Activity;
}

const DOMAIN_META: Record<Domain, { label: string; icon: typeof Activity; accent: string }> = {
  seismic:    { label: 'Seismic',    icon: Waves,     accent: 'text-realm-disclosure' },
  solar:      { label: 'Solar',      icon: Sun,       accent: 'text-realm-gods' },
  geomag:     { label: 'Geomagnetic',icon: Activity,  accent: 'text-realm-cosmos' },
  weather:    { label: 'Weather',    icon: Cloud,     accent: 'text-realm-cosmos' },
  orbital:    { label: 'Orbital',    icon: Satellite, accent: 'text-realm-observatory' },
  disclosure: { label: 'Disclosure', icon: Gavel,     accent: 'text-realm-disclosure' },
};

const FILTERS: { id: 'all' | Domain; label: string }[] = [
  { id: 'all',        label: 'All Signals' },
  { id: 'seismic',    label: 'Seismic' },
  { id: 'solar',      label: 'Solar' },
  { id: 'geomag',     label: 'Geomagnetic' },
  { id: 'weather',    label: 'Weather' },
  { id: 'orbital',    label: 'Orbital' },
  { id: 'disclosure', label: 'Disclosure' },
];

function fmtTime(iso: string) {
  try {
    return new Date(iso).toLocaleString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  } catch { return iso; }
}

function classifyLegislation(l: LegislationItem) {
  if (l.shortTitle.toLowerCase().includes('hearing')) return ScrollText;
  if (l.shortTitle.toLowerCase().includes('report')) return FileText;
  return Gavel;
}

function eraToDate(era: string): string {
  const iso = era.match(/\d{4}-\d{2}-\d{2}/);
  if (iso) return iso[0];
  const yr = era.match(/\d{4}/);
  return yr ? `${yr[0]}-01-01` : '1970-01-01';
}

export function DailyBriefingPage() {
  const [filter, setFilter] = useState<'all' | Domain>('all');

  const eq = useEarthquakes();
  const kp = useKp();
  const flare = useFlare();
  const wind = useSolarWind();
  const cme = useCMEs();
  const flareEvents = useFlareEvents();
  const gst = useGSTs();
  const swpc = useSwpcAlerts();
  const iss = useISS();
  const nws = useNwsAlerts();

  const refreshAll = () => {
    void eq.refresh(); void kp.refresh(); void flare.refresh(); void wind.refresh();
    void cme.refresh(); void flareEvents.refresh(); void gst.refresh();
    void swpc.refresh(); void iss.refresh(); void nws.refresh();
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const items = useMemo<BriefingItem[]>(() => {
    const out: BriefingItem[] = [];

    // SEISMIC
    if (eq.data?.ok && eq.data.value) {
      const v = eq.data.value;
      const top = v.highest;
      if (top) {
        const mag = top.mag ?? 0;
        const tone: SignalTone = mag >= 7 ? 'severe' : mag >= 6 ? 'warning' : mag >= 5 ? 'watch' : 'calm';
        out.push({
          id: 'eq-top',
          domain: 'seismic',
          tone,
          title: `M${mag.toFixed(1)} — ${top.place ?? 'Unknown region'}`,
          body: `Largest event in the last 24 h. ${v.count24h} earthquakes total ≥ M2.5.`,
          href: '/observatory',
          timestamp: top.time ? new Date(top.time).toISOString() : eq.data.fetchedAt,
          icon: Waves,
        });
      }
    }

    // SOLAR — current X-ray class
    if (flare.data?.ok && flare.data.value) {
      const c = flare.data.value.class;
      const letter = c.charAt(0);
      const tone: SignalTone = letter === 'X' ? 'severe' : letter === 'M' ? 'warning' : letter === 'C' ? 'watch' : 'calm';
      out.push({
        id: 'flare-now',
        domain: 'solar',
        tone,
        title: `X-ray flux at ${c}`,
        body: letter === 'X' ? 'Major flare in progress — HF radio blackouts likely on sunlit side.'
            : letter === 'M' ? 'Moderate flare in progress — brief HF impacts possible.'
            : letter === 'C' ? 'Background flaring active — quiet to unsettled space weather.'
            : 'Solar X-ray emission at background levels.',
        href: '/earth-pulse',
        timestamp: flare.data.value.observedAt,
        icon: Sun,
      });
    }

    // SOLAR — strongest 7-day flare event
    if (flareEvents.data?.ok && flareEvents.data.value?.strongest) {
      const s = flareEvents.data.value.strongest;
      const letter = (s.class ?? '').charAt(0);
      const tone: SignalTone = letter === 'X' ? 'severe' : letter === 'M' ? 'warning' : 'watch';
      out.push({
        id: 'flare-7d',
        domain: 'solar',
        tone,
        title: `Strongest flare this week: ${s.class}`,
        body: `${flareEvents.data.value.count7d} flares logged by NASA DONKI in the last 7 days.`,
        href: '/earth-pulse',
        timestamp: s.beginTime ?? flareEvents.data.fetchedAt,
        icon: Sun,
      });
    }

    // SOLAR — fastest CME
    if (cme.data?.ok && cme.data.value?.fastest) {
      const f = cme.data.value.fastest;
      const speed = f.speedKmS ?? 0;
      const tone: SignalTone = speed >= 1500 ? 'severe' : speed >= 1000 ? 'warning' : 'watch';
      out.push({
        id: 'cme-fastest',
        domain: 'solar',
        tone,
        title: `Fastest CME: ${speed} km/s`,
        body: `${cme.data.value.count7d} coronal mass ejections detected in the last 7 days.`,
        href: '/earth-pulse',
        timestamp: f.startTime ?? cme.data.fetchedAt,
        icon: Sun,
      });
    }

    // GEOMAG — current Kp
    if (kp.data?.ok && kp.data.value) {
      const k = kp.data.value.kp;
      const tone: SignalTone = k >= 7 ? 'severe' : k >= 5 ? 'warning' : k >= 4 ? 'watch' : 'calm';
      out.push({
        id: 'kp-now',
        domain: 'geomag',
        tone,
        title: `Kp ${k.toFixed(1)} — ${kp.data.value.stormLevel}`,
        body: k >= 5 ? 'Geomagnetic storm conditions in effect. Aurora visible at lower latitudes.'
                    : 'Geomagnetic field within normal range.',
        href: '/earth-pulse',
        timestamp: kp.data.value.observedAt,
        icon: Activity,
      });
    }

    // GEOMAG — solar wind
    if (wind.data?.ok && wind.data.value) {
      const s = wind.data.value.speedKmS;
      const tone: SignalTone = s >= 700 ? 'warning' : s >= 500 ? 'watch' : 'calm';
      out.push({
        id: 'wind-now',
        domain: 'geomag',
        tone,
        title: `Solar wind ${s.toFixed(0)} km/s`,
        body: s >= 500 ? 'Elevated solar wind stream impacting magnetosphere.' : 'Solar wind nominal.',
        href: '/earth-pulse',
        timestamp: wind.data.value.observedAt,
        icon: Wind,
      });
    }

    // GEOMAG — strongest 7-day storm
    if (gst.data?.ok && gst.data.value?.strongest) {
      const g = gst.data.value.strongest;
      const peak = g.maxKp ?? 0;
      const tone: SignalTone = peak >= 7 ? 'severe' : peak >= 5 ? 'warning' : 'watch';
      out.push({
        id: 'gst-7d',
        domain: 'geomag',
        tone,
        title: `7-day peak storm: Kp ${peak}`,
        body: `${gst.data.value.count7d} geomagnetic storms logged this week.`,
        href: '/earth-pulse',
        timestamp: g.startTime ?? gst.data.fetchedAt,
        icon: Activity,
      });
    }

    // SWPC alerts
    if (swpc.data?.ok && swpc.data.value) {
      for (const a of swpc.data.value.slice(0, 3)) {
        out.push({
          id: `swpc-${a.serial}`,
          domain: 'geomag',
          tone: 'warning',
          title: a.productId || 'SWPC Alert',
          body: a.message.slice(0, 220) + (a.message.length > 220 ? '…' : ''),
          href: 'https://www.swpc.noaa.gov/products/alerts-watches-and-warnings',
          timestamp: a.issued,
          icon: Radio,
        });
      }
    }

    // WEATHER — NWS extreme/severe
    if (nws.data?.ok && nws.data.value) {
      const v = nws.data.value;
      const top = v.latest[0];
      if (top) {
        const tone: SignalTone = /extreme/i.test(top.severity) ? 'severe' : 'warning';
        out.push({
          id: 'nws-top',
          domain: 'weather',
          tone,
          title: `${top.event} — ${top.area || 'US'}`,
          body: top.headline,
          meta: `${v.total} active severe/extreme alerts`,
          href: top.url,
          timestamp: top.sent,
          icon: AlertTriangle,
        });
      }
    }

    // ORBITAL — ISS position
    if (iss.data?.ok && iss.data.value) {
      const i = iss.data.value;
      out.push({
        id: 'iss-now',
        domain: 'orbital',
        tone: 'calm',
        title: `ISS over ${i.latitude.toFixed(1)}°, ${i.longitude.toFixed(1)}°`,
        body: `Altitude ${i.altitudeKm?.toFixed(0) ?? '—'} km · velocity ${i.velocityKmH?.toFixed(0) ?? '—'} km/h.`,
        href: '/observatory',
        timestamp: i.observedAt,
        icon: Satellite,
      });
    }

    // DISCLOSURE — last 30 days of legislation + AARO
    const now = Date.now();
    const cutoff = now - 60 * 24 * 3600_000;
    for (const l of legislation) {
      const t = Date.parse(l.introduced);
      if (!Number.isFinite(t) || t < cutoff) continue;
      const tone: SignalTone = l.status === 'enacted' ? 'calm'
        : l.status === 'stalled' ? 'warning'
        : l.status === 'introduced' || l.status === 'committee' ? 'watch'
        : 'watch';
      out.push({
        id: `leg-${l.id}`,
        domain: 'disclosure',
        tone,
        title: `${STATUS_LABEL[l.status]} — ${l.shortTitle}`,
        body: l.summary,
        meta: l.citation,
        href: '/legislation',
        timestamp: l.introduced,
        icon: classifyLegislation(l),
      });
    }
    for (const a of aaroEntries) {
      const d = eraToDate(a.era ?? '');
      const t = Date.parse(d);
      if (!Number.isFinite(t) || t < cutoff) continue;
      out.push({
        id: `aaro-${a.id}`,
        domain: 'disclosure',
        tone: 'watch',
        title: a.title,
        body: a.summary,
        meta: a.subtitle,
        href: '/aaro',
        timestamp: d,
        icon: Building2,
      });
    }

    out.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return out;
  }, [eq.data, kp.data, flare.data, wind.data, cme.data, flareEvents.data, gst.data, swpc.data, iss.data, nws.data]);

  const filtered = filter === 'all' ? items : items.filter((i) => i.domain === filter);

  // Top-line posture
  const severeCount = items.filter((i) => i.tone === 'severe').length;
  const warningCount = items.filter((i) => i.tone === 'warning').length;
  const watchCount = items.filter((i) => i.tone === 'watch').length;
  const posture: SignalTone = severeCount > 0 ? 'severe' : warningCount > 0 ? 'warning' : watchCount > 0 ? 'watch' : 'calm';

  const loading = [eq, kp, flare, wind, nws, swpc].some((h) => h.loading && !h.data);

  const [exporting, setExporting] = useState(false);
  const [pageSize, setPageSize] = useState<'a4' | 'letter'>('a4');
  const [includePageNumbers, setIncludePageNumbers] = useState(true);
  const [includeCoverTitle, setIncludeCoverTitle] = useState(true);
  const [filenamePrefix, setFilenamePrefix] = useState('pantheon-daily-briefing');

  const filenameError = validateFilenamePrefix(filenamePrefix);

  const exportPdf = async () => {
    const err = validateFilenamePrefix(filenamePrefix);
    if (err) {
      toast.error('Invalid filename prefix', { description: err });
      return;
    }
    setExporting(true);
    try {
      const { default: jsPDF } = await import('jspdf');
      const format = pageSize === 'letter' ? 'letter' : 'a4';
      const doc = new jsPDF({ unit: 'pt', format });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const margin = 40;
      let y = margin;

      const newPageIfNeeded = (need: number) => {
        if (y + need > pageH - margin) { doc.addPage(); y = margin; }
      };

      if (includeCoverTitle) {
        // Title
        doc.setFont('helvetica', 'bold'); doc.setFontSize(22);
        doc.text('Pantheon Frequency 46 — Daily Briefing', margin, y); y += 24;
        doc.setFont('helvetica', 'normal'); doc.setFontSize(11); doc.setTextColor(110);
        doc.text(today, margin, y); y += 20;
        doc.setTextColor(0);
      }

      // Posture
      doc.setFont('helvetica', 'bold'); doc.setFontSize(12);
      doc.text(`Posture: ${TONE[posture].label}`, margin, y); y += 16;
      doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
      doc.text(
        `Severe: ${severeCount}   Warnings: ${warningCount}   Watch: ${watchCount}   Nominal: ${items.length - severeCount - warningCount - watchCount}`,
        margin, y,
      );
      y += 18;
      doc.text(`Filter: ${FILTERS.find((f) => f.id === filter)?.label}   \u00B7   ${filtered.length} entries`, margin, y);
      y += 22;

      // Divider
      doc.setDrawColor(200); doc.line(margin, y, pageW - margin, y); y += 18;

      // Items
      for (const it of filtered) {
        const dm = DOMAIN_META[it.domain];
        const tone = TONE[it.tone];
        const headerLine = `[${dm.label.toUpperCase()} \u00B7 ${tone.label.toUpperCase()}]  ${fmtTime(it.timestamp)}`;
        const titleLines = doc.splitTextToSize(it.title, pageW - margin * 2);
        const bodyLines  = doc.splitTextToSize(it.body, pageW - margin * 2);
        const metaLines  = it.meta ? doc.splitTextToSize(it.meta, pageW - margin * 2) : [];
        const linkLines  = it.href ? doc.splitTextToSize(it.href, pageW - margin * 2) : [];
        const need = 14 + titleLines.length * 14 + bodyLines.length * 12 +
                     metaLines.length * 11 + linkLines.length * 11 + 14;
        newPageIfNeeded(need);

        doc.setFont('helvetica', 'bold'); doc.setFontSize(8); doc.setTextColor(110);
        doc.text(headerLine, margin, y); y += 12;
        doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(0);
        doc.text(titleLines, margin, y); y += titleLines.length * 13;
        doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor(60);
        doc.text(bodyLines, margin, y); y += bodyLines.length * 12;
        if (metaLines.length) {
          doc.setFontSize(8); doc.setTextColor(130);
          doc.text(metaLines, margin, y); y += metaLines.length * 10;
        }
        if (linkLines.length) {
          doc.setFontSize(8); doc.setTextColor(80, 80, 180);
          doc.text(linkLines, margin, y); y += linkLines.length * 10;
        }
        doc.setTextColor(0);
        y += 10;
        doc.setDrawColor(230); doc.line(margin, y - 4, pageW - margin, y - 4);
      }

      // Footer page numbers
      if (includePageNumbers) {
        const pageCount = doc.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(140);
          doc.text(`Pantheon Frequency 46  \u00B7  pantheonobservatory46.com  \u00B7  Page ${i} / ${pageCount}`,
            pageW / 2, pageH - 20, { align: 'center' });
        }
      }

      const stamp = new Date().toISOString().slice(0, 10);
      const safePrefix = filenamePrefix.trim().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_]/g, '');
      doc.save(`${safePrefix || 'briefing'}-${stamp}.pdf`);
    } finally {
      setExporting(false);
    }
  };


  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Daily Briefing — Pantheon Frequency 46"
        description="One snapshot every morning: seismic, solar, geomagnetic, weather, orbital, and disclosure signals composed into a single command-ready briefing."
      />

      <section className="container mx-auto px-4 pt-24 pb-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-realm-observatory font-mono">
            Phase 2 · Daily Briefing
          </span>
          <span className="h-px flex-1 bg-realm-observatory/30" />
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-realm-observatory font-mono transition"
              >
                <Settings className="w-3 h-3" />
                Export Settings
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 bg-card border-border/60 backdrop-blur">
              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">Export Settings</div>
                <div className="space-y-2">
                  <Label className="text-xs text-foreground">Page Size</Label>
                  <div className="flex gap-2">
                    {(['a4', 'letter'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setPageSize(s)}
                        className={`flex-1 px-2 py-1 rounded-md border text-[10px] uppercase tracking-wider font-mono transition ${
                          pageSize === s
                            ? 'border-realm-observatory bg-realm-observatory/20 text-realm-observatory'
                            : 'border-border/40 text-muted-foreground hover:text-foreground hover:border-border'
                        }`}
                      >
                        {s === 'a4' ? 'A4' : 'Letter'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="filename-prefix" className="text-xs text-foreground">Filename Prefix</Label>
                    <span className={`text-[10px] font-mono ${filenamePrefix.trim().length > FILENAME_PREFIX_MAX ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {filenamePrefix.trim().length}/{FILENAME_PREFIX_MAX}
                    </span>
                  </div>
                  <Input
                    id="filename-prefix"
                    value={filenamePrefix}
                    onChange={(e) => setFilenamePrefix(e.target.value)}
                    placeholder="e.g. briefing-snapshot"
                    maxLength={FILENAME_PREFIX_MAX + 20}
                    aria-invalid={!!filenameError}
                    aria-describedby="filename-prefix-help"
                    className={`h-8 text-xs bg-background ${filenameError ? 'border-destructive/70 focus-visible:ring-destructive/40' : 'border-border/40'}`}
                  />
                  <p
                    id="filename-prefix-help"
                    className={`text-[10px] font-mono ${filenameError ? 'text-destructive' : 'text-muted-foreground'}`}
                  >
                    {filenameError ?? 'Letters, numbers, spaces, hyphens, underscores.'}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="cover-title" className="text-xs text-foreground cursor-pointer">Cover Title</Label>
                  <Switch id="cover-title" checked={includeCoverTitle} onCheckedChange={setIncludeCoverTitle} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="page-numbers" className="text-xs text-foreground cursor-pointer">Page Numbers</Label>
                  <Switch id="page-numbers" checked={includePageNumbers} onCheckedChange={setIncludePageNumbers} />
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <button
            onClick={exportPdf}
            disabled={exporting || items.length === 0 || !!filenameError}
            title={filenameError ?? undefined}
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-realm-observatory font-mono transition disabled:opacity-40"
          >
            <Download className={`w-3 h-3 ${exporting ? 'animate-pulse' : ''}`} />
            {exporting ? 'Exporting…' : 'Export PDF'}
          </button>
          <button
            onClick={refreshAll}
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground font-mono transition"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            Refresh all
          </button>
        </div>

        <div className="flex items-start justify-between gap-6 flex-wrap mb-3">
          <h1 className="font-display text-4xl md:text-6xl text-foreground">
            Daily <span className="text-realm-observatory">Briefing</span>
          </h1>
          <div className={`px-4 py-2 rounded-xl border ${TONE[posture].border} ${TONE[posture].bg} backdrop-blur`}>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${TONE[posture].dot} animate-pulse`} />
              <span className={`text-[10px] uppercase tracking-[0.25em] font-mono ${TONE[posture].text}`}>
                Posture · {TONE[posture].label}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground mb-8">
          <CalendarDays className="w-4 h-4" />
          <span className="text-sm">{today}</span>
        </div>

        {/* Posture grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {([
            { tone: 'severe',  count: severeCount,  label: 'Severe signals' },
            { tone: 'warning', count: warningCount, label: 'Warnings' },
            { tone: 'watch',   count: watchCount,   label: 'Watch items' },
            { tone: 'calm',    count: items.length - severeCount - warningCount - watchCount, label: 'Nominal readings' },
          ] as { tone: SignalTone; count: number; label: string }[]).map((s) => (
            <div key={s.label} className={`p-4 rounded-xl border ${TONE[s.tone].border} ${TONE[s.tone].bg} backdrop-blur`}>
              <div className={`font-display text-3xl ${TONE[s.tone].text}`}>{s.count}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            const count = f.id === 'all' ? items.length : items.filter((i) => i.domain === f.id).length;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3 py-1.5 rounded-full border text-xs font-mono uppercase tracking-wider transition ${
                  active
                    ? 'border-realm-observatory bg-realm-observatory/20 text-realm-observatory'
                    : 'border-border/40 bg-card/30 text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                {f.label} <span className="opacity-60 ml-1">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Changelog feed */}
        {loading && items.length === 0 ? (
          <div className="py-24 text-center text-muted-foreground text-sm font-mono uppercase tracking-widest">
            Composing briefing…
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center text-muted-foreground text-sm font-mono uppercase tracking-widest">
            No signals in this domain right now.
          </div>
        ) : (
          <ol className="relative border-l border-border/40 ml-2 space-y-4">
            {filtered.map((item) => {
              const dm = DOMAIN_META[item.domain];
              const Icon = item.icon;
              const tone = TONE[item.tone];
              const content = (
                <div className={`p-4 rounded-xl border ${tone.border} ${tone.bg} backdrop-blur group hover:border-realm-observatory/60 transition`}>
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 p-2 rounded-lg border ${tone.border} ${tone.bg}`}>
                      <Icon className={`w-4 h-4 ${tone.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`text-[9px] uppercase tracking-[0.25em] font-mono ${dm.accent}`}>
                          {dm.label}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-mono border ${tone.border} ${tone.text}`}>
                          {tone.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono ml-auto">
                          {fmtTime(item.timestamp)}
                        </span>
                      </div>
                      <div className="text-foreground font-semibold leading-snug">{item.title}</div>
                      <p className="text-sm text-muted-foreground mt-1">{item.body}</p>
                      {item.meta && (
                        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono mt-2">
                          {item.meta}
                        </div>
                      )}
                    </div>
                    {item.href && (
                      <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition mt-2" />
                    )}
                  </div>
                </div>
              );
              return (
                <li key={item.id} className="ml-4">
                  <span className={`absolute -left-[5px] w-2.5 h-2.5 rounded-full ${tone.dot} border border-background`} />
                  {item.href ? (
                    item.href.startsWith('http') ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">{content}</a>
                    ) : (
                      <Link to={item.href} className="block">{content}</Link>
                    )
                  ) : content}
                </li>
              );
            })}
          </ol>
        )}

        {/* Hub footer */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { to: '/observatory', label: 'Observatory Map', icon: Radar },
            { to: '/earth-pulse', label: 'Earth Pulse',     icon: Activity },
            { to: '/disclosure',  label: 'Disclosure Command', icon: Gavel },
            { to: '/whistleblowers', label: 'Whistleblowers',  icon: Users },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className="p-3 rounded-xl border border-border/40 bg-card/30 backdrop-blur hover:border-realm-observatory/60 transition flex items-center gap-2"
              >
                <Icon className="w-4 h-4 text-realm-observatory" />
                <span className="text-sm text-foreground">{t.label}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default DailyBriefingPage;
