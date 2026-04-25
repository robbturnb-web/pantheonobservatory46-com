import { DossierPageLayout } from '@/components/dossier/DossierPageLayout';
import { federationEntries, federationCategories } from '@/data/federation';
import { pageThemes } from '@/lib/page-themes';

export function FederationPage() {
  return (
    <DossierPageLayout
      theme={pageThemes.federation}
      entries={federationEntries}
      categories={federationCategories}
      introSlot={
        <p>
          Every "Galactic Federation" claim of the modern era — the Adamski / Van Tassel
          contactee lineage, the Council of Nine channeled through Andrija Puharich's lab,
          the Andromeda Council of Alex Collier, Israeli space-security chief Haim Eshed's
          2020 statement, the alleged Greada Treaty at Holloman, Project Serpo, the
          Sphere-Being Alliance, and the Rendlesham binary download. Each entry is presented
          with its origin, primary sources, named witnesses, and the strongest skeptical
          counter-position. The vault is a catalog, not an endorsement.
        </p>
      }
    />
  );
}
