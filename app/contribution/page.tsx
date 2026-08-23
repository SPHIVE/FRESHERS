import React from "react";
import Link from "next/link";
import { getCurrentProfile } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { ContributionHero3D } from "@/app/components/3d/ContributionHero3D";
import { HeartHandshake, ShieldCheck, Award, Lock, User, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import ContributionForm from "./contribution-form";

export const revalidate = 0;

export const metadata = {
  title: "Contribution & Wall of Honor | UNOFFICIAL IICT",
  description: "Contribute to IICT Fresher Party 2026, track verification status, and view the official Contributor Wall of Honor.",
};

export default async function ContributionPage() {
  const profile = await getCurrentProfile();
  const supabase = await createClient();

  // Fetch verified contributors for the Wall of Honor
  const { data: verifiedContributors } = await supabase
    .from("public_verified_contributors")
    .select("*")
    .order("payment_date", { ascending: false });

  // Fetch logged in user's personal contributions
  let userContributions: any[] = [];
  if (profile) {
    const { data: userContribs } = await supabase
      .from("contributions")
      .select("*")
      .eq("user_id", profile.id)
      .order("created_at", { ascending: false });
    userContributions = userContribs || [];
  }

  const verifiedUserContribs = userContributions.filter((c) => c.status === "verified");
  const totalVerifiedAmount = verifiedUserContribs.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  let userStatus: "NO CONTRIBUTION" | "VERIFICATION PENDING" | "VERIFIED CONTRIBUTOR" = "NO CONTRIBUTION";
  if (verifiedUserContribs.length > 0) {
    userStatus = "VERIFIED CONTRIBUTOR";
  } else if (userContributions.some((c) => c.status === "pending")) {
    userStatus = "VERIFICATION PENDING";
  }

  return (
    <div className="relative min-h-screen selection:bg-[#D8B56A] selection:text-[#050914]">
      {/* 3D Atmospheric Hero Scene */}
      <ContributionHero3D />

      <div className="relative z-10 pt-28 pb-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
        {/* Page Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#081221]/90 border border-[#D8B56A]/40 text-[#D8B56A] text-[11px] font-bold uppercase tracking-[0.2em] shadow-lg">
            <HeartHandshake className="w-3.5 h-3.5 text-[#D8B56A]" />
            <span>UNOFFICIAL IICT</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-[#F4F1EA] uppercase tracking-tight">
            CONTRIBUTION
          </h1>

          <p className="text-xs sm:text-sm text-[#F1D28A] tracking-[0.2em] uppercase font-bold">
            Together, We Make It Possible.
          </p>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed pt-1">
            Support the IICT Fresher Party 2026. Every contribution is transparently audited and recorded on the student treasury ledger.
          </p>
        </div>

        {/* Contribution Submission & Personal Status Section */}
        {profile ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Column (7 Cols) */}
            <div className="lg:col-span-7">
              <ContributionForm profile={profile} />
            </div>

            {/* My Contribution Status Column (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="backdrop-blur-2xl bg-[#081221]/80 p-6 sm:p-8 rounded-3xl border border-[#D8B56A]/30 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h3 className="font-extrabold text-base text-[#F4F1EA] uppercase tracking-wider">
                    MY CONTRIBUTION STATUS
                  </h3>
                  <ShieldCheck className="w-5 h-5 text-[#D8B56A]" />
                </div>

                {/* Status Badge */}
                <div className="p-4 rounded-2xl bg-[#050914]/80 border border-[#D8B56A]/20 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Current Status:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      userStatus === "VERIFIED CONTRIBUTOR"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : userStatus === "VERIFICATION PENDING"
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                        : "bg-slate-800 text-slate-400 border border-slate-700"
                    }`}
                  >
                    {userStatus}
                  </span>
                </div>

                {/* Total Verified Amount */}
                <div className="p-5 rounded-2xl bg-[#050914] border border-[#D8B56A]/30 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                    TOTAL VERIFIED CONTRIBUTION
                  </span>
                  <span className="text-3xl font-black text-[#D8B56A] font-mono">
                    ₹{totalVerifiedAmount.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Submission History List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    SUBMISSION HISTORY
                  </h4>
                  {userContributions.length > 0 ? (
                    <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                      {userContributions.map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-xl bg-[#050914]/60 border border-slate-800 flex items-center justify-between text-xs"
                        >
                          <div className="space-y-0.5">
                            <span className="font-mono font-bold text-[#F4F1EA]">₹{item.amount}</span>
                            <span className="block text-[10px] text-slate-400">
                              {item.payment_mode.toUpperCase()} • {item.payment_date}
                            </span>
                          </div>
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                              item.status === "verified"
                                ? "text-emerald-400 bg-emerald-950/60"
                                : item.status === "rejected"
                                ? "text-red-400 bg-red-950/60"
                                : "text-amber-400 bg-amber-950/60"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No contribution record submitted yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Unauthenticated State Prompt */
          <div className="backdrop-blur-2xl bg-[#081221]/85 p-10 sm:p-14 rounded-3xl border border-[#D8B56A]/35 text-center space-y-6 max-w-xl mx-auto shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-[#050914] border border-[#D8B56A]/40 flex items-center justify-center text-[#D8B56A] mx-auto shadow-lg">
              <Lock className="w-8 h-8 text-[#D8B56A]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-[#F4F1EA] uppercase tracking-wide">
                SIGN IN TO CONTRIBUTE
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                Please log in with your verified IICT student account to submit your contribution record and track verification status.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full gold-gradient-btn text-xs font-extrabold uppercase tracking-widest"
              >
                LOGIN
              </Link>
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full gold-outline-btn text-xs font-extrabold uppercase tracking-widest"
              >
                CREATE ACCOUNT
              </Link>
            </div>
          </div>
        )}

        {/* Wall of Honor — Verified Contributors Section */}
        <div className="backdrop-blur-2xl bg-[#081221]/80 p-8 sm:p-12 rounded-3xl border border-[#D8B56A]/30 space-y-8 shadow-2xl">
          <div className="text-center space-y-2 max-w-lg mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#050914] border border-[#D8B56A]/30 text-[#D8B56A] text-[10px] font-bold uppercase tracking-widest">
              <Award className="w-3.5 h-3.5" />
              <span>WALL OF HONOR</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#F4F1EA] uppercase tracking-wider">
              THE CONTRIBUTORS
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              The People Who Made It Possible. Every verified contributor receives equal recognition.
            </p>
          </div>

          {verifiedContributors && verifiedContributors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {verifiedContributors.map((c: any) => (
                <div
                  key={c.contribution_id}
                  className="group relative p-6 rounded-3xl bg-[#050914]/90 border border-[#D8B56A]/30 hover:border-[#D8B56A] flex flex-col items-center text-center space-y-4 shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Champagne Edge Light Portrait Frame */}
                  <div className="w-24 h-24 rounded-full border-2 border-[#D8B56A]/60 p-1 bg-[#081221] shadow-[0_0_20px_rgba(216,181,106,0.25)] group-hover:scale-105 transition-transform">
                    <div className="w-full h-full rounded-full overflow-hidden bg-[#050914] flex items-center justify-center">
                      {c.profile_photo_url ? (
                        <img
                          src={c.profile_photo_url}
                          alt={c.full_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-10 h-10 text-[#D8B56A]/70" />
                      )}
                    </div>
                  </div>

                  {/* Public Information ONLY */}
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-base text-[#F4F1EA] uppercase tracking-wide group-hover:text-[#D8B56A] transition-colors">
                      {c.full_name}
                    </h3>
                    <p className="text-xs text-[#D8B56A] font-semibold">
                      Batch {c.batch_label || "IICT"}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 w-full flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-[#D8B56A]" />
                    <span>Verified Contributor</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center space-y-3 bg-[#050914]/60 rounded-2xl border border-slate-800">
              <Award className="w-10 h-10 text-[#D8B56A]/50 mx-auto" />
              <h3 className="text-base font-extrabold text-[#F4F1EA] uppercase tracking-wider">
                THE WALL AWAITS ITS FIRST CONTRIBUTOR
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Be among the first students to contribute and have your verified profile honored on the IICT Fresher Party Wall of Honor.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
