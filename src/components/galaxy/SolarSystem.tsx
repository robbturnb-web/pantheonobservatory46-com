import { useRef, useState, useMemo, forwardRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Ring } from '@react-three/drei';
import * as THREE from 'three';
import { planets, type Planet, type Moon } from '../../data/planets';

function Sun() {
  const ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.1;
    if (glowRef.current) glowRef.current.rotation.z += delta * 0.05;
    if (coronaRef.current) {
      coronaRef.current.rotation.y -= delta * 0.03;
      coronaRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial color="#fbbf24" />
      </mesh>
      {/* Inner glow */}
      <mesh ref={glowRef} scale={3.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.18} />
      </mesh>
      {/* Corona */}
      <mesh ref={coronaRef} scale={4.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.06} />
      </mesh>
      {/* Outer haze */}
      <mesh scale={6}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#fde68a" transparent opacity={0.025} />
      </mesh>
      <pointLight intensity={3} distance={120} color="#fbbf24" />
      <pointLight intensity={1.5} distance={80} color="#fff7ed" />
    </group>
  );
}

function SaturnRings({ size }: { size: number }) {
  return (
    <group rotation={[Math.PI * 0.35, 0.1, 0]}>
      <Ring args={[size * 1.4, size * 1.8, 64]}>
        <meshBasicMaterial color="#d4c4a0" transparent opacity={0.55} side={THREE.DoubleSide} />
      </Ring>
      <Ring args={[size * 1.85, size * 2.2, 64]}>
        <meshBasicMaterial color="#c9b896" transparent opacity={0.4} side={THREE.DoubleSide} />
      </Ring>
      <Ring args={[size * 2.25, size * 2.5, 64]}>
        <meshBasicMaterial color="#b8a882" transparent opacity={0.3} side={THREE.DoubleSide} />
      </Ring>
      <Ring args={[size * 2.55, size * 2.8, 64]}>
        <meshBasicMaterial color="#a89872" transparent opacity={0.15} side={THREE.DoubleSide} />
      </Ring>
    </group>
  );
}

function UranusRings({ size }: { size: number }) {
  return (
    <group rotation={[0.1, 0, Math.PI * 0.45]}>
      <Ring args={[size * 1.5, size * 1.65, 64]}>
        <meshBasicMaterial color="#8ed1dc" transparent opacity={0.2} side={THREE.DoubleSide} />
      </Ring>
      <Ring args={[size * 1.7, size * 1.8, 64]}>
        <meshBasicMaterial color="#72c8d5" transparent opacity={0.12} side={THREE.DoubleSide} />
      </Ring>
    </group>
  );
}

