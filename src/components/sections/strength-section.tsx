"use client";

import { motion } from "motion/react";
import { Repeat, Layers, Users } from "lucide-react";

export function StrengthSection() {
  return (
    <section
      id="strength"
      className="py-40 bg-white text-gray-900 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50/80 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight tracking-tighter uppercase font-serif">
              バラバラを、
              <br />
              <span className="text-orange-500 font-sans">
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
              <div className="p-6 bg-orange-50/30 border border-orange-100 rounded-3xl hover:bg-orange-50 transition-colors group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform flex-shrink-0">
                    <Repeat size={20} className="text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-black mb-2 text-sm tracking-widest uppercase">
                      圧倒的スピード
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      深い理解を活かし、他社が数ヶ月かかる展開をわずか数週間で形にします。
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-orange-50/30 border border-orange-100 rounded-3xl hover:bg-orange-50 transition-colors group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform flex-shrink-0">
                    <Layers size={20} className="text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-black mb-2 text-sm tracking-widest uppercase">
                      一貫したクオリティ
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      複数のメディアを横断しても、ブランドの本質がブレることはありません。
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-orange-50/30 border border-orange-100 rounded-3xl hover:bg-orange-50 transition-colors group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform flex-shrink-0">
                    <Users size={20} className="text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-black mb-2 text-sm tracking-widest uppercase">
                      スペシャリストが所属
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      大手マスメディアでの動画制作、大手代理店でのデザイン作成業務、代表自ら自信を持って見つけた人材が対応します。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
