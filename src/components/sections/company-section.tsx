"use client";

import { ContactFormCard } from "./contact-form";

export function CompanySection() {
  return (
    <section id="company" className="py-40 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 space-y-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter uppercase text-gray-900">
                COMPANY <span className="text-orange-500">DECK</span>
              </h2>
              <div className="aspect-video w-full bg-gray-50 rounded-[40px] overflow-hidden border border-orange-100 relative group shadow-2xl shadow-orange-50">
                <iframe
                  src="https://drive.google.com/file/d/1uVDolp2IeyPIjLK-3tDPVw1_PmqoFrYt/preview"
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

          </div>

          <div id="contact" className="relative">
            <ContactFormCard />
          </div>
        </div>
      </div>
    </section>
  );
}
