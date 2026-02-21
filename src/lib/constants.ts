import { Video, PenTool, Mic2, Zap } from "lucide-react";

export const NAV_ITEMS = [
  { name: "Concept", href: "#concept" },
  { name: "Strength", href: "#strength" },
  { name: "Services", href: "#services" },
  { name: "Company", href: "#company" },
] as const;

export const SERVICES = [
  {
    title: "VIDEO PRODUCTION",
    description:
      "本格的なドキュメンタリーテイストの動画から、企業様の紹介PV、新入社員獲得に向けた社員の働きがいなどを映し出すインタビュー動画など、ご要望に応じて様々な形式の映像をプロフェッショナルが制作します。音源は完全オリジナルで制作するため、権利処理などで困ることも一切ございません。",
    icon: Video,
    image: "/images/service-video.jpg",
  },
  {
    title: "INTERVIEW & WRITING",
    description:
      "インタビューメディア、ルポ、レポーティングなど多岐に渡るジャンルのライティングを取材～執筆まで実施します。柔軟な対応力と各分野における高い専門性が強みです。",
    icon: PenTool,
    image: "/images/service-writing.jpg",
  },
  {
    title: "MC & NARRATION",
    description:
      "MC・ナレーターの岡崎美玖が、式典・イベント・展示会などの司会を務めます。展示会、学術発表会、地域イベントなどこれまで多岐に渡る経験からお客様のご要望に合わせた役割を提供いたします。また、イベントの規模やコンセプトに合わせた出演者のキャスティングも承っております。",
    icon: Mic2,
    image: "/images/service-mc.jpg",
  },
  {
    title: "WEB SERVICES & SOCIAL MEDIA",
    description:
      "効果的かつ持続可能性の高い効果的なマーケティング戦略とコンテンツ戦略を提案＆企画します。将来的にはお客様自身で高品質なSNS運営の自走を目指します。",
    icon: Zap,
    image: "/images/service-web.jpg",
  },
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
  url: "https://nudel-llc.com",
  email: "info@nudel.co.jp",
} as const;
