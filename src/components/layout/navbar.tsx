"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { NAV_ITEMS } from "@/lib/constants";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          href="#"
          className="text-2xl font-black tracking-tighter text-gray-900 font-serif italic"
        >
          Nudel{" "}
          <span className="text-orange-500 font-sans not-italic">LLC</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[11px] font-black text-gray-500 hover:text-orange-500 transition-colors uppercase tracking-[0.2em]"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="#contact"
            className="px-8 py-3 bg-orange-500 text-white text-[11px] font-black rounded-full hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-200 transition-all tracking-widest uppercase"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-gray-900"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-orange-100 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-black text-gray-900 hover:text-orange-500 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="#contact"
                className="w-full py-4 bg-orange-500 text-white text-center font-black rounded-xl"
                onClick={() => setIsOpen(false)}
              >
                CONTACT
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
