"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Repeat, Layers, Users } from "lucide-react";

const STRENGTHS = [
  {
    icon: Repeat,
    title: "圧倒的スピード",
    description:
      "深い理解を活かし、他社が数ヶ月かかる展開をわずか数週間で形にします。",
  },
  {
    icon: Layers,
    title: "一貫したクオリティ",
    description:
      "複数のメディアを横断しても、ブランドの本質がブレることはありません。",
  },
  {
    icon: Users,
    title: "スペシャリストが所属",
    description:
      "大手マスメディアでの動画制作、大手代理店でのデザイン作成業務、代表自ら自信を持って見つけた人材が対応します。",
  },
] as const;

export function StrengthSection() {
  return (
    <section
      id="strength"
      className="py-40 bg-white text-gray-900 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50/80 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight tracking-tighter uppercase font-serif italic">
              バラバラを、
              <br />
              <span className="text-orange-500 not-italic font-sans">
                ひとつに繋ぐ。
              </span>
            </h2>
            <div className="space-y-8 text-gray-600 leading-relaxed text-lg font-medium mb-10">
              <p>
                「YouTubeを始めたい」「メディアを立ち上げたい」「イベントをやりたい」——
                複数の施策を別々の会社に依頼すると、品質のバラつきや多大な管理コストが発生します。
              </p>
              <p>
                Nudelは、企画から実行までを一気通貫で行うクリエイティブカンパニーです。
                ひとつの対話から始まったご縁を、動画、記事、イベントへとシームレスに発展させ、ブランドを彩ります。
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {STRENGTHS.map((item) => (
                <div
                  key={item.title}
                  className="p-6 bg-orange-50/30 border border-orange-100 rounded-3xl hover:bg-orange-50 transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform flex-shrink-0">
                      <item.icon size={20} className="text-orange-500" />
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-black mb-2 text-sm tracking-widest uppercase">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-[60px] overflow-hidden shadow-[0_40px_100px_rgba(255,107,0,0.1)] border-8 border-white">
              <Image
                src="https://images.unsplash.com/photo-1671716784499-a3d26826d844?q=80&w=1200"
                alt="クリエイティブオフィス"
                width={600}
                height={650}
                className="w-full h-[650px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-100 rounded-full mix-blend-multiply blur-3xl opacity-70" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-100 rounded-full mix-blend-multiply blur-3xl opacity-70" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
