import { DossierPageLayout } from '@/components/dossier/DossierPageLayout';
import { glyphsEntries, glyphsCategories } from '@/data/glyphs-dossier';
import { pageThemes } from '@/lib/page-themes';
import { SEO } from '@/components/SEO';

export function GlyphsPage() {
  return (
    <>
      <SEO
        title="Glyphs Codex — Cuneiform to Crop Circles | Pantheon"
        description="Twelve scripts, sigils, and geoglyphs humanity deciphered, half-decoded, or stared at for a century. Academic reading vs. ancient-astronaut interpretation, side by side."
        path="/glyphs"
        schema={{ '@context':'https://schema.org','@type':'CollectionPage', name:'Glyphs Codex', url:'https://pantheonobservatory46.com/glyphs', numberOfItems: glyphsEntries.length }}
      />
      <DossierPageLayout
        theme={pageThemes.glyphs}
        entries={glyphsEntries}
        categories={glyphsCategories}
        introSlot={
          <p>
            Twelve scripts, sigils, and geoglyphs that humanity has either deciphered, half-decoded,
            or stared at for a century without cracking. Each entry separates the literal academic
            reading from the ancient-astronaut interpretation, then lays the open questions on the
            table. From cuneiform to crop circles — the codex is open.
          </p>
        }
      />
    </>
  );
}
