"use client";

import { COMPANY_INFO } from "@/lib/constants";
import { ContactFormCard } from "./contact-form";

export function ContactSection() {
  return (
    <section id="contact" className="py-40 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 space-y-16">
            <div>
              <div className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-widest text-gray-600 uppercase bg-gray-50 rounded-lg">
                About Us
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter uppercase text-gray-900">
                COMPANY <span className="text-gray-400">INFO</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {COMPANY_INFO.map((info) => (
                <div
                  key={info.label}
                  className="p-10 bg-gray-50 rounded-[32px] border border-gray-100 group hover:bg-gray-900 transition-colors"
                >
                  <h3 className="text-gray-500 group-hover:text-white/80 font-black text-[10px] tracking-widest uppercase mb-6">
                    {info.label}
                  </h3>
                  <p className="text-2xl font-black text-gray-900 group-hover:text-white whitespace-pre-line">
                    {info.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <ContactFormCard />
          </div>
        </div>
      </div>
    </section>
  );
}
