import { describe, it, expect } from 'vitest';
import { pursueReleases, PURSUE_ARCHIVE_URL, PURSUE_SEARCH_URL } from '../pursue-releases';
import { plasmaHypotheses, establishedPlasma } from '../plasma';
import { whistleblowers } from '../whistleblowers';
import { officialMedia } from '../official-media';

describe('PURSUE releases', () => {
  it('lists releases 01–07 with the official dates', () => {
    expect(pursueReleases.map((r) => `${r.number}:${r.date}`)).toEqual([
      '01:2026-05-08', '02:2026-05-22', '03:2026-06-12', '04:2026-07-10',
      '05:2026-08-07', '06:2026-09-18', '07:2026-10-23',
    ]);
  });
  it('links only to the official war.gov site', () => {
    for (const r of pursueReleases) expect(r.noticeUrl.startsWith('https://www.war.gov/')).toBe(true);
    expect(PURSUE_ARCHIVE_URL).toBe('https://www.war.gov/UFO/');
    expect(PURSUE_SEARCH_URL).toBe('https://www.war.gov/UFO/release/');
  });
});

describe('Plasma page', () => {
  it('never labels an intelligent-plasma hypothesis as established', () => {
    for (const h of plasmaHypotheses) expect(['speculation', 'disputed', 'unresolved']).toContain(h.status);
  });
  it('gives every established topic at least one source', () => {
    for (const t of establishedPlasma) expect(t.sources.length).toBeGreaterThan(0);
  });
});

describe('Jake Barber entry', () => {
  const jb = whistleblowers.find((w) => w.id === 'jake-barber');
  it('is graded unverified and states the limitations', () => {
    expect(jb?.grade).toBe('UNVERIFIED');
    expect(jb?.summary).toMatch(/no publicly authenticated chain of custody/i);
  });
  it('does not call his claims verified, proven or corroborated', () => {
    expect(JSON.stringify(jb)).not.toMatch(/\b(proven|corroborated|confirmed retrieval)\b/i);
  });
});

describe('Official media', () => {
  it('includes the NASA UAP briefing and AARO archives', () => {
    const urls = officialMedia.map((m) => m.url);
    expect(urls).toContain('https://www.youtube.com/watch?v=TQcqOW39ksk');
    expect(urls).toContain('https://www.aaro.mil/UAP-Cases/Official-UAP-Imagery/');
    expect(urls).toContain('https://www.aaro.mil/UAP-Cases/UAP-Case-Resolution-Reports/');
  });
});
