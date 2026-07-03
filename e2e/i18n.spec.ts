import { test, expect } from "@playwright/test";

test.describe("html lang attribute", () => {
  test("/en pages declare lang=en", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    await page.goto("/en/works");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });
});

test.describe("default locale (Japanese browser)", () => {
  test.use({ locale: "ja-JP" });

  test("/ declares lang=ja and stays unprefixed", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "ja");
  });

  test("/ja URLs redirect to the unprefixed canonical URL", async ({ page }) => {
    await page.goto("/ja/works");
    await expect(page).toHaveURL("/works");
    await expect(page.locator("html")).toHaveAttribute("lang", "ja");

    await page.goto("/ja");
    await expect(page).toHaveURL("/");
  });
});

test("sitemap lists both locales with hreflang alternates", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBe(true);

  const body = await response.text();
  expect(body).toContain("/en/works");
  expect(body).toContain("/works");
  expect(body).toContain('hreflang="en"');
  expect(body).toContain('hreflang="ja"');
});
