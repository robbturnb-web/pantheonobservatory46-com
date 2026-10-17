import { expect, test } from "@playwright/test";

test.describe("My Archive", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("pantheon_walkthrough_seen", "true");
      localStorage.setItem("pantheon:archive:v1", JSON.stringify([
        {
          id: "saved-jwst",
          type: "investigation",
          title: "James Webb deep field",
          description: "A saved look at distant galaxies",
          href: "/jwst",
          createdAt: "2026-10-17T12:00:00.000Z",
          tags: ["cosmos", "JWST"]
        }
      ]));
    });
  });

  test("shows saved items from the shared archive store and lets visitors open them", async ({ page }) => {
    await page.goto("/archive", { waitUntil: "domcontentloaded" });

    await expect(page.getByRole("heading", { name: "My Archive" })).toBeVisible();
    await expect(page.getByText("James Webb deep field")).toBeVisible();
    await expect(page.getByText("A saved look at distant galaxies")).toBeVisible();
    await expect(page.getByRole("link", { name: /Open/ })).toHaveAttribute("href", "/jwst");
  });

  test("removes an item from the archive", async ({ page }) => {
    await page.goto("/archive", { waitUntil: "domcontentloaded" });

    await page.getByRole("button", { name: "Remove James Webb deep field from archive" }).click();

    await expect(page.getByText("James Webb deep field")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Your archive is empty" })).toBeVisible();
  });
});
