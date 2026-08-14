import { useEffect, useMemo, useState } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { fetchGatewayJson } from '@/lib/live-data';

interface StormMarker {
  id: string;
  event: string;
  severity: string;
  area: string;
  url: string;
  lat: number;
  lon: number;
}

interface Props {
  radius?: number;
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

function severityColor(sev: string): string {
  const s = sev.toLowerCase();
  if (s === 'extreme') return '#DC2626';
  if (s === 'severe') return '#F97316';
  return '#F59E0B';
}

function centroid(coords: any): [number, number] | null {
  // Handles Polygon / MultiPolygon / Point
  try {
    const flat: [number, number][] = [];
    const walk = (arr: any) => {
      if (!Array.isArray(arr)) return;
      if (typeof arr[0] === 'number' && typeof arr[1] === 'number') {
        flat.push([arr[0], arr[1]]);
        return;
      }
      for (const it of arr) walk(it);
    };
    walk(coords);
    if (!flat.length) return null;
    let lon = 0, lat = 0;
    for (const [x, y] of flat) { lon += x; lat += y; }
    return [lat / flat.length, lon / flat.length];
  } catch { return null; }
}

export function NwsStormLayer({ radius = 1.006, refreshMs = 5 * 60_000, onCount }: Props) {
  const [storms, setStorms] = useState<StormMarker[]>([]);
  const [hover, setHover] = useState<StormMarker | null>(null);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const json = await fetchGatewayJson<any>('nws');
        if (!json) throw new Error('gateway unavailable');
        const features = (json?.features ?? []) as any[];
        const list: StormMarker[] = [];
        for (const f of features) {
          const p = f?.properties ?? {};
          const geom = f?.geometry;
          const c = geom ? centroid(geom.coordinates) : null;
          if (!c) continue;
          list.push({
            id: String(f.id ?? p.id ?? list.length),
            event: String(p.event ?? 'Alert'),
            severity: String(p.severity ?? 'Severe'),
            area: String(p.areaDesc ?? '').split(';')[0].trim(),
            url: String(p.uri ?? p['@id'] ?? 'https://www.weather.gov/'),
            lat: c[0], lon: c[1],
          });
        }
        if (!alive) return;
        setStorms(list);
        onCount?.(list.length);
      } catch {
        if (alive) { setStorms([]); onCount?.(0); }
      }
    };
    void load();
    const id = window.setInterval(load, refreshMs);
    return () => { alive = false; window.clearInterval(id); };
  }, [refreshMs, onCount]);

  const markers = useMemo(
    () => storms.map(s => ({
      s,
      pos: latLonToVec3(s.lat, s.lon, radius),
      color: severityColor(s.severity),
    })),
    [storms, radius]
  );

  return (
    <group>
      {markers.map(({ s, pos, color }) => (
        <mesh
          key={s.id}
          position={pos}
          onPointerOver={(e) => { e.stopPropagation(); setHover(s); document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { setHover(h => (h?.id === s.id ? null : h)); document.body.style.cursor = 'auto'; }}
          onClick={(e) => { e.stopPropagation(); window.open(s.url, '_blank', 'noopener,noreferrer'); }}
        >
          <coneGeometry args={[0.009, 0.024, 6]} />
          <meshBasicMaterial color={color} transparent opacity={0.95} />
          <mesh>
            <sphereGeometry args={[0.016, 10, 10]} />
            <meshBasicMaterial color={color} transparent opacity={0.22} />
          </mesh>
        </mesh>
      ))}

      {hover && (
        <Html
          position={latLonToVec3(hover.lat, hover.lon, radius + 0.04)}
          center distanceFactor={2.4} style={{ pointerEvents: 'none' }}
        >
          <div className="px-3 py-2 rounded-md bg-background/90 backdrop-blur-md border border-amber-500/50 shadow-lg min-w-[200px]">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: severityColor(hover.severity) }} />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">{hover.event}</span>
            </div>
            <p className="text-[11px] text-foreground/90 leading-tight">{hover.area || 'United States'}</p>
            <p className="text-[10px] text-muted-foreground font-mono mt-1 uppercase">{hover.severity}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

export default NwsStormLayer;
