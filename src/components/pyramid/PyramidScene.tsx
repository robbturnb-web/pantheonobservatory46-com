import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Line } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { pyramids, type Pyramid } from '../../data/pyramids';

function PyramidMesh({ pyramid, isSelected, onClick }: { pyramid: Pyramid; isSelected: boolean; onClick: () => void }) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.002;
  });

  return (
    <group position={pyramid.position}>
      <mesh
        ref={ref}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
        scale={isSelected || hovered ? 1.15 : 1}
      >
        <coneGeometry args={[pyramid.scale, pyramid.scale * 1.5, 4]} />
        <meshStandardMaterial
          color={pyramid.color}
          emissive={pyramid.accentColor}
          emissiveIntensity={isSelected ? 0.6 : hovered ? 0.3 : 0.1}
          roughness={0.8}
          metalness={0.2}
          flatShading
        />
      </mesh>

      {/* Glow base */}
      {(isSelected || hovered) && (
        <mesh position={[0, -pyramid.scale * 0.75, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[pyramid.scale * 0.8, pyramid.scale * 1.4, 32]} />
          <meshBasicMaterial color={pyramid.accentColor} transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Label */}
      <Html center position={[0, pyramid.scale * 1.2, 0]} distanceFactor={15} style={{ pointerEvents: 'none' }}>
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

// Alignment lines (Orion & Sirius star positions)
function AlignmentLines() {
  const orion: [number, number, number] = [15, 20, -10];
  const sirius: [number, number, number] = [-12, 18, 8];
  const giza: [number, number, number] = [0, 0, 0];

  return (
    <group>
      <Line points={[giza, orion]} color="#8b5cf6" lineWidth={1} />
      <Line points={[giza, sirius]} color="#fbbf24" lineWidth={1} />
      {/* Star markers */}
      <mesh position={orion}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#8b5cf6" />
      </mesh>
      <Html position={orion} center distanceFactor={20} style={{ pointerEvents: 'none' }}>
        <span className="text-[9px] text-primary font-bold">ORION</span>
      </Html>
      <mesh position={sirius}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#fbbf24" />
      </mesh>
      <Html position={sirius} center distanceFactor={20} style={{ pointerEvents: 'none' }}>
        <span className="text-[9px] text-yellow-400 font-bold">SIRIUS</span>
      </Html>
    </group>
  );
}

// Ground plane
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
      <planeGeometry args={[60, 60]} />
      <meshStandardMaterial color="#1a1510" roughness={1} metalness={0} />
    </mesh>
  );
}

interface PyramidSceneProps {
  selectedPyramid: Pyramid | null;
  onSelectPyramid: (pyramid: Pyramid | null) => void;
}

export function PyramidScene({ selectedPyramid, onSelectPyramid }: PyramidSceneProps) {
  return (
    <Canvas camera={{ position: [12, 12, 18], fov: 50 }} style={{ background: 'transparent' }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 15, 10]} intensity={0.8} color="#fbbf24" />
      <directionalLight position={[-5, 10, -5]} intensity={0.3} color="#8b5cf6" />
      <Stars radius={100} depth={50} count={3000} factor={4} fade speed={0.5} />
      <Ground />
      <AlignmentLines />
      {pyramids.map(pyramid => (
        <PyramidMesh
          key={pyramid.id}
          pyramid={pyramid}
          isSelected={selectedPyramid?.id === pyramid.id}
          onClick={() => onSelectPyramid(selectedPyramid?.id === pyramid.id ? null : pyramid)}
        />
      ))}
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={0.8} />
      </EffectComposer>
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
  );
}
