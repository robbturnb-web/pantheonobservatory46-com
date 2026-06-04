import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

/**
 * Stylized low-poly James Webb Space Telescope.
 * 18 hex gold mirrors · secondary on tripod · 5-layer kapton sunshield · bus · solar array.
 */
export function WebbModel3D({
  autoRotate = true,
  scale = 1,
}: {
  autoRotate?: boolean;
  scale?: number;
}) {
  const root = useRef<Group>(null);
  const bob = useRef<Group>(null);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (autoRotate && root.current) {
      root.current.rotation.y += dt * 0.15;
      root.current.rotation.x = -0.32 + Math.sin(t * 0.4) * 0.05;
    }
    if (bob.current) {
      bob.current.position.y = Math.sin(t * 0.7) * 0.12;
    }
  });

  // Real Webb honeycomb: 1 center + 6 inner ring + 11 outer (2 absent at top/bottom)
  const segments = useMemo(() => {
    const r = 0.55;
    const apothem = r * Math.cos(Math.PI / 6);
    const w = apothem * 2;
    const positions: [number, number, number][] = [[0, 0, 0]];
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      positions.push([Math.cos(a) * w, Math.sin(a) * w, 0]);
    }
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      positions.push([Math.cos(a) * w * 2, Math.sin(a) * w * 2, 0]);
      const a2 = (Math.PI / 3) * i;
      positions.push([Math.cos(a2) * Math.sqrt(3) * w, Math.sin(a2) * Math.sqrt(3) * w, 0]);
    }
    return positions.slice(0, 18);
  }, []);

  return (
    <group ref={bob}>
      <group ref={root} scale={scale}>
        {/* Primary mirror — 18 gold hex segments */}
        <group position={[0, 1.55, 0]}>
          {segments.map((p, i) => (
            <mesh key={i} position={p} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.55, 0.55, 0.08, 6]} />
              <meshStandardMaterial
                color="#e9b551"
                metalness={1}
                roughness={0.12}
                emissive="#5a3a0c"
                emissiveIntensity={0.55}
              />
            </mesh>
          ))}
          {/* Back support plate */}
          <mesh position={[0, 0, -0.18]}>
            <cylinderGeometry args={[2.55, 2.55, 0.04, 32]} />
            <meshStandardMaterial color="#15102a" metalness={0.5} roughness={0.55} />
          </mesh>
        </group>

        {/* Secondary mirror tripod (3 struts) */}
        <group>
          {[0, 1, 2].map((i) => {
            const angle = (Math.PI * 2 * i) / 3 + Math.PI / 2;
            return (
              <mesh
                key={i}
                position={[Math.cos(angle) * 0.9, 2.7, Math.sin(angle) * 0.3]}
                rotation={[0, angle, -Math.PI / 6]}
              >
                <cylinderGeometry args={[0.022, 0.022, 3.4, 6]} />
                <meshStandardMaterial color="#2b2548" metalness={0.7} roughness={0.4} />
              </mesh>
            );
          })}
        </group>

        {/* Secondary mirror */}
        <mesh position={[0, 3.9, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.06, 24]} />
          <meshStandardMaterial color="#f0c060" metalness={1} roughness={0.1} emissive="#3a2408" emissiveIntensity={0.5} />
        </mesh>

        {/* 5-layer kapton sunshield — staggered, tinted */}
        <group position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          {[0, 1, 2, 3, 4].map((layer) => {
            const s = 1 + layer * 0.08;
            const yOff = -0.05 - layer * 0.22;
            const tints = ['#c89860', '#b88a6a', '#a07aa5', '#8a6ab0', '#6a5ab8'];
            return (
              <mesh key={layer} position={[0, yOff, 0]} scale={[3.2 * s, 1, 5.0 * s]}>
                <planeGeometry args={[1, 1, 1, 1]} />
                <meshStandardMaterial
                  color={tints[layer]}
                  metalness={0.92}
                  roughness={0.28}
                  emissive={tints[layer]}
                  emissiveIntensity={0.1}
                  side={2}
                />
              </mesh>
            );
          })}
        </group>

        {/* Spacecraft bus */}
        <mesh position={[0, -1.5, 0]}>
          <boxGeometry args={[1.3, 0.45, 1.1]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.65} roughness={0.45} />
        </mesh>

        {/* Solar array */}
        <mesh position={[0, -1.55, -1.6]} rotation={[0.25, 0, 0]}>
          <boxGeometry args={[2.5, 0.04, 1.3]} />
          <meshStandardMaterial color="#1a3a6a" metalness={0.4} roughness={0.55} emissive="#0a1a3a" emissiveIntensity={0.25} />
        </mesh>

        {/* Rim lighting */}
        <pointLight position={[4, 3, 3]} intensity={3} color="#a78bfa" distance={14} />
        <pointLight position={[-3, -1, 3]} intensity={1.8} color="#fcd34d" distance={12} />
        <pointLight position={[0, 5, -2]} intensity={1.2} color="#22d3ee" distance={10} />
      </group>
    </group>
  );
}
