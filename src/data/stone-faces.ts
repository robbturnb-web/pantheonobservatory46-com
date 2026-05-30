import type { DossierEntry } from '@/components/dossier/types';
import gobekliImg from '@/assets/stone-gobekli-tepe.jpg';
import pumaImg from '@/assets/stone-puma-punku.jpg';
import easterImg from '@/assets/stone-easter-island.jpg';
import gunungImg from '@/assets/stone-gunung-padang.jpg';
import olmecImg from '@/assets/stone-olmec-heads.jpg';
import sphinxImg from '@/assets/stone-sphinx-erosion.jpg';
import yonaguniImg from '@/assets/stone-yonaguni.jpg';
import baalbekImg from '@/assets/stone-baalbek.jpg';
import karahanImg from '@/assets/stone-karahan-tepe.jpg';
import sacsayImg from '@/assets/stone-sacsayhuaman.jpg';

/**
 * Stone Faces — Field-archaeology dig site dossiers.
 * Megaliths, stone faces, lost markers — the structures that
 * shouldn't exist according to the conventional timeline.
 */
export const stoneFacesEntries: DossierEntry[] = [
  {
    id: 'gobekli-tepe',
    heroImage: gobekliImg,
    title: 'Göbekli Tepe',
    subtitle: 'Şanlıurfa, Turkey · ~9500 BCE',
    category: 'Temple',
    era: 'Pre-Pottery Neolithic A',
    location: 'Southeastern Anatolia',
    confidence: 'VERIFIED',
    symbol: '🗿',
    summary:
      'A 12,000-year-old temple complex of T-shaped megaliths up to 5.5m tall — built 6,000 years before Stonehenge, 7,000 years before the pyramids, and 5,000 years before pottery, agriculture, or writing. Its existence rewrote the timeline of civilization. The hunter-gatherers who built it then deliberately buried it around 8000 BCE.',
    origin:
      'Discovered in 1963 but dismissed as a medieval cemetery, Göbekli Tepe was re-investigated by German archaeologist Klaus Schmidt of the DAI in 1994. He immediately recognized the T-shaped pillars as Neolithic and began excavating. The site contains at least 20 circular enclosures (only 6 fully excavated as of 2024), each ringed by carved limestone pillars depicting foxes, lions, scorpions, vultures, and abstract human figures with stylized arms.\n\nThe site predates settled agriculture in the region by at least 1,000 years. Schmidt argued that "first the temple, then the city" — religion, not farming, may have driven humans to settle. Around 8000 BCE the entire complex was deliberately backfilled with rubble, preserving it. Pillar 43 ("the Vulture Stone") has been interpreted by Martin Sweatman (U. Edinburgh) as encoding the Younger Dryas comet impact event around 10,800 BCE.',
    keyEvents: [
      '~9500 BCE: Earliest construction phase (Layer III).',
      '~8000 BCE: Deliberate burial of the complex.',
      '1963: First archaeological survey (Istanbul U. + Chicago).',
      '1994: Klaus Schmidt begins major excavation.',
      '2018: UNESCO World Heritage inscription.',
      '2017: Sweatman/Tsikritsis "Vulture Stone" comet-impact paper.',
    ],
    evidence: [
      'C-14 dating of organic material in plaster: 9500-8000 BCE.',
      '~200 known T-pillars (only ~50 excavated).',
      'Animal-relief carvings of species not native to the region today.',
      'Karahan Tepe (12 km away) — even older sister site, excavated since 2019.',
    ],
    skepticalView:
      'Mainstream archaeologists (Schmidt himself included) interpret the site as ritual architecture by complex hunter-gatherer society — extraordinary, but not requiring lost civilizations or external help. The Vulture Stone comet hypothesis is contested.',
    videos: [
      { id: 'q-MqwBFV3sw', title: 'Göbekli Tepe — Smithsonian Documentary', channel: 'Smithsonian Channel' },
    ],
    sources: [
      { label: 'DAI — German Archaeological Institute', url: 'https://www.dainst.org/projekt/-/project-display/25953' },
      { label: 'Sweatman & Tsikritsis 2017 paper', url: 'https://maajournal.com/index.php/maa/article/view/335' },
    ],
  },
  {
    id: 'puma-punku',
    heroImage: pumaImg,
    title: 'Puma Punku',
    subtitle: 'Tiwanaku, Bolivia · ~500 CE (disputed)',
    category: 'Megalith',
    era: 'Tiwanaku III-IV — disputed older',
    location: 'Lake Titicaca basin, Bolivia',
    confidence: 'DEBATED',
    symbol: '⬛',
    summary:
      'Andesite blocks weighing up to 130 tonnes, cut with right angles, perfectly straight edges, and machine-precision recesses — at 13,000 ft (4,000m) altitude where no trees grow large enough for log-rolling. The H-blocks of Puma Punku interlock like cast concrete but are quarried from solid stone.',
    origin:
      'Puma Punku ("door of the puma") is one component of the larger Tiwanaku site, a pre-Inca civilization centered on the southern shore of Lake Titicaca. Mainstream radiocarbon dating places construction at ~500-600 CE. The blocks are a mix of andesite (transported ~90 km) and red sandstone (from ~10 km away), with the largest block weighing an estimated 131 tonnes.\n\nThe so-called "H-blocks" are the most striking — modular shapes with perfectly machined slots, drilled holes in straight lines, and precision so high that some surfaces are flat to within 0.5mm. Researchers including Arthur Posnansky proposed in the 1940s that the site is far older than mainstream dates suggest, possibly 15,000+ years, based on astronomical alignment changes. Mainstream Bolivian archaeology rejects this dating.',
    keyEvents: [
      '~500-600 CE: Mainstream dating of construction.',
      '~1000 CE: Tiwanaku civilization collapses.',
      '1549: Spanish chronicler Cieza de León records local belief that the stones were built "in a single night" by a vanished people.',
      '1945: Posnansky proposes 15,000 BCE date based on equinox alignment.',
      '2000: UNESCO World Heritage Site.',
    ],
    evidence: [
      'Modular H-blocks with interlocking joints.',
      'Drilled holes in perfectly straight lines (suggesting templated drilling).',
      'Andesite cuts smoother than the bronze-age tools available could produce.',
      'Surface erosion patterns that some geologists argue exceed 1,500 years.',
    ],
    skepticalView:
      'Experimental archaeology (Jean-Pierre Protzen, UC Berkeley) has shown Andean stone-working can achieve high precision with hammerstones and bronze tools given sufficient labor. Mainstream dating is consistent across multiple radiocarbon samples.',
    videos: [
      { id: 'GYU88ZAFJK4', title: 'Puma Punku — The Real Builders', channel: 'Brien Foerster' },
    ],
    sources: [
      { label: 'UNESCO Tiwanaku', url: 'https://whc.unesco.org/en/list/567/' },
    ],
  },
  {
    id: 'easter-island-moai',
    heroImage: easterImg,
    title: 'Rapa Nui Moai',
    subtitle: 'Easter Island · ~1100-1500 CE',
    category: 'Megalith',
    era: 'Late Polynesian',
    location: 'Easter Island (Rapa Nui)',
    confidence: 'VERIFIED',
    symbol: '🗿',
    summary:
      '887 monolithic statues quarried at Rano Raraku and transported up to 18 km across one of the most remote islands on Earth. Average 4m tall, 12.5 tonnes; the largest, "El Gigante", would have weighed 270 tonnes if erected. Many bear hidden bodies buried beneath the surface — only excavated since 2010.',
    origin:
      'The Rapa Nui people arrived on Easter Island around 1000-1200 CE. By 1500 CE they had carved and moved nearly 900 moai, organized into clan platforms (ahu) facing inland. The statues represent deified ancestors. Rapa Nui oral tradition holds that the moai "walked" to their platforms — a claim long dismissed as legend.\n\nIn 2012, archaeologists Carl Lipo and Terry Hunt demonstrated that a small team using three ropes could "walk" a full-scale 5-tonne moai replica down a road by rocking it side-to-side — vindicating the oral tradition. The 2010-2012 EISP excavations revealed that most moai have full bodies buried below the surface, with petroglyphs carved on their backs. The 887 statues represent perhaps 1-2 centuries of intense communal labor.',
    keyEvents: [
      '~1100-1200 CE: Polynesian settlement.',
      '~1250-1500 CE: Main moai-carving period.',
      '1722 (Easter Sunday): Jacob Roggeveen makes European contact.',
      '1860s: Peruvian slave raids and disease destroy the population.',
      '2012: Lipo & Hunt "walking moai" experimental archaeology.',
    ],
    evidence: [
      '887 catalogued moai (many still in the Rano Raraku quarry).',
      'EISP (Easter Island Statue Project) documentation.',
      'Lipo/Hunt experimental "walking" demonstration video.',
    ],
    skepticalView:
      'No mystery remains regarding construction or transport — Lipo & Hunt resolved the engineering question. The mystery is the cultural and ecological collapse of the society.',
    sources: [
      { label: 'Easter Island Statue Project', url: 'https://www.eisp.org/' },
    ],
  },
  {
    id: 'gunung-padang',
    heroImage: gunungImg,
    title: 'Gunung Padang',
    subtitle: 'West Java, Indonesia · disputed dating',
    category: 'Pyramid',
    era: 'Surface ~500 BCE; substructure disputed up to ~25,000 BCE',
    location: 'Cianjur, West Java',
    confidence: 'DEBATED',
    symbol: '⛰️',
    summary:
      'A terraced megalithic site that may sit atop a buried man-made pyramid up to 25,000 years old — which would make it the oldest pyramid on Earth. A 2023 paper in Archaeological Prospection by Danny Hilman Natawidjaja published these dates; international peer-review pushback led to the paper being retracted in March 2024.',
    origin:
      'Gunung Padang ("Mountain of Light") is a hill in West Java with five terraces of columnar basalt blocks — superficially similar to the basalt columns of the Devils Postpile or Giants Causeway, but stacked into walls and platforms. The surface megalithic site has been dated to ~500 BCE.\n\nGeologist Danny Hilman Natawidjaja led ground-penetrating radar, seismic tomography, and core drilling from 2011-2023. His 2023 paper claimed the hill is a man-made layered pyramid: surface "Unit 1" at ~3500 BCE, "Unit 3" at 7900-6100 BCE, and a "Unit 4" core at 25,000-14,000 BCE. The paper was published in Archaeological Prospection (Wiley) in October 2023, then retracted in March 2024 after expert reviewers argued the C-14 dates came from unworked natural soils, not human construction. Natawidjaja contests the retraction.',
    keyEvents: [
      '1914: First Dutch colonial report.',
      '1979: Site rediscovered by local farmers.',
      '2011-2014: First Natawidjaja-led geophysical surveys.',
      'Oct 2023: Archaeological Prospection paper publishes the 25,000-year dates.',
      'Mar 2024: Paper retracted by Wiley.',
    ],
    evidence: [
      'GPR and seismic profiles showing internal chambers.',
      'Core samples with C-14 organic material at depth.',
      'Surface megalithic terraces and processing platforms.',
    ],
    skepticalView:
      'The retraction was based on consensus that natural columnar basalt, when weathered, can mimic the visual appearance of stacked construction, and that the deep C-14 samples may date soil deposition rather than human building. The case is unresolved but currently sits outside mainstream consensus.',
    videos: [
      { id: '8U95qdOH9JI', title: 'Joe Rogan & Graham Hancock on Gunung Padang', channel: 'JRE Clips' },
    ],
    sources: [
      { label: 'Retracted Natawidjaja paper (Wiley)', url: 'https://onlinelibrary.wiley.com/doi/10.1002/arp.1912' },
    ],
  },
  {
    id: 'olmec-heads',
    heroImage: olmecImg,
    title: 'Olmec Colossal Heads',
    subtitle: 'Veracruz / Tabasco · ~1500-400 BCE',
    category: 'Statue',
    era: 'Pre-classic Mesoamerica',
    location: 'San Lorenzo, La Venta, Tres Zapotes',
    confidence: 'VERIFIED',
    symbol: '👤',
    summary:
      'Seventeen colossal basalt heads, the largest 3.4m tall and weighing 50 tonnes, depicting individuals with broad noses, full lips, and helmets — features that have been argued to display either West African or Asian phenotypic traits, fueling decades of debate about pre-Columbian transoceanic contact.',
    origin:
      'The Olmec civilization (~1500-400 BCE) is considered the "mother culture" of Mesoamerica, predating the Maya. The colossal heads were carved from single basalt boulders, quarried at the Sierra de los Tuxtlas mountains and transported up to 150 km — likely floated on rafts down rivers — to ceremonial centers at San Lorenzo, La Venta, and Tres Zapotes.\n\nEach head is unique, suggesting they portray specific rulers. Their facial features prompted Ivan Van Sertima\'s "They Came Before Columbus" (1976) to argue Africans had reached the Americas during the late Bronze Age. Most archaeologists reject the trans-Atlantic theory, attributing the features to natural Mesoamerican phenotypic variation. Genetic studies of modern Mesoamerican populations show no detectable pre-Columbian African admixture.',
    keyEvents: [
      '~1200 BCE: Earliest heads at San Lorenzo.',
      '1862: First head rediscovered by José María Melgar.',
      '1939: Matthew Stirling\'s major Smithsonian excavations.',
      '1976: Van Sertima publishes "They Came Before Columbus".',
    ],
    evidence: [
      '17 confirmed colossal heads.',
      'Basalt source petrography matching Sierra de los Tuxtlas.',
      'Olmec writing on the Cascajal Block (~900 BCE) — earliest in the Americas.',
    ],
    skepticalView:
      'The "African features" argument is rejected by mainstream anthropology — the heads display variation consistent with indigenous Mesoamerican populations, and no DNA, artifact, or pathogen evidence supports pre-Columbian African contact.',
    sources: [
      { label: 'Smithsonian Olmec collection', url: 'https://www.si.edu/spotlight/olmec' },
    ],
  },
  {
    id: 'sphinx-water-erosion',
    heroImage: sphinxImg,
    title: 'Great Sphinx — Water Erosion',
    subtitle: 'Giza Plateau · disputed dating',
    category: 'Megalith',
    era: 'Conventional ~2500 BCE; Schoch hypothesis ~9000 BCE',
    location: 'Giza, Egypt',
    confidence: 'DEBATED',
    symbol: '🦁',
    summary:
      'Boston University geologist Robert Schoch argued in 1991 that the deep vertical fissuring on the Sphinx enclosure walls was caused by sustained heavy rainfall — last common in Egypt around 9000 BCE, more than 6,000 years before the conventional date of construction by Pharaoh Khafre.',
    origin:
      'The Great Sphinx, conventionally attributed to Pharaoh Khafre (~2558-2532 BCE), shows weathering patterns on its enclosure walls that Schoch and Egyptologist John Anthony West argued cannot be explained by 4,500 years of wind-blown sand. The fissures are vertical, undulating, and rounded — characteristic of slow water dissolution rather than mechanical wind erosion (which produces horizontal striations).\n\nThe last sustained rainy period in the eastern Sahara was the African Humid Period, which ended around 5500 BCE. For sufficient water erosion, Schoch argued, the Sphinx must have been carved before 5000 BCE, perhaps as early as 9000 BCE — making it the work of a pre-dynastic civilization. Mainstream Egyptologist Mark Lehner and geologist James Harrell have countered that the erosion patterns are consistent with seasonal flash floods and percolating groundwater over the conventional timeline.',
    keyEvents: [
      '~2500 BCE: Conventional Khafre attribution.',
      '1991: Schoch presents water-erosion hypothesis at Geological Society of America.',
      '1992: Public debate at AAAS annual meeting (Schoch vs. Lehner).',
      '2008: Schoch publishes "Forgotten Civilization".',
    ],
    evidence: [
      'Vertical fissures up to 2m deep on enclosure walls.',
      'Differential weathering between Sphinx body (soft) and rump (harder layers).',
      'Comparison samples from confirmed Old Kingdom tombs.',
    ],
    skepticalView:
      'Mainstream Egyptology rejects the redating. James Harrell argues the fissures result from "exfoliation weathering" of the soft Member I limestone combined with ancient Nile flood splash and rare desert flash flooding — all compatible with 4,500 years of exposure.',
    videos: [
      { id: 'Q3rL94BC8LU', title: 'Robert Schoch — Sphinx Water Erosion', channel: 'Megalithomania' },
    ],
    sources: [
      { label: 'Schoch — RobertSchoch.com', url: 'https://www.robertschoch.com/' },
    ],
  },
  {
    id: 'yonaguni-monument',
    heroImage: yonaguniImg,
    title: 'Yonaguni Monument',
    subtitle: 'Ryukyu Islands, Japan · ~10,000 BCE if man-made',
    category: 'Submerged',
    era: 'Last submerged ~10,000 BCE',
    location: 'Off Yonaguni Jima, Japan',
    confidence: 'DEBATED',
    symbol: '🌊',
    summary:
      'A massive submerged stone formation off Yonaguni, Japan, with apparent terraces, right angles, and possible carved face. Discovered in 1986 by diver Kihachiro Aratake. If man-made, it was carved when sea levels were 40m lower — over 10,000 years ago, before the end of the last Ice Age.',
    origin:
      'Yonaguni is a small island at the western end of the Ryukyu archipelago. In 1986, dive guide Kihachiro Aratake discovered a 50m-wide stone structure 25m below the surface, with apparent stepped terraces, a 90-degree corner cut, and what some divers identified as a carved human face and animal forms. Marine geologist Masaaki Kimura of the University of the Ryukyus has spent over 25 years documenting the site, concluding it is partly man-made — possibly remnants of a Jomon-era ceremonial complex that flooded with Holocene sea-level rise.\n\nGeologist Robert Schoch has argued the formation is primarily natural (sandstone fractures along regular bedding planes) but may have been modified by humans. The site\'s implication — if even partially constructed — is that an organized civilization existed in East Asia 5,000+ years before mainstream archaeology recognizes settled society in the region.',
    keyEvents: [
      '~10,000 BCE: Site presumably dry land before Holocene sea-level rise.',
      '1986: Aratake discovers the formation.',
      '1992: Kimura begins systematic survey.',
      '2007: Schoch publishes natural-with-modifications assessment.',
    ],
    evidence: [
      'Stepped terrace structures with regular angles.',
      'Apparent carved channels and depressions.',
      'Possible "face" formation and animal-like reliefs.',
    ],
    skepticalView:
      'Mainstream geology (Patrick Nunn et al.) treats Yonaguni as a fully natural sandstone formation — the bedding planes of the local Yaeyama-group sandstone produce naturally rectilinear erosion, mimicking masonry. No worked tools or pottery have been found in association.',
    sources: [
      { label: 'Kimura research summary', url: 'http://www.morien-institute.org/yonaguni.html' },
    ],
  },
  {
    id: 'baalbek-trilithon',
    heroImage: baalbekImg,
    title: 'Baalbek Trilithon',
    subtitle: 'Bekaa Valley, Lebanon · Roman + pre-Roman',
    category: 'Megalith',
    era: 'Foundation pre-Roman; superstructure Roman',
    location: 'Baalbek, Lebanon',
    confidence: 'VERIFIED',
    symbol: '🏛️',
    summary:
      'Three limestone monoliths in the Roman temple foundation at Baalbek, each weighing approximately 800 tonnes — the largest worked stones ever moved by humans. Adjacent in the quarry sits the "Stone of the Pregnant Woman" at 1,000+ tonnes — and the recently-uncovered "Stone of the South" at 1,650 tonnes, the largest cut stone on Earth.',
    origin:
      'The temple complex at Baalbek (Roman Heliopolis) was built by Roman emperors from Augustus to Caracalla over the 1st-3rd centuries CE atop a much older platform. The Roman superstructure includes the Temple of Jupiter — the largest Roman temple ever built. But its foundation includes three monoliths of the "Trilithon" course, each 19m × 4m × 4m, weighing ~800 tonnes — moved roughly 800m from the limestone quarry up an incline to the temple platform.\n\nIn 2014, German archaeologists from DAI uncovered an even larger block in the quarry — provisionally named the "Stone of the South" — measuring 19.6m × 6m × 5.5m and weighing an estimated 1,650 tonnes. It is the largest cut stone in the world. How (and when) the Trilithon stones were moved remains debated. Roman engineering could lift heavy weights with capstans and treadwheel cranes (the largest documented Roman lift was ~100 tonnes). The 800-tonne Trilithon stones are an order of magnitude beyond.',
    keyEvents: [
      'Pre-Roman: Foundation platform construction (date disputed).',
      '~60 BCE – 1st c. CE: Roman temple construction begins.',
      '193-217 CE: Caracalla completes the Temple of Jupiter.',
      '2014: DAI uncovers the 1,650-tonne Stone of the South.',
    ],
    evidence: [
      'Three Trilithon stones in situ in temple foundation.',
      'Stone of the Pregnant Woman (~1,000 t) — partially extracted, still in quarry.',
      'Stone of the South (~1,650 t) — fully exposed since 2014.',
      'No Roman engineering manuals describing how 800+ tonne stones were moved.',
    ],
    skepticalView:
      'Engineer J.-P. Adam and others have argued Roman crews could move 800-tonne blocks using massed capstans, log rollers, and earth ramps over months. The lack of documentation may simply reflect lost engineering treatises from the period.',
    sources: [
      { label: 'DAI Baalbek project', url: 'https://www.dainst.org/projekt/-/project-display/25920' },
    ],
  },
  {
    id: 'gobeklitepe-karahan',
    heroImage: karahanImg,
    title: 'Karahan Tepe',
    subtitle: 'Şanlıurfa, Turkey · ~9000-7000 BCE',
    category: 'Temple',
    era: 'Pre-Pottery Neolithic',
    location: 'Southeastern Anatolia',
    confidence: 'VERIFIED',
    symbol: '🗿',
    summary:
      'The "sister site" to Göbekli Tepe, 35 km to the east. Excavated since 2019, it features 11 carved-from-bedrock pillars in a single chamber and a haunting carved human head emerging from a wall. May rival or exceed Göbekli Tepe in age and is part of a wider "Taş Tepeler" complex of 12 newly-mapped Neolithic sites.',
    origin:
      'Karahan Tepe was first surveyed in 1997 but only began major excavation under Turkish archaeologist Necmi Karul in 2019. A central chamber, carved directly into bedrock, contains 11 phallic pillars rising from the floor, with a single carved human head protruding from the wall — likely depicting a deceased ancestor or deity. The site appears to date to roughly the same era as Göbekli Tepe (9500-7500 BCE).\n\nThe Turkish "Taş Tepeler" ("Stone Hills") project has mapped 12 related Neolithic sites across the region. Together they suggest the Şanlıurfa plain was a "cradle of cult architecture" 12,000 years ago, with hunter-gatherer communities of unprecedented organizational complexity. As of 2024 only a fraction of any of these sites has been excavated.',
    keyEvents: [
      '~9000-7000 BCE: Active period.',
      '1997: First survey by Bahattin Çelik.',
      '2019: Karul begins major excavation.',
      '2021: Carved human head publicly revealed.',
      '2021-present: Taş Tepeler project surveys 12 related sites.',
    ],
    evidence: [
      '11 in-situ rock-carved pillars in the main chamber.',
      'Carved human head emerging from wall.',
      'Stone tools and animal bones from PPN strata.',
    ],
    skepticalView:
      'Like Göbekli Tepe, Karahan Tepe sits comfortably within mainstream understanding of Pre-Pottery Neolithic capabilities — extraordinary for the era, but not requiring lost civilizations.',
    sources: [
      { label: 'Taş Tepeler Project (Türkiye)', url: 'https://www.tastepeler.org/en' },
    ],
  },
  {
    id: 'sacsayhuaman',
    heroImage: sacsayImg,
    title: 'Sacsayhuamán',
    subtitle: 'Cusco, Peru · ~1100-1500 CE',
    category: 'Megalith',
    era: 'Killke / Inca',
    location: 'Cusco, Peru',
    confidence: 'VERIFIED',
    symbol: '🧱',
    summary:
      'Cyclopean Inca walls built from limestone blocks weighing up to 200 tonnes, fitted together so precisely that a knife blade cannot be inserted between them. The blocks are irregular polygons with up to 12 angles each, perfectly mating to neighbors above, below, and on either side — a building method with no known parallel.',
    origin:
      'Sacsayhuamán sits on a hill above Cusco, the Inca capital. Construction began under the Killke culture (~1100 CE) and continued under the Inca emperors until Spanish conquest. The walls form a zigzag pattern interpreted as the head of a puma (Cusco itself was laid out as the puma\'s body). The largest block weighs an estimated 200 tonnes.\n\nWhat distinguishes Sacsayhuamán from any other megalithic site is the polygonal jointing — each stone is cut to a unique irregular shape that fits its neighbors with submillimeter precision, including in three dimensions. Spanish chronicler Garcilaso de la Vega in 1609 wrote that even the conquistadors could not understand how the walls were built. Mainstream Andean archaeology (Jean-Pierre Protzen) argues the blocks were progressively shaped through repeated trial-fitting using hammerstones — a labor-intensive but achievable technique.',
    keyEvents: [
      '~1100 CE: Killke construction begins.',
      '~1440-1490 CE: Pachacuti expands the complex.',
      '1533 CE: Spanish conquest.',
      '1536 CE: Battle of Sacsayhuamán during Manco Inca\'s rebellion.',
      '1983: UNESCO World Heritage Site (with Cusco).',
    ],
    evidence: [
      'Polygonal walls with up to 12-angle joints.',
      'Three terraces totaling 360m in length.',
      'Original Inca quarry sites identified at Rumiqolqa and Waqoto.',
    ],
    skepticalView:
      'Protzen\'s experimental archaeology demonstrates the technique is achievable with bronze and stone tools given enough labor — though the skill required is exceptional.',
    sources: [
      { label: 'UNESCO Cusco', url: 'https://whc.unesco.org/en/list/273/' },
    ],
  },
];

export const stoneFacesCategories = [
  'All',
  'Temple',
  'Megalith',
  'Pyramid',
  'Statue',
  'Submerged',
];
