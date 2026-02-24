"use client";

import type { Service } from "@/lib/microcms/types";
import { ServiceCard } from "./service-card";
import { SectionHeader } from "./section-header";

type ServicesSectionProps = {
  services: Service[];
};

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="py-40 bg-[#fffbf7]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="What We Do"
          titleItalic="OUR"
          titleAccent="SOLUTIONS"
          description={
            <>
              一つのきっかけを、無限の展開へ。
              <br />
              全ての事業領域をNudel LLCだけで完結させるメリットをご提案します。
            </>
          }
          className="mb-28"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
