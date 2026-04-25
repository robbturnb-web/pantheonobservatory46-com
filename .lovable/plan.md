# Security Hardening Plan — Pantheon Observatory

I ran the real security scanner against your project. The pasted audit was generic Express advice and missed the actual issues. Here's what's truly broken and how I'll fix it.

---

## What the scan actually found (these are real)

```text
SEVERITY  ISSUE                                                        WHERE
─────────────────────────────────────────────────────────────────────────────────────────
ERROR     Users can rewrite their own XP and rank to any value         echo_xp table
ERROR     Users can forge XP event records (any event_type, any amount) echo_xp_events
WARN      Every user UUID is publicly readable                         profiles table
WARN      Any logged-in user can subscribe to every Realtime channel    realtime.messages
WARN      Any logged-in user can read every file in private buckets     storage policies
```

**Plain English:** Right now, anyone with a free account on your site can:
- Open the dev console and crown themselves "Ascended" rank with infinite XP
- Pull a list of every user UUID on the platform
- Eavesdrop on Echoverse channels they were never invited to
- Read every glyph SVG and testimony video another user uploaded

These are the door-locks that are actually missing. The audit you pasted was about a car you don't own.

---

## What from the pasted audit is real and worth doing

After checking your actual code:

```text
ITEM                              VERDICT
──────────────────────────────────────────────────────────────────
Helmet middleware                 N/A — no Express server
express-rate-limit                N/A — no Express, and Lovable says don't add yet
cors() middleware                 N/A — handled per edge function already
"OAuth state with btoa()"         N/A — you don't have that code anywhere
Dev server host: true             Cosmetic, dev-only — skipping
Security headers (CSP, etc.)      ✅ Real win. Ship via index.html meta tags.
YouTube ID validation             ✅ Real. VideoEmbed injects raw IDs into iframe src.
ErrorBoundary                     ✅ Real. You have none. A single crash blanks the site.
Mobile hook hydration flash       ✅ Real. useIsMobile returns false on first paint.
Theme localStorage whitelist      ⚪ N/A — no theme switcher reads raw localStorage.
Remove "add" from deps            ⚪ N/A — already clean.
Dedupe Google Fonts               ⚪ N/A — only loaded once.
```

---

## Plan — two batches

### BATCH 1 — Backend lockdown (the actual scan findings)

**1. Lock down `echo_xp`**
- Drop the client INSERT/UPDATE policies on `echo_xp`.
- Keep SELECT (users can see their own XP).
- All writes already go through `award_xp()` (SECURITY DEFINER) — the `guard_echo_xp_columns` trigger is in place but only fires for `authenticated` role; the policies are the actual hole. Removing them closes it.

**2. Lock down `echo_xp_events`**
- Drop any client INSERT policy.
- Keep "users can SELECT their own events" for the XP history UI.
- `award_xp()` already inserts as SECURITY DEFINER, so the app keeps working unchanged.

**3. Restrict `profiles` SELECT to authenticated users**
- Change policy from `USING (true)` → `USING (auth.uid() IS NOT NULL)`.
- Anonymous visitors no longer get a list of every user UUID. Logged-in users still see profiles where they need to (Echoverse messages, etc.).

**4. Scope `realtime.messages` to allowed channels**
- Replace the blanket `USING (true)` with topic scoping: only allow subscribe if the channel topic matches a permitted prefix (e.g. `echoverse:*` requires the user to be authenticated; private DMs require user-id match).
- I'll review existing channel naming first and write the policy to match — won't break anything in production.

**5. Scope storage buckets to ownership**
- `glyphs` and `testimony-media` policies become folder-scoped: a user can only read files under `<their-uuid>/...`.
- Anything that needs to be publicly readable (e.g. an approved testimony) gets explicit allowlisting via a join to the `testimonies` table.

**Migration is reversible.** I'll write each policy change as a single SQL migration, all RLS preserved, no data touched.

---

### BATCH 2 — Frontend hardening (the real items from the audit)

**1. Security headers via `index.html`**
Add balanced defaults as `<meta http-equiv>` tags + Lovable hosting headers:
```text
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://cdn.gpteng.co;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: blob: https://i.ytimg.com https://*.supabase.co;
  media-src 'self' blob: https://*.supabase.co;
  frame-src https://www.youtube-nocookie.com https://www.youtube.com;
  connect-src 'self' https://*.supabase.co wss://*.supabase.co
              https://api.lovable.dev;
  worker-src 'self' blob:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```
This is the **balanced** setting you picked. No site breakage; blocks injected scripts, untrusted iframes, MIME sniffing, and referrer leaks.

**2. Validate YouTube IDs in `VideoEmbed.tsx` and `TestimonyCard.tsx`**
- Add a one-line guard: `const safeId = /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null`.
- If invalid → render the "Open on YouTube" fallback CTA instead of an empty iframe.
- Same guard for the testimony-card YouTube parser.

**3. Add `ErrorBoundary` and wrap the app**
- New `src/components/ErrorBoundary.tsx` (class component, captures + resets).
- Friendly fallback UI styled to match the cosmic theme.
- Wrap `<Outlet />` inside `Layout.tsx` so a single page crash doesn't blank the navbar/footer.

**4. Fix `useIsMobile` hydration flash**
- Change return from `!!isMobile` to a tri-state object: `{ isMobile: boolean; ready: boolean }`.
- Components that care can gate behind `ready` to avoid the desktop-flash-then-mobile-snap.
- Keep a backwards-compatible export so existing call sites don't break (default to `false` until ready, same behavior as today, just no flash for new call sites that opt in).

---

## What I'm explicitly NOT doing (and why)

- **No Helmet, no express-rate-limit, no cors() middleware** — you have no Express server. Putting them in package.json would do literally nothing.
- **No OAuth-state CSRF "fix"** — that code doesn't exist in your project. Lovable Cloud's `lovable.auth.signInWithOAuth()` handles state for you.
- **No backend rate limiting** — Lovable's documented stance: backend doesn't have good rate-limit primitives yet. Better to wait than to ship ad-hoc.
- **No dev-server host change** — affects local dev only, not production.

---

## Order of work

Batch 1 first (backend) — it's where the real risk is. Then Batch 2 (frontend). I'll ask for migration approval before each SQL change so you can review what's being dropped/added.

After both batches, I'll re-run the scanner and report final state.

Reply **go** to start with Batch 1 (backend lockdown). If you want frontend first instead, say **frontend first**.