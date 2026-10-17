import { expect, test } from "@playwright/test";

test("homepage Mystery of the Day persists a saved investigation into My Archive", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("pantheon_walkthrough_seen", "true");
    // addInitScript runs after every navigation. Clear stale test data only once,
    // otherwise navigating to /archive erases the item the test just saved.
    if (!sessionStorage.getItem("archive-save-test-initialized")) {
      localStorage.removeItem("pantheon:archive:v1");
      localStorage.removeItem("pantheon:saved-mysteries");
      sessionStorage.setItem("archive-save-test-initialized", "true");
    }
  });

  await page.goto("/", { waitUntil: "domcontentloaded" });
  const saveButton = page.getByRole("button", { name: "Save to Archive" });
  await saveButton.scrollIntoViewIfNeeded();
  await saveButton.click();

  await page.goto("/archive", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "My Archive" })).toBeVisible();
  await expect(page.getByText("The Lost Knowledge of the Pyramids")).toBeVisible();
  await expect(page.getByRole("link", { name: /Open/ })).toHaveAttribute("href", "/pyramids");
});
