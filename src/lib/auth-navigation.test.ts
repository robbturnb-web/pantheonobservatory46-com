import { describe, expect, it } from 'vitest';
import { memberRedirect, requiresEmailConfirmation } from './auth-navigation';

describe('member account flow', () => {
  it('keeps confirmation-required signups signed out', () => {
    expect(requiresEmailConfirmation(null)).toBe(true);
    expect(requiresEmailConfirmation({ user: { id: 'member' } })).toBe(false);
  });
  it('returns new members to their profile by default', () => {
    expect(memberRedirect(null)).toBe('/profile');
    expect(memberRedirect('/echoverse')).toBe('/echoverse');
  });
  it('does not redirect members outside Pantheon or into an auth loop', () => {
    for (const path of ['//evil.example', '/\\evil.example', 'https://evil.example', '/auth?mode=signup']) {
      expect(memberRedirect(path)).toBe('/profile');
    }
  });
});