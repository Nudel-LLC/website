import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "./navbar";

describe("Navbar", () => {
  it("サイト名が表示される", () => {
    render(<Navbar />);
    expect(screen.getByText("My App")).toBeInTheDocument();
  });

  it("ナビゲーション項目が表示される", () => {
    render(<Navbar />);
    expect(screen.getAllByText("About").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Contact").length).toBeGreaterThan(0);
  });

  it("モバイルトグルボタンが存在する", () => {
    render(<Navbar />);
    expect(screen.getByLabelText("メニューを開く")).toBeInTheDocument();
  });

  it("トグルクリックでaria-labelが切り替わる", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const toggleButton = screen.getByLabelText("メニューを開く");
    await user.click(toggleButton);
    expect(screen.getByLabelText("メニューを閉じる")).toBeInTheDocument();

    await user.click(screen.getByLabelText("メニューを閉じる"));
    expect(screen.getByLabelText("メニューを開く")).toBeInTheDocument();
  });
});
