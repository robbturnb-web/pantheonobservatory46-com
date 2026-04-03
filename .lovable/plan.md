

# Phase 5: Testing, Echo XP System & Cinematic Post-Processing

Six workstreams: browser testing of existing features, then building the Echo XP/rank system, adding cinematic post-processing, and a full review pass.

---

## 1. Test Galaxy Tour & Moons (Browser)

Navigate to `/galaxy`, click "Let Echo Guide You", verify:
- Spaceship mesh appears and moves between planets
- Camera follows, narration panel cycles Mercury → Pluto
- Stop/skip controls work
- After tour: click Earth, Jupiter, Saturn — verify moon orbits render
- Click Moon, Europa, Titan — verify info panel shows moon data
- Check Saturn rings, Uranus tilt, asteroid belt

Fix any issues found before proceeding.

## 2. Test Echoverse Signup & Chat (Browser)

Navigate to `/echoverse`, verify:
- Channel list loads (5 channels from DB)
- "Sign In" button opens AuthModal
- Signup flow works (email + password + username)
- After auth: message input appears, can send a message
- Message appears in real-time feed
- Sign out works

## 3. Test Pyramid Explorer (Browser)

Navigate to `/pyramids`, verify:
- 6 pyramids render in 3D scene
- Click a pyramid → info panel slides in with facts, alignments, theories
- Alignment lines visible (Orion/Sirius)
- Orbit controls (drag/zoom) work
- Close info panel works

## 4. Build Echo XP & Rank System

A global progression system that tracks user exploration and rewards knowledge.

**Database migration:**
- `echo_xp` table: `id`, `user_id` (FK auth.users), `xp` (integer, default 0), `rank` (text, default 'Initiate'), `pages_visited` (jsonb, default '[]'), `created_at`, `updated_at`
- RLS: users can read/update own row only
- Trigger to auto-create row on signup (extend existing `handle_new_user` function)

**Rank tiers** (stored as constants in frontend):
- 0 XP → Initiate
- 100 XP → Seeker
- 300 XP → Adept
- 600 XP → Mystic
- 1000 XP → Oracle
- 2000 XP → Ascended

**XP sources:**
- First visit to each page: +10 XP (tracked in `pages_visited` jsonb)
- Sending a message in Echoverse: +5 XP
- Asking Echo AI a question: +5 XP
- Clicking a planet/pyramid/whistleblower for info: +2 XP

**Frontend:**
- `src/hooks/use-echo-xp.ts` — hook that reads/updates XP from DB, computes rank
- `src/components/XPBar.tsx` — small floating widget (bottom-right or top-right) showing current rank, XP progress bar to next rank, with neon-green glow
- XP toast notifications on gain ("✨ +10 XP — Seeker rank unlocked!")
- Integrate XP calls into: page navigation (Layout), Echoverse message send, Echo AI send, planet/pyramid clicks

**Files:** Migration SQL, `src/hooks/use-echo-xp.ts`, `src/components/XPBar.tsx`, edits to `Layout.tsx`, `MessageFeed.tsx`, `use-echo-chat.ts`, `SolarSystem.tsx`, `PyramidScene.tsx`

## 5. Cinematic Post-Processing Effects

Add bloom and god-ray effects to the Galaxy Explorer and Pyramid Explorer using `@react-three/postprocessing`.

**Galaxy Explorer (`SolarSystem.tsx`):**
- Add `EffectComposer` with `Bloom` (luminanceThreshold: 0.3, intensity: 1.5)
- Sun and planet atmospheres will naturally glow
- Spaceship engine glow enhanced

**Pyramid Explorer (`PyramidScene.tsx`):**
- Add `EffectComposer` with `Bloom` (luminanceThreshold: 0.5, intensity: 0.8)
- Alignment lines and pyramid edges glow dramatically
- Star markers get halo effect

**Package:** `@react-three/postprocessing@^2.16` + `postprocessing@^6.36`

**Files:** `src/components/galaxy/SolarSystem.tsx`, `src/components/pyramid/PyramidScene.tsx`, `package.json`

## 6. Full Review Pass

After all builds, navigate every page in sequence and verify:
- Home → Timeline → UAP → Gods → Consciousness → Signals → Whistleblowers → Telescopes → Galaxy → Pyramids → Echoverse → Origin Chamber → Echo AI
- Check: page loads, no console errors, navigation works, cosmic cursor trail active, starfield background renders
- Verify navbar links all work on mobile (384px viewport)
- Report any broken pages or missing content

---

## Technical Notes

- XP system requires auth — anonymous users see the XP bar but with "Sign in to track progress" prompt
- Post-processing uses selective bloom via `meshBasicMaterial` (emissive materials bloom, standard materials don't)
- All testing done via browser tools before and after code changes
- Existing `handle_new_user` trigger extended to also insert into `echo_xp`

