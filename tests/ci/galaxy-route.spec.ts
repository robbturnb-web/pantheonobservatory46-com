import { expect, test } from "@playwright/test";

test.describe("Galaxy Explorer route", () => {
  test("renders the explorer and its guided-tour control", async ({ page }) => {
    await page.goto("/galaxy", { waitUntil: "domcontentloaded" });

    await expect(
      page.getByRole("heading", { name: "Galaxy Explorer" }).first(),
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: /Let Echo Guide You/i }),
    ).toBeVisible();
  });

  test("starts Echo's tour when requested", async ({ page }) => {
    await page.goto("/galaxy", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: /Let Echo Guide You/i }).click();

    await expect(page.getByText(/Echo • Mercury/i)).toBeVisible();
    await expect(page.getByText("1/9")).toBeVisible();
  });
});
