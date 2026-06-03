# Visual regression — Codex active state

Screenshot-based regression that locks the gold active-state styling of the
Codex button grid across all five routes (`/`, `/the-46`, `/profile`,
`/echoverse`, `/pyramids`) and three viewports (`mobile`, `tablet`, `desktop`).

## Run

```bash
# First time / after intentional design change → refresh baselines
bunx playwright test --update-snapshots

# Normal run → fail on any pixel drift > 1%
bunx playwright test
```

Baselines are committed under
`tests/visual/__screenshots__/codex-active-state.spec.ts/`.

## How it works

- `playwright.config.ts` boots `vite preview` on port 4173 as the web server.
- The spec loads `/codex`, then uses `history.replaceState` + a `popstate`
  event to spoof each target pathname so `useLocation()` inside `CodexPage`
  returns the route under test. The grid screenshot then captures whichever
  button is in the gold active state for that route.
- Animations are disabled by Playwright (`animations: "disabled"`) and a
  1.2s settle window covers the framer-motion entrance.
- Tolerance is `maxDiffPixelRatio: 0.01` — any styling drift larger than
  1% of pixels fails the test.

## Note

This sandbox does not have the system libraries Chromium requires
(`libglib`, `libnss`, etc.), so baselines must be generated in a normal
Linux/macOS environment or in CI.
