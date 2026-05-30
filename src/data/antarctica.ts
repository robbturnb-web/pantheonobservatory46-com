import type { DossierEntry } from '@/components/dossier/types';
import highjumpImg from '@/assets/antarctica-highjump.jpg';
import byrd_diaryImg from '@/assets/antarctica-byrd-diary.jpg';
import lake_vostokImg from '@/assets/antarctica-lake-vostok.jpg';
import antarctic_pyramidsImg from '@/assets/antarctica-antarctic-pyramids.jpg';
import nazi_base_211Img from '@/assets/antarctica-nazi-base-211.jpg';
import ice_shelf_anomalyImg from '@/assets/antarctica-ice-shelf-anomaly.jpg';
import kerry_visitImg from '@/assets/antarctica-kerry-visit.jpg';
import rodney_marksImg from '@/assets/antarctica-rodney-marks.jpg';
import wilkes_pyramidImg from '@/assets/antarctica-wilkes-pyramid.jpg';

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
    heroImage: highjumpImg,
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
      { id: 'VNa6PrHW2cU', title: 'Operation Highjump 1946 — U.S. Navy Antarctic Research Expedition', channel: 'PeriscopeFilm' },
      { id: 'E9chz8COYVc', title: 'The Secret Land — Operation Highjump (1946 official film)', channel: 'PeriscopeFilm' },
      { id: 'YI9gSyFHcbw', title: 'Admiral Richard Byrd · Operation Highjump · Antarctic Expedition Documentary', channel: 'livingselfsufficient' },
    ],
    sources: [
      { label: 'NARA Task Force 68 declassified report', url: 'https://catalog.archives.gov/' },
      { label: 'Lisle A. Rose — Assault on Eternity (USNI Press, 1980)' },
      { label: 'El Mercurio interview, March 5 1947 (Chilean National Library)' },
    ],
  },
  {
    id: 'byrd-diary',
    heroImage: byrd_diaryImg,
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
    sources: [
      { label: 'Byrd Polar and Climate Research Center, Ohio State University', url: 'https://bpcrc.osu.edu/' },
      { label: 'Loren Coleman — analysis of Byrd diary forgery claims' },
    ],
  },
  {
    id: 'lake-vostok',
    heroImage: lake_vostokImg,
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
      { id: 'quf62SMgtfA', title: 'Russians Reach Antarctic Lake (Lake Vostok breakthrough)', channel: 'Associated Press' },
      { id: 'ceZlMfYP8yQ', title: 'What Lies Beneath Antarctica? The Lake Vostok Mystery', channel: 'World Wonders' },
    ],
    sources: [
      { label: 'Studinger et al. (2001) — EPSL paper on Vostok geophysics' },
      { label: 'BBC — "Russians drill into previously unknown Antarctic lake"', url: 'https://www.bbc.com/news/science-environment-16906054' },
      { label: 'Nature — "Race to subglacial lake heats up" (2011)' },
    ],
  },
  {
    id: 'antarctic-pyramids',
    heroImage: antarctic_pyramidsImg,
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
    videos: [
      { id: 'cIZ7625Ts6A', title: 'Pyramids Found Beneath Antarctic Ice | The UnXplained S3', channel: 'HISTORY' },
      { id: '1RXIEIHhlMc', title: "What's Hidden Under Antarctica Will Cause Global Tension", channel: 'New Nature' },
    ],
    sources: [
      { label: 'British Antarctic Survey expedition imagery (2013)', url: 'https://www.bas.ac.uk/' },
      { label: 'USGS Antarctic Topographic Database' },
    ],
  },
  {
    id: 'nazi-base-211',
    heroImage: nazi_base_211Img,
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
      { id: '0DRbjg_0zu8', title: 'Cryptids Vol. 3: The Antarctic Cover-up', channel: 'The Why Files' },
      { id: 'BVOkGp5w14I', title: 'Joe Rogan Experience #2327 — AJ Gentile (Antarctica segment)', channel: 'PowerfulJRE' },
    ],
    sources: [
      { label: 'Cornelia Lüdecke — "Antarctic Research and the Geophysical Year" (peer-reviewed)' },
      { label: 'German Federal Archives — Schwabenland expedition records' },
    ],
  },
  {
    id: 'ice-shelf-anomaly',
    heroImage: ice_shelf_anomalyImg,
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
    videos: [
      { id: 'oXe7T4SQNts', title: 'Chasing Ice: Largest Glacier Calving Ever Filmed', channel: 'AGU' },
      { id: 'kPgdfPz235I', title: 'Solving the Mystery of Blood Falls in Antarctica', channel: 'Anton Petrov' },
    ],
    sources: [
      { label: 'NASA Earth Observatory — A-68 timeline', url: 'https://earthobservatory.nasa.gov/' },
      { label: 'British Antarctic Survey — Larsen C ecosystem report (2018)' },
    ],
  },
  {
    id: 'kerry-visit',
    heroImage: kerry_visitImg,
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
    heroImage: rodney_marksImg,
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
    sources: [
      { label: 'New Zealand Coroner findings on Rodney Marks (2008)', url: 'https://coronialservices.justice.govt.nz/' },
      { label: 'The Australian — long-form investigation by Greg Roberts (2008)' },
    ],
  },
  {
    id: 'lake-vostok',
    title: 'Lake Vostok · Subglacial Anomaly',
    subtitle: 'Buried freshwater lake · 4 km under the ice',
    category: 'Site',
    era: '1996–present',
    location: 'East Antarctic Ice Sheet (78°S 106°E)',
    confidence: 'VERIFIED',
    symbol: '🧊',
    summary:
      "The largest of Antarctica's 400+ subglacial lakes, sealed beneath 3.7 km of ice for at least 15 million years. Russian drilling in 2012 finally penetrated the lake — and Russian state media reported a 'powerful magnetic anomaly' at the south end that no published paper has fully explained.",
    origin:
      "Mapped in 1996 by joint Russian, British, and American radar surveys. Roughly 250 km long, 50 km wide, with depths to 800 m. The water is 10 to 15 million years old and entirely cut off from the atmosphere. Russia's Vostok Station drilled the borehole 5G that reached the lake on February 5, 2012.\n\nA TASS report citing chief driller Valery Lukin mentioned a 'magnetic anomaly' near the southern shore detected during airborne surveys — a feature consistent with either a buried iron-rich intrusion or, per fringe interpretation, an artificial structure. Western scientists have not replicated or refuted the anomaly publicly.",
    keyEvents: [
      '1996: Russia–UK–USA radar surveys publish initial Vostok dimensions in Nature.',
      '2008: Studinger et al. publish magnetic survey hinting at a localized anomaly.',
      'Feb 5 2012: Borehole 5G punctures the lake surface.',
      '2013: Russian team announces "bacterial species unknown to science" found in sample — later contested as drilling-fluid contamination.',
    ],
    evidence: [
      'Studinger, M. et al. (2008) — "Sub-ice geology inland of the Transantarctic Mountains in light of new aerogeophysical data", Earth Planet. Sci. Lett.',
      'Bulat, S. (2016) — paper on Vostok lake microbiology in Phil. Trans. R. Soc.',
      'TASS Russian state news release, Feb 8 2012.',
    ],
    skepticalView:
      'Mainstream geophysicists (e.g., Robin Bell, Lamont-Doherty) attribute the magnetic anomaly to a thinned section of crust or a buried mafic intrusion. The "unknown species" was retracted as kerosene-derived contamination from the drill column.',
    videos: [
      { id: 'PsX5N6Vlfb4', title: 'Lake Vostok: The Mystery Under Antarctic Ice', channel: 'Be Smart' },
    ],
    sources: [
      { label: 'Studinger et al. 2008 — EPSL', url: 'https://doi.org/10.1016/j.epsl.2008.09.020' },
      { label: 'TASS Vostok drilling report (Feb 2012)' },
    ],
  },
  {
    id: 'byrd-diary',
    title: "Admiral Byrd's Alleged Secret Diary",
    subtitle: '"The Inner Earth · My Secret Diary" · attributed to 1947',
    category: 'Document',
    era: '1947 (attributed)',
    location: 'Inner Earth / Antarctica',
    confidence: 'ALLEGED',
    symbol: '📓',
    summary:
      "A 14-page document that surfaced in fringe circles in the 1970s claiming to be Admiral Byrd's personal flight log from a polar expedition where he entered a hollow earth via the South Pole and met a being called 'The Master' in an underground city called 'Agartha.'",
    origin:
      "The document is dated February 1947 and describes Byrd piloting a single aircraft past the pole into a warm, lush interior, encountering swastika-marked craft, and being escorted into a crystalline city. No original physical copy with provenance has ever surfaced; the earliest verifiable appearance is in mimeographed UFO-society newsletters circa 1970, long after Byrd's death in 1957.",
    keyEvents: [
      '1947: Byrd flies Operation Highjump (real expedition).',
      '1957: Byrd dies; no such diary found in his estate at Ohio State University.',
      'c.1970: First mimeographed copies circulate among UFO researchers.',
      '1990s onward: Text reproduced on websites and in self-published books.',
    ],
    evidence: [
      'The Ohio State University Byrd Polar Research Center catalog of Byrd papers — contains no such diary.',
      'The diary text itself, widely reproduced (e.g. in Tim Beckley reprints).',
    ],
    skepticalView:
      "Treated as a hoax by all credentialed Byrd biographers (Lisle Rose, Eugene Rodgers). The writing style does not match Byrd's known journals, technical aviation details are wrong for 1947 aircraft, and the document's first appearance two decades after Byrd's death is the classic pattern of postmortem fabrication.",
    videos: [],
    sources: [
      { label: 'Byrd Polar Research Center, Ohio State University — official archive index' },
      { label: 'Eugene Rodgers — Beyond the Barrier (1990), Naval Institute Press' },
    ],
  },
  {
    id: 'wilkes-pyramid',
    heroImage: wilkes_pyramidImg,
    title: 'The "Antarctic Pyramid" Claim',
    subtitle: 'Wilkes Land peaks photographed 2013 onward',
    category: 'Anomaly',
    era: '2013–present',
    location: 'Ellsworth Mountains, Western Antarctica',
    confidence: 'DEBATED',
    symbol: '🔺',
    summary:
      'Satellite images of two pyramidal peaks in the Ellsworth Mountains have circulated since 2013 with claims they are artificial structures. Geologists identify them as classic glacial nunataks — peaks shaped by ice abrasion on four sides — but the visual symmetry is striking.',
    origin:
      "Photographs from researchers and Google Earth captures (notably one peak at 79°58'S 81°57'W) show near-perfect four-sided pyramidal forms. Fringe coverage attributes them to a buried Atlantean or Anunnaki civilization. Mainstream glaciology attributes the form to 'horn' or 'pyramidal-peak' erosion, identical in mechanism to the Matterhorn in the Alps.",
    keyEvents: [
      '2013: First viral images of "Antarctic Pyramid" hit social media.',
      '2016: Live Science article quotes glaciologists Eric Rignot and Mauri Pelto debunking artificial origin.',
      '2020+: New satellite passes (Sentinel-2) keep the story alive online.',
    ],
    evidence: [
      'Google Earth imagery at 79.978°S, 81.957°W.',
      'Pelto, M. — Mauri Pelto interview, Live Science (2016).',
    ],
    skepticalView:
      'Glaciologists are unanimous: these are erosional horns, naturally common in heavily glaciated mountain ranges. The same shape appears in the Alps and the Andes without anyone calling them artificial.',
    videos: [],
    sources: [
      { label: 'Live Science — "Are There Pyramids in Antarctica?" (2016)' },
    ],
  },
];

export const antarcticaCategories = ['All', 'Operation', 'Document', 'Site', 'Anomaly', 'Event', 'Casefile'];
