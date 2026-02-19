import { describe, it, expect } from "vitest";
import { appRouter } from "../index";

const createCaller = () => appRouter.createCaller({});

describe("contact.submit", () => {
  it("有効な入力で { success: true } を返す", async () => {
    const caller = createCaller();
    const result = await caller.contact.submit({
      name: "テスト太郎",
      email: "test@example.com",
      message: "お問い合わせです",
    });
    expect(result).toEqual({
      success: true,
      message: "お問い合わせありがとうございます。",
    });
  });

  it("name空でバリデーションエラー", async () => {
    const caller = createCaller();
    await expect(
      caller.contact.submit({
        name: "",
        email: "test@example.com",
        message: "テスト",
      }),
    ).rejects.toThrow();
  });

  it("email不正でバリデーションエラー", async () => {
    const caller = createCaller();
    await expect(
      caller.contact.submit({
        name: "テスト",
        email: "invalid-email",
        message: "テスト",
      }),
    ).rejects.toThrow();
  });

  it("message空でバリデーションエラー", async () => {
    const caller = createCaller();
    await expect(
      caller.contact.submit({
        name: "テスト",
        email: "test@example.com",
        message: "",
      }),
    ).rejects.toThrow();
  });

  it("emailフィールド欠落でエラー", async () => {
    const caller = createCaller();
    await expect(
      // @ts-expect-error emailフィールドを意図的に省略
      caller.contact.submit({
        name: "テスト",
        message: "テスト",
      }),
    ).rejects.toThrow();
  });
});
