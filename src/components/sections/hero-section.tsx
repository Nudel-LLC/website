"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#fffbf7]">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-orange-100/30 rounded-full blur-[120px] -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-orange-50/50 rounded-full blur-[100px] -ml-32 -mb-32" />

      {/* Floating cards */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 hidden lg:block">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[10%] w-64 h-80 rounded-3xl overflow-hidden shadow-2xl rotate-6"
        >
          <Image
            src="https://images.unsplash.com/photo-1635366898830-b5d48950e4f6?q=80&w=800"
            alt="Creative"
            fill
            className="object-cover"
            sizes="256px"
          />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-[15%] left-[8%] w-56 h-72 rounded-3xl overflow-hidden shadow-2xl -rotate-12"
        >
          <Image
            src="https://images.unsplash.com/photo-1671716784499-a3d26826d844?q=80&w=800"
            alt="Creative work"
            fill
            className="object-cover"
            sizes="224px"
          />
        </motion.div>
      </div>

      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-6 py-2.5 mb-10 text-[10px] font-black tracking-[0.4em] text-orange-600 uppercase border border-orange-200 rounded-full bg-orange-50/50 backdrop-blur-sm"
          >
            <Sparkles size={14} className="text-orange-500" /> HR x Creative x
            Dialog
          </motion.div>

          <h1 className="text-5xl md:text-[100px] font-black text-gray-900 mb-10 tracking-tighter leading-[1.05] uppercase font-serif italic">
            ご縁を力に、
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 not-italic font-sans">
              価値を形に。
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            バラバラの依頼は、もういらない。
            <br className="hidden md:block" />
            「人の良さを引き出す」企画から実行までを狙い撃つ、
            <br className="hidden md:block" />
            しなやかで力強いクリエイティブ・パートナー。
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
              Get Started
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
