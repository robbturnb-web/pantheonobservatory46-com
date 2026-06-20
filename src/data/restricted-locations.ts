export interface RestrictedLocation {
  id: string;
  name: string;
  region: string;
  classification: string;
  knownFacts: string[];
  claimsAndTheories: string[];
  trust: 'VERIFIED_FACT' | 'HISTORICAL_RECORD' | 'SPECULATIVE';
  source: string;
  sourceUrl?: string;
}

export const restrictedLocations: RestrictedLocation[] = [
  { id: 'area-51', name: 'Area 51 (Homey Airport / Groom Lake)', region: 'Nevada, USA', classification: 'USAF Test Range',
    knownFacts: [
      'Officially acknowledged by the CIA in 2013.',
      'Confirmed test site for U-2, A-12, SR-71, F-117, and B-2 stealth platforms.',
      'Restricted airspace extends 24 nautical miles around the facility.',
    ],
    claimsAndTheories: [
      'Reverse-engineering of recovered non-human craft (whistleblower testimony).',
      'Long-rumored underground levels beyond the public hangar footprint.',
    ],
    trust: 'VERIFIED_FACT', source: 'CIA Declassified U-2 History', sourceUrl: 'https://www.cia.gov/readingroom/document/0005517748' },
  { id: 'skinwalker', name: 'Skinwalker Ranch', region: 'Uintah Basin, Utah', classification: 'Private Research Site',
    knownFacts: [
      'Owned and instrumented by Brandon Fugal since 2016.',
      'Previously studied by NIDS (Bigelow) and AAWSAP (Pentagon).',
      'Sensor data, radiation spikes, and witness reports collected on record.',
    ],
    claimsAndTheories: [
      'Recurring UAP, cryptid, and poltergeist phenomena reported.',
      'Possible portal or quantum-anomaly explanations under investigation.',
    ],
    trust: 'HISTORICAL_RECORD', source: 'Skinwalker Ranch Research', sourceUrl: 'https://skinwalkerranch.com' },
  { id: 'pine-gap', name: 'Pine Gap', region: 'Alice Springs, Australia', classification: 'Joint US-AU SIGINT',
    knownFacts: [
      'Joint Defence Facility Pine Gap — NSA / CIA / Australian Defence Signals Directorate.',
      'Operates geostationary signals-intelligence satellites.',
      'No-fly zone enforced over the facility.',
    ],
    claimsAndTheories: [
      'Some Australian researchers allege a UAP-related role beyond SIGINT.',
    ],
    trust: 'VERIFIED_FACT', source: 'Australian Parliamentary Library', sourceUrl: 'https://www.aph.gov.au' },
  { id: 'svalbard', name: 'Svalbard Global Seed Vault', region: 'Spitsbergen, Norway', classification: 'Civilian Genetic Backup',
    knownFacts: [
      'Operational since 2008 inside a sandstone mountain on Spitsbergen.',
      'Holds >1.2 million seed samples from gene banks worldwide.',
      'Designed for a 200-year lifespan without active refrigeration.',
    ],
    claimsAndTheories: [
      'Some speculate undisclosed companion vaults exist for art, DNA, or knowledge.',
    ],
    trust: 'VERIFIED_FACT', source: 'Crop Trust', sourceUrl: 'https://www.croptrust.org/work/svalbard-global-seed-vault/' },
  { id: 'mount-weather', name: 'Mount Weather Emergency Operations Center', region: 'Virginia, USA', classification: 'FEMA Continuity-of-Government',
    knownFacts: [
      'Operated by FEMA; designated COG facility since the Cold War.',
      'Contains a self-contained underground city for senior officials.',
      'Used for continuity exercises and crisis relocation.',
    ],
    claimsAndTheories: [
      'Specific occupants and asset list classified.',
    ],
    trust: 'VERIFIED_FACT', source: 'GAO Reports · FEMA', sourceUrl: 'https://www.gao.gov' },
  { id: 'cheyenne-mountain', name: 'Cheyenne Mountain Complex', region: 'Colorado, USA', classification: 'NORAD Hardened Bunker',
    knownFacts: [
      'NORAD\'s nuclear-hardened command-and-control bunker, operational 1966.',
      '4.5 acres of chambers carved 600m inside granite.',
      'Designed to survive a 30-megaton near miss.',
    ],
    claimsAndTheories: [
      'Currently operates as backup to Peterson SFB; specific tenants classified.',
    ],
    trust: 'VERIFIED_FACT', source: 'U.S. Space Force · NORAD', sourceUrl: 'https://www.norad.mil' },
  { id: 'dulce', name: 'Dulce Base (alleged)', region: 'Archuleta Mesa, New Mexico', classification: 'Alleged / Unverified',
    knownFacts: [
      'A real Jicarilla Apache community named Dulce exists in New Mexico.',
      'No verified evidence of any underground facility at the location.',
    ],
    claimsAndTheories: [
      'Former Air Force officer Philip Schneider claimed a 1979 firefight with non-human entities.',
      'Paul Bennewitz built the foundation of the modern Dulce mythos — later disinformation campaigns added layers.',
    ],
    trust: 'SPECULATIVE', source: 'Greg Bishop — Project Beta' },
  { id: 'vatican-archives', name: 'Vatican Apostolic Archive', region: 'Vatican City', classification: 'Restricted Ecclesiastical Archive',
    knownFacts: [
      '53 miles of shelving; renamed from "Secret Archive" in 2019.',
      'Open to qualified researchers but most material requires special permission.',
      'Holds papal correspondence going back over a millennium.',
    ],
    claimsAndTheories: [
      'Long-running claims of suppressed gnostic, alchemical, and apocryphal texts.',
    ],
    trust: 'HISTORICAL_RECORD', source: 'Vatican Apostolic Archive', sourceUrl: 'https://www.archivioapostolicovaticano.va' },
];
