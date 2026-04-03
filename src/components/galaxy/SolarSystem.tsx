import { useRef, useState, useMemo, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Ring } from '@react-three/drei';
import * as THREE from 'three';
import { planets, type Planet, type Moon } from '../../data/planets';

function Sun() {
  const ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.1;
    if (glowRef.current) glowRef.current.rotation.z += delta * 0.05;
  });

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial color="#fbbf24" />
      </mesh>
      <mesh ref={glowRef} scale={3.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.15} />
      </mesh>
      <mesh scale={4}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.06} />
      </mesh>
      <pointLight intensity={3} distance={120} color="#fbbf24" />
      <pointLight intensity={1} distance={80} color="#fff7ed" />
    </group>
  );
}

function SaturnRings({ size }: { size: number }) {
  return (
    <group rotation={[Math.PI * 0.35, 0.1, 0]}>
      <Ring args={[size * 1.4, size * 2.2, 64]}>
        <meshBasicMaterial color="#d4a574" transparent opacity={0.5} side={THREE.DoubleSide} />
      </Ring>
      <Ring args={[size * 2.3, size * 2.6, 64]}>
        <meshBasicMaterial color="#c4956a" transparent opacity={0.3} side={THREE.DoubleSide} />
      </Ring>
      <Ring args={[size * 2.7, size * 2.9, 64]}>
        <meshBasicMaterial color="#b8855e" transparent opacity={0.2} side={THREE.DoubleSide} />
      </Ring>
    </group>
  );
}

function UranusRings({ size }: { size: number }) {
  return (
    <group rotation={[0.1, 0, Math.PI * 0.45]}>
      <Ring args={[size * 1.5, size * 1.8, 64]}>
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.2} side={THREE.DoubleSide} />
      </Ring>
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
              emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.15}
              roughness={0.7}
              metalness={0.1}
            />
          </mesh>
          {hasAtmosphere && (
            <mesh ref={atmosphereRef} scale={1.12}>
              <sphereGeometry args={[planet.size, 32, 32]} />
              <meshBasicMaterial
                color={planet.id === 'earth' ? '#60a5fa' : planet.color}
                transparent
                opacity={isSelected || hovered ? 0.2 : 0.08}
              />
            </mesh>
          )}
          {hasSaturnRings && <SaturnRings size={planet.size} />}
          {hasUranusRings && <UranusRings size={planet.size} />}
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

function AsteroidBelt() {
  const positions = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let i = 0; i < 200; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 14 + Math.random() * 2.5;
      const y = (Math.random() - 0.5) * 0.6;
      arr.push([Math.cos(angle) * dist, y, Math.sin(angle) * dist]);
    }
    return arr;
  }, []);

  return (
    <group>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.03 + Math.random() * 0.04, 6, 6]} />
          <meshBasicMaterial color="#6b7280" transparent opacity={0.4} />
        </mesh>
      ))}
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
      {/* Body */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.15, 0.6, 8]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.8} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Engine glow */}
      <mesh position={[0, 0, 0.35]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color="#39ff14" transparent opacity={0.8} />
      </mesh>
      <pointLight color="#39ff14" intensity={2} distance={4} />
    </group>
  );
}

// Camera controller for tour mode
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
    const currentLook = new THREE.Vector3();
    camera.getWorldDirection(currentLook);
    camera.lookAt(lookTarget);
  });

  return null;
}

export interface SolarSystemHandle {
  // exposed for parent
}

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
      <Stars radius={120} depth={60} count={5000} factor={5} fade speed={0.8} />
      <Sun />
      <AsteroidBelt />
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
