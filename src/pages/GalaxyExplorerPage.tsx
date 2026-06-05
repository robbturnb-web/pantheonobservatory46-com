import { useState, Suspense, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MessageCircle, Play, Square, SkipForward } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { SolarSystem } from '../components/galaxy/SolarSystem';
import { PlanetInfo } from '../components/galaxy/PlanetInfo';
import { planets, tourNarration, type Planet, type Moon } from '../data/planets';
import * as THREE from 'three';

const tourOrder = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

export function GalaxyExplorerPage() {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [selectedMoon, setSelectedMoon] = useState<Moon | null>(null);

  // Tour state
  const [tourActive, setTourActive] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);
  const [tourTargetPosition, setTourTargetPosition] = useState<THREE.Vector3 | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const currentTourPlanetId = tourActive ? tourOrder[tourIndex] : null;
  const currentTourPlanet = currentTourPlanetId ? planets.find(p => p.id === currentTourPlanetId) : null;

  // Advance tour
  useEffect(() => {
    if (!tourActive || !currentTourPlanet) return;
    // Set a rough target position (the camera controller will track the real orbiting position)
    setTourTargetPosition(new THREE.Vector3(currentTourPlanet.distance, 0, 0));

    timerRef.current = setTimeout(() => {
      if (tourIndex < tourOrder.length - 1) {
        setTourIndex(i => i + 1);
      } else {
        setTourActive(false);
        setTourIndex(0);
        setTourTargetPosition(null);
      }
    }, 7000);

    return () => clearTimeout(timerRef.current);
  }, [tourActive, tourIndex, currentTourPlanet]);

  const startTour = useCallback(() => {
    setSelectedPlanet(null);
    setSelectedMoon(null);
    setTourIndex(0);
    setTourActive(true);
  }, []);

  const stopTour = useCallback(() => {
    setTourActive(false);
    setTourIndex(0);
    setTourTargetPosition(null);
    clearTimeout(timerRef.current);
  }, []);

  const skipPlanet = useCallback(() => {
    clearTimeout(timerRef.current);
    if (tourIndex < tourOrder.length - 1) {
      setTourIndex(i => i + 1);
    } else {
      stopTour();
    }
  }, [tourIndex, stopTour]);

  const handleSelectMoon = useCallback((moon: Moon) => {
    setSelectedMoon(moon);
    setSelectedPlanet(null);
  }, []);

  const handleSelectPlanet = useCallback((planet: Planet | null) => {
    setSelectedPlanet(planet);
    setSelectedMoon(null);
  }, []);

  const handleCloseInfo = useCallback(() => {
    setSelectedPlanet(null);
    setSelectedMoon(null);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Cinematic title overlay */}
      <HeroSection
        variant="overlay"
        label="Cosmos · Realm of Stars"
        title="Galaxy Explorer"
        tagline="Step inside the solar system. Every planet, every moon, every story."
        accent="#22D3EE"
      />

      {/* Hint chip (top-left) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-4 left-4 z-20"
      >
        <div className="glass-cosmic rounded-xl px-3 py-2 border" style={{ borderColor: 'rgba(34,211,238,0.25)' }}>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" style={{ color: '#22D3EE' }} />
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Click · Scroll · Drag
            </span>
          </div>
        </div>
      </motion.div>

      {/* Atmospheric cyan vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.10), transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.12), transparent 60%)',
        }}
      />


      {/* Echo Tour Button / Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 left-4 z-20"
      >
        {!tourActive ? (
          <button
            onClick={startTour}
            className="glass-cosmic rounded-xl px-4 py-2.5 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Play className="w-4 h-4 text-accent-neon" />
            Let Echo Guide You
          </button>
        ) : (
          <div className="glass-cosmic rounded-xl px-4 py-2.5 flex items-center gap-3">
            <button onClick={stopTour} className="text-muted-foreground hover:text-foreground transition-colors">
              <Square className="w-4 h-4" />
            </button>
            <button onClick={skipPlanet} className="text-muted-foreground hover:text-foreground transition-colors">
              <SkipForward className="w-4 h-4" />
            </button>
            <span className="text-xs text-primary font-medium">
              {tourIndex + 1}/{tourOrder.length}
            </span>
          </div>
        )}
      </motion.div>

      {/* Tour Narration Panel */}
      <AnimatePresence>
        {tourActive && currentTourPlanetId && (
          <motion.div
            key={currentTourPlanetId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 max-w-xl w-full px-4"
          >
            <div className="glass-cosmic rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-4 h-4 text-accent-neon" />
                <span className="text-xs font-bold text-accent-neon uppercase tracking-wider">Echo • {currentTourPlanet?.name}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tourNarration[currentTourPlanetId]}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Planet/Moon Info Panel */}
      <PlanetInfo planet={selectedPlanet} moon={selectedMoon} onClose={handleCloseInfo} />

      {/* 3D Canvas */}
      <div className="w-full h-screen">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-primary animate-pulse text-lg">Loading Solar System...</div>
          </div>
        }>
          <SolarSystem
            selectedPlanet={selectedPlanet}
            onSelectPlanet={handleSelectPlanet}
            selectedMoonId={selectedMoon?.id ?? null}
            onSelectMoon={handleSelectMoon}
            tourActive={tourActive}
            tourPlanetId={currentTourPlanetId}
            tourTargetPosition={tourTargetPosition}
          />
        </Suspense>
      </div>
    </div>
  );
}
