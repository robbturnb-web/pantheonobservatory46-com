export type VoiceRating = 'GREEN' | 'YELLOW' | 'RED';
export type VoiceTopic =
  | 'Whistleblower'
  | 'Documentary'
  | 'Channeled'
  | 'Science'
  | 'Politics'
  | 'Skeptic-Turned'
  | 'Tech';

export interface TikTokVoice {
  id: string;
  creator: string;
  handle: string;
  quote: string;
  topic: string;
  topics: VoiceTopic[];
  url: string;
  /** TikTok video ID — used to embed the player in-app. */
  videoId?: string;
  /** Username for embed (no @). */
  username?: string;
  rating: VoiceRating;
}

export const tiktokVoices: TikTokVoice[] = [
  {
    id: 'corbell-leaks',
    creator: 'Jeremy Corbell',
    handle: '@jeremycorbell',
    username: 'jeremycorbell',
    quote: 'We have surviving non-human biologics. The debrief is real.',
    topic: 'Leaked documents · Surviving aliens · Weaponized debriefs',
    topics: ['Whistleblower', 'Documentary'],
    url: 'https://www.tiktok.com/@jeremycorbell',
    rating: 'GREEN',
  },
  {
    id: 'elizondo-batch2',
    creator: 'Luis Elizondo',
    handle: '@luiselizondo',
    quote: 'A second batch of UFO files is coming. The dam is breaking.',
    topic: 'AATIP · Pentagon UAP · Fox News appearance',
    topics: ['Whistleblower', 'Politics'],
    url: 'https://www.tiktok.com/search?q=luis%20elizondo',
    rating: 'GREEN',
  },
  {
    id: 'age-of-disclosure',
    creator: 'Age of Disclosure',
    handle: '@ageofdisclosure',
    username: 'ageofdisclosure',
    quote: 'I did not believe any of this. Now I do. The evidence is overwhelming.',
    topic: 'Skeptic-turned-believer · Documentary clips',
    topics: ['Documentary', 'Skeptic-Turned'],
    url: 'https://www.tiktok.com/@ageofdisclosure',
    rating: 'GREEN',
  },
  {
    id: 'amy-eskridge',
    creator: 'Amy Eskridge',
    handle: '@amyeskridge',
    quote: 'These burn marks prove energy weapons exist. Anti-gravity is real.',
    topic: 'Anti-gravity research · Energy attacks · Suppressed tech',
    topics: ['Science', 'Tech'],
    url: 'https://www.tiktok.com/search?q=amy%20eskridge',
    rating: 'YELLOW',
  },
  {
    id: 'jack-kruse',
    creator: 'Dr. Jack Kruse',
    handle: '@drjackkruse',
    quote: 'Sunlight is the medicine they buried. Quantum biology is the key.',
    topic: 'DARPA mind control · Quantum biology · Light medicine',
    topics: ['Science'],
    url: 'https://www.tiktok.com/search?q=jack%20kruse',
    rating: 'YELLOW',
  },
  {
    id: 'bashar',
    creator: 'Bashar (Darryl Anka)',
    handle: '@basharchannel',
    quote: 'The 40-year cycle completes in 2027. The turning point is locked.',
    topic: 'Channeled insight · 2027 contact · Cycle theory',
    topics: ['Channeled'],
    url: 'https://www.tiktok.com/search?q=bashar',
    rating: 'RED',
  },
  {
    id: 'spielberg-disclosure',
    creator: 'Steven Spielberg',
    handle: 'Disclosure Day',
    quote: 'There should be a global Disclosure Day. The public deserves the truth.',
    topic: 'Cultural disclosure · Mainstream cracks',
    topics: ['Politics', 'Documentary'],
    url: 'https://www.tiktok.com/search?q=spielberg%20disclosure%20day',
    rating: 'GREEN',
  },
  {
    id: 'ocean-bases',
    creator: 'Disclosure Files',
    handle: '@disclosurefiles',
    quote: 'USOs are entering and exiting ocean bases worldwide. Navy has the tapes.',
    topic: 'Underwater anomalies · Transmedium craft',
    topics: ['Whistleblower'],
    url: 'https://www.tiktok.com/search?q=USO%20ocean%20bases',
    rating: 'YELLOW',
  },
  {
    id: 'grusch',
    creator: 'David Grusch',
    handle: '@davidgrusch',
    quote: 'Decades-long crash retrieval program. Non-human craft and bodies recovered.',
    topic: 'Congressional testimony · Crash retrieval · Reverse engineering',
    topics: ['Whistleblower', 'Politics'],
    url: 'https://www.tiktok.com/search?q=david%20grusch',
    rating: 'GREEN',
  },
  {
    id: 'fravor',
    creator: 'Cmdr. David Fravor',
    handle: '@davidfravor',
    quote: 'The Tic Tac out-maneuvered our jets. Nothing we have moves like that.',
    topic: 'Nimitz encounter · Pilot eyewitness · Sworn testimony',
    topics: ['Whistleblower'],
    url: 'https://www.tiktok.com/search?q=david%20fravor%20tic%20tac',
    rating: 'GREEN',
  },
  {
    id: 'mellon',
    creator: 'Christopher Mellon',
    handle: '@chrismellon',
    quote: 'The Pentagon has been hiding UAP data from Congress for decades.',
    topic: 'Former DoD · Oversight · Disclosure advocacy',
    topics: ['Politics', 'Whistleblower'],
    url: 'https://www.tiktok.com/search?q=christopher%20mellon',
    rating: 'GREEN',
  },
  {
    id: 'coulthart',
    creator: 'Ross Coulthart',
    handle: '@rosscoulthart',
    quote: 'Multiple sources confirm crash retrievals. The story is real.',
    topic: 'Investigative journalism · Grusch interviews · NewsNation',
    topics: ['Documentary'],
    url: 'https://www.tiktok.com/search?q=ross%20coulthart',
    rating: 'GREEN',
  },
  {
    id: 'knapp',
    creator: 'George Knapp',
    handle: '@georgeknapp',
    quote: 'Bob Lazar told us about Element 115 in 1989. He was right.',
    topic: 'Lazar interviews · Skinwalker Ranch · Decades of UAP reporting',
    topics: ['Documentary'],
    url: 'https://www.tiktok.com/search?q=george%20knapp',
    rating: 'GREEN',
  },
  {
    id: 'sheehan',
    creator: 'Daniel Sheehan',
    handle: '@danielsheehan',
    quote: 'I represented whistleblowers since the 70s. Disclosure is constitutional.',
    topic: 'Constitutional lawyer · Disclosure project · Whistleblower counsel',
    topics: ['Politics', 'Whistleblower'],
    url: 'https://www.tiktok.com/search?q=daniel%20sheehan%20disclosure',
    rating: 'YELLOW',
  },
  {
    id: 'nolan',
    creator: 'Dr. Garry Nolan',
    handle: '@garrynolan',
    quote: 'We have materials. They show isotopic ratios unlike anything natural.',
    topic: 'Stanford immunology · UAP materials analysis · Galileo Project',
    topics: ['Science'],
    url: 'https://www.tiktok.com/search?q=garry%20nolan',
    rating: 'GREEN',
  },
  {
    id: 'loeb',
    creator: 'Avi Loeb',
    handle: '@aviloeb',
    quote: 'We recovered spherules from the ocean floor with anomalous composition.',
    topic: 'Harvard · Galileo Project · Interstellar material',
    topics: ['Science'],
    url: 'https://www.tiktok.com/search?q=avi%20loeb',
    rating: 'GREEN',
  },
  {
    id: 'burchett',
    creator: 'Rep. Tim Burchett',
    handle: '@timburchett',
    quote: "We're being lied to. Congress deserves answers and so do the people.",
    topic: 'Congressional hearings · UAP transparency · Oversight',
    topics: ['Politics'],
    url: 'https://www.tiktok.com/search?q=tim%20burchett%20uap',
    rating: 'GREEN',
  },
  {
    id: 'luna',
    creator: 'Rep. Anna Paulina Luna',
    handle: '@annapaulinaluna',
    quote: 'I demanded the 46 files. The Pentagon missed the deadline.',
    topic: 'Task Force on Declassification · The 46 letter',
    topics: ['Politics'],
    url: 'https://www.tiktok.com/search?q=anna%20paulina%20luna',
    rating: 'GREEN',
  },
];