/* Jupiter bands — layered atmosphere shells */
function JupiterBands({ size }: { size: number }) {
  return (
    <group>
      {/* Dark bands */}
      <mesh scale={1.005}>
        <sphereGeometry args={[size, 48, 48]} />
        <meshStandardMaterial color="#a0734e" transparent opacity={0.3} roughness={1} />
      </mesh>
      {/* Great Red Spot hint */}
      <mesh position={[size * 0.6, -size * 0.15, size * 0.6]} scale={[0.25, 0.15, 0.1]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#c44d2e" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

/* Earth continents hint */
function EarthDetails({ size }: { size: number }) {
  return (
    <group>
      {/* Land mass patches */}
      <mesh scale={1.003}>
        <sphereGeometry args={[size, 48, 48]} />
        <meshStandardMaterial color="#2d8a4e" transparent opacity={0.25} roughness={0.9} />
      </mesh>
      {/* Ice caps */}
      <mesh position={[0, size * 0.9, 0]} scale={[0.35, 0.1, 0.35]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#e0f2fe" transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, -size * 0.9, 0]} scale={[0.25, 0.08, 0.25]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#e0f2fe" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

/* Mars polar caps */
function MarsDetails({ size }: { size: number }) {
  return (
    <group>
      <mesh position={[0, size * 0.85, 0]} scale={[0.3, 0.08, 0.3]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#e8d5c4" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function MoonMesh({
  moon,
  parentPosition,
  isSelected,
  onClick,
}: {
  moon: Moon;
  parentPosition: THREE.Vector3;
  isSelected: boolean;
  onClick: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const initialAngle = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime() * moon.orbitSpeed * 0.5 + initialAngle;
      groupRef.current.position.x = parentPosition.x + Math.cos(t) * moon.distance;
      groupRef.current.position.z = parentPosition.z + Math.sin(t) * moon.distance;
      groupRef.current.position.y = parentPosition.y;
    }
    if (ref.current) ref.current.rotation.y += 0.01;
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={ref}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
        scale={isSelected || hovered ? 1.4 : 1}
      >
        <sphereGeometry args={[moon.size, 32, 32]} />
        <meshStandardMaterial
          color={moon.color}
          emissive={moon.color}
          emissiveIntensity={isSelected ? 0.8 : hovered ? 0.5 : 0.2}
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>
      {/* Moon glow ring */}
      {(isSelected || hovered) && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[moon.size * 1.5, moon.size * 2, 32]} />
          <meshBasicMaterial color={moon.color} transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
      )}
      <Html center distanceFactor={12} style={{ pointerEvents: 'none' }}>
        <div className={`px-1.5 py-0.5 rounded text-center whitespace-nowrap transition-all duration-200 ${
          isSelected
            ? 'bg-accent-neon/90 text-background text-[9px] font-bold'
            : hovered
              ? 'bg-background/70 text-foreground text-[9px] font-semibold'
              : 'bg-transparent text-muted-foreground/40 text-[8px]'
        }`}>
          {moon.name}
        </div>
      </Html>
    </group>
  );
}

function PlanetMesh({
  planet,
  isSelected,
  onClick,
  selectedMoonId,
  onSelectMoon,
}: {
  planet: Planet;
  isSelected: boolean;
  onClick: () => void;
  selectedMoonId: string | null;
  onSelectMoon: (moon: Moon) => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const initialAngle = useMemo(() => Math.random() * Math.PI * 2, []);
  const positionRef = useRef(new THREE.Vector3());

  useFrame(({ clock }) => {
    if (groupRef.current && planet.distance > 0) {
      const t = clock.getElapsedTime() * planet.orbitSpeed * 0.3 + initialAngle;
      groupRef.current.position.x = Math.cos(t) * planet.distance;
      groupRef.current.position.z = Math.sin(t) * planet.distance;
      positionRef.current.copy(groupRef.current.position);
    }
    if (ref.current) ref.current.rotation.y += 0.008;
    if (atmosphereRef.current) atmosphereRef.current.rotation.y -= 0.003;
  });

  if (planet.distance === 0) return null;

  const hasAtmosphere = ['venus', 'earth', 'jupiter', 'saturn', 'neptune'].includes(planet.id);
  const hasSaturnRings = planet.id === 'saturn';
  const hasUranusRings = planet.id === 'uranus';

  const tiltMap: Record<string, number> = {
    mercury: 0.001, venus: 0.05, earth: 0.41, mars: 0.44,
    jupiter: 0.05, saturn: 0.47, uranus: 1.71, neptune: 0.49, pluto: 2.14,
  };
  const tilt = tiltMap[planet.id] || 0;

  const atmosphereColors: Record<string, string> = {
    venus: '#e8d090',
    earth: '#60a5fa',
    jupiter: '#d4a574',
    saturn: '#e8d5a3',
    neptune: '#5c6bc0',
  };

  return (
    <>
      <group ref={groupRef}>
        <group rotation={[tilt, 0, 0]}>
          <mesh
            ref={ref}
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
            scale={isSelected || hovered ? 1.3 : 1}
          >
            <sphereGeometry args={[planet.size, 48, 48]} />
            <meshStandardMaterial
              color={planet.color}
              emissive={planet.color}
              emissiveIntensity={isSelected ? 0.5 : hovered ? 0.3 : 0.1}
              roughness={0.7}
              metalness={0.1}
            />
          </mesh>
          {/* Planet-specific details */}
          {planet.id === 'jupiter' && <JupiterBands size={planet.size} />}
          {planet.id === 'earth' && <EarthDetails size={planet.size} />}
          {planet.id === 'mars' && <MarsDetails size={planet.size} />}
          {hasAtmosphere && (
            <mesh ref={atmosphereRef} scale={1.12}>
              <sphereGeometry args={[planet.size, 32, 32]} />
              <meshBasicMaterial
                color={atmosphereColors[planet.id] || planet.color}
                transparent
                opacity={isSelected || hovered ? 0.2 : 0.08}
              />
            </mesh>
          )}
          {hasSaturnRings && <SaturnRings size={planet.size} />}
          {hasUranusRings && <UranusRings size={planet.size} />}
          {/* Selection glow ring */}
          {(isSelected || hovered) && (
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[planet.size * 1.8, planet.size * 2.2, 64]} />
              <meshBasicMaterial color={planet.color} transparent opacity={0.12} side={THREE.DoubleSide} />
            </mesh>
          )}
        </group>
        <Html center distanceFactor={18} style={{ pointerEvents: 'none' }}>
          <div className={`px-2 py-0.5 rounded text-center whitespace-nowrap transition-all duration-200 ${
            isSelected
              ? 'bg-primary/90 text-primary-foreground text-xs font-bold shadow-lg shadow-primary/30'
              : hovered
                ? 'bg-background/80 border border-primary/50 text-foreground text-xs font-semibold'
                : 'bg-transparent text-muted-foreground/60 text-[10px] font-medium'
          }`}>
            {planet.name}
          </div>
        </Html>
      </group>
      {/* Moons */}
      {planet.moons?.map((moon) => (
        <MoonMesh
          key={moon.id}
          moon={moon}
          parentPosition={positionRef.current}
          isSelected={selectedMoonId === moon.id}
          onClick={() => onSelectMoon(moon)}
        />
      ))}
    </>
  );
}

function OrbitRing({ distance }: { distance: number }) {
  if (distance === 0) return null;
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[distance - 0.04, distance + 0.04, 180]} />
      <meshBasicMaterial color="#8b5cf6" transparent opacity={0.08} side={THREE.DoubleSide} />
    </mesh>
  );
}

const ASTEROID_COUNT = 200;
const asteroidDummy = new THREE.Object3D();

function AsteroidBelt() {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useMemo(() => {
    // Will be set in useFrame on first render
  }, []);

  const scales = useMemo(() => {
    const s: number[] = [];
    for (let i = 0; i < ASTEROID_COUNT; i++) s.push(0.02 + Math.random() * 0.06);
    return s;
  }, []);

  const angles = useMemo(() => {
    const a: number[] = [];
    for (let i = 0; i < ASTEROID_COUNT; i++) a.push(Math.random() * Math.PI * 2);
    return a;
  }, []);

  const dists = useMemo(() => {
    const d: number[] = [];
    for (let i = 0; i < ASTEROID_COUNT; i++) d.push(14 + Math.random() * 2.5);
    return d;
  }, []);

  const ys = useMemo(() => {
    const y: number[] = [];
    for (let i = 0; i < ASTEROID_COUNT; i++) y.push((Math.random() - 0.5) * 0.8);
    return y;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * 0.005;
    for (let i = 0; i < ASTEROID_COUNT; i++) {
      const a = angles[i] + t;
      asteroidDummy.position.set(Math.cos(a) * dists[i], ys[i], Math.sin(a) * dists[i]);
      asteroidDummy.scale.setScalar(scales[i]);
      asteroidDummy.updateMatrix();
      meshRef.current.setMatrixAt(i, asteroidDummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, ASTEROID_COUNT]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#7a6e5d" roughness={1} metalness={0.1} />
    </instancedMesh>
  );
}

/* Comets that streak across the scene */
function Comet({ startAngle, speed, radius }: { startAngle: number; speed: number; radius: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime() * speed + startAngle;
    const r = radius + Math.sin(t * 0.3) * 5;
    groupRef.current.position.x = Math.cos(t) * r;
    groupRef.current.position.z = Math.sin(t) * r;
    groupRef.current.position.y = Math.sin(t * 0.7) * 3;
    // Orient tail away from sun
    groupRef.current.lookAt(0, 0, 0);
    if (tailRef.current) tailRef.current.rotation.x = Math.PI;
  });

  return (
    <group ref={groupRef}>
      {/* Nucleus */}
      <mesh>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color="#e0f7fa" />
      </mesh>
      {/* Coma glow */}
      <mesh scale={2.5}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color="#80deea" transparent opacity={0.3} />
      </mesh>
      {/* Tail */}
      <mesh ref={tailRef} position={[0, 0, -0.8]}>
        <coneGeometry args={[0.12, 2, 8]} />
        <meshBasicMaterial color="#80deea" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

function Comets() {
  return (
    <group>
      <Comet startAngle={0} speed={0.08} radius={42} />
      <Comet startAngle={Math.PI * 0.7} speed={0.12} radius={35} />
      <Comet startAngle={Math.PI * 1.3} speed={0.06} radius={48} />
    </group>
  );
}

// Spaceship mesh
function Spaceship({ targetPosition }: { targetPosition: THREE.Vector3 | null }) {
  const groupRef = useRef<THREE.Group>(null);
  const currentPos = useRef(new THREE.Vector3(0, 3, 0));

  useFrame(() => {
    if (!groupRef.current || !targetPosition) return;
    const target = targetPosition.clone().add(new THREE.Vector3(0, 2, 2));
    currentPos.current.lerp(target, 0.015);
    groupRef.current.position.copy(currentPos.current);
    groupRef.current.lookAt(targetPosition);
    groupRef.current.rotation.z += 0.02;
  });

  if (!targetPosition) return null;

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.15, 0.6, 8]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.8} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.35]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color="#39ff14" transparent opacity={0.8} />
      </mesh>
      <pointLight color="#39ff14" intensity={2} distance={4} />
    </group>
  );
}

function CameraController({ targetPlanetId, tourActive }: { targetPlanetId: string | null; tourActive: boolean }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 25, 40));

  useFrame(({ clock }) => {
    if (!tourActive || !targetPlanetId) return;
    const planet = planets.find(p => p.id === targetPlanetId);
    if (!planet || planet.distance === 0) return;

    const t = clock.getElapsedTime() * planet.orbitSpeed * 0.3;
    const px = Math.cos(t) * planet.distance;
    const pz = Math.sin(t) * planet.distance;

    targetPos.current.set(px + 8, 5, pz + 8);
    camera.position.lerp(targetPos.current, 0.02);
    const lookTarget = new THREE.Vector3(px, 0, pz);
    camera.lookAt(lookTarget);
  });

  return null;
}

