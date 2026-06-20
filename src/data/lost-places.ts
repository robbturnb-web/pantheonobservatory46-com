export interface LostPlace {
  id: string;
  name: string;
  region: string;
  status: 'Mythological' | 'Historically Attested' | 'Archaeologically Confirmed' | 'Submerged';
  trust: 'VERIFIED_FACT' | 'HISTORICAL_RECORD' | 'MYTH_LORE' | 'SPECULATIVE';
  summary: string;
  legend: string;
  source: string;
  sourceUrl?: string;
  coordinates?: string;
}

export const lostPlaces: LostPlace[] = [
  { id: 'atlantis', name: 'Atlantis', region: 'Atlantic Ocean (legendary)', status: 'Mythological', trust: 'MYTH_LORE',
    summary: 'Advanced island civilization described by Plato as sinking "in a single day and night" around 9600 BCE.',
    legend: 'Source for thousands of years of legend; modern theories place it in the Mediterranean, Atlantic, or Sahara.',
    source: 'Plato · Timaeus & Critias' },
  { id: 'lemuria', name: 'Lemuria / Mu', region: 'Pacific Ocean (legendary)', status: 'Mythological', trust: 'MYTH_LORE',
    summary: 'Proposed lost continent of the Pacific, central to 19th-century occult and theosophical thought.',
    legend: 'Originally invented to explain biogeographic puzzles; absorbed by mystics into prehistory mythology.',
    source: 'Helena Blavatsky · The Secret Doctrine' },
  { id: 'el-dorado', name: 'El Dorado', region: 'South America', status: 'Mythological', trust: 'MYTH_LORE',
    summary: 'The legendary "Golden One" — originally a Muisca king, later mythologized into a lost city of gold.',
    legend: 'Drove Spanish expeditions across the Amazon and Orinoco for two centuries.',
    source: 'Smithsonian — El Dorado', sourceUrl: 'https://www.smithsonianmag.com/history/el-dorado-180974537/' },
  { id: 'dwarka', name: 'Dwarka', region: 'Gulf of Khambhat, India', status: 'Submerged', trust: 'HISTORICAL_RECORD',
    summary: 'Submerged stone structures off Gujarat dated by some surveys to 7500 BCE — possibly the city of Krishna from the Mahabharata.',
    legend: 'If confirmed pre-flood, it would rewrite the timeline of Indian civilization.',
    source: 'National Institute of Ocean Technology · India', coordinates: '22.2°N 68.9°E' },
  { id: 'thonis-heracleion', name: 'Thonis-Heracleion', region: 'Bay of Aboukir, Egypt', status: 'Archaeologically Confirmed', trust: 'VERIFIED_FACT',
    summary: 'Ancient Egyptian port city that sank into the Mediterranean ~AD 800 — rediscovered in 2000 by underwater archaeologist Franck Goddio.',
    legend: 'Confirmed the historicity of cities long known only from inscriptions.',
    source: 'Franck Goddio Institute', sourceUrl: 'https://www.franckgoddio.org', coordinates: '31.3°N 30.1°E' },
  { id: 'shambhala', name: 'Shambhala', region: 'Central Asia / Tibet (legendary)', status: 'Mythological', trust: 'MYTH_LORE',
    summary: 'Hidden Buddhist kingdom said to exist in a valley beyond the Himalayas — pure land of enlightened beings.',
    legend: 'Featured in the Kalachakra Tantra and reimagined as "Shangri-La" in 20th-century Western fiction.',
    source: 'Kalachakra Tantra · Tibetan tradition' },
  { id: 'hyperborea', name: 'Hyperborea', region: 'Far north (legendary)', status: 'Mythological', trust: 'MYTH_LORE',
    summary: 'Ancient Greek paradise "beyond the north wind" — a land of perpetual sun and immortal sages.',
    legend: 'Echoes in Vedic, Iranian, and later esoteric traditions of a polar homeland.',
    source: 'Pindar · Pythian Odes' },
  { id: 'iram', name: 'Iram of the Pillars', region: 'Empty Quarter, Arabia', status: 'Historically Attested', trust: 'SPECULATIVE',
    summary: 'Lost city of soaring pillars mentioned in the Qur\'an, possibly the city of Ubar — fragments located via SIR-C radar in 1992.',
    legend: 'Buried by sand for millennia; radar imagery revealed buried caravan routes.',
    source: 'NASA / JPL Shuttle Radar', sourceUrl: 'https://www.jpl.nasa.gov/news/lost-city-found-in-arabia', coordinates: '18.3°N 53.6°E' },
];
