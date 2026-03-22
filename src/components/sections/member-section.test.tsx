import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemberSection } from "./member-section";

describe("MemberSection", () => {
  it("メンバー名が表示される", () => {
    render(<MemberSection />);
    expect(screen.getByText("KO")).toBeInTheDocument();
    expect(screen.getByText("深津 蓮")).toBeInTheDocument();
  });

  it("役職が表示される", () => {
    render(<MemberSection />);
    expect(screen.getByText("CCO")).toBeInTheDocument();
    expect(screen.getByText("CTO")).toBeInTheDocument();
  });

  it("役職の正式名称が表示される", () => {
    render(<MemberSection />);
    expect(screen.getByText("Chief Creative Officer")).toBeInTheDocument();
    expect(screen.getByText("Chief Technology Officer")).toBeInTheDocument();
  });
});
