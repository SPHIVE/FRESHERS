import React from "react";
import Link from "next/link";
import { getFinancialData } from "@/app/actions/contribution";
import { FinanceHero3D } from "@/app/components/3d/FinanceHero3D";
import { ShieldCheck, TrendingUp, TrendingDown, DollarSign, FileText, CheckCircle2, Lock, ArrowUpRight, Award, Receipt } from "lucide-react";
import ReceiptModalViewer from "./receipt-modal-viewer";

export const revalidate = 0;

export const metadata = {
  title: "Financial Transparency | UNOFFICIAL IICT",
  description: "100% Audited Financial Transparency ledger for IICT Fresher Party 2026. Every rupee accounted for.",
};

export default async function FinancialPage() {
  const financialData = await getFinancialData();
  const { totalCollected, totalExpenses, remainingBalance, verifiedContributorsCount, expensesList, categoryBreakdown } = financialData;

  const hasActivity = totalCollected > 0 || totalExpenses > 0 || expensesList.length > 0;

  return (
    <div className="relative min-h-screen selection:bg-[#D8B56A] selection:text-[#050914]">
      {/* 3D Cool Precision Hero Scene */}
      <FinanceHero3D />

      <div className="relative z-10 pt-28 pb-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#081221]/90 border border-[#244C7A]/60 text-[#D8B56A] text-[11px] font-bold uppercase tracking-[0.2em] shadow-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D8B56A]" />
            <span>100% AUDITED TRANSPARENCY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-[#F4F1EA] uppercase tracking-tight">
            FINANCIAL <span className="text-[#D8B56A]">TRANSPARENCY</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 tracking-[0.2em] uppercase font-bold">
            Every Contribution. Every Expense. Accounted For.
          </p>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed pt-1">
            Complete openness and financial integrity for the IICT Fresher Party 2026. All student contributions, vendor invoices, and treasury balances are published in real time.
          </p>
        </div>

        {/* Financial Summary — Visually Dominant Balance Design */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Dominant Remaining Balance Card (7 Cols) */}
          <div className="lg:col-span-7 backdrop-blur-2xl bg-[#081221]/90 p-8 sm:p-10 rounded-3xl border border-[#D8B56A]/40 flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#D8B56A]">
                  AUDITED TREASURY
                </span>
                <h2 className="text-sm font-extrabold text-slate-300 uppercase tracking-wider">
                  REMAINING TREASURY BALANCE
                </h2>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#050914] border border-[#D8B56A]/40 flex items-center justify-center text-[#D8B56A]">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>

            <div>
              <div className="text-4xl sm:text-6xl font-black text-[#F4F1EA] font-mono tracking-tight">
                ₹{remainingBalance.toLocaleString("en-IN")}
              </div>
              <p className="text-xs text-slate-400 pt-3 flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Audited Treasury Record = Total Collected (₹{totalCollected}) − Total Expenses (₹{totalExpenses})</span>
              </p>
            </div>
          </div>

          {/* Secondary Financial Metrics (5 Cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {/* Total Collected */}
            <div className="backdrop-blur-2xl bg-[#081221]/80 p-6 rounded-3xl border border-emerald-500/30 flex items-center justify-between shadow-xl">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  TOTAL COLLECTED
                </span>
                <div className="text-2xl font-black text-emerald-400 font-mono pt-1">
                  ₹{totalCollected.toLocaleString("en-IN")}
                </div>
                <span className="text-[10px] text-slate-400 font-medium">Sum of verified contributions</span>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#050914] border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>

            {/* Total Expenses */}
            <div className="backdrop-blur-2xl bg-[#081221]/80 p-6 rounded-3xl border border-red-500/30 flex items-center justify-between shadow-xl">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  TOTAL EXPENSES
                </span>
                <div className="text-2xl font-black text-red-400 font-mono pt-1">
                  ₹{totalExpenses.toLocaleString("en-IN")}
                </div>
                <span className="text-[10px] text-slate-400 font-medium">Sum of approved event costs</span>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#050914] border border-red-500/30 flex items-center justify-center text-red-400">
                <TrendingDown className="w-5 h-5" />
              </div>
            </div>

            {/* Verified Contributors Count */}
            <div className="backdrop-blur-2xl bg-[#081221]/80 p-5 rounded-3xl border border-[#D8B56A]/25 flex items-center justify-between shadow-xl sm:col-span-2 lg:col-span-1">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  VERIFIED CONTRIBUTORS
                </span>
                <div className="text-xl font-black text-[#D8B56A] font-mono pt-0.5">
                  {verifiedContributorsCount} STUDENTS
                </div>
              </div>
              <Link
                href="/contribution"
                className="px-3.5 py-1.5 rounded-full bg-[#050914] border border-[#D8B56A]/40 text-[#D8B56A] text-[10px] font-bold uppercase tracking-wider hover:bg-[#D8B56A] hover:text-[#050914] transition-all"
              >
                WALL OF HONOR
              </Link>
            </div>
          </div>
        </div>

        {/* Expense Breakdown Category Grid */}
        {Object.keys(categoryBreakdown).length > 0 && (
          <div className="backdrop-blur-2xl bg-[#081221]/80 p-8 rounded-3xl border border-[#D8B56A]/25 space-y-6 shadow-2xl">
            <h3 className="text-lg font-extrabold text-[#F4F1EA] uppercase tracking-wider">
              EXPENSE BREAKDOWN
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(categoryBreakdown).map(([cat, amount]) => (
                <div key={cat} className="p-4 rounded-2xl bg-[#050914]/80 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">{cat}</span>
                  <span className="text-lg font-black text-[#D8B56A] font-mono">₹{amount}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Financial Ledger Section */}
        <div className="backdrop-blur-2xl bg-[#081221]/80 p-8 sm:p-12 rounded-3xl border border-[#D8B56A]/30 space-y-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <h2 className="text-2xl font-black text-[#F4F1EA] uppercase tracking-wider">
                OFFICIAL FINANCIAL LEDGER
              </h2>
              <p className="text-xs text-slate-400 pt-1 font-medium">
                Itemized transaction record of all event expenditures and receipts.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#050914] border border-[#D8B56A]/30 text-[#D8B56A] text-xs font-bold uppercase tracking-widest">
              <FileText className="w-3.5 h-3.5" />
              <span>REAL-TIME AUDIT</span>
            </div>
          </div>

          {expensesList.length > 0 ? (
            <div>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase font-extrabold tracking-wider">
                      <th className="py-3 px-4">DATE</th>
                      <th className="py-3 px-4">DESCRIPTION & CATEGORY</th>
                      <th className="py-3 px-4">VENDOR</th>
                      <th className="py-3 px-4 text-right">DEBIT (EXPENSE)</th>
                      <th className="py-3 px-4 text-center">RECEIPT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {expensesList.map((item) => (
                      <tr key={item.id} className="hover:bg-[#050914]/50 transition-colors">
                        <td className="py-4 px-4 font-mono text-slate-300">{item.expense_date}</td>
                        <td className="py-4 px-4">
                          <div className="font-bold text-[#F4F1EA]">{item.description}</div>
                          <span className="text-[10px] text-[#D8B56A] font-semibold">{item.category}</span>
                        </td>
                        <td className="py-4 px-4 text-slate-400">{item.vendor_name || "N/A"}</td>
                        <td className="py-4 px-4 text-right font-mono font-bold text-red-400">
                          ₹{item.amount.toLocaleString("en-IN")}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {item.receipt_url ? (
                            <ReceiptModalViewer receiptUrl={item.receipt_url} title={item.description} />
                          ) : (
                            <span className="text-[10px] text-slate-500 font-semibold">NO RECEIPT</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Stacked Card View */}
              <div className="md:hidden space-y-4">
                {expensesList.map((item) => (
                  <div key={item.id} className="p-5 rounded-2xl bg-[#050914]/80 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-400">{item.expense_date}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#D8B56A]/15 text-[#D8B56A] text-[10px] font-bold">
                        {item.category}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#F4F1EA]">{item.description}</h4>
                      {item.vendor_name && <p className="text-xs text-slate-400">Vendor: {item.vendor_name}</p>}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <span className="font-mono font-bold text-red-400 text-sm">
                        DEBIT: ₹{item.amount.toLocaleString("en-IN")}
                      </span>
                      {item.receipt_url && (
                        <ReceiptModalViewer receiptUrl={item.receipt_url} title={item.description} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="p-12 text-center space-y-4 bg-[#050914]/60 rounded-2xl border border-slate-800">
              <div className="w-14 h-14 rounded-2xl bg-[#081221] border border-[#D8B56A]/30 flex items-center justify-center text-[#D8B56A] mx-auto">
                <ShieldCheck className="w-7 h-7 text-[#D8B56A]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-[#F4F1EA] uppercase tracking-wider">
                  NO FINANCIAL ACTIVITY YET
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed font-medium">
                  Official venue booking and vendor transactions for IICT Fresher Party 2026 will appear here with downloadable receipts as expenses are recorded.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Audit Commitment Banner */}
        <div className="p-8 rounded-3xl bg-[#081221]/90 border border-[#D8B56A]/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-xl">
          <div className="space-y-1">
            <h3 className="font-extrabold text-base text-[#F4F1EA] uppercase tracking-wider flex items-center justify-center md:justify-start gap-2">
              <Lock className="w-4 h-4 text-[#D8B56A]" />
              <span>STUDENT TRANSPARENCY COMMITMENT</span>
            </h3>
            <p className="text-xs text-slate-400 max-w-xl font-medium">
              Any IICT student or contributor can request financial verification and inspect original vendor invoices from the Student Council Treasurer.
            </p>
          </div>
          <Link
            href="/contribution"
            className="px-6 py-3 rounded-full gold-outline-btn text-xs font-bold uppercase tracking-widest shrink-0"
          >
            VIEW CONTRIBUTORS WALL
          </Link>
        </div>
      </div>
    </div>
  );
}
