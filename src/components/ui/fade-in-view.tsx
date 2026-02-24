"use client";

import { motion } from "motion/react";

type FadeInViewProps = {
  children: React.ReactNode;
  className?: string;
  /** フェードイン前の Y オフセット (px)。デフォルト 40 */
  y?: number;
  /** アニメーション開始遅延 (秒)。デフォルト 0 */
  delay?: number;
  /** アニメーション時間 (秒)。デフォルト 0.8 */
  duration?: number;
};

/**
 * スクロール時にフェードイン + スライドアップするラッパーコンポーネント。
 * `whileInView` + `viewport={{ once: true }}` のパターンを集約する。
 */
export function FadeInView({
  children,
  className,
  y = 40,
  delay = 0,
  duration = 0.8,
}: FadeInViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
