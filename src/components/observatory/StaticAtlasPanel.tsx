/**
 * StaticAtlasPanel — global "knowledge atlas" overlay shown below the
 * live Observatory globe. Glowing pins for ancient ruins, pyramids,
 * megaliths, UAP hotspots, volcanoes, observatories, restricted sites,
 * lost cities. Filter chips toggle categories.
 *
 * No external map library required — renders an SVG world equirectangular
 * projection so it works without a Google Maps API key. Gracefully shows
 * "Google Maps API required for live map · Static Atlas Mode Active" notice.
 */
import { useMemo, useState } from 'react';
import { Globe2, MapPin } from 'lucide-react';

type Category =
  | 'ancient' | 'pyramid' | 'megalith' | 'uap'
  | 'volcano' | 'observatory' | 'restricted' | 'lost';

interface Pin {
  id: string;
  name: string;
  category: Category;
  lat: number;
  lon: number;
}

const PINS: Pin[] = [
  // Ancient
  { id: 'gobekli', name: 'Göbekli Tepe', category: 'ancient', lat: 37.22, lon: 38.92 },
  { id: 'macchu', name: 'Machu Picchu', category: 'ancient', lat: -13.16, lon: -72.54 },
  { id: 'angkor', name: 'Angkor Wat', category: 'ancient', lat: 13.41, lon: 103.87 },
  // Pyramids
  { id: 'giza', name: 'Giza Pyramids', category: 'pyramid', lat: 29.98, lon: 31.13 },
  { id: 'teotihuacan', name: 'Teotihuacán', category: 'pyramid', lat: 19.69, lon: -98.84 },
  { id: 'bosnian', name: 'Bosnian Pyramids', category: 'pyramid', lat: 43.97, lon: 18.18 },
  // Megaliths
  { id: 'stonehenge', name: 'Stonehenge', category: 'megalith', lat: 51.18, lon: -1.83 },
  { id: 'sacsayhuaman', name: 'Sacsayhuamán', category: 'megalith', lat: -13.51, lon: -71.98 },
  { id: 'easter', name: 'Easter Island', category: 'megalith', lat: -27.12, lon: -109.37 },
  // UAP hotspots
  { id: 'roswell', name: 'Roswell, NM', category: 'uap', lat: 33.39, lon: -104.52 },
  { id: 'rendlesham', name: 'Rendlesham Forest', category: 'uap', lat: 52.09, lon: 1.45 },
  { id: 'tic-tac', name: 'Nimitz / Tic-Tac', category: 'uap', lat: 32.5, lon: -118.5 },
  { id: 'brazil-il', name: 'Ilha das Cobras', category: 'uap', lat: -23.85, lon: -45.42 },
  // Volcanoes
  { id: 'yellowstone', name: 'Yellowstone', category: 'volcano', lat: 44.43, lon: -110.59 },
  { id: 'etna', name: 'Mount Etna', category: 'volcano', lat: 37.75, lon: 14.99 },
  { id: 'fuji', name: 'Mount Fuji', category: 'volcano', lat: 35.36, lon: 138.73 },
  // Observatories
  { id: 'mauna-kea', name: 'Mauna Kea', category: 'observatory', lat: 19.82, lon: -155.47 },
  { id: 'atacama', name: 'ALMA — Atacama', category: 'observatory', lat: -23.02, lon: -67.75 },
  { id: 'arecibo', name: 'Arecibo (legacy)', category: 'observatory', lat: 18.34, lon: -66.75 },
  // Restricted
  { id: 'area51', name: 'Area 51', category: 'restricted', lat: 37.24, lon: -115.81 },
  { id: 'pine-gap', name: 'Pine Gap', category: 'restricted', lat: -23.8, lon: 133.74 },
  { id: 'svalbard', name: 'Svalbard Seed Vault', category: 'restricted', lat: 78.24, lon: 15.49 },
  { id: 'cheyenne', name: 'Cheyenne Mountain', category: 'restricted', lat: 38.74, lon: -104.85 },
  // Lost cities
  { id: 'dwarka', name: 'Dwarka (submerged)', category: 'lost', lat: 22.24, lon: 68.97 },
  { id: 'thonis', name: 'Thonis-Heracleion', category: 'lost', lat: 31.31, lon: 30.1 },
  { id: 'iram', name: 'Iram (Ubar)', category: 'lost', lat: 18.27, lon: 53.63 },
];

