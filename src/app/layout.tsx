import type { Metadata } from "next";
import { outfit, playfairDisplay, notoSansJP, syncopate } from "@/lib/fonts";
import { TRPCProvider } from "@/components/providers/trpc-provider";
import "./globals.css";

const siteUrl = process.env.SITE_URL ?? "https://nudel.co.jp";
const isProduction = siteUrl === "https://nudel.co.jp";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nudel LLC | ご縁を力に、価値を形に。",
  description:
    "ご縁を力に、価値を形に。企画から実行までを一気通貫で行うクリエイティブカンパニー。動画制作、ライティング、MC・ナレーション、Web・SNS運用を提供します。",
  openGraph: {
    title: "Nudel LLC | ご縁を力に、価値を形に。",
    description:
      "企画から実行までを一気通貫で行うクリエイティブカンパニー。",
    type: "website",
    locale: "ja_JP",
    siteName: "Nudel LLC",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Nudel LLC | ご縁を力に、価値を形に。",
    description:
      "企画から実行までを一気通貫で行うクリエイティブカンパニー。",
  },
  ...(!isProduction && {
    robots: { index: false, follow: false },
  }),
  verification: {
    google: "fbNoy5IZq8GHpe_WjSVHgJXMBHVEtGSuPD9Cvmcqon8",
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nudel LLC",
  alternateName: "Nudel合同会社",
  description:
    "企画から実行までを一気通貫で行うクリエイティブカンパニー。",
  url: "https://nudel.co.jp",
  email: "info@nudel.co.jp",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tokyo",
    addressCountry: "JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${outfit.variable} ${playfairDisplay.variable} ${notoSansJP.variable} ${syncopate.variable} antialiased`}
      >
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
