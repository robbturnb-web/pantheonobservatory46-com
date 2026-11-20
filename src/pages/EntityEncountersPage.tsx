import { DossierPageLayout } from '@/components/dossier/DossierPageLayout';
import { pageThemes } from '@/lib/page-themes';
import { entityEncounterEntries } from '@/data/entity-encounters';
import { SEO } from '@/components/SEO';

export function EntityEncountersPage() {
  return (
    <>
      <SEO
        title="Entity Encounters — Pascagoula to Voronezh | Pantheon"
        description="Ten witness-rich entity encounters across decades. First-person testimony, contemporaneous news of record, and the leading skeptical counter — confidence-graded."
        path="/encounters"
        schema={{ '@context':'https://schema.org','@type':'CollectionPage', name:'Entity Encounters Archive', url:'https://pantheonobservatory46.com/encounters', numberOfItems: entityEncounterEntries.length }}
      />
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
            <p className="text-sm opacity-80">
              <strong>Every case here is a report, not a confirmed encounter.</strong> The grade describes how well the
              <em> report itself</em> is documented — not whether a non-human being was present.{' '}
              <strong>VERIFIED</strong> = the report is recorded in multiple contemporaneous sources.{' '}
              <strong>REPORTED</strong> = investigator-documented witness statements.{' '}
              <strong>ALLEGED</strong> = single-source or later claim. Folklore and speculative material is labeled in each entry.
            </p>
          </div>
        }
      />
    </>
  );
}
