import { test, expect } from "@playwright/test";

test.describe("Codex page UI regression", () => {
  test("renders the Codex hero and all navigation cards", async ({ page }) => {
    await page.goto("/codex");

    const heading = page.getByRole("heading", { name: "THE 46 CODEX" });
    await expect(heading).toBeVisible();

    const hero = page.getByRole("img", {
      name: "The 46 Codex — sacred temple archive",
    });
    await expect(hero).toBeVisible();

    const grid = page.locator("main .grid").last();
    await expect(grid).toBeVisible();
    await expect(grid.getByRole("link")).toHaveCount(6);

    for (const label of [
      "Browse Codex",
      "My Frequency Entries",
      "Add to Codex",
      "Community Highlights",
      "Ritual Blueprints",
      "Back to Temple",
    ]) {
      await expect(grid.getByRole("link", { name: new RegExp(label) })).toBeVisible();
    }
  });
});
