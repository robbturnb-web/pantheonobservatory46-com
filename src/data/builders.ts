import type { DossierEntry } from '@/components/dossier/types';

/**
 * Builder's Arena — Architect's drafting board
 * Megalith engineering case files. Each entry weighs the mainstream
 * archaeological consensus against open engineering questions.
 */
export const builderEntries: DossierEntry[] = [
  {
    id: 'great-pyramid',
    title: 'Great Pyramid of Giza',
    subtitle: 'Khufu · 4th Dynasty · ~2560 BCE',
    category: 'Pyramid',
    era: 'c. 2580–2560 BCE',
    location: 'Giza Plateau, Egypt',
    confidence: 'VERIFIED',
    symbol: '🔺',
    summary:
      "2.3 million blocks, average 2.5 tons, granite king's chamber stones up to 80 tons hauled from Aswan 800 km away. Cardinally aligned to within 1/15th of a degree. Until the 1300s CE it was the tallest structure on Earth, holding the record for ~3,800 years.",
    origin:
      "Built as the tomb of Pharaoh Khufu (Cheops). Mark Lehner and Zahi Hawass's decades of excavation at the worker village south of the plateau established a workforce of ~20,000 skilled laborers (not slaves) operating in seasonal rotations. The Diary of Merer (Wadi al-Jarf papyri, 2013) provided contemporaneous logbook entries describing the transport of Tura limestone casing blocks via Nile-fed canal to the Giza harbor.\n\nWhat remains genuinely open: the precision tolerances. Petrie's 1880s survey measured the base sides as 230.25–230.45 m with corner-angle errors under 12 arc-seconds. The casing-stone joints fit within 0.5 mm. Modern engineers (Christopher Dunn, Glenn Dash) argue this precision implies surveying and stone-shaping techniques more advanced than the consensus tool kit (copper chisels, dolerite pounders).",
    keyEvents: [
      'c. 2580 BCE: Construction begins.',
      '~2560 BCE: Capstone set (estimated).',
      '820 CE: Caliph Al-Ma\'mun forces an entry tunnel.',
      '1880s: Petrie survey establishes modern measurement baseline.',
      '2013: Wadi al-Jarf papyri (Diary of Merer) discovered.',
      '2017: ScanPyramids muon tomography reveals "Big Void".',
    ],
    evidence: [
      'Diary of Merer (Wadi al-Jarf papyri) — logistics log.',
      'Worker village excavation (Lehner, Hawass).',
      'Petrie survey datasets (still cited).',
      'ScanPyramids muon tomography (2015–2023).',
    ],
    skepticalView:
      "Mainstream Egyptology holds that ramp systems (likely a combination of long straight ramps and zig-zag interior ramps, per Houdin's hypothesis) plus copper tools and abundant labor adequately explain construction. The Wadi al-Jarf papyri are the strongest documentary evidence for the orthodox account.",
    videos: [
      { id: 'Wm-YIPB2RVU', title: 'The Great Pyramid Mystery — Smithsonian Channel', channel: 'Smithsonian' },
      { id: 'I7xHRPxR2Ns', title: 'ScanPyramids Big Void Discovery', channel: 'Nature' },
      { id: 'eyW0duuQqDs', title: 'How the Pyramids Were Built — UnchartedX', channel: 'UnchartedX' },
    ],
    sources: [
      { label: 'AERA — Ancient Egypt Research Associates (Lehner)', url: 'https://www.aeraweb.org/' },
      { label: 'ScanPyramids muon tomography (Nature 2017)', url: 'https://www.nature.com/articles/nature24647' },
    ],
  },
  {
    id: 'puma-punku',
    title: 'Puma Punku',
    subtitle: 'Tiwanaku Culture · Bolivia · ~536 CE',
    category: 'Megalith',
    era: 'c. 500–600 CE',
    location: 'Tiwanaku, Bolivia (3,850 m elevation)',
    confidence: 'VERIFIED',
    symbol: '⚙️',
    summary:
      "Andesite and red sandstone blocks shaped to interlocking tolerances normally associated with machine tooling. The H-blocks of Puma Punku exhibit straight cuts, drilled hole patterns, and 90° internal angles that have prompted serious engineering debate about the available toolset of the Tiwanaku culture.",
    origin:
      "Puma Punku is part of the Tiwanaku archaeological complex on the southern shore of Lake Titicaca. The site was a ceremonial platform; the largest single block (the Plataforma Líticá) weighs an estimated 130 tons and was transported from a quarry ~10 km away across a flat plain that includes a former lakeshore. Most blocks are red sandstone; the precision-cut H-blocks are andesite (Mohs hardness 6).\n\nThe consensus dating is c. 500-600 CE based on radiocarbon and ceramic stratigraphy (Alan Kolata, Pittsburgh team). Some alternative researchers (Posnansky early-1900s) proposed dates as early as 15,000 BCE based on an archaeoastronomical alignment argument. That early date is rejected by mainstream archaeology. The genuinely open engineering question is the andesite tooling: surface flatness measured under 0.5 mm variance, internal corners cut to ~90°, and consistent drilled-hole spacing along block edges.",
    keyEvents: [
      'c. 500 CE: Construction begins.',
      'c. 1000 CE: Tiwanaku state collapses.',
      '1903–1945: Posnansky surveys; proposes ancient date.',
      '1980s–present: Kolata-led Pittsburgh project establishes modern stratigraphy.',
    ],
    evidence: [
      'H-block geometry — measurable in situ.',
      'Andesite quarry sourcing (geochemistry, Ponce 1971).',
      'Diorite and tumbaga-bronze tool finds at site.',
    ],
    skepticalView:
      "Mainstream archaeology argues Tiwanaku used hammerstones and wet-sand abrasion to achieve the precision, augmented by bronze chisels and the natural fracture properties of andesite. The H-blocks were prefabricated by skilled stone masons working in standardized molds.",
    videos: [
      { id: 'sJYGS75qy_g', title: 'Puma Punku — Brien Foerster Field Survey', channel: 'Brien Foerster' },
      { id: 'P1OcGwQsCnI', title: 'Tiwanaku & Puma Punku — World of Antiquity', channel: 'World of Antiquity' },
    ],
    sources: [
      { label: 'Alan Kolata — "The Tiwanaku" (1993)', url: 'https://www.wiley.com/' },
      { label: 'UNESCO Tiwanaku World Heritage', url: 'https://whc.unesco.org/en/list/567/' },
    ],
  },
  {
    id: 'sacsayhuaman',
    title: 'Sacsayhuamán',
    subtitle: 'Inca · Cusco · 15th century CE',
    category: 'Megalith',
    era: 'c. 1440–1500 CE',
    location: 'Cusco, Peru',
    confidence: 'VERIFIED',
    symbol: '🧱',
    summary:
      "Polygonal megalithic walls of irregular limestone and andesite blocks fitted together without mortar, with joints so tight that a credit card cannot be inserted. The largest block weighs an estimated 200+ tons. Three terraced walls form a zigzag designed to mirror the head of a puma — Cusco's sacred animal.",
    origin:
      "Sacsayhuamán sits above Cusco at 3,701 m. Inca chronicler Garcilaso de la Vega (1609) records construction as a 50-year, 20,000-worker project under emperors Pachacuti and Túpac Inca Yupanqui. Garcilaso also describes a worker crushed under one of the megaliths during transport — a rare documented construction casualty.\n\nThe surviving lower walls feature blocks of 50–200 tons. The polygonal jointing (some blocks have 12+ corners precisely matched to neighbors) is the principal engineering puzzle. Jean-Pierre Protzen's 1985 experimental archaeology demonstrated that hammerstone shaping plus iterative trial-fitting can produce the joints, given sufficient labor time. The remaining open question is the transport of the largest blocks across uneven terrain from quarries up to 35 km away (Rumiqolqa, andesite).",
    keyEvents: [
      'c. 1440: Construction begins under Pachacuti.',
      '1533: Spanish conquest; site partially dismantled for Cusco churches.',
      '1609: Garcilaso de la Vega chronicles construction.',
      '1985: Protzen experimental archaeology.',
    ],
    evidence: [
      'Garcilaso de la Vega chronicle (1609).',
      'Protzen experimental fitting (1985).',
      'Quarry sourcing studies (Rumiqolqa, Saqsaywaman).',
    ],
    skepticalView:
      "Mainstream archaeology accepts Garcilaso's construction account and Protzen's experimental reconstruction. The open question is logistical (transport, timing) rather than tool-based.",
    videos: [
      { id: 'oVm0Ld0kJQg', title: 'Sacsayhuamán — Megalithic Marvel', channel: 'Brien Foerster' },
      { id: 'ETLQKNg2QcU', title: 'Inca Stone Cutting Methods Explained', channel: 'World of Antiquity' },
    ],
    sources: [
      { label: 'Jean-Pierre Protzen — Inca Architecture (Oxford)', url: 'https://global.oup.com/' },
      { label: 'UNESCO — City of Cusco', url: 'https://whc.unesco.org/en/list/273/' },
    ],
  },
  {
    id: 'baalbek',
    title: 'Baalbek Trilithon',
    subtitle: 'Roman / pre-Roman · Lebanon',
    category: 'Megalith',
    era: 'Roman period (foundation may predate)',
    location: 'Baalbek, Beqaa Valley, Lebanon',
    confidence: 'VERIFIED',
    symbol: '⛓️',
    summary:
      "The Trilithon — three foundation blocks under the Temple of Jupiter, each weighing 800–1000 tons. A fourth, even larger block (the Stone of the Pregnant Woman, ~1,200 tons) lies abandoned in the nearby quarry. Among the largest cut and transported stones in human history.",
    origin:
      "Baalbek (Roman 'Heliopolis') hosts the Temple of Jupiter complex, completed c. 60 CE. The Trilithon — three stones each ~21 m long and weighing approximately 800 tons — sits as foundation course beneath the temple. They were cut from a quarry roughly 1 km away, lifted ~7 m, and set into a wall.\n\nIn 2014, German archaeological team excavating the quarry uncovered an additional, larger megalith — initially estimated at 1,650 tons, since revised closer to 1,200. The transport mechanics remain genuinely contested. Mainstream Roman engineering studies (Adam, DeLaine) argue purpose-built rolling cradles and dedicated capstans plus thousands of laborers are sufficient. Alternative researchers note that the foundation may pre-date the Roman temple — possibly originating from a much earlier Phoenician or older sanctuary.",
    keyEvents: [
      'Pre-Roman: Possible older foundation date (disputed).',
      'c. 60 CE: Temple of Jupiter completed atop Trilithon.',
      '2014: German team uncovers fourth megalith in quarry.',
    ],
    evidence: [
      'In-situ Trilithon stones (measurable).',
      'Quarry stone (the "Pregnant Woman") with cut marks.',
      'Roman engineering treatises (Vitruvius).',
    ],
    skepticalView:
      "Mainstream Roman archaeology accepts the stones as Roman-period and credits Roman engineering capacity (capstans, rolling cradles, organized labor) with their transport. The pre-Roman foundation hypothesis remains a minority position.",
    videos: [
      { id: 'GccCfsjs6PE', title: 'Baalbek — The Mystery of the Trilithon', channel: 'Ancient Architects' },
      { id: 'CW4PwuG1Qz0', title: 'How Romans Moved the Baalbek Stones', channel: 'World of Antiquity' },
    ],
    sources: [
      { label: 'German Archaeological Institute — Baalbek', url: 'https://www.dainst.org/projekt/-/project-display/25963' },
    ],
  },
  {
    id: 'stonehenge',
    title: 'Stonehenge',
    subtitle: 'Wiltshire · ~3000–2000 BCE',
    category: 'Megalith',
    era: 'c. 3000–2000 BCE (multiple phases)',
    location: 'Salisbury Plain, England',
    confidence: 'VERIFIED',
    symbol: '🪨',
    summary:
      "Built across three main phases over a millennium. The 25-ton sarsen trilithons came from West Woods 25 km north (confirmed by 2020 isotope study). The 2-5 ton bluestones came from the Preseli Hills in Wales — 240 km away — by a route still actively debated.",
    origin:
      "Construction began c. 3000 BCE with a circular ditch and bank (the original 'henge'). The bluestones arrived c. 2500 BCE; the iconic sarsen trilithons were raised c. 2400 BCE. The 2020 work led by David Nash (University of Brighton) used X-ray fluorescence on a sarsen core sample to definitively trace the large stones to West Woods, Wiltshire. Bluestone provenance was confirmed by Richard Bevins to the Preseli Hills outcrops at Carn Goedog and Craig Rhos-y-felin.\n\nThe transport mechanics of the bluestones — 240 km from Pembrokeshire — remain the principal puzzle. Two mainstream hypotheses: (1) human-led overland transport via wooden sledges, possibly with intermediate water/raft segments along the Bristol Channel and Avon, or (2) glacial transport during the Pleistocene leaving the stones near Salisbury Plain by chance. The 2021 discovery at Waun Mawn (Pembrokeshire) of a dismantled stone circle whose stone-holes match Stonehenge bluestone footprints supports human transport from a pre-existing Welsh monument.",
    keyEvents: [
      'c. 3000 BCE: Henge ditch and Aubrey Holes.',
      'c. 2500 BCE: Bluestones erected.',
      'c. 2400 BCE: Sarsen trilithons raised.',
      '2020: Nash sarsen-source study (West Woods confirmed).',
      '2021: Waun Mawn stone-circle match published.',
    ],
    evidence: [
      'Nash 2020 sarsen XRF (Science Advances).',
      'Bevins bluestone petrology (multiple papers).',
      'Waun Mawn excavation (Antiquity 2021).',
      'Aubrey Burl, "A Brief History of Stonehenge" (2007).',
    ],
    skepticalView:
      "Mainstream archaeology accepts human transport of all stones using sledges, log rollers, and possibly water routes. The Waun Mawn finding strengthens the case for deliberate, planned transport from Wales.",
    videos: [
      { id: '4M3KhX5HJvI', title: 'Stonehenge: Decoded — Smithsonian', channel: 'Smithsonian' },
      { id: 'MiAd4Ks80sY', title: 'Where Stonehenge\'s Stones Came From — Science', channel: 'Science Magazine' },
    ],
    sources: [
      { label: 'Nash et al. 2020 — Science Advances', url: 'https://www.science.org/doi/10.1126/sciadv.abc0133' },
      { label: 'English Heritage — Stonehenge', url: 'https://www.english-heritage.org.uk/visit/places/stonehenge/' },
    ],
  },
  {
    id: 'gobekli-tepe',
    title: 'Göbekli Tepe',
    subtitle: 'Pre-Pottery Neolithic · ~9500 BCE',
    category: 'Pre-Neolithic',
    era: 'c. 9500–8000 BCE',
    location: 'Şanlıurfa, southeastern Turkey',
    confidence: 'VERIFIED',
    symbol: '𓂀',
    summary:
      "The world's oldest known monumental architecture. T-shaped limestone pillars up to 5.5 m tall and 16 tons, arranged in circles, carved with bas-relief animals — built ~7,000 years before Stonehenge by hunter-gatherer societies that had no agriculture, pottery, or metal. Then deliberately buried.",
    origin:
      "Discovered by Klaus Schmidt of the German Archaeological Institute in 1994, after the site had been catalogued as a medieval cemetery in a 1963 survey. Schmidt led excavation until his death in 2014; work continues under Necmi Karul. Twenty enclosures have been identified by ground-penetrating radar; only six are partially excavated. The pillars are limestone quarried from nearby outcrops; many bear high-relief carvings of foxes, snakes, scorpions, vultures, boars, and abstract pictograms.\n\nWhat makes Göbekli Tepe revolutionary: the radiocarbon dating (organic material in the fill) places construction at 9500 BCE — roughly 7,000 years before the pyramids and 6,500 before Stonehenge. This is older than agriculture, pottery, and the wheel. The site's deliberate burial around 8000 BCE is itself an open question: why expend the labor to entomb the entire complex? Karahan Tepe and other 'Taş Tepeler' sites being excavated nearby suggest a regional pre-agricultural megalithic culture.",
    keyEvents: [
      '1963: Original survey misidentifies site.',
      '1994: Schmidt revisits and recognizes pillars.',
      '1995–2014: Schmidt excavation.',
      '~8000 BCE: Site deliberately buried (ancient).',
      '2018: UNESCO World Heritage inscription.',
      '2021: Karahan Tepe excavation expands.',
    ],
    evidence: [
      'Radiocarbon dating of fill (multiple labs).',
      'In situ T-pillars and carved bas-reliefs.',
      'Twenty enclosures GPR-mapped.',
      'Karahan Tepe parallel finds.',
    ],
    skepticalView:
      "Göbekli Tepe is fully accepted by mainstream archaeology — the dating is solid and the site is now a UNESCO World Heritage cornerstone. The 'mystery' is anthropological (how did pre-agricultural societies organize this labor?) rather than constructional.",
    videos: [
      { id: 'xqUnPS5cAB8', title: 'Göbekli Tepe — World\'s First Temple', channel: 'Smithsonian' },
      { id: 'HnRTkjOfymE', title: 'Göbekli Tepe & Karahan Tepe Update', channel: 'Ancient Architects' },
    ],
    sources: [
      { label: 'DAI — Göbekli Tepe project', url: 'https://www.dainst.org/projekt/-/project-display/25852' },
      { label: 'UNESCO Göbekli Tepe', url: 'https://whc.unesco.org/en/list/1572/' },
    ],
  },
  {
    id: 'nan-madol',
    title: 'Nan Madol',
    subtitle: 'Saudeleur Dynasty · Pohnpei',
    category: 'Megalith',
    era: 'c. 1200–1500 CE',
    location: 'Pohnpei, Federated States of Micronesia',
    confidence: 'VERIFIED',
    symbol: '🏝️',
    summary:
      "A city of 92 artificial islets built in a lagoon, constructed from columnar basalt logs stacked in interlocking patterns. The basalt was quarried on the opposite side of Pohnpei and somehow transported to the lagoon — total mass estimated at 750,000 tons.",
    origin:
      "Nan Madol means 'spaces between' in Pohnpeian. The city was the ceremonial and political seat of the Saudeleur Dynasty, the unifying power on Pohnpei from ~1100 to ~1628 CE. The 92 islets are constructed of prismatic basalt columns — naturally occurring 4-to-8-sided basalt 'logs' formed by columnar jointing in volcanic flows. The columns were quarried on the opposite (northern/western) coasts of Pohnpei, transported to the southeastern lagoon, and stacked log-cabin style atop coral fill.\n\nThe largest construction is Nandauwas, the royal mortuary, with walls 7.5 m high and individual columns weighing up to 50 tons. The total mass of stacked basalt is estimated at 750,000 tons. Pohnpeian oral tradition credits two brothers, Olisihpa and Olosohpa, with summoning the stones to fly into place via magic — a legend that, stripped of supernatural framing, may encode the engineering puzzle that the modern excavators (Rufino Mauricio, James Liston) still discuss: the transport mechanism for water-route delivery is plausible but unsupported by surviving rafting evidence.",
    keyEvents: [
      'c. 200 CE: First small constructions.',
      'c. 1200 CE: Major Saudeleur expansion.',
      '~1628 CE: Saudeleur defeated by Isokelekel; Nan Madol abandoned.',
      '2016: UNESCO World Heritage inscription.',
    ],
    evidence: [
      'In situ basalt construction (visible, mappable).',
      'Pohnpeian oral tradition (Saudeleur chronology).',
      'Mauricio / Liston excavation reports.',
    ],
    skepticalView:
      "Mainstream archaeology accepts log-rafting plus organized labor as the transport explanation. The political and labor organization of the Saudeleur Dynasty is the more intriguing question.",
    videos: [
      { id: '0EYzYI9oMa8', title: 'Nan Madol — Pacific Venice', channel: 'Smithsonian' },
    ],
    sources: [
      { label: 'UNESCO — Nan Madol', url: 'https://whc.unesco.org/en/list/1503/' },
    ],
  },
  {
    id: 'yonaguni',
    title: 'Yonaguni Monument',
    subtitle: 'Submerged formation · Ryukyu Islands',
    category: 'Disputed',
    era: 'Pleistocene exposure (>10,000 BCE) — disputed origin',
    location: 'Off Yonaguni Island, Japan',
    confidence: 'DEBATED',
    symbol: '🌊',
    summary:
      "A submerged sandstone formation off the southern coast of Yonaguni, discovered by diver Kihachiro Aratake in 1986. Features include flat terraces, right angles, and what appear to be carved channels. Two camps: Masaaki Kimura (geology/marine science, Ryukyus) argues partial human modification; Robert Schoch (Boston University) argues fully natural.",
    origin:
      "The 'monument' lies under 25 m of water about 100 m off Yonaguni's southern coast. It is a single mass of Lower Miocene sandstone (~20 million years old) that, geologically, has been exposed to atmosphere as recently as the last glacial maximum (~10,000 BCE) when sea levels were ~100 m lower.\n\nMasaaki Kimura, professor emeritus of marine geology at Ryukyus University, has been the principal proponent of partial human modification. He identifies what he interprets as carved channels, drilled holes, and a 'turtle' relief. Robert Schoch, the geologist who famously revised the dating of the Sphinx, examined the formation in 1997 and concluded it is fully natural — the result of differential erosion along bedding planes and joint sets typical of layered sandstones. The debate has not been resolved by additional fieldwork; both positions have published peer-reviewed material.",
    keyEvents: [
      '1986: Aratake discovers the formation.',
      '1990s: Kimura survey work.',
      '1997: Schoch dives and publishes natural-formation argument.',
      '2000s–present: Continued recreational and scientific dives.',
    ],
    evidence: [
      'Underwater photography and lidar/sonar bathymetry.',
      'Kimura published reconstructions.',
      'Schoch geological analysis.',
    ],
    skepticalView:
      "Most marine geologists accept Schoch's natural-formation explanation. The flat surfaces, right angles, and channels are consistent with sandstone bedding, joint planes, and differential erosion. Human modification is not necessary to explain any of the observed features.",
    videos: [
      { id: 'SyfAwHUfdGc', title: 'Yonaguni Monument — Japan\'s Underwater Mystery', channel: 'Bright Insight' },
      { id: 'ROlc-vDVd2s', title: 'Robert Schoch on Yonaguni', channel: 'Robert Schoch' },
    ],
    sources: [
      { label: 'Robert Schoch — Yonaguni article', url: 'https://www.robertschoch.com/yonaguni.html' },
    ],
  },
  {
    id: 'coral-castle',
    title: 'Coral Castle',
    subtitle: 'Ed Leedskalnin · Florida · 1923–1951',
    category: 'Modern Megalith',
    era: '1923–1951',
    location: 'Homestead, Florida',
    confidence: 'VERIFIED',
    symbol: '💎',
    summary:
      "1,100 tons of oolite limestone shaped, transported, and erected by a single man — Edward Leedskalnin — over 28 years. He worked alone, at night, with no power tools, no helpers, and no documented technique. The 9-ton revolving gate balanced on a steel rod is the icon.",
    origin:
      "Latvian-born Edward Leedskalnin (1887–1951) emigrated to the United States after a broken engagement with Agnes Skuvst (whom he called his 'Sweet Sixteen'). He built the original structure in Florida City beginning in 1923. In 1936, after a developer announced plans to build nearby, Leedskalnin moved the entire structure 16 km to its current Homestead location — an effort that took three years and is itself unexplained, given he hired only a truck and refused all observers.\n\nLeedskalnin worked at night, with curtains. When neighborhood children peeked, he reportedly hid until they left. He published two short pamphlets, 'A Book in Every Home' (1936) and 'Magnetic Current' (1945), which describe a personal theory of magnetism and electricity but give no construction details. He claimed to know 'the secret of the pyramids'. He died in 1951 of malnutrition and stomach cancer at 64; no notes describing his technique have ever been found. The 9-ton gate, carved with a 1/8-inch tolerance to its pivot, turned with a finger-touch until 1986 when its bearing failed; the engineering required to reseat it took a crew with cranes.",
    keyEvents: [
      '1923: Construction begins in Florida City.',
      '1936–39: Leedskalnin moves structure to Homestead.',
      '1951: Leedskalnin dies; technique secrets lost.',
      '1986: Original gate bearing fails; crew required to reseat.',
    ],
    evidence: [
      'The structure itself (publicly visitable).',
      'Leedskalnin\'s 1936/1945 pamphlets.',
      'Mover Orval Irwin\'s deathbed account of seeing pulley/jack rigs.',
    ],
    skepticalView:
      "Engineer accounts (Orval Irwin, Joe Bullard) describe Leedskalnin using simple but ingenious block-and-tackle, A-frame tripods, and chain hoists scavenged from auto wreckers. The 'mystery' is psychological (why secrecy?) rather than physical — patient solo labor with simple machines is sufficient. Coral Castle is a triumph of obsessive solitary craftsmanship rather than lost technology.",
    videos: [
      { id: 'AonLkoWJJxM', title: 'Coral Castle — One Man\'s Megalith', channel: 'Smithsonian' },
      { id: 'EfqjN4YbCMo', title: 'How Did Ed Leedskalnin Do It?', channel: 'Bright Insight' },
    ],
    sources: [
      { label: 'Coral Castle Museum', url: 'https://coralcastle.com/' },
    ],
  },
  {
    id: 'ollantaytambo',
    title: 'Ollantaytambo / Saksaywaman',
    subtitle: 'Inca · Sacred Valley · 15th century',
    category: 'Megalith',
    era: 'c. 1450–1500 CE',
    location: 'Sacred Valley, Peru',
    confidence: 'VERIFIED',
    symbol: '🗻',
    summary:
      "Six monolithic rose-granite slabs, each ~50 tons, set as the Sun Temple wall — quarried 6 km away on the opposite side of the Urubamba River and 900 m higher up the mountain. The transport route required descending the quarry mountain, crossing the river, ascending Ollantaytambo's terraced hill, and lifting blocks to the temple platform.",
    origin:
      "Ollantaytambo was the royal estate of Inca emperor Pachacuti, built in the mid-15th century as a ceremonial center, agricultural terrace complex, and military fortress. The Sun Temple wall on the upper terrace consists of six dressed rose-granite monoliths, each 4 m tall and weighing roughly 50 tons. They are separated by thinner spacer stones.\n\nThe quarry — Kachiqhata — sits across the Urubamba River, 6 km away as the crow flies and 900 m higher in elevation. Mainstream Andean archaeology (Jean-Pierre Protzen, Vince Lee) reconstructs the transport as: (1) blocks roughed-out at quarry, (2) lowered down a stone ramp toward the river using ropes and a counterweight system, (3) river diverted around blocks during dry season, (4) hauled up to the site via a long earthen ramp (still partially visible). The construction was incomplete when Pizarro arrived in 1533; abandoned blocks lie along the entire transport route, providing rare insight into the work-in-progress logistics.",
    keyEvents: [
      'c. 1460 CE: Construction begins under Pachacuti.',
      '1533: Spanish arrival; site partially complete; abandoned.',
      '1536: Manco Inca defeats Spanish in battle here.',
      '1980s–present: Protzen and Lee field reconstructions.',
    ],
    evidence: [
      'Abandoned blocks along quarry-to-site route (in situ).',
      'Earthen transport ramp (partially preserved).',
      'Vince Lee experimental archaeology (1990s).',
      'Spanish chronicler accounts (Cieza de León, 1553).',
    ],
    skepticalView:
      "Mainstream archaeology has produced a defensible end-to-end reconstruction of the transport: ramps, ropes, counterweights, river diversion, and organized labor. The remaining open questions are scheduling and crew size, not whether the technique was possible.",
    videos: [
      { id: 'L4nLxvNkmoQ', title: 'Ollantaytambo — Inca Engineering', channel: 'UnchartedX' },
      { id: 'fRZK-rrZPow', title: 'How the Inca Moved 50-Ton Stones', channel: 'Vince Lee Lecture' },
    ],
    sources: [
      { label: 'Vince Lee — Inca Engineering field studies', url: 'https://www.vincelee.com/' },
      { label: 'UNESCO — Sacred Valley', url: 'https://whc.unesco.org/en/list/274/' },
    ],
  },
];

export const builderCategories = ['All', 'Pyramid', 'Megalith', 'Pre-Neolithic', 'Disputed', 'Modern Megalith'];
