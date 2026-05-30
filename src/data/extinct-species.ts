import type { DossierEntry } from '@/components/dossier/types';

// ── Hero image imports ──────────────────────────────────────
import gigantopithecusImg from '@/assets/extinct/gigantopithecus.jpg';
import floresiensisImg from '@/assets/extinct/homo-floresiensis.jpg';
import denisovansImg from '@/assets/extinct/denisovans.jpg';
import thylacineImg from '@/assets/extinct/thylacine.jpg';
import haastsEagleImg from '@/assets/extinct/haasts-eagle.jpg';
import megalodonImg from '@/assets/extinct/megalodon.jpg';
import dyatlovImg from '@/assets/extinct/dyatlov-cryptid.jpg';
import mokeleImg from '@/assets/extinct/mokele-mbembe.jpg';
// Asia
import yerenImg from '@/assets/extinct/yeren.jpg';
import almasImg from '@/assets/extinct/almas.jpg';
import deathWormImg from '@/assets/extinct/mongolian-death-worm.jpg';
import orangPendekImg from '@/assets/extinct/orang-pendek.jpg';
import ahoolImg from '@/assets/extinct/ahool.jpg';
import hibagonImg from '@/assets/extinct/hibagon.jpg';
// Oceania
import yowieImg from '@/assets/extinct/yowie.jpg';
import bunyipImg from '@/assets/extinct/bunyip.jpg';
import megalaniaImg from '@/assets/extinct/megalania.jpg';
import queenslandTigerImg from '@/assets/extinct/queensland-tiger.jpg';
import burrunjorImg from '@/assets/extinct/burrunjor.jpg';
// Africa
import kongamatoImg from '@/assets/extinct/kongamato.jpg';
import nandiBearImg from '@/assets/extinct/nandi-bear.jpg';
import emelaImg from '@/assets/extinct/emela-ntouka.jpg';
// South America
import mapinguariImg from '@/assets/extinct/mapinguari.jpg';
import chupacabraImg from '@/assets/extinct/chupacabra.jpg';
import minhocaoImg from '@/assets/extinct/minhocao.jpg';
// Europe
import gevaudanImg from '@/assets/extinct/beast-gevaudan.jpg';
import tatzelwurmImg from '@/assets/extinct/tatzelwurm.jpg';
import lagarfljotImg from '@/assets/extinct/lagarfljot-worm.jpg';
// Arctic
import ningenImg from '@/assets/extinct/ningen.jpg';
import tizherukImg from '@/assets/extinct/tizheruk.jpg';
// Ocean discoveries (verified)
import hadalSnailfishImg from '@/assets/extinct/hadal-snailfish.jpg';
import casperOctopusImg from '@/assets/extinct/casper-octopus.jpg';
import scalyFootSnailImg from '@/assets/extinct/scaly-foot-snail.jpg';
import yetiCrabImg from '@/assets/extinct/yeti-crab.jpg';
import bigfinSquidImg from '@/assets/extinct/bigfin-squid.jpg';
// Extinct (recent)
import stellersSeaCowImg from '@/assets/extinct/stellers-sea-cow.jpg';
import baijiImg from '@/assets/extinct/baiji.jpg';
import caspianTigerImg from '@/assets/extinct/caspian-tiger.jpg';
import pyreneanIbexImg from '@/assets/extinct/pyrenean-ibex.jpg';
import pintaTortoiseImg from '@/assets/extinct/pinta-tortoise.jpg';
import poouliImg from '@/assets/extinct/poouli.jpg';
// Critically endangered
import vaquitaImg from '@/assets/extinct/vaquita.jpg';
import saolaImg from '@/assets/extinct/saola.jpg';
import javanRhinoImg from '@/assets/extinct/javan-rhino.jpg';
import northernWhiteRhinoImg from '@/assets/extinct/northern-white-rhino.jpg';
import amurLeopardImg from '@/assets/extinct/amur-leopard.jpg';
import kakapoImg from '@/assets/extinct/kakapo.jpg';
import axolotlImg from '@/assets/extinct/axolotl.jpg';

/**
 * Extinct Species — Cryptid taxonomy, recent extinctions, deep-sea
 * discoveries, and critically endangered species worldwide.
 * Each entry pairs verified science with the cryptozoological record.
 */
