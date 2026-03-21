"use client";

import Image from "next/image";
import { motion } from "motion/react";

type MemberCardProps = {
  name: string;
  nameEn: string;
  role: string;
  roleShort: string;
  image: string;
  bios: readonly string[];
  delay?: number;
};

function MemberCard({
  name,
  nameEn,
  role,
  roleShort,
  image,
  bios,
  delay = 0,
}: MemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto"
    >
      {/* 画像 */}
      <div className="relative group mx-auto w-full max-w-xs">
        <div className="relative z-10 rounded-[40px] overflow-hidden shadow-[0_20px_60px_rgba(255,107,0,0.12)] border-4 border-white bg-gray-100">
          <Image
            src={image}
            alt={`${name} - ${role}`}
            width={400}
            height={500}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-orange-100 rounded-full mix-blend-multiply blur-2xl opacity-60" />
        <div className="absolute -top-6 -left-6 w-20 h-20 bg-yellow-100 rounded-full mix-blend-multiply blur-2xl opacity-60" />
      </div>

      {/* プロフィール */}
      <div className="space-y-6">
        <div>
          <div className="flex items-baseline gap-3 mb-4">
            <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900 font-serif italic">
              {name}
            </h3>
            <span className="px-3 py-1 bg-orange-500 text-white text-[9px] font-black tracking-widest uppercase rounded-full">
              {roleShort}
            </span>
          </div>
          <p className="text-xs font-black tracking-[0.3em] text-orange-500 uppercase mb-4">
            {nameEn}
          </p>
        </div>

        <div className="space-y-4 text-gray-600 leading-relaxed">
          {bios.map((bio, i) => (
            <div
              key={i}
              className="p-6 bg-white/80 backdrop-blur-sm rounded-[24px] border border-orange-100 hover:border-orange-200 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm font-medium">{bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const MEMBERS = [
  {
    name: "KO",
    nameEn: "Chief Creative Officer",
    role: "Chief Creative Officer",
    roleShort: "CCO",
    image: "/images/team/ko.png",
    bios: [
      "企画・撮影・編集・ライブ配信を大手キー局で8年間経験。複数のYouTubeチャンネルの立ち上げ＆運用、TikTokアカウントのローンチ、地上波クオリティの企画制作などを歴任。",
      "生成AI動画を用いた映画の制作にも着手し、常に最先端の手法を最適な形でクライアントに提供。",
    ],
  },
  {
    name: "深津 蓮",
    nameEn: "Ren Fukatsu",
    role: "CTO",
    roleShort: "CTO",
    image: "/images/team/fukatsu.png",
    bios: ["経歴は追って追加します。"],
  },
] as const;

export function MemberSection() {
  return (
    <section id="member" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-50/40 rounded-full blur-[100px] -mr-32 -mt-32" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black mb-6 tracking-tighter uppercase font-serif italic text-gray-900"
          >
            <span className="text-orange-500 not-italic font-sans">
              MEMBER
            </span>
          </motion.h2>
        </div>

        <div className="space-y-16">
          {MEMBERS.map((member, index) => (
            <MemberCard
              key={member.name}
              {...member}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
