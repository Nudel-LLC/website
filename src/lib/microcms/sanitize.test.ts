import { describe, it, expect } from "vitest";
import { sanitizeCmsHtml } from "./sanitize";

/**
 * microCMS リッチテキストエディタの全機能に対する網羅テスト
 * @see https://document.microcms.io/manual/rich-editor-usage
 *
 * microCMS リッチエディタが出力する HTML が sanitizeCmsHtml を通しても
 * 正しく保持されること、および XSS 攻撃が防御されることを検証する。
 */
describe("sanitizeCmsHtml", () => {
  // =========================================================================
  // 1. 見出し (h1-h6)
  // =========================================================================
  describe("見出し", () => {
    it("h1〜h6 タグが許可される", () => {
      const input =
        "<h1>見出し1</h1><h2>見出し2</h2><h3>見出し3</h3><h4>見出し4</h4><h5>見出し5</h5><h6>見出し6</h6>";
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("<h1>見出し1</h1>");
      expect(result).toContain("<h2>見出し2</h2>");
      expect(result).toContain("<h3>見出し3</h3>");
      expect(result).toContain("<h4>見出し4</h4>");
      expect(result).toContain("<h5>見出し5</h5>");
      expect(result).toContain("<h6>見出し6</h6>");
    });

    it("見出しの id 属性が保持される（目次アンカー用）", () => {
      const input = '<h2 id="hxyz123abc">セクション見出し</h2>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain('id="hxyz123abc"');
      expect(result).toContain("セクション見出し");
    });
  });

  // =========================================================================
  // 2. テキスト装飾
  // =========================================================================
  describe("テキスト装飾", () => {
    it("太字 (strong) が許可される", () => {
      const input = "<strong>太字テキスト</strong>";
      expect(sanitizeCmsHtml(input)).toBe("<strong>太字テキスト</strong>");
    });

    it("斜体 (em) が許可される", () => {
      const input = "<em>斜体テキスト</em>";
      expect(sanitizeCmsHtml(input)).toBe("<em>斜体テキスト</em>");
    });

    it("打ち消し線 (s) が許可される", () => {
      const input = "<s>打ち消し線テキスト</s>";
      expect(sanitizeCmsHtml(input)).toBe("<s>打ち消し線テキスト</s>");
    });

    it("改行 (br) が許可される", () => {
      const input = "<p>1行目<br />2行目</p>";
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("<br />");
    });

    it("装飾の組み合わせが保持される", () => {
      const input = "<p><strong><em>太字斜体</em></strong>と<s>打ち消し</s></p>";
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("<strong><em>太字斜体</em></strong>");
      expect(result).toContain("<s>打ち消し</s>");
    });
  });

  // =========================================================================
  // 3. 文字色・文字サイズ・背景色（インラインスタイル）
  // =========================================================================
  describe("インラインスタイル", () => {
    it("span の文字色が許可される", () => {
      const input = '<span style="color: #ff0000;">赤いテキスト</span>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("color");
      expect(result).toContain("赤いテキスト");
    });

    it("span の背景色が許可される", () => {
      const input =
        '<span style="background-color: rgb(255, 255, 0);">ハイライト</span>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("background-color");
      expect(result).toContain("ハイライト");
    });

    it("span の文字サイズが許可される", () => {
      const input = '<span style="font-size: 120%;">大きいテキスト</span>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("font-size");
      expect(result).toContain("大きいテキスト");
    });

    it("span の複数スタイルが同時に許可される", () => {
      const input =
        '<span style="color: #0000ff; font-size: 150%;">青い大きいテキスト</span>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("color");
      expect(result).toContain("font-size");
    });

    it("span 以外のタグ（div 等）の style 属性は除去される", () => {
      const input = '<div style="color: red;">テキスト</div>';
      const result = sanitizeCmsHtml(input);
      expect(result).not.toContain("style");
    });
  });

  // =========================================================================
  // 4. テキスト配置
  // =========================================================================
  describe("テキスト配置", () => {
    it("p の text-align: center が許可される", () => {
      const input = '<p style="text-align: center;">中央揃え</p>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("text-align");
      expect(result).toContain("center");
    });

    it("p の text-align: right が許可される", () => {
      const input = '<p style="text-align: right;">右揃え</p>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("text-align");
      expect(result).toContain("right");
    });

    it("p の text-align: justify が許可される", () => {
      const input = '<p style="text-align: justify;">両端揃え</p>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("text-align");
    });

    it("p の text-align 以外の style は除去される", () => {
      const input = '<p style="color: red; text-align: center;">テキスト</p>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("text-align");
      expect(result).not.toContain("color");
    });
  });

  // =========================================================================
  // 5. リスト
  // =========================================================================
  describe("リスト", () => {
    it("箇条書きリスト (ul/li) が許可される", () => {
      const input = "<ul><li>項目1</li><li>項目2</li></ul>";
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("<ul>");
      expect(result).toContain("<li>項目1</li>");
      expect(result).toContain("<li>項目2</li>");
    });

    it("番号付きリスト (ol/li) が許可される", () => {
      const input = "<ol><li>手順1</li><li>手順2</li></ol>";
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("<ol>");
      expect(result).toContain("<li>手順1</li>");
    });

    it("ネストされたリストが許可される", () => {
      const input =
        "<ul><li>親項目<ul><li>子項目</li></ul></li></ul>";
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("<ul><li>親項目<ul><li>子項目</li></ul></li></ul>");
    });
  });

  // =========================================================================
  // 6. 引用
  // =========================================================================
  describe("引用", () => {
    it("blockquote タグが許可される", () => {
      const input = "<blockquote><p>引用テキスト</p></blockquote>";
      expect(sanitizeCmsHtml(input)).toContain("<blockquote>");
      expect(sanitizeCmsHtml(input)).toContain("<p>引用テキスト</p>");
    });
  });

  // =========================================================================
  // 7. 水平線
  // =========================================================================
  describe("水平線", () => {
    it("hr タグが許可される", () => {
      const input = "<p>前のセクション</p><hr><p>後のセクション</p>";
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("<hr />");
    });
  });

  // =========================================================================
  // 8. テーブル
  // =========================================================================
  describe("テーブル", () => {
    it("table / thead / tbody / tr / th / td が許可される", () => {
      const input =
        "<table><thead><tr><th>見出し1</th><th>見出し2</th></tr></thead><tbody><tr><td>データ1</td><td>データ2</td></tr></tbody></table>";
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("<table>");
      expect(result).toContain("<thead>");
      expect(result).toContain("<th>見出し1</th>");
      expect(result).toContain("<tbody>");
      expect(result).toContain("<td>データ1</td>");
    });
  });

  // =========================================================================
  // 9. コード
  // =========================================================================
  describe("コード", () => {
    it("インラインコード (code) が許可される", () => {
      const input = "<p>変数 <code>const x = 1;</code> を定義</p>";
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("<code>const x = 1;</code>");
    });

    it("コードブロック (pre > code) が許可される", () => {
      const input =
        '<pre><code class="language-typescript">const x: number = 1;</code></pre>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("<pre>");
      expect(result).toContain('<code class="language-typescript">');
      expect(result).toContain("const x: number = 1;");
    });

    it("コードブロックのファイル名 (div[data-filename]) が許可される", () => {
      const input =
        '<div data-filename="example.ts"><pre><code>console.log("hello");</code></pre></div>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain('data-filename="example.ts"');
      expect(result).toContain("<pre><code>");
    });
  });

  // =========================================================================
  // 10. リンク
  // =========================================================================
  describe("リンク", () => {
    it("https リンクが許可される", () => {
      const input = '<a href="https://nudel.co.jp">サイト</a>';
      expect(sanitizeCmsHtml(input)).toContain('href="https://nudel.co.jp"');
    });

    it("http リンクが許可される", () => {
      const input = '<a href="http://example.com">サイト</a>';
      expect(sanitizeCmsHtml(input)).toContain('href="http://example.com"');
    });

    it("mailto リンクが許可される", () => {
      const input = '<a href="mailto:info@nudel.co.jp">メール</a>';
      expect(sanitizeCmsHtml(input)).toContain('href="mailto:info@nudel.co.jp"');
    });

    it("相対パスリンクが許可される", () => {
      const input = '<a href="/services/web">内部リンク</a>';
      expect(sanitizeCmsHtml(input)).toContain('href="/services/web"');
    });

    it("別タブで開くリンク (target, rel) が許可される", () => {
      const input =
        '<a href="https://example.com" target="_blank" rel="noopener noreferrer">外部リンク</a>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain('target="_blank"');
      expect(result).toContain('rel="noopener noreferrer"');
    });

    it("ファイルリンク (data-embed-type) が許可される", () => {
      const input =
        '<a href="https://example.com/file.pdf" data-embed-type="file">資料.pdf</a>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain('data-embed-type="file"');
      expect(result).toContain("資料.pdf");
    });

    it("リンク内の装飾が保持される", () => {
      const input =
        '<a href="https://example.com"><strong>太字リンク</strong></a>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("<strong>太字リンク</strong>");
      expect(result).toContain('href="https://example.com"');
    });

    it("javascript: スキームは除去される", () => {
      const input = '<a href="javascript:alert(1)">クリック</a>';
      const result = sanitizeCmsHtml(input);
      expect(result).not.toContain("javascript:");
    });

    it("data: スキームは除去される", () => {
      const input =
        '<a href="data:text/html,<script>alert(1)</script>">リンク</a>';
      const result = sanitizeCmsHtml(input);
      expect(result).not.toContain("data:");
    });
  });

  // =========================================================================
  // 11. 画像
  // =========================================================================
  describe("画像", () => {
    it("src / alt / width / height 属性が許可される", () => {
      const input =
        '<img src="https://example.com/img.jpg" alt="説明" width="800" height="600" />';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain('src="https://example.com/img.jpg"');
      expect(result).toContain('alt="説明"');
      expect(result).toContain('width="800"');
      expect(result).toContain('height="600"');
    });

    it("figure + figcaption（キャプション付き画像）が許可される", () => {
      const input =
        '<figure><img src="https://example.com/image.jpg" alt="写真" /><figcaption>キャプション</figcaption></figure>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("<figure>");
      expect(result).toContain("<figcaption>キャプション</figcaption>");
      expect(result).toContain('src="https://example.com/image.jpg"');
    });

    it("figure + a + img（リンク付き画像）が許可される", () => {
      const input =
        '<figure><a href="https://example.com"><img src="https://example.com/image.jpg" alt="写真" /></a></figure>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("<figure>");
      expect(result).toContain('href="https://example.com"');
      expect(result).toContain("</a>");
    });

    it("onerror 等のイベントハンドラは除去される", () => {
      const input = '<img src="x" onerror="alert(1)" alt="broken" />';
      const result = sanitizeCmsHtml(input);
      expect(result).not.toContain("onerror");
    });
  });

  // =========================================================================
  // 12. カスタムclass
  // =========================================================================
  describe("カスタムclass", () => {
    it("span の class 属性が許可される", () => {
      const input = '<span class="highlight">ハイライト</span>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain('class="highlight"');
    });

    it("p の class 属性が許可される", () => {
      const input = '<p class="custom-paragraph">カスタム段落</p>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain('class="custom-paragraph"');
    });

    it("任意タグの class 属性が許可される（ワイルドカード）", () => {
      const input = '<blockquote class="special-quote">引用</blockquote>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain('class="special-quote"');
    });
  });

  // =========================================================================
  // 13. 埋め込み (iframe)
  // =========================================================================
  describe("埋め込み (iframe)", () => {
    it("YouTube iframe が許可される", () => {
      const input =
        '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" width="560" height="315" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="YouTube video"></iframe>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("<iframe");
      expect(result).toContain('src="https://www.youtube.com/embed/dQw4w9WgXcQ"');
      expect(result).toContain('width="560"');
      expect(result).toContain('height="315"');
      expect(result).toContain("allowfullscreen");
    });

    it("YouTube (プライバシー強化モード) iframe が許可される", () => {
      const input =
        '<iframe src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" width="560" height="315"></iframe>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("www.youtube-nocookie.com");
    });

    it("Vimeo iframe が許可される", () => {
      const input =
        '<iframe src="https://player.vimeo.com/video/123456" width="640" height="360"></iframe>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("player.vimeo.com");
    });

    it("Google Maps iframe が許可される", () => {
      const input =
        '<iframe src="https://www.google.com/maps/embed?pb=xxx" width="600" height="450"></iframe>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("www.google.com/maps/embed");
    });

    it("許可されていないホストの iframe は src が除去される", () => {
      const input =
        '<iframe src="https://evil.example.com/malicious"></iframe>';
      const result = sanitizeCmsHtml(input);
      expect(result).not.toContain("evil.example.com");
      expect(result).not.toContain("src");
    });

    it("src なしの iframe は除去される", () => {
      const input = '<iframe srcdoc="<script>alert(1)</script>"></iframe>';
      const result = sanitizeCmsHtml(input);
      expect(result).not.toContain("srcdoc");
      expect(result).not.toContain("alert");
    });
  });

  // =========================================================================
  // 14. 段落
  // =========================================================================
  describe("段落", () => {
    it("p タグが許可される", () => {
      const input = "<p>本文テキスト</p>";
      expect(sanitizeCmsHtml(input)).toBe("<p>本文テキスト</p>");
    });

    it("複数段落が保持される", () => {
      const input = "<p>段落1</p><p>段落2</p><p>段落3</p>";
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("<p>段落1</p>");
      expect(result).toContain("<p>段落2</p>");
      expect(result).toContain("<p>段落3</p>");
    });
  });

  // =========================================================================
  // 15. XSS 防御
  // =========================================================================
  describe("XSS 防御", () => {
    it("script タグが除去される", () => {
      const input = "<script>alert('XSS')</script><p>安全なテキスト</p>";
      const result = sanitizeCmsHtml(input);
      expect(result).not.toContain("<script>");
      expect(result).not.toContain("alert");
      expect(result).toContain("<p>安全なテキスト</p>");
    });

    it("許可されていないホストの iframe は src が除去される", () => {
      const input = '<iframe src="https://evil.com"></iframe>';
      const result = sanitizeCmsHtml(input);
      expect(result).not.toContain("evil.com");
      expect(result).not.toContain("src");
    });

    it("onclick などのイベント属性が除去される", () => {
      const input = '<p onclick="alert(1)">テキスト</p>';
      const result = sanitizeCmsHtml(input);
      expect(result).not.toContain("onclick");
      expect(result).toContain("<p>テキスト</p>");
    });

    it("onmouseover イベント属性が除去される", () => {
      const input = '<a href="#" onmouseover="alert(1)">リンク</a>';
      const result = sanitizeCmsHtml(input);
      expect(result).not.toContain("onmouseover");
    });

    it("ネストされた XSS が防御される", () => {
      const input =
        "<p><img src=x onerror=alert(1)><a href='javascript:void(0)'>リンク</a></p>";
      const result = sanitizeCmsHtml(input);
      expect(result).not.toContain("onerror");
      expect(result).not.toContain("javascript:");
    });

    it("style 属性経由の危険な CSS プロパティが除去される", () => {
      const input =
        '<span style="color: red; position: fixed; top: 0; left: 0; z-index: 9999;">悪意あるテキスト</span>';
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("color");
      expect(result).not.toContain("position");
      expect(result).not.toContain("z-index");
    });

    it("span の許可されていない CSS プロパティが除去される", () => {
      const input = '<span style="display: none;">隠しテキスト</span>';
      const result = sanitizeCmsHtml(input);
      expect(result).not.toContain("display");
    });

    it("p の text-align 以外の style は除去される", () => {
      const input = '<p style="position: absolute; top: 0;">テキスト</p>';
      const result = sanitizeCmsHtml(input);
      expect(result).not.toContain("position");
      expect(result).not.toContain("absolute");
    });

    it("form タグが除去される", () => {
      const input =
        '<form action="https://evil.com"><input type="text" /><button>送信</button></form>';
      const result = sanitizeCmsHtml(input);
      expect(result).not.toContain("<form");
      expect(result).not.toContain("<input");
    });

    it("object / embed タグが除去される", () => {
      const input =
        '<object data="https://evil.com/flash.swf"></object><embed src="https://evil.com/flash.swf" />';
      const result = sanitizeCmsHtml(input);
      expect(result).not.toContain("<object");
      expect(result).not.toContain("<embed");
    });
  });

  // =========================================================================
  // 16. エッジケース
  // =========================================================================
  describe("エッジケース", () => {
    it("空文字列は空文字列を返す", () => {
      expect(sanitizeCmsHtml("")).toBe("");
    });

    it("プレーンテキストはそのまま返る", () => {
      expect(sanitizeCmsHtml("テキストのみ")).toBe("テキストのみ");
    });

    it("HTML エンティティが保持される", () => {
      const input = "<p>&amp; &lt; &gt; &quot;</p>";
      const result = sanitizeCmsHtml(input);
      expect(result).toContain("&amp;");
      expect(result).toContain("&lt;");
      expect(result).toContain("&gt;");
    });

    it("複合的なリッチテキストコンテンツが正しく処理される", () => {
      const input = [
        '<h2 id="h123">セクション見出し</h2>',
        '<p>通常テキストと<strong>太字</strong>と<a href="https://example.com" target="_blank" rel="noopener noreferrer">リンク</a>を含む段落。</p>',
        '<p><span style="color: #ff6600;">オレンジ色のテキスト</span>と<s>打ち消し線</s>。</p>',
        '<p style="text-align: center;">中央揃えの段落</p>',
        "<ul><li>項目A</li><li>項目B</li></ul>",
        '<figure><img src="https://example.com/photo.jpg" alt="写真" width="800" height="600" /><figcaption>写真のキャプション</figcaption></figure>',
        "<hr />",
      ].join("");
      const result = sanitizeCmsHtml(input);
      expect(result).toContain('id="h123"');
      expect(result).toContain("<strong>太字</strong>");
      expect(result).toContain('href="https://example.com"');
      expect(result).toContain('target="_blank"');
      expect(result).toContain("color");
      expect(result).toContain("<s>打ち消し線</s>");
      expect(result).toContain("text-align");
      expect(result).toContain("<ul>");
      expect(result).toContain("<figure>");
      expect(result).toContain("<figcaption>");
      expect(result).toContain("<hr />");
    });
  });
});
