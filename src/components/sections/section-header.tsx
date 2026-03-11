"use client";

import { motion } from "motion/react";

type SectionHeaderProps = {
  badge: string;
  title: string;
  description?: React.ReactNode;
  className?: string;
};

export function SectionHeader({
  badge,
  title,
  description,
  className = "mb-20",
}: SectionHeaderProps) {
  return (
    <div className={`text-center ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-block px-5 py-2 mb-8 text-[11px] font-black tracking-widest text-gray-600 uppercase border border-gray-200 rounded-full"
      >
        {badge}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-7xl font-black mb-10 tracking-tighter uppercase text-gray-900"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 max-w-2xl mx-auto text-lg font-medium"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
