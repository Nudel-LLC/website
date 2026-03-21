"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Video, PenTool, Mic2, Zap, ChevronRight } from "lucide-react";

const SERVICES = [
  {
    title: "VIDEO PRODUCTION",
    description:
      "本格的なドキュメンタリーテイストの動画から、企業様の紹介PV、新入社員獲得に向けた社員の働きがいなどを映し出すインタビュー動画など、ご要望に応じて様々な形式の映像をプロフェッショナルが制作します。音源は完全オリジナルで制作するため、権利処理などで困ることも一切ございません。",
    icon: Video,
    image: "/images/services/video-production.png",
  },
  {
    title: "INTERVIEW & WRITING",
    description:
      "インタビューメディア、ルポ、レポーティングなど多岐に渡るジャンルのライティングを取材～執筆まで実施します。柔軟な対応力と各分野における高い専門性が強みです。",
    icon: PenTool,
    image: "/images/services/interview-writing.png",
  },
  {
    title: "MC & NARRATION",
    description:
      "MC・ナレーターの岡崎美玖が、式典・イベント・展示会などの司会を務めます。展示会、学術発表会、地域イベントなどこれまで多岐に渡る経験からお客様のご要望に合わせた役割を提供いたします。また、イベントの規模やコンセプトに合わせた出演者のキャスティングも承っております。",
    icon: Mic2,
    image: "/images/services/mc-narration.png",
  },
  {
    title: "HP制作＆SNS運用支援＆生成AI効率化",
    description:
      "ニーズに合わせ、企業やブランド、個人の想いを引き出したWebサイト制作やSNS運営をはじめ、効果的かつ持続可能性の高いマーケティング戦略とコンテンツ戦略を提案＆企画します。将来的にはお客様自身での自走を目指します。",
    icon: Zap,
    image: "/images/services/web-services.png",
  },
] as const;

export function ServicesSection() {
  return (
    <section id="services" className="py-40 bg-[#fffbf7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-28">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black mb-10 tracking-tighter uppercase font-serif italic text-gray-900"
          >
            OUR{" "}
            <span className="text-orange-500 not-italic font-sans">
              SOLUTIONS
            </span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange-100 transition-all duration-500 border border-transparent hover:border-orange-100"
              >
                <div className="h-64 overflow-hidden relative bg-gray-100">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={256}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-10">
                  <div className="text-orange-500 mb-8 bg-orange-50 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black mb-5 tracking-widest uppercase font-serif italic text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-10">
                    {service.description}
                  </p>
                  <div className="flex items-center text-[10px] font-black tracking-[0.4em] uppercase text-orange-500 group-hover:translate-x-2 transition-transform">
                    Details <ChevronRight size={14} className="ml-1" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
