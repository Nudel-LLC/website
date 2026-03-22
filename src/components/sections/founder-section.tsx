"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { FOUNDER } from "@/lib/constants";
import { FadeInView } from "@/components/ui/fade-in-view";

export function FounderSection() {
  return (
    <section
      id="founder"
      className="py-40 bg-[#fffbf7] relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-50/60 rounded-full blur-[120px] -ml-48 -mb-48" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-7xl font-black mb-20 tracking-tighter uppercase font-serif italic text-gray-900 text-center"
        >
          THE{" "}
          <span className="text-orange-500 not-italic font-sans">LEADER</span>
        </motion.h2>

        <FadeInView className="grid lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
          {/* Image Section */}
          <div className="relative group">
            <div className="relative z-10 rounded-[60px] overflow-hidden shadow-[0_40px_100px_rgba(255,107,0,0.15)] border-8 border-white">
              <Image
                src={FOUNDER.image}
                alt={`${FOUNDER.name} - ${FOUNDER.title}`}
                width={600}
                height={750}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-orange-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob" />
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-yellow-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000" />
          </div>

          {/* Content Section */}
          <div className="space-y-10">
            <div>
              <div className="flex items-baseline gap-4 mb-8">
                <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 font-serif italic">
                  {FOUNDER.name}
                </h3>
                <span className="px-4 py-1.5 bg-orange-500 text-white text-[10px] font-black tracking-widest uppercase rounded-full">
                  {FOUNDER.title}
                </span>
              </div>
              <p className="text-sm font-black tracking-[0.3em] text-orange-500 uppercase mb-8">
                {FOUNDER.nameEn}
              </p>
            </div>

            <div className="space-y-6 text-gray-600 leading-relaxed">
              {FOUNDER.bio.map((entry) => (
                <div
                  key={entry.year}
                  className="p-8 bg-white/80 backdrop-blur-sm rounded-[32px] border border-orange-100 hover:border-orange-200 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="font-medium">
                      <span className="font-black text-gray-900">
                        {entry.year}
                      </span>
                      、{entry.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </FadeInView>
      </div>
    </section>
  );
}