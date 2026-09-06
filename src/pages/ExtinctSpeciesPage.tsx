import { DossierPageLayout } from '@/components/dossier/DossierPageLayout';
import { extinctEntries, extinctCategories } from '@/data/extinct-species';
import { pageThemes } from '@/lib/page-themes';
import { SEO } from '@/components/SEO';

export function ExtinctSpeciesPage() {
  return (
    <>
    <SEO
      title="Extinct Species — Gigantopithecus, Denisovans, Thylacine | Pantheon"
      description="Eight species the museums catalogued, lost, or never confirmed. Verified science paired with the cryptozoological cases that refuse to die."
      path="/extinct"
      schema={{ '@context':'https://schema.org','@type':'CollectionPage', name:'Extinct Species Archive', url:'https://pantheonobservatory46.com/extinct', numberOfItems: extinctEntries.length }}
    />
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
    </>
  );
}
