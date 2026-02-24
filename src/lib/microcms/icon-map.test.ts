import { describe, it, expect } from "vitest";
import { Video, PenTool, Mic2, Zap } from "lucide-react";
import { ICON_MAP } from "./icon-map";
import type { ServiceIcon } from "./types";

describe("ICON_MAP", () => {
  const ALL_ICONS: ServiceIcon[] = ["video", "pen", "mic", "zap"];

  it("全ての ServiceIcon キーが定義されている", () => {
    for (const key of ALL_ICONS) {
      expect(ICON_MAP).toHaveProperty(key);
    }
  });

  it("video キーは Video コンポーネントを返す", () => {
    expect(ICON_MAP.video).toBe(Video);
  });

  it("pen キーは PenTool コンポーネントを返す", () => {
    expect(ICON_MAP.pen).toBe(PenTool);
  });

  it("mic キーは Mic2 コンポーネントを返す", () => {
    expect(ICON_MAP.mic).toBe(Mic2);
  });

  it("zap キーは Zap コンポーネントを返す", () => {
    expect(ICON_MAP.zap).toBe(Zap);
  });

  it("全ての値が React コンポーネント（関数またはオブジェクト）である", () => {
    for (const key of ALL_ICONS) {
      const type = typeof ICON_MAP[key];
      // lucide-react のコンポーネントは forwardRef でラップされ "object" になる場合がある
      expect(["function", "object"]).toContain(type);
      expect(ICON_MAP[key]).not.toBeNull();
    }
  });

  it("余分なキーが含まれていない", () => {
    const keys = Object.keys(ICON_MAP);
    expect(keys).toHaveLength(ALL_ICONS.length);
    for (const key of keys) {
      expect(ALL_ICONS).toContain(key);
    }
  });
});
