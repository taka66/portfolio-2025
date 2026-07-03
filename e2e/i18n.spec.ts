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

test("locale switcher works from an English browser on the top page", async ({ page }) => {
  // Regression test: the ja link used to be a <Link>, whose prefetch of "/"
  // ran before the NEXT_LOCALE cookie existed and cached the "/ -> /en"
  // redirect; clicking あ then replayed the cached redirect and the switch
  // silently failed for every visitor with a non-Japanese Accept-Language.
  await page.goto("/en");
  await expect(page.locator("#about")).toBeAttached();
  await page.waitForTimeout(1500); // give any prefetch time to be cached

  await page.locator('header a[hreflang="ja"]').click();
  await page.waitForLoadState();

  await expect(page).toHaveURL("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "ja");

  // Switching back to English still works
  await page.locator('header a[hreflang="en"]').click();
  await page.waitForLoadState();

  await expect(page).toHaveURL("/en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("top page is server-rendered with hreflang and canonical tags", async ({ request }) => {
  // The page used to render nothing until the dictionary loaded client-side;
  // the About section must now be part of the initial HTML.
  const response = await request.get("/en");
  const html = await response.text();

  expect(html).toContain('id="about"');
  expect(html).toContain('rel="canonical"');
  // Next serializes the attribute as hrefLang (camelCase); browsers don't care
  expect(html).toMatch(/hreflang="ja"/i);
  expect(html).toMatch(/hreflang="en"/i);
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
