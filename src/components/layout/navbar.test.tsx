import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "./navbar";

describe("Navbar", () => {
  it("ロゴ（Nudel LLC）が表示される", () => {
    render(<Navbar />);
    expect(screen.getByText("LLC")).toBeInTheDocument();
  });

  it("ナビゲーション項目が表示される", () => {
    render(<Navbar />);
    expect(screen.getAllByText("Concept").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Strength").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Services").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Company").length).toBeGreaterThan(0);
  });

  it("Contact リンクが #contact を指す", () => {
    render(<Navbar />);
    const contactLinks = screen
      .getAllByText(/contact/i)
      .filter(
        (el) => el.tagName === "A" && el.getAttribute("href") === "#contact",
      );
    expect(contactLinks.length).toBeGreaterThan(0);
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