export interface SolarSystemHandle {}

interface SolarSystemProps {
  selectedPlanet: Planet | null;
  onSelectPlanet: (planet: Planet | null) => void;
  selectedMoonId: string | null;
  onSelectMoon: (moon: Moon) => void;
  tourActive: boolean;
  tourPlanetId: string | null;
  tourTargetPosition: THREE.Vector3 | null;
}

export const SolarSystem = forwardRef<SolarSystemHandle, SolarSystemProps>(function SolarSystem(
  { selectedPlanet, onSelectPlanet, selectedMoonId, onSelectMoon, tourActive, tourPlanetId, tourTargetPosition },
  _ref,
) {
  return (
    <Canvas camera={{ position: [0, 25, 40], fov: 50 }} style={{ background: 'transparent' }}>
      <ambientLight intensity={0.12} />
      <Stars radius={120} depth={60} count={3000} factor={5} fade speed={0.8} />
      <Sun />
      <AsteroidBelt />
      <Comets />
      {planets.filter(p => p.distance > 0).map(planet => (
        <OrbitRing key={`orbit-${planet.id}`} distance={planet.distance} />
      ))}
      {planets.filter(p => p.distance > 0).map(planet => (
        <PlanetMesh
          key={planet.id}
          planet={planet}
          isSelected={selectedPlanet?.id === planet.id}
          onClick={() => onSelectPlanet(selectedPlanet?.id === planet.id ? null : planet)}
          selectedMoonId={selectedMoonId}
          onSelectMoon={onSelectMoon}
        />
      ))}
      <Spaceship targetPosition={tourTargetPosition} />
      <CameraController targetPlanetId={tourPlanetId} tourActive={tourActive} />
      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={5}
        maxDistance={90}
        autoRotate={!tourActive}
        autoRotateSpeed={0.2}
      />
    </Canvas>
  );
});
