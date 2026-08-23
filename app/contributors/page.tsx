import React from "react";
import Link from "next/link";
import { Sparkles, Users, Award, ShieldCheck, Heart, User } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export const metadata = {
  title: "Contributors Wall | IICT Fresher Party 2026",
  description: "Official Contributor Wall honoring team members, sponsors, and students supporting IICT Fresher Party 2026.",
};

interface ContributorItem {
  id: string;
  full_name: string;
  profile_photo_url?: string | null;
  batch_label?: string | null;
  contribution_amount?: number | null;
}

export default async function ContributorsPage() {
  const supabase = await createClient();

  // Fetch approved student profiles to display on contributor recognition wall
  const { data: profiles } = await supabase
    .from("public_student_profiles")
    .select("id, full_name, profile_photo_url, batch_label, created_at")
    .limit(24);

  const contributors: ContributorItem[] = profiles
    ? profiles.map((p) => ({
        id: p.id,
        full_name: p.full_name,
        profile_photo_url: p.profile_photo_url,
        batch_label: p.batch_label,
        contribution_amount: null,
      }))
    : [];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header Banner */}
      <div className="text-center space-y-4 pt-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#081221] border border-[#D8B56A]/40 text-[#D8B56A] text-xs font-bold uppercase tracking-widest shadow-sm">
          <Award className="w-4 h-4 text-[#D8B56A]" />
          <span>WALL OF HONOR</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#F4F1EA] uppercase tracking-tight">
          THE <span className="gold-gradient-text">CONTRIBUTORS</span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 tracking-wider uppercase font-semibold">
          “The People Who Made It Possible”
        </p>

        <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed pt-1">
          Honoring the dedicated student organizers, sponsors, and contributors bringing the IICT Fresher Party 2026 to life.
        </p>
      </div>

      {/* Contributor Grid */}
      {contributors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contributors.map((c) => (
            <div
              key={c.id}
              className="backdrop-blur-2xl bg-[#081221]/80 p-6 rounded-3xl border border-[#D8B56A]/25 hover:border-[#D8B56A]/60 flex flex-col items-center text-center space-y-4 shadow-lg hover:-translate-y-1 transition-all"
            >
              {/* Profile Photo */}
              <div className="w-20 h-20 rounded-full border-2 border-[#D8B56A]/50 bg-[#050914] overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(216,181,106,0.2)]">
                {c.profile_photo_url ? (
                  <img
                    src={c.profile_photo_url}
                    alt={c.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-[#D8B56A]/70" />
                )}
              </div>

              {/* Name & Batch */}
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm text-[#F4F1EA] uppercase tracking-wide">
                  {c.full_name}
                </h3>
                <p className="text-[11px] text-[#D8B56A] font-semibold">
                  Batch {c.batch_label || "IICT"}
                </p>
              </div>

              {/* Contribution Badge */}
              <div className="pt-2 border-t border-slate-800/80 w-full flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D8B56A]" />
                <span>Verified Contributor</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State / Initial Recognition Banner */
        <div className="backdrop-blur-2xl bg-[#081221]/80 p-10 sm:p-14 rounded-3xl border border-[#D8B56A]/25 text-center space-y-6 max-w-2xl mx-auto shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-[#050914] border border-[#D8B56A]/40 flex items-center justify-center text-[#D8B56A] mx-auto shadow-lg">
            <Heart className="w-8 h-8 text-[#D8B56A] animate-pulse" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-extrabold text-[#F4F1EA] uppercase tracking-wider">
              BECOME A CONTRIBUTOR
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
              Contributions for IICT Fresher Party 2026 are being received and audited. Approved contributors will be featured here on the official Wall of Honor.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest">
            <Link
              href="/finance"
              className="px-6 py-3 rounded-full gold-gradient-btn text-[#050914]"
            >
              FINANCIAL TRANSPARENCY
            </Link>
            <Link
              href="/help-hub"
              className="px-6 py-3 rounded-full gold-outline-btn"
            >
              STUDENT HELP HUB
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
