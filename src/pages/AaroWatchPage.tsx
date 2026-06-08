import { DossierPageLayout } from '@/components/dossier/DossierPageLayout';
import { aaroEntries, aaroCategories } from '@/data/aaro';
import { pageThemes } from '@/lib/page-themes';
import { SEO } from '@/components/SEO';

export function AaroWatchPage() {
  return (
    <>
    <SEO
      title="AARO Watch — Pentagon UAP Office Lineage | Pantheon"
      description="AATIP to UAPTF to AOIMSG to AARO — every annual report, leadership change, and congressional hearing tracked. Where AARO contradicts whistleblowers, both records appear."
      path="/aaro"
      schema={{ '@context':'https://schema.org','@type':'CollectionPage', name:'AARO Watch', url:'https://pantheonobservatory46-com.lovable.app/aaro', numberOfItems: aaroEntries.length }}
    />
    <DossierPageLayout
      theme={pageThemes.aaro}
      entries={aaroEntries}
      categories={aaroCategories}
      introSlot={
        <p>
          The Pentagon has had a UAP office, in some form, for almost two decades. AATIP became
          UAPTF, became AOIMSG, became AARO. This vault tracks the lineage, every annual report,
          the leadership transition from Sean Kirkpatrick to Jon Kosloski, and the congressional
          machinery — from the Grusch hearing to the Schumer-Rounds Disclosure Act — that has
          forced the office into public view. Where AARO contradicts the whistleblowers, both
          records are presented.
        </p>
      }
    />
    </>
  );
}
