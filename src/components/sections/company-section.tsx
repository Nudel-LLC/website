"use client";

import { COMPANY_INFO } from "@/lib/constants";

export function CompanySection() {
  return (
    <section id="company" className="py-40 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="lg:col-span-2 space-y-16">
          <div>
            <div className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-widest text-orange-600 uppercase bg-orange-50 rounded-lg">
              About Us
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter italic uppercase text-gray-900">
              COMPANY <span className="text-orange-500">DECK</span>
            </h2>
            <div className="aspect-video w-full bg-gray-50 rounded-[40px] overflow-hidden border border-orange-100 relative group shadow-2xl shadow-orange-50">
              <iframe
                src="https://docs.google.com/presentation/d/e/2PACX-1vT4-T9-S5n-g9z/embed?start=false&loop=false&delayms=3000"
                width="100%"
                height="100%"
                allowFullScreen={true}
                className="w-full h-full group-hover:scale-[1.01] transition-transform duration-700"
                title="Company Deck"
              />
              <div className="absolute bottom-6 right-6 px-6 py-2.5 bg-white shadow-xl text-orange-600 text-[10px] font-black tracking-widest uppercase rounded-full border border-orange-50">
                Interactive Preview
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {COMPANY_INFO.map((info) => (
              <div
                key={info.label}
                className="p-10 bg-orange-50/30 rounded-[32px] border border-orange-100 group hover:bg-orange-500 transition-colors"
              >
                <h3 className="text-orange-600 group-hover:text-white/80 font-black text-[10px] tracking-widest uppercase mb-6">
                  {info.label}
                </h3>
                <p className="text-2xl font-black italic text-gray-900 group-hover:text-white whitespace-pre-line">
                  {info.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
