export type DocStatus = 'streaming' | 'theatrical' | 'free' | 'upcoming';

export interface Documentary {
  id: string;
  title: string;
  year: number;
  director: string;
  runtime?: string;
  status: DocStatus;
  topics: string[];
  synopsis: string;
  trailerYouTubeId?: string;
  officialUrl?: string;
  watchUrl?: string;
  notes?: string;
}

export const documentaries: Documentary[] = [
  {
    id: 'age-of-disclosure',
    title: 'The Age of Disclosure',
    year: 2025,
    director: 'Dan Farah',
    runtime: '109 min',
    status: 'theatrical',
    topics: ['UAP', 'Disclosure', 'Whistleblowers', 'Congress'],
    synopsis:
      'Premiered at SXSW 2025. Thirty-four U.S. military, intelligence, and government officials — including Sen. Marco Rubio, Sen. Kirsten Gillibrand, Lue Elizondo, David Grusch, and Chris Mellon — go on the record about an 80-year cover-up of non-human intelligence and the active retrieval of crashed craft. The most credentialed disclosure documentary ever filmed.',
    trailerYouTubeId: 'DkU7ZqbADRs',
    officialUrl: 'https://theageofdisclosure.com',
    watchUrl: 'https://www.amazon.com/Age-Disclosure-David-Grusch/dp/B0F8N5Y9XZ',
  },
  {
    id: 'patient-seventeen',
    title: 'Patient Seventeen',
    year: 2017,
    director: 'Jeremy Corbell',
    runtime: '81 min',
    status: 'streaming',
    topics: ['Abductions', 'Implants', 'Surgery'],
    synopsis:
      'Corbell follows Dr. Roger Leir as he surgically removes a metallic implant from "Patient 17" — an object the patient claims was placed during a non-human encounter. Independent lab analysis follows.',
    // Trailer not embeddable — page falls back to Watch CTA (Tubi / official site)
    watchUrl: 'https://tubitv.com/movies/100038651/patient-seventeen',
    officialUrl: 'https://www.extraordinarybeliefs.com',
  },
  {
    id: 'hunt-skinwalker',
    title: 'Hunt for the Skinwalker',
    year: 2018,
    director: 'Jeremy Corbell',
    runtime: '90 min',
    status: 'streaming',
    topics: ['Skinwalker Ranch', 'Paranormal', 'DIA'],
    synopsis:
      'The full classified-era story of Skinwalker Ranch, the AAWSAP/BAASS program, and physicist Eric Davis. Built around interviews with the intelligence-funded scientists who lived through the high-strangeness.',
    watchUrl: 'https://www.amazon.com/Hunt-Skinwalker-George-Knapp/dp/B07HJBJTV5',
    officialUrl: 'https://www.huntfortheskinwalker.com',
  },

  {
    id: 'bob-lazar-area-51',
    title: 'Bob Lazar: Area 51 & Flying Saucers',
    year: 2018,
    director: 'Jeremy Corbell',
    runtime: '95 min',
    status: 'streaming',
    topics: ['Bob Lazar', 'Area 51', 'S-4', 'Element 115'],
    synopsis:
      'The definitive Bob Lazar profile. His S-4 testimony, element 115 reactor claims, and the FBI raid on his property — narrated by Mickey Rourke. Pushed Lazar back into mainstream discourse on Joe Rogan and beyond.',
    trailerYouTubeId: 'JzQkVGOFQTY',
    officialUrl: 'https://www.extraordinarybeliefs.com',
    watchUrl: 'https://www.netflix.com/title/81074513',
  },
  {
    id: 'the-program',
    title: 'The Program',
    year: 2024,
    director: 'Jeremy Corbell',
    runtime: 'Series',
    status: 'streaming',
    topics: ['UAP', 'Black Programs', 'AARO'],
    synopsis:
      'Corbell\'s ongoing investigative series with George Knapp — leaked footage, classified-program insiders, and live UAP analysis. Drops episodes on the Weaponized podcast feed.',
    officialUrl: 'https://www.weaponizedpodcast.com',
    notes: 'New episodes drop irregularly. Watch the @JeremyCorbell X account for releases.',
  },
  {
    id: 'the-phenomenon',
    title: 'The Phenomenon',
    year: 2020,
    director: 'James Fox',
    runtime: '99 min',
    status: 'streaming',
    topics: ['UAP', 'Pentagon', 'Cold War'],
    synopsis:
      'James Fox\'s landmark documentary — first to feature on-camera testimony from Sen. Harry Reid, John Podesta, Cmdr. David Fravor, and the children of the Ariel School encounter (Zimbabwe, 1994). The film that legitimized UAP discourse pre-Grusch.',
    trailerYouTubeId: 'XjJomA4NDQI',
    officialUrl: 'https://www.thephenomenonfilm.com',
  },
  {
    id: 'moment-of-contact',
    title: 'Moment of Contact',
    year: 2022,
    director: 'James Fox',
    runtime: '113 min',
    status: 'streaming',
    topics: ['Varginha', 'Brazil', 'Mass Encounter'],
    synopsis:
      'Deep-dive into the 1996 Varginha, Brazil incident — multiple witnesses, military recovery, and the rumored capture of two non-human entities. The most credible mass encounter of the modern era.',
    trailerYouTubeId: 'rH4SVbZk-Yc',
    officialUrl: 'https://www.thephenomenonfilm.com/moment-of-contact',
  },
  {
    id: 'unacknowledged',
    title: 'Unacknowledged',
    year: 2017,
    director: 'Steven Greer',
    runtime: '103 min',
    status: 'streaming',
    topics: ['Disclosure Project', 'Black Budget', 'Whistleblowers'],
    synopsis:
      'Dr. Steven Greer\'s Disclosure Project testimony — hundreds of military, intelligence, and corporate insiders on the record. Argues a parallel unacknowledged special access program controls reverse-engineered craft.',
    trailerYouTubeId: 'i7czbg6Pj4Q',
    officialUrl: 'https://siriusdisclosure.com',
  },
  {
    id: 'close-encounters-fifth',
    title: 'Close Encounters of the Fifth Kind',
    year: 2020,
    director: 'Steven Greer',
    runtime: '146 min',
    status: 'streaming',
    topics: ['CE-5', 'Consciousness', 'Contact'],
    synopsis:
      'Greer\'s framework for "consciousness-assisted contact" (CE-5) — meditation-induced craft sightings, witness protocols, and the case for non-hostile contact.',
    trailerYouTubeId: 'I3bWyhE6Wfg',
    officialUrl: 'https://siriusdisclosure.com',
  },
];

export const docTopics = Array.from(
  new Set(documentaries.flatMap((d) => d.topics))
).sort();
