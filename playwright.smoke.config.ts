import { defineConfig, devices } from "@playwright/test";

// Smoke tests run against the live deployed site (no local webServer).
// Override the target with SMOKE_BASE_URL when needed.
const baseURL = process.env.SMOKE_BASE_URL ?? "https://pantheonobservatory46.com";

export default defineConfig({
  testDir: "./tests/smoke",
  fullyParallel: true,
  retries: 2,
  reporter: "list",
  timeout: 60_000,
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["iPhone 13"] } },
  ],
});
