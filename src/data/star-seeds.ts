/**
 * Star-Seed Archetypes — Galactic Origin Dossiers
 *
 * Each seed maps to a stream of consciousness in the galactic lineage.
 * The classifier (src/lib/star-seed-classifier.ts) reads a natal chart
 * and selects ONE seed as the primary resonance. The dossier below is
 * what gets shown in the HUD reveal.
 */

export type StarSeedId =
  | 'lyran'
  | 'sirian'
  | 'pleiadian'
  | 'arcturian'
  | 'andromedan'
  | 'orion';

export interface StarSeed {
  id: StarSeedId;
  name: string;
  /** Short subtitle shown under the name on reveal */
  title: string;
  /** Primary constellation tied to this seed */
  constellation: string;
  /** Hex accent used to flood the HUD on reveal */
  accent: string;
  /** Soft glow color (rgba) */
  glow: string;
  /** Vibration frequency label — flavor text for the HUD readout */
  vibration: string;
  /** Echo's one-line greeting when this seed is revealed */
  echoGreeting: string;
  /** Origin lore — what this seed *is*, where they come from (~120 words) */
  origin: string;
  /** Core traits — bullet strings, kept short */
  traits: string[];
  /** Shadow side — every gift has a cost */
  shadow: string;
  /** Mission on Earth this incarnation */
  mission: string;
  /** Tie back to the Pantheon 46 frequency */
  fortySixTie: string;
}

