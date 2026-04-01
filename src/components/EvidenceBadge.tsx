import type { EvidenceGrade } from '../types';

const gradeConfig: Record<EvidenceGrade, { label: string; className: string }> = {
  DOCUMENTED: { label: 'Documented', className: 'grade-documented' },
  CREDIBLE: { label: 'Credible', className: 'grade-credible' },
  SPECULATIVE: { label: 'Speculative', className: 'grade-speculative' },
  UNVERIFIED: { label: 'Unverified', className: 'grade-unverified' },
};

export function EvidenceBadge({ grade }: { grade: EvidenceGrade }) {
  const config = gradeConfig[grade];
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${config.className}`}>
      {config.label}
    </span>
  );
}
