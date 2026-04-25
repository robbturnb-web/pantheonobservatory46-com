## Optimization Plan — 4 High-Value Wins

Implement all four refined optimizations across the Pantheon Observatory codebase.

### 1. Route-based code splitting (`src/App.tsx`)

Convert all 35+ page imports to `React.lazy()` and wrap `<Routes>` in `<Suspense>` with a themed cosmic loader fallback. The `Layout`, `Toaster`, `AuthPage`, and `ResetPasswordPage` stay eager since they're either always-mounted or critical entry points.

**Expected impact:** initial JS bundle drops from one giant chunk into ~35 small per-route chunks. First load on `/` no longer downloads code for `/cern`, `/galaxy`, `/pyramids`, etc. Big perceived-speed win on mobile.

### 2. Font optimization (`index.html` + `src/index.css`)

- Remove the render-blocking `@import url('...Space+Grotesk...')` from line 1 of `src/index.css`.
- Consolidate both font families into a single combined Google Fonts request in `index.html`, preceded by `<link rel="preload" as="style">` to prioritize.
- Result: one font request instead of two, no CSS-blocking @import, faster first paint.

### 3. Global ErrorBoundary (`src/App.tsx`)

The `ErrorBoundary` is already wrapped per-route inside `Layout.tsx`, which is good. Add a second top-level boundary inside `<App>` around `<BrowserRouter>` so router-level / provider crashes (auth pages too) get a friendly fallback instead of a blank screen.

### 4. Per-page SEO (lightweight, no dependency)

Skip `react-helmet-async` (adds a dependency + provider). Instead create `src/components/SEO.tsx` — a tiny hook-based component using a `useEffect` that mutates `document.title` and the description meta tag directly. Apply it to the top 8 pages: Home, UAP, Gods, Whistleblowers, The46, Antarctica, Atlantis, Federation. Each gets a unique title + description.

This is lighter than helmet, has zero dependencies, and works fine for SPA SEO crawlers that execute JS (Google, Bing).

---

### Files to edit

- `src/App.tsx` — lazy imports, Suspense, top-level ErrorBoundary
- `index.html` — combined preloaded font link
- `src/index.css` — remove `@import` line
- `src/components/SEO.tsx` — new file
- `src/pages/HomePage.tsx`, `UAPPage.tsx`, `GodsPage.tsx`, `WhistleblowerVaultPage.tsx`, `The46Page.tsx`, `AntarcticaPage.tsx`, `AtlantisPage.tsx`, `FederationPage.tsx` — add `<SEO>` tag

### Out of scope

Express/Helmet (no Node server), Wouter changes (using react-router), rate limiting (Supabase handles auth rate limits), Tailwind v4 tree-shaking (on v3).