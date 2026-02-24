"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Service } from "@/lib/microcms/types";
import { ICON_MAP } from "@/lib/microcms/icon-map";
import { FadeInView } from "@/components/ui/fade-in-view";

type ServiceCardProps = {
  service: Service;
  index: number;
};

export function ServiceCard({ service, index }: ServiceCardProps) {
  const iconKey = service.icon[0];
  const Icon = iconKey ? ICON_MAP[iconKey] : null;

  return (
    <FadeInView delay={index * 0.1}>
      <Link
        href={`/services/${service.slug}`}
        className="group block bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange-100 transition-all duration-500 border border-transparent hover:border-orange-100"
      >
        <div className="h-64 overflow-hidden relative">
          <Image
            src={service.image.url}
            alt={service.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-1000"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="p-10">
          <div className="text-orange-500 mb-8 bg-orange-50 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-sm">
            {Icon && <Icon className="w-6 h-6" />}
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
      </Link>
    </FadeInView>
  );
}
