"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Repeat, Layers } from "lucide-react";

export function StrengthSection() {
  return (
    <section
      id="strength"
      className="py-40 bg-white text-gray-900 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50/80 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-widest text-orange-600 uppercase bg-orange-50 rounded-lg">
              The Power of Integration
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight tracking-tighter uppercase font-serif italic">
              バラバラを、
              <br />
              <span className="text-orange-500 not-italic font-sans">
                ひとつに繋ぐ。
              </span>
            </h2>
            <div className="space-y-8 text-gray-600 leading-relaxed text-lg font-medium">
              <p>
                「YouTubeを始めたい」「メディアを立ち上げたい」「イベントをやりたい」——
                複数の施策を別々の会社に依頼すると、品質のバラつきや多大な管理コストが発生します。
              </p>
              <p>
                Nudel
                LLCは、企画から実行までを一気通貫で行うクリエイティブカンパニーです。
                ひとつの対話から始まったご縁を、動画、記事、イベントへとシームレスに発展させ、ブランドを彩ります。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                <div className="p-8 bg-orange-50/30 border border-orange-100 rounded-[32px] hover:bg-orange-50 transition-colors group">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <Repeat size={20} className="text-orange-500" />
                  </div>
                  <h4 className="text-gray-900 font-black mb-3 flex items-center gap-2 text-sm tracking-widest uppercase">
                    圧倒的スピード
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    深い理解を活かし、他社が数ヶ月かかる展開をわずか数週間で形にします。
                  </p>
                </div>
                <div className="p-8 bg-orange-50/30 border border-orange-100 rounded-[32px] hover:bg-orange-50 transition-colors group">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <Layers size={20} className="text-orange-500" />
                  </div>
                  <h4 className="text-gray-900 font-black mb-3 flex items-center gap-2 text-sm tracking-widest uppercase">
                    一貫したクオリティ
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    複数のメディアを横断しても、ブランドの本質がブレることはありません。
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-[60px] overflow-hidden shadow-[0_40px_100px_rgba(255,107,0,0.1)] border-8 border-white">
              <div className="relative w-full h-[650px]">
                <Image
                  src="https://images.unsplash.com/photo-1671716784499-a3d26826d844?q=80&w=1200"
                  alt="Creative Office"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 right-12 p-12 bg-white/90 backdrop-blur-xl rounded-[40px] shadow-2xl">
                <p className="text-orange-500 font-black text-[10px] tracking-[0.5em] uppercase mb-4">
                  Fresh Insight
                </p>
                <p className="text-gray-900 text-2xl font-bold leading-relaxed font-serif italic">
                  「あの時の感覚」を共有できる。
                  <br />
                  その信頼が、しなやかな成果を生む。
                </p>
              </div>
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
