/**
 * Static route registry for site-wide search.
 * Each entry is indexed as a "navigational" hit (jump straight to a section).
 * Realm controls accent color via existing realm tokens.
 */

export type RealmKey =
  | 'cosmos'
  | 'disclosure'
  | 'ancient'
  | 'entity'
  | 'consciousness'
  | 'gods'
  | 'observatory'
  | 'echo'
  | 'archive';

export interface RouteRecord {
  route: string;
  title: string;
  summary: string;
  realm: RealmKey;
  keywords?: string;
}

export const REALM_LABEL: Record<RealmKey, string> = {
  cosmos: 'Cosmos',
  disclosure: 'Disclosure / UAP',
  ancient: 'Ancient Mysteries',
  entity: 'Entity Encounters',
  consciousness: 'Consciousness',
  gods: 'Pantheon of Gods',
  observatory: 'Observatory',
  echo: 'Echo',
  archive: 'Deep Archive',
};

/** Tailwind text token per realm (uses existing realm-* tokens). */
export const REALM_TEXT: Record<RealmKey, string> = {
  cosmos: 'text-realm-cosmos',
  disclosure: 'text-realm-disclosure',
  ancient: 'text-realm-gods',
  entity: 'text-realm-blackProjects',
  consciousness: 'text-realm-consciousness',
  gods: 'text-realm-gods',
  observatory: 'text-realm-observatory',
  echo: 'text-realm-echo',
  archive: 'text-realm-archive',
};

/** Background ring per realm for cards. */
export const REALM_RING: Record<RealmKey, string> = {
  cosmos: 'ring-realm-cosmos/30',
  disclosure: 'ring-realm-disclosure/30',
  ancient: 'ring-realm-gods/30',
  entity: 'ring-realm-blackProjects/30',
  consciousness: 'ring-realm-consciousness/30',
  gods: 'ring-realm-gods/30',
  observatory: 'ring-realm-observatory/30',
  echo: 'ring-realm-echo/30',
  archive: 'ring-realm-archive/30',
};

