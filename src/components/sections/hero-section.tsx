"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section id="concept" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#fffbf7]">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-orange-100/30 rounded-full blur-[120px] -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-orange-50/50 rounded-full blur-[100px] -ml-32 -mb-32" />

      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-[100px] font-black text-gray-900 mb-10 tracking-tighter leading-[1.05] uppercase font-serif">
            ご縁を力に
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 font-sans">
              価値を形に
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            企業や個人の魅力を見つけ形にするクリエイティブパートナー
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="#strength"
              className="group relative px-14 py-5 bg-orange-500 text-white font-black rounded-full overflow-hidden transition-all shadow-xl shadow-orange-200 hover:shadow-orange-300 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-3 uppercase tracking-widest text-[11px]">
                Our Solution
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </Link>
            <Link
              href="#contact"
              className="px-14 py-5 bg-white border border-orange-200 text-orange-600 font-black rounded-full hover:bg-orange-50 transition-all uppercase tracking-widest text-[11px]"
            >
              CONTACT
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-orange-400 flex flex-col items-center gap-3">
        <span className="text-[10px] font-black tracking-[0.5em] uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-14 bg-gradient-to-b from-orange-400 to-transparent" />
      </div>
    </section>
  );
}
