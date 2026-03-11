import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

const siteUrl = process.env.SITE_URL ?? SITE_CONFIG.url;
const isProduction = siteUrl === SITE_CONFIG.url;

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
