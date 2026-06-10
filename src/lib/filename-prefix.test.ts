import { describe, it, expect } from 'vitest';
import {
  assertValidFilenamePrefix,
  FilenamePrefixError,
  FILENAME_PREFIX_MAX,
} from './filename-prefix';

describe('assertValidFilenamePrefix', () => {
  // ── Valid cases ────────────────────────────────────────────────────
  it('returns trimmed string for a normal prefix', () => {
    expect(assertValidFilenamePrefix('briefing')).toBe('briefing');
  });

  it('allows hyphens and underscores', () => {
    expect(assertValidFilenamePrefix('my_snapshot-2')).toBe('my_snapshot-2');
  });

  it('allows spaces (they will be sanitized later)', () => {
    expect(assertValidFilenamePrefix('daily briefing')).toBe('daily briefing');
  });

  it('allows numbers', () => {
    expect(assertValidFilenamePrefix('briefing2024')).toBe('briefing2024');
  });

  it('returns trimmed value with surrounding whitespace removed', () => {
    expect(assertValidFilenamePrefix('  trimmed  ')).toBe('trimmed');
  });

  it('accepts exactly 64 characters', () => {
    const exact = 'a'.repeat(FILENAME_PREFIX_MAX);
    expect(assertValidFilenamePrefix(exact)).toBe(exact);
  });

  // ── Empty / missing cases ────────────────────────────────────────────
  it('throws for undefined', () => {
    expect(() => assertValidFilenamePrefix(undefined)).toThrow(FilenamePrefixError);
  });

  it('throws for null', () => {
    expect(() => assertValidFilenamePrefix(null)).toThrow(FilenamePrefixError);
  });

  it('throws for empty string', () => {
    expect(() => assertValidFilenamePrefix('')).toThrow(FilenamePrefixError);
  });

  it('throws for whitespace-only string', () => {
    expect(() => assertValidFilenamePrefix('   ')).toThrow(FilenamePrefixError);
  });

  it('includes "cannot be empty" in the error message for empty input', () => {
    expect(() => assertValidFilenamePrefix('')).toThrow(/cannot be empty/i);
  });

  // ── Overly long cases ──────────────────────────────────────────────
  it('throws for 65 characters', () => {
    const tooLong = 'a'.repeat(FILENAME_PREFIX_MAX + 1);
    expect(() => assertValidFilenamePrefix(tooLong)).toThrow(FilenamePrefixError);
  });

  it('throws for 100 characters', () => {
    const tooLong = 'a'.repeat(100);
    expect(() => assertValidFilenamePrefix(tooLong)).toThrow(FilenamePrefixError);
  });

  it('includes length info in the error for overly long input', () => {
    const tooLong = 'a'.repeat(100);
    expect(() => assertValidFilenamePrefix(tooLong)).toThrow(/100/);
    expect(() => assertValidFilenamePrefix(tooLong)).toThrow(
      new RegExp(String(FILENAME_PREFIX_MAX))
    );
  });

  // ── Invalid character cases ────────────────────────────────────────
  it('throws for special characters (!@#$%)', () => {
    expect(() => assertValidFilenamePrefix('hello!')).toThrow(FilenamePrefixError);
    expect(() => assertValidFilenamePrefix('test@file')).toThrow(FilenamePrefixError);
    expect(() => assertValidFilenamePrefix('name#1')).toThrow(FilenamePrefixError);
    expect(() => assertValidFilenamePrefix('a$b')).toThrow(FilenamePrefixError);
    expect(() => assertValidFilenamePrefix('x%y')).toThrow(FilenamePrefixError);
  });

  it('throws for path traversal dots', () => {
    expect(() => assertValidFilenamePrefix('..')).toThrow(FilenamePrefixError);
    expect(() => assertValidFilenamePrefix('file.name')).toThrow(FilenamePrefixError);
  });

  it('throws for slashes', () => {
    expect(() => assertValidFilenamePrefix('a/b')).toThrow(FilenamePrefixError);
    expect(() => assertValidFilenamePrefix('a\\b')).toThrow(FilenamePrefixError);
  });

  it('throws for unicode/emojis', () => {
    expect(() => assertValidFilenamePrefix('hello🌍')).toThrow(FilenamePrefixError);
    expect(() => assertValidFilenamePrefix('tëst')).toThrow(FilenamePrefixError);
    expect(() => assertValidFilenamePrefix('你好')).toThrow(FilenamePrefixError);
  });

  it('includes "allowed" wording in the error for invalid chars', () => {
    expect(() => assertValidFilenamePrefix('hello!')).toThrow(/allowed/i);
  });

  // ── Error type specificity ───────────────────────────────────────
  it('always throws FilenamePrefixError, not generic Error', () => {
    expect(() => assertValidFilenamePrefix('')).toThrowError(
      (err: unknown) => err instanceof FilenamePrefixError
    );
  });

  it('sets error name to FilenamePrefixError', () => {
    try {
      assertValidFilenamePrefix('');
    } catch (err) {
      expect((err as FilenamePrefixError).name).toBe('FilenamePrefixError');
    }
  });
});
