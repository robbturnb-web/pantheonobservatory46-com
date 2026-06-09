import { useEffect, useMemo, useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { fetchISS, type IssReading } from '@/lib/live-data';

interface Props {
  radius?: number;
  refreshMs?: number;
  onReading?: (r: IssReading | null) => void;
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

export function IssLayer({ radius = 1, refreshMs = 15_000, onReading }: Props) {
  const [iss, setIss] = useState<IssReading | null>(null);
  const trailRef = useRef<THREE.Vector3[]>([]);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      const r = await fetchISS();
      if (!alive) return;
      if (r.ok) {
        setIss(r.value);
        onReading?.(r.value);
      } else {
        onReading?.(null);
      }
    };
    void load();
    const id = window.setInterval(load, refreshMs);
    return () => { alive = false; window.clearInterval(id); };
  }, [refreshMs, onReading]);

  // ISS orbits ~408km above Earth — scale relative to globe radius (6371km)
  const issAlt = useMemo(() => radius * (1 + 408 / 6371), [radius]);

  const pos = useMemo(() => {
    if (!iss) return null;
    const v = latLonToVec3(iss.latitude, iss.longitude, issAlt);
    const trail = trailRef.current;
    trail.push(v);
    if (trail.length > 40) trail.shift();
    return v;
  }, [iss, issAlt]);

  const trailGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setFromPoints(trailRef.current);
    return g;
  }, [pos]);

  if (!pos || !iss) return null;

  return (
    <group>
      {/* Trail */}
      <line>
        <primitive object={trailGeo} attach="geometry" />
        <lineBasicMaterial color="#22D3EE" transparent opacity={0.5} />
      </line>

      {/* ISS marker */}
      <mesh
        position={pos}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto'; }}
      >
        <sphereGeometry args={[0.014, 14, 14]} />
        <meshBasicMaterial color="#E5F8FF" />
        <mesh>
          <sphereGeometry args={[0.028, 14, 14]} />
          <meshBasicMaterial color="#22D3EE" transparent opacity={0.35} />
        </mesh>
      </mesh>

      {hover && (
        <Html position={pos} center distanceFactor={2.4} style={{ pointerEvents: 'none' }}>
          <div className="px-3 py-2 rounded-md bg-background/90 backdrop-blur-md border border-realm-cosmos/50 shadow-lg min-w-[180px]">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block w-2 h-2 rounded-full bg-realm-cosmos animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">ISS · ZARYA</span>
            </div>
            <p className="text-[11px] text-foreground/90 font-mono">
              {iss.latitude.toFixed(2)}°, {iss.longitude.toFixed(2)}°
            </p>
            <p className="text-[10px] text-muted-foreground font-mono mt-1">
              {Math.round(iss.altitudeKm)} km · {Math.round(iss.velocityKmH).toLocaleString()} km/h
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}

export default IssLayer;
