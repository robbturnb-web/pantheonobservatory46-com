import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldAlert, Eye, ArrowDown, ArrowRight } from 'lucide-react';
import { DossierPageLayout } from '@/components/dossier/DossierPageLayout';
import { blackProgramEntries, blackProgramCategories } from '@/data/black-programs';
import { pageThemes } from '@/lib/page-themes';
import { SEO } from '@/components/SEO';
import rubiksImg from '@/assets/black-programs/rubiks-cube.jpg';

/**
 * Black Programs Vault — flagship: Rubik's Cube, plus the full constellation
 * of alleged / acknowledged UAP Special Access Programs.
 */
export function BlackProgramsPage() {
  const theme = pageThemes.blackPrograms;

  return (
    <>
      <SEO
        title="Black Programs Vault — Rubik's Cube & UAP SAPs | Pantheon"
        description="Every alleged UAP Special Access Program in one vault — Rubik's Cube, Immaculate Constellation, Kona Blue, Legacy Program, AATIP, Stargate, Solar Warden, AARO and more. Sourced, graded, and cross-referenced."
        canonical="/black-programs"
      />
      <DossierPageLayout
        theme={theme}
        entries={blackProgramEntries}
        categories={blackProgramCategories}
        introSlot={
          <FeaturedRubiksCube />
        }
      />
    </>
  );
}

/** Cinematic featured spotlight rendered above the standard dossier grid. */
function FeaturedRubiksCube() {
  return (
    <div className="mt-2 mb-2">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full overflow-hidden rounded-xl border"
        style={{ borderColor: 'rgba(220, 38, 38, 0.4)' }}
      >
        {/* Cinematic banner */}
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <img
            src={rubiksImg}
            alt="Rubik's Cube — alleged UAP material analysis program"
            loading="lazy"
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Crimson scanlines + gradient overlays */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(5,2,3,0) 0%, rgba(5,2,3,0.35) 55%, rgba(5,2,3,0.98) 100%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(220,38,38,0.18) 0px, rgba(220,38,38,0.18) 1px, transparent 1px, transparent 3px)',
            }}
          />
          {/* Classification strip */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div
              className="inline-flex items-center gap-2 px-2.5 py-1 text-[10px] font-bold tracking-[0.3em] border"
              style={{
                color: '#DC2626',
                borderColor: '#DC2626',
                background: 'rgba(220,38,38,0.1)',
                fontFamily: "'Space Mono', monospace",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#DC2626' }} />
              UNACKNOWLEDGED SAP // CRITICAL READ
            </div>
            <span
              className="hidden md:inline text-[10px] font-bold tracking-[0.3em] opacity-70"
              style={{ color: '#fee2e2', fontFamily: "'Space Mono', monospace" }}
            >
              FILE 00 / 15
            </span>
          </div>

          {/* Title block */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#DC2626' }}>
              <ShieldAlert className="w-3.5 h-3.5" />
              Featured Dossier · 2024-2025 Disclosure Wave
            </div>
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.95] mb-3"
              style={{ color: '#fee2e2' }}
            >
              Rubik&rsquo;s Cube
            </h2>
            <p className="text-sm md:text-base max-w-2xl opacity-85" style={{ color: '#fee2e2' }}>
              The program they&rsquo;re not telling us about. Surfaced through Jake Barber, Ross
              Coulthart and the Shawn Ryan Show — a compartmented retrieval &amp; reverse-engineering
              effort named for material that reconfigures its own internal geometry like a cube
              being turned.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                to="/rubiks-cube"
                className="inline-flex items-center gap-2 px-3.5 py-2 text-[11px] font-bold tracking-[0.25em] rounded border transition-colors hover:bg-[rgba(220,38,38,0.2)]"
                style={{
                  color: '#fee2e2',
                  borderColor: '#DC2626',
                  background: 'rgba(220,38,38,0.12)',
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                OPEN DEDICATED DOSSIER
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-wider opacity-70" style={{ color: '#fca5a5' }}>
                <Eye className="w-3.5 h-3.5" />
                or scroll for the full vault
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <p className="mt-6 text-sm md:text-base opacity-85 leading-relaxed max-w-3xl">
        Every program in this vault is either officially chartered, publicly proposed, or alleged
        by a named whistleblower on the record. Confidence stamps mark how well each survives
        scrutiny — from <strong>VERIFIED</strong> (AATIP, Blue Book, Stargate, AARO) through{' '}
        <strong>REPORTED</strong> (Rubik&rsquo;s Cube, Immaculate Constellation) to{' '}
        <strong>ALLEGED</strong> (Solar Warden, MJ-12). Tap any file to open the full origin,
        evidence, skeptical counter-read, and source list.
      </p>
    </div>
  );
}
