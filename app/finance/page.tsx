import React from "react";
import Link from "next/link";
import { ShieldCheck, TrendingUp, TrendingDown, DollarSign, FileText, CheckCircle2, Lock, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Financial Transparency | IICT Fresher Party 2026",
  description: "100% Audited Financial Transparency ledger for IICT Fresher Party 2026. Every rupee accounted for.",
};

export default function FinancialPage() {
  const financialMetrics = [
    { label: "TOTAL FUNDS COLLECTED", value: "₹0", icon: TrendingUp, color: "text-emerald-400", border: "border-emerald-500/30" },
    { label: "TOTAL EVENT EXPENSES", value: "₹0", icon: TrendingDown, color: "text-red-400", border: "border-red-500/30" },
    { label: "REMAINING TREASURY BALANCE", value: "₹0", icon: DollarSign, color: "text-[#D8B56A]", border: "border-[#D8B56A]/40" },
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header Banner */}
      <div className="text-center space-y-4 pt-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#081221] border border-[#D8B56A]/40 text-[#D8B56A] text-xs font-bold uppercase tracking-widest shadow-sm">
          <ShieldCheck className="w-4 h-4 text-[#D8B56A]" />
          <span>100% AUDITED & VERIFIED</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#F4F1EA] uppercase tracking-tight">
          FINANCIAL <span className="gold-gradient-text">TRANSPARENCY</span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 tracking-wider uppercase font-semibold">
          “Every Penny Accounted For. Full Accountability.”
        </p>

        <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed pt-1">
          Complete openness and financial integrity for the IICT Fresher Party 2026. All contributions, vendor invoices, and treasury balances are published in real time.
        </p>
      </div>

      {/* Financial Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {financialMetrics.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`backdrop-blur-2xl bg-[#081221]/80 p-8 rounded-3xl border ${item.border} flex flex-col justify-between space-y-6 shadow-xl`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
                  {item.label}
                </span>
                <div className="w-10 h-10 rounded-2xl bg-[#050914] border border-[#D8B56A]/30 flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
              </div>

              <div>
                <h3 className={`text-4xl font-black ${item.color} tracking-tight font-mono`}>
                  {item.value}
                </h3>
                <p className="text-[11px] text-slate-400 pt-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Audited Treasury Record</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expense Ledger & Receipts Container */}
      <div className="backdrop-blur-2xl bg-[#081221]/70 p-8 sm:p-12 rounded-3xl border border-[#D8B56A]/25 space-y-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <h2 className="text-xl font-black text-[#F4F1EA] uppercase tracking-wider">
              OFFICIAL EXPENSE LEDGER
            </h2>
            <p className="text-xs text-slate-400 pt-1">
              Itemized ledger of vendor payments, auditorium rentals, and stage equipment.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#050914] border border-[#D8B56A]/30 text-[#D8B56A] text-xs font-bold uppercase tracking-widest">
            <FileText className="w-3.5 h-3.5" />
            <span>REAL-TIME AUDIT</span>
          </div>
        </div>

        {/* Empty Ledger State */}
        <div className="p-12 text-center space-y-4 bg-[#050914]/60 rounded-2xl border border-slate-800/80">
          <div className="w-14 h-14 rounded-2xl bg-[#081221] border border-[#D8B56A]/30 flex items-center justify-center text-[#D8B56A] mx-auto">
            <ShieldCheck className="w-7 h-7 text-[#D8B56A]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#F4F1EA] uppercase tracking-wide">
              NO EXPENSES INCURRED YET
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Official venue booking and vendor transactions for IICT Fresher Party 2026 will appear here with downloadable receipts as expenses are approved by administration.
            </p>
          </div>
        </div>
      </div>

      {/* Audit Guarantee Banner */}
      <div className="p-8 rounded-3xl bg-[#081221]/90 border border-[#D8B56A]/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-xl">
        <div className="space-y-1">
          <h3 className="font-extrabold text-base text-[#F4F1EA] uppercase tracking-wider flex items-center justify-center md:justify-start gap-2">
            <Lock className="w-4 h-4 text-[#D8B56A]" />
            <span>STUDENT TRANSPARENCY COMMITMENT</span>
          </h3>
          <p className="text-xs text-slate-400 max-w-xl">
            Any IICT student or contributor can request financial verification and inspect original vendor invoices from the Student Council Treasurer.
          </p>
        </div>
        <Link
          href="/contributors"
          className="px-6 py-3 rounded-full gold-outline-btn text-xs font-bold uppercase tracking-widest shrink-0"
        >
          VIEW CONTRIBUTORS WALL
        </Link>
      </div>
    </div>
  );
}
