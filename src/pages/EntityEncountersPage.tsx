import { DossierPageLayout } from '@/components/dossier/DossierPageLayout';
import { pageThemes } from '@/lib/page-themes';
import { entityEncounterEntries } from '@/data/entity-encounters';

export function EntityEncountersPage() {
  return (
    <DossierPageLayout
      theme={pageThemes.encounters}
      entries={entityEncounterEntries}
      introSlot={
        <div className="space-y-3 opacity-90">
          <p>
            Ten witness-rich, decades-spanning entity encounters — from the Pascagoula
            riverbank cassette recording to a TASS-reported landing in Soviet Voronezh.
            Each dossier weights the strongest first-person testimony, contemporaneous
            news of record, and the leading skeptical counter-explanation.
          </p>
          <p className="text-sm opacity-70">
            Confidence grade reflects external corroboration density, not editorial
            preference. <strong>VERIFIED</strong> = multi-source contemporaneous record.{' '}
            <strong>REPORTED</strong> = serious investigator-confirmed witness statements.{' '}
            <strong>ALLEGED</strong> = single-source or post-hoc claim.
          </p>
        </div>
      }
    />
  );
}
