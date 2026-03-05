import sanitizeHtml from "sanitize-html";

/**
 * microCMS リッチテキストフィールドの許可タグ
 * @see https://document.microcms.io/manual/rich-editor-usage
 */
const ALLOWED_TAGS = [
  // 見出し
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  // テキスト構造
  "p",
  "br",
  "hr",
  "blockquote",
  "div",
  // テキスト装飾
  "strong",
  "em",
  "s",
  "u",
  "sub",
  "sup",
  "span",
  // リスト
  "ul",
  "ol",
  "li",
  // リンク
  "a",
  // コード
  "code",
  "pre",
  // テーブル
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  // 画像
  "img",
  "figure",
  "figcaption",
  // 埋め込み
  "iframe",
];

/** microCMS リッチテキストフィールドの許可属性 */
const ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions["allowedAttributes"] = {
  a: ["href", "target", "rel", "data-embed-type"],
  img: ["src", "alt", "width", "height", "loading"],
  span: ["style"],
  p: ["style"],
  div: ["data-filename"],
  ol: ["start"],
  td: ["colspan", "rowspan"],
  th: ["colspan", "rowspan"],
  iframe: [
    "src",
    "width",
    "height",
    "frameborder",
    "allow",
    "allowfullscreen",
    "title",
    "loading",
  ],
  "*": ["class", "id"],
};

/**
 * CSS カラー値にマッチするパターン
 * - キーワード (red, blue 等)
 * - HEX (#fff, #ff0000, #ff000080)
 * - rgb/rgba 関数
 * - hsl/hsla 関数
 * - transparent, currentColor, inherit
 */
const CSS_COLOR_PATTERN =
  /^(#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})|rgba?\(.+\)|hsla?\(.+\)|[a-zA-Z]+)$/;

/**
 * CSS font-size 値にマッチするパターン
 * - 数値 + 単位 (px, em, rem, %, pt, vw, vh)
 * - キーワード (small, medium, large 等)
 */
const CSS_FONT_SIZE_PATTERN =
  /^(\d+(\.\d+)?(px|em|rem|%|pt|vw|vh)|xx-small|x-small|small|medium|large|x-large|xx-large|smaller|larger)$/;

/**
 * 許可する CSS プロパティ（style 属性の中身を制限）
 * span: 文字色・背景色・文字サイズ
 * p: テキスト配置
 */
const ALLOWED_STYLES: sanitizeHtml.IOptions["allowedStyles"] = {
  span: {
    color: [CSS_COLOR_PATTERN],
    "background-color": [CSS_COLOR_PATTERN],
    "font-size": [CSS_FONT_SIZE_PATTERN],
  },
  p: {
    "text-align": [/^(left|center|right|justify)$/],
  },
};

/**
 * 埋め込み iframe に許可するホスト名
 * microCMS の oEmbed 埋め込み（YouTube, Vimeo 等）を表示するために使用
 */
const ALLOWED_IFRAME_HOSTNAMES = [
  // YouTube
  "www.youtube.com",
  "youtube.com",
  "www.youtube-nocookie.com",
  // Vimeo
  "player.vimeo.com",
  // Spotify
  "open.spotify.com",
  // SpeakerDeck
  "speakerdeck.com",
  // Google (Maps, Docs, Slides)
  "www.google.com",
  // CodePen
  "codepen.io",
  // CodeSandbox
  "codesandbox.io",
  // Figma
  "www.figma.com",
];

/**
 * microCMS のリッチテキスト HTML を XSS 対策でサニタイズする
 * dangerouslySetInnerHTML に渡す前に必ず使用すること
 */
export function sanitizeCmsHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: ["https", "http", "mailto"],
    allowedStyles: ALLOWED_STYLES,
    allowedIframeHostnames: ALLOWED_IFRAME_HOSTNAMES,
  });
}
