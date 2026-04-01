import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { planets, type Planet } from '../../data/planets';

function Sun() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.1;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshBasicMaterial color="#fbbf24" />
      <pointLight intensity={2} distance={100} color="#fbbf24" />
    </mesh>
  );
}

function PlanetMesh({ planet, isSelected, onClick }: { planet: Planet; isSelected: boolean; onClick: () => void }) {
  const ref = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const initialAngle = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (groupRef.current && planet.distance > 0) {
      const t = clock.getElapsedTime() * planet.orbitSpeed * 0.3 + initialAngle;
      groupRef.current.position.x = Math.cos(t) * planet.distance;
      groupRef.current.position.z = Math.sin(t) * planet.distance;
    }
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  if (planet.distance === 0) return null; // Sun is rendered separately

  return (
    <group ref={groupRef}>
      <mesh
        ref={ref}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
        scale={isSelected || hovered ? 1.3 : 1}
      >
        <sphereGeometry args={[planet.size, 24, 24]} />
        <meshStandardMaterial
          color={planet.color}
          emissive={planet.color}
          emissiveIntensity={isSelected ? 0.5 : hovered ? 0.3 : 0.1}
        />
      </mesh>
      {(hovered || isSelected) && (
        <Html center distanceFactor={15}>
          <div className="px-2 py-1 rounded-md bg-background/90 border border-border text-xs text-foreground whitespace-nowrap font-semibold">
            {planet.name}
          </div>
        </Html>
      )}
    </group>
  );
}

function OrbitRing({ distance }: { distance: number }) {
  if (distance === 0) return null;
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[distance - 0.03, distance + 0.03, 128]} />
      <meshBasicMaterial color="#8b5cf6" transparent opacity={0.12} side={THREE.DoubleSide} />
    </mesh>
  );
}

interface SolarSystemProps {
  selectedPlanet: Planet | null;
  onSelectPlanet: (planet: Planet | null) => void;
}

export function SolarSystem({ selectedPlanet, onSelectPlanet }: SolarSystemProps) {
  return (
    <Canvas camera={{ position: [0, 25, 40], fov: 50 }} style={{ background: 'transparent' }}>
      <ambientLight intensity={0.15} />
      <Stars radius={100} depth={50} count={3000} factor={4} fade speed={1} />
      <Sun />
      {planets.filter(p => p.distance > 0).map(planet => (
        <OrbitRing key={`orbit-${planet.id}`} distance={planet.distance} />
      ))}
      {planets.filter(p => p.distance > 0).map(planet => (
        <PlanetMesh
          key={planet.id}
          planet={planet}
          isSelected={selectedPlanet?.id === planet.id}
          onClick={() => onSelectPlanet(selectedPlanet?.id === planet.id ? null : planet)}
        />
      ))}
      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={8}
        maxDistance={80}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </Canvas>
  );
}
