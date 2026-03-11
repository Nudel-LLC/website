import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

const siteUrl = process.env.SITE_URL ?? SITE_CONFIG.url;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
