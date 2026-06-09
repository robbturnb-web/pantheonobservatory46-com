import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Radar, ArrowLeft, Sparkles, AlertTriangle, Save, CheckCircle2, Orbit, Satellite } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { classifyStarSeed, type NatalChart, type ZodiacSign } from '@/lib/star-seed-classifier';
import { starSeeds, type StarSeedId } from '@/data/star-seeds';
import { BirthdayInput } from '@/components/starseed/BirthdayInput';
import { planetMeaning, readPlacement, type Planet } from '@/data/natal-interpretations';
import { getCurrentZodiacSeason, getSkyTimestamp, getTransitHighlights, planetGlyphs, zodiacGlyphs } from '@/data/zodiac-current';
import { computeCurrentSkyChart, computeNatalChart, getSavedStarSeed, saveStarSeed } from '@/services/star-seed-service';
import sigil from '@/assets/temple/sigil-46.png';

const FormSchema = z.object({
  name: z.string().trim().min(1, 'Required').max(80),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Enter a valid date'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'HH:MM'),
  city: z.string().trim().min(2, 'City required').max(120),
});
type FormValues = z.infer<typeof FormSchema>;

type Phase = 'idle' | 'scanning' | 'revealed' | 'error';

const SCAN_LINES = [
  'PARSING NATAL VECTOR…',
  'LOCKING ECLIPTIC COORDINATES…',
  'QUERYING SWISS EPHEMERIS…',
  'CROSS-REFERENCING LINEAGE DATABASE…',
  'STAR-SEED ORIGIN CONFIRMED',
];

const CURRENT_SKY_TIME = new Date('2026-06-01T15:00:00');
const currentSeason = getCurrentZodiacSeason(CURRENT_SKY_TIME);
const skyTimestamp = getSkyTimestamp(CURRENT_SKY_TIME);

