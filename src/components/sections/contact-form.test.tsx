import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./contact-form";

// trpc クライアントをモック
const mockMutate = vi.fn();
let mockMutationState: {
  isPending: boolean;
  isError: boolean;
  onSuccess?: () => void;
};

vi.mock("@/lib/trpc/client", () => ({
  trpc: {
    contact: {
      submit: {
        useMutation: (opts: { onSuccess?: () => void }) => {
          mockMutationState.onSuccess = opts.onSuccess;
          return {
            mutate: (data: unknown) => {
              mockMutate(data);
              mockMutationState.onSuccess?.();
            },
            isPending: mockMutationState.isPending,
            isError: mockMutationState.isError,
          };
        },
      },
    },
  },
}));

describe("ContactForm", () => {
  beforeEach(() => {
    mockMutate.mockClear();
    mockMutationState = { isPending: false, isError: false };
  });

  it("フォーム初期状態でplaceholderとSend Inquiryボタンが表示される", () => {
    render(<ContactForm />);
    expect(screen.getByPlaceholderText("YOUR NAME")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("YOUR EMAIL")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("HOW CAN WE HELP?")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send inquiry/i }),
    ).toBeInTheDocument();
  });

  it("フォーム入力値を更新できる", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const nameInput = screen.getByPlaceholderText("YOUR NAME");
    await user.type(nameInput, "テスト太郎");
    expect(nameInput).toHaveValue("テスト太郎");

    const emailInput = screen.getByPlaceholderText("YOUR EMAIL");
    await user.type(emailInput, "test@example.com");
    expect(emailInput).toHaveValue("test@example.com");
  });

  it("送信成功後にサンクスメッセージが表示される", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText("YOUR NAME"), "テスト");
    await user.type(
      screen.getByPlaceholderText("YOUR EMAIL"),
      "test@example.com",
    );
    await user.type(screen.getByPlaceholderText("HOW CAN WE HELP?"), "テスト");
    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    expect(
      screen.getByText("お問い合わせありがとうございます。"),
    ).toBeInTheDocument();
  });

  it("送信失敗時にエラーメッセージが表示される", () => {
    mockMutationState = { isPending: false, isError: true };
    render(<ContactForm />);

    expect(
      screen.getByText("送信に失敗しました。もう一度お試しください。"),
    ).toBeInTheDocument();
  });

  it("Let's Talkヘッダーが表示される", () => {
    render(<ContactForm />);
    expect(screen.getByText("Let's Talk")).toBeInTheDocument();
  });
});
