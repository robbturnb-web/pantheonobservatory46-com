import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import type { DossierEntry } from '@/components/dossier/types';
import { brazilCoords } from '@/data/brazil-coords';

declare global {
  interface Window {
    google?: any;
    __pantheonBrazilMapInit?: () => void;
  }
}

const BROWSER_KEY = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY as string | undefined;
const CHANNEL = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID as string | undefined;

let loaderPromise: Promise<void> | null = null;
function loadMaps(): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('SSR'));
  if (window.google?.maps) return Promise.resolve();
  if (loaderPromise) return loaderPromise;
  if (!BROWSER_KEY) return Promise.reject(new Error('Missing Google Maps browser key'));

  loaderPromise = new Promise<void>((resolve, reject) => {
    window.__pantheonBrazilMapInit = () => resolve();
    const s = document.createElement('script');
    const ch = CHANNEL ? `&channel=${encodeURIComponent(CHANNEL)}` : '';
    s.src = `https://maps.googleapis.com/maps/api/js?key=${BROWSER_KEY}&loading=async&callback=__pantheonBrazilMapInit${ch}`;
    s.async = true;
    s.defer = true;
    s.onerror = () => reject(new Error('Failed to load Google Maps'));
    document.head.appendChild(s);
  });
  return loaderPromise;
}

interface BrazilMapProps {
  entries: DossierEntry[];
  accent: string;
  accentAlt: string;
  surface: string;
  border: string;
  fg: string;
  onSelect: (entry: DossierEntry) => void;
}

export function BrazilMap({ entries, accent, accentAlt, surface, border, fg, onSelect }: BrazilMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadMaps()
      .then(() => {
        if (cancelled || !containerRef.current) return;
        const g = window.google!;
        const map = new g.maps.Map(containerRef.current, {
          center: { lat: -12.5, lng: -48 },
          zoom: 4,
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
          backgroundColor: '#04130a',
          styles: NIGHT_STYLES,
        });
        mapRef.current = map;
        setReady(true);

        const info = new g.maps.InfoWindow({ disableAutoPan: false });

        entries.forEach((entry) => {
          const c = brazilCoords[entry.id];
          if (!c) return;
          const marker = new g.maps.Marker({
            position: { lat: c.lat, lng: c.lng },
            map,
            title: c.pinLabel,
            icon: {
              path: g.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: accent,
              fillOpacity: 0.95,
              strokeColor: accentAlt,
              strokeWeight: 2,
            },
            animation: g.maps.Animation.DROP,
          });
          marker.addListener('mouseover', () => setHoverId(entry.id));
          marker.addListener('mouseout', () => setHoverId(null));
          marker.addListener('click', () => {
            info.setContent(
              `<div style="font-family:'Space Grotesk',sans-serif;color:#0a0f0a;max-width:240px">
                <div style="font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#16a34a;margin-bottom:4px">${entry.category ?? 'CASE'} · ${entry.era ?? ''}</div>
                <div style="font-weight:700;font-size:14px;margin-bottom:4px">${entry.title}</div>
                <div style="font-size:12px;line-height:1.4;color:#374151;margin-bottom:8px">${(entry.subtitle ?? '').replace(/</g, '&lt;')}</div>
                <button id="bp-open-${entry.id}" style="background:${accent};color:#04130a;font-weight:700;font-size:11px;letter-spacing:.15em;text-transform:uppercase;padding:6px 10px;border:0;border-radius:4px;cursor:pointer">Open dossier →</button>
              </div>`
            );
            info.open({ map, anchor: marker });
            g.maps.event.addListenerOnce(info, 'domready', () => {
              const btn = document.getElementById(`bp-open-${entry.id}`);
              btn?.addEventListener('click', () => {
                info.close();
                onSelect(entry);
              });
            });
          });
        });
      })
      .catch((e) => setError(e.message ?? 'Map failed to load'));

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className="relative rounded-lg overflow-hidden border"
      style={{ borderColor: border, background: surface }}
      aria-label="Interactive map of Brazilian UAP cases"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: border }}>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" style={{ color: accent }} />
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase" style={{ color: fg, fontFamily: "'Space Mono', monospace" }}>
            Field Map · Brazil UAP Sites
          </h2>
        </div>
        <span className="text-[10px] opacity-60 tracking-widest uppercase" style={{ color: fg }}>
          {entries.filter((e) => brazilCoords[e.id]).length} cases
        </span>
      </div>

      <div className="relative">
        <div ref={containerRef} className="w-full h-[460px] md:h-[560px]" />
        {!ready && !error && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: surface }}>
            <div className="text-xs tracking-widest uppercase opacity-70" style={{ color: fg }}>
              Locking onto coordinates…
            </div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center" style={{ background: surface }}>
            <div className="text-sm font-bold mb-2" style={{ color: accent }}>Map unavailable</div>
            <div className="text-xs opacity-70 max-w-sm" style={{ color: fg }}>{error}</div>
          </div>
        )}
      </div>

      {/* Quick-jump legend */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 p-3 border-t" style={{ borderColor: border }}>
        {entries.filter((e) => brazilCoords[e.id]).map((e) => {
          const c = brazilCoords[e.id];
          const active = hoverId === e.id;
          return (
            <button
              key={e.id}
              onMouseEnter={() => setHoverId(e.id)}
              onMouseLeave={() => setHoverId(null)}
              onClick={() => {
                if (mapRef.current) {
                  mapRef.current.panTo({ lat: c.lat, lng: c.lng });
                  mapRef.current.setZoom(6);
                }
                onSelect(e);
              }}
              className="flex items-center gap-2 px-2.5 py-2 rounded text-left transition-all"
              style={{
                background: active ? `${accent}25` : `${accent}08`,
                border: `1px solid ${active ? accent : border}`,
              }}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: accent, boxShadow: `0 0 6px ${accent}` }} />
              <span className="flex-1 min-w-0">
                <span className="block text-[11px] font-bold truncate" style={{ color: fg }}>{e.title}</span>
                <span className="block text-[9px] opacity-60 tracking-wider uppercase truncate" style={{ color: fg }}>{e.era}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

// Dark "redaction green" map styling to match the Brazil dossier theme.
const NIGHT_STYLES = [
  { elementType: 'geometry', stylers: [{ color: '#06150c' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#04130a' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#7aa583' }] },
  { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: '#22c55e' }, { weight: 0.6 }] },
  { featureType: 'administrative.province', elementType: 'geometry.stroke', stylers: [{ color: '#166534' }] },
  { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#0a2818' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#031208' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#3a7857' }] },
];
