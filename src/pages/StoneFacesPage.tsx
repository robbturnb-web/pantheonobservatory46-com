import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { Mountain, X, MapPin } from 'lucide-react';
import { STONE_MARKERS, type StoneMarker } from '@/data/stone-markers';
import { useEchoXp } from '@/hooks/use-echo-xp';
import { XP_VALUES } from '@/lib/xp-events';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

export function StoneFacesPage() {
  const [selected, setSelected] = useState<StoneMarker | null>(null);
  const { userId, awardEvent } = useEchoXp();

  useEffect(() => {
    document.title = 'Stone Faces & Lost Markers — Pantheon Observatory';
  }, []);

  const handleSelect = (m: StoneMarker) => {
    setSelected(m);
    if (userId) {
      awardEvent('page', `marker:${m.id}`, XP_VALUES.STONE_MARKER_OPEN, `${m.name} opened`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-xs uppercase tracking-wider text-primary mb-4">
          <Mountain className="w-3.5 h-3.5" /> Lost Markers
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">Stone Faces & Lost Markers</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Every megalith that shouldn't exist. Tap a pulsing marker to open the dossier — Oak Island, Göbekli Tepe, Yonaguni, Puma Punku, and more.
        </p>
      </motion.header>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        <div className="glass-cosmic rounded-xl p-2 sm:p-4 overflow-hidden">
          <ComposableMap
            projectionConfig={{ scale: 140 }}
            style={{ width: '100%', height: 'auto', maxHeight: '70vh' }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="hsl(var(--card))"
                    stroke="hsl(var(--border))"
                    strokeWidth={0.4}
                    style={{
                      default: { outline: 'none' },
                      hover: { fill: 'hsl(var(--accent))', outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>
            {STONE_MARKERS.map((m) => (
              <Marker key={m.id} coordinates={m.coordinates} onClick={() => handleSelect(m)}>
                <g style={{ cursor: 'pointer' }}>
                  <circle r={10} fill={m.glow} fillOpacity={0.15}>
                    <animate attributeName="r" values="6;14;6" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" values="0.4;0.05;0.4" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <circle r={4} fill={m.glow} stroke="#fff" strokeWidth={0.6} />
                </g>
              </Marker>
            ))}
          </ComposableMap>
        </div>

        <aside className="lg:sticky lg:top-20 h-fit space-y-3">
          <div className="glass-cosmic rounded-xl p-4">
            <h2 className="font-bold text-sm mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> All markers ({STONE_MARKERS.length})
            </h2>
            <div className="space-y-1.5 max-h-[50vh] overflow-y-auto">
              {STONE_MARKERS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleSelect(m)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition-all ${
                    selected?.id === m.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/40'
                  }`}
                  style={{ boxShadow: selected?.id === m.id ? `0 0 12px ${m.glow}40` : 'none' }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: m.glow }} />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{m.name}</div>
                      <div className="text-[10px] text-muted-foreground truncate">{m.location}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative glass-cosmic rounded-2xl max-w-xl w-full p-6 border max-h-[85vh] overflow-y-auto"
              style={{ borderColor: selected.glow, boxShadow: `0 0 40px ${selected.glow}40` }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-accent z-10"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 rounded-full"
                  style={{ background: selected.glow, boxShadow: `0 0 12px ${selected.glow}` }}
                />
                <div>
                  <h3 className="text-xl font-bold">{selected.name}</h3>
                  <div className="text-xs text-muted-foreground">{selected.location} · {selected.era}</div>
                </div>
              </div>

              <p className="text-sm mb-4 leading-relaxed">{selected.description}</p>

              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-xs uppercase tracking-wider text-primary mb-2">Theories</div>
                  <ul className="space-y-1.5">
                    {selected.theories.map((t) => (
                      <li key={t} className="flex gap-2">
                        <span className="text-primary">▸</span>
                        <span className="text-muted-foreground">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 rounded-lg border" style={{ borderColor: `${selected.glow}60`, background: `${selected.glow}10` }}>
                  <div className="text-xs uppercase tracking-wider mb-1" style={{ color: selected.glow }}>Significance</div>
                  <p>{selected.significance}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
