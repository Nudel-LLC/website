import type { MetadataRoute } from "next";
import { getServices } from "@/lib/microcms/client";
import type { Service } from "@/lib/microcms/types";

const siteUrl = process.env.SITE_URL ?? "https://nudel.co.jp";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let servicePages: MetadataRoute.Sitemap = [];
  try {
    const { contents: services } = await getServices();
    servicePages = services.map((service: Service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: new Date(service.updatedAt),
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch {
    // ビルド時にAPIが利用できない場合はサービスページをスキップ
  }

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...servicePages,
  ];
}
