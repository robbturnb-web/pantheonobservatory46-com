import { DossierPageLayout } from '@/components/dossier/DossierPageLayout';
import { crashRetrievalEntries, crashRetrievalCategories } from '@/data/crash-retrieval';
import { pageThemes } from '@/lib/page-themes';
import { SEO } from '@/components/SEO';

export function CrashRetrievalPage() {
  return (
    <>
    <SEO
      title="Crash Retrieval Files — Roswell to 2023 Hearings | Pantheon"
      description="Recovered fragments, witness affidavits, Special Access Program leaks, and reverse-engineering testimony. Each entry weighted by confidence with both sides on record."
      path="/crash-retrieval"
      schema={{ '@context':'https://schema.org','@type':'CollectionPage', name:'Crash Retrieval Archive', url:'https://pantheonobservatory46.com/crash-retrieval', numberOfItems: crashRetrievalEntries.length }}
    />
    <DossierPageLayout
      theme={pageThemes.crash}
      entries={crashRetrievalEntries}
      categories={crashRetrievalCategories}
      introSlot={
        <p>
          Every recovered fragment is supposed to be impossible. This vault catalogs the alleged
          crash sites, the witness affidavits, the Special Access Program leaks, and the
          reverse-engineering testimony from Roswell to the 2023 congressional hearings. Where
          the official record contradicts the claim, we present both. Confidence labels mark how
          well each line item survives scrutiny.
        </p>
      }
    />
    </>
  );
}
