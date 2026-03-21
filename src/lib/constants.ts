export const NAV_ITEMS = [
  { name: "Concept", href: "/#concept" },
  { name: "Strength", href: "/#strength" },
  { name: "Services", href: "/#services" },
  { name: "Company", href: "/#company" },
] as const;

export const FOUNDER = {
  name: "岡崎 美玖",
  nameEn: "Miku Okazaki",
  title: "代表",
  image: "/images/founder.png",
  bio: [
    {
      year: "2020年4月",
      text: "立教大学社会学部卒業後に新卒で株式会社ファーストリテイリングに入社。「PLST」事業へ配属。通常店舗でのセールス売り上げ全国1位(単日)や、ラーメンのインフルエンサー活動が注目され、広報・マーケ部門へ異例の昇進。",
    },
    {
      year: "2025年10月",
      text: "よりNudelを立ち上げ、代表に就任。",
    },
  ],
} as const;

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
  description:
    "企業や個人の魅力を見つけ形にするクリエイティブパートナー",
  url: "https://nudel.co.jp",
  email: "info@nudel.co.jp",
} as const;
