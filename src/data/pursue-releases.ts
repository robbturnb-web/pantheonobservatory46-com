import type { Citation } from '@/lib/evidence';

/**
 * PURSUE (Presidential Unsealing and Reporting System for UAP Encounters)
 * release notices, as listed on the official archive page.
 * Verified against https://www.war.gov/UFO/ on PURSUE_LAST_REVIEWED.
 * The archive is rolling: do not hard-code file totals here.
 */
export const PURSUE_LAST_REVIEWED = '2026-11-20';
export const PURSUE_ARCHIVE_URL = 'https://www.war.gov/UFO/';
export const PURSUE_SEARCH_URL = 'https://www.war.gov/UFO/release/';

export interface PursueRelease {
  number: string;
  date: string; // ISO
  noticeUrl: string;
}

export const pursueReleases: PursueRelease[] = [
  { number: '01', date: '2026-05-08', noticeUrl: 'https://www.war.gov/News/Releases/Release/Article/4480582/department-of-war-releases-unidentified-anomalous-phenomena-files-in-historic-t/' },
  { number: '02', date: '2026-05-22', noticeUrl: 'https://www.war.gov/News/Releases/Release/Article/4499305/department-of-war-publishes-second-release-of-unidentified-anomalous-phenomena/' },
  { number: '03', date: '2026-06-12', noticeUrl: 'https://www.war.gov/News/Releases/Release/Article/4515408/department-of-war-publishes-third-release-of-unidentified-anomalous-phenomena-f/' },
  { number: '04', date: '2026-07-10', noticeUrl: 'https://www.war.gov/News/Releases/Release/Article/4539898/department-of-war-publishes-fourth-release-of-unidentified-anomalous-phenomena/' },
  { number: '05', date: '2026-08-07', noticeUrl: 'https://www.war.gov/News/Releases/Release/Article/4565994/department-of-war-publishes-fifth-release-of-unidentified-anomalous-phenomena-f/' },
  { number: '06', date: '2026-09-18', noticeUrl: 'https://www.war.gov/News/Releases/Release/Article/4604795/department-of-war-publishes-sixth-release-of-unidentified-anomalous-phenomena-f/' },
  { number: '07', date: '2026-10-23', noticeUrl: 'https://www.war.gov/News/Releases/Release/Article/4632058/department-of-war-publishes-seventh-release-of-unidentified-anomalous-phenomena/' },
];

/** Records featured on the official page for the latest release, linked by their official anchors. */
export const pursueFeaturedRecords: { id: string; title: string; url: string }[] = [
  { id: 'DOW-UAP-D176', title: 'Triangular UAP AARO Memorandum for Record, 2026', url: 'https://www.war.gov/ufo/#DOW-UAP-D176-Triangular-UAP-AARO-Memorandum-for-Record-2026' },
  { id: 'FBI-UAP-D043', title: 'FD-302, Unidentified Aerial Object Observation Report, 2026', url: 'https://www.war.gov/ufo/#FBI-UAP-D043-FD-302-Unidentified-Aerial-Object-Observation-Report-2026' },
  { id: 'DOW-UAP-D174', title: 'Utah Ranch Investigation Report, April 2010', url: 'https://www.war.gov/ufo/#DOW-UAP-D174-Utah-Ranch-Investigation-Report-April-2010' },
  { id: 'DOW-UAP-D155', title: 'Air Intelligence Information Report, Saudi Arabia, 1957', url: 'https://www.war.gov/ufo/#DOW-UAP-D155-Air-Intelligence-Information-Report-Saudi-Arabia-1957' },
  { id: 'DOW-UAP-D177', title: 'Unresolved UAP Report, Catalina Island, 1955', url: 'https://www.war.gov/ufo/#DOW-UAP-D177-Unresolved-UAP-Report-Catalina-Island-1955' },
];

export const pursueScope: Citation = {
  title: 'PURSUE — official UAP records archive',
  publisher: 'U.S. Department of War',
  date: 'Rolling, from 2026-05-08',
  url: PURSUE_ARCHIVE_URL,
  tier: 'official',
  establishes: 'The government has declassified and published these records. The archive states they are unresolved cases, where the government could not make a definitive determination.',
  doesNotEstablish: 'That any object described is extraterrestrial or non-human. "Unresolved" means insufficient data for a determination.',
};
