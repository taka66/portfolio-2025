import { defineConfig } from "@playwright/test";

// Dedicated port so local runs don't collide with a dev server on 3000.
// CI runs against the production build (next start); local runs use the
// dev server so no build step is required.
const PORT = 3100;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // Single worker on CI: the WebGL hero renders through SwiftShader there and
  // parallel pages starve the 2-core runner, stalling client-side navigation.
  workers: process.env.CI ? 1 : undefined,
  expect: { timeout: 10_000 },
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    viewport: { width: 1440, height: 900 },
    trace: "on-first-retry",
  },
  webServer: {
    command: process.env.CI ? `npm run start -- -p ${PORT}` : `npm run dev -- -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