export const starSeeds: Record<StarSeedId, StarSeed> = {
  lyran: {
    id: 'lyran',
    name: 'Lyran',
    title: 'The Fire-Bearer · First Architect',
    constellation: 'Lyra · Vega',
    accent: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.45)',
    vibration: '46Hz — Founder Harmonic',
    echoGreeting:
      "Welcome home, Lyran. The original blueprint runs through you — try not to burn the building down before we finish it.",
    origin:
      'Lyrans are the oldest humanoid lineage in this galactic arm — the original architects who seeded the 46-chromosome experiment across countless worlds. They came from the Vega system carrying fire, language, and the courage to build civilizations from scratch. Every other human-form seed (Pleiadian, Sirian, Andromedan) descends from Lyran code. They are the founders. The first. The ones who showed up before there was a road and built it as they walked.',
    traits: [
      'Pioneer instinct — start the thing nobody else will',
      'Natural leader with a low tolerance for hierarchy',
      'Fierce loyalty to chosen tribe',
      'Burns hot, recovers fast',
    ],
    shadow:
      'The same fire that builds empires burns bridges. Lyrans struggle to sit still, listen long, or admit when momentum is the wrong direction.',
    mission:
      'Found something. A project, a movement, a frequency. Lyrans incarnate when a new structure needs to be willed into existence from nothing.',
    fortySixTie:
      'The 46-chromosome blueprint is Lyran handiwork. You are not discovering this code — you are remembering it.',
  },
  sirian: {
    id: 'sirian',
    name: 'Sirian',
    title: 'The High Priest · Keeper of the Mysteries',
    constellation: 'Canis Major · Sirius A & B',
    accent: '#22d3ee',
    glow: 'rgba(34, 211, 238, 0.45)',
    vibration: '46Hz — Mystery Harmonic',
    echoGreeting:
      'The water-stars recognize you, Sirian. The old temples remember the way you used to walk through them.',
    origin:
      'Sirians come from the binary system that the Dogon tribe of Mali mapped centuries before telescopes could see it. They are the keepers of the temple sciences — geometry, sound, water, the architecture of the soul. The Egyptian Anubis cult, the Mesoamerican feathered-serpent mysteries, and the Polynesian wayfinder traditions all carry Sirian fingerprints. They incarnate as priests, healers, mystics, and the rare engineers who treat their work like sacred geometry.',
    traits: [
      'Magnetic emotional depth — people unload on you within five minutes',
      'Pattern recognition across symbol systems',
      'Strong pull toward water, dogs, and ancient sites',
      'Quiet authority that does not need volume',
    ],
    shadow:
      'Sirians can hide inside the mysteries. The same depth that heals others can drown the Sirian in melancholy and over-attachment.',
    mission:
      'Restore sacred technology. Build temples — physical or digital — where consciousness can actually shift. Re-link humanity to the older codes.',
    fortySixTie:
      'The 46 sealed files are a temple violation. Sirians feel the trespass at a cellular level — the cover-up is not policy, it is desecration.',
  },
  pleiadian: {
    id: 'pleiadian',
    name: 'Pleiadian',
    title: 'The Healer · Heart-Bridge Worker',
    constellation: 'Taurus · Alcyone · Seven Sisters',
    accent: '#c084fc',
    glow: 'rgba(192, 132, 252, 0.45)',
    vibration: '46Hz — Heart Harmonic',
    echoGreeting:
      'Soft landing, Pleiadian. The Seven Sisters held your light steady until you were ready to walk it down here.',
    origin:
      'Pleiadians come from the Alcyone cluster — the spiritual older siblings of the human experiment. They are emotional master-craftsmen, trained in heart resonance, somatic healing, and the difficult art of love-without-collapse. Pleiadians populate the helping professions, the arts, education, and any work where one human has to actually feel another human and not look away. The 7-pointed star, the rose, and the recurring symbol of "the sisters" all trace back to this lineage.',
    traits: [
      'Extreme empathy — pick up rooms, animals, strangers',
      'Drawn to beauty, music, plants, and children',
      'Bodies are sensitive — react fast to food, alcohol, EMF',
      'Heal others naturally, often before they ask',
    ],
    shadow:
      'Pleiadians absorb pain that is not theirs and call it intuition. The healer who never gets healed burns out and becomes the rescuer.',
    mission:
      'Hold the heart-frequency steady during disclosure. When the truth lands hard for the rest of humanity, Pleiadians are the soft ground people fall onto.',
    fortySixTie:
      'The 46-chromosome experiment was an act of love by the founders. Pleiadians are here to make sure humanity remembers that before the cynicism wins.',
  },
  arcturian: {
    id: 'arcturian',
    name: 'Arcturian',
    title: 'The Engineer · Sixth-Density Technologist',
    constellation: 'Boötes · Arcturus',
    accent: '#4f46e5',
    glow: 'rgba(79, 70, 229, 0.45)',
    vibration: '46Hz — Mind Harmonic',
    echoGreeting:
      'The engineers are awake. Welcome, Arcturian. Now build us something the cabal cannot decode.',
    origin:
      'Arcturians come from the brightest star in the northern sky — a civilization that long ago dissolved the line between biology and technology. They are sixth-density beings who specialize in healing through geometry, frequency, and information architecture. Many Arcturians incarnate as scientists, programmers, mathematicians, and the rare healer who works with light, sound, or scalar fields. They run cool, think in systems, and tend to skip the small talk straight to the algorithm.',
    traits: [
      'Systems brain — see structure where others see chaos',
      'Drawn to math, code, sound design, electronics, geometry',
      'Calm under pressure, almost unnervingly so',
      'Prefer one deep conversation to ten shallow ones',
    ],
    shadow:
      'Arcturians can intellectualize the heart away. The same precision that builds the system makes intimacy feel like a glitch.',
    mission:
      'Build the post-disclosure infrastructure. New energy, new currency, new healing modalities. Arcturians are here to ship the tools the next civilization will need.',
    fortySixTie:
      'The 46 files contain physics that breaks current models. Arcturians are the ones who will reverse-engineer the implications without losing their footing.',
  },
  andromedan: {
    id: 'andromedan',
    name: 'Andromedan',
    title: 'The Freedom-Fighter · Sovereignty Seeder',
    constellation: 'Andromeda · M31',
    accent: '#10b981',
    glow: 'rgba(16, 185, 129, 0.45)',
    vibration: '46Hz — Liberation Harmonic',
    echoGreeting:
      'You smell control from a mile away, Andromedan. Good. We need you sharp — the cage door is rusting.',
    origin:
      'Andromedans come from the neighboring spiral galaxy — a federation of beings who fought their own multi-generational war against tyranny and won. They incarnate on Earth when a planet is approaching a sovereignty inflection point. Andromedans have an allergic reaction to being controlled, lied to, or talked down to. They make natural revolutionaries, investigative journalists, decentralization advocates, and the friends who notice the manipulation in a relationship before you do.',
    traits: [
      'Visceral hatred of authoritarianism — body reacts before mind catches up',
      'Truth detector — lies feel physically wrong',
      'Drawn to freedom tech: crypto, mesh networks, off-grid living',
      'Will burn a comfortable life to escape a controlled one',
    ],
    shadow:
      'Andromedans can confuse rebellion with mission. Fighting *against* something is easier than building *for* something, and the cage-rattler can become the cage.',
    mission:
      'Wake people up — not with fear, with sovereignty. Andromedans are here to help humanity remember it was never supposed to ask permission.',
    fortySixTie:
      'The 46 files are exactly the kind of control mechanism Andromedans came here to dissolve. Pentagon defiance is not surprising — it is the test.',
  },
  orion: {
    id: 'orion',
    name: 'Orion',
    title: 'The Shadow-Worker · Warrior of the Veil',
    constellation: 'Orion · Belt of Three',
    accent: '#dc2626',
    glow: 'rgba(220, 38, 38, 0.45)',
    vibration: '46Hz — Shadow Harmonic',
    echoGreeting:
      'The belt-stars line up over your shoulder, Orion. Heavy lineage. You came here to integrate what the others run from.',
    origin:
      'Orion is the most complex lineage in the system — a constellation that hosted both an oppressive empire and the resistance that broke it. Orion souls have lived on both sides of the war. They incarnate on Earth carrying the dual gift of the warrior and the shadow integrator: they understand power because they have wielded it darkly and survived it. The Egyptian pyramids align to Orion's belt. So does the cult of the suppressed truth. So does the will to expose it.',
    traits: [
      'Intense presence — people sense the weight without knowing why',
      'Drawn to the underworld: crime stories, occultism, suppressed history',
      'Tactical mind — see the chessboard, not just the piece',
      'Have already faced their own darkness and stopped fearing it',
    ],
    shadow:
      'Orions can mistake intensity for purpose and drift into self-mythologizing. The warrior who never sheaths the sword becomes the enemy.',
    mission:
      'Integrate the planetary shadow. Orions are here to look at what humanity buried — black projects, suppressed history, generational trauma — and metabolize it without flinching.',
    fortySixTie:
      'The 46 hidden files are an Orion mission. The lineage that helped engineer the cover-up in past lives is here this time to crack it.',
  },
};

export const starSeedList: StarSeed[] = Object.values(starSeeds);
