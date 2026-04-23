import type { DossierEntry } from '@/components/dossier/types';

/**
 * Antarctica Files — ice-station expedition log
 * Curated dossiers covering Operation Highjump, Admiral Byrd's diary,
 * Lake Vostok, the alleged pyramid claims, Nazi base rumors, recent
 * ice-shelf anomalies, and scientist deaths on the continent.
 *
 * Confidence labels:
 *  VERIFIED — fully documented in declassified gov / peer-reviewed records
 *  REPORTED — credible journalism / multiple sources
 *  ALLEGED  — single-source / claimant testimony / fringe
 *  DEBATED  — actively contested in scientific community
 */
export const antarcticaEntries: DossierEntry[] = [
  {
    id: 'highjump',
    title: 'Operation Highjump',
    subtitle: 'US Navy expedition · 1946–1947',
    category: 'Operation',
    era: '1946–1947',
    location: 'Ross Sea / Bunger Hills, Antarctica',
    confidence: 'VERIFIED',
    symbol: '🪖',
    summary:
      'The largest Antarctic expedition in history: 4,700 personnel, 13 ships, 33 aircraft, and a curtailed eight-month deployment cut short to roughly eight weeks. Its true objectives remain a magnet for speculation.',
    origin:
      'In December 1946, the U.S. Navy launched Task Force 68 under the command of Rear Admiral Richard E. Byrd. The official purpose, per Navy briefings, was to train personnel and test materiel under polar conditions, consolidate U.S. sovereignty over Antarctica, and establish the Little America IV research base.\n\nBut the scale was extraordinary. The fleet included the aircraft carrier USS Philippine Sea, two seaplane tenders, two destroyers, the icebreaker USS Burton Island, and the submarine USS Sennet. Three task groups fanned across the continent. The expedition was abruptly cut short, and Byrd returned home where his comments in a Chilean newspaper interview (El Mercurio, March 5 1947) — that the U.S. would have to defend itself against "fighters that come from the polar regions" — became the seed of decades of speculation.',
    keyEvents: [
      'August 26 1946: Operation Highjump authorized by CNO Chester Nimitz.',
      'Dec 2 1946: Task Force 68 departs Norfolk, VA.',
      'Dec 30 1946: Three aircraft losses, including the PBM Mariner "George 1" crash in the Thurston Island region — three crew killed.',
      'Feb 1947: Operations terminated months ahead of schedule.',
      'March 5 1947: Byrd El Mercurio interview about polar-origin "flying objects".',
    ],
    evidence: [
      'Task Force 68 official report — declassified, available via NARA, confirms scale and aircraft losses.',
      'Mariner "George 1" Mayday transcript — three dead, three survivors rescued after 13 days.',
      'El Mercurio (Santiago, Chile) March 5 1947 interview with Byrd — original Spanish copy archived in the Chilean National Library.',
    ],
    skepticalView:
      'Mainstream historians (e.g., Lisle Rose, "Assault on Eternity", USNI Press 1980) attribute the early termination to severe weather, equipment failures, and Cold-War redeployment — not combat with unidentified craft. The Byrd "fighters from the poles" quote is real but is interpreted as a Cold-War warning about Soviet polar bombers, not extraterrestrials.',
    videos: [
      { id: 'mP2YYthVxXk', title: 'Operation Highjump: The Untold Story', channel: 'The Why Files' },
      { id: '5x6Xk5HOXr0', title: "Admiral Byrd's Antarctic Mystery", channel: 'Bedtime Stories' },
    ],
    sources: [
      { label: 'NARA Task Force 68 declassified report', url: 'https://catalog.archives.gov/' },
      { label: 'Lisle A. Rose — Assault on Eternity (USNI Press, 1980)' },
      { label: 'El Mercurio interview, March 5 1947 (Chilean National Library)' },
    ],
  },
  {
    id: 'byrd-diary',
    title: "Admiral Byrd's Secret Diary",
    subtitle: 'Alleged 1947 inner-Earth flight log',
    category: 'Document',
    era: '1947 (purported)',
    location: 'Antarctic interior',
    confidence: 'ALLEGED',
    symbol: '📓',
    summary:
      'A document circulating since the 1970s claims to be Byrd\'s personal flight journal describing a flight beyond the Pole into a warm, inhabited inner-Earth region called "Agartha." Mainstream historians regard the diary as a hoax, but it remains a centerpiece of hollow-Earth literature.',
    origin:
      'The "Secret Diary" first surfaced in print in the 1980s through hollow-Earth publishers. It depicts Byrd flying past the southern pole into a warmer cavity where he meets the "Master" of an inner civilization. No original manuscript has ever been authenticated; Byrd\'s family and the Byrd Polar Research Center deny its provenance.\n\nThe document is used today by hollow-Earth and inner-Earth communities as confirmation of subterranean civilizations. Skeptics note its language anachronisms, the absence in Byrd\'s real (well-documented) papers held at Ohio State University, and stylistic inconsistencies with his verified writings.',
    keyEvents: [
      'c.1979: Earliest printed copies appear in fringe newsletters.',
      '1990s: Diary republished in dozens of books and online forums.',
      '2010+: Byrd Polar Research Center publicly states no such diary exists in their archive.',
    ],
    skepticalView:
      'Byrd\'s actual papers — over 500 boxes — are held at the Byrd Polar and Climate Research Center, Ohio State University. The "Secret Diary" is not among them. Linguistic analysis points to a 1970s-era forgery.',
    confidence: 'ALLEGED',
    sources: [
      { label: 'Byrd Polar and Climate Research Center, Ohio State University', url: 'https://bpcrc.osu.edu/' },
      { label: 'Loren Coleman — analysis of Byrd diary forgery claims' },
    ],
  },
  {
    id: 'lake-vostok',
    title: 'Lake Vostok',
    subtitle: 'Subglacial lake sealed for 15+ million years',
    category: 'Site',
    era: 'Discovered 1993, drilled 2012',
    location: '4 km below Vostok Station, East Antarctica',
    confidence: 'VERIFIED',
    symbol: '🔬',
    summary:
      'A massive freshwater lake the size of Lake Ontario, sealed beneath nearly 4 km of ice for at least 15 million years. Russian drilling reached it in 2012; reports of unusual bacterial DNA and a strong magnetic anomaly along its shore have fueled speculation about what is preserved there.',
    origin:
      'Russian scientist Andrey Kapitsa first proposed Vostok\'s existence in the 1960s; British and US radar surveys confirmed the lake by 1993. After more than two decades of drilling — through controversial use of kerosene as drill fluid — the Russian team breached the lake on February 5 2012.\n\nIn 2013 the team announced the discovery of a previously unknown bacterial DNA sequence ("w123-10") that did not match any known organism. The find was later partly retracted, but multiple unidentified microbial signatures remain. Separately, a 2001 magnetic survey reported a large anomaly at the lake\'s southeast shore — interpreted variously as a geological feature, a buried meteorite, or, in fringe interpretations, a structure.',
    keyEvents: [
      '1960s: Kapitsa proposes a subglacial lake under Vostok.',
      '1993: Radar imaging confirms the lake.',
      'Feb 5 2012: Russian drillers reach lake water at 3,768 m depth.',
      '2013: Sergey Bulat reports unidentified bacterial DNA.',
      '2001: Studinger et al. publish a magnetic anomaly survey of the lake area.',
    ],
    evidence: [
      'Lukin V.V. & Bulat S.A. (2011) — Vostok Subglacial Lake: Details of Russian Plans/Activities.',
      'Studinger et al. (2001) — "Subglacial Lake Vostok: A Geophysical Perspective" — Earth and Planetary Science Letters.',
      'Bulat (2016) — RAS press conference on novel microbial DNA sequences.',
    ],
    skepticalView:
      'Most contamination concerns from kerosene drilling have not been ruled out; the unknown DNA may reflect drill-fluid contaminants. The magnetic anomaly is most parsimoniously explained by a geological intrusion, not a manufactured object.',
    videos: [
      { id: 'mIAi9Z7QkqI', title: 'The Mystery of Lake Vostok', channel: 'SciShow' },
    ],
    sources: [
      { label: 'Studinger et al. (2001) — EPSL paper on Vostok geophysics' },
      { label: 'BBC — "Russians drill into previously unknown Antarctic lake"', url: 'https://www.bbc.com/news/science-environment-16906054' },
      { label: 'Nature — "Race to subglacial lake heats up" (2011)' },
    ],
  },
  {
    id: 'antarctic-pyramids',
    title: 'The "Antarctic Pyramids"',
    subtitle: 'Pyramid-shaped peaks in the Ellsworth Mountains',
    category: 'Anomaly',
    era: 'Imaged 2013–present',
    location: 'Ellsworth Mountain Range',
    confidence: 'DEBATED',
    symbol: '🔺',
    summary:
      'Satellite imagery and expedition photographs of three distinct pyramid-shaped peaks in the Ellsworth range have driven viral claims of artificial structures buried in the ice. Geologists identify them as "nunataks" — wind-carved erosional remnants — but the symmetry remains striking enough to dominate popular speculation.',
    origin:
      'Photographs first widely circulated in 2013 when the British Antarctic Survey released expedition imagery. The most-shared "pyramid" sits near 79°58′S, 81°57′W in the Heritage Range. The nearly four-sided symmetry is unusually pronounced for natural rock and has been compared to the Egyptian pyramids in size.\n\nProfessional glaciologists explain the form as a horn — the same erosional process that created the Matterhorn — produced when glaciers carve a peak from multiple sides. Critics note that "pyramidal peaks" are common in mountain ranges worldwide; the Antarctic examples are not topographically unique. The artificial-structure interpretation lacks any subsurface scan or core sample.',
    keyEvents: [
      '2013: BAS expedition photos go viral.',
      '2016: Independent geologists publish nunatak / horn analysis.',
      'Ongoing: Multiple ice-penetrating radar surveys image internal rock structure consistent with natural folding.',
    ],
    skepticalView:
      'Geomorphologists overwhelmingly classify these features as glacial horns (nunataks). The "perfect symmetry" appearance is largely a function of viewing angle in the original photographs.',
    sources: [
      { label: 'British Antarctic Survey expedition imagery (2013)', url: 'https://www.bas.ac.uk/' },
      { label: 'USGS Antarctic Topographic Database' },
    ],
  },
  {
    id: 'nazi-base-211',
    title: 'Base 211 / New Swabia',
    subtitle: 'German wartime expedition & post-war legend',
    category: 'Operation',
    era: '1938–1939; legend continues',
    location: 'Queen Maud Land',
    confidence: 'DEBATED',
    symbol: '⚓',
    summary:
      'A documented 1938–1939 German expedition to Queen Maud Land grew into one of the most enduring conspiracy narratives of the 20th century: that a hidden Nazi base ("Base 211") was established and survived WWII, possibly as the launch point for "foo fighters" and post-war saucer craft.',
    origin:
      'In 1938, the German Antarctic Expedition aboard MS Schwabenland surveyed roughly 600,000 km² of coastal Antarctica, naming the area "Neuschwabenland." Aerial mapping was extensive; ~350,000 km² were photographed. The expedition was real, well-documented in German naval archives, and is geographically corroborated.\n\nThe leap from "expedition" to "secret base" came in the post-war period through Argentine newspaper articles, the disputed escape of two German U-boats (U-530 and U-977) to Argentina in mid-1945, and pulp publications in the 1950s–60s. There is no archaeological, satellite, or geophysical evidence of any artificial base in Queen Maud Land.',
    keyEvents: [
      'Dec 17 1938: MS Schwabenland departs Hamburg.',
      'Jan 19 1939: First flag-drop over Queen Maud Land.',
      '1945: U-530 (Jul 10) and U-977 (Aug 17) surrender at Mar del Plata, Argentina — fueling base rumors.',
      '1947: Operation Highjump partially blamed (in fringe lore) on hunting "Base 211."',
    ],
    skepticalView:
      'The expedition was real but limited. Both surrendered U-boats had standard wartime crews; their commanders (Wermuth and Schäffer) gave detailed depositions accounting for their movements. No supplies, fuel, or construction logistics on the scale required for a sustained Antarctic base existed in 1944–45 Germany.',
    videos: [
      { id: '4zaLh7t1trk', title: "Hitler's Antarctic Base 211", channel: 'Bedtime Stories' },
    ],
    sources: [
      { label: 'Cornelia Lüdecke — "Antarctic Research and the Geophysical Year" (peer-reviewed)' },
      { label: 'German Federal Archives — Schwabenland expedition records' },
    ],
  },
  {
    id: 'ice-shelf-anomaly',
    title: 'Larsen Ice-Shelf Anomalies',
    subtitle: 'A-68 calving & subsequent glacial behavior',
    category: 'Anomaly',
    era: '2017–present',
    location: 'Antarctic Peninsula',
    confidence: 'VERIFIED',
    symbol: '🧊',
    summary:
      'In July 2017, an iceberg the size of Delaware (A-68, ~5,800 km²) calved from the Larsen C ice shelf. The event triggered intense scientific scrutiny and revealed previously unknown subglacial ecosystems beneath the freshly exposed seafloor.',
    origin:
      'A-68 broke away over a multi-year fracture event tracked by NASA satellites and the British Antarctic Survey. Its calving exposed roughly 5,800 km² of seafloor that had been ice-covered for an estimated 120,000 years. The 2018 BAS rapid-response cruise found a thriving benthic ecosystem — sponges, anemones, and previously undocumented species — within months of exposure.\n\nIn parallel, satellite gravimetry (GRACE-FO) has detected accelerating ice mass loss across the Antarctic Peninsula. While well within climate-change models, the rate of change continues to outpace earlier IPCC projections.',
    keyEvents: [
      'July 12 2017: A-68 calves from Larsen C.',
      'Feb 2018: BAS rapid-response cruise documents previously hidden seafloor ecosystem.',
      '2020: A-68A breaks apart approaching South Georgia.',
      '2023: Multiple papers confirm accelerating Peninsula mass loss.',
    ],
    confidence: 'VERIFIED',
    sources: [
      { label: 'NASA Earth Observatory — A-68 timeline', url: 'https://earthobservatory.nasa.gov/' },
      { label: 'British Antarctic Survey — Larsen C ecosystem report (2018)' },
    ],
  },
  {
    id: 'kerry-visit',
    title: 'John Kerry\'s 2016 Visit',
    subtitle: 'Sitting Secretary of State visits the South Pole',
    category: 'Event',
    era: 'November 2016',
    location: 'Amundsen-Scott South Pole Station',
    confidence: 'VERIFIED',
    symbol: '🛬',
    summary:
      'In November 2016, then-Secretary of State John Kerry became the highest-ranking sitting U.S. official ever to visit Antarctica, traveling to the South Pole during the U.S. presidential transition. The unusual timing remains a focus of speculation.',
    origin:
      'Kerry arrived at McMurdo Station on November 11 2016 — three days after the U.S. presidential election — and continued to the Amundsen-Scott South Pole Station. Officially, the visit highlighted the Antarctic Treaty and climate research. The State Department released a brief itinerary; no classified meetings were disclosed.\n\nThe odd timing (a sitting cabinet officer leaving the country during the presidential transition), combined with the appearance of Russian Patriarch Kirill in Antarctica earlier in 2016 and a stream of other senior visitors, became the basis of speculation that something significant had been discovered or recovered. No declassified record corroborates such claims.',
    keyEvents: [
      'Feb 18 2016: Russian Patriarch Kirill visits King George Island.',
      'Nov 11 2016: Kerry arrives at McMurdo.',
      'Nov 12 2016: Kerry visits Amundsen-Scott South Pole Station.',
    ],
    sources: [
      { label: 'U.S. State Department official press release (Nov 2016)', url: 'https://2009-2017.state.gov/' },
      { label: 'Reuters — "Kerry visits Antarctica" (Nov 11 2016)' },
    ],
  },
  {
    id: 'rodney-marks',
    title: 'Death of Rodney Marks',
    subtitle: 'South Pole astrophysicist · methanol poisoning',
    category: 'Casefile',
    era: 'May 2000',
    location: 'Amundsen-Scott South Pole Station',
    confidence: 'VERIFIED',
    symbol: '🕯',
    summary:
      'Australian astrophysicist Rodney Marks died at the South Pole in May 2000 from methanol poisoning. His death — never fully explained — became the only suspicious death in U.S. Antarctic Program history and remains an open New Zealand coronial matter.',
    origin:
      'Marks, 32, worked on the AST/RO submillimeter telescope. On May 12 2000, he became suddenly ill, vomited blood, and died within 36 hours despite intensive station medical care. The continent was inaccessible by air during austral winter; his body was kept frozen until October.\n\nAutopsy showed methanol poisoning. New Zealand coroner Richard McElrea ruled in 2008 that the source could not be determined — accidental ingestion, intentional self-harm, or homicide all remained possible. The FBI investigated, the New Zealand Police investigated, and the case file remains open. Approximately 49 colleagues were on station at the time; many were never formally interviewed.',
    keyEvents: [
      'May 11 2000: Marks first reports illness.',
      'May 12 2000: Marks dies after 36 hours.',
      'Oct 2000: Body returned to Christchurch for autopsy.',
      '2008: NZ coroner releases findings — death by methanol, source undetermined.',
    ],
    confidence: 'VERIFIED',
    sources: [
      { label: 'New Zealand Coroner findings on Rodney Marks (2008)', url: 'https://coronialservices.justice.govt.nz/' },
      { label: 'The Australian — long-form investigation by Greg Roberts (2008)' },
    ],
  },
];

export const antarcticaCategories = ['All', 'Operation', 'Document', 'Site', 'Anomaly', 'Event', 'Casefile'];
