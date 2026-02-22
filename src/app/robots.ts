import type { MetadataRoute } from "next";

const siteUrl = process.env.SITE_URL ?? "https://nudel.co.jp";
const isProduction = siteUrl === "https://nudel.co.jp";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
