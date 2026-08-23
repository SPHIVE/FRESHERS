"use client";

import React from "react";
import { ShieldCheck, TrendingUp, TrendingDown, Wallet, Lock } from "lucide-react";
import { motion } from "framer-motion";

interface FinancialProps {
  totalCollected?: number;
  totalExpenses?: number;
}

export function Financial3DSection({
  totalCollected = 0,
  totalExpenses = 0,
}: FinancialProps) {
  const remainingBalance = totalCollected - totalExpenses;

  const cards = [
    {
      title: "Total Collected",
      value: `₹${totalCollected.toLocaleString("en-IN")}`,
      subtitle: "Sum of verified student contributions",
      icon: TrendingUp,
      accentColor: "text-emerald-400",
      borderColor: "border-emerald-500/40",
      bgColor: "from-emerald-500/10 to-navy-950/80",
      depthOffset: 0,
    },
    {
      title: "Total Expenses",
      value: `₹${totalExpenses.toLocaleString("en-IN")}`,
      subtitle: "Sum of approved party expenditure",
      icon: TrendingDown,
      accentColor: "text-red-400",
      borderColor: "border-red-500/40",
      bgColor: "from-red-500/10 to-navy-950/80",
      depthOffset: -12,
    },
    {
      title: "Remaining Balance",
      value: `₹${remainingBalance.toLocaleString("en-IN")}`,
      subtitle: "Collection minus verified expenses",
      icon: Wallet,
      accentColor: "text-gold-400",
      borderColor: "border-gold-500/50",
      bgColor: "from-gold-500/15 to-navy-950/90",
      depthOffset: 0,
    },
  ];

  return (
    <div id="financial-section" className="space-y-8 py-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>100% Transparent • Every Penny Accounted For</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-100 uppercase">
          Financial Transparency Ledger
        </h2>

        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Real-time financial status for Fresher Party 2026. Every contribution and expense is verified by IICT administration.
        </p>
      </div>

      {/* 3D Floating Glass & Metal Financial Metric Pedestals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02 }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className={`glass-card p-6 sm:p-8 rounded-3xl border ${card.borderColor} bg-gradient-to-b ${card.bgColor} space-y-4 relative shadow-2xl transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                    {card.title}
                  </span>
                  <div className={`w-10 h-10 rounded-2xl bg-navy-950/80 border ${card.borderColor} flex items-center justify-center ${card.accentColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <p className={`text-3xl sm:text-4xl font-black tracking-tight ${card.accentColor}`}>
                    {card.value}
                  </p>
                  <p className="text-xs text-slate-400 font-medium">
                    {card.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-navy-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-gold-400" /> Verified DB Ledger
                  </span>
                  <span className="text-slate-400 font-bold uppercase text-[10px] px-2 py-0.5 rounded bg-navy-900 border border-navy-800">
                    Active
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
