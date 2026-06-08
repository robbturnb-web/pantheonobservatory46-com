import { DossierPageLayout } from '@/components/dossier/DossierPageLayout';
import { cernEntries, cernCategories } from '@/data/cern';
import { pageThemes } from '@/lib/page-themes';
import { SEO } from '@/components/SEO';

export function CernPage() {
  return (
    <>
    <SEO
      title="CERN Watch-Deck — Higgs, Mandela Effect, FCC | Pantheon"
      description="The Large Hadron Collider's verified physics — Higgs, antimatter asymmetry, AMS-02 — separated from Mandela Effect folklore. The 91-km FCC is next."
      path="/cern"
      schema={{ '@context':'https://schema.org','@type':'CollectionPage', name:'CERN Watch-Deck', url:'https://pantheonobservatory46-com.lovable.app/cern', numberOfItems: cernEntries.length }}
    />
    <DossierPageLayout
      theme={pageThemes.cern}
      entries={cernEntries}
      categories={cernCategories}
      introSlot={
        <p>
          The Large Hadron Collider is the most precise instrument humanity has ever built — and
          the most heavily mythologized. This watch-deck tracks the discoveries (Higgs, antimatter
          asymmetry, AMS-02 positron excess), the conspiracies (Mandela Effect, Shiva statue,
          black-hole fears), and the future (the 91-km FCC). Every entry separates verified physics
          from internet folklore.
        </p>
      }
    />
    </>
  );
}
