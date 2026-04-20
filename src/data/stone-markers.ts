// Stone faces & lost markers — global megalithic and anomalous sites.
export interface StoneMarker {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number]; // [lng, lat]
  era: string;
  description: string;
  theories: string[];
  significance: string;
  glow: string; // hex color for the marker pulse
}

export const STONE_MARKERS: StoneMarker[] = [
  {
    id: 'oak-island',
    name: 'Oak Island Money Pit',
    location: 'Nova Scotia, Canada',
    coordinates: [-64.296, 44.515],
    era: 'Discovered 1795',
    description: 'A 60m+ shaft with engineered flood tunnels. Centuries of excavation have yielded coconut fiber, parchment fragments, and inscribed stones — but no confirmed treasure.',
    theories: [
      'Templar reliquary cache',
      'Francis Bacon manuscripts',
      'Shakespeare authorship proof',
      'Pre-Columbian European visitors',
    ],
    significance: 'The flood-tunnel engineering predates any documented capability for the region.',
    glow: '#f59e0b',
  },
  {
    id: 'easter-island',
    name: 'Rapa Nui Moai',
    location: 'Easter Island, Pacific',
    coordinates: [-109.367, -27.117],
    era: '~1100 CE',
    description: '887 monolithic statues, average 4m tall and 12.5 tons. The largest weighs 86 tons. Quarried at Rano Raraku and transported up to 18 km.',
    theories: [
      'Rope-rocking "walking" technique',
      'Acoustic levitation (Rapa Nui oral tradition)',
      'Population collapse from over-extraction',
    ],
    significance: 'Long-ear cult and the Rongorongo script remain undeciphered.',
    glow: '#06b6d4',
  },
  {
    id: 'olmec-heads',
    name: 'Olmec Colossal Heads',
    location: 'Veracruz, Mexico',
    coordinates: [-94.687, 17.466],
    era: '~1500–400 BCE',
    description: '17 known basalt heads, up to 3.4m tall and 50 tons. African / Polynesian features have driven decades of debate.',
    theories: [
      'Trans-oceanic contact pre-Columbus',
      'Portrait sculptures of Olmec rulers',
      'Genetic evidence of Pacific contact (2020 study)',
    ],
    significance: 'Basalt was quarried 80+ km from the find sites — transport mechanism unknown.',
    glow: '#22c55e',
  },
  {
    id: 'gobekli-tepe',
    name: 'Göbekli Tepe',
    location: 'Şanlıurfa, Turkey',
    coordinates: [38.922, 37.223],
    era: '~9600 BCE',
    description: 'World\'s oldest known temple. 200+ T-shaped pillars up to 5.5m tall, intentionally buried 8000 BCE.',
    theories: [
      'Pre-agricultural priestly civilization',
      'Comet-impact memorial (Younger Dryas)',
      'Rewrites human history by 7000 years',
    ],
    significance: 'Built before agriculture, before the wheel, before pottery. Should not exist.',
    glow: '#a855f7',
  },
  {
    id: 'yonaguni',
    name: 'Yonaguni Monument',
    location: 'Ryukyu Islands, Japan',
    coordinates: [122.954, 24.434],
    era: 'Possibly ~10,000 BCE (submerged)',
    description: 'Underwater terraced rock formation with right angles, steps, and a "face" carving. 25m below sea level — would have been above water during last ice age.',
    theories: [
      'Natural geological formation',
      'Lost Pacific civilization (Mu / Lemuria)',
      'Pre-Jōmon megalithic site',
    ],
    significance: 'If artificial, predates all known civilizations.',
    glow: '#0ea5e9',
  },
  {
    id: 'bucegi-sphinx',
    name: 'Bucegi Sphinx',
    location: 'Bucegi Mountains, Romania',
    coordinates: [25.460, 45.405],
    era: 'Unknown',
    description: 'Natural rock formation resembling a sphinx. Local Project Bucegi whistleblower claims (Cezar Brad / Radu Cinamar) describe a hidden chamber with holographic Anunnaki archive beneath.',
    theories: [
      'Pareidolia of natural erosion',
      'Pre-flood Pelasgian temple',
      'Romanian SRI underground discovery (2003)',
    ],
    significance: 'One of three "sphinxes" globally — Egypt, Romania, Tibet form a perfect alignment.',
    glow: '#dc2626',
  },
  {
    id: 'puma-punku',
    name: 'Puma Punku',
    location: 'Tiwanaku, Bolivia',
    coordinates: [-68.674, -16.561],
    era: '~536 CE (orthodox), older claimed',
    description: 'Andesite blocks with millimetric precision cuts, perfect right angles, and machine-like grooves. Largest stone weighs 130 tons.',
    theories: [
      'Pre-Inca civilization with lost stoneworking tech',
      'Quarried 90 km from site',
      'Geometric template suggests modular prefab',
    ],
    significance: 'Cuts so precise that modern masons cannot replicate without diamond tooling.',
    glow: '#f97316',
  },
  {
    id: 'newgrange',
    name: 'Newgrange',
    location: 'County Meath, Ireland',
    coordinates: [-6.475, 53.694],
    era: '~3200 BCE',
    description: 'Passage tomb predating Stonehenge and the Pyramids. Inner chamber illuminated by sunrise on winter solstice.',
    theories: [
      'Astronomical observatory',
      'Womb-tomb resurrection chamber',
      'Pre-Celtic priesthood',
    ],
    significance: 'Engineering precision aligns sun beam to inner chamber for 17 minutes annually.',
    glow: '#eab308',
  },
];
