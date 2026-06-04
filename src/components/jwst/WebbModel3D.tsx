import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

/**
 * Stylized low-poly James Webb Space Telescope.
 * Built from Three primitives — gold hex mirror, secondary on tripod,
 * 5-layer kapton sunshield, spacecraft bus, solar array.
 */
export function WebbModel3D({ autoRotate = true }: { autoRotate?: boolean }) {
  const root = useRef<Group>(null);

  useFrame((_, dt) => {
    if (autoRotate && root.current) {
      root.current.rotation.y += dt * 0.18;
    }
  });

  // 18 hex mirror segments — 1 center + 6 inner + 12 outer (real Webb has 18)
  const segments = useMemo(() => {
    const r = 0.55; // segment radius (point-to-flat distance ~= r * cos30)
    const apothem = r * Math.cos(Math.PI / 6);
    const w = apothem * 2;
    const positions: [number, number, number][] = [[0, 0, 0]];
    // ring 1 — 6 around center
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      positions.push([Math.cos(a) * w, Math.sin(a) * w, 0]);
    }
    // ring 2 — 12 outer (alternating point/edge)
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      positions.push([Math.cos(a) * w * 2, Math.sin(a) * w * 2, 0]);
      const a2 = (Math.PI / 3) * i;
      positions.push([Math.cos(a2) * Math.sqrt(3) * w, Math.sin(a2) * Math.sqrt(3) * w, 0]);
    }
    return positions.slice(0, 18);
  }, []);

  return (
    <group ref={root} rotation={[-0.35, 0, 0]}>
      {/* Primary mirror — 18 gold hex segments */}
      <group position={[0, 1.6, 0]}>
        {segments.map((p, i) => (
          <mesh key={i} position={p} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.55, 0.55, 0.06, 6]} />
            <meshStandardMaterial
              color="#d4a44a"
              metalness={1}
              roughness={0.18}
              emissive="#3a2a08"
              emissiveIntensity={0.4}
            />
          </mesh>
        ))}
        {/* Mirror back struts */}
        <mesh position={[0, 0, -0.15]}>
          <cylinderGeometry args={[2.6, 2.6, 0.05, 32]} />
          <meshStandardMaterial color="#1a1530" metalness={0.6} roughness={0.4} />
        </mesh>
      </group>

      {/* Secondary mirror tripod */}
      <group>
        {[-1, 0, 1].map((side, i) => {
          const angle = (Math.PI * 2 * i) / 3;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 1.4, 2.6, Math.sin(angle) * 1.4]}
              rotation={[0, angle, -Math.PI / 6]}
            >
              <cylinderGeometry args={[0.025, 0.025, 3.6, 6]} />
              <meshStandardMaterial color="#2a2545" metalness={0.7} roughness={0.4} />
            </mesh>
          );
        })}
      </group>

      {/* Secondary mirror */}
      <mesh position={[0, 3.8, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.05, 24]} />
        <meshStandardMaterial color="#e6b85c" metalness={1} roughness={0.15} />
      </mesh>

      {/* 5-layer kapton sunshield (tennis-court shape) */}
      <group position={[0, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        {[0, 1, 2, 3, 4].map((layer) => {
          const scale = 1 + layer * 0.06;
          const yOff = -0.15 - layer * 0.1;
          const tint = layer === 0 ? '#a07020' : layer === 4 ? '#5a4a8a' : '#7a5aa5';
          return (
            <mesh key={layer} position={[0, yOff, 0]} scale={[3.4 * scale, 1, 5.2 * scale]}>
              <planeGeometry args={[1, 1, 1, 1]} />
              <meshStandardMaterial
                color={tint}
                metalness={0.85}
                roughness={0.35}
                emissive={tint}
                emissiveIntensity={0.08}
                side={2}
              />
            </mesh>
          );
        })}
      </group>

      {/* Spacecraft bus */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[1.4, 0.5, 1.2]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.5} />
      </mesh>

      {/* Solar array */}
      <mesh position={[0, -0.6, -1.8]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[2.6, 0.05, 1.4]} />
        <meshStandardMaterial color="#1a3a6a" metalness={0.4} roughness={0.6} emissive="#0a1a3a" emissiveIntensity={0.2} />
      </mesh>

      {/* Subtle violet rim glow */}
      <pointLight position={[3, 3, 3]} intensity={2.5} color="#a78bfa" distance={12} />
      <pointLight position={[-3, -2, 2]} intensity={1.5} color="#fcd34d" distance={10} />
    </group>
  );
}
