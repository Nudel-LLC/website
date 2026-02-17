import Link from "next/link";
import { SOCIAL_LINKS, SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-white text-gray-900 py-24 border-t border-orange-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-16">
          <div className="max-w-md">
            <h3 className="text-4xl font-black tracking-tighter italic mb-8">
              Nudel{" "}
              <span className="text-orange-500 font-sans not-italic">LLC</span>
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              一気通貫。一期一会。私たちは「人の良さを引き出す」ために、
              <br className="hidden md:block" />
              クリエイティブの全ての領域をしなやかに繋ぎ合わせます。
            </p>
          </div>
          <div className="flex gap-20">
            <div>
              <h4 className="text-[10px] font-black tracking-widest uppercase text-orange-500 mb-8">
                Social
              </h4>
              <ul className="space-y-4 text-xs font-black text-gray-400 uppercase tracking-widest">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-orange-500 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black tracking-widest uppercase text-orange-500 mb-8">
                Contact
              </h4>
              <p className="text-xs font-black text-gray-900 mb-2 tracking-widest uppercase">
                {SITE_CONFIG.email}
              </p>
              <p className="text-[10px] text-gray-300 font-bold tracking-widest">
                &copy; 2026 Nudel LLC. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
