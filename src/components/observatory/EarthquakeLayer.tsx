import { useEffect, useMemo, useState } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { fetchGatewayJson } from '@/lib/live-data';

/**
 * Phase 3.1 — Earthquake layer for the Observatory globe.
 * Pulls USGS M4.5+ past-7-days feed **through the Pantheon Data Gateway**
 * (edge proxy: cache + stale-serve + no browser CORS) and renders
 * magnitude-colored markers on the globe surface with hover tooltips.
 */


interface Quake {
  id: string;
  mag: number;
  place: string;
  time: number;
  url: string;
  lon: number;
  lat: number;
  depth: number;
}

interface Props {
  /** Globe radius the markers sit on. */
  radius?: number;
  /** Optional refresh interval ms (default 5 min). */
  refreshMs?: number;
  onCount?: (n: number) => void;
}

function latLonToVec3(lat: number, lon: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function magColor(mag: number): string {
  if (mag >= 7) return '#DC2626'; // crimson
  if (mag >= 6) return '#F97316'; // orange
  if (mag >= 5) return '#F59E0B'; // amber
  return '#22D3EE'; // cyan
}

function magSize(mag: number): number {
  return 0.006 + Math.max(0, mag - 4) * 0.0055;
}

export function EarthquakeLayer({ radius = 1.005, refreshMs = 5 * 60_000, onCount }: Props) {
  const [quakes, setQuakes] = useState<Quake[]>([]);
  const [hover, setHover] = useState<Quake | null>(null);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const json = await fetchGatewayJson<{ features?: Array<{ id: string; properties: { mag: number; place?: string; time: number; url: string }; geometry: { coordinates: number[] } }> }>('earthquakes_week');
        if (!json) throw new Error('gateway unavailable');
        const list: Quake[] = (json.features ?? [])
          .filter((f) => typeof f?.properties?.mag === 'number')
          .map((f) => ({
            id: f.id,
            mag: f.properties.mag,
            place: f.properties.place ?? 'Unknown region',
            time: f.properties.time,
            url: f.properties.url,
            lon: f.geometry.coordinates[0],
            lat: f.geometry.coordinates[1],
            depth: f.geometry.coordinates[2] ?? 0,
          }));
        if (!alive) return;
        setQuakes(list);
        onCount?.(list.length);
      } catch {
        if (alive) setQuakes([]);
      }
    };
    void load();
    const id = window.setInterval(load, refreshMs);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, [refreshMs, onCount]);

  const markers = useMemo(
    () =>
      quakes.map(q => ({
        q,
        pos: latLonToVec3(q.lat, q.lon, radius + magSize(q.mag) * 0.6),
        color: magColor(q.mag),
        size: magSize(q.mag),
      })),
    [quakes, radius]
  );

  return (
    <group>
      {markers.map(({ q, pos, color, size }) => (
        <mesh
          key={q.id}
          position={pos}
          onPointerOver={e => {
            e.stopPropagation();
            setHover(q);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHover(h => (h?.id === q.id ? null : h));
            document.body.style.cursor = 'auto';
          }}
          onClick={e => {
            e.stopPropagation();
            window.open(q.url, '_blank', 'noopener,noreferrer');
          }}
        >
          <sphereGeometry args={[size, 12, 12]} />
          <meshBasicMaterial color={color} transparent opacity={0.95} />
          {/* Halo */}
          <mesh>
            <sphereGeometry args={[size * 1.8, 12, 12]} />
            <meshBasicMaterial color={color} transparent opacity={0.18} />
          </mesh>
        </mesh>
      ))}

      {hover && (
        <Html
          position={latLonToVec3(hover.lat, hover.lon, radius + magSize(hover.mag) * 2.4)}
          center
          distanceFactor={2.4}
          zIndexRange={[100, 0]}
          style={{ pointerEvents: 'none' }}
        >
          <div className="px-3 py-2 rounded-md bg-background/90 backdrop-blur-md border border-primary/40 shadow-lg min-w-[180px]">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: magColor(hover.mag) }}
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">
                M {hover.mag.toFixed(1)}
              </span>
            </div>
            <p className="text-[11px] text-foreground/90 leading-tight">{hover.place}</p>
            <p className="text-[10px] text-muted-foreground font-mono mt-1">
              {new Date(hover.time).toUTCString().slice(5, 22)} · {Math.round(hover.depth)} km
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}

export default EarthquakeLayer;
