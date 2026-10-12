# Codex UI regression checks

This Playwright suite checks that the Codex page renders its core interface across
mobile, tablet, and desktop browser projects.

## Run locally

```bash
bunx playwright test
```

## What is checked

- The `/codex` route renders the “THE 46 CODEX” heading.
- The Codex hero image is visible.
- The navigation grid renders all six links.

## Why this is not yet pixel-based visual regression

The previous test attempted to render `CodexPage` at unrelated URLs by changing
browser history after navigation. React Router unmounts `CodexPage` on those
routes, so the test timed out before reaching its screenshot assertions.

The repository also has no committed Playwright screenshot baselines. Until
trusted baselines can be generated and reviewed, this suite uses deterministic
UI assertions instead of pretending to detect pixel-level visual changes.
Once approved baseline screenshots are committed under
`tests/visual/__screenshots__/`, screenshot comparisons can be restored.

## CI

The GitHub Actions workflow runs on pushes and pull requests to `main`, and can
also be triggered manually from the Actions tab.
