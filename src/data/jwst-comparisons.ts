/**
 * Why only Webb — head-to-head comparisons with predecessor telescopes.
 * Explains the physics gap: aperture, wavelength, orbit, temperature.
 */

export interface TelescopeComparison {
  id: string;
  rival: {
    name: string;
    aperture: string;
    wavelength: string;
    orbit: string;
    launch: string;
    limit: string;
  };
  webbWin: string;
  why: string;
  /** Optional split-image pair (left = rival, right = webb) for the slider */
  split?: {
    rivalImage: string;
    rivalLabel: string;
    webbImage: string;
    webbLabel: string;
    subject: string;
  };
}

export const TELESCOPE_COMPARISONS: TelescopeComparison[] = [
  {
    id: 'vs-hubble',
    rival: {
      name: 'Hubble Space Telescope',
      aperture: '2.4 m',
      wavelength: 'UV · Visible · near-IR (0.1–2.5 μm)',
      orbit: 'Low Earth Orbit (~540 km)',
      launch: '1990',
      limit: 'Cannot see redshifted early-universe light; warm Earth-orbit makes mid-infrared impossible.',
    },
    webbWin: 'Sees through dust to stellar nurseries and back to ~290 Myr after the Big Bang.',
    why: 'Light from the first galaxies is stretched by cosmic expansion out of Hubble\'s visible band into the infrared. Webb\'s 6.5 m mirror (6.25× the collecting area of Hubble) plus cryogenic detectors at −233 °C catch photons Hubble physically cannot register.',
    split: {
      rivalImage: 'https://stsci-opo.org/STScI-01EVT9TKKKCFP1KVS50K2WCT4Z.png',
      rivalLabel: 'Hubble · 1995',
      webbImage: 'https://stsci-opo.org/STScI-01GFNNW3DM8VW2RY6BAFXFRGZW.png',
      webbLabel: 'Webb · 2022 NIRCam',
      subject: 'Pillars of Creation — Eagle Nebula',
    },
  },
  {
    id: 'vs-spitzer',
    rival: {
      name: 'Spitzer Space Telescope',
      aperture: '0.85 m',
      wavelength: 'Mid/far infrared (3.6–160 μm)',
      orbit: 'Earth-trailing solar orbit',
      launch: '2003 (retired 2020)',
      limit: 'Tiny mirror = blurry resolution; ran out of liquid helium coolant in 2009.',
    },
    webbWin: 'Same wavelengths as Spitzer at ~50× sharper resolution and ~100× sensitivity.',
    why: 'Spitzer proved infrared from space works. Webb\'s mirror is 58× larger by area, and passive cooling behind a tennis-court-sized sunshield keeps MIRI permanently colder than Spitzer ever was — no coolant to run out.',
  },
  {
    id: 'vs-kepler',
    rival: {
      name: 'Kepler / TESS',
      aperture: 'Kepler 0.95 m · TESS 0.10 m',
      wavelength: 'Visible only (0.42–0.9 μm)',
      orbit: 'Solar (Kepler) · Lunar resonant (TESS)',
      launch: 'Kepler 2009 · TESS 2018',
      limit: 'Can only detect planets by transit dips. Cannot read what those planets are made of.',
    },
    webbWin: 'Reads the actual atmosphere of transit-discovered planets — water, CO₂, methane, sulfur dioxide.',
    why: 'Kepler / TESS find candidates by watching starlight dim. Webb watches starlight pass through a planet\'s atmosphere during transit and splits it into a spectrum — each gas leaves a chemical fingerprint. Confirmed CO₂ on WASP-39b, methane + CO₂ on K2-18b.',
  },
  {
    id: 'vs-keck',
    rival: {
      name: 'Keck / VLT (ground-based)',
      aperture: '10 m (Keck) · 8.2 m (VLT unit)',
      wavelength: 'Visible + some IR (atmospheric windows only)',
      orbit: 'Mauna Kea / Cerro Paranal',
      launch: '1993 / 1998',
      limit: 'Earth\'s atmosphere absorbs most infrared and blurs everything. Cannot observe in daylight.',
    },
    webbWin: 'Continuous IR coverage with no atmospheric distortion or absorption windows.',
    why: 'Even the world\'s largest mirrors fight 100 km of turbulent air that blocks key infrared bands (where water vapor lives) and smears starlight. From L2, Webb has perfect seeing 24/7 and the entire IR spectrum is open.',
  },
];
