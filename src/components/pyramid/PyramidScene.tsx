import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Sun, Moon } from 'lucide-react';
import { pyramids, type Pyramid } from '../../data/pyramids';
import { PyramidGeometry, Sphinx } from './PyramidGeometry';

function PyramidMesh({
  pyramid,
  isSelected,
  onClick,
}: {
  pyramid: Pyramid;
  isSelected: boolean;
  onClick: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Subtle hover/selected scale
  const targetScale = isSelected || hovered ? 1.12 : 1;
  useFrame(() => {
    if (groupRef.current) {
      const cur = groupRef.current.scale.x;
      const next = cur + (targetScale - cur) * 0.12;
      groupRef.current.scale.setScalar(next);
    }
  });

  const emissive = isSelected ? 0.5 : hovered ? 0.28 : 0.08;

  return (
    <group position={pyramid.position}>
      <group
        ref={groupRef}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
      >
        <PyramidGeometry pyramid={pyramid} emissiveIntensity={emissive} />
      </group>

      {/* Sphinx beside Giza only */}
      {pyramid.id === 'giza' && <Sphinx scale={pyramid.scale} />}

      {/* Glow halo */}
      {(isSelected || hovered) && (
        <mesh position={[0, -pyramid.scale * 0.75, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[pyramid.scale * 0.85, pyramid.scale * 1.55, 48]} />
          <meshBasicMaterial color={pyramid.accentColor} transparent opacity={0.18} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Label */}
      <Html center position={[0, pyramid.scale * 1.35, 0]} distanceFactor={15} style={{ pointerEvents: 'none' }}>
        <div className={`px-2 py-0.5 rounded text-center whitespace-nowrap transition-all duration-200 ${
          isSelected
            ? 'bg-primary/90 text-primary-foreground text-xs font-bold shadow-lg'
            : hovered
              ? 'bg-background/80 border border-primary/50 text-foreground text-xs font-semibold'
              : 'bg-transparent text-muted-foreground/60 text-[10px] font-medium'
        }`}>
          {pyramid.name.split('(')[0].trim()}
        </div>
      </Html>
    </group>
  );
}

/* Particle beam from origin to target star — animated dots traveling up */
function ParticleBeam({
  start,
  end,
  color,
  count = 24,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  count?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const offsets = useMemo(() => Array.from({ length: count }, (_, i) => i / count), [count]);

  const s = useMemo(() => new THREE.Vector3(...start), [start]);
  const e = useMemo(() => new THREE.Vector3(...end), [end]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const offset = (offsets[i] + t * 0.2) % 1;
      const pos = s.clone().lerp(e, offset);
      child.position.set(pos.x, pos.y, pos.z);
      const m = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      // Brightest in middle, fade at ends
      m.opacity = 0.2 + Math.sin(offset * Math.PI) * 0.7;
    });
  });

  // Static thin connecting line for context
  const dir = e.clone().sub(s);
  const len = dir.length();
  const mid = s.clone().add(dir.clone().multiplyScalar(0.5));
  const orientation = new THREE.Matrix4().lookAt(s, e, new THREE.Vector3(0, 1, 0));
  const quat = new THREE.Quaternion().setFromRotationMatrix(orientation);

  return (
    <group>
      <mesh position={[mid.x, mid.y, mid.z]} quaternion={quat}>
        <cylinderGeometry args={[0.01, 0.01, len, 4]} />
        <meshBasicMaterial color={color} transparent opacity={0.18} />
      </mesh>
      <group ref={groupRef}>
        {offsets.map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* Star marker with glow + label */
function StarMarker({ position, color, label, size = 0.35 }: { position: [number, number, number]; color: string; label: string; size?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const s = 1 + Math.sin(clock.getElapsedTime() * 1.5) * 0.15;
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh>
        <sphereGeometry args={[size * 2.2, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <Html center distanceFactor={20} position={[0, size * 3, 0]} style={{ pointerEvents: 'none' }}>
        <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color }}>
          {label}
        </span>
      </Html>
    </group>
  );
}

/* Pleiades — cluster of 7 small stars */
function Pleiades({ position }: { position: [number, number, number] }) {
  const offsets = useMemo<[number, number, number][]>(() => [
    [0, 0, 0], [1.2, 0.8, 0.3], [-1, 1, -0.2], [0.5, -0.7, 0.4],
    [-0.8, -0.5, 0.1], [1.6, -0.2, -0.3], [-1.6, 0.3, 0.2],
  ], []);
  return (
    <group position={position}>
      {offsets.map((o, i) => (
        <group key={i} position={o}>
          <mesh>
            <sphereGeometry args={[0.18, 12, 12]} />
            <meshBasicMaterial color="#bae6fd" />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.4, 12, 12]} />
            <meshBasicMaterial color="#7dd3fc" transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>
      ))}
      <Html center distanceFactor={22} position={[0, 2.5, 0]} style={{ pointerEvents: 'none' }}>
        <span className="text-[9px] font-bold tracking-widest uppercase text-sky-300">PLEIADES</span>
      </Html>
    </group>
  );
}

function AlignmentSystem() {
  const giza: [number, number, number] = [0, 0, 0];
  const orion: [number, number, number] = [15, 20, -10];
  const sirius: [number, number, number] = [-12, 18, 8];
  const pleiades: [number, number, number] = [8, 22, 14];
  const polaris: [number, number, number] = [0, 26, -2];

  return (
    <group>
      <ParticleBeam start={giza} end={orion} color="#a78bfa" count={28} />
      <ParticleBeam start={giza} end={sirius} color="#fde68a" count={28} />
      <ParticleBeam start={giza} end={pleiades} color="#7dd3fc" count={20} />
      <ParticleBeam start={giza} end={polaris} color="#fbbf24" count={20} />

      <StarMarker position={orion} color="#a78bfa" label="ORION" />
      <StarMarker position={sirius} color="#fde68a" label="SIRIUS" />
      <StarMarker position={polaris} color="#fbbf24" label="POLARIS" size={0.28} />
      <Pleiades position={pleiades} />
    </group>
  );
}

/* Ground with regional tinting (sand for Egypt, faint green for Mesoamerica) */
function Ground({ isNight }: { isNight: boolean }) {
  return (
    <group>
      {/* Base sand plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[80, 80, 32, 32]} />
        <meshStandardMaterial
          color={isNight ? '#1f1a14' : '#3a2e1f'}
          roughness={1}
          metalness={0}
        />
      </mesh>
      {/* Mesoamerican tint (jungle) on the +X side where Teotihuacan/Kukulcán sit */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2, 0, 1]}>
        <circleGeometry args={[18, 32]} />
        <meshBasicMaterial color={isNight ? '#0e1f12' : '#1f3a22'} transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

interface PyramidSceneProps {
  selectedPyramid: Pyramid | null;
  onSelectPyramid: (pyramid: Pyramid | null) => void;
}

export function PyramidScene({ selectedPyramid, onSelectPyramid }: PyramidSceneProps) {
  const [isNight, setIsNight] = useState(false);

  return (
    <div className="w-full h-full relative">
      {/* Day/Night toggle */}
      <button
        onClick={() => setIsNight((v) => !v)}
        className="absolute top-4 right-4 z-20 glass-cosmic rounded-xl px-3 py-2 flex items-center gap-2 hover:bg-primary/10 transition-colors group"
        title={isNight ? 'Switch to day' : 'Switch to night'}
      >
        {isNight ? (
          <Sun className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
        ) : (
          <Moon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
        )}
        <span className="text-[10px] uppercase tracking-[2px] text-foreground/80 font-semibold">
          {isNight ? 'Night' : 'Day'}
        </span>
      </button>

      <Canvas camera={{ position: [12, 12, 18], fov: 50 }} style={{ background: 'transparent' }}>
        {/* Atmospheric fog for depth */}
        <fog attach="fog" args={[isNight ? '#06060f' : '#1a1410', 25, 60]} />

        {/* Lighting depends on day/night */}
        {isNight ? (
          <>
            <ambientLight intensity={0.18} />
            <directionalLight position={[6, 12, 4]} intensity={0.45} color="#cbd5e1" />
            <directionalLight position={[-5, 10, -5]} intensity={0.35} color="#a78bfa" />
          </>
        ) : (
          <>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 15, 10]} intensity={1.1} color="#fde68a" />
            <directionalLight position={[-5, 10, -5]} intensity={0.3} color="#fbbf24" />
          </>
        )}

        <Stars
          radius={100}
          depth={50}
          count={isNight ? 5000 : 2000}
          factor={isNight ? 5 : 3}
          fade
          speed={0.5}
        />

        <Ground isNight={isNight} />
        <AlignmentSystem />

        {pyramids.map((pyramid) => (
          <PyramidMesh
            key={pyramid.id}
            pyramid={pyramid}
            isSelected={selectedPyramid?.id === pyramid.id}
            onClick={() => onSelectPyramid(selectedPyramid?.id === pyramid.id ? null : pyramid)}
          />
        ))}

        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          minDistance={8}
          maxDistance={50}
          maxPolarAngle={Math.PI / 2.1}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
}
