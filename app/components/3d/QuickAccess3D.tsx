"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Award, PieChart, Sparkles, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const quickAccessItems = [
  {
    title: "Student Help Hub",
    description: "Verified senior directory, faculty contacts, academic guides, and student positions.",
    icon: BookOpen,
    href: "/help-hub",
    accent: "from-amber-500/20 to-gold-500/10",
    border: "border-gold-500/30",
    tag: "Protected Shell",
  },
  {
    title: "Contributors Wall",
    description: "Recognizing IICT students who contribute to Fresher Party 2026 celebrations.",
    icon: Award,
    href: "#contributors-section",
    accent: "from-gold-500/20 to-navy-800/40",
    border: "border-gold-500/40",
    tag: "Verified Profiles",
  },
  {
    title: "Financial Transparency",
    description: "100% real-time collection, verified expenses, and audit ledger tracking.",
    icon: PieChart,
    href: "#financial-section",
    accent: "from-emerald-500/20 to-navy-800/40",
    border: "border-emerald-500/30",
    tag: "Live Ledger",
  },
  {
    title: "Fresher Party 2026",
    description: "Event updates, stage schedules, venue details, and student coordinator lists.",
    icon: Sparkles,
    href: "#legendary-section",
    accent: "from-purple-500/20 to-navy-800/40",
    border: "border-purple-500/30",
    tag: "Event Experience",
  },
];

export function QuickAccess3D() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div id="quick-access-section" className="space-y-6 py-8">
      <div className="text-center space-y-2 max-w-lg mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Portals</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-100 uppercase tracking-tight">
          Explore IICT Ecosystem
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Hover and select interactive 3D navigation nodes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickAccessItems.map((item, idx) => {
          const Icon = item.icon;
          const isHovered = hoveredIdx === idx;

          return (
            <motion.div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              animate={{
                scale: isHovered ? 1.03 : 1,
                rotateX: isHovered ? -4 : 0,
                rotateY: isHovered ? 4 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ perspective: 1000 }}
            >
              <Link
                href={item.href}
                className={`block h-full glass-card p-6 rounded-3xl border ${item.border} relative overflow-hidden group transition-shadow duration-300 ${
                  isHovered ? "shadow-gold-glow border-gold-400/60" : "shadow-lg"
                }`}
              >
                {/* 3D Dynamic Ambient Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-40 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none`}
                />

                <div className="relative z-10 flex flex-col justify-between h-full space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-navy-950/80 border border-gold-500/40 flex items-center justify-center text-gold-400 group-hover:scale-110 group-hover:border-gold-300 transition-all duration-300 shadow-gold-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-navy-950/90 text-gold-300 border border-navy-700">
                        {item.tag}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-bold text-base text-slate-100 group-hover:text-gold-300 transition-colors flex items-center gap-1">
                        <span>{item.title}</span>
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-navy-800/80 flex items-center justify-between text-xs text-gold-400 font-semibold group-hover:translate-x-1 transition-transform">
                    <span>Enter Gateway</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
