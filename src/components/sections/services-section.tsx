"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";

export function ServicesSection() {
  return (
    <section id="services" className="py-40 bg-[#fffbf7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 mb-8 text-[11px] font-black tracking-widest text-orange-600 uppercase border border-orange-200 rounded-full"
          >
            What We Do
          </motion.div>
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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg font-medium"
          >
            一つのきっかけを、無限の展開へ。
            <br />
            全ての事業領域をNudel LLCだけで完結させるメリットをご提案します。
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange-100 transition-all duration-500 border border-transparent hover:border-orange-100"
              >
                <div className="h-64 overflow-hidden relative">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