export const ROUTES: RouteRecord[] = [
  // Cosmos
  { route: '/jwst', title: 'James Webb Space Telescope', summary: 'JWST mission deep dive: deep field, instruments, L2 orbit, live findings.', realm: 'cosmos', keywords: 'webb nircam miri nirspec niriss infrared' },
  { route: '/telescopes', title: 'Telescope Observatory', summary: 'Hubble, Chandra, Spitzer, Kepler, Arecibo, ALMA, Green Bank, JWST.', realm: 'observatory' },
  { route: '/galaxy', title: 'Galaxy Explorer', summary: '3D solar system, planets, solar flares, atlas.', realm: 'cosmos' },
  { route: '/earth-pulse', title: 'Cosmos Pulse', summary: 'Daily cosmic pulse updates, space weather, anomalies.', realm: 'cosmos' },
  { route: '/signals', title: 'Live Signal Deck', summary: 'Filterable feed of incoming signals across realms.', realm: 'cosmos' },
  { route: '/rubiks-cube', title: "Rubik's Cube", summary: 'Cosmic puzzle interface.', realm: 'cosmos' },

  // Disclosure
  { route: '/uap', title: 'UAP Catalog', summary: 'Documented UAP cases: Nimitz, Phoenix, Roswell, Rendlesham, Tehran.', realm: 'disclosure' },
  { route: '/aaro', title: 'AARO Watch', summary: 'Pentagon UAP office lineage: AATIP, UAPTF, AOIMSG, AARO.', realm: 'disclosure' },
  { route: '/crash-retrieval', title: 'Crash Retrieval Files', summary: 'Recovered fragments, witness affidavits, SAP leaks.', realm: 'disclosure' },
  { route: '/black-programs', title: 'Black Programs', summary: 'Special Access Programs and unacknowledged compartments.', realm: 'disclosure' },
  { route: '/timeline', title: 'Disclosure Timeline', summary: 'Chronological disclosure events from 1947 to present.', realm: 'disclosure' },
  { route: '/whistleblowers', title: 'Whistleblower Vault', summary: 'Grusch, Elizondo, Greer, Schneider, Lazar, McCandlish, more.', realm: 'disclosure' },
  { route: '/corbell', title: 'Jeremy Corbell', summary: 'Documentarian dossier and case files.', realm: 'disclosure' },
  { route: '/jeremy-corbell', title: 'Jeremy Corbell', summary: 'Documentarian dossier (alt route).', realm: 'disclosure' },
  { route: '/brazil', title: 'Brazil UAP Dossier', summary: 'Operação Prato, Varginha, Colares — South American cases.', realm: 'disclosure' },
  { route: '/missing', title: 'Missing Scientists', summary: 'Suspicious deaths in the disclosure-adjacent scientific community.', realm: 'disclosure' },
  { route: '/orb-report', title: 'Orb Report', summary: 'Orb-class UAP observations and patterns.', realm: 'disclosure' },
  { route: '/documentaries', title: 'Documentaries', summary: 'Curated disclosure documentary library.', realm: 'disclosure' },
  { route: '/legislation', title: 'UAP Disclosure Legislation Tracker', summary: 'Schumer-Rounds UAP Disclosure Act, NDAA amendments, AARO mandates, House Task Force hearings.', realm: 'disclosure', keywords: 'ufo news uap disclosure act schumer rounds ndaa congress hearing grusch luna burchett aaro pub. l.' },

  // Ancient
  { route: '/atlantis', title: 'Atlantis', summary: "Plato's account and nine candidate submerged sites.", realm: 'ancient' },
  { route: '/pyramids', title: 'Pyramid Interior', summary: 'Great Pyramid geometry, chambers, alignments.', realm: 'ancient' },
  { route: '/glyphs', title: 'Glyphs Codex', summary: 'Decoded symbology across cultures.', realm: 'ancient' },
  { route: '/stone-faces', title: 'Stone Faces', summary: 'Megalithic faces and impossible carvings.', realm: 'ancient' },
  { route: '/antarctica', title: 'Antarctica Files', summary: 'Operation Highjump, Lake Vostok, scientist deaths.', realm: 'ancient' },
  { route: '/builders', title: "Builder's Arena", summary: 'Pyramid, Puma Punku, Baalbek, Coral Castle engineering deep-dives.', realm: 'ancient' },

  // Entity
  { route: '/species', title: 'Alien Species Codex', summary: 'Greys, Pleiadians, Reptilians, Arcturians, Sirians.', realm: 'entity' },
  { route: '/encounters', title: 'Entity Encounters', summary: 'Direct contact reports and abduction cases.', realm: 'entity' },
  { route: '/extinct', title: 'Extinct Species', summary: 'Lost lineages — human and otherwise.', realm: 'entity' },
  { route: '/underground', title: 'Underground Bases', summary: 'Dulce, Pine Gap, Mount Yamantau, and alleged DUMBs.', realm: 'entity' },
  { route: '/shadow-pantheon', title: 'Shadow Pantheon', summary: 'Forgotten and suppressed deities.', realm: 'entity' },

  // Consciousness / forge
  { route: '/federation', title: 'Galactic Federation', summary: 'Federation lore and accounts.', realm: 'consciousness' },
  { route: '/frequencies', title: 'Frequencies', summary: 'Schumann, solfeggio, 432Hz, 528Hz field.', realm: 'consciousness' },
  { route: '/cern', title: 'CERN Watch', summary: 'LHC events, ATLAS, CMS, anomalies.', realm: 'consciousness' },
  { route: '/elements', title: 'Elements Lab', summary: 'Periodic table + element mixer.', realm: 'consciousness' },
  { route: '/consciousness', title: 'Consciousness Field', summary: 'Field theories, near-death, remote viewing.', realm: 'consciousness' },
  { route: '/origin', title: 'Origin Chamber', summary: 'Origin myths and cosmogenesis.', realm: 'consciousness' },

  // Echo / community
  { route: '/echo', title: 'Echo AI', summary: 'Conversational AI researcher across the archive.', realm: 'echo' },
  { route: '/echoverse', title: 'Echoverse', summary: 'Community channels and live discussion.', realm: 'echo' },
  { route: '/the-46', title: 'The 46', summary: 'Vault slots, live drops, defiance modules.', realm: 'archive' },
  { route: '/46', title: 'Sanctuary of 46', summary: 'Numerology codex, oracle, pillars.', realm: 'archive' },
  { route: '/codex', title: 'Codex', summary: 'Searchable index of frequency 46 entries.', realm: 'archive' },
  { route: '/star-seed', title: 'Star-Seed Terminal', summary: 'Birth-chart starseed classifier.', realm: 'consciousness' },
  { route: '/experts', title: 'Voices · Experts', summary: 'Indexed expert profiles and primary sources.', realm: 'archive' },
  { route: '/gods', title: 'Pantheon of Gods', summary: 'Zeus, Odin, Enki, Thoth, Shiva, Apollo, Isis and more.', realm: 'gods' },

  // Topic hubs and utility pages that are useful discovery entry points
  { route: '/observatory', title: 'Observatory Map', summary: 'Explore the Observatory and navigate between research realms.', realm: 'observatory', keywords: 'map navigation hub topics' },
  { route: '/disclosure', title: 'Disclosure Command', summary: 'A central hub for disclosure research, official records, and UAP investigations.', realm: 'disclosure', keywords: 'hub congressional official documents' },
  { route: '/academy', title: 'Research Academy', summary: 'Structured learning paths, lessons, and quizzes for exploring the archive.', realm: 'archive', keywords: 'learn course lesson quiz study' },
  { route: '/briefing', title: 'Daily Briefing', summary: 'A briefing hub for notable updates and research signals.', realm: 'observatory', keywords: 'daily report updates digest' },
  { route: '/live-feeds', title: 'Live Feeds Dashboard', summary: 'Live and cached data from attributed public science and space-weather sources.', realm: 'cosmos', keywords: 'NOAA NASA solar wind space weather live data' },
  { route: '/missions', title: 'Missions & Progress', summary: 'Explore guided missions, learning paths, and progress through the Observatory.', realm: 'archive', keywords: 'quests tasks XP progress' },
  { route: '/sources', title: 'Sources & Evidence Labels', summary: 'Understand source tiers and how documented evidence is separated from lore and speculation.', realm: 'archive', keywords: 'trust credibility evidence methodology' },
  { route: '/library', title: 'Builder Library', summary: 'A curated library of saved research resources and investigations.', realm: 'archive', keywords: 'resources collection reading' },
  { route: '/health', title: 'Space Weather & Health Dashboard', summary: 'A source-attributed dashboard for current solar and environmental data.', realm: 'cosmos', keywords: 'solar activity alerts Kp index' },
  { route: '/archive', title: 'My Archive', summary: 'Return to saved investigations, sources, notes, and Echo discoveries on this device.', realm: 'archive', keywords: 'saved bookmarks personal collection' },
];
