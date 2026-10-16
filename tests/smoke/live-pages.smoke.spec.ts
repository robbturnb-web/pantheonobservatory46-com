import { test, expect, type ConsoleMessage, type Page } from "@playwright/test";

/**
 * Post-deploy smoke test.
 *
 * Loads each public route on the live site and asserts:
 *   1. The HTTP response is 2xx.
 *   2. The page renders without uncaught exceptions.
 *   3. No console.error messages fire during load + idle.
 *
 * Run locally:
 *   bunx playwright test --config=playwright.smoke.config.ts
 * Override target:
 *   SMOKE_BASE_URL=https://staging.example.com bunx playwright test --config=playwright.smoke.config.ts
 */

const ROUTES = [
  "/",
  "/orb-report",
  "/gods",
  "/galaxy",
  "/uap",
  "/consciousness",
  "/echo",
  "/the-46",
  "/jwst",
  "/timeline",
  "/observatory",
];

// Known noise we don't want to fail the build on (third-party widgets, ad blockers, etc.).
const IGNORED_ERROR_PATTERNS: RegExp[] = [
  /Failed to load resource.*(net::ERR_BLOCKED_BY_CLIENT|net::ERR_FAILED)/i,
  /third[- ]party cookie/i,
  /\b(?:gtag|fbq|hotjar|posthog)\b/i,
  // Lovable preview badge / dev-only beacons
  /lovable\.dev\/.+(badge|beacon)/i,
];

function shouldIgnore(text: string) {
  return IGNORED_ERROR_PATTERNS.some((re) => re.test(text));
}

function attachListeners(page: Page) {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  const onConsole = (msg: ConsoleMessage) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    if (shouldIgnore(text)) return;
    consoleErrors.push(text);
  };
  const onPageError = (err: Error) => {
    const text = `${err.name}: ${err.message}`;
    if (shouldIgnore(text)) return;
    pageErrors.push(text);
  };

  page.on("console", onConsole);
  page.on("pageerror", onPageError);

  return { consoleErrors, pageErrors };
}

for (const route of ROUTES) {
  test(`loads ${route} without console errors`, async ({ page }) => {
    const { consoleErrors, pageErrors } = attachListeners(page);

    const response = await page.goto(route, { waitUntil: "networkidle" });

    expect(response, `no response for ${route}`).not.toBeNull();
    expect(response!.status(), `bad status for ${route}`).toBeLessThan(400);

    // Confirm React actually mounted something into #root.
    await expect(page.locator("#root")).not.toBeEmpty({ timeout: 15_000 });

    // Give late effects (Three.js, audio, XP fetch) a chance to fire.
    await page.waitForTimeout(2_000);

    expect(
      pageErrors,
      `Uncaught page errors on ${route}:\n${pageErrors.join("\n")}`,
    ).toEqual([]);
    expect(
      consoleErrors,
      `console.error on ${route}:\n${consoleErrors.join("\n")}`,
    ).toEqual([]);
  });
}

test("orb report page offers sign-in or an interactive report form", async ({ page }) => {
  const { consoleErrors, pageErrors } = attachListeners(page);

  await page.goto("/orb-report", { waitUntil: "networkidle" });
  await expect(page.locator("#root")).not.toBeEmpty();

  // Submissions are intentionally gated behind authentication. Signed-out
  // visitors should see the sign-in prompt; signed-in visitors should see form controls.
  const signInPrompt = page.getByRole("heading", { name: /sign in to log a sighting/i });
  const formControls = page.locator("form input, form textarea, form button");
  await expect(signInPrompt.or(formControls.first())).toBeVisible({ timeout: 15_000 });

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
});
