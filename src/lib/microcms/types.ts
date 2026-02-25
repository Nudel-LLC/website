import type { MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";

export type ServiceIcon = "video" | "pen" | "mic" | "zap";

export type Service = {
  title: string;
  slug: string;
  description: string;
  icon: ServiceIcon[];
  image: MicroCMSImage;
  /** microCMSで未入力の場合は undefined になる */
  detailDescription?: string;
  order?: number;
} & MicroCMSListContent;

export type Work = {
  title: string;
  service: Service;
  image?: MicroCMSImage;
  /** microCMSで未入力の場合は undefined になる */
  description?: string;
  clientName?: string;
  /** microCMSで未入力の場合は undefined になる */
  date?: string;
  order?: number;
} & MicroCMSListContent;
