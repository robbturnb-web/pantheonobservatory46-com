import { describe, expect, it } from 'vitest';
import { normalizeBaseUrl } from './env';

describe('normalizeBaseUrl', () => {
  it('trims surrounding whitespace', () => {
    expect(normalizeBaseUrl('  https://example.supabase.co  ')).toBe('https://example.supabase.co');
  });

  it('removes whitespace accidentally inserted into a URL', () => {
    expect(normalizeBaseUrl('https: /example.supabase.co')).toBe('https://example.supabase.co');
  });

  it('normalizes a single slash after the protocol', () => {
    expect(normalizeBaseUrl('https:/example.supabase.co/')).toBe('https://example.supabase.co');
  });

  it('normalizes repeated protocol slashes and trailing slashes', () => {
    expect(normalizeBaseUrl('https:////example.supabase.co///')).toBe('https://example.supabase.co');
  });

  it('preserves the path while removing trailing slashes', () => {
    expect(normalizeBaseUrl('https://example.supabase.co/functions/v1///')).toBe('https://example.supabase.co/functions/v1');
  });
});
