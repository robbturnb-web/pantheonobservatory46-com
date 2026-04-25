import { DossierPageLayout } from '@/components/dossier/DossierPageLayout';
import { extinctEntries, extinctCategories } from '@/data/extinct-species';
import { pageThemes } from '@/lib/page-themes';

export function ExtinctSpeciesPage() {
  return (
    <DossierPageLayout
      theme={pageThemes.extinct}
      entries={extinctEntries}
      categories={extinctCategories}
      introSlot={
        <p>
          Eight species the natural-history museums catalogued, lost, or never quite confirmed.
          Gigantopithecus stood three meters tall. Denisovans live on inside 6% of Papuan DNA.
          The thylacine officially died in 1936 — yet the Tasmanian government still logs sightings.
          Each entry pairs the verified science with the cryptozoological case that won\'t go away.
        </p>
      }
    />
  );
}
