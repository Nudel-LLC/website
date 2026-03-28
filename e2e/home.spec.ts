import { expect, test } from "@playwright/test";

test.describe("Home page sections", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.describe("Hero", () => {
    test("displays main heading", async ({ page }) => {
      await expect(page.getByRole("heading", { level: 1 })).toContainText("ご縁を力に");
      await expect(page.getByRole("heading", { level: 1 })).toContainText("価値を形に");
    });

    test("displays CTA buttons with correct links", async ({ page }) => {
      const main = page.locator("main");

      const ourSolution = main.getByRole("link", { name: "Our Solution" });
      await expect(ourSolution).toBeVisible();
      await expect(ourSolution).toHaveAttribute("href", "#strength");

      const contact = main.getByRole("link", { name: "CONTACT", exact: true });
      await expect(contact).toBeVisible();
      await expect(contact).toHaveAttribute("href", "#contact");
    });

    test("displays subtitle text", async ({ page }) => {
      await expect(
        page.getByText("企業や個人の魅力を見つけ形にするクリエイティブパートナー"),
      ).toBeVisible();
    });
  });

  test.describe("Strength", () => {
    test.beforeEach(async ({ page }) => {
      await page.locator("#strength").scrollIntoViewIfNeeded();
    });

    test("displays section heading", async ({ page }) => {
      const heading = page.locator("#strength").getByRole("heading", { level: 2 });
      await expect(heading).toContainText("バラバラを、");
      await expect(heading).toContainText("ひとつに繋ぐ。");
    });

    test("displays three strength cards", async ({ page }) => {
      const strength = page.locator("#strength");
      await expect(strength.getByText("圧倒的スピード")).toBeVisible();
      await expect(strength.getByText("一貫したクオリティ")).toBeVisible();
      await expect(strength.getByText("スペシャリストが所属")).toBeVisible();
    });
  });

  test.describe("Founder", () => {
    test.beforeEach(async ({ page }) => {
      await page.locator("#founder").scrollIntoViewIfNeeded();
    });

    test("displays founder name and title", async ({ page }) => {
      const founder = page.locator("#founder");
      await expect(founder.getByText("岡崎 美玖")).toBeVisible();
      await expect(founder.getByText("代表")).toBeVisible();
    });
  });

  test.describe("Member", () => {
    test.beforeEach(async ({ page }) => {
      await page.locator("#member").scrollIntoViewIfNeeded();
    });

    test("displays team members with titles", async ({ page }) => {
      const member = page.locator("#member");
      await expect(member.getByText("KO", { exact: true }).first()).toBeVisible();
      await expect(member.getByText("CCO", { exact: true })).toBeVisible();
      await expect(member.getByText("深津 蓮")).toBeVisible();
      await expect(member.getByText("CTO", { exact: true })).toBeVisible();
    });
  });

  test.describe("Services", () => {
    test.beforeEach(async ({ page }) => {
      await page.locator("#services").scrollIntoViewIfNeeded();
    });

    test("displays service cards", async ({ page }) => {
      const services = page.locator("#services");

      // サービスカードが1件以上表示されていることを確認（CMS内容に依存しない）
      const cards = services.locator("a[href^='/services/']");
      await expect(cards.first()).toBeVisible();
      const count = await cards.count();
      expect(count).toBeGreaterThan(0);
    });

    test("displays section heading badge", async ({ page }) => {
      const services = page.locator("#services");
      await expect(services.getByText("What We Do")).toBeVisible();
    });
  });

  test.describe("Company", () => {
    test("displays company deck section", async ({ page }) => {
      const company = page.locator("#company");

      await expect(company.getByText("COMPANY")).toBeVisible();
      await expect(company.getByText("DECK")).toBeVisible();
    });

    test("displays company deck iframe", async ({ page }) => {
      const iframe = page.locator("#company").locator("iframe[title='Company Deck']");
      await expect(iframe).toBeAttached();
    });
  });

  test.describe("Footer", () => {
    test("displays contact email", async ({ page }) => {
      await expect(page.locator("footer").getByText("info@nudel.co.jp")).toBeVisible();
    });

    test("displays copyright", async ({ page }) => {
      await expect(page.locator("footer").getByText(/© \d{4} Nudel LLC/)).toBeVisible();
    });

    test("displays social links with correct hrefs", async ({ page }) => {
      const footer = page.locator("footer");

      const twitterLink = footer.getByRole("link", { name: "Twitter (X)" });
      await expect(twitterLink).toBeVisible();
      await expect(twitterLink).toHaveAttribute("href", "https://x.com/aaamiku39");

      const instagramLink = footer.getByRole("link", { name: "Instagram" });
      await expect(instagramLink).toBeVisible();
      await expect(instagramLink).toHaveAttribute(
        "href",
        "https://www.instagram.com/ramen_miku39_/",
      );
    });
  });
});
