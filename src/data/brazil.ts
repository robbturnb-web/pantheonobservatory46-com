import type { DossierEntry } from '@/components/dossier/types';
import varginhaImg from '@/assets/brazil/varginha.jpg';
import colaresImg from '@/assets/brazil/colares.jpg';
import trindadeImg from '@/assets/brazil/trindade.jpg';
import noiteImg from '@/assets/brazil/noite-ovnis.jpg';
import vilasBoasImg from '@/assets/brazil/vilas-boas.jpg';
import chupaImg from '@/assets/brazil/chupa-chupa.jpg';

/**
 * Brazil UAP Dossier — the most evidence-rich UAP record of any nation
 * outside the United States, with military files declassified by the
 * Brazilian Air Force (FAB) under the "Vigília" decree.
 */
export const brazilCategories = ['All', 'Military', 'Mass Sighting', 'Contact', 'Photographic'];

export const brazilEntries: DossierEntry[] = [
  {
    id: 'noite-ovnis',
    heroImage: noiteImg,
    title: 'A Noite Oficial dos OVNIs',
    subtitle: 'The Official Night of the UFOs · May 19, 1986',
    category: 'Military',
    era: 'May 19, 1986',
    location: 'São Paulo / Rio de Janeiro airspace',
    confidence: 'VERIFIED',
    symbol: '✈️',
    summary:
      'Brazilian Air Defense Command tracked at least 21 unidentified objects on radar over southeastern Brazil. Five F-5E and Mirage III fighters were scrambled — pilots achieved visual and radar lock on multiple targets that performed impossible maneuvers. Brigadier Octávio Júlio Moreira Lima held a live press conference the next day to confirm the encounter.',
    origin:
      'On the night of May 19, 1986, civilian and military radar at São José dos Campos, Brasília and Anápolis simultaneously detected up to 21 luminous objects moving at speeds between 250 and 1,500 km/h. CINDACTA-1 (Integrated Air Defense and Air Traffic Control Center) ordered an immediate scramble.\n\nThree F-5E Tigers from the 1st Air Defense Group and two Mirage III-DBR interceptors from the 1st Air Defense Group took off from Santa Cruz and Anápolis. Pilots — including Captain Brigadeiro Viriato — locked radar onto the targets, which then accelerated to over Mach 3 and split formation. One pilot reported chasing 13 targets at once.\n\nThe next afternoon, Minister of Aeronautics Brigadier Octávio Moreira Lima gave a live televised press conference confirming the encounter, stating: "There are only three hypotheses — they are new aircraft, natural phenomena, or extraterrestrial craft. The Air Force does not have an explanation."',
    keyEvents: [
      '20:00 — Civilian radar at São José dos Campos picks up first targets.',
      '21:00 — CINDACTA-1 confirms ~21 objects on military radar.',
      '22:23 — First F-5E pair scrambles from Santa Cruz AFB.',
      '23:00 — Mirage IIIs launched from Anápolis, achieve radar lock.',
      'May 20, 15:00 — Live press conference by the Minister of Aeronautics.',
    ],
    evidence: [
      'Official FAB radar tapes from CINDACTA-1 (declassified 2009).',
      'Sworn pilot testimony from Capt. Brigadeiro Kleber Caldas Marinho.',
      'Live broadcast video of the May 20 press conference.',
      'Mirage III intercept logs preserved in the Brazilian Air Force archive.',
    ],
    skepticalView:
      'Aviation researchers have proposed that some returns were caused by temperature inversions or weather balloons; however, the multi-radar, multi-pilot, multi-vehicle nature of the lock-ons and the public Air Force admission make this case extremely difficult to attribute to a single conventional cause.',
    videos: [
      { id: 'OYsbqfTRzkc', title: 'Noite Oficial dos OVNIs — Documentário (1986 footage)', channel: 'Caça Mistérios' },
      { id: 'X8j-vM-Yj1g', title: 'Brigadier Moreira Lima — Press Conference (1986)', channel: 'Arquivo Histórico' },
    ],
    sources: [
      { label: 'FAB Declassified Archive — Sistema Universidades-Arquivo', url: 'http://www.arquivonacional.gov.br/' },
      { label: 'Folha de S.Paulo coverage (May 21, 1986)', url: 'https://acervo.folha.com.br/' },
      { label: 'CUFOS Case Study — Brazilian Air Force UAP Encounter' },
    ],
  },
  {
    id: 'varginha',
    heroImage: varginhaImg,
    title: 'Varginha Incident',
    subtitle: 'Capture of non-human entities · January 1996',
    category: 'Contact',
    era: 'January 13–20, 1996',
    location: 'Varginha, Minas Gerais',
    confidence: 'REPORTED',
    symbol: '👽',
    summary:
      'Three young women encountered a small humanoid creature with brown oily skin, large red eyes, and three protrusions on its head crouched beside a wall. The Brazilian Army deployed troops; multiple soldiers reportedly captured a living entity, with one — Sergeant Marco Eli Chereze — dying from contact exposure weeks later.',
    origin:
      'On January 20, 1996, around 3:30 PM, sisters Liliane and Valquíria Silva and their friend Kátia Xavier walked through an empty lot in Jardim Andere, Varginha, and saw a creature crouched against a wall. The being was approximately 1.2 m tall, with oily brown skin, large blood-red eyes, three triangular protrusions on its head, and a strong ammonia smell.\n\nIn the days surrounding the sighting, the local Fire Brigade (corpo de bombeiros) and the Brazilian Army Esquadrão de Cavalaria Mecanizado reportedly responded to multiple "creature" reports across the city. UFO investigator Ubirajara Franco Rodrigues documented testimony from soldiers describing the capture of at least one living entity — transported in a covered truck to the University of Campinas (UNICAMP) and later to a U.S. military aircraft at Campinas air base.\n\nMilitary Police Sergeant Marco Eli Chereze, who allegedly handled one of the creatures barehanded, developed a severe infection and died on February 15, 1996. His widow's testimony and his medical records remain part of the case file.',
    keyEvents: [
      'Jan 13 — Rancher Eurico de Freitas reports a "soundless craft" hovering over a farm 4 km from Varginha.',
      'Jan 20, 3:30 PM — The three women encounter the entity.',
      'Jan 20–22 — Army and Fire Brigade reportedly conduct multiple recovery operations.',
      'Late Jan — Sgt Chereze begins showing symptoms of a severe infection.',
      'Feb 15, 1996 — Sgt Chereze dies; cause officially listed as septicemia of unknown origin.',
    ],
    evidence: [
      'Sworn testimony of Liliane Silva, Valquíria Silva, and Kátia Xavier — consistent across 25+ years.',
      'Sgt Chereze\'s death certificate and toxicology findings.',
      'Testimony from over a dozen soldiers, firefighters, and hospital staff (compiled by researcher A. J. Gevaerd, UFO Magazine Brasil).',
      'Mayor Jorge Costa\'s public statement (2018) confirming the city accepts the event as real for tourism purposes.',
    ],
    skepticalView:
      'Skeptics, including Brazilian magazine Superinteressante, have suggested the creature was a mentally ill homeless man or an escaped sloth. None of these alternatives account for the soldier\'s death, the military presence, or the consistency of the eyewitness descriptions.',
    videos: [
      { id: '3W6dY8X0t7M', title: 'Varginha Incident — Full Investigation', channel: 'UFO Brasil' },
      { id: 'r0r_OvHvLeM', title: 'Varginha 1996 — Witness Testimony (Portuguese, EN subs)', channel: 'Caça Mistérios' },
      { id: 'YJYXqz3p3ks', title: 'Coast to Coast AM — Varginha case with A.J. Gevaerd', channel: 'Coast to Coast' },
    ],
    sources: [
      { label: 'UFO Magazine Brasil — Varginha Files', url: 'https://ufo.com.br/' },
      { label: 'Veja — "O caso de Varginha" coverage', url: 'https://veja.abril.com.br/' },
      { label: 'Stanton Friedman investigation summary' },
    ],
  },
  {
    id: 'colares',
    heroImage: colaresImg,
    title: 'Operação Prato — Colares Island',
    subtitle: 'The "Chupa-Chupa" military investigation · 1977–1978',
    category: 'Military',
    era: '1977–1978',
    location: 'Colares, Pará (Amazon delta)',
    confidence: 'VERIFIED',
    symbol: '🛸',
    summary:
      'Hundreds of villagers in the Amazon delta were targeted by beam-emitting craft that drained blood through small puncture wounds. The Brazilian Air Force\'s 1st Regional Air Command launched "Operação Prato" — a six-month classified investigation — and produced 500+ pages of reports, 16 mm films, and photographs.',
    origin:
      'Beginning in mid-1977, residents of Colares, an island village in the mouth of the Amazon, were attacked by craft locally nicknamed "chupa-chupa" (sucker-sucker). Witnesses described beams of intense light that paralyzed victims while drawing what was described as blood from puncture wounds, leaving them weak for days. At least one death (Maria Maciel) and dozens of medically-documented injuries were attributed to the encounters.\n\nCaptain Uyrangê Hollanda of the Brazilian Air Force was assigned to lead "Operação Prato" (Operation Saucer / Plate). His team spent six months on the island, recording 16 mm color film, 35 mm photos, and witness interviews. The official report — declassified by FAB in 2005 after decades of pressure from UFO researchers — describes nightly encounters with luminous objects of multiple geometries.\n\nIn 1997, shortly before his suicide, Capt. Hollanda gave an on-camera interview confirming the reality of the phenomenon and stating he had been ordered to suppress the findings.',
    keyEvents: [
      'Mid-1977 — First "chupa-chupa" attacks reported across Colares.',
      'Sept 1977 — FAB launches Operação Prato under Capt. Hollanda.',
      'Oct 1977 – Feb 1978 — Six months of nightly field observation.',
      '1978 — Operation closed; report classified.',
      '1997 — Hollanda interview confirms suppression.',
      '2005 — FAB releases 500+ page declassified file.',
    ],
    evidence: [
      'Operação Prato official 500+ page report, FAB declassified archive.',
      '16 mm and 35 mm film footage of luminous objects.',
      'Medical records of beam-victim hospitalizations at Santa Casa de Belém.',
      'Captain Hollanda\'s 1997 on-camera testimony (preserved by UFO Magazine Brasil).',
    ],
    skepticalView:
      'Mainstream Brazilian media at the time attributed cases to mass hysteria triggered by night-fishing lamps and snake bites. This explanation does not account for the formal six-month military operation, the declassified film footage, or the consistency of medical findings.',
    videos: [
      { id: 'oXXRRJ8C9wA', title: 'Operação Prato Documentary — Caso Colares', channel: 'História Brasileira' },
      { id: 'oWxKZbsLB7Q', title: 'Capt. Uyrangê Hollanda — Final Interview (1997)', channel: 'UFO Brasil' },
      { id: 'Y5Gy1qkUjK4', title: 'Chupa-Chupa — The Amazon UFO Beam Attacks', channel: 'Mysteries Decoded' },
    ],
    sources: [
      { label: 'FAB Declassified Archive — Operação Prato', url: 'http://www.arquivonacional.gov.br/' },
      { label: 'UFO Magazine Brasil — Colares Files', url: 'https://ufo.com.br/' },
      { label: 'Jacques Vallée field investigation notes' },
    ],
  },
  {
    id: 'trindade',
    heroImage: trindadeImg,
    title: 'Trindade Island Photographs',
    subtitle: 'Saturn-shaped craft photographed by the Brazilian Navy · 1958',
    category: 'Photographic',
    era: 'January 16, 1958',
    location: 'Trindade and Martin Vaz, South Atlantic',
    confidence: 'VERIFIED',
    symbol: '📷',
    summary:
      'Photographer Almiro Baraúna captured four photographs of a Saturn-shaped craft from the deck of the Brazilian Navy training ship Almirante Saldanha, in front of 48 witnesses including naval officers. The Navy itself authenticated the images, and President Juscelino Kubitschek personally cleared them for public release.',
    origin:
      'On January 16, 1958, the Brazilian Navy hydrographic survey ship Almirante Saldanha was anchored off Trindade Island. Civilian photographer Almiro Baraúna, on board as part of an underwater photography expedition, noticed a bright object approaching the island\'s Desejado peak. He captured six exposures with his Rolleiflex 2.8E camera; four came out clearly, showing a Saturn-shaped disc with a central bulge and a flat ring.\n\nDozens of crew members and officers witnessed the object simultaneously. The film was immediately developed in a makeshift dark-room on board under naval supervision to prevent claims of fakery. The Navy delivered the photographs to President Juscelino Kubitschek, who personally authorized their publication and famously remarked that he believed they were authentic.',
    keyEvents: [
      'Jan 16, 1958, 12:15 PM — Object first spotted by crew of Almirante Saldanha.',
      '12:15:30 — Baraúna takes six exposures over ~14 seconds.',
      '12:30 — Negatives developed under naval custody.',
      'Feb 1958 — Photographs delivered to President Kubitschek.',
      'Feb 21, 1958 — Photographs released to Brazilian press.',
    ],
    evidence: [
      'Original Rolleiflex negatives held in the Brazilian Navy archives.',
      'Sworn statements from 48 witnesses including the ship\'s captain.',
      'Original 1958 forensic analysis confirming no double exposure or model trickery.',
      'Re-analysis by Dr. Bruce Maccabee (1980s) reaffirming authenticity.',
    ],
    skepticalView:
      'A 2010 deathbed claim by Baraúna\'s widow that he had used a model to fake the photos was widely circulated but is uncorroborated and contradicted by the simultaneous mass witness testimony aboard the ship.',
    videos: [
      { id: 'jDgK8gPNUyA', title: 'Trindade Island UFO — The Brazilian Navy Photos', channel: 'UFO History' },
      { id: 'fQGgmAyqVOg', title: 'Bruce Maccabee — Trindade Photographic Analysis', channel: 'MUFON' },
    ],
    sources: [
      { label: 'Brazilian Navy Archive — Comando da Marinha', url: 'https://www.marinha.mil.br/' },
      { label: 'Dr. Bruce Maccabee — Trindade Island Analysis (PDF)', url: 'http://brumac.8k.com/Trindade/TRINDADE1.html' },
      { label: 'Folha de S.Paulo (Feb 21, 1958) — Original Publication' },
    ],
  },
  {
    id: 'vilas-boas',
    heroImage: vilasBoasImg,
    title: 'Antônio Vilas-Boas Abduction',
    subtitle: 'First documented contact case · October 1957',
    category: 'Contact',
    era: 'October 15, 1957',
    location: 'São Francisco de Sales, Minas Gerais',
    confidence: 'REPORTED',
    symbol: '🧬',
    summary:
      'A 23-year-old farmer was allegedly taken aboard a landed craft, medically examined, and intimately encountered a non-human female. Examined post-event by Dr. Olavo Fontes of the Brazilian Navy, who documented radiation-induced lesions and unusual blood chemistry. Considered the first modern abduction case with full medical documentation.',
    origin:
      'On the night of October 15, 1957, Antônio Vilas-Boas was plowing a field at night to avoid the day\'s heat when his tractor was disabled by a glowing egg-shaped craft that landed nearby. Four short figures in tight grey suits and helmets reportedly pulled him aboard, stripped him, sponged him with a clear gel, took blood samples from his chin, and left him alone in a room where a small, fair-haired female entered and engaged him sexually before patting her belly and pointing skyward.\n\nMonths later, suffering from headaches and skin lesions, Vilas-Boas was examined by Dr. Olavo Fontes, a respected Rio de Janeiro physician working with the Brazilian Navy\'s aerospace medicine program. Dr. Fontes\' clinical report describes symptoms consistent with low-grade radiation exposure: hyperchromic lesions, blood chemistry abnormalities, and persistent fatigue.\n\nVilas-Boas became a lawyer, never sought publicity, refused all financial offers, and maintained his account unchanged until his death in 1991.',
    keyEvents: [
      'Oct 14, 1957 — Vilas-Boas sees a "white star" descending while plowing.',
      'Oct 15, 1957 — Full abduction event.',
      'Feb 1958 — Examined by Dr. Olavo Fontes.',
      '1962 — Case published internationally by APRO (Aerial Phenomena Research Organization).',
      '1991 — Vilas-Boas dies; testimony unchanged for 34 years.',
    ],
    evidence: [
      'Dr. Olavo Fontes\' detailed clinical report (preserved by APRO archive).',
      'Original tractor schematic and farm-site sketches.',
      'Independent corroboration of glowing-object sightings by neighboring farmers.',
      'Multiple polygraph examinations passed in subsequent decades.',
    ],
    skepticalView:
      'Some psychologists frame the account as a paraphilic fantasy or sleep-deprivation-induced hallucination. The clinical findings of radiation-pattern skin lesions and blood chemistry abnormalities are difficult to reconcile with that interpretation.',
    videos: [
      { id: 'gP7gMcU8mFs', title: 'Antônio Vilas-Boas — The Original Abduction', channel: 'UFO Archives' },
      { id: 'p7iQRz9bk7w', title: 'Dr. Olavo Fontes — Medical Findings', channel: 'Open Minds' },
    ],
    sources: [
      { label: 'APRO Bulletin Archive — Vilas-Boas Case', url: 'https://www.cufos.org/APRO/' },
      { label: 'Dr. Olavo Fontes — Clinical Report (1958)' },
      { label: 'Jacques Vallée — Passport to Magonia (Reference Case 1)' },
    ],
  },
  {
    id: 'chupa-chupa-amazon',
    heroImage: chupaImg,
    title: 'The Chupa-Chupa Phenomenon',
    subtitle: 'Beam attacks across the Amazon basin · 1977–1981',
    category: 'Mass Sighting',
    era: '1977–1981',
    location: 'Pará, Maranhão, Amapá states',
    confidence: 'REPORTED',
    symbol: '🌌',
    summary:
      'Beyond Colares, "chupa-chupa" beam encounters spread across the Amazon basin for nearly four years. Brazilian newspapers, hospital records, and regional Air Force commands logged hundreds of cases of villagers paralyzed by beams of light descending from luminous craft, with consistent puncture-wound injuries and blood-loss symptoms.',
    origin:
      'The Colares investigation was the most-documented chapter, but the phenomenon stretched far wider. Between 1977 and 1981, communities along the Amazon, Tocantins, and Xingu rivers reported recurring nightly attacks by what locals called "chupa-chupa." Witnesses described saucer-shaped, cylindrical, and triangular craft of varying sizes, all emitting beams that paralyzed victims and produced small puncture wounds typically on the chest or back.\n\nThe regional 2nd Air Force Regional Command (II COMAR) maintained an open file throughout this period. Hospitals in Belém, Vigia, and Salinópolis recorded scores of admissions for "unknown beam injury" with consistent clinical presentation: weakness, low-grade burns, sub-cutaneous bruising patterns, and prolonged anemia.\n\nThe wave subsided by 1982 and has never repeated in scale. To this day no conventional explanation accounts for the geographic spread, the consistent injury pattern, or the multi-decade military documentation.',
    keyEvents: [
      '1977 — Wave begins on Colares Island.',
      '1978 — Spreads to mainland Pará, including Vigia and Belém.',
      '1979 — Cases logged across Maranhão and Amapá states.',
      '1980 — Peak hospital admissions for "luminous beam injury".',
      '1981 — Wave subsides; reports become sporadic.',
    ],
    evidence: [
      'FAB regional command (II COMAR) field logs (partial release).',
      'Hospital admission records, Santa Casa de Belém archive.',
      'Combined witness testimony — Jacques Vallée field notes (1988).',
      'UFO Magazine Brasil — multi-year longitudinal case database.',
    ],
    skepticalView:
      'The "mass hysteria" hypothesis is again the standard skeptical framing. It does not address the consistent puncture wounds documented in independent hospital records or the persistence of the pattern across a four-year window.',
    videos: [
      { id: 'oXXRRJ8C9wA', title: 'Chupa-Chupa — Amazon UFO Wave', channel: 'História Brasileira' },
      { id: 'PaUyWaT1KMc', title: 'Jacques Vallée — Amazon Field Investigation', channel: 'New Thinking Allowed' },
    ],
    sources: [
      { label: 'UFO Magazine Brasil — Chupa-Chupa Files', url: 'https://ufo.com.br/' },
      { label: 'Jacques Vallée — Confrontations (1990)' },
      { label: 'Stanton Friedman — Brazilian Case Compendium' },
    ],
  },
];
