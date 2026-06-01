import { useRef, useEffect, type ChangeEvent, type KeyboardEvent, type ClipboardEvent } from 'react';

/**
 * BirthdayInput — three auto-advancing typed fields (MM / DD / YYYY).
 *
 * Fixes the mobile native date picker pain of scrolling back to 1990.
 * Emits an ISO `YYYY-MM-DD` string via onChange whenever all three fields
 * form a valid date; otherwise emits an empty string.
 */
export interface BirthdayInputProps {
  /** ISO YYYY-MM-DD value (or '' for empty). */
  value: string;
  onChange: (iso: string) => void;
  accentColor?: string;
  error?: string;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function isValidDate(y: number, m: number, d: number): boolean {
  if (y < 1900 || y > new Date().getFullYear()) return false;
  if (m < 1 || m > 12) return false;
  if (d < 1 || d > 31) return false;
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

function parseIso(iso: string): { m: string; d: string; y: string } {
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return { m: '', d: '', y: '' };
  return { y: match[1], m: match[2], d: match[3] };
}

export function BirthdayInput({ value, onChange, accentColor = '#22d3ee', error }: BirthdayInputProps) {
  const parsed = parseIso(value);
  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const monthVal = useRef(parsed.m);
  const dayVal = useRef(parsed.d);
  const yearVal = useRef(parsed.y);

  // Sync external value back if it changed (e.g. reset)
  useEffect(() => {
    const p = parseIso(value);
    if (monthRef.current && monthRef.current.value !== p.m) monthRef.current.value = p.m;
    if (dayRef.current && dayRef.current.value !== p.d) dayRef.current.value = p.d;
    if (yearRef.current && yearRef.current.value !== p.y) yearRef.current.value = p.y;
    monthVal.current = p.m;
    dayVal.current = p.d;
    yearVal.current = p.y;
  }, [value]);

  const emit = () => {
    const y = parseInt(yearVal.current, 10);
    const m = parseInt(monthVal.current, 10);
    const d = parseInt(dayVal.current, 10);
    if (
      yearVal.current.length === 4 &&
      monthVal.current.length >= 1 &&
      dayVal.current.length >= 1 &&
      isValidDate(y, m, d)
    ) {
      const iso = `${y.toString().padStart(4, '0')}-${m.toString().padStart(2, '0')}-${d
        .toString()
        .padStart(2, '0')}`;
      onChange(iso);
    } else {
      onChange('');
    }
  };

  const handleMonth = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 2);
    e.target.value = raw;
    monthVal.current = raw;
    // Auto-advance: definitive 2-digit, or any value >1 (e.g. "3" can't precede another digit to stay <=12)
    if (raw.length === 2 || (raw.length === 1 && parseInt(raw, 10) > 1)) {
      dayRef.current?.focus();
    }
    emit();
  };

  const handleDay = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 2);
    e.target.value = raw;
    dayVal.current = raw;
    if (raw.length === 2 || (raw.length === 1 && parseInt(raw, 10) > 3)) {
      yearRef.current?.focus();
    }
    emit();
  };

  const handleYear = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    e.target.value = raw;
    yearVal.current = raw;
    emit();
  };

  const handleBackspace = (ref: React.RefObject<HTMLInputElement>) =>
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && e.currentTarget.value === '' && ref.current) {
        ref.current.focus();
      }
    };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData('text');
    // Accept MM/DD/YYYY, M/D/YYYY, YYYY-MM-DD
    const slash = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    const iso = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (slash || iso) {
      e.preventDefault();
      const m = clamp(parseInt(slash ? slash[1] : iso![2], 10), 1, 12);
      const d = clamp(parseInt(slash ? slash[2] : iso![3], 10), 1, 31);
      const y = clamp(parseInt(slash ? slash[3] : iso![1], 10), 1900, new Date().getFullYear());
      if (monthRef.current) monthRef.current.value = m.toString().padStart(2, '0');
      if (dayRef.current) dayRef.current.value = d.toString().padStart(2, '0');
      if (yearRef.current) yearRef.current.value = y.toString();
      monthVal.current = m.toString().padStart(2, '0');
      dayVal.current = d.toString().padStart(2, '0');
      yearVal.current = y.toString();
      emit();
      yearRef.current?.blur();
    }
  };

  const cellClass =
    'bg-black/40 border rounded-md px-2 py-3 text-center font-mono text-lg tracking-widest text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors';

  return (
    <div className="space-y-1.5">
      <div className="grid grid-cols-[1fr_1fr_1.4fr] gap-2" onPaste={handlePaste}>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-[3px] text-muted-foreground mb-1 font-mono">Month</span>
          <input
            ref={monthRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="MM"
            maxLength={2}
            defaultValue={parsed.m}
            onChange={handleMonth}
            className={cellClass}
            style={{ borderColor: `${accentColor}55` }}
            onFocus={(e) => (e.currentTarget.style.borderColor = accentColor)}
            onBlur={(e) => (e.currentTarget.style.borderColor = `${accentColor}55`)}
            aria-label="Birth month"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-[3px] text-muted-foreground mb-1 font-mono">Day</span>
          <input
            ref={dayRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="DD"
            maxLength={2}
            defaultValue={parsed.d}
            onChange={handleDay}
            onKeyDown={handleBackspace(monthRef)}
            className={cellClass}
            style={{ borderColor: `${accentColor}55` }}
            onFocus={(e) => (e.currentTarget.style.borderColor = accentColor)}
            onBlur={(e) => (e.currentTarget.style.borderColor = `${accentColor}55`)}
            aria-label="Birth day"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-[3px] text-muted-foreground mb-1 font-mono">Year</span>
          <input
            ref={yearRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="YYYY"
            maxLength={4}
            defaultValue={parsed.y}
            onChange={handleYear}
            onKeyDown={handleBackspace(dayRef)}
            className={cellClass}
            style={{ borderColor: `${accentColor}55` }}
            onFocus={(e) => (e.currentTarget.style.borderColor = accentColor)}
            onBlur={(e) => (e.currentTarget.style.borderColor = `${accentColor}55`)}
            aria-label="Birth year"
          />
        </div>
      </div>
      {error && <p className="text-[11px] text-destructive">{error}</p>}
    </div>
  );
}
