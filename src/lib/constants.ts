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
      text: "立教大学社会学部卒業後に新卒で株式会社ファーストリテイリングに入社。「PLST」事業へ配属。通常店舗でのセールス上げ全国1位(単日)や、ラーメンのインフルエンサー活動が注目され、広報・マーケ部門へ異例の昇進。",
    },
    {
      year: "2025年10月",
      text: "よりNudelを立ち上げ、代表に就任。",
    },
  ],
} as const;

export const SOCIAL_LINKS = [
  { name: "Twitter (X)", href: "https://x.com/aaamiku39" },
  { name: "Instagram", href: "https://www.instagram.com/ramen_miku39_/" },
] as const;

export const MEMBERS = [
  {
    name: "KO",
    nameEn: "KO",
    title: "CCO",
    titleFull: "Chief Creative Officer",
    image: "/images/team/ko.png",
    bio: [
      {
        text: "企画・撮影・編集・ライブ配信を中心に、映像制作領域で8年の経験を有する。",
      },
      {
        text: "大規模案件で培ったクライアントワークと進行設計を強みに、関係者の意図を丁寧に整理しながら、高い品質基準でアウトプットを導くことを得意とする。",
      },
      {
        text: "動画メディアやSNSアカウントの立ち上げ・運用、映像コンテンツの企画制作など幅広いプロジェクトを推進し、細部まで目の届いたクリエイティブコントロールにも定評がある。",
      },
      {
        text: "近年は、生成AIを活用した映像表現にも注力し、新しい手法を実制作へ落とし込みながら、目的に応じた最適なクリエイティブを提供している。",
      },
    ],
  },
  {
    name: "深津 蓮",
    nameEn: "Ren Fukatsu",
    title: "CTO",
    titleFull: "Chief Technology Officer",
    image: "/images/team/ren-fukatsu.png",
    bio: [
      {
        text: "明治大学大学院機械工学研究科修了。ロボティクス分野にて自己位置推定の研究に従事。",
      },
      {
        text: "2022年より国内大手IT企業にエンジニアとして参画。数億規模のユーザーデータを横断管理する基盤の設計・運用を担当し、Java / REST APIによるバックエンド開発からNext.jsを用いた社内管理ツールの構築まで幅広く手掛ける。",
      },
      {
        text: "インフラ・ライセンスコストの最適化プロジェクトを複数主導し、年間数億円規模のコスト削減を推進。サービス全体のアーキテクチャ設計を得意とする。",
      },
    ],
  },
] as const;

export const SITE_CONFIG = {
  name: "Nudel LLC",
  description:
    "ご縁を力に、価値を形に。企画から実行までを一気通貫で行うクリエイティブカンパニー。動画制作、ライティング、MC・ナレーション、Web・SNS運用を提供します。",
  url: "https://nudel.co.jp",
  email: "info@nudel.co.jp",
} as const;
