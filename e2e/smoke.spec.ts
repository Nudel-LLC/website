import { expect, test } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("returns HTTP 200", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
  });

  test("has correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Nudel LLC/);
  });

  test("renders all major sections", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("nav")).toBeVisible();
    await expect(page.locator("#strength")).toBeVisible();
    await expect(page.locator("#services")).toBeVisible();
    await expect(page.locator("#company")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("includes JSON-LD structured data", async ({ page }) => {
    await page.goto("/");

    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();

    const content = await jsonLd.textContent();
    const data = JSON.parse(content!);
    expect(data["@type"]).toBe("Organization");
    expect(data.name).toBe("Nudel LLC");
  });
});
