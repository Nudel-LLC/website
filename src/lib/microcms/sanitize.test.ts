import { describe, it, expect } from "vitest";
import { sanitizeCmsHtml, stripHtml } from "./sanitize";

describe("sanitizeCmsHtml", () => {
  describe("許可タグの通過", () => {
    it("見出しタグが許可される", () => {
      const input = "<h1>タイトル</h1><h2>サブタイトル</h2><h3>見出し3</h3>";
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("<h1>タイトル</h1>");
      expect(result).toContain("<h2>サブタイトル</h2>");
      expect(result).toContain("<h3>見出し3</h3>");
    });

    it("段落タグが許可される", () => {
      const input = "<p>本文テキスト</p>";
      expect(sanitizeCmsHtml(input)).toBe("<p>本文テキスト</p>");
    });

    it("リストタグが許可される", () => {
      const input = "<ul><li>項目1</li><li>項目2</li></ul>";
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("<ul>");
      expect(result).toContain("<li>項目1</li>");
    });

    it("強調タグが許可される", () => {
      const input = "<strong>太字</strong><em>斜体</em>";
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("<strong>太字</strong>");
      expect(result).toContain("<em>斜体</em>");
    });

    it("コードブロックが許可される", () => {
      const input = "<pre><code>const x = 1;</code></pre>";
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("<pre>");
      expect(result).toContain("<code>const x = 1;</code>");
    });

    it("テーブルタグが許可される", () => {
      const input =
        "<table><thead><tr><th>見出し</th></tr></thead><tbody><tr><td>データ</td></tr></tbody></table>";
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("<table>");
      expect(result).toContain("<th>見出し</th>");
      expect(result).toContain("<td>データ</td>");
    });

    it("figure / figcaption タグが許可される", () => {
      const input =
        '<figure><img src="https://example.com/image.jpg" alt="説明" /><figcaption>キャプション</figcaption></figure>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("<figure>");
      expect(result).toContain("<figcaption>キャプション</figcaption>");
    });
  });

  describe("リンク属性の検証", () => {
    it("https リンクが許可される", () => {
      const input = '<a href="https://nudel.co.jp">サイト</a>';
      expect(sanitizeCmsHtml(input)).toContain(
        'href="https://nudel.co.jp"',
      );
    });

    it("mailto リンクが許可される", () => {
      const input = '<a href="mailto:info@nudel.co.jp">メール</a>';
      expect(sanitizeCmsHtml(input)).toContain('href="mailto:info@nudel.co.jp"');
    });

    it("javascript: スキームは除去される", () => {
      const input = '<a href="javascript:alert(1)">クリック</a>';
      const result = sanitizeCmsHtml(input);
      expect(result).not.toContain("javascript:");
    });

    it("data: スキームは除去される", () => {
      const input = '<a href="data:text/html,<script>alert(1)</script>">リンク</a>';
      const result = sanitizeCmsHtml(input);
      expect(result).not.toContain("data:");
    });
  });

  describe("画像属性の検証", () => {
    it("src / alt / width / height 属性が許可される", () => {
      const input =
        '<img src="https://example.com/img.jpg" alt="説明" width="800" height="600" />';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain('src="https://example.com/img.jpg"');
      expect(result).toContain('alt="説明"');
      expect(result).toContain('width="800"');
      expect(result).toContain('height="600"');
    });

    it("onerror 等のイベントハンドラは除去される", () => {
      const input =
        '<img src="x" onerror="alert(1)" alt="broken" />';
      const result = sanitizeCmsHtml(input);
      expect(result).not.toContain("onerror");
    });
  });

  describe("インラインスタイルの検証", () => {
    it("span の style 属性（文字色）が許可される", () => {
      const input = '<span style="color: #ff0000;">赤いテキスト</span>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("style");
      expect(result).toContain("赤いテキスト");
    });

    it("span の style 属性（背景色）が許可される", () => {
      const input =
        '<span style="background-color: rgb(255, 255, 0);">ハイライト</span>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("style");
      expect(result).toContain("ハイライト");
    });

    it("span 以外のタグの style 属性は除去される", () => {
      const input = '<p style="color: red;">テキスト</p>';
      const result = sanitizeCmsHtml(input);
      expect(result).not.toContain("style");
      expect(result).toContain("<p>テキスト</p>");
    });
  });

  describe("XSS 防御", () => {
    it("script タグが除去される", () => {
      const input = "<script>alert('XSS')</script><p>安全なテキスト</p>";
      const result = sanitizeCmsHtml(input);
      expect(result).not.toContain("<script>");
      expect(result).not.toContain("alert");
      expect(result).toContain("<p>安全なテキスト</p>");
    });

    it("iframe タグが除去される", () => {
      const input = '<iframe src="https://evil.com"></iframe>';
      expect(sanitizeCmsHtml(input)).not.toContain("<iframe>");
    });

    it("onclick などのイベント属性が除去される", () => {
      const input = '<p onclick="alert(1)">テキスト</p>';
      const result = sanitizeCmsHtml(input);
      expect(result).not.toContain("onclick");
      expect(result).toContain("<p>テキスト</p>");
    });

    it("ネストされた XSS が防御される", () => {
      const input =
        "<p><img src=x onerror=alert(1)><a href='javascript:void(0)'>リンク</a></p>";
      const result = sanitizeCmsHtml(input);
      expect(result).not.toContain("onerror");
      expect(result).not.toContain("javascript:");
    });
  });

  describe("空入力の処理", () => {
    it("空文字列は空文字列を返す", () => {
      expect(sanitizeCmsHtml("")).toBe("");
    });

    it("プレーンテキストはそのまま返る", () => {
      expect(sanitizeCmsHtml("テキストのみ")).toBe("テキストのみ");
    });
  });
});

describe("stripHtml", () => {
  it("HTML タグを除去してプレーンテキストを返す", () => {
    const input = "<p>テキスト</p>";
    expect(stripHtml(input)).toBe("テキスト");
  });

  it("リンクタグを除去してリンクテキストだけを返す", () => {
    const input = '<p>詳細は<a href="https://example.com">こちら</a>をご覧ください</p>';
    expect(stripHtml(input)).toBe("詳細はこちらをご覧ください");
  });

  it("ネストされた HTML も除去される", () => {
    const input = "<div><p><strong>太字</strong>のテキスト</p></div>";
    expect(stripHtml(input)).toBe("太字のテキスト");
  });

  it("プレーンテキストはそのまま返る", () => {
    expect(stripHtml("プレーンテキスト")).toBe("プレーンテキスト");
  });

  it("空文字列は空文字列を返す", () => {
    expect(stripHtml("")).toBe("");
  });
});
