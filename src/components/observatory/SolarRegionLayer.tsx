import { useEffect, useMemo, useState } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { fetchKp, fetchFlare } from '@/lib/live-data';

interface Props {
  radius?: number;
  refreshMs?: number;
  onActivity?: (level: 'quiet' | 'unsettled' | 'storm' | 'unknown') => void;
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

// Subsolar point: where the sun is directly overhead at this moment.
function subsolarPoint(date: Date): { lat: number; lon: number } {
  const d = date.getTime() / 86_400_000 - 10957.5; // days since J2000
  const g = ((357.529 + 0.98560028 * d) % 360) * (Math.PI / 180);
  const q = (280.459 + 0.98564736 * d) % 360;
  const L = (q + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) * (Math.PI / 180);
  const e = (23.439 - 0.00000036 * d) * (Math.PI / 180);
  const decl = Math.asin(Math.sin(e) * Math.sin(L)) * (180 / Math.PI);
  const utHours = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
  let lon = -15 * (utHours - 12);
  // Equation of time correction (approx)
  const eot = (q - (Math.atan2(Math.cos(e) * Math.sin(L), Math.cos(L)) * 180 / Math.PI)) % 360;
  lon -= eot / 4;
  if (lon > 180) lon -= 360;
  if (lon < -180) lon += 360;
  return { lat: decl, lon };
}

export function SolarRegionLayer({ radius = 1, refreshMs = 60_000, onActivity }: Props) {
  const [tick, setTick] = useState(0);
  const [kp, setKp] = useState<number | null>(null);
  const [flareClass, setFlareClass] = useState<string | null>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setTick(t => t + 1), refreshMs);
    return () => window.clearInterval(id);
  }, [refreshMs]);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      const [k, f] = await Promise.all([fetchKp(), fetchFlare()]);
      if (!alive) return;
      const kpVal = k.ok ? k.value.kp : null;
      setKp(kpVal);
      setFlareClass(f.ok ? f.value.class : null);
      if (kpVal === null) onActivity?.('unknown');
      else if (kpVal >= 5) onActivity?.('storm');
      else if (kpVal >= 4) onActivity?.('unsettled');
      else onActivity?.('quiet');
    };
    void load();
    const id = window.setInterval(load, 5 * 60_000);
    return () => { alive = false; window.clearInterval(id); };
  }, [onActivity]);

  const sub = useMemo(() => subsolarPoint(new Date()), [tick]);
  const pos = useMemo(() => latLonToVec3(sub.lat, sub.lon, radius * 1.18), [sub, radius]);
  const surfacePos = useMemo(() => latLonToVec3(sub.lat, sub.lon, radius * 1.005), [sub, radius]);

  const intensity = kp === null ? 0.5 : Math.min(1, 0.35 + (kp / 9) * 0.65);
  const color = kp !== null && kp >= 5 ? '#DC2626' : kp !== null && kp >= 4 ? '#F97316' : '#FCD34D';

  return (
    <group>
      {/* Sub-solar core on surface */}
      <mesh
        position={surfacePos}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto'; }}
      >
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>

      {/* Sun direction beacon above globe */}
      <mesh position={pos}>
        <sphereGeometry args={[0.045, 20, 20]} />
        <meshBasicMaterial color={color} transparent opacity={intensity * 0.55} />
        <mesh>
          <sphereGeometry args={[0.075, 20, 20]} />
          <meshBasicMaterial color={color} transparent opacity={intensity * 0.18} />
        </mesh>
      </mesh>

      {hover && (
        <Html position={surfacePos} center distanceFactor={2.4} style={{ pointerEvents: 'none' }}>
          <div className="px-3 py-2 rounded-md bg-background/90 backdrop-blur-md border border-amber-500/50 shadow-lg min-w-[200px]">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: color }} />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">
                Subsolar Point
              </span>
            </div>
            <p className="text-[11px] text-foreground/90 font-mono">
              {sub.lat.toFixed(1)}°, {sub.lon.toFixed(1)}°
            </p>
            <p className="text-[10px] text-muted-foreground font-mono mt-1">
              Kp {kp === null ? '—' : kp.toFixed(1)} · X-ray {flareClass ?? '—'}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}

export default SolarRegionLayer;
