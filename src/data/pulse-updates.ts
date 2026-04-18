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
    title: 'Planetary Geometry Peak — April 17-23 Window',
    summary:
      'Stefan Burns just dropped the latest: Earth is at the focal point of multiple planetary alignments. Multiple quakes in Pacific Ring, volcanic spikes in Iceland and Indonesia. Solar wind stream incoming. He\u2019s calling this the strongest energetic window of 2026 so far.',
    stefanLink: 'https://www.youtube.com/watch?v=EXAMPLE_STEFAN_418',
    category: 'planetary',
    urgency: 'high',
  },
  {
    id: '2',
    date: '2026-04-17',
    title: 'Solar Flare + Comet MAPS Update',
    summary:
      'X-class flare activity + Comet MAPS sungrazer trajectory confirmed. Burns notes correlation with increased orb sightings and seismic unrest. Three-eyed Atlas geometry active.',
    stefanLink: 'https://www.youtube.com/watch?v=EXAMPLE_STEFAN_417',
    category: 'solar',
    urgency: 'high',
  },
  {
    id: '3',
    date: '2026-04-16',
    title: 'New Jersey Orbs & Drone Swarm Confirmed',
    summary:
      'Multiple witnesses report orbs interacting with military drones. Hellstorm missile test reportedly \u201Ceaten\u201D by unknown object moving 200+ mph underwater pattern. Burns linking to abyssal activity.',
    stefanLink: '',
    category: 'anomaly',
    urgency: 'medium',
  },
];
