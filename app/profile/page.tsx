import React from "react";
import Link from "next/link";
import { requireAuthenticatedUser, getCurrentProfile } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";
import { User, ShieldCheck, GraduationCap, Calendar, HeartHandshake, DollarSign, BookOpen, ArrowRight, Clock, Award } from "lucide-react";

export const revalidate = 0;

export const metadata = {
  title: "My Profile | UNOFFICIAL IICT",
  description: "Personal student dashboard, approval status, contribution status, and quick portal access.",
};

export default async function ProfilePage() {
  await requireAuthenticatedUser();
  const profile = await getCurrentProfile();
  const supabase = await createClient();

  if (!profile) {
    return null;
  }

  // Fetch personal user contribution records
  const { data: userContribs } = await supabase
    .from("contributions")
    .select("amount, status")
    .eq("user_id", profile.id);

  const verifiedContribs = (userContribs || []).filter((c) => c.status === "verified");
  const totalVerifiedContrib = verifiedContribs.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  let contribStatus = "NO CONTRIBUTION RECORD";
  if (verifiedContribs.length > 0) {
    contribStatus = "VERIFIED CONTRIBUTOR";
  } else if ((userContribs || []).some((c) => c.status === "pending")) {
    contribStatus = "VERIFICATION PENDING";
  }

  const quickNavLinks = [
    { name: "FRESHERS 2026", href: "/freshers", desc: "Event Lineup & Schedule", icon: Calendar },
    { name: "CONTRIBUTION", href: "/contribution", desc: "Submit Support & Wall of Honor", icon: HeartHandshake },
    { name: "FINANCE", href: "/finance", desc: "Audited Financial Transparency", icon: DollarSign },
    { name: "STUDENT HELP HUB", href: "/help-hub", desc: "Verified Student Directories", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 selection:bg-[#D8B56A] selection:text-[#050914]">
      {/* Header Profile Hero Card */}
      <div className="backdrop-blur-2xl bg-[#081221]/90 p-8 sm:p-10 rounded-3xl border border-[#D8B56A]/35 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Photo Avatar Frame */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-[#D8B56A] p-1 bg-[#050914] shadow-[0_0_25px_rgba(216,181,106,0.3)] shrink-0">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#081221] flex items-center justify-center">
              {profile.profile_photo_url ? (
                <img src={profile.profile_photo_url} alt={profile.full_name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-[#D8B56A]" />
              )}
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#050914] border border-[#D8B56A]/30 text-[#D8B56A] text-[10px] font-bold uppercase tracking-widest mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>UNOFFICIAL IICT STUDENT ACCOUNT</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#F4F1EA] uppercase tracking-tight">
                {profile.full_name}
              </h1>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs">
              <div className="px-3.5 py-1.5 rounded-xl bg-[#050914] border border-slate-800 flex items-center gap-2 text-slate-300 font-medium">
                <GraduationCap className="w-4 h-4 text-[#D8B56A]" />
                <span>Batch: <strong className="text-[#F4F1EA]">{profile.batch?.label || "IICT"}</strong></span>
              </div>

              <div className="px-3.5 py-1.5 rounded-xl bg-[#050914] border border-slate-800 flex items-center gap-2 text-slate-300 font-medium">
                <User className="w-4 h-4 text-[#D8B56A]" />
                <span>Roll: <strong className="text-[#F4F1EA] uppercase">{profile.roll_number}</strong></span>
              </div>

              <div className="px-3.5 py-1.5 rounded-xl bg-[#050914] border border-slate-800 flex items-center gap-2 text-slate-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Approval Status: <strong className="text-emerald-400 uppercase">{profile.approval_status}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contribution Metrics & Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="backdrop-blur-2xl bg-[#081221]/80 p-8 rounded-3xl border border-[#D8B56A]/25 space-y-4 shadow-xl">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
            PERSONAL CONTRIBUTION STATUS
          </span>
          <div className="flex items-center justify-between">
            <span
              className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                contribStatus === "VERIFIED CONTRIBUTOR"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                  : contribStatus === "VERIFICATION PENDING"
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                  : "bg-slate-800 text-slate-400 border border-slate-700"
              }`}
            >
              {contribStatus}
            </span>
            <Link
              href="/contribution"
              className="text-xs font-extrabold text-[#D8B56A] hover:underline flex items-center gap-1 uppercase tracking-wider"
            >
              <span>MANAGE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="backdrop-blur-2xl bg-[#081221]/80 p-8 rounded-3xl border border-[#D8B56A]/25 space-y-2 shadow-xl">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
            TOTAL VERIFIED CONTRIBUTION
          </span>
          <div className="text-3xl font-black text-[#D8B56A] font-mono">
            ₹{totalVerifiedContrib.toLocaleString("en-IN")}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Audited record on official student treasury ledger</p>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-black text-[#F4F1EA] uppercase tracking-wider">
          PORTAL QUICK ACCESS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickNavLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="p-6 rounded-3xl bg-[#081221]/80 border border-[#D8B56A]/25 hover:border-[#D8B56A]/60 flex flex-col justify-between space-y-6 shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#050914] border border-[#D8B56A]/30 flex items-center justify-center text-[#D8B56A] group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-[#F4F1EA] group-hover:text-[#D8B56A] transition-colors uppercase tracking-wider flex items-center justify-between">
                    <span>{item.name}</span>
                    <ArrowRight className="w-4 h-4 text-[#D8B56A] group-hover:translate-x-1 transition-transform" />
                  </h3>
                  <p className="text-xs text-slate-400 font-medium pt-1">
                    {item.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
