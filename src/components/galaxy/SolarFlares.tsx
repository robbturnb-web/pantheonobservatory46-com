import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Animated solar surface flares + occasional CME bursts.
 * Flare tendrils are thin curved cones erupting from the sun surface, looping in/out.
 * CME = a bright disc that expands outward and fades, simulating coronal mass ejection.
 */

interface FlareProps {
  baseRadius: number;
}

function FlareTendril({ baseRadius, seed }: { baseRadius: number; seed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const params = useMemo(() => {
    const angle = (seed * 137.5) % 360 * (Math.PI / 180);
    const tilt = (Math.sin(seed * 7.3) * 0.5);
    return {
      angle, tilt,
      speed: 0.7 + (seed % 5) * 0.15,
      phase: seed * 1.7,
      length: baseRadius * (0.45 + (seed % 7) * 0.05),
    };
  }, [seed, baseRadius]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * params.speed + params.phase;
    // Pulse: scale Y from 0.2 to 1.0 then back, evoking erupting plasma
    const pulse = 0.25 + Math.abs(Math.sin(t)) * 0.85;
    ref.current.scale.y = pulse;
    // Position on the sun surface
    const sx = Math.cos(params.angle) * Math.cos(params.tilt);
    const sy = Math.sin(params.tilt);
    const sz = Math.sin(params.angle) * Math.cos(params.tilt);
    ref.current.position.set(
      sx * (baseRadius + params.length * pulse * 0.5),
      sy * (baseRadius + params.length * pulse * 0.5),
      sz * (baseRadius + params.length * pulse * 0.5),
    );
    ref.current.lookAt(0, 0, 0);
    ref.current.rotateX(Math.PI / 2);
  });

  return (
    <mesh ref={ref}>
      <coneGeometry args={[baseRadius * 0.06, params.length, 6]} />
      <meshBasicMaterial
        color="#fb923c"
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function CME({ baseRadius }: { baseRadius: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const startTime = useRef<number>(-9999);
  const direction = useRef(new THREE.Vector3(1, 0, 0));

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Trigger a new CME every ~25-45s
    if (t - startTime.current > 25 + Math.random() * 20) {
      startTime.current = t;
      const angle = Math.random() * Math.PI * 2;
      const tilt = (Math.random() - 0.5) * 0.6;
      direction.current.set(
        Math.cos(angle) * Math.cos(tilt),
        Math.sin(tilt),
        Math.sin(angle) * Math.cos(tilt),
      ).normalize();
    }

    const elapsed = t - startTime.current;
    const life = Math.min(elapsed / 6, 1); // 6s lifespan
    if (!ref.current) return;
    const dist = baseRadius + life * 8;
    ref.current.position.set(
      direction.current.x * dist,
      direction.current.y * dist,
      direction.current.z * dist,
    );
    const m = ref.current.material as THREE.MeshBasicMaterial;
    m.opacity = (1 - life) * 0.55;
    const s = 0.4 + life * 4;
    ref.current.scale.set(s, s, s);
    ref.current.lookAt(0, 0, 0);
  });

  return (
    <mesh ref={ref}>
      <ringGeometry args={[0.5, 0.9, 32]} />
      <meshBasicMaterial
        color="#f59e0b"
        transparent
        opacity={0}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

export function SolarFlares({ baseRadius }: FlareProps) {
  // Generate ~12 tendrils with deterministic seeds
  const seeds = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);
  return (
    <group>
      {seeds.map((s) => (
        <FlareTendril key={s} seed={s} baseRadius={baseRadius} />
      ))}
      <CME baseRadius={baseRadius} />
      <CME baseRadius={baseRadius} />
    </group>
  );
}
