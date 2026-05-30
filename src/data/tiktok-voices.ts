export interface TikTokVoice {
  id: string;
  creator: string;
  handle: string;
  quote: string;
  topic: string;
  url: string;
  rating: 'GREEN' | 'YELLOW' | 'RED';
}

export const tiktokVoices: TikTokVoice[] = [
  {
    id: 'corbell-leaks',
    creator: 'Jeremy Corbell',
    handle: '@jeremycorbell',
    quote: 'We have surviving non-human biologics. The debrief is real.',
    topic: 'Leaked documents · Surviving aliens · Weaponized debriefs',
    url: 'https://www.tiktok.com/@jeremycorbell',
    rating: 'GREEN',
  },
  {
    id: 'elizondo-batch2',
    creator: 'Luis Elizondo',
    handle: '@luiselizondo',
    quote: 'A second batch of UFO files is coming. The dam is breaking.',
    topic: 'AATIP · Pentagon UAP · Fox News appearance',
    url: 'https://www.tiktok.com/search?q=luis%20elizondo',
    rating: 'GREEN',
  },
  {
    id: 'age-of-disclosure',
    creator: 'Age of Disclosure',
    handle: '@ageofdisclosure',
    quote: 'I did not believe any of this. Now I do. The evidence is overwhelming.',
    topic: 'Skeptic-turned-believer · Documentary clips',
    url: 'https://www.tiktok.com/search?q=age%20of%20disclosure',
    rating: 'GREEN',
  },
  {
    id: 'amy-eskridge',
    creator: 'Amy Eskridge',
    handle: '@amyeskridge',
    quote: 'These burn marks prove energy weapons exist. Anti-gravity is real.',
    topic: 'Anti-gravity research · Energy attacks · Suppressed tech',
    url: 'https://www.tiktok.com/search?q=amy%20eskridge',
    rating: 'YELLOW',
  },
  {
    id: 'jack-kruse',
    creator: 'Dr. Jack Kruse',
    handle: '@drjackkruse',
    quote: 'Sunlight is the medicine they buried. Quantum biology is the key.',
    topic: 'DARPA mind control · Quantum biology · Light medicine',
    url: 'https://www.tiktok.com/search?q=jack%20kruse',
    rating: 'YELLOW',
  },
  {
    id: 'bashar',
    creator: 'Bashar (Darryl Anka)',
    handle: '@basharchannel',
    quote: 'The 40-year cycle completes in 2027. The turning point is locked.',
    topic: 'Channeled insight · 2027 contact · Cycle theory',
    url: 'https://www.tiktok.com/search?q=bashar',
    rating: 'RED',
  },
  {
    id: 'spielberg-disclosure',
    creator: 'Steven Spielberg',
    handle: 'Disclosure Day',
    quote: 'There should be a global Disclosure Day. The public deserves the truth.',
    topic: 'Cultural disclosure · Mainstream cracks',
    url: 'https://www.tiktok.com/search?q=spielberg%20disclosure%20day',
    rating: 'GREEN',
  },
  {
    id: 'ocean-bases',
    creator: 'Disclosure Files',
    handle: '@disclosurefiles',
    quote: 'USOs are entering and exiting ocean bases worldwide. Navy has the tapes.',
    topic: 'Underwater anomalies · Transmedium craft',
    url: 'https://www.tiktok.com/search?q=USO%20ocean%20bases',
    rating: 'YELLOW',
  },
];
