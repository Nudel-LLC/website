"use client";

import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ServiceError({ reset }: Props) {
  return (
    <div className="pt-32 pb-20 min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="text-orange-400 mb-6 flex justify-center">
          <AlertCircle size={48} />
        </div>
        <h2 className="text-2xl font-black tracking-tight text-gray-900 mb-4">
          読み込みエラー
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          サービス情報の取得中にエラーが発生しました。
          しばらくしてからもう一度お試しください。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 text-white text-sm font-bold rounded-full hover:bg-orange-600 transition-colors"
          >
            再試行
          </button>
          <Link
            href="/#services"
            className="inline-flex items-center justify-center text-sm text-gray-500 hover:text-orange-500 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            サービス一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
