import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Globe, MessageCircle } from 'lucide-react';
import { SolarSystem } from '../components/galaxy/SolarSystem';
import { PlanetInfo } from '../components/galaxy/PlanetInfo';
import type { Planet } from '../data/planets';

export function GalaxyExplorerPage() {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-4 z-20"
      >
        <div className="glass-cosmic rounded-xl px-5 py-3">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold text-foreground">Galaxy Explorer</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Click any planet to explore • Scroll to zoom • Drag to rotate</p>
        </div>
      </motion.div>

      {/* Echo Guide (placeholder) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 left-4 z-20"
      >
        <button className="glass-cosmic rounded-xl px-4 py-2.5 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <MessageCircle className="w-4 h-4 text-primary" />
          Let Echo Guide You
        </button>
      </motion.div>

      {/* Planet Info Panel */}
      <PlanetInfo planet={selectedPlanet} onClose={() => setSelectedPlanet(null)} />

      {/* 3D Canvas */}
      <div className="w-full h-screen">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-primary animate-pulse text-lg">Loading Solar System...</div>
          </div>
        }>
          <SolarSystem selectedPlanet={selectedPlanet} onSelectPlanet={setSelectedPlanet} />
        </Suspense>
      </div>
    </div>
  );
}
