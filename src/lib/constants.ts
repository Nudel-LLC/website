export const NAV_ITEMS = [
  { name: "Concept", href: "/#concept" },
  { name: "Strength", href: "/#strength" },
  { name: "Services", href: "/#services" },
  { name: "Company", href: "/#company" },
] as const;

export const COMPANY_INFO = [
  { label: "会社名", value: "合同会社Nudel" },
  { label: "所在地", value: "TOKYO, JP" },
  { label: "代表", value: "岡崎 美玖" },
] as const;

export const SOCIAL_LINKS = [
  {
    name: "Twitter (X)",
    href: "https://x.com/aaamiku39",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/ramen_miku39_/",
  },
] as const;

export const SITE_CONFIG = {
  name: "Nudel",
  description: "企業や個人の魅力を見つけ形にするクリエイティブパートナー",
  url: "https://nudel.co.jp",
  email: "info@nudel.co.jp",
} as const;
