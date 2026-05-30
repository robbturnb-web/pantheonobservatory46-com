import type { UAPCase } from '../types';
import type { Source } from '../components/SourceList';
import type { VideoData } from '../components/VideoEmbed';
import nimitzImg from '@/assets/uap-nimitz.jpg';
import gruschImg from '@/assets/uap-grusch.jpg';
import phoenixImg from '@/assets/uap-phoenix.jpg';
import roswellImg from '@/assets/uap-roswell.jpg';
import rendleshamImg from '@/assets/uap-rendlesham.jpg';
import tehranImg from '@/assets/uap-tehran.jpg';

export interface UAPCaseEnhanced extends Omit<UAPCase, 'sources'> {
  sources: Source[];
  videos: VideoData[];
  heroImage?: string;
}

export const uapCases: UAPCaseEnhanced[] = [
  {
    id: 'nimitz',
    heroImage: nimitzImg,
    title: 'USS Nimitz Tic Tac Incident',
    date: 'November 14, 2004',
    grade: 'DOCUMENTED',
    summary: 'Multiple US Navy F/A-18 pilots encountered a white, oblong "Tic Tac" shaped craft off the coast of San Diego. The object demonstrated flight characteristics impossible by known physics — no wings, no exhaust, instant acceleration to hypersonic speeds.',
    officialExplanation: 'The U.S. Navy confirmed the encounters as unexplained. No official explanation for the craft has been offered. The footage was declassified and released by the Pentagon in 2020.',
    alternativeExplanation: 'Advanced non-human technology. The craft appeared to descend from 80,000 feet to near sea level in under a second. It seemed to anticipate the CAP coordinates of the jets — suggesting awareness of classified military communications.',
    sources: [
      { label: 'Pentagon FOIA Release (April 2020)', url: 'https://www.defense.gov/News/Releases/Release/Article/2165713/' },
      { label: 'New York Times (Dec 2017)', url: 'https://www.nytimes.com/2017/12/16/us/politics/pentagon-program-ufo-harry-reid.html' },
      { label: 'CDR David Fravor Testimony', url: 'https://www.youtube.com/watch?v=aB8zcAttP1E' },
      { label: 'SCU Nimitz Analysis Report', url: 'https://www.explorescu.org/post/nimitz_strike_group_2004' },
    ],
    videos: [
      { platform: 'youtube', id: 'lWLZwnUBMGQ', title: 'Official Pentagon FLIR1 "Tic Tac" Footage' },
      { platform: 'youtube', id: 'aB8zcAttP1E', title: 'CDR Fravor on Lex Fridman — Full Account' },
    ],
    timeline: [
      { year: 'Nov 10–14, 2004', description: 'USS Princeton detects anomalous objects on radar over multiple days' },
      { year: 'Nov 14, 2004', description: 'CDR Fravor and LCDR Dietrich visually confirm object; Fravor descends to engage' },
      { year: 'Nov 14, 2004', description: 'Object instantly accelerates and disappears; reappears 60 miles away in seconds' },
      { year: '2017', description: 'New York Times publishes first public account; FLIR video released' },
      { year: 'April 2020', description: 'Pentagon officially declassifies and releases three UAP videos' },
    ],
  },
  {
    id: 'grusch',
    heroImage: gruschImg,
    title: 'David Grusch Congressional Testimony',
    date: 'July 26, 2023',
    grade: 'DOCUMENTED',
    summary: 'David Grusch, a decorated intelligence officer and former member of the UAP Task Force, testified under oath before the U.S. Congress that the U.S. government possesses "non-human intelligence" craft and biological material of non-human origin.',
    officialExplanation: 'Grusch filed a whistleblower complaint with the Intelligence Community Inspector General, who found it "credible and urgent." The DoD has not confirmed nor publicly denied the specific claims.',
    alternativeExplanation: 'Grusch claims a multi-decade illegal reverse-engineering program has operated outside congressional oversight. He states he was retaliated against for his disclosures and names specific individuals with knowledge of the program.',
    sources: [
      { label: 'C-SPAN — Full Hearing', url: 'https://www.c-span.org/video/?529499-1/hearing-unidentified-anomalous-phenomena' },
      { label: 'The Debrief — Original Story', url: 'https://thedebrief.org/intelligence-officials-say-u-s-has-retrieved-non-human-craft/' },
      { label: 'NewsNation Exclusive', url: 'https://www.newsnationnow.com/space/ufo/we-are-not-alone-the-ufo-whistleblower-speaks/' },
      { label: 'UAP Disclosure Act', url: 'https://www.congress.gov/bill/118th-congress/senate-bill/2226' },
    ],
    videos: [
      { platform: 'youtube', id: 'KQ7Dw-739VY', title: 'Full Congressional UAP Hearing — July 26, 2023' },
    ],
    timeline: [
      { year: '2019–2021', description: 'Grusch serves on UAP Task Force; begins receiving classified briefings on legacy programs' },
      { year: '2022', description: 'Files official whistleblower complaint with IC IG' },
      { year: 'June 2023', description: "The Debrief and NewsNation publish Grusch's claims publicly" },
      { year: 'July 2023', description: 'Grusch testifies under oath before House Oversight Committee' },
      { year: '2024–present', description: 'Congressional investigation ongoing; UAP Disclosure Act debated in Senate' },
    ],
  },
  {
    id: 'phoenix-lights',
    heroImage: phoenixImg,
    title: 'The Phoenix Lights',
    date: 'March 13, 1997',
    grade: 'CREDIBLE',
    summary: 'Thousands of witnesses across Nevada, Arizona, and Sonora Mexico observed a massive, silent V-shaped craft estimated at over a mile wide flying slowly over Phoenix at low altitude.',
    officialExplanation: 'Arizona National Guard flares dropped during training at Barry M. Goldwater Range. Governor Fife Symington initially mocked the event, then decades later admitted he had personally witnessed an unidentified craft.',
    alternativeExplanation: 'The flares explanation does not account for the solid, mile-wide craft reported by thousands of witnesses hours before the orbs appeared. Two separate events on the same night.',
    sources: [
      { label: 'Gov. Symington Statement (2007)', url: 'https://www.youtube.com/watch?v=v1Fh0g5wJ7A' },
      { label: 'NUFORC Documentation', url: 'https://nuforc.org/webreports/ndxlAZ.html' },
      { label: 'CNN Anniversary Coverage', url: 'https://www.cnn.com/2017/03/13/us/phoenix-lights-20th-anniversary/' },
      { label: 'Phoenix Lights Documentary (2005)', url: 'https://www.imdb.com/title/tt0462556/' },
    ],
    videos: [
      { platform: 'youtube', id: 'v1Fh0g5wJ7A', title: 'Gov. Symington — "I Saw a Craft"' },
    ],
    timeline: [
      { year: '8:15 PM MST', description: 'First sightings reported in Henderson, Nevada' },
      { year: '9:30–10:00 PM', description: 'Massive V-formation traverses Phoenix; thousands of witnesses' },
      { year: '10:00 PM', description: 'Second event: orbs of light seen south of Phoenix (later attributed to flares)' },
      { year: '1997', description: 'Official military explanation: A-10 flares. Critics note two distinct events' },
      { year: '2007', description: 'Gov. Symington publicly states he witnessed something not of this world' },
    ],
  },
  {
    id: 'roswell',
    heroImage: roswellImg,
    title: 'Roswell, New Mexico',
    date: 'July 1947',
    grade: 'CREDIBLE',
    summary: 'A crash near Roswell, New Mexico produced debris that the Army Air Force initially described as a "flying disc" before retracting and claiming it was a weather balloon.',
    officialExplanation: 'Weather balloon (1947). Project Mogul balloon (1994 official report). The ongoing changing explanations have fueled skepticism for decades.',
    alternativeExplanation: "Multiple first-hand witnesses — military personnel, morticians, nurses — described small bodies, metallic material that couldn't be bent or burned, and an intensive cover-up operation.",
    sources: [
      { label: 'RAAF Press Release (July 8, 1947)', url: 'https://en.wikipedia.org/wiki/Roswell_incident' },
      { label: 'USAF Project Mogul Report (1994)', url: 'https://www.af.mil/About-Us/Fact-Sheets/' },
      { label: 'Crash at Corona — Friedman & Berliner', url: 'https://www.amazon.com/dp/1569249520' },
    ],
    videos: [],
    timeline: [
      { year: 'June–July 1947', description: 'W.W. "Mac" Brazel discovers debris field on his Foster Ranch' },
      { year: 'July 8, 1947', description: 'RAAF press release announces recovery of "flying disc"' },
      { year: 'July 9, 1947', description: 'Story reversed: "weather balloon" announced' },
      { year: '1978', description: 'Stanton Friedman interviews Jesse Marcel Sr.; investigation begins' },
      { year: '1994', description: 'USAF releases Project Mogul explanation; critics find inconsistencies' },
    ],
  },
  {
    id: 'rendlesham',
    heroImage: rendleshamImg,
    title: 'Rendlesham Forest Incident',
    date: 'December 26–28, 1980',
    grade: 'CREDIBLE',
    summary: 'U.S. Air Force personnel at RAF Bentwaters and Woodbridge in Suffolk, England encountered unexplained lights and objects in Rendlesham Forest over three nights.',
    officialExplanation: "UK Ministry of Defence investigated and concluded the incidents posed no threat to national security. Lt. Col. Halt's official memo was later declassified.",
    alternativeExplanation: "Multiple credentialed military witnesses across multiple nights. Radiation levels at the landing site were elevated. Penniston's binary code, when decoded, yields GPS coordinates.",
    sources: [
      { label: 'Halt Memo (Declassified)', url: 'https://en.wikipedia.org/wiki/Rendlesham_Forest_incident' },
      { label: 'Halt Audio Recording', url: 'https://www.youtube.com/watch?v=kqPkEMqGCDc' },
      { label: 'UK National Archives — UFO Files', url: 'https://www.nationalarchives.gov.uk/ufos/' },
    ],
    videos: [
      { platform: 'youtube', id: 'kqPkEMqGCDc', title: 'Col. Halt Audio — Rendlesham Forest (1980)' },
    ],
    timeline: [
      { year: 'Dec 26, 1980', description: 'USAF security patrol investigates lights in Rendlesham Forest; encounters a craft' },
      { year: 'Dec 27, 1980', description: 'Landing site investigated; indentations and elevated radiation levels found' },
      { year: 'Dec 28, 1980', description: 'Lt. Col. Halt personally witnesses lights; records audio on-site' },
      { year: 'Jan 13, 1981', description: 'Halt files official memo to UK MoD' },
      { year: '2010', description: 'Penniston reveals binary code received from craft surface' },
    ],
  },
  {
    id: 'tehran-1976',
    heroImage: tehranImg,
    title: 'Tehran UFO Incident',
    date: 'September 19, 1976',
    grade: 'DOCUMENTED',
    summary: 'Iranian Air Force F-4 interceptors scrambled to investigate a bright object over Tehran. When the lead jet attempted to fire a missile, all weapons systems jammed.',
    officialExplanation: 'The U.S. Defense Intelligence Agency produced a classified assessment describing it as a "case which meets all the necessary conditions for a legitimate study of the UFO phenomenon."',
    alternativeExplanation: 'One of the most well-documented military UAP encounters. Multiple radar contacts, visual confirmation, weapons systems disabled, electromagnetic interference documented.',
    sources: [
      { label: 'DIA Assessment (FOIA)', url: 'https://www.theblackvault.com/documentarchive/iran-1976-ufo-incident/' },
      { label: 'Gen. Parviz Jafari Testimony', url: 'https://www.youtube.com/watch?v=6GkCNeRr_gc' },
      { label: 'Dr. Bruce Maccabee Analysis', url: 'https://brumac.mysite.com/' },
    ],
    videos: [
      { platform: 'youtube', id: '6GkCNeRr_gc', title: 'Gen. Jafari — Tehran UFO Incident (1976)' },
    ],
    timeline: [
      { year: 'Sept 19, 1976', description: 'Multiple civilian reports of bright object over Tehran' },
      { year: 'Sept 19, 1976', description: 'First F-4 scrambled; instruments malfunction on approach' },
      { year: 'Sept 19, 1976', description: 'Second F-4 attempts missile lock — all weapons systems jam' },
      { year: 'Sept 19, 1976', description: 'Smaller object emerges and appears to chase the jet' },
      { year: '1976', description: 'DIA produces classified assessment calling it a legitimate UAP case' },
    ],
  },
];
