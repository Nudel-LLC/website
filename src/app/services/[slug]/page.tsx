import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  getServiceBySlug,
  getServices,
  getWorksByServiceId,
} from "@/lib/microcms/client";
import { ICON_MAP } from "@/lib/microcms/icon-map";
import type { Work } from "@/lib/microcms/types";
import { SITE_CONFIG } from "@/lib/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

/** ビルド時にサービスページのパラメータを事前生成する */
export async function generateStaticParams() {
  try {
    const { contents } = await getServices({ limit: 100 });
    return contents.map((service) => ({ slug: service.slug }));
  } catch {
    // ビルド時にAPIが利用できない場合は空配列を返す（SSRにフォールバック）
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return { title: "サービスが見つかりません | Nudel LLC" };
  }

  return {
    title: `${service.title} | ${SITE_CONFIG.name}`,
    description: service.description,
    openGraph: {
      title: `${service.title} | ${SITE_CONFIG.name}`,
      description: service.description,
      images: [{ url: service.image.url }],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const Icon = ICON_MAP[service.icon[0]];
  const { contents: works } = await getWorksByServiceId(service.id);

  return (
    <div className="pt-32 pb-20">
      {/* ヘッダー */}
      <div className="max-w-4xl mx-auto px-6 mb-16">
        <Link
          href="/#services"
          className="inline-flex items-center text-sm text-gray-500 hover:text-orange-500 transition-colors mb-10"
        >
          <ArrowLeft size={16} className="mr-2" />
          サービス一覧に戻る
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="text-orange-500 bg-orange-50 w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm">
            <Icon className="w-6 h-6" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase font-serif italic text-gray-900">
            {service.title}
          </h1>
        </div>

        <p className="text-gray-500 text-lg leading-relaxed mb-12">
          {service.description}
        </p>
      </div>

      {/* サービス画像 */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden">
          <Image
            src={service.image.url}
            alt={service.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </div>
      </div>

      {/* 詳細説明 */}
      {service.detailDescription && (
        <div className="max-w-4xl mx-auto px-6 mb-20">
          <div
            className="prose prose-lg prose-gray max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-orange-500"
            dangerouslySetInnerHTML={{ __html: service.detailDescription }}
          />
        </div>
      )}

      {/* 実績一覧 */}
      {works.length > 0 && (
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-black mb-12 tracking-tighter uppercase font-serif italic text-gray-900">
            Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work: Work) => (
              <div
                key={work.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                {work.thumbnail && (
                  <div className="h-48 overflow-hidden relative">
                    <Image
                      src={work.thumbnail.url}
                      alt={work.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 text-gray-900">
                    {work.title}
                  </h3>
                  {work.clientName && (
                    <p className="text-sm text-gray-400 mb-3">
                      {work.clientName}
                    </p>
                  )}
                  {work.description && (
                    <div
                      className="text-gray-500 text-sm leading-relaxed line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: work.description }}
                    />
                  )}
                  {work.date && (
                    <p className="text-xs text-gray-400 mt-4">
                      {new Date(work.date).toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "long",
                      })}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
