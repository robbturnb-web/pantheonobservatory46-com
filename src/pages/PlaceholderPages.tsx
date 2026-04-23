import { DossierPageLayout } from '@/components/dossier/DossierPageLayout';
import { pageThemes, type PageThemeId } from '@/lib/page-themes';
import type { DossierEntry } from '@/components/dossier/types';

interface PlaceholderProps {
  themeId: PageThemeId;
}

const empty: DossierEntry[] = [];

function Placeholder({ themeId }: PlaceholderProps) {
  return (
    <DossierPageLayout
      theme={pageThemes[themeId]}
      entries={empty}
      introSlot={
        <p className="opacity-70">
          This archive is being curated. Full dossiers, evidence logs, and verified
          videos arrive in the next enhancement batch.
        </p>
      }
    />
  );
}

export const AaroPage = () => <Placeholder themeId="aaro" />;
export const CrashRetrievalPage = () => <Placeholder themeId="crash" />;
export const UndergroundBasesPage = () => <Placeholder themeId="underground" />;
export const EntityEncountersPage = () => <Placeholder themeId="encounters" />;
export const ExtinctSpeciesPage = () => <Placeholder themeId="extinct" />;
export const CernPage = () => <Placeholder themeId="cern" />;
export const FederationPage = () => <Placeholder themeId="federation" />;
export const BuildersPage = () => <Placeholder themeId="builders" />;
export const GlyphsPage = () => <Placeholder themeId="glyphs" />;
export const StoneFacesPage = () => <Placeholder themeId="stoneFaces" />;
