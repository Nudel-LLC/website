import { expect, test } from "@playwright/test";

test.describe("Home page sections", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.describe("Hero", () => {
    test("displays main heading", async ({ page }) => {
      await expect(page.getByRole("heading", { level: 1 })).toContainText("ご縁を力に、");
      await expect(page.getByRole("heading", { level: 1 })).toContainText("価値を形に。");
    });

    test("displays CTA buttons with correct links", async ({ page }) => {
      const ourSolution = page.getByRole("link", { name: "Our Solution" });
      await expect(ourSolution).toBeVisible();
      await expect(ourSolution).toHaveAttribute("href", "#strength");

      const getStarted = page.getByRole("link", { name: "Get Started" });
      await expect(getStarted).toBeVisible();
      await expect(getStarted).toHaveAttribute("href", "#contact");
    });
  });

  test.describe("Services", () => {
    test("displays service cards", async ({ page }) => {
      const services = page.locator("#services");

      // サービスカードが1件以上表示されていることを確認（CMS内容に依存しない）
      const cards = services.locator("a[href^='/services/']");
      await expect(cards.first()).toBeVisible();
      const count = await cards.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe("Company", () => {
    test("displays company name and location", async ({ page }) => {
      const company = page.locator("#company");

      await expect(company.getByText("Nudel合同会社")).toBeVisible();
      await expect(company.getByText("TOKYO, JP")).toBeVisible();
    });
  });

  test.describe("Footer", () => {
    test("displays contact email", async ({ page }) => {
      await expect(page.locator("footer").getByText("info@nudel.co.jp")).toBeVisible();
    });

    test("displays copyright", async ({ page }) => {
      await expect(page.locator("footer").getByText(/© \d{4} Nudel LLC/)).toBeVisible();
    });
  });
});
