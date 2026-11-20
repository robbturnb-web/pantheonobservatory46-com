import type { Citation, MediaKind } from '@/lib/evidence';

export interface MediaResource extends Citation {
  kind: MediaKind;
  description: string;
  /** YouTube id, only when the publisher's own channel hosts it and embedding works. */
  youtubeId?: string;
  linkLabel: string;
}

export const officialMedia: MediaResource[] = [
  {
    kind: 'official', title: 'NASA UAP Independent Study Team public meeting', publisher: 'NASA', date: '2023-05-31',
    url: 'https://www.youtube.com/watch?v=TQcqOW39ksk', youtubeId: 'TQcqOW39ksk', tier: 'official', linkLabel: 'Watch original',
    description: "NASA's independent study team discusses how scientific data could improve understanding of UAP.",
    establishes: 'How NASA scientists framed UAP data problems in 2023.',
    doesNotEstablish: 'Any non-human origin; the panel found no such evidence.',
  },
  {
    kind: 'official', title: 'UAP Independent Study Team — Final Report', publisher: 'NASA', date: '2023-09-14',
    url: 'https://www.nasa.gov/wp-content/uploads/2023/09/uap-independent-study-team-final-report-0.pdf', tier: 'official', linkLabel: 'Read report (PDF)',
    description: 'Recommendations for systematic, calibrated data collection on UAP.',
    establishes: 'NASA found no evidence that UAP have extraterrestrial origin and called for better data.',
  },
  {
    kind: 'official', title: 'NASA UAP research hub', publisher: 'NASA Science', date: 'Ongoing',
    url: 'https://science.nasa.gov/uap/', tier: 'official', linkLabel: 'Open original page',
    description: "NASA's central page for its UAP study, reports and updates.",
  },
  {
    kind: 'official', title: 'Official UAP imagery', publisher: 'All-domain Anomaly Resolution Office (AARO)', date: 'Ongoing',
    url: 'https://www.aaro.mil/UAP-Cases/Official-UAP-Imagery/', tier: 'official', linkLabel: 'Watch on AARO',
    description: 'Videos and images released by AARO, each with its case status.',
    establishes: 'What AARO has released and how it currently categorizes each item.',
    doesNotEstablish: 'An unresolved status is not a finding of anomalous or non-human origin.',
  },
  {
    kind: 'official', title: 'UAP case resolution reports', publisher: 'AARO', date: 'Ongoing',
    url: 'https://www.aaro.mil/UAP-Cases/UAP-Case-Resolution-Reports/', tier: 'official', linkLabel: 'Read on AARO',
    description: 'Reports explaining how specific cases were resolved (balloons, drones, birds, sensor artifacts and more).',
  },
  {
    kind: 'official', title: 'Statement on the release of historical Navy videos (FLIR1, GIMBAL, GOFAST)', publisher: 'U.S. Department of Defense', date: '2020-04-27',
    url: 'https://www.defense.gov/News/Releases/Release/Article/2165713/statement-by-the-department-of-defense-on-the-release-of-historical-navy-videos/', tier: 'official', linkLabel: 'Read statement',
    description: 'Official authorization of three previously leaked Navy videos.',
    establishes: 'The videos are authentic Navy recordings and the objects were characterized as unidentified.',
    doesNotEstablish: 'What the objects were.',
  },
  {
    kind: 'testimony', title: 'House Oversight hearing: UAP — implications on national security, public safety and government transparency', publisher: 'U.S. House Committee on Oversight', date: '2023-07-26',
    url: 'https://oversight.house.gov/hearing/unidentified-anomalous-phenomena-implications-on-national-security-public-safety-and-government-transparency/', tier: 'official', linkLabel: 'Hearing page and video',
    description: 'Sworn testimony by David Grusch, Ryan Graves and David Fravor.',
    establishes: 'What the witnesses stated under oath.',
    doesNotEstablish: 'That their secondhand claims about retrieval programs are true.',
  },
];
