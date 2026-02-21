import { describe, it, expect } from "vitest";
import {
  escapeHtml,
  buildAdminNotificationEmail,
  buildAutoReplyEmail,
} from "./templates";

const sampleData = {
  name: "テスト太郎",
  email: "test@example.com",
  message: "お問い合わせです。",
};

describe("escapeHtml", () => {
  it("HTML特殊文字をエスケープする", () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;",
    );
  });

  it("アンパサンドとシングルクオートをエスケープする", () => {
    expect(escapeHtml("A & B's")).toBe("A &amp; B&#39;s");
  });

  it("エスケープ不要な文字列はそのまま返す", () => {
    expect(escapeHtml("こんにちは")).toBe("こんにちは");
  });
});

describe("buildAdminNotificationEmail", () => {
  it("件名にお客様名を含む", () => {
    const { subject } = buildAdminNotificationEmail(sampleData);
    expect(subject).toBe("[Nudel] お問い合わせ: テスト太郎 様");
  });

  it("本文にお問い合わせ内容を含む", () => {
    const { html } = buildAdminNotificationEmail(sampleData);
    expect(html).toContain("テスト太郎");
    expect(html).toContain("test@example.com");
    expect(html).toContain("お問い合わせです。");
  });

  it("HTMLをエスケープする", () => {
    const data = {
      name: '<script>alert("xss")</script>',
      email: "test@example.com",
      message: "<b>太字</b>",
    };
    const { html } = buildAdminNotificationEmail(data);
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<b>太字</b>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&lt;b&gt;太字&lt;/b&gt;");
  });

  it("改行を<br>に変換する", () => {
    const data = { ...sampleData, message: "1行目\n2行目" };
    const { html } = buildAdminNotificationEmail(data);
    expect(html).toContain("1行目<br>2行目");
  });
});

describe("buildAutoReplyEmail", () => {
  it("固定の件名を返す", () => {
    const { subject } = buildAutoReplyEmail(sampleData);
    expect(subject).toBe("[Nudel] お問い合わせありがとうございます");
  });

  it("本文にお客様名とメッセージ控えを含む", () => {
    const { html } = buildAutoReplyEmail(sampleData);
    expect(html).toContain("テスト太郎 様");
    expect(html).toContain("お問い合わせです。");
  });

  it("HTMLをエスケープする", () => {
    const data = {
      name: "<img src=x>",
      email: "test@example.com",
      message: "<div>test</div>",
    };
    const { html } = buildAutoReplyEmail(data);
    expect(html).not.toContain("<img src=x>");
    expect(html).not.toContain("<div>test</div>");
  });
});
