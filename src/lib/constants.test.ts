import { describe, it, expect } from "vitest";
import {
  NAV_ITEMS,
  SERVICES,
  FOUNDER,
  COMPANY_INFO,
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

describe("SERVICES", () => {
  it("4つのサービスがあり、全てtitle/description/icon/imageを持つ", () => {
    expect(SERVICES).toHaveLength(4);
    for (const service of SERVICES) {
      expect(service.title).toBeTruthy();
      expect(service.description).toBeTruthy();
      expect(service.icon).toBeDefined();
      expect(service.image).toBeTruthy();
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

describe("COMPANY_INFO", () => {
  it("3つの情報がある", () => {
    expect(COMPANY_INFO).toHaveLength(3);
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
