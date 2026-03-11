import { describe, it, expect } from "vitest";
import {
  NAV_ITEMS,
  COMPANY_INFO,
  SITE_CONFIG,
} from "./constants";

describe("NAV_ITEMS", () => {
  it("全てのアイテムがname/hrefを持つ", () => {
    expect(NAV_ITEMS.length).toBeGreaterThan(0);
    for (const item of NAV_ITEMS) {
      expect(item.name).toBeTruthy();
      expect(item.href).toBeTruthy();
    }
  });
});

describe("COMPANY_INFO", () => {
  it("情報がある", () => {
    expect(COMPANY_INFO.length).toBeGreaterThan(0);
  });
});

describe("SITE_CONFIG", () => {
  it("有効なURLを持つ", () => {
    expect(SITE_CONFIG.url).toMatch(/^https?:\/\//);
  });

  it("有効なemailを持つ", () => {
    expect(SITE_CONFIG.email).toMatch(/.+@.+\..+/);
  });
});