export const extinctEntries: DossierEntry[] = [
  // ═══════════════ HOMINID / GREAT APE LINEAGE ═══════════════
  {
    id: 'gigantopithecus',
    title: 'Gigantopithecus',
    subtitle: 'Pleistocene Asia · 2 Mya – 215,000 BP',
    category: 'Hominid',
    era: 'Pleistocene',
    location: 'Southern China, Vietnam',
    confidence: 'VERIFIED',
    symbol: '🦍',
    heroImage: gigantopithecusImg,
    summary:
      'The largest ape that ever lived. ~3m tall, weighed 200-300 kg. Known almost entirely from teeth and four jawbones, first found in apothecary "dragon-bone" shops in 1935. Officially extinct ~215,000 years ago — overlapping with Homo erectus.',
    origin:
      'Anthropologist Ralph von Koenigswald discovered Gigantopithecus blacki in 1935 by buying massive primate molars from Hong Kong apothecaries selling "dragon bones" for traditional medicine. Reconstructions estimate the animal at 3m standing height and 200-300 kg — twice the mass of a male gorilla. A 2024 Nature paper by Yingqi Zhang refined extinction to 295,000-215,000 BP, attributing decline to forest contraction. Cryptozoologists including Grover Krantz have argued sasquatch / yeti reports may represent surviving relict populations.',
    keyEvents: [
      '1935: Von Koenigswald discovers first molars in Hong Kong.',
      '1956: First mandible recovered from Liucheng Cave.',
      '2019: Protein analysis confirms close relation to modern orangutans.',
      '2024: Nature paper refines extinction to 295,000-215,000 BP.',
    ],
    evidence: ['4 mandibles + ~2,000 isolated teeth.', 'Enamel proteomic sequencing.', 'Cave isotope record.'],
    skepticalView:
      'No skull, no postcranial bones, no soft-tissue evidence. The "Bigfoot survivor" hypothesis lacks DNA, hair, or skeletal evidence in the field.',
    sources: [{ label: 'Welker et al. 2019, Nature', url: 'https://www.nature.com/articles/s41586-019-1728-8' }],
  },
  {
    id: 'homo-floresiensis',
    title: 'Homo floresiensis',
    subtitle: 'Liang Bua, Indonesia · 100,000 – 50,000 BP',
    category: 'Hominid',
    era: 'Late Pleistocene',
    location: 'Flores, Indonesia',
    confidence: 'VERIFIED',
    symbol: '🧬',
    heroImage: floresiensisImg,
    summary:
      'The "Hobbit." A 1m-tall hominid species discovered at Liang Bua cave in 2003, using stone tools alongside anatomically modern humans until ~50,000 years ago. Local Nage folklore still describes the Ebu Gogo — short, hairy people who lived in caves and were finally killed off by villagers in the 19th century.',
    origin:
      'In 2003 an Australian-Indonesian team led by Mike Morwood unearthed LB1 at Liang Bua. The skeleton was an adult female just over 1m tall with a chimp-sized brain (~420 cc), yet associated with sophisticated stone tools and butchered dwarf elephant remains. Dated 100,000-50,000 BP. Ebu Gogo folklore on Flores describes identical creatures persisting into historical times.',
    keyEvents: ['2003: LB1 skeleton found.', '2016: Revised dating to 100k-50k BP.', '2017: Hominin teeth at Mata Menge dated 700,000 BP.'],
    evidence: ['Multiple individual skeletons.', 'Stone tools.', 'Local oral tradition.'],
    skepticalView: 'Initially dismissed as a pathological modern human (microcephaly, Down syndrome) — claims overturned by additional specimens.',
    sources: [{ label: 'Nature 2004 discovery paper', url: 'https://www.nature.com/articles/nature02999' }],
  },
  {
    id: 'denisovans',
    title: 'Denisovans',
    subtitle: 'Siberia → Tibet → Philippines · 200,000 – 30,000 BP',
    category: 'Hominid',
    era: 'Middle-Late Pleistocene',
    location: 'Denisova Cave, Russia',
    confidence: 'VERIFIED',
    symbol: '🧬',
    heroImage: denisovansImg,
    summary:
      'A separate human species identified from a single finger bone in 2010, now known from teeth, jaws, and ancient DNA across Asia. Modern Papuans, Aboriginal Australians, and Tibetans carry up to 6% Denisovan DNA — including the EPAS1 gene that lets Tibetans breathe at altitude.',
    origin:
      'In 2008 a juvenile finger bone was found in Denisova Cave, Altai. 2010 genome sequencing revealed it belonged to a sister lineage to Neanderthals. Subsequent finds: a mandible from Baishiya (Tibet, 160,000 BP), teeth in Laos, and a 2024 Taiwanese jaw. They interbred with both Neanderthals and modern humans.',
    keyEvents: ['2010: Genome published.', '2019: Tibetan mandible identified by protein analysis.', '2024: Penghu jaw confirmed Denisovan.'],
    evidence: ['Multiple genome-quality DNA extractions.', 'Cross-continental fossils.', 'Living introgression in modern humans.'],
    sources: [{ label: 'Reich et al. 2010, Nature', url: 'https://www.nature.com/articles/nature09710' }],
  },
  {
    id: 'yeren',
    title: 'Yeren — Chinese Wildman',
    subtitle: 'Shennongjia, Hubei · ongoing reports',
    category: 'Cryptid',
    location: 'Central China',
    confidence: 'REPORTED',
    symbol: '🦧',
    heroImage: yerenImg,
    summary:
      'Reddish-brown bipedal ape repeatedly reported from the Shennongjia forest reserve. Chinese Academy of Sciences mounted four official expeditions (1977, 1980, 1981, 2010). Hair samples collected in the 1980s could not be matched to any known primate.',
    origin:
      'Yeren ("wild man") accounts span 2,000 years of Chinese literature. The modern hunt began in 1976 when six PLA cadres encountered a reddish-haired hominid on a road in Shennongjia. The 1977 expedition included 100+ scientists. Footprints up to 48 cm long have been cast. Local Tujia villagers maintain a continuous oral record.',
    keyEvents: ['1976: PLA cadre encounter.', '1977: First CAS expedition.', '1980: Hair analysis exceeds known primates.', '2010: Most recent state-funded expedition.'],
    evidence: ['~400 documented sightings.', 'Footprint casts.', 'Hair samples (unmatched).'],
    skepticalView: 'Most hairs later attributed to Asian black bear or unknown macaque. No bone or DNA.',
    sources: [{ label: 'Xinhua Yeren archive', url: 'https://en.wikipedia.org/wiki/Yeren' }],
  },
  {
    id: 'almas',
    title: 'Almas — Caucasus Wildman',
    subtitle: 'Mongolia, Caucasus, Pamirs · folklore + modern sightings',
    category: 'Cryptid',
    location: 'Central Asia',
    confidence: 'REPORTED',
    symbol: '🧔',
    heroImage: almasImg,
    summary:
      'A hair-covered, broad-shouldered wildman of Mongolian and Caucasian tradition. The 1850s captive "Zana" of Abkhazia bore six children with locals; her great-grandson\'s skull, exhumed in 1971, showed unusual archaic features. Modern DNA on her descendants is ambiguous.',
    origin:
      'Almas accounts run from Mongolian and Tibetan medical texts through Soviet hominologist Boris Porshnev\'s mid-20th century work. The Zana case at Tkhina (1850s) is best documented: she was reportedly captured wild, kept in a stockade, learned no language but produced offspring. Bryan Sykes\' 2014 DNA work on living descendants found 100% sub-Saharan African ancestry — startling for the Caucasus but not "non-human."',
    sources: [{ label: 'Porshnev archive', url: 'https://en.wikipedia.org/wiki/Almas_(folklore)' }],
  },
  {
    id: 'orang-pendek',
    title: 'Orang Pendek — Sumatran Short Man',
    subtitle: 'Kerinci Seblat, Sumatra · ongoing',
    category: 'Cryptid',
    location: 'Sumatra, Indonesia',
    confidence: 'REPORTED',
    symbol: '🐒',
    heroImage: orangPendekImg,
    summary:
      'A 1-1.5m upright ape reported by Kubu indigenous people for centuries and by Western researchers since 1923. Considered by many cryptozoologists (Debbie Martyr, Adam Davies) the most likely undiscovered great ape — possibly a relict Homo floresiensis-style hominid.',
    origin:
      'Debbie Martyr conducted 15 years of fieldwork in Kerinci Seblat National Park (1989-2004) and reported multiple personal sightings. Footprints cast and analyzed by primatologists show a divergent, non-human ape morphology. Hair samples collected in 2009 by Adam Davies\' team returned inconclusive DNA results.',
    sources: [{ label: 'Martyr fieldwork archive', url: 'https://en.wikipedia.org/wiki/Orang_Pendek' }],
  },
  {
    id: 'hibagon',
    title: 'Hibagon — Japanese Bigfoot',
    subtitle: 'Mt. Hiba, Hiroshima · 1970s peak, sightings continue',
    category: 'Cryptid',
    location: 'Hiroshima Prefecture, Japan',
    confidence: 'REPORTED',
    symbol: '🐻',
    heroImage: hibagonImg,
    summary:
      'A dark, gorilla-faced hominid reported from the forests around Mt. Hiba beginning July 1970. Saijo town received so many reports it appointed an official "Hibagon investigator." Tracks 25 cm long and clear photographs of unidentified hairy figures remain in the local archive.',
    sources: [{ label: 'Saijo town archive', url: 'https://en.wikipedia.org/wiki/Hibagon' }],
  },
  {
    id: 'yowie',
    title: 'Yowie — Australian Bigfoot',
    subtitle: 'Eastern Australia · Aboriginal oral tradition + modern sightings',
    category: 'Cryptid',
    location: 'New South Wales, Queensland',
    confidence: 'REPORTED',
    symbol: '🦶',
    heroImage: yowieImg,
    summary:
      'A large hair-covered hominid known across at least 22 Aboriginal language groups as Yowie, Yahoo, Doolagahl, or Quinkin. The Australian Yowie Research database catalogs 3,500+ post-1955 sightings. Tracks 40-50 cm long with distinct toe morphology have been cast in granite country of the Blue Mountains.',
    sources: [{ label: 'AYR database', url: 'https://en.wikipedia.org/wiki/Yowie' }],
  },

  // ═══════════════ CRYPTID — LARGE FAUNA ═══════════════
  {
    id: 'mokele-mbembe',
    title: 'Mokèlé-Mbèmbé',
    subtitle: 'Likouala Swamp, Congo · 1776 – present',
    category: 'Cryptid',
    era: 'Modern',
    location: 'Republic of Congo',
    confidence: 'ALLEGED',
    symbol: '🦕',
    heroImage: mokeleImg,
    summary:
      'A long-necked sauropod-like creature reported by the Bayaka and BaAka peoples of the Likouala swamp. Subject of a dozen Western expeditions since 1913 (Mackal, Regusters, Gibbons) — none producing verified physical evidence.',
    origin:
      'Reports date to French missionary records from 1776. Captain Freiherr von Stein zu Lausnitz produced the first detailed Western account in 1913. Roy Mackal led major expeditions 1980-83; his 1987 book "A Living Dinosaur?" presented the case for a relict sauropod. The Likouala remains one of the least-explored regions on Earth.',
    skepticalView:
      'A relict sauropod would require a breeding population of dozens — leaving abundant carcass and bone evidence. Witness IDs may reflect cultural diffusion of dinosaur imagery via missionaries.',
    sources: [{ label: 'Mackal — "A Living Dinosaur?" (1987)', url: 'https://archive.org/details/livingdinosauris0000mack' }],
  },
  {
    id: 'emela-ntouka',
    title: 'Emela-ntouka — Killer of Elephants',
    subtitle: 'Likouala swamp, Congo · ongoing reports',
    category: 'Cryptid',
    location: 'Republic of Congo',
    confidence: 'ALLEGED',
    symbol: '🦏',
    heroImage: emelaImg,
    summary:
      'A semi-aquatic single-horned creature reported alongside Mokèlé-Mbèmbé, but distinct: described as the size of an elephant with a single ivory horn on its snout, killing elephants and rhinos by goring. Pygmy informants distinguish it sharply from any known animal.',
    sources: [{ label: 'Mackal field notes', url: 'https://en.wikipedia.org/wiki/Emela-ntouka' }],
  },
  {
    id: 'kongamato',
    title: 'Kongamato — African Pterosaur',
    subtitle: 'Jiundu Swamp, Zambia · 1923 – present',
    category: 'Cryptid',
    location: 'Zambia, DRC, Angola',
    confidence: 'ALLEGED',
    symbol: '🦇',
    heroImage: kongamatoImg,
    summary:
      'A leathery-winged reddish flying creature reported across central African swamps. Frank Welland\'s 1932 "In Witchbound Africa" first brought it to Western attention; locals identified it from pterosaur picture cards without hesitation. Sightings continue from missionaries and bush pilots through the 2010s.',
    sources: [{ label: 'Welland 1932', url: 'https://en.wikipedia.org/wiki/Kongamato' }],
  },
  {
    id: 'nandi-bear',
    title: 'Nandi Bear — Chemosit',
    subtitle: 'Kenyan Highlands · 1900s peak, sporadic reports since',
    category: 'Cryptid',
    location: 'Kenya, Uganda',
    confidence: 'REPORTED',
    symbol: '🐻',
    heroImage: nandiBearImg,
    summary:
      'A hulking shaggy carnivore of the Kenyan Nandi region, blamed for dozens of human deaths in the early 20th century. Theories range from a relict short-faced bear (Africa has no native bears) to a giant honey badger or surviving chalicothere.',
    sources: [{ label: 'Hichens 1937', url: 'https://en.wikipedia.org/wiki/Nandi_Bear' }],
  },
  {
    id: 'mapinguari',
    title: 'Mapinguari — Amazonian Ground Sloth',
    subtitle: 'Western Amazon · indigenous record + modern expeditions',
    category: 'Cryptid',
    location: 'Brazil, Bolivia, Peru',
    confidence: 'REPORTED',
    symbol: '🦥',
    heroImage: mapinguariImg,
    summary:
      'A hulking shaggy bipedal creature described by indigenous Karitiana and Machiguenga as having a fetid smell, claws, and impervious hide. Ornithologist David Oren of the Goeldi Museum has argued it may be a surviving ground sloth (Mylodontidae), extinct only ~10,000 years.',
    sources: [{ label: 'Oren 1993', url: 'https://en.wikipedia.org/wiki/Mapinguari' }],
  },
  {
    id: 'chupacabra',
    title: 'Chupacabra — Goat-Sucker',
    subtitle: 'Puerto Rico → Americas · 1995 – present',
    category: 'Cryptid',
    location: 'Puerto Rico, Mexico, Texas',
    confidence: 'REPORTED',
    symbol: '🩸',
    heroImage: chupacabraImg,
    summary:
      'First reported in 1995 in Canóvanas, Puerto Rico after livestock were found drained of blood through small punctures. Original eyewitness Madelyne Tolentino described a reptilian bipedal creature with spinal spikes. Later "chupacabra" carcasses from Texas were genetically identified as mange-stricken coyotes.',
    sources: [{ label: 'Radford 2011 investigation', url: 'https://en.wikipedia.org/wiki/Chupacabra' }],
  },
  {
    id: 'minhocao',
    title: 'Minhocão — Giant South American Worm',
    subtitle: 'Brazil, Uruguay · 19th century',
    category: 'Cryptid',
    location: 'Southern Brazil',
    confidence: 'ALLEGED',
    symbol: '🐍',
    heroImage: minhocaoImg,
    summary:
      'A 25-meter armored worm reported throughout the 1840s-1870s in Brazilian Cerrado country, carving deep trenches through soil and uprooting trees. Auguste de Saint-Hilaire and Fritz Müller documented eyewitness accounts. Possibly an enormous caecilian or surviving glyptodont — sightings ceased by 1900.',
    sources: [{ label: 'Müller 1877 letter', url: 'https://en.wikipedia.org/wiki/Minhoc%C3%A3o_(cryptid)' }],
  },
  {
    id: 'beast-gevaudan',
    title: 'Beast of Gévaudan',
    subtitle: 'Margeride Mountains, France · 1764-1767',
    category: 'Cryptid',
    era: '18th century',
    location: 'Lozère, France',
    confidence: 'VERIFIED',
    symbol: '🐺',
    heroImage: gevaudanImg,
    summary:
      'Between 1764 and 1767, a wolf-like creature killed at least 113 people across the Gévaudan region — primarily women and children. Louis XV dispatched royal hunters; François Antoine killed a massive wolf in 1765 and Jean Chastel killed a second in 1767, ending the attacks. The species remains debated.',
    skepticalView: 'Most modern analysis points to a pack of unusually large wolves, possibly hybridized with domestic dogs. The "single beast" narrative was royal propaganda.',
    sources: [{ label: 'Smith 2011 — "Monsters of the Gévaudan"', url: 'https://en.wikipedia.org/wiki/Beast_of_G%C3%A9vaudan' }],
  },
  {
    id: 'tatzelwurm',
    title: 'Tatzelwurm — Alpine Worm',
    subtitle: 'Alps · 17th-20th century',
    category: 'Cryptid',
    location: 'Switzerland, Austria, Bavaria',
    confidence: 'REPORTED',
    symbol: '🦎',
    heroImage: tatzelwurmImg,
    summary:
      'A short-legged serpentine reptile with a cat-like head, reported across Alpine valleys for 400+ years. Last credible sighting cluster in the 1930s. Possibly a misidentified European glass lizard, or a relict population of an undescribed amphibian.',
    sources: [{ label: 'Heuvelmans archive', url: 'https://en.wikipedia.org/wiki/Tatzelwurm' }],
  },
  {
    id: 'lagarfljot-worm',
    title: 'Lagarfljót Worm',
    subtitle: 'Lake Lagarfljót, Iceland · 1345 – present',
    category: 'Cryptid',
    location: 'East Iceland',
    confidence: 'REPORTED',
    symbol: '🐉',
    heroImage: lagarfljotImg,
    summary:
      'A serpent in the glacial Lake Lagarfljót, first recorded in Icelandic annals in 1345. A 2012 video by farmer Hjörtur Kjerúlf showed a long undulating form in the river; an official Iceland review committee voted 7-6 that the footage was genuine. The lake is murky with glacial silt — no diving has resolved it.',
    sources: [{ label: 'Iceland Truth Committee 2014', url: 'https://en.wikipedia.org/wiki/Lagarflj%C3%B3t_Worm' }],
  },
  {
    id: 'dyatlov-cryptid',
    title: 'Dyatlov Pass Cryptid',
    subtitle: 'Northern Urals · February 1959',
    category: 'Cryptid',
    era: '20th century',
    location: 'Kholat Syakhl, Russia',
    confidence: 'DEBATED',
    symbol: '❄️',
    heroImage: dyatlovImg,
    summary:
      'Nine experienced Soviet hikers died under uniquely strange circumstances on the slopes of Kholat Syakhl. The tent was cut from inside; bodies showed crushing injuries without external wounds; one was missing a tongue; clothing was radioactive. Mansi folklore of the region speaks of the Menk, a hair-covered wildman of the northern Urals. The 2019 Russian re-investigation concluded a slab avalanche; many remain unconvinced.',
    sources: [{ label: 'Eichar 2013 — "Dead Mountain"', url: 'https://en.wikipedia.org/wiki/Dyatlov_Pass_incident' }],
  },
  {
    id: 'mongolian-death-worm',
    title: 'Olgoi-khorkhoi — Death Worm',
    subtitle: 'Gobi Desert, Mongolia · ongoing nomadic reports',
    category: 'Cryptid',
    location: 'Southern Gobi',
    confidence: 'REPORTED',
    symbol: '🪱',
    heroImage: deathWormImg,
    summary:
      'A 60cm crimson sand-dwelling worm reputed to kill by spitting acid or generating electric shock at close range. Roy Chapman Andrews\' 1922 Central Asiatic Expedition recorded Mongol nomadic testimony; Czech cryptozoologist Ivan Mackerle led three expeditions in the 1990s. No specimen recovered.',
    sources: [{ label: 'Mackerle 1994', url: 'https://en.wikipedia.org/wiki/Mongolian_death_worm' }],
  },
  {
    id: 'ahool',
    title: 'Ahool — Javan Giant Bat',
    subtitle: 'Java, Indonesia · 1925 – present',
    category: 'Cryptid',
    location: 'Western Java',
    confidence: 'REPORTED',
    symbol: '🦇',
    heroImage: ahoolImg,
    summary:
      'A bat-like creature with a reported 3m wingspan, named for its distinctive "a-hooool" call. First documented by naturalist Ernest Bartels in 1925 while studying near the Salak River. Theorized to be either a giant undescribed megabat or a surviving Pleistocene flying creature.',
    sources: [{ label: 'Bartels 1925', url: 'https://en.wikipedia.org/wiki/Ahool' }],
  },

  // ═══════════════ AUSTRALIA / OCEANIA CRYPTIDS ═══════════════
  {
    id: 'bunyip',
    title: 'Bunyip',
    subtitle: 'Australian billabongs · Aboriginal record + colonial sightings',
    category: 'Cryptid',
    location: 'Eastern Australia',
    confidence: 'REPORTED',
    symbol: '🌊',
    heroImage: bunyipImg,
    summary:
      'An aquatic creature of Dreamtime tradition, described variously as having a dog-like head, flippers, and a horse-like tail. The 1846 "Bunyip skull" found at Geelong was examined by professors who declared it unknown to science. Colonial-era sightings cluster around the Murrumbidgee and Murray Rivers.',
    sources: [{ label: 'Holden 2001', url: 'https://en.wikipedia.org/wiki/Bunyip' }],
  },
  {
    id: 'queensland-tiger',
    title: 'Queensland Tiger',
    subtitle: 'North Queensland · ongoing',
    category: 'Cryptid',
    location: 'Queensland, Australia',
    confidence: 'REPORTED',
    symbol: '🐯',
    heroImage: queenslandTigerImg,
    summary:
      'A striped feline-marsupial reported across North Queensland for 150+ years. Often theorized to be a relict population of Thylacoleo carnifex, the marsupial lion — extinct ~46,000 BP. Sightings continue from rural landowners through the 2020s.',
    sources: [{ label: 'Healy & Cropper 1994', url: 'https://en.wikipedia.org/wiki/Queensland_tiger' }],
  },
  {
    id: 'burrunjor',
    title: 'Burrunjor',
    subtitle: 'Arnhem Land, NT · ongoing reports',
    category: 'Cryptid',
    location: 'Northern Territory, Australia',
    confidence: 'ALLEGED',
    symbol: '🦖',
    heroImage: burrunjorImg,
    summary:
      'A large bipedal reptile of Yolŋu tradition, sometimes described as theropod-like. Cattle disappearances and three-toed tracks were reported through the 1950s-1980s. Cryptozoologist Rex Gilroy popularized accounts of a surviving Australovenator-style dinosaur.',
    sources: [{ label: 'Gilroy field reports', url: 'https://en.wikipedia.org/wiki/Burrunjor' }],
  },
  {
    id: 'megalania',
    title: 'Megalania prisca',
    subtitle: 'Pleistocene Australia · extinct ~50,000 BP',
    category: 'Cryptid',
    era: 'Late Pleistocene',
    location: 'Australia',
    confidence: 'VERIFIED',
    symbol: '🦎',
    heroImage: megalaniaImg,
    summary:
      'A monitor lizard up to 7m long, the largest terrestrial lizard known to science. Officially extinct ~50,000 BP, overlapping with the first Aboriginal Australians. Indigenous tradition and modern cryptozoology hold that relict populations may persist in remote Cape York and the Kimberley.',
    sources: [{ label: 'Hocknull 2009', url: 'https://en.wikipedia.org/wiki/Megalania' }],
  },

  // ═══════════════ ARCTIC / OCEAN CRYPTIDS ═══════════════
  {
    id: 'ningen',
    title: 'Ningen — Antarctic Humanoid',
    subtitle: 'Southern Ocean · 1990s – present',
    category: 'Cryptid',
    location: 'Antarctic waters',
    confidence: 'ALLEGED',
    symbol: '🧊',
    heroImage: ningenImg,
    summary:
      'A pale 20-30m humanoid sea creature reported by Japanese whaling and research crews south of Antarctica. Blurry Google Maps anomalies in 2007-2008 sparked widespread internet speculation. Official Japanese government documents acknowledge the reports without confirming biology.',
    sources: [{ label: 'Japanese government archive', url: 'https://en.wikipedia.org/wiki/Ningen_(cryptid)' }],
  },
  {
    id: 'tizheruk',
    title: 'Tizheruk — Alaskan Sea Serpent',
    subtitle: 'Bering Strait · Inuit oral tradition',
    category: 'Cryptid',
    location: 'King Island, Alaska',
    confidence: 'REPORTED',
    symbol: '🌊',
    heroImage: tizherukImg,
    summary:
      'A long-necked serpentine sea creature of King Island Inuit tradition, reported to ambush kayakers near shore. Reports continued through the 1900s. Often grouped with the broader category of "sea-tigers" reported across the North Pacific rim.',
    sources: [{ label: 'Inuit oral history archive', url: 'https://en.wikipedia.org/wiki/Tizheruk' }],
  },

  // ═══════════════ VERIFIED DEEP-SEA DISCOVERIES ═══════════════
  {
    id: 'hadal-snailfish',
    title: 'Mariana Snailfish',
    subtitle: 'Mariana Trench · described 2014',
    category: 'Deep-Sea Discovery',
    era: 'Modern',
    location: 'Western Pacific',
    confidence: 'VERIFIED',
    symbol: '🐟',
    heroImage: hadalSnailfishImg,
    summary:
      'The deepest-living fish ever recorded — Pseudoliparis swirei, filmed at 8,178m in the Mariana Trench by a Japanese-UK team in 2017 and formally described in 2018. Gelatinous, translucent, and physiologically impossible above 6,000m due to pressure equilibrium.',
    sources: [{ label: 'Gerringer et al. 2017, Zootaxa', url: 'https://en.wikipedia.org/wiki/Mariana_snailfish' }],
  },
  {
    id: 'casper-octopus',
    title: 'Casper Octopus',
    subtitle: 'Necker Ridge, Hawaii · discovered 2016',
    category: 'Deep-Sea Discovery',
    location: 'Central Pacific',
    confidence: 'VERIFIED',
    symbol: '🐙',
    heroImage: casperOctopusImg,
    summary:
      'A ghost-white, eyeless-looking incirrate octopus filmed in 2016 by NOAA\'s Okeanos Explorer at 4,290m depth near Hawaii — the deepest known incirrate. Lays eggs on rare deep-sea sponges that grow on manganese nodules, putting it directly in the path of proposed deep-sea mining.',
    sources: [{ label: 'NOAA 2016', url: 'https://en.wikipedia.org/wiki/Casper_(octopus)' }],
  },
  {
    id: 'scaly-foot-snail',
    title: 'Scaly-Foot Snail',
    subtitle: 'Indian Ocean hydrothermal vents · described 2003',
    category: 'Deep-Sea Discovery',
    location: 'Kairei vent field',
    confidence: 'VERIFIED',
    symbol: '🐌',
    heroImage: scalyFootSnailImg,
    summary:
      'The only animal known to incorporate iron sulfide (pyrite, greigite) into its skeleton — armoring its foot in metallic scales. Lives exclusively on three deep-sea hydrothermal vent fields. Listed as Endangered in 2019, the first species threatened by deep-sea mining.',
    sources: [{ label: 'Warén et al. 2003, Science', url: 'https://en.wikipedia.org/wiki/Chrysomallon_squamiferum' }],
  },
  {
    id: 'yeti-crab',
    title: 'Yeti Crab — Kiwa',
    subtitle: 'Pacific & Antarctic vents · described 2005',
    category: 'Deep-Sea Discovery',
    location: 'Pacific-Antarctic Ridge',
    confidence: 'VERIFIED',
    symbol: '🦀',
    heroImage: yetiCrabImg,
    summary:
      'Blind, hairy white crabs (Kiwa hirsuta, K. tyleri) that farm chemosynthetic bacteria on bristles covering their claws and bodies. Discovered at hydrothermal vents in 2005; K. tyleri dances in dense swarms to stay in the narrow temperature band where its bacteria grow.',
    sources: [{ label: 'Macpherson et al. 2005', url: 'https://en.wikipedia.org/wiki/Kiwa_(genus)' }],
  },
  {
    id: 'bigfin-squid',
    title: 'Bigfin Squid — Magnapinna',
    subtitle: 'Global abyssal · filmed 1988 onward',
    category: 'Deep-Sea Discovery',
    location: 'All ocean basins, >2000m',
    confidence: 'VERIFIED',
    symbol: '🦑',
    heroImage: bigfinSquidImg,
    summary:
      'A bizarre cephalopod with impossibly long, thin arms held perpendicular to the body and trailing 7+ meters. Only ever filmed by ROVs — never captured intact. Filmed in the Great Australian Bight (2022) and most ocean basins, but biology remains nearly unknown.',
    sources: [{ label: 'Vecchione et al. 2001', url: 'https://en.wikipedia.org/wiki/Magnapinna' }],
  },

  // ═══════════════ RECENT EXTINCTIONS ═══════════════
  {
    id: 'thylacine',
    title: 'Thylacine — Tasmanian Tiger',
    subtitle: 'Tasmania · officially extinct 1936',
    category: 'Recently Extinct',
    era: '20th century',
    location: 'Tasmania, Australia',
    confidence: 'VERIFIED',
    symbol: '🐅',
    heroImage: thylacineImg,
    summary:
      'The last confirmed thylacine (Benjamin) died at Hobart Zoo on 7 September 1936. The Tasmanian government still records 5-10 plausible sightings per year — the 1973 Naarding 35mm photos, the 2017 Booth Richardson trail cam footage, and the 2023 Sumac Bay sequence remain unresolved. Colossal Biosciences began funded de-extinction work in 2022.',
    sources: [{ label: 'Tasmanian Govt sighting register', url: 'https://nre.tas.gov.au/wildlife-management/fauna-of-tasmania/thylacine' }],
  },
  {
    id: 'haasts-eagle',
    title: 'Haast\'s Eagle',
    subtitle: 'New Zealand · extinct ~1400 CE',
    category: 'Recently Extinct',
    era: 'Holocene',
    location: 'South Island, NZ',
    confidence: 'VERIFIED',
    symbol: '🦅',
    heroImage: haastsEagleImg,
    summary:
      'The largest eagle that ever lived — 15 kg with a 3m wingspan, preying on adult moa. Driven extinct by Polynesian arrival (~1280 CE) and the loss of its primary prey within 200 years. Surviving in Māori tradition as Te Hōkioi or Pouākai. Some ethnographers argue eyewitness accounts persisted into the early colonial era.',
    sources: [{ label: 'Worthy & Holdaway 2002', url: 'https://en.wikipedia.org/wiki/Haast%27s_eagle' }],
  },
  {
    id: 'megalodon',
    title: 'Otodus megalodon',
    subtitle: 'Global oceans · extinct ~3.6 Mya',
    category: 'Recently Extinct',
    era: 'Pliocene',
    location: 'Worldwide',
    confidence: 'VERIFIED',
    symbol: '🦈',
    heroImage: megalodonImg,
    summary:
      'The largest shark ever — 15-20m long, 50+ tonnes. Officially extinct ~3.6 Mya, likely from prey collapse and rising great whites. Cryptozoological "living megalodon" claims (the Rachel Cohen photo, the U-28 incident) lack supporting evidence; the ocean is well-surveyed enough that a population of apex predators 15m long would not remain hidden.',
    sources: [{ label: 'Boessenecker et al. 2019', url: 'https://en.wikipedia.org/wiki/Megalodon' }],
  },
  {
    id: 'stellers-sea-cow',
    title: 'Steller\'s Sea Cow',
    subtitle: 'Commander Islands · extinct 1768',
    category: 'Recently Extinct',
    era: '18th century',
    location: 'Bering Sea',
    confidence: 'VERIFIED',
    symbol: '🦭',
    heroImage: stellersSeaCowImg,
    summary:
      'A 9m, 10-tonne sirenian discovered by Georg Steller in 1741, hunted to extinction by Russian fur traders within 27 years. The most famous case of human-caused historical extinction documented start to finish. Tribal accounts from Bering Sea Aleut suggest small populations may have persisted to the early 19th century.',
    sources: [{ label: 'Steller 1751 (posthumous)', url: 'https://en.wikipedia.org/wiki/Steller%27s_sea_cow' }],
  },
  {
    id: 'baiji',
    title: 'Baiji — Yangtze River Dolphin',
    subtitle: 'Yangtze River, China · functionally extinct 2006',
    category: 'Recently Extinct',
    era: '21st century',
    location: 'China',
    confidence: 'VERIFIED',
    symbol: '🐬',
    heroImage: baijiImg,
    summary:
      'The first dolphin species driven extinct by humans. A 2006 multinational survey of the entire 3,500 km Yangtze found none — declared functionally extinct. A 2007 sighting and possible 2016 footage suggest a handful may persist, but no breeding population. Lost to dam construction, fishing bycatch, and pollution within a single generation.',
    sources: [{ label: 'Turvey et al. 2007', url: 'https://en.wikipedia.org/wiki/Baiji' }],
  },
  {
    id: 'caspian-tiger',
    title: 'Caspian Tiger',
    subtitle: 'Central Asia · extinct ~1970s',
    category: 'Recently Extinct',
    location: 'Iran, Turkey, Central Asia',
    confidence: 'VERIFIED',
    symbol: '🐯',
    heroImage: caspianTigerImg,
    summary:
      'The third-largest tiger subspecies, ranging from Turkey through the Caucasus to western China. Driven extinct by Russian Imperial and Soviet eradication campaigns through the mid-20th century. Genetically nearly identical to surviving Amur tigers — making rewilding from Amur stock biologically credible. Kazakhstan launched a formal reintroduction program in 2022.',
    sources: [{ label: 'Driscoll et al. 2009', url: 'https://en.wikipedia.org/wiki/Caspian_tiger' }],
  },
  {
    id: 'pyrenean-ibex',
    title: 'Pyrenean Ibex (Bucardo)',
    subtitle: 'Spanish Pyrenees · extinct 2000, briefly de-extinct 2003',
    category: 'Recently Extinct',
    era: '21st century',
    location: 'Aragon, Spain',
    confidence: 'VERIFIED',
    symbol: '🐐',
    heroImage: pyreneanIbexImg,
    summary:
      'The last individual (Celia) died on 6 January 2000, crushed by a falling tree. In 2003, Spanish scientists cloned a Bucardo from her preserved cells — the kid lived 7 minutes before dying of lung defects. The first species to go extinct twice, and the first ever de-extinct, however briefly.',
    sources: [{ label: 'Folch et al. 2009, Theriogenology', url: 'https://en.wikipedia.org/wiki/Pyrenean_ibex' }],
  },
  {
    id: 'pinta-tortoise',
    title: 'Pinta Island Tortoise',
    subtitle: 'Galápagos · extinct 24 June 2012',
    category: 'Recently Extinct',
    era: '21st century',
    location: 'Pinta Island, Ecuador',
    confidence: 'VERIFIED',
    symbol: '🐢',
    heroImage: pintaTortoiseImg,
    summary:
      'Lonesome George, the last Pinta Island giant tortoise, died on 24 June 2012 at ~100 years old after 40 years of unsuccessful breeding attempts. His subspecies (Chelonoidis abingdonii) was declared extinct that day. 2020 surveys on Wolf Volcano (Isabela Island) found 30 hybrid descendants carrying significant Pinta DNA — opening a path to genetic rescue.',
    sources: [{ label: 'Galápagos Conservancy 2020', url: 'https://en.wikipedia.org/wiki/Lonesome_George' }],
  },
  {
    id: 'poouli',
    title: "Po'ouli — Black-faced Honeycreeper",
    subtitle: 'Maui, Hawaii · extinct 2004',
    category: 'Recently Extinct',
    era: '21st century',
    location: 'Hawaii, USA',
    confidence: 'VERIFIED',
    symbol: '🐦',
    heroImage: poouliImg,
    summary:
      'Discovered only in 1973, extinct by 2004. Only 3 individuals remained by 2003; the last died in captivity 26 November 2004 after attempts to bring them together for breeding failed. Cell lines were preserved — its genome remains the only thing left.',
    sources: [{ label: 'USFWS 2019 declaration', url: 'https://en.wikipedia.org/wiki/Po%CA%BBouli' }],
  },

  // ═══════════════ CRITICALLY ENDANGERED — LIVING NOW ═══════════════
  {
    id: 'vaquita',
    title: 'Vaquita',
    subtitle: 'Gulf of California · ~10 individuals (2024)',
    category: 'Critically Endangered',
    era: 'Living now',
    location: 'Sea of Cortez, Mexico',
    confidence: 'VERIFIED',
    symbol: '🐬',
    heroImage: vaquitaImg,
    summary:
      'The world\'s smallest porpoise and the most endangered marine mammal. Down to ~10 individuals as of 2024, killed almost exclusively as bycatch in illegal totoaba gillnets feeding Chinese swim-bladder markets. A 2023 expedition found a breeding female with calf — a few intact family groups remain.',
    sources: [{ label: 'CIRVA 2024 report', url: 'https://en.wikipedia.org/wiki/Vaquita' }],
  },
  {
    id: 'saola',
    title: 'Saola — Asian Unicorn',
    subtitle: 'Annamite Mountains · ~50-300 estimated',
    category: 'Critically Endangered',
    era: 'Living now',
    location: 'Vietnam-Laos border',
    confidence: 'VERIFIED',
    symbol: '🦌',
    heroImage: saolaImg,
    summary:
      'Discovered only in 1992 — the most significant large mammal discovery of the 20th century. A bovid more closely related to cattle than to any antelope, with two parallel horns. Never photographed by scientists in the wild until 1999; last camera-trap image 2013. Possibly under 100 individuals remain.',
    sources: [{ label: 'WWF Saola Working Group', url: 'https://en.wikipedia.org/wiki/Saola' }],
  },
  {
    id: 'javan-rhino',
    title: 'Javan Rhinoceros',
    subtitle: 'Ujung Kulon NP · ~76 individuals (2024)',
    category: 'Critically Endangered',
    era: 'Living now',
    location: 'Western Java, Indonesia',
    confidence: 'VERIFIED',
    symbol: '🦏',
    heroImage: javanRhinoImg,
    summary:
      'Reduced to a single population in Ujung Kulon National Park. The last Vietnamese individual was poached in 2010. Vulnerable to a single tsunami or disease outbreak. Calves born 2022-2024 give cautious hope, but rangers seized two new poached carcasses in 2024.',
    sources: [{ label: 'IRF 2024', url: 'https://en.wikipedia.org/wiki/Javan_rhinoceros' }],
  },
  {
    id: 'northern-white-rhino',
    title: 'Northern White Rhinoceros',
    subtitle: 'Ol Pejeta, Kenya · 2 individuals',
    category: 'Critically Endangered',
    era: 'Living now',
    location: 'Kenya',
    confidence: 'VERIFIED',
    symbol: '🦏',
    heroImage: northernWhiteRhinoImg,
    summary:
      'Functionally extinct. Only two females remain — Najin and Fatu, mother and daughter, under 24/7 armed guard at Ol Pejeta. BioRescue consortium has produced 30+ viable embryos using cryopreserved sperm from deceased males Suni and Saut. First successful southern-white surrogate pregnancy was confirmed in 2024.',
    sources: [{ label: 'BioRescue Consortium', url: 'https://en.wikipedia.org/wiki/Northern_white_rhinoceros' }],
  },
  {
    id: 'amur-leopard',
    title: 'Amur Leopard',
    subtitle: 'Russian Far East · ~130 individuals',
    category: 'Critically Endangered',
    era: 'Living now',
    location: 'Primorsky Krai, Russia',
    confidence: 'VERIFIED',
    symbol: '🐆',
    heroImage: amurLeopardImg,
    summary:
      'The rarest big cat on Earth. The 2007 estimate was 30; the 2024 census, after sustained Russian protection of Land of the Leopard National Park, puts the wild population at ~130 — one of the few endangered cats whose numbers are climbing.',
    sources: [{ label: 'WWF Russia 2024 census', url: 'https://en.wikipedia.org/wiki/Amur_leopard' }],
  },
  {
    id: 'kakapo',
    title: 'Kakapo',
    subtitle: 'Predator-free islands, NZ · 244 individuals (2024)',
    category: 'Critically Endangered',
    era: 'Living now',
    location: 'New Zealand',
    confidence: 'VERIFIED',
    symbol: '🦜',
    heroImage: kakapoImg,
    summary:
      'The world\'s only flightless, nocturnal parrot — long-lived, lek-breeding, and naive to mammalian predators. Down to 51 birds in 1995, now 244 thanks to intensive management on Whenua Hou and other predator-free islands. Every individual is named and tracked; many are sequenced and on antibiotic-resistant gut microbiome research.',
    sources: [{ label: 'NZ DOC Kakapo Recovery', url: 'https://en.wikipedia.org/wiki/Kakapo' }],
  },
  {
    id: 'axolotl',
    title: 'Axolotl',
    subtitle: 'Xochimilco canals, Mexico · ~50-1,000 wild',
    category: 'Critically Endangered',
    era: 'Living now',
    location: 'Mexico City',
    confidence: 'VERIFIED',
    symbol: '🦎',
    heroImage: axolotlImg,
    summary:
      'A neotenic salamander that retains its larval form and breathes through external gill plumes. Capable of regenerating limbs, heart tissue, and parts of its brain. Wild population is functionally extinct in the canals of Xochimilco (perhaps under 1,000 individuals), even as tens of thousands live in captivity worldwide. UNAM\'s chinampas-refuge program is the leading conservation effort.',
    sources: [{ label: 'IUCN Red List', url: 'https://en.wikipedia.org/wiki/Axolotl' }],
  },
];

export const extinctCategories = [
  'All',
  'Hominid',
  'Cryptid',
  'Deep-Sea Discovery',
  'Recently Extinct',
  'Critically Endangered',
];
