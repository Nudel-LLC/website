import type { Metadata } from "next";
import { outfit, notoSansJP } from "@/lib/fonts";
import { SITE_CONFIG } from "@/lib/constants";
import { TRPCProvider } from "@/components/providers/trpc-provider";
import "./globals.css";

const siteUrl = process.env.SITE_URL ?? SITE_CONFIG.url;
const isProduction = siteUrl === SITE_CONFIG.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // TODO: サイトのタイトル・説明文を変更してください
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    type: "website",
    locale: "ja_JP",
    siteName: SITE_CONFIG.name,
    url: siteUrl,
  },
  twitter: {
    card: "summary",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  ...(!isProduction && {
    robots: { index: false, follow: false },
  }),
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  // TODO: 組織情報を変更してください
  name: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  url: SITE_CONFIG.url,
  email: SITE_CONFIG.email,
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
        className={`${outfit.variable} ${notoSansJP.variable} antialiased`}
      >
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
