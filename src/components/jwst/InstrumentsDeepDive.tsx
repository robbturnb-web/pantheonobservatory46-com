import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Instrument {
  id: string;
  name: string;
  full: string;
  agency: string;
  range: string;
  temp: string;
  role: string;
  detail: string;
  modes: string[];
  accent: string;
}

const INSTRUMENTS: Instrument[] = [
  {
    id: 'nircam',
    name: 'NIRCam',
    full: 'Near-Infrared Camera',
    agency: 'University of Arizona',
    range: '0.6 – 5.0 μm',
    temp: '−234 °C',
    role: 'Primary imager. Wavefront sensor that keeps the 18 mirror segments aligned to nanometer precision.',
    detail: 'Two identical modules with coronagraphs for blocking starlight to image exoplanets directly. Captured the Cosmic Cliffs, Pillars of Creation, and most of the deep-field galaxy surveys.',
    modes: ['Imaging', 'Coronagraphy', 'Grism Spectroscopy', 'Time-Series'],
    accent: '#fbbf24',
  },
  {
    id: 'nirspec',
    name: 'NIRSpec',
    full: 'Near-Infrared Spectrograph',
    agency: 'ESA / Airbus',
    range: '0.6 – 5.3 μm',
    temp: '−234 °C',
    role: 'Reads chemical fingerprints of up to 200 objects at once using a micro-shutter array.',
    detail: '248,000 individually controllable microscopic shutters — each smaller than a human hair — let NIRSpec pick exactly which galaxies in a field to spectrum-analyze simultaneously. First instrument to confirm CO₂ on an exoplanet.',
    modes: ['Multi-object', 'IFU', 'Fixed-slit', 'Bright-object'],
    accent: '#a78bfa',
  },
  {
    id: 'miri',
    name: 'MIRI',
    full: 'Mid-Infrared Instrument',
    agency: 'ESA + NASA JPL',
    range: '5 – 28 μm',
    temp: '−266 °C',
    role: 'The only instrument that goes into mid-infrared — requires its own cryocooler.',
    detail: 'Cold enough that thermal noise from its own body would drown the signal it\'s trying to detect. Sees through dust into stellar nurseries, maps warm exoplanet atmospheres, and detects the most distant galaxies whose light is fully redshifted out of NIRCam\'s range.',
    modes: ['Imaging', 'Coronagraphy', 'Low-res Spec', 'Medium-res IFU'],
    accent: '#22d3ee',
  },
  {
    id: 'niriss',
    name: 'NIRISS',
    full: 'Near-Infrared Imager & Slitless Spectrograph',
    agency: 'CSA (Canadian Space Agency)',
    range: '0.6 – 5.0 μm',
    temp: '−234 °C',
    role: 'Exoplanet atmosphere specialist + aperture-mask interferometry for resolving objects near bright stars.',
    detail: 'Used to characterize the TRAPPIST-1 planet atmospheres and detect water vapor on WASP-96b. Its FGS (Fine Guidance Sensor) twin keeps the telescope locked on target to milliarcsecond precision.',
    modes: ['SOSS Spec', 'WFSS', 'AMI', 'Imaging'],
    accent: '#10b981',
  },
];

export function InstrumentsDeepDive() {
  const [active, setActive] = useState<string>('nircam');
  const inst = INSTRUMENTS.find((i) => i.id === active)!;

  return (
    <section id="jwst-instruments" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-300/80 mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
            INSTRUMENT BAY · ISIM
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-violet-50" style={{ fontFamily: "'Cinzel', serif" }}>
            Four Eyes. Four Wavelengths.
          </h2>
          <p className="mt-3 text-violet-100/70 text-sm md:text-base max-w-2xl mx-auto">
            Inside the Integrated Science Instrument Module — the cold black box behind Webb's mirror that does the actual seeing.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {INSTRUMENTS.map((i) => (
            <button
              key={i.id}
              onClick={() => setActive(i.id)}
              className="rounded-xl border px-4 py-3 text-left transition-all"
              style={{
                borderColor: active === i.id ? i.accent : 'rgba(167,139,250,0.2)',
                background: active === i.id ? `${i.accent}14` : 'rgba(15,8,40,0.55)',
                boxShadow: active === i.id ? `0 0 24px ${i.accent}33` : 'none',
              }}
            >
              <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: i.accent }}>{i.agency.split(' ')[0]}</p>
              <p className="mt-1 font-bold text-violet-50" style={{ fontFamily: "'Cinzel', serif" }}>{i.name}</p>
              <p className="text-[10px] text-violet-100/50 mt-0.5">{i.range}</p>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={inst.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border p-6 md:p-8 backdrop-blur-md"
            style={{
              borderColor: `${inst.accent}55`,
              background: `linear-gradient(135deg, ${inst.accent}10, rgba(15,8,40,0.7))`,
              boxShadow: `0 20px 60px -25px ${inst.accent}55`,
            }}
          >
            <div className="flex flex-wrap items-baseline gap-3 mb-4">
              <h3 className="text-2xl font-bold text-violet-50" style={{ fontFamily: "'Cinzel', serif" }}>{inst.name}</h3>
              <span className="text-sm text-violet-100/60">{inst.full}</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Stat label="Built by" value={inst.agency} accent={inst.accent} />
              <Stat label="Wavelength" value={inst.range} accent={inst.accent} />
              <Stat label="Operating Temp" value={inst.temp} accent={inst.accent} />
              <Stat label="Modes" value={`${inst.modes.length}`} accent={inst.accent} />
            </div>

            <p className="text-violet-100/85 leading-relaxed text-sm md:text-base mb-4">
              <span className="font-semibold" style={{ color: inst.accent }}>Role · </span>{inst.role}
            </p>
            <p className="text-violet-100/70 leading-relaxed text-sm md:text-base">{inst.detail}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {inst.modes.map((m) => (
                <span key={m} className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border" style={{ color: inst.accent, borderColor: `${inst.accent}44`, background: `${inst.accent}0d` }}>
                  {m}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-lg border px-3 py-2" style={{ borderColor: 'rgba(167,139,250,0.18)', background: 'rgba(5,3,13,0.5)' }}>
      <p className="text-[9px] font-mono uppercase tracking-widest text-violet-100/50">{label}</p>
      <p className="mt-0.5 text-sm font-semibold" style={{ color: accent }}>{value}</p>
    </div>
  );
}
