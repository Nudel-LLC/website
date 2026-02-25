import { expect, test } from "@playwright/test";

test.describe("Services", () => {
  test.describe("Top page service cards", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
    });

    test("service cards link to detail pages", async ({ page }) => {
      const services = page.locator("#services");
      const firstCard = services.locator("a[href^='/services/']").first();

      await expect(firstCard).toBeVisible();
      const href = await firstCard.getAttribute("href");
      expect(href).toMatch(/^\/services\/.+/);
    });

    test("clicking a service card navigates to detail page", async ({ page }) => {
      const services = page.locator("#services");
      const firstCard = services.locator("a[href^='/services/']").first();

      await firstCard.click();
      await page.waitForURL(/\/services\/.+/);

      expect(page.url()).toMatch(/\/services\/.+/);
    });
  });

  test.describe("Service detail page", () => {
    test("returns HTTP 200", async ({ page }) => {
      // トップページからサービスのslugを取得して遷移
      await page.goto("/");
      const firstCard = page.locator("#services a[href^='/services/']").first();
      const href = await firstCard.getAttribute("href");

      const response = await page.goto(href!);
      expect(response?.status()).toBe(200);
    });

    test("displays service title and description", async ({ page }) => {
      await page.goto("/");
      const firstCard = page.locator("#services a[href^='/services/']").first();
      const href = await firstCard.getAttribute("href");

      await page.goto(href!);

      await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
      await expect(page.locator("nav")).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();
    });

    test("has back link to services section", async ({ page }) => {
      await page.goto("/");
      const firstCard = page.locator("#services a[href^='/services/']").first();
      const href = await firstCard.getAttribute("href");

      await page.goto(href!);

      const backLink = page.getByRole("link", { name: "サービス一覧に戻る" });
      await expect(backLink).toBeVisible();
      await expect(backLink).toHaveAttribute("href", "/#services");
    });

    test("back link navigates to top page services section", async ({ page }) => {
      await page.goto("/");
      const firstCard = page.locator("#services a[href^='/services/']").first();
      const href = await firstCard.getAttribute("href");

      await page.goto(href!);

      await page.getByRole("link", { name: "サービス一覧に戻る" }).click();
      await page.waitForURL("/#services");

      await expect(page.locator("#services")).toBeVisible();
    });

    test("displays service image", async ({ page }) => {
      await page.goto("/");
      const firstCard = page.locator("#services a[href^='/services/']").first();
      const href = await firstCard.getAttribute("href");

      await page.goto(href!);

      const serviceImage = page.locator("img[src*='microcms-assets.io']").first();
      await expect(serviceImage).toBeVisible();
    });

    test("has correct meta title", async ({ page }) => {
      await page.goto("/");
      const firstCard = page.locator("#services a[href^='/services/']").first();
      const href = await firstCard.getAttribute("href");

      await page.goto(href!);

      await expect(page).toHaveTitle(/Nudel LLC/);
    });
  });

  test.describe("Non-existent service", () => {
    test("returns 404 for unknown slug", async ({ page }) => {
      const response = await page.goto("/services/non-existent-service-12345");
      expect(response?.status()).toBe(404);
    });
  });
});
