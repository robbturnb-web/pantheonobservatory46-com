import { useEffect, useState, type ChangeEvent, type ClipboardEvent, type KeyboardEvent } from 'react';

/**
 * BirthdayInput — three controlled fields (MM / DD / YYYY).
 *
 * Mobile-safe: fully controlled, no ref games. Auto-advance is gentle:
 * only when the value is unambiguously full (2 digits for month/day, 4 for year).
 * Emits ISO `YYYY-MM-DD` once the full date is valid; otherwise emits ''.
 */
export interface BirthdayInputProps {
  value: string;
  onChange: (iso: string) => void;
  accentColor?: string;
  error?: string;
}

function isValidDate(y: number, m: number, d: number): boolean {
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return false;
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

function digits(s: string, max: number) {
  return s.replace(/\D/g, '').slice(0, max);
}

export function BirthdayInput({ value, onChange, accentColor = '#22d3ee', error }: BirthdayInputProps) {
  const initial = parseIso(value);
  const [m, setM] = useState(initial.m);
  const [d, setD] = useState(initial.d);
  const [y, setY] = useState(initial.y);

  // Sync if parent resets the value
  useEffect(() => {
    const p = parseIso(value);
    if (value === '' && (m || d || y)) return; // don't wipe user mid-edit on transient ''
    if (p.m !== m) setM(p.m);
    if (p.d !== d) setD(p.d);
    if (p.y !== y) setY(p.y);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Emit ISO whenever the three fields form a valid date.
  useEffect(() => {
    const ny = parseInt(y, 10);
    const nm = parseInt(m, 10);
    const nd = parseInt(d, 10);
    if (y.length === 4 && m.length >= 1 && d.length >= 1 && isValidDate(ny, nm, nd)) {
      const iso = `${ny.toString().padStart(4, '0')}-${nm.toString().padStart(2, '0')}-${nd.toString().padStart(2, '0')}`;
      if (iso !== value) onChange(iso);
    } else if (value !== '') {
      onChange('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [m, d, y]);

  const focusNext = (id: string) => {
    const el = document.getElementById(id) as HTMLInputElement | null;
    el?.focus();
    el?.select();
  };

  const handleMonth = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = digits(e.target.value, 2);
    setM(raw);
    if (raw.length === 2) focusNext('bday-day');
  };

  const handleDay = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = digits(e.target.value, 2);
    setD(raw);
    if (raw.length === 2) focusNext('bday-year');
  };

  const handleYear = (e: ChangeEvent<HTMLInputElement>) => {
    setY(digits(e.target.value, 4));
  };

  const handleKey = (prevId: string | null) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && e.currentTarget.value === '' && prevId) {
      e.preventDefault();
      focusNext(prevId);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData('text').trim();
    const slash = text.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    const iso = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (slash || iso) {
      e.preventDefault();
      const pm = (slash ? slash[1] : iso![2]).padStart(2, '0');
      const pd = (slash ? slash[2] : iso![3]).padStart(2, '0');
      const py = slash ? slash[3] : iso![1];
      setM(pm);
      setD(pd);
      setY(py);
    }
  };

  const cellClass =
    'bg-black/40 border rounded-md px-2 py-3 text-center font-mono text-lg tracking-widest text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors';
  const borderStyle = { borderColor: `${accentColor}55` };

  return (
    <div className="space-y-1.5">
      <div className="grid grid-cols-[1fr_1fr_1.4fr] gap-2" onPaste={handlePaste}>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-[3px] text-muted-foreground mb-1 font-mono">Month</span>
          <input
            id="bday-month"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="MM"
            maxLength={2}
            value={m}
            onChange={handleMonth}
            className={cellClass}
            style={borderStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = accentColor)}
            onBlur={(e) => (e.currentTarget.style.borderColor = `${accentColor}55`)}
            aria-label="Birth month"
            autoComplete="bday-month"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-[3px] text-muted-foreground mb-1 font-mono">Day</span>
          <input
            id="bday-day"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="DD"
            maxLength={2}
            value={d}
            onChange={handleDay}
            onKeyDown={handleKey('bday-month')}
            className={cellClass}
            style={borderStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = accentColor)}
            onBlur={(e) => (e.currentTarget.style.borderColor = `${accentColor}55`)}
            aria-label="Birth day"
            autoComplete="bday-day"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-[3px] text-muted-foreground mb-1 font-mono">Year</span>
          <input
            id="bday-year"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="YYYY"
            maxLength={4}
            value={y}
            onChange={handleYear}
            onKeyDown={handleKey('bday-day')}
            className={cellClass}
            style={borderStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = accentColor)}
            onBlur={(e) => (e.currentTarget.style.borderColor = `${accentColor}55`)}
            aria-label="Birth year"
            autoComplete="bday-year"
          />
        </div>
      </div>
      {error && <p className="text-[11px] text-destructive">{error}</p>}
    </div>
  );
}
