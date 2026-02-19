import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn()", () => {
  it("単一クラス名をそのまま返す", () => {
    expect(cn("px-4")).toBe("px-4");
  });

  it("複数クラス名を結合する", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("条件付きクラス名（false/undefined/null）を正しく処理する", () => {
    expect(cn("px-4", false && "hidden", undefined, null, "py-2")).toBe(
      "px-4 py-2",
    );
  });

  it("Tailwindの競合クラスをマージする", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
  });

  it("引数なしで空文字列を返す", () => {
    expect(cn()).toBe("");
  });
});
