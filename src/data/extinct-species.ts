import type { DossierEntry } from '@/components/dossier/types';

/**
 * Extinct Species — Cryptid taxonomy and natural-history exhibit.
 * Catalogs species that were either too large, too strange, or too
 * recent in disappearance to fit comfortably into the official record.
 */
export const extinctEntries: DossierEntry[] = [
  {
    id: 'gigantopithecus',
    title: 'Gigantopithecus',
    subtitle: 'Pleistocene Asia · 2 Mya – 100,000 BP',
    category: 'Hominid',
    era: 'Pleistocene',
    location: 'Southern China, Vietnam',
    confidence: 'VERIFIED',
    symbol: '🦍',
    summary:
      'The largest ape that ever lived. ~3m tall, weighed 200-300 kg. Known almost entirely from teeth and four jawbones, found in apothecary "dragon-bone" shops in 1935. Officially extinct ~100,000 years ago — overlapping with Homo erectus and possibly with anatomically modern humans entering Asia.',
    origin:
      'Anthropologist Ralph von Koenigswald discovered Gigantopithecus blacki in 1935 by buying massive primate molars from Hong Kong apothecaries selling "dragon bones" for traditional medicine. Over the following decades, four nearly complete mandibles and ~2,000 teeth were recovered from cave deposits in southern China and Vietnam.\n\nReconstructions estimate the animal at 3m standing height and 200-300 kg — twice the mass of a male gorilla. Tooth wear and isotope analysis suggest it was a forest-dwelling herbivore, likely specializing in bamboo. A 2024 Nature paper by Yingqi Zhang refined extinction to 295,000-215,000 BP, slightly earlier than previous estimates, attributing decline to forest contraction. Cryptozoologists including Grover Krantz have argued sasquatch / yeti reports may represent surviving relict populations.',
    keyEvents: [
      '1935: Von Koenigswald discovers first molars in Hong Kong.',
      '1956: First mandible recovered from Liucheng Cave.',
      '2019: Protein analysis (Welker et al.) confirms Gigantopithecus is closely related to modern orangutans.',
      '2024: Nature paper refines extinction to 295,000-215,000 BP.',
    ],
    evidence: [
      '4 mandibles + ~2,000 isolated teeth.',
      'Tooth enamel proteomic sequencing (2019 Nature paper).',
      'Cave isotope record showing herbivore diet.',
    ],
    skepticalView:
      'No skull, no postcranial bones, and no soft-tissue evidence have ever been recovered. The "Bigfoot survivor" hypothesis lacks any DNA, hair, or skeletal evidence in the field.',
    sources: [
      { label: 'Welker et al. 2019, Nature', url: 'https://www.nature.com/articles/s41586-019-1728-8' },
    ],
  },
  {
    id: 'homo-floresiensis',
    title: 'Homo floresiensis',
    subtitle: 'Liang Bua, Indonesia · 100,000 – 50,000 BP',
    category: 'Hominid',
    era: 'Late Pleistocene',
    location: 'Flores Island, Indonesia',
    confidence: 'VERIFIED',
    symbol: '👤',
    summary:
      '"The Hobbit" — a 1m-tall hominid with chimp-sized brain (~426 cc) that survived on Flores until ~50,000 years ago, well into the era of modern humans. Local Manggarai oral tradition describes "Ebu Gogo" — small, hairy people who lived in caves — that local elders insisted were real until at least the 1800s.',
    origin:
      'In 2003, an Australian-Indonesian team led by Mike Morwood and Peter Brown discovered LB1 — a partial skeleton at Liang Bua cave on Flores. The specimen was a fully adult female, 106 cm tall, with a brain volume of 426 cc (smaller than a chimpanzee). Initial dates suggested survival until 12,000 years ago; a 2016 redating tightened this to 50,000 years ago, coinciding with the arrival of modern humans on Flores.\n\nThe Manggarai people of Flores have a long oral tradition of the Ebu Gogo — small (~1m tall), long-armed, hairy beings who lived in caves in the Liang Bua area, were tolerated by villagers but eventually driven away after they began stealing food and infants. The last sightings, according to oral tradition, were in the 19th century. Dutch colonial records reference the legends. The intriguing alignment with the Liang Bua finds has fueled speculation that floresiensis or a relict population survived into the historical era.',
    keyEvents: [
      '~700,000 BP: Earliest stone tools on Flores (Mata Menge).',
      '~50,000 BP: Last confirmed Liang Bua remains.',
      '19th c.: Last reported Ebu Gogo sightings (oral tradition).',
      '2003: LB1 skeleton discovered.',
      '2016: Redating to 50,000 BP published in Nature.',
    ],
    evidence: [
      'LB1 partial skeleton + remains of ~9 other individuals.',
      'Stone tools associated with the deposits.',
      'Mata Menge fossils (700,000 BP) showing earlier small hominids on Flores.',
      'Manggarai oral tradition.',
    ],
    skepticalView:
      'No verified Ebu Gogo specimen has ever been recovered. The 50,000 BP extinction date, if correct, leaves a 49,800-year gap between confirmed floresiensis and the oral tradition — making continuity unlikely though not impossible.',
    sources: [
      { label: 'Smithsonian — Homo floresiensis', url: 'https://humanorigins.si.edu/evidence/human-fossils/species/homo-floresiensis' },
    ],
  },
  {
    id: 'denisovans',
    title: 'Denisovans',
    subtitle: 'Siberia → Tibet → Philippines · 200,000 – 30,000 BP',
    category: 'Hominid',
    era: 'Middle to Late Pleistocene',
    location: 'Denisova Cave, Siberia (type site)',
    confidence: 'VERIFIED',
    symbol: '🧬',
    summary:
      'A sister species to Neanderthals, identified entirely from a 2010 DNA analysis of a single finger bone. We have only ~7 confirmed Denisovan fossil fragments worldwide — yet up to 6% of Papuan, Aboriginal Australian, and Filipino DNA is Denisovan, evidence of widespread interbreeding with modern humans.',
    origin:
      'In 2010, Svante Pääbo\'s team at the Max Planck Institute extracted nuclear DNA from a tiny finger-bone fragment found in Denisova Cave in the Altai Mountains of Siberia. The genome revealed a previously unknown hominid lineage that diverged from Neanderthals ~390,000 years ago. Pääbo received the 2022 Nobel Prize in Medicine for the work.\n\nDespite having essentially no fossil record, Denisovan DNA appears in modern populations at striking concentrations: ~5% in Papuan and Aboriginal Australian genomes, up to 6% in Philippine Negrito populations, and 0.2% across mainland East Asia. A 2019 jaw fragment from Baishiya Karst Cave in Tibet (Xiahe mandible) confirmed Denisovans lived at 3,280m altitude — and contributed the EPAS1 gene allowing modern Tibetans to thrive at high altitude. Their range likely covered most of Asia.',
    keyEvents: [
      '~390,000 BP: Denisovan / Neanderthal split.',
      '~50,000 BP: Last common ancestor with modern humans interbreeding.',
      '2010: Genome published from Denisova Cave finger bone.',
      '2019: Xiahe mandible (Tibet) confirmed via collagen proteomics.',
      '2022: Pääbo wins Nobel Prize.',
    ],
    evidence: [
      '~7 confirmed fossil fragments worldwide.',
      'Full Denisovan genome (Meyer et al. 2012).',
      'Modern population genetics confirming widespread admixture.',
      'EPAS1 high-altitude adaptation gene introgressed into Tibetans.',
    ],
    skepticalView:
      'No mystery — Denisovans are now mainstream paleoanthropology. The remaining question is purely how widespread they were and whether multiple Denisovan lineages existed.',
    sources: [
      { label: 'Max Planck Denisova Project', url: 'https://www.eva.mpg.de/genetics/' },
    ],
  },
  {
    id: 'thylacine',
    title: 'Thylacine',
    subtitle: 'Tasmania · officially extinct 1936',
    category: 'Marsupial',
    era: 'Pleistocene → 20th century',
    location: 'Tasmania (Australian mainland to ~3,000 BP)',
    confidence: 'DEBATED',
    symbol: '🐕',
    summary:
      'The Tasmanian tiger — a marsupial wolf, the largest carnivorous marsupial of modern times. Officially extinct since the death of the last captive specimen "Benjamin" at Hobart Zoo on September 7, 1936. Hundreds of post-1936 sightings continue, including a clear 2017 Adelaide Hills photograph and 8 sightings logged by the Tasmanian government in 2017-19.',
    origin:
      'Thylacinus cynocephalus was widespread across the Australian mainland until ~3,000 years ago, when competition with the dingo (introduced by Asian seafarers) eliminated it everywhere except Tasmania. European settlers arrived in Tasmania in 1803; a government bounty paid £1 per adult thylacine from 1888-1909 effectively wiped them out. The last verified specimen, "Benjamin", died of exposure at Hobart Zoo on Sept 7 1936.\n\nThe species was officially declared extinct by the IUCN in 1986, fifty years after the last verified sighting. But hundreds of sightings continued. The Tasmanian government received 8 official sighting reports in 2017-19. Neil Waters\' 2021 photograph from Adelaide Hills sparked global media attention before being identified as a pademelon. In 2022, Colossal Biosciences (the same company resurrecting the woolly mammoth) launched a serious thylacine de-extinction project using preserved DNA.',
    keyEvents: [
      '~3,000 BP: Mainland extinction (dingo competition).',
      '1888-1909: Government bounty period.',
      'Sept 7 1936: Last captive specimen "Benjamin" dies.',
      '1986: IUCN officially declares extinct.',
      '2017: Tasmanian government logs 8 sighting reports.',
      '2022: Colossal Biosciences de-extinction project announced.',
    ],
    evidence: [
      'Last captive Benjamin film footage (1933).',
      'Hundreds of post-1936 eyewitness reports.',
      'Preserved DNA from museum specimens.',
      '2022 Hobart Museum etched-glass plate footage rediscovery.',
    ],
    skepticalView:
      'No verified post-1936 specimen, scat, hair sample, or unambiguous photograph has ever been confirmed. Most sightings turn out to be foxes, feral dogs, or pademelons.',
    sources: [
      { label: 'Colossal Thylacine Project', url: 'https://colossal.com/thylacine/' },
    ],
  },
  {
    id: 'haasts-eagle',
    title: "Haast's Eagle",
    subtitle: 'New Zealand · extinct ~1400 CE',
    category: 'Bird',
    era: 'Holocene',
    location: 'South Island, New Zealand',
    confidence: 'VERIFIED',
    symbol: '🦅',
    summary:
      'The largest eagle ever to have lived, with a 3m wingspan and 15 kg body weight — large enough to attack and kill 250 kg moa (giant flightless birds). Survived in New Zealand until Maori settlers eliminated its food supply ~1400 CE. Maori oral tradition preserves it as the "Pouakai" — a man-eating bird.',
    origin:
      'Hieraaetus moorei was discovered by Julius von Haast in 1871 from bones in a Canterbury swamp. DNA analysis in 2005 revealed it evolved from the small Australian little eagle in only ~700,000 years — an astonishingly fast 10x size increase, made possible by the absence of competitors and the abundance of giant moa as prey.\n\nMaori arrived in New Zealand around 1280 CE. Within ~150 years they had hunted all 11 species of moa to extinction, and the Haast\'s eagle followed shortly after. Maori oral traditions describe the "Pouakai" or "Hokioi" — a giant bird that swooped down on humans. In 2009, researchers Brian Gill and Paul Scofield argued the bird was indeed capable of taking small humans, particularly children — a rare documented case of an animal that hunted humans within historical memory.',
    keyEvents: [
      '~1.8 Mya: Australian ancestor reaches New Zealand.',
      '~1280 CE: Maori arrival.',
      '~1400 CE: Moa and Haast\'s eagle extinction.',
      '1871: Von Haast describes the species.',
      '2005: DNA analysis (Bunce et al.) shows Australian little-eagle origin.',
    ],
    evidence: [
      'Hundreds of skeletal specimens in NZ museum collections.',
      'Rock art depictions in South Island shelters.',
      'Maori oral tradition (Pouakai legends).',
    ],
    skepticalView:
      'No mystery — extinction is well-documented. The only debated detail is whether the bird routinely hunted humans or only occasionally targeted children.',
    sources: [
      { label: 'Te Ara — Encyclopedia of New Zealand', url: 'https://teara.govt.nz/en/extinct-birds/page-3' },
    ],
  },
  {
    id: 'megalodon',
    title: 'Megalodon',
    subtitle: 'Global oceans · 23 Mya – 3.6 Mya',
    category: 'Marine',
    era: 'Miocene to Pliocene',
    location: 'Worldwide warm seas',
    confidence: 'VERIFIED',
    symbol: '🦈',
    summary:
      'Otodus megalodon — the largest macropredatory shark in history. 15-20m long, ~50 tonnes, with 18cm teeth and a bite force of ~108,500 N (more than 10x the great white). Officially extinct 3.6 million years ago. Cryptozoologists have repeatedly argued for surviving deep-ocean populations; mainstream paleontology firmly disagrees.',
    origin:
      'Megalodon teeth have been collected since antiquity (called "tongue stones" by medieval Europeans). The species was named in 1843 by Louis Agassiz from teeth found in the Cenozoic strata of South Carolina. Body-size estimates from associated vertebrae and tooth-row reconstruction give 15-20m length and 50+ tonnes — making it 3x the length of a modern great white.\n\nA 2022 Nature paper by Cooper et al. used 3D reconstruction to estimate the shark could have consumed 100,000-calorie meals (roughly equivalent to an entire orca) in a single bite. The cause of extinction remains debated: cooling oceans, collapse of marine mammal prey populations, or competition from emerging great white sharks. Cryptozoologists cite the 1875 HMS Challenger discovery of an 11cm partially-fossilized tooth dated to as recently as 11,000 years ago — but the dating method (manganese coating thickness) was later debunked.',
    keyEvents: [
      '~23 Mya: Megalodon emerges in the Miocene.',
      '~3.6 Mya: Confirmed extinction.',
      '1843: Agassiz formally names the species.',
      '1875: HMS Challenger expedition recovers tooth from Pacific.',
      '2022: Cooper et al. 3D reconstruction in Science Advances.',
    ],
    evidence: [
      'Thousands of fossilized teeth worldwide.',
      'Vertebral centra (rare; sharks have cartilaginous skeletons).',
      'Cetacean fossils with megalodon bite marks.',
    ],
    skepticalView:
      'The HMS Challenger "recent" date was based on a manganese-coating method that gave false young dates due to deep-sea reworking. Deep-ocean SOFAR channels and modern submersible surveys have produced no evidence of any predator larger than known sperm whales.',
    sources: [
      { label: 'Cooper et al. 2022, Science Advances', url: 'https://www.science.org/doi/10.1126/sciadv.abm9424' },
    ],
  },
  {
    id: 'dyatlov-cryptid',
    title: 'Almasty / Russian Wildman',
    subtitle: 'Caucasus, Pamir, Altai · oral tradition + 20th c. reports',
    category: 'Cryptid',
    era: 'Continuous oral tradition',
    location: 'Central Asian highlands',
    confidence: 'ALLEGED',
    symbol: '🐾',
    summary:
      'Russian and Central Asian counterpart to sasquatch / yeti. Reported by Soviet zoologists Boris Porshnev and Marie-Jeanne Koffmann from the 1950s onward. Koffmann recorded 500+ first-hand witness accounts in the Kabardino-Balkaria region. The 1959 Dyatlov Pass incident has been linked, controversially, to almasty contact.',
    origin:
      'Marie-Jeanne Koffmann, a French-Russian surgeon and Soviet army veteran, spent 50 years from 1958 onward documenting almasty reports in the Caucasus and Pamir mountains. She recorded over 500 first-hand sightings, with a consistent description: bipedal, 1.7-2m tall, covered in reddish-brown hair, with elongated arms and a sloping forehead. Witnesses included shepherds, hunters, and Soviet military personnel.\n\nIn 1958, Boris Porshnev, a respected Soviet historian and anthropologist, formed a Snowman Commission within the Soviet Academy of Sciences to investigate. Porshnev hypothesized almasty might be a relict population of Neanderthals. The 1923 capture and breeding of "Zana", a feral hairy woman in Abkhazia, has been studied by Bryan Sykes (Oxford) — 2015 DNA analysis of her great-grandson found purely African ancestry, suggesting Zana was a runaway slave rather than a Neanderthal.',
    keyEvents: [
      '~1923: Capture of "Zana" in Abkhazia.',
      '1958: Soviet Snowman Commission formed.',
      '1959: Dyatlov Pass incident (controversial link).',
      '1990s: Koffmann publishes monograph on Caucasus almasty.',
      '2015: Sykes DNA analysis of Zana descendants — fully African origin.',
    ],
    evidence: [
      '500+ Koffmann interview transcripts.',
      'Soviet Snowman Commission archives (partially declassified).',
      'Footprint casts from various expeditions.',
      'Zana descendant DNA samples (Sykes).',
    ],
    skepticalView:
      'No verified specimen, no DNA, no skeletal remains. Sykes\' Zana analysis suggests at least that case has a mundane explanation. Soviet scientific interest peaked in the 1960s-70s and has largely faded.',
    sources: [
      { label: 'Bryan Sykes — Yeti, Almasty research', url: 'https://www.disinfo.com/2014/10/yeti-research-bryan-sykes/' },
    ],
  },
  {
    id: 'mokele-mbembe',
    title: 'Mokèlé-Mbèmbé',
    subtitle: 'Likouala swamp, Congo Basin · oral tradition',
    category: 'Cryptid',
    era: 'Continuous oral tradition',
    location: 'Republic of the Congo',
    confidence: 'ALLEGED',
    symbol: '🐉',
    summary:
      'A long-necked, four-limbed creature reported by the Bayaka pygmies and BaAka peoples of the Likouala swamp region — frequently described as resembling a small sauropod dinosaur. Subject of at least a dozen Western expeditions since 1913, none of which have produced verified evidence.',
    origin:
      'Reports of the Mokèlé-Mbèmbé date to French missionary records from 1776. German captain Freiherr von Stein zu Lausnitz produced the first detailed Western account in 1913 from local interviews — describing a creature the size of an elephant with a long neck and tail. Subsequent expeditions (Mackal 1980-83, Regusters 1981, Powell & Mackal 1981, Mackal 1985, Genzoli 2001, Newman 2006-2011) have collected witness testimony but no specimens.\n\nLocal communities consistently describe the creature inhabiting deep swamp lakes, particularly Lake Tele. Roy Mackal\'s 1987 book "A Living Dinosaur?" presented the case for a relict sauropod. Cryptozoologist Bill Gibbons led 6 expeditions between 1985 and 2011. No physical evidence — bones, photographs, video — has emerged. The Likouala swamp region remains one of the least-explored areas on Earth.',
    keyEvents: [
      '1776: First missionary reports.',
      '1913: Von Stein zu Lausnitz expedition.',
      '1980-83: Roy Mackal expeditions.',
      '1981: Regusters claims to have photographed the creature (photos blurred and disputed).',
      '2006-2011: Bill Gibbons multiple expeditions.',
    ],
    evidence: [
      'Continuous oral tradition across multiple ethnic groups.',
      'Witness ID matched with picture-card lineups (consistently selecting sauropod images).',
      'Reported tracks (none preserved as casts).',
    ],
    skepticalView:
      'Mainstream zoology considers a relict sauropod implausible — they would require a breeding population of dozens, leaving abundant carcass and bone evidence. Witness IDs may reflect cultural diffusion of dinosaur imagery via missionaries and Western media.',
    sources: [
      { label: 'Mackal — "A Living Dinosaur?" (1987)', url: 'https://archive.org/details/livingdinosauris0000mack' },
    ],
  },
];

export const extinctCategories = [
  'All',
  'Hominid',
  'Marsupial',
  'Bird',
  'Marine',
  'Cryptid',
];
