import { describe, it, expect } from "vitest";
import {
  NAV_ITEMS,
  FOUNDER,
  MEMBERS,
  SITE_CONFIG,
} from "./constants";

describe("NAV_ITEMS", () => {
  it("4つのアイテムがあり、全てname/hrefを持つ", () => {
    expect(NAV_ITEMS).toHaveLength(4);
    for (const item of NAV_ITEMS) {
      expect(item.name).toBeTruthy();
      expect(item.href).toBeTruthy();
    }
  });
});

describe("FOUNDER", () => {
  it("name/nameEn/title/image/bioを持つ", () => {
    expect(FOUNDER.name).toBeTruthy();
    expect(FOUNDER.nameEn).toBeTruthy();
    expect(FOUNDER.title).toBeTruthy();
    expect(FOUNDER.image).toBeTruthy();
    expect(FOUNDER.bio.length).toBeGreaterThan(0);
  });
});

describe("MEMBERS", () => {
  it("2人のメンバーがあり、全てname/nameEn/title/imageを持つ", () => {
    expect(MEMBERS).toHaveLength(2);
    for (const member of MEMBERS) {
      expect(member.name).toBeTruthy();
      expect(member.nameEn).toBeTruthy();
      expect(member.title).toBeTruthy();
      expect(member.image).toBeTruthy();
    }
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
