import { DossierPageLayout } from '@/components/dossier/DossierPageLayout';
import { crashRetrievalEntries, crashRetrievalCategories } from '@/data/crash-retrieval';
import { pageThemes } from '@/lib/page-themes';

export function CrashRetrievalPage() {
  return (
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
  );
}
