import { test, expect, type Page } from "@playwright/test";

async function gotoTopPage(page: Page) {
  await page.goto("/en");
  await expect(page.locator("#about")).toBeAttached();
}

test.describe("top page (desktop)", () => {
  test("mouse wheel scrolls the page", async ({ page }) => {
    // Regression test: overflow-x hidden + overscroll-behavior none on body
    // used to swallow all wheel events (fixed in c72a68c).
    await gotoTopPage(page);

    await page.mouse.move(720, 450);
    await page.mouse.wheel(0, 500);

    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(0);
  });

  test("header controls are not covered by other elements", async ({ page }) => {
    // Regression test: the hero <main> (-mt-16) used to sit above the header
    // and intercept all clicks on it (fixed in f83cb90).
    await gotoTopPage(page);

    const blocked = await page.evaluate(() => {
      const out: string[] = [];
      for (const el of document.querySelectorAll<HTMLElement>("header a, header button")) {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0) continue; // hidden at this viewport
        const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
        if (hit !== el && !el.contains(hit)) {
          out.push(el.textContent?.trim() || el.getAttribute("aria-label") || el.tagName);
        }
      }
      return out;
    });

    expect(blocked).toEqual([]);
  });

  test("header nav navigates between pages", async ({ page }) => {
    await gotoTopPage(page);

    await page.locator("header a", { hasText: "Works" }).click();
    await expect(page).toHaveURL(/\/en\/works$/);

    await page.locator("header a", { hasText: "Home" }).click();
    await expect(page).toHaveURL(/\/en$/);
  });

  test("loads without console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      // The Vercel Analytics script only exists on Vercel infrastructure,
      // so its 404 under a local/CI `next start` is expected noise.
      if (message.location().url.includes("/_vercel/")) return;
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(String(error)));

    await gotoTopPage(page);
    await page.waitForTimeout(1500); // let animations and the WebGL background settle

    expect(errors).toEqual([]);
  });

  test("scroll indicator is a button and scrolls to the About section", async ({ page }) => {
    await gotoTopPage(page);

    // force: the button bounces forever (animate-bounce), so Playwright's
    // stability check would never settle
    await page.getByRole("button", { name: "About me" }).click({ force: true });

    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(300);
  });

  test("active nav link is marked with aria-current", async ({ page }) => {
    await gotoTopPage(page);
    await expect(page.locator('header a[aria-current="page"]')).toHaveText("Home");

    await page.locator("header a", { hasText: "Works" }).click();
    await expect(page).toHaveURL(/\/en\/works$/);
    await expect(page.locator('header a[aria-current="page"]')).toHaveText("Works");
  });

  test("theme toggle keeps the WebGL canvas alive", async ({ page }) => {
    // Regression test: toggling the theme used to tear down and recreate the
    // whole WebGL context; it must only update the shader color uniform.
    await gotoTopPage(page);
    await expect(page.locator("main canvas")).toHaveCount(1);
    await page.evaluate(() => {
      document.querySelector("main canvas")?.setAttribute("data-original", "true");
    });

    await page.locator('header button[aria-label*="モード"]').click();
    await page.waitForTimeout(300);

    await expect(page.locator('main canvas[data-original="true"]')).toHaveCount(1);
  });

  test("no horizontal overflow", async ({ page }) => {
    await gotoTopPage(page);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test.describe("top page (mobile)", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("scrolls vertically without horizontal overflow", async ({ page }) => {
    await gotoTopPage(page);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);

    await page.mouse.move(180, 400);
    await page.mouse.wheel(0, 500);
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(0);
  });

  test("header nav is clickable", async ({ page }) => {
    await gotoTopPage(page);

    await page.locator("header a", { hasText: "Design" }).click();
    await expect(page).toHaveURL(/\/en\/design$/);
  });
});
