import { describe, it, expect, vi, beforeEach } from "vitest";
import { appRouter } from "../index";

vi.stubEnv("CONTACT_EMAIL_TO", "info@nudel.co.jp");

const mockSend = vi.fn();

vi.mock("@/lib/email/resend", () => ({
  getResendClient: () => ({
    emails: { send: mockSend },
  }),
}));

const createCaller = () => appRouter.createCaller({});

describe("contact.submit", () => {
  beforeEach(() => {
    mockSend.mockReset();
    mockSend.mockResolvedValue({ data: { id: "test-id" }, error: null });
  });

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

  it("メールが2通送信される（管理者通知 + 自動返信）", async () => {
    const caller = createCaller();
    await caller.contact.submit({
      name: "テスト太郎",
      email: "test@example.com",
      message: "テストメッセージ",
    });
    expect(mockSend).toHaveBeenCalledTimes(2);
  });

  it("管理者通知メールの送信先とreplyToが正しい", async () => {
    const caller = createCaller();
    await caller.contact.submit({
      name: "テスト太郎",
      email: "test@example.com",
      message: "テスト",
    });

    const adminCall = mockSend.mock.calls.find(
      (call: unknown[]) => (call[0] as { to: string }).to === "info@nudel.co.jp",
    );
    expect(adminCall).toBeDefined();
    expect(adminCall![0]).toMatchObject({
      to: "info@nudel.co.jp",
      replyTo: "test@example.com",
    });
  });

  it("自動返信メールの送信先がお客様メールアドレス", async () => {
    const caller = createCaller();
    await caller.contact.submit({
      name: "テスト太郎",
      email: "customer@example.com",
      message: "テスト",
    });

    const replyCall = mockSend.mock.calls.find(
      (call: unknown[]) => (call[0] as { to: string }).to === "customer@example.com",
    );
    expect(replyCall).toBeDefined();
  });

  it("Resend APIエラー時にエラーをスローする", async () => {
    mockSend.mockResolvedValue({
      data: null,
      error: { message: "API error", name: "api_error" },
    });

    const caller = createCaller();
    await expect(
      caller.contact.submit({
        name: "テスト太郎",
        email: "test@example.com",
        message: "テスト",
      }),
    ).rejects.toThrow("メールの送信に失敗しました");
  });

  it("ネットワークエラー時にエラーをスローする", async () => {
    mockSend.mockRejectedValue(new Error("Network error"));

    const caller = createCaller();
    await expect(
      caller.contact.submit({
        name: "テスト太郎",
        email: "test@example.com",
        message: "テスト",
      }),
    ).rejects.toThrow();
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
