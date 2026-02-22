import type { MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";

export type ServiceIcon = "video" | "pen" | "mic" | "zap";

export type Service = {
  title: string;
  slug: string;
  description: string;
  icon: ServiceIcon[];
  image: MicroCMSImage;
  detailDescription: string;
  order: number;
} & MicroCMSListContent;

export type Work = {
  title: string;
  service: Service;
  thumbnail?: MicroCMSImage;
  description: string;
  clientName?: string;
  date: string;
  order: number;
} & MicroCMSListContent;
