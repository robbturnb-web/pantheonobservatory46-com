import { DossierPageLayout } from '@/components/dossier/DossierPageLayout';
import { undergroundBaseEntries, undergroundBaseCategories } from '@/data/underground-bases';
import { pageThemes } from '@/lib/page-themes';
import { SEO } from '@/components/SEO';

export function UndergroundBasesPage() {
  return (
    <>
    <SEO
      title="Underground Bases — DUMBs, Dulce, S-4 & Continuity Bunkers | Pantheon"
      description="From Mount Weather and Cheyenne to the alleged DUMBs network and Dulce levels — verified continuity-of-government sites separated from whistleblower-only claims."
      path="/underground"
      schema={{ '@context':'https://schema.org','@type':'CollectionPage', name:'Underground Bases Archive', url:'https://pantheonobservatory46-com.lovable.app/underground', numberOfItems: undergroundBaseEntries.length }}
    />
    <DossierPageLayout
      theme={pageThemes.underground}
      entries={undergroundBaseEntries}
      categories={undergroundBaseCategories}
      introSlot={
        <p>
          The earth holds secrets that surface maps don't. From the declassified
          continuity-of-government bunkers — Mount Weather, Cheyenne, Site R — to the
          alleged DUMBs network mapped by Richard Sauder and the underground levels at
          Dulce and S-4 that surface only in whistleblower testimony, this archive sorts
          the verified from the alleged. Confidence labels indicate where each entry sits
          on the documentary spectrum.
        </p>
      }
    />
    </>
  );
}
