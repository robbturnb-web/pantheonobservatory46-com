import { expect, test } from "@playwright/test";

test.describe("Welcome walkthrough accessibility", () => {
  test("exposes a named dialog and can be dismissed with Escape", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem("pantheon_walkthrough_seen");
    });

    await page.goto("/", { waitUntil: "domcontentloaded" });

    const dialog = page.getByRole("dialog", { name: "Welcome, Starseed" });
    await expect(dialog).toBeVisible({ timeout: 8_000 });
    await expect(dialog).toHaveAttribute("aria-modal", "true");

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });
});
