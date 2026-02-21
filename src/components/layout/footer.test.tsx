import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";

describe("Footer", () => {
  it("ソーシャルリンクが表示される", () => {
    render(<Footer />);
    expect(screen.getByText("Twitter (X)")).toBeInTheDocument();
    expect(screen.getByText("Instagram")).toBeInTheDocument();
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
  });

  it("メールアドレスが表示される", () => {
    render(<Footer />);
    expect(screen.getByText("info@nudel.co.jp")).toBeInTheDocument();
  });

  it("コピーライトが表示される", () => {
    render(<Footer />);
    expect(
      screen.getByText(/© 2026 Nudel LLC\. All Rights Reserved\./),
    ).toBeInTheDocument();
  });
});
