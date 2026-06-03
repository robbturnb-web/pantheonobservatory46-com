import { test, expect, Page } from "@playwright/test";

const ALL_ROUTES: Array<{ path: string; slug: string }> = [
  { path: "/",          slug: "home" },
  { path: "/the-46",    slug: "the-46" },
  { path: "/profile",   slug: "profile" },
  { path: "/echoverse", slug: "echoverse" },
  { path: "/pyramids",  slug: "pyramids" },
];

// Optional filter: set VISUAL_ROUTES to a comma-separated list (e.g. "/,/profile")
// to limit which routes are tested. Empty/unset = run all routes.
const filter = (process.env.VISUAL_ROUTES ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const ROUTES = filter.length
  ? ALL_ROUTES.filter((r) => filter.includes(r.path))
  : ALL_ROUTES;

if (filter.length && ROUTES.length === 0) {
  throw new Error(
    `VISUAL_ROUTES="${process.env.VISUAL_ROUTES}" matched no known routes. ` +
      `Valid routes: ${ALL_ROUTES.map((r) => r.path).join(", ")}`,
  );
}

async function gotoCodexFrom(page: Page, route: string) {
  // Visit the route first so location reflects it, then navigate to /codex
  // while preserving that the *previous* route is what determines active state.
  // The Codex page reads useLocation().pathname directly, so we simply load
  // /codex with the route appended as a hash to influence test snapshot naming,
  // but highlighting itself is driven by being ON that route. So we navigate
  // directly to each route, render the Codex grid by going to /codex, then
  // back-navigate. Simpler: just test /codex when current pathname IS that
  // route — meaning we render CodexPage at that pathname.
  await page.goto(route);
  // Inject CodexPage by navigating; but routing only renders CodexPage at /codex.
  // So instead: go to /codex and assert highlight matches pathname /codex
  // (Back to Temple) — for other routes we visit /codex via that route by
  // pushing history. We use client-side nav from /codex:
  await page.goto("/codex");
  if (route !== "/codex") {
    await page.evaluate((p) => window.history.replaceState({}, "", p), route);
    // Force re-render by dispatching popstate so react-router picks it up
    await page.evaluate(() => window.dispatchEvent(new PopStateEvent("popstate")));
  }
  await page.waitForSelector("text=THE 46 CODEX");
}

test.describe("Codex active-state visual regression", () => {
  for (const { path, slug } of ROUTES) {
    test(`gold highlight on ${path}`, async ({ page }) => {
      await gotoCodexFrom(page, path);
      // Wait for entrance animations to settle
      await page.waitForTimeout(1200);
      const grid = page.locator("main .grid").last();
      await expect(grid).toHaveScreenshot(`codex-grid-${slug}.png`);
    });
  }
});
