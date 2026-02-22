import { expect, test } from "@playwright/test";

test.skip(!!process.env.PLAYWRIGHT_BASE_URL, "Skipped on remote environments");

test.describe("Contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("#contact").scrollIntoViewIfNeeded();
  });

  test("displays form with correct placeholders", async ({ page }) => {
    await expect(page.getByText("Let's Talk")).toBeVisible();
    await expect(page.getByPlaceholder("YOUR NAME")).toBeVisible();
    await expect(page.getByPlaceholder("YOUR EMAIL")).toBeVisible();
    await expect(page.getByPlaceholder("HOW CAN WE HELP?")).toBeVisible();
  });

  test("accepts user input", async ({ page }) => {
    await page.getByPlaceholder("YOUR NAME").fill("テスト太郎");
    await page.getByPlaceholder("YOUR EMAIL").fill("test@example.com");
    await page.getByPlaceholder("HOW CAN WE HELP?").fill("テストメッセージ");

    await expect(page.getByPlaceholder("YOUR NAME")).toHaveValue("テスト太郎");
    await expect(page.getByPlaceholder("YOUR EMAIL")).toHaveValue("test@example.com");
    await expect(page.getByPlaceholder("HOW CAN WE HELP?")).toHaveValue("テストメッセージ");
  });

  test("shows success message on successful submission", async ({ page }) => {
    await page.route("**/api/trpc/**", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([{ result: { data: { json: { success: true } } } }]),
      });
    });

    await page.getByPlaceholder("YOUR NAME").fill("テスト太郎");
    await page.getByPlaceholder("YOUR EMAIL").fill("test@example.com");
    await page.getByPlaceholder("HOW CAN WE HELP?").fill("テストメッセージ");

    await page.getByRole("button", { name: /Send Inquiry/i }).click();

    await expect(page.getByText("お問い合わせありがとうございます。")).toBeVisible({ timeout: 10000 });
  });

  test("shows error message on failed submission", async ({ page }) => {
    await page.route("**/api/trpc/**", (route) => {
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify([{ error: { message: "Internal Server Error" } }]),
      });
    });

    await page.getByPlaceholder("YOUR NAME").fill("テスト太郎");
    await page.getByPlaceholder("YOUR EMAIL").fill("test@example.com");
    await page.getByPlaceholder("HOW CAN WE HELP?").fill("テストメッセージ");

    await page.getByRole("button", { name: /Send Inquiry/i }).click();

    await expect(page.getByText("送信に失敗しました。もう一度お試しください。")).toBeVisible({ timeout: 10000 });
  });

  test("validates required fields", async ({ page }) => {
    await page.getByRole("button", { name: /Send Inquiry/i }).click();

    const nameInput = page.getByPlaceholder("YOUR NAME");
    const isInvalid = await nameInput.evaluate(
      (el) => !(el as HTMLInputElement).validity.valid,
    );
    expect(isInvalid).toBe(true);
  });
});
