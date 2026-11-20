import type { Citation, ClaimStatus } from '@/lib/evidence';

export interface PlasmaTopic {
  id: string;
  title: string;
  status: ClaimStatus;
  summary: string;
  sources: Citation[];
}

export const PLASMA_LAST_REVIEWED = '2026-11-20';

export const establishedPlasma: PlasmaTopic[] = [
  {
    id: 'ball-lightning', title: 'Ball lightning', status: 'academic',
    summary: 'Rare luminous spheres seen during thunderstorms. In 2012 researchers in China recorded one by chance with a spectrometer; its spectrum contained soil elements (silicon, iron, calcium), supporting the idea that some ball lightning forms from vaporized soil after a ground strike. The full mechanism is still debated.',
    sources: [{ title: 'Observation of the Optical and Spectral Characteristics of Ball Lightning', publisher: 'Physical Review Letters (Cen, Yuan, Xue)', date: '2014-01-17', url: 'https://doi.org/10.1103/PhysRevLett.112.035001', tier: 'peer-reviewed', establishes: 'One natural ball-lightning event was measured spectroscopically.', doesNotEstablish: 'A single mechanism for all reports.' }],
  },
  {
    id: 'sprites-jets', title: 'Sprites, blue jets and gigantic jets', status: 'academic',
    summary: 'Brief electrical discharges above thunderstorms, reaching toward the upper atmosphere. Long reported by pilots, they were first captured on camera in 1989 and are now routinely recorded from the ground and the International Space Station.',
    sources: [
      { title: 'Television Image of a Large Upward Electrical Discharge Above a Thunderstorm System', publisher: 'Science (Franz, Nemzek, Winckler)', date: '1990-07-06', url: 'https://doi.org/10.1126/science.249.4964.48', tier: 'peer-reviewed', establishes: 'First published image of a sprite.' },
      { title: 'Electrical discharge from a thundercloud top to the lower ionosphere', publisher: 'Nature (Pasko et al.)', date: '2002-03-14', url: 'https://doi.org/10.1038/416152a', tier: 'peer-reviewed', establishes: 'A gigantic jet connecting cloud top and ionosphere was recorded.' },
      { title: 'Lightning types', publisher: 'NOAA National Severe Storms Laboratory', date: 'Ongoing', url: 'https://www.nssl.noaa.gov/education/svrwx101/lightning/types/', tier: 'official' },
    ],
  },
  {
    id: 'plasmoids', title: 'Plasmoids and magnetic reconnection', status: 'academic',
    summary: 'A plasmoid is a self-contained blob of plasma and magnetic field. They form when magnetic field lines break and reconnect, in Earth\'s magnetosphere and on the Sun. NASA\'s Magnetospheric Multiscale mission measures this process directly in space.',
    sources: [{ title: 'Magnetospheric Multiscale (MMS) mission', publisher: 'NASA Science', date: 'Ongoing', url: 'https://science.nasa.gov/mission/mms/', tier: 'official' }],
  },
  {
    id: 'dusty-plasma', title: 'Dusty (complex) plasma', status: 'academic',
    summary: 'Plasma containing charged dust grains. In labs and on the ISS the grains can arrange into crystals, chains and spirals. This self-organization is physical, driven by electric forces — not biology.',
    sources: [{ title: 'Complex plasmas: An interdisciplinary research field', publisher: 'Reviews of Modern Physics (Morfill, Ivlev)', date: '2009-10-02', url: 'https://doi.org/10.1103/RevModPhys.81.1353', tier: 'peer-reviewed' }],
  },
  {
    id: 'propulsion', title: 'Plasma propulsion', status: 'verified',
    summary: 'Ion and Hall-effect thrusters accelerate charged gas to push spacecraft. NASA\'s Dawn mission used ion propulsion to orbit two bodies in the asteroid belt. This is mature engineering, not exotic physics.',
    sources: [{ title: 'Dawn — ion propulsion', publisher: 'NASA Science', date: 'Mission 2007–2018', url: 'https://science.nasa.gov/mission/dawn/technology/ion-propulsion/', tier: 'official' }],
  },
  {
    id: 'hessdalen', title: 'Hessdalen lights (unresolved natural phenomenon)', status: 'unresolved',
    summary: 'Recurring lights in a Norwegian valley, studied with instruments since the 1980s. One published hypothesis proposes a dusty-plasma mechanism; it has not been confirmed.',
    sources: [{ title: 'A hypothetical dusty-plasma mechanism of Hessdalen lights', publisher: 'Journal of Atmospheric and Solar-Terrestrial Physics (Paiva, Taft)', date: '2010', url: 'https://doi.org/10.1016/j.jastp.2010.07.022', tier: 'peer-reviewed', establishes: 'A proposed physical model.', doesNotEstablish: 'That the model is correct.' }],
  },
];

export const plasmaHypotheses: PlasmaTopic[] = [
  {
    id: 'inorganic-life-sim', title: 'Could dusty plasma show "life-like" behavior?', status: 'speculation',
    summary: 'A 2007 computer-simulation study found that dust grains in plasma could form helical structures that divide and replicate in shape. The authors speculated about "inorganic living matter". This was a model, not an observation of anything alive in nature.',
    sources: [{ title: 'From plasma crystals and helical structures towards inorganic living matter', publisher: 'New Journal of Physics (Tsytovich et al.)', date: '2007-08-14', url: 'https://doi.org/10.1088/1367-2630/9/8/263', tier: 'peer-reviewed', establishes: 'Simulated self-organizing dust structures.', doesNotEstablish: 'That such structures exist in the atmosphere or are alive or intelligent.' }],
  },
  {
    id: 'intelligent-plasma', title: '"Intelligent plasma" UAP claims', status: 'speculation',
    summary: 'Some researchers and online communities suggest that orb-like UAP are living or intelligent plasma beings. These claims rely on video interpretation and testimony. No instrumented measurement has shown plasma behaving with intention.',
    sources: [],
  },
  {
    id: 'sts-75', title: 'STS-75 tether video', status: 'disputed',
    summary: 'Footage from the 1996 tethered-satellite mission shows many small moving lights. It is often cited as plasma life. The common explanation is out-of-focus debris and ice particles lit by the Sun near the camera.',
    sources: [{ title: 'STS-75 mission', publisher: 'NASA', date: '1996', url: 'https://www.nasa.gov/mission/sts-75/', tier: 'official', establishes: 'Mission facts and the tether break.', doesNotEstablish: 'Anything about the lights; NASA does not describe them as life.' }],
  },
];