const CATEGORIES: { id: Category; label: string; color: string }[] = [
  { id: 'ancient', label: 'Ancient Ruins', color: '#D6B35A' },
  { id: 'pyramid', label: 'Pyramids', color: '#fbbf24' },
  { id: 'megalith', label: 'Megaliths', color: '#a78bfa' },
  { id: 'uap', label: 'UAP Hotspots', color: '#10b981' },
  { id: 'volcano', label: 'Volcanoes', color: '#f97316' },
  { id: 'observatory', label: 'Observatories', color: '#22D3EE' },
  { id: 'restricted', label: 'Restricted', color: '#DC2626' },
  { id: 'lost', label: 'Lost Cities', color: '#7C3AED' },
];

function project(lat: number, lon: number) {
  // Equirectangular projection → percentages
  const x = ((lon + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return { x, y };
}

export function StaticAtlasPanel() {
  const [active, setActive] = useState<Record<Category, boolean>>({
    ancient: true, pyramid: true, megalith: true, uap: true,
    volcano: true, observatory: true, restricted: true, lost: true,
  });

  const hasMapsKey = Boolean(import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY);

  const visible = useMemo(() => PINS.filter((p) => active[p.category]), [active]);
  const colorOf = (c: Category) => CATEGORIES.find((x) => x.id === c)?.color ?? '#fff';

  return (
    <div className="mt-10">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[10px] uppercase tracking-[0.3em] text-realm-observatory font-mono">
          Global Knowledge Atlas
        </span>
        <span className="h-px flex-1 bg-realm-observatory/30" />
      </div>
      <h2 className="font-display text-2xl sm:text-3xl text-foreground mb-2">
        Mystery & Knowledge <span className="text-realm-observatory">Atlas</span>
      </h2>
      <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
        Every major site Pantheon tracks, mapped to where it actually is on Earth.
      </p>

      {/* Mode banner */}
      <div className="rounded-lg border border-realm-observatory/30 bg-realm-observatory/5 px-3 py-2 mb-4 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[1.5px] font-mono">
        <Globe2 className="w-3.5 h-3.5 text-realm-observatory" />
        <span className="text-realm-observatory">Static Atlas Mode</span>
        <span className="text-muted-foreground">·</span>
        <span className="text-muted-foreground">
          {hasMapsKey ? 'Live map layer available · static view shown for resilience' : 'Google Maps API required for live map'}
        </span>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {CATEGORIES.map((c) => {
          const on = active[c.id];
          return (
            <button
              key={c.id}
              onClick={() => setActive((a) => ({ ...a, [c.id]: !a[c.id] }))}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] uppercase tracking-[1px] font-mono transition"
              style={{
                borderColor: on ? c.color : 'rgba(255,255,255,0.15)',
                background: on ? `${c.color}15` : 'transparent',
                color: on ? c.color : 'hsl(var(--muted-foreground))',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.color, opacity: on ? 1 : 0.4 }} />
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Map canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-realm-observatory/30 bg-[#05030D]">
        <div className="relative w-full aspect-[2/1]">
          {/* Grid background */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(124,58,237,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,58,237,0.4) 1px, transparent 1px)',
              backgroundSize: '5% 10%',
            }}
          />
          {/* Equator + meridian */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-realm-observatory/40" />
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-realm-observatory/40" />
          {/* Subtle continent ghost — abstract dot field */}
          <svg viewBox="0 0 360 180" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-30">
            <ellipse cx="100" cy="65" rx="40" ry="22" fill="#1A1038" />
            <ellipse cx="180" cy="55" rx="55" ry="30" fill="#1A1038" />
            <ellipse cx="280" cy="65" rx="35" ry="25" fill="#1A1038" />
            <ellipse cx="100" cy="115" rx="20" ry="35" fill="#1A1038" />
            <ellipse cx="195" cy="120" rx="32" ry="30" fill="#1A1038" />
            <ellipse cx="290" cy="125" rx="22" ry="20" fill="#1A1038" />
          </svg>

          {/* Pins */}
          {visible.map((p) => {
            const { x, y } = project(p.lat, p.lon);
            const color = colorOf(p.category);
            return (
              <div
                key={p.id}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
                title={p.name}
              >
                <span
                  className="block w-2.5 h-2.5 rounded-full motion-safe:animate-pulse"
                  style={{
                    background: color,
                    boxShadow: `0 0 12px ${color}, 0 0 4px ${color}`,
                  }}
                />
                <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-3 whitespace-nowrap text-[9px] font-mono uppercase tracking-[1px] opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-1.5 py-0.5 rounded"
                  style={{ color }}>
                  {p.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-[10px] uppercase tracking-[1.5px] font-mono text-muted-foreground mt-3 flex items-center gap-1.5">
        <MapPin className="w-3 h-3" /> {visible.length} of {PINS.length} sites visible · {CATEGORIES.length} categories
      </p>
    </div>
  );
}

export default StaticAtlasPanel;
