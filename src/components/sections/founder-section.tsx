"use client";

import Image from "next/image";
import { motion } from "motion/react";

export function FounderSection() {
  return (
    <section
      id="concept"
      className="py-40 bg-[#fffbf7] relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-50/60 rounded-full blur-[120px] -ml-48 -mb-48" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black mb-10 tracking-tighter uppercase font-serif italic text-gray-900"
          >
            THE{" "}
            <span className="text-orange-500 not-italic font-sans">
              LEADER
            </span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto"
        >
          {/* 画像 */}
          <div className="relative group">
            <div className="relative z-10 rounded-[60px] overflow-hidden shadow-[0_40px_100px_rgba(255,107,0,0.15)] border-8 border-white">
              <Image
                src="/images/team/founder.png"
                alt="岡崎美玖 - 代表"
                width={600}
                height={800}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-orange-100 rounded-full mix-blend-multiply blur-2xl opacity-70" />
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-yellow-100 rounded-full mix-blend-multiply blur-2xl opacity-70" />
          </div>

          {/* 経歴 */}
          <div className="space-y-10">
            <div>
              <div className="flex items-baseline gap-4 mb-8">
                <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 font-serif italic">
                  岡崎 美玖
                </h3>
                <span className="px-4 py-1.5 bg-orange-500 text-white text-[10px] font-black tracking-widest uppercase rounded-full">
                  代表
                </span>
              </div>
              <p className="text-sm font-black tracking-[0.3em] text-orange-500 uppercase mb-8">
                Miku Okazaki
              </p>
            </div>

            <div className="space-y-6 text-gray-600 leading-relaxed">
              <div className="p-8 bg-white/80 backdrop-blur-sm rounded-[32px] border border-orange-100 hover:border-orange-200 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="font-medium">
                    <span className="font-black text-gray-900">
                      2020年4月
                    </span>
                    、立教大学社会学部卒業後に新卒で株式会社ファーストリテイリングに入社。「PLST」事業へ配属。通常店舗でのセールス上げ全国1位(単日)や、ラーメンのインフルエンサー活動が注目され、広報・マーケ部門へ異例の昇進。
                  </p>
                </div>
              </div>

              <div className="p-8 bg-white/80 backdrop-blur-sm rounded-[32px] border border-orange-100 hover:border-orange-200 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="font-medium">
                    <span className="font-black text-gray-900">
                      2025年10月
                    </span>
                    よりNudelを立ち上げ、代表に就任。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
