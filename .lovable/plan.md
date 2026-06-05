# Polish Pass — 3-Part Plan

A focused, surgical pass to lock in the foundations before adding more surface area. All work stays within frontend/presentation + one small DB read pattern check. No new features.

---

## Part 1 — Orb Report auth UX hardening

**Goal:** Make the sign-in gate feel native, not punishing. Users should never lose their draft or get stranded.

### Changes to `src/pages/OrbReportPage.tsx`
1. **Persist draft across redirects** — On every form change, write `{location, date, description, email}` to `sessionStorage` under key `pantheon:orb-draft`. On mount, rehydrate if present. Clear on successful submit.
2. **Replace toast-on-block with inline locked state** — When `authChecked && !user`, render the form fields as visually disabled with a centered "Sign in to log your sighting" call-to-action card overlaying the submit area. Uses emerald `text-realm-disclosure` accent + `Lock` icon (already imported).
3. **Smart redirect** — CTA links to `/auth?redirect=/orb-report`. Add a small "Your draft is saved" microcopy line in muted text.
4. **Post-login auto-return** — In `AuthPage.tsx`, read `?redirect=` from the URL and `navigate(redirect)` after successful sign-in/sign-up (fallback `/`).

### Changes to `src/pages/AuthPage.tsx`
- Parse `redirect` query param via `useSearchParams`.
- Validate it starts with `/` (no external URLs) before using.
- Pass through to the post-auth `navigate()` call.

**Acceptance:** Type a sighting → hit submit while logged out → see locked overlay → click CTA → sign in → land back on `/orb-report` with fields still populated.

---

## Part 2 — HeroSection rollout to flagship realm pages

**Goal:** Every primary realm page opens with the same cinematic vocabulary. Realm accent hierarchy becomes visible at a glance.

### Pages to refactor (use existing `HeroSection` component, `variant="section"`)

| Page | Label | Title | Accent | Atmosphere |
|---|---|---|---|---|
| `MissingPage.tsx` | "Disclosure · Persons of Interest" | "The Missing" | `#10b981` (disclosure emerald) | `scanline: true` |
| `GodsPage.tsx` | "Realm of Gods · Pantheon" | "Gods & Mythos" | `#D6B35A` (gods gold) | `radial: true` |
| `ConsciousnessPage.tsx` | "Realm of Consciousness" | "Mind, Soul & Signal" | `#4F46E5` (indigo) | `radial: true, orbs: true` |
| `BlackProgramsPage.tsx` | "Classified · Black Projects" | "Black Programs Archive" | `#DC2626` (crimson) | `scanline: true` |
| `EchoPage.tsx` | "Echo · Live Intelligence" | "Echo AI" | `#E5F8FF` (echo white-cyan) | `radial: true` |
| `WhistleblowerVaultPage.tsx` | "Deep Archive · Testimony" | "Whistleblower Vault" | `#7F1D1D` (dark red) | `scanline: true` |
| `Index.tsx` / Observatory | "Observatory · Frequency 46" | (keep existing brand title if present) | `#7C3AED` (royal violet) | `radial: true, orbs: true` |

For each page:
- Remove the existing inline `<header>` / `<h1>` block.
- Insert `<HeroSection ... />` at the top of the main content wrapper.
- Keep all existing tagline copy where strong; otherwise write a one-line tagline matching the realm's voice.
- Preserve all downstream content untouched.

**Acceptance:** Visiting any of the above pages presents the standardized hero with the correct realm token color. No hardcoded hex sneaks into the page bodies.

---

## Part 3 — Navbar mobile QA + split-category fix

**Goal:** Verify the recent Cosmos / Disclosure split doesn't break the 384px drawer or top bar.

### Investigation
- Open `/` at 384×674 (current viewport).
- Inspect `Navbar.tsx` mobile drawer: confirm both new categories render, icons aren't clipped, accent dots match realm tokens, no horizontal scroll.

### Likely fixes (apply only if issues confirmed)
- If drawer overflows: tighten vertical spacing (`gap-2` → `gap-1.5`) and reduce category header font size on mobile.
- If category headers wrap awkwardly: add `whitespace-nowrap` + slight letter-spacing reduction.
- If accent dots are inconsistent: ensure both Cosmos (cyan) and Disclosure (emerald) categories use the realm tokens not hardcoded hex.

### Deliverable
- Mobile-tested navbar with both new categories rendering cleanly.
- Brief screenshot confirmation in build mode.

---

## Out of scope (intentionally)
- Echo entry point in nav (next pass)
- SEO meta/JSON-LD pass (next pass)
- New pages or features
- Backend schema changes (orb_sightings RLS already in place from prior migration)

## Order of execution
1. Part 1 (Orb Report + AuthPage) — small, contained
2. Part 2 (HeroSection rollout) — 7 page edits in parallel
3. Part 3 (Navbar mobile QA) — verify + patch