export function StarSeedTerminalPage() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [scanIdx, setScanIdx] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [savedSeed, setSavedSeed] = useState<StarSeedId | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'guest'>('idle');
  const [currentSky, setCurrentSky] = useState<NatalChart | null>(null);
  const [result, setResult] = useState<{
    seedId: StarSeedId;
    confidence: number;
    chart: NatalChart;
    subjectName: string;
    placeLabel: string;
  } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: '', date: '', time: '12:00', city: '' },
  });

  // Load any previously-saved star seed for the signed-in user
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [storedSeed, sky] = await Promise.allSettled([getSavedStarSeed(), computeCurrentSkyChart()]);
      if (cancelled) return;
      if (storedSeed.status === 'fulfilled') setSavedSeed(storedSeed.value);
      if (sky.status === 'fulfilled') setCurrentSky(sky.value);
    })();
    return () => {
      cancelled = true;
    };
  }, []);


  const onSubmit = async (values: FormValues) => {
    console.log('[StarSeed] submit values', values);
    setError(null);
    setPhase('scanning');
    setScanIdx(0);

    const scanTimer = window.setInterval(() => {
      setScanIdx((i) => Math.min(i + 1, SCAN_LINES.length - 1));
    }, 700);

    try {
      const parsedValues = FormSchema.parse(values);
      const { chart, place } = await computeNatalChart({
        date: parsedValues.date,
        time: parsedValues.time,
        city: parsedValues.city,
      });
      console.log('[StarSeed] chart ok', { place: place.name });

      const classification = classifyStarSeed(chart);
      await new Promise((r) => window.setTimeout(r, 1400));

      setResult({
        seedId: classification.seed,
        confidence: classification.confidence,
        chart,
        subjectName: parsedValues.name,
        placeLabel: `${place.name}, ${place.country}`,
      });
      setPhase('revealed');

      setSaveStatus('saving');
      const saved = await saveStarSeed(classification.seed);
      console.log('[StarSeed] save result', saved);
      if (saved === 'saved') {
        setSavedSeed(classification.seed);
        setSaveStatus('saved');
      } else if (saved === 'guest') {
        setSaveStatus('guest');
      } else {
        setSaveStatus('idle');
      }

    } catch (e) {
      console.error('[StarSeed] scan failed', e);
      setError(e instanceof Error ? e.message : 'The Star Seed scan hit interference. Check the city, date, and time, then run it again.');
      setPhase('error');
    } finally {
      window.clearInterval(scanTimer);
    }
  };

  // Surface validation errors (e.g. invalid date/time/city) instead of silently doing nothing.
  const onInvalid = (errors: Record<string, { message?: string }>) => {
    console.warn('[StarSeed] validation errors', errors);
    const first = Object.values(errors).find((e) => e?.message)?.message;
    setError(first ?? 'Please fill in name, date of birth, time, and city before scanning.');
    setPhase('error');
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setPhase('idle');
    setScanIdx(0);
    form.reset();
  };

  const seed = result ? starSeeds[result.seedId] : null;

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <SEO
        title="Star-Seed Galactic Terminal — Pantheon Frequency 46"
        description="Find your galactic origin. The Terminal reads your natal chart through real ephemeris and reveals your star-seed lineage — Lyran, Sirian, Pleiadian, Arcturian, Andromedan, or Orion."
        canonical="/star-seed"
      />

      {/* Backdrop — flips to the seed's accent on reveal */}
      <motion.div
        className="absolute inset-0 -z-10 pointer-events-none"
        animate={{
          background: seed
            ? `radial-gradient(ellipse at top, ${seed.glow} 0%, transparent 55%), radial-gradient(ellipse at bottom, ${seed.glow} 0%, transparent 60%), linear-gradient(180deg, #05030D 0%, #02010a 100%)`
            : 'radial-gradient(ellipse at top, rgba(34, 211, 238, 0.10) 0%, transparent 55%), radial-gradient(ellipse at bottom, rgba(124, 58, 237, 0.08) 0%, transparent 60%), linear-gradient(180deg, #05030D 0%, #02010a 100%)',
        }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent 0 2px, rgba(255,255,255,0.4) 2px 3px)',
        }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Back to Sanctuary */}
        <Link
          to="/46"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[3px] text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Sanctuary
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-[10px] sm:text-xs uppercase tracking-[6px] text-primary/80 mb-3">
            Star-Seed Galactic Terminal
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground mb-3">
            Find Your Origin
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Real ephemeris. Real coordinates. Read through the Pantheon lineage framework.
          </p>
        </div>

        <div className="mb-5 rounded-lg border border-border/70 bg-background/55 p-4 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[3px] text-primary">
                <Satellite className="h-3.5 w-3.5" /> Live Sky Lock
              </div>
              <p className="text-sm font-semibold text-foreground">
                {zodiacGlyphs[currentSeason.sign]} {currentSeason.sign} season · {currentSeason.mantra}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">Pinned to {skyTimestamp}</p>
            </div>
            {currentSky && (
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-right font-mono text-[10px] uppercase tracking-[2px] text-muted-foreground">
                <span>{planetGlyphs.sun} {currentSky.sun.sign}</span>
                <span>{planetGlyphs.moon} {currentSky.moon.sign}</span>
                <span>{planetGlyphs.mercury} {currentSky.mercury.sign}</span>
                <span>{planetGlyphs.venus} {currentSky.venus.sign}</span>
              </div>
            )}
          </div>
        </div>

        {/* HUD frame */}
        <div
          className="relative rounded-2xl border bg-background/70 backdrop-blur-xl overflow-hidden"
          style={{
            borderColor: seed ? `${seed.accent}66` : 'rgba(34, 211, 238, 0.35)',
            boxShadow: seed
              ? `0 0 80px -20px ${seed.glow}`
              : '0 0 60px -20px rgba(34, 211, 238, 0.35)',
          }}
        >
          {/* HUD corner brackets */}
          {(['tl', 'tr', 'bl', 'br'] as const).map((corner) => (
            <div
              key={corner}
              className="absolute w-4 h-4 border-2"
              style={{
                top: corner.startsWith('t') ? 12 : undefined,
                bottom: corner.startsWith('b') ? 12 : undefined,
                left: corner.endsWith('l') ? 12 : undefined,
                right: corner.endsWith('r') ? 12 : undefined,
                borderColor: seed ? seed.accent : '#22d3ee',
                borderTopWidth: corner.startsWith('t') ? 2 : 0,
                borderBottomWidth: corner.startsWith('b') ? 2 : 0,
                borderLeftWidth: corner.endsWith('l') ? 2 : 0,
                borderRightWidth: corner.endsWith('r') ? 2 : 0,
              }}
            />
          ))}

          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {phase === 'idle' && (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[4px] text-cyan-400 font-mono">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      AWAITING SUBJECT
                    </div>
                    {savedSeed && (
                      <div className="text-[10px] uppercase tracking-[3px] font-mono flex items-center gap-1.5"
                           style={{ color: starSeeds[savedSeed].accent }}>
                        <CheckCircle2 className="w-3 h-3" />
                        Saved: {starSeeds[savedSeed].name}
                      </div>
                    )}
                  </div>

                  <Field label="Subject Name" error={form.formState.errors.name?.message}>
                    <input
                      {...form.register('name')}
                      placeholder="Your name"
                      className="hud-input"
                    />
                  </Field>

                  <Field label="Date of Birth" hint="MM / DD / YYYY" error={form.formState.errors.date?.message}>
                    <Controller
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <BirthdayInput value={field.value} onChange={field.onChange} />
                      )}
                    />
                  </Field>

                  <Field label="Time of Birth (Local)" hint="Use 12:00 if unknown" error={form.formState.errors.time?.message}>
                    <input
                      type="time"
                      {...form.register('time')}
                      className="hud-input"
                    />
                  </Field>


                  <Field
                    label="Birth City"
                    hint="Closest major city is fine"
                    error={form.formState.errors.city?.message}
                  >
                    <input
                      {...form.register('city')}
                      placeholder="e.g. Los Angeles"
                      className="hud-input"
                    />
                  </Field>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground text-sm font-bold uppercase tracking-[3px] hover:bg-primary/90 transition-colors mt-2"
                  >
                    <Radar className="w-4 h-4" />
                    Initiate Scan
                  </button>
                </motion.form>
              )}

              {phase === 'scanning' && (
                <motion.div
                  key="scan"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-10"
                >
                  {/* Sweeping scan line */}
                  <div className="relative h-1 w-full bg-cyan-500/10 rounded overflow-hidden mb-8">
                    <motion.div
                      className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                      animate={{ x: ['-100%', '300%'] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>

                  <div className="space-y-2 font-mono text-xs sm:text-sm text-cyan-300">
                    {SCAN_LINES.slice(0, scanIdx + 1).map((line, i) => (
                      <motion.div
                        key={line}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-cyan-500">›</span>
                        <span>{line}</span>
                        {i === scanIdx && (
                          <Loader2 className="w-3 h-3 animate-spin ml-2" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {phase === 'error' && error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-8 text-center"
                >
                  <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-3" />
                  <p className="text-sm text-foreground mb-4">{error}</p>
                  <button
                    onClick={reset}
                    className="text-xs uppercase tracking-[3px] text-primary hover:text-primary/80 transition-colors"
                  >
                    Retry Scan
                  </button>
                </motion.div>
              )}

              {phase === 'revealed' && seed && result && (
                <motion.div
                  key="reveal"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="py-2"
                >
                  <div
                    className="text-[10px] uppercase tracking-[5px] font-bold font-mono mb-3"
                    style={{ color: seed.accent }}
                  >
                    Identity Confirmed
                  </div>
                  <div className="flex items-start gap-4 mb-6">
                    <img
                      src={sigil}
                      alt=""
                      width={72}
                      height={72}
                      className="w-16 h-16 sm:w-20 sm:h-20 shrink-0"
                      style={{ filter: `drop-shadow(0 0 24px ${seed.glow})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs uppercase tracking-[3px] text-foreground/60">
                        {result.subjectName}
                      </div>
                      <h2
                        className="text-3xl sm:text-4xl font-black tracking-tight leading-none mt-1"
                        style={{ color: seed.accent }}
                      >
                        {seed.name}
                      </h2>
                      <div className="text-sm text-foreground/70 mt-1">{seed.title}</div>
                      <div className="text-[10px] uppercase tracking-[3px] text-muted-foreground mt-2 font-mono">
                        {seed.constellation} · {seed.vibration} · {result.confidence}% resonance
                      </div>
                    </div>
                  </div>

                  <div
                    className="rounded-lg border p-4 mb-5 italic text-sm"
                    style={{
                      borderColor: `${seed.accent}55`,
                      background: `${seed.accent}11`,
                      color: seed.accent,
                    }}
                  >
                    <Sparkles className="w-3.5 h-3.5 inline mr-2" />
                    {seed.echoGreeting}
                  </div>

                  <Dossier label="Origin">{seed.origin}</Dossier>
                  <Dossier label="Core Traits">
                    <ul className="space-y-1.5 list-disc pl-5">
                      {seed.traits.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </Dossier>
                  <Dossier label="Shadow Side">{seed.shadow}</Dossier>
                  <Dossier label="Mission This Incarnation">{seed.mission}</Dossier>
                  <Dossier label="Tie to the 46" accent={seed.accent}>
                    {seed.fortySixTie}
                  </Dossier>

                  {currentSky && (
                    <div className="mb-5 rounded-lg border bg-background/40 p-4" style={{ borderColor: `${seed.accent}33` }}>
                      <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[3px] font-mono" style={{ color: seed.accent }}>
                        <Orbit className="h-3.5 w-3.5" /> Current Transit Overlay
                      </div>
                      <p className="mb-3 text-xs text-muted-foreground">
                        Today’s sky is in {currentSeason.sign} season. Your scan was locked from {result.placeLabel}, then compared against the active planetary weather.
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-[11px] sm:grid-cols-4">
                        {(['sun', 'moon', 'mercury', 'venus'] as Planet[]).map((planet) => (
                          <div key={planet} className="rounded-md border border-border/60 bg-background/40 p-2">
                            <div className="font-mono text-[10px] uppercase tracking-[2px] text-muted-foreground">{planetGlyphs[planet]} {planetMeaning[planet].label}</div>
                            <div className="font-bold text-foreground">{zodiacGlyphs[currentSky[planet].sign]} {currentSky[planet].sign}</div>
                          </div>
                        ))}
                      </div>
                      {getTransitHighlights(result.chart, currentSky).length > 0 && (
                        <ul className="mt-3 space-y-1.5 text-xs text-foreground/80">
                          {getTransitHighlights(result.chart, currentSky).map((highlight) => <li key={highlight}>• {highlight}</li>)}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* Save status */}
                  {saveStatus !== 'idle' && (
                    <div
                      className="mt-2 mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[3px] font-mono"
                      style={{ color: saveStatus === 'saved' ? seed.accent : 'hsl(var(--muted-foreground))' }}
                    >
                      {saveStatus === 'saving' && <><Loader2 className="w-3 h-3 animate-spin" /> Saving to observer file…</>}
                      {saveStatus === 'saved' && <><Save className="w-3 h-3" /> Saved to your profile</>}
                      {saveStatus === 'guest' && (
                        <span>Sign in to save this chart to your profile.</span>
                      )}
                    </div>
                  )}

                  {/* Full natal breakdown with interpretations */}
                  <div className="mt-6 pt-5 border-t border-border/50">
                    <div
                      className="text-[10px] uppercase tracking-[3px] mb-1 font-mono font-bold"
                      style={{ color: seed.accent }}
                    >
                      Natal Chart — Full Breakdown
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">
                      Eight placements, eight signal channels. Each one tells a different part of your story.
                    </p>
                    <div className="space-y-3">
                      {(['sun', 'moon', 'ascendant', 'mercury', 'venus', 'mars', 'jupiter', 'saturn'] as Planet[]).map(
                        (planet) => {
                          const pos = result.chart[planet];
                          const meta = planetMeaning[planet];
                          return (
                            <div
                              key={planet}
                              className="rounded-lg border bg-background/40 p-3"
                              style={{ borderColor: `${seed.accent}33` }}
                            >
                              <div className="flex items-baseline justify-between gap-3 mb-1">
                                <div className="flex items-baseline gap-2">
                                  <span
                                    className="font-mono text-[10px] uppercase tracking-[3px] font-bold"
                                    style={{ color: seed.accent }}
                                  >
                                    {meta.label}
                                  </span>
                                  <span className="text-sm font-bold text-foreground">
                                    in {pos.sign}
                                  </span>
                                </div>
                                <span className="font-mono text-[10px] text-muted-foreground">
                                  {pos.degree.toFixed(1)}°
                                </span>
                              </div>
                              <div className="text-[10px] text-muted-foreground italic mb-1.5">
                                {meta.gloss}
                              </div>
                              <p className="text-xs text-foreground/85 leading-relaxed">
                                {readPlacement(planet, pos.sign as ZodiacSign)}
                              </p>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>

                  <button
                    onClick={reset}
                    className="mt-6 text-xs uppercase tracking-[3px] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Scan Another Subject
                  </button>

                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        .hud-input {
          width: 100%;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(34, 211, 238, 0.25);
          border-radius: 6px;
          padding: 10px 12px;
          font-size: 14px;
          color: hsl(var(--foreground));
          font-family: 'Space Mono', monospace;
          transition: border-color 0.2s;
        }
        .hud-input:focus {
          outline: none;
          border-color: rgba(34, 211, 238, 0.7);
        }
        .hud-input::placeholder {
          color: hsl(var(--muted-foreground));
        }
        .hud-input::-webkit-calendar-picker-indicator {
          filter: invert(0.7);
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[3px] text-cyan-300/80 mb-1.5 font-mono">
        {label}
        {hint && <span className="text-muted-foreground normal-case tracking-normal ml-2">· {hint}</span>}
      </label>
      {children}
      {error && <p className="text-[11px] text-destructive mt-1">{error}</p>}
    </div>
  );
}

function Dossier({
  label,
  children,
  accent,
}: {
  label: string;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <div className="mb-4">
      <div
        className="text-[10px] uppercase tracking-[4px] font-bold mb-1.5 font-mono"
        style={{ color: accent ?? 'hsl(var(--primary))' }}
      >
        {label}
      </div>
      <div className="text-sm text-foreground/80 leading-relaxed">{children}</div>
    </div>
  );
}
