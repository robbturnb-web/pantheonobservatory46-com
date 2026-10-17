import { expect, test } from "@playwright/test";

test("route pages without an explicit canonical use their own path", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("pantheon_walkthrough_seen", "true");
  });

  await page.goto("/sources", { waitUntil: "domcontentloaded" });

  await expect(page.locator('link[rel="canonical"][href="https://pantheonobservatory46.com/sources"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:url"][content="https://pantheonobservatory46.com/sources"]')).toHaveCount(1);
});
