export interface PulseUpdate {
  id: string;
  date: string;
  title: string;
  summary: string;
  stefanLink?: string;
  category: 'solar' | 'seismic' | 'planetary' | 'anomaly';
  urgency: 'high' | 'medium';
}

export const pulseUpdates: PulseUpdate[] = [
  {
    id: '1',
    date: '2026-04-18',
    title: 'Planetary Geometry Peak — April 17–23 Window',
    summary:
      'Stefan Burns just dropped the latest: Earth is at the focal point of multiple planetary alignments. Multiple quakes in Pacific Ring, volcanic spikes in Iceland and Indonesia. Solar wind stream incoming. He’s calling this the strongest energetic window of 2026 so far.',
    stefanLink: 'https://www.youtube.com/@StefanBurns',
    category: 'planetary',
    urgency: 'high',
  },
  {
    id: '2',
    date: '2026-04-17',
    title: 'Solar Flare + Comet MAPS Update',
    summary:
      'X-class flare activity + Comet MAPS sungrazer trajectory confirmed. Burns notes correlation with increased orb sightings and seismic unrest. Three-eyed Atlas geometry active.',
    stefanLink: 'https://www.youtube.com/@StefanBurns',
    category: 'solar',
    urgency: 'high',
  },
  {
    id: '3',
    date: '2026-04-16',
    title: 'New Jersey Orbs & Drone Swarm Confirmed',
    summary:
      'Multiple witnesses report orbs interacting with military drones. Hellstorm missile test reportedly “eaten” by unknown object moving 200+ mph underwater pattern. Burns linking to abyssal activity.',
    category: 'anomaly',
    urgency: 'medium',
  },
  {
    id: '4',
    date: '2026-04-14',
    title: '7.1 Mw Quake — Kermadec Trench',
    summary:
      'Shallow strike-slip event west of the trench at 02:14 UTC. No tsunami advisory, but the swarm pattern around the Tonga arc continues to intensify in lockstep with elevated solar wind density.',
    category: 'seismic',
    urgency: 'medium',
  },
  {
    id: '5',
    date: '2026-04-12',
    title: 'Schumann Resonance Spike — 38 Hz Sustained',
    summary:
      'Tomsk and Cumiana monitoring stations register a 14-hour amplitude spike well above baseline. Coincides almost exactly with the M5.4 flare from AR3892 and a marked uptick in reported lucid dreaming on r/awakened.',
    category: 'planetary',
    urgency: 'medium',
  },
  {
    id: '6',
    date: '2026-04-10',
    title: 'Kp Index 7 — G3 Geomagnetic Storm',
    summary:
      'Auroras visible as far south as northern California and central Europe. Power grid operators in Quebec briefly throttle interconnect capacity. Burns notes the storm front aligns with Mercury-Sun-Earth conjunction.',
    stefanLink: 'https://www.youtube.com/@StefanBurns',
    category: 'solar',
    urgency: 'high',
  },
  {
    id: '7',
    date: '2026-04-08',
    title: 'Mount Spurr Showing Pre-Eruptive Tremors',
    summary:
      'AVO raises the alert level on the Alaskan volcano. Harmonic tremor pattern matches the 1992 pre-eruption signature. Anchorage flight ops begin contingency planning for ash-cloud disruption.',
    category: 'seismic',
    urgency: 'medium',
  },
  {
    id: '8',
    date: '2026-04-05',
    title: 'Comet 3I/ATLAS — Trajectory Anomaly',
    summary:
      'Avi Loeb publishes a fresh preprint flagging non-gravitational acceleration consistent with outgassing OR with a low-mass artificial object. Pantheon Observatory is tracking both interpretations.',
    category: 'anomaly',
    urgency: 'high',
  },
];
