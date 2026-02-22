export const NAV_ITEMS = [
  { name: "Concept", href: "#concept" },
  { name: "Strength", href: "#strength" },
  { name: "Services", href: "#services" },
  { name: "Company", href: "#company" },
] as const;

export const FOUNDER = {
  name: "岡崎 美玖",
  nameEn: "Miku Okazaki",
  title: "CEO",
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
  { label: "Company Name", value: "Nudel合同会社" },
  { label: "Location", value: "TOKYO, JP" },
  { label: "Slogan", value: "ご縁を力に、\n価値を形に" },
] as const;

export const SOCIAL_LINKS = [
  { name: "Twitter (X)", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "LinkedIn", href: "#" },
] as const;

export const SITE_CONFIG = {
  name: "Nudel LLC",
  description:
    "ご縁を力に、価値を形に。企画から実行までを一気通貫で行うクリエイティブカンパニー。動画制作、ライティング、MC・ナレーション、Web・SNS運用を提供します。",
  url: "https://nudel.co.jp",
  email: "info@nudel.co.jp",
} as const;
