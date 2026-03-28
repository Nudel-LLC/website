import { expect, test } from "@playwright/test";

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.describe("Desktop", () => {
    test.skip(({ isMobile }) => isMobile, "Desktop only");

    test("displays nav links", async ({ page }) => {
      const nav = page.locator("nav");

      await expect(nav.getByRole("link", { name: "Concept" })).toBeVisible();
      await expect(nav.getByRole("link", { name: "Strength" })).toBeVisible();
      await expect(nav.getByRole("link", { name: "Services" })).toBeVisible();
      await expect(nav.getByRole("link", { name: "Company" })).toBeVisible();
    });

    test("displays Contact CTA button", async ({ page }) => {
      const contactBtn = page.locator("nav").getByRole("link", { name: "Contact" });
      await expect(contactBtn).toBeVisible();
      await expect(contactBtn).toHaveAttribute("href", "/#contact");
    });

    test("logo links to home page", async ({ page }) => {
      const logo = page.locator("nav").getByRole("link", { name: "Nudel" });
      await expect(logo).toBeVisible();
      await expect(logo).toHaveAttribute("href", "/");
    });
  });

  test.describe("Mobile", () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test("opens and closes hamburger menu", async ({ page }) => {
      const openBtn = page.getByRole("button", { name: "メニューを開く" });
      await expect(openBtn).toBeVisible();

      await openBtn.click();

      const closeBtn = page.getByRole("button", { name: "メニューを閉じる" });
      await expect(closeBtn).toBeVisible();

      await expect(page.getByRole("link", { name: "Concept" })).toBeVisible();
      await expect(page.getByRole("link", { name: "Strength" })).toBeVisible();
      await expect(page.getByRole("link", { name: "Services", exact: true })).toBeVisible();
      await expect(page.getByRole("link", { name: "Company" })).toBeVisible();

      await closeBtn.click();
      await expect(page.getByRole("button", { name: "メニューを開く" })).toBeVisible();
    });

    test("mobile Contact link has correct href", async ({ page }) => {
      const openBtn = page.getByRole("button", { name: "メニューを開く" });
      await openBtn.click();

      const contactLink = page.getByRole("link", { name: "CONTACT" });
      await expect(contactLink).toBeVisible();
      await expect(contactLink).toHaveAttribute("href", "/#contact");
    });
  });
});
