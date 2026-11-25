import { describe, it, expect } from 'vitest';
import { uapCases } from '@/data/uap-cases';

const nimitz = uapCases[0];

describe('first featured UAP case (Nimitz)', () => {
  it('is the first case in default order', () => {
    expect(nimitz.id).toBe('nimitz');
  });
  it('labels non-human technology as speculation, never as fact', () => {
    expect(nimitz.claims?.some((c) => c.status === 'speculation' && /non-human/i.test(c.text))).toBe(true);
    expect(nimitz.summary).not.toMatch(/impossible by known physics/i);
  });
  it('every citation has a tier, date and direct url', () => {
    for (const { c } of nimitz.citations ?? []) {
      expect(c.tier).toBeTruthy();
      expect(c.date).toBeTruthy();
      expect(c.url).toMatch(/^https:\/\//);
    }
    expect(nimitz.citations?.length).toBeGreaterThanOrEqual(4);
  });
  it('does not call the third-party FLIR1 upload an official Pentagon video', () => {
    expect(nimitz.videos.some((v) => /Official Pentagon/i.test(v.title))).toBe(false);
  });
});
