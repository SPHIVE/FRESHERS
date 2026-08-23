"use client";

import React, { useState } from "react";
import { DollarSign, CreditCard, Calendar, Hash, Loader2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { submitContributionAction } from "@/app/actions/contribution";

export default function ContributionForm({ profile }: { profile: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await submitContributionAction(formData);

    setLoading(false);

    if (!result.success) {
      setError(result.error || "Failed to submit contribution.");
    } else {
      setSuccess(result.message || "Contribution submitted successfully!");
      (e.target as HTMLFormElement).reset();
    }
  }

  return (
    <div className="backdrop-blur-2xl bg-[#081221]/80 p-6 sm:p-8 rounded-3xl border border-[#D8B56A]/30 space-y-6 shadow-2xl">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="w-10 h-10 rounded-2xl bg-[#050914] border border-[#D8B56A]/30 flex items-center justify-center text-[#D8B56A]">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-black text-lg text-[#F4F1EA] uppercase tracking-wider">
            SUBMIT CONTRIBUTION
          </h2>
          <p className="text-xs text-slate-400">Record your contribution for verification</p>
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Contribution Amount */}
        <div>
          <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Contribution Amount (₹) *
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
            <input
              type="number"
              name="amount"
              min="1"
              step="any"
              required
              placeholder="e.g. 1000"
              className="w-full pl-10 pr-4 py-3 text-xs rounded-xl glass-input placeholder:text-slate-500 text-slate-100 font-mono text-base font-bold"
            />
          </div>
        </div>

        {/* Payment Mode */}
        <div>
          <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Payment Mode *
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
            <select
              name="paymentMode"
              required
              defaultValue="upi"
              className="w-full pl-10 pr-4 py-3 text-xs rounded-xl glass-input bg-[#081221] text-slate-100 cursor-pointer"
            >
              <option value="upi">UPI (GPay / PhonePe / Paytm)</option>
              <option value="cash">Cash Payment to Organizer</option>
              <option value="bank_transfer">Direct Bank Transfer</option>
              <option value="other">Other Mode</option>
            </select>
          </div>
        </div>

        {/* Payment Date */}
        <div>
          <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Payment Date *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
            <input
              type="date"
              name="paymentDate"
              required
              defaultValue={new Date().toISOString().split("T")[0]}
              className="w-full pl-10 pr-4 py-3 text-xs rounded-xl glass-input text-slate-100"
            />
          </div>
        </div>

        {/* Transaction Reference ID (Optional) */}
        <div>
          <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Transaction Ref / UTR ID (Optional)
          </label>
          <div className="relative">
            <Hash className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              name="transactionRefId"
              placeholder="e.g. 423984729384"
              className="w-full pl-10 pr-4 py-3 text-xs rounded-xl glass-input placeholder:text-slate-500 text-slate-100 font-mono"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-full gold-gradient-btn text-xs font-extrabold flex items-center justify-center gap-2 uppercase tracking-widest cursor-pointer disabled:opacity-50 mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#050914]" />
              <span>RECORDING CONTRIBUTION...</span>
            </>
          ) : (
            <span>SUBMIT CONTRIBUTION</span>
          )}
        </button>
      </form>
    </div>
  );
}
