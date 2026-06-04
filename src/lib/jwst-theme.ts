import type { PageTheme } from './page-themes';

/** Observatory theme tuned for the JWST flagship — royal violet + gold telemetry. */
export const jwstTheme: PageTheme = {
  id: 'jwst',
  name: 'James Webb Space Telescope',
  tagline: 'Mission Console · L2 Halo Orbit',
  classificationLabel: 'OBSERVATORY // FLAGSHIP MISSION',
  atmosphere: 'collider',
  pageBg:
    'linear-gradient(180deg, #05030d 0%, #0a0420 45%, #03020a 100%)',
  heroOverlay:
    'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.18) 0%, transparent 65%), linear-gradient(180deg, rgba(5,3,13,0.45) 0%, rgba(3,2,10,0.95) 100%)',
  accent: '#a78bfa',
  accentAlt: '#fcd34d',
  heroFg: '#f5f3ff',
  cardSurface: 'rgba(15, 8, 40, 0.78)',
  cardBorder: 'rgba(167, 139, 250, 0.28)',
  fontFamily: "'Space Grotesk', 'Inter', sans-serif",
  stampColor: '#fcd34d',
};
