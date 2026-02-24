"use client";

import { motion } from "motion/react";

type SectionHeaderProps = {
  /** バッジに表示するラベル（例: "What We Do"） */
  badge: string;
  /** タイトルの前半（セリフ体イタリック部分、例: "OUR"） */
  titleItalic: string;
  /** タイトルの後半（オレンジのサンセリフ体部分、例: "SOLUTIONS"） */
  titleAccent: string;
  /** タイトル下の説明文（省略可能、JSX 可） */
  description?: React.ReactNode;
  /** ラッパー div に付与する追加クラス（例: "mb-20" / "mb-28"） */
  className?: string;
};

/**
 * 各ページセクションで共通使用するヘッダーコンポーネント。
 * バッジ・タイトル・説明文をフェードインアニメーション付きで表示する。
 */
export function SectionHeader({
  badge,
  titleItalic,
  titleAccent,
  description,
  className = "mb-20",
}: SectionHeaderProps) {
  return (
    <div className={`text-center ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-block px-5 py-2 mb-8 text-[11px] font-black tracking-widest text-orange-600 uppercase border border-orange-200 rounded-full"
      >
        {badge}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-7xl font-black mb-10 tracking-tighter uppercase font-serif italic text-gray-900"
      >
        {titleItalic}{" "}
        <span className="text-orange-500 not-italic font-sans">
          {titleAccent}
        </span>
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
