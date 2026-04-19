import { Link } from 'react-router-dom';
import { species, getSpeciesForCase, getSpeciesForWitness } from '../data/species';

/**
 * Small badge linking to a species in the codex.
 * Use inside UAP cases, whistleblower cards, etc:
 *   <SpeciesBadge id="greys" />
 */
export function SpeciesBadge({ id }: { id: string }) {
  const s = species.find((x) => x.id === id);
  if (!s) return null;
  return (
    <Link
      to={`/species#${s.id}`}
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-xs font-medium hover:scale-105 transition-transform"
      style={{ borderColor: s.accentColor, color: s.accentColor }}
    >
      <span>{s.symbol}</span>
      <span>{s.name}</span>
    </Link>
  );
}

/**
 * Renders a row of species badges linked to a UAP case ID.
 */
export function SpeciesBadgesForCase({ caseId }: { caseId: string }) {
  const list = getSpeciesForCase(caseId);
  if (list.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {list.map((s) => (
        <SpeciesBadge key={s.id} id={s.id} />
      ))}
    </div>
  );
}

/**
 * Renders a row of species badges linked to a whistleblower ID.
 */
export function SpeciesBadgesForWitness({ witnessId }: { witnessId: string }) {
  const list = getSpeciesForWitness(witnessId);
  if (list.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {list.map((s) => (
        <SpeciesBadge key={s.id} id={s.id} />
      ))}
    </div>
  );
}
